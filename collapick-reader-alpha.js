/**
 * Base Ajax Class
 * 
 * @author petteritorssonen
 * @version $Rev$
 * @requires OtherClassName
 */

var AjaxService = function(options, jQueryObject){
	
	var that = {},
	url = false,
	method = false;
	if(typeof jQueryObject !== 'undefined'){
		jQuery = jQueryObject;
	}
	
	init(options);
	function init (options) {
		if(typeof options !== 'undefined'){
			url = options.url;
		}else{
			alert('Define options');
		}
	}
	
	
	that.sendRequest = function (data, fallbackFn) {
		jQuery.getJSON(url, data, fallbackFn);
	}
	
	that.sendJsonpRequest = function (data, fallbackFn) {
		jQuery.getJSON(url+'?jsoncallback=?', data, fallbackFn);
	}
	
	that.getUrl = function  () {
		return url;
	}
	
	that.setUrl = function  (newUrl) {
		url = newUrl;
	}
	
	
	
	return that;
};
var CollapickReader = function(){

	var collapickContainer = false,
	container = false,
	requestInited = false,
	globalInterval = false,
	feedbackAjaxService = false;


	function getDataFromServer (options) {
		var data = {
			www: window.location.toString(),
			apikey: typeof options.apikey !== 'undefined' ? options.apikey: 'not-defined',
			count: typeof options.count !== 'undefined' ? options.count : 10
		};
		feedbackAjaxService.sendJsonpRequest(data, function  (result) {
			var feedbacks = result.feedbacks;
			var tmpHtml = "";
			for (var i=0; i < feedbacks.length; i++) {
				var tmp = (feedbacks[i].elements);
				Logger.log(tmp);
				tmpHtml = tmpHtml + tmp;
			};
			container.html(tmpHtml);
		});
	}

	return{
		init: function  (options) {
			//Initing classes
			if(typeof options == 'undefined'){
				alert('Define Options');
				return;
			}
			container = options.container;
			feedbackAjaxService = AjaxService({url: options.url});
			getDataFromServer(options);

		}
	};
}();

var Logger = function(){
	var logIt = false;
	return{
		log: function  (argument) {
			if(logIt === true){
				if(typeof console !== 'undefined' && typeof console.log !== 'undefined'){
					console.log(argument);
				}else{
					alert(argument);
				}
			}	
		}
	};
}();