/**
 * Block
 * @summary Block
 * @author wh
 */
var Block = qc.defineBehaviour('qc.engine.Block', qc.Behaviour, function() {

}, {
	isAnti: qc.Serializer.BOOLEAN,
	image: qc.Serializer.NODE,
	body: qc.Serializer.NODE
});

Block.prototype.awake = function() {
	if(this.isAnti){
		this.body.pivotY = 0;
		this.body.anchoredY = -2 * this.gameObject.anchoredY;
	}
};
