/**
 * Hero
 * @summary Hero
 * @author wh
 */
var Hero = qc.defineBehaviour('qc.engine.Hero', qc.Behaviour, function() {
	Hero.$ = this;
	this.speed = 150;
	this.jumpSpeed = 400;
	this.gravity = 900;
	this.body = null;
	this.curAction = 'IDLE';

	this.curDir = 0;
	this.jumping = false;

	this.idleAnimation = ['hero_idle.png'];
	this.runAnimation = ['hero_run1.png', 'hero_run2.png', 'hero_run3.png', 'hero_run4.png'];
	this.jumpAnimation = ['hero_jump.png'];
	this.curAnim = null;
	this._heroSprite = null;
	this._heroRSprite = null;
	this._tickIndex = 0;
	this._animDelay = 8;
	this.touchedDoors = [];
}, {

});

Hero.prototype.awake = function() {
	this.body = this.gameObject.RigidBody;
	this.body.gravity.y = this.gravity;
	this._heroSprite = this.gameObject.find('Sprite');

	whevent.bind('START_LEVEL', this.onStartLevel, this);
};

Hero.prototype.onStartLevel = function(level) {

};

Hero.prototype.update = function() {
	this.applyInput();
	this.applyMovement();
	this.calcAnim();
};


Hero.prototype.break = function() {
	this.curAction = 'IDLE';
	this.curDir = 0;
	this.body.velocity.x = 0;
};

Hero.prototype.jump = function() {
	this.jumping = true;
};

Hero.prototype.move = function(factor) {
	this.curAction = 'MOVE';
	this.curDir = factor;

};

Hero.prototype.applyInput = function() {
	this.jumping = Control.$.UP.isDown;

	if(Control.$.LEFT.isJustDown){
		if(this.curAction === 'IDLE'){
			this.move(-1);
		}else if(Control.$.RIGHT.isDown){
			this.break();
		}

	}else if(Control.$.RIGHT.isJustDown){
		if(this.curAction === 'IDLE'){
			this.move(1);
		}else if(Control.$.LEFT.isDown){
			this.break();
		}
	}

	if(Control.$.LEFT.isJustUp){
		if(Control.$.RIGHT.isDown){
			this.move(1);
		}else{
			this.break();
		}
	}else if(Control.$.RIGHT.isJustUp){
		if(Control.$.LEFT.isDown){
			this.move(-1);
		}else{
			this.break();
		}
	}

	if(Control.$.ACTION.isJustDown && this.touchedDoors.length > 0){
		for(var i = 0; i < this.touchedDoors.length; i++){
			if(this.touchedDoors[i].targets.length > 0){
				SoundManager.$.playSFX('Door');
				for(var ii = 0; ii < this.touchedDoors[i].targets.length; ii++){
					if(this.touchedDoors[i].targets[ii] > 0){
						GameManager.$.switchLevel(this.touchedDoors[i].targets[ii], ii === 0);
					}
				}

			}
		}
		this.touchedDoors = [];
	}

	if(Control.$.R.isJustDown){
		GameManager.$.restartLevel();
	}
};

Hero.prototype.applyMovement = function() {
	if(this.jumping){
		if(this.canJump()){
			SoundManager.$.playSFX('Jump');
			this.body.velocity.y = -this.jumpSpeed;
		}
	}else if(this.canJump()){
		this.body.velocity.y = 0;
	}

	if(this.curDir === -1 && !this.body.touching.left){
		this.body.velocity.x = -this.speed;
	}else if(this.curDir === 1 && !this.body.touching.right){
		this.body.velocity.x = this.speed;
	}else{
		this.body.velocity.x = 0;
	}
};

Hero.prototype.calcAnim = function() {
	if(GameManager.$.tick % this._animDelay === 0){
		this._tickIndex++;
	}

	if(this.curDir < 0){
		this._heroSprite.scaleX = -1;
	}else if(this.curDir > 0){
		this._heroSprite.scaleX = 1;
	}

	if(!this.canJump()){
		this.curAnim = this.jumpAnimation;
	}else{
		switch(this.curAction){
			case 'IDLE':
				this.curAnim = this.idleAnimation;
				break;
			case 'MOVE':
				this.curAnim = this.runAnimation;
				break;
		}
	}
	this._heroSprite.frame = this.curAnim[this._tickIndex % this.curAnim.length];
};

Hero.prototype.canJump = function() {
	return this.gameObject.anchoredY >= 0 || this.body.touching.down;
};

Hero.prototype.die = function() {
	whevent.call('DIE');
};

Hero.prototype.postUpdate = function() {
	if(this.gameObject.anchoredY > 0){
		this.gameObject.anchoredY = 0;
	}
	if(!GameManager.$.heroR) return;
	GameManager.$.heroR.anchoredX = this.gameObject.anchoredX;
	GameManager.$.heroR.anchoredY = this.gameObject.anchoredY;
	if(!this._heroRSprite){
		this._heroRSprite = GameManager.$.heroR.find('Sprite');
	}
	this._heroRSprite.frame = this._heroSprite.frame;
	this._heroRSprite.scaleX = this._heroSprite.scaleX;
};
