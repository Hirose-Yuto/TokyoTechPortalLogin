/**
 * 第nクォーターと書かれているか
 * @param element
 * @returns {boolean}
 */
function isQuarterElement(element) {
    let re = new RegExp("第\\dクォーター")
    return re.test(element.textContent)
}

/**
 * 現在の年度をゲット
 * @returns {number}
 */
function getAcademicYear() {
    let month = new Date(Date.now()).getMonth() + 1
    if(month >= 4) {
        return new Date(Date.now()).getFullYear()
    } else {
        return new Date(Date.now()).getFullYear() - 1
    }
}

/**
 * 各クォーターの初日時間を取得
 * @param element
 * @returns {number}
 */
function getFirstDateTime(element) {
    let re = new RegExp("\\d+月\\d+日")
    let firstDate = re.exec(element.textContent)[0]
    let year = getAcademicYear()
    let month = parseInt(new RegExp("\\d+月").exec(firstDate)[0].slice(0, -1))
    let day = parseInt(new RegExp("\\d+日").exec(firstDate)[0].slice(0, -1))

    if(month >= 4) {
        return new Date(year, month-1, day).getTime()
    } else {
        return new Date(year + 1, month-1, day).getTime()
    }
}

chrome.storage.local.get(['latestGottenSchedule'], function(result) {
    // スケジュールを持ってる年度
    let latestGottenSchedule = result.latestGottenSchedule
    // 取得済みの場合
    if (latestGottenSchedule !== null && new Date(latestGottenSchedule + 1, 4, 1).getTime() >= Date.now()) {
        return
    }
    console.log("I'm getting the schedule.")
    let scheduleTable = document.getElementsByClassName("section spSection01").item(0).getElementsByTagName("div")
    let quarters = []
    for (let i = 0; i < scheduleTable.length - 1; i++) {
        if (isQuarterElement(scheduleTable.item(i))) {
            quarters.push(getFirstDateTime(scheduleTable.item(i + 1)))
        }
    }
    chrome.storage.local.set({quarters: quarters}, function () {console.log(quarters)})
    chrome.storage.local.set({latestGottenSchedule: getAcademicYear()}, function () {console.log(getAcademicYear())})
})
