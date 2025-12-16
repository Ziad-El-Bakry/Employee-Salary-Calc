// Dark Mode Toggle Script
// const toggleBtn = document.getElementById("themeToggle");

// // Load saved mode
// if (localStorage.getItem("theme") === "dark") {
//   document.body.classList.add("dark");
//   toggleBtn.textContent = "☀️ Light Mode";
// }

// toggleBtn.addEventListener("click", () => {
//   document.body.classList.toggle("dark");

//   if (document.body.classList.contains("dark")) {
//     localStorage.setItem("theme", "dark");
//     toggleBtn.textContent = "☀️ Light Mode";
//   } else {
//     localStorage.setItem("theme", "light");
//     toggleBtn.textContent = "🌙 Dark Mode";
//   }
// });

/*
Employee Salary Calculator - Main Script
Handles form interactions, validation, and table updates.
*/

let employees = [];

// Event listeners for buttons
document.getElementById("Calc").addEventListener('click',Calc);
document.getElementById("Clear_form").addEventListener('click',reCalc);
document.getElementById("Clear_all").addEventListener('click',clearAll);

// Function to calculate and display salary
function Calc(){
    // Get input values
    var empName     = document.getElementById("empName").value.trim();
    var basicSalary = parseFloat(document.getElementById("basicSalary").value);
    var bonus       = parseFloat(document.getElementById("bonus").value);
    var eHoures     = parseFloat(document.getElementById("exterHoures").value);
    var pena        = parseFloat(document.getElementById("pena").value);

    // Validation
    if (!empName) {
        alert("Please enter Employee Name.");
        return;
    }
    if (isNaN(basicSalary) || basicSalary < 0) {
        alert("Please enter a valid Basic Salary.");
        return;
    }
    if (isNaN(bonus) || bonus < 0) {
        alert("Please enter a valid Bonus.");
        return;
    }
    if (isNaN(eHoures) || eHoures < 0) {
        alert("Please enter valid Extra Hours.");
        return;
    }
    if (isNaN(pena) || pena < 0) {
        alert("Please enter valid Penalties.");
        return;
    }

    // Calculations
    var workingHoures = monthlyWorkingHours(9,30);
    var hourValue     = hourlyRate(basicSalary ,workingHoures);
    var extraValue    = extraHours(eHoures, hourValue);
    var grossValue    = grossSalary(basicSalary ,bonus, extraValue, pena);
    
    if (grossValue < 0) {
        alert("Penalties cannot exceed total earnings.");
        return;
    }
    
    var tax           = taxes(grossValue, 0.16);
    var nSalary       = netSalary(grossValue, tax) ;

    let employee = {
        name: empName,
        basic: basicSalary,
        bonus: bonus,
        extra: extraValue,
        penalties: pena,
        gross: grossValue,
        tax: tax,
        net: nSalary
    };
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));

    // Add to table
    var tbody = document.getElementById('resultsTable');
    var newRow = tbody.insertRow();
    newRow.insertCell(0).innerHTML = empName;
    newRow.insertCell(1).innerHTML = basicSalary.toFixed(2);
    newRow.insertCell(2).innerHTML = bonus.toFixed(2);
    newRow.insertCell(3).innerHTML = extraValue.toFixed(2);
    newRow.insertCell(4).innerHTML = pena.toFixed(2);
    newRow.insertCell(5).innerHTML = grossValue.toFixed(2);
    newRow.insertCell(6).innerHTML = tax.toFixed(2);
    newRow.insertCell(7).innerHTML = nSalary.toFixed(2);
}

// Function to clear the form
function reCalc(){
    document.getElementById('empName').value     = "";
    document.getElementById('basicSalary').value = "";
    document.getElementById('bonus').value       = "";
    document.getElementById('exterHoures').value  = "";
    document.getElementById('pena').value   = "";
}

// Function to clear form and table
function clearAll(){
    reCalc();
    employees = [];
    localStorage.removeItem('employees');
    var tbody = document.getElementById('resultsTable');
    tbody.innerHTML = "";
}

function loadEmployees() {
    let stored = localStorage.getItem('employees');
    if (stored) {
        employees = JSON.parse(stored);
        employees.forEach(emp => {
            var tbody = document.getElementById('resultsTable');
            var newRow = tbody.insertRow();
            newRow.insertCell(0).innerHTML = emp.name;
            newRow.insertCell(1).innerHTML = emp.basic.toFixed(2);
            newRow.insertCell(2).innerHTML = emp.bonus.toFixed(2);
            newRow.insertCell(3).innerHTML = emp.extra.toFixed(2);
            newRow.insertCell(4).innerHTML = emp.penalties.toFixed(2);
            newRow.insertCell(5).innerHTML = emp.gross.toFixed(2);
            newRow.insertCell(6).innerHTML = emp.tax.toFixed(2);
            newRow.insertCell(7).innerHTML = emp.net.toFixed(2);
        });
    }
}

loadEmployees();
