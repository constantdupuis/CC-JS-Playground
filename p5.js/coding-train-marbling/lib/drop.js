const circleDetail = 100;

//let colorScale = chroma.scale(['#fafa6e', '#2A4858']);
let colorScale = chroma.scale(['#3AA6B9', '#FFD0D0', '#FF9EAA', '#F9F9E0']);
//let colorScale = chroma.scale(['#219C90', '#FFF455', '#FFC700', '#EE4E4E']);

class Drop {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.centre = createVector(x,y);

    this.vertices = [];

    for( let i = 0; i < circleDetail; i++)
    {
        let angle = map( i, 0, circleDetail, 0, TWO_PI);
        let v = createVector(cos(angle), sin(angle));
        v.mult(this.r);
        v.add(this.centre);
        this.vertices[i] = v;
    }
    this.color = color(colorScale(random(0.0,1.0)).alpha(0.5).hex());
  }

  marble( other )
  {
    for( let v of this.vertices)
    {
        let c = other.centre;
        let r = other.r;
        let p = v.copy();
        p.sub(c);
        let ms = p.magSq();
        let root = sqrt(1+(r*r)/ms);
        p.mult(root);
        p.add(c);
        v.set(p);
    }
  }

  draw()
  {
    noStroke();
    fill(this.color);
    beginShape();
    for( let v of this.vertices)
    {
        vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}
