/**
 * Exit
 * @summary It is actually a door
 * @author wh
 */
var Exit = qc.defineBehaviour('qc.engine.Exit', qc.Behaviour, function() {
	this.isAnti = false;
	this.target = 0;
	this.distance = -1;
}, {
	targets: qc.Serializer.INTS,
	isAnti: qc.Serializer.BOOLEAN,
	image: qc.Serializer.NODE,
	body: qc.Serializer.NODE
});

Exit.prototype.awake = function() {
	if(this.isAnti){
		this.body.scaleY = -1;
		this.body.top = -2 * this.gameObject.anchoredY - 12;
		this.body.bottom = 2 * this.gameObject.anchoredY;
	}
};
