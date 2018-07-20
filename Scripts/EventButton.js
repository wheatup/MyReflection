/**
 * EventButton
 * @summary A single text button behavior
 * @author wh
 */
var EventButton = qc.defineBehaviour('qc.engine.EventButton', qc.Behaviour, function() {
	this.changeCursor = true;
	this.signal = 'N/A';
}, {
	changeCursor: qc.Serializer.BOOLEAN,
	signal: qc.Serializer.STRING,
	data: qc.Serializer.STRING
});

EventButton.prototype.awake = function() {
	var orgX = this.gameObject.anchoredX;
	this.gameObject.interactive = true;
	this.gameObject.onEnter.add(function(){
		wh.Tween.remove(this.gameObject);
		wh.Tween.get(this.gameObject).to({anchoredX:orgX + 10}, 200, wh.Easing.Quad.easeOut);
		if(this.changeCursor){
			document.body.style.cursor = 'pointer';
		}
	}, this);
	this.gameObject.onExit.add(function(){
		wh.Tween.remove(this.gameObject);
		wh.Tween.get(this.gameObject).to({anchoredX:orgX}, 200, wh.Easing.Quad.easeIn);
		if(this.changeCursor){
			document.body.style.cursor = 'default';
		}
	}, this);
	this.gameObject.onClick.add(function(){
		var data = this.data;
		if(this.data && (data.startsWith('{') || data.startsWith('['))){
			data = JSON.parse(data);
		}
		whevent.call(this.signal, data);
	}, this);
};
