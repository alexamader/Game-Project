
let GRAVITY = 1;
let tanklst = []
let soldierlst = []
let tank1lst = [];
let soldier1lst = [];
let bulletlst = [];
let bullet1lst = [];
let bulletCounter = 0;
let fortress;
let fortress1;
let soldierinput;
let soldier1input;
let tankinput
let tankinput1;
let instruction;
let instruction1;
let button;
let unitCount1 = 0;
let unitCount = 0;
let totalsoldiercount = 0;
let totalsoldier1count = 0;
let totaltankcount = 0;
let totaltank1count = 0 ;

function setup() {
  frameRate(40)
  createCanvas(3000,800);
  background("yellow");
  platform = createSprite(1500,792);
  platform.addAnimation('normal', 'base.png');
  fortress = new Fortress("fortress");
  fortress1 = new Fortress1("fortress1");
  instruction = createElement("h2", "#soldiers=1,tanks=2,8max")
  instruction.position(2500,200);
  instruction1 = createElement("h2", "#soldiers=1,tanks=2,8max")
  instruction1.position(500,200);
  soldierinput = createInput();
  soldierinput.position(2500,250);
  tankinput = createInput();
  tankinput.position(2500,270);
  soldier1input = createInput();
  soldier1input.position(500,250);
  tankinput1 = createInput();
  tankinput1.position(500,270);
  button = createButton("submit");
  button.position(1500,250);
  button.mousePressed(start)
}
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


