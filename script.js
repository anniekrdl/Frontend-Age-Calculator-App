function IsNotEmpty(inputValue) {

    return inputValue.trim() != "";

}

function showIsEmpty(inputField) {
    var errorColor = getComputedStyle(document.documentElement).getPropertyValue('--light-red');

    //Input border
    var input = inputField.getElementsByTagName('input')
    if (input) {
        console.log("input exists")
        console.log(input)
        for (var x = 0; x < input.length; x++) {
            console.log(x)
            input[x].style.borderColor = errorColor;
        }
    }

    var label = inputField.getElementsByTagName('label')[0];
    label.style.color = errorColor;

    var div = inputField.getElementsByTagName('div')[0];
    div.style.visibility = 'visible';
    div.innerHTML = "This field is required";

}

function showInvalidInput(inputField, text) {
    var errorColor = getComputedStyle(document.documentElement).getPropertyValue('--light-red');

    //Input border
    var input = inputField.getElementsByTagName('input')
    if (input) {
        console.log("input exists")
        console.log(input)
        for (var x = 0; x < input.length; x++) {
            console.log(x)
            input[x].style.borderColor = errorColor;
        }
    }

    var label = inputField.getElementsByTagName('label')[0];
    label.style.color = errorColor;

    var div = inputField.getElementsByTagName('div')[0];
    div.style.visibility = 'visible';


    div.innerHTML = text;
}

function showNoError(inputField) {
    var blackColor = getComputedStyle(document.documentElement).getPropertyValue('--off-black');

    var input = inputField.getElementsByTagName('input')
    if (input) {
        console.log("input exists")
        console.log(input)
        for (var x = 0; x < input.length; x++) {
            console.log(x)
            input[x].style.borderColor = blackColor;
        }
    }

    var label = inputField.getElementsByTagName('label')[0];
    label.style.color = blackColor;

    var div = inputField.getElementsByTagName('div')[0];
    div.style.visibility = 'hidden';

}

function checkYear() {
    var yearInput = document.getElementById('date_year').value;
    var date = new Date();
    var currentYear = date.getFullYear();
    var groupYear = document.getElementById('groupYear');

    if (yearInput != '' & yearInput <= currentYear) {
        showNoError(groupYear);
        return true
        console.log("valid year")
    } else if (yearInput === '') {
        showIsEmpty(groupYear);
    } else {
        showInvalidInput(groupYear, "Must be in the past")

    }

}

function checkMonth() {
    var monthInput = document.getElementById('date_month').value;
    var groupMonth = document.getElementById('groupMonth');


    if (monthInput != '' & monthInput <= 12 & monthInput >= 1) {
        showNoError(groupMonth);
        return true
        console.log("valid month")
    } else if (monthInput === '') {
        showIsEmpty(groupMonth);
    } else {
        showInvalidInput(groupMonth, "Must be a valid month")

    }
}

function checkDay() {
    var dayInput = document.getElementById('date_day').value;
    var monthInput = document.getElementById('date_month').value;
    var yearInput = document.getElementById('date_year').value;

    var groupDay = document.getElementById('groupDay');

    console.log("dayInput is " + dayInput)


    var maxDays;

    // Bepaal het maximale aantal dagen afhankelijk van de huidige maand
    switch (parseInt(monthInput)) {
        case 2: // Februari
            // Controleer of het huidige jaar een schrikkeljaar is
            if ((yearInput % 4 === 0 && yearInput % 100 !== 0) || yearInput % 400 === 0) {
                maxDays = 29; // Schrikkeljaar
            } else {
                maxDays = 28; // Geen schrikkeljaar
            }
            break;
        case 4: // April
        case 6: // Juni
        case 9: // September
        case 11: // November
            maxDays = 30;
            break;
        default:
            maxDays = 31;
    }

    if (dayInput != '' & parseInt(dayInput) <= maxDays & parseInt(dayInput) >= 1) {
        showNoError(groupDay);
        return true
        console.log("valid day")
    } else if (dayInput === '') {
        showIsEmpty(groupDay);
    } else {
        showInvalidInput(groupDay, "Must be a valid day")
    }


}

function calculateNumber() {
    var dayInput = document.getElementById('date_day').value;
    var monthInput = document.getElementById('date_month').value;
    var yearInput = document.getElementById('date_year').value;
    var birthdate = new Date(yearInput, monthInput, dayInput);
    var today = new Date();


    var years = today.getFullYear() - birthdate.getFullYear();
    var months = today.getMonth() - birthdate.getMonth();
    var days = today.getDate() - birthdate.getDate();
    // If the birthdate month and day are after the current month and day,
    // subtract one year from the age


    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        if (months === 0) {
            months = 11;
        } else {
            months = 12 + months;
        }
        days = 30 + days;
    }

    return {
        years: years,
        months: months,
        days: days
    };
}



function onCalculateAge() {
    if (checkDay() & checkMonth() & checkYear()) {
        console.log(calculateNumber())
        document.getElementById('days').innerHTML = calculateNumber().days
        document.getElementById('months').innerHTML = calculateNumber().months
        document.getElementById('years').innerHTML = calculateNumber().years

    }

}
