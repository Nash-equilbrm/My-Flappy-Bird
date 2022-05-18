/**
 * Created by KienVN on 7/15/2016.
 */
db.DBCCSprite = cc.Sprite.extend(
    {
        ctor:function()
        {
            this._super();
           // this.addChild(new cc.LabelTTF("I"));
        }
    }
);
db.DBCCSprite.create = function()
{
    return new db.DBCCSprite();
};
db.DBCCSprite.createWithSpriteFrame = function(spriteFrame)
{
    var sprite = new db.DBCCSprite();
    if (sprite && spriteFrame && sprite.initWithSpriteFrame(spriteFrame))
    {
        return sprite;
    }
    return null;
};