require("dotenv").config();

const api_key = process.env.API_KEY;


fetch(`https://uk1.ukvehicledata.co.uk/api/datapackage/FuelPriceData?v=2&api_nullitems=1&auth_apikey=${api_key}&key_POSTCODE=BB185AJ`)
.then(response => response.json())
.then(data => {
    const stationData = data.Response.DataItems.FuelStationDetails.FuelStationList
    sortByDistance(stationData)
})
.catch(error => console.log(error));



function sortByDistance(stationData) {
    const sortedByDistance = stationData.sort((a, b) => {
        return a.DistanceFromSearchPostcode - b.DistanceFromSearchPostcode
    });
    console.log(sortedByDistance)
}
