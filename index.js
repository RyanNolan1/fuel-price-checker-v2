require("dotenv").config();

const api_key = process.env.API_KEY;

fetch(`https://uk1.ukvehicledata.co.uk/api/datapackage/FuelPriceData?v=2&api_nullitems=1&auth_apikey=${api_key}&key_POSTCODE=BB185AJ`)
.then(response => response.json())
.then(data => console.log(data.Response.DataItems.FuelStationDetails))
.catch(error => console.log(error));