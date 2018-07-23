### Before Getting Started
Make sure you have gone through the Environment set up before hand

#### Preliminary Setup
Create a file called config.js in the server directory. In the server/config.js file export an object that has the properties of secret and corsOptions.
```
module.exports = {
    secret: 'mySecret',
    corsOptions: { /* npm cors options */ }
}
```

#### Install dependencies
To run the server, first install packages using yarn
```
yarn install
```
#### Fire up the database
Next, open up a separate termminal tab and run the mongodb server. 
```
mongod
```
#### Run the tests to ensure they pass by running
```
yarn test
```
#### Run the server
Lastly, run the development server
```
npm run watch 
```
