const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]")
const userContainer=document.querySelector(".main-conatiner")

const grantAccessContainer=document.querySelector(".grant-location-container")

const searchForm=document.querySelector("[data-searchForm]")
const loadingScreen=document.querySelector(".loading-container")
const userInfoContainer=document.querySelector(".user-info-container")

let currentTab=userTab;
const API_KEY="6385bdf609957a0480a4c6788e5dd214";
currentTab.classList.add("current-tab")
//ek kaam pending hai
getFromSessionStorage();

function switchTab(clickedtab){
    if(clickedtab!=currentTab){
        currentTab.classList.remove("current-tab");
        currentTab=clickedtab;
        currentTab.classList.add("current-tab")

        if(searchForm.classList.contains("active")){
            //search tab par abhi hai, userTab par jana hai
            searchForm.classList.remove("active");
            loadingScreen.classList.remove("active");
            userInfoContainer.classList.add("active");
            getFromSessionStorage();
            
        }else{
            loadingScreen.classList.remove("active");
            userInfoContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
    }
}
userTab.addEventListener("click",()=>{
    switchTab(userTab);
})
searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
})

function getFromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active"); 
    }else{
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}
async function fetchUserWeatherInfo(coordinates){
    const {lat, lon}=coordinates;
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");
    try{
        let url="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+API_KEY+"&units=metric";
        const response=await fetch(url);
        const data=await response.json();
        loadingScreen.classList.remove("active");
        searchForm.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    }catch(err){
        loadingScreen.classList.remove("active");
    }

}
function renderWeatherInfo(weatherInfo){
    const cityName=document.querySelector("[data-cityName]");
    const countryIcon=document.querySelector("[data-countryIcon]");
    const weatherDesc=document.querySelector("[data-weathDesc]");
    const weatherIcon=document.querySelector("[data-weatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windSpeed=document.querySelector("[data-windSpeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloud=document.querySelector("[data-cloud]");

    cityName.innerText=weatherInfo?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    weatherDesc.innerText=weatherInfo?.weather?.[0]?.description;
    weatherIcon.src=`https://openweathermap.org/img/wn/${weatherInfo?.weather?.[0]?.icon}@2x.png`;
    temp.innerText=`${weatherInfo?.main?.temp} °C`;
    windSpeed.innerText=`${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText=`${weatherInfo?.main?.humidity} m/s`;
    cloud.innerText=`${weatherInfo?.clouds?.all} m/s`;
}

const grantAccessBtn=document.querySelector("[data-grantAccess]");
grantAccessBtn.addEventListener("click", getLocation);
function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        alert('No geoLocation support available');
    }
}
function showPosition(position){
    const userCoordinates={
        "lat":position.coords.latitude,
        "lon":position.coords.longitude
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const searchInput=document.querySelector("[data-searchInput]");
console.log(searchInput.value);
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    var cityName=searchInput.value;
    console.log("universal",typeof(cityName));
    //fetchSearchWeatherInfo(cityName);
    if(cityName==""){
        return;
    } 
    else{
        console.log("pehle",cityName);
        fetchSearchWeatherInfo(cityName);
        console.log("else block ka",cityName);
    }
})

async function fetchSearchWeatherInfo(cityName){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    console.log(cityName);
    try{
       // let url="https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid=" +API_KEY+ "&units=metric";
        //"https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}"
        console.log("https://api.openweathermap.org/data/2.5/weather?q=$cityName&appid=$API_KEY");
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
        const data=await response.json();
        loadingScreen.classList.remove("active");
        searchForm.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }catch(e){
        alert('No such city exist');
    }
}