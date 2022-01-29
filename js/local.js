class Local {
    constructor(nom, prenom){
        this.nom = nom;
        this.prenom = prenom;
    }
    afficher() {
        $("input[name|='nom']").val(this.nom);
        $("input[name|='prenom']").val(this.prenom);
    }
    actualiser() {
        localStorage.setItem('nom', $("input[name|='nom']").val());
        localStorage.setItem('prenom', $("input[name|='prenom']").val());
        storage.nom = localStorage.getItem('nom');
        storage.prenom = localStorage.getItem('prenom');
    }
}