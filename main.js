"use strict";

/////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////
const accounts = [
  {
    owner: "Md Momen",
    email: "momen@gmail.com",
    movements: [
      2500, 500, -750, 1200, 3200, -1500, 500, 1200, -1750, 1800, 4000,
    ],
    interestRate: 1.5, // %
    password: 1234,
  },

  {
    owner: "Golam Rabbani",
    email: "golamrabbani@gmail.com",
    movements: [
      5000, 3400, -150, -790, -3210, -1000, 8500, -300, 1500, -1850, 3000,
    ],
    interestRate: 1.3, // %
    password: 5678,
  },
];

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance-value");
const labelSumIn = document.querySelector(".summary-value-in");
const labelSumOut = document.querySelector(".summary-value-out");
const labelSumInterest = document.querySelector(".summary-value-interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login-btn");
const btnTransfer = document.querySelector(".form-btn-transfer");
const btnLoan = document.querySelector(".form-btn-loan");
const btnClose = document.querySelector(".form-btn-close");
const btnSort = document.querySelector(".btn-sort");

const inputLoginUsername = document.querySelector(".login-input-username");
const inputLoginPassword = document.querySelector(".login-input-password");
const inputTransferTo = document.querySelector(".form-input-to");
const inputTransferAmount = document.querySelector(".form-input-amount");
const inputLoanAmount = document.querySelector(".form-input-loan-amount");
const inputCloseUsername = document.querySelector(".form-input-username");
const inputClosePassword = document.querySelector(".form-input-password");


//update ui
function updateUi(currentAccount) {
  displayMovements(currentAccount);
  displaySum(currentAccount);
  displayBalance(currentAccount);
}

//username
function createUsername(accounts) {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word.at(0))
      .join("");
  });
  console.log(accounts.username)
}
createUsername(accounts);

//log in
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("click");

  currentAccount = accounts.find(
    (account) => account.username === inputLoginUsername.value
  );

  if (currentAccount?.password === Number(inputLoginPassword.value)) {
    setTimeout(() => {
      labelWelcome.textContent = `Welcome back, ${currentAccount.owner
        .split(" ")
        .at(0)}`;

      containerApp.style.opacity = 1;

      updateUi(currentAccount);
    }, 2000);

  } else {
    setTimeout(() => {
      labelWelcome.textContent = `Log in Failed`;
      containerApp.style.opacity = 0;
    }, 2000);
  }
  inputLoginUsername.value = inputLoginPassword.value = "";
  inputLoginPassword.blur();
});

//Movements
function displayMovements(accounts){
  containerMovements.textContent = "";

  const move =  accounts.movements;
  move.forEach((move,i) => {

  const type = move > 0 ? "deposit" : "withdrawal";
    const html = `
        <div class="movements-row">
          <div class="movements-type movements-type-${type}">${i+1} ${type}</div>
          <div class="movements-date">5 days ago</div>
          <div class="movements-value">${move}</div>
        </div>
    `;

  containerMovements.insertAdjacentHTML("afterbegin",html)
  })

}
displayMovements(accounts[0])

//summary
function displaySum(accounts) {
  const incomes = accounts.movements
    .filter((move) => move > 0)
    .reduce((acc, deposit) => acc + deposit, 0);
  labelSumIn.textContent = `${incomes}Tk`;

  const withdrawal = accounts.movements
    .filter((move) => move < 0)
    .reduce((acc, withdrawal) => acc + withdrawal, 0);
  labelSumOut.textContent = `${Math.abs(withdrawal)}Tk`;

  const interest = accounts.movements
    .filter((move) => move > 0)
    .map((deposit) => (deposit * accounts.interestRate) / 100)
    .reduce((acc, deposit) => acc + deposit, 0);
  labelSumInterest.textContent = `${interest}Tk`;
}

displaySum(accounts[0])

//Balance
function displayBalance(accounts) {
  accounts.balance = accounts.movements.reduce((acc, move) => acc + move, 0);
  labelBalance.textContent = `${accounts.balance}Tk`;
};

displayBalance(accounts[0]);

//Transfer
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const receiverAccount = accounts.find(
    (account) => account.username === inputTransferTo.value
  );

  const amount = Number(inputTransferAmount.value);

  //clear
  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    currentAccount.username !== receiverAccount.username &&
    receiverAccount
  ) {
    setTimeout(() => {
      currentAccount.movements.push(-amount);
      receiverAccount.movements.push(amount);

      updateUi(currentAccount);
      labelWelcome.textContent = `Transection sucessfull`;
    }, 2000);
  } else {
    setTimeout(() => {
      labelWelcome.textContent = `Transection failed`;
    }, 2000);
  }
});

///////////////////////////////////////////////////////////
/////////Transfer to
/////////////////////////////////////////////////////////
btnTransfer.addEventListener("click",function(e){
  e.preventDefault()

  const receiverAccount = accounts.find(account => account.username === inputTransferTo.value )

  const amount = Number(inputTransferAmount.value);

  //clear
  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferAmount.blur()

  if(amount > 0 && amount <= currentAccount.balance && currentAccount.username !== receiverAccount.username && receiverAccount){
    setTimeout(()=>{
      currentAccount.movements.push(-amount);
      receiverAccount.movements.push(amount);

      updateUi(currentAccount);
      labelWelcome.textContent = `Transection sucessfull`;
    },2000)
  }else{
    setTimeout(()=>{
      labelWelcome.textContent = `Transection failed`;
    },2000)
  }
})


//request loan
btnLoan.addEventListener("click",function(e){
  e.preventDefault()

  const amount = Number(inputLoanAmount.value);
  if(amount > 0 && currentAccount.movements.some(move => move * 0.1)){
    setTimeout(() => {
      currentAccount.movements.push(amount);
      updateUi(currentAccount);
      labelWelcome.textContent = `Loan sucessfully Done`;
    }, 2000);
  }else{
     setTimeout(() => {
      labelWelcome.textContent = `Loan sucessfully not Done`;
     }, 2000);
  }
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
})

//close account
btnClose.addEventListener("click",function(e){
  e.preventDefault()

  if(currentAccount.username === inputCloseUsername.value && currentAccount.password === Number(inputClosePassword.value)){
   setTimeout(()=>{
     const index = accounts.findIndex(
       (account) => account.username === currentAccount.username
     );
     accounts.splice(index, 0);
     containerApp.style.opacity = 0;
     labelWelcome.textContent = `Close account`;
   },2000)
  }else{
     setTimeout(() => {
      labelWelcome.textContent = `Not Close account`;
     }, 2000);
  }

  //clear field
  inputCloseUsername.value = inputClosePassword.value = "";
  inputClosePassword.blur()
})