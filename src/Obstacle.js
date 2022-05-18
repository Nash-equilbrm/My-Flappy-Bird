var Obstacle = cc.Layer.extend({
    sprite: res.sprites_pipe_green_png,
    pipe1:null,
    pipe2:null,
    obstacleHeight:null,
    appearPosition:null,
    holeWidth:200,
    screenOffset:50,
    ctor:function (){
        this._super();
        let highest = 320;
        let lowest = 50;
        this.appearPosition = cc.winSize.width + this.screenOffset;
        // this.appearPosition = 400;

        this.onRespawn(highest, lowest);
    },


    onRespawn:function (highest, lowest){

        // random chieu cao cua chuong ngai vat
        this.obstacleHeight=Math.floor(Math.random()*(highest-lowest)+lowest);
        this.setAnchorPoint(0,0);

        this.x = this.appearPosition;
        this.y = 0;
        this.setContentSize(cc.size(52,320*2+this.holeWidth));

        var pipe1 = new cc.Sprite(this.sprite);
        pipe1.setAnchorPoint(0,0);
        pipe1.setPosition(0, -(320-this.obstacleHeight));
        this.addChild(pipe1);


        var pipe2 = new cc.Sprite(this.sprite);
        pipe2.setAnchorPoint(0,0);
        pipe2.setPosition(0, (320+this.holeWidth+this.obstacleHeight));

        pipe2.setScaleY(-1);
        this.addChild(pipe2);
    }




});