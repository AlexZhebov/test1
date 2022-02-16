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
 * Выполняем запрос к файлу с данными в формате JSON, при удачном выполнении запроса выволняем
 * функцию копирования загруженных данных в массив
 */
sendRequest("GET", "/javascript/dataperson.json?")
    .then(data => {copyDownloadPersonInArray(data);})