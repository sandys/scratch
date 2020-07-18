var dmlfmcWrapperElement = document.getElementById("dml_fmc_wrapper");

dmlfmcWrapperElement.style.transition = "all 0.5s;";

var fmc_banner_cta_active = true;

var fmcCSSid = 'fmcStyleSheet';

let sessionTimeString = (new Date()).getTime();

var fmcFlLgPp = false;

//var fmc_pagehead  = document.getElementsByTagName('head')[0];
var fmc_pagelink  = document.createElement('link');
fmc_pagelink.id   = fmcCSSid;
fmc_pagelink.rel  = 'stylesheet';
fmc_pagelink.type = 'text/css';
fmc_pagelink.href = 'https://skinanalysis.me/stylesheets/style.min.css?'+sessionTimeString;
fmc_pagelink.media = 'all';
//fmc_pagehead.appendChild(fmc_pagelink);
dmlfmcWrapperElement.appendChild(fmc_pagelink);

window.fmc_hasBanner = typeof window.fmc_hasBanner != "undefined" ? window.fmc_hasBanner : true;
window.fmc_isEmbed = typeof window.fmc_isEmbed != "undefined" ? window.fmc_isEmbed : true;
window.fmc_maxwidth = typeof window.fmc_maxwidth != "undefined" ? window.fmc_maxwidth : "100%";
window.fmc_maxheight = typeof window.fmc_maxheight != "undefined" ? window.fmc_maxheight : window.innerHeight +"px";
window.fmc_bannerwidth= typeof window.fmc_bannerwidth != "undefined" ? window.fmc_bannerwidth : "100%";

window.fmc_bannerSmartText = typeof window.fmc_bannerSmartText != "undefined" ? window.fmc_bannerSmartText : "smart skin analysis";
window.fmc_bannerAcneText = typeof window.fmc_bannerAcneText != "undefined" ? window.fmc_bannerAcneText : "breakout activity";
window.fmc_bannerWrinklesText = typeof window.fmc_bannerWrinklesText != "undefined" ? window.fmc_bannerWrinklesText : "wrinkles";
window.fmc_banner_cta_text = typeof window.fmc_banner_cta_text != "undefined" ? window.fmc_banner_cta_text : "want a personalized skin analysis?";
window.fmc_banner_cta_button = typeof window.fmc_banner_cta_button != "undefined" ? window.fmc_banner_cta_button : "analyze your skin";

window.fmc_isHandAndStone = typeof window.fmc_isHandAndStone != "undefined" ? window.fmc_isHandAndStone : false;
if (window.fmc_isHandAndStone){
	window.fmc_showPrices=false;
}

fmcOpenedThroughPreappLanding = typeof fmcOpenedThroughPreappLanding != "undefined" ? fmcOpenedThroughPreappLanding: false;

dmlfmcWrapperElement.style.width = window.fmc_maxwidth;

function logOnLocalHostFrontEnd(inStringBefore,inVariable){
	inStringBefore = (inStringBefore === undefined) ? '' : inStringBefore;
	if (/localhost/g.test("https://skinanalysis.me") || /192\.168\.0\./g.test("https://skinanalysis.me") || /\.ngrok\.io/g.test("https://skinanalysis.me") || /skinanalysisconsumer-staging\.herokuapp/g.test("https://skinanalysis.me") || fmcFlLgPp){
		if (inVariable == undefined){
			console.log(inStringBefore)
		}else{
			console.log(inStringBefore, inVariable)
		}
	}
}
// GA - START

window.fmcGAsetup = false;
window.fmcGAsetupIndia = false;

function fmcSendGA(eventName,eventValue){
	logOnLocalHostFrontEnd("GOOGLE ANALYTICS: ",eventName + " - " + eventValue)
	eventValue = (eventValue == undefined) ? "" : eventValue;

	let eventLabel;
	if (typeof fmcCustomUID == "undefined"){
		eventLabel = "";
	}else{
		eventLabel = fmcCustomUID;
	}
	if (typeof window.facemap != "undefined"){
		if (typeof window.facemap.hashid != "undefined"){
			eventLabel += " - " + window.facemap.hashid;
		}
	}

	if (window.fmcGAsetup){
		if (window.ga) {
			if (eventLabel != ""){
				window.ga('fmc_gtag.send', 'event', eventName, eventValue, eventLabel); // category - action - label
			}else{
				window.ga('fmc_gtag.send', 'event', eventName, eventValue); // category - action
			}
		}else	if (window.gtag) {
			if (eventLabel != ""){
				window.gtag('event', eventValue, {event_category: eventName, event_label: eventLabel}); // action - {category - label}
			}else{
				window.gtag('event', eventName, {event_category: eventName}); // action - {category}
			}

		} else if (window._gaq) {

			window._gaq.push(['fmc_gtag._trackEvent',eventName,eventValue]); // category - action
		}
	}
}

