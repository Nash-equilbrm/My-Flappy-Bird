/**
 * Created by KienVN on 8/2/2016.
 */

_dbccHelper = null;
db.DBCCHelper = cc.Class.extend(
    {
        buildAsyncArmatureNode:function(skeletonFilePath, textureFilePath, armatureName, dragonBonesName)
        {
            db.DBCCFactory.getInstance().loadTextureAtlas(textureFilePath, dragonBonesName);
            db.DBCCFactory.getInstance().loadDragonBonesData(skeletonFilePath, dragonBonesName);
            return db.DBCCFactory.getInstance().buildArmatureNode(armatureName);
        }
    }
);
db.DBCCHelper.getInstance = function()
{
    if(!_dbccHelper)
    {
        _dbccHelper = new db.DBCCHelper();
    }
    return _dbccHelper;
};