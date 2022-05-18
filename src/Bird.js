var Bird = cc.Sprite.extend({

    sprite:res.sprites_bluebird_midflap_png,
    gravity:0,
    gravityChange:20,
    gravityWhenJumping:-500,
    birdRotationSpeed:200,
    appearPosition:cc.p(200, 500),
    jumping:false,
    active:true,
    jumpingDuration:0.5,

    ctor:function (){
        this._super(this.sprite);
        this.x = this.appearPosition.x;
        this.y = this.appearPosition.y;

        this.setUpAnimation();

        this.scheduleUpdate();

    },

    update:function (dt){

        // Jumping
        if(this.jumping){

            if(this.gravity >= 0){
                this.jumping = false;
            }
            this.gravity += this.gravityChange
            this.applyGravity(dt);
        }

        // Falling
        else{
            this.applyGravity(dt);
            this.gravity += this.gravityChange;
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

    applyGravity:function(dt) {
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
});