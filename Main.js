var data = 'default';
var aler = '';
const textURL = chrome.extension.getURL('Matrix.txt')
var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET",textURL,true);
xmlHttp.send(null);
xmlHttp.onload = function(){
    data = xmlHttp.responseText;


    //マトリクスの座標ゲット
    var tmp = document.getElementsByTagName('td');

    //dataのIndex番号計算
    //英字の番号(0始まり)*7+(数字-1)
    //例：D5 なら，3*7 + (5-1) = 25
    function getIndexNum(codeNum) {
        //7に英字，9に数字
        var eng = tmp.item(codeNum).textContent.toString()[7];
        var num = tmp.item(codeNum).textContent.toString()[9];
       //英字を数字へ変換
        eng = alphabet2int(eng);
        return eng*7 + (num-1);
    }
    //英字を数字へ変換
    function alphabet2int(str) {
        var radix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        var digit = radix.length;
        if (!/^[A-Z]+$/.test(str)) {
            throw new Error('認識可能な数値が見つかりませんでした。');
        }
        return parseInt(str.replace(/./g, function(r) {
            return radix.indexOf(r).toString(digit);
        }), digit);
    }

    //引数は4,5,6
    //document.getElementsByName('message3').value = data[getIndexNum(4)];
    //document.getElementsByName('message4').value = data[getIndexNum(5)];
    //document.getElementsByName('message5').value = data[getIndexNum(6)];
    document.getElementsByName("message3").item(0).value  = data[getIndexNum(4)];
    document.getElementsByName("message4").item(0).value = data[getIndexNum(5)];
    document.getElementsByName("message5").item(0).value = data[getIndexNum(6)];


    //OKをクリック
    document.getElementsByName("OK").item(0).click();

    //window.alert(aler);
}

