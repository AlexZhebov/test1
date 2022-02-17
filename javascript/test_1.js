/** Созаем данных для персон, с функцией вычисления возраста **/
var Person = {
    firstName: "",
    lastName: "",
    city: "",
    dataR: "",
    age() {
        let dp = this.dataR.split("-"); // разделяем дату по точкам на массив
        let today = new Date();
        let year = today.getFullYear();
        return (year - dp[0]);
    }
};

/** Созаем массив в котором хранятся персоны **/
var arrPerson = [];

/** Div c полупрозрачным фоном **/
var bgTransparent = document.getElementById("AllScreenTransparent");

/** Div c полупрозрачным фоном **/
var formAddPerson = document.getElementById("AllScreen");

/**
 * Функция выполнения запроса AJAX
 * @param method - GET или POST
 * @param url - файл от которого получаем запрос
 * @param body - параметры для метода пост в формате JSON
 * @returns {Promise<unknown>} - возвращаемые данные
 */
function sendRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        }

        xhr.onerror = () => {
            reject(xhr.response);
        }

        if ( body === null ) {
            xhr.send();
        } else {
            xhr.send(JSON.stringify(body));
        }

    });
}

/**
 * Функция копирования полученных данных в массив персон
 * @param data - полученные данные
 */
function copyDownloadPersonInArray( data ) {
    for (var i = 0; i < data.length; i++) {
        let p = {};
        p.__proto__ = Person;
        p.firstName = data[i].firstName;
        p.lastName = data[i].lastName;
        p.city = data[i].city;
        p.dataR = data[i].dataR;
        arrPerson.push(p);
    }

    AllPersonToDiv(); // обновим див блок
}

/**
 * Функция вывода всех персон в сообщения
 **/
function alertAllPerson() {
    alert("Количество записей в массиве: " + arrPerson.length);
    for (var i = 0; i < arrPerson.length; i++) {
        alert("№ " + (i + 1) + "\n" + arrPerson[i].firstName + " " + arrPerson[i].lastName +
            " (" + arrPerson[i].city + ") " + ", возраст" + arrPerson[i].age());
    }
}

/**
 * Функция вывода всех персон в таблицу DIV блока
 **/
function AllPersonToDiv() {
    let html = "";
    html = "<table class='table_3' style='margin-top: 50px;'>";
    html += "<tr class='zagolovok'><td>№</td><td>ФИО</td><td>Город</td><td>Дата рождения</td><td>Возраст</td><td>Операции</td></tr>";


    for (var i = 0; i < arrPerson.length; i++) {
        html += "<tr><td>" + (i + 1) + "</td><td class='txtAlignLeft'>" + arrPerson[i].firstName + " " + arrPerson[i].lastName +
            "</td><td>" + arrPerson[i].city + "</td><td>" + reverseDate(arrPerson[i].dataR) +
            "</td><td>" + arrPerson[i].age() + "</td><td><img src='img/edit.png' class='button' onclick='editPerson(" + i +");'>" +
            "<img src='img/delete.png' class='button' onclick='deletePerson(" + i +");'></td></tr>";
    }
    if (arrPerson.length==0) {
        html += "<tr><td colspan='5'>В массиве нет записей</td></tr>";
    }
    html += "</table>";

    document.getElementById("person").innerHTML = html;
}

/**
 * Функция нажаитя кнопки на форме добавления персоны
 */
function cancelPerson() {
    bgTransparent.style.display="none";
    formAddPerson.style.display="none";
}
/**
 * Функция реверса даты
 */
function reverseDate(data) {
    data = data.split("-");
    return data[2]+"."+data[1]+"."+data[0];
}

/**
 * Функция открытия формы для редактирования строки
 * @param i
 */
function editPerson(i) {
    document.getElementById("error").innerHTML = "";
    document.getElementById("index_person").innerHTML = i;
    document.getElementById("addPerson").value = "Редактировать";
    document.getElementById("formZagolovok").innerHTML = "Редактирование персоны";
    document.getElementById("firstName").value = arrPerson[i].firstName;
    document.getElementById("lastName").value = arrPerson[i].lastName;
    document.getElementById("city").value = arrPerson[i].city;
    document.getElementById("dataR").value = arrPerson[i].dataR;

    bgTransparent.style.display="block";
    formAddPerson.style.display="block";
}
/**
 * Функция открытия формы добавления персоны
 */
function openFormPerson() {
    document.getElementById("error").innerHTML = "";
    document.getElementById("index_person").innerHTML = "-1";
    document.getElementById("addPerson").value = "Добавить";
    document.getElementById("formZagolovok").innerHTML = "Добавление персоны";
    bgTransparent.style.display="block";
    formAddPerson.style.display="block";
}
/**
 *  Удаление персоны по индексу из массива
 * @param i - индекс массива
 */
function deletePerson(i) {
    arrPerson.splice(i, 1);
    AllPersonToDiv();
}

/**
 * Функция добавления в массив
 **/
function addPerson() {
    // проверка корректности ввода данных
    var err = document.getElementById("error");
    let p = {};

    p.__proto__ = Person;
    p.firstName = document.getElementById("firstName").value;
    p.lastName = document.getElementById("lastName").value;
    p.city = document.getElementById("city").value;
    p.dataR = document.getElementById("dataR").value;

    if (p.firstName.length < 1) {
        err.innerHTML = "Введите <b>Имя</b> человека <br>";
        return;
    }

    if (p.lastName.length < 1) {
        err.innerHTML = "Введите <b>Фамилию</b> человека <br>";
        return;
    }

    if (p.city.length < 1) {
        err.innerHTML = "Введите <b>Город</b> человека <br>";
        return;
    }
    var id = Number(document.getElementById("index_person").value);
    if (id == -1) {
        arrPerson.push(p);
    } else {
        arrPerson[id].firstName = p.firstName;
        arrPerson[id].lastName = p.lastName;
        arrPerson[id].city = p.city;
        arrPerson[id].dataR = p.dataR;
    }

    cancelPerson();
    AllPersonToDiv(); // обновим див блок

}

/**
 * Выполняем запрос к файлу с данными в формате JSON, при удачном выполнении запроса выволняем
 * функцию копирования загруженных данных в массив
 */
sendRequest("GET", "/javascript/dataperson.json?")
    .then(data => {copyDownloadPersonInArray(data);})