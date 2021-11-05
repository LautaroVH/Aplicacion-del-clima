const container = document.querySelector(".container");
const result = document.querySelector("#result");
const form = document.querySelector("#form");


window.addEventListener("load", () => {
    form.addEventListener("submit", searchWeather);
})

function searchWeather (e) {
    e.preventDefault();

    //validate
    const city = document.querySelector ("#city").value;
    const country = document.querySelector ("#country").value;

    if(city === "" || country === "") {
        // in case of error
        showError("Both slots are obligatory")

        return;
    }

    
    //API

    APIConsult(city, country);
}

function showError (message) {
    const alert = document.querySelector(".bg-red-100");
    if(!alert) {
    //create an alert

    const alert = document.createElement("div");

    alert.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4","py-3", "rounded","max-w-md", "mx-auto", "mt-6", "text-center");

    alert.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${message}</span>
    `;
    container.appendChild(alert);
    
        // quit alert after 5 sec
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

function APIConsult(city, country) {
    
    const appId = "732aee994377cc46800c3aa184c6dc77";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

    Spinner();  //shows loading spinner

    fetch(url)
        .then(answer => answer.json())
        .then(data => {
            cleanHTML();
            
            
            console.log(data);
            if(data.cod === "404") {
                showError("City not found")
                return;
            }

            // Answer in HTML
            showWeather(data);

        })
}

function showWeather(data) {
    const {name, main: { temp, temp_max, temp_min} } = data;

    const celsius = kelvinToCelsius(temp);
    const max = kelvinToCelsius(temp_max);
    const min = kelvinToCelsius(temp_min);
    const cityName = document.createElement('p');
    cityName.textContent = ` Weather in ${name} `
    cityName.classList.add("font-bold", 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${celsius}&#8451;`;             //&#8451 === °C
    actual.classList.add("font-bold", 'text-6xl');

    const maxTemp = document.createElement("p");
    maxTemp.innerHTML = `Max: ${max}&#8451;`;
    maxTemp.classList.add("text-xl");

    const minTemp = document.createElement("p");
    minTemp.innerHTML = `Min: ${min}&#8451;`;
    minTemp.classList.add("text-xl");


    const resultDiv = document.createElement('div');
    resultDiv.classList.add("text-center", 'text-white');
    resultDiv.appendChild(cityName);
    resultDiv.appendChild(actual);
    resultDiv.appendChild(maxTemp);
    resultDiv.appendChild(minTemp);
    result.appendChild(resultDiv);
}

const  kelvinToCelsius = degrees =>  parseInt(degrees - 273.15);            //helper

function cleanHTML () {
    while(result.firstChild) {
        result.removeChild(result.firstChild);
    }
}

function Spinner() {
    cleanHTML();
    const spinnerDiv = document.createElement('div');
    spinnerDiv.classList.add ("sk-fading-circle");

    spinnerDiv.innerHTML= `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;

    result.appendChild(spinnerDiv);
}