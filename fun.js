
/*
Employee Salary Calculator - Main Script
Handles form interactions, validation, and table updates.
*/

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
    var tbody = document.getElementById('resultsTable');
    tbody.innerHTML = "";
}



