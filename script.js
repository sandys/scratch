var fmcForcedPage = "";
var fmcForcedCountry = "";
window.fmc_backendToUse = "https://api.skinanalysis.me";

window.fmc_curPage = "init";

if (!window.fmc_isEmbed){
	window.fmc_showNavbar = true;
}
window.fmcChatStatus = "offline";
window.fmc_product_data_email = window.fmc_productDict;

window.fmc_backLinkShopUrlFlag = typeof window.fmc_backLinkShopUrlFlag != "undefined" ? window.fmc_backLinkShopUrlFlag : false;
window.fmc_sendResultsEmail = typeof window.fmc_sendResultsEmail != "undefined" ? window.fmc_sendResultsEmail : true;
window.fmc_showNavbar = typeof window.fmc_showNavbar != "undefined" ? window.fmc_showNavbar : false;
window.fmc_showStoreLocations = typeof window.fmc_showStoreLocations != "undefined" ? window.fmc_showStoreLocations : true;
window.fmc_showLiveChat = typeof window.fmc_showLiveChat != "undefined" ? window.fmc_showLiveChat : true;
window.fmc_showShopButton = typeof window.fmc_showShopButton != "undefined" ? window.fmc_showShopButton : true;
window.fmc_showPrices = typeof window.fmc_showPrices != "undefined" ? window.fmc_showPrices : true;
window.fmc_forcedLanguageCode = typeof window.fmc_forcedLanguageCode != "undefined" ? window.fmc_forcedLanguageCode: "";

// disable ALL former products in the snippets
window.fmc_productDict = {"button_text":"shop"}

var fmcRegimeLabels = {
	precleanse:"precldfsfeanse",
	cleanse:"cleanse",
	exfoliate:"exfoliate",
	soothe:"soothe",
	tone:"tone",
	moisturize:"moisturize",
	protect:"protect"
}


let fmcRegimeLabelsOrder = ["precleanse","cleanse","exfoliate","tone","moisturize","protect"];

var fmcImageErrors = {
	no_face: "Sorry, we could not detect your face. Please try again.",
	multi_face: "Unfortunately, this isn't a group activity--you need to take the photo alone. Please try again.",
	general: "Please pardon the interruption of your experience, but our application has encountered an error. Our developers are hard at work to prevent this happening again. Please try again."
}

let resultImages = {};

let fmcBrowser="not found";
let fmcOS="not found";


let fmcLocation;

let mobileWidth = 768;

let fmcResultFinished = false;

var onboarding = {currentSlide : 1}

var fmcProductCards = {
	shop_button : "shop"
}

var fmcStoreLocations = {
	call_button : "call",
	directions_button : "directions",
}

var fmcConcernCopy = {
		acne:{
			title:"",
			text:""
		},
		dark_circles: {
			title:"",
			text:""
		},
		dehydration: {
			title:"",
			text:""
		},
		oiliness: {
			title:"",
			text:""
		},
		pores: {
			title:"",
			text:""
		},
		redness: {
			title:"",
			text:""
		},
		spots: {
			title:"",
			text:""
		},
		uneven_skintone: {
			title: "",
			text: ""
		},
		wrinkles: {
			title: "",
			text: ""
		}
}

let fmcDermKitIds={
	ageSmart: 105,
	clearBright: 108,
	meetDerm: 122,
	ultraCalm: 132
}

var fmcChatCopy={
	withoutResults : "I would like to discuss Face Mapping.",
	withResults : "I would like to discuss my Face Mapping results"
}



var airPolHumidText = {
  "airPol": {
    "very_good": "very good",
    "good": "good",
    "medium": "medium",
    "high": "high",
    "very_high": "very high"
  },
  "humidity": {
    "very_low": "very low",
    "low": "low",
    "medium": "medium",
    "high": "high",
    "very_high": "very high"
  },
  "uvIndex": {
    "very_low": "very low",
    "low": "low",
    "medium": "medium",
    "high": "high",
    "very_high": "very high"
  }
}

var alertMessages= {
	default: "Please pardon the interruption of your experience, but our application has encountered an error. Our developers are hard at work to prevent this happening again. Please try again."
}

let fmcRequestEmailBeforeResults;

let fmcMaxConcerns = 20;

let fmcStoreLocatorExtraParameters = "";

let fmcStoreLocatorRegexFilter = "";

let fmcDehydrImgUrl = "";
let fmcDarkCircImgUrl = "";
let fmcRednessImgUrl = "";
let fmcOilinessImgUrl = "";
let fmcWrinklesImgUrl = "";
let fmc_sendProductDictWithEmail = true;
let fmcShowMskBanner = false;


let faceAIsawFace = false;

var fmcMoreLessButtonsText = {
	more: "more",
	less: "less"
}

var fmcSeverityWords = {
	critical: "critical",
	moderate: "moderate"
}

var fmc_uploadButtonUsed = false;

var fmc_showAndroidAppCapturePopup = false;

let analyzeBootstrapTimer;

let reportError = (messageObj) => {
	var xhr = new XMLHttpRequest()

	messageObj.value += "\nuuid: "+fmcCustomUID;
	messageObj.value += "\nFrontend: https://skinanalysis.me";
	messageObj.value += "\nBackend: "+window.fmc_backendToUse;
	messageObj.value += "\nPage: "+window.location.href;

	if (window.facemap != undefined){
		if (window.facemap.hashid != undefined){
			if (window.location.href.indexOf(window.facemap.hashid) > -1 ){
				messageObj.value += "\nUrl: "+window.location.href;
			}else{
				let urlString = window.location.href;
				if (window.location.href.indexOf("?") == -1){
				  urlString += "?fmc_hid=" + window.facemap.hashid;
				}else{
					urlString += "&fmc_hid=" + window.facemap.hashid;
				}
				if (window.fmc_backendToUse == "https://imb-backend-eu.herokuapp.com"){
					urlString += "&be=eu";
				}else if (window.fmc_backendToUse == "https://imb-backend-ca.herokuapp.com"){
					urlString += "&be=ca";
				}else if (window.fmc_backendToUse == "https://imb-staging.herokuapp.com"){
					urlString += "&be=stg";
				}else{
					urlString += "&be=us";
				}
				messageObj.value += "\nUrl: "+ urlString;
			}
		}
	}

	let connectionInfoString = "";


	try{
		let connectionInfo = window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection;
		connectionInfoString += "\nConnection downlink: " + connectionInfo.downlink;
		connectionInfoString += "\nConnection effType: " + connectionInfo.effectiveType;
		connectionInfoString += "\nConnection rtt: " + connectionInfo.rtt;
		connectionInfoString += "\nConnection saveData: " + connectionInfo.saveData;

	}catch(err){
	}
	messageObj.value += connectionInfoString;


	xhr.open('POST', 'https://skinanalysis.me' + "/report-error" )
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.onreadystatechange = function(){
		if (this.readyState == 4){
			if (this.status != "200"){
				console.log(this.status, this.responseText);
			}
		}
	}
	xhr.send(JSON.stringify(messageObj));

}

let reportDioxError = (messageObj) => {
	var xhr = new XMLHttpRequest()

	if (!messageObj.targetChannel){
		messageObj.targetChannel =  "dioxide-problems"
	}


	logOnLocalHostFrontEnd("SENDING DIOXIDE ERROR TO SLACK - "+ JSON.stringify(messageObj))


	xhr.open('POST', 'https://skinanalysis.me' + "/report-error" )
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.onreadystatechange = function(){
		if (this.readyState == 4){
			if (this.status != "200"){
				console.log(this.status, this.responseText);
			}
		}
	}
	xhr.send(JSON.stringify(messageObj));

}

let handleError = (responseObj)=>{
	clearTimeout(analyzeBootstrapTimer);
	document.getElementById("fmc_loading_error_content").style.display = "block";
	document.getElementById("fmc_loading_analyze_content").style.display = "none";
	logOnLocalHostFrontEnd("handling error: ", responseObj);
	fmcResultFinished = true;

	if (responseObj.code != undefined){
		if (String(responseObj.code) == "5002"){
			document.getElementById("fmc_loading_error_text").innerHTML = fmcImageErrors.no_face
			fmcSendGA("mainFlow","analyze image - error_no_face");
		}else if(String(responseObj.code) == "5003"){
			document.getElementById("fmc_loading_error_text").innerHTML = fmcImageErrors.multi_face
			fmcSendGA("mainFlow","analyze image - error_multi_faces");
		}else{
			document.getElementById("fmc_loading_error_text").innerHTML = fmcImageErrors.general
			fmcSendGA("mainFlow","analyze image - error_general");
			let stringRes;
			if (typeof responseObj == "object"){
				try{
					stringRes = JSON.stringify(responseObj);
				}catch(err){
					stringRes = responseObj;
				}
			}else{
				stringRes = responseObj;
			}
			let imgDim;
			try{
				imgDim = fmcImSz.w + "x" + fmcImSz.h;
			}catch(errImDim){
				imgDim = "N/A";
			}
			reportError({
				"title": "ERROR - analyze call",
				"value": "parsed error: " + stringRes + "\nanalyzeImage.onerror: " + window.fmc_anImEr + "\nanalyzeImage.timeout: " + window.fmc_anImTo + "\nImageDim: "+imgDim,
			});

		}

	}else{
		document.getElementById("fmc_loading_error_text").innerHTML = fmcImageErrors.general
		fmcSendGA("mainFlow","analyze image - error_no_status_code");
		let stringedInfo;
		let stringedResObj;
		try{
			stringedInfo = JSON.stringify(fmcSavedBRres);
		}catch(errParse){
			stringedInfo = fmcSavedBRres
		}
		try{
			stringedResObj = JSON.stringify(responseObj);
		}catch(errParse){
			stringedResObj = responseObj
		}
		try{
			imgDim = fmcImSz.w + "x" + fmcImSz.h;
		}catch(errImDim){
			imgDim = "N/A";
		}
		reportError({
			"title": "ERROR - analyze call",
			"value": "info: "+stringedResObj+"\nsaved analyze res or error: " + stringedInfo + "\nanalyzeImage.onerror: " + window.fmc_anImEr + "\nanalyzeImage.timeout: " + window.fmc_anImTo+ "\nImageDim: "+imgDim,
		});
	}
	window.fmc_curPage = "errorPage";
	if (window.intellimize){
		console.log("page updated");
		intellimize.activate();
	}
}

let faceApiLoaded = false;
let commonLoaded = false;
let drawingLoaded = false;
let faceDetectionControlsLoaded = false;
var fmcImSz = {
	w:0,
	h:0
}

var fmcCameraDict={
	noFace : "sorry we could not detect your face",
	tiltedLeft : "Head titled too much to the left!",
	tiltedRight : "Head titled too much to the right!",
	tiltedUpwards : "Your face is tilted upwards",
	tiltedDawnwards : "Your face is tilted downwards",
	turnedLeft : "Your face is turned too much to the left!",
	turnedRight : "Your face is turned too much to the right!",
	tooFar : "Your face is too far away",
	tooClose : "Your face is too close",
	tooFarRight : "Your face is too far to the right",
	tooFarLeft : "Your face is too far to the left",
	tooHigh : "Your face is too high in the image",
	tooLow : "Your face is too low in the image",
	unevenLight : "Face is not evenly lit",
	perfect : "\u2705 Perfect - hold still please"
}

dmlfmc_getScript('https://skinanalysis.me/face-api.js?'+sessionTimeString,function(){
	console.log("face-api.js loaded");
	faceApiLoaded = true;
	dmlfmc_getScript('https://skinanalysis.me/vendor/face/js/commons.js?'+sessionTimeString,function(){
		console.log("vendor commons.js loaded");
		commonLoaded = true;
	});
	dmlfmc_getScript('https://skinanalysis.me/vendor/face/js/drawing.js?'+sessionTimeString,function(){
		console.log("vendor drawing.js loaded");
		drawingLoaded = true;
	});
	dmlfmc_getScript('https://skinanalysis.me/vendor/face/js/faceDetectionControls.js?'+sessionTimeString,function(){
		console.log("vendor faceDetectionControls.js loaded");
		faceDetectionControlsLoaded = true;
	});
});

dmlfmc_getScript('https://skinanalysis.me/vendor/exif.js?'+sessionTimeString,function(){
	console.log("vendor exif.js loaded");
});

let loadingTimout = 10000;
let loadingTime =0;
let loadingTimeStep = 100;
let fmcCameraLoadNotInitiated = true;
let loadingFaceAiScripts = setInterval(()=>{
	if ( faceApiLoaded && commonLoaded && drawingLoaded && faceDetectionControlsLoaded && fmcCameraLoadNotInitiated){
		fmcCameraLoadNotInitiated = false;
		fmc_load_camera();
		clearInterval(loadingFaceAiScripts);
	}else{
		loadingTime += loadingTimeStep;
		if (loadingTime >= loadingTimout){
			run();
		}
	}
},loadingTimeStep);

let faceLandmarkModelLoaded = false;

let fmc_load_camera = async ()=>{
	await changeFaceDetector(TINY_FACE_DETECTOR)
	await faceapi.loadFaceLandmarkModel('/')
	console.log("facelandmark model loaded!");
	faceLandmarkModelLoaded = true;
	//document.getElementById("fmc_camera_hint_popup").style.display = "block";
}


let fmc_clickDelayedCaptureButton = ()=>{
	fmcSendGA("main flow","delayed image capture button - no faceai");
	fmc_clickFileUploadButton()
}


let fmcFileUploadBounceFlag = true;
let fmc_clickFileUploadButton=()=>{

	if (fmcFileUploadBounceFlag){
		fmcFileUploadBounceFlag = false;
		if (fmc_showAndroidAppCapturePopup){
			document.getElementById('fmc_android_app_capture_popup').style.display = "flex";
		}else{
			document.getElementById("fmc_imageUploadInput").click();
		}
		setTimeout(()=>{
			fmcFileUploadBounceFlag = true;
		},2000)
	}
}

let fmcPopupBounceFlag = true;
function fmcCloseAndroidCameraCapturePopup(){
	if (fmcPopupBounceFlag){
		fmcPopupBounceFlag = false;
		document.getElementById('fmc_android_app_capture_popup').style.display = "none";
		document.getElementById("fmc_imageUploadInput").click();
		setTimeout(()=>{
			fmcPopupBounceFlag = true;
		},2000)
	}

}



function base64ToArrayBuffer(base64) {
    base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
    var binaryString = atob(base64);
    var len = binaryString.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

function fmc_alignImageOrientation(base64imageInput){

	return new Promise((resolve,reject)=>{

		curImgData = base64imageInput;

		let fmc_body = document.getElementById("fmc_body");
		var exif = EXIF.readFromBinaryFile(base64ToArrayBuffer(base64imageInput));

		let canvas = document.getElementById("fmc_camera_canvas");
		let ctx = canvas.getContext("2d");

		if (exif.Orientation == undefined){
			fmcImageOrientation = 1
		}else{
			fmcImageOrientation = exif.Orientation;
		}
		let tmpImage = new Image();

		logOnLocalHostFrontEnd("image orientation on capture/upload: ", fmcImageOrientation);

		tmpImage.onload = ()=>{

			//let camDeniedCont = document.getElementById("fmc_camera_denied_container");

			fmcImSz={
				w: tmpImage.naturalWidth,
				h: tmpImage.naturalHeight
			}

			let imgHeight = tmpImage.height;
			let imgWidth = tmpImage.width;

			canvas.width = imgWidth;
			canvas.height = imgHeight;

			ctx.drawImage(tmpImage,0,0,imgWidth,imgHeight);

			//canvas.style.opacity = 1;

			if (fmcManualCaptureFlag){
				reject(base64imageInput);
			}else{

				let faceAiWorksFlag = false;
				setTimeout(()=>{
					if (!faceAiWorksFlag){
						fmcManualCaptureFlag = false;
						reject(base64imageInput);
					}
				},5000)

				try{
					let options = getFaceDetectorOptions()
					faceapi.detectAllFaces(canvas, options).withFaceLandmarks().then((landmarkDataArray)=>{
						faceAiWorksFlag = true;
						console.log("LANDMARKS ARRAY IN ORIENTATION CALL: ", landmarkDataArray);
						if (landmarkDataArray.length > 0){

							faceAIsawFace = true;
							resolve(base64imageInput);
						}else{

							try{
								if (fmcImageOrientation==8 || fmcImageOrientation == 1){

									canvas.width = imgHeight;
									canvas.height = imgWidth;

									ctx.rotate(-90*Math.PI/180);


									ctx.drawImage(tmpImage,-imgWidth,0,imgWidth,imgHeight);

								}else if (fmcImageOrientation == 6){

									canvas.width = imgHeight;
									canvas.height = imgWidth;

									ctx.rotate(90*Math.PI/180);

									ctx.drawImage(tmpImage,0,-imgHeight,imgWidth,imgHeight);

								}else if (fmcImageOrientation == 3){

									canvas.width = imgWidth;
									canvas.height = imgHeight;

									ctx.rotate(Math.PI);

									ctx.drawImage(tmpImage,-imgWidth,-imgHeight,imgWidth,imgHeight);

								}else{

									canvas.width = imgWidth;
									canvas.height = imgHeight;

									ctx.drawImage(tmpImage,0,0,imgWidth,imgHeight);
								}

								setTimeout(()=>{

									faceapi.detectAllFaces(canvas, options).withFaceLandmarks().then((landmarkDataArray)=>{
										console.log("LANDMARKS ARRAY IN ORIENTATION CALL: ", landmarkDataArray);
										if (landmarkDataArray.length > 0){
											faceAIsawFace = true;
											let imgData = canvas.toDataURL("image/jpeg");
											try{
												ctx.resetTransform();
											}catch(err){
												ctx.rotate(0);
											}

											curImgData = imgData;

											//camDeniedCont.innerHTML = "FACE FOUND - sending";
											resolve(imgData);

										}else{
											//camDeniedCont.innerHTML = "NO FACE FOUND - REJECTING";
											curImgData = base64imageInput;
											reject(base64imageInput);
										}
									});

								},10)


							}catch(loadErr){
								logOnLocalHostFrontEnd("error in orientating BB image", loadErr)
								curImgData = base64imageInput;
								reject(base64imageInput);
							};
						}
					});

				}catch(err){
					curImgData = base64imageInput;
					reject(base64imageInput);
				}
			}




		}
		try{
			tmpImage.src = base64imageInput;
		}catch(srcErr){
			logOnLocalHostFrontEnd("source error - ",srcErr);
			reject(base64imageInput);
		}
	})

}

let curImgData;

function fmc_uploadImage(){
	fmc_uploadButtonUsed = true;
	fmcSendGA("mainFlow","upload image submit");
	let srcImgData = document.getElementById("fmc_imageUploadInput").files[0];
	let imgReader = new FileReader();
  imgReader.onloadend = function() {
		document.getElementById("fmc_upload_parts").style.display="none";
		document.getElementById("fmc_upload_message").style.display = "block";

		let uploadedImage = this.result;

		curImgData = uploadedImage;

		fmc_alignImageOrientation(uploadedImage)
		.then((resImageData)=>{
			logOnLocalHostFrontEnd("image orientation aligned ");

			if (fmcManualCaptureFlag){
				sendImageToBackend(resImageData)
				.then((fmcRes)=>{
					logOnLocalHostFrontEnd("ANALYZE RESPONSE: ",fmcRes);
					fmcBuildAndUpdateAfterFMCResult(fmcRes)
				})
				.catch((fmcErr)=>{
					console.log("error in sendImageToBackend call - ", fmcErr);
				});
			}else{

				analyzeImage("fmc_camera_canvas");

			}



		})
		.catch((err)=>{
			curImgData = uploadedImage;
			showUserOrientationScreen(uploadedImage);
			console.log("error in rotating image: ",err );
		})

  };
	imgReader.readAsDataURL(srcImgData);
}

function showUserOrientationScreen(imgData){
	fmcSendGA("main flow","showing user image orientation feature");
	document.getElementById("fmc_upload_message").style.display="none";
	document.getElementById("fmc_user_orientation_container").style.display="flex";
	document.getElementById("fmc_user_orientation_screen").style.backgroundImage = "url('"+imgData+"')"
	try{
		document.getElementById("fmc_fixed_chat_button").style.display = "none";
	}catch(err){
	}
}


let forwardTimes = []
let withBoxes = true

function onChangeHideBoundingBoxes(e) {
  //withBoxes = !$(e.target).prop('checked')
  withBoxes = !e.target.checked;
}

let printedResults = true;

let resultsCounter = 0;

let onPlayDelayTimeout;

let lastEyePosition = {_x: 0, _y:0};


adjustOvalSize = ()=>{
	let camContainerDiv  = document.getElementById("fmcInputVideo");
	document.getElementById("fmc_video_oval_mask").style.height= camContainerDiv.offsetHeight + "px";
	let scaleFactor;
	if (camContainerDiv.offsetHeight > camContainerDiv.offsetWidth){
		scaleFactor = Math.round(camContainerDiv.offsetWidth/600 * 1000);
	}else{
		scaleFactor = Math.round(camContainerDiv.offsetHeight/600 * 1000);
	}
	document.getElementById("fmc_video_oval_mask").style.backgroundSize = scaleFactor + "px";
}


let fmcManualCaptureFlag = false;
let lastOnPlayCallTimeout;
let lastCallTimeoutTimer = 5000;
async function onPlay() {
	clearTimeout(lastOnPlayCallTimeout);
	document.getElementById("fmc_camera_capture_action_button").style.display = "none";
	fmcManualCaptureFlag = false;
	lastOnPlayCallTimeout = setTimeout(()=>{
		if (!imageSent){
			console.log("face detection not working - switching to manual capture");
			document.getElementById("fmc_camera_hint_message").innerHTML = "";
			document.getElementById("fmc_camera_capture_action_button").style.display = "block";
			fmcManualCaptureFlag = true;
		}
	},lastCallTimeoutTimer)
	lastCallTimeoutTimer = 2000;

	try {
		adjustOvalSize();
	}catch(err){
		logOnLocalHostFrontEnd(err);
	}

  document.getElementById("fmc_image_delayed_upload_button").style.display = "none";
  clearTimeout(onPlayDelayTimeout);

	document.getElementById("fmc_loading_spinner").style.display = "none";
	document.getElementById("fmc_camera_page_camera_container").style.opacity = "1";

  const videoEl = document.getElementById('fmcInputVideo')

	let options = getFaceDetectorOptions()

	let faces;

	try{
		faces = await faceapi.detectAllFaces(videoEl, options).withFaceLandmarks()  //  either of them can be removed
		faceapi.detectAllFaces(videoEl, options).withFaceLandmarks() // either of them can be removed
		.then((detectFaceRes)=>{
			faces = detectFaceRes;
		})
		.catch((faceDetectErr)=>{
			console.log("problem in detecting face - ",faceDetectErr);
		})

	}catch(errorDetectFace){
		logOnLocalHostFrontEnd("error in detect face: ",errorDetectFace);
	}



  if (faces.length > 0) {
		logOnLocalHostFrontEnd("face results - ", faces);
		if (faces.length > 1){
			document.getElementById("fmc_camera_hint_message").innerHTML = fmcImageErrors.multi_face;
		}else{
			let result = faces[0];

			logOnLocalHostFrontEnd("result - ", result);

			let leftEyePoint = result.landmarks.getLeftEye()[0];
			let faceBox = result.alignedRect._box;


			checkFaceInImage(result)
			.then((cameraHint)=>{

				let eyeMovement = Math.sqrt(Math.pow(leftEyePoint._x - lastEyePosition._x,2) + Math.pow(leftEyePoint._y - lastEyePosition._y,2))/faceBox._width;



				if (cameraHint == fmcCameraDict.perfect){
					if (initalCaptureDelay > 2000){
						resultsCounter += 1;
					}
					if (eyeMovement > 0.1){
						resultsCounter = 0;
					}
				}else{
					resultsCounter = 0;
				}

				lastEyePosition = leftEyePoint;

				document.getElementById("fmc_camera_hint_message").innerHTML = cameraHint;



				//drawLandmarks(videoEl, document.getElementById('overlay'), [result], withBoxes)

				if (!imageSent && resultsCounter == 5){
					clearTimeout(lastOnPlayCallTimeout);
					sendVideoCanvasImage();
					imageSent = true;
					fmc_runStream = false;
				}
			})
			.catch((faceCheckErr)=>{
				logOnLocalHostFrontEnd("Face check error: ",faceCheckErr);
			});
		}

  }else{
    document.getElementById("fmc_camera_hint_message").innerHTML = fmcCameraDict.noFace;
    resultsCounter = 0;
  }

  initalCaptureDelay += 500;

  if (fmc_runStream){
    setTimeout(() => {onPlay()},500);
  }

}
let ovalInterval;
let imageSent = false;
var fmc_runStream = true;
//setTimeout(()=>{
  //mediaStream.getVideoTracks()[0].stop();
  //fmc_runStream = false;
//},5000);

let camFaceDirection = true;
let mediaStream;
let initalCaptureDelay;
async function run() {
  initalCaptureDelay = 0;
	imageSent = false;
	document.getElementById("fmc_loading_spinner").style.display = "block";
	document.getElementById("fmc_camera_page_camera_container").style.opacity = "0";
	document.getElementById("fmc_upload_parts").style.display="block";
	document.getElementById("fmc_upload_message").style.display="none";

  // load face detection and face landmark models
  try{

    // try to access users webcam and stream the images
    // to the video element

		navigator.mediaDevices.enumerateDevices()
		.then((deviceList)=>{
			let videoDevices = [];
			deviceList.forEach((device,index)=>{
				if (device.kind=="videoinput" && !(/Virtual/g.test(device.label)) && !(/CamTwist/g.test(device.label))){
					videoDevices.push(device);
				}
			})
			logOnLocalHostFrontEnd("videoDevices: ",videoDevices)
			if (videoDevices.length > 1){
				const stream = navigator.mediaDevices.getUserMedia({
					video: {
						facingMode: {
							ideal: "user"
						},
						width: {
							max: 1920
						},
						height: {
							max: 1080
						}
					},
					audio: false
				});
				stream.then((camStream)=>{
					let fmcBodyWidth = document.getElementById("fmcBody").offsetWidth;
					let fmcBodyHeight = document.getElementById("fmcBody").offsetHeight;
					let camPageContainer  = document.getElementById("fmc_camera_page_camera_container");

					if (fmcBodyWidth >= 768){
						let streamHeight = camStream.getVideoTracks()[0].getSettings().height;
						let streamWidth = camStream.getVideoTracks()[0].getSettings().width;
						camPageContainer.style.height = Math.floor(camPageContainer.offsetWidth/streamWidth*streamHeight) + "px";
					}

					const videoEl = document.getElementById('fmcInputVideo');
					videoEl.srcObject = camStream;
					mediaStream = camStream;

				}).catch((err)=>{
					console.log("error in loading the camera, showing upload feature - ", err);
			    document.getElementById("fmc_camera_access_container").style.display = "none";
			    document.getElementById("fmc_camera_denied_container").style.display = "block";
          document.getElementById("fmc_image_delayed_upload_button").style.display = "none";
          clearTimeout(onPlayDelayTimeout);
				})

			}else if(videoDevices.length == 0){
		    document.getElementById("fmc_camera_access_container").style.display = "none";
		    document.getElementById("fmc_camera_denied_container").style.display = "block";
        document.getElementById("fmc_image_delayed_upload_button").style.display = "none";
        clearTimeout(onPlayDelayTimeout);
			}else{
				const stream = navigator.mediaDevices.getUserMedia({
					video: {
						facingMode: {
							ideal: "user"
						},
						width: {
							max: 1920
						},
						height: {
							max: 1080
						}
					},
					audio: false
				});
				stream.then((camStream)=>{
					let fmcBodyWidth = document.getElementById("fmcBody").offsetWidth;
					let fmcBodyHeight = document.getElementById("fmcBody").offsetHeight;
					let camPageContainer  = document.getElementById("fmc_camera_page_camera_container");

					if (fmcBodyWidth >= 768){
						let streamHeight = camStream.getVideoTracks()[0].getSettings().height;
						let streamWidth = camStream.getVideoTracks()[0].getSettings().width;
						camPageContainer.style.height = Math.floor(camPageContainer.offsetWidth/streamWidth*streamHeight) + "px";
					}

					const videoEl = document.getElementById('fmcInputVideo');
					videoEl.srcObject = camStream;
					mediaStream = camStream;

				}).catch((err)=>{
					console.log("error in loading the camera, showing upload feature - ", err);
			    document.getElementById("fmc_camera_access_container").style.display = "none";
			    document.getElementById("fmc_camera_denied_container").style.display = "block";
          document.getElementById("fmc_image_delayed_upload_button").style.display = "none";
          clearTimeout(onPlayDelayTimeout);
				})
			}

		})
		.catch((err)=>{
			console.log(err);
		})

  }catch(err){
    console.log("error in loading the camera, showing upload feature - ", err);
    document.getElementById("fmc_camera_access_container").style.display = "none";
    document.getElementById("fmc_camera_denied_container").style.display = "block";
    document.getElementById("fmc_image_delayed_upload_button").style.display = "none";
    clearTimeout(onPlayDelayTimeout);
  }
}

let reverseCam= async ()=>{
  let camDir;
  if (camFaceDirection){
    camDir = {exact:"environment"};
    camFaceDirection = false;
    document.getElementById("camMode").innerHTML = "back";
  }else{
    camDir = "user";
    camFaceDirection = true;
    document.getElementById("camMode").innerHTML = "face";
  }
  mediaStream.getVideoTracks()[0].stop();
  const stream = await navigator.mediaDevices.getUserMedia({ video: {facingMode: camDir} })
  const videoEl = document.getElementById('fmcInputVideo')
  videoEl.srcObject = stream
  mediaStream = stream;
}

function getFaceLightProperties(landmarks, drawFromVideo = true){
	let video = document.getElementById("fmcInputVideo");
  let canvas = document.getElementById("fmc_camera_canvas");



	let leftEyeBrow = landmarks.getLeftEyeBrow();
	let nose = landmarks.getNose();
	let jaw = landmarks.getJawOutline();

	let topLeft = {
		x : jaw[5]._x,
		y : leftEyeBrow[2]._y
	}
	let bottomLeft = {
		x : jaw[5]._x,
		y : jaw[5]._y
	}
	let topRight = {
		x : jaw[11]._x,
		y : leftEyeBrow[2]._y
	}
	let bottomRight = {
		x : jaw[11]._x,
		y : jaw[5]._y
	}
	let centerX = Math.round(0.5*(jaw[11]._x + jaw[5]._x));


  let ctx = canvas.getContext("2d");

	if (drawFromVideo){

		window.fmc_can_width = video.videoWidth;
		window.fmc_can_height = video.videoHeight;

		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		ctx.drawImage(video,0,0,canvas.width,canvas.height);
	}

	/*fmcDrawDiskOnCanvas(topLeft.x, topLeft.y)
	fmcDrawDiskOnCanvas(centerX, topRight.y)
	fmcDrawDiskOnCanvas(topRight.x, topRight.y)
	fmcDrawDiskOnCanvas(bottomLeft.x, bottomLeft.y)
	fmcDrawDiskOnCanvas(centerX, bottomRight.y)
	fmcDrawDiskOnCanvas(bottomRight.x, bottomRight.y)*/



	let leftSideImgData = ctx.getImageData(topLeft.x, topLeft.y,centerX-topLeft.x , bottomLeft.y-topLeft.y);
	let rightSideImgData = ctx.getImageData(centerX, topRight.y,topRight.x - centerX , bottomRight.y - topRight.y);

	let leftLight = 0;
	let rightLight = 0;

	for(ii = 0; ii < leftSideImgData.data.length/4; ii++){
			leftLight += 0.2126 * leftSideImgData.data[4*ii] + 0.7152 * leftSideImgData.data[4*ii+1] + 0.0722 * leftSideImgData.data[4*ii+2];
			rightLight += 0.2126 * rightSideImgData.data[4*ii] + 0.7152 * rightSideImgData.data[4*ii+1] + 0.0722 * rightSideImgData.data[4*ii+2];
	}

	return {
		relativeLightDiff : Math.abs(leftLight-rightLight)/Math.max(leftLight,rightLight),
		averageLight: 0.5*(leftLight + rightLight)/(leftSideImgData.data.length/4)
	}

}

function checkFaceInImage(faceCoords, drawFromVideo = true){
	return new Promise((resolve,reject)=>{
		let landmarks = faceCoords.landmarks;
		let lightParameters = getFaceLightProperties(faceCoords.landmarks, drawFromVideo);

		logOnLocalHostFrontEnd("light parameters: ", lightParameters);

		let cameraHint;
		let widthRatioLimitLower;
		let widthRatioLimitUpper;
		let xLimitLower;
		let xLimitUpper;
		let yLimitUpper;
		let yLimitLower;
		let leftEyePoint = landmarks.getLeftEye()[0];
		let rightEyePoint = landmarks.getRightEye()[3];
		let noseStartPoint = landmarks.getNose()[0];
		let noseTipPoint = landmarks.getNose()[3];

		let faceBox = faceCoords.alignedRect._box;
		let imageDims = faceCoords.alignedRect._imageDims;

		if (imageDims._width >= imageDims._height){
			widthRatioLimitLower=0.1;
			widthRatioLimitUpper=0.9;
			xLimitLower = 0.1;
			xLimitUpper = 0.9;
			yLimitLower = 0.1;
			yLimitUpper = 0.9;
		}else{
			widthRatioLimitLower=0.1;
			widthRatioLimitUpper=0.9;
			xLimitLower = 0.1;
			xLimitUpper = 0.9;
			yLimitLower = 0.1;
			yLimitUpper = 0.9;
		}
		let relFaceBoxPos={
			x: faceBox._x/imageDims._width,
			y: faceBox._y/imageDims._height
		}

		let widthRatio = faceBox._width/imageDims._width;

		let eyesTilt = (leftEyePoint._y-rightEyePoint._y)/(leftEyePoint._x-rightEyePoint._x);
		let noseTurn = (noseTipPoint._x-noseStartPoint._x)/(noseTipPoint._y-noseStartPoint._y);
		let noseTilt = (noseTipPoint._y-faceBox._y)/faceBox._height;


		let allowHint = true;

		if (eyesTilt > 0.1){
			cameraHint = fmcCameraDict.tiltedLeft;
			allowHint = false;
		}else if (eyesTilt < -0.1){
			cameraHint = fmcCameraDict.tiltedRight;
			allowHint = false;
		}


		if (noseTilt < 0.45 && allowHint){
			cameraHint = fmcCameraDict.tiltedUpwards;
			allowHint = false;
		}else if (noseTilt > 0.55 && allowHint){
			cameraHint = fmcCameraDict.tiltedDownwards;
			allowHint = false;
		}


		if (noseTurn > 0.1 && allowHint){
			cameraHint = fmcCameraDict.turnedLeft;
			allowHint = false;
		}else if (noseTurn < -0.1 && allowHint){
			cameraHint = fmcCameraDict.turnedRight;
			allowHint = false;
		}

		if (widthRatio < widthRatioLimitLower && allowHint){
			cameraHint = fmcCameraDict.tooFar;
			allowHint = false;
		}else if (widthRatio > widthRatioLimitUpper && allowHint){
			cameraHint = fmcCameraDict.tooClose;
			allowHint = false;
		}

		if (relFaceBoxPos.x < xLimitLower && allowHint){
			cameraHint = fmcCameraDict.tooFarRight;
			allowHint = false;
		}else if(relFaceBoxPos.x > xLimitUpper && allowHint){
			cameraHint = fmcCameraDict.tooFarLeft;
			allowHint = false;
		}


		if (relFaceBoxPos.y < yLimitLower && allowHint){
			cameraHint = fmcCameraDict.tooHigh;
			allowHint = false;
		}else if(relFaceBoxPos.y > yLimitUpper && allowHint){
			cameraHint = fmcCameraDict.tooLow;
			allowHint = false;
		}

		/*if (lightParameters.averageLight < 50 && allowHint){
			cameraHint = ""; // REMOVED !!!!
			allowHint = false;
		}*/

		if (lightParameters.relativeLightDiff > 0.4 && allowHint){
			cameraHint = fmcCameraDict.unevenLight;
			allowHint = false;
		}

		if (allowHint){
			cameraHint = fmcCameraDict.perfect;
		}

		resolve(cameraHint);
	})
}

function fmcCropToFace(canvasId = "fmc_camera_canvas"){
	return new Promise((resolve,reject)=>{

		let canvas = document.getElementById(canvasId);
		let ctx = canvas.getContext("2d");
		try{
			ctx.resetTransform();
		}catch(err){
			ctx.rotate(0);
		}

		if (fmcManualCaptureFlag){
			resolve(canvasId);
		}else{

			let fallbackFlag = true;
			setTimeout(()=>{
				if (fallbackFlag){
					resolve(canvasId);
				}
			},3000)


			let options = getFaceDetectorOptions()
			faceapi.detectAllFaces(canvas, options).withFaceLandmarks().then((landmarkDataArray)=>{
				fallbackFlag = false;
				logOnLocalHostFrontEnd("Crop Face Landmark data Array: ",landmarkDataArray);
				if (landmarkDataArray.length == 1){
					landmarkDataArray.forEach((landmarkData,index)=>{
						logOnLocalHostFrontEnd("Landmark Data at faceCrop: ", landmarkData);
						let overlay = document.getElementById("fmc_camera_canvas_overlay");
						overlay.style.opacity = 1;
						overlay.width = canvas.width;
						overlay.height = canvas.height;

						let detectionBox = landmarkData.detection._box


						let topY = Math.max(0,Math.round(detectionBox._y - 0.8*detectionBox._height));
						let bottomY = Math.min(Math.round(detectionBox._y + 1.5*detectionBox._height),canvas.height);
						let faceBoxHeight = bottomY - topY;


						//let leftX = Math.max(0,Math.round(detectionBox._x - 0.5*(Math.max(faceBoxHeight,detectionBox._width) - detectionBox._width)));
						//let rightX = Math.min(canvas.width,Math.round(detectionBox._x + 0.5*(Math.max(faceBoxHeight,detectionBox._width) + detectionBox._width)));

						let leftX = Math.max(0,Math.round(detectionBox._x - 0.5*detectionBox._width));
						let rightX = Math.min(canvas.width,Math.round(detectionBox._x + 1.5*detectionBox._width));

						let faceBoxData = {
							x: leftX,
							y: topY,
							w: rightX - leftX,
							h: bottomY - topY
						}


						//console.log("detectionBox: ", detectionBox);
						//console.log("faceBoxData: ", faceBoxData);
						//console.log(leftX,rightX)

						//fmcDrawRectOnCanvas(faceBoxData.x,faceBoxData.y,faceBoxData.w,faceBoxData.h,"fmc_camera_canvas_overlay")
						//document.getElementById("fmc_camera_canvas").style.opacity = 1;


						let faceImgData = ctx.getImageData(faceBoxData.x,faceBoxData.y,faceBoxData.w,faceBoxData.h);

						canvas.width = faceBoxData.w;
						canvas.height = faceBoxData.h;

						fmcImSz={
							w: Math.round(faceBoxData.w),
							h: Math.round(faceBoxData.h)
						}

						ctx.putImageData(faceImgData,0,0);
						setTimeout(()=>{
							resolve(canvasId);
						},10)
					});

				}else{
					resolve(canvasId);
				}
			})
			.catch((e)=>{
				console.log("could not crop to face, sending full image");
				resolve(canvasId);
			})
		}
	})
}

function fmcLimitImageSize(canvasId = "fmc_camera_canvas"){
	return new Promise((resolve,reject)=>{

		let scaleImageFlag = true;

		if (scaleImageFlag){
			let canvas = document.getElementById(canvasId);
			let ctx = canvas.getContext("2d");


			let unscaledImgUrl = canvas.toDataURL("image/jpeg");


			let unscaledImg = new Image();

			unscaledImg.onload = ()=>{

				let imgWidth = unscaledImg.width;
				let imgHeight = unscaledImg.height;

				let scaleFactor = 1;
				//let pixelLimit = Math.round(1920/window.devicePixelRatio);
				let pixelLimit = 1920;
				if (imgHeight > imgWidth){

					scaleFactor = Math.min(pixelLimit/imgHeight, 1);
				}else{
					scaleFactor = Math.min(pixelLimit/imgWidth, 1);
				}

				fmcImSz={
					w: Math.round(scaleFactor*imgWidth),
					h: Math.round(scaleFactor*imgHeight)
				}

				logOnLocalHostFrontEnd("image height / width ", imgHeight + "/" + imgWidth);

				canvas.width = Math.round(scaleFactor*imgWidth);
				canvas.height = Math.round(scaleFactor*imgHeight);
				setTimeout(()=>{
					ctx.drawImage(unscaledImg,0,0,Math.round(imgWidth*scaleFactor),Math.round(imgHeight*scaleFactor));
					logOnLocalHostFrontEnd("used scalefactor for image: ",scaleFactor);
					setTimeout(()=>{
						resolve(canvasId);
					},10)

				},10)
			}
			unscaledImg.src = unscaledImgUrl;
		}else{
			resolve(canvasId);

		}

	})
}

function getColorFromGradient(gradientPoint){
	let colorObj = {r:0,g:0,b:0}
	if (gradientPoint > 210){
		colorObj.r = 225 + Math.round(30 * ( (gradientPoint - 210 )/ 45));
		colorObj.g = 141 - Math.round(141 * ( (gradientPoint - 210 )/ 45));
		colorObj.b = 0;
	}
	else if (gradientPoint > 160){
		colorObj.r = 242 - Math.round(13 * ( (gradientPoint - 160 )/ 50));
		colorObj.g = 226 - Math.round(85 * ( (gradientPoint - 160 )/ 50));
		colorObj.b = 0;
	}else{
		colorObj.r = 55 - Math.round(44 * (gradientPoint / 160));
		colorObj.g = 192 - Math.round(50 * (gradientPoint / 160)) ;
		colorObj.b = 176 + Math.round(16 * (gradientPoint / 160));
	}
	return colorObj;
}

function fmcCalcConcerns(canvasId="fmc_camera_canvas"){
	return new Promise((resolve, reject)=>{
		if (fmcManualCaptureFlag){
			reject({success: false, message: "fmcManualCaptureFlag is true"});
		}else{

			try{

				let options = getFaceDetectorOptions()
				let canvas = document.getElementById(canvasId);
				let ctx = canvas.getContext("2d");


				let overlay = document.getElementById("fmc_camera_canvas_overlay");
				let overlayctx = overlay.getContext("2d");
				overlay.width = canvas.width;
				overlay.height = canvas.height;

				faceapi.detectAllFaces(canvas, options).withFaceLandmarks().then((landmarkDataArray)=>{

					logOnLocalHostFrontEnd("Calculated Concerns Landmark data Array: ",landmarkDataArray);
					let darkCircleScore = -1;
					let dehydrationScore = -1;

					landmarkDataArray.forEach((landmarkData,index)=>{
						logOnLocalHostFrontEnd("Landmark Dat: ", landmarkData);

						let leftEye = [];
						let rightEye = [];
						let leftEyeBrow = [];
						let rightEyeBrow = [];
						let jaw = [];
						let mouth = [];
						let nose = [];

						if (landmarkData.landmarks._shift._x >= 0 && landmarkData.landmarks._shift._y >= 0){
							leftEye =landmarkData.landmarks.getLeftEye();
							rightEye =landmarkData.landmarks.getRightEye();
							leftEyeBrow = landmarkData.landmarks.getLeftEyeBrow();
							rightEyeBrow = landmarkData.landmarks.getRightEyeBrow();
							jaw = landmarkData.landmarks.getJawOutline();
							mouth = landmarkData.landmarks.getMouth();
							nose = landmarkData.landmarks.getNose();
						}else if (landmarkData.landmarks._shift._x < 0 && landmarkData.landmarks._shift._y < 0){
							leftEye =landmarkData.unshiftedLandmarks.getLeftEye();
							rightEye =landmarkData.unshiftedLandmarks.getRightEye();
							leftEyeBrow = landmarkData.unshiftedLandmarks.getLeftEyeBrow();
							rightEyeBrow = landmarkData.unshiftedLandmarks.getRightEyeBrow();
							jaw = landmarkData.unshiftedLandmarks.getJawOutline();
							mouth = landmarkData.unshiftedLandmarks.getMouth();
							nose = landmarkData.unshiftedLandmarks.getNose();
						}else{
							let unshiftedLeftEye = landmarkData.unshiftedLandmarks.getLeftEye();
							let unshiftedRightEye = landmarkData.unshiftedLandmarks.getRightEye();
							let shiftedLeftEye = landmarkData.landmarks.getLeftEye();
							let shiftedRightEye = landmarkData.landmarks.getRightEye();

							let unshiftedLeftEyeBrow = landmarkData.unshiftedLandmarks.getLeftEyeBrow();
							let unshiftedRightEyeBrow = landmarkData.unshiftedLandmarks.getRightEyeBrow();
							let shiftedLeftEyeBrow = landmarkData.landmarks.getLeftEyeBrow();
							let shiftedRightEyeBrow = landmarkData.landmarks.getRightEyeBrow();

							let shiftedJaw = landmarkData.landmarks.getJawOutline();
							let unshiftedJaw = landmarkData.unshiftedLandmarks.getJawOutline();

							let shiftedMouth = landmarkData.landmarks.getMouth();
							let unshiftedMouth = landmarkData.unshiftedLandmarks.getMouth();

							let shiftedNose = landmarkData.landmarks.getMouth();
							let unshiftedNose = landmarkData.unshiftedLandmarks.getNose();


							if (landmarkData.landmarks._shift._x >= 0){
								shiftedLeftEye.forEach((eyePoint,index)=>{
									leftEye.push({_x: shiftedLeftEye[index]._x , _y : unshiftedLeftEye[index]._y});
									rightEye.push({_x: shiftedRightEye[index]._x , _y : unshiftedRightEye[index]._y})
								});
								shiftedLeftEyeBrow.forEach((eyeBrowPoint,index)=>{
									leftEyeBrow.push({_x: shiftedLeftEyeBrow[index]._x , _y : unshiftedLeftEyeBrow[index]._y});
									rightEyeBrow.push({_x: shiftedRightEyeBrow[index]._x , _y : unshiftedRightEyeBrow[index]._y})
								});
								shiftedJaw.forEach((jawPoint,index)=>{
									jaw.push({_x: shiftedJaw[index]._x , _y : unshiftedJaw[index]._y});
								});
								shiftedMouth.forEach((mouthPoint,index)=>{
									mouth.push({_x: shiftedMouth[index]._x , _y : unshiftedMouth[index]._y});
								});
								shiftedNose.forEach((nosePoint,index)=>{
									try{
										nose.push({_x: shiftedNose[index]._x , _y : unshiftedNose[index]._y});
									}catch(err){
										nose.push({_x: shiftedNose[index]._x , _y : shiftedNose[index]._y});
									}
								});

							}else{
								shiftedLeftEye.forEach((eyePoint,index)=>{
									leftEye.push({_x: unshiftedLeftEye[index]._x , _y : shiftedLeftEye[index]._y});
									rightEye.push({_x: unshiftedRightEye[index]._x , _y : shiftedRightEye[index]._y})
								});
								shiftedLeftEyeBrow.forEach((eyeBrowPoint,index)=>{
									leftEyeBrow.push({_x: unshiftedLeftEyeBrow[index]._x , _y : shiftedLeftEyeBrow[index]._y});
									rightEyeBrow.push({_x: unshiftedRightEyeBrow[index]._x , _y : shiftedRightEyeBrow[index]._y})
								});
								shiftedJaw.forEach((jawPoint,index)=>{
									jaw.push({_x: unshiftedJaw[index]._x , _y : shiftedJaw[index]._y});
								});
								shiftedMouth.forEach((mouthPoint,index)=>{
									mouth.push({_x: unshiftedMouth[index]._x , _y : shiftedMouth[index]._y});
								});
								shiftedNose.forEach((nosePoint,index)=>{
									try{
										nose.push({_x: unshiftedNose[index]._x , _y : shiftedNose[index]._y});
									}catch(err){
										nose.push({_x: shiftedNose[index]._x , _y : shiftedNose[index]._y});
									}
								});
							}
						}



						let leftEyeBoxWidth = leftEye[3]._x - leftEye[0]._x;
						let rightEyeBoxWidth = rightEye[3]._x - rightEye[0]._x;

						let leftEyeBoxHeight = Math.max(leftEye[4]._y, leftEye[5]._y) - Math.min(leftEye[1]._y, leftEye[2]._y);
						let rightEyeBoxHeight = Math.max(rightEye[4]._y, rightEye[5]._y) - Math.min(rightEye[1]._y, rightEye[2]._y);

						let calcBoxWidth = Math.max(1.2*leftEyeBoxWidth,1.2*rightEyeBoxWidth);
						let calcBoxHeight = Math.max(1.2*leftEyeBoxHeight,1.2*rightEyeBoxHeight);

						let leftDarkCircleBox = {x : leftEye[0]._x - leftEyeBoxWidth*0.1,y : Math.max(leftEye[4]._y,leftEye[5]._y) + 0.6*leftEyeBoxHeight, w : calcBoxWidth, h : calcBoxHeight};
						let rightDarkCircleBox = {x : rightEye[0]._x - rightEyeBoxWidth*0.1 ,y : Math.max(rightEye[4]._y,rightEye[5]._y)+ 0.6*rightEyeBoxHeight, w : calcBoxWidth, h : calcBoxHeight};



						let leftCompareBox = {
							x: leftDarkCircleBox.x - 0.3*leftDarkCircleBox.w,
							y: leftDarkCircleBox.y + leftDarkCircleBox.h,
							w: leftDarkCircleBox.w,
							h: leftDarkCircleBox.h
						}
						let rightCompareBox = {
							x: rightDarkCircleBox.x +  0.3*leftDarkCircleBox.w,
							y: rightDarkCircleBox.y + rightDarkCircleBox.h,
							w: rightDarkCircleBox.w,
							h: rightDarkCircleBox.h
						}


						let darkCircleImgDataLeft = ctx.getImageData(leftDarkCircleBox.x, leftDarkCircleBox.y, leftDarkCircleBox.w , leftDarkCircleBox.h);
						let compareImgDataLeft = ctx.getImageData(leftCompareBox.x, leftCompareBox.y, leftCompareBox.w , leftCompareBox.h);
						let darkCircleImgDataRight = ctx.getImageData(rightDarkCircleBox.x, rightDarkCircleBox.y, rightDarkCircleBox.w , rightDarkCircleBox.h);
						let compareImgDataRight = ctx.getImageData(rightCompareBox.x, rightCompareBox.y, rightCompareBox.w , rightCompareBox.h);

						let darkCircleR = 0;
						let darkCircleG = 0;
						let darkCircleB = 0;
						let compareR = 0;
						let compareG = 0;
						let compareB = 0;


						for (let ii = 0; ii < darkCircleImgDataLeft.data.length/4; ii++){
							darkCircleR += darkCircleImgDataLeft.data[4*ii]/255  + darkCircleImgDataRight.data[4*ii]/255 ;
							darkCircleG += darkCircleImgDataLeft.data[4*ii+1]/255  + darkCircleImgDataRight.data[4*ii+1]/255 ;
							darkCircleB += darkCircleImgDataLeft.data[4*ii+2]/255  + darkCircleImgDataRight.data[4*ii+2]/255 ;
							compareR += compareImgDataLeft.data[4*ii]/255  + compareImgDataRight.data[4*ii]/255 ;
							compareG += compareImgDataLeft.data[4*ii+1]/255  + compareImgDataRight.data[4*ii+1]/255 ;
							compareB += compareImgDataLeft.data[4*ii+2]/255  + compareImgDataRight.data[4*ii+2]/255 ;
						}

						let darkCircleLight = 0.2126 * darkCircleR + 0.7152 * darkCircleG + 0.0722 * darkCircleB;
						let compareLight = 0.2126 * compareR + 0.7152 * compareG + 0.0722 * compareB;


						darkCircleScore = Math.max(1,Math.min(5,Math.floor(-50/3 * darkCircleLight/compareLight + 52/3)));

						if (isNaN(darkCircleScore)){
							darkCircleScore =2;
						}

						//fmcDrawWhiteEllipseInRectOnCanvas(leftDarkCircleBox.x,leftDarkCircleBox.y,leftDarkCircleBox.w,leftDarkCircleBox.h,"fmc_camera_canvas");
						//fmcDrawWhiteEllipseInRectOnCanvas(rightDarkCircleBox.x,rightDarkCircleBox.y,rightDarkCircleBox.w,rightDarkCircleBox.h,"fmc_camera_canvas");
						//fmcDrawRectOnCanvas(leftDarkCircleBox.x,leftDarkCircleBox.y,leftDarkCircleBox.w,leftDarkCircleBox.h, "fmc_camera_canvas");
						//fmcDrawRectOnCanvas(rightDarkCircleBox.x,rightDarkCircleBox.y,rightDarkCircleBox.w,rightDarkCircleBox.h, "fmc_camera_canvas");
						//fmcDrawRectOnCanvas(leftCompareBox.x,leftCompareBox.y,leftCompareBox.w,leftCompareBox.h, "fmc_camera_canvas");
						//fmcDrawRectOnCanvas(rightCompareBox.x,rightCompareBox.y,rightCompareBox.w,rightCompareBox.h, "fmc_camera_canvas");


						//fmcDarkCircImgUrl = canvas.toDataURL("image/jpeg");



						//fmcWriteText(100,100,String(darkCircleScore));
						//fmcWriteText(200,100,String(dehydrationScore));
						//canvas.style.opacity =1;
						//overlay.style.opacity =1;
						//document.getElementById("fmc_dark_circles_canvas").style.opacity = 1;

						//landmarkData.landmarks._positions.forEach((point,index)=>{
							//fmcDrawDiskOnCanvas(point._x,point._y);
						//})

						//drawLandmarks(canvas, overlay, [landmarkData], withBoxes)

					})


					resolve({concerns:{darkCircles : darkCircleScore, dehydration: "2"},canvasId: canvasId});
				})
				.catch((e)=>{
					console.log("error in face detection on calc scores")
					resolve({concerns:{darkCircles : "2", dehydration: "2"},canvasId: canvasId});
				})
			}catch(err){
				reject(err);
			}
		}
	})
}

function fmcMakeDarkCirclesMaskImageURL(canvasId = "fmc_dark_circles_canvas"){
	return new Promise((resolve,reject)=>{
		try{

			let options = getFaceDetectorOptions()
			let canvas = document.getElementById(canvasId);

			let ctx = canvas.getContext("2d");

			faceapi.detectAllFaces(canvas, options).withFaceLandmarks().then((landmarkDataArray)=>{
				logOnLocalHostFrontEnd("Image Landmark data Array: ",landmarkDataArray);

				landmarkDataArray.forEach((landmarkData,index)=>{
					logOnLocalHostFrontEnd("Landmark Dat: ", landmarkData);

					let leftEye = [];
					let rightEye = [];


					if (landmarkData.landmarks._shift._x >= 0 && landmarkData.landmarks._shift._y >= 0){
						leftEye =landmarkData.landmarks.getLeftEye();
						rightEye =landmarkData.landmarks.getRightEye();
					}else if (landmarkData.landmarks._shift._x < 0 && landmarkData.landmarks._shift._y < 0){
						leftEye =landmarkData.unshiftedLandmarks.getLeftEye();
						rightEye =landmarkData.unshiftedLandmarks.getRightEye();
					}else{
						let unshiftedLeftEye = landmarkData.unshiftedLandmarks.getLeftEye();
						let unshiftedRightEye = landmarkData.unshiftedLandmarks.getRightEye();
						let shiftedLeftEye = landmarkData.landmarks.getLeftEye();
						let shiftedRightEye = landmarkData.landmarks.getRightEye();

						if (landmarkData.landmarks._shift._x >= 0){
							shiftedLeftEye.forEach((eyePoint,index)=>{
								leftEye.push({_x: shiftedLeftEye[index]._x , _y : unshiftedLeftEye[index]._y});
								rightEye.push({_x: shiftedRightEye[index]._x , _y : unshiftedRightEye[index]._y})
							});

						}else{
							shiftedLeftEye.forEach((eyePoint,index)=>{
								leftEye.push({_x: unshiftedLeftEye[index]._x , _y : shiftedLeftEye[index]._y});
								rightEye.push({_x: unshiftedRightEye[index]._x , _y : shiftedRightEye[index]._y})
							});
						}
					}



					let leftEyeBoxWidth = leftEye[3]._x - leftEye[0]._x;
					let rightEyeBoxWidth = rightEye[3]._x - rightEye[0]._x;

					let leftEyeBoxHeight = Math.max(leftEye[4]._y, leftEye[5]._y) - Math.min(leftEye[1]._y, leftEye[2]._y);
					let rightEyeBoxHeight = Math.max(rightEye[4]._y, rightEye[5]._y) - Math.min(rightEye[1]._y, rightEye[2]._y);


					let leftDarkCircleBox = {x : leftEye[0]._x - leftEyeBoxWidth*0.1,y : Math.max(leftEye[4]._y,leftEye[5]._y) + 0.6*leftEyeBoxHeight, w : 1.2*leftEyeBoxWidth, h : 1.2*leftEyeBoxHeight};
					let rightDarkCircleBox = {x : rightEye[0]._x - rightEyeBoxWidth*0.1 ,y : Math.max(rightEye[4]._y,rightEye[5]._y)+ 0.6*rightEyeBoxHeight, w : 1.2*rightEyeBoxWidth, h : 1.2*rightEyeBoxHeight};


					fmcDrawWhiteEllipseInRectOnCanvas(leftDarkCircleBox.x,leftDarkCircleBox.y,leftDarkCircleBox.w,leftDarkCircleBox.h, "fmc_dark_circles_canvas");
					fmcDrawWhiteEllipseInRectOnCanvas(rightDarkCircleBox.x,rightDarkCircleBox.y,rightDarkCircleBox.w,rightDarkCircleBox.h, "fmc_dark_circles_canvas");

					let imgUrl = canvas.toDataURL("image/jpeg");
					//logOnLocalHostFrontEnd("DARK CIRCLES URL: ", imgUrl);

					//canvas.style.opacity = 1;


					resolve(imgUrl);

				})


			})
			.catch((e)=>{
				console.log("cannot create new dark circles mask - using original");
				let imgUrl = canvas.toDataURL("image/jpeg");

				resolve(imgUrl);
			})




		}catch(err){
			logOnLocalHostFrontEnd("DARK CIRCLES URL: ", err);
			reject(err);
		}
	})
}

function fmcMakeDehydrationMaskImageURL(canvasId = "fmc_dehydration_canvas"){
	return new Promise((resolve, reject)=>{

		try{

			let options = getFaceDetectorOptions()
			let canvas = document.getElementById(canvasId);
			let ctx = canvas.getContext("2d");

			let red_canvas = document.getElementById("fmc_redness_canvas");
			let red_ctx = red_canvas.getContext("2d");

			faceapi.detectAllFaces(canvas, options).withFaceLandmarks().then((landmarkDataArray)=>{
				logOnLocalHostFrontEnd("Image Landmark data Array: ",landmarkDataArray);

				landmarkDataArray.forEach((landmarkData,index)=>{
					logOnLocalHostFrontEnd("Landmark Data DEHYDRATION: ", landmarkData);

					let leftEye = [];
					let rightEye = [];
					let leftEyeBrow = [];
					let rightEyeBrow = [];
					let jaw = [];
					let mouth = [];
					let nose = [];

					if (landmarkData.landmarks._shift._x >= 0 && landmarkData.landmarks._shift._y >= 0){
						leftEye =landmarkData.landmarks.getLeftEye();
						rightEye =landmarkData.landmarks.getRightEye();
						leftEyeBrow = landmarkData.landmarks.getLeftEyeBrow();
						rightEyeBrow = landmarkData.landmarks.getRightEyeBrow();
						jaw = landmarkData.landmarks.getJawOutline();
						mouth = landmarkData.landmarks.getMouth();
						nose = landmarkData.landmarks.getNose();
					}else if (landmarkData.landmarks._shift._x < 0 && landmarkData.landmarks._shift._y < 0){
						leftEye =landmarkData.unshiftedLandmarks.getLeftEye();
						rightEye =landmarkData.unshiftedLandmarks.getRightEye();
						leftEyeBrow = landmarkData.unshiftedLandmarks.getLeftEyeBrow();
						rightEyeBrow = landmarkData.unshiftedLandmarks.getRightEyeBrow();
						jaw = landmarkData.unshiftedLandmarks.getJawOutline();
						mouth = landmarkData.unshiftedLandmarks.getMouth();
						nose = landmarkData.unshiftedLandmarks.getNose();
					}else{
						let unshiftedLeftEye = landmarkData.unshiftedLandmarks.getLeftEye();
						let unshiftedRightEye = landmarkData.unshiftedLandmarks.getRightEye();
						let shiftedLeftEye = landmarkData.landmarks.getLeftEye();
						let shiftedRightEye = landmarkData.landmarks.getRightEye();

						let unshiftedLeftEyeBrow = landmarkData.unshiftedLandmarks.getLeftEyeBrow();
						let unshiftedRightEyeBrow = landmarkData.unshiftedLandmarks.getRightEyeBrow();
						let shiftedLeftEyeBrow = landmarkData.landmarks.getLeftEyeBrow();
						let shiftedRightEyeBrow = landmarkData.landmarks.getRightEyeBrow();

						let shiftedJaw = landmarkData.landmarks.getJawOutline();
						let unshiftedJaw = landmarkData.unshiftedLandmarks.getJawOutline();

						let shiftedMouth = landmarkData.landmarks.getMouth();
						let unshiftedMouth = landmarkData.unshiftedLandmarks.getMouth();

						let shiftedNose = landmarkData.landmarks.getMouth();
						let unshiftedNose = landmarkData.unshiftedLandmarks.getNose();


						if (landmarkData.landmarks._shift._x >= 0){
							shiftedLeftEye.forEach((eyePoint,index)=>{
								leftEye.push({_x: shiftedLeftEye[index]._x , _y : unshiftedLeftEye[index]._y});
								rightEye.push({_x: shiftedRightEye[index]._x , _y : unshiftedRightEye[index]._y})
							});
							shiftedLeftEyeBrow.forEach((eyeBrowPoint,index)=>{
								leftEyeBrow.push({_x: shiftedLeftEyeBrow[index]._x , _y : unshiftedLeftEyeBrow[index]._y});
								rightEyeBrow.push({_x: shiftedRightEyeBrow[index]._x , _y : unshiftedRightEyeBrow[index]._y})
							});
							shiftedJaw.forEach((jawPoint,index)=>{
								jaw.push({_x: shiftedJaw[index]._x , _y : unshiftedJaw[index]._y});
							});
							shiftedMouth.forEach((mouthPoint,index)=>{
								mouth.push({_x: shiftedMouth[index]._x , _y : unshiftedMouth[index]._y});
							});
							shiftedNose.forEach((nosePoint,index)=>{
								try{
									nose.push({_x: shiftedNose[index]._x , _y : unshiftedNose[index]._y});
								}catch(err){
									nose.push({_x: shiftedNose[index]._x , _y : shiftedNose[index]._y});
								}
							});

						}else{
							shiftedLeftEye.forEach((eyePoint,index)=>{
								leftEye.push({_x: unshiftedLeftEye[index]._x , _y : shiftedLeftEye[index]._y});
								rightEye.push({_x: unshiftedRightEye[index]._x , _y : shiftedRightEye[index]._y})
							});
							shiftedLeftEyeBrow.forEach((eyeBrowPoint,index)=>{
								leftEyeBrow.push({_x: unshiftedLeftEyeBrow[index]._x , _y : shiftedLeftEyeBrow[index]._y});
								rightEyeBrow.push({_x: unshiftedRightEyeBrow[index]._x , _y : shiftedRightEyeBrow[index]._y})
							});
							shiftedJaw.forEach((jawPoint,index)=>{
								jaw.push({_x: unshiftedJaw[index]._x , _y : shiftedJaw[index]._y});
							});
							shiftedMouth.forEach((mouthPoint,index)=>{
								mouth.push({_x: unshiftedMouth[index]._x , _y : shiftedMouth[index]._y});
							});
							shiftedNose.forEach((nosePoint,index)=>{
								try{
									nose.push({_x: unshiftedNose[index]._x , _y : shiftedNose[index]._y});
								}catch(err){
									nose.push({_x: shiftedNose[index]._x , _y : shiftedNose[index]._y});
								}
							});
						}
					}

					let topLeftEyeBrowY = leftEyeBrow[2]._y;
					let topRightEyeBrowY = rightEyeBrow[2]._y;
					let lowLeftEyeY = Math.max(leftEye[4]._y,leftEye[5]._y);
					let lowRightEyeY = Math.max(rightEye[4]._y,rightEye[5]._y);

					let faceRectToScan = {
						x: Math.round(jaw[2]._x) + 0.0*(jaw[14]._x - jaw[2]._x) ,
						y: Math.round(2.0 * Math.min(topLeftEyeBrowY,topRightEyeBrowY) - 1.0*Math.min(lowLeftEyeY,lowRightEyeY) - 0.05*(jaw[8]._y - 2.0 * Math.min(topLeftEyeBrowY,topRightEyeBrowY) + 1.0*Math.min(lowLeftEyeY,lowRightEyeY))),
						w: Math.round(1.0*(jaw[14]._x - jaw[2]._x)), //w: Math.round(1.0*(rightEyeBrow[4]._x - leftEyeBrow[0]._x)),
						h: Math.round(1.1*(jaw[8]._y - 2.0 * Math.min(topLeftEyeBrowY,topRightEyeBrowY) + 1.0*Math.min(lowLeftEyeY,lowRightEyeY)))
					}

					let leftEyeBlankRect = {
						x: Math.round(jaw[0]._x),
						y: Math.round(topLeftEyeBrowY - 0.2*(lowLeftEyeY - topLeftEyeBrowY)),
						w: Math.round( 0.5*leftEye[3]._x + 0.5*rightEye[0]._x -jaw[0]._x ),
						h: Math.round(1.7*(lowLeftEyeY - topLeftEyeBrowY))
					}

					let rightEyeBlankRect = {
						x: Math.round( leftEye[3]._x + 0.5*(rightEye[0]._x - leftEye[3]._x )),
						y: Math.round(topRightEyeBrowY - 0.2*(lowRightEyeY - topRightEyeBrowY)),
						w: Math.round( jaw[16]._x - leftEye[3]._x - 0.5*(rightEye[0]._x - leftEye[3]._x ) ),
						h: Math.round(1.7*(lowRightEyeY - topRightEyeBrowY))
					}

					let mouthBlankRect = {
						x: Math.round( mouth[0]._x - 0.2 * (mouth[6]._x - mouth[0]._x)),
						y: Math.round(mouth[2]._y - 0.2* (mouth[9]._y - mouth[2]._y)),
						w: Math.round( 1.4*(mouth[6]._x - mouth[0]._x) ),
						h: Math.round( 1.4* (mouth[9]._y - mouth[2]._y))
					}

					let noseBlankRect = {
						x: Math.round( nose[4]._x - 0.5*(nose[8]._x - nose[4]._x)),
						y: Math.round( nose[3]._y  - 0.7*(nose[6]._y - nose[3]._y)),
						w: Math.round( 2*(nose[8]._x - nose[4]._x) ),
						h: Math.round( 2* (nose[6]._y - nose[3]._y))
					}



					let dehydrationImgData = ctx.getImageData(faceRectToScan.x, faceRectToScan.y, faceRectToScan.w , faceRectToScan.h);



					let newImgData = ctx.createImageData(dehydrationImgData.width, dehydrationImgData.height)
					let rednessImgData = ctx.createImageData(dehydrationImgData.width, dehydrationImgData.height)

					let y=0;
					let x=0;
					let modTarget = Math.ceil(dehydrationImgData.height / 200)

					function processImageBlocks(){
						return new Promise((imgRes,imgRej)=>{

							//logOnLocalHostFrontEnd("processing image block - cur y = ",y);
							let initBlockCall = true;
							while( y< dehydrationImgData.height && ( y % modTarget != 0) || initBlockCall){
								initBlockCall = false;
								while( x< dehydrationImgData.width ){

									let ii = y* dehydrationImgData.width + x;


									let minBlue = 255;
									let maxBlue = 0;
									let avRed = 0;
									let avCounter = 0;

									for (var scan_x = -10; scan_x < 11; scan_x++ ){
										for (var scan_y = -10; scan_y < 11; scan_y++ ){
											let idx = (ii-scan_x  + scan_y*dehydrationImgData.width );
											while (idx < 0){
												idx += dehydrationImgData.data.length/4;
											}
											while (idx >= dehydrationImgData.data.length/4){
												idx -= dehydrationImgData.data.length/4;
											}

											minBlue = Math.min(minBlue, dehydrationImgData.data[idx*4+2]);
											maxBlue = Math.max(maxBlue, dehydrationImgData.data[idx*4+2]);
											avRed += dehydrationImgData.data[idx*4+0]  / (dehydrationImgData.data[idx*4+0]+dehydrationImgData.data[idx*4+1]+dehydrationImgData.data[idx*4+2]);
											avCounter++;
										}
									}

									let curColorObj = getColorFromGradient(Math.min(Math.max(Math.round((dehydrationImgData.data[ii*4+2]-minBlue)/(maxBlue - minBlue)*255),0),255));

									newImgData.data[ii*4+0] = curColorObj.r;
									newImgData.data[ii*4+1] = curColorObj.g;
									newImgData.data[ii*4+2] = curColorObj.b;

									let faceAlpha = calcOpacityEllipse(ii % dehydrationImgData.width,Math.floor(ii/dehydrationImgData.width), {x:0,y:0,w:dehydrationImgData.width,h:dehydrationImgData.height}, 0.2 );
									let leftEyeAlpha = 255-calcOpacityEllipse(ii % dehydrationImgData.width,Math.floor(ii/dehydrationImgData.width), {x:Math.round(leftEyeBlankRect.x-faceRectToScan.x),y:Math.round(leftEyeBlankRect.y-faceRectToScan.y),w:leftEyeBlankRect.w,h:leftEyeBlankRect.h}, 0.4 );
									let rightEyeAlpha = 255-calcOpacityEllipse(ii % dehydrationImgData.width,Math.floor(ii/dehydrationImgData.width), {x:Math.round(rightEyeBlankRect.x-faceRectToScan.x),y:Math.round(rightEyeBlankRect.y-faceRectToScan.y),w:rightEyeBlankRect.w,h:rightEyeBlankRect.h}, 0.4 );
									let mouthAlpha = 255-calcOpacityEllipse(ii % dehydrationImgData.width,Math.floor(ii/dehydrationImgData.width), {x:Math.round(mouthBlankRect.x-faceRectToScan.x),y:Math.round(mouthBlankRect.y-faceRectToScan.y),w:mouthBlankRect.w,h:mouthBlankRect.h}, 0.4 );
									let noseAlpha = 255-calcOpacityEllipse(ii % dehydrationImgData.width,Math.floor(ii/dehydrationImgData.width), {x:Math.round(noseBlankRect.x-faceRectToScan.x),y:Math.round(noseBlankRect.y-faceRectToScan.y),w:noseBlankRect.w,h:noseBlankRect.h}, 0.4 );

									let maskAlpha = 1*Math.min(faceAlpha,leftEyeAlpha,rightEyeAlpha,mouthAlpha,noseAlpha)/255;

									newImgData.data[ii*4+0] = Math.round(maskAlpha * newImgData.data[ii*4+0] + (1-maskAlpha) * dehydrationImgData.data[ii*4+0]);
									newImgData.data[ii*4+1] = Math.round(maskAlpha * newImgData.data[ii*4+1] + (1-maskAlpha) * dehydrationImgData.data[ii*4+1]);
									newImgData.data[ii*4+2] = Math.round(maskAlpha * newImgData.data[ii*4+2] + (1-maskAlpha) * dehydrationImgData.data[ii*4+2]);
									newImgData.data[ii*4+3] = 255;

									avRed /= avCounter;

									let curRedRatio = dehydrationImgData.data[ii*4+0]  / (dehydrationImgData.data[ii*4+0]+dehydrationImgData.data[ii*4+1]+dehydrationImgData.data[ii*4+2]);
									if (  curRedRatio + 0.005 > avRed){
										rednessImgData.data[ii*4+0] = dehydrationImgData.data[ii*4+0];
										rednessImgData.data[ii*4+1] = Math.round(dehydrationImgData.data[ii*4+1] * (1 - 10*(curRedRatio + 0.005 - avRed)));
										rednessImgData.data[ii*4+2] = Math.round(dehydrationImgData.data[ii*4+2] * (1 - 10*(curRedRatio + 0.005 - avRed)));
									}else{
										rednessImgData.data[ii*4+0] = dehydrationImgData.data[ii*4+0];
										rednessImgData.data[ii*4+1] = dehydrationImgData.data[ii*4+1];
										rednessImgData.data[ii*4+2] = dehydrationImgData.data[ii*4+2];
									}

									rednessImgData.data[ii*4+0] = Math.round(maskAlpha * rednessImgData.data[ii*4+0] + (1-maskAlpha) * dehydrationImgData.data[ii*4+0]);
									rednessImgData.data[ii*4+1] = Math.round(maskAlpha * rednessImgData.data[ii*4+1] + (1-maskAlpha) * dehydrationImgData.data[ii*4+1]);
									rednessImgData.data[ii*4+2] = Math.round(maskAlpha * rednessImgData.data[ii*4+2] + (1-maskAlpha) * dehydrationImgData.data[ii*4+2]);
									rednessImgData.data[ii*4+3] = 255;

									x++;

								}
								x=0;
								y++;
							}

							ctx.putImageData(newImgData,faceRectToScan.x, faceRectToScan.y);
							red_ctx.putImageData(rednessImgData,faceRectToScan.x, faceRectToScan.y);
							if (y < dehydrationImgData.height){
								setTimeout(()=>{
									processImageBlocks()
								},5)
							}else{

								logOnLocalHostFrontEnd("DEHYDRATION IMAGE DATA - ",newImgData);
								logOnLocalHostFrontEnd("REDNESS IMAGE DATA - ",rednessImgData);



								let imageMaskUrl = canvas.toDataURL("image/jpeg");
								fmcRednessImgUrl = red_canvas.toDataURL("image/jpeg");
								//document.getElementById("fmc_loading_analyze_scan_bar").style.display = "block";
								dehydrationImgData = null;
								newImgData = null;
								resolve(imageMaskUrl);
							}
						})
					}
					processImageBlocks()


				});
			})
			.catch((e)=>{
				console.log("cannot create dehydration mask - using original");
				let imgUrl = canvas.toDataURL("image/jpeg");
				fmcRednessImgUrl = imgUrl;
				resolve(imgUrl);
			});

		}catch(err){
			logOnLocalHostFrontEnd("concern calculation failed", err);
			reject(err);
		}

	})

}


let counter = 0;
function calcOpacityEllipse(point_x, point_y, ellRectObj, fullAlphaFact = 0.05 ){

	let scaleDimensions = 0.9;

	counter++;
	if (counter % 100 == 0 || true){
		let aSqu = (ellRectObj.w/2*scaleDimensions)*(ellRectObj.w/2*scaleDimensions);
		let bSqu = (ellRectObj.h/2*scaleDimensions)*(ellRectObj.h/2*scaleDimensions);
		let centX =  ellRectObj.x + 0.5*ellRectObj.w;
		let centY =  ellRectObj.y + 0.5*ellRectObj.h;


		let ellVal = (point_x-centX)*(point_x-centX)/aSqu + (point_y - centY)*(point_y-centY)/bSqu - 1;
		let alpha255 =  Math.round(Math.min(1,Math.max(0,-ellVal/fullAlphaFact))*255);


		return alpha255;

	}else{
		return 0;
	}
}

function fmcManualCapture(){
	document.getElementById("fmc_camera_capture_action_button").style.display = "none;"
	fmcSendGA("main flow","manual capture button clicked");
	sendVideoCanvasImage()
}

function sendVideoCanvasImage(){
  let fmc_body = document.getElementById("fmc_body");
  let video = document.getElementById("fmcInputVideo");
  let canvas = document.getElementById("fmc_camera_canvas");
  fmcImageOrientation = 1;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

	//canvas.setAttribute("width", video.videoWidth);
	//canvas.setAttribute("height", video.videoHeight);

  let ctx = canvas.getContext("2d");

	setTimeout(()=>{

		ctx.drawImage(video,0,0,canvas.width,canvas.height);

		setTimeout(()=>{

			let base64imgData = canvas.toDataURL("image/jpeg");
			fmc_alignImageOrientation(base64imgData)
			.then((imgData)=>{
				analyzeImage("fmc_camera_canvas");
			})
			.catch((err)=>{
				logOnLocalHostFrontEnd("error in orientating image - using original");
				sendImageToBackend(base64imgData)
				.then((fmcRes)=>{
					logOnLocalHostFrontEnd("ANALYZE RESPONSE: ",fmcRes);
					fmcBuildAndUpdateAfterFMCResult(fmcRes)
				})
				.catch((fmcErr)=>{
					console.log("error in sendImageToBackend call - ", fmcErr);
				});
			})
		},10)
	},10)

}

function fmcDrawDiskOnCanvas(point_x,point_y, canvas_id = "fmc_camera_canvas"){
	let ctx = document.getElementById(canvas_id).getContext("2d");
	ctx.beginPath();
	ctx.arc(point_x, point_y, 5, 0, 2 * Math.PI, false);
	ctx.fillStyle = 'green';
	ctx.fill();
}

function fmcDrawWhiteEllipseInRectOnCanvas(point_x,point_y, width,height, canvasId = "fmc_dark_circles_canvas"){
	logOnLocalHostFrontEnd("white circle parameters: x="+point_x+" y="+point_y+" w="+width+" h="+height);
	let ctx = document.getElementById(canvasId).getContext("2d");

	let scaleFact = 1.2;

	let scaledWidth = width*1.2;
	let scaledHeight = height*1.2;

	let centerX = point_x + 0.5*width;
	let centerY = point_y + 0.5*height;


	ctx.beginPath();
  ctx.moveTo(centerX - scaledWidth/2, centerY); // A1

  ctx.bezierCurveTo(
    centerX - scaledWidth/2, centerY - scaledHeight/2, // C1
    centerX + scaledWidth/2, centerY - scaledHeight/2, // C2
    centerX + scaledWidth/2, centerY); // A2

  ctx.bezierCurveTo(
    centerX + scaledWidth/2, centerY + scaledHeight/2, // C3
    centerX - scaledWidth/2, centerY + scaledHeight/2, // C4
    centerX - scaledWidth/2, centerY); // A1

	ctx.strokeStyle = "white";
	ctx.stroke();
	ctx.closePath();

}

function fmcDrawRectOnCanvas(point_x,point_y,width,height, canvas_id = "fmc_camera_canvas"){
	let ctx = document.getElementById(canvas_id).getContext("2d");
	ctx.beginPath();
	ctx.lineWitdh = "5";
	ctx.strokeStyle = "red";
	ctx.rect(point_x,point_y,width,height);
	ctx.stroke();
}
function fmcWriteText(point_x,point_y,inText, canvas_id = "fmc_camera_canvas"){
	let ctx = document.getElementById("fmc_camera_canvas").getContext("2d");
	ctx.beginPath();
	ctx.font = "70px Arial";
	ctx.fillStyle = "yellow";
	ctx.fillText(inText,point_x,point_y);
}
function fmcTransformPointcoords(inCoords,scaleFactorObj){

	if (inCoords instanceof Object && !(inCoords instanceof Array)){
		let outCoordsObj = {};
		Object.keys(inCoords).forEach((objKey,index)=>{
			if (objKey == "x" || objKey == "_x"){
				outCoordsObj[objKey] = inCoords[objKey]*scaleFactorObj.x
			}
			if (objKey == "y" || objKey == "_y"){
				outCoordsObj[objKey] = inCoords[objKey]*scaleFactorObj.y
			}
		})
		return outCoordsObj;
	}else if (inCoords instanceof Array){
		let outCoordsArray = []
		inCoords.forEach((point,index)=>{
			let scaledPoint = {}
			Object.keys(point).forEach((objKey,index)=>{
				if (objKey == "x" || objKey == "_x"){
					scaledPoint[objKey] = point[objKey]*scaleFactorObj.x
				}
				if (objKey == "y" || objKey == "_y"){
					scaledPoint[objKey] = point[objKey]*scaleFactorObj.y
				}
			})
			outCoordsArray.push(scaledPoint);
		})
		return outCoordsArray;
	}else{
		return {};
	}
}

function fmcRedoCapture(){
	document.getElementById("fmc_user_orientation_container").style.display="none";
	document.getElementById("fmc_upload_message").style.display="block";
	document.getElementById("fmc_fixed_chat_button").style.display = "block";
	fmcSendGA("main flow","image orientation feature - redo capture clicked");
	retryCapturing()

}

function fmcRotateImage(){
	fmcSendGA("main flow","image orientation feature - rotate clicked");
	let canvas = document.getElementById("fmc_camera_canvas");
	let ctx = canvas.getContext("2d");

	let tmpImg = new Image();

	tmpImg.onload = ()=>{

		let imgHeight = tmpImg.height;
		let imgWidth = tmpImg.width;


		canvas.width = imgHeight;
		canvas.height = imgWidth;

		ctx.rotate(-90*Math.PI/180);


		ctx.drawImage(tmpImg,-imgWidth,0,imgWidth,imgHeight);
		let imgData = canvas.toDataURL("image/jpeg");

		curImgData = imgData;
		document.getElementById("fmc_user_orientation_screen").style.backgroundImage = "url('"+curImgData+"')";
	}

	tmpImg.src= curImgData;
}


let fmcConfirmOrientationBounceFlag = true;
function fmcConfirmOrientation(){
	if (fmcConfirmOrientationBounceFlag){
		fmcConfirmOrientationBounceFlag = false;
		fmcSendGA("main flow","image orientation feature - confirm orientation clicked");
		document.getElementById("fmc_user_orientation_container").style.display="none";
		document.getElementById("fmc_upload_message").style.display="block";
		document.getElementById("fmc_fixed_chat_button").style.display = "block";
		analyzeImage("fmc_camera_canvas");
		setTimeout(()=>{
			fmcConfirmOrientationBounceFlag = true;
		},5000)
	}
}

let disabledProdLanguages = []

var supportedLanguages = {
	"ar":{
		imageUrl: "",
		text: "العربية"
	},
	"cs":{
		imageUrl: "",
		text: "Česky"
	},
	"da":{
		imageUrl: "",
		text: "Dansk"
	},
	"de": {
		imageUrl: "",
		text: "Deutsch"
	},
	"el":{
		imageUrl: "",
		text: "Ελληνικά"
	},
	"en": {
		imageUrl: "",
		text: "English"
	},
	"en-NZ": {
		imageUrl: "",
		text: "English(NZ)"
	},
	"es": {
		imageUrl: "",
		text: "Español"
	},
	"et":{
		imageUrl: "",
		text: "Eesti"
	},
	"fi":{
		imageUrl: "",
		text: "Suomi"
	},
	"fr":{
		imageUrl: "",
		text: "Français"
	},
	"he":{
		imageUrl: "",
		text: "עברית",
	},
	"hi":{
		imageUrl: "",
		text: "हिन्दी"
	},
	"hr":{
		imageUrl: "",
		text: "Hrvatski"
	},
	"it":{
		imageUrl: "",
		text: "Italiano"
	},
	"ja":{
		imageUrl: "",
		text: "日本語"
	},
	"km":{
		imageUrl: "",
		text: "ភាសាខ្មែរ"
	},
	"ko":{
		imageUrl: "",
		text: "한국어"
	},
	"lv":{
		imageUrl: "",
		text: "Latvian"
	},
	"my":{
		imageUrl: "",
		text: "မြန်မာစာ"
	},
	"nb":{
		imageUrl: "",
		text: "Norsk (bokmål)"
	},
	"nl":{
		imageUrl: "",
		text: "Nederlands"
	},
	"pl":{
		imageUrl: "",
		text: "Polski"
	},
	"pt":{
		imageUrl: "",
		text: "Português"
	},
	"ru":{
		imageUrl: "",
		text: "Русский"
	},
	"sl":{
		imageUrl: "",
		text: "Slovenščina"
	},
	"sv":{
		imageUrl: "",
		text: "Svenska"
	},
	"th":{
		imageUrl: "",
		text: "ไทย / Phasa Thai"
	},
	"tr":{
		imageUrl: "",
		text: "Türkçe"
	},
	"vi":{
		imageUrl: "",
		text: "Việtnam"
	},
	"zh-hans":{
		imageUrl: "",
		text: " 汉语"
	},
	"zh-hant":{
		imageUrl: "",
		text: " 漢語"
	}

}

if ( "https://skinanalysis.me" == "https://skinanalysisconsumer-production.herokuapp.com" || "https://skinanalysis.me" == "https://skinanalysis.me"){
	disabledProdLanguages.forEach((item)=>{
		delete supportedLanguages[item];
	})
}

// OLD DEFAULT: default: "Please pardon the interruption of your experience, but our application has encountered an error. Our developers are hard at work to prevent this happening again. Please click to refresh the page and try again."

function makeLanguageSelector(){

	let languageSelector = document.getElementById("fmc_languageSelector");
	if (languageSelector==null) return;

	let activeLanguageCode;
	let savedLanguageCode = readCookie("fmc_languageCode");

	savedLanguageCode = savedLanguageCode == "" ? navigator.language : savedLanguageCode;

	savedLanguageCode = savedLanguageCode == "" ? "en" : savedLanguageCode;

	if (savedLanguageCode.substring(0,2) == "nn" || savedLanguageCode.substring(0,2) == "no"){
		savedLanguageCode = savedLanguageCode.replace("no","nb").replace("nn","nb");
	}

	if (Object.keys(supportedLanguages).indexOf(savedLanguageCode) == -1){
		savedLanguageCode = savedLanguageCode.split("-")[0];
		if (Object.keys(supportedLanguages).indexOf(savedLanguageCode) == -1){
			savedLanguageCode = "en";
		}
	}


	logOnLocalHostFrontEnd("selected Language code for dropdown: ",savedLanguageCode);

	if(window.fmc_forcedLanguageCode != ""){
		languageSelector.style.display = "none";
		return;
	}

	let optionString = "";


	Object.keys(supportedLanguages).forEach((item, index)=>{
		if (item == savedLanguageCode){
			optionString += '<option value="' + item + '" selected="selected">'+ supportedLanguages[item].text +'</option>';
		}else{
			optionString += '<option value="' + item + '">'+ supportedLanguages[item].text +'</option>';
		}
	});

	languageSelector.innerHTML = optionString;

	languageSelector.onchange = (event) => {
		let selectedLanguageCode = event.target[event.target.selectedIndex].value
		setCookie("fmc_languageCode",selectedLanguageCode,1000);
		getTextForLanguage((languageData)=>{
			logOnLocalHostFrontEnd('LANGUAGE DATA: ', languageData);
			languageToUserSettings(languageData, ()=>{
				ajaxToBackend({
					type: "GET",
					url: "/get_country_gdpr/?lang_code="+fmcUsedLanguageCode,
					cb: function(res){
						let response;
						if (typeof res == "string"){
							response = JSON.parse(res);
						}else{
							response = res;
						}
						logOnLocalHostFrontEnd("gdpr call after lang change: ",response);
						setUpZendesk();
					}
				});
			});
		});

	}




}

function getAvailableLanguages(path = "/availableLanguages"){
	return new Promise((resolve,reject)=>{

		function requestFrontendForAvailLang(callback){
			let xhr = new XMLHttpRequest();
			xhr.open("GET", "https://skinanalysis.me" + path );
			xhr.setRequestHeader('Content-Type', 'application/json')
			xhr.onreadystatechange = function(){

				if(this.readyState == 4){

					try{
						callback(JSON.parse(this.responseText));
					}catch(err){
						console.log("could not parse json response - ",err);
						callback(this.responseText);
					}
				}
			}
			xhr.send();
		}


		let intervalCounter = 0;
		let foundLanguageCodes = false;
		let getLangInterval = setInterval(()=>{

			if (intervalCounter < 3){

				requestFrontendForAvailLang((res)=>{
					logOnLocalHostFrontEnd("response from available languages: ", res)
					if (res.status == "success" && !foundLanguageCodes){
						clearInterval(getLangInterval);
						foundLanguageCodes = true;
						resolve(res.language_codes);
					}

					if (res.status != "success" && intervalCounter > 2 && !foundLanguageCodes){
						resolve(["en"]);
					}

				})
			}else{
				clearInterval(getLangInterval);
			}
			intervalCounter++;

		},200);


	})
}

function getTextForLanguage(callback){
	let languageCode;
	if (window.fmc_forcedLanguageCode != ""){
		languageCode = window.fmc_forcedLanguageCode;
	}else{
		languageCode = fmcReadCookie("fmc_languageCode");
		languageCode = languageCode == "" ? navigator.language : languageCode;
		if (languageCode.substring(0,2) == "nn" || languageCode.substring(0,2) == "no"){
			languageCode = languageCode.replace("no","nb").replace("nn","nb");
		}
		if (languageCode.substring(0,2) == "zh"){

			if (languageCode.toLowerCase() == "zh-hant" || languageCode.toLowerCase() == "zh_hant" ||  languageCode.toLowerCase() == "zh-tw"  ||  languageCode.toLowerCase() == "zh_tw" ||  languageCode.toLowerCase() == "zh-hk"  ||  languageCode.toLowerCase() == "zh_hk"){
				languageCode = "zh-hant";
			}else{
				languageCode = "zh-hans";
			}
		}
	}

	let langPath;

	reqPath = "/availableLanguages";

	getAvailableLanguages(reqPath)
	.then((res)=>{
		getLanguageFileFromAvailable(languageCode, res, (res)=>{
			callback(res);
		})
	})
	.catch((err)=>{
		console.log("error in getting languagecode list - using English - ",err);
		languaceCode = "en";
	})

}

function getLanguageFileFromAvailable(langCode, langCodeList, callback){

	let languageCode = langCode;
	logOnLocalHostFrontEnd("looking for language Code: ", languageCode);

	if (!langCodeList.includes(languageCode)){
		languageCode = languageCode.split("-")[0];
		logOnLocalHostFrontEnd("language Code not found, new language code to look up: ", languageCode);
		if (!langCodeList.includes(languageCode)){
			languageCode = "en";
		}
	}
	logOnLocalHostFrontEnd("language Code used: ", languageCode);

	fmcUsedLanguageCode = languageCode;

	let languageFile = languageCode+".json";
	//languageFile = "xx.json";
	//getLanguageFile("xx.json", (defaultObj)=>{

	let tillCounter = 1;

	function getAtLeastEnglishFile(){

		getLanguageFile("en.json", (defaultObj)=>{
			if (defaultObj.status == "200"){
				if (languageFile == "en.json"){

					callback(JSON.parse(defaultObj.data));
				}else{
					render_jsonTextObject(JSON.parse(defaultObj.data));

					getLanguageFile(languageFile, (responseObj)=>{
						if (responseObj.status == "200"){
							callback(JSON.parse(responseObj.data));
						}else{
							if (languageCode.length > 3){

								getLanguageFile(languageCode.split("-")[0]+".json", (fallbackObj)=>{
									if (fallbackObj.status == "200"){
										callback(JSON.parse(fallbackObj.data));
									}else{
										reportError({
											"title": "WARNING - languageCode "+languageCode.split("-")[0],
											"value": "FALLBACK Language File for "+languageCode.split("-")[0]+" not retreived from Front end server.\nStatusCode: "+fallbackObj.status,
											"targetChannel": "missing-languages",
											"color": "warning"
										});
										callback(JSON.parse(defaultObj.data));
									}
								});
							}else{
								reportError({
									"title": "WARNING - languageCode "+languageCode,
									"value": "FALLBACK Language File for "+languageCode+" not retreived from Front end server.\nStatusCode: "+responseObj.status,
									"targetChannel": "missing-languages",
									"color": "warning"
								});
								callback(JSON.parse(defaultObj.data));
							}
						}
					})

				}
			}else{
				reportError({
					"title": "ERROR in getting file en.json",
					"value": "Language File en.json not retreived from Front end server.\nStatusCode: "+defaultObj.status + "\nTrying again\nTry Counter: " + tillCounter
				});
				tillCounter++
				setTimeout(()=>{
					if (tillCounter <= 20){
						getAtLeastEnglishFile();
					}
				},100)
			}
		});
	}
	getAtLeastEnglishFile();

}

function getLanguageFile(fileName,callback){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "https://skinanalysis.me/lang/"+fileName+"?"+fmcSessionTimeString );
	xhr.setRequestHeader('Content-Type', 'text/plain');
	xhr.onreadystatechange = function(){

		if(this.readyState == 4){
			callback({status: this.status, data:this.responseText});
		}
	}
	xhr.send();
}


function languageToUserSettings(languageElementObj, callback){

	render_jsonTextObject(languageElementObj);

	document.getElementById("fmc_image_delayed_upload_button").innerHTML = document.getElementById("fmc_image_upload_button").innerHTML;

	callback();
}

function render_jsonTextObject(textObj){

	Object.keys(textObj).forEach((item,index)=>{
		if ( item == "!variables!"){
			updateJsVariables(textObj["!variables!"]);
		}else if ( item == "!attributes!"){
			updateAttributes(textObj["!attributes!"]);
		}else{
			if (typeof textObj[item] == "object"){
				render_jsonTextObject(textObj[item]);
			}else{
				try{
					if (document.getElementById(item) != null){
						document.getElementById(item).innerHTML = textObj[item];
					}
				}catch(err){
					console.log('Element with id '+item+' not found - err: ',err);
				}
			}
		}
	})
}

function updateJsVariables(variablesObj){
	Object.keys(variablesObj).forEach((item,index)=>{
		try{
			if (typeof variablesObj[item]  == "object"){
				if (item == "fmcSeverityWords"){
					this[item] = variablesObj[item];
				}else{
					Object.keys(variablesObj[item]).forEach((subKey,subIndex)=>{
						this[item][subKey] = variablesObj[item][subKey];
					})

				}
			}
			else{
				this[item] = variablesObj[item].replace("</ b>","</b>");
			}
		}catch(err){
			console.log('Variable '+ item +' not found - err: ',err);
		}
	});
}


function updateAttributes(attributeObj){
	Object.keys(attributeObj).forEach((item, index) => {
		let attrName = Object.keys(attributeObj[item]);
		let attrValue = attributeObj[item][attrName];
		if (document.getElementById(item) != null){
			try{
				document.getElementById(item).setAttribute(attrName,attrValue);
			}catch(err){
				logOnLocalHostFrontEnd("error in setting attributes: ",err);
			}

		}
	});
}

function getDioxideRecommendations(payloadObject){

  return new Promise((resolve,reject)=>{

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://dioxide.herokuapp.com/recommendations/get_recommended_products/"   );
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function(){

      if(xhr.readyState == 4){

          try{

          if (String(xhr.status) == "200"){

            let parsedResponse = JSON.parse(this.responseText);

            parsedResponse.concerns.forEach((concern,index)=>{
              parsedResponse.concerns[index].name = concern.concern_key;
              if (concern.recommended_product != undefined){
                if (Array.isArray(concern.recommended_product.priceCurrency)){
                  parsedResponse.concerns[index].recommended_product.priceCurrency = concern.recommended_product.priceCurrency[0]
                }
                if (Array.isArray(concern.recommended_product.price)){
                  parsedResponse.concerns[index].recommended_product.price = concern.recommended_product.price[0]
                }
                if (Array.isArray(concern.recommended_product.productUrl)){
                  parsedResponse.concerns[index].recommended_product.productUrl = concern.recommended_product.productUrl[0]
                }
                let formatedPriceObj = fmcPriceFormating(parsedResponse.concerns[index].recommended_product.price,parsedResponse.concerns[index].recommended_product.priceCurrency);
                parsedResponse.concerns[index].recommended_product.priceCurrency = formatedPriceObj.priceCurrency;
                parsedResponse.concerns[index].recommended_product.price = formatedPriceObj.price;
              }
            })
            parsedResponse.recommendedProducts.forEach((product,index)=>{
              if (Array.isArray(product.priceCurrency)){
                parsedResponse.recommendedProducts[index].priceCurrency = product.priceCurrency[0]
              }
              if (Array.isArray(product.price)){
                parsedResponse.recommendedProducts[index].price = product.price[0]
              }
              if (Array.isArray(product.productUrl)){
                parsedResponse.recommendedProducts[index].productUrl = product.productUrl[0]
              }
              let formatedPriceObj = fmcPriceFormating(parsedResponse.recommendedProducts[index].price,parsedResponse.recommendedProducts[index].priceCurrency);
              parsedResponse.recommendedProducts[index].priceCurrency = formatedPriceObj.priceCurrency;
              parsedResponse.recommendedProducts[index].price = formatedPriceObj.price;

            })

            fmcCheckDioxideResponse(parsedResponse, payloadObject)
            .then((cleanedResponse)=>{

              resolve(cleanedResponse);
            })
            .catch((err)=>{
              console.error("Error in cleaning dioxide response - ",err);
            })
          }else{
            if (String(xhr.status) == "500"){
              reportDioxError({
                "title": "ERROR - DIOXIDE STATUS - 500",
                "value": "Dioxide Payload: "+JSON.stringify(payloadObject),
                "targetChannel": "dioxide-500-errors"
              });
            }
            reject("Error in dioxide call - status code: " +  xhr.status);
          }

        }catch(err){
          reject(err);
        }

      }
    }
    xhr.send(JSON.stringify(payloadObject));


  })

}

function fmcPrepareDioxidePayload(facemapObj, languageCode){
  return new Promise((resolve,reject)=>{
    try{

      let dioxPayload = {
        "oiliness_score" : 1,
        "dehydration_score" : 1,
        "wrinkles_score" : 1,
        "acne_score" : 1,
        "redness_score" : 1,
        "dark_circles_score" : 1,
        "azure_age" : 25,
        "country_code" : "US",
        "host_site" : "www.dermalogica.com",
        "lang_code" : "en",
        "breezometer_air_quality_index" : null,
        "breezometer_humidity" : null,
        "revieve_acne_value": 0.5,
        "revieve_dark_spots_value": 0.5,
        "revieve_dull_skin_value": 0.5,
        "revieve_eyes_value": 0.5,
        "revieve_freckles_value": 0.5,
        "revieve_hyperpigmentation_value": 0.5,
        "revieve_makeup_value": 0.5,
        "revieve_melasma_value": 0.5,
        "revieve_radiance_value": 0.5,
        "revieve_redness_value": 0.5,
        "revieve_skin_shine_value": 0.5,
        "revieve_smoothness_value": 0.5,
        "revieve_texture_value": 0.5,
        "revieve_uneven_skin_tone_value": 0.5,
        "revieve_wrinkles_value": 0.5,
      }

      facemapObj.concerns.forEach((concern,index)=>{
        if (concern.name != "original"){
          dioxPayload[concern.name + "_score"] = Math.max(1,concern.score);
        }
      })

      // REVIEVE PARAMETERS START
      if (facemapObj.revieve_acne_value != undefined){
        dioxPayload.revieve_acne_value = Number(facemapObj.revieve_acne_value);
      }
      if (facemapObj.revieve_dark_spots_value != undefined){
        dioxPayload.revieve_dark_spots_value = Number(facemapObj.revieve_dark_spots_value);
      }
      if (facemapObj.revieve_dull_skin_value != undefined){
        dioxPayload.revieve_dull_skin_value = Number(facemapObj.revieve_dull_skin_value);
      }
      if (facemapObj.revieve_eyes_value != undefined){
        dioxPayload.revieve_eyes_value = Number(facemapObj.revieve_eyes_value);
      }
      if (facemapObj.revieve_freckles_value != undefined){
        dioxPayload.revieve_freckles_value = Number(facemapObj.revieve_freckles_value);
      }
      if (facemapObj.revieve_hyperpigmentation_value != undefined){
        dioxPayload.revieve_hyperpigmentation_value = Number(facemapObj.revieve_hyperpigmentation_value);
      }
      if (facemapObj.revieve_makeup_value != undefined){
        dioxPayload.revieve_makeup_value = Number(facemapObj.revieve_makeup_value);
      }
      if (facemapObj.revieve_melasma_value != undefined){
        dioxPayload.revieve_melasma_value = Number(facemapObj.revieve_melasma_value);
      }
      if (facemapObj.revieve_radiance_value != undefined){
        dioxPayload.revieve_radiance_value = Number(facemapObj.revieve_radiance_value);
      }
      if (facemapObj.revieve_redness_value != undefined){
        dioxPayload.revieve_redness_value = Number(facemapObj.revieve_redness_value);
      }
      if (facemapObj.revieve_skin_shine_value != undefined){
        dioxPayload.revieve_skin_shine_value = Number(facemapObj.revieve_skin_shine_value);
      }
      if (facemapObj.revieve_smoothness_value != undefined){
        dioxPayload.revieve_smoothness_value = Number(facemapObj.revieve_smoothness_value);
      }
      if (facemapObj.revieve_smoothness_value != undefined){
        dioxPayload.revieve_smoothness_value = Number(facemapObj.revieve_smoothness_value);
      }
      if (facemapObj.revieve_uneven_skin_tone_value != undefined){
        dioxPayload.revieve_uneven_skin_tone_value = Number(facemapObj.revieve_uneven_skin_tone_value);
      }
      if (facemapObj.revieve_wrinkles_value != undefined){
        dioxPayload.revieve_wrinkles_value = Number(facemapObj.revieve_wrinkles_value);
      }
      // REVIEVE PARAMETERS END


      if (facemapObj.azure_age != undefined){
        dioxPayload.azure_age = Number(facemapObj.azure_age);
      }

      if (facemapObj.country != undefined){
        dioxPayload.country_code = facemapObj.country;
      }else if (facemapObj.maxmind_country != undefined){
        dioxPayload.country_code = facemapObj.maxmind_country;
      }

      dioxPayload.host_site = window.location.href.split("?")[0];
      if (fmcForcedPage != ""){
        dioxPayload.host_site = fmcForcedPage;
      }
      if (fmcForcedCountry != ""){
        dioxPayload.country_code = fmcForcedCountry;
      }

      if (languageCode != undefined){
        dioxPayload.lang_code = languageCode;
        if (languageCode == "en"){
          if (dioxPayload.country_code != "AU"){
            dioxPayload.lang_code += "-US";
          }
        }
      }

      if (facemapObj.breezometer_air_quality_index != undefined){
        dioxPayload.breezometer_air_quality_index = facemapObj.breezometer_air_quality_index;
      }
      if (facemapObj.breezometer_humidity != undefined){
        dioxPayload.breezometer_humidity = facemapObj.breezometer_humidity;
      }

      resolve(dioxPayload);

    }catch(err){
      reject(err);
    }

  })
}


function fmcCheckDioxideResponse(dioxObj, payloadObj){
  return new Promise((resolve,reject)=>{

    let outObj = {...dioxObj};

    logOnLocalHostFrontEnd("CHECK RESPONSE OBJECT: ",dioxObj);
    logOnLocalHostFrontEnd("WITH PAYLOAD: ",JSON.stringify(payloadObj));

    dioxPayloadString = JSON.stringify(payloadObj);

    let missingConcerns = "";
    let missingRegimenIndex = "";

    if (outObj.email_html == undefined){
      document.getElementById("fmc_email_container").style.display="none";
      document.getElementById("fmc_frozen_glass_share_button").style.display="none";
      reportError({
        "title": "ERROR - DIOXIDE NO EMAIL PROVIDED",
        "value": "Dioxide Payload: "+dioxPayloadString,
        "targetChannel" :  "dioxide-missing-emailhtml"
      });

    }


    if (outObj.concerns == undefined){
      fmcReportDioxideProblem("MISSING 'concerns' FIELD", dioxPayloadString);
    }else{

      let concernIndicesToRemove = [];

      let concernList = ["dehydration", "acne", "wrinkles","dark_circles","redness","oiliness"];
      outObj.concerns.forEach((concern,index)=>{
        concernList = concernList.filter( concernName => concernName != concern.name);
        let productIsGood = fmcCheckDioxProductFields(concern,"concern",dioxPayloadString);

        if (!productIsGood){
          concernIndicesToRemove.push(index);
        }
      })

      if (concernList.length > 0 && false){
        missingConcerns = String(concernList);
        fmcReportDioxideProblem("MISSING CONCERN(S): " + missingConcerns,dioxPayloadString);
      }

      if (concernIndicesToRemove.length > 0){
        for(let ii = concernIndicesToRemove.length -1; ii > -1; ii--){
          outObj.concerns.splice(concernIndicesToRemove[ii],1);
        }
      }

    }


    if (outObj.recommendedProducts == undefined){
      fmcReportDioxideProblem("MISSING 'recommendedProducts' FIELD",dioxPayloadString);
    }else{

      let regimenIndexList = [1,2,3,4,5,6];
      let regimenIsGood = true;

      outObj.recommendedProducts.forEach((regimenProduct)=>{
        regimenIndexList = regimenIndexList.filter( regimenIndex => regimenIndex != regimenProduct.regimen_index);
        let productIsGood = fmcCheckDioxProductFields(regimenProduct, "regimen",dioxPayloadString)
        regimenIsGood = regimenIsGood && productIsGood;
      })


      if (regimenIndexList.length > 0){
        missingRegimenIndex = String(regimenIndexList);
        fmcReportDioxideProblem("MISSING REGIMEN INDEX/INDICES: " + missingRegimenIndex,dioxPayloadString);
        regimenIsGood = false;
      }

      if (!regimenIsGood){
        outObj.recommendedProducts  = [];
      }


    }

    resolve(outObj);
  })

}

function fmcCheckDioxProductFields(inObj, type, dioxPayloadString){

  let productIsGood = true;

  try{

    let recommendedProd;

    if (type == "concern"){
      recommendedProd = inObj.recommended_product;
    }else{
      recommendedProd = inObj;
    }

    if (recommendedProd == undefined){
      productIsGood = false;
      if (type=="concern"){
        fmcReportDioxideProblem("MISSING PRODUCT FOR CONCERN: " + inObj.name,dioxPayloadString);
      }
    }else{

      if (recommendedProd.pimcore_id == undefined){
        fmcReportDioxideProblem("PIMCORE ID FIELD IS MISSING FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }else if (recommendedProd.pimcore_id == 0){
        fmcReportDioxideProblem("PIMCORE ID IS 0 FOR" + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }

      if (recommendedProd.demandware_id == undefined){
        fmcReportDioxideProblem("DEMANDWARE ID FIELD IS MISSING FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }else if (recommendedProd.demandware_id == 0){
        fmcReportDioxideProblem("DEMANDWARE ID IS 0 FOR" + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }

      if (recommendedProd.name == undefined){
        fmcReportDioxideProblem("NAME FIELD IS MISSING FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }else if (recommendedProd.name == ""){
        fmcReportDioxideProblem("NAME IS MISSING EMPTY FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }

      if (recommendedProd.tagline == undefined){
        fmcReportDioxideProblem("TAGLINE FIELD IS MISSING FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }else if (recommendedProd.tagline == ""){
        fmcReportDioxideProblem("TAGLINE IS MISSING EMPTY FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }else{
        if (recommendedProd.tagline.length > 100 && false){
          reportError({
            "title": "WARN - DIOXIDE TAGLINE QUITE LONG",
            "value": "productData:" + JSON.stringify(recommendedProd) + "\nDioxide Payload: "+dioxPayloadString,
            "targetChannel" :  "dioxide-problems",
            "color" : "warning"
          });
        }
      }

      if (recommendedProd.mediumDescription == undefined){
        fmcReportDioxideProblem("MEDIUM DESCRIPTION FIELD IS MISSING FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }else if (recommendedProd.mediumDescription == ""){
        fmcReportDioxideProblem("MEDIUM DESCRIPTION IS MISSING EMPTY FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }

      if (recommendedProd.imageUrl == undefined){
        fmcReportDioxideProblem("IMAGE URL FIELD IS MISSING FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }else if (recommendedProd.imageUrl == ""){
        fmcReportDioxideProblem("IMAGE URL IS MISSING EMPTY FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }

      if (recommendedProd.productUrl == undefined){
        fmcReportDioxideProblem("PRODUCT URL FIELD IS MISSING FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }else if (recommendedProd.productUrl == ""){
        fmcReportDioxideProblem("PRODUCT URL IS MISSING EMPTY FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }

      if (recommendedProd.price == undefined && fmc_showPrices){
        fmcReportDioxideProblem("PRICE FIELD IS MISSING FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }

      if (recommendedProd.priceCurrency == undefined && fmc_showPrices){
        fmcReportDioxideProblem("CURRENCY FIELD IS MISSING FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
        productIsGood = false;
      }

      if (type == "regimen"){

        if (recommendedProd.regimen_index == undefined){
          fmcReportDioxideProblem("REGIMEN INDEX FIELD IS MISSING FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
          productIsGood = false;
        }

        if (recommendedProd.regimen_step == undefined){
          fmcReportDioxideProblem("REGIMEN STEP FIELD IS MISSING FOR " + JSON.stringify(recommendedProd),dioxPayloadString);
          productIsGood = false;
        }

      }

    }
  }catch(err){
    console.error("Error in checking dioxide product fields" ,err);
    productIsGood = false;
  }

  return productIsGood;


}


function fmcReportDioxideProblem(message,payloadString){
  console.warn(message);
  reportDioxError({
    "title": "WARN - DIOXIDE RESPONSE ERROR",
    "value": message + "\nDioxide Payload: "+payloadString,
    "color" : "warning"
  });
}

let fmcPriceFormating= (inPrice,currency)=>{

		let formatedPrice;
		formatedPrice = Number(String(inPrice).replace(/,/g,"")).toFixed(2);

		let outputFormated = {
			price: formatedPrice,
			priceCurrency: currency
		}




		if (currency == "¥"){
			logOnLocalHostFrontEnd("price conversion yen - A: ",formatedPrice)
			formatedPrice = String(Number(formatedPrice)); // remove commas
			logOnLocalHostFrontEnd("price conversion yen - B: ",formatedPrice)
			let numDots = Math.floor(formatedPrice.length / 3)
			let curDotPos = (formatedPrice.length) % 3;
			if (curDotPos == 0){
				curDotPos = 3;
				numDots -= 1;
			}
			let outString = "";
			let dotCounter =0;
			for (let ii=0; ii < formatedPrice.length; ii++){
				outString += formatedPrice[ii];
				if (ii+1 == curDotPos && dotCounter < numDots){
					curDotPos += 3;
					outString += ",";
					dotCounter++;
				}
			}
			formatedPrice = outString;
			outputFormated.price = outString;

		}
		if (currency == "$MXN"){
			outputFormated.priceCurrency = "$";
			outputFormated.price = formatedPrice + " MXN";
		}
		//logOnLocalHostFrontEnd("in currency: ", currency  )
		//logOnLocalHostFrontEnd("formated Price: ", outputFormated)

		return outputFormated;
}

function updateGdprAndEndPoints(locObj, showGdpr=false){

	if (typeof locObj.country_code == "string"){
		if (locObj.country_code != ""){
			window.fmcUserCountry = locObj.country_code;
		}else{
			window.fmcUserCountry = "US"
		}
	}else{
				window.fmcUserCountry = "US"
	}

	if (Object.keys(fmc_skinIoCountries).indexOf(window.fmcUserCountry) > -1){
		fmc_useSkinIo = fmc_skinIoCountries[window.fmcUserCountry];
		fmcSendGA("main flow", "setting fmc_useSkinIo for "+window.fmcUserCountry )
	}


	logOnLocalHostFrontEnd("gdrpData: ", locObj);
	if (locObj.region == "EU"){
		if ("https://api.skinanalysis.me" == "https://api.skinanalysis.me" || "https://api.skinanalysis.me" == "https://imb-backend.herokuapp.com"){
			window.fmc_backendToUse = "https://imb-backend-eu.herokuapp.com";
		}
	}
	if (locObj.country_code=="CA"){
		if ("https://api.skinanalysis.me" == "https://api.skinanalysis.me" ){
			window.fmc_backendToUse = "https://imb-backend-ca.herokuapp.com";
		}
	}
	//console.log(locObj);

	fmcSendGA("main flow","backend used - " + window.fmc_backendToUse);

	if (window.fmc_backendToUse != "https://imb-backend-eu.herokuapp.com" && window.fmc_backendToUse != "https://imb-backend-ca.herokuapp.com"){
		logOnLocalHostFrontEnd("checkbox set by default")
		document.getElementById("fmc_email_submit_checkbox").checked = 1;
		document.getElementById("fmc_popup_checkbox").checked = 1;
		document.getElementById("fmc_submit_form_subscribe").value = "1";
	}

	if ((locObj.country_code=="US" || fmcForcedCountry=="US")	&& fmcShowMskBanner && "true"=="true" && document.getElementById("fmcBody").classList.contains("fmc_768")){
		document.getElementById("fmc_msk_banner").style.display = "block";
	}



	setUpZendesk();

	if ( locObj.country_code == "DE" && /skinanalysis.me($|:)/g.test(window.location.hostname) ){

	  let pathElements = window.location.pathname.split("/");
	  try{
	    if ((pathElements[1] == "" || pathElements[1] == "results" ) && fmcForcedPage == ""){

				window.fmc_showPrices = false;
	    }

	  }catch(err){
	    console.error("Error in getting skinanalysis.me path elements - ",err)
	  }
	}

	if (!window.fmc_isEmbed && locObj.region == "EU"){
		document.getElementById("fmc_manageCookiebotLink").style.display = "block";
	}

	if (showGdpr){

		if (["US", "UK", "GB", "IE", "IN", "ZA", "NZ", "CA"].indexOf(locObj.country_code) > -1){
			document.getElementById("fmc_consent_accept_button").innerHTML = "I consent"
			document.getElementById("fmc_consent_accept_button").classList.add("button_has_consent_text");
		}

		document.getElementById("fmcBackgroundDarkenOverlay").style.height = "100%";
		render_jsonTextObject(locObj.legal_copy);
		document.getElementById("fmc_start_button").style.opacity=1;
		document.getElementById("fmc_start_button").style.pointerEvents="all";
		if (fmcOpenedThroughPreappLanding != undefined){
			if (fmcOpenedThroughPreappLanding){
				fmcFirstButtonClicked();
			}
		}
	}
	window.fmc_pendingBackendUpdate = false;
}

let sendImageToBackend = (imgData, autoCapture = true)=>{

  return new Promise((resolve,reject)=>{
    showScreen(4)

    window.fmc_anImEr = false;
    window.fmc_anImTo = false;

    try{
      mediaStream.getVideoTracks()[0].stop();
    }catch(err){
      logOnLocalHostFrontEnd("error in stoping camera steam - ",err);
    }

    let referrerUrl="";

    try{
      referrerUrl = window.location.href;
      if (referrerUrl.length < 5 || referrerUrl == undefined || referrerUrl == null){
        referrerUrl = document.documentURI;
      }
    }catch(e){
      referrerUrl = document.documentURI;
    }

    if (referrerUrl== "" || referrerUrl == undefined || referrerUrl == null){
      referrerUrl = "URL_NOT_FOUND";
    }

    fmcGenerateCustomUid().then((cuidres)=>{
      fmcCustomUID = cuidres;

      let payload = {
        "imageBase64": imgData,
        "referrer": referrerUrl,
        "browser": fmcBrowser,
        "auto_capture": autoCapture,
        "os": fmcOS,
        "lang_code": fmcUsedLanguageCode,
        "custom_uid": fmcCustomUID
      }

      if (window.drpEmHash != ""){
        payload.email_hash = window.drpEmHash;
      }

      if (fmc_useSkinIo){
        payload.dark_circles_score = Math.max(1,calcDarkCircleScore);
        payload.dehydration_score = Math.max(1,calcDehydrScore);
      }

      if (window.location.hostname == "www.dermalogica.com" || window.location.hostname == "dermalogica.com"){
        let FMhash ="";
        try{
          if (window.location.search.indexOf("&FM=") > -1){
            FMhash = window.location.search.split("&FM=")[1].split("&")[0];
          }
          if (window.location.search.indexOf("?FM=") > -1){
            FMhash = window.location.search.split("?FM=")[1].split("&")[0];
          }
          logOnLocalHostFrontEnd("dermalogica.com FM hash: ", FMhash);
          if (FMhash != ""){
            payload.dermalogica_email_hash = FMhash;
          }

        }catch(err){
          console.log("error in getting FM param - ",err);
        }
      }

			clearTimeout(analyzeBootstrapTimer)

      analyzeBootstrapTimer = setTimeout(()=>{
        if (!fmcResultFinished){
          logOnLocalHostFrontEnd("handle error from bootstrap timer");
          fmcSendGA("main flow", "analyzeBootstrapTimer triggered - general error");
          handleError({});
        }
      },110000);

      let startTime = new Date().getTime();

      let xhr = new XMLHttpRequest();

      xhr.open("POST", window.fmc_backendToUse+"/fmc/analyze-v3?new_json=1&lang_code="+fmcUsedLanguageCode+"&custom_uid="+fmcCustomUID  );
      fmcSendGA("main flow","analyze image skinIo")

      xhr.setRequestHeader('Content-Type', 'application/json')

      xhr.timeout = 48000;
      xhr.onreadystatechange = function(){

        if(this.readyState == 4 && this.responseText != ""){


          let response;
          let showResults = false;

          if (typeof this.responseText == "string"){
            response = JSON.parse(this.responseText);
          }else{
            response = this.responseText;
          }

          logOnLocalHostFrontEnd("response for analyze image call: ", response);
          fmcSavedBRres.reqRes = response;

					clearTimeout(analyzeBootstrapTimer);


					if (response.concerns != undefined){
						fmcResultFinished = true;
						resolve(response);
					}else if (String(response.code) == "7001" || String(response.code) == "7000"){
						fmcResultFinished = true;
						logOnLocalHostFrontEnd("skinio server error - calling fmcTryWithCustomUID(1)");
						fmcTryWithCustomUID(1).then((customUidRes)=>{
							resolve(customUidRes)
						})
						.catch((err)=>{
							handleError({});
						})
					}else if(String(response.code) == "5002" || String(response.code) == "5003"  || String(response.code) == "1000"){
						logOnLocalHostFrontEnd("no valid face / multi faces / code 1000 - handle error");
						if (String(response.code) == "5002" && faceAIsawFace){

							faceAIsawFace = false;

							try{
								let canvas = document.getElementById("fmc_camera_canvas");
								let ctx = canvas.getContext("2d");

								let tmpImage = new Image();

								tmpImage.onload = ()=>{

									//let camDeniedCont = document.getElementById("fmc_camera_denied_container");

									fmcImSz={
										w: tmpImage.naturalWidth,
										h: tmpImage.naturalHeight
									}

									let imgHeight = tmpImage.height;
									let imgWidth = tmpImage.width;

									canvas.width = imgWidth;
									canvas.height = imgHeight;

									ctx.rotate(Math.PI);

									ctx.drawImage(tmpImage,-imgWidth,-imgHeight,imgWidth,imgHeight);

									let imgData = canvas.toDataURL("image/jpeg");

									curImgData = imgData;

									fmcSendGA("main flow","resend image 180deg rotated - sending")

									sendImageToBackend(imgData).then((payload)=>{
										fmcSendGA("main flow","resend image 180deg rotated - success")
										fmcResultFinished = true;
										resolve(payload);
									})
									.catch(()=>{
										fmcResultFinished = true;
										fmcSendGA("main flow","resend image 180deg rotated - failure")
										handleError(response);
									})
								}
								tmpImage.src = curImgData

							}catch(resendErr){
								fmcResultFinished = true;
								console.error("error in sending upside down image - ",resendErr);
								handleError(response);
							}


						}else{
							fmcResultFinished = true;
							handleError(response);
						}
					}else{
						logOnLocalHostFrontEnd("no known case - try to handle with custom UID");
						fmcTryWithCustomUID().then((customUidRes)=>{
							resolve(customUidRes)
						})
						.catch((err)=>{
							handleError({});
						})
					}




        }
      }
      xhr.onerror =(err)=>{

        let endTime = new Date().getTime();

        let parsedError;
        try{
          parsedError = JSON.stringify(err,["message", "arguments", "type", "name"])
        }catch(catcherror){
          parsedError = err
        }
        let imgDim;
        try{
          imgDim = fmcImSz.w + "x" + fmcImSz.h;
        }catch(errImDim){
          imgDim = "N/A";
        }
        reportError({
          "title": "WARN - analyzeImage call error- ",
          "value": "parsed error: " + parsedError + "\nnon parsed error: " + err + "\nrequest time(s): " + (endTime-startTime)/1000 + "\nImageDim: " + imgDim + "\nswitching to custom uuid call",
          "color" : "warning"
        });

        window.fmc_anImEr = true;
        fmcSavedBRres.errRes.parsed = parsedError;
        fmcSavedBRres.errRes.raw = err;
        fmcTryWithCustomUID();
      }
      xhr.ontimeout = ()=>{
        window.fmc_anImTo = true;
        fmcTryWithCustomUID();
      }
      xhr.send(JSON.stringify(payload));
    });

  })
}


let fmcCustomUIDTryCounter=0;
let fmcTryWithCustomUID=(maxTries = 6)=>{
	return new Promise((resolve, reject)=>{

		fmcCustomUIDTryCounter += 1;
		getUserIdResult((res)=>{
			logOnLocalHostFrontEnd("GET RESULTS FROM ID: ",res);
			try{

				let analysisComplete =  res.analysis_complete;

				if (analysisComplete){

					resolve(res);

				}else{
					if (fmcCustomUIDTryCounter >= maxTries){
						if (res.hashid != undefined){

							fmcCustomUIDTryCounter = 0;
							getEstimatedResult()
							.then((estimatedResult)=>{
								logOnLocalHostFrontEnd("estimated result: ",estimatedResult);
								res.concerns = estimatedResult.concerns;
								res.concerns.forEach((concern,index)=>{
									res.concerns[index].image = res.original_image;
								})
								res.recommendedProducts = estimatedResult.recommendedProducts;
								res.product_ids = estimatedResult.recommended_products_ids;

								resolve(res);
								/*
								window.facemap.faked=true;
								window.facemap.concerns = estimatedResult.concerns;
								window.facemap.concerns.forEach((concern,index)=>{
									window.facemap.concerns[index].image = window.facemap.original_image;
								})
								window.facemap.recommendedProducts = estimatedResult.recommendedProducts;
								window.facemap.product_ids = estimatedResult.recommended_products_ids;
								let imgDim;
								try{
									imgDim = fmcImSz.w + "x" + fmcImSz.h;
								}catch(errImDim){
									imgDim = "N/A";
								}
								let stringedInfo;
								try{
									stringedInfo = JSON.stringify(fmcSavedBRres);
								}catch(errParse){
									stringedInfo = fmcSavedBRres
								}
								reportError({
									"title": "INFO - showing faked results",
									"value": "\nanalyzeImage.onerror: " + window.fmc_anImEr + "\nanalyzeImage.timeout: " + window.fmc_anImTo + "\nlast BE resp or error: " + stringedInfo + "\nImageDim: " + imgDim,
									"color": "warning"
								});
								fmcShowResults();
								*/
							})
							.catch((errEst)=>{
								console.error("error in estimated result: ", errEst);
								try{
									parsedError = JSON.stringify(errEst)
								}catch(catcherror){
									parsedError = errEst
								}
								let stringedInfo;
								try{
									stringedInfo = JSON.stringify(fmcSavedBRres);
								}catch(errParse){
									stringedInfo = fmcSavedBRres
								}
								reportError({
									"title": "ERROR - estimated Results call- ",
									"value": "parsed error: " + parsedError + "\nnon parsed error: " + errEst + "\nanalyzeImage.onerror: " + window.fmc_anImEr + "\nanalyzeImage.timeout: " + window.fmc_anImTo + "\nlast BE resp or error: " + stringedInfo,
								});
								handleError(errEst);
							});
						}else{
							let stringedInfo;
							try{
								stringedInfo = JSON.stringify(fmcSavedBRres);
							}catch(errParse){
								stringedInfo = fmcSavedBRres
							}
							handleError({message: "custom UID not found - 404"});
						}
					}else{
						setTimeout(()=>{
							fmcTryWithCustomUID(maxTries);
						},5000);
					}
				}

			}catch(err){
				logOnLocalHostFrontEnd("error in getCustomUID: ",err);
				if (fmcCustomUIDTryCounter >= maxTries){
					if (res.facemap != undefined){

						window.facemap = res.facemap;
						fmcCustomUIDTryCounter = 0;
						getEstimatedResult()
						.then((estimatedResult)=>{
							logOnLocalHostFrontEnd("estimated result: ",estimatedResult);
							window.facemap.faked=true;
							window.facemap.concerns = estimatedResult.concerns;
							window.facemap.concerns.forEach((concern,index)=>{
								window.facemap.concerns[index].image = window.facemap.original_image;
							})
							window.facemap.recommendedProducts = estimatedResult.recommendedProducts;
							window.facemap.product_ids = estimatedResult.recommended_products_ids;
							let imgDim;
							try{
								imgDim = fmcImSz.w + "x" + fmcImSz.h;
							}catch(errImDim){
								imgDim = "N/A";
							}
							let stringedInfo;
							try{
								stringedInfo = JSON.stringify(fmcSavedBRres);
							}catch(errParse){
								stringedInfo = fmcSavedBRres
							}
							reportError({
								"title": "INFO - showing faked results",
								"value": "\nanalyzeImage.onerror: " + window.fmc_anImEr + "\nanalyzeImage.timeout: " + window.fmc_anImTo + "\nlast BE resp or error: " + stringedInfo + "\nImageDim: " + imgDim,
								"color": "warning"
							});
							fmcShowResults();
						})
						.catch((errEst)=>{
							logOnLocalHostFrontEnd("error in estimated result: ", errEst);
							try{
								parsedError = JSON.stringify(errEst)
							}catch(catcherror){
								parsedError = errEst
							}
							let stringedInfo;
							try{
								stringedInfo = JSON.stringify(fmcSavedBRres);
							}catch(errParse){
								stringedInfo = fmcSavedBRres
							}
							reportError({
								"title": "ERROR - estimated Results call- ",
								"value": "parsed error: " + parsedError + "\nnon parsed error: " + errEst + "\nanalyzeImage.onerror: " + window.fmc_anImEr + "\nanalyzeImage.timeout: " + window.fmc_anImTo + "\nlast BE resp or error: " + stringedInfo,
							});
							handleError(errEst);
						});
					}else{
						let stringedInfo;
						try{
							stringedInfo = JSON.stringify(fmcSavedBRres);
						}catch(errParse){
							stringedInfo = fmcSavedBRres
						}
						reportError({
							"title": "ERROR - custom UID not found",
							"value": "\nanalyzeImage.onerror: " + window.fmc_anImEr + "\nanalyzeImage.timeout: " + window.fmc_anImTo + "\nlast BE resp or error: " + stringedInfo,
						});
						handleError(res);
					}
				}else{
					setTimeout(()=>{
						fmcTryWithCustomUID(maxTries);
					},5000);
				}
			}
		})
	})
}

let getFaceMapResult = (hashObj)=>{

  return new Promise((resolve,reject)=>{

    let hashId = hashObj.hashId;
    let callback = hashObj.callback;

    let url;

    var xhr = new XMLHttpRequest()

    if (hashId.length < 10 ){
      url = "/fmc/get_face_map_json/"+hashId+"?lang_code="+fmcUsedLanguageCode;
      xhr.open('GET', window.fmc_backendToUse + url + '&new_json=1')
    }else{
      url = "/fmc/get-skin-io/"+hashId;
      xhr.open('GET', window.fmc_backendToUse + url)
    }


    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function(){
      if (this.readyState == 4){
        let parsedResponse;


        try{

          parsedResponse = JSON.parse(this.responseText);

					if (parsedResponse.success != undefined && !parsedResponse.success){
						reject("hash id not found")
					}else{

						resolve(parsedResponse);
					}




        }catch(e){
          logOnLocalHostFrontEnd("ERROR at parsing data: " ,e);
          parsedResponse = {status:"error",message:"could not parse response object"};
          //document.querySelector("#fmc_nav_bar a").click();
          reject(parsedResponse);
        }
        //logOnLocalHostFrontEnd("get former result: ", parsedResponse);

        //callback(parsedResponse);
      }
    }
    xhr.send();
  })

}

let getUserIdResult = (callback)=>{

	var xhr = new XMLHttpRequest()

	let url = "/fmc/get-skin-io-by-custom-uid/"+fmcCustomUID+"?new_json=1&lang_code="+fmcUsedLanguageCode;

	xhr.open('GET', window.fmc_backendToUse + url);
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.onreadystatechange = function(){
		if (this.readyState == 4){
			//console.log(this.responseText);
			if (this.status==200){

				let parsedResponse;
				try{
					parsedResponse = JSON.parse(this.responseText);

				}catch(e){
					console.log("ERROR at parsing data: " ,e);
					parsedResponse = {status:"error",message:"could not parse response object"};
				}

				/*
				if(parsedResponse.concerns != undefined){
					parsedResponse.country = parsedResponse.maxmind_country;
					parsedResponse.concerns.forEach((concern,index)=>{
						if (concern.image_circles != null){
							parsedResponse.concerns[index].image = concern.image_circles;
						}else if (concern.image_heatmap != null){
							parsedResponse.concerns[index].image = concern.image_heatmap;
						}else if (concern.image_regions != null){
							parsedResponse.concerns[index].image = concern.image_regions;
						}else{
							parsedResponse.concerns[index].image = parsedResponse.original_image;
						}
					})
					parsedResponse.facemap = parsedResponse;
				}
				*/

				callback(parsedResponse);
			}else{
				//logOnLocalHostFrontEnd("CALLBACK FAILURE")
				callback("failure");
			}
		}
	}
	xhr.send();
}

let allowEmailSubmit = true;

let submitEmailForm = (evt)=>{
	evt.preventDefault();
	if (allowEmailSubmit){
		setTimeout(()=>{
			allowEmailSubmit = true;
		},5000);
		allowEmailSubmit = false;

		if (window.facemap.high_traffic_mode){
			fmcSendGA("mainFlow","high traffic mode - email submited");
		}else{
			if (fmcRequestEmailBeforeResults){
				fmcSendGA("mainFlow","request email for results - email submited");
				fmcSendGAIndia("mainFlow","request email for results - email submited");
			}else{
				fmcSendGA("mainFlow","send results - email submited");
				fmcSendGAIndia("mainFlow","send results - email submited");
			}

		}



		let xhr = new XMLHttpRequest();
		xhr.open("POST", window.fmc_backendToUse + "/fmc/fmc-email-v3", true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = function(evt){
			allowEmailSubmit = true;
			let response = this.responseText;
			if (typeof response == "string"){
				try{
					response = JSON.parse(response);
				}catch(err){
					console.error("error in parsing email submit response - ", err)
				}
			}
			logOnLocalHostFrontEnd("submit response: ",response);
			document.getElementById("fmc_frozen_glass_share_button").style.display = "none";
			if (response.status == 200){
				document.getElementById("fmc_form_wrapper").style.display = "none";
				document.getElementById("fmc_submit_form_success").style.display = "block";
				document.getElementById("fmc_cta_form_wrapper").style.display = "none";
				document.getElementById("fmc_popup_email_success").style.display = "block";
			}else{
				document.getElementById("fmc_submit_form_error").style.display = "block";
				document.getElementById("fmc_popup_email_error").style.display = "block";
			}
		}


		if (document.getElementById("fmc_email_submit_checkbox").checked){
			document.getElementById("fmc_submit_form_subscribe").value = "1";
		}else{
			document.getElementById("fmc_submit_form_subscribe").value = "0";
		}

		let emailWaitCounter = 0;
		let dioxEmailDataInterval = setInterval(()=>{

			if (window.facemap){

				if (window.facemap.email_html){


					let payload = {
						"hashid" : window.facemap.hashid, //document.getElementById("fmc_submit_form_hashid").value,
						"subscribe" : document.getElementById("fmc_submit_form_subscribe").value,
						"email" : document.getElementById("fmc_submit_form_email").value,
						"from_email" : "skinanalysis@dermalogica.com",
						"email_subject": window.facemap.email_subject,
						"html_email_message" : window.facemap.email_html,  //.replace(/\"/g, "'"),
						"full_results_url" : window.location.href,
						"frontend_url" : "https://skinanalysis.me"
					}


					logOnLocalHostFrontEnd("EMAIL SUBMIT PAYLOAD: ", payload);
					clearInterval(dioxEmailDataInterval);

					//xhr.send(payload);
					xhr.send(JSON.stringify(payload));
				}

			}
			emailWaitCounter++;
			if (emailWaitCounter > 40){
				clearInterval(dioxEmailDataInterval);
			}
		},500);
	}


}

function fmcUpdateFmcObj(fmcObj,dioxObj){
  return new Promise((resolve,reject)=>{
    let updatedObj = {...fmcObj};    

    if (dioxObj != undefined){

      try{
        updatedObj.recommendedProducts = [...dioxObj.recommendedProducts];
      }catch(err){
        updatedObj.recommendedProducts = [];
      }

      try{
        updatedObj.email_html = dioxObj.email_html;
      }catch(err){}

      try{
        updatedObj.email_subject = dioxObj.email_subject;
      }catch(err){}

      try{
        updatedObj.germany_samples = dioxObj.germany_samples;
      }catch(err){}

      try{
        updatedObj.links = {...dioxObj.links};
      }catch(err){
        console.error("error in getting link object from dioxide - ",err)
      }
      try {
        updatedObj.include_regimen_products = dioxObj.include_regimen_products;        
      } catch(err) {
        updatedObj.include_regimen_products = true;
      }

      console.log("UPDATED OBJECT:", updatedObj);
    }


    let concernList = [];

    updatedObj.concerns.forEach((fmcObjConcern,fmcObjIndex)=>{


      if (dioxObj != undefined){

        dioxObj.concerns.forEach((dioxConcern,dioxIndex)=>{
          if (fmcObjConcern.name == dioxConcern.name){
            updatedObj.concerns[fmcObjIndex].recommended_product = {...dioxConcern.recommended_product};
            concernList.push(dioxConcern.name)
          }
        })
      }else{
        if (fmcObjConcern.recommended_product && Object.keys(fmcObjConcern.recommended_product).length > 0){
          concernList.push(fmcObjConcern.name)
        }
      }

      if (fmcObjConcern.image_circles != null){
        updatedObj.concerns[fmcObjIndex].image = fmcObjConcern.image_circles;
      }else if (fmcObjConcern.image_heatmap != null){
        updatedObj.concerns[fmcObjIndex].image = fmcObjConcern.image_heatmap;
      }else if (fmcObjConcern.image_regions != null){
        updatedObj.concerns[fmcObjIndex].image = fmcObjConcern.image_regions;
      }else{
        updatedObj.concerns[fmcObjIndex].image = fmcObj.original_image;
      }
      if (fmcObjConcern.name == "redness"){
        updatedObj.concerns[fmcObjIndex].image = fmcObj.original_image;
      }
    })

    updatedObj.concerns = updatedObj.concerns.filter(concern => concernList.indexOf(concern.name) > -1);


    let sortedConcerns = [];

    for(ii=5; ii>0; ii--){
      updatedObj.concerns.forEach((concern,index)=>{
        if (concern.score == ii){
          sortedConcerns.push(concern);
        }
      })
    }

    while (sortedConcerns.length > fmcMaxConcerns){
      sortedConcerns.pop();
    }

    updatedObj.sortedConcerns = sortedConcerns;

    let sixStepArray = []

    let curStep = 1

    while (curStep <= updatedObj.recommendedProducts.length){
      let productInSteps = false;
      updatedObj.recommendedProducts.forEach((product)=>{
        if (curStep == product.regimen_index){
          sixStepArray.push(product);
          productInSteps = true;
        }
      })
      if (!productInSteps){
        sixStepArray.push([]);
      }
      curStep++;
    }
    //updatedObj.recommendedProducts = [...sixStepArray]

    if (dioxObj != undefined){
      updatedObj.links = {...dioxObj.links};
    }

    resolve(updatedObj)
  })

}


let dmlIdPrefix= "fmcCarousel_";

let dmlCarouselConstructs = {
  mobileResults : {
    dataArray: [], // for this carousel create objects as: { score: SCORE, name: "concern" imageUrl: "", text: "text" }
    createDataArray : (carouselKey)=>{
      return new Promise((resolve,reject)=>{
        try{
          let tmpArray = [];
          window.facemap.sortedConcerns.forEach((concern)=>{
            let tmpObj = {};
            tmpObj.elementId = dmlIdPrefix + carouselKey + "_" + concern.name;
            tmpObj.score = concern.score;
            tmpObj.name = concern.name;
            tmpObj.image = concern.image;
            tmpObj.text = fmcConcernCopy[concern.name].text;
            tmpArray.push(tmpObj);
          })

          // array will need at least 3 entries to work properly, thus single and double arrays will be multiplied;
          if(tmpArray.length < 1){
            reject("no data found");
          }else if (tmpArray.length == 1){
            tmpArray = tmpArray.concat(tmpArray).concat(tmpArray);
          }else if (tmpArray.length == 2){
            tmpArray = tmpArray.concat(tmpArray);
          }

          // array will be duplicated for periodic boundary conditions
          tmpArray = tmpArray.concat(tmpArray);

          dmlCarouselConstructs[carouselKey].dataArray = tmpArray;
          resolve();

        }catch(err){
          reject(err);
        }
      })
    },
    htmlTemplate: "",
    finishCard: (card, cardData)=>{
      try{

        let cardWidth = card.offsetWidth;
        let concernLabel = card.querySelector(".fmc_mobile_results_label");
        concernLabel.innerHTML = fmcConcernCopy[cardData.name].title;
        if (cardData.score < 2){
          concernLabel.style.backgroundColor  = "#6ea95f";
        }else if (cardData.score < 4){
          concernLabel.style.backgroundColor  = "#f7b532";
        }else{
          concernLabel.style.backgroundColor  = "#e21f26";
        }

        card.querySelectorAll(".fmc_indicator_word_critical").forEach((wordElement)=>{
          wordElement.innerHTML = fmcSeverityWords.critical;
        })
        card.querySelectorAll(".fmc_indicator_word_moderate").forEach((wordElement)=>{
          wordElement.innerHTML = fmcSeverityWords.moderate;
          wordElement.style.right = (Math.round(0.95*cardWidth) - wordElement.offsetWidth) * 0.5 + "px";
        })
        card.querySelectorAll(".fmc_indicator_word_healthy").forEach((wordElement)=>{
          if (fmcSeverityWords.healthy != undefined){

            wordElement.innerHTML = fmcSeverityWords.healthy;
            wordElement.style.right = (Math.round(0.95*cardWidth) - wordElement.offsetWidth) -16 + "px";
          }else{
            wordElement.innerHTML = "";
          }
        })

        setTimeout(()=>{
          let scaleFact =  1;
          card.querySelectorAll(".fmc_mobile_indicator_word").forEach((wordElement)=>{
            scaleFact = Math.min(scaleFact,(wordElement.parentElement.parentElement.offsetWidth * 0.3 ) / wordElement.offsetWidth);
          })
          card.querySelectorAll(".fmc_mobile_indicator_word").forEach((wordElement)=>{
            if (scaleFact < 1){
              wordElement.style.transform = "scale("+scaleFact+")";
              wordElement.style.opacity = 1;
            }else{
              wordElement.style.opacity = 1;
            }
          })
        },50)

        let imageDiv = card.querySelector(".fmc_mobile_results_image");
        imageDiv.style.backgroundImage = 'url("'+cardData.image+'")';
        imageDiv.style.height= Math.round(cardWidth) + "px";


        let cardIndicator = card.querySelector(".fmc_mobile_results_indicator");
        cardIndicator.style.top = Math.round(cardWidth*1.05) + "px";
        cardIndicator.style.left = Math.round(0.025*cardWidth) + "px";
        cardIndicator.style.width = Math.round(0.95*cardWidth) + "px";

        let barPosition = Math.round(0.95*cardWidth * 0.01 * ( 15 * cardData.score + 15 ));

        cardIndicator.querySelector(".fmc_mobile_results_indicator_background").style.width = Math.round(0.95*cardWidth - barPosition) + "px";

        let cardText = card.querySelector(".fmc_carousel_mobile_results_text");
        cardText.innerHTML = cardData.text.replace(/<\/ b/g,"</b") + ' <br><a class="fmc-concern-less-button">'+fmcMoreLessButtonsText.less+'</a>';
        cardText.parentElement.style.top = Math.round(cardWidth*1.05) + 1.3 * cardIndicator.offsetHeight + "px";
        cardText.parentElement.style.left = Math.round(0.025*cardWidth) + "px";
        cardText.parentElement.style.width = Math.round(0.95*cardWidth) + "px";
        cardText.querySelector(".fmc-concern-less-button").onclick = (evt)=>{
          let carouselWrapper = evt.target.parentNode.parentNode.parentNode.parentNode;
          let cards = carouselWrapper.querySelectorAll(".dml_carousel_card");
          cards.forEach((card)=>{
            let textWrapper = card.querySelector('.fmc_carousel_mobile_results_text_wrapper')
            textWrapper.classList.remove("fmc_carousel_mobile_results_text_expanded");
            textWrapper.classList.add("fmc_carousel_mobile_results_text_collapsed");
          })
          dmlCarousel.resizeCarousel(dmlIdPrefix + "mobileResults")
        }
        cardText.parentElement.querySelector(".fmc-concern-more-button").innerHTML = fmcMoreLessButtonsText.more;
        cardText.parentElement.querySelector(".fmc-concern-more-button").onclick = (evt)=>{
          let carouselWrapper = evt.target.parentNode.parentNode.parentNode;
          let cards = carouselWrapper.querySelectorAll(".dml_carousel_card");
          cards.forEach((card)=>{
            let textWrapper = card.querySelector('.fmc_carousel_mobile_results_text_wrapper')
            textWrapper.classList.remove("fmc_carousel_mobile_results_text_collapsed");
      		  textWrapper.classList.add("fmc_carousel_mobile_results_text_expanded");
          });
          dmlCarousel.resizeCarousel(dmlIdPrefix + "mobileResults")
        }
      }catch(err){
        console.log("error in finishing card: ", err);
      }
    }
  }

}

dmlCarouselConstructs.mobileResults.htmlTemplate +=  '<div class="fmc_mobile_results_image"></div>' +
  '<div class="fmc_mobile_results_label"></div>' +
  '<div class="fmc_mobile_results_indicator">'+
    '<div class="fmc_mobile_results_indicator_bar">'+
      '<span class="fmc_mobile_indicator_word fmc_indicator_word_healthy"></span>'+
      '<span class="fmc_mobile_indicator_word fmc_indicator_word_moderate"></span>'+
      '<span class="fmc_mobile_indicator_word fmc_indicator_word_critical"></span>'+
    '</div>' +
    '<div class="fmc_mobile_results_indicator_background">'+
      '<span class="fmc_mobile_indicator_word fmc_indicator_word_healthy"></span>'+
      '<span class="fmc_mobile_indicator_word fmc_indicator_word_moderate"></span>'+
      '<span class="fmc_mobile_indicator_word fmc_indicator_word_critical"></span>'+
      '</div>' +
    '<div class="fmc_mobile_indicator_border_line"></div>'+
  '</div>' +
  '<div class="fmc_carousel_mobile_results_text_wrapper fmc_carousel_mobile_results_text_collapsed">' +
    '<p class="fmc_carousel_mobile_results_text"></p>'+
    '<a class="fmc-concern-more-button">' + fmcMoreLessButtonsText.more + '</a>'+
  '</div>';


var dmlCarousel = {
  dragPos : 0,
  allowDrag: true,
  updateCarousels: ()=>{
    return new Promise((resolve,reject)=>{

      Object.keys(dmlCarouselConstructs).forEach((carouselKey)=>{
        carouselObj = dmlCarouselConstructs[carouselKey];
        carouselId = dmlIdPrefix + carouselKey;
        //console.log(carouselObj,carouselId);

        carouselObj.createDataArray(carouselKey)
        .then((res)=> {
          try{
            let carouselWrapper = document.getElementById(carouselId);
            carouselWrapper.innerHTML = "";

            let carouselWidth = carouselWrapper.offsetWidth;
            let cardWidth = Math.round(carouselWidth * 0.8);
            let cardLeftOffset = Math.round(carouselWidth * 0.1);
            let cardGap = Math.round(carouselWidth * 0.05);


            carouselObj.dataArray.forEach((cardData,index)=>{
              let card = document.createElement("div");
              card.setAttribute("id", cardData.elementId);
              card.classList.add(carouselId+"_card");
              card.classList.add("dml_carousel_card");
              card.style.width = cardWidth + "px";
              if (index < carouselObj.dataArray.length/2 ){
                card.style.left = cardLeftOffset + index * (cardWidth + cardGap) + "px";
              }else{
                card.style.left = cardLeftOffset + (index - carouselObj.dataArray.length) * (cardWidth + cardGap) + "px";
              }
              card.innerHTML = carouselObj.htmlTemplate;
              carouselWrapper.appendChild(card);
              carouselObj.finishCard(card,cardData);
            })
            let cardMaxHeight = 0;
            let cards = carouselWrapper.querySelectorAll(".dml_carousel_card");
            cards.forEach((cardElement,index)=>{

              cardElement.setAttribute("data-carousel-id",carouselId)

              cardElement.childNodes.forEach((nodeElement)=>{
                cardMaxHeight = Math.max(cardMaxHeight,nodeElement.offsetHeight  + nodeElement.offsetTop);

                cardElement.style.height = nodeElement.offsetHeight  + nodeElement.offsetTop + 20 +  "px";
                cardElement.setAttribute("draggable","true");

                cardElement.ondragstart = dmlCarousel.startDrag;
                cardElement.ontouchstart = dmlCarousel.startDrag;

              })
            })

            carouselWrapper.style.height = cardMaxHeight + 20 + "px";
            cards.forEach((cardElement,index)=>{
              cardElement.style.height = cardMaxHeight + 10 + "px";
            });


            resolve("done");
          }catch(err){
            console.log("cound not find carousel: "+carouselId, err);
            reject("error ",err);
          }
        })
        .catch((err)=>{
          console.log("error in creating array: ", err);
          reject("error ",err);
        })

      })
    })
  },
  updateCarouselWithKey: (carouselKey)=>{

    if (carouselKey){
      if (Object.keys(dmlCarouselConstructs).indexOf(carousekKey) > -1){

        carouselObj = dmlCarouselConstructs[carouselKey];
        carouselId = dmlIdPrefix + carouselKey;

        carouselObj.createDataArray(carouselKey)
        .then((res)=> {
          //console.log("array created - ",res);
          //console.log("data Array - ",carouselObj);
        })
        .catch((err)=>{
          console.log("error in creating array: ", err);
        })
      }else{
          console.log("updateCarouselWithKey - carousel key not found: ",carouselKey);
      }
    }else{
      console.log("updateCarouselWithKey - no carousel key provided");
    }


  },
  startDrag: (evt) => {
    //console.log("start Drag event: ", evt.target.getAttribute("data-carousel-id"))

    if (!evt.target.classList.contains("dml_carousel_card")){
      return;
    }
    if (evt.type == "touchstart"){
      dmlCarousel.dragPos = evt.changedTouches[0].pageX;
    }else{
      dmlCarousel.dragPos=evt.offsetX;
    }
    evt.target.addEventListener("drag",dmlCarousel.drag)
  	evt.target.addEventListener("touchmove",dmlCarousel.drag)
  },
  drag: (evt) => {
   //logOnLocalHostFrontEnd("drag event: ", evt.target.getAttribute("data-carousel-id"))
    let deltaX;
  	if (evt.type == "touchmove"){
  		deltaX = evt.changedTouches[0].pageX-dmlCarousel.dragPos;
  	}else{
  		deltaX = evt.offsetX-dmlCarousel.dragPos;
  	}

   //logOnLocalHostFrontEnd("deltaX: ", deltaX);
  	if (evt.screenX != 0){
  		if (deltaX > 30){
  			evt.target.removeEventListener("drag",dmlCarousel.drag);
        evt.target.removeEventListener("touchmove",dmlCarousel.drag);
  			dmlCarousel.nextCard(evt.target.getAttribute("data-carousel-id"));
  		}
  		if (deltaX < -30){
  			evt.target.removeEventListener("drag",dmlCarousel.drag);
        evt.target.removeEventListener("touchmove",dmlCarousel.drag);
  			dmlCarousel.prevCard(evt.target.getAttribute("data-carousel-id"));
  		}

  	}
  },
  nextCard(carouselId){
    if (dmlCarousel.allowDrag){
      dmlCarousel.allowDrag = false;
      let carousel = document.getElementById(carouselId);
      let carouselWidth = carousel.offsetWidth;
      let cardWidth = Math.round(carouselWidth * 0.8);
      let cardGap = Math.round(carouselWidth * 0.05);

      let cards = carousel.querySelectorAll(".dml_carousel_card");

      let borderRight = ((cards.length / 2) - 1) * (cardWidth + cardGap);

      cards.forEach((card)=>{
        if (card.offsetLeft > borderRight){
          card.style.transition = "all 0s";
          setTimeout(()=>{
            card.style.left = card.offsetLeft - (cards.length-1)*(cardWidth + cardGap) + "px";
            setTimeout(()=>{
              card.style.transition = "all 0.5s";
            },10)
          },10)
        }else{
          card.style.left = card.offsetLeft + cardWidth + cardGap + "px";
        }
      });
      setTimeout(()=>{
        dmlCarousel.allowDrag = true;
      },500)
    }
  },
  prevCard(carouselId){
    try{
      if (dmlCarousel.allowDrag){
        dmlCarousel.allowDrag = false;

        let carousel = document.getElementById(carouselId);
        let carouselWidth = carousel.offsetWidth;
        let cardWidth = Math.round(carouselWidth * 0.8);
        let cardGap = Math.round(carouselWidth * 0.05);

        let cards = carousel.querySelectorAll(".dml_carousel_card");

        let borderLeft = ((cards.length / 2) - 1) * ( - cardWidth  - cardGap);

        cards.forEach((card)=>{
          if (card.offsetLeft < borderLeft){
            card.style.transition = "all 0s";
            setTimeout(()=>{
              card.style.left = card.offsetLeft + (cards.length-1)*(cardWidth + cardGap) + "px";
              setTimeout(()=>{
                card.style.transition = "all 0.5s";
              },10)
            },10)
          }else{
            card.style.left = card.offsetLeft - cardWidth - cardGap + "px";
          }
        });
        setTimeout(()=>{
          dmlCarousel.allowDrag = true;
        },500)
      }

    }catch(err){
      console.log("error in prev Card call - ",err)
    }
  },
  resizeCarousel(carouselKey){
    //console.log(carouselKey);
    let carouselWrapper = document.getElementById("fmcCarousel_mobileResults");

    let cardMaxHeight = 0;
    let cards = carouselWrapper.querySelectorAll(".dml_carousel_card");
    cards.forEach((cardElement,index)=>{

      cardElement.childNodes.forEach((nodeElement)=>{
        cardMaxHeight = Math.max(cardMaxHeight,nodeElement.offsetHeight  + nodeElement.offsetTop);
        //cardElement.style.height = nodeElement.offsetHeight  + nodeElement.offsetTop + 20 +  "px";
      })
    })

    carouselWrapper.style.height = cardMaxHeight + 20 + "px";
    cards.forEach((cardElement,index)=>{
      cardElement.style.height = cardMaxHeight + 10 + "px";
    });


  }
}

function updateStoreLocations(){
  return new Promise((resolve, reject)=>{

    if (window.fmc_showStoreLocations){
      document.getElementById("fmc_therapist_section").style.display = "none";

      getStoreLocations((storesObj)=>{
        if(typeof storesObj == "object"){
          //window.fmcStores = JSON.parse(JSON.stringify(storesObj));
          logOnLocalHostFrontEnd("Stores Object: ",storesObj);
          let storeNumber;
          try{
            storeNumber = storesObj[storesObj.length -1 ].TotalCount;
          }catch(err){
            storeNumber = "0"
          }

          if (storeNumber == ""){
            storeNumber = String(storesObj.length-1);
				  }

          if ( storeNumber != "0"){
            storesObj.pop();
            while(storesObj.length > 3){
              storesObj.pop();
            }
            let skinCenterContainer = document.getElementById("fmc_skin_center_container");

            document.getElementById("fmc_therapist_section").style.display = "block";
            if (document.getElementById("fmcBody").offsetWidth > 768){

              storesObj.forEach((store,index)=>{
                let newCard = document.createElement("div");
                newCard.classList.add("fmc-skin-center-card");
                let htmlString = '<div class="fmc-skin-center-image"></div>';
                htmlString += '<div class="fmc-skin-center-name">'+store.LocationName+'</div>';
                htmlString += '<div class="fmc-skin-center-distance">'+Number(store.Distance.trim())+'mi</div>';
                htmlString += '<div class="fmc-skin-center-address-street">'+store.AddressLine.trim()+'</div>';
                htmlString += '<div class="fmc-skin-center-address-zip-city">'+store.PrimaryCity.trim()+', '+store.SubDivision.trim()+' '+store.PostalCode.trim()+'</div>';
                htmlString += '<div class="fmc-skin-center-phone">'+store.Phone.trim().replace(")",") ").replace("  "," ")+'</div>';
                htmlString += '<hr class="fmc-skin-center-separator">';
                htmlString += '<a href="tel:'+store.Phone.trim().replace(")","").replace("(","").replace(" ","-")+'" class="fmc-skin-center-call-button" onclick="return fmcGaEventOnLink(`store call button clicked`)"><div><p>'+fmcStoreLocations.call_button+'</p></div></a>';
                let googleDirLink = 'https://www.google.com/maps?daddr='+store.AddressLine.trim().replace(" ","+")+'+'+store.PostalCode.trim()+'+'+store.PrimaryCity.trim().replace(" ","+");
                htmlString += '<a href="'+googleDirLink+'" target="_blank" class="fmc-skin-center-directions-button" onclick="return fmcGaEventOnLink(`store directions button clicked`)"><div><p>'+fmcStoreLocations.directions_button+'</p></div></a>';


                newCard.innerHTML = htmlString;
                skinCenterContainer.appendChild(newCard);
              })
              fmcStoreLocationsDone = true;
            }else{
              let secWidth = skinCenterContainer.offsetWidth;
              let prodWidth = 0.8 * secWidth;
              let gapWidth = 0.05*secWidth;
              let startValue = 0.1*secWidth;

              storesObj.forEach((store,index)=>{
                let newCard = document.createElement("div");
                newCard.classList.add("fmc-skin-center-card");
                newCard.classList.add("fmc-skin-center-card-mobile");
                newCard.style.width = prodWidth  + "px";
                newCard.style.left = startValue + (prodWidth + gapWidth)*index + "px";
                newCard.style.transition = "left 0.5s ease-in-out";
                let htmlString = '<div class="fmc-skin-center-image"></div>';
                htmlString += '<div class="fmc-skin-center-name">'+store.LocationName+'</div>';
                htmlString += '<div class="fmc-skin-center-distance">'+Number(store.Distance.trim())+'mi</div>';
                htmlString += '<div class="fmc-skin-center-address-street">'+store.AddressLine.trim()+'</div>';
                htmlString += '<div class="fmc-skin-center-address-zip-city">'+store.PrimaryCity.trim()+', '+store.SubDivision.trim()+' '+store.PostalCode.trim()+'</div>';
                htmlString += '<div class="fmc-skin-center-phone">'+store.Phone.trim().replace(")",") ").replace("  "," ")+'</div>';
                htmlString += '<hr class="fmc-skin-center-separator">';
                htmlString += '<a href="tel:'+store.Phone.trim().replace(")","").replace("(","").replace(" ","-")+'" class="fmc-skin-center-call-button"><div><p>call</p></div></a>';
                let googleDirLink = 'https://www.google.com/maps?daddr='+store.AddressLine.trim().replace(" ","+")+'+'+store.PostalCode.trim()+'+'+store.PrimaryCity.trim().replace(" ","+");
                htmlString += '<a href="'+googleDirLink+'" target="_blank" class="fmc-skin-center-directions-button"><div><p>directions</p></div></a>';

                newCard.innerHTML = htmlString;
                skinCenterContainer.appendChild(newCard);
              })

              let newSlideElement = document.createElement("div");
              newSlideElement.setAttribute("id","fmc_stores_slider_slide_element");
              newSlideElement.setAttribute("draggable","true");
              newSlideElement.setAttribute("ondragstart","dragStoresStartEvent(event)");
              newSlideElement.setAttribute("ontouchstart","dragStoresStartEvent(event)");

              let fullSecWidth = document.getElementById("fmc_therapist_section").offsetWidth;
              let sliderWidth = document.getElementById("fmc_skin_center_container").offsetWidth;
              newSlideElement.style.width = fullSecWidth + "px";
              newSlideElement.style.left = 0.5*(sliderWidth - fullSecWidth) + "px";
              skinCenterContainer.appendChild(newSlideElement);
              fmcStoreLocationsDone = true;
              resolve("store locations update is done");
            }

          }else{
            document.getElementById("fmc_therapist_section").style.display = "none";
            fmcStoreLocationsDone = true;
            resolve("store locations update is done");
          }
        }else{
          fmcStoreLocationsDone = true;
          resolve("store locations update is done");
        }
      })

    }else{
      document.getElementById("fmc_therapist_section").style.display = "none";
      fmcStoreLocationsDone = true;
      resolve("store locations update is done");
    }
  })
}

let getStoreLocations = (callback)=>{

	let navigatorOptions = {
		enableHighAccuracy: true,
		timeout: 60000,
		maximumAge: 10*60*1000  // 10 mins ... 10 * 60s * 1000ms
	}

	navigator.geolocation.getCurrentPosition(
	(position)=>{

		let fmc_lat = position.coords.latitude;
		let fmc_lng = position.coords.longitude;

		if ("https://skinanalysis.me"=="http://localhost:5000" || "https://skinanalysis.me"=="http://192.168.0.201:5000" || /\.ngrok\.io/g.test("https://skinanalysis.me")){
			logOnLocalHostFrontEnd("geolocation coords - before dev change: ",{lat:fmc_lat,lng:fmc_lng})
			fmc_lat = 33.8559007;
			fmc_lng = -118.2589146;
		}



		logOnLocalHostFrontEnd("geolocation coords: ",{lat:fmc_lat,lng:fmc_lng})
		let xhr = new XMLHttpRequest();
		xhr.open("GET", "https://skinanalysis.me/getStoreLocations?lat="+ fmc_lat + "&lng="+ fmc_lng + fmcStoreLocatorExtraParameters );
		xhr.onload = function(evt){
			let response = this.responseText;
			if (typeof response == "string"){
				response = JSON.parse(response);
			}
      //logOnLocalHostFrontEnd("store locator answer: ",this.responseText);
			if (fmcStoreLocatorRegexFilter != ""){
				if (typeof response == "object"){
					let storesToDisplay = [];
					response.forEach((store)=>{
						if (fmcStoreLocatorRegexFilter.test(store.LocationName)){
							storesToDisplay.push(store);
						}
					});
          storesToDisplay.push({"TotalCount" : String(storesToDisplay.length)});
					callback(storesToDisplay)
				}
			}else{
				callback(response);
			}
		}
		xhr.send();
	},
	(err)=>{
		console.log(err);
		callback(JSON.stringify(err));
	},navigatorOptions);


}




let allowStoreMovement = true;

let nextStore = ()=>{
	if (allowStoreMovement){

		allowStoreMovement = false;

		let storeList = document.querySelectorAll("#fmc_skin_center_container .fmc-skin-center-card");

		let secWidth = document.getElementById("fmc_skin_center_container").offsetWidth;
		let prodWidth = 0.8 * secWidth;
		let gapWidth = 0.05*secWidth;
		let startValue = 0.1*secWidth;

		if (storeList[0].offsetLeft > - gapWidth - prodWidth){
				storeList.forEach( (storeElement, index) => {
					storeElement.style.left = storeElement.offsetLeft - prodWidth - gapWidth + "px";
				})
				setTimeout(()=>{
					allowStoreMovement = true;
				},500)
		}else{
			allowStoreMovement = true;
		}

	}
}

let prevStore = ()=>{
	if (allowStoreMovement){
		allowStoreMovement = false;

		let storeList = document.querySelectorAll("#fmc_skin_center_container .fmc-skin-center-card");

		let secWidth = document.getElementById("fmc_skin_center_container").offsetWidth;
		let prodWidth = 0.8 * secWidth;
		let gapWidth = 0.05*secWidth;
		let startValue = 0.1*secWidth;

		if (storeList[2].offsetLeft < 2*(gapWidth + prodWidth) ){
				storeList.forEach( (storeElement, index) => {
					storeElement.style.left = storeElement.offsetLeft + prodWidth + gapWidth + "px";
				})
				setTimeout(()=>{
					allowStoreMovement = true;
				},500)
		}else{
			allowStoreMovement = true;
		}

	}
}

let showResultsAlreadyCalled = false;

let fmcShowResults = ()=>{
	if (!showResultsAlreadyCalled){

		endProgressBar();
		setTimeout(()=>{
			fmcCheckForEmailRequirement()
			.then(()=>{
				showResultsAlreadyCalled = true;
				fmcSendGA("mainFlow","analyze image - success");

				let concernString="";

				if (!window.facemap.faked){

					let concernObj = window.facemap.concerns
					concernObj.forEach((concern,index)=>{
						let GAscore;
						if (concern.name != "original"){
							GAscore = Number(concern.score) >= 3 ? 1 : 0;
						}

						if (concern.name == "wrinkles"){
							concernString+= "&wrs="+GAscore;
						}
						if (concern.name == "acne"){
							concernString+= "&acs="+GAscore;
						}
						if (concern.name == "redness"){
							concernString+= "&rds="+GAscore;
						}
						if (concern.name == "uneven_skintone"){
							concernString+= "&uss="+GAscore;
						}
						if (concern.name == "dark_circles"){
							concernString+= "&dcs="+GAscore;
						}
						if (concern.name == "dehydration"){
							concernString+= "&dhs="+GAscore;
						}
						if (concern.name == "oiliness"){
							concernString+= "&ois="+GAscore;
						}

					});

					if (fmc_useSkinIo){
						fmcSendGA("main flow","showing skinIo results - real")
					}else{
						fmcSendGA("main flow","showing BTBP results - real")
					}
				}else{
					if (fmc_useSkinIo){
						fmcSendGA("main flow","showing skinIo results - faked")
					}else{
						fmcSendGA("main flow","showing BTBP results - faked")
					}
				}

				if (window.fmc_backendToUse == "https://imb-backend-eu.herokuapp.com"){
					concernString+="&be=eu"
				}else if(window.fmc_backendToUse == "https://imb-backend-ca.herokuapp.com"){
					concernString+="&be=ca"
				}else if(window.fmc_backendToUse == "https://imb-staging.herokuapp.com"){
					concernString+="&be=stg"
				}else{
					concernString+="&be=us"
				}

				concernString = "fmc_hid="+window.facemap.hashid + concernString;

				if (!window.fmc_isEmbed && window.location.pathname.indexOf("/results/") == -1){
					let curHref = window.location.href;
					let newPathString;
					if (window.location.search == ""){
						newPathString = window.location.origin + (window.location.pathname + "/results/").replace("//","/") + window.facemap.hashid + "/"  + "?" + concernString;
					}else{
						newPathString = window.location.origin + (window.location.pathname + "/results/").replace("//","/") + window.facemap.hashid + "/"  + window.location.search + "&" + concernString;
					}

					history.pushState({}, "page 2", newPathString);
				}else{
					let curHref = window.location.href;
					if (curHref.indexOf("?")>-1){
						history.pushState({}, "page 2", window.location.href+"&"+concernString);
					}else{
						history.pushState({}, "page 2", window.location.href+"?"+concernString);
					}
				}

				logOnLocalHostFrontEnd("path to send to GA:", window.location.pathname + window.location.search);

				fmcSendPageViewGA(window.location.pathname  + window.location.search);


				document.getElementById("fmcResultImageContainer").style.backgroundImage = 'url("'+window.facemap.concerns[window.facemap.concerns.length-1].image+'")';
				document.getElementById("fmc_frozen_glass_image_part_results").style.backgroundImage = 'url("'+window.facemap.concerns[window.facemap.concerns.length-1].image+'")';
			});
		},1500);

	}
}


function fmcBuildResultsPage(facemapObj){
	return new Promise((resolve,reject)=>{		
		


		document.getElementById("fmc_submit_form_hashid").value = facemapObj.hashid;

		// Put user image as background in results image container

		document.getElementById("fmcResultImageContainer").style.backgroundImage = 'url("'+facemapObj.original_image+'")';
		document.getElementById("fmc_frozen_glass_image_part_results").style.backgroundImage = 'url("'+facemapObj.original_image+'")';
		document.getElementById("fmcBody").style.height = "auto";
		document.getElementById("dml_fmc_wrapper").style.height = "auto";
		document.getElementById("dml_fmc_wrapper").style.maxHeight = "none";
		document.getElementById("fmcBody").style.paddingBottom = "50px";
		if(fmcOS.indexOf("iOS")> -1){
			document.getElementById("fmc_frozen_glass_share_button").classList.add("fmc-is-ios")
		}
		fmc_results_available = true;


		if (!window.fmc_showNavbar){
			document.getElementById("fmc_nav_bar").style.display = "none";
		}

		if (!facemapObj.include_regimen_products) {
			document.getElementById("fmc_product_carousel_container").style.display = "none";
		}		

		updateStoreLocations();

		fmcUpdateNavbar(facemapObj.links);


		// update email input and send fields according to "send" text length
		let emailContWidth=document.getElementById("fmc_email_input_send_container").offsetWidth;
		let emailButtonWidth= document.getElementById("fmc_email_submit_button").offsetWidth;
		document.getElementById("fmc_submit_form_email").style.width = (emailContWidth - emailButtonWidth - 5) + "px";
		document.getElementById("fmc_email_submit_button").style.width = emailButtonWidth + "px";

		updateResults()
		.then((updateResultsRes)=>{
			logOnLocalHostFrontEnd("UPDATE RESULTS RESPONSE: ", updateResultsRes);
			fmcCustomizations.afterBuildResultsPageCall();
			resolve("done building results page");
		})
		.catch((updateResultsErr)=>{
			console.error("Error at update results - ",updateResultsErr);
			resolve("done building results page");
		})

	})

}

function fmcUpdateNavbar(linkObj){
	logOnLocalHostFrontEnd("UPDATE LINKS: ", linkObj)

	let hideHamburgerMenu = true;

	try{
		let logoLink;
		if (window.location.href.indexOf("/results/")){
			logoLink = window.location.href.split("/results/")[0]
		}else{
			logoLink = window.location.href.split("fmc_hid")[0]
			logoLink = logoLink.substr(0,logoLink.length-1)
		}

		document.querySelector("#fmc_nav_bar a").setAttribute("href",logoLink)
	}catch(e){
		console.warn("no derm logo link given",e)
	}
	try{
		let meetDermHeader = document.getElementById("fmc_nav_menu_meet_derm");
		if (linkObj.header_url_1 != undefined && linkObj.header_text_1){
			meetDermHeader.setAttribute("href",linkObj.header_url_1);
			meetDermHeader.innerHTML = linkObj.header_text_1;
			hideHamburgerMenu = false;
		}else{
			meetDermHeader.style.display = "none";
		}
	}catch(e){
		console.warn("no meet dermalogica link/text given",e)
	}
	try{
		let whereToBuyHeader = document.getElementById("fmc_nav_menu_where_buy");
		if (linkObj.header_url_2 != undefined && linkObj.header_text_2){
			whereToBuyHeader.setAttribute("href",linkObj.header_url_2);
			whereToBuyHeader.innerHTML = linkObj.header_text_2;
			hideHamburgerMenu = false;
		}else{
			whereToBuyHeader.style.display = "none";
		}
	}catch(e){
		console.warn("no whereto buy link/text given",e)
	}
	try{
		let contactUsHeader = document.getElementById("fmc_nav_menu_contact_us");
		if (linkObj.header_url_3 != undefined && linkObj.header_text_3){
			contactUsHeader.setAttribute("href",linkObj.header_url_3);
			contactUsHeader.innerHTML = linkObj.header_text_3;
			hideHamburgerMenu = false;
		}else{
			contactUsHeader.style.display = "none";
		}
	}catch(e){
		console.warn("no contact us link/text given",e)
	}
	if (hideHamburgerMenu){
		document.getElementById("fmc_hamburger_menu").style.display = "none";
	}
}


function fmcUpdateMaskOverlays(){
	if (fmcDehydrImgUrl == "" || fmcRednessImgUrl == ""  || fmcDarkCircImgUrl == ""){

		let origImage = new Image();
		origImage.crossOrigin = "anonymous";

		origImage.onload = ()=>{
			let canvas = document.getElementById("fmc_dehydration_canvas");
			let ctx = canvas.getContext("2d");
			let red_canvas = document.getElementById("fmc_redness_canvas");
			let red_ctx = red_canvas.getContext("2d");
			let dark_cir_canvas = document.getElementById("fmc_dark_circles_canvas");
			let dark_cir_ctx = dark_cir_canvas.getContext("2d");
			canvas.width = origImage.naturalWidth;
			canvas.height = origImage.naturalHeight;
			red_canvas.width = origImage.naturalWidth;
			red_canvas.height = origImage.naturalHeight;
			dark_cir_canvas.width = origImage.naturalWidth;
			dark_cir_canvas.height = origImage.naturalHeight;



			ctx.drawImage(origImage,0,0,canvas.width,canvas.height);
			red_ctx.drawImage(origImage,0,0,red_canvas.width,red_canvas.height);
			dark_cir_ctx.drawImage(origImage,0,0,dark_cir_canvas.width,dark_cir_canvas.height);

			logOnLocalHostFrontEnd("MASK OVERLAYS - IMAGE LOADED");

			let maskInterval = setInterval(()=>{

				if (faceLandmarkModelLoaded){
					clearInterval(maskInterval);
					fmcMakeDehydrationMaskImageURL()
					.then((imgUrl)=>{
						if (window.facemap != undefined){
							window.facemap.concerns.forEach((concern,index)=>{
								if (concern.name == "dehydration"){
									window.facemap.concerns[index].image = imgUrl;
								}
							})
							window.facemap.sortedConcerns.forEach((concern,index)=>{
								if (concern.name == "dehydration"){
									window.facemap.sortedConcerns[index].image = imgUrl;
								}
							})
							try{
								document.getElementById("fmc_result_overlay_image_dehydration").style.backgroundImage = 'url('+imgUrl+')';
							}catch(err){}
							try{
								document.querySelectorAll("#fmcCarousel_mobileResults_dehydration .fmc_mobile_results_image").forEach((imgEl)=>{
									imgEl.style.backgroundImage = 'url('+imgUrl+')';
								})
							}catch(err){}


							let rednessImgCheckInterval = setInterval(()=>{

								if (fmcRednessImgUrl != ""){

									window.facemap.concerns.forEach((concern,index)=>{
										if (concern.name == "redness"){
											window.facemap.concerns[index].image = fmcRednessImgUrl;
										}
									})
									window.facemap.sortedConcerns.forEach((concern,index)=>{
										if (concern.name == "redness"){
											window.facemap.sortedConcerns[index].image = fmcRednessImgUrl;
										}
									})
									try{
										document.getElementById("fmc_result_overlay_image_redness").style.backgroundImage = 'url('+fmcRednessImgUrl+')';
									}catch(err){}
									try{
										document.querySelectorAll("#fmcCarousel_mobileResults_redness .fmc_mobile_results_image").forEach((imgEl)=>{
											imgEl.style.backgroundImage = 'url('+fmcRednessImgUrl+')';
										})

									}catch(err){}
									clearInterval(rednessImgCheckInterval);
								}
							},100);

						}
					})
					.catch((err) => {
						logOnLocalHostFrontEnd("error in dehydration mask - ", err);
					});

					fmcMakeDarkCirclesMaskImageURL("fmc_dark_circles_canvas")
					.then((imgUrl)=>{
						console.log("DARK CIRCLES DONE")
						if (window.facemap != undefined){
							window.facemap.concerns.forEach((concern,index)=>{
								if (concern.name == "dark_circles"){
									window.facemap.concerns[index].image = imgUrl;
								}
							})
							window.facemap.sortedConcerns.forEach((concern,index)=>{
								if (concern.name == "dark_circles"){
									window.facemap.sortedConcerns[index].image = imgUrl;
								}
							})
							try{
								document.getElementById("fmc_result_overlay_image_dark_circles").style.backgroundImage = 'url('+imgUrl+')';
							}catch(err){}
							try{
								document.querySelectorAll("#fmcCarousel_mobileResults_dark_circles .fmc_mobile_results_image").forEach((imgEl)=>{
									imgEl.style.backgroundImage = 'url('+imgUrl+')';
								})
							}catch(err){}
						}else{
							parsedResponse.facemap.concerns[index].image = imgUrl;

						}
					})
					.catch((err) => {
						logOnLocalHostFrontEnd("error in dark circle mask - ", err);
					});




				}else{
					console.log("FACE LANDMARK MODEL NOT LOADED YET")
				}

			},100)



		}
		origImage.src = window.facemap.original_image;

	}
}

function triggerGaEventShopButton(derm_id){
	fmcSendGA('main flow','shop button clicked - dermID-'+ derm_id );
	fmcSendGA('main flow','shop button clicked');

	fmcSendGAIndia('main flow','shop button clicked - dermID-'+ derm_id );
	fmcSendGAIndia('main flow','shop button clicked');

}


let updateResults = ()=>{

	return new Promise((resolve,reject)=> {

		fmcProductConcernsDone = false;
		fmcProductCarouselDone = false;
		pendingUpdateResultsCounter = 0


		updateConcerns()
		.then((concernRes)=>{
			logOnLocalHostFrontEnd("UPDATING CONCERN RESPONSE: ", concernRes);
			fmcProductConcernsDone = true;
		})
		.catch((concernErr)=>{
			console.error("Error in updating concerns: ", concernErr);
			fmcProductConcernsDone = true;
		})

		updateProductCarousel()
		.then((carouselRes)=>{
			logOnLocalHostFrontEnd("UPDATING CAROUSEL RESPONSE: ", carouselRes);
			fmcProductCarouselDone = true;
		})
		.catch((carouselErr)=>{
			console.error("Error in updating carousel: ", carouselErr);
			fmcProductCarouselDone = true;
		})

		let pendingUpdateInterval = setInterval(()=>{

			if (fmcProductCarouselDone && fmcProductConcernsDone){
				if (window.intellimize){
					console.log("page updated");
					document.getElementById("fmc_results_mobile_next_button").style.top = Math.round(document.getElementById("fmcCarousel_mobileResults").offsetHeight/2 - 25) + "px";
		 		 	document.getElementById("fmc_results_mobile_prev_button").style.top = Math.round(document.getElementById("fmcCarousel_mobileResults").offsetHeight/2 - 25) + "px";
					intellimize.activate();
				}
				clearInterval(pendingUpdateInterval);
				resolve("update results - done");
			}
		},100);



	})

}

let updateConcerns = ()=>{
	return new Promise((resolve,reject)=>{

		let concernContainer = document.getElementById("fmc_concern_items");
		let sortedConcerns = [...window.facemap.sortedConcerns]

		while (sortedConcerns.length > fmcMaxConcerns){
			sortedConcerns.pop();
		}


		let htmlString = "";
		let imageArrayWrapper = document.getElementById("fmc_result_images_array_wrapper");
		sortedConcerns.forEach((concern,index)=>{
			if (index == 0){
				htmlString += '<div id="fmc_concern_'+concern.name+'" class="fmc-results-category selected" concern="'+concern.name+'" onclick="selectConcern(\''+concern.name+'\')">';
			}else{
				htmlString += '<div id="fmc_concern_'+concern.name+'" class="fmc-results-category" concern="'+concern.name+'" onclick="selectConcern(\''+concern.name+'\')">';
			}
			htmlString += '<div id="fmc_concern_side_marker_'+concern.name+'" class="fmc-results-side-marker"></div>';
			htmlString += '<div id="fmc_results_category_content_'+concern.name+'" class="fmc-results-category-content">';
			htmlString += '<div id="fmc_concern_title_'+concern.name+'" class="fmc-results-title">'+fmcConcernCopy[concern.name].title+'</div>';
			htmlString += '<div id="fmc_concern_indicator_word_'+concern.name+'" class="fmc-results-indicator-word">'+scoreToSeverity(concern.score)+'</div>';
			htmlString += '<div id="fmc_concern_text_wrapper_'+concern.name+'" class="fmc-concern-text-wrapper fmc-text-collapsed">';
			htmlString += '<div id="fmc_concern_text_'+concern.name+'" class="fmc-results-text">'+fmcConcernCopy[concern.name].text+' <a href="javascript:lessConcernText(\''+concern.name+'\');" class="fmc-concern-less-button">'+fmcMoreLessButtonsText.less+'</a></div>';
			htmlString += '<a href="javascript:moreConcernText(\''+concern.name+'\');" class="fmc-concern-more-button">'+fmcMoreLessButtonsText.more+'</a>';
			htmlString += '</div>';
			htmlString += '<div id="fmc_concern_indicator_bar_'+concern.name+'" class="fmc-results-indicator-bar"><div style="'+makeIndicatorBarStyle(concern.score)+'"></div></div>';
			htmlString += '</div>';
			htmlString += '</div>';
			let resultImageDiv = document.createElement("div");
			resultImageDiv.classList.add("fmc_result_overlay_image");
			if (concern.image == undefined){
				console.log(concern)
			}
			//console.log(concern.image)

			resultImageDiv.style.backgroundImage= "url("+concern.image+")";
			if (index == 0){
				resultImageDiv.style.opacity=1;
			}else{
				resultImageDiv.style.opacity=0;
			}
			resultImageDiv.setAttribute("id","fmc_result_overlay_image_"+concern.name);
			imageArrayWrapper.appendChild(resultImageDiv);
		});
		if (document.getElementById("fmcBody").offsetWidth <= 768){
			htmlString += '<div id="fmc_concern_slider_slide_element" draggable="true" ondragstart="dragRecommendationsStartEvent(event);" ontouchstart="dragRecommendationsStartEvent(event);"></div>';
		}
		concernContainer.innerHTML = htmlString;
		sortedConcerns.forEach((concern,index)=>{
			document.getElementById("fmc_results_category_content_"+concern.name).style.backgroundImage = 'url("https://skinanalysis.me/img/concerns/'+concern.name+'-icon.png")';
		});

		if (document.getElementById("fmcBody").offsetWidth <= 768){
			let slideElement = document.getElementById("fmc_concern_slider_slide_element");
			let bodyWidth = document.getElementById("fmcBody").offsetWidth;
			let sliderWidth = document.getElementById("fmc_concern_items").offsetWidth;
			slideElement.style.width = bodyWidth + "px";
			slideElement.style.left = 0.5*(sliderWidth - bodyWidth) + "px";
		}



		updateProductRecommendations()
		.then((updateProdRecRes)=>{
			logOnLocalHostFrontEnd("UPDATE PROD RECOMMEND RES: ", updateProdRecRes);
			resolve("update concerns done");
		})
		.catch((updateProdRecErr)=>{
			console.error("Error in update product recommendations - ",updateProdRecErr);
			resolve("update concerns done");
		})
	});

}

let updateProductRecommendations = ()=>{

	return new Promise((resolve,reject)=>{

		let prodSection = document.getElementById("fmc_product_section");
		let secWidth = prodSection.offsetWidth;
		let prodWidth = 0.8 * secWidth;
		let gapWidth = 0.2*secWidth;
		let startValue = 0.1*secWidth;
		if (document.getElementById("fmcBody").offsetWidth <= 768){
			gapWidth = 0.25* gapWidth;
		}

		let shopButtonText;
		if (window.fmc_productDict.button_text == "shop"){
			shopButtonText = fmcProductCards.shop_button;
		}else{
			shopButtonText = window.fmc_productDict.button_text;
		}

		let sortedConcernsForCarousel = [...window.facemap.sortedConcerns];

		while(sortedConcernsForCarousel.length < 5 && sortedConcernsForCarousel.length > 0){
			window.facemap.sortedConcerns.forEach((sortConcern,index)=>{
				sortedConcernsForCarousel.push(sortConcern);
			})
		}


		sortedConcernsForCarousel.forEach((concernObj, index)=>{
			let recommendation = concernObj.recommended_product;
			let newDiv = document.createElement("div");
			newDiv.classList.add('fmc-product-container');
			newDiv.setAttribute('id','fmc_product_container_'+concernObj.name);
			newDiv.style.width = prodWidth + "px";


			let leftPos = startValue + (prodWidth + gapWidth) * index;

			if (index > 2){
				leftPos = leftPos - (prodWidth + gapWidth) * sortedConcernsForCarousel.length;
			}

			newDiv.style.left = leftPos + "px";


			newDiv.setAttribute("concern",concernObj.name);

			if (recommendation != null){
				newDiv.setAttribute("prodUrl",recommendation.productUrl);
				newDiv.setAttribute("price",recommendation.priceCurrency + recommendation.price);
				newDiv.setAttribute("derm_id",recommendation.demandware_id + recommendation.price);
				let htmlString = "";


				htmlString += '<div class="fmc-product-image"><img src="'+recommendation.imageUrl+'"  onerror="this.style.display=\'none\'" /></div>';
				htmlString += '<p class="fmc-product-name">'+recommendation.name+'</p>';
				htmlString += '<p class="fmc-product-subtitle"">'+ recommendation.tagline+'</p>';

				if (window.fmc_showShopButton){

					//let fmcGAString = "fmcSendGA('main flow','shop button clicked - dermID-"+ recommendation.demandware_id+ "'); return true;";
					let fmcGAString = "triggerGaEventShopButton(" + recommendation.demandware_id + "); return true;";

					if (recommendation.productUrl.substring(0,7) == "http://" || recommendation.productUrl.substring(0,7) == "https:/"){
						if (window.fmc_showPrices){
							htmlString += '<div class="fmc-product-price-wrapper"><a onclick="' + fmcGAString + '" class="fmc-product-buy-button" href="'+recommendation.productUrl+'" target="_blank"><p class="fmc-product-price">'+shopButtonText+'<span class="fmc_price_separator"> | </span>'+ recommendation.priceCurrency + recommendation.price  +'</p></a></div>';
						}else{
							htmlString += '<div class="fmc-product-price-wrapper"><a onclick="' + fmcGAString + '" class="fmc-product-buy-button" href="'+recommendation.productUrl+'" target="_blank"><p class="fmc-product-price">'+ shopButtonText+'</p></a></div>';
						}
					}else{
						if (window.fmc_showPrices){
							htmlString += '<div class="fmc-product-price-wrapper"><a class="fmc-product-buy-button" onclick="'+recommendation.productUrl+'"><p class="fmc-product-price">'+shopButtonText+'<span class="fmc_price_separator"> | </span>'+ recommendation.priceCurrency + recommendation.price  +'</p></a></div>';
						}else{
							htmlString += '<div class="fmc-product-price-wrapper"><a class="fmc-product-buy-button" onclick="'+recommendation.productUrl+'"><p class="fmc-product-price">'+shopButtonText+'</p></a></div>';
						}
					}
				}

				htmlString += '<img class="fmc-product-target-icon-img" src="https://skinanalysis.me/img/concerns/'+concernObj.name+'-icon.png"/>'

				newDiv.innerHTML = htmlString;

			}

			prodSection.appendChild(newDiv);

		});
		if ( document.getElementById("fmcBody").offsetWidth <= 768){

			let slideElement = document.getElementById("fmc_product_slider_slide_element");
			let bodyWidth = document.getElementById("fmcBody").offsetWidth;
			let sliderWidth = document.getElementById("fmc_product_slider").offsetWidth;
			slideElement.style.width = bodyWidth + "px";
			slideElement.style.left = 0.5*(sliderWidth - bodyWidth) + "px";

			dmlCarousel.updateCarousels().then((res)=>{
				console.log("update carousels: ", res)
				setTimeout(()=>{
					updateMobileResultsProducts();

					if (fmc_isHandAndStone){
						document.querySelectorAll(".fmc-product-image img").forEach((image)=>{
							image.classList.add("fmc_handandstone_product_image");
						})
					}

				},200)
			})
			.catch((carouselErr)=>{
				console.error("Error in carousel creation - ",carouselErr)
			})
		}else{
			fmcProductConcernsDone = true;
			if (fmc_isHandAndStone){
				document.querySelectorAll(".fmc-product-image img").forEach((image)=>{
					image.classList.add("fmc_handandstone_product_image");
				})
			}
			resolve("update product recommendations done");
		}
	})
}

let updateMobileResultsProducts = ()=>{
	let contHeight = 0;
	let prodCont = document.getElementById("fmc_mobile_results_products_container");
	let carouselCont = document.getElementById("fmcCarousel_mobileResults");

	let shopButtonText;
	if (window.fmc_productDict.button_text == "shop"){
		shopButtonText = fmcProductCards.shop_button;
	}else{
		shopButtonText = window.fmc_productDict.button_text;
	}

	window.facemap.sortedConcerns.forEach((concern,index)=>{
		//console.log("concern: ", concern.name, index, index % 2 == 1)
		let product = concern.recommended_product;
		let newDiv = document.createElement("div");
		newDiv.setAttribute("id","fmc_mobile_results_product_"+concern.name);
		newDiv.classList.add("fmc_mobile_results_product");
		prodCont.appendChild(newDiv);
		newDiv.style.top = 270 * Math.floor(index/2) + "px";
		if (index % 2 == 1){
			newDiv.style.left = "52%";
		}
		newDiv.style.backgroundImage = 'url("'+product.imageUrl+'")';
		contHeight = Math.max(contHeight, newDiv.offsetTop + newDiv.offsetHeight);
		newDiv.innerHTML = "<p class='fmc_prod_cont_indicator'></p>"+
			"<p class='fmc_prod_cont_title'>" + product.name + "</p>"+
			"<p class='fmc_prod_cont_tagline'>"+ product.tagline + "</p>";
		if (concern.score < 2){
			newDiv.innerHTML += "<p class='fmc_prod_cont_indicator fmc_indicator_color_low'>" + fmcConcernCopy[concern.name].title + "</p>";
		}else if (concern.score < 4){
			newDiv.innerHTML += "<p class='fmc_prod_cont_indicator fmc_indicator_color_moderate'>" + fmcConcernCopy[concern.name].title + "</p>";
		}else{
			newDiv.innerHTML += "<p class='fmc_prod_cont_indicator fmc_indicator_color_critical'>" + fmcConcernCopy[concern.name].title + "</p>";
		}


		if (window.fmc_showShopButton){

			//let fmcGAString = "fmcSendGA('main flow','shop button clicked - dermID-"+ product.demandware_id+ "'); return true;";
			let fmcGAString = "triggerGaEventShopButton(" + product.demandware_id + "); return true;";

			if (product.productUrl.substring(0,7) == "http://" || product.productUrl.substring(0,7) == "https:/"){
				if (window.fmc_showPrices){
					newDiv.innerHTML += '<div class="fmc-product-price-wrapper"><a onclick="' + fmcGAString + '" class="fmc-product-buy-button" href="'+product.productUrl+'" target="_blank"><p class="fmc-product-price">'+shopButtonText+'<span class="fmc_price_separator"> | </span>'+ product.priceCurrency + product.price  +'</p></a></div>';
				}else{
					newDiv.innerHTML += '<div class="fmc-product-price-wrapper"><a onclick="' + fmcGAString + '" class="fmc-product-buy-button" href="'+product.productUrl+'" target="_blank"><p class="fmc-product-price">'+ shopButtonText+'</p></a></div>';
				}
			}else{
				if (window.fmc_showPrices){
					newDiv.innerHTML += '<div class="fmc-product-price-wrapper"><a class="fmc-product-buy-button" onclick="'+product.productUrl+'"><p class="fmc-product-price">'+shopButtonText+'<span class="fmc_price_separator"> | </span>'+ product.priceCurrency + product.price  +'</p></a></div>';
				}else{
					newDiv.innerHTML += '<div class="fmc-product-price-wrapper"><a class="fmc-product-buy-button" onclick="'+product.productUrl+'"><p class="fmc-product-price">'+shopButtonText+'</p></a></div>';
				}
			}
		}
	})
	//document.getElementById("fmc_results_wrapper_mobile").style.height = carouselCont.offsetHeight + contHeight + 100 + "px";
	prodCont.style.height = contHeight + "px";
	prodCont.style.opacity = 1;
	fmcProductConcernsDone = true;
}


let dragPos;

let dragRecommendationsStartEvent = (evt)=>{
	if (evt.type == "touchstart"){
		dragPos = evt.changedTouches[0].pageX;
	}else{
		dragPos=evt.offsetX;
	}
	evt.target.addEventListener("drag",dragRecommendationsEvent)
	evt.target.addEventListener("touchmove",dragRecommendationsEvent)
}

let dragRecommendationsEvent = (evt)=>{
	let deltaX;
	if (evt.type == "touchmove"){
		deltaX = evt.changedTouches[0].pageX-dragPos;
	}else{
		deltaX = evt.offsetX-dragPos;
	}

	//logOnLocalHostFrontEnd("deltaX: ", deltaX);
	if (evt.screenX != 0){
		if (deltaX > 30){
			evt.target.removeEventListener("drag",dragRecommendationsEvent);
			nextProduct(true);
		}
		if (deltaX < -30){
			evt.target.removeEventListener("drag",dragRecommendationsEvent);
			prevProduct(true);
		}

	}
}

let dragRegimePos;

let dragRegimeStartEvent = (evt)=>{
	if (evt.type == "touchstart"){
		dragRegimePos = evt.changedTouches[0].pageX;
	}else{
		dragRegimePos=evt.offsetX;
	}
	evt.target.addEventListener("drag",dragRegimeEvent)
	evt.target.addEventListener("touchmove",dragRegimeEvent)
}

let dragRegimeEvent = (evt)=>{
	let deltaX;
	if (evt.type == "touchmove"){
		deltaX = evt.changedTouches[0].pageX-dragRegimePos;
	}else{
		deltaX = evt.offsetX-dragRegimePos;
	}

	//logOnLocalHostFrontEnd("deltaX: ", deltaX);
	if (evt.screenX != 0){
		if (deltaX > 30){
			evt.target.removeEventListener("drag",dragRegimeEvent);
			carouselNextProduct();
		}
		if (deltaX < -30){
			evt.target.removeEventListener("drag",dragRegimeEvent);
			carouselPrevProduct();
		}

	}
}

let updateProductCarousel = ()=>{
	return new Promise((resolve,reject)=>{

		let recommendations = window.facemap.recommendedProducts;


		if (fmcRegimeLabels.soothe == undefined){
			fmcRegimeLabels.soothe = fmcRegimeLabels.exfoliate;
		}

		let shopButtonText;
		if (window.fmc_productDict.button_text == "shop"){
			shopButtonText = fmcProductCards.shop_button;
		}else{
			shopButtonText = window.fmc_productDict.button_text;
		}

		while (recommendations.length > 6){
			recommendations.pop();
		}
		if (recommendations.length > 5){

			let prodSection = document.getElementById("fmc_product_carousel_section");
			if (document.getElementById("fmcBody").offsetWidth > 768){

				let secWidth = prodSection.offsetWidth;
				let prodWidth = 0.28*secWidth;
				let gapWidth = 0.053*secWidth;
				let activeLeft = 0.5*gapWidth + prodWidth + 0.033*secWidth;
				let activeWidth = 0.32*secWidth;
				recommendations.forEach((recommendation, index)=>{
					let newDiv = document.createElement("div");
					newDiv.classList.add('fmc-product-container');
					newDiv.style.width = prodWidth + "px";
					if(index == recommendations.length -1 ){
						newDiv.style.left =  - 0.5 * gapWidth - prodWidth + "px";
					}else{
						newDiv.style.left = 0.5*gapWidth + (prodWidth + gapWidth)*index + "px";
					}

					newDiv.setAttribute("prodUrl",recommendation.productUrl);
					if (recommendation.priceCurrency==""){
						newDiv.setAttribute("price","");
					}else{
						newDiv.setAttribute("price",recommendation.priceCurrency + recommendation.price );
					}
					newDiv.setAttribute("derm_id",recommendation.demandware_id);

					let regimenIndex;
					if (recommendation.regimen_index){
						regimenIndex = recommendation.regimen_index-1;
					}else{
						regimenIndex = index;
					}

					let htmlString = "";
					htmlString += '<div class="fmc-regime-marker"><p>'+ (regimenIndex+1) +'</p></div>';
					if (recommendation.pimcore_id == "9211"){
						htmlString += '<p class="fmc-regime-label">'+fmcRegimeLabels.soothe+'</p>';
					}else{
						htmlString += '<p class="fmc-regime-label">'+fmcRegimeLabels[fmcRegimeLabelsOrder[regimenIndex]]+'</p>';
					}
					htmlString += '<div class="fmc-product-image"><img src="'+recommendation.imageUrl+'"/></div>';
					htmlString += '<p class="fmc-product-name">'+ recommendation.name +'</p>';
					htmlString += '<p class="fmc-product-subtitle">'+ recommendation.tagline +'</p>';

					if (index == 1){
						newDiv.style.width = activeWidth +  "px";
						newDiv.style.left = activeLeft + "px";
						newDiv.style.top = "30px";
						newDiv.style.boxShadow = "0px 5px 50px #b8d8f4";

						if (window.fmc_showShopButton){

							//let fmcGAString = "fmcSendGA('main flow','shop button clicked - dermID-"+ recommendation.demandware_id+ "'); return true;";
							let fmcGAString = "triggerGaEventShopButton(" + recommendation.demandware_id + "); return true;";

							if (recommendation.productUrl.substring(0,7) == "http://" || recommendation.productUrl.substring(0,7) == "https:/"){
								if (window.fmc_showPrices){
									htmlString += '<div class="fmc-product-price-wrapper"><a onclick="' + fmcGAString + '" class="fmc-product-buy-button" href="'+recommendation.productUrl+'" target="_blank"><p class="fmc-product-price">'+shopButtonText+'<span class="fmc_price_separator"> | </span>'+ recommendation.priceCurrency + recommendation.price  +'</p></a></div>';
								}else{
									htmlString += '<div class="fmc-product-price-wrapper"><a onclick="' + fmcGAString + '" class="fmc-product-buy-button" href="'+recommendation.productUrl+'" target="_blank"><p class="fmc-product-price">'+shopButtonText+'</p></a></div>';
								}
							}else{
								if (window.fmc_showPrices){
									htmlString += '<div class="fmc-product-price-wrapper"><a class="fmc-product-buy-button" onclick="'+recommendation.productUrl+'"><p class="fmc-product-price">'+shopButtonText+'<span class="fmc_price_separator"> | </span>'+ recommendation.priceCurrency + recommendation.price  +'</p></a></div>';
								}else{
									htmlString += '<div class="fmc-product-price-wrapper"><a class="fmc-product-buy-button" onclick="'+recommendation.productUrl+'"><p class="fmc-product-price">'+shopButtonText+'</p></a></div>';
								}
							}
						}
					}else{
						if (window.fmc_showShopButton){
							if (window.fmc_showPrices){
								htmlString += '<div class="fmc-product-price-wrapper"><p class="fmc-product-price">'+ recommendation.priceCurrency + recommendation.price +'</p></div>';
							}else{
								htmlString += '<div class="fmc-product-price-wrapper"><p class="fmc-product-price"></p></div>';
							}
						}
					}

					if (index == 2){
						newDiv.addEventListener("click",carouselNextProduct);
						newDiv.style.cursor = "pointer";
					}
					if (index == 0){
						newDiv.addEventListener("click",carouselPrevProduct);
						newDiv.style.cursor = "pointer";
					}

					newDiv.innerHTML = htmlString;
					prodSection.appendChild(newDiv);
				});
				fmcProductCarouselDone = true;

			}else{
				let secWidth = document.getElementById("fmc_product_carousel_slider").offsetWidth;
				let prodWidth = 0.8 * secWidth;
				let startValue = 0.1*secWidth;
				let gapWidth = 0.05* secWidth;
				let activeLeft = startValue;
				let activeWidth = prodWidth;


				recommendations.forEach((recommendation, index)=>{
					let newDiv = document.createElement("div");
					newDiv.classList.add('fmc-product-container');
					newDiv.style.width = prodWidth + "px";

					let leftPos = startValue + (prodWidth + gapWidth) * index;

					if (index > 2){
						leftPos = leftPos - (prodWidth + gapWidth) * 6;
					}

					newDiv.style.left = leftPos + "px";

					newDiv.setAttribute("prodUrl",recommendation.productUrl);
					if (window.fmc_showShopButton){
						if (window.fmc_showPrices){
							newDiv.setAttribute("price",recommendation.priceCurrency + recommendation.price );
						}else{
							newDiv.setAttribute("price","");
						}
					}
					newDiv.setAttribute("derm_id",recommendation.demandware_id);

					let regimenIndex;
					if (recommendation.regimen_index){
						regimenIndex = recommendation.regimen_index-1;
					}else{
						regimenIndex = index;
					}


					let htmlString = "";
					htmlString += '<div class="fmc-regime-marker"><p>'+ (regimenIndex+ 1 ) +'</p></div>';
					if (recommendation.pimcore_id == "9211"){
						htmlString += '<p class="fmc-regime-label">'+fmcRegimeLabels.soothe+'</p>';
					}else{
						htmlString += '<p class="fmc-regime-label">'+fmcRegimeLabels[fmcRegimeLabelsOrder[regimenIndex]]+'</p>';
					}
					htmlString += '<div class="fmc-product-image"><img src="'+recommendation.imageUrl+'"/></div>';
					htmlString += '<p class="fmc-product-name">'+recommendation.name+'</p>';
					htmlString += '<p class="fmc-product-subtitle">'+recommendation.tagline+'</p>';

					if (window.fmc_showShopButton){

						//let fmcGAString = "fmcSendGA('main flow','shop button clicked - dermID-"+ recommendation.demandware_id+ "'); return true;";
						let fmcGAString = "triggerGaEventShopButton(" + recommendation.demandware_id + "); return true;";

						if (recommendation.productUrl.substring(0,7) == "http://" || recommendation.productUrl.substring(0,7) == "https:/"){
							if (window.fmc_showPrices){
								htmlString += '<div class="fmc-product-price-wrapper"><a onclick="' + fmcGAString + '" class="fmc-product-buy-button" href="'+recommendation.productUrl+'" target="_blank"><p class="fmc-product-price">'+shopButtonText+'<span class="fmc_price_separator"> | </span>'+ recommendation.priceCurrency + recommendation.price  +'</p></a></div>';
							}else{
								htmlString += '<div class="fmc-product-price-wrapper"><a onclick="' + fmcGAString + '" class="fmc-product-buy-button" href="'+recommendation.productUrl+'" target="_blank"><p class="fmc-product-price">'+shopButtonText+'</p></a></div>';
							}
						}else{
							if (window.fmc_showPrices){
								htmlString += '<div class="fmc-product-price-wrapper"><a class="fmc-product-buy-button" onclick="'+recommendation.productUrl+'"><p class="fmc-product-price">'+shopButtonText+'<span class="fmc_price_separator"> | </span>'+ recommendation.priceCurrency + recommendation.price  +'</p></a></div>';
							}else{
								htmlString += '<div class="fmc-product-price-wrapper"><a class="fmc-product-buy-button" onclick="'+recommendation.productUrl+'"><p class="fmc-product-price">'+shopButtonText+'</p></a></div>';
							}
						}
					}


					newDiv.innerHTML = htmlString;
					prodSection.appendChild(newDiv);
				});
				setTimeout(()=>{
					let dragElement = document.createElement("div");
					let bodyWidth = document.getElementById("fmcBody").offsetWidth;
					let sliderWidth = document.getElementById("fmc_product_carousel_slider").offsetWidth;

					dragElement.style.width = bodyWidth + "px";
					dragElement.style.height = document.getElementById("fmc_product_carousel_slider").offsetHeight * 0.6 + "px";
					dragElement.style.position = "absolute";
					dragElement.style.top  = "30px";
					dragElement.style.left = 0.5*(sliderWidth - bodyWidth) + "px";
					dragElement.setAttribute("draggable","true");
					dragElement.setAttribute("ondragstart","dragRegimeStartEvent(event)");
					dragElement.setAttribute("ontouchstart","dragRegimeStartEvent(event)");
					prodSection.appendChild(dragElement);
					fmcProductCarouselDone = true;

				},100);

			}
		}else{
			document.getElementById("fmc_product_carousel_container").style.display = "none";
			fmcProductCarouselDone = true;
		}


		let mainConcernTries = 0;

		let updateMainConcern = ()=>{
			if (window.facemap.sortedConcerns != undefined){
				if (window.facemap.sortedConcerns.length > 0 ){
					document.getElementById("fmc_carousel_concern_focus").innerHTML = fmcConcernCopy[window.facemap.sortedConcerns[0].name].title;
				}
			}else{
				if (mainConcernTries < 10){
					setTimeout(()=>{
						mainConcernTries += 1;
						updateMainConcern();
					},500);
				}
			}
		}

		updateMainConcern();

		resolve("6 step regimen updated")
	})

}

let carouselSliderAllowsMoving = true;

let carouselNextProduct = ()=>{
	if (carouselSliderAllowsMoving){

		let shopButtonText;
		if (window.fmc_productDict.button_text == "shop"){
			shopButtonText = fmcProductCards.shop_button;
		}else{
			shopButtonText = window.fmc_productDict.button_text;
		}

		carouselSliderAllowsMoving = false;
		let prodSection = document.getElementById("fmc_product_carousel_section");

		if (document.getElementById("fmcBody").offsetWidth > 768){

			let secWidth = prodSection.offsetWidth;
			let prodWidth = 0.28*secWidth;
			let gapWidth = 0.053*secWidth;
			let activeLeft = 0.5*gapWidth + prodWidth + 0.033*secWidth;
			let activeWidth = 0.32*secWidth;

			let recDivs = document.querySelectorAll("#fmc_product_carousel_section .fmc-product-container");

			let leftBorder = 0;

			recDivs.forEach((prodElement, index)=>{

				prodElement.removeEventListener("click",carouselPrevProduct);
				prodElement.removeEventListener("click",carouselNextProduct);
				prodElement.style.cursor = "auto";

				let curPos = Number(prodElement.style.left.replace("px",""));

				if (curPos > prodWidth && curPos < 2 * prodWidth){
					prodElement.style.width = prodWidth + "px";
					if (window.fmc_showShopButton){
						if (window.fmc_showPrices){
							prodElement.querySelector(".fmc-product-price-wrapper").innerHTML = '<p class="fmc-product-price">'+prodElement.getAttribute("price")+'</p>';
						}else{
							prodElement.querySelector(".fmc-product-price-wrapper").innerHTML = '<p class="fmc-product-price"></p>';
						}
					}
					prodElement.style.left = 0.5 * gapWidth + "px";
					prodElement.style.top = "50px";
					prodElement.style.boxShadow = "0px 5px 14px #d4d3d3";
					prodElement.addEventListener("click",carouselPrevProduct);
					prodElement.style.cursor = "pointer";
				}else if(curPos > 2*prodWidth  && curPos < 3*prodWidth){
					prodElement.style.left = activeLeft + "px";
					prodElement.style.width = activeWidth + "px";
					prodElement.style.top = "30px";
					prodElement.style.boxShadow = "0px 5px 50px #b8d8f4";
					let prodUrl = prodElement.getAttribute("produrl");
					if (window.fmc_showShopButton){

						//let fmcGAString = "fmcSendGA('main flow','shop button clicked - dermID-"+ prodElement.getAttribute("derm_id") + "'); return true;";
						let fmcGAString = "triggerGaEventShopButton(" + prodElement.getAttribute("derm_id") + "); return true;";

						if (prodUrl.substring(0,7) == "http://" || prodUrl.substring(0,7) == "https:/"){
							if (window.fmc_showPrices){
								prodElement.querySelector(".fmc-product-price-wrapper").innerHTML = '<a onclick="' + fmcGAString + '" class="fmc-product-buy-button" href="'+prodUrl+'" target="_blank"><p class="fmc-product-price">'+prodElement.getAttribute("price")+' | '+shopButtonText+' <!--span class="fmc-arrow-icon fmc-arrow-right fmc-arrow-icon-white"></span--></p></a>';
							}else{
								prodElement.querySelector(".fmc-product-price-wrapper").innerHTML = '<a onclick="' + fmcGAString + '" class="fmc-product-buy-button" href="'+prodUrl+'" target="_blank"><p class="fmc-product-price">'+shopButtonText+'</p></a>';
							}
						}else{
							prodElement.querySelector(".fmc-product-price-wrapper").innerHTML = '<a class="fmc-product-buy-button" onclick="'+prodUrl+'"><p class="fmc-product-price">'+prodElement.getAttribute("price")+' | '+shopButtonText+' <!--span class="fmc-arrow-icon fmc-arrow-right fmc-arrow-icon-white"></span--></p></a>';
						}
					}

				}else{

					if (curPos > 3* prodWidth){
						prodElement.addEventListener("click",carouselNextProduct);
						prodElement.style.cursor = "pointer";
					}

					if (curPos < leftBorder){
						let formerTransitionString = getComputedStyle(prodElement).transition;
						prodElement.style.transition = "none";
						curPos =  0.5 * gapWidth + (prodWidth + gapWidth) * (recDivs.length - 1);
						prodElement.style.left = curPos + "px";
						setTimeout(()=>{
							prodElement.style.transition = formerTransitionString;
						},10)
					}

					prodElement.style.left = curPos - gapWidth - prodWidth + "px";
				}


				if (index == 0){
					setTimeout(()=>{
						carouselSliderAllowsMoving = true;
					},520);
				}

			})
		}else{
			let secWidth = document.getElementById("fmc_product_carousel_slider").offsetWidth;
			let prodWidth = 0.8 * secWidth;
			let startValue = 0.1*secWidth;
			let gapWidth = 0.05* secWidth;
			let activeLeft = startValue;
			let activeWidth = prodWidth;

			let recDivs = document.querySelectorAll("#fmc_product_carousel_section .fmc-product-container");

			let leftBorder = 0;

			recDivs.forEach((prodElement, index)=>{

				prodElement.removeEventListener("click",carouselPrevProduct);
				prodElement.removeEventListener("click",carouselNextProduct);

				let rightBorder = 2*(prodWidth + gapWidth);


				let curPos = Number(prodElement.style.left.replace("px",""));

				prodElement.style.left = curPos + gapWidth + prodWidth + "px";


				if (curPos > rightBorder){
					let formerTransitionString = getComputedStyle(prodElement).transition;
					prodElement.style.transition = "none";
					curPos =  startValue - (prodWidth + gapWidth) * ( recDivs.length - 3);
					prodElement.style.left = curPos + "px";
					setTimeout(()=>{
						prodElement.style.transition = formerTransitionString;
					},10)
					setTimeout(()=>{
						carouselSliderAllowsMoving = true;
					},500);
				}
			})

		}
	}
}

let carouselPrevProduct = ()=>{
	if (carouselSliderAllowsMoving){

		let shopButtonText;
		if (window.fmc_productDict.button_text == "shop"){
			shopButtonText = fmcProductCards.shop_button;
		}else{
			shopButtonText = window.fmc_productDict.button_text;
		}

		carouselSliderAllowsMoving = false;

		let prodSection = document.getElementById("fmc_product_carousel_section");

		if (document.getElementById("fmcBody").offsetWidth > 768){
			let secWidth = prodSection.offsetWidth;
			let prodWidth = 0.28*secWidth;
			let gapWidth = 0.053*secWidth;
			let activeLeft = 0.5*gapWidth + prodWidth + 0.033*secWidth;
			let activeWidth = 0.32*secWidth;

			let recDivs = document.querySelectorAll("#fmc_product_carousel_section .fmc-product-container");

			let rightBorder = (prodWidth + gapWidth) * (recDivs.length - 2 );

			recDivs.forEach((prodElement, index)=>{
				prodElement.removeEventListener("click",carouselPrevProduct);
				prodElement.removeEventListener("click",carouselNextProduct);
				prodElement.style.cursor = "auto";

				let curPos = Number(prodElement.style.left.replace("px",""));


				if (curPos > prodWidth && curPos < 2 * prodWidth){
					prodElement.style.width = prodWidth + "px";
					if (window.fmc_showShopButton){
						if (window.fmc_showPrices){
							prodElement.querySelector(".fmc-product-price-wrapper").innerHTML = '<p class="fmc-product-price">'+prodElement.getAttribute("price")+'</p>';
						}else{
							prodElement.querySelector(".fmc-product-price-wrapper").innerHTML = '<p class="fmc-product-price"></p>';
						}
					}
					prodElement.style.left = 2.5 * gapWidth + 2 * prodWidth + "px";
					prodElement.style.top = "50px";
					prodElement.style.boxShadow = "0px 5px 14px #d4d3d3";
					prodElement.addEventListener("click",carouselNextProduct);
					prodElement.style.cursor = "pointer";
				}else if(curPos > 0  && curPos < prodWidth){
					curPos = 1.5 * gapWidth + prodWidth;
					prodElement.style.left = activeLeft + "px";
					prodElement.style.width = activeWidth + "px";
					prodElement.style.top = "30px";
					prodElement.style.boxShadow = "0px 5px 50px #b8d8f4";
					let prodUrl = prodElement.getAttribute("produrl");
					if (window.fmc_showShopButton){

						if (prodUrl.substring(0,7) == "http://" || prodUrl.substring(0,7) == "https:/"){

							//let fmcGAString = "fmcSendGA('main flow','shop button clicked - dermID-"+ prodElement.getAttribute("derm_id")+ "'); return true;";
							let fmcGAString = "triggerGaEventShopButton(" + prodElement.getAttribute("derm_id") + "); return true;";

							if (window.fmc_showPrices){
								prodElement.querySelector(".fmc-product-price-wrapper").innerHTML = '<a onclick="' + fmcGAString + '" class="fmc-product-buy-button" href="'+prodUrl+'" target="_blank"><p class="fmc-product-price">'+prodElement.getAttribute("price")+' | '+shopButtonText+' <!--span class="fmc-arrow-icon fmc-arrow-right fmc-arrow-icon-white"></span--></p></a>';
							}else{
								prodElement.querySelector(".fmc-product-price-wrapper").innerHTML = '<a onclick="' + fmcGAString + '" class="fmc-product-buy-button" href="'+prodUrl+'" target="_blank"><p class="fmc-product-price">'+shopButtonText+'</p></a>';
							}
						}else{
							if (window.fmc_showPrices){
								prodElement.querySelector(".fmc-product-price-wrapper").innerHTML = '<a class="fmc-product-buy-button" onclick="'+prodUrl+'"><p class="fmc-product-price">'+prodElement.getAttribute("price")+' | '+shopButtonText+' <!--span class="fmc-arrow-icon fmc-arrow-right fmc-arrow-icon-white"></span--></p></a>';
							}else{
								prodElement.querySelector(".fmc-product-price-wrapper").innerHTML = '<a class="fmc-product-buy-button" onclick="'+prodUrl+'"><p class="fmc-product-price">'+shopButtonText+'</p></a>';
							}
						}
					}
				}else{

					if (curPos < 0){
						prodElement.addEventListener("click",carouselPrevProduct);
						prodElement.style.cursor = "pointer";
					}

					if (curPos > rightBorder){
						let formerTransitionString = getComputedStyle(prodElement).transition;
						prodElement.style.transition = "none";
						prodElement.style.left = -0.5*gapWidth - prodWidth + "px";
						setTimeout(()=>{
							prodElement.style.transition = formerTransitionString;
						},10)
					}else{
						prodElement.style.left = curPos + gapWidth + prodWidth + "px";
					}
				}


				if (index == 0){
					setTimeout(()=>{
						carouselSliderAllowsMoving = true;
					},520);
				}

			})

		}else{
			let secWidth = document.getElementById("fmc_product_carousel_slider").offsetWidth;
			let prodWidth = 0.8 * secWidth;
			let startValue = 0.1*secWidth;
			let gapWidth = 0.05* secWidth;
			let activeLeft = startValue;
			let activeWidth = prodWidth;

			let recDivs = document.querySelectorAll("#fmc_product_carousel_section .fmc-product-container");

			let leftBorder = - (prodWidth + gapWidth) * (recDivs.length-3) + startValue + 0.5*gapWidth;

			recDivs.forEach((prodElement, index)=>{

				let curPos = Number(prodElement.style.left.replace("px",""));


				if (curPos < leftBorder){
					let formerTransitionString = getComputedStyle(prodElement).transition;
					prodElement.style.transition = "none";
					curPos =  startValue + (prodWidth + gapWidth) * 3;
					prodElement.style.left = curPos + "px";
					setTimeout(()=>{
						prodElement.style.transition = formerTransitionString;
					},10)
					setTimeout(()=>{
						carouselSliderAllowsMoving = true;
					},500);
				}


				prodElement.style.left = curPos - gapWidth - prodWidth + "px";
			})
		}


	}
}

let ctaImagePopup = ()=>{
	fmcSendGA("mainFlow","save results clicked");
	/*document.getElementById("fmc_popup_email_success").innerHTML = document.getElementById("fmc_submit_form_success").innerHTML;
	document.getElementById("fmc_popup_email_error").innerHTML = document.getElementById("fmc_submit_form_error").innerHTML;
	document.getElementById("fmc_cta_popup_email_input_label").innerHTML = document.getElementById("fmc_email_input_label").innerHTML;
	//document.getElementById("fmc_cta_popup_email").setAttribute("placeholder",document.getElementById("fmc_submit_form_email").getAttribute("placeholder"));
	document.getElementById("fmc_cta_popup_email").style.width = document.getElementById("fmc_submit_form_email").style.width;
	document.getElementById("fmc_cta_popup_email_button").innerHTML = document.getElementById("fmc_email_submit_button").innerHTML;
	document.getElementById("fmc_cta_popup_email_button").style.width = document.getElementById("fmc_email_submit_button").style.width;
	document.getElementById("fmc_cta_popup_subscribe_checkbox_label").innerHTML = document.getElementById("fmc_out_of_form_subscribe_checkbox_label").innerHTML;
	document.getElementById("fmc_popup_checkbox").checked = document.getElementById("fmc_email_submit_checkbox").checked;
	let darkenOverlay = document.getElementById("fmcBackgroundDarkenOverlay");
	let popup = document.getElementById("fmc_cta_popup");
	let bodyHeight = document.getElementById("fmcBody").offsetHeight;
	let bodyWidth =  document.getElementById("fmcBody").offsetWidth;
	darkenOverlay.style.height= bodyHeight + "px";
	darkenOverlay.style.width= bodyWidth + "px";
	darkenOverlay.style.display = "block";
	darkenOverlay.style.opacity = 1;
	darkenOverlay.style.backgroundColor = "rgba(0,0,0,0.5)";
	popup.style.display = "block";
	let popupWidth = popup.offsetWidth;
	let popupHeight = popup.offsetHeight;
	popup.style.top = 0.5*(Math.min(window.innerHeight,bodyHeight) - popupHeight) + "px";
	popup.style.left = 0.5*(Math.min(bodyWidth,window.innerWidth) - popupWidth) + "px";
	darkenOverlay.addEventListener("click",closeCtaImagePopup);
	*/
	document.getElementById("fmc_cta_popup").style.display = "block"
	let darkenOverlay = document.getElementById("fmcBackgroundDarkenOverlay");
	darkenOverlay.style.display = "block";
	darkenOverlay.style.opacity = 1;
	darkenOverlay.style.backgroundColor = "rgba(0,0,0,0.5)";
	darkenOverlay.addEventListener("click",closeCtaImagePopup);
	document.getElementById("fmc_cta_popup_email_title").innerHTML = document.getElementById("fmc_email_input_label").innerHTML;
	document.getElementById("fmc_cta_popup_email_subtitle").innerHTML = "";
	document.getElementById("fmc_cta_popup_subscribe_checkbox_label").innerHTML = document.getElementById("fmc_out_of_form_subscribe_checkbox_label").innerHTML;
	document.getElementById("fmc_popup_checkbox").checked = document.getElementById("fmc_email_submit_checkbox").checked;
	document.getElementById("fmc_cta_popup_email").setAttribute("placeholder",document.getElementById("fmc_submit_form_email").getAttribute("placeholder"));

}

let closeCtaImagePopup=()=>{
	let darkenOverlay = document.getElementById("fmcBackgroundDarkenOverlay");
	let popup = document.getElementById("fmc_cta_popup");

	darkenOverlay.removeEventListener("click",closeCtaImagePopup);

	darkenOverlay.style.display = "none";
	popup.style.display = "none";
}

let clickEmailSubmitButton = ()=>{
	fmc_email_captured = true;
	document.getElementById("fmcBackgroundDarkenOverlay").style.opacity = 0;
	setTimeout(()=>{
		document.getElementById("fmcBackgroundDarkenOverlay").style.display = "none";
		document.getElementById("fmc_cta_popup").style.display = "none";
	},500)
	document.getElementById("fmc_email_submit_button").click();
}

let mirrorEmail = (evt) => {
	document.getElementById("fmc_submit_form_email").value = evt.target.value;
}

let updateSubscribe = (evt)=>{

	let checked = evt.target.checked;

	if (evt.target.getAttribute("id") != "fmc_email_submit_checkbox"){
		document.getElementById("fmc_email_submit_checkbox").checked = checked;
	}else{
		document.getElementById("fmc_popup_checkbox").checked = checked;
	}


	document.getElementById("fmc_submit_form_subscribe").value = checked ? 1 : 0 ;
}

let fmcEmailEntered = () => {
	fmc_email_captured = true;
}

let fmcCheckForEmailRequirement = ()=>{
	return new Promise((resolve,reject)=>{
		let initCheckFlag = true;

		let emailCaptureInterval = setInterval(()=>{
			if (fmc_email_captured) { 			// || window.drpEmHash != ""){
				//if (window.drpEmHash != "" && fmcRequestEmailBeforeResults){
					//fmcSendGA("mainFlow","drpEmHash exist - skip email capture");
				//}
				clearInterval(emailCaptureInterval);
				resolve();
			}else{
				if (initCheckFlag){
					initCheckFlag = false;
					//console.log("SHOWING EMAIL CAPTURE FORM")
					fmcSendGA("mainFlow","show email capture form before results");
					document.getElementById("fmc_cta_popup").style.display ="block";
					document.getElementById("fmcBackgroundDarkenOverlay").style.display = "block";
					document.getElementById("fmcBackgroundDarkenOverlay").style.opacity = 0.5;
				}
			}
		},100);
	})
}

let kitTryCounter = 0;

var fmcShowProductKit = () => {
	fmcSendGA("derm kit", "calling show kit function" );

	return new Promise((resolve,reject)=>{

		let fmcProductKitHandler = () => {
			if (window.facemap){
				if (window.facemap.sortedConcerns){
					let strongestConcern = window.facemap.sortedConcerns[0].name;
					let chosenKit ;
					switch (strongestConcern){
						case "wrinkles":
						chosenKit = "ageSmart";
						break;
						case "acne":
						chosenKit = "clearBright";
						break;
						case "dark_circles":
						chosenKit = "ageSmart";
						break;
						case "redness":
						chosenKit = "ultraCalm";
						break;
						default:
						chosenKit = "meetDerm";
						break;
					}
					logOnLocalHostFrontEnd("chosen Kit: ", chosenKit);
					if (window.fmc_productDict){
						let chosenKitData = window.fmc_productDict["prodId_" + fmcDermKitIds[chosenKit]];
						logOnLocalHostFrontEnd("chosen kit data: ", chosenKitData);
						if (chosenKitData){
							try {
								let priceString = "ADD TO BAG &nbsp;|&nbsp; "+chosenKitData.priceCurrency + chosenKitData.price ;
								document.getElementById("fmc_chosen_kit_title").innerHTML = chosenKitData.name;
								document.getElementById("fmc_chosen_kit_tagline").innerHTML = chosenKitData.tagline;
								document.getElementById("fmc_chosen_kit_image").style.backgroundImage = 'url('+chosenKitData.imageUrl+')';
								document.getElementById("fmc_kit_buy_button_text").innerHTML = priceString;
								document.getElementById("fmc_kit_buy_button").onclick = ()=>{
									fmc_formPostRequest(chosenKitData.product_id);
								}
								document.getElementById("fmc_recommendations_container").style.display = "none";
								document.getElementById("fmc_kit_container").style.display = "block";
								fmcSendGA("derm kit", "success" );
								resolve({status: "success", "message":"Kit is displayed"});
							}catch(err){
								fmcSendGA("derm kit", "failure - error in displaying kit properties" );
								reject({status: "failed", "message": "Error in displaying Kit properties", "errorMessage":err});
							}
						}else{
							if (kitTryCounter < 50){
								setTimeout(()=>{fmcProductKitHandler()},200)
								kitTryCounter++;
							}else{
								reject({status: "failed", "message":"Kit Data was not found"});
								fmcSendGA("derm kit", "failure - kit data was not found" );
							}
						}
					}
				}else{
					if (kitTryCounter < 50){
						setTimeout(()=>{fmcProductKitHandler()},200)
						kitTryCounter++;
					}else{
						reject({status: "failed", "message":"window.facemap.sortedConcerns not found"});
						fmcSendGA("derm kit", "failure - window.facemap.sortedConcerns not found" );
					}
				}
			}else{
				if (kitTryCounter < 50){
					setTimeout(()=>{fmcProductKitHandler()},200)
					kitTryCounter++;
				}else{
					reject({status: "failed", "message":"window.facemap not found"});
					fmcSendGA("derm kit", "failure - window.facemap not found" );
				}
			}
		}

		if (window.location.host.indexOf("staging.web.dermalogica.demandware.net")>-1 || window.location.host.indexOf("dermalogica.com")>-1 || window.location.host.indexOf("localhost:5000")> -1){
			if (document.getElementById("fmcBody").classList.contains("fmc_768")){
				fmcSendGA("derm kit", "rejected because mobile does not work yet" );
				reject({status: "failed", "message":"Kit is not active for mobile yet"});
			}else{
				kitTryCounter = 0;
				fmcProductKitHandler();

			}
		}else{
			reject({status: "failed", "message":"not a dermalogica.com page"});
			fmcSendGA("derm kit", "rejected - not a dermalogica.com page" );
		}
	})

}

let addCartButtonAllowPress = true;
window.fmc_formPostRequest = (prodId, oldDataObj ) => {

	if (addCartButtonAllowPress){
		addCartButtonAllowPress = false;
		setTimeout(()=>{
			addCartButtonAllowPress = true;
		},2000)

		let buttonEl;

		if (event.target.classList.contains("fmc-product-price")){
			buttonEl = event.target.parentElement;
		}else if ( event.target.classList.contains("fmc_price_separator") ){
			buttonEl = event.target.parentElement.parentElement;
		}else{
			buttonEl = event.target;
		}
		logOnLocalHostFrontEnd("btn: ", event.target);

		let pid;

		if (oldDataObj != null){
			pid = oldDataObj.pid;
		}else{
			pid = prodId;
		}

		if (pid == 236){
			pid = 53;
		}

		if (pid == 242){
			pid = 231;
		}

		let dataObj;

		/*if (window.location.host.indexOf("dermalogica.co.uk")>-1 ){
			dataObj={
				"format": "ajax",
				"pid": pid + "-01",
				"quantity": '1'
			}
		}else{
		}*/

		dataObj={
			"cartAction": "add",
			"pid": pid + "-01",
			"Quantity": '1'
		}
		let formUrl;

		if (window.location.host.indexOf("staging.web.dermalogica.demandware.net")>-1){
			formUrl = "http://staging.web.dermalogica.demandware.net/on/demandware.store/Sites-Dermalogica-Site/default/Cart-AddProduct";
		}else if (window.location.host.indexOf("dermalogica.com")>-1){
			formUrl = "https://www.dermalogica.com/on/demandware.store/Sites-Dermalogica-Site/default/Cart-AddProduct";
		}else if (window.location.host.indexOf("dermalogica.co.uk")>-1){
			formUrl = "https://www.dermalogica.co.uk/on/demandware.store/Sites-dermalogica-uk-Site/en_GB/Cart-AddProduct";
		}else if (window.location.host.indexOf("dermalogica.ca")>-1){
			formUrl = "https://www.dermalogica.ca/on/demandware.store/Sites-dermalogica-ca-Site/en_CA/Cart-AddProduct";
		}else if (window.location.host.indexOf("dermalogica.com.au")>-1){
			formUrl = "https://www.dermalogica.com.au/on/demandware.store/Sites-dermalogica-au-Site/en_AU/Cart-AddProduct";
		}

		let xhr = new XMLHttpRequest();

		xhr.open("POST", formUrl, true);

		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		xhr.onload = function(evt){
			logOnLocalHostFrontEnd("btn pressed: ",buttonEl);
			buttonEl.classList.add("fmc_deactivated_price_button");
			try{
				buttonEl.querySelector(".fmc-product-price").innerHTML = "added to bag";
			}catch(innerHTMLerr){
				console.log("cannot find element - ", innerHTMLerr)
			}
			dermDotComAddBagCounter++;
			document.getElementById("fmc_dermDotComAddBagIcon").classList.add("fmc_dermDotComProductAdded");
			document.getElementById("fmc_dermDotComAddBagIcon").querySelector("p").innerHTML = dermDotComAddBagCounter;

			window.DERM.AddToCart.updateMinicart();
		}


		let payload="";

		Object.keys(dataObj).forEach((key,index)=>{
			if (index==0){
				payload += key + "="+ dataObj[key];
			}else{
				payload += "&" + key + "="+ dataObj[key];
			}
		})

		fmcSendGA("mainFlow","add to bag - pid="+pid);
		fmcSendGA("mainFlow","add to bag");

		fmcSendGAIndia("mainFlow","add to bag - pid="+pid);
		fmcSendGAIndia("mainFlow","add to bag");

		xhr.send(payload);


	}

}

let zenDeskCounter = 0;

var fmcZendeskNewWebWidget = true;

function setUpZendesk(){
	if (fmc_showLiveChat){
		console.log("setting up ZenDesk");
		document.getElementById("fmc_main_chat_container").style.display = "none";
		document.getElementById("fmc_fixed_chat_button").style.display = "none";

		deactivateChatComponents();

		if (["en","de"].indexOf(fmcUsedLanguageCode) > -1 || (window.fmcUserCountry == "IT" && fmcUsedLanguageCode =="it")){
			console.log("setup ZenDesk for language: ", fmcUsedLanguageCode);
			stripFormerZopimTags().then((stripResponse)=>{
				console.log(stripResponse)


				let zenDeskKeys = {
					"en" : "0186e089-7bf0-4ab7-b7a2-bd428b2a67bd",
					"de" : "1169476d-c034-4bd4-973f-9c034d308605",
					"derm_nz" : "1egZcjJ3wq2f6oXMNWdb3UL4eHQ3zB7H",
					"it" : "6277c71f-9a75-484a-8446-3cb4b92f6282"
				}


				let curZenDeskKey;
				let curZenDeskLang;

				if (Object.keys(zenDeskKeys).indexOf(fmcUsedLanguageCode)>-1){
					curZenDeskKey = zenDeskKeys[fmcUsedLanguageCode];
					curZenDeskLang = fmcUsedLanguageCode;
				}else{
					curZenDeskKey = zenDeskKeys.en;
					curZenDeskLang = "en";
				}

				if (window.location.hostname.indexOf("dermalogica.co.nz") > -1 ){
					fmcZendeskNewWebWidget = false;
					curZenDeskLang = "en"
					curZenDeskKey = zenDeskKeys.derm_nz;
				}

				logOnLocalHostFrontEnd("user language at Zenddesk setup: ", fmcUsedLanguageCode)

				let scriptUrl;

				if (fmcZendeskNewWebWidget){
					scriptUrl = "https://static.zdassets.com/ekr/snippet.js?key=" + curZenDeskKey;
				}else{
					scriptUrl = "https://v2.zopim.com/?key=" + curZenDeskKey;
				}

				if (fmcZendeskNewWebWidget){
					dmlfmc_getScript_withAttributes(scriptUrl, {"id":"ze-snippet"}, ()=>{
						console.log("zendesk script for FMC loaded - is new widget: ",fmcZendeskNewWebWidget);


						let chatOptions = { suppress:false , tags: ["skinanalysis"]};


						window.zESettings = {
							webWidget: {
								chat: chatOptions
							}
						}

						zE('webWidget', 'setLocale', curZenDeskLang);

						zE('webWidget:on', 'chat:status', (status) => {
							console.log("chat status: ", status)

							if(status=="online"){
								fmcSendGA("chat events","chat is online");
								fmcSendGAIndia("chat events","chat is online");
								window.fmcChatStatus = "online";
								activateChatComponents();
							}else{
								fmcSendGA("chat events","chat is offline");
								deactivateChatComponents();
								window.fmcChatStatus = "offline";
							}
						})
						zE('webWidget', 'hide');
						zE('webWidget:on', 'open', function() {
							logOnLocalHostFrontEnd("The widget has been opened!");
							fmcSendGA("chat events","widget has been opened");
						});

						zE('webWidget:on', 'chat:end', function() {
							logOnLocalHostFrontEnd("The chat has been closed!");
							fmcSendGA("chat events","chat has ended");
							zE('webWidget', 'hide');
						});

						zE('webWidget:on', 'close', function() {
							logOnLocalHostFrontEnd("The widget has been closed!");
							fmcSendGA("chat events","widget is closed");
							zE('webWidget', 'hide');
						});

					})
				}else{
					window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
					d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
						_.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute("charset","utf-8");
						$.src="https://v2.zopim.com/?" + curZenDeskKey;z.t=+new Date;$.
						type="text/javascript";e.parentNode.insertBefore($,e)})(document,"script");
						let listenForChatInterval = setInterval(()=>{

							if (window.$zopim){
								if (window.$zopim.livechat){
									clearInterval(listenForChatInterval);
									window.$zopim.livechat.hideAll();
									$zopim.livechat.setOnStatus((status)=>{
										console.log("chat status: ",status)
										if (status == "online"){
											fmcSendGA("chat events","chat is online");
											fmcSendGAIndia("chat events","chat is online");
											window.fmcChatStatus = "online";
											activateChatComponents();
										}else{
											fmcSendGA("chat events","chat is offline");
											deactivateChatComponents();
											window.fmcChatStatus = "offline";
										}
									})

									$zopim.livechat.setOnChatStart((startStatus)=>{
										console.log("chat started");
										$zopim.livechat.window.show();
									})
									$zopim.livechat.setOnChatEnd((endStatus)=>{
										console.log("chat ended");
										$zopim.livechat.hideAll();
									})

								}
							}

						},100);
					}
				})
			}else{
				console.log("language not matching for ZenDesk");
			}

	}else{
		console.log("live Chat not allowed - not setting up Zendesk");
	}
}

let stripFormerZopimTags = ()=>{
	let stripZopimPromise = new Promise((res,rej)=>{
		if (window.location.href.indexOf("dermalogica.co.nz") > -1 || window.location.href.indexOf("dermalogica.com.au")  || window.location.href.indexOf("dermalogica.co.za")> -1){

			let pageScripts = document.querySelectorAll("script");
			let zdassetsScriptsNum = 0;
			[].forEach.call(pageScripts, (scrpt) => {
				if (scrpt.src.indexOf("zdassets") > -1 || scrpt.innerHTML.indexOf(".zopim")>-1 || scrpt.src.indexOf(".zopim")>-1){
					zdassetsScriptsNum++;
					scrpt.parentNode.removeChild(scrpt);
				}
			})

			let pageIframes = document.querySelectorAll("iframe");
			let zdassetsIframesNum = 0;
			[].forEach.call(pageIframes, (ifrm) => {
				if (ifrm.classList.value.indexOf("zEWidget")>-1 || ifrm.getAttribute("data-product") == "web_widget"){
					zdassetsIframesNum++;
					ifrm.parentNode.removeChild(ifrm);
				}
			})

			window.$zopim = null;
			window.zE = null;
			window.zChat = null;
			window.zESettings = null;
			window.zEACLoaded = null;


			res("removed "+zdassetsScriptsNum+" zdassets scripts and " + zdassetsIframesNum + " iframes");
		}else{
			res("nothing to remove");
		}
	});
	return stripZopimPromise;
}

let deactivateChatComponents = () => {
	document.getElementById("fmc_main_chat_container").style.display = "none";
	document.getElementById("fmc_fixed_chat_button").style.display = "none";
}

let activateChatComponents = ()=>{
	/*
	if ( !document.getElementById("fmcBody").classList.contains("fmc_768")){
		document.getElementById("fmc_main_chat_container").style.display = "block";
	}
	if (document.getElementById("fmc_results_section").offsetWidth > 1200){
		document.getElementById("fmc_results_section").style.backgroundImage = "linear-gradient(to bottom, #70aae2 65%, #f8f8f8 65% )";
	}else if(document.getElementById("fmc_results_section").offsetWidth <= 768){
		document.getElementById("fmc_results_section").style.backgroundImage = "linear-gradient(to bottom, #70aae2 220px, white 220px )";
	}else{
		document.getElementById("fmc_results_section").style.backgroundImage = "linear-gradient(to bottom, #70aae2 35%, #f8f8f8 35% )";
	}
	*/

	document.getElementById("fmc_fixed_chat_button").style.display = "block";
	document.getElementById("fmc_fixed_chat_button").onmouseover = ()=>{
		document.getElementById("fmc_fixed_chat_button").style.width = document.getElementById("fmc_fixed_chat_button_text").offsetWidth+ 70 + "px";
	}
	document.getElementById("fmc_fixed_chat_button").onmouseleave = ()=>{
		document.getElementById("fmc_fixed_chat_button").style.width = "62px";
	}
	if (fmcIsOnboardingScreen){
		document.getElementById("fmc_fixed_chat_button").style.display = "none";
	}
}

let reduceChatBannerOnMobile = ()=>{
	document.getElementById("fmcBody").removeEventListener("click",reduceChatBannerOnMobile);
	logOnLocalHostFrontEnd("reduce mobile chat badge");
	mobileClickedOnceAlready = false;
	document.getElementById("fmc_fixed_chat_button").style.width = "62px";
	document.getElementById("fmc_fixed_chat_button").style.borderColor = "#85BBED";
}

let mobileClickedOnceAlready = false;
let mobileClickedOnceTimeout;
let openChat = ()=>{

	if (fmcZendeskNewWebWidget){

		let currentlyChatting = zE('webWidget:get', 'chat:isChatting');
		logOnLocalHostFrontEnd("currently Chatting: ", currentlyChatting)
		if (document.getElementById("fmcBody").offsetWidth > 768 || mobileClickedOnceAlready){
			fmcSendGA("chat events","user used chat button");

			if (document.getElementById("fmcBody").offsetWidth <= 768){
				reduceChatBannerOnMobile();
			}


			window.zE('webWidget','show');
			window.$zopim.livechat.window.show();
			window.zE('webWidget','open');
			zE('webWidget:on', 'chat:connected', function() {
				console.log('successfully connected to Zendesk Chat!');
			});
			if (fmc_results_available){
				if (!currentlyChatting){
					zE('webWidget', 'chat:send', fmcChatCopy.withResult + ": " + window.location.href);
				}
			}else{
				if (!currentlyChatting){
					zE('webWidget', 'chat:send', fmcChatCopy.withoutResult);
				}
			}
		}else{
			mobileClickedOnceAlready = true;
			clearTimeout(mobileClickedOnceTimeout);
			document.getElementById("fmc_fixed_chat_button").style.width = "250px";
			document.getElementById("fmc_fixed_chat_button").style.borderColor = "rgba(0,0,0,0)";
			setTimeout(()=>{
				document.getElementById("fmcBody").addEventListener("click",reduceChatBannerOnMobile);
			},10)
			mobileClickedOnceTimeout =  setTimeout(()=>{
				reduceChatBannerOnMobile();
			},3000)
		}
	}else{
		if (fmcChatStatus == "online"){

			let currentlyChatting = window.$zopim.livechat.isChatting();


			if (document.getElementById("fmcBody").offsetWidth > 768 || mobileClickedOnceAlready){
				fmcSendGA("chat events","user used chat button");

				if (document.getElementById("fmcBody").offsetWidth <= 768){
					reduceChatBannerOnMobile();
				}

				logOnLocalHostFrontEnd("is currently chatting: ", currentlyChatting)
				//window.$zopim.livechat.window.show();
				if (fmc_results_available){
					if (!currentlyChatting){

						window.$zopim.livechat.say(fmcChatCopy.withResult + ": " + window.location.href)
					}
				}else{
					if (!currentlyChatting){
						window.$zopim.livechat.say(fmcChatCopy.withoutResult)
					}
				}
			}else{
				mobileClickedOnceAlready = true;
				clearTimeout(mobileClickedOnceTimeout);
				document.getElementById("fmc_fixed_chat_button").style.width = "250px";
				document.getElementById("fmc_fixed_chat_button").style.borderColor = "rgba(0,0,0,0)";
				setTimeout(()=>{
					document.getElementById("fmcBody").addEventListener("click",reduceChatBannerOnMobile);
				},10)
				mobileClickedOnceTimeout =  setTimeout(()=>{
					reduceChatBannerOnMobile();
				},3000)
			}
		}
	}
}

var fmcOnboardingText = {
	slide1 : {
		headline : "find out exactly what your skin needs",
		text : "Most people don't know their skin very well. But that's about to change: in just a few minutes we'll tell you exactly what your skin needs to look and feel its best. Let's get started."
	},
	slide2 : {
		headline : "a slightly longer headline about how it works",
		text : "It's as easy as taking a selfie (or uploading one you have). Our sophisticated diagnostic tool will analyze your skin and tell you how to keep it healthy."
	},
	slide3 : {
		headline : "get personalized product recommendations",
		text : "Once we've analyzed your skin, you'll receive a custom product prescription tailored to your skin's needs - plus more product recommendations to help you get your healthiest skin ever.",
		button: "Analyze your skin"
	}
}


function onboardingEnterSlide(slideNumber){

	let innerHTMLString = "";

	if (slideNumber == 1 ){


		innerHTMLString = '<div class="onboarding-svg-wrapper" id="fmc_onboarding_svg_wrapper">	<svg version="1.1" id="svgCanvas" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-385 -100 962.5 260" >'+
			'<style type="text/css">.dropletst0{opacity:0.298;fill:#248DAE;}.dropletst1{fill:#FFC17E;}.dropletst2{fill:#FFFFFF;}.dropletst3{opacity:0.298;fill:#FFFFFF;}.dropletst4{fill:#7FCFD8;}</style>'+
			'<g id="fmc_onboarding_grouped_icon">'+
			'<ellipse id="dropletShadow" class="dropletst0" cx="96.2" cy="147.4" rx="96.2" ry="12.6"/>'+
			'<g id="dropletOrangeIcon"><path class="dropletst1" d="M122.9,31.5c0,7.2,5.8,13,13,13c7.2,0,13-5.8,13-13s-5.8-13-13-13C128.7,18.5,122.9,24.3,122.9,31.5"/><path class="dropletst2" d="M127.9,31.5h2.2l5.8,3l5.8-3h2.2l-8,4L127.9,31.5z"/><path class="dropletst2" d="M127.9,28.5l8-4l8,4l-8,4L127.9,28.5z"/><path class="dropletst2" d="M135.9,37.5l5.8-3h2.2l-8,4l-8-4h2.2L135.9,37.5z"/></g>'+
			'<g id="droplet">'+
				'<path class="dropletst3" d="M132.7,64.9h-0.2c-2.6,0-4.6,1.1-5.9,3c-1.4-1.9-3.5-3-6.1-3s-4.8,1.1-6.1,3c-1.4-1.9-3.5-3-6.1-3'+
					's-4.8,1.1-6.1,3c-1.3-1.9-3.5-3-6.1-3c-2.6,0-4.8,1.1-6.1,3c-1.3-1.9-3.5-3-6.1-3s-4.8,1.1-6.1,3c-1.4-1.9-3.5-3-6.1-3'+
					's-4.8,1.1-6.1,3c-1.4-1.9-3.5-3-6.1-3c-2.7,0-5.1,1.4-6.4,3.5v16.2c0,2.7,1.4,5.4,3.7,7.1l33.7,24c1.6,1.1,3.5,1.8,5.4,1.8'+
					'c1.9,0,3.8-0.6,5.4-1.8l33.8-24c2.2-1.6,3.7-4.3,3.7-7.1V68.2C137.7,66.1,135.2,64.9,132.7,64.9z M70.3,76.6c-1.1,0-1.9-1-1.9-1.9'+
					'c0-1.1,1-1.9,1.9-1.9c1.1,0,1.9,1,1.9,1.9C72.4,75.6,71.5,76.6,70.3,76.6z M78.8,90c-1.1,0-1.9-1-1.9-1.9c0-1,1-1.9,1.9-1.9'+
					'c1.1,0,1.9,1,1.9,1.9C80.8,89.1,80,90,78.8,90z M87.5,103.5c-1.1,0-1.9-1-1.9-1.9c0-1,1-1.9,1.9-1.9c1.1,0,1.9,1,1.9,1.9'+
					'C89.4,102.5,88.6,103.5,87.5,103.5z M87.5,76.6c-1.1,0-1.9-1-1.9-1.9c0-1.1,1-1.9,1.9-1.9c1.1,0,1.9,1,1.9,1.9'+
					'C89.4,75.6,88.6,76.6,87.5,76.6z M96,90c-1.1,0-1.9-1-1.9-1.9c0-1,1-1.9,1.9-1.9c1.1,0,1.9,1,1.9,1.9C97.9,89.1,97.1,90,96,90z'+
					' M104.6,103.5c-1.1,0-1.9-1-1.9-1.9c0-1,1-1.9,1.9-1.9c1.1,0,1.9,1,1.9,1.9C106.6,102.5,105.8,103.5,104.6,103.5z M104.6,76.6'+
					'c-1.1,0-1.9-1-1.9-1.9c0-1.1,1-1.9,1.9-1.9c1.1,0,1.9,1,1.9,1.9C106.6,75.6,105.8,76.6,104.6,76.6z M113.3,90'+
					'c-1.1,0-1.9-1-1.9-1.9c0-1,1-1.9,1.9-1.9c1.1,0,1.9,1,1.9,1.9C115.2,89.1,114.3,90,113.3,90z M121.8,76.6c-1.1,0-1.9-1-1.9-1.9'+
					'c0-1.1,1-1.9,1.9-1.9c1,0,1.9,1,1.9,1.9C123.7,75.6,122.9,76.6,121.8,76.6z"/>'+
				'<path class="dropletst2" d="M135.7,47.6c-1.1,0-2.1-0.2-3-0.3v37.3c0,0.8-0.3,1.6-1.1,2.1l-33.8,24c-1,0.6-2.2,0.6-3.4,0l-33.8-24'+
					'c-0.6-0.5-1.1-1.3-1.1-2.1V33.8c0-0.8,0.3-1.6,1.1-2.1l33.7-24c0.5-0.3,1.1-0.5,1.8-0.5s1.1,0.2,1.8,0.5L119.4,23'+
					'c1-1.8,2.4-3.4,4-4.8L101.6,2.7c-3.4-2.2-7.7-2.2-10.9,0l-33.8,24c-2.2,1.6-3.7,4.3-3.7,7.1v50.8c0,2.7,1.4,5.4,3.7,7.1l33.7,24'+
					'c1.6,1.1,3.5,1.8,5.4,1.8c1.9,0,3.8-0.6,5.4-1.8l33.8-24c2.2-1.6,3.7-4.3,3.7-7.1V47.2C138,47.4,136.8,47.6,135.7,47.6z"/>'+
			'</g>'+
			'<path id="dropletBigCircleLeft" class="dropletst4" d="M48.4,21.3c2.7,0,4.8-2.2,4.8-4.8c0-2.7-2.2-4.8-4.8-4.8c-2.7,0-4.8,2.2-4.8,4.8 C43.6,19.2,45.8,21.3,48.4,21.3z"/>'+
			'<path id="dropletBigCircleRight" class="dropletst4" d="M157.2,66.8c2.7,0,4.8-2.2,4.8-4.8c0-2.7-2.2-4.8-4.8-4.8s-4.8,2.2-4.8,4.8 C152.4,64.6,154.5,66.8,157.2,66.8z"/>'+
			'<path id="dropletSmallCircle1" class="dropletst4" d="M33.1,104.1c1.3,0,2.4-1.1,2.4-2.4s-1.1-2.4-2.4-2.4c-1.3,0-2.4,1.1-2.4,2.4	S31.8,104.1,33.1,104.1z"/>'+
			'<path id="dropletSmallCircle2" class="dropletst4" d="M16.5,13.3c1.3,0,2.4-1.1,2.4-2.4s-1.1-2.4-2.4-2.4c-1.4-0.1-2.5,1-2.5,2.3 C14,12.2,15.1,13.3,16.5,13.3z"/>'+
			'<path id="dropletSmallCircle3" class="dropletst4" d="M171.6,26.5c1.3,0,2.4-1.1,2.4-2.4s-1.1-2.4-2.4-2.4c-1.3,0-2.4,1.1-2.4,2.4	C169.2,25.4,170.3,26.5,171.6,26.5z"/>'+
			'<path id="dropletSmallCircle4" class="dropletst4" d="M170.4,103.5c1.3,0,2.4-1.1,2.4-2.4s-1.1-2.4-2.4-2.4c-1.3,0-2.4,1.1-2.4,2.4 S169.1,103.5,170.4,103.5z"/>'+
			'<path id="dropletRingLeft" class="dropletst4" d="M23.7,65.2c1.6,0,2.8,1.3,2.8,2.8c0,1.6-1.3,2.8-2.8,2.8s-2.8-1.3-2.8-2.8	C20.9,66.4,22.1,65.2,23.7,65.2 M23.7,63.2c-2.7,0-4.8,2.2-4.8,4.8s2.2,4.8,4.8,4.8s4.8-2.2,4.8-4.8S26.4,63.2,23.7,63.2L23.7,63.2z"/>'+
			'<path id="dropletRingRight" class="dropletst4" d="M126.5,3.8c1.9,0,3.4,1.5,3.4,3.4s-1.5,3.4-3.4,3.4s-3.4-1.5-3.4-3.4	C123.1,5.3,124.6,3.8,126.5,3.8 M126.5,1.8c-3,0-5.4,2.4-5.4,5.4s2.4,5.4,5.4,5.4s5.4-2.4,5.4-5.4S129.5,1.8,126.5,1.8L126.5,1.8z"/>'+
			'</g>'+
			'</svg></div>'+
			'<div id="fmc_onboarding_text_container">'+
			'<h2 id="fmc_onboarding_headline">'+ fmcOnboardingText.slide1.headline +'</h2>'+
			'<p id="fmc_onboarding_text">'+ fmcOnboardingText.slide1.text +'</p></div>'
	}

	if (slideNumber == 2 ){


		innerHTMLString = '<div class="onboarding-svg-wrapper" id="fmc_onboarding_svg_wrapper">	<svg version="1.1" id="svgCanvas" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-385 -100 962.5 260" >'+
			'<style type="text/css">.magnifyingglassst0{fill:#248DAE;fill-opacity:0.298;}.magnifyingglassst1{fill:#7FCFD8;}.magnifyingglassst2{fill:#FFFFFF;fill-opacity:0.298;}.magnifyingglassst3{fill:#FFFFFF;}.magnifyingglassst4{fill:#FFC17E;}</style>'+
			'<g id="fmc_onboarding_grouped_icon">'+
			'<path id="magnifyingGlassShadow" class="magnifyingglassst0" d="M96.2,159.4c53.2,0,96.2-5.7,96.2-12.6c0-7-43.1-12.6-96.2-12.6 C43,134.1,0,139.8,0,146.8C0,153.6,42.9,159.4,96.2,159.4z"/>'+
			'<path id="magnifyingGlassRingRight" class="magnifyingglassst1" d="M152.2,15.7c-4.1,0-7.5-3.4-7.5-7.5c0-4.2,3.3-7.5,7.5-7.5	c4.1,0,7.5,3.4,7.5,7.5S156.2,15.7,152.2,15.7z M152.2,4.7c-2,0-3.5,1.5-3.5,3.5c0,1.9,1.6,3.5,3.5,3.5s3.5-1.6,3.5-3.5	S154.1,4.7,152.2,4.7z"/>'+
			'<path id="magnifyingGlassRingLeft" class="magnifyingglassst1" d="M20.7,63c-1.9,0-3.7-0.8-5-2.1s-1.9-3-1.8-4.8c0-3.7,3-6.7,6.8-6.7 s6.8,3.1,6.8,6.8S24.4,63,20.7,63z M20.7,53.3c-1.5,0-2.8,1.3-2.8,2.8c0,0.8,0.2,1.4,0.7,1.9c0.5,0.6,1.3,0.9,2.1,0.9 c1.5,0,2.8-1.3,2.8-2.8S22.2,53.3,20.7,53.3z"/>'+
			'<path id="magnifyingGlassSmallCircle3" class="magnifyingglassst1" d="M147.9,104c1.3,0,2.4-1.1,2.4-2.4s-1.1-2.4-2.4-2.4c-1.3,0-2.4,1.1-2.4,2.4 S146.4,104,147.9,104z"/>'+
			'<path id="magnifyingGlassSmallCircle2" class="magnifyingglassst1" d="M37.4,13c1.3,0,2.4-1.1,2.4-2.4s-1.1-2.4-2.4-2.4S35,9.3,35,10.6 C35.2,11.9,36.2,13,37.4,13z"/>'+
			'<path id="magnifyingGlassSmallCircle1" class="magnifyingglassst1" d="M33.7,88.8c1.3,0,2.4-1.1,2.4-2.4c0-1.3-1.1-2.4-2.4-2.4s-2.4,1.1-2.4,2.4 C31.4,87.7,32.4,88.8,33.7,88.8z"/>'+
			'<path id="magnifyingGlassCloudLeft" class="magnifyingglassst2" d="M75.2,114c0-3.7-2.9-6.4-6.5-6.4c-1.9,0-3.7,0.9-4.9,2.2 c-1.6-3.4-5.1-5.7-9.1-5.7c-5.4,0-9.8,4.1-10.1,9.5l-10.2,3h10.2H74h0.3h9L75.2,114z"/>'+
			'<path id="magnifyingGlassCloudRight" class="magnifyingglassst2" d="M163.7,78.7c0-3.7-2.9-6.4-6.5-6.4c-1.9,0-3.7,0.9-4.9,2.2 c-1.6-3.4-5.1-5.7-9.1-5.7c-5.4,0-9.8,4.1-10.1,9.5l-10.2,3h10.3h29.4h0.3h9L163.7,78.7z"/>'+
			'<g id="magnifyingGlass"><path class="magnifyingglassst2" d="M121.7,51h-3.3c-0.9,0-1.8,0.5-2.2,1.3L111,62.8c-3-12.9-9.4-40.3-9.7-41.5c-0.3-1.1-1.4-1.9-2.5-1.8 c-1.2,0.1-2.1,1-2.2,2.1v0.1l-6,45.1L82.5,36c-0.3-1-1.1-1.7-2.1-1.8s-2,0.4-2.4,1.4L70.5,51H39.2c-1.3,0-2.4,1.1-2.4,2.4 c0,1.3,1.1,2.4,2.4,2.4h32.7c0.9,0,1.8-0.5,2.2-1.4l5.3-10.9l9.5,36.6c0.3,1.1,1.2,1.8,2.3,1.8c0.1,0,0.1,0,0.2,0 c1.2-0.1,2.1-1,2.3-2.1l5.9-44.4c2.5,10.6,5.9,25.5,8.2,35.1c0.2,1,1.1,1.7,2.1,1.9c1,0.1,2-0.4,2.5-1.3l7.5-15.2h4.8 C123.4,54.5,122.4,52.7,121.7,51"/><path class="magnifyingglassst3" d="M127.4,23.8c1.8-1.6,3.9-2.9,6.2-3.9c-8.9-11.6-22.9-19-38.6-19c-24.8,0-45.3,18-48.2,42.8h7.3 c2.8-20,20-35.6,40.8-35.6C108.2,8.2,119.9,14.3,127.4,23.8"/><path class="magnifyingglassst3" d="M139.7,135.6c1.6,3.7-0.1,8-3.8,9.6c-3.8,1.6-8.1-0.1-9.7-3.8l-18.8-45.2c-3.9,1-8,1.6-12.3,1.6 c-22,0-40.6-15.3-46.5-34.7h7.6c5.7,15.7,21,27.4,38.9,27.4c18,0,33.3-11.7,38.9-27.8c2.2,0.9,4.6,1.5,7.2,1.6	c-3.6,11-11,20.2-20.6,26.2L139.7,135.6z"/></g>'+
			'<g id="magnifyingGlassOrangeIcon"><path class="magnifyingglassst4" d="M157.9,41.3c0,8.7-7.1,15.8-15.8,15.8s-15.8-7.1-15.8-15.8s7.1-15.8,15.8-15.8 C150.9,25.7,157.9,32.7,157.9,41.3"/><path class="magnifyingglassst3" d="M141.9,35.7c3.1,0,5.6,2.5,5.6,5.6s-2.5,5.6-5.6,5.6s-5.6-2.5-5.7-5.6C136.2,38.2,138.7,35.7,141.9,35.7"/><path class="magnifyingglassst3" d="M148.9,40c0.8,0.4,1.5,0.7,2.5,1.1c-1,0.4-1.7,0.8-2.5,1.2V40z"/><path class="magnifyingglassst3" d="M137.2,35.7c-0.6,0.6-1,1.1-1.6,1.8c-0.4-0.9-0.7-1.6-1.1-2.6C135.4,35.2,136.2,35.5,137.2,35.7"/><path class="magnifyingglassst3" d="M148.2,37.5c-0.6-0.6-1-1.1-1.6-1.7c0.9-0.3,1.7-0.6,2.4-0.8c0.1,0.1,0.1,0.1,0.2,0.2 C148.9,35.8,148.7,36.7,148.2,37.5"/> <path class="magnifyingglassst3" d="M134.7,47.3c0.3-0.7,0.6-1.4,1-2.3c0.6,0.6,1,1.1,1.6,1.7c-0.9,0.3-1.7,0.6-2.4,0.8 C134.7,47.5,134.7,47.3,134.7,47.3"/><path class="magnifyingglassst3" d="M132.7,41c0.7-0.3,1.4-0.6,2.3-1v2.3c-0.8-0.4-1.5-0.7-2.3-1C132.4,41.2,132.4,41.2,132.7,41"/><path class="magnifyingglassst3" d="M148.2,45c0.4,0.9,0.7,1.6,1,2.3c0,0.1-0.1,0.1-0.1,0.2c-0.8-0.2-1.5-0.5-2.5-0.8 C147.2,46,147.7,45.7,148.2,45"/><path class="magnifyingglassst3" d="M140.9,48.5h2.3c-0.4,0.8-0.7,1.5-1,2.3h-0.3C141.4,50,141.2,49.2,140.9,48.5"/><path class="magnifyingglassst3" d="M141.9,31.8c0.3,0.7,0.6,1.5,1,2.3h-2.3c0.4-0.8,0.7-1.6,1-2.3C141.9,31.8,141.9,31.8,141.9,31.8"/></g>'+
			'</g>'+
			'</svg></div>'+
			'<div id="fmc_onboarding_text_container">'+
			'<h2 id="fmc_onboarding_headline">'+ fmcOnboardingText.slide2.headline +'</h2>'+
			'<p id="fmc_onboarding_text">'+ fmcOnboardingText.slide2.text +'</p></div>'
		}

		if (slideNumber == 3 ){


			innerHTMLString = '<div class="onboarding-svg-wrapper" id="fmc_onboarding_svg_wrapper">	<svg version="1.1" id="svgCanvas" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-385 -100 962.5 260" >'+
				'<style type="text/css">.chatBubblest0{fill:#248DAE;fill-opacity:0.298;}.chatBubblest1{fill:#7FCFD8;}.chatBubblest2{fill:#FFFFFF;fill-opacity:0.298;}.chatBubblest3{fill:#FFFFFF;}.chatBubblest4{fill:#FFFFFF;fill-opacity:0.2;}.chatBubblest5{fill:#FFC17E;}.chatBubblest6{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}</style>'+
				'<g id="fmc_onboarding_grouped_icon">'+
				'<ellipse id="chatBubbleShadow" class="chatBubblest0" cx="80.5" cy="123.8" rx="80" ry="10.5"/>'+
				'<path id="chatBubbleBigCircleLeft" class="chatBubblest1" d="M41,36.3c2.2,0,4-1.8,4-4s-1.8-4-4-4s-4,1.8-4,4S38.8,36.3,41,36.3z"/>'+
				'<path id="chatBubbleBigCircleRight" class="chatBubblest1" d="M97.2,32.3c2.2,0,4-1.8,4-4s-1.8-4-4-4s-4,1.8-4,4S95,32.3,97.2,32.3z"/>'+
				'<path id="chatBubbleSmallCircle2" class="chatBubblest1" d="M14.2,12.3c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2C12.2,11.4,13.1,12.3,14.2,12.3z"/>'+
				'<path id="chatBubbleSmallCircle4" class="chatBubblest1" d="M142.2,87.3c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S141.1,87.3,142.2,87.3z"/>'+
				'<path id="chatBubbleSmallCircle3" class="chatBubblest1" d="M143.2,23.3c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S142.1,23.3,143.2,23.3z"/>'+
				'<path id="chatBubbleSmallCircle1" class="chatBubblest1" d="M28,87.7c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2C26,86.8,26.9,87.7,28,87.7z"/>'+
				'<g id="chatBubbleRingRight"><path class="chatBubblest1" d="M105.7,4.7c1.4,0,2.5,1.1,2.5,2.5s-1.1,2.5-2.5,2.5s-2.5-1.1-2.5-2.5S104.3,4.7,105.7,4.7 M105.7,2.7 c-2.5,0-4.5,2-4.5,4.5s2,4.5,4.5,4.5s4.5-2,4.5-4.5S108.2,2.7,105.7,2.7L105.7,2.7z"/></g>'+
				'<g id="chatBubbleRingLeft"><path class="chatBubblest1" d="M20.2,55.7c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S19.1,55.7,20.2,55.7 M20.2,53.7c-2.2,0-4,1.8-4,4s1.8,4,4,4 s4-1.8,4-4S22.4,53.7,20.2,53.7L20.2,53.7z"/></g>'+
				'<g id="chatBubble"><path class="chatBubblest3" d="M122.2,61.7c-0.6,0-1.2,0-1.8-0.1v46.6l-10.6-10H54.5c-1.5,0-2.8-1.2-2.8-2.8V47.6c0-1.5,1.2-2.8,2.8-2.8h49.1 c-0.1-0.6-0.1-1.2-0.1-1.8s0-1.2,0.1-1.8H54.5c-3.5,0-6.3,2.8-6.3,6.3v47.9c0,3.5,2.8,6.3,6.3,6.3h53.9l15.5,14.7V61.6 C123.4,61.7,122.8,61.7,122.2,61.7z"/><path class="chatBubblest4" d="M103.5,43h-49C52,43,50,45,50,47.6v47.9c0,2.5,2.1,4.6,4.6,4.6h54.6l13,12.4V61.7	C111.9,61.7,103.5,53.3,103.5,43z"/><path class="chatBubblest3" d="M37,121.5l12.2-11.6h51.1c2.3,0,4.3-1.9,4.3-4.3V60.8c0-2.3-1.9-4.3-4.3-4.3H41.3c-2.3,0-4.3,1.9-4.3,4.3"/></g>'+
				'<g id="chatBubbleOrangeIcon"><path class="chatBubblest5" d="M109.2,43c0,7.2,5.8,13,13,13s13-5.8,13-13s-5.8-13-13-13S109.2,35.8,109.2,43"/><path class="chatBubblest6" d="M129.6,49.8c0,0-4.6,0.8-7.4,0.8c-2.8,0-7.4-0.8-7.4-0.8s0.8-3.4,0.9-3.8c0.1-0.4,0.6-0.8,1.1-0.9	c0.4-0.1,2.1-0.5,2.7-0.6c0.6-0.1,0.8-0.8,0.8-0.8s0-0.1,0-1c-0.4-0.3-0.7-1-0.7-1.4c-0.1,0-0.2,0-0.3-0.1 c-0.1-0.1-0.1-0.4-0.2-0.6c0-0.2-0.1-0.4-0.1-0.7c0-0.4,0-0.5,0.1-0.6c0.1,0,0.1,0,0.2,0c-0.4-1.9,0.8-4,2.9-4s3.3,2,2.9,4	c0.1,0,0.1,0,0.2,0c0.1,0.1,0.1,0.2,0.1,0.6c0,0.3-0.1,0.5-0.1,0.7c0,0.2-0.1,0.5-0.2,0.6c-0.1,0.1-0.2,0.1-0.3,0.1	c0,0.4-0.3,1-0.7,1.4c0,1,0,1,0,1s0.2,0.7,0.8,0.8c0.6,0.1,2.3,0.5,2.7,0.6c0.4,0.1,0.9,0.5,1.1,0.9 C128.8,46.5,129.6,49.8,129.6,49.8z"/></g>'+
				'</g>'+
				'</svg></div>'+
				'<div id="fmc_onboarding_text_container">';
			if (window.fmcChatStatus != "online"){
				innerHTMLString += '<h2 id="fmc_onboarding_headline">'+ fmcOnboardingText.slide3.headline_no_chat +'</h2>'+
				'<p id="fmc_onboarding_text">'+ fmcOnboardingText.slide3.text_no_chat +'</p>';
			}else{
				innerHTMLString += '<h2 id="fmc_onboarding_headline">'+ fmcOnboardingText.slide3.headline +'</h2>'+
				'<p id="fmc_onboarding_text">'+ fmcOnboardingText.slide3.text +'</p>';
			}
			innerHTMLString += '<div id="fmc_finish_onboarding_button" class="fmc-main-button" onclick="onboardingAnalyzeButton();">'+ fmcOnboardingText.slide3.button +'</div></div>'
		}

	onboardingUpdateCanvas(innerHTMLString);

}



function onboardingUpdateCanvas(innerHTMLString){
	document.getElementById("fmc_onboarding_animation_container").innerHTML = innerHTMLString;
	if (onboarding.currentSlide == 1){
		document.getElementById("fmc_onboarding_back_button_container").classList.add("onboarding-inactive-button");
	}
	if (onboarding.currentSlide == 2){
		document.getElementById("fmc_onboarding_back_button_container").classList.remove("onboarding-inactive-button");
		document.getElementById("fmc_onboarding_next_button_container").classList.remove("onboarding-inactive-button");
	}
	if (onboarding.currentSlide == 3){
		document.getElementById("fmc_onboarding_next_button_container").classList.add("onboarding-inactive-button");
		setTimeout(()=>{
			document.getElementById("fmc_finish_onboarding_button").style.opacity = 1;
		},500);
	}
	setTimeout(()=>{
		document.getElementById("fmc_onboarding_headline").style.opacity = 1;
		document.getElementById("fmc_onboarding_text").style.opacity = 1;
	},1500);


}

function onboardingPrevSlide(){
	fmcSendGA("mainFlow","onboarding back clicked");
	if(onboarding.currentSlide > 1){
		document.getElementById("fmc_onboarding_grouped_icon").classList.toggle("vanish-right");
		document.getElementById("fmc_onboarding_text_container").classList.toggle("vanish-right");
		setTimeout(()=>{
			document.getElementById("fmc_onboarding_animation_container").innerHTML = "";
			onboarding.currentSlide -= 1;
			onboarding.currentSlide = Math.max(1,onboarding.currentSlide);
			onboardingEnterSlide(onboarding.currentSlide);
		},300);
	}
}

function onboardingNextSlide(){
	fmcSendGA("mainFlow","onboarding next clicked");
	if(onboarding.currentSlide < 3){
		document.getElementById("fmc_onboarding_grouped_icon").classList.toggle("vanish-left");
		document.getElementById("fmc_onboarding_text_container").classList.toggle("vanish-left");
		setTimeout(()=>{
			document.getElementById("fmc_onboarding_animation_container").innerHTML = "";
			onboarding.currentSlide += 1;
			onboarding.currentSlide = Math.min(3,onboarding.currentSlide);
			onboardingEnterSlide(onboarding.currentSlide);
		},400);
	}
}

let fmcSecretFScounter =0;
function fmcSecretlyActivateFullScreenIcons(){
	fmcSecretFScounter++;
	if (fmcSecretFScounter > 10){
		fmcShowFullScreenToggleIcons=true;
		updateClassesDueWidth();
	}
}
let savedScrollTopPosition;
let savedHtmlHeight;
let savedBodyHeight;
function fmcToggleFullscreen(){
	if (fmc_isEmbed && fmcAllowFullScreen){
		if (dmlfmcWrapperElement.classList.contains("fmcFullScreen")){
			dmlfmcWrapperElement.classList.remove("fmcFullScreen");
			document.getElementsByTagName("html")[0].style.height = "auto";//savedHtmlHeight + "px";
			document.getElementsByTagName("body")[0].style.height = "auto"; +  "px";
			document.getElementById("fmc_fullScreenToggleIcon").style.backgroundImage = 'url("https://skinanalysis.me/img/fullScreenIcon.svg")';
			console.log("quit full screen");
			fmcSendGA("main flow", "quit full screen - " + window.fmc_curPage );
		}else{
			savedHtmlHeight = document.getElementsByTagName("html")[0].offsetHeigth;
			savedBodyHeight = document.getElementsByTagName("body")[0].offsetHeigth;
			document.getElementsByTagName("html")[0].style.height = "100vh";
			document.getElementsByTagName("body")[0].style.height = "100vh";
			dmlfmcWrapperElement.classList.add("fmcFullScreen");
			document.getElementById("fmc_fullScreenToggleIcon").style.backgroundImage = 'url("https://skinanalysis.me/img/fullScreenQuitIcon.svg")';
			console.log("toggle full screen");
			fmcSendGA("main flow", "enter full screen - " + window.fmc_curPage );
		}
	}
}

let fmcShowFullScreenToggleIcons = false;
let fmcShowFullScreenIcon = () => {
	if (fmcShowFullScreenToggleIcons && fmcAllowFullScreen){
		if (fmc_showNavbar){
				document.getElementById("fmc_fullScreenToggleIcon").style.top = "50px";
		}
		document.getElementById("fmc_fullScreenToggleIcon").style.display = "block";
	}
}

let updateClassesDueWidth = () =>{

	let fmcbody = document.getElementById("fmcBody");

	fmcbody.classList.remove("fmc_768","fmc_1200")

	if (fmcbody.offsetWidth <= 768){
	  fmcbody.classList.add("fmc_768");
		let menuList = document.getElementById("fmc_nav_menu").innerHTML;
		if (menuList != ""){
			document.getElementById("fmc_mobile_menu").innerHTML = menuList;
			document.getElementById("fmc_nav_menu").innerHTML = "";
		}
		if (window.fmc_isEmbed ){
			fmcAllowFullScreen = true;
		}
		if (window.location.href.indexOf("dermalogica.com/") > -1 || window.location.href.indexOf("localhost:5000") > -1 || window.location.href.indexOf("192.168.0.201:5000") > -1){
			fmcShowFullScreenToggleIcons = true;
		}
		if (fmcShowFullScreenToggleIcons){
			fmcShowFullScreenIcon();
			fmcToggleFullscreen();
		}
	}else if(fmcbody.offsetWidth < 1200){
	  fmcbody.classList.add("fmc_1200");
	}
}

let fmcOpenHambugerMenu = ()=>{
	var  mobMenu= document.getElementById("fmc_mobile_menu");


  if (mobMenu.offsetHeight <= 1) {
    mobMenu.style.height = "144px";
  } else {
    mobMenu.style.height = "0";
  }
}

function showScreen(screenNumber){
	let fmcBodyElement = document.getElementById('fmcBody');

	if (screenNumber == 1){
		fmcSendGA("mainFlow","Start Page (Screen1)");
		fmcSendGAIndia("mainFlow","Start Page (Screen1)");
		window.fmc_curPage = "landingPage";
	}else if (screenNumber == 2){
		fmcSendGA("mainFlow","Onboaring (Screen2)");
		window.fmc_curPage = "onboardingPage";
	}else if (screenNumber == 3){
		fmcSendGA("mainFlow","Capture/Upload (Screen3)");
		fmcSendGAIndia("mainFlow","Capture/Upload (Screen3)");
		window.fmc_curPage = "cameraUploadPage";
	}else	if (screenNumber == 4){
		fmcSendGA("mainFlow","Analyzing and Error Page (Screen4)");
		window.fmc_curPage = "analyzingPage";
	}else if (screenNumber == 5){
		window.fmc_curPage = "resultPage";
	}
	if (screenNumber == 2){
		fmcIsOnboardingScreen = true;
		document.getElementById("fmc_fullScreenToggleIcon").style.left = "10px";
		document.getElementById("fmc_fullScreenToggleIcon").style.right = "unset";
	}else{
		fmcIsOnboardingScreen = false;
		document.getElementById("fmc_fullScreenToggleIcon").style.left = "unset";
		document.getElementById("fmc_fullScreenToggleIcon").style.right = "10px";
	}

	if (screenNumber == 2 && fmcChatStatus == "online"){
		document.getElementById("fmc_fixed_chat_button").style.display = "none";
	}
	if (screenNumber != 2 && fmcChatStatus == "online"){
		document.getElementById("fmc_fixed_chat_button").style.display = "block";
		fmcIsOnboardingScreen = false;
	}

	if (screenNumber != 5){
		if (window.intellimize){
			console.log("page updated");
			intellimize.activate();
		}
	}


	if (fmcBodyElement.offsetWidth > mobileWidth ){
		if (!window.fmc_isEmbed){
			//document.getElementById("dmlfmcwgt_GlobalContainer").style.minHeight = window.innerHeight+"px";
			//document.getElementById("fmcBody").style.backgroundSize = "c";
		}else{
			//document.getElementById("fmc_screen1").style.marginTop = "20%";
		}
		if (screenNumber == 1){
			let fmcBody = document.getElementById("fmcBody");
			document.getElementById("fmc_screen1").style.height = fmcBody.offsetHeight + "px";
			let analysisCont = document.getElementById("fmc_landing_analysis_container");
			let bodyWidth = fmcBody.offsetWidth;
			let bodyHeight = fmcBody.offsetHeight;

			let ratio = bodyHeight/bodyWidth;

			if (ratio >= 1600/2846){
				analysisCont.style.top = "72.2%";
			}else{
				let newPerc = 1-(bodyWidth * 1600/2846 * 0.274 / bodyHeight);
				analysisCont.style.top = newPerc*100 + "%";
			}
			fmcBodyElement.classList.add('fmc-desktop-screen1-background');


		}else{
			fmcBodyElement.classList.add('fmc-desktop-screen2-background');
			fmcBodyElement.classList.remove('fmc-desktop-screen1-background');
		}
	}else{
		if (screenNumber == 1){
			fmcBodyElement.classList.add('fmc-mobile-screen1-background');

			let fmcBody = document.getElementById("fmcBody");
			document.getElementById("fmc_screen1").style.height = fmcBody.offsetHeight + "px";
			let analysisCont = document.getElementById("fmc_landing_analysis_container");
			let bodyWidth = fmcBody.offsetWidth;
			let bodyHeight = fmcBody.offsetHeight;

			let ratio = bodyHeight/bodyWidth;

			if (ratio >= 1600/2846){
				//analysisCont.style.top = "72.2%";
			}else{
				let newPerc = 1-(bodyWidth * 1600/2846 * 0.274 / bodyHeight);
				//analysisCont.style.top = newPerc*100 + "%";
			}
		}
	}

	if(screenNumber != 1){
		fmcBodyElement.classList.add('fmc-non-landing-bg');
	}

	if (screenNumber==2){
		fmcBodyElement.classList.remove('fmc-background-ind');
		setTimeout(()=>{
			onboardingEnterSlide(1); // CHANGED HOW SCREEN2 IS BEING INITIATED
			setTimeout(()=>{
				let innerCont =  document.querySelector("#fmc_screen2 .fmc_inner-container");
				let innerContBotPos = innerCont.offsetHeight + innerCont.offsetTop;
				if (document.getElementById("fmcBody").offsetHeight < innerContBotPos){
					document.getElementById("fmcBody").style.height = innerContBotPos*1.05 + "px";
				}
			},100)
		},500);
	}

	if (screenNumber == 3) {
		fmcStartCountDown = true;

		document.getElementById('fmc_screen3').style.opacity = 1;

		if (fmc_directlyToUploadLink){
			document.getElementById("fmc_camera_denied_container").style.display="block";
			//document.getElementById("fmc_best_results_container").style.display = "none";
			document.getElementById("fmc_camera_access_container").style.display="none";
		}else{
			if (!fmc_uploadButtonUsed){
				document.getElementById("fmc_camera_access_container").style.display="block";	
			}
			onPlayDelayTimeout = setTimeout(()=>{
				document.getElementById("fmc_image_delayed_upload_button").style.left = 0.5*(document.getElementById("fmcBody").offsetWidth - document.getElementById("fmc_image_delayed_upload_button").offsetWidth) + "px";
				document.getElementById("fmc_image_delayed_upload_button").style.opacity = "1";
				document.getElementById("fmc_image_delayed_upload_button").style.pointerEvents = "all";
				document.getElementById("fmc_loading_spinner").style.display = "none";
		 	},6000);

			run();
		}

	} else {
		//document.querySelector('.fmc-global-container').classList.remove('screen3-maxwidth');
	}

	if (screenNumber == 4){
		if (fmcStartCountDown){
			startProgressBar();
		}
	}

	var screens = document.querySelectorAll('.fmc_screen')
	for (i = 0; i < screens.length; i++){
			var screen = screens[i]
			let appPrefix = "fmc_";
			if (screen.id== appPrefix + "screen"+screenNumber){
					screen.className = "fmc_screen"
			}
			else{
					screen.className = "fmc_screen fmc_invisible"
			}
	}
	if (screenNumber == 5) {
		logOnLocalHostFrontEnd("SHOW SCREEN 5")
		try{ //fmc/sendUserEmail
			document.getElementById("fmc_email_form_tag").setAttribute("action",window.fmc_backendToUse + "/fmc/sendUserEmail")
		}catch(err){
			console.error("error in setting from action - ",err)
		}

		fmcUpdateMaskOverlays();
		if (fmc_showNavbar){
			document.getElementById("fmc_nav_bar").style.display = "block";
		}
		 if (document.getElementById("fmc_msk_banner").style.display == "block"){
			 fmcSendGA("main flow", "showing MSK banner");
		 }

	}else{
		document.getElementById("fmcBody").style.paddingBottom = "0";
	}
}

let askForEmailHighTraficMode = ()=>{
	fmcSendGA("mainFlow","analyze image - high traffic mode");

	clearTimeout(analyzeBootstrapTimer);

	document.getElementById("fmc_loading_analyze_content").style.display = "none";
	document.getElementById("fmc_high_traffic_mode_container").style.display = "block";
	document.getElementById("fmc_high_traffic_mode_email").innerHTML = document.getElementById("fmc_submit_form").innerHTML;

	document.getElementById("fmc_submit_form").innerHTML = "";

	try{
		document.getElementById("fmc_submit_form_hashid").value = window.facemap.hashid;
	}catch(err){
		logOnLocalHostFrontEnd(err);
	}
	if (window.fmc_backendToUse != "https://imb-backend-eu.herokuapp.com" && window.fmc_backendToUse != "https://imb-backend-ca.herokuapp.com"){
		logOnLocalHostFrontEnd("checkbox set by default")
		document.getElementById("fmc_email_submit_checkbox").checked = 1;
		document.getElementById("fmc_popup_checkbox").checked = 1;
		document.getElementById("fmc_submit_form_subscribe").value = "1";
	}
	let buttonWidth = document.getElementById("fmc_email_submit_button").offsetWidth;
	let fieldWidth = document.getElementById("fmc_email_input_send_container").offsetWidth;
	document.getElementById("fmc_submit_form_email").style.width = (fieldWidth - buttonWidth - 2) + "px";

}

let skipCounter =0;
let skipToResults=()=>{
	skipCounter += 1;
	logOnLocalHostFrontEnd("skip counter: ", skipCounter);
}

let skipIntro = ()=>{
	fmcSendGA("mainFlow","skip intro clicked");
	if (skipCounter > 5){
		devAnalyzeProgress();
	}else{
		showScreen(3);
	}
}

let onboardingAnalyzeButton = ()=>{
	fmcSendGA("mainFlow","onboarding analyze clicked");
	showScreen(3);
}


let calcDehydrScore = 2;
let calcDarkCircleScore = 2;

let analyzeImage = (canvasId="fmc_camera_canvas")=>{

	//document.getElementById(canvasId).style.opacity = 1;

	fmcCropToFace(canvasId)
	.then((canvasIdAfterCrop)=>{
		logOnLocalHostFrontEnd("face crop successful");
		fmcLimitImageSize(canvasIdAfterCrop)
		.then((canvasIdAfterLimit)=>{
			logOnLocalHostFrontEnd("canvas Id before calc Concerns: ", canvasIdAfterLimit)

			let finalImgUrl = document.getElementById(canvasIdAfterLimit).toDataURL("image/jpeg");
			let canvas_score = document.getElementById(canvasIdAfterLimit);
			let ctx_score = canvas_score.getContext("2d");

			let concernImage = new Image();


			concernImage.onload = ()=>{

				//console.log(concernImage.width, concernImage.height);

				//canvas_score.width = concernImage.width;
				//canvas_score.height = concernImage.height;
				ctx_score.drawImage(concernImage,0,0,canvas_score.width,canvas_score.height);

				fmcCalcConcerns(canvasIdAfterLimit)
				.then((res)=>{
					logOnLocalHostFrontEnd("calculated concern scores: ", res.concerns);
					calcDehydrScore = Number(res.concerns.dehydration);
					calcDarkCircleScore = Number(res.concerns.darkCircles);
					let plainImgUrl = document.getElementById(res.canvasId).toDataURL("image/jpeg");

					sendImageToBackend(plainImgUrl)
					.then((fmcRes)=>{

						logOnLocalHostFrontEnd("ANALYZE RESPONSE: ",fmcRes);

						fmcBuildAndUpdateAfterFMCResult(fmcRes)

					})
					.catch((fmcErr)=>{
						console.error("error in sendImageToBackend call - ", fmcErr);
					})

				})
				.catch((err)=>{
					logOnLocalHostFrontEnd("error in calculate concerns - ",err);
					let imgUrl = document.getElementById(canvasIdAfterLimit).toDataURL("image/jpeg");

					sendImageToBackend(imgUrl)
					.then((fmcRes)=>{
						logOnLocalHostFrontEnd("ANALYZE RESPONSE: ",fmcRes);
						fmcBuildAndUpdateAfterFMCResult(fmcRes)
					})
					.catch((fmcErr)=>{
						console.error("error in sendImageToBackend call - ", fmcErr);
					});
				})
			}

			concernImage.src = finalImgUrl;


		})
		.catch((err)=>{
			console.log("error in limiting image size - ",err);
			let imgUrl = document.getElementById(canvasIdAfterCrop).toDataURL("image/jpeg");

			sendImageToBackend(imgUrl)
			.then((fmcRes)=>{
				logOnLocalHostFrontEnd("ANALYZE RESPONSE: ",fmcRes);
				fmcBuildAndUpdateAfterFMCResult(fmcRes)
			})
			.catch((fmcErr)=>{
				console.log("error in sendImageToBackend call - ", fmcErr);
			});
		})
	})
	.catch((err)=>{
		console.log("error in croping face - ",err);
		let imgUrl = document.getElementById(canvasId).toDataURL("image/jpeg");

		sendImageToBackend(imgUrl)
		.then((fmcRes)=>{
			logOnLocalHostFrontEnd("ANALYZE RESPONSE: ",fmcRes);
			fmcBuildAndUpdateAfterFMCResult(fmcRes)
		})
		.catch((fmcErr)=>{
			console.log("error in sendImageToBackend call - ", fmcErr);
		});
	})
}

let fmcSavedBRres= {
	reqRes:"",
	errRes:""
};



let getEstimatedResult = ()=>{

	return new Promise((resolve,reject)=>{
		let xhr = new XMLHttpRequest();

		xhr.open("GET", window.fmc_backendToUse+"/fmc/default-values?country="+fmcUserCountry+"&lang="+fmcUsedLanguageCode);

		xhr.onreadystatechange = function(){

			try{
				if(this.readyState == 4 && this.responseText != ""){
					let response;

					if (typeof this.responseText == "string"){
						response = JSON.parse(this.responseText);
					}else{
						response = this.responseText;
					}
					logOnLocalHostFrontEnd("response for estimated result: ", response);

					if (fmc_useSkinIo){
						let indicesToRemove = []
						response.concerns.forEach((concern,index)=>{
							if (concern.name == "dark_circles" || concern.name == "dehydration"){
								indicesToRemove.push(index);
							}
						})
						let removeLength = indicesToRemove.length;
						for (let ii=1; ii <= removeLength; ii++){
							response.concerns.splice(indicesToRemove[removeLength-ii],1)
						}

					}

					resolve(response);
				}

			}catch(err){
				reject(err);
			}
		}

		xhr.send();
	});
}






let retryCapturing = ()=>{
	progressStartCounter++;
	document.getElementById("fmc_imageUploadInput").value = null;
	document.getElementById("fmc_loading_analyze_progress_bar").style.width = "0%";
	document.getElementById("fmc_loading_analyze_perc_number").innerHTML = "0";
	document.getElementById("fmc_upload_message").style.display="none";
	fmcResultFinished = false;
	setTimeout(()=>{
		document.getElementById("fmc_loading_error_content").style.display = "none";
		document.getElementById("fmc_loading_analyze_content").style.display = "block";
		document.getElementById("fmc_upload_parts").style.display="block";
		document.getElementById("fmc_upload_message").style.display="none";
	},100)
	showScreen(3);
}

let skipConsent = false;
setTimeout(()=>{
	if (document.getElementById("fmc_start_button").style.opacity == 0){
		skipConsent = true;
		document.getElementById("fmc_start_button").style.opacity = 1;
		document.getElementById("fmc_start_button").style.pointerEvents = "all";
		fmcSendGA("main flow","GDPR problem - showing CTA without consent");
	}
},7000)

function fmcFirstButtonClicked(){

	if (skipConsent){
		fmcSendGA("main flow","GDPR problem - go to Screen 2 with CTA");
		showScreen(2);
	}else{

		fmcSendGA("main flow","open consent with CTA");
		document.getElementById("fmc_legalConsentOverlay").style.opacity = 1;
		document.getElementById("fmc_legalConsentOverlay").style.display = "block";
	}
}

function fmcConsentClicked(){
	fmcSendGA("main flow","consent clicked");
	fmcSendGAIndia("main flow","consent clicked");
	fmcUserConsentTrue = true;
	document.getElementById("fmc_legalConsentOverlay").style.opacity = 0;
	document.getElementById("fmc_legalConsentOverlay").style.display = "none";
	showScreen(2);
}

function fmcCancelLegalContent(){
	fmcSendGA("main flow","consent canceled");
	document.getElementById("fmc_legalConsentOverlay").style.opacity = 0;
	setTimeout(()=>{
		document.getElementById("fmc_legalConsentOverlay").style.display = "none";
	},500);
}

let runPercNumber = (numberEnd,cb=()=>{})=>{
	let percCount = document.getElementById("fmc_loading_analyze_perc_number");
	let numberStart = Number(percCount.innerHTML);
	for (let ii = numberStart + 1 ; ii<numberEnd +1; ii++ ){
		setTimeout(()=>{
			percCount.innerHTML = ii;
			if (ii == numberEnd){
				cb("done");
			}
		},20 * (ii - numberStart));
	}
}

let devAnalyzeProgress = ()=>{
	fmcSendGA("mainFlow","dev analyze progress - skipping capture and analyze");
	let currentPerc = 0;
	fmc_email_captured = true;
	showScreen(4);

	let demoHashId;
	let beString;

	if (window.fmc_backendToUse == "https://imb-staging.herokuapp.com"){
		demoHashId = "a0ef6d0190214fce992e877e2a518b36";
		beString = "stg";
	}else if(window.fmc_backendToUse == "https://imb-backend-eu.herokuapp.com"){
		demoHashId = "57525607e2644743af6b7c7f153c47e7";
		beString = "eu";
	}else if(window.fmc_backendToUse == "https://imb-backend-ca.herokuapp.com"){
		demoHashId = "24b16e9ebf56472288eb4ee1e4a8a6f4";
		beString = "ca";
	}else{
		demoHashId = "5fe15fcbbc5b403ebedd7a46b479a5ab";
		beString = "us";
	}



	getFaceMapResult({hashId: demoHashId})
	.then((hashIdResponse)=>{

		fmcBuildAndUpdateAfterFMCResult(hashIdResponse)


	})
	.catch((HashErr)=>{
		console.error("Error in getting hashId result - ", HashErr);
		window.open(window.location.href.split("?")[0].split("/results/")[0], "_self");
	})

}

let progressStartCounter = 0;
let startProgressBar = ()=>{
	let currentProgressCounter = progressStartCounter;
	let averageWaitingSecs = 30;
	let progressBar = document.getElementById("fmc_loading_analyze_progress_bar");
	let curPerc;
	setTimeout(()=>{
		if (!fmcResultFinished && currentProgressCounter == progressStartCounter){
			curPerc = Math.floor(Math.random() * 10 + 5);
			progressBar.style.width = curPerc + "%";
			runPercNumber(curPerc);
		}
	},1000*0.1*averageWaitingSecs)
	setTimeout(()=>{
		if (!fmcResultFinished && currentProgressCounter == progressStartCounter){
			curPerc = Math.floor(Math.random() * 10 + 25);
			progressBar.style.width = curPerc + "%";
			runPercNumber(curPerc);
		}
	},1000*0.3*averageWaitingSecs)
	setTimeout(()=>{
		if (!fmcResultFinished && currentProgressCounter == progressStartCounter){
			curPerc = Math.floor(Math.random() * 10 + 35);
			progressBar.style.width = curPerc + "%";
			runPercNumber(curPerc);
		}
	},1000*0.4*averageWaitingSecs)
	setTimeout(()=>{
		if (!fmcResultFinished && currentProgressCounter == progressStartCounter){
			curPerc = Math.floor(Math.random() * 10 + 65);
			progressBar.style.width = curPerc + "%";
			runPercNumber(curPerc);
		}
	},1000*0.7*averageWaitingSecs)
}

let endProgressBar = ()=>{
	progressStartCounter++;
	clearTimeout(analyzeBootstrapTimer);
	fmcResultFinished = true;
	let progressBar = document.getElementById("fmc_loading_analyze_progress_bar");
	setTimeout(()=>{
		progressBar.style.width = "100%";
		runPercNumber(100,(result)=>{});
	},1000)
}

function fmcUpdateBrowserState(fmcObj){

	let beString;

	if (window.fmc_backendToUse == "https://imb-staging.herokuapp.com"){
		beString = "stg";
	}else if(window.fmc_backendToUse == "https://imb-backend-eu.herokuapp.com"){
		beString = "eu";
	}else if(window.fmc_backendToUse == "https://imb-backend-ca.herokuapp.com"){
		beString = "ca";
	}else{
		beString = "us";
	}

	let concernString="";

	if (!fmcObj.faked){
		let concernObj = fmcObj.concerns
		concernObj.forEach((concern,index)=>{
			let GAscore;
			if (concern.name != "original"){
				GAscore = Number(concern.score) >= 3 ? 1 : 0;
			}

			if (concern.name == "wrinkles"){
				concernString+= "&wrs="+GAscore;
			}
			if (concern.name == "acne"){
				concernString+= "&acs="+GAscore;
			}
			if (concern.name == "redness"){
				concernString+= "&rds="+GAscore;
			}
			if (concern.name == "uneven_skintone"){
				concernString+= "&uss="+GAscore;
			}
			if (concern.name == "dark_circles"){
				concernString+= "&dcs="+GAscore;
			}
			if (concern.name == "dehydration"){
				concernString+= "&dhs="+GAscore;
			}
			if (concern.name == "oiliness"){
				concernString+= "&ois="+GAscore;
			}


		});
	}

	if (window.fmc_backendToUse == "https://imb-staging.herokuapp.com"){
		concernString+="&be=stg"
	}else if (window.fmc_backendToUse == "https://imb-backend-eu.herokuapp.com"){
		concernString+="&be=eu"
	}else if(window.fmc_backendToUse == "https://imb-backend-ca.herokuapp.com"){
		concernString+="&be=ca"
	}else{
		concernString+="&be=us"
	}

	concernString = "fmc_hid=" + fmcObj.hashid + concernString;

	if (window.location.pathname.indexOf("/results/") == -1 && window.location.search.indexOf("fmc_hid=") == -1){

		if (!window.fmc_isEmbed && window.location.pathname.indexOf("/results/") == -1){
			let curHref = window.location.href;
			let newPathString;
			if (window.location.search == ""){
				newPathString = window.location.origin + (window.location.pathname + "/results/").replace("//","/") + fmcObj.hashid + "/"  + "?" + concernString;
			}else{
				newPathString = window.location.origin + (window.location.pathname + "/results/").replace("//","/") + fmcObj.hashid + "/"  + window.location.search + "&" + concernString;
			}
			history.pushState({}, "page 2", newPathString);
		}else{
			let curHref = window.location.href;
			if (curHref.indexOf("?")>-1){
				history.pushState({}, "page 2", window.location.href+"&"+concernString);
			}else{
				history.pushState({}, "page 2", window.location.href+"?"+concernString);
			}
		}
	}
}


function fmcBuildAndUpdateAfterFMCResult(fmcResponseObj){

	fmcPrepareDioxidePayload(fmcResponseObj,fmcUsedLanguageCode)
	.then((dioxPayload)=>{

		logOnLocalHostFrontEnd("DIOXIDE PAYLOAD - ",dioxPayload);

		getDioxideRecommendations(dioxPayload)
		.then((dioxRes)=>{

			logOnLocalHostFrontEnd("DIOXIDE RESPONSE - ",dioxRes);

			fmcUpdateFmcObj(fmcResponseObj, dioxRes)
			.then((updatedFmcObj)=>{

				logOnLocalHostFrontEnd("UPDATED FMC OBJECT - ",updatedFmcObj)
				window.facemap = {...updatedFmcObj};

				if (fmc_curPage == "analyzingPage"){
					fmcCheckForEmailRequirement().then(()=>{
						fmcUpdateBrowserState(updatedFmcObj)
						fmcSendGA("mainFlow","analyze image - success");
						fmcSendGA("mainFlow","results Page (Screen5)");
						fmcSendGAIndia("mainFlow","results Page (Screen5)");
						window.fmc_curPage = "resultsPage";
						showScreen(5);
						fmcBuildResultsPage(updatedFmcObj)
						.then((buildResultsRes)=>{
							logOnLocalHostFrontEnd("BUILD RESULTS RESPONSE: ",buildResultsRes);
						})
					})

				}else{
					showScreen(5);
					fmcSendGA("direct_results","results Page (Screen5)");
					window.fmc_curPage = "resultsPage";
					fmcBuildResultsPage(updatedFmcObj)
					.then((buildResultsRes)=>{
						logOnLocalHostFrontEnd("BUILD RESULTS RESPONSE: ",buildResultsRes);
					})
				}



			})
			.catch((updatedFmcErr)=>{
				console.error("Error in updating FMC object - ",updatedFmcErr);
			})
		})
		.catch((dioxCallErr)=>{
			console.error("Error in Dioxide Call - ",dioxCallErr);
			document.getElementById("fmc_email_container").style.display = "none";
			document.getElementById("fmc_frozen_glass_share_button").style.display = "none";
			fmcUpdateFmcObj(fmcResponseObj)
			.then((updatedObj)=>{
				window.facemap = {...updatedObj};
				window.fmc_showShopButton = false;
				if (fmc_curPage == "analyzingPage"){

					fmcSendGA("mainFlow","analyze image - success");
					fmcSendGA("mainFlow","results Page (Screen5)");
					fmcSendGAIndia("mainFlow","results Page (Screen5)");
					window.fmc_curPage = "resultsPage";
					showScreen(5);
					fmcBuildResultsPage(updatedObj)
					.then((buildResultsRes)=>{
						logOnLocalHostFrontEnd("BUILD RESULTS RESPONSE: ",buildResultsRes);
					})


				}else{
					showScreen(5);
					fmcSendGA("direct_results","results Page (Screen5)");
					window.fmc_curPage = "resultsPage";
					fmcBuildResultsPage(updatedObj)
					.then((buildResultsRes)=>{
						logOnLocalHostFrontEnd("BUILD RESULTS RESPONSE: ",buildResultsRes);
					})
				}
			})
			.catch((error)=>{
				console.error("error in refining fmc data object",error);
			});
		})
	})
	.catch((dioxPayloadErr)=>{
		console.error("Error in Generating Dioxide Payload - ",dioxPayloadErr);
	})
}

if (window.location.search.indexOf("forced_page=") > -1){
  fmcForcedPage=window.location.search.split("forced_page=")[1].split('&')[0];
}

if (window.location.search.indexOf("forced_country=") > -1){
  fmcForcedCountry=window.location.search.split("forced_country=")[1].split('&')[0];
}
var fmcCustomizations = {
  afterLanguageCall : function(){ logOnLocalHostFrontEnd("fmcCustomizations.afterLanguageCall - nothing to do")},
  afterBuildResultsPageCall : function(){ logOnLocalHostFrontEnd("fmcCustomizations.afterBuildResultsPageCall - nothing to do") }
}

// setting MSK banner to ON for skinanalysis.me without any 3rd party path
if (/skinanalysis.me($|:)/g.test(window.location.hostname) || /skinanalysis.me/g.test(fmcForcedPage)){
  let pathElements
  if (/skinanalysis.me($|:)/g.test(window.location.hostname)){
    pathElements = window.location.pathname.split("/");
    try{
      if (pathElements[1] == "" || pathElements[1] == "results"){
        fmcShowMskBanner = true;
      }

    }catch(err){
      console.error("Error in getting skinanalysis.me path elements - ",err)
      fmcShowMskBanner = false;
    }

  }else{
    pathElements = fmcForcedPage.split("/");

    if (pathElements.length > 1){

      try{
        if (pathElements[1] == "results"){
          fmcShowMskBanner = true;
        }

      }catch(err){
        console.error("Error in getting skinanalysis.me path elements - ",err)
        fmcShowMskBanner = false;
      }
    }else{
      fmcShowMskBanner = true;
    }

  }
}


if (/dermalogica.com($|:)/g.test(window.location.hostname) || /dermalogica.com($|:|\/)/g.test(fmcForcedPage)){

  console.log("CUSTOMIZE FOR dermalogica.com");

  // do not display the navbar
  fmc_showNavbar = false;

  // force US links;
  fmcForcedCountry = "US";

  //require email
  fmcRequestEmailBeforeResults = true;

  // allow msk banner (if in US)
  fmcShowMskBanner = true;

  // change "shop" button text
  fmc_productDict.button_text = "add to bag"


}

if (/dermalogica.com.au($|:)/g.test(window.location.hostname) || /dermalogica.com.au($|:|\/)/g.test(fmcForcedPage)){

  console.log("CUSTOMIZE FOR dermalogica.com.au");

  // do not display the navbar
  fmc_showNavbar = false;

  //require email
  fmcRequestEmailBeforeResults = true;

  // force US links;
  fmcForcedCountry = "AU";

  // change "shop" button text
  fmc_productDict.button_text = "add to bag"


}

if (/dermalogica.ca($|:)/g.test(window.location.hostname) || /dermalogica.ca($|:|\/)/g.test(fmcForcedPage)){

  console.log("CUSTOMIZE FOR dermalogica.ca");

  // do not display the navbar
  fmc_showNavbar = false;

  // force US links;
  fmcForcedCountry = "CA";

  // change "shop" button text
  fmc_productDict.button_text = "add to bag"


}

if (/dermalogica.co.uk($|:)/g.test(window.location.hostname) || /dermalogica.co.uk($|:|\/)/g.test(fmcForcedPage)){

  console.log("CUSTOMIZE FOR dermalogica.co.uk");

  // do not display the navbar
  fmc_showNavbar = false;

  // force US links;
  fmcForcedCountry = "GB";

  // change "shop" button text
  fmc_productDict.button_text = "add to bag"


}

if (/dermalogica.de($|:)/g.test(window.location.hostname) || /dermalogica.de($|:)/g.test(fmcForcedPage)){
  console.log("CUSTOMIZE FOR dermalogica.de");

  // hide prices
  fmc_showPrices = false;

  // do not show navbar
  fmc_showNavbar = false;

  // force DE links
  fmcForcedCountry = "DE";

  // show coupon on results page
  if (window.location.search.indexOf("dekp=") == -1){

    let couponCont = document.getElementById("fmc_coupon_container");
    let couponText = document.getElementById("fmc_coupon_text");
    couponText.innerHTML = "20% Face Mapping Rabatt mit Code <b>FM20</b> auf dermalogica.de"
    couponCont.style.display = "block";
  }

  if (window.location.search.indexOf("dekp=1") > -1){

    window.fmcCustomizations.afterBuildResultsPageCall = ()=>{

      if (window.facemap.germany_samples){

        try{

          let bannerCont = document.getElementById("fmc_extra_banner_container");

          bannerCont.style.display = "block";
          bannerCont.style.cursor = "pointer";
          bannerCont.style.backgroundPosition = "center";
          bannerCont.style.backgroundRepeat = "no-repeat";

          bannerCont.style.backgroundImage = "url('https://skinanalysis.me/img/fmc_germany_samples_banner.jpg')";

          bannerCont.style.boxShadow = "0px 0px 30px rgba(55,143,219,0.2)";

          bannerCont.style.marginBottom = "50px";
          bannerCont.style.backgroundColor = "white";

          let textPadTop;

          if (document.getElementById("fmcBody").offsetWidth > 768){
            bannerCont.style.height = "250px";
            bannerCont.style.backgroundSize = "contain";
            textPadTop = "80px";

          }else{
            bannerCont.style.height = "300px";
            bannerCont.style.backgroundSize = "cover";
            textPadTop = "100px";
          }

          bannerCont.innerHTML = "<p style='color: #555; font-weight: normal; font-size: 30px; width: 350px; max-width:90%; margin:auto; padding-top: "+textPadTop+"'>Erhalte gratis Proben dieser Produkte</p>";
          bannerCont.innerHTML += "<p style='display: inline-block; color: #378FDB; letter-spacing: 2px; font-weight: normal; font-size: 22px; max-width:90%; margin: 20px auto; "+
                                  "padding-right: 30px; background-image: url(https://skinanalysis.me/img/right-arrow-blue.svg); "+
                                  "background-repeat: no-repeat; background-position: right center; background-size: 26px;'>bestelle jetzt</p>";


          let sampleLink = "https://fmderma.rheinmail.de/?"


          window.facemap.germany_samples.forEach((prodId,index)=>{
            if (index > 0){
              sampleLink += "&";
            }
            sampleLink += "products[]="+prodId;
          })

          bannerCont.onclick = ()=>{
            window.open(sampleLink,'_blank');
          }

        }catch(err){
          console.error("error in germany's sample kit preparation - ",err);
          document.getElementById("fmc_extra_banner_container").style.display = "none";

        }
      }
    }



  }

}

if (fmcForcedCountry == "DE" && (/skinanalysis.me($|:)/g.test(window.location.hostname) || /skinanalysisconsumer-staging.herokuapp.com($|:)/g.test(window.location.hostname) || /localhost($|:)/g.test(window.location.hostname)  ) ){
  let pathElements = window.location.pathname.split("/");
  try{
    if ((pathElements[1] == "" || pathElements[1] == "results" ) && fmcForcedPage == ""){
      fmc_showPrices = false;
    }

  }catch(err){
    console.error("Error in getting skinanalysis.me path elements - ",err)
  }

}

if (/dermalogica.ee($|:)/g.test(window.location.hostname) || /dermalogica.ee($|:|\/)/g.test(fmcForcedPage)){

  console.log("CUSTOMIZE FOR dermalogica.ee");

  // do not display the navbar
  fmc_showNavbar = false;

  // show a different background image on landing page
  document.getElementById("fmcBody").classList.add("fmc-background-estonia");

}

if (/dermalogicaindia.com($|:)/g.test(window.location.hostname) || /dermalogicaindia.com($|:|\/)/g.test(fmcForcedPage)){

  console.log("CUSTOMIZE FOR dermalogicaindia.com");

  // only display the top 3 concerns
  fmcMaxConcerns = 3;

  // do not display the navbar
  fmc_showNavbar = false;

  // force indian links only
  fmcForcedCountry = "IN";

  // show a different background image on landing page
  document.getElementById("fmcBody").classList.add("fmc-background-ind");

  // show flashing coupon on results page
  /* DISABLED
  let couponCont = document.getElementById("fmc_coupon_container");
	let couponText = document.getElementById("fmc_coupon_text");
	couponText.innerHTML = "Enter your Email to Receive a 10% off Coupon Code!"
	couponCont.style.display = "block";
	couponCont.classList.add("fmc_flashing");
  */


  // disable user selection on footer to prevent the blocking of button clicks
  let intervalCounter = 0;
  let disableFooterPointerEvents = setInterval(()=>{

    let successFlag = false;
    try{
      document.querySelectorAll("#shopify-section-footer .row")[0].style.pointerEvents = "none"
      successFlag = true;
    }catch(err){
      console.log("cannot find blocking shopify section footer to disable pointer events -" ,err);
    }
    if (successFlag){
      clearInterval(disableFooterPointerEvents);
    }else{
      intervalCounter++;
      if (intervalCounter > 40){
        clearInterval(disableFooterPointerEvents);
      }
    }
  },500)

}


if (/nykaa.com($|:)/g.test(window.location.hostname) || window.location.pathname.indexOf("nykaa") > -1 || /nykaa.com($|:)/g.test(fmcForcedPage)){

  console.log("CUSTOMIZE FOR NYKAA");

  window.getInternalCampaign = function(){
    return "dermalogica-skinanalysis";
  }

  window.showProd = function(id, name, url) {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      var campaign = getInternalCampaign();
      if (userAgent.match(/nykaa-android/i)) {
        try{
          AndroidFunction.showProduct(id,campaign);
        }catch(err){
          console.error("error in opening link for ios app - using browser ", err);
          window.open(url, '_blank');
        }
      } else if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
        name = name.replace(/ /g, '+');
        try{
          window.location.href = 'nykaaioslanding://product?id=' + id + '&title=' + name + '&type=show';
        }catch(err){
          console.error("error in opening link for ios app - using browser ", err);
          window.open(url, '_blank');
        }
      } else {
      	window.open(url, '_blank');
  	}
  }

  /* REMOVED THE POSSIBILITY TO REPLACE THE RESULTS PAGE WITH ALL THE NYKAA FUNCTIONS CALLS FOR TESTING
  let nykaaClickCounter = 0;
  document.getElementById("fmc_email_main_icon").onclick = function(){
    nykaaClickCounter++;
    if (nykaaClickCounter > 5){

      let campaign = getInternalCampaign();

      document.getElementById("fmc_screen5").innerHTML = "";

      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(19475,\'' + campaign + '\')">Power Bright</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(17078,\'' + campaign + '\')">Skin Hydrating</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(17207,\'' + campaign + '\')">Multi active mini</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(17161,\'' + campaign + '\')">Ultacalming Serum Conc</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(17162,\'' + campaign + '\')">Barrier Repair</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(4560,\'' + campaign + '\')">Precleanse</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(394897,\'' + campaign + '\')">Active moist 50ml</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(127568,\'' + campaign + '\')">Daly superfoliant</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(4562,\'' + campaign + '\')">special cleansing gel</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(394896,\'' + campaign + '\')">Biolumin-C Serum</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(4588,\'' + campaign + '\')">MultiVit Power Rec Masque</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(4609,\'' + campaign + '\')">Daily Microfoliant</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(4589,\'' + campaign + '\')">Super Rich Repair</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(17126,\'' + campaign + '\')">Dyn Skin recovery SPF 50</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(17123,\'' + campaign + '\')">Antioxidant Hydramist</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(4578,\'' + campaign + '\')">Total Eye Care</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(17134,\'' + campaign + '\')">Age Smart Power Firm 15ml</a>';
      document.getElementById("fmc_screen5").innerHTML += '<a style="margin: 20px auto; display: block;" href="javascript:AndroidFunction.showProduct(17158,\'' + campaign + '\')">Ultracalming Cleanser</a>';



    }
  }

  */

  // hide navbar
  fmc_showNavbar = false;

  // disable live chat
  fmc_showLiveChat = false;

  // hide stores
  fmc_showStoreLocations = false;

  // add indian background on landing page
  document.getElementById("fmcBody").classList.add("fmc-background-ind");

  // disable email request before results (in case we want to activate it on skinanalysis.me)
  fmcRequestEmailBeforeResults = false;

  // send product dictionary with submit email --- will be removed for new endpoint
  fmc_sendProductDictWithEmail = true;

  // show the top 3 concerns
  fmcMaxConcerns = 3;

  // show camera popup for android app
  let tmpUserAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (tmpUserAgent.match(/nykaa-android/i)) {
    fmc_showAndroidAppCapturePopup = true;
  }


  // update email button; DISABLED TILL WE GET THE ACTUAL WORKING LINK
  if (true){

    document.getElementById("fmc_email_container_tagline_2").style.display = "none";

    //document.getElementById("fmc_frozen_glass_share_button").style.display = "none";
    //document.getElementById("fmc_email_container").style.display = "none";

    fmcCustomizations.afterBuildResultsPageCall = ()=>{
      //fmcSendGA("nykaa event","email button activated");
      let emailInfoText  = "Click here to get 10% off and email results.";

      document.getElementById("fmc_email_container_info_text").innerHTML= emailInfoText;
      document.getElementById("fmc_cta_form_wrapper").innerHTML = emailInfoText;
      document.getElementById("fmc_submit_form").style.display = "none";
      document.querySelectorAll(".fmc_nykaa_email_button").forEach((button)=>{
        button.style.display = "inline-block";
      })
    }

  }



}


// function to open the email form for nykaa.... the endpoint is not correct yet (404)
function fmcNykaaEmailButtonClicked(){
	document.getElementById("fmc_email_container").style.display = "none";
	document.getElementById("fmc_frozen_glass_share_button").style.display = "none";
	document.getElementById("fmcBackgroundDarkenOverlay").style.display = "none";
	document.getElementById("fmc_cta_popup_wrapper").style.display = "none";

	fmcSendGA("nykaa event","get offer button clicked");

  //alert("You are being redirected to the Merchant site and are not interacting with Dermalogica LLC");

  let disclaimerEl = document.createElement("div");

  document.getElementById("fmc_screen5").appendChild(disclaimerEl);

  disclaimerEl.id ="nykaaDisclaimer";

  disclaimerEl.style.height = "100vh";
  disclaimerEl.style.width = "100vw";
  disclaimerEl.style.backgroundColor = "rgba(0,0,0,0.7)";
  disclaimerEl.style.position = "absolute";
  disclaimerEl.style.top = "0";
  disclaimerEl.style.left = "0";
  disclaimerEl.style.display = "flex";
  disclaimerEl.style.zIndex = "10000";


  disclaimerEl.innerHTML = '<div id="nykaaDisclaimerCont" ><p style="color: #555; font-weight: normal; line-height: 1.5;">You are being redirected to the Merchant site and are not interacting with Dermalogica LLC</p><div id="nykaaDisclButton" onclick="fmcNykaaOpenEmailPage()">ok</div></div>'

  let discCont = document.getElementById("nykaaDisclaimerCont");
  discCont.style.margin = "auto";
  discCont.style.display =  "flex";
  discCont.style.flexDirection =  "column";
  discCont.style.justifyContent =  "space-evenly";
  discCont.style.width= "400px";
  discCont.style.maxWidth= "95%";
  discCont.style.height= "200px";
  discCont.style.backgroundColor= "white";
  discCont.style.borderRadius= "10px";

  let disclButton = document.getElementById("nykaaDisclButton");

  disclButton.style.color ="white";
  disclButton.style.display ="inline-block";
  disclButton.style.padding ="5px 10px";
  disclButton.style.backgroundColor ="#378FDB";
  disclButton.style.margin ="0 auto";
  disclButton.style.textTransform ="uppercase";
  disclButton.style.cursor = "pointer";

  disclaimerEl.scrollIntoView();



}

let fmcNykaaOpenEmailButtonAllowed = true;
function fmcNykaaOpenEmailPage(){
  if (fmcNykaaOpenEmailButtonAllowed){
    fmcNykaaOpenEmailButtonAllowed = false;
    document.getElementById("nykaaDisclaimer").style.display = "none";
    window.open("https://www.nykaa.com/dermalogica-submit-email-app?hash_id="+window.facemap.hashid,'_blank');

  }
}

if (/sephora.com($|:)/g.test(window.location.hostname) || window.location.pathname.indexOf("sephora") > -1 || /sephora.com($|:)/g.test(fmcForcedPage)){

  console.log("CUSTOMIZE FOR SEPHORA");

  // hide navbar
  fmc_showNavbar = false;

  // send product dictionary with submit email --- will be removed for new endpoint
  fmc_sendProductDictWithEmail = true;

  // remove title and subtitle from "Therapist Section (store locator)"
  document.getElementById("fmc_skin_therapist_tagline_1").style.display = "none"
  document.getElementById("fmc_skin_therapist_tagline_2").style.display = "none"

  // update logo at landing page
  document.querySelector("#fmc_landing_dermalogica_logo img").src = "https://skinanalysis.me/img/dermalogica_sephora_logos.png";

  // extra parameters on the store locator endpoint
  fmcStoreLocatorExtraParameters = "&maxStores=200&maxRadius=30";

  // regex to filter stores from the store locator endpoint
  fmcStoreLocatorRegexFilter = new RegExp(/(S|s)ephora/, 'g');

}

if (/saloncentric.com($|:)/g.test(window.location.hostname) || window.location.pathname.indexOf("saloncentric") > -1 || /saloncentric.com($|:)/g.test(fmcForcedPage)){

  console.log("CUSTOMIZE FOR SALONCENTRIC");

  // hide navbar
  fmc_showNavbar = false;

  // hide prices
  fmc_showPrices = false;

  // send product dictionary with submit email --- will be removed for new endpoint
  fmc_sendProductDictWithEmail = true;

  // update logo at landing page
  document.querySelector("#fmc_landing_dermalogica_logo img").src = "https://skinanalysis.me/img/dermalogica_saloncentric_logos.png";

  // extra parameters on the store locator endpoint
  fmcStoreLocatorExtraParameters = "&maxStores=200&maxRadius=30";

  // regex to filter stores from the store locator endpoint
  fmcStoreLocatorRegexFilter = new RegExp(/(S|s)aloncentric/, 'g');

}

if (/ulta.com($|:)/g.test(window.location.hostname) || window.location.pathname.indexOf("ulta") > -1 || /ulta.com($|:)/g.test(fmcForcedPage)){

  console.log("CUSTOMIZE FOR ULTA");

  // hide prices
  fmc_showPrices = false;

  // show navbar on skinanalysis.me (and localhost)
  if (/skinanalysis.me($|:)/g.test(window.location.hostname)  || /localhost($|:)/g.test(window.location.hostname)){
    fmc_showNavbar = true;
  }else{
    fmc_showNavbar = false;
  }

  // send product dictionary with submit email --- will be removed for new endpoint
  fmc_sendProductDictWithEmail = true;

  // change "shop" button text
  fmc_productDict.button_text = "shop now + free gift"

  // disable email request before results (in case we want to activate it on skinanalysis.me)
  fmcRequestEmailBeforeResults = false;

  // extra parameters on the store locator endpoint
  fmcStoreLocatorExtraParameters = "&maxStores=100&maxRadius=50";

  // regex to filter stores from the store locator endpoint
  fmcStoreLocatorRegexFilter = new RegExp(/(U|u)lta/, 'g');

  // updating navbar for ulta on skinanalysis.me
  document.getElementById("fmc_nav_menu").innerHTML = '<ul><li><a id="fmc_ulta_nav_link" href="https://www.ulta.com">Shop Ulta</a></li></ul>';
	document.querySelector("#fmc_nav_bar a").setAttribute("href","/ulta");
	document.getElementById("fmc_ulta_branding").style.display = "block";

  // update chat bubble text after language settings
  fmcCustomizations.afterLanguageCall = ()=>{
    document.getElementById("fmc_fixed_chat_button_text").innerHTML = "discuss with a skin expert"
  }
}

if (/cosmania.nl($|:)/g.test(window.location.hostname) || /cosmania.nl($|:|\/)/g.test(fmcForcedPage)){

  console.log("CUSTOMIZE FOR cosmania.nl");

  // do not display the navbar
  fmc_showNavbar = false;

  // disable live chat
  fmc_showLiveChat = false;


  fmcCustomizations.afterBuildResultsPageCall=()=>{

    let stepSliderWidth = document.getElementById("fmc_product_carousel_section").offsetWidth;
    let xShift = Math.round(0.45*(document.getElementById("fmcBody").offsetWidth - stepSliderWidth));

    console.log(stepSliderWidth,document.getElementById("fmcBody").offsetWidth,xShift)

    document.getElementById("fmc_product_carousel_right_button").style.right =  - xShift + "px";
    document.getElementById("fmc_product_carousel_left_button").style.left =  - xShift + "px";


    let concernButtonsTop = Math.round(document.getElementById("fmcCarousel_mobileResults").offsetHeight * 0.5 + 25);

    document.getElementById("fmc_results_mobile_next_button").style.top = concernButtonsTop + "px";
    document.getElementById("fmc_results_mobile_prev_button").style.top = concernButtonsTop + "px";

    document.querySelectorAll(".fmc-product-carousel-button").forEach((el)=>{
      el.style.display = "block"
    })
  }




}



let skinObj = "{US:true,CA:true}"

let fmc_email_captured = true;
let forceEmailDomainsString = "dermalogica.com,www.dermalogica.com,dermalogica.com.au,www.dermalogica.com.au,dermalogica-ru.ru,www.dermalogica-ru.ru";


let forceEmailDomainsArray = forceEmailDomainsString.split(",");
forceEmailDomainsArray.forEach((domain,index)=>{
	forceEmailDomainsArray[index] = domain.trim();
})

if (forceEmailDomainsArray.length == 1){
	if (forceEmailDomainsArray[0]  == "NONE"){
		forceEmailDomainsArray=[];
	}
}

if (fmcRequestEmailBeforeResults == undefined){

	fmcRequestEmailBeforeResults = forceEmailDomainsArray.indexOf(window.location.hostname) > -1;
	logOnLocalHostFrontEnd("Domains require email for results: ", forceEmailDomainsArray);

}

logOnLocalHostFrontEnd("ask for Email entry befor results: ", fmcRequestEmailBeforeResults);

if (fmcRequestEmailBeforeResults){
	fmc_email_captured = false;
	document.getElementById("fmc_frozen_glass_text_bar").style.display = "none";
	document.getElementById("fmc_frozen_glass_share_button").style.display = "none";
	document.getElementById("fmc_email_container").style.display = "none";
}


let dermDotComAddBagCounter = 0;



window.fmc_useSkinIo = "true"=="true";
if ("{US:true,CA:true}" != ""){
	try{
		window.fmc_skinIoCountries = envJsonToJsJson("{US:true,CA:true}");
	}catch(err){
		window.fmc_skinIoCountries = {}
	}
}else{
	window.fmc_skinIoCountries = {}
}



function envJsonToJsJson(envJsonStringIn){
	return JSON.parse(envJsonStringIn.replace(/,/g,',"').replace(/:/g,'":').replace('{','{"'));
}

let fmcStartCountDown = true;

let fmc_results_available = false;
let fmc_btbpCheckInterval;
let fmc_btbp_widget_loaded = false;

let fmc_directlyToUploadLink = false;

let fmcProductConcernsDone = false;
let fmcProductCarouselDone = false;
let fmcStoreLocationsDone = false;
let pendingUpdateResultsCounter = 0;

let fmcIsOnboardingScreen = false;


let fmcUsedLanguageCode;

let fmcAllowFullScreen = false;

let fmcSessionTimeString = (new Date()).getTime();


function fmcGenerateCustomUid(){
	return new Promise((resolve,reject)=>{
		let newcuid = Math.floor(Math.random()*1000000000000000000) + fmcSessionTimeString;
		resolve(newcuid);
	});
}
let fmcCustomUID;

fmcGenerateCustomUid().then((uidres)=>{
	fmcCustomUID = uidres;
})


window.drpEmHash = fmcReadCookie("drpemhash");


// these two will return booleans
var isUndefined = function(e){return typeof e == "undefined"}
var isNotUndefined = function(e){return !isUndefined(e)}

//variables.


var preloadBackgroundImage = new Image();
preloadBackgroundImage.src = "https://skinanalysis.me/img/screen2-bg.png";


function setCookie(cname,cvalue, exdays){
	var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";";
}

function readCookie(cname){
	var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



// start of helpers
function ajaxToBackend(obj){
	if (!obj.cb) return;
	var type = obj.type || "GET"
	var callback = obj.cb
	var url = obj.url
	//var contType = obj.contType || "application/json";
	var data = obj.data || ""

	var xhr = new XMLHttpRequest()

	xhr.open(type, window.fmc_backendToUse + url )
	xhr.setRequestHeader('Content-Type', 'application/json')
	//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	var calledYet = false;
	xhr.onreadystatechange = function(){
		if (this.readyState == 4){
			if (this.status == 200){
				obj.cb(this.responseText);
			}else{
				if (this.status == 500 && window.fmc_backendToUse=="https://imb-backend-eu.herokuapp.com" && window.location.href.indexOf("/results/") > -1){
					window.fmc_backendToUse="https://api.skinanalysis.me";
					ajaxToBackend(obj);
				}else{
					console.error("error in loading the result");
				}
			}
		}
	}
	xhr.send(data)

}
function openFullscreen(elem) {
	var elem = elem || document.documentElement
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) { /* Firefox */
		elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { /* IE/Edge */
		elem.msRequestFullscreen();
	}
}
function closeFullscreen(elem) {
	var elem = elem || document
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) { /* Firefox */
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { /* IE/Edge */
		document.msExitFullscreen();
	}
}

function adverbToNumber(adverb){
    if (adverb=="dryness_adverb_severe") return 4;
    if (adverb=="dryness_adverb_moderate") return 3;
    if (adverb=="dryness_adverb_somewhat") return 2; /* TODO -  REMOVE ??? */
    if (adverb=="dryness_adverb_mild") return 2;
		if (adverb=="dryness_adverb_notdry") return 1;
    return 1;
}




function trackGAEvent(name, value) {
  if (window.gtag) {
    window.gtag('event', 'event', {'event_category': name, 'event_value': value});
  } else if (window._gaq) {
    window._gaq.push(['facemap._trackEvent', name, value]);
  } else if (window.ga) {
    window.ga('send', 'event', name, value, 'facemap');
  }
}

// end of helpers


let getSpecs = ()=>{
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "https://skinanalysis.me/getSpecs" );
	xhr.setRequestHeader('Content-Type', 'text/plain');
	xhr.onreadystatechange = function(){

		if(this.readyState == 4){
			let agentData = JSON.parse(this.responseText);
			//logOnLocalHostFrontEnd("userAgent data: ",agentData);
			fmcBrowser = agentData.family + " " + agentData.major;
			fmcOS = agentData.os.family + " " + agentData.os.major;
		}
	}
	xhr.send();
}

getSpecs();





// END EVENTS SETUP


let preloadResultImages = ()=>{
	let preloadLoadCounter = 0;
	let bgImageString = '';
	let concernsNumber = window.facemap.concerns.length;
	window.facemap.concerns.forEach((concern,index)=>{
		if (concern.image != "" && concern.image != undefined){
			resultImages[concern.name] = new Image();
			resultImages[concern.name].onload = (evt)=>{
				preloadLoadCounter += 1;
				if (preloadLoadCounter < window.facemap.concerns.length){
					bgImageString += 'url(' + evt.target.src + '), '
				}else{
					bgImageString += 'url(' + evt.target.src + ')';
					logOnLocalHostFrontEnd("preload image string: ",bgImageString);
					document.getElementById("fmc_bg_image_preloader").style.backgroundImage = bgImageString;
				}
				logOnLocalHostFrontEnd("preloaded images load counter: ",preloadLoadCounter);
			}
			resultImages[concern.name].src = concern.image;
			window.facemap.concerns[index].hasImage = true;
		}else{
			preloadLoadCounter += 1;
			window.facemap.concerns[index].hasImage = false;
		}
	})
}



let dragStoresPos;

let dragStoresStartEvent = (evt)=>{
	if (evt.type == "touchstart"){
		dragStoresPos = evt.changedTouches[0].pageX;
	}else{
		dragStoresPos=evt.offsetX;
	}
	evt.target.addEventListener("drag",dragStoresEvent)
	evt.target.addEventListener("touchmove",dragStoresEvent)
}

let dragStoresEvent = (evt)=>{
	let deltaX;
	if (evt.type == "touchmove"){
		deltaX = evt.changedTouches[0].pageX-dragStoresPos;
	}else{
		deltaX = evt.offsetX-dragStoresPos;
	}

	//logOnLocalHostFrontEnd("deltaX: ", deltaX);
	if (evt.screenX != 0){
		if (deltaX < - 30){
			evt.target.removeEventListener("drag",dragStoresEvent);
			nextStore();
		}
		if (deltaX > 30){
			evt.target.removeEventListener("drag",dragStoresEvent);
			prevStore();
		}

	}
}



let sliderAllowsMoving = true;

let nextProduct = (selectConcern = false)=>{
	//logOnLocalHostFrontEnd("prev prod - sliderMoveFlag: ",sliderAllowsMoving);
	if (sliderAllowsMoving){

		sliderAllowsMoving = false;

		let prodSection = document.getElementById("fmc_product_section");
		let secWidth = prodSection.offsetWidth;
		let prodWidth = 0.8 * secWidth;
		let gapWidth = 0.2*secWidth;
		let startValue = 0.1*secWidth;
		if (document.getElementById("fmcBody").offsetWidth <= 768){
			gapWidth = 0.25* gapWidth;
		}

		let recDivs = document.querySelectorAll("#fmc_product_section .fmc-product-container");

		let rightBorder = 2*(prodWidth + gapWidth);

		recDivs.forEach((prodElement, index)=>{

			let curPos = Number(prodElement.style.left.replace("px",""));

			if (curPos < 0 && curPos > - gapWidth - prodWidth && selectConcern){
				setTimeout(()=>{
					let concernName = prodElement.getAttribute("concern");
					let concernElement = document.getElementById("fmc_concern_"+concernName);
					let scrollContainer = concernElement.parentElement;
					document.getElementById("fmc_concern_"+concernName).click();
					let topPos = concernElement.offsetTop;
					scrollContainer.scrollTop = topPos;
				},400);
			}

			prodElement.style.left = curPos + gapWidth + prodWidth + "px";


			if (curPos > rightBorder){
				let formerTransitionString = getComputedStyle(prodElement).transition;
				prodElement.style.transition = "none";
				curPos =  startValue - (prodWidth + gapWidth) * ( recDivs.length - 3);
				prodElement.style.left = curPos + "px";
				setTimeout(()=>{
					prodElement.style.transition = formerTransitionString;
				},10)
				setTimeout(()=>{
					sliderAllowsMoving = true;
				},500);
			}
		})
		if ( document.getElementById("fmcBody").offsetWidth <= 768){
			window.facemap.sortedConcerns.forEach((concern,index)=>{
				let curConcernElement  = document.getElementById("fmc_concern_"+concern.name);
				let curProdElement  = document.getElementById("fmc_product_container_"+concern.name);
				let curConcernLeft = Number(curConcernElement.style.left.replace("px",""));
				let curRecomLeft = Number(curProdElement.style.left.replace("px",""));
				if (curConcernLeft < curRecomLeft){
					curConcernElement.style.left = curProdElement.style.left;
				}else{
					let curFormerTransString = curConcernElement.style.transition;
					curConcernElement.style.transition = "none";
					curConcernElement.style.left = curProdElement.style.left;
					setTimeout(()=>{
						curConcernElement.style.transition = curFormerTransString;
					},10)
				}

			});
		}
	}
}


let prevProduct = (selectConcern = false)=>{

	if (sliderAllowsMoving){

		sliderAllowsMoving = false;

		let prodSection = document.getElementById("fmc_product_section");
		let secWidth = prodSection.offsetWidth;
		let prodWidth = 0.8 * secWidth;
		let gapWidth = 0.2*secWidth;
		let startValue = 0.1*secWidth;
		if (document.getElementById("fmcBody").offsetWidth <= 768){
			gapWidth = 0.25* gapWidth;
		}

		let recDivs = document.querySelectorAll("#fmc_product_section .fmc-product-container");

		let leftBorder = - (prodWidth + gapWidth) * (recDivs.length-3) + startValue + 0.5*gapWidth;

		recDivs.forEach((prodElement, index)=>{

			let curPos = Number(prodElement.style.left.replace("px",""));

			if (curPos > prodWidth && curPos < 2*prodWidth && selectConcern){
				setTimeout(()=>{
					let concernName = prodElement.getAttribute("concern");
					let concernElement = document.getElementById("fmc_concern_"+concernName);
					let scrollContainer = concernElement.parentElement;
					document.getElementById("fmc_concern_"+concernName).click();
					let topPos = concernElement.offsetTop;
					scrollContainer.scrollTop = topPos;
				},400);
			}

			if (curPos < leftBorder){
				let formerTransitionString = getComputedStyle(prodElement).transition;
				prodElement.style.transition = "none";
				curPos =  startValue + (prodWidth + gapWidth) * 3;
				prodElement.style.left = curPos + "px";
				setTimeout(()=>{
					prodElement.style.transition = formerTransitionString;
				},10)
				setTimeout(()=>{
					sliderAllowsMoving = true;
				},500);
			}


			prodElement.style.left = curPos - gapWidth - prodWidth + "px";
		})
		if ( document.getElementById("fmcBody").offsetWidth <= 768){
			window.facemap.sortedConcerns.forEach((concern,index)=>{
				let curConcernElement  = document.getElementById("fmc_concern_"+concern.name);
				let curProdElement  = document.getElementById("fmc_product_container_"+concern.name);
				let curConcernLeft = Number(curConcernElement.style.left.replace("px",""));
				let curRecomLeft = Number(curProdElement.style.left.replace("px",""));
				if (curConcernLeft > curRecomLeft){
					curConcernElement.style.left = curProdElement.style.left;
				}else{
					let curFormerTransString = curConcernElement.style.transition;
					curConcernElement.style.transition = "none";
					curConcernElement.style.left = curProdElement.style.left;
					setTimeout(()=>{
						curConcernElement.style.transition = curFormerTransString;
					},10)
				}

			});
		}
	}
}


let makeIndicatorBarStyle = (concernScore)=>{

	let styleString ="";

	let color;

	switch(String(concernScore)){
		case "5":
		case "4":
			color = "#da806e";
			break;
		case "3":
		case "2":
			color = "#e9c353";
			break;
		case "1":
			color = "#4caf50";
			break;
		default:
			color = "rgba(0,0,0,0)";

	}

	let width= Math.max(0.95*((Number(concernScore)-1)*20+10),0.05);



	styleString += "position: absolute;";
	styleString += "top: 2px;";
	styleString += "width: "+width+"%;";
	styleString += "background-color: "+color+";";
	styleString += "left: 1%;";
	styleString += "height: 4px;";

	return styleString;
}

let moreConcernText = (concernName)=>{
	//let textWrapper = document.getElementById("fmc_concern_text_wrapper_"+concernName);
	let textWrappers = document.querySelectorAll("#fmc_concern_text_wrapper_"+concernName);

	textWrappers.forEach((textWrapper,index)=>{

		textWrapper.classList.add("fmc-text-expanded");
		textWrapper.classList.remove("fmc-text-collapsed");
		if (document.getElementById("fmcBody").offsetWidth < 768){
			document.getElementById("fmc_product_slider_slide_element").style.height = "100px";
			let deltaHeight = textWrapper.offsetHeight - 16;
			document.getElementById("fmc_product_slider").style.height = 430 + deltaHeight +"px";
			document.getElementById("fmc_recommendations_container").style.height = 430 + deltaHeight +"px";

		}
	})

}

let lessConcernText = (concernName)=>{
	//let textWrapper = document.getElementById("fmc_concern_text_wrapper_"+concernName);
	let textWrappers = document.querySelectorAll("#fmc_concern_text_wrapper_"+concernName);

	textWrappers.forEach((textWrapper,index)=>{

		textWrapper.classList.add("fmc-text-collapsed");
		textWrapper.classList.remove("fmc-text-expanded");
		if (document.getElementById("fmcBody").offsetWidth < 768){
			document.getElementById("fmc_product_slider_slide_element").style.height = "300px";
			document.getElementById("fmc_product_slider").style.height = 430 +"px";
			document.getElementById("fmc_recommendations_container").style.height = 430 +"px";
			window.facemap.sortedConcerns.forEach((concern,index)=>{
				document.querySelectorAll("#fmc_concern_text_wrapper_"+concern.name).forEach((curTextWrapper)=>{
					curTextWrapper.classList.add("fmc-text-collapsed");
					curTextWrapper.classList.remove("fmc-text-expanded");

				});
			});
		}
	})

}

let scoreToSeverity = (score)=>{
	let htmlString = "BLA";
	if (score > 3){
		htmlString = '<span class="fmc-ind-word-critical fmc-ind-word">' +fmcSeverityWords.critical+ '</span>'
	}else if (score > 1){
		htmlString = '<span class="fmc-ind-word-moderate fmc-ind-word">'+ fmcSeverityWords.moderate+ '</span>'
	}else{
		htmlString = '<span class="fmc-ind-word"></span>'
	}
	return htmlString;
}

let activeConcern;

let selectConcern = (concernName)=>{
	activeConcern = concernName;
	let selectedElement = document.querySelectorAll("#fmc_concern_items .selected")[0];
	let selectedConcern = selectedElement.getAttribute("concern");
	if (selectedConcern != concernName){
		selectedElement.classList.remove("selected");
		document.getElementById("fmc_concern_"+concernName).classList.add("selected");
		document.getElementById("fmc_result_overlay_image_"+selectedConcern).style.opacity = 0;
	}
	//document.getElementById("fmcResultImageContainer").style.backgroundImage = 'url("'+resultImages[concernName].src+'")';
	document.getElementById("fmc_result_overlay_image_"+concernName).style.opacity = 1;

	let targetProds = document.querySelectorAll('#fmc_product_container_'+concernName);

	let targetProd;

	let closestLeft = 10000;

	targetProds.forEach((prodEl)=>{
		if (Math.abs(prodEl.offsetLeft)<closestLeft){
			closestLeft = Math.abs(prodEl.offsetLeft);
			targetProd = prodEl;
		}
	})

	//let targetProd = document.getElementById('fmc_product_container_'+concernName);


	let showTargetInterval;
	clearInterval(showTargetInterval);
	let showTargetProd = ()=>{
		if (targetProd.offsetLeft > 0 && targetProd.offsetLeft < targetProd.offsetWidth || targetProd.getAttribute("concern") != activeConcern ){
			clearInterval(showTargetInterval);
		}else{
			if (targetProd.offsetLeft > - (targetProd.parentElement.offsetWidth) * 0.5 * window.facemap.sortedConcerns.length && targetProd.offsetLeft < 0){
				nextProduct(false);
			}else{
				prevProduct(false);
			}
		}
	}
	showTargetProd();
	showTargetInterval = setInterval(()=>{
		showTargetProd();
	},550);

}

let updateWeatherConditions = ()=>{


	let dataObj = {
		"airPollution" : (100 - Number(window.facemap.weather.air_quality_index)),
		"humidity" : Number(window.facemap.weather.humidity),
		"uvIndex" : Number(window.facemap.weather.uv_index),
		"city" : window.facemap.city
	}


	let cityElement = document.getElementById("fmc_location_city");
	let airPollElement = document.getElementById("fmc_location_air_quality");
	let humidityElement = document.getElementById("fmc_location_humidity");
	let uvIndexElement = document.getElementById("fmc_location_uv_index");
	let airPollAdverbElement = document.getElementById("fmc_location_air_quality_adverb");
	let humidityAdverbElement = document.getElementById("fmc_location_humidity_adverb");
	let uvIndexAdverbElement = document.getElementById("fmc_location_uv_index_adverb");

	let airCircle = document.getElementById("fmc_location_air_quality_circle");
	let uvIndexCircle = document.getElementById("fmc_location_uv_index_circle");
	let humidityCircle = document.getElementById("fmc_location_humidity_circle");

	let airPollAdverb;

	if(dataObj.airPollution <= 20){
		airPollAdverb = airPolHumidText.airPol.very_good;
	}else if(dataObj.airPollution <= 40){
		airPollAdverb = airPolHumidText.airPol.good;
	}else if(dataObj.airPollution <= 60){
		airPollAdverb = airPolHumidText.airPol.medium;
	}else if(dataObj.airPollution <= 80){
		airPollAdverb = airPolHumidText.airPol.high;
	}else{
		airPollAdverb = airPolHumidText.airPol.very_high;
	}

	let uvIndexAdverb;

	if(dataObj.uvIndex <= 20){
		uvIndexAdverb = airPolHumidText.uvIndex.very_low;
	}else if(dataObj.uvIndex <= 40){
		uvIndexAdverb = airPolHumidText.uvIndex.low;
	}else if(dataObj.uvIndex <= 60){
		uvIndexAdverb = airPolHumidText.uvIndex.medium;
	}else if(dataObj.uvIndex <= 80){
		uvIndexAdverb = airPolHumidText.uvIndex.high;
	}else{
		uvIndexAdverb = airPolHumidText.uvIndex.very_high;
	}


	let humidityAdverb;

	if(dataObj.humidity <= 20){
		humidityAdverb = airPolHumidText.humidity.very_low;
	}else if(dataObj.humidity <= 40){
		humidityAdverb = airPolHumidText.humidity.low;
	}else if(dataObj.humidity <= 60){
		humidityAdverb = airPolHumidText.humidity.medium;
	}else if(dataObj.humidity <= 80){
		humidityAdverb = airPolHumidText.humidity.high;
	}else{
		humidityAdverb = airPolHumidText.humidity.very_high;
	}

	if(dataObj.city == null){
		dataObj.city = "not available";
	}

	if(dataObj.humidity == null){
		humidityAdverb = "not available";
		dataObj.humidity ="";
	}
	if(dataObj.airPollution == null){
		airPollAdverb = "not available";
		dataObj.airPollution ="";
	}
	if(dataObj.uvIndex == null){
		uvIndexAdverb = "not available";
		dataObj.uvIndex ="";
	}


	cityElement.innerHTML = dataObj.city;
	airPollElement.innerHTML = dataObj.airPollution;
	uvIndexElement.innerHTML = dataObj.uvIndex;
	humidityElement.innerHTML = dataObj.humidity;
	airPollElement.style.color = getCircleIndicatorColor(dataObj.airPollution);
	uvIndexElement.style.color = getCircleIndicatorColor(dataObj.uvIndex);
	humidityElement.style.color = getCircleIndicatorColor(100-dataObj.humidity);

	airPollAdverbElement.innerHTML = airPollAdverb;
	humidityAdverbElement.innerHTML = humidityAdverb;
	uvIndexAdverbElement.innerHTML = uvIndexAdverb;


	airCircle.style["stroke-dashoffset"] = Math.min((1-dataObj.airPollution / 100) * 603,593) ;
	airCircle.style.stroke = getCircleIndicatorColor(dataObj.airPollution);

	uvIndexCircle.style["stroke-dashoffset"] = Math.min((1-dataObj.uvIndex / 100) * 603,593) ;
	uvIndexCircle.style.stroke = getCircleIndicatorColor(dataObj.uvIndex);

	humidityCircle.style["stroke-dashoffset"] = Math.min((1-dataObj.humidity / 100) * 603,593) ;
	humidityCircle.style.stroke = getCircleIndicatorColor(100  - dataObj.humidity);
}

function getCircleIndicatorColor(scaleValue){

	let colorEnd = {
		h: 5,
		s: 81,
		l: 65
	}
	let colorBegin = {
		h: 172,
		s: 66,
		l: 51
	}

	let colorScaled={};

	if (scaleValue < 10){
		colorScaled = colorBegin;
	}else if (scaleValue >= 90){
		colorScaled = colorEnd;
	}else{

		colorScaled.h = Math.round(colorBegin.h + (colorEnd.h-colorBegin.h)*Math.pow((scaleValue-10)/90,0.5));
		colorScaled.s = Math.round(colorBegin.s + (colorEnd.s-colorBegin.s)*Math.pow((scaleValue-10)/90,0.5));
		colorScaled.l = Math.round(colorBegin.l + (colorEnd.l-colorBegin.l)*Math.pow((scaleValue-10)/90,0.5));
	}



	let hslString = "hsl("+colorScaled.h+","+colorScaled.s+"%,"+colorScaled.l+"%)"
	return hslString;

}




// ------------------------------------------
// 				 START OF APP
// ------------------------------------------


// Check if url has /results/id in it, and if so, load the results page and localization

makeLanguageSelector();

if (location.pathname.indexOf('/results/')>-1 || window.location.search.indexOf("fmc_hid=") > -1 ){


	getTextForLanguage((languageData)=>{
		languageToUserSettings(languageData, ()=>{
			logOnLocalHostFrontEnd("lang data: ", languageData);
			try{
				fmcCustomizations.afterLanguageCall();
			}catch(err){
				console.error("Error in customization call after language - ",err);
			}
			let hashId;
			if (location.pathname.indexOf('/results/')>-1){
				hashId= location.pathname.split("/results/")[1].split("?")[0].replace(/\/$/,"");
				//console.log("loading hid: ", hashId);
			}else{
				hashId = window.location.search.split("fmc_hid=")[1].split("&")[0];
			}

			ajaxToBackend({
				type: "GET",
				url: "/get_country_gdpr/?lang_code="+fmcUsedLanguageCode,
				cb: function(res){
					let response;
					if (typeof res == "string"){
						response = JSON.parse(res);
					}else{
						response = res;
					}
					window.fmc_pendingBackendUpdate = true;
					updateGdprAndEndPoints(response);
					let pendingBackendUpdate = setInterval(()=>{
						if (!window.fmc_pendingBackendUpdate){
							clearInterval(pendingBackendUpdate);

							if (window.location.search.indexOf("&be=") > -1 || window.location.search.indexOf("?be=") > -1 ){
								if (window.location.search.indexOf("&be=eu") > -1 || window.location.search.indexOf("?be=eu") > -1){
									window.fmc_backendToUse = "https://imb-backend-eu.herokuapp.com";
								}else if (window.location.search.indexOf("&be=ca") > -1 || window.location.search.indexOf("?be=ca") > -1){
									window.fmc_backendToUse = "https://imb-backend-ca.herokuapp.com";
								}else if (window.location.search.indexOf("&be=stg") > -1 || window.location.search.indexOf("?be=stg") > -1){
									window.fmc_backendToUse = "https://imb-staging.herokuapp.com";
								}else{
									window.fmc_backendToUse = "https://api.skinanalysis.me";
								}
							}

							getFaceMapResult({hashId: hashId})
							.then((hashIdResponse)=>{


								logOnLocalHostFrontEnd("HASH ID RESPONSE: ",hashIdResponse);

								fmcBuildAndUpdateAfterFMCResult(hashIdResponse)


							})
							.catch((HashErr)=>{
								console.error("Error in getting hashId result - ", HashErr);
								window.open(window.location.href.split("?")[0].split("/results/")[0], "_self");
							})
						}
					},100);
				}
			});

		});
	});


}else{

	let languageCode;
	if (window.fmc_forcedLanguageCode != ""){
		languageCode = window.fmc_forcedLanguageCode;
	}else{
		languageCode = fmcReadCookie("fmc_languageCode");
		languageCode = languageCode == "" ? navigator.language : languageCode;
		if (languageCode.substring(0,2) == "nn" || languageCode.substring(0,2) == "no"){
			languageCode = languageCode.replace("no","nb").replace("nn","nb");
		}
	}
	if (languageCode.length > 3){
		languageCode = languageCode.split("-")[0];
	}

	fmcUsedLanguageCode = languageCode;

	ajaxToBackend({
		type: "GET",
		url: "/get_country_gdpr/?lang_code="+fmcUsedLanguageCode,
		cb: function(res){
			let response;
			if (typeof res == "string"){
				response = JSON.parse(res);
			}else{
				response = res;
			}
			updateGdprAndEndPoints(response,true);
		}
	});


	getTextForLanguage((languageData)=>{
		logOnLocalHostFrontEnd('LANGUAGE DATA: ', languageData);
		languageToUserSettings(languageData, ()=>{
			try{
				fmcCustomizations.afterLanguageCall();
			}catch(err){
				console.error("Error in customization call after language - ",err);
			}
			if (window.location.search.indexOf("upld=true") > -1 ){
				fmc_directlyToUploadLink = true;
				showScreen(3)
			}else{
				showScreen(1)
			}
		});
	});

	/*let user = detect.parse(navigator.userAgent);
	//check if browser is supported
	var isIOS = user.os.family=="iOS"
	var isSafari = user.browser.family.indexOf('Safari')>-1
	var isSafari12 = isSafari && user.browser.major == 12
	var iOSButNotSafari = isIOS && !isSafari
	var supportsGetUserMedia = navigator.mediaDevices && navigator.mediaDevices.getUserMedia
	if (!supportsGetUserMedia ) {
 		 alert("We don't currently support this browser. Please reopen this page in a different one.")
	}*/
}
let resizeTimeBuffer = 500;
let resizeTimeout;
window.onresize = ()=>{
	clearTimeout(resizeTimeout);

	updateClassesDueWidth();
	resizeTimeout = setTimeout(()=>{
		//window.location.reload()
	},resizeTimeBuffer);
}

let addEmailPopupEventsInterval = setInterval(()=>{

	if (document.getElementById("fmc_cta_popup_email") != undefined){
		clearInterval(addEmailPopupEventsInterval)
		let checkEmailTimeout;
		document.getElementById("fmc_cta_popup_email").addEventListener("keydown",(evt)=>{
			clearTimeout(checkEmailTimeout)
			checkEmailTimeout = setTimeout(()=>{
				let sendButton = document.getElementById("fmc_cta_popup_email_button");
				if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(document.getElementById("fmc_cta_popup_email").value)){
					console.log("activating send button");
					document.getElementById("fmc_cta_popup_email_button").classList.remove("fmc_inactive");
					document.getElementById("fmc_cta_popup_email_button").classList.remove("fmc_disabled");
					document.getElementById("fmc_cta_popup_email_faulty_email_text").style.opacity=0;

				}else{
					console.log("deactivating send button");
					document.getElementById("fmc_cta_popup_email_button").classList.remove("fmc_inactive");
					document.getElementById("fmc_cta_popup_email_button").classList.add("fmc_disabled");
					if (fmcRequestEmailBeforeResults){
						document.getElementById("fmc_cta_popup_email_faulty_email_text").style.opacity=1;
					}
				}
			},100)
		})
		document.getElementById("fmc_cta_popup_email").addEventListener("change",(evt)=>{
			clearTimeout(checkEmailTimeout)
			checkEmailTimeout = setTimeout(()=>{
				let sendButton = document.getElementById("fmc_cta_popup_email_button");
				//console.log("EMAIL - ",document.getElementById("fmc_cta_popup_email").value);
				//console.log("IS EMAIL? ",/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("fmc_cta_popup_email").value));
				if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(document.getElementById("fmc_cta_popup_email").value)){
					console.log("activating send button");
					document.getElementById("fmc_cta_popup_email_button").classList.remove("fmc_inactive");
					document.getElementById("fmc_cta_popup_email_button").classList.remove("fmc_disabled");
					document.getElementById("fmc_cta_popup_email_faulty_email_text").style.opacity=0;
				}else{
					console.log("deactivating send button");
					document.getElementById("fmc_cta_popup_email_button").classList.remove("fmc_inactive");
					document.getElementById("fmc_cta_popup_email_button").classList.add("fmc_disabled");
					if (fmcRequestEmailBeforeResults){
						document.getElementById("fmc_cta_popup_email_faulty_email_text").style.opacity=1;
					}
				}
			},100)
		})
	}
},500)

setTimeout(()=>{
	updateClassesDueWidth();

},100)

let isInIframe;
try{
	isInIframe = window.self !== window.top;
}catch(e){
	console.error("Possibly running in an iframe");
	isInIframe = true;
}
if (isInIframe){
	reportError({
		"title": "FMC running in an IFRAME",
		"value": "document.referrer: " + document.referrer + "\nlocation.href: " + window.location.href,
		"targetChannel" : "fmc-in-iframe"
	});
	logOnLocalHostFrontEnd("RUNNING IN AN IFRAME: ", isInIframe + " - " +  window.location.href  + " - " +  document.referrer);
}
