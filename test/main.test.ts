import { BankAccount } from '../src/bank_account';
import { BankAPI } from '../src/bank_api';
import { ATMController } from '../src/atm_contoller';
import { BankCard } from '../src/bank_card';

// createAccount
const myBankAccount = new BankAccount('48502352010012', '0123', 'minwoo'); // accountNumber,pinNumber,name

// enroll created account to BankAPI
BankAPI.enrollAccount(myBankAccount); // enroll account in BankAPI

// create bankCard
const myBankCard = new BankCard('48502352010012', 'minwoo'); // accountNumber, username

describe('InsertCard and Validate PinNumber TestGroup', () => {
  // get singleton ATMController Instance
  const atmController = new ATMController();

  test('PinNumber format Test (over 4-legth number)', () => {
    try {
      atmController.insertCard(myBankCard, '01231');
    } catch (error) {
      expect(error.message).toMatch(/pinNumber should be 4/i);
    }
  });

  test('PinNumber format Test (only number input is valid)', () => {
    try {
      atmController.insertCard(myBankCard, '01af');
    } catch (error) {
      expect(error.message).toMatch(/only number input is valid/i);
    }
  });

  test('Wrong pinNumber Test', () => {
    try {
      atmController.insertCard(myBankCard, '0424');
    } catch (error) {
      expect(error.message).toMatch(/wrong pinNumber/i);
    }
  });

  test('Correct pinNumber Test', () => {
    const resultMessage = atmController.insertCard(myBankCard, '0123');
    expect(resultMessage).toMatch(/correct pinNumber/i);
  });
});

describe('Deposit TestGroup', () => {
  const atmController = new ATMController();
  atmController.insertCard(myBankCard, '0123');

  beforeEach(() => {
    atmController.clearRegistredAccountBalance(); // init balance each test
  });

  test('Dollar-unit Test (not allowed cents)', () => {
    try {
      atmController.deposit(10.32);
    } catch (err) {
      expect(err.message).toMatch(/please insert valid unit/i);
    }
  });

  test('Dollar-unit Test (negative-unit not allowed)', () => {
    try {
      atmController.deposit(-1);
    } catch (err) {
      expect(err.message).toMatch(/please insert valid unit/i);
    }
  });

  test('Dollar-unit Test (0 dollar not allowed)', () => {
    try {
      atmController.deposit(0);
    } catch (err) {
      expect(err.message).toMatch(/please insert valid unit/i);
    }
  });

  test('Deposit 10 dollars', () => {
    let balance = atmController.deposit(10);
    expect(balance).toBe(10);
  });

  test('Deposit 10 dollars and then deposit 20 dollars', () => {
    let balance = atmController.deposit(10);
    expect(balance).toBe(10);
    balance = atmController.deposit(20);
    expect(balance).toBe(30);
  });
});

describe('Withrawal TestGroup', () => {
  const atmController = new ATMController();
  atmController.insertCard(myBankCard, '0123');

  beforeEach(() => {
    atmController.clearRegistredAccountBalance(); // Init balance to 0 each test
  });

  afterEach(() => {
    atmController.changeFee(0); // default withraw-fee is zero
  });

  test('Dollar-unit Test (not allowed cents)', () => {
    try {
      atmController.withraw(10.9);
    } catch (err) {
      expect(err.message).toMatch(/please insert valid unit/i);
    }
  });

  test('Dollar-unit Test (negative-unit not allowed) ', () => {
    try {
      atmController.withraw(-10);
    } catch (err) {
      expect(err.message).toMatch(/please insert valid unit/i);
    }
  });

  test('Dollar-unit Test (0 dollar not allowed)', () => {
    try {
      atmController.withraw(0);
    } catch (err) {
      expect(err.message).toMatch(/please insert valid unit/i);
    }
  });

  test('Withraw dollars when your balance is 0', () => {
    try {
      atmController.withraw(10);
    } catch (err) {
      expect(err.message).toMatch(/Not enough balance/i);
    }
  });

  test('Withraw Success', () => {
    let balance = atmController.deposit(20); // init balance to 20
    balance = atmController.withraw(5);
    expect(balance).toBe(15);

    balance = atmController.withraw(10);
    expect(balance).toBe(5);
  });

  // when withrawal costs 1 dollar-fee
  test('Change Withraw Fee and withraw test', () => {
    atmController.changeFee(1);
    atmController.deposit(10);

    let balance = atmController.withraw(5);
    expect(balance).toBe(4);

    balance = atmController.withraw(3);
    expect(balance).toBe(0);
  });

  // when withrawal costs 1 dollar-fee
  test('Change Withraw Fee and Not enough balance test', () => {
    try {
      atmController.changeFee(1);
      atmController.deposit(10);

      let balance = atmController.withraw(10);
    } catch (err) {
      expect(err.message).toMatch(/Not enough balance/i);
    }
  });
});

describe('Check Balance TestGroup', () => {
  const atmController = new ATMController();
  atmController.insertCard(myBankCard, '0123');

  beforeEach(() => {
    atmController.clearRegistredAccountBalance(); // Init balance to 0 each test
  });

  test('check balance', () => {
    expect(atmController.getBalance()).toBe(0);

    atmController.deposit(10);
    expect(atmController.getBalance()).toBe(10);

    atmController.deposit(20);
    expect(atmController.getBalance()).toBe(30);

    atmController.withraw(5);
    expect(atmController.getBalance()).toBe(25);
  });
});

describe('Remove Bank Card from ATM machine TestGroup', () => {
  test('Remove Bank Card and reset ATM Test', () => {
    const atmController = new ATMController();
    atmController.removeCard();
    expect(atmController.getRegisteredAccount()).toBeNull();
  });
});
