/**
 * Level
 * @summary Level
 * @author wh
 */
var Level = qc.defineBehaviour('qc.engine.Level', qc.Behaviour, function() {
	this.isAnti = false;
	this.levelId = 0;
	this.levelName = 'N/A';

	this.doors = [];
	this.triggers = [];
	this.blocks = [];
	this.spawnPoint = null;
}, {
	isAnti: qc.Serializer.BOOLEAN,
	levelId: qc.Serializer.INT,
	levelName: qc.Serializer.STRING
});

Level.prototype.awake = function() {
	GameManager.$.levels.push(this);
	this.initLevel();
	this.gameObject.visible = false;
};

Level.prototype.initLevel = function() {
	for(var i = 0; i < this.doors.length; i++){
		this.doors[i].find('Body').Trigger.target = GameManager.$.hero;
		this.doors[i].find('Body').Trigger.onTouch.add(function(){
			console.log('DOOR', this.Exit.target, this.Exit.isAnti);
			if(GameManager.$.hero.Hero.touchedDoors.indexOf(this.Exit) < 0){
				GameManager.$.hero.Hero.touchedDoors.push(this.Exit);
			}
		}, this.doors[i]);
		this.doors[i].find('Body').Trigger.onUntouch.add(function(){
			console.log('LEAVE DOOR', this.Exit.target, this.Exit.isAnti);
			if(GameManager.$.hero.Hero.touchedDoors.indexOf(this.Exit) > 0){
				GameManager.$.hero.Hero.touchedDoors.splice(GameManager.$.hero.Hero.touchedDoors.indexOf(this.Exit), 1);
				i--;
			}
		}, this.doors[i]);
	}

	console.log(this.levelId);
	switch(this.levelId){
		case 1:
			if(this.triggers.length > 0){
				this.triggers[0].Trigger.target = GameManager.$.hero;
				this.triggers[0].Trigger.onTouch.addOnce(function(){
					TopTip.$.showTip('Press "R" to restart');
				}, this);
			}
			TopTip.$.showTip('Use "WSAD" or D-pad to move.');
			console.log(this.doors);
			if(this.doors.length > 0){
				this.doors[0].find('Body').Trigger.onTouch.addOnce(function(){
					TopTip.$.showTip('Press "Z" to enter.');
				});
			}
		break;
	}
};

Level.prototype.endLevel = function() {
	this.removeColliders();
	this.gameObject.visible = false;
};

Level.prototype.startLevel = function() {
	if(this.isAnti){
		GameManager.$.currentLevelR = this.levelId;
	}else{
		GameManager.$.currentLevel = this.levelId;
	}
	this.bindObjects();
	this.initLevel();
	this.gameObject.visible = true;
};

Level.prototype.bindObjects = function() {
	this.spawnPoint = null;
	this.doors = [];
	this.triggers = [];
	this.blocks = [];
	for(var i = 0; i < this.gameObject.children.length; i++){
		var obj = this.gameObject.children[i];
		if(obj.name === 'SpawnPoint'){
			GameManager.$.spawnPoint = obj;
			this.spawnPoint = null;
		}else if(obj.Block){
			this.blocks.push(obj);
			obj.Block.body.RigidBody.addCollide(GameManager.$.hero);
		}else if(obj.Exit){
			this.doors.push(obj);
		}else if(obj.Trigger){
			this.triggers.push(obj);
		}
	}
};

Level.prototype.removeColliders = function() {
	for(var i = 0; i < this.gameObject.children.length; i++){
		var obj = this.gameObject.children[i];
		if(obj.Block){
			obj.Block.body.RigidBody.removeCollide(GameManager.$.hero);
		}
	}
};
