class Session {
    constructor(id, etat){
        this.id = id;
        if (etat) {
            this.etat = etat;
        }
    }
    getStation(){
        const station = map.stations.filter(station => station.number === this.id);
        sessionStorage.setItem("adresse", station[0].address);
        sessionStorage.setItem("places", station[0].bike_stands);
        sessionStorage.setItem("etat", station[0].status);
        sessionStorage.setItem("id", station[0].number);
        sessionStorage.setItem("reste", station[0].available_bikes);
        const liste = [
            sessionStorage.getItem("adresse"),
            sessionStorage.getItem("places"),
            sessionStorage.getItem("reste"),
            sessionStorage.getItem("etat"),
            sessionStorage.getItem("id")
        ];
        return liste;
    }
    details(adresse, places, reste, etat) {
        $('.close').remove();
        const spanElt = $('<span>');
        if (etat === 'CLOSED') {
            spanElt.attr({
                class : "close"
            });
            spanElt.html('<br>Station fermée');
            $('.status').append(spanElt);
        }
        $(".adresse").text(adresse);
        $(".places").text(places);
        if (this.etat) {
            $(".reste").text(reste-1);
        } else {
            $(".reste").text(reste);
        }
    }
}