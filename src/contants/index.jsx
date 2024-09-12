export const billListData = {
  pay: [
    {
      type: "foods",
      name: "foods",
      list: [
        { type: "food", name: "Food" },
        { type: "drinks", name: "Drinks" },
        { type: "dessert", name: "Dessert" },
      ],
    },
    {
      type: "taxi",
      name: "taxi",
      list: [
        { type: "taxi", name: "Taxi" },
        { type: "longdistance", name: "Ticket" },
      ],
    },
    {
      type: "recreation",
      name: "recreation",
      list: [
        { type: "bodybuilding", name: "Gym" },
        { type: "game", name: "Game" },
        { type: "audio", name: "Audio" },
        { type: "travel", name: "Travel" },
      ],
    },
    {
      type: "daily",
      name: "daily",
      list: [
        { type: "clothes", name: "Clothes" },
        { type: "bag", name: "Bag" },
        { type: "book", name: "Book" },
        { type: "promote", name: "Promote" },
        { type: "home", name: "Home" },
      ],
    },
    {
      type: "other",
      name: "other",
      list: [{ type: "community", name: "Community" }],
    },
  ],
  income: [
    {
      type: "professional",
      name: "income",
      list: [
        { type: "salary", name: "Salary" },
        { type: "overtimepay", name: "Overtimepay" },
        { type: "bonus", name: "Bonus" },
      ],
    },
    {
      type: "other",
      name: "other",
      list: [
        { type: "financial", name: "Investment" },
        { type: "cashgift", name: "Gift" },
      ],
    },
  ],
};

export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
  billListData[key].forEach((bill) => {
    bill.list.forEach((item) => {
      prev[item.type] = item.name;
    });
  });
  return prev;
}, {});
