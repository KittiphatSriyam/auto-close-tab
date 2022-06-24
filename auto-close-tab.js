let url = window.location.href

function setTabActive(oldToken, tokenArray, futureDate, url, timeout = false) {
    tokenArray = { tab: [...oldToken.tab] }
    if (!timeout) {
        tokenArray.tab.push({ exp: futureDate, url })
    }
    window.localStorage.setItem('urlActive', JSON.stringify(tokenArray))
}

const minutesToAdd = 1;
const currentDate = new Date();
const futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000).toLocaleString();

const storageSTr = localStorage.getItem('urlActive')
let oldToken = {
    tab: []
}
let tokenArray = {
    tab: []
}
if (storageSTr && storageSTr != null && storageSTr != undefined && storageSTr != '') {
    oldToken = JSON.parse(storageSTr)
    oldToken.tab = oldToken.tab.filter((data) => {
        return data.url.toLowerCase() != url.toLowerCase() || (data.url.toLowerCase() == url.toLowerCase() && new Date(data.exp) > new Date())
    })

    if (oldToken.tab.length > 0) {
        for (const i in oldToken.tab) {
            if (oldToken.tab[i].url.toLowerCase() == url.toLowerCase()) {
                oldToken.tab[i].exp = futureDate
                setTabActive(oldToken, tokenArray, futureDate, url , false)
            }
        }
   
    } else {
        setTabActive(oldToken, tokenArray, futureDate, url, true)
        alert('Session Time Out.');
        window.close();
    }
}





setTabActive(oldToken, tokenArray, futureDate, url , false)