/**
 * Database
 * @summary Database
 * @author wh
 */
var Database = qc.defineBehaviour('qc.engine.Database', qc.Behaviour, function() {
	Database.$ = this;

	this.shownControls = false;
	this.shownRestart = false;
	this.shownEnterDoor = false;
	this.lastPlayerPos = null;
}, {

});

Database.prototype.awake = function() {

};
