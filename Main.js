if(document.getElementsByName("message3").length==0) {
    //学籍番号とかの方だったら
    AccountURL = chrome.extension.getURL('Account.txt');
    let AxmlHttp = new XMLHttpRequest();
    AxmlHttp.open("GET",AccountURL,true);
    AxmlHttp.send(null);
    AxmlHttp.onload = function() {
        // 学籍番号入力
        let Account = AxmlHttp.responseText;
        document.getElementsByName("usr_name").item(0).value = Account;
    }
    let PasswordURL = chrome.extension.getURL('Password.txt');
    let PxmlHttp = new XMLHttpRequest();
    PxmlHttp.open("GET",PasswordURL,true);
    PxmlHttp.send(null);
    PxmlHttp.onload = function() {
        // パスワード入力
        let Password = PxmlHttp.responseText;
        document.getElementsByName("usr_password").item(0).value = Password;
        // OKボタンクリック
        document.getElementsByName("OK").item(0).click();
    }

}else {
    //マトリクスなら
    var data = 'default';
    var aler = '';
    const textURL = chrome.extension.getURL('Matrix.txt')
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", textURL, true);
    xmlHttp.send(null);
    xmlHttp.onload = function () {
        data = xmlHttp.responseText;

        //マトリクスの座標ゲット
        var tmp = document.getElementsByTagName('th');

        //dataのIndex番号計算
        //英字の番号(0始まり)*7+(数字-1)
        //例：D5 なら，3*7 + (5-1) = 25
        function getIndexNum(codeNum) {
            //1に英字，3に数字
            var eng = tmp.item(codeNum).textContent.toString()[1];
            var num = tmp.item(codeNum).textContent.toString()[3];
            //英字を数字へ変換
            eng = alphabet2int(eng);
            return eng * 7 + (num - 1);
        }

        //英字を数字へ変換
        function alphabet2int(str) {
            var radix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            var digit = radix.length;
            if (!/^[A-Z]+$/.test(str)) {
                throw new Error(str + 'に対する認識可能な数値が見つかりませんでした。');
            }
            return parseInt(str.replace(/./g, function (r) {
                return radix.indexOf(r).toString(digit);
            }), digit);
        }

        //引数は4,6,8
        document.getElementsByName("message3").item(0).value = data[getIndexNum(4)];
        document.getElementsByName("message4").item(0).value = data[getIndexNum(6)];
        document.getElementsByName("message5").item(0).value = data[getIndexNum(8)];
        
        //OKをクリック
        document.getElementsByName("OK").item(0).click();

        //window.alert(aler);
    }
}

