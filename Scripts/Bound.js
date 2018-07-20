/**
 * Bound
 * @summary Bound
 * @author wh
 */
var Bound = qc.defineBehaviour('qc.engine.Bound', qc.Behaviour, function() {
	Bound.$ = this;
}, {

});

Bound.prototype.awake = function() {
	whevent.bind('START_GAME', this.onGameStart, this);
};

Bound.prototype.onGameStart = function() {
	for(var i = 0; i < this.gameObject.children.length; i++){
		GameManager.$.hero.Hero.body.addCollide(this.gameObject.children[i]);
	}
};
