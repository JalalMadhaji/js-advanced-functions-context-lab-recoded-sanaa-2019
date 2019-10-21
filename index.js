/* Your Code Here */
let createEmployeeRecord = empArr => {
    return {
        firstName: empArr[0],
        familyName: empArr[1],
        title: empArr[2],
        payPerHour: empArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployees = arr => {
  return arr.map(function(e){
    return createEmployeeRecord(e);
  });
}

let createEmployeeRecords = empArrs => {
    let empCollection = empArrs.map(emp => {
        return createEmployeeRecord(emp);
    });
    return empCollection;
};

let createTimeInEvent = (timeStamp) => {
    let timeObj = {
        type: "TimeIn",
        hour: parseInt(timeStamp.split(" ")[1]),
        date: timeStamp.split(" ")[0]
    };
    return this.timeInEvents.push(timeObj);
  //   let newObj = Object.assign({},this);
  // let timeParts = timeStamp.split(' ');
  // let timeInObj = {
  //   type:"TimeIn",
  //   date: timeParts[0],
  //   hour: parseInt(timeParts[1])
  // }
  // newObj.timeInEvents.push(timeInObj);
  // return newObj;
}

let createTimeOutEvent = timeStamp => {
    let timeObj = {
        type: "TimeOut",
        hour: parseInt(timeStamp.split(" ")[1]),
        date: timeStamp.split(" ")[0]
    };
    return this.timeOutEvents.push(timeObj);
};

let hoursWorkedOnDate = dateStamp => {
    let start = this.timeInEvents.find(rec => rec.date === dateStamp);
    let end = this.timeOutEvents.find(rec => rec.date === dateStamp);

    let startHour = start.hour.toString();
    let endHour = end.hour.toString();

    let startH =
        startHour.length === 3
            ? parseInt(startHour.substring(0, 1))
            : parseInt(startHour.substring(0, 2));
    let endH =
        endHour.length === 3
            ? parseInt(endHour.substring(0, 1))
            : parseInt(endHour.substring(0, 2));

    let sum = endH - startH;
    return sum;
};

let wagesEarnedOnDate = dateStamp => {
    let pay = hoursWorkedOnDate(dateStamp);
    return pay * this.payPerHour;
};

// let allWagesFor = () => {
//     let sum = [];
//     for (let i = 0; i < this.timeInEvents.length; i++) {
//         sum.push(wagesEarnedOnDate(this.timeInEvents[i].date));
//     }
//     let final = sum.reduce((acc, cur) => acc + cur, 0);
//     return final;
// };

let findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(function(emp) {
        return emp.firstName == firstName;
    });
};

let calculatePayroll = array => {
    return array.reduce((m, e) => m + allWagesFor(e), 0);
};

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
