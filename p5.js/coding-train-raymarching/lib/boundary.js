class Boundary {
    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.r = r;
    }

    show()
    {
        noFill();
        stroke(255);
        strokeWeight(1);
        circle(this.pos.x, this.pos.y, this.r * 2);
    }
}