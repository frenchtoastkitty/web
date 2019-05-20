# French Toast Kitty

French Toast Kitty is an application that gives you a variety of ways to interact with your cat token by providing things to do depending on the weather. We wanted to come up with ways on how to interact with your digital goods other than buying and bidding. This repo contains the FE portion of the application. 

A user logs in using Torus (via Google Auth) where they insert a cryptokitty number and are shown a map of their surrounding area with their kitty on their location. Users can then travel with their pets to local points of interest which are queried from the FOAM api. Weather, from MetaWeather, is also displayed over the area to aid the user in choosing locations. The weather state is stored on-chain and updated using Chainlink to pull to real-world data.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


