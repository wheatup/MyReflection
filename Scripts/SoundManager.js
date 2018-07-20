// define a user behaviour
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

//静音背景音乐
SoundManager.prototype.onMuteBGM = function() {
   this.gameObject.find('BGM').volume = 0;
};

//取消静音背景音乐
SoundManager.prototype.onUnmuteBGM = function() {
   this.find('BGM').volume = 0.5;
};

//静音音效
SoundManager.prototype.onMuteSFX = function() {
   for(var i = 0; i < this.gameObject.children.length; i++){
		if(this.gameObject.children[i].name !== 'BGM'){
			this.gameObject.children[i].volume = 0;
		}
	}
};

//取消静音音效
SoundManager.prototype.onUnmuteSFX = function() {
	for(var i = 0; i < this.gameObject.children.length; i++){
		if(this.gameObject.children[i].name !== 'BGM'){
			this.gameObject.children[i].volume = 1;
		}
	}
};

// 播放背景音乐
SoundManager.prototype.playBGM = function() {
	this.gameObject.find('BGM').volume = 0.5;
   this.gameObject.find('BGM').loop = true;
   this.gameObject.find('BGM').play();
};

// 播放音效
SoundManager.prototype.playSFX = function(sfx) {
	this.gameObject.find(sfx).play();
};

// 停止音效
SoundManager.prototype.stopSFX = function(sfx) {
	this.gameObject.find(sfx).stop();
};
