let TIMEOUTSECONDS = 10 //30 * 60

/**
 * 来月の西暦、月を入手
 * @param year
 * @param month
 * @returns {(*|number)[]}
 */
function nextMonthYearMonth(year, month) {
    // 13月にならないように(monthは[0, 11])
    if(month === 11) {
        year += 1
        month = 0
    } else {
        month += 1
    }
    return [year, month]
}

/**
 * 次の月の時間(秒単位)を取得
 * @param year
 * @param month
 * @returns {number}
 */
function nextMonthTime(year, month) {
    let ym = nextMonthYearMonth(year, month)
    year = ym[0]
    month = ym[1]
    // ms単位なので1/1000
    return new Date(year, month, 1, 0, 0).getTime() / 1000
}

function days(year, month) {
    // 13月にならないように(monthは[0, 11])
    if(month === 11) {
        year += 1
        month = 0
    } else {
        month += 1
    }
    // 来月の0日=当月の末日
    return new Date(year, month, 0, 0, 0).getDate()
}

/**
 * 時間を元にURL生成
 * @param time
 * @returns {string}
 */
function getCalendarURL(time) {
    return "https://t2schola.titech.ac.jp/calendar/view.php?view=month&time=" + time
}

/**
 * 初日の曜日を取得
 * @param year
 * @param month
 * @returns {number} Sunday - Saturday : 0 - 6
 */
function getFirstDateDay(year, month) {
    return new Date(year, month, 1, 0, 0, 0).getDay()
}

/**
 * tdのindexを返す
 * @param year
 * @param month
 * @param date
 * @returns {number}
 */
function tdIndex(year, month, date) {
    let firstDateDay = getFirstDateDay(year, month)
    // 0が日曜日として渡されるが、カレンダー上は右端にあるので7として扱う。
    if(firstDateDay === 0) {firstDateDay = 7}
    return date + (firstDateDay - 1) -1
}

/**
 * 課題が存在するか
 * @param text
 * @returns {boolean}
 */
function hasHomework(text) {
    // イベントなしじゃなかったら課題は存在する
    return !text.match(/イベントなし/)
}

/**
 * テキストから宿題を取得
 * @param text
 * @returns {[]}
 */
function extractHomeworks(text) {
    // 改行+課題名(改行抜き)+スペース+定型文 となる正規表現
    let re = new RegExp('\\n[^\\n]+の提出期限が到来しています。', 'g');
    // Arrayとして抽出
    let homeworkTexts = text.match(re)
    let homeworks = []
    if(homeworkTexts !== null) {
        for(let i = 0; i < homeworkTexts.length; i++) {
            let ex = homeworkTexts[i]
            // 各要素から課題名だけ残す
            homeworks.push(ex.substring(4, ex.length-15))
        }
        return homeworks
    } else {
        return []
    }
}

/**
 * 日付と宿題の行列を返す。同じindexなら日付
 * @param year
 * @param month
 * @param doc
 * @returns {[][]} [dates, homeworks]
 */
function getHomeworks(year, month, doc) {
    console.log(doc)
    let dates = []
    let homeworks = []
    // tdタグの付いたものを全て入手
    let tds = doc.getElementsByTagName("td")
    for(let date = 1; date <= days(year, month); date++) {
        let td = tds.item(tdIndex(year, month, date))
        if(hasHomework(td.innerText)) {
            dates.push(new Date(year, month, date, 0, 0, 0).getTime())
            homeworks.push(extractHomeworks(td.innerText))
        }
    }

    return [dates, homeworks]

}

/**
 * 当月の日付:宿題配列を返す
 * @param year
 * @param month
 */
function currentMonthDatesHomeworks(year, month) {
    // 当月
    let currentMonth_ag = new Date(year, month, 1, 0, 0, 0).getTime() / 1000
    let currentMonthURL = getCalendarURL(currentMonth_ag)

    fetch(currentMonthURL).then(response => response.text()).then(text => {
        let currentMonth_dates_homeworks = getHomeworks(year, month, new DOMParser().parseFromString(text, "text/html"))
        // データ保存
        chrome.storage.local.set({
            currentMonthDates: JSON.stringify(currentMonth_dates_homeworks[0]),
            currentMonthHomeworks: JSON.stringify(currentMonth_dates_homeworks[1])
        }, function () {
            console.log('Current Data was set.');
        });

        let dates = currentMonth_dates_homeworks[0]
        let homeworks = currentMonth_dates_homeworks[1]
        // デバッグ用
        if (dates.length >= 1) {
            for (let i = 0; i < dates.length; i++) {
                console.log("In " + new Date(dates[i]).toDateString() + ", there are")
                homeworks[i].forEach(function (homework) {
                    console.log(homework)
                })
            }
        }
    })
}

/**
 * 来月の日付:宿題配列を返す
 * @param year
 * @param month
 */
function nextMonthDatesHomeworks(year, month) {
    // 来月
    let nextMonth_ag = nextMonthTime(year, month)
    let nextMonthURL = getCalendarURL(nextMonth_ag)

    let ym = nextMonthYearMonth(year, month)
    fetch(nextMonthURL).then(response => response.text()).then(text => {
        let nextMonth_dates_homeworks = getHomeworks(ym[0], ym[1], new DOMParser().parseFromString(text, "text/html"))
        // データ保存
        chrome.storage.local.set({
            nextMonthDates: JSON.stringify(nextMonth_dates_homeworks[0]),
            nextMonthHomeworks: JSON.stringify(nextMonth_dates_homeworks[1])
        }, function () {
            console.log('Next Data was set.');
        });

        let dates = nextMonth_dates_homeworks[0]
        let homeworks = nextMonth_dates_homeworks[1]
        // デバッグ用
        if (dates.length >= 1) {
            for (let i = 0; i < dates.length; i++) {
                console.log("In " + new Date(dates[i]).toDateString() + ", there are")
                homeworks[i].forEach(function (homework) {
                    console.log(homework)
                })
            }
        }
    })
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

try {
    chrome.storage.local.get(['calendarDataSaveTimeStamp'], function (result) {
        if (Date.now() - result.calendarDataSaveTimeStamp < TIMEOUTSECONDS * 1000) {
            console.log("Data is already set")
            throw new Error("Data is already set")
        }

        let now = Date.now()
        let year = new Date(now).getFullYear()
        // 0-11 Dateにはそのまま突っ込めばOK
        let month = new Date(now).getMonth()

        // 当月
        chrome.storage.local.get(['currentMonthSaveTimeStamp'], function (result) {
            if (Date.now() - result.currentMonthSaveTimeStamp < TIMEOUTSECONDS * 1000) {
                console.log("Current month data is already set")
                return
            }
            currentMonthDatesHomeworks(year, month)
            chrome.storage.local.set({currentMonthSaveTimeStamp: Date.now()}, function (result) {
            })
        })

        // 来月
        chrome.storage.local.get(['nextMonthSaveTimeStamp'], function (result) {
            if (Date.now() - result.nextMonthSaveTimeStamp < TIMEOUTSECONDS * 1000) {
                console.log("Next month data is already set")
                return
            }
            nextMonthDatesHomeworks(year, month)
            chrome.storage.local.set({nextMonthSaveTimeStamp: Date.now()}, function () {
            })
        })

        chrome.storage.local.set({calendarDataSaveTimeStamp: Date.now()}, function () {
        })

    })
} catch (e) {
    console.log(e)
}