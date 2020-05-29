AccountURL = chrome.extension.getURL('Account.txt');
let AxmlHttp = new XMLHttpRequest();
AxmlHttp.open("GET",AccountURL,true);
AxmlHttp.send(null);
AxmlHttp.onload = function() {
    let Account = AxmlHttp.responseText;
    document.getElementsByName("usr_name").item(0).value = Account;
}
let PasswordURL = chrome.extension.getURL('Password.txt');
let PxmlHttp = new XMLHttpRequest();
PxmlHttp.open("GET",PasswordURL,true);
PxmlHttp.send(null);
PxmlHttp.onload = function() {
    let Password = PxmlHttp.responseText;
    document.getElementsByName("usr_password").item(0).value = Password;
    document.getElementsByName("OK").item(0).click();
}