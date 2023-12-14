"use strict";

/////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////
const accounts = [
  {
    owner: "Md Momen",
    email : "momen@gmail.com",
    movements: [
      2500, 500, -750, 1200, 3200, -1500, 500, 1200, -1750, 1800, 4000,
    ],
    interestRate: 1.5, // %
    password: 1234,
    movementsDates: [
      "2023-03-11T21:31:17.671Z",
      "2023-02-27T07:42:02.184Z",
      "2022-02-05T09:15:04.805Z",
      "2023-04-01T10:17:24.185Z",
      "2023-07-08T14:11:59.604Z",
      "2023-09-10T17:01:17.194Z",
      "2023-09-12T23:36:17.929Z",
      "2023-09-15T12:51:31.398Z",
      "2023-11-10T06:41:26.394Z",
      "2023-11-11T08:11:36.276Z",
    ],
    currency: "USD",
    locale: "en-US",
  },

  {
    owner: "Golam Rabbani",
    email : "golamrabbani@gmail.com",
    movements: [
      5000, 3400, -150, -790, -3210, -1000, 8500, -300, 1500, -1850, 3000,
    ],
    interestRate: 1.3, // %
    password: 5678,
    movementsDates: [
      "2023-03-11T21:31:17.671Z",
      "2023-02-27T07:42:02.184Z",
      "2022-02-05T09:15:04.805Z",
      "2023-02-14T10:17:24.687Z",
      "2023-03-12T14:11:59.203Z",
      "2023-05-16T17:01:17.392Z",
      "2023-08-10T23:36:17.522Z",
      "2023-09-03T12:51:31.491Z",
      "2023-11-10T06:41:26.394Z",
      "2023-11-11T08:11:36.276Z",
    ],
    currency: "EUR",
    locale: "en-GB",
  },
];

const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login-btn");

const labelSumIn = document.querySelector(".summary-value-in");
const labelSumOut = document.querySelector(".summary-value-out");
const labelSumInterest = document.querySelector(".summary-value-interest");

const inputLoginUsername = document.querySelector(".login-input-username");
const inputLoginEmail = document.querySelector(".login-input-email");
const inputLoginPassword = document.querySelector(".login-input-password");


/* //LogIN
btnLogin.addEventListener("click",function(e){
  e.preventDefault();

  const inputUsername = inputLoginUsername.value;
  const inputEmail = inputLoginEmail.value;
  const inputPassword = Number(inputLoginPassword.value);

  if(accounts[0].owner === inputUsername && accounts[0].password === inputPassword && accounts[0].email === inputEmail ){
    window.location.href = "bank.html";
  }else{
    alert("Wrong Information")
  }
}) */

//Movements
function displayMovements(accounts){
  containerMovements.innerHTML ="";

  const moves = accounts.movements;
  moves.forEach((move,i) =>{

    const color = move > 0 ? "green" : "red";
    const type = move > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="flex justify-between p-3">
          <div class="movements-type-deposit bg-${color}-500 w-28 mb-1 text-black text-center rounded-sm text-sm p-1">${i+1} ${type}</div>
          <div class="movements-date">5 days ago</div>
          <div class="movements-value">${move}$</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin",html)
  })
}

displayMovements(accounts[0])

//DisplayBalance
function displayBalance(accounts){

 //incomes
 const incomes = accounts.movements.filter(move => move > 0).reduce((acc,deposit) => acc + deposit,0)
 labelSumIn.textContent = `${incomes}$`

 //withdraw
 const withdraw = accounts.movements.filter(move => move < 0).reduce((acc,withdraw) => acc + withdraw,0)
 labelSumOut.textContent = `${Math.abs(withdraw)}$`

 //interest
 const interest = accounts.movements
   .filter((move) => move > 0)
   .map((deposit) => (deposit * accounts.interestRate) / 100).reduce((acc , deposit) => acc + deposit,0);
 labelSumInterest.textContent = `${interest}$`
 
}

displayBalance(accounts[0])

//Display Balance
