// JavaScript Document

var volper = 4;
var vol_timer="";
var videoLoaing = false;//player is loading video;
function playLoader()
{
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}	

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onYouTubeIframeAPIReady(videoId) 
{
	player = new YT.Player('player', 
	{
		height: window_height,
		width: window_width,
		videoId: videoList[focus_position][0],
		events: 
		{
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) 
{
	event.target.playVideo();
	player.setVolume(volper*10);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) 
	{
		
	}
	
	if (event.data !=-1) 
	{
		videoLoaing = false;
	}
	
	if(event.data == YT.PlayerState.ENDED)
	{
		toList();
	}
}
function stopVideo() 
{
	player.stopVideo();
}

//pause = 1;pause mute else clear;
function pauseShow(pause)
{
	var width_frame = ns_play.width;
	var height_frame = ns_play.height;
	
	var left_frame = (window_width-width_frame)/2;
	var top_frame = (window_height-height_frame)/2;
	
	
	ctx1.clearRect(left_frame,top_frame,width_frame,height_frame);
	if(pause == 1)
	{
		ctx1.drawImage(ns_play,left_frame,top_frame);
	}
}

function playById()
{
	player.loadVideoById(videoList[focus_position][0],0,'default');
}

function volumeShow(vol)
{
	var left_frame = 50;
	var top_frame = 620;
	var width_frame = ns_process_bg.width;
	var height_frame = ns_process_bg.height;
	var height_process = ns_process_middle.height;
	
	var left_process = left_frame+11;
	var top_process = top_frame+8;
	var left_vol = left_frame+356;
	var top_vol = top_frame+height_frame*0.75;
	var perp = 3;
	
	
	if(vol_timer!="")
	{
		clearTimeout(vol_timer);
	}
	
	vol_timer = setTimeout(function()
	{
		ctx1.clearRect(left_frame,top_frame,width_frame,height_frame);
	},3000);
	
	ctx1.clearRect(left_frame,top_frame,width_frame,height_frame);
	ctx1.drawImage(ns_process_bg,left_frame,top_frame);
	
	if(vol>=1)
	{
		ctx1.drawImage(ns_process_left,left_process,top_process);
	}
	
	if(vol == 2)
	{
		ctx1.drawImage(ns_process_right,left_process+perp,top_process);
	}
	
	if(vol >=3)
	{
		ctx1.drawImage(ns_process_middle,left_process+perp,top_process,(vol-2)*perp,height_process);
		ctx1.drawImage(ns_process_right,left_process+perp+(vol-2)*perp,top_process);
	}
	
	ctx1.font = "12px Arial";
	ctx1.fillStyle="white";
	ctx1.textAlign = "center";
	
	ctx1.fillText(vol/volper,left_vol,top_vol);
}

//mute = 1;show mute else clear;
function muteShow(mute)
{
	var left_frame = 50;
	var top_frame = 20;
	
	var width_frame = ns_mute.width;
	var height_frame = ns_mute.height;
	
	ctx1.clearRect(left_frame,top_frame,width_frame,height_frame);
	if(mute == 1)
	{
		ctx1.drawImage(ns_mute,left_frame,top_frame);
	}
}

function muteSet()
{
	if(player.isMuted() == false)
	{
		player.mute();
		muteShow(1);
	}
	else
	{
		player.unMute();
		muteShow(0);
	}
}

function seekTurnTo(time)
{
	var total_time = player.getDuration();
	if(time < total_time)
	{
		player.seekTo(time,true);
	}
	else
	{
		var param = 
		{
			title:"Information",
			content:"Time is over !",
			timeout:2000
		};
		current_dialog_object = info_tip_object;
		current_dialog_object.show(param);
		setTimeout(function()
		{
			current_dialog_object=seek_object;
			var param = 
			{
				name:"Seek Play",
				fun_ok:function(time)
				{
					seekTurnTo(time);
				}
			}
			current_dialog_object.show(param);
		},2000);
	}
}

function seek()
{
	current_dialog_object=seek_object;
	var param = 
	{
		name:"Seek Play",
		fun_ok:function(time)
		{
			seekTurnTo(time);
		}
	}
	current_dialog_object.show(param);
}

function toList()
{
	isPlay = false;
	player.stopVideo();
	$("#player_div").css("z-index",1);
	$("#myCanvas").css("z-index",2);
	drawList();
	drawInfo();
}

function upVolume()
{
	//console.log("volup:"+player.getVolume());
	if(player.getVolume() < 100)
	{
		var vol;
		if(player.getVolume()%4 != 0)
		{
			vol = player.getVolume()-player.getVolume()%4+4+4;
		}
		else
		{
			vol = player.getVolume()+volper;
		}
		
		player.setVolume(vol);
	}
	
	if(player.getVolume()%4 !=0)
	{
		volumeShow(player.getVolume()-player.getVolume()%4+4);
	}
	else
	{
		volumeShow(player.getVolume());
	}
	
	//console.log("volup:"+player.getVolume());
}

function downVolume()
{
	if(player.getVolume() >0)
	{
		//console.log("voldown:"+player.getVolume());
		
		var vol;
		if(player.getVolume()%4 != 0)
		{
			vol = player.getVolume()-player.getVolume()%4;
		}
		else
		{
			vol = player.getVolume()-volper;
		}
		
		//console.log("volset:"+vol);
		player.setVolume(vol);
	}
	
	if(player.getVolume()%4 !=0)
	{
		volumeShow(player.getVolume()-player.getVolume()%4+4);
	}
	else
	{
		volumeShow(player.getVolume());
	}
	//console.log("voldown:"+player.getVolume());
}

function playkeydown(keyCode)
{
	console.log("play keyCode:"+keyCode);
	console.log("play videoLoaing:"+videoLoaing);
	if(player != null && videoLoaing ==false)
	{
		if(current_dialog_object != null)
		{
			current_dialog_object.keydownevent(keyCode);
			return;
		}
		switch(keyCode)
		{
			//seek
			case 404:
			{
				seek();
			}
			break;
			//vol
			case 39:
			case 175:
			{
				upVolume();
			}
			break;
			case 37:
			case 174:
			{
				downVolume();
			}
			break;
			//mute
			case 173:
			{
				//console.log("value:"+player.isMuted());
				muteSet();
			}
			break;
			//pause
			case 19:
			{
				player.pauseVideo();
				pauseShow(1);
			}
			break;
			//play
			case 415:
			case 250:
			{
				player.playVideo();
				pauseShow(0);
			}
			break;
			
			//menu
			case 8:
			case 18:
			{
				toList();
				
			}
			break;
			
		}
	}
}
