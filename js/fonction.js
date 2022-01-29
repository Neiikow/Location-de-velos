function chrono(min, sec) {
    var time = setInterval(() => {
        sec--;
        if (sec===-1) {
            min=min-1;
            sec = 59;
        }
        if (min===-1) {
            clearInterval(time);
            $("#info-reservation").html(`Réservation expirée`);
        } else {
            $("#info-reservation>span").html(`${min}:${sec}`);
        }
    }, 1000)
    var stop = setInterval(()=>{
        if (storage.signature === true) {
            $("#signer").on('click',() => {
                clearInterval(time);
            });
            clearInterval(stop);
        }
    },100)
}

var nb = 0;

function ajoute() {
    nb = nb+1;
}
function retire() {
    nb = nb-1;
}