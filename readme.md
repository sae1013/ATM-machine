## Project: ATM Machine <br/><br/>

#  Stack
```md
Typescript, Webpack, Jest
```

# Installation
```js
npm install
```

# dev server
```md
npm run start:dev
# default port: 3000
# entry: localhost:3000
```


# build
```js
npm run build:dev
```
<br/>

# Test ( using jest)
```js
npm run test
```

# About Files
```md
root/public/index.html : entry html file

root/test/main.test.ts : test all functions, this file is the goal of ATM project

root/src/
    atm_controller.ts 
    bank_account.ts 
    bank_api.ts 
    bank_card.ts 
    utils.ts: 

root/dist : if you build the project, compiled & bundled file will be created here.
```

# introduce
**Requirement1.** This Project doesn't need any UI (either graphical or console), but a controller should be implemented and tested.

**-> this project uses Testing library Jest.  all functions can be tested using jest**

    you don't need to run the script in the browser because, 
    this project's goal is to check ATM functions

    but if you want to implement interface, or want to check log, 
     you can also run script file in the browser(dev-server).
    because i configured the webpack. (# webpack entry file is index.ts file)
    

**Requirement2.** Insert Card => PIN number => Select Account => See Balance/Deposit/Withdraw

**-> test cases cover requirements2.**


**Requirement3.** A bank API wouldn't give the ATM the PIN number, but it can tell you if the PIN number is correct or not.

**-> I declared BankApi Class instead of implementing RestAPI**


# work flow & scenario
**First**, you should create BankAccount

**Second,** you should enroll your BankAccount to bankAPI (user's account will be set to static bankAccounts field)

**Third**, make Bank card 

**Fourth**, if you insert the card, the ATM machine will send the request to bankAPI for getting user's account.

if you entered the correct pinNumber, ATM machine get user's account information from bankAPI and
It will register an account with the machine.

 After ATM machine register the user's account (after you insert the card),
you can deposit/ withraw/ see balance

<br/>

# About Test Cases

### 1. InsertCard and Validate PinNumber TestGroup 
	1-1 : PinNumber format Test (over 4-legth number)
            * pinNumber should have the number of 4 length
	
	1-2 : PinNumber format Test (only number input is valid)
            * filter the input using regex

	1-3 : Wrong pinNumber Test 
            * when user insert wrong pinNumber

	1-4 : Correct pinNumber 
            * when user insert correct pinNumber   
<br/>

### 2. Deposit TestGroup 
	2-1 : Dollar-unit Test (not allowed cents)

	2-2 : Dollar-unit Test (negative-unit not allowed)

	2-3 : Dollar-unit Test (0 dollar not allowed)

	2-4 : Deposit 10 dollars
	     * deposit should be 10 dollars after deposit

	2-5 : Deposit 10 dollars and then deposit 20 dollars
	     * deposit should be 30 dollars after deposit

<br/>

### 3. Withrawal TestGroup 
	3-1 : Dollar-unit Test (not allowed cents)

	3-2 : Dollar-unit Test (negative-unit not allowed)
	
	3-3 : Dollar-unit Test (0 dollar input not allowed) 
			
	3-4 : Withraw dollars when your balance is 0
	
	3-5 : Withraw Success
	      * set balance to 20 dollars and withraw 5 and then, withraw 10 dollars

	Change withraw fee (only for this test, default fee is zero.)
	
	3-6 : Change Withraw Fee and withraw test 
	      * change withraw fee to 1 dollar
	      * firstly, deposit 10 , withraw 5 dollars, withraw 3 dollars. 
  
	3-7 : Change Withraw Fee and Not enough balance test
	      * firstly, deposit 10 and withraw 10. in this case, the error occurs because it costs 1 dollar fee.(not enough balance)

<br/>

### 4. Check Balance TestGroup
	4-1 : Check balance Test

<br/>

### 5. Remove Bank Card from ATM machine TestGroup
	5-1 : Remove Bank Card and reset ATM Test
	   * if user remove the card, the ATM reset registered bankAccount information

<br/> 

### Total TestCases : 18 
