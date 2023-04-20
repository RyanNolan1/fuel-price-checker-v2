# Project Name

fuel-price-checker-v2

# Project Description

This is a tiny app to compare fuel prices in fuel stations near to an entered post code, the user can sort by different types of fuel, fuel prices and distance from the given postcode.

# Installation

1. Clone the repository to your local machine.
2. Run `npm install` to install the project dependencies.

# Set Up

1. Get an API key from ukvehicledata.co.uk
2. Edit the .env-example file in the main directory, remove the example API key and insert your own then remove "-example" from the file name. Like this:

- `API_KEY=[insert your API key here]`
- `PORT=8080`

4. once the .env is edited and saved type "npm start" in the terminal to start the server.
5. you will see a message in the terminal "Server started on port 8080" to show that the server is started.
6. Finally open index.html to use the app.

# Using the App

1. Enter the postcode you would like to search for in the text input field
2. Click on the different types of fuel to filter by fuel type
3. Click "Sort By Distance" to order the list of fuel stations by nearest first
4. Click "Sort By Price" to order the list of fuel stations by cheapest fuel first

Please note only post codes with an "A" will work with the free API key
