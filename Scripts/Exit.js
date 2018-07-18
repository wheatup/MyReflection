/**
 * Exit
 * @summary Exit
 * @author wh
 */
var Exit = qc.defineBehaviour('qc.engine.Exit', qc.Behaviour, function() {
	this.isAnti = false;
	this.target = 0;
	this.distance = -1;
}, {
	target: qc.Serializer.INT,
	isAnti: qc.Serializer.BOOLEAN,
	image: qc.Serializer.NODE,
	body: qc.Serializer.NODE
});

Exit.prototype.awake = function() {
	if(this.isAnti){
		this.body.pivotY = 0;
		this.body.anchoredY = -2 * this.gameObject.anchoredY;
	}
};

Exit.prototype.update = function() {
	if(!GameManager.$.hero) return;
	this.distance = this.getDistance();
	if(this.distance > 10 && GameManager.$.hero.Hero.overlaps.indexOf(this) >= 0){
		GameManager.$.hero.Hero.overlaps.splice(GameManager.$.hero.Hero.overlaps.indexOf(this), 1);
	}else if(this.distance <= 10 && GameManager.$.hero.Hero.overlaps.indexOf(this) < 0){
		GameManager.$.hero.Hero.overlaps.push(this);
	}
};

Exit.prototype.getDistance = function() {
	var x1 = GameManager.$.hero.getWorldPosition().x;
	var y1 = GameManager.$.hero.getWorldPosition().y;
	var x2 = this.body.getWorldPosition().x;
	var y2 = this.body.getWorldPosition().y;
	return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
};
