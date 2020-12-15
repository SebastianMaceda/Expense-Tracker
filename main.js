const currentDate = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let currentMonth = monthNames[currentDate.getUTCMonth()];
const currentYear = currentDate.getFullYear();
const monthYear = document.querySelector('.monthYear').textContent = `${currentMonth}, ${currentYear}`;

const incomeSelector = document.querySelector(".income");
const expsenseSelector = document.querySelector(".expense");


const submitButton = document.querySelector('#submit');

const transactionLabel = document.querySelector('#transaction');
const transactionAmt = document.querySelector('#amount');
let label;
let amt;
const hr = document.querySelector('hr');
let historyAmt;
const transactionHistory = document.querySelector('.history');

let trashButton;


submitButton.addEventListener('click', addTransaction);


let expenses = 0;
let income = 0;
let dps = [income, expenses];

const incomeExpense = document.querySelector('.incomeExpense');
incomeExpense.style.display = "none";


const incomeAmount = document.querySelector('.incomeAmount');
const expenseAmount = document.querySelector('.expenseAmount');


let chartDiv = document.getElementsByClassName('chart');
let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels: ['Income', 'Expense'],
        datasets: [{
            label: 'My First dataset',
            // backgroundColor: 'rgb(0, 99, 132)',
            borderColor: [
              'rgba(0, 0, 0, 0.1)',
              'rgba(0, 0, 0, 0.1)'
            ],
            backgroundColor: [
              'rgba(0, 199, 132)',
              'rgba(255, 99, 132)'
            ],
            data: dps
        }
    ]
    },

    // Configuration options go here
    options: {}
});


function addTransaction(e){
  e.preventDefault();
  label = transactionLabel.value;
  amt = parseInt(transactionAmt.value);
  const historyUl = document.createElement('ul');
	historyUl.classList.add('historyUl');
	historyUl.innerHTML = 
    `<li class="historyLabel">${label}</li>
    <li class="historyAmt">${amt}</li>
    <div class="trashContainer">
      <i class="fas fa-trash" onclick="trashCan()"></i>
    </div>`;

  if(label == ""){
    alert("Please Enter A Valid Label");
  }
  else if (isNaN(amt)){
    alert("Please Enter A Valid Amount");
  } 
  else{
	transactionLabel.value = '';
	transactionAmt.value = '';

    if(transactionAmt.classList.contains("incomeSelector")){
      dps[0] += amt;
      historyUl.classList.add("green");
      transactionAmt.classList.remove("expenseSelector");
    }
    else if(transactionAmt.classList.contains("expenseSelector")){
      dps[1] += amt;
      historyUl.classList.add("red");
      transactionAmt.classList.remove("incomeSelector")
    }else{
      alert("Please Select Either Income or Expense")
      return
    }


	
  // transactionHistory.append(historyUl);
  hr.after(historyUl);
  incomeExpense.style.display = "flex";
  historyAmt = document.querySelector(".historyAmt").textContent;  


  incomeAmount.textContent = `Income: ${dps[0]}`;
  expenseAmount.textContent = `Expenses: ${dps[1]}`;
  
   chart.update();
   console.log(historyAmt);

  }
}
function addIncome() {
	if(transactionAmt.classList.contains("expenseSelector")){
		transactionAmt.classList.remove("expenseSelector")
	}
	transactionAmt.classList.add("incomeSelector");
}
function addExpense() {
	if(transactionAmt.classList.contains("incomeSelector")){
		transactionAmt.classList.remove("incomeSelector")
	}
	transactionAmt.classList.add("expenseSelector");
}
function trashCan(){


  trashButton = document.querySelector('.fa-trash');
  let historyAmtInt;
  let trashButtonGrandParent = trashButton.closest("ul");
  console.log(trashButtonGrandParent.children);
  // trashButtonGrandParent.remove(trashButtonGrandParent);
  console.log(dps[0], dps[1]);
  
  if(trashButtonGrandParent.classList.contains("green")){
    dps[0] -= historyAmt;
    console.log(dps[0] -= historyAmt);
    incomeAmount.textContent = `Income: ${dps[0]}`;
    console.log(dps[0], dps[1]);
  }
  if(trashButtonGrandParent.classList.contains("red")){
    dps[1] -= historyAmt;
    console.log(dps[1] -= historyAmt);
    // amt -= historyAmt.textContent;
    expenseAmount.textContent = `Expenses: ${dps[1]}`;
    console.log(dps[0], dps[1]);
  }
  trashButtonGrandParent.remove()
  console.log(dps[0], dps[1]);
  // console.log(amt);
  chart.update();

}