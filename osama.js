
const weatherContainer=document.getElementById('weatherContainer');
const searchInput =document.getElementById('site-search');
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
//cities array
let cities =['London','Dubai','Paris','NewYork'];
const ul=document.getElementById('citylist');

  //func fetch city
async function  fetchCityWeather(city){

  console.log("please wait .....")
    document.getElementById('city').innerHTML=' ';
    
    const url = `https://www.metaweather.com/api/location/search/?query=${city}`; //not working when passed a variable
    // const url = `https://www.metaweather.com/api/location/search/?query=paris`;
   let res= await fetch(proxyUrl + url)
      .then((res) => res.json())
      .then((data) => {
        console.log("done fetchCitWeather .....")
        console.log(data);
        
        let apiId = data[0].woeid;                 
        let cityName=data[0].title;                
        document.getElementById('city').innerText=`${cityName}`;

        fetchWeather(apiId)
  })   
}//end fetchCityWeather
//////end fetch functions////

async function  fetchWeather(cityId){

console.log("please wait .....")
  // let urlId = `https://www.metaweather.com/api/location/2487956`;
 let urlId = `https://www.metaweather.com/api/location/${cityId}`;
 let response= await fetch(proxyUrl + urlId)
 .then((response)=>response.json())
 .then((data) =>{

   console.log("done fetchWeather .....")
    document.getElementById('detailsContents').innerHTML=" ";
    for(let i=0 ;i<data.consolidated_weather.length ;i++){
      
      currentDayWether(data.consolidated_weather[i]);
    }
    
  })

}

   function  currentDayWether(infos){
        // document.getElementById('detailsContents').innerHTML=" ";
        const detailsContents=document.getElementById('detailsContents');
        const weatherDiv =document.createElement('div');
        weatherDiv.classList.add('weatherDiv');
        
        const date=document.createElement('div');
        const temperature =document.createElement('div');
        const wind =document.createElement('div');
       
       date.innerText=`${infos.applicable_date}`;
       temperature.innerHTML=`<span class="keySpan">Temperature :</span> ${(infos.the_temp)}&#176 `;
       wind.innerHTML=`<span class="keySpan">Wind : </span>  ${Math.floor(infos.wind_speed)} m/s`;

       //this is to change the background image according to the weather state
       switch(infos.weather_state_name){

        case 'Clear':
        document.body.style.backgroundImage=`url('images/default.jpg')`;
        break;

        case 'Heavy Cloud' :
        document.body.style.backgroundImage=`url('images/heavy.jpg')`;
        break;

        case 'Light Cloud':
        document.body.style.backgroundImage=`url('images/light.jpg')`;
        break;

        case 'Shower':
        document.body.style.backgroundImage=`url('images/shower.jpg')`;
        break;

        default:
          break;

       }//end switch
  
        weatherDiv.appendChild(date);
        weatherDiv.appendChild(temperature);
        weatherDiv.appendChild(wind);

        detailsContents.appendChild(weatherDiv);

}


//create cities 
function createcities(){
  for(let i=0 ;i<cities.length ; i++){
    var city=document.createElement('button');
     city.classList.add('cityButton')
    city.setAttribute('id',`${cities[i]}`);
    city.innerText=`${cities[i]}`;
    city.addEventListener('click', (e) =>{

     
      fetchCityWeather(cities[i])
      
    })
     
    //end onclick
    ul.appendChild(city);
  }
}//end createCities

document.addEventListener("DOMContentLoaded", () => {
  createcities();
  
  //this is to  display a default city information 
  let defaultCity ='Paris';
  fetchCityWeather(defaultCity);

  //this is to display info of searched city 
  
  search.addEventListener('click', (e)=> {
    let citySearched =searchInput.value;
    document.getElementById('detailsContents').innerHTML=" ";
    fetchCityWeather(citySearched);
   
  
  }) //end searchListner

      }); //end DomContentLoad
    
   
