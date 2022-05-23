STATE_ALIVE = 1;
STATE_DEAD = 0;

var Bird = cc.Sprite.extend({

    sprite:res.sprites_bluebird_midflap_png,
    spriteWidth:34,
    spriteHeight:24,
    gravity:0,
    gravityChange:20,
    gravityWhenJumping:-500,
    birdRotationSpeed:200,
    appearPosition:cc.p(200, 500),
    jumping:false,
    active:true,
    jumpingDuration:0.5,

    _state: STATE_ALIVE,

    ctor:function (){
        this._super(this.sprite);
        this.x = this.appearPosition.x;
        this.y = this.appearPosition.y;




        this.setUpAnimation();

        this.scheduleUpdate();

    },

    getBirdBoundingBox:function(){
        var position = this.getPosition();


        var topLeft = cc.p(position.x - this.spriteWidth/2, position.y + this.spriteHeight/2);
        var lowerRight = cc.p(position.x + this.spriteWidth/2, position.y - this.spriteHeight/2);
        var res = [];
        res.push(topLeft);
        res.push(lowerRight);
        return res;
    },

    update:function (dt){
        if(this._state == STATE_ALIVE){
            // Jumping
            if(this.jumping){

                if(this.gravity >= 0){
                    this.jumping = false;
                }
                this.applyGravity(dt, true);
                this.gravity += this.gravityChange
            }

            // Falling
            else{
                this.applyGravity(dt, true);
                this.gravity += this.gravityChange;
            }
        }
        else{
            this.applyGravity(dt, false);

        }


   },

    setUpAnimation:function (){
        // set frames

        var frame0 = new cc.SpriteFrame(res.sprites_bluebird_midflap_png, cc.rect(0,0,34,24));
        var frame1 = new cc.SpriteFrame(res.sprites_bluebird_downflap_png, cc.rect(0,0,34,24));
        var frame2 = new cc.SpriteFrame(res.sprites_bluebird_upflap_png, cc.rect(0,0,34,24));


        var animFrames = [];
        animFrames.push(frame0);
        animFrames.push(frame1);
        animFrames.push(frame2);

        var animation = new cc.Animation(animFrames,0.1);
        var animate = cc.animate(animation);

        this.runAction(animate.repeatForever());
    },


    jump:function (){
        this.jumping = true;
        this.gravity = this.gravityWhenJumping;
        this.setRotation(-10);

    },

    applyGravity:function(dt, apply) {
        if(apply == true){
            var curBirdRotation = this.getRotation();
            var curBirdHeight = this.getPosition().y;


            if(this.jumping==false){
                this.setPositionY(curBirdHeight - dt*this.gravity);
                if(curBirdRotation < 45){
                    this.setRotation(curBirdRotation + dt*this.birdRotationSpeed);
                }
            }
            else{
                this.setPositionY(curBirdHeight - dt*this.gravity)
                if(curBirdRotation > -45){
                    this.setRotation(curBirdRotation - dt*this.birdRotationSpeed);
                }
            }
        }


    },


    setState:function (state){
        this._state = state;
    }


});