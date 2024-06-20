class Ray {
    constructor(x, y, angle)
    {
        this.pos = createVector(x,y);
        this.angle = angle;
    }

    show(len)
    {
        push();
        translate(this.pos.x, this.pos.y);
        const v  = p5.Vector.fromAngle(this.angle);
        //v.setMag(len);
        line(0, 0, v.x * len, v.y * len);
        pop();
    }
}