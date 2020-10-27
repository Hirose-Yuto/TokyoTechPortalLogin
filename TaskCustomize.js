// 1〜いくつかまでが課題
taskSpace = document.getElementById("notPresented")
if (taskSpace == null) {
    //課題がない
} else {
    // 日付フォーマット用
    function formatDate (date, format) {
        format = format.replace(/yyyy/g, date.getFullYear());
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
        format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
        return format;
    }
    // 課題あり
    tasks = taskSpace.getElementsByTagName("tr")
    tasks_num = tasks.length-1
    let dayArray = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"]
    for(let i = 1; i < tasks_num+1; i++) {
        // 日時があるところ(後ほど挿入される)
        let taskDateArea = tasks.item(i).getElementsByTagName("td").item(0)
        // 日時を取得
        let taskDate = new Date(taskDateArea.textContent)
        // 曜日を取得
        let taskDay = dayArray[taskDate.getDay()]

        // 現在日時取得
        let tmpNow = new Date();
        // 日付情報だけ
        let today = new Date(tmpNow.getFullYear(), tmpNow.getMonth()+1, tmpNow.getDate())
        let taskOnlyDate = new Date(taskDate.getFullYear(), taskDate.getMonth()+1, taskDate.getDate())
        // 日数の差
        let diff = Math.floor((taskOnlyDate - today) / 86400000)

        // 挿入する文章製作
        let content = formatDate(taskDate, 'yyyy/MM/dd') + taskDay + " " + formatDate(taskDate, 'HH:mm')
        if (diff === 0) {
            content += " 今日が締切です"
        } else {
            content += " 締切まであと" + diff + "日"
        }
        // 挿入
        taskDateArea.innerHTML = content
        // window.alert(content)
    }
}