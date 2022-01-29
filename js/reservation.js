class Reservation {
    constructor(nom, prenom, min, sec){
        this.nom = nom;
        this.prenom = prenom;
        this.id = '';
        this.adresse = '';
        this.places = '';
        this.reste = '';
        this.etat = '';
        this.min = min;
        this.sec = sec;
        this.signature = false;
        this.initLocal();
        this.afficher();
    }
    initLocal() {
        const local = new Local(this.nom, this.prenom);
        local.afficher();
        $("#reserver").on('click',()=>{
            local.actualiser();
        });
    }
    initSession(id, status) {
        const session = new Session(id, status);
        const rep = session.getStation();
        this.adresse = rep[0];
        this.places = rep[1];
        this.reste = rep[2];
        this.etat = rep[3];
        this.id = rep[4];
        session.details(this.adresse, this.places, this.reste, this.etat);
    }
    afficher() {
        $("#reserver").on('click',(e)=>{
            if ($("input[name|='nom']").val() && $("input[name|='prenom']").val()) {
                if (this.reste>0) {
                    this.signer();
                    $("#signer").on('click',()=>{
                        if (this.signature === true) {
                            this.changeMarqueur();
                            chrono(this.min, this.sec);
                            $(".reste").text(this.reste-1);
                            $('#signature').remove();
                            $("#info-reservation").html(`
                            Vélo réservé à la station ${this.adresse} 
                            par ${this.prenom} ${this.nom}<br>
                            Temps restant <span>${this.min}:${this.sec}</span>`);
                            this.signature = false;
                        }
                    });
                }
                e.preventDefault();
            }
        });
    }
    signer() {
        $('#signature').remove();
        const signature = new Signature($("#form").width(),'100','lightblue');
        signature.initDiv();
        signature.signeCanvas();
    }
    changeMarqueur() {
        const marqueur = $('.station');
        marqueur.removeClass("reservee");
        const reservee = $(`#${this.id}`);
        reservee.toggleClass("reservee");
        map.afficheCouleurs();
    }
}