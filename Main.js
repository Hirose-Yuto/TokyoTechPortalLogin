if(document.getElementsByName("message3").length===0 && document.getElementsByName("usr_name").length !== 0) {
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

}else if(document.getElementsByName("message3").length!==0){
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
        let tmpo = document.getElementsByTagName('td');
        for(let i = 0; i<tmpo.length;i++) {
            console.log(i + ":" + tmpo.item(i).textContent)
        }

        //dataのIndex番号計算
        //英字の番号(0始まり)*7+(数字-1)
        //例：D5 なら，3*7 + (5-1) = 25
        function getIndexNum(tmp) {
            let engIndex = findEng(tmp)
            let eng = alphabet2int(tmp[engIndex]);
            let num = tmp[engIndex+2]
            //英字を数字へ変換
            return eng * 7 + (num - 1);
        }

        //英字を数字へ変換
        function alphabet2int(str) {
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            return alphabet.indexOf(str);
        }

        // 英字を見つける
        function findEng(tmp) {
            for(let i = 0; i < tmp.length; i++) {
                if(alphabet2int(tmp[i]) !== -1) {
                    return i;
                }
            }
            return 0;
        }

        //引数は4,5,6
        let codenum = [4, 5, 6]
        for(let i = 0; i<3; i++) {
            document.getElementsByName("message" + (i+3).toString()).item(0).value = data[getIndexNum(tmpo.item(codenum[i]).textContent)];
        }

        //OKをクリック
        document.getElementsByName("OK").item(0).click();


    }
}