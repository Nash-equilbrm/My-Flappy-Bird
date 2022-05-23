STATE_PLAYING = 1
STATE_GAMEOVER = 0


var GameManager = cc.Node.extend({
   state:STATE_PLAYING,
   _base:null,
   _obstacles:[],
   obstacleSpawnPosition:null,
   active:false,
   timeTick:0,
   respawnTimeInterval:2,
   speed: null,

   _scoreBoard:null,
   _bird:null,

   currentScore:0,



   ctor:function (speed){
      this._super();
      this.speed = speed;
      this.obstacleSpawnPosition = cc.winSize.width + 30;


      var newObstacle = new Obstacle(this.obstacleSpawnPosition);

      this._scoreBoard = new ScoreBoard();

      this._bird = new Bird();

      // this._base = new Base()
      this._obstacles=[];
      this._obstacles.push(newObstacle);



      this.scheduleUpdate();

   },

   getGameState:function (){
      return this.state;
   },

   setGameState:function(state){
      this.state = state;
   },

   getCurrentScore:function (){
      return this.currentScore;
   },

   addObjectToScene:function (){
      for(let i=0; i< this._obstacles.length; ++i){
         this.getParent().addChild(this._obstacles[i]);
      }
      this.getParent().addChild(this._bird);
      this.getParent().addChild(this._scoreBoard);
      // this.getParent().addChild(this._base);


   },

   setActive:function (isActive){
      this.active = isActive;
   },

   moveObstacles: function (dt){
     for(let i = 0; i<this._obstacles.length; ++i){
        var currPosition = this._obstacles[i].getPosition();
        this._obstacles[i].setPosition(currPosition.x-dt*this.speed, currPosition.y);
     }
   },

   passBird:function (){
      return this.justPassBird;
   },


   doOverlap:function(rec1, rec2) {
      // To check if either rectangle is actually a line
      // For example : l1 ={-1,0} r1={1,1} l2={0,-1} r2={0,1}
      var l1 = rec1[0];
      var r1 = rec1[1];
      var l2 = rec2[0];
      var r2 = rec2[1];
      if (l1.x == r1.x || l1.y == r1.y ||
          l2.x == r2.x || l2.y == r2.y) {
         // the line cannot have positive overlap
         return false;
      }

      // If one rectangle is on left side of other
      if (l1.x >= r2.x || l2.x >= r1.x) {
         return false;
      }

      // If one rectangle is above other
      if (r1.y >= l2.y || r2.y >= l1.y) {
         return false;
      }

      return true;
   },

   stopGame:function (){
      this._bird.setState(STATE_DEAD);
      this.setActive(false);
      this.setGameState(STATE_GAMEOVER);
   },

   jump:function (){
      this._bird.jump();
   },

   update:function (dt){
      // neu manager chua duoc kich hoat thi khong lam gi
      // Nguoc lai, neu manager duoc kich hoat
     if(this.active == true){


        // set diem so hien tai
        this._scoreBoard.setScore(this.currentScore);



        // di chuyen obstacle
        this.justPassBird = false;
        this.timeTick += dt;
        if(this.timeTick >= this.respawnTimeInterval){
           var newObstacle = new Obstacle(this.obstacleSpawnPosition);
           this._obstacles.push(newObstacle);
           this.getParent().addChild(newObstacle);

           this.timeTick = 0;
        }
        this.moveObstacles(dt);


        for(let i = 0 ; i <this._obstacles.length; ++i){
           // kiem tra xem bird da vuot qua obstacle chua
           if(this._obstacles[i].x<=this._bird.getPosition().x && !this._obstacles[i].justPassed()){
              this._obstacles[i].setPassed(true);
              this.currentScore++;
           }

           // loai bo obstacle
           if(this._obstacles[i].x< -100){
              var obstacle = this._obstacles[i];
              this._obstacles.splice(i,1);
              i--;
              this.getParent().removeChild(obstacle);
           }

           // kiem tra collision
           var pipesBoundingBox=this._obstacles[i].getPipesBoundingBox();
           if(pipesBoundingBox.length !=0){
              var birdBoundingBox = this._bird.getBirdBoundingBox();
              if(this.doOverlap(pipesBoundingBox[0], birdBoundingBox) || this.doOverlap(pipesBoundingBox[1], birdBoundingBox)){
                 this.stopGame();
              }
           }

           // kiem tra neu bird di ra khoi man hinh
           if(this._bird.getPosition().y<0 ){
              this.stopGame();
           }


        }
     }
   },
});