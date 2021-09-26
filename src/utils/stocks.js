export const fetchStocksByMonthAndYear = (month, year) => {
  // 1. checks if user is logged in or not
  // 2. if user is not logged in, throw an error stating unauthorized access
  // 3. otherwise, get user by uid and pass in user uid, month and year to 
  // fetch all stocks from DB

  // after fetch, format data to look similar to data underneath...

  // make API call to firebase DB to get all stocks for current month and 
  // year for currently logged in user
  return [
    { month: 'September', date: '20', year: '2021', stock: 20 },
    { month: 'September', date: '21', year: '2021', stock: 21 },
    { month: 'September', date: '22', year: '2021', stock: 22 },
    { month: 'August', date: '21', year: '2021', stock: 22 },
    { month: 'October', date: '22', year: '2021', stock: 22 }
  ]
}

export const findMatchingStock = (stocks = [], month, date, year) => {
  if (!stocks.length || !Array.isArray(stocks)) return;
  return stocks.find(stock => (
    (stock.month === month) && 
    (stock.date === date) &&
    (stock.year === year)
  ));
}