require("dotenv").config();

const api_key = process.env.API_KEY;

fetch(
  `https://uk1.ukvehicledata.co.uk/api/datapackage/FuelPriceData?v=2&api_nullitems=1&auth_apikey=${api_key}&key_POSTCODE=BB185AJ`
)
  .then((response) => response.json())
  .then((data) => {
    const stationData =
      data.Response.DataItems.FuelStationDetails.FuelStationList;
    sortByDistance(stationData);
    sortByPrice(stationData);
  })
  .catch((error) => console.log(error));

function sortByDistance(stationData) {
  const sortedByDistance = stationData.sort((a, b) => {
    return a.DistanceFromSearchPostcode - b.DistanceFromSearchPostcode;
  });
  // console.log(sortedByDistance)
}

const selectedFuel = "Diesel";

let fuelTypeArray = [];

function sortByPrice(stationData) {
  stationData.forEach(function (station) {
    const fuelTypes = station.FuelPriceList;
    console.log(station);

    fuelTypes.forEach(function (fuel) {
      if (fuel.FuelType === selectedFuel) {
        console.log(fuel);
      }
    });
  });
}

//     station.FuelPriceList.forEach(function (fuel) {
//       if (fuelType === fuel.FuelType) {
//         priceArray.push(station);
//       }
//     });
//   });
//   const sortedByPrice = priceArray.sort((a, b) => {
//     return a.LatestRecordedPrice.InPence - b.LatestRecordedPrice.InPence;
//   });
//   console.log(sortedByPrice);
