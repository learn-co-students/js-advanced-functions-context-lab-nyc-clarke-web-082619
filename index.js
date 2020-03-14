/* Your Code Here */

function createEmployeeRecord(arr){
    let record = {};
    record.firstName = arr[0]
    record.familyName = arr[1]
    record.title = arr[2];
    record.payPerHour = arr[3];
    record.timeInEvents = [];
    record.timeOutEvents = [];
    return record;
}

function createEmployeeRecords(arr){
    return arr.map(createEmployeeRecord);
}

function createTimeInEvent(time){
    let hour = parseInt(time.split(" ")[1],10);
    let date = time.split(" ")[0];
    let timeInRecord = {type: "TimeIn", hour: hour, date: date};
    this.timeInEvents.push(timeInRecord);
    return this;
}

function createTimeOutEvent(time){
    let hour = parseInt(time.split(" ")[1],10);
    //let minute = time.split(" ")[1].substring(2);
    let date = time.split(" ")[0];
    let timeOutRecord = {type: "TimeOut", hour: hour, date: date};
    this.timeOutEvents.push(timeOutRecord);
    return this;
}

function hoursWorkedOnDate(record){
    let timeInRecord = this["timeInEvents"].find(function(elem){

        return elem.date === record;
    });

    let timeOutRecord = this["timeOutEvents"].find(function(elem){
        return elem.date === record;
    });
    return (timeOutRecord.hour - timeInRecord.hour)/100;
}

function wagesEarnedOnDate(record){
    return hoursWorkedOnDate.call(this,record)*this.payPerHour;
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

function calculatePayroll(arr){
    let wages = arr.map(elem => {
        return allWagesFor.call(elem);
    });

    return wages.reduce((acc,cv) => acc + cv);
}

function findEmployeeByFirstName(arr, name){
    return arr.find(elem => {
        return elem.firstName === name;
    });
}