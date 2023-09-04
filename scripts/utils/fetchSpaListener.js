
export const fetchSpaListener = async (link, App) => {
    link.addEventListener('click', (e) => {
        e.preventDefault()
        const url = link.getAttribute('href')
        history.pushState({}, null, url)
        fetch(url, {
            method: "get"
        })
        .then(res => res.text())
        .then(html => {
            let newContent = document.createElement("html")
            newContent.innerHTML = html
            let oldContent = document.querySelector("html") 
            oldContent.querySelector("main").replaceWith(newContent.querySelector("main"))  
            oldContent.querySelector("title").replaceWith(newContent.querySelector("title"))  
            App.checkUrl()
        })
    })
}







