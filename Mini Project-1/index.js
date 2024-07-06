const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]")
const userContainer=document.querySelector(".main-conatiner")

const grantAccessContainer=document.querySelector(".grant-location-container")

const searchForm=document.querySelector("[data-searchForm]")
const loadingScreen=document.querySelector(".loading-container")
const userInfo=document.querySelector(".user-info-container")

let currentTab=userTab;
const API_KEY="6385bdf609957a0480a4c6788e5dd214";
currentTab.classList.add("current-tab")

function switchTab(clickedtab){
    if(clickedtab!=currentTab){
        currentTab.classList.remove("current-tab");
        currentTab=clickedtab;
        currentTab.classList.add("current-tab")

        if(searchForm.classList.contains("active")){
            //search tab par abhi hai, userTab par jana hai
            searchForm.classList.remove("active");
            userInfo.classList.remove("active");
            loadingScreen.classList.add("active");
        }else{
            loadingScreen.classList.remove("active");
            userInfo.classList.remove("active");
            searchForm.classList.add("active");
            getFromSessionStorage();
        }
    }

}
userTab.addEventListener("click",()=>{
    switchTab(userTab);
})
searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
})