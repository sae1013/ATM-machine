export class BankAccount {
  pinNumber: string;
  balance: number = 0;
  accountNumber: string;
  userName: string;

  constructor(accountNumber: string, pinNumber: string, userName: string) {
    this.pinNumber = pinNumber;
    this.accountNumber = accountNumber;
    this.userName = userName;
  }
}