function fmcSendGAIndia(eventName,eventValue){
	eventValue = (eventValue == undefined) ? "" : eventValue;

	let eventLabel;
	if (typeof fmcCustomUID == "undefined"){
		eventLabel = "";
	}else{
		eventLabel = fmcCustomUID;
	}
	if (typeof window.facemap != "undefined"){
		if (typeof window.facemap.hashid != "undefined"){
			eventLabel += " - " + window.facemap.hashid;
		}
	}

	if (window.fmcGAsetupIndia){
		logOnLocalHostFrontEnd("GOOGLE ANALYTICS India: ",eventName + " - " +  eventValue)
		if (window.ga) {
			if (eventLabel != ""){
				window.ga('fmc_gtag_india.send', 'event', eventName, eventValue, eventLabel); // category - action - label
			}else{
				window.ga('fmc_gtag_india.send', 'event', eventName, eventValue); // category - action
			}
		}
	}
}

function fmcGaEventOnLink (eventActionString){
	fmcSendGA("mainFlow",eventActionString);
	logOnLocalHostFrontEnd("fmcGaEventOnLink function call: ",eventActionString);
	return true;
}


function fmcSendPageViewGA(pagePath){
	if (window.fmcGAsetup){
		if (window.ga) {
			logOnLocalHostFrontEnd("GOOGLE ANALYTICS: ga pageview event will be send");
			window.ga('fmc_gtag.set', 'page', pagePath);
			window.ga('fmc_gtag.send', 'pageview');
		}else	if (window.gtag) {
			logOnLocalHostFrontEnd("GOOGLE ANALYTICS: gtag pageview event will be send");
			window.gtag('config', "UA-36853599-24", {"page_title": window.location.hostname, "page_path": pagePath});
		} else if (window._gaq) {
			logOnLocalHostFrontEnd("GOOGLE ANALYTICS: _gaq pageview event will be send");
			window._gaq.push(['fmc_gtag._trackPageview',pagePath]);
		}
	}
}

function fmcSetupGA(){
	let pageTitle ="not found";
	pageTitle = window.location.hostname;
	if (window.ga) {
		logOnLocalHostFrontEnd("setting up GA for 'ga'","");
		window.ga('create', 'UA-36853599-24', 'auto', 'fmc_gtag');
		window.ga('fmc_gtag.set','anonymizeIp', true);
		window.ga('fmc_gtag.send','pageview',window.location.href);
	}else if (window.gtag) {
		logOnLocalHostFrontEnd("setting up GA for 'gtag'","");
    window.gtag('config', 'UA-36853599-24', { 'anonymize_ip': true, 'page_title': pageTitle , 'page_location': window.location.href });
  } else if (window._gaq) {
		logOnLocalHostFrontEnd("setting up GA for '_gaq'","");
    window._gaq.push(['fmc_gtag._setAccount','UA-36853599-24'],['fmc_gtag._trackPageview']);
	}
	window.fmcGAsetup = true;
}

function fmcSetupGAIndia(){
	let pageTitle ="not found";
	pageTitle = window.location.hostname;
	if (window.ga) {
		logOnLocalHostFrontEnd("setting up GA for 'ga'","");
		window.ga('create', 'UA-154745112-1', 'auto', 'fmc_gtag_india');
		window.ga('fmc_gtag.set','anonymizeIp', true);
		window.ga('fmc_gtag.send','pageview',window.location.href);
	}
	window.fmcGAsetupIndia = true;
}


// GA - END

function getEmbedHtmlData(url, callback){
	let request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
	    // Success!
	    callback({"status": "success","status_code":request.status, "data" : request.responseText});
	  } else {
	    // We reached our target server, but it returned an error
			callback({"status": "success","status_code":request.status, "data" : "We reached our target server, but it returned an error"});
	  }
	};

	request.onerror = function() {
	  // There was a connection error of some sort
		callback({"error": "success","status_code":request.status, "data" : "Error occured in getting html data"});
	};
	request.send();
}

