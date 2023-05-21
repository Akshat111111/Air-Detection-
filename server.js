// Air quality index 

let apikey=config.API_KEY;

// Fetch air quality index  

const fetchaqi = async (city,state,country) =>{
     await fetch("https://api.airvisual.com/v2/city?city="+city+"&state="+state+"&country="+country+"&key="+apikey)
    .then((res) => res.json())
    .then((res) => display(res.data));
}

// display data 

const display = (data) =>{
    const {aqius}=data.current.pollution;
    console.log(aqius);
    document.querySelector('.aq').innerHTML=aqius;
    if (0<=aqius && aqius<=50) 
    {
        document.getElementById('display').style.backgroundColor="green";
        document.querySelector('.level').innerHTML="Good";
    } 
    else if(51<=aqius && aqius<=100)
    {
        document.getElementById('display').style.backgroundColor="yellow";
        document.querySelector('.level').innerHTML="Moderate";
    }
    else if(101<=aqius && aqius<=150)
    {
        document.getElementById('display').style.backgroundColor="orange";
        document.querySelector('.level').innerHTML="Unhealthy and Sensitive Groups";
    }
    else if(151<=aqius && aqius<=200)
    {
        document.getElementById('display').style.backgroundColor="red";
        document.querySelector('.level').innerHTML="Unhealthy";
    }
    else if(201<=aqius && aqius<=300)
    {
        document.getElementById('.display').style.backgroundColor="purple";
        document.querySelector('.level').innerHTML="Very Unhealthy";
    }
    else if(aqius>=301)
    {
        document.getElementById('.display').style.backgroundColor="maroon";
        document.querySelector('.level').innerHTML="Hazardous";
    }
}

// search data 

const search = () =>{
    
    fetchaqi(document.querySelector(".city").value,document.querySelector(".state").value,document.querySelector(".country").value);

}


document.querySelector('.search-btn').addEventListener("click",function (){
    document.querySelector('.aq').style.display="block";
    search();
})





// Major Pollutants

var latval;
var lonval;

var apiid=config.API_ID;

// getting user location 

const getUserLocation =()=>{
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(onPositionGather,onPositionError);
    } else {
        
        onPositionError({message:"Can't access location."})
    }
}

const onPositionGather = (pos)=>{
    let lat=pos.coords.latitude.toFixed(4);
    let lon=pos.coords.longitude.toFixed(4);
    latval=lat;
    lonval=lon;
    getAirquality(lat,lon);
}

const getAirquality = async (lat,lon)=>{
     await fetch("https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat="+lat+"&lon="+lon+"&appid="+apiid)
     .then((res)=>res.json())
     .then((data)=>setvalue(data))
    
}



const setvalue = (data)=>{
    const {co}=data.list[0].components;
    const {nh3}=data.list[0].components;
    const {no}=data.list[0].components;
    const {no2}=data.list[0].components;
    const {o3}=data.list[0].components;
    const {pm2_5}=data.list[0].components;
    const {pm10}=data.list[0].components;
    const {so2}=data.list[0].components;

    document.querySelector('.o3').innerHTML=o3+" μg/mᶟ";
    document.querySelector('.co').innerHTML=co+" μg/mᶟ";
    document.querySelector('.no2').innerHTML=no2+" μg/mᶟ";
    document.querySelector('.pm2').innerHTML=pm2_5+" μg/mᶟ";
    document.querySelector('.so2').innerHTML=so2+" μg/mᶟ";
    
}


const onPositionError = (e)=>{
    errorLabel.innerHTML=e.message
}

getUserLocation();