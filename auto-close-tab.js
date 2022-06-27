let initToken = {
    tab: []
}

let oldToken = {
    tab: []
}
let tokenArray = {
    tab: []
}

const minutesToAdd = 5;

function setTabActive(oldToken = initToken, tokenArray = initToken , futureDate, url, timeout = false) {
    tokenArray = { tab: [...oldToken.tab] }
    if (!timeout) {
        tokenArray.tab.push({ exp: futureDate, url })
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
            for (const i in oldToken.tab) {
                if (oldToken.tab[i].url.trim().toLowerCase() == url.trim().toLowerCase()) {
                    if(new Date(oldToken.tab[i].exp) > new Date()){
                        oldToken.tab[i].exp = futureDate
                        setTabActive(initToken, oldToken, futureDate, url, false)
                        return false
                    } else{
                        delete oldToken.tab[i]
                        setTabActive(initToken, oldToken, futureDate, url, true)
                        alert('Session Time Out.');
                        window.close();
                        return false
                    }           
                }
            }

        }
    }

    setTabActive(oldToken, tokenArray, futureDate, url, false)
}

main()

//setTimeout(()=>{
//    main()
//}, minutesToAdd * (1000 * 60))
