window.addEventListener("load", () => {
  let long; //longitudinal coordinate
  let lat; // latitudinal coordinate
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let degreeSection = document.querySelector(".degree-sect");
  const degreeSpan = document.querySelector(".degree-sect span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locate => {
      long = locate.coords.longitude;
      lat = locate.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/053a07baae7a9705774f34b9af207226/${lat},${long}`;
      fetch(api)
        .then(data => {
          return data.json();
        })
        .then(respond => {
          console.log(respond);
          const { temperature, summary, icon } = respond.currently;
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = respond.timezone;
          //change to celsius
          let celsius = (temperature - 32) * (5 / 9);
          setIcons(icon, document.querySelector(".icon"));
          //changing from fahrenheit to celsius
          degreeSection.addEventListener("click", () => {
            if (degreeSpan.textContent === "fahr.") {
              degreeSpan.textContent = "cel.";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              degreeSpan.textContent = "fahr.";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    h1.textContent = "Please allow location access.";
  }
  //defining the icon using skycon
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
