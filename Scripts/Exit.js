/**
 * Exit
 * @summary It is actually a door
 * @author wh
 */
var Exit = qc.defineBehaviour('qc.engine.Exit', qc.Behaviour, function() {
	this.isAnti = false;
	this.distance = -1;
	this.tagText = 'N/A';
}, {
	targets: qc.Serializer.INTS,
	isAnti: qc.Serializer.BOOLEAN,
	image: qc.Serializer.NODE,
	body: qc.Serializer.NODE,
	doorTag: qc.Serializer.NODE,
	tagText: qc.Serializer.STRING
});

Exit.prototype.awake = function() {
	this.doorTag.text = this.tagText;
	if(this.isAnti){
		this.body.scaleY = -1;
		this.body.top = -2 * this.gameObject.anchoredY - 12;
		this.body.bottom = 2 * this.gameObject.anchoredY;
	}
};
