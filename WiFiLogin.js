if(location.href === "https://wlanauth.noc.titech.ac.jp/") {
    AccountURL = chrome.extension.getURL('Account.txt');
    let AxmlHttp = new XMLHttpRequest();
    AxmlHttp.open("GET", AccountURL, true);
    AxmlHttp.send(null);
    AxmlHttp.onload = function () {
        // 学籍番号入力
        document.getElementsByName("username").item(0).value = AxmlHttp.responseText;
    }
    let PasswordURL = chrome.extension.getURL('Password.txt');
    let PxmlHttp = new XMLHttpRequest();
    PxmlHttp.open("GET", PasswordURL, true);
    PxmlHttp.send(null);
    PxmlHttp.onload = function () {
        // パスワード入力
        document.getElementsByName("password").item(0).value = PxmlHttp.responseText;
        // OKボタンクリック
        document.getElementsByName("Submit").item(0).click();
    }
} else if (location.href === "https://wlanauth.noc.titech.ac.jp/fs/customwebauth/failure.html?switch_url=https://wlanauth.noc.titech.ac.jp/login.html&ap_mac=64:16:8d:ee:8e:40&wlan=TokyoTech&statusCode=5") {
    location.href = "https://wlanauth.noc.titech.ac.jp/"
}