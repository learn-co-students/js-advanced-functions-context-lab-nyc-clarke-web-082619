/* Your Code Here */

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

let createEmployeeRecord = function(record) {
    return {
        firstName: record[0], 
        familyName: record[1], 
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeData){
    return employeeData.map(emp => createEmployeeRecord(emp))
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour),
        date: date
    })
    return this 
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date
    })
    return this 
}

let hoursWorkedOnDate = function(dateStamp){
    let startTime = this.timeInEvents.find(day => day.date === dateStamp )
    let finishTime = this.timeOutEvents.find(day => day.date === dateStamp)
    return (finishTime.hour - startTime.hour) / 100
}

let wagesEarnedOnDate = function(dateStamp){
    return this.payPerHour * hoursWorkedOnDate.call(this, dateStamp)
}

let findEmployeeByFirstName = function(records, firstName) {
    return records.find(rec => rec.firstName === firstName)
}

let calculatePayroll = function(records) {
    return records.reduce(function(memo, pay) { return memo + allWagesFor.call(pay)}, 0)
}

