import createStatementData from './createStatementData.js';

const statement = (invoice, plays) => {
  return renderPlainText(createStatementData(invoice, plays));
};

const renderPlainText = (data) => {
  let result = {};
  result.customer = data.customer;
  let historyList = [];

  for (let perf of data.performance) {
    historyList.push(historyFor(perf));
  }

  result.historyList = historyList;
  result.totalAmount = usd(data.totalAmount);
  result.volumeCredits = data.totalVolumeCredits;
  return result;

  

  function historyFor(aPerformance) {
    let result = {};
    result.playID = aPerformance.play.name;
    result.amount = usd(aPerformance.amount);
    result.audience = aPerformance.audience;
    return result;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }  
};

export default statement;
