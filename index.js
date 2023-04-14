// require("dotenv").config();

const api_key = "";

// process.env.API_KEY;

document.addEventListener("DOMContentLoaded", () => {
  const postCodeInput = document.getElementById("post-code-input");
  const postCodeSubmit = document.getElementById("post-code-submit");
  let selectedFuel;
  let stationData;

  postCodeSubmit.addEventListener("click", () => {
    postCode = postCodeInput.value;

    const buttons = document.querySelectorAll(".button");
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

  let newFuelArray = [];

  function sortByPrice(selectedFuel, stationData) {
    console.log(selectedFuel);
    stationData.forEach((station) => {
      station.FuelPriceList.forEach((fuel) => {
        if (fuel.FuelType === selectedFuel)
          newFuelArray.push({
            Brand: station.Brand,
            County: station.County,
            DistanceFromSearchPostcode: station.DistanceFromSearchPostcode,
            Name: station.Name,
            Street: station.Street,
            Suburb: station.Suburb,
            FuelPrice: fuel.LatestRecordedPrice.InPence,
            FuelType: fuel.FuelType,
          });
      });
    });
    newFuelArray.sort((a, b) => a.FuelPrice - b.FuelPrice);
    displayStations(newFuelArray);
  }

  function displayStations() {
    const stations = newFuelArray.map(
      (station) => `
  <li>
  ${station.Brand}
  ${station.County}
  ${station.DistanceFromSearchPostcode}
  ${station.Name}
  ${station.Street}
  ${station.FuelPrice}
  </li>`
    );

    const stationList = document.querySelector("#station-list");
    stationList.innerHTML = stations.join("");
  }
});

// function sortByDistance(arr) {
//   arr.sort((a, b) => {
//     return a.DistanceFromSearchPostcode - b.DistanceFromSearchPostcode;
//   });
//   displayStations(arr);
// }

// sortByDistance(newFuelArray)

// function sortByDistance(arr) {
//   priceArray = [];

//   stationData.forEach((station) => {
//     station.FuelPriceList.forEach((fuel) => {
//       if (fuel.FuelType === selectedFuel)
//         priceArray.push({
//           Brand: station.Brand,
//           County: station.County,
//           DistanceFromSearchPostcode: station.DistanceFromSearchPostcode,
//           Name: station.Name,
//           Street: station.Street,
//           Suburb: station.Suburb,
//           FuelPrice: fuel.LatestRecordedPrice.InPence,
//           FuelType: fuel.FuelType,
//         });
//     });
//   });
//   priceArray.sort((a, b) => {
//     return a.DistanceFromSearchPostcode - b.DistanceFromSearchPostcode;
//   });
//   displayStations(priceArray);
// }
