const api= {
    key:"7baf36a6f9d4f0062e1aba39eae7db17",
}
const searchBox=document.querySelector('.search');
searchBox.addEventListener('keyup', setQuery);
function setQuery(event){
    if(event.keyCode){
        getResults(searchBox.value);
    }
}
function getResults(Query){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${Query}&units=metric&appid=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city=document.querySelector('.location .city');
    city.innerHTML=`${weather.name} , ${weather.sys.country}`;

    let now=new Date();
    let date=document.querySelector('.location .date');
    date.innerHTML= dateBuilder(now);

    let temp=document.querySelector('.current .temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°</span>`;

    let weatherMain=document.querySelector('.current .weather');
    weatherMain.innerHTML=weather.weather[0].main;

    let hiLow=document.querySelector('.hi-low');
    hiLow.innerHTML=`${Math.round(weather.main.temp_min)}°/${Math.round(weather.main.temp_max)}°`;
}
function dateBuilder(d) {
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    return `${day} ${date} ${month} ${year}`
}
