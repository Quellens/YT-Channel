const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
var x;
var y; 
var dx = 1.75;
var dy = 1.75;
var increment = 0;
var vlimit = 15;
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
healing_potion.src = "healing_potion.png";
var riggler = new Image();
riggler.src = "Riggler.png";

canvas.width = innerWidth - 4;
canvas.height = innerHeight - 4;
var backgroundMusic = new Audio();
backgroundMusic.src = "audio/Summer%20Vibes%20with%20D%C3%A4vid.mp3";
backgroundMusic.loop = true;
backgroundMusic.play();
backgroundMusic.volume =0.5;
var dead1 = new Audio(); dead1.src = "audio/dead1.mp3";
var dead2 = new Audio(); dead2.src = "audio/dead2.mp3";
var dead3 = new Audio(); dead3.src = "audio/dead3.mp3";
var dead4 = new Audio(); dead4.src = "audio/dead4.mp3";
var dead5 = new Audio(); dead5.src = "audio/dead5.mp3";
var dead6 = new Audio(); dead6.src = "audio/dead6.mp3";
var dead7 = new Audio(); dead7.src = "audio/dead7.mp3"; 
var dead8 = new Audio(); dead8.src = "audio/dead8.mp3";
var dead9 = new Audio(); dead9.src = "audio/dead9.mp3";
var dead10 = new Audio(); dead10.src = "audio/dead10.mp3";
var dead11 = new Audio(); dead11.src = "audio/dead11.mp3";
var dead12 = new Audio(); dead12.src = "audio/dead12.mp3";
var dead13 = new Audio(); dead13.src = "audio/dead13.mp3";
var dead14 = new Audio(); dead14.src = "audio/dead14.mp3";
var deadarr = [dead1,dead2,dead3,dead4,dead5,dead6,dead7,dead8,dead9,dead10,dead11,dead12,dead13,dead14];



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
        this.dx = Math.random() * 0.65 + 0.35;
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

var rigglerx = canvas.width / 2;
var rigglery = canvas.height / 2;
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
    c.fillText("Score: " + count,20,40);
    c.font = "bold 35px 'Permanent Marker'"
    c.fill();
    c.closePath();
}

var player;
var enemy;

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
 for(var i =0;i < Math.floor(canvas.width / 20.24 + canvas.height / 10.5); i++){
 var enemysx = randomIntFromRange(30,canvas.width - 30);
 var enemysy =  randomIntFromRange(30,canvas.height - 30);
 var radius = Math.random() * 12 + 6;
 enemy.push(new Enemy(enemysx,enemysy,radius,colors[Math.round(Math.random() * colors.length) ]))
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
       player.radius += 6 * adj; 
       count++;
    }
    
x += dx ;
    
if(rightpressed)
   dx = Math.abs(dy);
if(leftpressed)
   dx=-Math.abs(dy);
   
if(enterpressed && Math.abs(dy) == dy){
dy= -dy - 0.05;
enterpressed = false;
}else if(enterpressed && Math.abs(dy) != dy){
dy= -dy + 0.05;
enterpressed = false;   
}else{
y += dy;
}
    
if(dy > vlimit )
  dy = vlimit;
  
if(dy < -vlimit)
   dy = -vlimit; 
 
if(dy == vlimit || dy == -vlimit){
  player.color = "blue"
enemy.map((enem)=>{
    if(!(enem.dx > dx)||!(enem.dy > dy)){
    enem.dx = enem.dx * 1.0005;
    enem.dy = enem.dy * 1.0005;    
    }
})
}
    

if(player.radius < 1){
    x = canvas.width / 2;
    y = canvas.height /2;
    player.radius = 10;
    deadarr[Math.round(Math.random() * 13)].play();
 gameoverscreen();
}
    
if(y  > canvas.height)
    y =player.radius ;
if( y  < 0)
    y = canvas.height-10;
 if( x  < 0)  
  x = canvas.width-10;
if(x  > canvas.width)
  x = player.radius ;

if(x < rigglerx+35 && y < rigglery+35){
rigglerx -= Math.abs(dy/2.3);
rigglery -= Math.abs(dy/2.3);
drawImageRiggler( riggler, rigglerx, rigglery, 70, 70, Math.atan2(rigglery - y, rigglerx - x) * 180/ Math.PI);
}
if(x > rigglerx+35 && y < rigglery+35){
rigglerx += Math.abs(dy/2.3);
rigglery -= Math.abs(dy/2.3);
drawImageRiggler( riggler, rigglerx, rigglery, 70, 70, Math.atan2(rigglery - y, rigglerx - x) * 180/ Math.PI);
}   
if(x > rigglerx+35 && y > rigglery+35){
rigglerx += Math.abs(dy/2.3);
rigglery += Math.abs(dy/2.3);
drawImageRiggler( riggler, rigglerx, rigglery, 70, 70, Math.atan2(rigglery-y, x - rigglerx) * (180/ Math.PI) - 90 + 2*(-135 - Math.atan2(rigglery-y, x - rigglerx) * (180/ Math.PI) - 90));
} 
if(x < rigglerx+35 && y > rigglery+35){
rigglerx -= Math.abs(dy/2.3);
rigglery += Math.abs(dy/2.3);
drawImageRiggler( riggler, rigglerx, rigglery, 70, 70, Math.atan2(rigglery - y, rigglerx - x) * 180/ Math.PI);
} 
}    

init()
if(state){
animate()
}

function toColor(clr){
c.beginPath()
c.fillStyle = clr;
c.fill()
c.closePath
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
if(shiftpressed)history.back();
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

  
