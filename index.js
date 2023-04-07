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

function sortByPrice(stationData) {
  priceArray = [];

  stationData.forEach((station) => {
    station.FuelPriceList.forEach((fuel) => {
      if (fuel.FuelType === selectedFuel)
        priceArray.push({
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
  priceArray.sort((a, b) => a.FuelPrice - b.FuelPrice);
  console.log(priceArray);
}
