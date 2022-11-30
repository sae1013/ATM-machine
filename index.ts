// if you want to run in Browser Environment, Uncomment annotation below


import { BankAccount } from './src/bank_account';
import { BankAPI } from './src/bank_api';
import { BankCard } from './src/bank_card';
import { ATMController } from './src/atm_contoller';

const myBankAccount = new BankAccount('48502352010012', '0123', 'minwoo');

// enroll created account to BankAPI
BankAPI.enrollAccount(myBankAccount);

// cerate bankCard(checkCard)
const myBankCard = new BankCard('48502352010012', 'minwoo'); // accountNo. username,cardId

const atmController = new ATMController();
console.log(atmController.insertCard(myBankCard, '0123'));

console.log('your balance',atmController.deposit(20));
console.log('your balance',atmController.withraw(5));
console.log('your balance', atmController.getBalance());

