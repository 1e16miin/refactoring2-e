const statement = (invoice, plays) => {
  // let decodeInvoice = JSON.parse(invoice);
  // const decodePlays = JSON.parse(plays);
  let totalAmount = 0;
  let volumeCredits = 0;
  // let result = `billing history (customer name: ${invoices.customer})`;
  let result = {}
  result.customer = invoice.customer; 
  let historyList = [];
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;
  // console.log(invoice[0].customer);
  for (let perf of invoice.performance) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    let history = {}
    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`Invalid Genre: ${play.type}`);
    }

    volumeCredits += Math.max(perf.audience - 30, 0);
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
    history.playID = play.name
    history.amount = format(thisAmount / 100);
    history.audience = perf.audience;

    totalAmount += thisAmount;
    historyList.push(history);
  }

  result.historyList = historyList;
  result.totalAmount = format(totalAmount / 100);
  result.volumeCredits = volumeCredits;
  console.log(result)
  return result;
};


export default statement;