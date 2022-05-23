// var Base = cc.Sprite.extend({
//     sprite:res.sprites_base_png,
//     spriteWidth: 336,
//     spriteHeight:112,
//     height:0,
//
//     appearPosition:cc.p(0,0),
//
//     cto:function (){
//
//         var size = cc.winSize;
//
//         this._super(this.sprite);
//         this.setAnchorPoint(0,0);
//
//         var proportion = Math.floor(size.width/this.spriteWidth);
//         this.setScale();
//
//         this.height = this.spriteHeight*proportion;
//     }
//
// });