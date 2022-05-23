
var GameOverLayer = cc.Layer.extend({
    score:0,
    _scoreBoard:null,
    ctor:function(score) {

        this._super();
        this.init(score);
        return true;
    },


    init:function (score){
        this.score = score;
        this._scoreBoard = new ScoreBoard()
        this.addChild(this._scoreBoard);

        var size = cc.winSize;

        var mainscene = ccs.load(res.MainScene_json);
        this.addChild(mainscene.node);

        var gameOverMessageSprite = new cc.Sprite(res.sprites_gameover_png);
        this.addChild(gameOverMessageSprite);
        gameOverMessageSprite.setPosition(cc.p(size.width/2,size.height- size.height / 5));

        this._scoreBoard.setPosition(size.width/2,size.height / 2);
        this._scoreBoard.setScore(this.score);

        var replayGameMessageSprite = new cc.Sprite(res.sprites_replay_button_png);


        var replayMessages = new cc.MenuItemSprite(replayGameMessageSprite,replayGameMessageSprite,replayGameMessageSprite, function(){
            this.onReplay();
        }.bind(this));

        var menu = new cc.Menu(replayMessages);
        menu.setScale(0.5);
        menu.setAnchorPoint(0,0);
        menu.setPosition(cc.p(size.width/2,size.height / 3));

        this.addChild(menu);
    },

    onReplay:function (){
        var gameScene = new cc.Scene();
        gameScene.addChild(new HelloWorldLayer());
        cc.director.runScene(new cc.TransitionFade(0.5, gameScene));
    }


});




