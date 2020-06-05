const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
var x;
var y; 
var dx = 2.5;
var dy = 2.5;
var blackx;
var blacky;
var increment = 0;
var vlimit = 14.5;
var state = true;
var colors = ["#FFDC00","#FF851B", "#A61f0f", "#F7EE3D"];
var backgroundcolors = ["dimgray", "#2F3147", "#35AF23","#DDDDDD","#7FDCFF", "#82744b"]
document.body.style.backgroundColor = backgroundcolors[Math.floor(Math.random() * backgroundcolors.length)];
var rightpressed = false;
var leftpressed = false;
var enterpressed = false;
var shiftpressed = false;
var count = 0;

var healing_potion = new Image();
healing_potion.src = "../healing_potion.png"
var riggler = new Image();
riggler.src = "Riggler.png";

canvas.width = innerWidth - 4;
canvas.height = innerHeight - 4;
var backgroundMusic = new Audio();
backgroundMusic.src = "audio/Astronomia%20with%20D%C3%A4vid.mp3";
backgroundMusic.loop = true;
backgroundMusic.play();
backgroundMusic.volume = 0.6;
var dead = new Audio();
dead.src = "audio/dead"+ Math.round(randomIntFromRange(0,14)) +".mp3";

addEventListener('resize', () => {
  canvas.width = innerWidth - 4;
  canvas.height = innerHeight - 4;
  init();
})

function keyDownHandler(event){
if (event.keyCode == 39 || event.keyCode == 68)
    rightpressed = true;
if (event.keyCode == 37 || event.keyCode == 65) 
    leftpressed = true;
if (event.keyCode == 32)
    enterpressed = true;
if(event.keyCode == 16)
    shiftpressed = true; 
}

function keyUpHandler(event){
    if(event.keyCode == 37 || event.keyCode == 65)
    leftpressed = false;
    if(event.keyCode == 39 || event.keyCode == 68)
    rightpressed = false;
    enterpressed = false;
    shiftpressed = false;
}

document.addEventListener('keydown',keyDownHandler,false);
document.addEventListener('keyup', keyUpHandler,false);

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function distance(x1,y1,x2,y2){
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    return Math.sqrt(Math.pow(xDist,2) + Math.pow(yDist,2))
}

class Player{
  constructor(color,radius){
     this.color = color;
     this.radius = radius;
    }
 draw(){    
 c.beginPath();
 c.arc(x,y,this.radius,0,2*Math.PI);
 c.fillStyle = this.color;
 c.fill();
 c.strokeStyle = "black";
 c.lineWidth = 2;
 c.stroke();
 c.closePath();
}

}