function dmlfmc_getScript(source, callback) {
		//console.log('inside get script call');
    var script = document.createElement('script');
    //var prior = document.getElementsByTagName('script')[0];
    script.async = 1;

    script.onload = function(evt) {
			//console.log(source ," ready state: ",evt);
			callback({"status":"success","message":"done"});
    };

		script.onerror = function(err){
			console.log(err)
			callback({"status":"error", "message":"error in getting script " + source});
		}

		script.setAttribute('type','text/javascript');

		script.src = source;
		dmlfmcWrapperElement.appendChild(script);


}

function dmlfmc_getScript_withAttributes(source, attributeObj, callback) {
		//console.log('inside get script call');
    var script = document.createElement('script');
    //var prior = document.getElementsByTagName('script')[0];
    script.async = 1;

    script.onload = function(evt) {
			//console.log(source ," ready state: ",evt);
			callback({"status":"success","message":"done"});
    };

		script.onerror = function(err){
			console.log(err)
			callback({"status":"error", "message":"error in getting script " + source});
		}

		script.setAttribute('type','text/javascript');
		try{
			Object.keys(attributeObj).forEach( function(attrKey){
				script.setAttribute(attrKey,attributeObj[attrKey]);
			});

		}catch(err){
			console.log(err);
		}

		script.src = source;
		dmlfmcWrapperElement.appendChild(script);


}


