async function fetchWeatherDetails(){
    try{
        let city="goa";
        let API_key="6385bdf609957a0480a4c6788e5dd214";
        let url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+API_key;
        const response= await fetch(url);
        const data=await response.json();
        
        renderWeatherDetails(data);
        console.log(data);

    }catch(err){
        console.log("can not fetch data");
    }
}
function renderWeatherDetails(data){
        let newPara=document.createElement('h2');
        newPara.textContent=data["main"]["temp"]+ " K";
        document.body.appendChild(newPara);
}
function getCurrentPosition(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        console.log("Geolocation is not supported");
    }
}
function showPosition(position){
    let lat=position.coords.latitude;
    let long=position.coords.longitude;
    console.log(lat, long);
}