/**
 * Control
 * @summary Manage the user input
 * @author wh
 */
var Control = qc.defineBehaviour('qc.engine.Control', qc.Behaviour, function() {
	Control.$ = this;

	var KeyEvent = {isDown: false, isJustDown: false, isJustUp: false};

	this.UP = new Control.KeyEvent();
	this.DOWN = new Control.KeyEvent();
	this.LEFT = new Control.KeyEvent();
	this.RIGHT = new Control.KeyEvent();
	this.ACTION = new Control.KeyEvent();
	this.R = new Control.KeyEvent();
}, {

});

Control.KeyEvent = function(){
	this.isDown = false;
	this.isJustDown = false;
	this.isJustUp = false;
};

Control.prototype.awake = function() {
	this.game.input.onKeyDown.add(this.onKeyDown, this);
	this.game.input.onKeyUp.add(this.onKeyUp, this);
};

Control.prototype.onKeyDown = function(keyCode) {
	switch(keyCode){
		case qc.Keyboard.UP:
		case qc.Keyboard.W:
			this.UP.isDown = true;
			this.UP.isJustDown = true;
			break;
		case qc.Keyboard.DOWN:
		case qc.Keyboard.S:
			this.DOWN.isDown = true;
			this.DOWN.isJustDown = true;
			break;
		case qc.Keyboard.LEFT:
		case qc.Keyboard.A:
			this.LEFT.isDown = true;
			this.LEFT.isJustDown = true;
			break;
		case qc.Keyboard.RIGHT:
		case qc.Keyboard.D:
			this.RIGHT.isDown = true;
			this.RIGHT.isJustDown = true;
			break;
		case qc.Keyboard.Z:
			this.ACTION.isDown = true;
			this.ACTION.isJustDown = true;
			break;
		case qc.Keyboard.R:
			this.R.isDown = true;
			this.R.isJustDown = true;
			break;
	}
};

Control.prototype.onKeyUp = function(keyCode) {
	switch(keyCode){
		case qc.Keyboard.UP:
		case qc.Keyboard.W:
			this.UP.isDown = false;
			this.UP.isJustUp = true;
			break;
		case qc.Keyboard.DOWN:
		case qc.Keyboard.S:
			this.DOWN.isDown = false;
			this.DOWN.isJustUp = true;
			break;
		case qc.Keyboard.LEFT:
		case qc.Keyboard.A:
			this.LEFT.isDown = false;
			this.LEFT.isJustUp = true;
			break;
		case qc.Keyboard.RIGHT:
		case qc.Keyboard.D:
			this.RIGHT.isDown = false;
			this.RIGHT.isJustUp = true;
			break;
		case qc.Keyboard.Z:
			this.ACTION.isDown = false;
			this.ACTION.isJustUp = true;
			break;
		case qc.Keyboard.R:
			this.R.isDown = false;
			this.R.isJustUp = true;
			break;
	}
};

Control.prototype.postUpdate = function() {
	this.UP.isJustDown = false;
	this.UP.isJustUp = false;
	this.DOWN.isJustDown = false;
	this.DOWN.isJustUp = false;
	this.LEFT.isJustDown = false;
	this.LEFT.isJustUp = false;
	this.RIGHT.isJustDown = false;
	this.RIGHT.isJustUp = false;
	this.ACTION.isJustDown = false;
	this.ACTION.isJustUp = false;
	this.R.isJustDown = false;
	this.R.isJustUp = false;
};
