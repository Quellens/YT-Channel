var easy = new Audio();
easy.src = "ja%20easy.mp3";
var elem1 = document.getElementById("easy")
elem1.addEventListener("mouseover", ()=>{
    easy.play();
    neutral.pause();
    heftich.pause();
    controls.pause();
})

var neutral = new Audio();
neutral.src = "neutral.mp3";
var elem2 = document.getElementById("neutral")
elem2.addEventListener("mouseover", ()=>{
    neutral.play();
    easy.pause();
    heftich.pause();
    controls.pause();
})

var heftich = new Audio();
heftich.src = "heftig%20ey.mp3";
var elem3 = document.getElementById("heftich")
elem3.addEventListener("mouseover", ()=>{
    heftich.play();
    easy.pause();
    neutral.pause();
    controls.pause();
    
})

var controls = new Audio();
controls.src = "controls.mp3";
var elem4 = document.getElementById("controls")
elem4.addEventListener("mouseover", ()=>{
    controls.play();
    heftich.pause();
    neutral.pause();
    easy.pause();
})


var riggler = document.getElementById("riggler");
riggler.volume= 0.5;

var bool = false;
var mutebutton = document.getElementById("mute")
mutebutton.addEventListener("click",()=>{
    if(bool){
    riggler.volume = 0;
    mutebutton.innerHTML = "Stummschaltung aufheben"; 
    heftich.pause(); neutral.pause(); easy.pause(); controls.pause();
    heftich.volume = 0; neutral.volume = 0; easy.volume =0; controls.volume = 0;
    } else{
    riggler.volume = 0.5;
    mutebutton.innerHTML = "Stummschalten";
    heftich.volume = 1;
    neutral.volume = 1;
    easy.volume =1;
    controls.volume = 1;
    }
   bool = !bool;
})

var mobiledevice = ((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1));
if(mobiledevice){
   elem4.style.visibility = "hidden";
   document.querySelector("h1").style.fontSize = "50px";
}

