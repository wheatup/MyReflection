/**
 * TopTip
 * @summary Show a little tip text above the screen
 * @author wh
 */
var TopTip = qc.defineBehaviour('qc.engine.TopTip', qc.Behaviour, function() {
	TopTip.$ = this;
}, {
	topText: qc.Serializer.NODE,
	btmText: qc.Serializer.NODE
});

TopTip.prototype.awake = function() {
	this.topText.visible = false;
	this.btmText.visible = false;
	this.topText.alpha = 0;
	this.btmText.alpha = 0;

	whevent.bind('START_LEVEL', this.onStartLevel, this);
};

TopTip.prototype.onStartLevel = function(level) {
	// wh.Tween.remove(this.topText);
	// wh.Tween.remove(this.btmText);
	// this.topText.visible = false;
	// this.btmText.visible = false;
	// this.topText.alpha = 0;
	// this.btmText.alpha = 0;
};

TopTip.prototype.showTip = function(tip, tip2) {
	this.topText.text = LanguageManager.$.getString(tip + '');
	this.topText.alpha = 0;
	this.topText.visible = true;
	wh.Tween.remove(this.topText);
	wh.Tween.get(this.topText).to({alpha:1}, 1000).wait(3000).to({alpha: 0}, 1000).call(function(){this.topText.visible = false;}, null, this);
	this.btmText.text = LanguageManager.$.getString((tip2 ? tip2 : tip) + '');
	this.btmText.alpha = 0;
	this.btmText.visible = true;
	wh.Tween.remove(this.btmText);
	wh.Tween.get(this.btmText).to({alpha:1}, 1000).wait(3000).to({alpha: 0}, 1000).call(function(){this.btmText.visible = false;}, null, this);
};
