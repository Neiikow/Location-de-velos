class Station {
    constructor(station) {
        this.station = station;
    }
    initMarqueur() {
        const divElt = $("<div>");
        divElt.attr({
            id : this.station.number,
            class : "station"
        });
        divElt.css({
            fontSize: '12px'
        });
        if (this.station.status === 'OPEN') {
            if (this.station.available_bikes>0) {
                divElt.toggleClass("dispo");
            } else {
                divElt.toggleClass("indispo");
            }
        } else {
            divElt.toggleClass("work");
        }
        return divElt;
    }
    posMarqueur() {
        const pos = ol.proj.fromLonLat([this.station.position.lng, this.station.position.lat]);
        const marqueur = new ol.Overlay({
            position: pos,
            element: document.getElementById(this.station.number)
        });
        map.map.addOverlay(marqueur);
    }
    focus(marqueur) {
        $('.focus').toggleClass('focus');
        marqueur.toggleClass("focus");
    }
}