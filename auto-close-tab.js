let initToken = {
    tab: [],
    showTimeOut: true
}

let oldToken = {
    tab: [],
    showTimeOut: true
}
let tokenArray = {
    tab: [],
    showTimeOut: true
}

const minutesToAdd = 1;

function setTabActive(oldToken = initToken, tokenArray = initToken, futureDate, url, addArray = false) {
    tokenArray = { tab: [...oldToken.tab] }
    if (!addArray) {
        tokenArray.tab.push({ exp: futureDate, url })
        tokenArray.showTimeOut = true
    }
    window.localStorage.setItem('urlActive', JSON.stringify(tokenArray))
}

function main() {

    let url = window.location.href

    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000).toLocaleString();

    const storageSTr = localStorage.getItem('urlActive')

    if (storageSTr && storageSTr != null && storageSTr != undefined && storageSTr != '') {
        oldToken = JSON.parse(storageSTr)

        if (oldToken.tab.length > 0) {
            let isNotExp = []
            let isExist = []
            for (const i in oldToken.tab) {
                if (oldToken.tab[i].url.trim().toLowerCase() == url.trim().toLowerCase()) {
                    if (new Date(oldToken.tab[i].exp) > new Date()) {
                        isNotExp.push(true)
                    } else {
                        oldToken.tab.splice(i, 1)

                        if (oldToken.showTimeOut) {
                            oldToken.showTimeOut = false
                            if (oldToken.tab.length == 0) {
                                oldToken.showTimeOut = true
                            }
                            setTabActive(oldToken, initToken, futureDate, url, true)
                            alert('Session Time Out.');
                        } else {
                            setTabActive(oldToken, initToken, futureDate, url, true)
                        }

                        window.close();
                        return false
                    }
                    isExist.push(true)
                } else {
                    isExist.push(false)
                }
            }

            if (isExist.every((condition) => condition == false)) {
                setTabActive(oldToken, tokenArray, futureDate, url, false)
            }
            if (isNotExp.some((condition) => condition == true)) {
                for (const i in oldToken.tab) {
                    oldToken.tab[i].exp = futureDate
                }
                setTabActive(oldToken, initToken, futureDate, url, true)
            }
        } else {
            setTabActive(oldToken, tokenArray, futureDate, url, false)
        }
    } else {
        setTabActive(oldToken, tokenArray, futureDate, url, false)
    }
}

main()

//setTimeout(()=>{
//    main()
//}, minutesToAdd * (1000 * 60))
