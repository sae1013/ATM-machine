import { v4 as uuidv4 } from 'uuid';
export class BankCard {
  id: string;
  accountNumber: string;
  userName: string;

  constructor(accountNumber: string, userName: string) {
    this.accountNumber = accountNumber;
    this.userName = userName;
    this.id = uuidv4();
  }
}