function start(){
  const numsoldier = 0 + parseInt(soldierinput.value());
  const numsoldier1 = 0 + parseInt(soldier1input.value());
  const numtank = 0 + parseInt(tankinput.value());
  const numtank1 = 0 + parseInt(tankinput1.value());



  totalsoldiercount += numsoldier;
  totaltankcount += numtank;
  totalsoldier1count += numsoldier1;
  totaltank1count += numtank1;



  unitCount = (totalsoldiercount + 2*totaltankcount);
  unitCount1 = (totalsoldier1count + 2*totaltank1count);

  print(unitCount);

  if (unitCount > 8){
    instruction.html("too_many.")
  } else {
    for (let i=0; i<numsoldier; i++){
      let s = new Soldier("soldier");
      soldierlst.push(s);

    }
    for (let i=0;i<numtank;i++){
      let t = new Tank("tank");
      tanklst.push(t);
      print("tank")
    }
  }
  if (unitCount1 > 8){
    instruction1.html("too_many.")
  } else {
    for (let i=0; i<numsoldier1; i++){
      let s = new Soldier1("soldier1");
      soldier1lst.push(s);

    }
    for (let i=0;i<numtank1;i++){
      let t = new Tank1("tank1");
      tank1lst.push(t);
      print("tank")
    }
  }
}
function draw() {
  background("yellow");
  if (bullet1lst.length > 25){
    bullet1lst = bullet1lst.splice(0,10);
    print('clipped1');
    print(bullet1lst.length);
  }
  if (bulletlst.length > 25){
    bulletlst = bulletlst.splice(0,10);
    print('clipped');
    print(bulletlst.length);
  }
  for (let x=0; x<tank1lst.length; x++){
    tank1lst[x].move();
    tank1lst[x].shoot()
    for (let i=0;i<bulletlst.length;i++){
        if (tank1lst[x].name.overlapPixel(bulletlst[i].name.position.x,bulletlst[i].name.position.y)==true){
          tank1lst[x].health = tank1lst[x].health-10;
          bulletlst[i].name.remove(bulletlst[i].name);
          bulletlst.splice(i,1);
          print(tank1lst[x].health);
          if (tank1lst[x].health == 0){
            tank1lst[x].name.remove(tank1lst[x].name);
            tank1lst.splice(x,1);
            break;
          }
        }
    }
  }
  for (let x=0;x<soldier1lst.length;x++){
    soldier1lst[x].move()
    soldier1lst[x].shoot()
    for (let i=0;i<bulletlst.length;i++){
        if (soldier1lst[x].name.overlapPixel(bulletlst[i].name.position.x,bulletlst[i].name.position.y)==true){
          print("hit");
          soldier1lst[x].health = soldier1lst[x].health-10;
          bulletlst[i].name.remove(bulletlst[i].name)
          bulletlst.splice(i,1)
          print(soldier1lst[x].health)
          if (soldier1lst[x].health == 0){
            print(soldier1lst);
            soldier1lst[x].name.remove(soldier1lst[x].name)
            soldier1lst.splice(x,1)
            print(soldier1lst)
            break;
          }
        }
    }
  }
  for (let x=0;x<tanklst.length;x++){
    tanklst[x].move()
    tanklst[x].shoot()
    for (let i=0;i<bullet1lst.length;i++){
        if (tanklst[x].name.overlapPixel(bullet1lst[i].name.position.x,bullet1lst[i].name.position.y)==true){
          tanklst[x].health = tanklst[x].health-10;
          bullet1lst[i].name.remove(bullet1lst[i].name);
          bullet1lst.splice(i,1);
          print(tanklst[x].health);
          if (tanklst[x].health == 0){
            tanklst[x].name.remove(tanklst[x].name);
            tanklst.splice(x,1);
            break;
          }
        }
    }
  }
  for (let x=0;x<soldierlst.length;x++){
    soldierlst[x].move()
    soldierlst[x].shoot()
    for (let i=0;i<bullet1lst.length;i++){
        if (soldierlst[x].name.overlapPixel(bullet1lst[i].name.position.x,bullet1lst[i].name.position.y)==true){
          soldierlst[x].health = soldierlst[x].health-10;
          bullet1lst[i].name.remove(bullet1lst[i].name)
          bullet1lst.splice(i,1)
          print(soldierlst[x].health)
          if (soldierlst[x].health == 0){
            soldierlst[x].name.remove(soldierlst[x].name)
            soldierlst.splice(x,1);
            break;
          }
        }
    }
  }
  for (let x=0;x<bulletlst.length;x++){
    bulletlst[x].draw()
    if (bulletlst[x].name.position.x <= 290){
      fortress.hit()
      bulletlst[x].name.life=0;
      bulletlst[x].name.remove(bulletlst[x].name);
      bulletlst.splice(x,1)
    }
  }
  for (let x=0;x<bullet1lst.length;x++){
    bullet1lst[x].draw()
    if (bullet1lst[x].name.position.x >= 2710){
      fortress1.hit()
      bullet1lst[x].name.life=0;
      bullet1lst[x].name.remove(bullet1lst[x].name);
      bullet1lst.splice(x,1)
    }
  }


  drawSprites()
}

