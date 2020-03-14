/* Your Code Here */

function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array){
   return array.map( array =>
    createEmployeeRecord(array));
}

function createTimeInEvent(string){
    let timeArray = string.split(' ');
    let obj = {
        type: "TimeIn",
        hour: parseInt(timeArray[1]),
        date: timeArray[0]
    }
    this.timeInEvents.push(obj);
    return this;
}

function createTimeOutEvent(string){
    let timeArray = string.split(' ');
    let obj = {
        type: "TimeOut",
        hour: parseInt(timeArray[1]),
        date: timeArray[0]
    }
    this.timeOutEvents.push(obj);
    return this;
}

function hoursWorkedOnDate(string){
    let timeIn = this.timeInEvents.find(function(e){
        return e.date === string
    }).hour;
    let timeOut = this.timeOutEvents.find(function(e){
       return e.date === string
    }).hour;
    return (timeOut-timeIn)/100;
}

function wagesEarnedOnDate(string){
    let hours = hoursWorkedOnDate.call(this, string);
    return hours * this.payPerHour;
}

function calculatePayroll(array){
    let allWages = array.map( employee => 
        allWagesFor.call(employee)
    );
    let total = allWages.reduce((sum, number)=> sum+number);
    return total;
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(function(employee){
        return employee.firstName === firstName
    });
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