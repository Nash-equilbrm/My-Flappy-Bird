
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
      
        this._super();

       
        var size = cc.winSize;

        var mainscene = ccs.load(res.MainScene_json);
        this.addChild(mainscene.node);

        var menuMessagesSprite = new cc.Sprite(res.sprites_message_png);
    

        var menuMessages = new cc.MenuItemSprite(menuMessagesSprite,menuMessagesSprite,menuMessagesSprite, function(){
            this.onNewGame();
        }.bind(this));

        var menu = new cc.Menu(menuMessages);
        this.addChild(menu);

        return true;
    },

    onNewGame:function() {
        // load resources
        var gameScene = new cc.Scene();
        gameScene.addChild(new GameLayer());
        cc.director.runScene(new cc.TransitionFade(0.5, gameScene));
        
    },
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
        
    }
});


