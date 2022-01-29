class Map {
    constructor(api){
        this.api = api;
        this.stations = [];
        this.map = "";
        this.initMap();
        this.initStations();
    }
    initMap() {
        $('#map').html('');
        this.map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM() }) ],
            view: new ol.View({
                center: ol.proj.fromLonLat([4.85, 45.75]),
                zoom: 14 })
        });
    }
    initStations() {
        ajaxGet(this.api, (reponse)=>{     
            const stations = JSON.parse(reponse);
            for (let i = 0; i < stations.length; i++) {
                this.stations.push(stations[i]);
            }
            this.afficheStations();
        });
    }
    afficheStations() {
        $('#map>.station').remove();
        this.stations.map((station)=>{
            const marqueur = new Station(station);
            const rep = marqueur.initMarqueur();
            $("#map").append(rep);
            marqueur.posMarqueur();
            this.afficheCouleurs();
            rep.on('click', ()=>{
                $('#signature').remove();
                marqueur.focus(rep);
                this.afficheCouleurs();
                if (rep.hasClass('reservee')) {
                    storage.initSession(station.number, 'reservee');
                } else {
                    storage.initSession(station.number);
                }
            });
        });
    }
    afficheCouleurs() {
        var marqueur = $('.station');
        marqueur.css({
            borderRadius : '50%',
            background : 'white',
            minHeight : "15px",
            minWidth : "15px"
        });
        marqueur = $('.dispo');
        marqueur.css({
            border : 'solid 3px green'
        });
        marqueur = $('.indispo');
        marqueur.css({
            border : 'solid 3px red'
        });
        marqueur = $('.work');
        marqueur.css({
            border : 'solid 3px orange'
        });
        marqueur = $(`.focus`);
        marqueur.css({
            border : 'solid 3px blue'
        });
        marqueur = $(`.reservee`);
        marqueur.css({
            border : 'solid 3px purple'
        });
    }
}