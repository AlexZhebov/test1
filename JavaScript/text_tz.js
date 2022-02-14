var type_=['Text field', 'Number field']; // массив с типами
var op=[['Containing', 'Exactly matching', 'Begins with', 'Ends with'], ['Equal', 'Greater than', 'Less than']]; // массив с условиями
var fb=[[0,0,'']]; // первоначальный массив на отправку
//alert(fb.length);

// функция вставляющая по массиву fb данные в div find_block
function create_find_block()
{
    var find_block=document.getElementById('find_block');
    find_block.innerHTML="";
    // пробегаем по всему массиву fb
    for (var i=0; i<fb.length; i++)
    {
        // вставляем в переменную html выпадающий список с типом поиска
        let html="<select name='type' onchange='ChangeType("+i+", this)'>";
        let sel="";
        for (var j=0; j<type_.length; j++)
        {
            if (fb[i][0]==j){sel=" selected";} else {sel="";}
            html+="<option value='"+j+"'"+sel+">"+type_[j]+"</option>";
        }
        html+="</select>";

        // формируем выпадающий список с условием поиска
        html+="<select name='operator' onchange='ChangeOperator("+i+", this)'>";
        for (var j=0; j<op[fb[i][0]].length; j++)
        {
            if (fb[i][1]==j){sel=" selected";} else {sel="";}
            html+="<option value='"+j+"'"+sel+">"+op[fb[i][0]][j]+"</option>";
        }
        html+="</select>";

        // вставляем поле ввода с текстом поиска
        if (fb[i][0]==1) {num=" onkeydown='keyDown(event);'";} else {num="";}
        html+="<input type='text' name='value' value='"+fb[i][2]+"' onchange='ChangeValue("+i+", this)'"+num+">";

        // если количесвто элементов больше 1, согласно условия добавляем кнопочку удалить
        if (fb.length>1) {html+="<a href='#' onClick='delFb("+i+")'>X</a><br>";} else {html+="<br>";}

        find_block.innerHTML+=html;
    }
    // если условий поиска меньше 10 выводим кнопку добавить условие
    if (fb.length<10) {find_block.innerHTML+="<a href='#' onClick='AddFb();'><b>+</b> Add condition</a><br>";}
}

// функция удаления строки поиска, и обновление блока
function delFb(x)
{
    fb.splice(x,1);
    create_find_block();
}

// функция обработки события при смене типа
function ChangeType(row, value)
{
    fb[row][0]=value.value;
    fb[row][1]=0;
    fb[row][2]='';
    create_find_block();
}

// функция обработки события при смене условия поиска
function ChangeOperator(row, value)
{
    fb[row][1]=value.value;
}

// функция обработки события при изменении текста поиска
function ChangeValue(row, value)
{
    fb[row][2]=value.value;
}

// функция обработки кнопки добавить строку
function AddFb()
{
    fb[fb.length]=[0,0,''];
    create_find_block();
}

// функция обратобки кнопки очистить форму
function clearFb()
{
    fb.length=1;
    fb[0]=[0,0,''];
    create_find_block();
}
// функция формирования данных к отправке
function applyBtn()
{
    var text1=[];
    var number1=[];
    var result='';
    var i=0;

    for (i=0; i<fb.length; i++)
    {
        if (fb[i][0]==0)
        {
            let x=[];
            x[0]=op[0][fb[i][1]];
            x[1]=fb[i][2];
            text1.push(x);
        }
        else
        {
            let x=[];
            x[0]=op[1][fb[i][1]];
            x[1]=fb[i][2];
            if(x[1]=='') {x[1]=0;}
            number1.push(x);
        }
    }
    result="{\n";
    result+="    text: [";
    for (i=0; i<text1.length; i++)
    {
        result+="\n        { operation: '"+text1[i][0]+"', value: '"+text1[i][1]+"' },";
    }
    result+="\n    ],";
    result+="\n    number: [";
    for (i=0; i<number1.length; i++)
    {
        result+="\n        { operation: '"+number1[i][0]+"', value: "+number1[i][1]+" },";
    }
    result+="\n    ],";
    result+="\n}";

    alert(result);
}

function keyDown(event)
{
    // прверяем нажатие кнопок: backspace, delete, tab ? escape
    if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
        // прверяем нажатие кнопок: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) ||
        // прверяем нажатие кнопок: home, end, влево, вправо
        (event.keyCode >= 35 && event.keyCode <= 39))
    {
        // ничего не делаем
        return;
    } else {
        // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
            event.preventDefault();
        }
    }
}

// вызываем функцию формирующую условия поиска
create_find_block();