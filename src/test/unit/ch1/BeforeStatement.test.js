import statement from "../../../main/ch1/BeforeStatement";
import invoices from "./invoices.json";
import plays from "./plays.json";

// console.log(plays)

test("print bill plays", () => {
    // console.log(invoices)
  expect(statement(invoices, plays)).toStrictEqual({
    customer: "BigCo",
    historyList: [
      { playID: "Hamlet", amount: "$650.00", audience: 55 },
      { playID: "As You Like It", amount: "$580.00", audience: 35 },
      { playID: "Othello", amount: "$500.00", audience: 40 },
    ],
    totalAmount: "$1,730.00",
    volumeCredits: 47,
  });
});
