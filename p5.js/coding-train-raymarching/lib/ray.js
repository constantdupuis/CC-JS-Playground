class Ray {

    //colorScale = chroma.scale(['#2A4858', '#fafa6e']);
    colorScale = chroma.scale(['#604CC3', '#80C4E9','#FFF6E9', '#FF7F3E']);

    constructor(x, y, angle)
    {
        this.pos = createVector(x,y);
        this.angle = angle;
    }

    march(objects)
    {
        let current = this.pos.copy();
        let counter = 0;
        let maxIteration = 20;
        

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
            

            //stroke(255, 0 ,200);
            //strokeWeight(1);
            //noFill();
            let c = color( this.colorScale(counter/maxIteration).hex() );
            fill(c);
            noStroke();

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

        //stroke(0,0,255);
        //strokeWeight(4);
        //line(this.pos.x, this.pos.y, current.x, current.y);
    }

    offScreen( pos )
    {
        let halfWidth = width/2;
        let halfHeight = height/2;
        return ( pos.x > width+halfWidth || pos.x < -halfWidth || pos.y > height+halfHeight || pos.y < -halfHeight);
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