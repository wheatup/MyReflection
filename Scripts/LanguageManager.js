/**
 * LanguageManager
 * @summary LanguageManager
 * @author wh
 */
var LanguageManager = qc.defineBehaviour('qc.engine.LanguageManager', qc.Behaviour, function() {
	LanguageManager.$ = this;
	this.currentLang = null;
	this.currentLangIndex = 0;
}, {
	uiRoot: qc.Serializer.NODE,
	languageButton: qc.Serializer.NODE
});

LanguageManager.prototype.awake = function() {
	//window.avaliable_lang = ['en', 'zh_CN'];
	if(window.avaliable_lang && window['lang_' + window.avaliable_lang[0]]){
		this.currentLang = window['lang_' + window.avaliable_lang[0]];
	}

	whevent.bind('$CHANGE_LANG', function(){
		if(!window.avaliable_lang) return;
		this.currentLangIndex = (this.currentLangIndex + 1) % window.avaliable_lang.length;
		this.switchLanguage(window.avaliable_lang[this.currentLangIndex]);
	}, this);
};

LanguageManager.prototype.replaceChildrenTexts = function(ele) {
	for(var i = 0; i < ele.children.length; i++){
		if(typeof ele.children[i].text === 'string' && !ele.children[i].name.startsWith('_')){
			// if(currentLang.$$SIZE$$){
			// 	ele.children[i].fontSize *= currentLang.$$SIZE$$;
			// }else{
			//
			// }
			if(!ele.children[i].cookie){
				ele.children[i].cookie = ele.children[i].text;
			}

			if(!ele.children[i].tempFont){
				ele.children[i].tempFont = ele.children[i].font;
			}

			if(!ele.children[i].orgSize){
				ele.children[i].orgSize = ele.children[i].fontSize;
			}

			if(this.currentLang.$$FONT$$){
				ele.children[i].fontFamily = 0;
			}else if(ele.children[i].tempFont){
				ele.children[i].fontFamily = 1;
				ele.children[i].font = ele.children[i].tempFont;
			}

			if(this.currentLang.$$SIZE$$){
				ele.children[i].fontSize = this.currentLang.$$SIZE$$ * ele.children[i].orgSize;
			}else{
				ele.children[i].fontSize = ele.children[i].orgSize;
			}

			ele.children[i].text = this.getString(ele.children[i].cookie);
		}else if(ele.children[i].children.length > 0){
			this.replaceChildrenTexts(ele.children[i]);
		}
	}
};

LanguageManager.prototype.switchLanguage = function(lang) {
	this.currentLang = window['lang_' + lang];
	this.replaceChildrenTexts(this.uiRoot);
	this.languageButton.text = window['lang_' + lang].$$TITLE$$;

	if(!this.languageButton.tempFont){
		this.languageButton.tempFont = this.languageButton.font;
	}
	if(!ele.languageButton.orgSize){
		ele.languageButton.orgSize = ele.children[i].fontSize;
	}

	if(window['lang_' + lang].$$FONT$$){

		this.languageButton.fontFamily = 0;
	}else{
		this.languageButton.fontFamily = 1;
		this.languageButton.font = this.languageButton.tempFont;
	}

	if(this.currentLang.$$SIZE$$){
		this.languageButton.fontSize = this.currentLang.$$SIZE$$ * this.languageButton.orgSize;
	}else{
		this.languageButton.fontSize = this.languageButton.orgSize;
	}
};

LanguageManager.prototype.getString = function(key) {
	if(!this.currentLang || this.currentLang.$$ORIGINAL$$){
		return key + '';
	}else{
		return this.currentLang[key] + '';
	}
};
