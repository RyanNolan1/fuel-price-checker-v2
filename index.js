require("dotenv").config();

const api_key = process.env.API_KEY;


let selectedFuel;
let stationData;

document.addEventListener("DOMContentLoaded", () => {
  const postCodeInput = document.getElementById("post-code-input");

  postCodeInput.addEventListener("change", () => {
    postCode = postCodeInput.value;

    const buttons = document.querySelectorAll(".fuel-button");
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        selectedFuel = this.value;
        sortByPrice(selectedFuel, stationData);
      });
    });

    fetch(
      `https://uk1.ukvehicledata.co.uk/api/datapackage/FuelPriceData?v=2&api_nullitems=1&auth_apikey=${api_key}&key_POSTCODE=${postCode}`
    )
      .then((response) => response.json())
      .then((data) => {
        stationData =
          data.Response.DataItems.FuelStationDetails.FuelStationList;
        sortByPrice(selectedFuel, stationData);
      })
      .catch((error) => console.log(error));
  });
});

function sortByPrice(selectedFuel, stationData) {
  newFuelArray = [];
  if (stationData) {
    stationData.forEach((station) => {
      station.FuelPriceList.forEach((fuel) => {
        if (fuel.FuelType === selectedFuel)
          newFuelArray.push({
            Brand: station.Brand,
            County: station.County,
            DistanceFromSearchPostcode: station.DistanceFromSearchPostcode,
            Name: station.Name,
            Street: station.Street,
            Suburb: station.Suburb ? station.Suburb : station.Town,
            Postcode: station.Postcode,
            FuelPrice: fuel.LatestRecordedPrice.InPence,
            FuelType: fuel.FuelType,
          });
      });
    });
    newFuelArray.sort((a, b) => a.FuelPrice - b.FuelPrice);
    displayStations(newFuelArray);
  }
}

function displayStations(fuelArray) {
  const stations = fuelArray.map(
    (station) => `
      <li>
      <section id="price-container">
      <h1>${station.FuelPrice}p</h1>
      </section>
      <section id="details-container">
      <h2>${station.Brand}</h2>
      ${station.Name}</br>
      ${station.Suburb}</br>
      ${station.Street}</br>
      ${station.Postcode}</br>
      ${station.DistanceFromSearchPostcode} Miles Away</br>
      </section>
      </li>`
  );
  const stationList = document.getElementById("station-list");
  stationList.innerHTML = "";
  stationList.innerHTML = stations.join("");
}

function sortByDistance(newFuelArray) {
  const sortedByDistance = newFuelArray.sort((a, b) => {
    return a.DistanceFromSearchPostcode - b.DistanceFromSearchPostcode;
  });
  displayStations(sortedByDistance);
}

document.addEventListener("DOMContentLoaded", function () {
  const distanceButton = document.getElementById("sort-by-distance");
  distanceButton.addEventListener("click", function () {
    sortByDistance(newFuelArray);
  });

  const priceButton = document.getElementById("sort-by-price");
  priceButton.addEventListener("click", function () {
    sortByPrice(selectedFuel, stationData);
  });
});
