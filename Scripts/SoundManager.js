/**
 * SoundManager
 * @summary Manage all the sound behaviors
 * @author wh
 */
var SoundManager = qc.defineBehaviour('qc.engine.SoundManager', qc.Behaviour, function() {
   SoundManager.$ = this;

   this.volume = 1;
   this.bgmMuted = false;
   this.sfxMuted = false;
}, {

});

SoundManager.prototype.awake = function() {
	//this.playBGM();
};

SoundManager.prototype.onMuteBGM = function() {
   this.gameObject.find('BGM').volume = 0;
};

SoundManager.prototype.onUnmuteBGM = function() {
   this.find('BGM').volume = 0.5;
};

SoundManager.prototype.onMuteSFX = function() {
   for(var i = 0; i < this.gameObject.children.length; i++){
		if(this.gameObject.children[i].name !== 'BGM'){
			this.gameObject.children[i].volume = 0;
		}
	}
};

SoundManager.prototype.onUnmuteSFX = function() {
	for(var i = 0; i < this.gameObject.children.length; i++){
		if(this.gameObject.children[i].name !== 'BGM'){
			this.gameObject.children[i].volume = 1;
		}
	}
};

SoundManager.prototype.playBGM = function() {
	this.gameObject.find('BGM').volume = 0.5;
   this.gameObject.find('BGM').loop = true;
   this.gameObject.find('BGM').play();
};

SoundManager.prototype.playSFX = function(sfx) {
	this.gameObject.find(sfx).play();
};

SoundManager.prototype.stopSFX = function(sfx) {
	this.gameObject.find(sfx).stop();
};