class Enemy{
    constructor(xx,yy,radius,color){
        this.x = xx;
        this.y = yy;
        this.dx = Math.random() * 0.6 + 0.5;
        this.dy = this.dx;
        this.radius = radius;
        this.color = color;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    
    
}

var potionx = randomIntFromRange(healing_potion.width,canvas.width - healing_potion.width);
var potiony = randomIntFromRange(healing_potion.height,canvas.height - healing_potion.height);
function drawPotion(){
    c.beginPath()
    c.drawImage(healing_potion,potionx,potiony)   
    c.closePath()
    if(!state){
    potionx = -canvas.width;
    potiony = - canvas.height;
    }
}

var rigglerx = randomIntFromRange(70,canvas.width - 70)
var rigglery = randomIntFromRange(70,canvas.height - 70)
function drawImageRiggler( image, x, y, w, h, degrees){
  c.save();
  c.translate(x+w/2, y+h/2);
  c.rotate(degrees*Math.PI/180.0);
  c.translate(-x-w/2, -y-h/2);
  c.drawImage(image, x, y, w, h);
  c.restore();
} 

function drawScore(){
    c.beginPath();
    c.fillText("Score: " + count,20,40)
    c.font = "bold 35px 'Permanent Marker'"
    c.fill();
    c.closePath();
}

var player;
var enemy;
var blackEnemy;
function init(){
 var color = "white";
 player = new Player(color,20);
 x = randomIntFromRange(player.radius,canvas.width - player.radius  * 3.5);
 y = randomIntFromRange(player.radius,canvas.height - player.radius * 3.5);
    
// These 3 if-statements indicate the the direction at the beginning
if(x > canvas.width / 2 && y > canvas.height / 2){
    dx = -dx;
    dy = -dy;
} else
if(x < canvas.width / 2 && y > canvas.height / 2){
    dy = -dy;
} else
if(x > canvas.width / 2 && y < canvas.height / 2){
    dx = -dx;
}
    
 enemy = [];
 for(var i =0;i < Math.floor(canvas.width / 27.24 + canvas.height / 12.5); i++){
 var enemysx = randomIntFromRange(30,canvas.width - 30);
 var enemysy =  randomIntFromRange(30,canvas.height - 30);
 var radius = Math.random() * 20 + 4;
 enemy.push(new Enemy(enemysx,enemysy,radius,colors[Math.round(Math.random() * colors.length) ]))
}
 blackEnemy = [];
 for(var i =0;i <4;i++){
 xyBlackEnemy();
 blackEnemy.push(new Enemy(blackx,blacky,30,"black"))    
 }
}

function animate(){
var adj = (canvas.width + canvas.height) / 1987;
c.clearRect(0,0,canvas.width,canvas.height);
requestAnimationFrame(animate);
player.draw();
toColor("black");
player.color = "white"; 
drawPotion();
drawScore();
    
//Enemy Drawing and Rules 
for(var a = 0;a < enemy.length;a++){
   enemy[a].draw();

    if(x < enemy[a].x && y < enemy[a].y){
         enemy[a].dx = -Math.abs(enemy[a].dx);
         enemy[a].dy = -Math.abs(enemy[a].dy);
    }
    
     if(x < enemy[a].x && y > enemy[a].y){
         enemy[a].dx = -Math.abs(enemy[a].dx);
         enemy[a].dy = Math.abs(enemy[a].dy);
    }
     
    if(x > enemy[a].x && y > enemy[a].y){
        enemy[a].dx = Math.abs(enemy[a].dx); 
        enemy[a].dy = Math.abs(enemy[a].dy);
    }
    
    if(x > enemy[a].x && y < enemy[a].y){
        enemy[a].dx = Math.abs(enemy[a].dx); 
        enemy[a].dy = -Math.abs(enemy[a].dy);
    }
 
        enemy[a].x += enemy[a].dx * Math.abs(dy/2.3);
        enemy[a].y += enemy[a].dy * Math.abs(dy/2.3);
    
    
    //collission detection
    if(distance(x,y,enemy[a].x,enemy[a].y) < enemy[a].radius + player.radius){
       player.color = "red";
       player.radius -= 0.1 * adj;
    }   
}
    //collission detection Nr.2
    if(distance(x,y,potionx + healing_potion.width / 2,potiony + healing_potion.height/2) < healing_potion.width){
       potionx = randomIntFromRange(healing_potion.width,canvas.width - healing_potion.width);
       potiony = randomIntFromRange(healing_potion.height,canvas.height - healing_potion.height);
       drawPotion();
       player.color = "green"
       player.radius += 4 * adj; 
       count++;
    }

    //Black Enemy Setup
    increment+=0.3;  
for(var l =0; l < blackEnemy.length; l++){
    blackEnemy[l].draw();
    blackEnemy[l].x += Math.cos(increment);
    blackEnemy[l].y += Math.sin(increment);  
    if( distance(x,y,blackEnemy[l].x,blackEnemy[l].y) - player.radius - 30 < 0){
        dead.play();
      gameoverscreen();   
    }
   
}
    
x += dx ;
    
if(rightpressed)
   dx = Math.abs(dy);
if(leftpressed)
   dx=-Math.abs(dy);
   
if(enterpressed){
dy= -dy * 1.02;
enterpressed = false;
}else{
y += dy;
}
    
if(dy > vlimit )
  dy = vlimit;
  
if(dy < -vlimit)
   dy = -vlimit; 
 
if(dy == vlimit || dy == -vlimit)
  player.color = "blue"  
    
if(
   y + player.radius > canvas.height + 2||
   y - player.radius < 0 ||
   x - player.radius < 0 ||
   x + player.radius > canvas.width + 2 
  )
{   dead.play();
    gameoverscreen()}
    
if(player.radius < 1){
    x = - canvas.width;
    y = - canvas.height;
    player.radius = 10;
    dead.play();
    gameoverscreen();
}
if(x < rigglerx+40 && y < rigglery+40){
rigglerx -= Math.abs(dy/2.15);
rigglery -= Math.abs(dy/2.15);
drawImageRiggler( riggler, rigglerx, rigglery, 80, 80, Math.atan2(rigglery - y, rigglerx - x) * 180/ Math.PI);
}
if(x > rigglerx+40 && y < rigglery+40){
rigglerx += Math.abs(dy/2.15);
rigglery -= Math.abs(dy/2.15);
drawImageRiggler( riggler, rigglerx, rigglery, 80, 80, Math.atan2(rigglery - y, rigglerx - x) * 180/ Math.PI);
}   
if(x > rigglerx+40 && y > rigglery+40){
rigglerx += Math.abs(dy/2.15);
rigglery += Math.abs(dy/2.15);
drawImageRiggler( riggler, rigglerx, rigglery, 80, 80, Math.atan2(rigglery-y, x - rigglerx) * (180/ Math.PI) - 90 + 2*(-135 - Math.atan2(rigglery-y, x - rigglerx) * (180/ Math.PI) - 90));
} 
if(x < rigglerx+40 && y > rigglery+40){
rigglerx -= Math.abs(dy/2.15);
rigglery += Math.abs(dy/2.15);
drawImageRiggler( riggler, rigglerx, rigglery, 80, 80, Math.atan2(rigglery - y, rigglerx - x) * 180/ Math.PI);} 
   
}

function toColor(clr){
c.beginPath()
c.fillStyle = clr;
c.fill()
c.closePath
}

function xyBlackEnemy(){
   blackx = randomIntFromRange(30,canvas.width - 30);
   blacky = randomIntFromRange(30,canvas.height - 30); 

 for(var d =0;distance(x,y,blackx,blacky) - player.radius - 30 < 200;d++){
 blackx = randomIntFromRange(30,canvas.width - 30);
 blacky = randomIntFromRange(30,canvas.height - 30);   
 }     
}

setInterval(function(){
blackEnemy.splice(Math.random() * (blackEnemy.length - 1),1);
xyBlackEnemy();
blackEnemy.push(new Enemy(blackx,blacky,30,"black"))    
},10000)

if(state){
init()
animate()
}

var load=3;
function gameoverscreen(){
requestAnimationFrame(gameoverscreen)
dx =0;
dy =0;
state = false;
var ovX =  canvas.width / 2 - 282;
var ovY = canvas.height /2 - 112.5;
if(enterpressed){
    load--;
    enterpressed = false;
    if(load == 0)
    location.reload();
}
if(shiftpressed){ 
  shiftpressed = false;
  window.location.href = "https://quellens.github.io/YT-Channel/Riggler%20Scud/";
  }
backgroundMusic.pause();
c.beginPath()
c.fillStyle = "white"
c.fillRect(ovX,ovY,562 ,225)
c.fill()
c.fillStyle= "black"
c.fillText("Du hast verloren. Dein Score: " +count ,canvas.width / 2 - 270,canvas.height / 2 -50)
c.fillText("Drück "+ load +"x Space um zu spielen",canvas.width / 2 - 260,canvas.height / 2 + 10)
c.fillText("Drücke Shift um zurückzukehren",canvas.width / 2 - 285,canvas.height / 2 + 70 )
c.fill()
c.closePath()
if(enemy.length > 1){
    enemy.length-=2; 
    enemy.length++;
}  
}


