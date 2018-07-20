/**
 * Block
 * @summary Just a block
 * @author wheatup
 */
var Block = qc.defineBehaviour('qc.engine.Block', qc.Behaviour, function() {

}, {
	isAnti: qc.Serializer.BOOLEAN,
	image: qc.Serializer.NODE,
	body: qc.Serializer.NODE
});

Block.prototype.awake = function() {
	// Fix the rigid body for the anti block
	if(this.isAnti){
		this.body.scaleY = -1;
		this.body.top = -2 * this.gameObject.anchoredY;
		this.body.bottom = 2 * this.gameObject.anchoredY;
	}
};
