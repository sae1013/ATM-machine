import { BankAccount } from './bank_account';
import { Error } from './utils';

export class BankAPI {
  static bankAccounts: {
    [key:string]:BankAccount
  } = {};

  static enrollAccount(bankAccount: BankAccount): Error | string {
    if (BankAPI.checkExistAccount(bankAccount.accountNumber)) {
      return new Error('already enrolled Account');
    }
    this.bankAccounts[bankAccount.accountNumber] = bankAccount;
    return 'Successfully Enrolled';
  }

  static checkExistAccount(accountNumber: string): boolean {
    if (accountNumber in this.bankAccounts) {
      return true;
    }
    return false;
  }

  static validatePinNumber(accountNumber: string, pinNumber: string): boolean {
    if (this.bankAccounts[accountNumber].pinNumber === pinNumber) {
      return true;
    }
    return false;
  }

  static getAccount(
    accountNumber: string,
    pinNumber: string,
  ): BankAccount | Error {
    const isValidated = BankAPI.validatePinNumber(accountNumber, pinNumber);
    if (!isValidated) {
      return new Error('Wrong PinNumber');
    }
    return this.bankAccounts[accountNumber];
  }
}
