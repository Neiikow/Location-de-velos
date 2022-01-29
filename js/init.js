const apiKey = "16f5eea8123f6e5f79d39bda58b2e52c79f773bb";
const ville = "Lyon";
const apiStations = `https://api.jcdecaux.com/vls/v1/stations?contract=${ville}&apiKey=${apiKey}`;
var slider = new Slider();
var map = new Map(apiStations);
var storage = new Reservation(localStorage.getItem('nom'), localStorage.getItem('prenom'), 20, 0);