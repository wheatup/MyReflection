/**
 * GameManager
 * @summary GameManager
 * @author wh
 */
var GameManager = qc.defineBehaviour('qc.engine.GameManager', qc.Behaviour, function() {
	GameManager.$ = this;

	this.tick = 0;
	this.currentLevel = 0;
	this.currentLevelR = 0;
	this.hero = null;
	this.heroR = null;
	this.spawnPoint = null;
	this.levels = [];
}, {
	pfHero: qc.Serializer.PREFAB,
	pfHeroR: qc.Serializer.PREFAB,
	upperWorld: qc.Serializer.NODE,
	bottomWorld: qc.Serializer.NODE,
	upperLevelContainer: qc.Serializer.NODE,
	bottomLevelContainer: qc.Serializer.NODE
});

GameManager.prototype.update = function() {
	this.tick++;
};

GameManager.prototype.awake = function() {
	whevent.bind('DIE', this.onPlayerDie, this);
};

GameManager.prototype.onEnable = function() {
	this.startGame();
};

GameManager.prototype.onPlayerDie = function() {
	this.hero.anchoredX = this.spawnPoint.anchoredX;
	this.hero.anchoredY = this.spawnPoint.anchoredY;
};

GameManager.prototype.startGame = function() {
	this.hero = this.game.add.clone(this.pfHero, this.upperWorld);
	this.heroR = this.game.add.clone(this.pfHeroR, this.bottomWorld);
	this.switchLevel(1, false);
	this.switchLevel(1, true);
	if(this.spawnPoint){
		this.hero.anchoredX = this.spawnPoint.anchoredX;
		this.hero.anchoredY = this.spawnPoint.anchoredY;
	}
};

GameManager.prototype.switchLevel = function(levelId, isAnti) {
	console.log('Switch level', levelId, isAnti);
	if(isAnti && this.currentLevelR){
		this.getLevel(this.currentLevelR, true).endLevel();
	}else if(!isAnti && this.currentLevel){
		this.getLevel(this.currentLevel, false).endLevel();
	}
	this.getLevel(levelId, isAnti).startLevel();
};

GameManager.prototype.getLevel = function(levelId, isAnti) {
	for(var i = 0; i < this.levels.length; i++){
		if(this.levels[i].levelId === levelId && !!this.levels[i].isAnti === !!isAnti){
			return this.levels[i];
		}
	}
	return null;
};
