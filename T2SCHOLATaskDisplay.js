/**
 * 何Qなのかを取得
 * @returns {number} [0-3]
 */
function getCurrentQuarter(quarters) {
    let now = Date.now()
    for(let i = 0; i < quarters.length ; i++){
        let d = new Date(quarters[i])
        console.log(d)
    }
    console.log(new Date(now))

    for(let i = 0; i < quarters.length - 1; i++) {
        if(quarters[i] <= now && now < quarters[i+1]) {
            console.log(`Its ${i+1} Q.`)
            return i
        }
    }
    console.log("Couldn't specify the quarter.")
    return 0
}

/**
 * 当QのURL取得
 * @returns {string}
 */
function getCurrentQuarterURL(quarters) {
    let quarterElement = document.getElementsByClassName("subcategories quarter").item(0)
    let quarter = quarterElement.getElementsByTagName("a").item(getCurrentQuarter(quarters))
    return quarter.getAttribute("href")
}

/**
 * 課題の期限を取得
 * @param deadline
 * @returns {Date}
 */
function getTaskDeadLine(deadline) {
    try {
        let year = parseInt(new RegExp("\\d+年").exec(deadline)[0].slice(0, -1))
        let month = parseInt(new RegExp("\\d+月").exec(deadline)[0].slice(0, -1)) - 1
        let date = parseInt(new RegExp("\\d+日").exec(deadline)[0].slice(0, -1))
        let hour = parseInt(new RegExp("\\d+:").exec(deadline)[0].slice(0, -1))
        let minute = parseInt(new RegExp(":\\d+").exec(deadline)[0].slice(1))
        return new Date(year, month, date, hour, minute)
    }catch (e){
        console.log(`deadline error : ${e}`)
        console.log(`deadline : ${deadline}`)
        return new Date(2000, 0, 0, 0, 0)
    }
}

/**
 * 締切時間の表示
 * @param taskDeadLine
 * @returns {string}
 */
function getDeadLineDisplay(taskDeadLine) {
    if(taskDeadLine.getTime() === new Date(2000, 0, 0, 0, 0).getTime()) {
        return "期限不明"
    }
    let year = taskDeadLine.getFullYear()
    let month = taskDeadLine.getMonth() + 1
    let date = taskDeadLine.getDate()
    let dayList = ["日", "月", "火", "水", "木", "金", "土"]
    let day = dayList[taskDeadLine.getDay()]
    let hour = taskDeadLine.getHours()
    let minute = taskDeadLine.getMinutes()
    return `${year}年${month}月${date}日(${day})${hour}時${minute}分`
}

/**
 * 課題の残り時間を取得
 * @param deadlineTime
 * @returns {string}
 */
function getRemainingTime(deadlineTime) {
    if(deadlineTime === new Date(2000, 0, 0, 0, 0).getTime()) {
        return "-"
    }

    let dif = Math.floor((deadlineTime - Date.now())/1000)

    let dates = Math.floor(dif / (60*60*24))
    if(dates >= 1) {
        return `あと${dates}日`
    }
    dif -= dates * 60*60*24

    let hours = Math.floor(dif / (60*60))
    if(hours >= 1) {
        return `あと${hours}時間`
    }
    dif -= hours * 60*60

    let minutes = Math.floor(dif / 60)
    if(minutes >= 1) {
        return `あと${minutes}分`
    }

    return "もう1分もありません！"
}

/**
 * 課題テーブルを生成
 */
function generateTaskTable() {
    let mainBox = document.getElementById("region-main-box")
    mainBox.innerHTML = `<br><br><table id='taskTable' >\n
        <thead>\n
            <tr>\n
                <th colspan=\"4\">課題一覧</th>\n
            </tr>\n
        </thead>\n
        <tbody>\n
            <tr>\n
              <th id="0" >締め切り</th>\n
               <th >課題名</th>\n
               <th >教科</th>\t\n
               <th >残り時間</th>>\n
            </tr>\n
        </tbody>\n
    </table><br>\n` + mainBox.innerHTML
}

/**
 * 課題テーブルを追加
 * @param courseName
 * @param taskName
 * @param taskPageURL
 * @param courseURL
 * @param taskDeadLine
 * @returns {string}
 */
function getTaskTable(courseName, taskName, taskPageURL, courseURL, taskDeadLine) {
    return `<tr>\n
            <td id="${taskDeadLine.getTime()}">${getDeadLineDisplay(taskDeadLine)}</td>\n
            <td><a href=\"${taskPageURL}\">${taskName}</a></td>\n
            <td><a href="${courseURL}">${courseName}</a></td>\n
            <td >${getRemainingTime(taskDeadLine.getTime())}</td>\n
        </tr>\n`
}

/**
 * 課題を表示
 * @param courseName
 * @param taskName
 * @param taskPageURL
 * @param courseURL
 * @param taskDeadLine
 */
