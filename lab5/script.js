//task1
let a = document.getElementById('length');
let b = document.getElementById('width');

a.addEventListener("change", measures);
b.addEventListener("change", measures);

function measures() {
    if (Number(a.value) > 0 && Number(b.value) > 0) {
        document.getElementById('perimetr').innerHTML = (String)(2 * (Number(a.value) + Number(b.value)));
        document.getElementById('square').innerHTML = (String)(Number(a.value) * Number(b.value));
        document.getElementById('diagonalLength').innerHTML = (String)((Math.sqrt(Math.pow(Number(a.value), 2) + Math.pow(Number(b.value), 2))).toFixed(4));
    } else {
        document.getElementById('perimetr').innerHTML = "Неправильні дані";
        document.getElementById('square').innerHTML = "Неправильні дані";
        document.getElementById('diagonalLength').innerHTML = "Неправильні дані";
    }
}


//task2
let imageShow = document.getElementById('photos');
let imageFullShow = document.getElementById('currentImage');

const images = {
    "images/image1.jpeg": {"name": "Котик 1"},
    "images/image2.jpg": {"name": "Котик 2"},
    "images/image3.jpg": {"name": "Котик 3"},
    "images/image4.jpg": {"name": "Котик 4"},
    "images/image5.jpg": {"name": "Котик 5"}
}

for (let i in images) {
    let img = document.createElement('img');
    img.setAttribute('id', i);
    img.width = 75;
    img.height = 75;
    img.src = i;
    imageShow.append(img)
    img.addEventListener('click', () => showFull(i));
}


function showFull(imgName) {
    imageFullShow.innerHTML = "";
    let img = document.createElement('img');
    img.src = imgName;
    imageFullShow.append(img);
}

//task3
let str = document.getElementById('string');
str.addEventListener("change", () => transliteration(str));

function transliteration(strin) {
    let ua = ['а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я', ' '];
    let translit = ['A', 'B', 'V', 'H', 'G', 'D', 'E', 'Ye', 'Zh', 'Z', 'Y', 'I', 'Yi', 'Y', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', 'Kh', 'Ts', 'Ch', 'Sh', 'Shch', '', 'Yu', 'Ya', ' '];

    let isLowerCase = true;
    let thisstr = strin.value;
    let translitedString = "";


    for (let i = 0; i < thisstr.length; i++) {
        if (!ua.includes(thisstr[i].toLowerCase())) {
            translitedString = "Еееее, бро, де українська???"
            break;
        }
        document.getElementById('transString').style.background = "";
        for (let k = 0; k < ua.length; k++) {
            if (thisstr[i] === thisstr[i].toLowerCase()) {
                isLowerCase = true;
            } else {
                isLowerCase = false;
            }
            if (thisstr[i] === ua[k] && isLowerCase === true) {
                translitedString += translit[k].toLowerCase();
                break;
            } else if (thisstr[i].toLowerCase() === ua[k]) {
                translitedString += translit[k];
                break;
            }
        }
    }
    document.getElementById('transString').innerHTML = translitedString;
}

//task4
let birth = document.getElementById('dateOfBirthday');
birth.addEventListener("change", birthDay);

function birthDay() {
    let week = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота']
    let dateJS = new Date(birth.value);
    let a = parseInt((14 - Number((dateJS.getMonth()) + 1)) / 12);
    let y = dateJS.getFullYear() - a;
    let m = Number((dateJS.getMonth())) + 1 + 12 * a - 2;
    let weekDay = parseInt(((Number(dateJS.getDate())) + y + parseInt(y / 4) - parseInt(y / 100) + parseInt(y / 400) + (31 * m) / 12) % 7);
    document.getElementById('birthDate').innerHTML = week[weekDay];
}