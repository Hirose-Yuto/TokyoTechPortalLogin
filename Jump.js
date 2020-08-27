//login画面へ飛ぶ
location.href = "https://portal.nap.gsic.titech.ac.jp/GetAccess/Login?Template=userpass_key&AUTHMETHOD=UserPassword&GAREASONCODE=-1&GARESOURCEID=resourcelistID2&GAURI=https://portal.nap.gsic.titech.ac.jp/GetAccess/ResourceList&Reason=-1&APPID=resourcelistID2&URI=https://portal.nap.gsic.titech.ac.jp/GetAccess/ResourceList";

// var timeoutMessage = "default";
// chrome.storage.local.get({timeout:"Nope"}, function (items) {
//     timeoutMessage = items.timeout;
// });
// window.alert(timeoutMessage);
//
// if(location.href === "https://secure.ocw.titech.ac.jp/ocwi/timeout.html") {
//     chrome.storage.local.set(
//         {
//             timeout: "true"
//         },
//         function () {}
//     );
//     window.alert("Timeout")
//     //login画面へ飛ぶ
//     location.href = "https://portal.nap.gsic.titech.ac.jp/GetAccess/Login?Template=userpass_key&AUTHMETHOD=UserPassword&GAREASONCODE=-1&GARESOURCEID=resourcelistID2&GAURI=https://portal.nap.gsic.titech.ac.jp/GetAccess/ResourceList&Reason=-1&APPID=resourcelistID2&URI=https://portal.nap.gsic.titech.ac.jp/GetAccess/ResourceList";
// }
// if (location.href === "https://portal.nap.gsic.titech.ac.jp/GetAccess/ResourceList" && timeoutMessage === "true"){
//     chrome.storage.local.set(
//         {
//             timeout: "false"
//         },
//         function () {}
//     );
//     window.alert("Resource")
//     // ocw-iへ帰還
//     location.href = "https://secure.ocw.titech.ac.jp/ocwi/index.php"
// }
