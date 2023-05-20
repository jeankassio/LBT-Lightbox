/*!
 * LBT Lightbox v1.1.2
 * by Jean Kássio
 *
 * More info:
 * https://jeankassio.dev
 *
 * Copyright Jean Kássio
 * Released under the MIT license
 * https://github.com/jeankassio/LBT-Lightbox/blob/main/LICENSE
 *
 * @preserve
 */

(function($){
  $.fn.lbtLightBox = function(options){
	
	$closebutton = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.227 4.227a.774.774 0 0 1 1.095 0L12 10.905l6.678-6.678a.774.774 0 1 1 1.095 1.095L13.095 12l6.678 6.678a.774.774 0 1 1-1.095 1.095L12 13.095l-6.678 6.678a.774.774 0 1 1-1.095-1.095L10.905 12 4.227 5.322a.774.774 0 0 1 0-1.095Z" fill="currentColor"/></svg>';
	$dotoptions = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm0-2.6A2.2 2.2 0 1 0 9.999.8a2.2 2.2 0 0 0 .002 4.4zm0 9.6a2.2 2.2 0 1 0 0 4.402 2.2 2.2 0 0 0 0-4.402z" fill="currentColor"/></svg>';
	$odownload = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z" fill="currentColor"/></svg>';
	$oforward = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.4 14.249v5.228l8.4-8.028-8.4-7.886v4.78c-10.53 0-13.2 11.678-13.2 11.678 2.981-5.266 7.484-5.772 13.2-5.772z" fill="currentColor"/></svg>';
	$osmile = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM6.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm2.16 3H4.34a6 6 0 0 0 11.32 0z" fill="currentColor"/></svg>';
	$ostar = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m10 15-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" fill="currentColor"/></svg>';
	$ochat = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"/><path d="M5.763 17H20V5H4v13.385L5.763 17zm.692 2L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455z" fill="currentColor"/></svg>';
	$loading = '<svg version="1.1" id="lbt-loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"> <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"> <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="0.5s" from="0 50 50" to="360 50 50" repeatCount="indefinite" /></path></svg>';
	$btn_play = '<svg class="lbt_btn_play" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path stroke-width="16.667" d="M100 183.333c46.024 0 83.333-37.309 83.333-83.333S146.024 16.667 100 16.667 16.667 53.976 16.667 100 53.976 183.333 100 183.333Zm-20.833-54.166 50-29.167-50-29.167v58.334ZM87.5 112.5l16.667-12.5L87.5 87.5v25Z"/></svg>';
	
	$oprofile = 'https://github.com/jeankassio.png';
	
	let $lbt_images;
	let $totalImages;
	let $allThumbnails = "";
	$innerHeight = window.innerHeight;
	$innerWidth = window.innerWidth * 0.7;
	
	let videoPlayer;
	let VideoScr;
	let mouseout;
	let lbt_videoTime;
	let videoControls;
	let videoProgressLine;
	let videoProgressBar;
	let play_n_pause;
	let volume;
	let volumeRange;
	let current;
	let totalVideoDuration;
	let pictureInpicture;
	let fullscreenMode;
	let loadingIndicator;
	let db;
	
	const cyrb53 = (str, seed = 0) => {
	  let h1 = 0xdeadbeef ^ seed,
		h2 = 0x41c6ce57 ^ seed;
	  for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	  }
	  
	  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
	  
	  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
	};
	
    let defaults = {
		qtd_pagination: 8,
		pagination_width: "60px",
		pagination_height: "60px",
		captions: false,
		captions_selector: ".caption",
		custom_children: "img",
		db: false
	};
	var options = $.extend(defaults, options);
	
    function setListeners(container, options){
		
		GetIframeVideos();
		GetHTML5Videos();
		
		$lbt_images = $(options.custom_children, options.container_images);
		$totalImages = $lbt_images.length;
		
		if(options.db == true){
		
			$version_db = 1;
			
			let DBconnection = indexedDB.open("lbt_lightbox", $version_db);

			DBconnection.onupgradeneeded = function(e){
			  
				db = DBconnection.result;
				
				if(e.oldVersion == $version_db){
					return;
				}
							
				let _images = db.createObjectStore('images', {keyPath: 'id', autoIncrement: true});

				_images.createIndex('type', 'type');
				_images.createIndex('image', 'image');
				_images.createIndex('created', 'created');
				
			};
			
			DBconnection.onsuccess = function() {
				
				db = DBconnection.result;
			  
				LoadBdImages($lbt_images);
			  
			};
			
			DBconnection.onerror = function(){
				console.error("Error", DBconnection.error);
			};
			
			DBconnection.onblocked = function() {
				let db = DBconnection.result;
				db.close();
				alert("Database is outdated, refresh the page in previous tab.");
			};

		}
		
		$(document).on('click', options.lbr_id + " " + options.custom_children,  function(e){
			
			OpenViewer($(this));
			
		});
		
		$(document).on('click', options.lbt_id + " #lbt-close_lightbox", function(e){
			
			RemoveViewer();
			
		});
		
		$(document).keyup(function(e){
			
			if(e.key === "Escape"){
				RemoveViewer();
			}else if(e.key === "ArrowRight"){
				NextImage();
			}else if(e.key === "ArrowLeft"){
				PreviousImage();
			}
			
		});
				
		$(document).on('click', options.lbt_id + " img.lbr-thumb", function(e){
			
			ChangeImage($(this));
			
		});
		
		$(document).on('click', options.lbt_id + " #lbt_previous", function(e){
			
			PreviousImage();
			
		});
		
		$(document).on('click', options.lbt_id + " #lbt_next", function(e){
			
			NextImage();
			
		});
				
		$(document).on('pointerdown', options.lbt_id + " .video_progress-line", function(e){
			
			videoProgressLine.setPointerCapture(e.pointerId);
			setVideoTime(e);
			
			$(".video_progress-line", options.container_lightbox).on("pointermove", function(e){
			
				setVideoTime(e);
				
			});
			
			$(".video_progress-line", options.container_lightbox).on("pointerup", function(e){
			
				$(this).off("pointermove");
				
			});
			
		});
		
		$(document).on('mouseout', options.lbt_id + " #lbt_videoplayer", function(e){
			
			mouseout = setTimeout(function(){
				
				if($("#lbt_videoplayer:hover", options.container_lightbox).length == 0){
					const isVideoPaused = $(videoPlayer).hasClass("paused");
					if(isVideoPaused){
						$(videoControls).removeClass("active");					
					}
				}
				
			}, 2000);
			
		});
		
		$(document).on('mouseout', options.lbt_id + " .video_progress-line", function(e){
			
			$(".lbt_videoTime", options.container_lightbox).css("display", "none");
			
		});
		
		$(document).on('click', options.lbt_id + " #lbt_vsrc", function(e){
			
			const isVideoPaused = $(videoPlayer).hasClass("paused");
			if (isVideoPaused){
				pauseVideo();
			}else{
				playVideo();
			}
			
		});
		
		$(document).on('mouseenter', options.lbt_id + " #lbt_videoplayer", function(e){
			
			clearTimeout(mouseout);
				
			$(videoControls).addClass("active");
			
		});
		
		$(document).on('waiting', options.lbt_id + " #lbt_vsrc", function(e){
			
			loadingIndicator.style.display = "block";
			
		});
		
		$(document).on('canplay', options.lbt_id + " #lbt_vsrc", function(e){
			
			loadingIndicator.style.display = "none";
			
		});
		
		$(document).on('play', options.lbt_id + " #lbt_vsrc", function(e){
			
			playVideo();
			
		});
		
		$(document).on('pause', options.lbt_id + " #lbt_vsrc", function(e){
			
			pauseVideo();
			
		});
		
		$(document).on('click', options.lbt_id + " .lbt_vPlayPause," + options.lbt_id + " .lbt_btn_play", function(e){
			
			const isVideoPaused = $(videoPlayer).hasClass("paused");
			if (isVideoPaused){
				pauseVideo();
			}else{
				playVideo();
			}
			
		});
		
		$(document).on('input', options.lbt_id + " .lbt_videoVolumeRange", function(e){
			
			setVolume();
			
		});
		
		$(document).on('click', options.lbt_id + " .lbt_videoVolume", function(e){
			
			muteVideoVolume();
			
		});
		
		$(document).on('click', options.lbt_id + " .lbt_fullScreen", function(e){
			
			if(!$(videoPlayer).hasClass("openFullScreen")) {
				$(videoPlayer).addClass("openFullScreen");
				$(fullscreenMode).html("fullscreen_exit");
				videoPlayer.requestFullscreen();
			}else{
				$(videoPlayer).removeClass("openFullScreen");
				$(fullscreenMode).html("fullscreen");
				document.exitFullscreen();
			}
			
		});
		
		$(document).on('click', options.lbt_id + " .lbt_videoPip", function(e){
			
			VideoScr.requestPictureInPicture();
			
		});
		
		$(document).on('mousemove', options.lbt_id + " .video_progress-line", function(e){
			
			let progressWidthvalue = videoProgressLine.clientWidth + 2;
			let x = e.offsetX;
			let videoDuration = VideoScr.duration;
			let progressTime = Math.floor((x / progressWidthvalue) * videoDuration);
			let currentVideoMinute = Math.floor(progressTime / 60);
			let currentVideoSeconds = Math.floor(progressTime % 60);
			lbt_videoTime.style.setProperty("--x", `${x}px`);
			lbt_videoTime.style.display = "block";
			if (x >= progressWidthvalue - 80) {
				x = progressWidthvalue - 80;
			}else if (x <= 75) {
				x = 75;
			} else {
				x = e.offsetX;
			}
			  // if the seconds are less then 10 then add 0 at the beginning
			currentVideoSeconds < 10
				? (currentVideoSeconds = "0" + currentVideoSeconds)
				: currentVideoSeconds;
			lbt_videoTime.innerHTML = `${currentVideoMinute} : ${currentVideoSeconds}`;
			
		});
		
    }
	
	$.fn.OpenViewer = function(obj){
		
		MountViewer(obj);		
		LoadMedia($(obj).index(options.custom_children), null);
		MountThumbs(obj, "#lbt-thumbnails");		
		ToLeft();
		$("body").addClass("lbr-ToFixed");
		UpdateArrows();
	}
	
	$.fn.update = function(){
		
		GetIframeVideos();
		GetHTML5Videos();
		
		setTimeout(function(){
			
			$lbt_images = $(options.custom_children, options.container_images);
			$totalImages = $lbt_images.length;
			
			LoadImages($lbt_images);
			
		}, 500);
		
	}
	
	$.fn.preload = function(){
		
		$lbt_images = $(options.custom_children, options.container_images);
		$totalImages = $lbt_images.length;
		
		for (var i = 0; i < $totalImages; i++) {
		   
			if(typeof $lbt_images.eq(i).data('lbt-thumb') == 'undefined'){
				
				CreateThumb($lbt_images.eq(i), {h:Number(options.pagination_height.replace("px", "")), w:Number(options.pagination_width.replace("px", ""))}, null);
				preloadImage($lbt_images.eq(i).attr('src'));
				
			}else{
				
				$($thumb).attr('src', $lbt_images.eq(i).data('lbt-thumb'));
				
			}
			
		}
		
	}
	
	function preloadImage(url){
		var img = new Image();
		img.src = url;
	}
	
	function saveToIndexedDB(storeName, object){
	  return new Promise(
		function(resolve, reject) {

		  var dbRequest = indexedDB.open("lbt_lightbox");

		  dbRequest.onerror = function(event) {
			reject(Error("IndexedDB database error"));
		  };

		  dbRequest.onupgradeneeded = function(event) {
			var database    = event.target.result;
			var objectStore = database.createObjectStore(storeName, {keyPath: "id", autoIncrement: true});
		  };

		  dbRequest.onsuccess = function(event) {
			var database      = event.target.result;
			var transaction   = database.transaction([storeName], 'readwrite');
			var objectStore   = transaction.objectStore(storeName);
			var objectRequest = objectStore.put(object); // Overwrite if exists

			objectRequest.onerror = function(event) {
			  reject(Error('Error text'));
			};

			objectRequest.onsuccess = function(event) {
			  resolve('Data saved OK');
			};
		  };
		}
	  );
	}
	
	function loadFromIndexedDB(storeName, id, obj){
	  return new Promise(
		function(resolve, reject) {
		  var dbRequest = indexedDB.open("lbt_lightbox");

		  dbRequest.onerror = function(event) {
			reject(Error("Error text"));
		  };

		  dbRequest.onupgradeneeded = function(event) {
			// Objectstore does not exist. Nothing to load
			event.target.transaction.abort();
			reject(Error('Not found'));
		  };

		  dbRequest.onsuccess = function(event) {
			var database      = event.target.result;
			var transaction   = database.transaction([storeName]);
			var objectStore   = transaction.objectStore(storeName);
			var object_index = objectStore.index("type");
			var objectRequest = object_index.get(id);
			
			objectRequest.onerror = function(event) {
			  reject(Error('Error text'));
			};

			objectRequest.onsuccess = function(event){
				if (objectRequest.result){
				  resolve(objectRequest.result);
				}else{
				  reject(Error('object not found'));
				}			  
			};
		  };
		}
	  );
	}
	
	function blobToBase64(blob){
	  return new Promise((resolve, _) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.readAsDataURL(blob);
	  });
	}
	
	function base64toBlob(base64Data, contentType){
		
		contentType = contentType || '';
		var sliceSize = 1024;
		var byteCharacters = atob(base64Data);
		var bytesLength = byteCharacters.length;
		var slicesCount = Math.ceil(bytesLength / sliceSize);
		var byteArrays = new Array(slicesCount);

		for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
			var begin = sliceIndex * sliceSize;
			var end = Math.min(begin + sliceSize, bytesLength);

			var bytes = new Array(end - begin);
			for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
				bytes[i] = byteCharacters[offset].charCodeAt(0);
			}
			byteArrays[sliceIndex] = new Uint8Array(bytes);
		}
		return new Blob(byteArrays, { type: contentType });
		
	}
	
	
	
	function UpdateArrows(){
		
		$totalImages = $lbt_images.length;
		
		if($(".lbr-thumb.active", options.container_lightbox).data("thumb_id") == 0){
			$("#lbt_previous", options.container_lightbox).css('display', 'none');
		}else{
			$("#lbt_previous", options.container_lightbox).css('display', 'block');
		}
		
		if($(".lbr-thumb.active", options.container_lightbox).data("thumb_id") == ($totalImages - 1)){
			$("#lbt_next", options.container_lightbox).css('display', 'none');
		}else{			
			$("#lbt_next", options.container_lightbox).css('display', 'block');
		}
		
	}
	
	function OpenViewer(obj){
		
		MountViewer(obj);		
		LoadMedia($(obj).index(options.custom_children), null);
		MountThumbs(obj, "#lbt-thumbnails");		
		ToLeft();
		$("body").addClass("lbr-ToFixed");
		UpdateArrows();
	}
	
	function ToLeft(){

		$th = ($(".lbr-thumb.active", options.container_lightbox).outerWidth() * (options.qtd_pagination / 2)) + ($(".lbr-thumb.active", options.container_lightbox).outerWidth() / 3);
		$sl = $("#lbt-thumbnails", options.container_lightbox).scrollLeft();
		
		
		$("#lbt-thumbnails", options.container_lightbox).css("left", "calc((50vw - "+ $th +"px) + "+ $sl +"px)");
		
	}
	
	function NextImage(){
		
		$("#lbt-loading", options.container_lightbox).show();
		
		$totalImages = $lbt_images.length;
		
		$iIndex = $(".lbr-thumb.active", options.container_lightbox).data("thumb_id");
		$iIndex++;
		
		if($iIndex >= $totalImages){
			$("#lbt-loading", options.container_lightbox).hide();
			return;
		}
		
		LoadMore($iIndex);
		
		$tid = $(".lbr-thumb.active", options.container_lightbox).closest("li").next().find(".lbr-thumb").index(".lbr-thumb");
		
		LoadMedia($iIndex, $tid);
		
		ToLeft();
		
		UpdateArrows();
		
	}
	
	function PreviousImage(){
		
		$("#lbt-loading", options.container_lightbox).show();
		
		$totalImages = $lbt_images.length;
		
		$iIndex = $(".lbr-thumb.active", options.container_lightbox).data("thumb_id");
		$iIndex--;
		
		if($iIndex < 0){
			$("#lbt-loading", options.container_lightbox).hide();
			return;
		}
		
		LoadMore($iIndex);
		
		$tid = $(".lbr-thumb.active", options.container_lightbox).closest("li").prev().find(".lbr-thumb").index(".lbr-thumb");
		
		LoadMedia($iIndex, $tid);		
		
		ToLeft();
		
		UpdateArrows();
		
	}
	
	function ChangeImage(obj){		
		
		$("#lbt-loading", options.container_lightbox).show();
		
		$totalImages = $lbt_images.length;
		
		$iIndex = $(obj).data("thumb_id");
		
		LoadMore($iIndex);
		
		$tid = $(obj).index(".lbr-thumb");
		
		LoadMedia($iIndex, $tid);
		
		ToLeft();
		
		UpdateArrows();
		
	}
	
	function RemoveViewer(){
		
		$("body").removeClass("lbr-ToFixed");
		$("#lbt-lightbox_imgs", options.container_lightbox).remove();
		
	}
	
	function MountViewer(obj){
		
		RemoveViewer();
		
		$(options.container_lightbox).append([
			$('<div/>',{"id": "lbt-lightbox_imgs"}).append([
				$('<div/>',{"id": "lbt_previous"}).append([
						$('<i/>',{ "class": "fa fa-angle-left"}).attr('aria-hidden', 'true')
					]),
				$('<div/>',{"id": "lbt_lightbox-wrapper"}).append([
						$('<div/>',{ "class": "lbt-image-wrapper"}).append([
							$loading,
							$('<div/>',{ "id": "lbt-lightbox-media"}),
							(options.captions === true ? $('<p/>',{ "id": "lbt-lightbox-caption"}).css({bottom: (Number(options.pagination_height.replace("px", "")) + 50) + "px"}) : '')
						])
					]),
				$('<div/>',{"id": "lbt_next"}).append([
					$('<i/>',{"class": "fa fa-angle-right"}).attr('aria-hidden', 'true')
				]),
				$('<div/>',{"class": "lt-thumbnail-wrapper"}).append([
					$('<ul/>',{"id": "lbt-headertop"}).append([
						$('<div/>',{"id": "lbt-profile_lightbox"}).append([
								$('<img/>').attr('src', $oprofile)
							]),
						$('<div/>',{"id": "lbt-name_lightbox"}).text('Jean Kássio'),
						$('<div/>',{"id": "lbt-date_lightbox"}).text('Hoje às 12:30'),
						$('<a/>',{"id": "lbt-chat_lightbox"}).append($ochat),
						$('<a/>',{"id": "lbt-star_lightbox"}).append($ostar),
						$('<a/>',{"id": "lbt-smile_lightbox"}).append($osmile),
						$('<a/>',{"id": "lbt-forward_lightbox"}).append($oforward),
						$('<a/>',{"id": "lbt-download_lightbox"}).append($odownload),
						$('<a/>',{"id": "lbt-dot_lightbox"}).append($dotoptions),
						$('<a/>',{"id": "lbt-close_lightbox"}).append($closebutton)
					])
				]),
				$('<div/>',{"class": "lb-thumbnail-wrapper"}).append([
					$('<ul/>',{"id": "lbt-thumbnails"}).css({height: (Number(options.pagination_height.replace("px", "")) + 40) + "px"})
				])
			])
		]);
		
	}	
	
	function LoadMore($end_index){
		
		$totalImages = $lbt_images.length;
		
		$start_index = $(".lbr-thumb.active", options.container_lightbox).data("thumb_id");
		
		$loadto = ($start_index - $end_index);
		
		if($loadto < 0){
			
			LoadNextTo(Math.abs($loadto));
			
		}else if($loadto > 0){
			
			LoadPreviousTo($loadto);
			
		}
		
	}
	
	function LoadPreviousTo($qutd){
		$totalImages = $lbt_images.length;
		
		for(var i = 1; i <= $qutd; i++){

			$i_previous = Math.abs($("img.lbr-thumb").first().data('thumb_id')) -1;
			
			$i_id = $(".lbr-thumb.active", options.container_lightbox).data("thumb_id") - i;
			
			if($i_previous < 0 || ($i_id >= Math.ceil($totalImages - ((options.qtd_pagination / 2) + ((options.qtd_pagination%2 != 0) ? +1 : 0) )))){
				
				continue;
				
			}
			
			$obj = $("img.lbr-thumb", options.container_lightbox).not(".removed").last();
			$obj.addClass("removed");
			
			$obj.closest("li").animate(
			{"width" : "0"},
			{"duration":120, "queue": true}).queue(function(){
			  $( this ).remove().dequeue();
			});
			
			
			$("img.lbr-thumb", options.container_lightbox).closest("li").first().before([
				$anim = $('<li/>').append([
					$thumb = $('<img/>',{"class": "lbr-thumb"}).data('thumb_id', $i_previous).css({width: options.pagination_width, height: options.pagination_height})
				]).css('width', '0').animate({
					"width" : $(".lbr-thumb.active", options.container_lightbox).outerWidth()
				}, 120, function(){
					$anim.removeAttr("style");
				})
			]);
			
			
			if(typeof $lbt_images.eq($i_previous).data('lbt-thumb') == 'undefined'){
				
				CreateThumb($lbt_images.eq($i_previous), {h:Number(options.pagination_height.replace("px", "")), w:Number(options.pagination_width.replace("px", ""))}, $thumb);
				
			}else{
				
				$($thumb).attr('src', $lbt_images.eq($i_previous).data('lbt-thumb'));
				
			}
			
			
		}
		
	}
	
	function LoadNextTo($qutd){
		$totalImages = $lbt_images.length;
		
		for(var i = 1; i <= $qutd; i++){
			
			$i_next = Math.abs($("img.lbr-thumb").last().data('thumb_id')) +1;
			
			$i_id = $(".lbr-thumb.active").data("thumb_id") + i;
			
			if($totalImages <= $i_next || ($i_id < (Number.isInteger($f = Math.ceil(((options.qtd_pagination / 2) + ((options.qtd_pagination%2 != 0) ? -1 : 0) ))) ? ($f + 1) : $f ))){
				
				continue;
				
			}
			
			$obj = $("img.lbr-thumb", options.container_lightbox).not(".removed").first();
			$obj.addClass("removed");
			
			$obj.closest("li").animate(
			{"width" : "0"},
			{"duration":120, "queue": true}).queue(function(){
			  $( this ).remove().dequeue();
			});
			
			
			$("#lbt-thumbnails", options.container_lightbox).append([
				$anim = $('<li/>').append([
					$thumb = $('<img/>',{"class": "lbr-thumb"}).data('thumb_id', $i_next).css({width: options.pagination_width, height: options.pagination_height})
				]).css('width', '0').animate({
					"width" : $(".lbr-thumb.active", options.container_lightbox).outerWidth()
				}, 120, function(){
					$anim.removeAttr("style");
				})
			]);
			
			
			if(typeof $lbt_images.eq($i_next).data('lbt-thumb') == 'undefined'){
				
				CreateThumb($lbt_images.eq($i_next), {h:Number(options.pagination_height.replace("px", "")), w:Number(options.pagination_width.replace("px", ""))}, $thumb);
				
			}else{
				
				$($thumb).attr('src', $lbt_images.eq($i_next).data('lbt-thumb'));
				
			}
			
			
		}
		
	}
	
	$("img.lbr-thumb").queue(function( next ) {
		$(this).remove();
		next();
	});
	
	function LoadMedia($i, $tid){
		
		$("#lbt-lightbox-media", options.container_lightbox).empty();
		
		$("img.lbr-thumb", options.container_lightbox).removeClass('active');
		
		if($tid !== null){			
			$(".lbr-thumb", options.container_lightbox).eq($tid).addClass('active');
		}
		
		if($lbt_images.eq($i).data('iframe_src')){
			
			PreLoadIframeVideo($i);
			
		}else if($lbt_images.eq($i).data('html5Video')){
			
			LoadHTML5Video($i);
			
		}else{
			
			console.log($lbt_images.eq($i).data());
			
			$img = $lbt_images.eq($i).attr('src');
			PreLoadImage($img);
			
		}
		
		if(options.captions === true){
			
			if($lbt_images.eq($i).find(options.captions_selector).length){
				
				$("#lbt-lightbox-caption", options.container_lightbox).text($lbt_images.eq($i).find(options.captions_selector).text());
				
			}else if($lbt_images.eq($i).next(options.captions_selector).length){
				
				$("#lbt-lightbox-caption", options.container_lightbox).text($lbt_images.eq($i).next(options.captions_selector).text());
				
			}else if($lbt_images.eq($i).parent().find(options.captions_selector).length){
				
				$("#lbt-lightbox-caption", options.container_lightbox).text($lbt_images.eq($i).parent().find(options.captions_selector).text());
				
			}			
			
		}
		
	}
	
	function LoadHTML5Video($i){
		
		$HVideo = $lbt_images.eq($i).data();
		
		
		$("#lbt-lightbox-media", options.container_lightbox).append('<div id="lbt_videoplayer">\
			<div class="lbt_loadingVideo"></div>\
			 ' + $btn_play + '\
			<video preload="metadata" id="lbt_vsrc">\
				<source src="'+ $HVideo['html5Video'] +'" type="'+ $HVideo['html5type'] +'" />\
			</video>\
			<div class="lbt_videoTime">0:00</div>\
			<div class="lbt_videoControls active">\
				<div class="video_progress-line">\
					<canvas class="video_buffer-bar"></canvas>\
					<div class="video_progress-bar">\
						<span></span>\
					</div>\
				</div>\
				<div class="lbt_videoControls-list">\
					<div class="lbt_videoControls-left">\
						<span class="icon">\
						<i class="material-icons lbt_vPlayPause">play_arrow</i>\
						</span>\
						<span class="icon">\
						<i class="material-icons lbt_videoVolume">volume_up</i>\
						<input type="range" min="0" max="100" class="lbt_videoVolumeRange" />\
						</span>\
						<div class="timer">\
							<span class="lbt_videoCurrent">0:00</span> / \
							<span class="lbt_videoDuration">0:00</span>\
						</div>\
					</div>\
					<div class="lbt_videoControls-right">\
						<span class="icon">\
						<i class="material-icons lbt_videoPip">picture_in_picture_alt</i>\
						</span>\
						<span class="icon">\
						<i class="material-icons lbt_fullScreen">fullscreen</i>\
						</span>\
					</div>\
				</div>\
			</div>\
		</div>');
		
		$("#lbt-loading", options.container_lightbox).hide();
		
		
		videoPlayer = document.querySelector("#lbt_videoplayer");
		VideoScr = videoPlayer.querySelector("#lbt_vsrc");

		lbt_videoTime = videoPlayer.querySelector(".lbt_videoTime");
		videoControls = videoPlayer.querySelector(".lbt_videoControls");
		videoProgressLine = videoPlayer.querySelector(".video_progress-line");
		videoProgressBar = videoPlayer.querySelector(".video_progress-bar");
		fastRewind = videoPlayer.querySelector(".lbt_fastRewind");
		play_n_pause = videoPlayer.querySelector(".lbt_vPlayPause");
		volume = videoPlayer.querySelector(".lbt_videoVolume");
		volumeRange = videoPlayer.querySelector(".lbt_videoVolumeRange");
		current = videoPlayer.querySelector(".lbt_videoCurrent");
		totalVideoDuration = videoPlayer.querySelector(".lbt_videoDuration");
		pictureInpicture = videoPlayer.querySelector(".lbt_videoPip");
		fullscreenMode = videoPlayer.querySelector(".lbt_fullScreen");
		loadingIndicator = videoPlayer.querySelector(".lbt_loadingVideo");
		
		
		$("#lbt_vsrc", options.container_lightbox).on("loadeddata", function(e){
		
			SetVideoDuration(e);
			
		});
		
		$("#lbt_vsrc", options.container_lightbox).on("timeupdate", function(e){
		
			UpdateTime(e);
			
		});
		
		
	}
	
	function SetVideoDuration(e){
		
		let videoDuration = e.target.duration;
		let totalMin = Math.floor(videoDuration / 60);
		let totalSec = Math.floor(videoDuration % 60);
		// if video seconds are less than 10, then add 0 at the beginning
		totalSec < 10 ? (totalSec = "0" + totalSec) : totalSec;
		totalVideoDuration.innerHTML = `${totalMin} : ${totalSec}`;
		$(".lbt_btn_play", options.container_lightbox).show();
		
	}
	
	function UpdateTime(e){
		
		let currentVideoTime = e.target.currentTime;
		let currentVideoMinute = Math.floor(currentVideoTime / 60);
		let currentVideSeconds = Math.floor(currentVideoTime % 60);
		// if seconds are less than 10 then add 0 at the beginning
		currentVideSeconds < 10
			? (currentVideSeconds = "0" + currentVideSeconds)
			: currentVideSeconds;
		current.innerHTML = `${currentVideoMinute} : ${currentVideSeconds}`;
		let videoDuration = e.target.duration;
		// progressBar width change
		let progressWidth = (currentVideoTime / videoDuration) * 100 + 0.5;
		videoProgressBar.style.width = `${progressWidth}%`;
		
	}
	
	function playVideo(){
		
		play_n_pause.innerHTML = "pause";
		play_n_pause.title = "pause";
		$(videoPlayer).addClass("paused");
		$(".lbt_btn_play", options.container_lightbox).hide();
		VideoScr.play();
		
	}
	
	function pauseVideo(){
		
		play_n_pause.innerHTML = "play_arrow";
		play_n_pause.title = "play";
		$(videoPlayer).removeClass("paused");
		$(".lbt_btn_play", options.container_lightbox).show();
		VideoScr.pause();
		
	}
	
	function setVolume(){
		
		VideoScr.volume = volumeRange.value / 100;
		  if (volumeRange.value == 0) {
			volume.innerHTML = "volume_off";
		  } else if (volumeRange.value < 39) {
			volume.innerHTML = "volume_down";
		  } else {
			volume.innerHTML = "volume_up";
		  }
		
	}
	
	function muteVideoVolume(){
		
		if (volumeRange.value == 0) {
			volumeRange.value = 60;
			VideoScr.volume = 0.6;
			volume.innerHTML = "volume_up";
		  } else {
			volumeRange.value = 0;
			VideoScr.volume = 0;
			volume.innerHTML = "volume_off";
		  }
		
	}
	
	function setVideoTime(e){
		
		  let videoDuration = VideoScr.duration;
		  let progressWidthvalue = videoProgressLine.clientWidth + 2;
		  let ClickOffsetX = e.offsetX;
		  VideoScr.currentTime = (ClickOffsetX / progressWidthvalue) * videoDuration;
		  let progressWidth = (VideoScr.currentTime / videoDuration) * 100 + 0.5;
		  videoProgressBar.style.width = `${progressWidth}%`;
		  let currentVideoTime = VideoScr.currentTime;
		  let currentVideoMinute = Math.floor(currentVideoTime / 60);
		  let currentVideoSeconds = Math.floor(currentVideoTime % 60);
		  // if seconds are less than 10 then add 0 at the beginning
		  currentVideoSeconds < 10
			? (currentVideoSeconds = "0" + currentVideoSeconds)
			: currentVideoSeconds;
		  current.innerHTML = `${currentVideoMinute} : ${currentVideoSeconds}`;
		
	}
	
	function PreLoadIframeVideo($i){
		
		$iframe = $lbt_images.eq($i).data();
		
		$("#lbt-lightbox-media", options.container_lightbox).append([
			$_iframe = $('<iframe/>',{"src": $iframe['iframe_src']}).attr('frameborder', $iframe['frameborder']).attr('allow', $iframe['iframe_allow']).attr('fullscreen', $iframe['fullscreen']).addClass("lbt-iframe-video").css("visibility","hidden")
		]);
		
		$_iframe.on("load",function(){
			$(".lbt-iframe-video", options.container_lightbox).css("visibility","visible");
			$("#lbt-loading", options.container_lightbox).hide();
		});
		
	}
	
	function PreLoadImage(src){
		
		$("#lbt-lightbox-media", options.container_lightbox).append([
			$('<img/>',{"id": "lbt-lightbox-image"}).css({"max-height": "calc(100% - "+ (165 + Number(options.pagination_height.replace("px", ""))) +"px)", top: "calc(50% - "+ (options.pagination_height.replace("px", "") / 2) +"px)"})
		]);
		
		var img = new Image(),
		x = document.getElementById("lbt-lightbox-image");
		
		img.src = src;
		
		img.onload = function() {
			x.src = img.src;
			$("#lbt-loading", options.container_lightbox).hide();
		};
		
	}
	
	function GetHTML5Videos(){
		
		$lbt_hvideos = $("video", options.container_images);
		
		$($lbt_hvideos).each(function(i){
			
			$(this).after([
				$obj = $('<img/>', {"class": $(this).attr('class')}).data('html5Video', $(this).find('source').attr('src')).data('html5type', $(this).find('source').attr('type'))
			]);
			
			GetThumHTML5Video($(this).find('source').attr('src'), $obj, $(this).width(), $(this).height());
			
			$(this).remove();
			
		});
		
		$lbt_images = $(options.custom_children, options.container_images);
		
	}
	
	function GetIframeVideos(){
		
		$lbt_ivideos = $("iframe", options.container_images);
		
		$($lbt_ivideos).each(function(i){
			
			$lbt_ivideos_thumbnail = "";
			$lbt_ivideos_src = $(this).attr('src');
			$lbt_ivideos_width = $(this).css('width');
			$lbt_ivideos_height = $(this).css('height');
			$lbt_ivideos_frameborder = $(this).attr('frameborder');
			$lbt_ivideos_fullscre = (typeof $(this).attr('allowfullscreen') !== 'undefined' && $(this).attr('allowfullscreen') !== false ? true : false);
			$lbt_ivideos_allow = $(this).attr('allow');
			
			var youtube = new RegExp("(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[-a-zA-Z0-9_]{11,}(?!\S))\/)|(?:\S*v=|v\/)))([-a-zA-Z0-9_]{11,})");
			var vimeo = new RegExp('(?:https?:\/\/)?(?:www.|player.)?vimeo.com(?:\/*(?:video\/|))([-a-zA-Z0-9_]{9})|.([\w\\-_]+)\&?=([-a-zA-Z0-9_]{10})');

			
			if(youtube.test($lbt_ivideos_src)){
				
				$lbt_ivideos_id = $lbt_ivideos_src.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be).(?:embed)(?:\/watch\?v=|\/)([^\s&]+)/)[1];
				
				$lbt_ivideos_thumbnail = 'https://i3.ytimg.com/vi/' + $lbt_ivideos_id + '/maxresdefault.jpg';
				
				
				$(this).after([
				$('<img/>').attr('src', $lbt_ivideos_thumbnail).data('lbt-thumb', $lbt_ivideos_thumbnail).css('height', $lbt_ivideos_height).css('width', $lbt_ivideos_width).data('iframe_src', $lbt_ivideos_src).data('frameborder', $lbt_ivideos_frameborder).data('fullscreen', $lbt_ivideos_fullscre).data('iframe_allow', $lbt_ivideos_allow)
					]);
				
				$(this).remove();
				
			}else if(vimeo.test($lbt_ivideos_src)){
				
				$lbt_ivideos_id = $lbt_ivideos_src.match(/(?:https?:\/\/)?(?:www.|player.)?vimeo.com(?:\/*(?:video\/|))([-a-zA-Z0-9_]{9}).([\w\\-_]+)\&?/)[1];
				
				$vimeo_obj = $(this);
				
				$.getJSON('https://vimeo.com/api/oembed.json?url=https://vimeo.com/' + $lbt_ivideos_id, {format: "json"}, function(data){
					
					$lbt_ivideos_thumbnail = data.thumbnail_url;
					
					$vimeo_obj.after([
					$('<img/>').attr('src', $lbt_ivideos_thumbnail).data('lbt-thumb', $lbt_ivideos_thumbnail).css('height', $lbt_ivideos_height).css('width', $lbt_ivideos_width).data('iframe_src', $lbt_ivideos_src).data('frameborder', $lbt_ivideos_frameborder).data('fullscreen', $lbt_ivideos_fullscre).data('iframe_allow', $lbt_ivideos_allow)
						]);
					
					$vimeo_obj.remove();
					
					$lbt_images = $(options.custom_children, options.container_images);
					
				});
				
			}else{
				return;
			}
			
		});
		
		$lbt_images = $(options.custom_children, options.container_images);
		
	}
	
	function MountThumbs(obj, menu){
		
		$totalImages = $lbt_images.length;
		
		$start = Math.max(0, (Math.ceil($(obj).index(options.custom_children) - (options.qtd_pagination / 2))));
		
		$final = Math.min(($totalImages - 1), (Number.isInteger($f = ((Math.floor($(obj).index(options.custom_children)) + (options.qtd_pagination / 2)))) ? ($f - 1) : $f ) );
		
		
		
		
		if($start == 0){
			
			$final = Math.min((options.qtd_pagination - 1), ($totalImages - 1));
			
		}else if($final == ($totalImages -1)){
			
			$start = Math.max(0, ($totalImages - options.qtd_pagination));
			
		}
		
		for (var i = $start; i <= $final; i++) {
		   
		   $thumb = null;
		   
		   if(i != $(obj).index(options.custom_children)){
				
				$(menu, options.container_lightbox).append([
					$('<li/>').append([
						$thumb = $('<img/>',{"class": "lbr-thumb"}).data('thumb_id', i).css({width: options.pagination_width, height: options.pagination_height})
					])
				]);
				
			}else{
				
				$(menu, options.container_lightbox).append([
					$('<li/>').append([
						$thumb = $('<img/>',{"class": "lbr-thumb"}).data('thumb_id', i).addClass('active').css({width: options.pagination_width, height: options.pagination_height})
					])
				]);
				
			}
			
			
			if(typeof $lbt_images.eq(i).data('lbt-thumb') == 'undefined'){
				
				CreateThumb($lbt_images.eq(i), {h:Number(options.pagination_height.replace("px", "")), w:Number(options.pagination_width.replace("px", ""))}, $thumb);
				
			}else{
				
				$($thumb).attr('src', $lbt_images.eq(i).data('lbt-thumb'));
				
			}
			
		}
		
	}	
		
	function LoadImages(imgs){
		
		$(imgs).each(function(i){
			
			if(typeof $(this).attr('src') !== 'undefined'){
				
				if($(this).attr('src').match('^blob:https?:\/\/(?:www\.)?') == null){
					
					ImageTob64(this);
					
				}
				
			}
			
		});
		
	}
	
	function CreateThumbs(imgs, rate){
		
		$(imgs).each(function(i){
			
			ResizeImage($(this).attr('src'), rate, this);
			
		});
		
	}
	
	function CreateThumb(img, rate, thumb){
		
		ResizeImage($(img).attr('src'), rate, $(img, options.container_lightbox), thumb);
		
	}
	
	async function GetThumHTML5Video(url, obj, width, height){
	
		  const video = document.createElement("video");
		  const canvas = document.createElement("canvas");
		  video.style.display = "none";
		  canvas.style.display = "none";
		  
		  video.setAttribute('crossOrigin', 'anonymous');

		  // Trigger video load
		await new Promise((resolve, reject) => {
			video.addEventListener("loadedmetadata", () => {
			  video.width = width;
			  video.height = height;
			  canvas.width = width;
			  canvas.height = height;
			  // Seek the video to 25%
			  video.currentTime = video.duration * 0.25;
			});
			video.addEventListener("seeked", () => resolve());
			video.src = url;
		});

		  // Draw the thumbnail
		canvas.getContext("2d").drawImage(video, 0, 0, width, height);
		const imageUrl = canvas.toDataURL("image/png");

		$(obj).attr('src', imageUrl);
		
	}
	
	function ResizeImage(url, rate, obj, thumb = null){
		rate = rate || {};
		rate.q = rate.q || 1;
		rate.r = rate.r || 1;

		var image = new Image();

		image.setAttribute('crossOrigin', 'anonymous');
		
		image.src = url;
		
		image.onload = function () {
			var canvas = document.createElement('canvas');
			if(rate.w && rate.h){				
				if(rate.w > rate.h){
					canvas.width = rate.w;
					canvas.height = this.naturalHeight * rate.w / this.naturalWidth;
				}else{
					canvas.width = this.naturalWidth * rate.h / this.naturalHeight;
					canvas.height = rate.h;
				}				
			}else if(rate.w) {
				canvas.width = rate.w;
				canvas.height = this.naturalHeight * rate.w / this.naturalWidth;
			}else if(rate.h) {
				canvas.width = this.naturalWidth * rate.h / this.naturalHeight;
				canvas.height = rate.h;
			}else{
				canvas.width = this.naturalWidth * rate.r;
				canvas.height = this.naturalHeight * rate.r;
			}

			canvas.getContext('2d').drawImage(this, 0, 0, canvas.width, canvas.height);
			
			CB_Updater(canvas.toDataURL(), obj, thumb);
		};

	}
	
	async function ImageTob64(obj){
		
		var image = new Image();

		image.setAttribute('crossOrigin', 'anonymous');
		
		image.src = $(obj).attr('src');
		
		image.onload = function(){
			
			var canvas = document.createElement('canvas');
			canvas.height = this.naturalHeight;
			canvas.width = this.naturalWidth;			
			canvas.getContext('2d').drawImage(this, 0, 0);
			
			CB_Updater(canvas.toDataURL(), obj, false, true);
			
		};
		
		await image.decode();
		
	}
	
	function CB_Updater(dataUrl, img, thumb, gallery = false){
		
		if(gallery){
			
			$oimage = $(img, options.container_lightbox).attr('src');
			
			$(img, options.container_lightbox).attr('src', dataUrl);
			
			$blob = ConvertToBlob(dataUrl);
			
			$(img, options.container_lightbox).attr('src', URL.createObjectURL($blob));
			
			//SaveBD($blob, $oimage);
			
			let _image = {
			  type: $oimage,
			  image: $blob,
			  created: new Date()
			};
			
			saveToIndexedDB('images', _image);
			
		}else{
			$(img, options.container_lightbox).data('lbt-thumb', dataUrl);
		}
		
		if(thumb){
			
			$(thumb, options.container_lightbox).attr('src', dataUrl);
			
		}
		
	};
	
	async function LoadBdImages(imgs){
		
		for (var i = 0; i < $(imgs).length; i++) {
			await loadFromIndexedDB('images', $(imgs).eq(i).attr('src')).then(function($res){
				$(imgs).eq(i).attr('src', URL.createObjectURL($res['image']));
			}).catch(function(error){
			});
		}
		
		LoadImages($lbt_images);
		
	}
	
	function ConvertToBlob(dataUrl){
		
		let contentType = dataUrl.split(";base64")[0].replace('data:', '');		
		
		return base64toBlob(dataUrl.split(",")[1], contentType);
		
	}
	
    return this.each(function(i){
		
		$id = "#" + "lbt-lightbox_" + (Math.floor(Math.random() * 999) + i);
		$idi = "#" + (typeof $(this).attr('id') == 'undefined' ? $(this).attr('id', "lbt-imgs_" + (Math.floor(Math.random() * 999) + i)).attr('id') : $(this).attr('id'));
		
		$("body").append([
			$con_lightbox = $('<div/>',{"id": $id.replace("#", "")})
		]);
		
		options = $.extend({lbt_id: $id, lbr_id: $idi, container_images: this, container_lightbox: $con_lightbox}, options);
		setListeners(this, options);
		
    });
  };
})(jQuery);