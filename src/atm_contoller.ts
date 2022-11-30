import { BankAPI } from './bank_api';
import { BankCard } from './bank_card';
import { BankAccount } from './bank_account';

export class ATMController {
  static instance: null | ATMController = null;
  private registeredAccount: BankAccount = null;
  fee: number = 0;

  constructor() {
    if (ATMController.instance) return ATMController.instance;
    ATMController.instance = this;
  }

  validatePinNumber(pinNumber: string): boolean | Error {
    // Check PinNumber Validation
    if (pinNumber.length !== 4) {
      throw new Error('pinNumber should be 4');
    }
    if (pinNumber.match(/[^0-9]/g)) {
      throw new Error('Only number input is valid');
    }
    return true;
  }

  // for unit test , reset current balance to 0
  clearRegistredAccountBalance(): Error | void {
    if (!this.registeredAccount) throw new Error('Insert card first');
    this.registeredAccount.balance = 0;
  }

  insertCard(bankCard: BankCard, pinNumber: string): string | Error {
    try {
      this.validatePinNumber(pinNumber);
      const resultMessage = this.requestAccount(bankCard, pinNumber);
      return resultMessage;
    } catch (error) {
      throw error;
    }
  }

  requestAccount(bankCard: BankCard, pinNumber: string): string | Error {
    // validate account and set Account to ATM
    try {
      const result = BankAPI.getAccount(bankCard.accountNumber, pinNumber);
      if (result instanceof Error) {
        throw result;
      }
      if (result instanceof BankAccount) {
        this.setAccount(result);
        return 'Correct pinNumber';
      }
    } catch (error) {
      throw error;
    }
  }

  getRegisteredAccount(): BankAccount {
    return this.registeredAccount;
  }

  setAccount(bankAccount: BankAccount): void {
    // get Account from BankAPI and register the account to ATM machine
    this.registeredAccount = bankAccount;
  }

  checkAccountFromATM() {
    // check whether the account is registered to Atm
    if (!this.registeredAccount) {
      return false;
    }
    return true;
  }

  removeCard() {
    this.registeredAccount = null;
    this.fee = 0;
  }

  validateUnit(money: number) {
    if (!Number.isInteger(money)) {
      return false;
    }
    if (money <= 0) return false;
    return true;
  }

  getBalance() {
    if (!this.checkAccountFromATM())
      throw new Error('Please insert bankCard first');
    return this.registeredAccount?.balance;
  }

  withraw(money: number) {
    // check ATM state
    if (!this.checkAccountFromATM())
      throw new Error('Please insert bankCard first');

    // unit validate
    if (!this.validateUnit(money)) throw new Error('Please insert Valid unit');
    if (this.registeredAccount.balance - this.fee - money < 0)
      throw new Error('Not enough balance');
    this.registeredAccount.balance =
      this.registeredAccount.balance - this.fee - money;
    return this.registeredAccount.balance;
  }

  deposit(money: number) {
    if (!this.checkAccountFromATM())
      throw new Error('Please insert bankCard first');
    if (!this.validateUnit(money)) throw new Error('Please insert Valid unit');
    this.registeredAccount.balance += money;
    return this.registeredAccount.balance;
  }

  changeFee(money: number) {
    // change ATM withraw fee
    this.fee = money;
    
  }
}
