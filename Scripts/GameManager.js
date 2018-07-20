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

	this._lastHeight = 0;
}, {
	pfHero: qc.Serializer.PREFAB,
	pfHeroR: qc.Serializer.PREFAB,
	upperWorld: qc.Serializer.NODE,
	bottomWorld: qc.Serializer.NODE,
	upperLevelContainer: qc.Serializer.NODE,
	bottomLevelContainer: qc.Serializer.NODE,
	mainMenuView: qc.Serializer.NODE,
	gameView: qc.Serializer.NODE,

});

GameManager.prototype.update = function() {
	this.tick++;
	this.checkWindowSize();
};

GameManager.prototype.awake = function() {
	this.gameView.visible = false;
	this.mainMenuView.visible = true;
	whevent.bind('DIE', this.onPlayerDie, this);
	whevent.bind('$START', this.onClickStart, this);
};

GameManager.prototype.onClickStart = function() {
	this.startGame(1);
};

GameManager.prototype.onPlayerDie = function() {
	this.hero.anchoredX = this.spawnPoint.anchoredX;
	this.hero.anchoredY = this.spawnPoint.anchoredY;
};

GameManager.prototype.restartLevel = function() {
	this.switchLevel(this.currentLevel, false);
	this.switchLevel(this.currentLevelR, true);
	if(this.spawnPoint){
		this.hero.anchoredX = this.spawnPoint.anchoredX;
		this.hero.anchoredY = this.spawnPoint.anchoredY;
	}
};

GameManager.prototype.startGame = function(level) {
	this.mainMenuView.visible = false;
	this.gameView.visible = true;
	SoundManager.$.playBGM();
	if(!this.hero){
		this.hero = this.game.add.clone(this.pfHero, this.upperWorld);
	}
	if(!this.heroR){
		this.heroR = this.game.add.clone(this.pfHeroR, this.bottomWorld);
	}
	this.switchLevel(level, false);
	this.switchLevel(level, true);
	if(this.spawnPoint){
		this.hero.anchoredX = this.spawnPoint.anchoredX;
		this.hero.anchoredY = this.spawnPoint.anchoredY;
	}
	whevent.call('START_GAME');
};

GameManager.prototype.switchLevel = function(levelId, isAnti) {
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


GameManager.prototype.checkWindowSize = function(){
    if(this._lastHeight == 0){
        this._lastHeight = this.game.height;
        return;
    }

    if(this._lastHeight != this.game.height){
        this.game.phaser.physics.arcade.isPaused = true;
    }else{
        this.game.phaser.physics.arcade.isPaused = false;
    }

    this._lastHeight = this.game.height;
};
