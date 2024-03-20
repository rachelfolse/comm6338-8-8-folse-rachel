const URL = `https://api.openweathermap.org/data/2.5/weather`;
const apiKey = "e30e2daee255c78b9ae1c8f2470383af";
const form = document.querySelector("form");
let weather = document.querySelector("#weather");
let userInput = document.querySelector("#weather-search");

form.onsubmit = (e) => {
	e.preventDefault();

	let locale = userInput.value.trim();
	let queryString = `?q=${locale}&units=imperial&appid=${apiKey}`;
	let fetchURL = `${URL}${queryString}`;

	fetch(fetchURL)
		.then((res) => {
			if (res.status !== 200) {
				userInput.value = "";
				throw new Error(`Location not found`);
			}
			userInput.value = "";
			weather.innerHTML = "";
			return res.json();
		})
		.then((data) => {
			let dateTime = data.dt * 1000;
			let date = new Date(dateTime);
			let timeString = date.toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "2-digit"
			});
			weather.innerHTML = `
				<h2>City: ${data.name}, ${data.sys.country}</h2> 
				<a href="https://www.google.com/maps/search/?api=1&query=${data.coord.lat},${data.coord.lon}" target="_blank">Click to view map</a>
				<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
				<p style="text-transform: capitalize;">Description: ${data.weather[0].description}</p><br>
				<p>Actual Temp: ${data.main.temp}</p>
				<p>Perceived: ${data.main.feels_like}</p>
				<p>Last Updated: ${timeString}</p>
			`;
		})
		.catch((err) => (weather.textContent = err.message));
};