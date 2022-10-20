$(document).ready(function () {
    $('.phone').inputmask("+38 (999) 999-99-99"); //
});

let rowCounter = 0;

let surname = document.getElementById('surname');
let name = document.getElementById('name');
let secondName = document.getElementById('secondName');

surname.addEventListener('change', () => checkName(surname, 'surnameAlert'));
name.addEventListener('change', () => checkName(name, 'nameAlert'));
secondName.addEventListener('change', () => checkName(secondName, 'secondNameAlert'));

function checkName(field, alert) {
    if (/^[А-ЯЇІЄҐ][а-яїієґ']+$/.test(field.value)) { //
        document.getElementById(alert).style.display = 'none';
    } else {
        document.getElementById(alert).style.display = 'block';
    }
}

let password = document.getElementById('password');
password.addEventListener('change', () => checkPassword(password));

function checkPassword(pass) {
    if (/^[A-Z][a-zA-Z0-9]{5,20}$/.test(pass.value))
        document.getElementById('passwordAlert').style.display = 'none';
    else
        document.getElementById('passwordAlert').style.display = 'block';
}

let birthDate = document.getElementById('birthDate');
birthDate.addEventListener('change', () => checkDate(birthDate));

function checkDate(date) {
    let dateJS = new Date(date.value);
    let gendate = new Date();
    let currentDate = new Date(gendate.getFullYear() + "-" + (gendate.getMonth() + 1) + "-" + gendate.getDate());
    const diffTime = Math.abs(currentDate - dateJS);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays >= 5844)
        document.getElementById('dateAlert').style.display = 'none';
    else
        document.getElementById('dateAlert').style.display = 'block';
}

let table = document.getElementById('dataTable');
let array = [];

$(document).ready(function () {
    $(document).on('submit', '#dataForm',function () {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);
        let cell9 = row.insertCell(8);
        ++rowCounter;
        array.push(rowCounter);

        let input = document.createElement("input");
        input.type = "checkbox";
        input.setAttribute("id", "row" + rowCounter);
        cell1.append(input);
        cell2.innerHTML = String(document.getElementById('surname').value);
        cell3.innerHTML = String(document.getElementById('name').value);
        cell4.innerHTML = String(document.getElementById('secondName').value);
        cell5.innerHTML = String(document.getElementById('email').value);
        cell6.innerHTML = String(document.getElementById('birthDate').value);
        cell7.innerHTML = String(document.getElementById('phone').value);
        cell8.innerHTML = String(document.querySelector('input[name="sex"]:checked').value);
        cell9.innerHTML = String(document.getElementById('group').value);
        document.getElementById("dataForm").reset();
        return false;
    });
});

function delRows() {
    for (let i = array.length - 1; i >=0 ; i--) {
        if (document.getElementById('row' + array[i]).checked === true) {
            table.deleteRow(i+1);
            array.splice(i,1);
        }
    }
}

function duplicateRow() {
    for (let i = 0; i < array.length; i++) {
        if (document.getElementById('row' + array[i]).checked === true) {
            let row = table.insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);
            let cell7 = row.insertCell(6);
            let cell8 = row.insertCell(7);
            let cell9 = row.insertCell(8);
            ++rowCounter;
            array.push(rowCounter);

            let input = document.createElement("input");
            input.type = "checkbox";
            input.setAttribute("id", "row" + rowCounter);
            cell1.append(input);
            cell2.innerHTML = String(table.rows[i+1].cells[1].innerHTML);
            cell3.innerHTML = String(table.rows[i+1].cells[2].innerHTML);
            cell4.innerHTML = String(table.rows[i+1].cells[3].innerHTML);
            cell5.innerHTML = String(table.rows[i+1].cells[4].innerHTML);
            cell6.innerHTML = String(table.rows[i+1].cells[5].innerHTML);
            cell7.innerHTML = String(table.rows[i+1].cells[6].innerHTML);
            cell8.innerHTML = String(table.rows[i+1].cells[7].innerHTML);
            cell9.innerHTML = String(table.rows[i+1].cells[8].innerHTML);
        }
    }
}
