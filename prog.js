function getName() {
    num = document.forms["reg"].elements["num"].value * 1;
    len = document.forms["reg"].elements["len"].value * 1;
    lam = document.forms["reg"].elements["lam"].value * 1;
    sigm = document.forms["reg"].elements["lam"].value * 1;
    if (num == "") num = 5;
    if (lam == "") lam = 3;
    if (len == "") len = 8;
    var a = document.getElementById("tasks");
    var b = document.getElementById("roundrobin");
    var c = document.getElementById("tab");
    if (a != undefined) document.getElementById("container").removeChild(a);
    if (b != undefined) document.getElementById("container").removeChild(b);
    if (c != undefined) document.getElementById("container").removeChild(c);
    var a1 = document.createElement('div');
    a1.id = "tasks";
    var b1 = document.createElement('div');
    b1.id = "roundrobin";
    var c1 = document.createElement('table');
    c1.id = "tab";
    document.getElementById("container").appendChild(a1);
    document.getElementById("container").appendChild(b1);
    document.getElementById("container").appendChild(c1);
    function genExp(l) {
        var b = Math.random();
        var a = Math.log(b) / l * (-1);
        return Math.round(a * 10);
    }

    function gaussRand(mean, dev) {
        return Math.abs(Math.round(mean * 1 + dev * Math.cos(2 * Math.PI * Math.random() * Math.sqrt(-2 * Math.log(Math.random())))));
    }

    var lens = new Array(num);
    var times = new Array(num);
    var len_const = new Array(num);
    var len_ex = new Array(num);
    var time_m = new Array(num);
    var is_execute = new Array(num);
    for (var i = 0; i < num * 1; i++) {
        times[i] = genExp(lam);
        lens[i] = gaussRand(len, 10);
        len_const[i] = lens[i];
        is_execute[i] = false;
    }
    times.sort(function f(a, b) {
        return a - b
    });
    for (var i = 0; i < num * 1; i++) {
        var ch = document.createElement('div');
        ch.className = "task";
        ch.id = "t" + i;
        document.getElementById("tasks").appendChild(ch);
        var ti = document.createElement('div');
        ti.className = "tact";
        ti.style.background = "#FFE4B5";
        ti.innerHTML = len_const[i];
        document.getElementById("t" + i).appendChild(ti);
        for (var l = 0; l < times[i]; l++) {
            var s = document.createElement('div');
            s.className = "tact";
            s.style.background = "#FFE4B5";
            document.getElementById("t" + i).appendChild(s);
        }
        for (var j = 0; j < lens[i] * 1; j++) {
            var chch = document.createElement('div');
            chch.className = "tact";
            document.getElementById("t" + i).appendChild(chch);
        }
    }
    function drawSqr(x, y, f, g) {
        var s = document.createElement('div');
        s.style.top = y + "px";
        s.style.left = x + "px";
        s.className = "tact1";
        s.style.border = "black solid 1px";
        if (f == true) {
            s.style.background = "white";
        }
        if (g) {
            s.style.background = "#20B2AA";
        }
        document.getElementById("roundrobin").appendChild(s);
        return s;
    }

    function drawColumn(n, k, x, y) {
        for (var i = 0; i < n; i++) {
            if (i == k) {
                drawSqr(x, y + i * 20, false, false);
            }
            else {
                drawSqr(x, y + i * 20, true, false);
                if (is_execute[i]) {
                    drawSqr(x, y + i * 20, true, true);
                }
            }
        }
    }

    console.log(len_const);
    console.log(times);
    var i = 0;
    while (i < times[0]) {
        drawColumn(num, -1, 20 + 20 * i, 100 + num * 21)
        i++;
    }
    var k = i;
    var flag = true;
    while (flag) {
        var i = 0;
        while (i < num) {
            var l = 2;
            if (lens[i] <= 0) {
                i++;
                continue;
            }
            if (lens[i] <= 2) {
                is_execute[i] = false;
            }
            else {
                is_execute[i] = true;
            }
            if (times[i] > k) {
                is_execute[i] = false;
            }
            if (times[i] > k) {
                i++;
                continue;
            }
            else {
                if (lens[i] == 1) {
                    l = 1;
                }
            }
            if (lens[i] == len_const[i]) {
                time_m[i] = k;
            }
            for (var j = 0; j < l; j++) {
                drawColumn(num, i, 20 + 20 * k, 100 + num * 21);
                k++;
                len_ex[i] = k;
            }
            lens[i] = lens[i] - l;
            i++;
        }
        var sum = 0;
        for (var i = 0; i < num; i++) {
            if (lens[i] <= 0) sum++;
        }
        if (sum == num) {
            flag = false;
        }
    }
    for (var i = 0; i < k; i++) {
        var n = drawSqr(20 + 20 * i, 101 + num * 20 + num * 21, true);
        n.style.border = "#FFE4B5 solid 1px";
        n.style.borderTopColor = "black";
        n.style.background = "#FFE4B5";
        n.innerHTML = " " + i;
    }
    var tab = document.getElementById("tab");
    tab.style.top = 151 + num * 20 + num * 21 + 'px';
    tab.style.left = 50 + "px";
    tab.style.position = "absolute";
    var max = 0;
    for (var i = 0; i < len_ex.length - 1; i++) {
        if (len_ex[i + 1] - len_const[i + 1] > len_ex[i] - len_const[i]) {
            max = len_ex[i + 1] - len_const[i + 1];
        }
        ;
    }
    var max_ = 0;
    for (var i = 0; i < time_m.length - 1; i++) {
        if (time_m[i + 1] > time_m[i]) {
            max_ = time_m[i + 1];
        }
        ;
    }
    tab.innerHTML = "<tr><td>Task Number</td><td>First length</td><td>Real length</td></tr>";
    for (var i = 0; i < num + 1; i++) {
        if (i == num) {
            tab.innerHTML += "<tr id=\"cl" + i + "\"><td>Max downtime/max start time </td></tr>";
            var row = document.getElementById("cl" + i);
            row.innerHTML += "<td>" + max + "</td>";
            row.innerHTML += "<td>" + max_ + "</td>";
            break;
        }
        tab.innerHTML += "<tr id=\"cl" + i + "\"><td>" + (i + 1) + "</td></tr>";
        var row = document.getElementById("cl" + i);
        row.innerHTML += "<td>" + len_const[i] + "</td>";
        row.innerHTML += "<td>" + len_ex[i] + "</td>";
    }
}
/**
 * Created by Lera on 13.03.2015.
 */
