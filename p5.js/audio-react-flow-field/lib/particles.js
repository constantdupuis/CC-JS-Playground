class Particle
{
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  ttl = -1000;
  startTtl = 0;
  ttl01 = 0;

  constructor( posx, posy)
  {
    this.x = posx;
    this.y = posy;
    this.ttl = -1000;
  }

  setVelocity( nvx, nvy)
  {
    this.vx = nvx;
    this.vy = nvy;
  }

  update( deltaTimeMs)
  {
    const lDeltaTime = deltaTimeMs/1000; // milliseconds to seconds

    this.x += this.vx * lDeltaTime;
    this.y += this.vy * lDeltaTime;

    if( this.ttl != -1000 )
    {
      if( this.ttl > 0)
      {
        //console.log("ttl before update : " + this.ttl + " deltaTime : " + lDeltaTime);
        this.ttl -= lDeltaTime;
        this.ttl01 = map(this.ttl, 0, this.startTtl, 0, 1);
        //console.log("ttl after update : " + this.ttl);
        if( this.ttl < 0) 
        {
          //console.log("particle is dead");
          this.ttl = 0;
        }
      }
    }
  }

  setTimeToLive( ttl)
  {
    this.ttl = ttl;
    this.startTtl = ttl;
  }

  immortal()
  {
    this.ttl = -1000;
  }

  get isDead()
  {
    if( this.ttl == -1000) return false;
    if( this.ttl == 0) return true;
    return false;
  }

  get isAlive()
  {
    if( this.ttl == -1000) return true;
    if( this.ttl > 0) return true;
    return false;
  }

  toString()
  {
    return "Particle x : " + this.x + " y : " + this.y;
  }
}

