var ScoreBoard = cc.Layer.extend({
   sprite:[
       res.sprites_0_png,
       res.sprites_1_png,
       res.sprites_2_png,
       res.sprites_3_png,
       res.sprites_4_png,
       res.sprites_5_png,
       res.sprites_6_png,
       res.sprites_7_png,
       res.sprites_8_png,
       res.sprites_9_png,
   ],
    spriteWidth:24+1,
    spriteHeight:36,

    digits:[],
    sprites:[],

    appearPosition:cc.p(320,800),

    ctor:function (){
       this._super();
       this.setAnchorPoint(0,0);
    },

    getDigits:function (score){
       if(score == 0){
           return [0];
       }
       while(score>0){
           var remain = score % 10;
           this.digits.push(remain);
           score = Math.floor(score/10);
       }
       return this.digits.reverse();
    },

    getSpriteByNumber:function (num){
       return new cc.Sprite(this.sprite[num]);
    },

    deleteScore:function (){
        for(let i =0;i<this.digits.length;++i){
            this.getParent().removeChild(this.sprites[i]);
        }
        this.sprites = [];
        this.digits = [];

    },

    setPosition:function (x,y){
       this.appearPosition.x = x;
       this.appearPosition.y = y;
    },

    setScore:function (score){
        this.deleteScore();

        this.digits = this.getDigits(score);
        var offset = 0;
        if(this.digits.length % 2 ==0){
            offset = Math.floor(this.digits.length/2);
        }
        else{
            offset = Math.floor(this.digits.length/2) + 0.5;
        }
        this.x = this.appearPosition.x - offset*this.spriteWidth;
        this.y = this.appearPosition.y;
        var currPosition = this.getPosition();
        for(let i =0;i<this.digits.length;++i){
            var spriteNumber = this.getSpriteByNumber(this.digits[i]);
            this.sprites.push(spriteNumber);
            this.getParent().addChild(spriteNumber);
            spriteNumber.setAnchorPoint(0,0);
            spriteNumber.setPosition(currPosition.x + i*this.spriteWidth, currPosition.y);
        }
    }

});