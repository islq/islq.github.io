// JavaScript Document
var kk = "";
var tabId = -1;
var capsId = -1;
var input_content = "";
var _position = 0;
var max_width = 560;

ns_keyboard_l = new Image();ns_keyboard_l.src ='keyboard/ns_keyboard_l.png';ns_keyboard_l.onload = function(){};
ns_keyboard_u = new Image();ns_keyboard_u.src ='keyboard/ns_keyboard_u.png';ns_keyboard_u.onload = function(){};
ns_keyboard_m = new Image();ns_keyboard_m.src ='keyboard/ns_keyboard_m.bmp';ns_keyboard_m.onload = function(){};
ns_keyboard_r = new Image();ns_keyboard_r.src ='keyboard/ns_keyboard_r.png';ns_keyboard_r.onload = function(){};
ns_keyboard_d = new Image();ns_keyboard_d.src ='keyboard/ns_keyboard_d.png';ns_keyboard_d.onload = function(){};
function openT(left1,top1,deal,content)
{
	tabId = 1;
	capsId = 1;
	input_content = content+"|";
	_position = content.length;
	kk = document.createElement("DIV");
	kk.id="system_keyboard";
	kk.style.cssText="z-index:9999;position:absolute;left:"+left1+"px;top:"+top1+"px;width:538px;height:290px;";
	
	var content = "<img class = \"frame\" id=\"frame_left\" src=\"keyboard/ns_keyboard_l.png\"/><img class = \"frame\" id=\"frame_top\" src=\"keyboard/ns_keyboard_u.png\"/><img class = \"frame\" id=\"frame_middle\" src=\"keyboard/ns_keyboard_m.bmp\"/><img class = \"frame\" id=\"frame_right\" src=\"keyboard/ns_keyboard_r.png\"/><img class = \"frame\" id=\"frame_down\" src=\"keyboard/ns_keyboard_d.png\"/>";
	
	content+="<div id=\"input_content\"><a id=\"content_a\" href=\"javascript:void(0)\" class = \"input_bg\" id=\"input_middle\">|</a></div>";
	
	//lower case letters
	content+="<div id=\"input_button\"><div id=\"tab1\"><table class=\"tab\"><tr><td><a id=\"focus_a\" href=\"javascript:void(0)\" tabindex=\"1\">a</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">b</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">c</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">d</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">e</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">f</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">g</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">h</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">i</a></td><td><a id=\"focus_j\" href=\"javascript:void(0)\" tabindex=\"1\">j</a></td></tr>";
	
	content+=" <tr><td><a id=\"focus_k\" href=\"javascript:void(0)\" tabindex=\"1\">k</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">l</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">m</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">n</a><td><a href=\"javascript:void(0)\" tabindex=\"1\">o</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">p</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">q</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">r</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">s</a></td><td><a id=\"focus_t\" href=\"javascript:void(0)\" tabindex=\"1\">t</a></td></tr>";
	
	content+="<tr><td><a id=\"focus_u\" href=\"javascript:void(0)\" tabindex=\"1\">u</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">v</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">w</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">x</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">y</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">z</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">:</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">.</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">/</a></td><td><a id=\"focus_sp\" href=\"javascript:void(0)\" tabindex=\"1\">sp</a></td></tr></table></div>";
	
	//uppercase letter
	content+="<div id=\"tab2\"><table class=\"tab\" ><tr><td><a id=\"focus_A\" href=\"javascript:void(0)\" tabindex=\"1\">A</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">B</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">C</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">D</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">E</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">F</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">G</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">H</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">I</a></td><td><a id=\"focus_J\" href=\"javascript:void(0)\" tabindex=\"1\">J</a></td></tr>";
     content+="<tr><td><a id=\"focus_K\" href=\"javascript:void(0)\" tabindex=\"1\">K</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">L</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">M</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">N</a><td><a href=\"javascript:void(0)\" tabindex=\"1\">O</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">P</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">Q</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">R</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">S</a></td><td><a id=\"focus_T\" href=\"javascript:void(0)\" tabindex=\"1\">T</a></td></tr>";
     content+="<tr><td><a id=\"focus_U\" href=\"javascript:void(0)\" tabindex=\"1\">U</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">V</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">W</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">X</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">Y</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">Z</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">:</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">.</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">/</a></td><td><a id=\"focus_SP\" href=\"javascript:void(0)\" tabindex=\"1\">SP</a></td></tr></table></div>";
	 
	 //num
	 content+=" <div id=\"tab3\"><table class=\"tab\" ><tr><td><a id=\"focus_0\" href=\"javascript:void(0)\" tabindex=\"1\">0</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">1</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">2</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">3</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">4</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">5</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">6</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">7</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">8</a></td><td><a id=\"focus_9\" href=\"javascript:void(0)\" tabindex=\"1\">9</a></td></tr>";
      content+="<tr><td><a id=\"focus_gt\" href=\"javascript:void(0)\" tabindex=\"1\">!</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">@</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">#</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">/</a><td><a href=\"javascript:void(0)\" tabindex=\"1\">%</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">&</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\"><</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">></a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">*</a></td><td><a id=\"focus_jh\" href=\"javascript:void(0)\" tabindex=\"1\">+</a></td></tr>";
       content+="<tr><td><a id=\"focus_xh\" href=\"javascript:void(0)\" tabindex=\"1\">_</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">-</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">,</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">~</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">;</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">(</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">)</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">[</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">]</a></td><td><a id=\"focus_wh\" href=\"javascript:void(0)\" tabindex=\"1\">?</a></td></tr></table></div>";
	   
	   content+="<table id=\"tab_bottom\"><tr><td colspan=\"2\"><a id=\"delete\" href=\"javascript:void(0)\" tabindex=\"1\"><<-</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\" id=\"caps\">CAPS</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\" id=\"num\">Num</a></td><td><a href=\"javascript:void(0)\" tabindex=\"1\">Save</a></td><td><a id=\"clear\" href=\"javascript:void(0)\" tabindex=\"1\">Clear</a></td></tr></table></div>";
	kk.innerHTML = content ;
	body.appendChild(kk);
	$("#system_keyboard a:focus").css("outline","none");
	$("#system_keyboard .frame").css("position","absolute");
	$("#system_keyboard #frame_left").css("left",0);
	$("#system_keyboard #frame_top").css("left",ns_keyboard_l.width);
	
	$("#system_keyboard #frame_middle").css("width",ns_keyboard_u.width).css("top",ns_keyboard_u.height).css("left",ns_keyboard_l.width).css("height",ns_keyboard_m.height);
	$("#system_keyboard #frame_right").css("left",ns_keyboard_u.width+ns_keyboard_l.width);
	$("#system_keyboard #frame_down").css("left",ns_keyboard_l.width).css("top",ns_keyboard_u.height+ns_keyboard_m.height);
	
	$("#system_keyboard #input_content").css("position","relative").css("top","26px").css("left","24px");
	
	$("#system_keyboard #input_content a").css("text-align","left").css("width","490px").css("height","39px").css("background","url(keyboard/ns_keyboard_content_nor.png) no-repeat").css("background-size","100%");
	$("#system_keyboard .input_bg").css("position","absolute");
	$("#system_keyboard #input_button").css("position","relative").css("top","76px").css("left","20px");
	$("#system_keyboard #input_button table").css("-webkit-border-horizontal-spacing","8px").css("-webkit-border-vercial-spacing","6px");
	$("#system_keyboard #input_button #tab2").css("display","none");
	$("#system_keyboard #input_button #tab3").css("display","none");
	$("#system_keyboard a").css("display","inline-block").css("text-decoration","none").css("color","#000").css("text-align","center").css("line-height","40px");
	$("#system_keyboard #input_button a").css("width","39px").css("height","39px").css("background","url(keyboard/ns_keyboarditm_nor.png) no-repeat");
	$("#system_keyboard #input_button #tab_bottom").css("margin-top","6px");
	$("#system_keyboard #input_button #tab_bottom a").css("width","88px").css("height","39px").css("background","url(keyboard/ns_keyboarditm2_nor.png) no-repeat").css("background-size","100%");
	
	$("#system_keyboard #input_content a").html(input_content);
	$("#system_keyboard #focus_a").focus().css("background","url(keyboard/ns_keyboarditm_selected.png) no-repeat");
	
	
	//left
	$("#system_keyboard #focus_a").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 37:
			{
				$("#system_keyboard #focus_j").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_k").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 37:
			{
				$("#system_keyboard #focus_t").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_u").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 37:
			{
				$("#system_keyboard #focus_sp").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_A").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 37:
			{
				$("#system_keyboard #focus_J").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_K").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 37:
			{
				$("#system_keyboard #focus_T").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_U").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 37:
			{
				$("#system_keyboard #focus_SP").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_0").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 37:
			{
				$("#system_keyboard #focus_9").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_gt").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 37:
			{
				$("#system_keyboard #focus_jh").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_xh").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 37:
			{
				$("#system_keyboard #focus_wh").focus();
				e.preventDefault();
			}
			break;
		}
	});
	
	$("#system_keyboard #delete").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 37:
			{
				$("#system_keyboard #clear").focus();
				e.preventDefault();
			}
			break;
		}
	});
	
	
	//right
	$("#system_keyboard #focus_j").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 39:
			{
				$("#system_keyboard #focus_a").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_t").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 39:
			{
				$("#system_keyboard #focus_k").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_sp").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 39:
			{
				$("#system_keyboard #focus_u").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_J").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 39:
			{
				$("#system_keyboard #focus_A").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_T").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 39:
			{
				$("#system_keyboard #focus_K").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_SP").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 39:
			{
				$("#system_keyboard #focus_U").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_9").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 39:
			{
				$("#system_keyboard #focus_0").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_jh").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 39:
			{
				$("#system_keyboard #focus_gt").focus();
				e.preventDefault();
			}
			break;
		}
	});
	$("#system_keyboard #focus_wh").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 39:
			{
				$("#system_keyboard #focus_xh").focus();
				e.preventDefault();
			}
			break;
		}
	});
	
	$("#system_keyboard #clear").keydown(function(e)
	{
		switch(e.keyCode)
		{
			case 39:
			{
				$("#system_keyboard #delete").focus();
				e.preventDefault();
			}
			break;
		}
	});
	
	$("#system_keyboard #input_content a").keydown(function(e)
	{
		length_in = input_content.length;
		if(length_in>1)
		{
			switch(e.keyCode)
			{
				case 37:
				{	
					var last_position = _position;
					_position = (_position + length_in -1)%length_in;
					if(last_position<_position)
					{
						input_content = addChar(input_content,_position+1,"|");
						input_content = deleteChar(input_content,last_position,1);
					}
					else
					{
						input_content = deleteChar(input_content,last_position,1);
						input_content = addChar(input_content,_position,"|");
					}
					$("#system_keyboard #input_content a").html(input_content);
					e.preventDefault();
				}
				break;
				case 39:
				{
					var last_position = _position;
					_position = (_position + 1)%length_in;
					if(last_position<_position)
					{
						input_content = addChar(input_content,_position+1,"|");
						input_content = deleteChar(input_content,last_position,1);
					}
					else
					{
						input_content = deleteChar(input_content,last_position,1);
						input_content = addChar(input_content,_position,"|");
					}
					$("#system_keyboard #input_content a").html(input_content);
					e.preventDefault();
				}
				break;
				case 13:
				{
					var last_position = _position;
					_position = length_in -1;
					if(last_position<_position)
					{
						input_content = addChar(input_content,_position+1,"|");
						input_content = deleteChar(input_content,last_position,1);
					}
					else
					{
						input_content = deleteChar(input_content,last_position,1);
						input_content = addChar(input_content,_position,"|");
					}
					$("#system_keyboard #input_content a").html(input_content);
					e.preventDefault();
				}
				break;
			}
		}
		
	});
	
	
	$("#system_keyboard .tab a").focus(
		function(e)
		{
			$(this).css("background","url(keyboard/ns_keyboarditm_selected.png) no-repeat");	
		}
	);
	$("#system_keyboard .tab a").blur(
		function(e)
		{
			$(this).css("background","url(keyboard/ns_keyboarditm_nor.png) no-repeat");	
		}
	);
	
	
	$("#system_keyboard #input_content a").focus(
		function(e)
		{
			$(this).css("background","url(keyboard/ns_keyboard_content_selected.png) no-repeat").css("background-size","100%");	
		}
	);
	$("#system_keyboard #input_content a").blur(
		function(e)
		{
			$(this).css("background","url(keyboard/ns_keyboard_content_nor.png) no-repeat").css("background-size","100%");	
		}
	);
	
	
	$("#system_keyboard #tab_bottom a").focus(
		function(e)
		{
			$(this).css("background","url(keyboard/ns_keyboarditm2_selected.png) no-repeat").css("background-size","100%");	
		}
	);
	$("#system_keyboard #tab_bottom a").blur(
		function(e)
		{
			$(this).css("background","url(keyboard/ns_keyboarditm2_nor.png) no-repeat").css("background-size","100%");	
		}
	);
	$("#system_keyboard a").click(
		function(e)
		{	
			if($(this).attr("id")!="delete" && $(this).attr("id")!="content_a")
			{
				var text = 	$(this).html();
				if(text =="CAPS")
				{
					if(tabId == 2)
					{
						$("#system_keyboard #tab2").css("display","none");
						$("#system_keyboard #tab1").css("display","block");
						tabId = 1;
						capsId = 1;
					}
					else
					{
						$("#system_keyboard #tab"+tabId).css("display","none");
						$("#system_keyboard #tab2").css("display","block");
						tabId = 2;
						capsId = 2;
					}
				}
				else if(text =="Num")
				{
					if(tabId == 3)
					{
						$("#system_keyboard #tab3").css("display","none");
						$("#system_keyboard #tab"+capsId).css("display","block");
						tabId = capsId;
					}
					else
					{
						$("#system_keyboard #tab"+tabId).css("display","none");
						$("#system_keyboard #tab3").css("display","block");
						tabId = 3;
					}
				}
				else if(text =="Save")
				{
					deal(deleteChar(input_content,_position,1));
					closeT();
				}
				else if(text =="Clear")
				{
					input_content = "|";
					_position = 0;
					$("#input_content a").html(input_content);
				}
				else if(text == "sp" || text == "SP")
				{
					ctx.font = "20px Arial";
					var width_conent = ctx.measureText(input_content).width;
					if(width_conent<max_width)
					{
						input_content = addChar(input_content,_position," ");
						_position ++;
					}
					$("#input_content a").html(input_content);
				}
				else
				{	
					ctx.font = "20px Arial";
					var width_conent = ctx.measureText(input_content).width;
					if(width_conent<max_width)
					{
						input_content = addChar(input_content,_position,text);
						_position ++;
					}
					$("#input_content a").html(input_content);
				}
			}
			else
			{
				if($(this).attr("id") == "delete")
				{
					var len =input_content.length; 
					if(_position>0)
					{
							input_content = deleteChar(input_content,_position-1,1);
							_position -- ;
					}
					$("#system_keyboard #input_content a").html(input_content);
				}
				else
				{
					
				}
			}
		}
	);
	
	window.onkeydown = function(ev)
	{
		var oEvent = ev || event; 
		
		if(kk!="")
		{
			switch(oEvent.keyCode)
			{
				case 48:
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54:
				case 55:
				case 56:
				case 57:
				{
					ctx.font = "20px Arial";
					var width_content = ctx.measureText(input_content).width;
					if(width_content<max_width)
					{
						input_content = addChar(input_content,_position,oEvent.keyCode-48);
						_position ++;
					}
					$("#input_content a").html(input_content);
				}
				break;
			}
		}
		
	}
}

function addChar(str,sn,ch)
{
	var result="";
	result = str.substring(0,sn)+ch+str.substring(sn,str.length);
	
	return result;
}


function deleteChar(str,sn,num)
{
	var result = "";
	
	result = str.substring(0,sn) + str.substring(sn+num,str.length);

	return result;
}

function closeT()
{
	if(body!=""&&kk!="")
	{
		if(document.getElementById("system_keyboard"))
		{
			body.removeChild(kk);
		}
		kk="";
		capsId = -1;
		tabId = 1;
		input_content = "";
		_position = 0;
	}
	
}