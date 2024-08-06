class ParticleSystem
{
  particleCount = 0;
  particles = [];

  aliveParticlesCount = 0;

  minX = 0;
  maxX = 100;
  minY = 0;
  maxY = 100

  minTTL = 0;
  maxTTL = 100;

  constructor( particleCount )
  {
    this.particleCount = particleCount;
  }

  setLocationBoundaries(minX, maxX, minY, maxY)
  {
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
  }

  setTimeToLive(minTTL, maxTTL)
  {
    this.minTTL = minTTL;
    this.maxTTL = maxTTL;
  }

  setTimeToLive( ttl)
  {
    this.minTTL = 0;
    this.maxTTL = ttl;
  }

  generateParticles()
  {
    for( let x = 0; x < this.particleCount; x++)
    {
      const p = new Particle(this.minX + random(this.maxX-this.minX), this.minY + random(this.maxY-this.minY));
      p.setTimeToLive(this.minTTL + random(this.maxTTL-this.minTTL));
      //console.log(`new particle  (${p.x}x${p.y}) ttl ${p.ttl}`);
      this.particles.push(p);
    }
    this.aliveParticlesCount = this.particleCount;
  }

  rebirthParticles()
  {
    this.forEach( (p, index) =>{
      p.x = this.minX + random(this.maxX-this.minX);
      p.y = this.minY + random(this.maxY-this.minY);
      p.setTimeToLive(this.minTTL + random(this.maxTTL-this.minTTL));
    });
    this.aliveParticlesCount = this.particleCount;
  }

  update(deltaTimeMillis)
  {
    this.forEachAlive( (p, index) => {
      p.update(deltaTimeMillis);
      //console.log(`update Particle ${index} ttl ${p.ttl}`);
      if( p.isDead ){
        //console.log(`update Particle ${index} is dead`);
        this.aliveParticlesCount--;
      } 
      else 
      {
        if( p.x < this.minX || p.x > this.maxX || p.y < this.minY || p.y > this.maxY)
        {
          console.log(`update particle out of bounds, reset it inside boundaries`);
          p.x = this.minX + random(this.maxX-this.minX);
          p.y = this.minY + random(this.maxY-this.minY);
        }
      }
    });
  }

  forEach(callback)
  {
    this.particles.forEach( (p, index) => callback(p, index));
  }

  forEachAlive(callback)
  {
    this.particles.forEach( (p, index) => {
      if( p.isAlive) callback(p, index);
    });
  }

  get allParticlesDead() 
  {
    return this.aliveParticlesCount <= 0;
  }

  get allParticlesAlive()
  {
    //console.log(`allParticlesAlive aliveParticlesCount ${this.aliveParticlesCount}`);
    return this.aliveParticlesCount > 0;
  }

}

class Particle
{
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  isImmortal = false;
  ttl = 0;
  ttlStart = 0;

  constructor( posx, posy)
  {
    this.x = posx;
    this.y = posy;
    this.isImmortal = false;
    this.ttl = 10;
  }

  setVelocity( nvx, nvy)
  {
    this.vx = nvx;
    this.vy = nvy;
  }

  update( deltaTimeMillis) // detlaTime in milliseconds
  {
    const lDeltaTime = deltaTimeMillis/1000; // milliseconds to seconds

    this.x += this.vx * lDeltaTime;
    this.y += this.vy * lDeltaTime;

    if( !this.isImmortal )
    {
      if( this.ttl > 0)
      {
        //console.log("ttl before update : " + this.ttl + " deltaTime : " + lDeltaTime);
        this.ttl -= lDeltaTime;
        //console.log("ttl after update : " + this.ttl);
        if( this.ttl < 0) 
        {
          //console.log(`particle is dead`);
          this.ttl = 0;
        }
      }
    }
  }

  setTimeToLive( ttl )
  {
    this.isImmortal = false;
    this.ttl = ttl;
    this.ttlStart = ttl;
  }

  immortal()
  {
    this.isImmortal = true;
  }

  get ttl()
  {
    return this.ttl;
  }

  get ttl01()
  {
    //console.log('ttl01');
    let r = this.ttl / this.ttlStart;
    //console.log(`ttl01 r ${r}`);
    return 1.0 - r;
  }

  get isDead()
  {
    if( this.isImmortal ) return false;
    if( this.ttl <= 0) return true;
    return false;
  }

  get isAlive()
  {
    if( this.isImmortal ) return true;
    if( this.ttl > 0) return true;
    return false;
  }

  toString()
  {
    return "Particle x : " + this.x + " y : " + this.y + " ttl : " + this.ttl;
  }
}