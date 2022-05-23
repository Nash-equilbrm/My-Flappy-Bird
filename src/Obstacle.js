var Obstacle = cc.Layer.extend({
    sprite: res.sprites_pipe_green_png,
    spriteWidth: 52,
    spriteHeight: 320,
    pipe1:null,
    pipe2:null,
    obstacleHeight:null,
    appearPosition:null,
    holeWidth:200,
    active:false,
    passed:false,


    ctor:function (appearPosition){
        this._super();

        this.appearPosition = appearPosition;

        this.onRespawn();
    },

    setPassed:function (passed){
        this.passed = passed;
    },

    justPassed:function (){
        return this.passed;
    },





    onRespawn:function (){
        let highest = 320;
        let lowest = 50;

        // random chieu cao cua chuong ngai vat
        this.obstacleHeight=Math.floor(Math.random()*(highest-lowest)+lowest);
        this.setAnchorPoint(0,0);

        this.x = this.appearPosition;
        this.y = 0;
        this.setContentSize(cc.size(this.spriteWidth,cc.winSize.height));

        this.pipe1 = new cc.Sprite(this.sprite);
        this.pipe1.setAnchorPoint(0,0);
        this.pipe1.setPosition(0, -(320-this.obstacleHeight));
        this.addChild(this.pipe1);


        this.pipe2 = new cc.Sprite(this.sprite);
        this.pipe2.setAnchorPoint(0,0);
        // pipe2.setPosition(0, (320+this.holeWidth+this.obstacleHeight));
        this.pipe2.setPosition(0, cc.winSize.height);

        this.pipe2.setScaleY(-1);
        this.addChild(this.pipe2);




    },

    getPipeBoundingBox:function (pipe){
        var position = pipe.getPosition();
        var spriteHeight = this.spriteHeight;
        var spriteWidth = this.spriteWidth;
        var topLeft = cc.p(position.x + this.getPosition().x, position.y + this.getPosition().y+spriteHeight);
        var lowerRight = cc.p(position.x+ this.getPosition().x+spriteWidth, position.y+ this.getPosition().y);
        return [topLeft, lowerRight];
    },

    getPipesBoundingBox:function (){
        var winSize = cc.winSize;
        var layerPosition = this.getPosition();

        var pipe1BoundingBox = [];
        pipe1BoundingBox.push(cc.p(layerPosition.x, layerPosition.y+ this.obstacleHeight));
        pipe1BoundingBox.push(cc.p(layerPosition.x + this.spriteWidth, layerPosition.y));

        var pipe2BoundingBox = [];
        pipe2BoundingBox.push(cc.p(layerPosition.x,  winSize.height));
        pipe2BoundingBox.push(cc.p(layerPosition.x + this.spriteWidth, winSize.height - this.spriteHeight));

        return [pipe1BoundingBox, pipe2BoundingBox];
    }


});