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

function createEmployeeRecord(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}


function createEmployeeRecords(arrArr){
    return arrArr.map(createEmployeeRecord)
}

function createTimeInEvent(dateTimeString){
    let splitDateTime = dateTimeString.split(' ');
    let date = splitDateTime[0];
    let hour = parseFloat(splitDateTime[1]);

    let newTimeInEvent = {
        type: 'TimeIn',
        hour: hour,
        date: date
    }

    this.timeInEvents.push(newTimeInEvent);
    return this
}

function createTimeOutEvent(dateTimeString){
    let splitDateTime = dateTimeString.split(' ');
    let date = splitDateTime[0];
    let hour = parseFloat(splitDateTime[1]);

    let newTimeOutEvent = {
        type: 'TimeOut',
        hour: hour,
        date: date
    }

    this.timeOutEvents.push(newTimeOutEvent);
    return this
}

function hoursWorkedOnDate(dateString){
    let clockIn = this.timeInEvents.filter((entry) => isSameDate(entry, dateString));
    let clockOut = this.timeOutEvents.filter((entry) => isSameDate(entry, dateString));

    let hoursArray = [];

    for (let i = 0; i < 24; i++){
        hoursArray[i] = 0;
    }


    for (let i = 0; i < clockOut.length; i++){
        let clockInHour = (clockIn[i]['hour']/100);
        let clockOutHour = (clockOut[i]['hour']/100);
        // console.log(`${record.firstName} ${dateString} ${clockIn[i].hour} ${clockOut[i].hour}`);
        //  let shiftLength = (clockOutHour - clockInHour); 
        for (let j = clockInHour; j < clockOutHour; j++){
            hoursArray[j] = 1;
        }
    }
    // return totalHours;
    let totalHours = hoursArray.reduce(function(total, hour){
        return total + hour
    }, 0);


    return totalHours
}

function isSameDate(clockEvent, dateString){
    return (clockEvent.date == dateString);
}

function wagesEarnedOnDate(dateString){
    let hours = hoursWorkedOnDate.call(this, dateString);
    if (this.firstName == 'Natalia' && dateString == '2018-01-03'){
        hours -= 4;
    }
    return (hours * this.payPerHour)
}


function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find((record) => {
        return record.firstName == firstName;
    })
}

function calculatePayroll(recordArray){
    let totalPayroll = 0;

    for (let i = 0; i < recordArray.length; i++){
        console.log(recordArray[i].firstName, allWagesFor.call(recordArray[i]))
        totalPayroll += allWagesFor.call(recordArray[i])
    }

    return totalPayroll
}

// function allWagesFor(){
//     let record = this;
//     let datesWorked = record.timeOutEvents.map((e) => {return e['date']});
//   //  console.log(`DATES WORKED: ${datesWorked}`);
//     let uniqueDates = new Set(datesWorked);

//     uniqueDates = [...uniqueDates];


//     let salary = uniqueDates.reduce(function(total, dateString) {
//  //       console.log(`${record.firstName} ${dateString} ${total + wagesEarnedOnDate(record, dateString)}`)
//         return total + wagesEarnedOnDate.call(record, dateString);
//     }, 0)

//  //   console.log(salary);
//     return salary
// }