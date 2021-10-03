const statement = (invoice, plays) => {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = {};
  result.customer = invoice.customer;
  let historyList = [];
  // console.log(invoice[0].customer);
  for (let perf of invoice.performance) {
    // const play = playFor(perf);
    let history = {};
    let thisAmount = amountFor(perf, playFor(perf));

    volumeCredits += volumeCreditFor(perf);

    history.playID = playFor(perf).name;
    history.amount = usd(thisAmount);
    history.audience = perf.audience;

    totalAmount += thisAmount;
    historyList.push(history);
  }

  result.historyList = historyList;
  result.totalAmount = usd(totalAmount);
  result.volumeCredits = volumeCredits;
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber/100);
  }

  function volumeCreditFor(perf) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if ("comedy" === playFor(perf).type)
      result += Math.floor(perf.audience / 5);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`Invalid Genre: ${playFor(aPerformance).type}`);
    }
    return result;
  }
};

export default statement;
