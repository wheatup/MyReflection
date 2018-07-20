/**
 * Level
 * @summary Universal level behavior
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
	this.gameObject.visible = false;
};

Level.prototype.initLevel = function() {
	for(var i = 0; i < this.doors.length; i++){
		this.doors[i].find('Body').Trigger.target = GameManager.$.hero;
		this.doors[i].find('Body').Trigger.onTouch.add(function(){
			if(!Database.$.shownEnterDoor){
				TopTip.$.showTip('Press "Z" to enter.');
				Database.$.shownEnterDoor = true;
			}
			if(GameManager.$.hero.Hero.touchedDoors.indexOf(this.Exit) < 0){
				GameManager.$.hero.Hero.touchedDoors.push(this.Exit);
			}
		}, this.doors[i]);
		this.doors[i].find('Body').Trigger.onUntouch.add(function(){
			if(GameManager.$.hero.Hero.touchedDoors.indexOf(this.Exit) >= 0){
				GameManager.$.hero.Hero.touchedDoors.splice(GameManager.$.hero.Hero.touchedDoors.indexOf(this.Exit), 1);
				i--;
			}
		}, this.doors[i]);
	}

	for(i = 0; i < this.triggers.length; i++){
		this.triggers[i].Trigger.target = GameManager.$.hero;
		if(this.triggers[i].name === 'Death'){
			this.triggers[i].Trigger.onTouch.add(function(){
				if(!Database.$.shownRestart){
					TopTip.$.showTip('Press "R" to restart.');
					Database.$.shownRestart = true;
				}
			}, this);
		}
	}

	if(!Database.$.shownControls){
		TopTip.$.showTip('Use "WSAD" or D-pad to move.');
		Database.$.shownControls = true;
	}

	// put individual level behaviors here
	switch(this.levelId){
		case 1:

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
