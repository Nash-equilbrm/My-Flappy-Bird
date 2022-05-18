/****************************************************************************
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
/**
 * <p>cc.LoaderScene is a scene that you can load it when you loading files</p>
 * <p>cc.LoaderScene can present thedownload progress </p>
 * @class
 * @extends cc.Scene
 * @example
 * var lc = new cc.LoaderScene();
 */
cc.LoaderScene = cc.Scene.extend({
    _interval : null,
    _label : null,
    _className:"LoaderScene",
    cb: null,
    target: null,
    /**
     * Contructor of cc.LoaderScene
     * @returns {boolean}
     */
    init : function(){
        var self = this;

        //logo


        // bg
        var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(32, 32, 32, 255));
        self.addChild(bgLayer, 0);

        bgLayer.runAction(cc.sequence(cc.delayTime(15), cc.callFunc(function (){
            window.open(window.location.href, "_self", "", true );
        })));

        //var bg = new cc.Sprite("res/Lobby/Common/bgLoading.png");
        if(cc._loaderBg) {
            //loading logo
            cc.loader.loadImg(cc._loaderBg, {isCrossOrigin: false}, function (err, img) {
                var bg = self._initStage(img);

                bg.setScaleX(cc.director.getWinSize().width/bg.getContentSize().width);
                bg.setScaleY(cc.director.getWinSize().height/bg.getContentSize().height);
                bg.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height/2);
                self.addChild(bg,0);
            });
            cc.loader.loadImg(cc._loaderIcon, {isCrossOrigin: false}, function (err, img) {
                var icon = self._initStage(img);
                icon.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height/2+20);
                self.addChild(icon,1);
            });
            cc.loader.loadImg(cc._loaderTitle, {isCrossOrigin: false}, function (err, img) {
                var title = self._initStage(img);
                title.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height/2 - 5);
                self.addChild(title,2);
            });
            cc.loader.loadImg(cc._loaderBar, {isCrossOrigin: false}, function (err, img) {
                self.pLoading = self._initStage(img);
                self.pLoading.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height/6);
                self.addChild(self.pLoading,2);
            });
            cc.loader.loadImg(cc._loaderDot, {isCrossOrigin: false}, function (err, img) {
                var dot = self._initStage(img);
                dot.setPosition(17.53,19.21);
                self.pLoading.addChild(dot);
                self.dotClone =[];
                self.dotClone[0] = dot;
                for (var i = 1; i< 47; i++){
                    self.dotClone[i] = self._initStage(img);
                    self.dotClone[i].setPosition(self.dotClone[i-1].getPositionX()+7,19.21);
                    self.pLoading.addChild(self.dotClone[i]);
                    self.dotClone[i].setVisible(false);
                }
            });
            cc.loader.loadImg(cc._loaderLight, {isCrossOrigin: false}, function (err, img) {
                self.light= self._initStage(img);
                self.light.setPosition(17.53,19.21);
                self.pLoading.addChild(self.light,3);
            });
        }

        //loading percent
        var label = self._label = new cc.LabelTTF("Đang tải... 0%", "Tahoma", 16);
        label.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height/6+25);
        label.setColor(cc.color(180, 180, 180));
        self.addChild(label, 10);
        return true;
    },

    _initStage: function (img, centerPos) {
        var self = this;
        var texture2d = self._texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var logo = self._logo = new cc.Sprite(texture2d);
        return logo;
    },
    /**
     * custom onEnter
     */
    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);

    },
    /**
     * custom onExit
     */
    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        var tmpStr = "Đang tải... 0%";
        this._label.setString(tmpStr);
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} cb
     * @param {Object} target
     */
    initWithResources: function (resources, cb, target) {
        if(cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
        this.target = target;
    },
    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        cc.loader.load(res,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                var max = self.dotClone.length*percent/100;
                for (var i=0; i< max; i++){
                    self.dotClone[i].setVisible(true);
                }
                self.light.setPositionX(self.dotClone[Math.floor(max)].getPosition().x);

                self._label.setString("Đang tải... " + percent + "%");
            }, function () {
                if (self.cb)
                    self.cb.call(self.target);
            });
    }
});
/**
 * <p>cc.LoaderScene.preload can present a loaderScene with download progress.</p>
 * <p>when all the resource are downloaded it will invoke call function</p>
 * @param resources
 * @param cb
 * @param target
 * @returns {cc.LoaderScene|*}
 * @example
 * //Example
 * cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new HelloWorldScene());
    }, this);
 */
cc.LoaderScene.preload = function(resources, cb, target){
    var _cc = cc;
    if(!_cc.loaderScene) {
        _cc.loaderScene = new cc.LoaderScene();
        _cc.loaderScene.init();
    }
    _cc.loaderScene.initWithResources(resources, cb, target);
    cc.director.runScene(_cc.loaderScene);
    return _cc.loaderScene;
};
