class Ray {
    constructor(x, y, angle)
    {
        this.pos = createVector(x,y);
        this.angle = angle;
    }

    march(objects)
    {
        let current = this.pos.copy();
        let counter = 0;
        let maxIteration = 10;
        

        while(counter < maxIteration)
        {
            let closestObject = null;
            let shortestDistance = Infinity;

            for(let s of objects)
            {
                let d = signedDistance(current, s.pos, s.r);
                if( d < shortestDistance )
                {
                    shortestDistance = d;
                    closestObject = s;
                }
            }

            if( shortestDistance < 5){
                //console.log('Next object shortest distance very short, leave the loop');
                break;
            }

            const v  = p5.Vector.fromAngle(this.angle, shortestDistance);

            push();
            //stroke(255,counter*50 ,200);
            stroke(255, 0 ,200);
            strokeWeight(1);
            noFill();
            translate(current.x, current.y);
            ellipse(0, 0, shortestDistance * 2);
            //line(0, 0, v.x, v.y);
            pop();

            current.add(v);
            if( this.offScreen( current))
            {
                //console.log('Ray start pos off screen, leave the loop');
                break;
            }

            counter++;
        }

        stroke(0,0,255);
        strokeWeight(4);
        line(this.pos.x, this.pos.y, current.x, current.y);

        //this.show(record);
    }

    offScreen( pos )
    {
        return ( pos.x > width || pos.x < 0 || pos.y > height || pos.y < 0);
    }

    rotate(angle)
    {
        this.angle += angle;
    }

    // show(len)
    // {
    //     push();
    //     stroke(255,0 ,200);
    //     noFill();
    //     translate(this.pos.x, this.pos.y);
    //     const v  = p5.Vector.fromAngle(this.angle, len);
    //     ellipse(0, 0, len * 2);
    //     line(0, 0, v.x, v.y);
    //     pop();
    // }
}