function fmcOpenApp(){

	let gaTimer = 100;
	let gacheckinterval = setInterval(function(){
		if (window.ga){
			logOnLocalHostFrontEnd("GA AVAILABLE - "+ gaTimer/1000 + "s","");
			clearInterval(gacheckinterval);
			fmcSetupGA();
		}else{
			if (gaTimer > 10000){
				logOnLocalHostFrontEnd("GA NOT AVAILABLE - "+ gaTimer/1000 + "s","");
				clearInterval(gacheckinterval);
			}
			gaTimer += 10;
		}
	},10)

	let fmcForcedPageIndia;
	if (window.location.search.indexOf("forced_page=") > -1){
	  fmcForcedPageIndia=window.location.search.split("forced_page=")[1].split('&')[0];
	}

	if ( /dermalogicaindia.com($|:)/g.test(window.location.hostname) || /dermalogicaindia.com($|:)/g.test(fmcForcedPageIndia) ){

		logOnLocalHostFrontEnd("connect to dermalogicaindia GA");

		let gaTimerIndia = 100;
		let gacheckintervalIndia = setInterval(function(){
			if (window.ga){
				logOnLocalHostFrontEnd("GA INDIA AVAILABLE - "+ gaTimerIndia/1000 + "s","");
				clearInterval(gacheckintervalIndia);
				fmcSetupGAIndia();
			}else{
				if (gaTimerIndia > 10000){
					logOnLocalHostFrontEnd("GA INDIA NOT AVAILABLE - "+ gaTimerIndia/1000 + "s","");
					clearInterval(gacheckintervalIndia);
				}
				gaTimerIndia += 10;
			}
		},10)
	}

	if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))){
		setTimeout(function(){fmcSendGA("openApp","Browser Not Supported");},2000);
		//alert("We don't currently support this browser. Please reopen this page in a different browser.")
		if (!window.fmc_isEmbed){
			dmlfmcWrapperElement.style.height = "100vh";
		}
		dmlfmcWrapperElement.innerHTML = '<div id="fmc_browser_not_sup_wrapper"><div id="fmc_browser_error_image"><img src="https://skinanalysis.me/img/fmc_face_error.svg"/></div><p>We don\'t currently support this browser. Please reopen this page in a different browser, such as <a href="https://www.google.com/chrome/" target="_blank">Chrome</a>.</p></div>' + dmlfmcWrapperElement.innerHTML;
		dmlfmcWrapperElement.style.background = "url('https://skinanalysis.me/img/screen2-bg.png') no-repeat center center";
		dmlfmcWrapperElement.style.backgroundSize= "cover";
	}else{



		let openAppIntCounter = 0;
		let openAppInterval = setInterval(function(){
				if (window.fmcGAsetup){
					clearInterval(openAppInterval);
					fmcSendGA("openApp","loading full script");
				}
				openAppIntCounter++;
				if (openAppIntCounter > 500){
					clearInterval(openAppInterval);
				}
		},10)
		//setTimeout(function(){fmcSendGA("openApp","loading full script");},2000);

		let openAppIntCounterIndia = 0;
		let openAppIntervalIndia = setInterval(function(){
				if (window.fmcGAsetupIndia){
					clearInterval(openAppIntervalIndia);
					fmcSendGAIndia("openApp","loading full script");
				}
				openAppIntCounterIndia++;
				if (openAppIntCounterIndia > 500){
					clearInterval(openAppIntervalIndia);
				}
		},10)
		//setTimeout(function(){fmcSendGAIndia("openApp","loading full script");},2000);

		getEmbedHtmlData('https://skinanalysis.me/fmc?'+sessionTimeString, function(res)  {

			if (window.fmc_isEmbed && window.fmc_hasBanner){
				let fmcBannerElement = document.getElementById("fmc_cta_banner");
				fmcBannerElement.style.opacity = 0;

				setTimeout(function(){
					dmlfmcWrapperElement.innerHTML = res.data + dmlfmcWrapperElement.innerHTML;
					document.getElementById("fmcBody").style.height=window.fmc_maxheight;

					document.getElementById("fmc_cta_banner").style.display = "none";
					dmlfmcWrapperElement.style.maxHeight = window.fmc_maxheight;
					dmlfmcWrapperElement.style.width = window.fmc_maxwidth;
					dmlfmcWrapperElement.style.height = window.fmc_maxheight;
					dmlfmcWrapperElement.style.maxHeight = window.fmc_maxheight;

					dmlfmc_getScript('https://skinanalysis.me/script.js?'+sessionTimeString,function(){
						document.getElementById("fmcBody").style.opacity = 1;
						//dmlfmc_getScript_withAttributes("https://consent.cookiebot.com/uc.js",{"data-cbid":"9a0e10ab-b363-4aea-857e-5dedb771dc33", "id":"Cookiebot"},function(resCookieBot){})
					});

					dmlfmc_getScript('https://skinanalysis.me/js/hotjar.js?'+sessionTimeString,function(){
						//document.getElementById("fmcBody").style.opacity = 1;
						logOnLocalHostFrontEnd("added htjar");
					});


					if (/localhost/g.test("https://skinanalysis.me") || /192\.168\.0\./g.test("https://skinanalysis.me") || /\.ngrok\.io/g.test("https://skinanalysis.me") || /skinanalysisconsumer-staging\.herokuapp/g.test("https://skinanalysis.me") ){
					}else{
						dmlfmc_getScript_withAttributes('https://browser.sentry-cdn.com/5.6.3/bundle.min.js',
						{"integrity":"sha384-/Cqa/8kaWn7emdqIBLk3AkFMAHBk0LObErtMhO+hr52CntkaurEnihPmqYj3uJho", "crossorigin":"anonymous"},
						function(resSentry){
							logOnLocalHostFrontEnd("sentry script response: ",resSentry);
							Sentry.init({ dsn: 'https://bb80ec4e4a764eed95a8d8582c57f6d6@sentry.io/1771446' });
						}
						);
					}

				},500)


			}else{
				dmlfmcWrapperElement.innerHTML = res.data + dmlfmcWrapperElement.innerHTML;
				document.getElementById("fmcBody").style.height=window.innerHeight + "px";

				let heightLimit= Math.min(screen.availHeight,screen.height );

				if (document.getElementById("fmcBody").offsetHeight > heightLimit){
					document.getElementById("fmcBody").style.height = heightLimit + "px";
				}

				dmlfmc_getScript('https://skinanalysis.me/script.js?'+sessionTimeString,function(){
					document.getElementById("fmcBody").style.opacity = 1;
				});

				dmlfmc_getScript('https://skinanalysis.me/js/hotjar.js?'+sessionTimeString,function(){
					//document.getElementById("fmcBody").style.opacity = 1;
					logOnLocalHostFrontEnd("added htjar");
				});

				if (/localhost/g.test("https://skinanalysis.me") || /192\.168\.0\./g.test("https://skinanalysis.me") || /\.ngrok\.io/g.test("https://skinanalysis.me") || /skinanalysisconsumer-staging\.herokuapp/g.test("https://skinanalysis.me") ){
				}else{
					dmlfmc_getScript_withAttributes('https://browser.sentry-cdn.com/5.6.3/bundle.min.js',
					{"integrity":"sha384-/Cqa/8kaWn7emdqIBLk3AkFMAHBk0LObErtMhO+hr52CntkaurEnihPmqYj3uJho", "crossorigin":"anonymous"},
					function(resSentry){
						logOnLocalHostFrontEnd("sentry script response: ",resSentry);
						Sentry.init({ dsn: 'https://bb80ec4e4a764eed95a8d8582c57f6d6@sentry.io/1771446' });
					}
					);
				}
			}



		})

	}

}

