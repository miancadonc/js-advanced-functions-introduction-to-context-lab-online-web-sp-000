// Your code here

function createEmployeeRecord(employeeDataArray){
    return {
        firstName: `${employeeDataArray[0]}`,
        familyName: `${employeeDataArray[1]}`,
        title: `${employeeDataArray[2]}`,
        payPerHour: employeeDataArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArrays){
    return employeeArrays.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeRecObj, dateStamp){
    // const hour = dateStamp.split(" ")[1]
    // const date = dateStamp.split(" ")[0]
    // employeeRecObj.timeInEvents = (!!employeeRecObj.timeInEvents) ? employeeRecObj.timeInEvents : []
    const [date, hour] = dateStamp.split(" ")
    const newTimeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }
    employeeRecObj.timeInEvents.push(newTimeInEvent)

    return employeeRecObj
}

function createTimeOutEvent(employee, dateStamp){
    const [date, hour] = dateStamp.split(" ")
    const newTimeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }
    employee.timeOutEvents.push(newTimeOutEvent)

    return employee
}

function hoursWorkedOnDate(employee, date){
    const dateTimeIn = employee.timeInEvents.find(event => event.date === date)
    const dateTimeOut = employee.timeOutEvents.find(event => event.date === date)
    return (dateTimeOut.hour - dateTimeIn.hour)/100
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee){
    const datesWorkedOn = employee.timeInEvents.map(event => event.date)

    return datesWorkedOn.reduce(function(total, date){
        return total + wagesEarnedOnDate(employee, date)
    }, 0)
}

function findEmployeeByFirstName(employeeArray, firstName){
    return employeeArray.find(e => e.firstName === firstName)
}

function calculatePayroll(employeeArray){
    return employeeArray.reduce(function(total, e){
        return total + allWagesFor(e)
    }, 0)
}