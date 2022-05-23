var GameLayer = cc.Layer.extend({
    _gameManager:null,
    speed:150,


    ctor:function () {
        this._super();
        this.init();
    },

    init:function (){


        var mainscene = ccs.load(res.MainScene_json);
        this.addChild(mainscene.node);



        this._gameManager = new GameManager(this.speed);
        this.addChild(this._gameManager);
        this._gameManager.addObjectToScene();





        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if(self._gameManager.getGameState() == STATE_PLAYING){
                    self._gameManager.jump();
                }
                else if(self._gameManager.getGameState() == STATE_GAMEOVER){
                    self.onGameOver();
                }
                return true;
            }
        }, this);

        this._gameManager.setActive(true);
        },



    onGameOver:function (){
        var gameScene = new cc.Scene();

        gameScene.addChild(new GameOverLayer(this._gameManager.getCurrentScore()));

        cc.director.runScene(new cc.TransitionFade(0.5, gameScene));
    }

});



