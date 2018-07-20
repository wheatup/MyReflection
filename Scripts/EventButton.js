/**
 * EventButton
 * @summary EventButton
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
	this.gameObject.interactive = true;
	this.gameObject.onEnter.add(function(){
		if(this.changeCursor){
			document.body.style.cursor = 'pointer';
		}
	}, this);
	this.gameObject.onExit.add(function(){
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
