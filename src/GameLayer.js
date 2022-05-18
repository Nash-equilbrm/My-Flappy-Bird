STATE_PLAYING = 1
STATE_GAMEOVER = 0


var GameLayer = cc.Layer.extend({
    state:STATE_PLAYING,
    pipeManager:null,
    bird:null,
    obstacles:[],
    activeObstacles:[],
    obstacleCount:10,
    timeTick:0,
    obstacleReappearTime:2,
    speed:100,
    a:null,
    addMoreObstacle:false,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function (){


        var mainscene = ccs.load(res.MainScene_json);
        this.addChild(mainscene.node);

        this.bird = new Bird();
        this.addChild(this.bird);



        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                self.bird.jump();
                return true;
            }
        }, this);


        this.scheduleUpdate();
    },


    update:function (dt){
        this.timeTick += dt;
        if(this.timeTick>=0 && this.timeTick<1){
            if(this.addMoreObstacle){
                var newObstacle = new Obstacle();
                this.addChild(newObstacle);
                this.obstacles.push(newObstacle);
                this.addMoreObstacle = false;
            }

        }
        if(this.timeTick > this.obstacleReappearTime && this.obstacles.length <= this.obstacleCount){
            this.timeTick = 0;
            this.addMoreObstacle = true;
        }
        for (let i=0;i<this.obstacles.length;++i){
            var curPosition = this.obstacles[i].getPosition().x;
            this.obstacles[i].setPosition(curPosition-dt*this.speed,0);
        }

    }

});