function displayTask(courseName, taskName, taskPageURL, courseURL, taskDeadLine) {
    // データ前処理
    courseName = new RegExp("[^/]+/").exec(courseName)[0].slice(0, -1)

    insertTaskTable(getTaskTable(courseName, taskName, taskPageURL, courseURL, taskDeadLine), taskDeadLine.getTime())
}

/**
 * 課題テーブルを挿入
 * @param taskTableRow
 * @param deadLineTime
 */
function insertTaskTable(taskTableRow, deadLineTime) {
    let taskTableBody = document.getElementById("taskTable").getElementsByTagName("tbody").item(0)

    // 課題がなければそのまま追加
    let taskTables = taskTableBody.getElementsByTagName("tr")
    if(taskTables.length < 2) {
        taskTableBody.innerHTML += taskTableRow
        return
    }

    // idに保存してある時間をもとに挿入位置を決める
    let html = `<tr>\n\t${taskTables.item(0).innerHTML} \n </tr>`
    let done = false
    for(let i = 1; i < taskTables.length; i++) {
        let id = parseInt(taskTables.item(i).getElementsByTagName("td").item(0).getAttribute("id"))
        if(deadLineTime < id && !done) {
            html += taskTableRow
            done = true
        }
        html += `<tr>\n\t${taskTables.item(i).innerHTML} \n </tr>`
    }
    // 最後まで挿入しなかったら最後に入れる
    if(!done) {
        html += taskTableRow
    }

    // 入れ替え
    taskTableBody.innerHTML = html
}

/*
    データセット
    chrome.storage.local.set({key: value}, function() {
        console.log('data was set. ' + key + ' : ' + value);
    });

    データ取り出し
    chrome.storage.local.get(['key'], function(result) {
        console.log('Value currently is ' + result.key);
    });
*/

chrome.storage.local.get(['latestGottenSchedule'], function(result) {
// スケジュールを持ってる年度
let latestGottenSchedule = result.latestGottenSchedule
// 年度未記録 or 過ぎてる
if(latestGottenSchedule == null || new Date(latestGottenSchedule+1, 4, 1).getTime() < Date.now()) {
    window.open("https://www.titech.ac.jp/enrolled/life/schedules/")
    window.alert("再読み込みしてください")
    return
}

// CSS適用
let head = document.head;
let linkElement = document.createElement("link");

linkElement.type = "text/css";
linkElement.rel = "stylesheet";
linkElement.href = chrome.extension.getURL('tableStyle.css');

head.appendChild(linkElement);

generateTaskTable()

chrome.storage.local.get(["quarters"], function (result) {
let quarters = result.quarters

// クォーターごとで読み込む
fetch(getCurrentQuarterURL(quarters)).then(response=>response.text()).then(text => {
//fetch("https://t2schola.titech.ac.jp/course/index.php?categoryid=18").then(response=>response.text()).then(text => {

// クォーターから講義を取得
let quarterDoc = new DOMParser().parseFromString(text, "text/html")
let courses = quarterDoc.getElementsByClassName("coursename")
if(courses.length < 1) {
    console.log("There's no course")
    return
}

// 各講義ごとに課題を取得&表示
for(let i = 0; i < courses.length; i++) {
    let courseURL = courses[i].getElementsByTagName("a").item(0).getAttribute("href")
    let courseName = courses[i].getElementsByTagName("a").item(0).textContent
    console.log(`There is a course, ${courseName}`)

    fetch(courseURL).then(response=>response.text()).then(text => {
    let courseDoc = new DOMParser().parseFromString(text, "text/html")

    let tasks = courseDoc.getElementsByClassName("activity assign modtype_assign ")
    if(tasks.length < 1) {
        console.log("In" + courseName + ", there's no task.")
        return
    }
    for(let j = 0; j < tasks.length; j++) {
        let taskName = tasks.item(j).getElementsByClassName("instancename").item(0).textContent
        let inputs = tasks.item(j).getElementsByTagName("input")
        for(let k = 0; k < inputs.length; k++) {
            // 未達成だったら
            if(inputs.item(k).getAttribute("name") === "completionstate" && inputs.item(k).value === "1") {
                console.log(`In ${courseName}, there is an unfinished task, ${taskName}`)
                let taskPageURL = tasks.item(j).getElementsByClassName("aalink").item(0).getAttribute("href")
                fetch(taskPageURL).then(response=>response.text()).then(text => {
                let taskDoc = new DOMParser().parseFromString(text, "text/html")

                let taskStateRe = new RegExp("評定のために提出済み")
                if(!taskStateRe.test(text)) {
                    let taskDeadLine = getTaskDeadLine(taskDoc.getElementsByTagName("td").item(2).textContent)
                    displayTask(courseName, taskName, taskPageURL, courseURL, taskDeadLine)
                }
                })
            }
        }
    }
    })

}




})
})
});

