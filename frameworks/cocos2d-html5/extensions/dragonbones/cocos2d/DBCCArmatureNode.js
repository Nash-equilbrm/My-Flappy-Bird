/**
 * Created by KienVN on 7/14/2016.
 */
db.DBCCArmatureNode = cc.Node.extend(
    {
        ctor:function(worldClock)
        {
            this._super();
            this.setCascadeOpacityEnabled(true);
            this.setCascadeColorEnabled(true);
            this._clock = worldClock;
            if (worldClock)
            {
                worldClock.add(this);
            }
           // this.addChild(new cc.LabelTTF("o"));
        },
        onEnter:function()
        {
            this._super();
            if (!this._clock)
            {
                this.scheduleUpdate();
            }
        },
        onExit:function()
        {
            this._super();
            if (!this._clock)
            {
                this.unscheduleUpdate();
            }
        },
        update:function(dt)
        {
            this.advanceTime(dt);
        },

        advanceTime:function(dt)
        {
            if (this.isVisible())
            {
                if (this._armature)
                    this._armature.advanceTime(dt);
            }
        },
        advanceTimeBySelf:function(on)
        {
            if (on)
            {
                this.scheduleUpdate();
            }
            else
            {
                this.unscheduleUpdate();
            }
        },
        getAnimation:function()
        {
            return this._armature.animation;
        },
        setBaseColor:function(r,g,b){
            //TODO
        },
        gotoAndPlay:function(animationName, fadeInTime, duration, playTimes)
        {
            fadeInTime = fadeInTime === undefined? -1.0:fadeInTime;
            duration = duration === undefined?-1.0:duration;
            playTimes = playTimes === undefined?NaN:playTimes;

            if (this._armature)
            {
                this._needPlayAnimation = false;
                this._armature.animation.gotoAndPlay(animationName, fadeInTime, duration, playTimes);
            }
        },

        play:function()
        {
            this._animationName = "";
            if (this._armature)
            {
                this._needPlayAnimation = false;
                this._armature.animation.play();
            }
            else
            {
                this._needPlayAnimation = true;
            }
        },
        stop:function()
        {
            if (this._armature)
            {
                this._needStop = false;
                this._armature.animation.stop();
            }
            else
            {
                this._needStop = true;
            }
        },
        hasEvent:function(type)
        {
            return false;
        },
        setArmature:function(armature)
        {
            this._armature = armature;
            this._armature.addEventListener(dragonBones.events.AnimationEvent.COMPLETE, this.onComplete.bind(this));
        },
        getArmature:function()
        {
            return this._armature;
        },
        setCompleteListener:function(listener)
        {
            this._listener = listener;
        },
        onComplete:function() {
            if (this._listener)
            {
                this._listener(this);
            }
        }
}
);

db.DBCCArmatureNode.create = function()
{
    var displayContainer = new  db.DBCCArmatureNode();
    return displayContainer;
};
db.DBCCArmatureNode.createWithWorldClock = function(worldClock)
{

};