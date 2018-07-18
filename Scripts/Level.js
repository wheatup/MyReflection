/**
 * Level
 * @summary Level
 * @author wh
 */
var Level = qc.defineBehaviour('qc.engine.Level', qc.Behaviour, function() {
	this.isAnti = false;
	this.levelId = 0;
	this.levelName = 'N/A';
}, {
	isAnti: qc.Serializer.BOOLEAN,
	levelId: qc.Serializer.INT,
	levelName: qc.Serializer.STRING
});

Level.prototype.awake = function() {
	GameManager.$.levels.push(this);
	this.gameObject.visible = false;
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
	this.gameObject.visible = true;
	this.addColliders();
};

Level.prototype.addColliders = function() {
	for(var i = 0; i < this.gameObject.children.length; i++){
		var obj = this.gameObject.children[i];
		if(obj.name === 'SpawnPoint'){
			GameManager.$.spawnPoint = obj;
		}else if(obj.Block){
			obj.Block.body.RigidBody.addCollide(GameManager.$.hero);
			// GameManager.$.hero.RigidBody.collides.push(obj.Block.body);
		}
	}
};

Level.prototype.removeColliders = function() {
	for(var i = 0; i < this.gameObject.children.length; i++){
		var obj = this.gameObject.children[i];
		if(obj.Block){
			obj.Block.body.RigidBody.removeCollide(GameManager.$.hero);
			// GameManager.$.hero.RigidBody.removeCollide(obj.Block.body);
		}
	}
};
