AccountURL = chrome.extension.getURL('Account.txt');
let AxmlHttp = new XMLHttpRequest();
AxmlHttp.open("GET",AccountURL,true);
AxmlHttp.send(null);
AxmlHttp.onload = function() {
    // 学籍番号入力
    let Account = AxmlHttp.responseText;
    document.getElementsByName("username").item(0).value = Account;
}
let PasswordURL = chrome.extension.getURL('Password.txt');
let PxmlHttp = new XMLHttpRequest();
PxmlHttp.open("GET",PasswordURL,true);
PxmlHttp.send(null);
PxmlHttp.onload = function() {
    // パスワード入力
    let Password = PxmlHttp.responseText;
    document.getElementsByName("password").item(0).value = Password;
    // OKボタンクリック
    document.getElementsByName("Submit").item(0).click();
}