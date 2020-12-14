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

const transactionHistory = document.querySelector('.history');


submitButton.addEventListener('click', addTransaction);



let expenses = 0;
let income = 0;
let dps = [income, expenses];


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
  let label = transactionLabel.value;
  let amt = parseInt(transactionAmt.value);


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
		transactionAmt.classList.remove("incomeSelector");
		// historyAmt.classList.add("red");
		
	}
	else if(transactionAmt.classList.contains("expenseSelector")){
		dps[1] += amt;
		transactionAmt.classList.remove("expenseSelector")
		// historyAmt.classList.add("green");
	}else{
		alert("Please Select Either Income or Expense")
		return
	}

	
	const historyUl = document.createElement('ul');
	historyUl.classList.add('historyUl');
	historyUl.innerHTML = 
	`<li class="historyLabel">${label}</li>
	<li class="historyAmt">${amt}</li>`;
	
	transactionHistory.appendChild(historyUl);


	 chart.update();
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