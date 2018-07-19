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
		this.body.pivotY = 1;
		this.body.anchoredY = -2 * this.gameObject.anchoredY;
	}
};
