let expenseCount: number = 0;

export default class {
  id: string;
  date: Date;
  title: string;
  amount: number;

  constructor({ title = '', amount = 0, date = new Date() }, id?: string) {
    expenseCount++;
    this.id = id || expenseCount.toString();
    this.date = date;
    this.title = title;
    this.amount = amount;
  }
}
