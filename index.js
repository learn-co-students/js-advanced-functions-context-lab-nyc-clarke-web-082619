/* Your Code Here */
function createEmployeeRecord(recordArray) {
    return {
        firstName : recordArray[0],
        familyName : recordArray[1],
        title: recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(recordsArray) {
    return recordsArray.map(record => createEmployeeRecord(record));
}

function createTimeInEvent (date) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.split(" ")[1]),  
        date: date.split(" ")[0]
    });
    return this;    
}

function createTimeOutEvent(date)  {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.split(" ")[1]),  
        date: date.split(" ")[0]
    });
    return this;
}


function hoursWorkedOnDate(date){
    let checkIn = this.timeInEvents.find(d => d.date === date);
    let checkOut = this.timeOutEvents.find(d => d.date === date);
    return (checkOut.hour - checkIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this,date) * this.payPerHour;    
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(recordsArray){
    let sum = 0;
    recordsArray.forEach(record => sum += allWagesFor.call(record))
    return sum;
}

function findEmployeeByFirstName (recordsArray, firstName) {
    return recordsArray.find(record => record.firstName === firstName);
}