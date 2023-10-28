// var request = new XMLHttpRequest();
// request.open("GET","https://restcountries.com/v2/all");
// request.send();
// request.onload = function(){
//     var result = JSON.parse(request.response);
//   var res = result.filter((ele)=>ele.dollars==="currency")
//   console.log(res)
// }
// function foo() {
//   var res= document.getElementById("first").value;
//    console.log(res);
//    var res1= document.getElementById("middle").value;
//    console.log(res1);
//    var res2= document.getElementById("last").value;
//    console.log(res2);
//    var res3= document.getElementById("email").value;
//    console.log(res3);
//    var res4= document.getElementById("password").value;
//    console.log(res4);
// }


// function lables(tagname, attrname, attrvalue, content) {
//   var ele = document.createElement(tagname);
//   ele.setAttribute(attrname, attrvalue);
//   ele.innerHTML = content;
//   return ele;

// }
// function inputs(tagname, attrname, attrvalue, attrname1, attrvalue1, attrname2, attrvalue2) {
//   var ele1 = document.createElement(tagname);
//   ele1.setAttribute(attrname, attrvalue);
//   ele1.setAttribute(attrname1, attrvalue1);
//   ele1.setAttribute(attrname2, attrvalue2);
//   return ele1;
// }
// function linebreak(tagname) {
//   var br = document.createElement(tagname);
//   return br;
// }
// var firstname = lables("lables", "for", "firstname", "firstname");
// var br = linebreak("br");
// var input = inputs("input", "type", "firstname", "name", "firstname", "id", "firstname");
// var br1 = linebreak("br");
// var middlename = lables("lables", "for", "middlename", "middlename");
// var br2 = linebreak("br");
// var input1 = inputs("input", "type", "middlename", "name", "middlename", "id", "middlename");
// var br3 = linebreak("br");
// var lastname = lables("lables", "for", "lastname", "lastname");
// var br4 = linebreak("br");
// var input2 = inputs("input", "type", "lastname", "name", "lastname", "id", "lastname");
// var br5 = linebreak("br");
// var email = lables("lables", "for", "email", "email");
// var br6 = linebreak("br");
// var input3 = inputs("input", "type", "email", "name", "email", "id", "email");
// var br7 = linebreak("br");
// var password = lables("lables", "for", "password", "password");
// var br8 = linebreak("br");
// var input4 = inputs("input", "type", "password", "name", "password", "id", "password");
// var br9 = linebreak("br");
// var br10 = linebreak("br");
// var input5 = inputs("input", "type", "submit", "name", "submit", "id", "submit");
// document.body.append(firstname, br, input, br1, middlename, br2, input1, br3, lastname, br4, input2, br5, email, br6, input3, br7, password, br8, input4, br9,br10,input5)


var optdiv = document.createElement('div');
optdiv.setAttribute('class', 'tableData')


var cur_page = 0;
var records_per_page = 10;
var max_pages = Math.ceil(100 / records_per_page);

function prev_Page() {
    if (cur_page > 1) {
        changePage(cur_page - 1)
    }
}

function next_Page() {
    if (cur_page < max_pages) {
        changePage(cur_page + 1)
    }
}

function changePage(num) {
    if (num < 1) num = 1;
    if (num > max_pages) num = max_pages;

    var startPoint = (num - 1) * max_pages;
    var endPoint = (num) * max_pages;

    cur_page = num;
    CreateDataTable(startPoint, endPoint);

    if (num === 1) {
        document.getElementById('prev').style.visibility = "hidden";
    } else {
        document.getElementById('prev').style.visibility = "visible";
    }

    if (num === max_pages) {
        document.getElementById('next').style.visibility = "hidden";
    } else {
        document.getElementById('next').style.visibility = "visible";
    }
}


function CreateDataTable(start, end) {
    optdiv.innerHTML = " ";
    var request = new XMLHttpRequest();
    var url = "https://gist.github.com/rvsp/add40254aa126f045837fa5b51f47f1f";

    request.open('GET', url, true);
    request.send();

    request.onload = function() {
        var data = JSON.parse(this.response);

        var table = document.createElement('table');
        table.setAttribute('class', 'dataTable');
        table.id = "DataTable";

        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');

        var tr1 = document.createElement('tr');
        var th1 = document.createElement('th');
        th1.innerHTML = "Id";

        var th2 = document.createElement('th');
        th2.innerHTML = "Name";

        var th3 = document.createElement('th');
        th3.innerHTML = "E-Mail";

        optdiv.append(table);
        table.append(thead, tbody);
        thead.append(tr1);
        tr1.append(th1, th2, th3);

        for (let i = start; i < end; i++) {
            let tr2 = document.createElement('tr');

            let td1 = document.createElement('td');
            td1.innerHTML = data[i]["id"];
            let td2 = document.createElement('td');
            td2.innerHTML = data[i]["name"];
            let td3 = document.createElement('td');
            td3.innerHTML = data[i]["email"];

            tr2.append(td1, td2, td3);
            tbody.append(tr2);
        }

        console.log(cur_page);
    }



}

//------------------pagination

var d = document.createElement('div');
d.setAttribute('class', 'anchorlist');

var prev = document.createElement('a');
prev.href = `javascript:prev_Page()`;
prev.id = "prev";
prev.innerHTML = "&laquo;";

var next = document.createElement('a');
next.href = `javascript:next_Page()`;
next.id = "next";
next.innerHTML = "&raquo;";

var arr = createAnchorList();


function createAnchorList() {
    var ar = [];
    for (let i = 1; i <= 10; i++) {

        var a = document.createElement('a');
        a.href = `javascript:changePage(${i})`;
        a.innerHTML = i;
        if (i === 1) {
            a.setAttribute('class', 'active');
        }
        ar.push(a);
    }
    return ar;
}

var heading = document.createElement('div');
heading.innerHTML = "PAGINATION"
heading.setAttribute('class', 'heading');


document.body.append(heading, optdiv, d);
d.append(prev, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9], next);

changePage(1);