class Soldier{
  constructor(name){
    this.x = random(2900,3000);
    this.y = 100
    this.name = createSprite(this.x,this.y);
    this.name.addAnimation('normal', 'soldier.png');
    this.health = 100;
  }
  move(){
    this.name.velocity.x = 0
    if(this.name.position.y < 695){
      this.name.velocity.y += GRAVITY;
    }
    if(this.name.position.y >= 695){
      //this.name.position.y = this.name.position.y - 0.1;
      this.name.velocity.y = 0;
    }
  }
  shoot(){
    let shoot = false;
    for (let i=0;i<soldier1lst.length;i++){
      if ((soldier1lst[i].name.position.y > this.name.position.y-60)&&(soldier1lst[i].name.position.y < this.name.position.y+60)){
        if ((soldier1lst[i].name.position.x<this.name.position.x)&&(soldier1lst[i].name.position.x+700>this.name.position.x)){
          shoot = true;
          //console.log("here")
        }
      }
    }
    if (shoot == false){
      for (let i=0;i<tank1lst.length;i++){
        if ((tank1lst[i].name.position.y > this.name.position.y-75)&&(tank1lst[i].name.position.y < this.name.position.y+75)){
          if ((tank1lst[i].name.position.x<this.name.position.x)&&(tank1lst[i].name.position.x+700>this.name.position.x)){
            shoot = true;
            //console.log("tank")
          }
        }
      }
    }
    if (this.name.position.x <= 500){
      shoot = true;
    }
    if ((shoot == true)&&(0==frameCount%50)){
      let b = new Bullet(this.name.position.x-20,this.name.position.y-6,-1,"bullet",bulletCounter);
      bulletlst.push(b);
      bulletCounter += 1;
    } else if (shoot == false){
      this.name.velocity.x = -2;
    }
  }
}
class Soldier1{
  constructor(name){
    this.x = random(0,100);
    this.y = 100;
    this.name = createSprite(this.x,this.y);
    this.name.addAnimation('normal', 'soldier2.png');
    this.health = 100;
  }
  move(){
    this.name.velocity.x = 0
    if(this.name.position.y < 695){
      this.name.velocity.y += GRAVITY;
    }
    if(this.name.position.y >= 695){
      //this.name.position.y = this.name.position.y - 0.1;
      this.name.velocity.y = 0;
    }
    if (keyIsDown(65)){
      this.name.velocity.x = -5;
    }
    if (keyIsDown(68)){
      this.name.velocity.x = 5;
    }
  }
  shoot(){
    let shoot = false;
    for (let i=0;i<soldierlst.length;i++){
      if ((soldierlst[i].name.position.y > this.name.position.y-60)&&(soldierlst[i].name.position.y < this.name.position.y+60)){
        if ((soldierlst[i].name.position.x>this.name.position.x)&&(soldierlst[i].name.position.x-700<this.name.position.x)){
          shoot = true;
        }
      }
    }
    if (shoot == false){
      for (let i=0;i<tanklst.length;i++){
        if ((tanklst[i].name.position.y > this.name.position.y-75)&&(tanklst[i].name.position.y < this.name.position.y+75)){
          if ((tanklst[i].name.position.x>this.name.position.x)&&(tanklst[i].name.position.x-700<this.name.position.x)){
            shoot = true;
            //console.log("tank")
          }
        }
      }
    }
    if (this.name.position.x >= 2500){
      shoot = true;
    }
    if ((shoot == true)&&(0==frameCount%50)){
      let b = new Bullet1(this.name.position.x+65,this.name.position.y-12,1,"bullet",bulletCounter);
      bullet1lst.push(b);
      bulletCounter += 1;
    } else if (shoot == false){
      this.name.velocity.x = 2;
    }
  }
}

class Tank{
  constructor(name){
    this.x = random(2900,3000);
    this.y = 100;
    this.name = createSprite(this.x,this.y);
    this.name.addAnimation('normal', 'tank.png');
    this.health = 200;
  }
  move(){
    this.name.velocity.x = 0
    if(this.name.position.y < 695){
      this.name.velocity.y += GRAVITY;
    }
    if(this.name.position.y >= 695){
      //this.name.position.y = this.name.position.y - 0.1;
      this.name.velocity.y = 0;
    }
    if (keyIsDown(65)){
      this.name.velocity.x = 5;
    }
    if (keyIsDown(68)){
      this.name.velocity.x = -5;
    }
  }
  shoot(){
    let shoot = false;
    for (let i=0;i<soldier1lst.length;i++){
      if ((soldier1lst[i].name.position.y > this.name.position.y-60)&&(soldier1lst[i].name.position.y < this.name.position.y+60)){
        if ((soldier1lst[i].name.position.x<this.name.position.x)&&(soldier1lst[i].name.position.x+700>this.name.position.x)){
          shoot = true;
        }
      }
    }
    if (shoot == false){
      for (let i=0;i<tank1lst.length;i++){
        if ((tank1lst[i].name.position.y > this.name.position.y-75)&&(tank1lst[i].name.position.y < this.name.position.y+75)){
          if ((tank1lst[i].name.position.x<this.name.position.x)&&(tank1lst[i].name.position.x+700>this.name.position.x)){
            shoot = true;
          }
        }
      }
    }
    if (this.name.position.x <= 500){
      shoot = true;
    }
    if ((shoot == true)&&(0==frameCount%50)){
      let b = new Bullet(this.name.position.x-65,this.name.position.y-8,-1,"bullet",bulletCounter);
      bulletlst.push(b);
      bulletCounter += 1;
    } else if (shoot == false){
      this.name.velocity.x = -3;
    }
  }
}

