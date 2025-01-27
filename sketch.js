let ducks = [];
function setup() {
  createCanvas(400, 400);
  for (x = 0; x < 30; x++){
    ducks[x] = new Duck(random(width),random(height),random(10));
  }

}
class Duck {
  constructor(x,y,size){
    // duck pos x and y
    this.x = y;
    this.y = x;
    // duck movement gradient
    this.t = random(0,10);
    this.u = random(0,10);
    // ducks rgb colour variables
    this.r = 255;
    this.g = 255;
    this.b = 0;
    this.l = size;// unit length to standardise the size of the ducks
    this.grows = 1; //operator to control zoom fucntion
    this.z = random(width/6); //zoom variable for duck zoom rate
    this.edges = 1;
  }
  show(){
    // body
    stroke(this.r,this.g,this.b);
    fill(this.r,this.g,this.b);
    circle(this.x,this.y,this.l);
    circle(this.x+(4.5*this.l/5),this.y+(4*this.l/5),this.l);
    ellipse(this.x+(2*this.l/5),this.y+this.l,this.l*2,this.l+(this.l/5));
    //bill
    stroke(this.g, this.b, abs(this.r+100));
    fill(this.g, this.b, abs(this.r+100));
    ellipse(this.x-(2*this.l/5),this.y,(3*this.l/5),this.l/5);
    ellipse(this.x-(1.5*this.l/5),this.y-(this.l/10),(1.5*this.l/5),this.l/10);
    // duck eyes
      //eye white
    stroke(0,0,0);
    fill(0,0,0);
    circle(this.x+(this.l/5),this.y-(this.l/10),(1.1*this.l/5));
      // eye black
    stroke(255,255,255);
    fill(255,255,255);
    circle(this.x+(1.2*this.l/5),this.y-(1*this.l/5),this.l/10);
  }
  move(){
    // movement conditions made more specific
    if (this.x > (width - this.l)|| this.x < (0 + this.l)){
      this.t = this.t * -1;
    }
    if (((this.y > (height - (1.2*this.l))) || (this.y < (0  + (0.85*this.l))))){ 
      this.u = this.u * -1;
    }
    this.y += this.u;
    this.x += this.t;

  
 }
  colour(){
    if (this.x > (width - this.l)|| this.x < (0 + this.l)||((this.y > (height - (1.2*this.l))) || (this.y < (0  + (0.85*this.l))))){ 
        this.r = random(255);
      this.g = random(255);
      this.b = random(255);
    }
  }
  size (g){
    this.l = g;
  }
  grow(increment, max){
    if (this.l < max){
      this.l += increment;     
    }    
  }
  shrink(increment, min){
    if (this.l > min){
      this.l += -increment;  
    }
  }
  zoom(a,b, increment = 1){ 
    // start size (a) must be smaller than stop size (b)
    if (this.grows == 1){
      this.grow(1,b);
    } 
    if (this.grows == -1) {
     this.shrink(1,a); 
    }
    if (this.l >= b || this.l <= a){
      this.grows = this.grows * -1;
    }
  }
  animate(){
    this.move();
    this.colour();
    this.zoom(this.z,this.z+10);
    this.show();
    }
}

function draw() {
  background(220);
  for (x = 0; x < ducks.length; x++){
    ducks[x].animate();
  }
}