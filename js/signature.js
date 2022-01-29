class Signature {
    constructor(width, height, bg){
        this.width = width;
        this.height = height;
        this.bg = bg;
    }
    initDiv () {
        const divElt = $("<div>");
        divElt.attr({
            id : "signature"
        });
        divElt.css({
            width : this.width
        });
        $("#form").append(divElt);
        divElt.append(this.initCanvas());
        divElt.append(this.initBtn('reset', 'Effacer'));
        divElt.append(this.initBtn('signer', 'Signer'));
    }
    initCanvas() {
        const canvasElt = $("<canvas>");
        canvasElt.attr({
            id : "canvas",
            width : this.width,
            height : this.height
        });
        return canvasElt;
    }
    initBtn (id, value) {
        const btnElt = $("<button>");
        btnElt.attr({
            id : id
        });
        btnElt.text(value);
        return btnElt;
    }
    signeCanvas() {
        function init(bg) {
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width(), canvas.height());
        }
        const canvas = $('#canvas');
        const offset = canvas.offset();
        const ctx = canvas[0].getContext('2d');
        init(this.bg);
        canvas.mousedown(()=>{
            canvas.mousemove((e)=>{
                const scrollTop = $(window).scrollTop();
                ctx.fillStyle = 'black';
                ctx.beginPath();
                ctx.arc(e.clientX-offset.left, e.clientY-offset.top+scrollTop, 2, 0, 360, false);
                ctx.fill();
                storage.signature = true;
            });
        })
        canvas.mouseup(()=>{
            canvas.off('mousemove');
        })
        $('#reset').on('click',(e)=>{
            init(this.bg);
            storage.signature = false;
            e.preventDefault();
        });
    }
}