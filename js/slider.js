class Slider {
    constructor(){
        this.container = $('.slider_container');
        this.itemContainers = $('.slider_item');
        this.items = $('.item');
        this.itemActif = 0;
        this.itemVisible = 3;
        this.animSpeed = 700;
        this.anim = false;
        this.initClass();
        this.offsetLeft = $('.left:eq(1)').offset().left - $('.left:eq(0)').offset().left;
        this.navigation();
        this.transition();
    }
    initClass() {
        let pos = 'right';
        let zIndex = 1;
        for (let i = 0; i < this.itemContainers.length; i++) {
            this.itemContainers[i].classList.remove('actif', 'right', 'left', 'off');
            if (i === this.itemActif) {
                this.itemContainers[i].classList.add('actif');
                pos = 'left';
            } else {
                this.itemContainers[i].classList.add(pos);
            }
            this.itemContainers[i].style.zIndex = zIndex
            if (pos === 'right') {
                zIndex++
            } else {
                zIndex--
            }
        }
        this.hideItem();
    }
    hideItem() {
        const left = $('.left');
        const right = $('.right');
        for (let i = this.itemVisible; i < left.length; i++) {
            left[i].classList.add('off');
        }
        if (right.length>this.itemVisible) {
            for (let i = 0; i < right.length-this.itemVisible; i++) {
                right[i].classList.add('off');
            }
        }
    }
    transition() {
        this.container.css({
            transition: this.animSpeed+'ms'
        });
        this.itemContainers.css({
            transition: this.animSpeed+'ms'
        });
        this.items.css({
            transition: this.animSpeed+'ms'
        });
    }
    navigation(){
        const btn = $('#lecture');
        let rep = setInterval(()=>{this.next()},5000);
        $('#next').on('click',()=>{
            this.next();
        })
        $('#prev').on('click',()=>{
            this.prev();
        })
        btn.on('click',()=>{
            if (btn.html() === '<i class="fas fa-pause"></i>') {
                clearInterval(rep)
                btn.html('<i class="fas fa-play"></i>');
            } else {
                rep = setInterval(()=>{this.next()},5000);
                btn.html('<i class="fas fa-pause"></i>');
            }
        })
        $(window).keydown((e)=>{
            if (e.key === "ArrowRight") {
                this.next();
            }
            if (e.key === "ArrowLeft") {
                this.prev();
            }
        })
    }
    transform() {
        const translateX = this.offsetLeft*this.itemActif
        this.container.css({
            transform: 'translate3d(-'+translateX+'px,0,0)'
        })
    }
    next() {
        if (this.anim === false) {
            this.anim = true;
            if (this.itemActif === this.itemContainers.length-1) {
                this.itemActif = 0;
            } else {
                this.itemActif++;
            }
            this.initClass();
            this.transform();
            setTimeout(()=>{this.anim = false},this.animSpeed);
        } 
    }
    prev() {
        if (this.anim === false) {
            this.anim = true;
            if (this.itemActif === 0) {
                this.itemActif = this.itemContainers.length-1;
            } else {
                this.itemActif--;
            }
            this.initClass();
            this.transform();
            setTimeout(()=>{this.anim = false},this.animSpeed);
        }
    }
}