function fmcMakeBanner(){
	let bannerWidth;
	if (window.fmc_bannerwidth.indexOf("%")>-1){
		bannerWidth = dmlfmcWrapperElement.offsetWidth * Number(window.fmc_bannerwidth.replace("%",""))/100;
	}else{
		bannerWidth = Number(window.fmc_bannerwidth.replace("px","").replace("%",""));
	}

	bannerWidth = dmlfmcWrapperElement.offsetWidth;

	let maxBannerHeight = 250;

	let rectInnerBannerRatio = 315/1500;
	let bannerHeight;
	let innerBannerWidth;

	bannerHeight = bannerWidth *rectInnerBannerRatio;

	innerBannerWidth = bannerHeight/rectInnerBannerRatio;

	if (bannerWidth>500){
		let bannerHeadImage = {w: 520, h: 400};

		let smartSkinAnalysisPos = {x: 495, y: 304 };
		let concernPos = {x: 520, y: 328 };



		dmlfmcWrapperElement.innerHTML += '<div id="fmc_cta_banner" style="color: white;" onclick="changeToApp();"><div id="fmc_banner_inner_part">'+
			'<p id="fmc_banner_smart_skin_text"></p><div id="fmc_banner_concern_content"><p id="fmc_banner_wrinkles"></p><p id="fmc_banner_wrinkles_perc">92%</p><p id="fmc_banner_acne"></p><p id="fmc_banner_acne_perc">12%</p></div><div id="fmc_banner_content"><div id="fmc_banner_logo"></div><p id="fmc_banner_cta_text"></p><div id="fmc_banner_content_seperator"><div></div></div><p id="fmc_banner_cta_button"></p></div></div></div>'
		dmlfmcWrapperElement.style.maxHeight  = bannerHeight + "px";
		dmlfmcWrapperElement.style.height  = bannerHeight + "px";
		let fmcBannerElement = document.getElementById("fmc_cta_banner");
		dmlfmcWrapperElement.style.width = bannerWidth+"px";
		fmcBannerElement.style.height= bannerHeight+"px";
		document.getElementById("fmc_banner_inner_part").style.width = innerBannerWidth+"px";
		document.getElementById("fmc_banner_content").style.transform = "scale(" + bannerHeight/250 + ")";

		//document.getElementById("fmc_banner_inner_part").style.backgroundPosition = Math.round(0.3*bannerWidth)+"px center, right bottom";

		document.getElementById("fmc_banner_smart_skin_text").style.top = bannerHeight/bannerHeadImage.h*smartSkinAnalysisPos.y + "px";
		document.getElementById("fmc_banner_smart_skin_text").style.left = Math.round(0.3*(innerBannerWidth-bannerHeadImage.w*bannerHeight/bannerHeadImage.h )+ (smartSkinAnalysisPos.x)*bannerHeight/bannerHeadImage.h) + "px";

		document.getElementById("fmc_banner_concern_content").style.top = bannerHeight/bannerHeadImage.h*concernPos.y + "px";
		document.getElementById("fmc_banner_concern_content").style.left = Math.round(0.3*(innerBannerWidth-bannerHeadImage.w*bannerHeight/bannerHeadImage.h )+ (concernPos.x)*bannerHeight/bannerHeadImage.h) + "px";

		document.getElementById("fmc_banner_smart_skin_text").style.transform = "scale(" + bannerHeight/250 + ")";
		document.getElementById("fmc_banner_concern_content").style.transform = "scale(" + bannerHeight/250 + ")";

		document.getElementById("fmc_banner_smart_skin_text").innerHTML = window.fmc_bannerSmartText;
		document.getElementById("fmc_banner_acne").innerHTML = window.fmc_bannerAcneText;
		document.getElementById("fmc_banner_wrinkles").innerHTML = window.fmc_bannerWrinklesText;


	}else{
		dmlfmcWrapperElement.innerHTML += '<div id="fmc_cta_banner" style="color: white;" onclick="changeToApp();"><div id="fmc_banner_inner_part">'+
			'<div id="fmc_banner_content"><div id="fmc_banner_logo"></div><p id="fmc_banner_cta_text">find out your skin needs now</p><div id="fmc_banner_content_seperator"><div></div></div><p id="fmc_banner_cta_button">analyze your skin</p></div></div></div>'
		dmlfmcWrapperElement.style.maxHeight  = 300 + "px";
		dmlfmcWrapperElement.style.height  = 300 + "px";
		let fmcBannerElement = document.getElementById("fmc_cta_banner");
		dmlfmcWrapperElement.style.width = bannerWidth+"px";
		fmcBannerElement.style.height= 300+"px";
		document.getElementById("fmc_banner_inner_part").style.width = innerBannerWidth+"px";
		document.getElementById("fmc_banner_inner_part").style.marginLeft = "0";

		document.getElementById("fmc_banner_inner_part").style.backgroundImage = 'url("https://skinanalysis.me/img/banner_head.png"), url("https://skinanalysis.me/img/banner_grid_left.png")';

		document.getElementById("fmc_banner_inner_part").style.backgroundPosition = 0.5*bannerWidth + "px center, left bottom";
		document.getElementById("fmc_banner_inner_part").style.backgroundSize = "contain, 70%";

		document.getElementById("fmc_banner_inner_part").querySelectorAll("*").forEach(function(element,index){
			element.style.float = "left";
		})
		document.getElementById("fmc_banner_cta_text").style.textAlign = "left";
		document.getElementById("fmc_banner_cta_text").style.fontSize = "24px";
		document.getElementById("fmc_banner_content").style.height= "90%";
		document.getElementById("fmc_banner_content").style.top= "5%";
		document.getElementById("fmc_banner_content").style.left= "5%";
		document.getElementById("fmc_banner_content").style.width= "55%";

		document.getElementById("fmc_banner_logo").style.transform= "scale(0.8)";


		document.getElementById("fmc_banner_cta_button").style.position= "absolute";
		document.getElementById("fmc_banner_cta_button").style.bottom= "0";
		document.getElementById("fmc_banner_cta_button").style.left= "0";
		document.getElementById("fmc_banner_cta_button").style.padding= "10px 30px";
		document.getElementById("fmc_banner_cta_button").style.width= "210px";



	}

	document.getElementById("fmc_banner_cta_text").innerHTML = window.fmc_banner_cta_text;
	document.getElementById("fmc_banner_cta_button").innerHTML = window.fmc_banner_cta_button;



}