class Tank1{
  constructor(name){
    this.x = random(0,100);
    this.y = 100;
    this.name = createSprite(this.x,this.y);
    this.name.addAnimation('normal', 'tank2.png');
    this.health = 200;
  }
  move(){
    this.name.velocity.x = 0
    if(this.name.position.y < 695){
      this.name.velocity.y += GRAVITY;
    }
    if(this.name.position.y >= 695){
      //this.name.position.y = this.name.position.y - 0.1;
      this.name.velocity.y = 0;
    }
    if (keyIsDown(65)){
      this.name.velocity.x = -5;
    }
    if (keyIsDown(68)){
      this.name.velocity.x = 5;
    }
  }
  shoot(){
    let shoot = false;
    for (let i=0;i<soldierlst.length;i++){
      if ((soldierlst[i].name.position.y > this.name.position.y-60)&&(soldierlst[i].name.position.y < this.name.position.y+60)){
        if ((soldierlst[i].name.position.x>this.name.position.x)&&(soldierlst[i].name.position.x-700<this.name.position.x)){
          shoot = true;
          //console.log("here")
        }
      }
    }
    if (shoot == false){
      for (let i=0;i<tanklst.length;i++){
        if ((tanklst[i].name.position.y > this.name.position.y-75)&&(tanklst[i].name.position.y < this.name.position.y+75)){
          if ((tanklst[i].name.position.x>this.name.position.x)&&(tanklst[i].name.position.x-700<this.name.position.x)){
            shoot = true;
            //console.log("tank")
          }
        }
      }
    }
    if (this.name.position.x >= 2500){
      shoot = true;
    }
    if ((shoot == true)&&(0==frameCount%50)){
      let b = new Bullet1(this.name.position.x+65,this.name.position.y-8,1,"bullet",bulletCounter);
      bullet1lst.push(b);
      bulletCounter += 1;
    } else if (shoot == false){
      this.name.velocity.x = 3;
    }
  }
}
class Bullet{
  constructor(x,y,direction,name, number){
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.name = createSprite(this.x,this.y,10,5);
    this.name.velocity.y = 0;
    this.name.life = 150;
    this.number = number;
  }
  draw(){
    this.name.velocity.x = 20 * this.direction;
    this.name.velocity.y += 1/100*GRAVITY;
    if (platform.overlapPixel(this.name.position.x, this.name.position.y-2.5)){
      this.name.life = 0;
    }
  }
}
class Bullet1{
  constructor(x,y,direction,name, number){
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.name = createSprite(this.x,this.y,10,5);
    this.name.velocity.y = 0;
    this.name.life = 150;
    this.number = number;
  }
  draw(){
    this.name.velocity.x = 20 * this.direction;
    this.name.velocity.y += 1/50*GRAVITY;
    if (platform.overlapPixel(this.name.position.x, this.name.position.y-2.5)){
      this.name.life = 0;
    }
  }
}
class Fortress{
  constructor(name){
    this.name = createSprite(2855,630);
    this.name.addAnimation("noraml","castle.png");
    this.health = 1000;
  }
  hit(){
    this.health -= 100;

    if (this.health <= 0){
      print("dead");
    }
  }
}
class Fortress1{
  constructor(name){
    this.name = createSprite(145,630);
    this.name.addAnimation("normal","castle1.png");
    this.health = 1000;
  }
  hit(){
    this.health -= 100;

    if (this.health <= 0){
      print("dead");
    }
  }
}
