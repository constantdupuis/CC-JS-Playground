
//
// p5.js must be included before this
// 

class NoiseMap{
    width = 0;
    height = 0;
    noiseMap = [];
    noiseMapSize = 0;
    noiseScale = 0.003;
    noiseOctaveNumber = 3;
    noiseOctaveFalloff = 0.5;
    seed = -1; 
    noiseMapMaxNoise = 0;
    noiseMapMinNoise = 1;

    constructor(width, height)
    {
        this.setSize(width, height);
        this.setDetails(this.noiseOctaveNumber, this.noiseOctaveFalloff);
        this.setSeed(this.seed);
    }

    setSize(width, height)
    {
        this.width = width;
        this.height = height;
        this.noiseMapSize = this.width * this.height;
    }

    setDetails(noiseOctaveNumber, noiseOctaveFalloff)
    {
        this.noiseOctaveNumber = noiseOctaveNumber;
        this.noiseOctaveFalloff = noiseOctaveFalloff;
        noiseDetail(this.noiseOctaveNumber, this.noiseOctaveFalloff);
    }

    setSeed(seed)
    {
        this.seed = seed;
        if( this.seed != -1)
            noiseSeed(this.seed);
    }

    setScale(noiseScale)
    {
        this.noiseScale = noiseScale;
    }

    generate()
    {
        console.time('Generate Noisemap');
        this.noiseMapMaxNoise = 0;
        this.noiseMapMinNoise = 1;

        for( let i = 0; i < this.width; i++)
        {
            for( let j = 0; j < this.height; j++)
            {
            const noiseIndex = (j * this.width) + i;
            const noiseVal = noise( i * this.noiseScale, j * this.noiseScale);
        
            if( noiseVal > this.noiseMapMaxNoise) this.noiseMapMaxNoise = noiseVal;
            if( noiseVal < this.noiseMapMinNoise) this.noiseMapMinNoise = noiseVal;
        
            this.noiseMap[noiseIndex] = noiseVal;
            }
        }
        console.timeEnd('Generate Noisemap');
    }

    normalize()
    {
        this.normalizeToRange(0,1);
    }

    normalizeToRange(min, max)
    {
        console.time(`Normalize NoiseMap to [${min},${max}]`);
        for( let i = 0; i < this.width; i++)
        {
            for( let j = 0; j < this.height; j++)
            {
                const noiseIndex = (j * this.width) + i;
                
                this.noiseMap[noiseIndex] = map( this.noiseMap[noiseIndex], this.noiseMapMinNoise, this.noiseMapMaxNoise, min, max );
            }
        }
        this.noiseMapMinNoise = min;
        this.noiseMapMaxNoise = max;
        console.timeEnd(`Normalize NoiseMap to [${min},${max}]`);
    }

    noiseAt(x, y)
    {
        x = floor(x);
        y = floor(y);
        if( this.noiseMapSize == 0) return -1;

        const noiseIndex = (y * this.width) + x;
        if( noiseIndex < this.noiseMapSize)
        {
            return this.noiseMap[noiseIndex];
        }

        return -1;
    }

    draw(x,y)
    {
        console.time('Draw NoiseMap');
        for( let i =0; i < this.width; i++)
        {
            for(let j = 0; j < this.height; j++)
            {
                let n = 255 * this.noiseAt(i,j);
                
                stroke(n);
                fill(n);
                point(x+i,y+j);
            }
        }   
        console.timeEnd('Draw NoiseMap');  
    }
}
