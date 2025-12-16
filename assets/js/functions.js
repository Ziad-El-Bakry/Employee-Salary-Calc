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
Abbreviations:
whpd  => Working Hours Per Day
wdpm  => Working Days Per Month
mwh   => Monthly Working Hours
bs    => Basic Salary
hr    => Hourly Rate
eh    => Extra Hours
ehv   => Extra Hours Value
b     => Bonus
p     => Penalties
gs    => Gross Salary
tr    => Tax Rate
tv    => Tax Value
ns    => Net Salary
*/

// Calculate monthly working hours
function monthlyWorkingHours (whpd, wdpm) {
    var mwh = whpd * wdpm;
    return mwh;
}

// Calculate hourly rate based on basic salary and monthly hours
function hourlyRate(bs, mwh) {
    var hr = bs / mwh;
    return hr;
}

// Calculate value of extra hours
function extraHours(eh, hr){
    var ehv = eh * hr;
    return ehv;
}

// Calculate gross salary (basic + bonus + extra hours - penalties)
function grossSalary(bs, b, ehv, p){
    var gs = parseFloat(bs) + parseFloat(b) + parseFloat(ehv) - p;
    return gs;
}

// Calculate tax amount
function taxes(gs, tr){
    var tv = gs * tr;
    return tv;
}

// Calculate net salary (gross - taxes)
function netSalary(gs, tv){
    var ns = gs - tv;
    return ns;
}

// Export functions for use in other modules
module.exports = {
    monthlyWorkingHours,    
    hourlyRate,
    extraHours,
    grossSalary,
    taxes,
    netSalary
};