function changeToApp(){
	if (fmc_banner_cta_active){

		fmcOpenApp()
		fmc_banner_cta_active = false;
	}
}


// global functions


window.fmcSetCookie = function(cname,cvalue, exdays){
	var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";";
}

window.fmcReadCookie= function(cname){
	let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
    	c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// start app/banner

var fmcUseBrowser = true;
var fmc_isFBIAB = false;
var fmc_isInstagramIAB = false;

try{
	fmc_isFBIAB = (navigator.userAgent.indexOf("FB_IAB")>-1 || navigator.userAgent.indexOf("FBIOS") > -1) && navigator.userAgent.indexOf("Android") > -1;
	fmc_isInstagramIAB = navigator.userAgent.indexOf("Instagram") > -1 && navigator.userAgent.indexOf("Android") > -1;
}catch(err){
	console.log(err);
}


if ( (fmc_isFBIAB && "FALSE" == "TRUE") || (fmc_isInstagramIAB && "FALSE" == "TRUE") ){
		fmcUseBrowser = false;
		var fmcUrlParams = "";
		if (window.location.search == ""){
			fmcUrlParams = "?fmc_src_hst="+window.location.href.split("?")[0];
		}else{
			fmcUrlParams = "?fmc_src_hst="+window.location.href.split("?")[0] + window.location.search.replace(/^\?/g,"&");
		}
		window.location = "https://skinanalysis.me/dmybytes" + fmcUrlParams;
}

if (window.location.search.indexOf("fmc_hid") > -1){
	window.fmc_hasBanner = false;
}

if (fmcUseBrowser){

	if (!window.fmc_isEmbed || !window.fmc_hasBanner ){
		fmcOpenApp()

	}else{
		fmcMakeBanner();
	}

}
