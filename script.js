var state = {
    balance: 0,
    income: 0,
    expense: 0,
    transaction:[

    ]
};

const balanceEl=document.querySelector('#balance');
const incomeEl=document.querySelector('#income');
const expenseEl=document.querySelector('#expense');
const trans_listEl = document.querySelector("#trans_list");
const add_incomeEl = document.querySelector("#add_income");
const add_expenseEl = document.querySelector("#add_expense");
const amount_valueEl = document.querySelector("#amount_value");
const name_valueEl = document.querySelector("#name_value");

function uniqueId() {
  return Math.round(Math.random()*10000);
}

function render(){
  var localState = JSON.parse(localStorage.getItem("expenseTracker"));
  if(localState!== null){
    state = localState;
  }
  new_bal();
  new_trans();
}


function new_trans(){
  add_incomeEl.addEventListener("click",addNewIncome);
  add_expenseEl.addEventListener("click",addNewExpense);
}


function addNewIncome(){

  if(name_valueEl.value!=="" && amount_valueEl.value !==""){
    var transaction ={
      name:name_valueEl.value,
      amount:parseInt(amount_valueEl.value),
      type:'income'

    }

    state.transaction.push(transaction);
    new_bal();
    name_valueEl.value="";
    amount_valueEl.value="";
  }else{
    alert("input a valid  data");
  }

}



function addNewExpense(){
  if(name_valueEl.value!==""&& amount_valueEl.value !==""){

    var transaction ={
      name:name_valueEl.value,
      amount:parseInt(amount_valueEl.value),
      type:'expense'
    }
    state.transaction.push(transaction);
    new_bal();
    name_valueEl.value="";
    amount_valueEl.value="";
  }else {
    alert("input a valid data");
  }

}



function new_bal(){
  var balance=0,
      income=0,
      expense=0,
      item;
  for(var i = 0;i<state.transaction.length;i++){
    item =state.transaction[i];
    if(item.type ==="income"){
      income+=item.amount;
    }else if(item.type ==="expense"){
      expense+=item.amount;
    }
    balance = income - expense;
  }
  state.balance = balance;
  state.income = income;
  state.expense = expense;
  localStorage.setItem("expenseTracker",JSON.stringify(state));
  old_bal();
}


function old_bal(){
  balanceEl.innerHTML=`$${state.balance}`;
  incomeEl.innerHTML =`$${state.income}`;
  expenseEl.innerHTML =`$${state.expense}`;

 var transaction_listEl;
 var trans_nameEl;
 var trans_amountEl;
 var trans_deleteEl;
 var trans_bttndivEl;

trans_listEl.innerHTML="";

  for (i=0;i<state.transaction.length;i++){

transaction_listEl = document.createElement("li");
trans_nameEl = document.createElement("h3");
trans_nameEl.innerText = state.transaction[i].name;


trans_bttndivEl = document.createElement("div");
trans_amountEl=document.createElement("button");
trans_amountEl.innerText = `$${state.transaction[i].amount}`;

if(state.transaction[i].type === "income"){
trans_amountEl.setAttribute("id","income_value");

}else
if(state.transaction[i].type === "expense"){
  trans_amountEl.setAttribute("id","expense_value");
}

trans_deleteEl =document.createElement("button");
trans_deleteEl.innerText ="X";
trans_deleteEl.classList.add("clear");
trans_deleteEl.setAttribute("data-id",state.transaction[i].id);

trans_deleteEl.addEventListener("click",(e)=>{
var id = parseInt(e.target.getAttribute("data-id"));
var deleteIndex;
for(i=0;i<state.transaction.length;i++){
if(state.transaction[i].id === id){
  deleteIndex =i;
  break;
}

}

state.transaction.splice(deleteIndex,1);
new_bal();

})



trans_bttndivEl.appendChild(trans_amountEl);
trans_bttndivEl.appendChild(trans_deleteEl);
transaction_listEl.appendChild(trans_nameEl);
transaction_listEl.appendChild(trans_bttndivEl);
trans_listEl.appendChild(transaction_listEl);



  }
}

render();
