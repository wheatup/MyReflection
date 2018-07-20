/**
 * Trigger
 * @summary A trigger object, when player enters, it triggers
 * @author wh
 */
var Trigger = qc.defineBehaviour('qc.engine.Trigger', qc.Behaviour, function() {
	this.activate = true;

	this.onTouch = new Phaser.Signal();
	this.onUntouch = new Phaser.Signal();
	this.onEnter = new Phaser.Signal();
	this.onExit = new Phaser.Signal();
	// an alias for the exit event
	this.onLeave = this.onExit;

	this.isEnter = false;
	this.isTouch = false;
	this._wasEnter = false;
	this._wasTouch = false;

	this._myRect = null;
	this._targetRect = null;
}, {
	target: qc.Serializer.NODE,
	activate: qc.Serializer.BOOLEAN
});

Trigger.prototype.update = function() {
	if(!this.target || !this.activate) return;
	this._myRect = this.gameObject.phaser.getBounds();
	this._targetRect = this.target.phaser.getBounds();

	this.isTouch = Phaser.Rectangle.intersects(this._myRect, this._targetRect);
	if(!this._wasTouch && this.isTouch){
		this.onTouch.dispatch();
	}else if(this._wasTouch && !this.isTouch){
		this.onUntouch.dispatch();
	}

	this.isEnter = Phaser.Rectangle.containsRect(this._myRect, this._targetRect);
	if(!this._wasEnter && this.isEnter){
		this.onEnter.dispatch();
	}else if(this._wasEnter && !this.isEnter){
		this.onExit.dispatch();
	}

	this._wasEnter = this.isEnter;
	this._wasTouch = this.isTouch;
};
