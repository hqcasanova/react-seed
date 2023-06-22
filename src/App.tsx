import { useState } from 'react';

import NewExpense from 'components/NewExpense';
import Expenses from 'components/Expenses';
import Expense from 'models/Expense';
import YearRange from 'models/YearRange';

const EXPENSES = [
  new Expense({
    title: 'Kitchen paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  }),
  new Expense({
    title: 'New TV',
    amount: 799.49,
    date: new Date(2021, 2, 12),
  }),
  new Expense({
    title: 'Car insurance',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  }),
  new Expense({
    title: 'New desk (wooden)',
    amount: 450,
    date: new Date(2021, 5, 12),
  }),
];

const YEAR_RANGE = new YearRange(2010);
const DATE_RANGE = YEAR_RANGE.toDates();

function App() {
  const [expenses, setExpenses] = useState(EXPENSES);

  const addExpenseHandler = (expense: Expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  };

  return (
    <>
      <NewExpense
        minDate={DATE_RANGE.min}
        maxDate={DATE_RANGE.max}
        onAddExpense={addExpenseHandler}
      />
      <Expenses
        startYear={YEAR_RANGE.min}
        endYear={YEAR_RANGE.max}
        expenses={expenses}
      />
    </>
  );
}

export default App;
