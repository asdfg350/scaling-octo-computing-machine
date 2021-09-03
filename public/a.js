

const number = document.getElementById('number');
const ul = document.getElementById('ul1');
const zuobi = document.getElementById('zuobi');
const jilu = document.getElementById('jilu');
const account = document.getElementById('account');
var now = new Date();
var hour = now.getHours();//得到小时数
var minute = now.getMinutes();//得到分钟数
var second = now.getSeconds();//得到秒数
bReady = true;//按钮的使用状态
const stateList = [
    { state: 'a' },
    { state: 'b' },
    { state: 'c' },
    { state: 'd' },
    { state: 'e' },
    { state: 'f' },
    { state: 'g' },
    { state: 'h' },
]
let value = 10000;

function money() {
    if (bReady) {
        bReady = false;
        if (value > 0) {
            value -= 200;
            number.innerText = value;
            start()
        }
        else {
            swal("你矿没了", "再充点吧");
            bReady = true;
        }
    }
}

function account1(){
    var a='<%=session.getAttribute("account")%>';
   
    
  }

function start() {
    let i = 0;
    //转几圈
    var urls1 = ['24', '16', '32', '40', '48'];
    var element1 = urls1[Math.floor((Math.random() * urls1.length))];
    element1 = parseInt(element1);
    //最后一圈走几格
    var urls2 = ['1', '2', '3', '4', '5', '6', '7', '8', '1', '1', '2', '2', '3', '3', '5', '6', '7', '8'];
    var element2 = urls2[Math.floor((Math.random() * urls2.length))];
    element2 = parseInt(element2);
    element = element1 + element2;
    //循环转圈
    let t = 100;
    let timer = setTimeout(go, t);
    function go() {
        let stateIdx = i % stateList.length;
        ul.className = stateList[stateIdx].state;
        i++;
        if (i < element - 10) {
            timer = setTimeout(go, t);
        } else if (i >= element - 10 && i < element) {

            t += (i - element + 10) * 5;
            timer = setTimeout(go, t);
        }
        else {
            celebrate();
            bReady = true;
        }
    }
}

function jump() {
    window.location.href = "./public/b.html";
}

var TurnToLogin = () => {
    document.getElementById('form_login_div').style.display = "block";
    document.getElementById('form_register_div').style.display = "none";
}
var TurnToRegister = () => {
    document.getElementById('form_register_div').style.display = "block";
    document.getElementById('form_login_div').style.display = "none";
}

function celebrate() {
    let j = element % 8;
    if (j == 1) {
        swal("恭喜您获得了10矿石");
        jilu.innerHTML = jilu.innerHTML + "<p>恭喜你获得10矿石</p>" + hour + ":" + minute;
        value += 10;
        number.innerText = value;
    }
    else if (j == 2) {
        swal("恭喜您获得了20矿石");
        jilu.innerHTML = jilu.innerHTML + "<p>恭喜你获得20矿石</p>" + hour + ":" + minute;
        value += 20;
        number.innerText = value;
    }
    else if (j == 3) {
        swal("恭喜您获得了30矿石");
        jilu.innerHTML = jilu.innerHTML + "<p>恭喜你获得30矿石</p>" + hour + ":" + minute;
        value += 30;
        number.innerText = value;
    }
    else if (j == 4) {
        swal("恭喜您获得了100矿石");
        jilu.innerHTML = jilu.innerHTML + "<p>恭喜你获得100矿石</p>" + hour + ":" + minute;
        value += 100;
        number.innerText = value;
    }
    else if (j == 5) {
        swal("谢谢惠顾");
    }
    else if (j == 6) {
        swal("恭喜您获得了300矿石");
        jilu.innerHTML = jilu.innerHTML + "<p>恭喜你获得300矿石</p>" + hour + ":" + minute;
        value += 300;
        number.innerText = value;
    }
    else if (j == 7) {
        swal("谢谢惠顾");
    }
    else {
        swal("恭喜您获得了ipad 一台");
        jilu.innerHTML = jilu.innerHTML + "<p>恭喜你获得ipad一台</p>" + hour + ":" + minute;
    }
}

$.ajax({
    type: "get",
    url: "localhost:3000/public/a.json", // 这里为后台写入的json文件路径。
    dataType: "json",
    success: function (response) {
    var html = '';
    if (response!==null) {
        html += '<p> '+Response[account]+'</p>';
        $('.user').html(html);
        }
    },
});
