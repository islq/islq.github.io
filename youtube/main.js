// JavaScript Document

var ns_bkhead = new Image();ns_bkhead.src = "pic/ns_bkhead.jpg";

var ns_navigation = new Image();ns_navigation.src="pic/ns_navigation.png";
var ns_mute = new Image();ns_mute.src = "pic/ns_mute.png";
var ns_play = new Image();ns_play.src = "pic/ns_play.png";
var ns_edittype = new Image();ns_edittype.src = "pic/ns_edittype.jpg";

var ns_process_bg = new Image();ns_process_bg.src = "pic/ns_process_bg.png";
var ns_process_left = new Image();ns_process_left.src = "pic/ns_process_left.png";
var ns_process_middle = new Image();ns_process_middle.src = "pic/ns_process_middle.png";
var ns_process_right = new Image();ns_process_right.src = "pic/ns_process_right.png";

var ns_b_l = new Image();ns_b_l.src = "pic/ns_b_l.png";
var ns_b_m = new Image();ns_b_m.src = "pic/ns_b_m.bmp";
var ns_b_r = new Image();ns_b_r.src = "pic/ns_b_r.png";

var ns_yellow = new Image();ns_yellow.src = "pic/ns_yellow.bmp";
var ns_blue = new Image();ns_blue.src = "pic/ns_blue.bmp";
var ns_green = new Image();ns_green.src = "pic/ns_green.bmp";
var ns_menu = new Image();ns_menu.src = "pic/ns_menu.png";

var ns_ysetl = new Image();ns_ysetl.src = "pic/ns_ysetl.png";
var ns_ysetm = new Image();ns_ysetm.src = "pic/ns_ysetm.bmp";
var ns_ysetr = new Image();ns_ysetr.src = "pic/ns_ysetr.png";

var ns_cbiteml = new Image();ns_cbiteml.src = "pic/ns_cbiteml.png";
var ns_cbitemm = new Image();ns_cbitemm.src = "pic/ns_cbitemm.bmp";
var ns_cbitemr = new Image();ns_cbitemr.src = "pic/ns_cbitemr.png";



var body;
var canvas;
var canvas1;
var canvas2;
var player_div;
var ctx;
var ctx1;
var ctx2;
var window_height = 695;//694;
var window_width = 1242;//1240;

var player;
var videoList;
var keyWord = "";
var totalResults = 0;
var focus_position;
var top_up = 115+26;

var isPlay = false;
var isFirstPlay = true;
var isKeyBoardShow = false;

var current_dialog_object;
var seek_object = new SeekClass();
var info_tip_object = new InfoTipClass();

var isSwitchLang = false;

function initData()
{
	focus_position = 0;
	body = document.getElementsByTagName("body")[0];
	player_div = document.getElementById("player_div");
	canvas=document.getElementById("myCanvas");
	canvas.height = window_height;
	canvas.width =  window_width;
	ctx=canvas.getContext('2d');
	canvas1=document.getElementById("myCanvas1");
	canvas1.height = window_height;
	canvas1.width =  window_width;
	ctx1=canvas1.getContext('2d');
	canvas2=document.getElementById("myCanvas2");
	canvas2.height = window_height;
	canvas2.width =  window_width;
	ctx2=canvas2.getContext('2d');
	clearScreen();
	current_dialog_object = null;
	completeLoading();
}

function clearScreen()
{
	ctx.clearRect(0,0,window_width,window_height);
	ctx.fillStyle="black";
	ctx.fillRect(0,0,window_width,window_height);
}

function upMove()
{
	focus_position = focus_position -1 ;
	
	if(focus_position<0)
	{
		focus_position = 4;
		if(results.prepage!="")
		{
			results.current_page --;
			var param = getSearchParam({pageToken:results.prepage});
			search(param);
		}
		else
		{
			drawList();
			drawInfo();
		}
	}
	else
	{
		drawList();
		drawInfo();
	}
}


function downMove()
{
	focus_position = focus_position + 1;
	if(focus_position>=5)
	{
		focus_position = 0;
		if(results.nextpage!="")
		{
			results.current_page ++;
			var param = getSearchParam({pageToken:results.nextpage});
			search(param);
		}
		else
		{
			drawList();
			drawInfo();
		}
	}
	else
	{
		drawList();
		drawInfo();
	}
	
}


function toMenu()
{
	var option = 
	{
		q:""
	}
	var param = getSearchParam(option);
	if(keyWord!="")
	{
		search(param);
	}
	else
	{
		if(results.current_page != 0)
		{
			
			search(param);
		}
	}
	
	results.current_page = 0;
	keyWord = "";
}

function leftPage()
{
	if(results.prepage!="")
	{
		results.current_page --;
		var param = getSearchParam({pageToken:results.prepage});
		search(param);
	}
	
}

function rightPage()
{
	if(results.nextpage!="")
	{
		results.current_page ++;
		var param = getSearchParam({pageToken:results.nextpage});
		search(param);
	}	
}


function ok()
{
	isPlay = true;
	$("#player_div").show();
	$("#myCanvas").hide();
    $("#myCanvas1").hide();
    $("#myCanvas2").hide();
	//$("#player_div").css("z-index",2);
	//$("#myCanvas").css("z-index",1);
	videoLoaing = true;
	
	if(isFirstPlay!=true)
	{
		playById();
	}
	else
	{
		isFirstPlay = false;
		playLoader();
	}
	//ctx.clearRect(0,0,window_width,window_height);
}

function keySwitchLang()
{
	listSelectObject.show(lang_param);
	isSwitchLang = true;
}



function mainkeydown(keyCode)
{
	switch(keyCode)
	{
		case 38:
		{
			upMove();
		}
		break;
		case 40:
		{
			downMove();
		}
		break;
		
		case 37:
		{
			leftPage();
		}
		break;
		case 39:
		{
			rightPage();
		}
		break;
		case 415:
		case 13:
		{
			//console.log("ssssssssssssssssssssslllllllllllll");
			ok();
		}
		break;
		case 8:
		{
			toMenu();
		}
		break;
		case 405:
		{
			keySearch();
		}
		break;
		case 406:
		{
			keySwitchLang();
		}
		break;
	}
}


function searchkeydown(keyCode)
{
	switch(keyCode)
	{
		case 8:
		{
			isKeyBoardShow = false;
			isSearch = false;
			closeT();
		}
		break;
	}
}

function switchkeydown(keyCode)
{
	listSelectObject.keydownevent(keyCode);
}

window.onload = function()
{
	initData();
	
	document.onkeydown = function (ev)
	{
		var oEvent = ev || event;
		console.log("skkks:"+oEvent.keyCode+"  ss:"+isSearch);
		
		if(!isSearch)
		{
			if(!isSwitchLang)
			{
				if(!isPlay)
				{
					mainkeydown(oEvent.keyCode);
				}
				else
				{
					playkeydown(oEvent.keyCode);
				}
			}
			else
			{
				switchkeydown(oEvent.keyCode);
			}

		}
		else
		{
			searchkeydown(oEvent.keyCode);
		}
		
		if(isKeyBoardShow == false)
		{
			oEvent.preventDefault();
		}
	}
	
}

//test
