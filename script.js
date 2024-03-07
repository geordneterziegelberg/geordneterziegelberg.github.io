// slideshow main section
const slideshowImgSrc = ["img/wernerost.jpg", "img/sea1.jpg", "img/sights1.jpg", "img/city2.jpg"]
const slideshowImgBack = document.querySelector(".slideshow-img-back")
const slideshowImgFront = document.querySelector(".slideshow-img-front")    // this img gets a looped opacity
let i = 1   // to change the state of the slideshow
let img = 2 // to change the src of the slideshow img (img=2: first img to changby js is the 3rd of the array)
// menu mobile
const menu = document.querySelector(".menu")
const toggle = document.querySelector(".menu_toggle")
const icon = document.getElementById("menu_icon")
// scroller story
const cardContainer = document.querySelector(".tab-container")
const widthToScroll = cardContainer.children[1].offsetWidth
const arrowLeft = document.querySelector(".left")
const arrowRight = document.querySelector(".right")
// story tabs
const tabContainer = document.querySelector(".tab-container")
const tabLinks = tabContainer.querySelectorAll("a")
const tabPanelContainer = document.querySelector(".tab-panel")
const tabPanel = document.querySelectorAll(".tab-panel > div") //direct child div (if not there is a problem when there is a div in a div)
// img full screen
const imgContainer = document.querySelectorAll(".img-container")
const arrowLeftFullScreen = document.querySelectorAll(".left-full-screen")
const arrowRightFullScreen = document.querySelectorAll(".right-full-screen")
const xMarkFullScreen = document.querySelectorAll(".xmark-full-screen")

// slideshow main section
// its front img gets a looped opacity (0: back img is seen, 1: front img is seen)
// the css animation in "change-img" is 20sec long, the state of the img-src and class gets changed every 10sec
const slideshow = () =>{
    if (i == 1){    // (or case solution)
        slideshowImgFront.classList.add("change-img")
        i = 2
    } else if (i == 2) {
        slideshowImgFront.src = slideshowImgSrc[img];
        (img == slideshowImgSrc.length-1) ? img=0 : img++
        i = 3
    } else if (i == 3) {
        slideshowImgBack.src = slideshowImgSrc[img];
        (img == slideshowImgSrc.length-1) ? img=0 : img++
        slideshowImgFront.classList.remove("change-img")
        i = 1
    }
    console.log(img)
}
window.setInterval(slideshow, 10000)    // change slideshow state every 10 sec

// menu mobile
toggle.addEventListener("click", () => {
    const visibility = menu.getAttribute("data-visible")
    if (visibility ==="false") {
        menu.setAttribute("data-visible", "true")
        icon.className = "fa-solid fa-x fa-xl"
    } else if (visibility === "true") {
        menu.setAttribute("data-visible", "false")
        icon.className = "fa-solid fa-bars fa-xl"
    }
})
// scroller stories
arrowLeft.onclick = () => {
    cardContainer.scrollLeft -= widthToScroll
}
arrowRight.onclick = () => {
    cardContainer.scrollLeft += widthToScroll
}

// tabs

// tabLinks.forEach((tab, index) => {  //shows only first tab at beginning
//     if (index != 0) {   
//         console.log(index)
//         tabPanel[index].setAttribute("hidden", "")
//     }
// })
tabContainer.addEventListener("click", (e) => {
    const clickedTab = e.target.closest("a") //fires only on clicked Links, else = null
    if (!clickedTab) return //returns if null
    // e.preventDefault() //scrolls tabPanel into view
    const activePanelId = clickedTab.getAttribute("href")
    const activePanel = tabPanelContainer.querySelector(activePanelId)

    tabPanel.forEach((panel) => {
        panel.setAttribute("hidden", true) //set all panels on hidden...
    })
    activePanel.removeAttribute("hidden") //...except of the clicked one

    document.querySelector(".activeStory").classList.remove("activeStory")  //changes white backround on active storytab
    clickedTab.firstElementChild.classList.add("activeStory")
})

// img full screen
imgContainer.forEach(container => {
    container.addEventListener("click", (e)=> {
        // img to fullscreen
        const clickedContainer = container.parentElement  //full screen container
        const clickedImg = e.target.closest("a")
        e.preventDefault()
        if (!clickedImg) return
        clickedContainer.classList.toggle("full-screen")
        clickedImg.scrollIntoView({behavior: "instant"})
    })
})
arrowLeftFullScreen.forEach(arrow => {
    arrow.onclick = (e) => {
        const slider = e.target.parentElement.nextElementSibling    //parent: <i> is clicked
        if (!slider) return
        const widthToScroll = slider.children[1].offsetWidth
        slider.scrollLeft -= widthToScroll
    }
})
arrowRightFullScreen.forEach(arrow => {
    arrow.onclick = (e) => {
        const slider = e.target.parentElement.previousElementSibling
        if (!slider) return
        const widthToScroll = slider.children[1].offsetWidth
        slider.scrollLeft += widthToScroll
    }
})
xMarkFullScreen.forEach(xmark => {
    xmark.onclick = () => {
        const fullScreenContainer = document.querySelector(".full-screen")
        fullScreenContainer.classList.remove("full-screen")
        fullScreenContainer.scrollIntoView({behavior: "instant"})
    }
})
