
// JavaScript Document
function PublicDrawClass()
{	
	this.hanleCharacter=function(name)
	{
		var nameH = name;
		if(name.charCodeAt(0) ==5 )
		{
			nameH = name.substring(1,name.length);
		}
		return nameH;
	}
	this.drawCenterFrame = function(img,left,top,height)
	{
		var width = img.width-4;
		var top1 = top+img.height-1;
		ctx.drawImage(img,left,top);//change
		ctx.lineWidth=1;
		ctx.strokeStyle = "rgba(255,255,255,0.7)";
		ctx.strokeRect(left+2,top1,width,height);
		
	}

	this.drawRoundStroke = function(ctx,left,top,width,height,radius,widthLine,rgba)
	{
		ctx.strokeStyle = rgba;
		ctx.lineWidth=widthLine;
		ctx.beginPath();
		ctx.moveTo(left+1,top+height-radius);
		ctx.arcTo(left+1,top,left+radius,top,radius); 
	
		ctx.lineTo(left+1+width-radius,top);
		ctx.arcTo(left+1+width,top,left+1+width,top+radius,radius);
		ctx.lineTo(left+1+width,top+height-radius);
		ctx.arcTo(left+1+width,top+height,left+1+width-radius,top+height,radius); 
	
		ctx.lineTo(left+1+radius,top+height);
		ctx.arcTo(left+1,top+height,left+1,top+height-radius,radius);
		ctx.stroke();
	}

	this.drawRoundRect = function(cornerX, cornerY, width, height, cornerRadius,context) 
	{
		context.beginPath();
 		if (width> 0) context.moveTo(cornerX + cornerRadius, cornerY);
 		else  context.moveTo(cornerX - cornerRadius, cornerY);
  		context.arcTo(cornerX+width,cornerY,cornerX + width,cornerY+height,cornerRadius);
  		context.arcTo(cornerX+width,cornerY + height,cornerX,cornerY+height,cornerRadius);
  		context.arcTo(cornerX,cornerY+height,cornerX,cornerY,cornerRadius);
		 if(width> 0) 
		{
			 context.arcTo(cornerX,cornerY,cornerX+cornerRadius,cornerY,cornerRadius);
		}
		 else
		{
		   context.arcTo(cornerX,cornerY,cornerX-cornerRadius,cornerY,cornerRadius);
		}
		context.fill();
	}
	
	this.formatSeconds=function(value)
	{
		var result="";
		
		var sec;
		var sec_p = value%60;
		
		if(sec_p<10)
		{
			sec = "0"+sec_p;
		}
		else
		{
			sec = ""+sec_p;
		}
		
		var value1 = Math.floor(value/60);
		
		var mint;
		if(value1==0)
		{
			mint = "00";
		}
		else
		{
			var min_p = value1%60;
			
			if(min_p<10)
			{
				mint = "0"+min_p;
			}
			else
			{
				mint = ""+min_p;
			}
		}
		
		var value2 = Math.floor(value1/60);
		
		var hour;
		if(value2==0)
		{
			hour = "00";
		}
		else
		{
			if(value2<10)
			{
				hour = "0"+value2;
			}
			else
			{
				hour = ""+value2;
			}
		}
		
		result = hour+":"+mint+":"+sec;
		
		return result;
	}
	
	this.formatKByteSize = function(size)
	{
		var result = "";
		if(size<1024)
		{
			result = result + size.toFixed(2)+"KB";
		}
		else if(size<1024*1024)
		{
			result = result + (size/1024).toFixed(2)+"MB";
		}
		else 
		{
			result = result + (size/(1024*1024)).toFixed(2)+"GB";
		}
		
		return result;
	}
	
	this.formatByteSize = function(size)
	{
		var result = "";
		if(size<1024)
		{
			result = result + size.toFixed(2)+"B";
		}
		else if(size<1024*1024)
		{
			result = result + (size/1024).toFixed(2)+"KB";
		}
		else if(size<1024*1024*1024)
		{
			result = result + (size/(1024*1024)).toFixed(2)+"MB";
		}
		else 
		{
			result = result + (size/(1024*1024*1024)).toFixed(2)+"GB";
		}
		
		return result;
	}
	
	this.textWrap = function(ctx,text,maxWidth,maxR)
	{
		console.log(text);
		var text_arr = new Array();
		var text_word = "";
		var text_r = "";
		var r=0;
		
		var exp=/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/;
		for(var i=0;i<text.length;i++)
		{
			var reg = text[i].match(exp);
			if(reg != null)
			{
				if(r<maxR-1)
				{
					if(ctx.measureText(text_r+text_word).width<=maxWidth)
					{
						
						text_r = text_r+text_word;
						
						text_word = "";
					}
					else
					{
						text_arr[r] = text_r;
						text_r = text_word;
						text_word = "";
						r++;
						
					}
				}
				else
				{
					if(ctx.measureText(text_r+text_word).width<=maxWidth-ctx.measureText(" ...").width)
					{
						text_r = text_r+text_word;
						
						text_word = "";
					}
					else
					{
						text_arr[r] = text_r+" ...";
						return text_arr;
					}
				}
				
			}
			
			text_word = text_word + text[i];
	
			if(i==text.length-1)
			{
				if(r<maxR-1)
				{
					if(ctx.measureText(text_r+text_word).width<=maxWidth)
					{
						text_r = text_r+text_word;
						text_arr[r] = text_r;
					}
					else
					{
						text_arr[r] = text_r;
						r++;
						text_arr[r] = text_word;
					}
				}
				else
				{
					if(ctx.measureText(text_r+text_word).width<=maxWidth-ctx.measureText(" ...").width)
					{
						text_r = text_r+text_word;
						text_arr[r] = text_r;
					}
					else 
					{
						text_arr[r] = text_r+" ...";
					}
				}
				
			}
		}
		
		return text_arr;
	}

	this.draw_menu_top_pic = function (picArry)
	{
		ctx.clearRect(0,0,window_width,window_height);
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, window_width, window_height);
		//draw left Arraw
		ctx.globalAlpha = 1;
		ctx.drawImage(ns_mal,180,170,50,50);
		//draw 2.no pic
		ctx.globalAlpha = 1;
		ctx.drawImage(picArry[2],360,80,250,250);
		//draw 0.no pic
		ctx.globalAlpha = 0.5;
		ctx.drawImage(picArry[0],230,140,100,100);
		//draw 1.no pic
		ctx.globalAlpha = 0.7;
		ctx.drawImage(picArry[1],270,170,100,100);
		//draw 5.no pic
		ctx.globalAlpha = 0.3;
		ctx.drawImage(picArry[5],680,70,100,100);
		//draw 4.no pic
		ctx.globalAlpha = 0.5;
		ctx.drawImage(picArry[4],640,100,100,100);
		//draw 3.no pic
		ctx.globalAlpha = 0.7;
		ctx.drawImage(picArry[3],600,140,100,100);
		//draw right arraw
		ctx.globalAlpha = 1;
		ctx.drawImage(ns_mar,780,100,50,50);
	}
	this.draw_menu_bot_pic = function(pageName)
	{
		//draw page name
		ctx.font = "45px Arial";
		ctx.textAlign="center";
		ctx.fillStyle = "white";
		ctx.fillText(pageName,480,370);
		//draw top line
		ctx.globalAlpha = 1;
		ctx.drawImage(ns_line1,280,380,400,20);
		//draw bottom line
		ctx.globalAlpha = 1;
		ctx.drawImage(ns_line1,280,660,400,20);
	}
	this.draw_menu_text = function (list_cursor,textArray)
	{
		var begin_y = 400;
		var end_y = 650;
		var begin_x = 400;
		var distance =  50;
		
		var totalPage = Math.floor(textArray.length/6)+1;
		var currentPage =  Math.floor(list_cursor/6);
		var draw_curr_text = new Array();
		for(var i=currentPage*6,j = 0;i<textArray.length && j<6;i++,j++)
		{
			draw_curr_text[j] = textArray[i];
		}

		switch (textArray.length)
		{
			case 1:
			{
				begin_y = 525;
				distance = 0;
			}
			break;
			case 2:
			{
				begin_y = 500;
				diatance = 50;
			}
			break;
			case 3:
			{
				begin_y = 490;
				diatance = 50;
			}
			break;
			case 4:
			{
				begin_y = 470;
				diatance = 50;
			}
			break;
			case 5:
			{
				begin_y = 450;
				distance = 50;
			}
			break;
			case 6:
			{
				begin_y = 420;
				distance = 45;
			}
			break;
			default :
			{
				begin_y = 420;
				distance = 45;
			}
			break;
		}
		for(var i = 0;i < draw_curr_text.length; i++)
		{
			if((list_cursor%6) == i)
			{
				ctx.font = "35px Arial";
			}
			else
			{
				ctx.font = "20px Arial";
			}
			ctx.textAlign="left";
			ctx.fillStyle = "white";
			ctx.fillText(draw_curr_text[i],400,begin_y+i*distance);
		}
		//draw cursor
		ctx.globalAlpha = 1;
		ctx.drawImage(ns_mainx,350,(begin_y-20)+(list_cursor%6)*distance,21,21);	
	}
	
	//flush time
	this.flush_top_time = function(title)
	{
		ctx.font = "40px Arial"; 
		ctx.textAlign = "left";
		ctx.fillStyle = "white";
		var textObject = ctx.measureText(title);
		var title_begin_x = (840 - textObject.width )/2  + 200;
		ctx.drawImage(ns_bkhead,0,0);
		ctx.fillText(title,title_begin_x,100);
		//ctx.fillText(title,80+150+170+10+50,100);
		ctx.font = "20px Arial"; 
		ctx.textAlign = "left";
		ctx.fillStyle = "white";
		ctx.fillText(getTopTime(),80+150+170+10+50+400,100);
	}
	//draw mid rect
	this.draw_middle_rect = function(param)
	{
		var width = ns_tlb1.width-4;
		var left = window_width/2-ns_tlb1.width/2;
		var top1 = param.by+ns_tlb1.height-1;
		var midRectHeight = param.height;
		ctx.clearRect(0,0,window_width,window_height);
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, window_width, window_height);
		ctx.drawImage(ns_tlb1,left,param.by);//change
		ctx.lineWidth=1;
		ctx.strokeStyle = "rgba(255,255,255,0.7)";
		ctx.strokeRect(left+2,top1,width,midRectHeight);		
	}
	

	this.draw_bottom_rect = function(param)
	{
		//bottom
		//(200,620)   (1040,660) 
		var bot_x = window_width/2-ns_tlb1.width/2;
		var bot_y = 620;
		var botRectWidth = 840;
		var botRectHeight = 40;
		ctx.strokeStyle = "rgba(255,255,255,0.7)"
		ctx.beginPath();
		ctx.moveTo(bot_x,bot_y+30);
		ctx.arcTo(bot_x,bot_y,bot_x+8,bot_y,4);
		ctx.lineTo(bot_x+botRectWidth-8,bot_y);
		ctx.arcTo(bot_x+botRectWidth,bot_y,bot_x+botRectWidth,bot_y+8,4);
		ctx.lineTo(bot_x+botRectWidth,bot_y+30);
		ctx.arcTo(bot_x+botRectWidth,bot_y+botRectHeight,bot_x+botRectWidth-8,bot_y+botRectHeight,4);
		ctx.lineTo(bot_x+8,bot_y+botRectHeight);
		ctx.arcTo(bot_x,bot_y+botRectHeight,bot_x,bot_y+20,4);
		ctx.lineTo(bot_x,bot_y+30);
		ctx.stroke(); 
		//move prev select
		var bimove =bot_x+40;
		var btmove=0;
		var biok=0;
		var btok=0;
		var biprev=0;
		var btprev=0;
		ctx.globalAlpha = 1;
		ctx.font = "20px Arial";
		ctx.textAlign="left";
		ctx.fillStyle = "white";
		if(param.move == 1)
		{
			ctx.drawImage(ns_move,bot_x+40,bot_y+9);
			btmove = bimove+ns_move.width+10;
			ctx.fillText(language[configure_object.language].move,btmove,bot_y+28);
			biok = btmove + (ctx.measureText(language[configure_object.language].move)).width + 20;
		}
		else
		{
			btmove = bimove;
			biok = btmove;
		}
		
		if(param.ok == 1)
		{
			ctx.drawImage(ns_ok,biok,bot_y+9);
			btok = biok + ns_ok.width + 10;
			ctx.fillText(language[configure_object.language].select,btok,bot_y+28);
			biprev = btok + (ctx.measureText(language[configure_object.language].select)).width + 20;
		}
		else
		{
			btok = biok;
			biprev = btok;
		}

		if(param.prev == 1)
		{
			ctx.drawImage(ns_menu,biprev,bot_y+9);
			btprev = biprev + ns_menu.width +10;
			ctx.fillText(language[configure_object.language].prev,btprev,bot_y+28);
		}
		
	}
	
	this.draw_bottom_pic = function(status)
	{
		//bottom
		//(200,620)   (1040,660) 
		var bot_x = window_width/2-ns_tlb1.width/2;
		var bot_y = 620;
		//move prev select
		var bimove =bot_x+40;
		var btmove=0;
		var biok=0;
		var btok=0;
		var biprev=0;
		var btprev=0;
		
		
		ctx.clearRect(bot_x-3,bot_y-3,ns_tlb1.width+6,ns_b_m.height+6);
		ctx.fillStyle = "black";
		ctx.fillRect(bot_x-4,bot_y-4,ns_tlb1.width+8,ns_b_m.height+8);
		
		
		var width_m = ns_tlb1.width-ns_b_l.width*2;
		ctx.drawImage(ns_b_l,bot_x,bot_y);
		ctx.drawImage(ns_b_m,bot_x+ns_b_l.width,bot_y,width_m,ns_b_m.height);
		ctx.drawImage(ns_b_r,bot_x+ns_b_l.width+width_m,bot_y);
		
		var space_h1 = 10;
		var space_h2 = 20;
		var top_pic  = bot_y+9;
		var top_text = bot_y+28;
		var left_start = bot_x+40;
		
		ctx.globalAlpha = 1;
		ctx.font = "20px Arial";
		ctx.textAlign="left";
		ctx.fillStyle = "white";
		if(status == 0)
		{
			ctx.drawImage(ns_move,left_start,top_pic);
			left_start = left_start+ ns_move.width+space_h1;
			ctx.fillText("Move",left_start,top_text);
			
			left_start = left_start+ctx.measureText("Move").width+space_h2;
			ctx.drawImage(ns_ok,left_start,top_pic);
			left_start = left_start+ns_ok.width+space_h1;
			ctx.fillText("Details",left_start,top_text);
			
			left_start = left_start+ctx.measureText("Details").width+space_h2;
			ctx.drawImage(ns_menu,left_start,top_pic);
			left_start = left_start + ns_menu.width+space_h1;
			ctx.fillText("Prev",left_start,top_text);
		}
		
		if(status == 1)
		{
			ctx.drawImage(ns_move,left_start,top_pic);
			left_start = left_start+ ns_move.width+space_h1;
			ctx.fillText("Move",left_start,top_text);
			
			left_start = left_start+ctx.measureText("Move").width+space_h2;
			ctx.drawImage(ns_ok,left_start,top_pic);
			left_start = left_start+ns_ok.width+space_h1;
			ctx.fillText("Info",left_start,top_text);
			
			left_start = left_start+ctx.measureText("Info").width+space_h2;
			ctx.drawImage(ns_menu,left_start,top_pic);
			left_start = left_start + ns_menu.width+space_h1;
			ctx.fillText("Channel",left_start,top_text);
			
			left_start = left_start+ctx.measureText("Channel").width+space_h2;
			ctx.drawImage(ns_blue,left_start,top_pic);
			left_start = left_start+ns_blue.width+space_h1;
			ctx.fillText("Set Timer",left_start,top_text);
		}
		
		if(status == 2)
		{
			ctx.drawImage(ns_move,left_start,top_pic);
			left_start = left_start+ ns_move.width+space_h1;
			ctx.fillText("Move",left_start,top_text);
			left_start = left_start+ctx.measureText("Move").width+space_h2;
			
			ctx.drawImage(ns_ok,left_start,top_pic);
			left_start = left_start+ns_ok.width+space_h1;
			ctx.fillText("Select",left_start,top_text);
			left_start = left_start+ctx.measureText("Select").width+space_h2;
			
			ctx.drawImage(ns_menu,left_start,top_pic);
			left_start = left_start + ns_menu.width+space_h1;
			ctx.fillText("Prev",left_start,top_text);
		}
		/*ctx.drawImage(ns_move,bot_x+40,bot_y+9);
		btmove = bimove+ns_move.width+10;
		ctx.fillText(language[configure_object.language].move,btmove,bot_y+28);
		biok = btmove + (ctx.measureText(language[configure_object.language].move)).width + 20;


		btmove = bimove;
		biok = btmove;

		
		if(param.ok == 1)
		{
			ctx.drawImage(ns_ok,biok,bot_y+9);
			btok = biok + ns_ok.width + 10;
			ctx.fillText(language[configure_object.language].select,btok,bot_y+28);
			biprev = btok + (ctx.measureText(language[configure_object.language].select)).width + 20;
		}
		else
		{
			btok = biok;
			biprev = btok;
		}

		if(param.prev == 1)
		{
			ctx.drawImage(ns_menu,biprev,bot_y+9);
			btprev = biprev + ns_menu.width +10;
			ctx.fillText(language[configure_object.language].prev,btprev,bot_y+28);
		}*/
		
	}
	
	this.draw_bottom = function(text_arr,pic_arr)
	{
		var bot_x = window_width/2-ns_tlb1.width/2;
		var bot_y = 620;
		//move prev select	
		
		ctx.clearRect(bot_x-3,bot_y-3,ns_tlb1.width+6,ns_b_m.height+6);
		ctx.fillStyle = "black";
		ctx.fillRect(bot_x-4,bot_y-4,ns_tlb1.width+8,ns_b_m.height+8);
		
		
		var width_m = ns_tlb1.width-ns_b_l.width*2;
		ctx.drawImage(ns_b_l,bot_x,bot_y);
		ctx.drawImage(ns_b_m,bot_x+ns_b_l.width,bot_y,width_m,ns_b_m.height);
		ctx.drawImage(ns_b_r,bot_x+ns_b_l.width+width_m,bot_y);
		
		var space_h1 = 10;
		var space_h2 = 20;
		var top_pic  = bot_y+9;
		var top_text = bot_y+28;
		var left_start = bot_x+20;
		
		ctx.globalAlpha = 1;
		ctx.font = "20px Arial";
		ctx.textAlign="left";
		ctx.fillStyle = "white";
		
		if(text_arr.length>0&&text_arr.length == pic_arr.length)
		{
			for(var i = 0;i<text_arr.length;i++)
			{
				ctx.drawImage(pic_arr[i],left_start,top_pic);
				left_start = left_start + pic_arr[i].width + space_h1;
				ctx.fillText(text_arr[i],left_start,top_text);
				left_start = left_start + ctx.measureText(text_arr[i]).width+space_h2;
			}
		}
	}
	
	this.volumeUp = function()
	{
		play_object.isClearScreen = false;
		//umute
		if(tvplayer.getMuteFlag() == 1)
		{
			tvplayer.setMuteFlag(0);
			mute_object.close();
		}
		//Gerenl
		if(configure_object.channel_volume_control == 1)
		{
			if(configure_object.volume < 31)
			{
				configure_object.volume = parseInt(configure_object.volume) + 1;
				tvplayer.setVolume(configure_object.volume);
			}
			volume_object.show(configure_object.volume);
		}
		//independent
		if(configure_object.channel_volume_control == 0)
		{
			if(play_object.current_service.volume < 31)
			{
				play_object.current_service.volume = play_object.current_service.volume + 1;
				tvplayer.setVolume(play_object.current_service.volume);
			}
			volume_object.show(play_object.current_service.volume);
		}
	}
	this.volumeDown = function()
	{
		play_object.isClearScreen = false;
		//umute
		if(tvplayer.getMuteFlag() == 1)
		{
			tvplayer.setMuteFlag(0);
			mute_object.close();
		}
		if(configure_object.channel_volume_control == 1)
		{
			if(configure_object.volume > 0)
			{
				configure_object.volume = parseInt(configure_object.volume) - 1;
				tvplayer.setVolume(configure_object.volume);
			}	
			volume_object.show(configure_object.volume);
		}
		//independent
		if(configure_object.channel_volume_control == 0)
		{
			if(play_object.current_service.volume > 0)
			{
				play_object.current_service.volume = play_object.current_service.volume - 1;
				tvplayer.setVolume(play_object.current_service.volume);
			}
			volume_object.show(play_object.current_service.volume);
		}
		//setTimeout(play_object.show(),3000);
	}
	this.mute = function()
	{
		if(tvplayer.getMuteFlag() == 0)
		{
			//mute
			tvplayer.setMuteFlag(1);
			mute_object.show();
		}
		else
		{
			//umute
			tvplayer.setMuteFlag(0);
			mute_object.close();
		}
	}
	this.draw_audio_background = function()
	{
		if(current_object == play_object && configure_object.effective_list >= 4)
		{
			var change_x = 30;
			var change_y = 20;
			var width_pic = 100;
			var height_pic = 50;
			var top_pic = 350;
			var top_text = top_pic+height_pic*0.7;
			var left_pic = 550;
			var left_text = left_pic+width_pic+10;
			
			ctx.clearRect(0,0,window_width,window_height);
			ctx.fillStyle="black";
			ctx.fillRect(0,0,window_width,window_height);
			
			
			ctx.textAlign = "left";
			
			ctx.font = "Bold 40px Arial";
			ctx.fillStyle = "white";
			ctx.drawImage(ns_symbol,left_pic,top_pic,width_pic,height_pic);
			ctx.fillText("teledunya",left_text,top_text);
			
			ctx.drawImage(ns_epgweekl,890,30);
			ctx.drawImage(ns_epgweekm,890+ns_epgweekl.width,30,340,ns_epgweekm.height);
			ctx.drawImage(ns_epgweekr,890+ns_epgweekl.width+340,30);
			
			ctx.font = "40px Arial";
			ctx.fillStyle = "black";	
			ctx.fillText(getTopTime(),890+20,30+32);
		}
	}
	this.draw_play_background = function(content)
	{
		var width_frame;
		var height_frame1;
		var height_frame2;
		var space_v1;
		
		var left_frame;
		var top_frame1;
		var top_frame2;

		width_frame = 1000;
		height_frame1 = 50;
		height_frame2 = 240;
		space_v1 = 3;
		radius = 4;
		
		left_frame = window_width/2-width_frame/2;
		top_frame1 = 200;
		top_frame2 = top_frame1+height_frame1+space_v1;
		
		ctx.clearRect(0, 0, window_width, window_height);

		ctx.fillStyle = "black";
			

		public_draw_object.drawRoundRect(left_frame, top_frame1, width_frame, height_frame1+space_v1+height_frame2, radius,ctx);
			
		ctx.strokeStyle = "rgba(255,255,255,0.8)";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(left_frame,top_frame1+height_frame1);
		ctx.arcTo(left_frame,top_frame1,left_frame+radius,top_frame1,radius);
		ctx.lineTo(left_frame+width_frame-radius,top_frame1);
		ctx.arcTo(left_frame+width_frame,top_frame1,left_frame+width_frame,top_frame1+radius,radius);
		ctx.lineTo(left_frame+width_frame,top_frame1+height_frame1);
		ctx.lineTo(left_frame,top_frame1+height_frame1);
		ctx.stroke();
			
		ctx.beginPath();
		ctx.moveTo(left_frame,top_frame2);
		ctx.lineTo(left_frame+width_frame,top_frame2);
		ctx.lineTo(left_frame+width_frame,top_frame2+height_frame2-radius);
		ctx.arcTo(left_frame+width_frame,top_frame2+height_frame2,left_frame+width_frame-radius,top_frame2+height_frame2,radius);
		ctx.lineTo(left_frame+radius,top_frame2+height_frame2);
		ctx.arcTo(left_frame,top_frame2+height_frame2,left_frame,top_frame2+height_frame2-radius,radius);
		ctx.lineTo(left_frame,top_frame2);
		ctx.stroke();
		
		ctx.globalAlpha = 1;
		ctx.font = "28px Arial";
		ctx.textAlign="center";
		ctx.fillStyle = "white";
		ctx.fillText("Infomation",left_frame+width_frame/2,top_frame1+36);
		ctx.fillText(content,left_frame+width_frame/2,top_frame2+100);
	}
	this.checkServiceLock = function(num)
	{
		var service=null;
		service = play_object.getServiceByNum(num); 
		if(service == null)
		{
			return false;
		}
		return (service.lock);
		
	}
	this.checkStbLock = function()
	{
		//check stb lock
		/******************************************/
		current_object = installation_object;
		if(configure_object.stb_lock == 0)
		{
			return  false;
		}
		var param = {
							fun_ok:function()
							{
								current_object = play_object;
								current_object.getServiceArray();
								current_object.getServiceListByEnv();
								current_object.getSubtitleJsonArray();
								current_object.show();
								if( public_draw_object.checkServiceLock() == false)
								{
									play_object.playTV();
								}
							},
							fun_check:function(pin)
							{
								if(pin == configure_object.parent_pin)
								{
									return true;
								}
								else
								{
									return false;
								}
							}
					};
		current_dialog_object  = dialog6_object;
		dialog6_object.show(param);
		/******************************************/
	}
	return this;
}

var public_draw_object = new PublicDrawClass();

function PageControlClass()
{
	var length;
	var page_r;
	
	this.start_position;
	this.stop_position;
	this.position;
	
	this.initData = function(length1,page1,position)
	{
		length = length1;
		page_r = page1;
		this.position = position;
		
		this.caculate();
	}
	
	this.caculate = function()
	{
		this.start_position = Math.floor(this.position/page_r)*page_r;
		this.stop_position = length-this.start_position<=page_r?length:this.start_position +page_r;
	}
	
	this.up = function()
	{
		if(length>0)
		{
			this.position = (this.position - 1 + length)%length;
			this.caculate();
		}
	}
	
	this.down = function()
	{
		if(length>0)
		{
			this.position = (this.position + 1)%length;
			this.caculate();
		}
	}
	
	this.left = function()
	{
		if(length>0)
		{
			var start_position = Math.floor(this.position/page_r)*page_r;
			if(start_position-page_r<0)
			{
				this.position = length%page_r==0?(length-page_r):(length-length%page_r);
			}
			else
			{
				this.position = start_position-page_r;
			}
			this.caculate();
		}
	}
	
	this.right = function()
	{
		if(length>0)
		{
			var start_position = Math.floor(this.position/page_r)*page_r;
			this.position = length>(start_position+page_r)?(start_position+page_r):0;
			this.caculate();
		}
	}
	
	return this;
}

var listSelectObject = new ListSelectClass();
function ListSelectClass()
{
	var param;
	
		
	var left;
	var top;
	var width;
	var page_r;
	var text;
	
	var height;
	var width_line;
	var length;
	var width_scroll;
	var height_scroll;
	var width_slider;
	var height_slider;
	var height_per_slider;
	var space_v;
	
	var current_position;
	
	
	function draw()
	{
		var start_position = Math.floor(current_position/page_r)*page_r;
		var stop_position;
		if(length-start_position<=page_r)
		{
			stop_position = length;
		}
		else 
		{
			stop_position = start_position +page_r;
		};
		
		ctx1.clearRect(0, 0, window_width, window_height);
		
		public_draw_object.drawRoundStroke(ctx1,left,top,width+3,height+width_line,3,width_line,"white");
		ctx1.fillStyle = "#a3a3a3";
		ctx1.fillRect(left+2,top+width_line/2,width+1,height+1);
		ctx1.strokeStyle = "#4d4d4d";
		ctx1.lineWidth = 1;
		ctx1.strokeRect(left+width+3-width_scroll,top+width_line/2+1,width_scroll,height_scroll);
		ctx1.fillStyle = "#d2d2d2";
		ctx1.fillRect(left+width+3-width_scroll+1,top+width_line/2+2+height_per_slider*current_position,width_scroll-2,height_slider);
		
		ctx1.drawImage(ns_cbiteml,left+2,top+1+(current_position-start_position)*space_v);
		ctx1.drawImage(ns_cbitemm,left+10,top+1+(current_position-start_position)*space_v,width-37,33);
		ctx1.drawImage(ns_cbitemr,left+10+width-37,top+1+(current_position-start_position)*space_v);
		
		ctx1.fillStyle="black";
		ctx1.font = "20px Arial";
		ctx1.textAlign = "center";
		for(var i = start_position;i<stop_position;i++)
		{
			
			ctx1.fillText(text[i],left+(width-34)/2+10,top+25+(i-start_position)*space_v);
		}
	}
	
	this.show = function(param1)
	{
		body.appendChild(canvas1);
		param = param1;
		text = param.text;
		length = text.length;
		
		left = param.left;
	    top = param.top;
		width = param.width;
		page_r =param.page_r;
		
		height;
		width_line = 3;
		
		width_scroll = 20;
		height_scroll;
		width_slider = width_scroll-2;
		height_slider = 37;
		space_v = 33;
		
		if(length<=page_r)
		{
			height = space_v*length+5;	
		}
		else 
		{
			height = space_v*page_r+5;
		}
		height_scroll = height - 1;
		height_per_slider = (height_scroll-height_slider-1)/(length-1);
		current_position = param.select_n;		
		draw();	

	}
	
	
	this.up = function()
	{
		current_position--;
		if(current_position<0)
		{
			current_position = length - 1;
		}
		draw();
	}
	this.down = function()
	{
		current_position++;
		if(current_position>length-1)
		{
			current_position = 0;
		}
		draw();
	}
	
	this.ok = function()
	{
		param.fun_ok(current_position);
		close();
	}
	this.menu = function()
	{
		close();
	}
	function close()
	{
		ctx1.clearRect(0, 0, window_width, window_height);
		if(document.getElementById("canvas1"))
		{
			body.removeChild(canvas1);
		}
		current_dialog_object = null;
		
	}
	this.keydownevent = function(keycode)
	{
		switch(keycode)	
		{
			//Left
			case 38:
			{
				this.up();
			}
			break;
			//Right
			case 40:
			{
				this.down();
			}
			break;
			case 13:
			{
				this.ok();
			}
			break;
			case 18:
			{
				this.menu();
			}
			break;
		}
	}
	return this;
}
/*
var param = 
					{
						title:language[configure_object.language].information,
						content:language[configure_object.language].saving,
						timeout:3000
					};
		dialog1_object.show(param);
*/
function Dialog1Class()
{
	var param;
	
	var IsExit = false;
	var timeout;
	var timer = "";
	function delay()
	{
		timeout = timeout - 500;
		if(timeout <=0)
		{
			dialog1_object.close();
		}
	}
	this.show = function(param1)
	{
		var width_frame;
		var height_frame1;
		var height_frame2;
		var space_v1;
		
		var left_frame;
		var top_frame1;
		var top_frame2;

		body.appendChild(canvas1);
		width_frame = 500;
		height_frame1 = 50;
		height_frame2 = 220;
		space_v1 = 3;
		radius = 4;
		param = param1;
		timeout = param.timeout; 
		
		left_frame = window_width/2-width_frame/2;
		top_frame1 = 200;
		top_frame2 = top_frame1+height_frame1+space_v1;
		
		ctx1.clearRect(0, 0, window_width, window_height);

		ctx1.fillStyle = "black";
			

		public_draw_object.drawRoundRect(left_frame, top_frame1, width_frame, height_frame1+space_v1+height_frame2, radius,ctx1);
			
		ctx1.strokeStyle = "rgb(255,255,255)";
		ctx1.lineWidth = 2;
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame1+height_frame1);
		ctx1.arcTo(left_frame,top_frame1,left_frame+radius,top_frame1,radius);
		ctx1.lineTo(left_frame+width_frame-radius,top_frame1);
		ctx1.arcTo(left_frame+width_frame,top_frame1,left_frame+width_frame,top_frame1+radius,radius);
		ctx1.lineTo(left_frame+width_frame,top_frame1+height_frame1);
		ctx1.lineTo(left_frame,top_frame1+height_frame1);
		ctx1.stroke();
			
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2+height_frame2-radius);
		ctx1.arcTo(left_frame+width_frame,top_frame2+height_frame2,left_frame+width_frame-radius,top_frame2+height_frame2,radius);
		ctx1.lineTo(left_frame+radius,top_frame2+height_frame2);
		ctx1.arcTo(left_frame,top_frame2+height_frame2,left_frame,top_frame2+height_frame2-radius,radius);
		ctx1.lineTo(left_frame,top_frame2);
		ctx1.stroke();
		
		ctx1.globalAlpha = 1;
		ctx1.font = "28px Arial";
		
		ctx1.fillStyle = "white";
		ctx1.textAlign = "center";
		ctx1.fillText(param.title,left_frame+width_frame/2,top_frame1+36);

		var cont = param.content;

		ctx1.textAlign="center";
		if(cont.length<30)
		{
			ctx1.textAlign="center";
			ctx1.fillText(cont,left_frame+width_frame/2,top_frame2+100);
		}
		
		else
		{
			var exp=/^[a-zA-Z0-9]+$/;
			var r=0;
			var text_write=" ";
			for(var j=0;j<cont.length&&j<120;j++)
			{
				var reg = cont[j].match(exp);
				if(reg==null)
				{
					if(text_write.length>25)
					{
						ctx1.fillText(text_write,left_frame+width_frame/2,top_frame2+50+r*35);
						text_write = "";
						r++;
					}
				}
				text_write+=cont[j];
				if(j==cont.length-1)
				{
					ctx1.fillText(text_write,left_frame+width_frame/2,top_frame2+50+r*35);
					text_write = "";
					r = 0;
				}
			}
		}	
		timer = setInterval(function(){delay();},500);
	}
	
	this.close = function()
	{
		ctx1.clearRect(0, 0, window_width, window_height);
		if(document.getElementById("canvas1"))
		{
			body.removeChild(canvas1);
		}
		if(timer != "")
		{
			clearInterval(timer); 
			timer = "";
		}
		current_dialog_object = null;
	}
	this.keydownevent = function(keycode)
	{
		this.close();
	}
	return this;
}
/*
var param = {
						title:language[configure_object.language].information,
						content:language[configure_object.language].do_you_want_to_factory_reset,
						timeout:5000,
						fun_ok:function()
						{
							//handle
							factory_set();
							current_object = installation_object;
							current_object.show();	
						},
						fun_no:function()
						{
							//return menu
							current_object = installation_object;
							current_object.show();	
						}

					};
		current_dialog_object = dialog2_object;
		dialog2_object.show(param);
*/
function Dialog2Class()
{
	var width_frame;
	var height_frame1;
	var height_frame2;
	var space_v1;
	
	var left_frame;
	var top_frame1;
	var top_frame2;
	var param;
	
	var yes_no;
	var default_timeout;
	var timeout;
	var timer = "";
	function delay()
	{
		timeout = timeout - 500;
		if(timeout <=0)
		{
			dialog2_object.close();
			param.fun_no();
		}
	}

	this.show = function(param1)
	{
		

		param = param1;
		default_timeout = param.timeout;
		timeout = default_timeout;
		body.appendChild(canvas1);
		width_frame = 500;
		height_frame1 = 50;
		height_frame2 = 220;
		space_v1 = 3;
		radius1 = 4;
			
		yes_no = true;
		
		left_frame = window_width/2-width_frame/2;
		top_frame1 = 170;
		top_frame2 = top_frame1+height_frame1+space_v1;
		
		ctx1.clearRect(0, 0, window_width, window_height);

		ctx1.fillStyle = "black";
		ctx1.globalAlpha = 1;
			
		public_draw_object.drawRoundRect(left_frame, top_frame1, width_frame, height_frame1+space_v1+height_frame2, radius1,ctx1);
			
		ctx1.strokeStyle = "rgba(255,255,255,0.8)";
		ctx1.lineWidth = 2;
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame1+height_frame1);
		ctx1.arcTo(left_frame,top_frame1,left_frame+radius1,top_frame1,radius1);
		ctx1.lineTo(left_frame+width_frame-radius1,top_frame1);
		ctx1.arcTo(left_frame+width_frame,top_frame1,left_frame+width_frame,top_frame1+radius1,radius1);
		ctx1.lineTo(left_frame+width_frame,top_frame1+height_frame1);
		ctx1.lineTo(left_frame,top_frame1+height_frame1);
		ctx1.stroke();
			
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2+height_frame2-radius1);
		ctx1.arcTo(left_frame+width_frame,top_frame2+height_frame2,left_frame+width_frame-radius1,top_frame2+height_frame2,radius1);
		ctx1.lineTo(left_frame+radius1,top_frame2+height_frame2);
		ctx1.arcTo(left_frame,top_frame2+height_frame2,left_frame,top_frame2+height_frame2-radius1,radius1);
		ctx1.lineTo(left_frame,top_frame2);
		ctx1.stroke();
		
		ctx1.globalAlpha = 1;
		ctx1.font = "28px Arial";
		ctx1.textAlign="center";
		ctx1.fillStyle = "white";
		ctx1.fillText(param.title,left_frame+width_frame/2,top_frame1+36);
		//ctx1.fillText(param.content,left_frame+width_frame/2,top_frame2+80);
		
		drawButton();

		var cont = param.content;
		ctx1.font = "28px Arial";
		ctx1.textAlign="center";
		ctx1.fillStyle = "white";
		if(cont.length<30)
		{
			ctx1.fillText(cont,left_frame+width_frame/2,top_frame2+100);
		}
		
		else
		{
			ctx1.textAlign="left";
			
			var exp=/^[a-zA-Z0-9]+$/;
			var r=0;
			var text_write=" ";
			for(var j=0;j<cont.length&&j<120;j++)
			{
				var reg = cont[j].match(exp);
				if(reg==null)
				{
					if(text_write.length>25)
					{
						ctx1.fillText(text_write,left_frame+23,top_frame2+50+r*35);
						text_write = "";
						r++;
					}
				}
				text_write+=cont[j];
				if(j==cont.length-1)
				{
					ctx1.fillText(text_write,left_frame+23,top_frame2+50+r*35);
					text_write = "";
					r = 0;
				}
			}
		}	
		timer = setInterval(function(){delay();},500);
	}
	
	function drawButton()
	{
		var space_h1 = 18;
		var width_botton = 80;
		var height_botton = 20;
		var radius2 = 2;
		
		var left_botton1 = window_width/2-space_h1/2-width_botton;
		var left_botton2 = window_width/2+space_h1/2;
		var top_botton = top_frame2+160;
		
		ctx1.clearRect(left_botton1-6, top_botton-6, width_botton*2+space_h1+12, height_botton+12);
		ctx1.fillStyle = 'black';
		ctx1.fillRect(left_botton1-7, top_botton-6, width_botton*2+space_h1+13, height_botton+12);
		
		if(yes_no)
		{
			ctx1.drawImage(ns_edittype,left_botton1,top_botton,width_botton,height_botton);
		}
		else
		{
			ctx1.drawImage(ns_edittype,left_botton2,top_botton,width_botton,height_botton);
		}
		
		public_draw_object.drawRoundStroke(ctx1,left_botton1,top_botton,width_botton,height_botton,radius2,1,"white");
		public_draw_object.drawRoundStroke(ctx1,left_botton2,top_botton,width_botton,height_botton,radius2,1,"white");
		ctx1.strokeStyle = "rgba(255,255,255,1)";
		ctx1.beginPath();
		ctx1.moveTo(left_botton1,top_botton+2);
		ctx1.lineTo(left_botton1+width_botton,top_botton+2);
		ctx1.stroke();
		
		ctx1.beginPath();
		ctx1.moveTo(left_botton2,top_botton+2);
		ctx1.lineTo(left_botton2+width_botton,top_botton+2);
		ctx1.stroke();
		
		ctx1.fillStyle = "white";
		ctx1.font = "20px Arial";
		ctx1.textAlign = "center";
		ctx1.fillText("Yes",left_botton1+width_botton/2,top_botton+18);
		ctx1.fillText("No",left_botton2+width_botton/2,top_botton+18);
	}
	
	this.left = function()
	{
		yes_no = true;
		drawButton();
		timeout = default_timeout;
	}
	
	this.right = function()
	{
		yes_no = false;
		drawButton();
		timeout = default_timeout;
	}
	
	this.ok = function()
	{
		this.close();
		if(yes_no)
		{

			param.fun_ok();
		}else
		{
			param.fun_no();
		}
	}
	this.close = function()
	{
		ctx1.clearRect(0, 0, window_width, window_height);
		if(document.getElementById("canvas1"))
		{
			body.removeChild(canvas1);
		}
		if(timer != "")
		{
			clearInterval(timer); 
			timer = "";
		}
		timeout = default_timeout;
		current_dialog_object = null;
	}
	this.keydownevent = function(keycode)
	{
		switch(keycode)	
		{
			//Left
			case 37:
			{
				this.left();
			}
			break;
			//Right
			case 39:
			{
				this.right();
			}
			break;
			case 13:
			{
				this.ok();
			}
			break;
		}
	}
	return this;
}
/*
var param = {
					fun_menu_close:function()
					{
						current_object = installation_object;
						current_object.show();
					},
					fun_ok:function()
					{
						checkOK();
					},
					fun_check:function(pin)
					{
						return checkPin(pin);
					}
				};
		current_dialog_object = dialog3_object;
		dialog3_object.show(param);
*/
function Dialog3Class()
{
	
	var width_frame;
	var height_frame1;
	var height_frame2;
	var space_v1;
	
	var left_frame;
	var top_frame1;
	var top_frame2;
	
	var count_pin_input;
	var pin_input=new Array();
		
	var param;
	this.show = function(param1)
	{
		pin_input=['0','0','0','0'];
		body.appendChild(canvas1);
		width_frame = 500;
		height_frame1 = 50;
		height_frame2 = 220;
		space_v1 = 3;
		radius = 4;
		
		count_pin_input = 0;
		param = param1;


		
		left_frame = window_width/2-width_frame/2;
		top_frame1 = 200;
		top_frame2 = top_frame1+height_frame1+space_v1;

		ctx1.clearRect(0, 0, window_width, window_height);
		
		ctx1.fillStyle = "black";
		ctx1.globalAlpha = 0.9;
			
		public_draw_object.drawRoundRect(left_frame, top_frame1, width_frame, height_frame1+space_v1+height_frame2, radius,ctx1);
			
		ctx1.strokeStyle = "rgba(255,255,255,0.8)";
		ctx1.lineWidth = 2;
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame1+height_frame1);
		ctx1.arcTo(left_frame,top_frame1,left_frame+radius,top_frame1,radius);
		ctx1.lineTo(left_frame+width_frame-radius,top_frame1);
		ctx1.arcTo(left_frame+width_frame,top_frame1,left_frame+width_frame,top_frame1+radius,radius);
		ctx1.lineTo(left_frame+width_frame,top_frame1+height_frame1);
		ctx1.lineTo(left_frame,top_frame1+height_frame1);
		ctx1.stroke();
			
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2+height_frame2-radius);
		ctx1.arcTo(left_frame+width_frame,top_frame2+height_frame2,left_frame+width_frame-radius,top_frame2+height_frame2,radius);
		ctx1.lineTo(left_frame+radius,top_frame2+height_frame2);
		ctx1.arcTo(left_frame,top_frame2+height_frame2,left_frame,top_frame2+height_frame2-radius,radius);
		ctx1.lineTo(left_frame,top_frame2);
		ctx1.stroke();
		
		ctx1.globalAlpha = 1;
		ctx1.font = "28px Arial";
		ctx1.textAlign="center";
		ctx1.fillStyle = "white";
		ctx1.fillText("Enter Pin-Code",left_frame+width_frame/2,top_frame1+36);
		
		drawPin();	
	}
	
	function drawPin()
	{
		var width_img1 = ns_lock.width;
		var width_img2 = ns_code1.width;
		var space_h1 = 20;
		var left_lock = window_width/2-width_img1/2;
		var top_lock = top_frame2+30;
		var left_code1 = window_width/2-(4*width_img2+3*space_h1)/2;
		var left_code2 = left_code1+width_img2+space_h1;
		var left_code3 = left_code2+width_img2+space_h1;
		var left_code4 = left_code3+width_img2+space_h1;
		var top_code = top_lock+140;
		
		ctx1.clearRect(left_frame+6, top_frame2+6, width_frame-12, height_frame2-12);
		ctx1.fillStyle = 'black';
		ctx1.fillRect(left_frame+5, top_frame2+6, width_frame-11, height_frame2-12);
		
		ctx1.drawImage(ns_lock,left_lock,top_lock);
 
		if(count_pin_input == 0)
		{
			ctx1.drawImage(ns_code1,left_code1,top_code);
			ctx1.drawImage(ns_code1,left_code2,top_code);
			ctx1.drawImage(ns_code1,left_code3,top_code);
			ctx1.drawImage(ns_code1,left_code4,top_code);
		}

		if(count_pin_input==1)
		{
			ctx1.drawImage(ns_code2,left_code1,top_code);
			ctx1.drawImage(ns_code1,left_code2,top_code);
			ctx1.drawImage(ns_code1,left_code3,top_code);
			ctx1.drawImage(ns_code1,left_code4,top_code);
			
		}
		if(count_pin_input==2)
		{
			ctx1.drawImage(ns_code2,left_code1,top_code);
			ctx1.drawImage(ns_code2,left_code2,top_code);
			ctx1.drawImage(ns_code1,left_code3,top_code);
			ctx1.drawImage(ns_code1,left_code4,top_code);
		}
		if(count_pin_input==3)
		{
			ctx1.drawImage(ns_code2,left_code1,top_code);
			ctx1.drawImage(ns_code2,left_code2,top_code);
			ctx1.drawImage(ns_code2,left_code3,top_code);
			ctx1.drawImage(ns_code1,left_code4,top_code);
		}
		if(count_pin_input==4)
		{
			ctx1.drawImage(ns_code2,left_code1,top_code);
			ctx1.drawImage(ns_code2,left_code2,top_code);
			ctx1.drawImage(ns_code2,left_code3,top_code);
			ctx1.drawImage(ns_code2,left_code4,top_code);
			
			var pin = ""+pin_input[0]+pin_input[1]+pin_input[2]+pin_input[3];
			if(param.fun_check(pin))
			{
				ctx1.clearRect(0, 0, window_width, window_height);
				body.removeChild(canvas1);
				current_dialog_object = null;
				param.fun_ok(pin);
				count_pin_input = 0;
			}
			else 
			{
				console.log("error");
				count_pin_input = 0;
				drawError();
			}
		}
	}
	
	function drawError()
	{
		ctx1.clearRect(left_frame+6, top_frame2+6, width_frame-12, height_frame2-12);
		ctx1.fillStyle = 'black';
		ctx1.fillRect(left_frame+5, top_frame2+6, width_frame-11, height_frame2-12);
		
		ctx1.font = "25px Arial";
		ctx1.textAlign="center";
		ctx1.fillStyle = "white";
		ctx1.fillText("Error Pin",left_frame+width_frame/2,top_frame2+100);
		
		setTimeout(drawPin,2000);
	}

	function pinInput(num)
	{
		if(count_pin_input < 4)
		{
			pin_input[count_pin_input]=num;
			count_pin_input++;
			drawPin();
		}
	}

	this.left = function()
	{
		if(count_pin_input > 0)
		{
			count_pin_input --;
			pin_input[count_pin_input] = 0;
			drawPin();
		}
	}
	
	this.menu = function()
	{
		this.close();
	}
		
	this.close = function()
	{	
		ctx1.clearRect(0, 0, window_width, window_height);
		if(document.getElementById("canvas1"))
		{
			body.removeChild(canvas1);
		}
		current_dialog_object = null;
		param.fun_menu_close();
	}

	this.keydownevent = function(keycode)
	{
		switch(keycode)
		{
			case 18:
			{
				this.menu();
			}
			break;
			case 27:
			{
				this.menu();
			}
			break;
			case 37:
			{
				this.left();
			}
			break;
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
				pinInput(keycode-48);
			}
			break;
		}
	}
	return this;
}

/*
	play page dialog
	Does not automatically disappear window
*/

function Dialog4Class()
{
	var param;
	this.show = function(param1)
	{
		var width_frame;
		var height_frame1;
		var height_frame2;
		var space_v1;
		
		var left_frame;
		var top_frame1;
		var top_frame2;

		body.appendChild(canvas1);
		width_frame = 500;
		height_frame1 = 50;
		height_frame2 = 220;
		space_v1 = 3;
		radius = 4;
		param = param1;
		
		left_frame = window_width/2-width_frame/2;
		top_frame1 = 200;
		top_frame2 = top_frame1+height_frame1+space_v1;
		
		ctx1.clearRect(0, 0, window_width, window_height);

		ctx1.fillStyle = "black";
		ctx1.globalAlpha = 1;
			
		public_draw_object.drawRoundRect(left_frame, top_frame1, width_frame, height_frame1+space_v1+height_frame2, radius,ctx1);
			
		ctx1.strokeStyle = "rgba(255,255,255,0.8)";
		ctx1.lineWidth = 2;
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame1+height_frame1);
		ctx1.arcTo(left_frame,top_frame1,left_frame+radius,top_frame1,radius);
		ctx1.lineTo(left_frame+width_frame-radius,top_frame1);
		ctx1.arcTo(left_frame+width_frame,top_frame1,left_frame+width_frame,top_frame1+radius,radius);
		ctx1.lineTo(left_frame+width_frame,top_frame1+height_frame1);
		ctx1.lineTo(left_frame,top_frame1+height_frame1);
		ctx1.stroke();
			
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2+height_frame2-radius);
		ctx1.arcTo(left_frame+width_frame,top_frame2+height_frame2,left_frame+width_frame-radius,top_frame2+height_frame2,radius);
		ctx1.lineTo(left_frame+radius,top_frame2+height_frame2);
		ctx1.arcTo(left_frame,top_frame2+height_frame2,left_frame,top_frame2+height_frame2-radius,radius);
		ctx1.lineTo(left_frame,top_frame2);
		ctx1.stroke();
		
		ctx1.globalAlpha = 1;
		ctx1.font = "28px Arial";
		ctx1.textAlign="center";
		ctx1.fillStyle = "white";
		ctx1.fillText(param.title,left_frame+width_frame/2,top_frame1+36);
		ctx1.fillText(param.content,left_frame+width_frame/2,top_frame2+100);
	}
	
	this.close = function()
	{
		ctx1.clearRect(0, 0, window_width, window_height);
		if(document.getElementById("canvas1"))
		{
			body.removeChild(canvas1);
		};
		if(current_dialog_object == dialog4_object)
		{
			current_dialog_object = null;
		}
		
	}
	this.keydownevent = function(keycode)
	{
		console.log("keycode:"+keycode);
		switch(keycode)
		{
			case 18:
			{
				this.close();
				play_object.menu();
			}
			break;
			case 27:
			{
				this.close();
				play_object.exit();
			}
			break; 
			case 128:
			{
				this.close();
				play_object.epg();
			}
			break;
			case 119:
			{
				this.close();
				play_object.change_play_mode();
			}
			break;
		}
	}
	return this;
}

//EPG details Info dialog
function Dialog5Class()
{
	var param;
	this.show = function(param1)
	{
		var width_frame;
		var height_frame1;
		var height_frame2;
		var space_v1;
		
		var left_frame;
		var top_frame1;
		var top_frame2;

		body.appendChild(canvas1);
		width_frame = 850;
		height_frame1 = 50;
		height_frame2 = 387;
		space_v1 = 3;
		radius = 4;
		param = param1;
		
		left_frame = window_width/2-260;
		top_frame1 = 146;
		top_frame2 = top_frame1+height_frame1+space_v1;
		
		ctx1.clearRect(0, 0, window_width, window_height);

		ctx1.fillStyle = "black";
		ctx1.globalAlpha = 1;
			
		public_draw_object.drawRoundRect(left_frame, top_frame1, width_frame, height_frame1+space_v1+height_frame2, radius,ctx1);
			
		ctx1.strokeStyle = "rgba(255,255,255,0.8)";
		ctx1.lineWidth = 2;
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame1+height_frame1);
		ctx1.arcTo(left_frame,top_frame1,left_frame+radius,top_frame1,radius);
		ctx1.lineTo(left_frame+width_frame-radius,top_frame1);
		ctx1.arcTo(left_frame+width_frame,top_frame1,left_frame+width_frame,top_frame1+radius,radius);
		ctx1.lineTo(left_frame+width_frame,top_frame1+height_frame1);
		ctx1.lineTo(left_frame,top_frame1+height_frame1);
		ctx1.stroke();
			
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2+height_frame2-radius);
		ctx1.arcTo(left_frame+width_frame,top_frame2+height_frame2,left_frame+width_frame-radius,top_frame2+height_frame2,radius);
		ctx1.lineTo(left_frame+radius,top_frame2+height_frame2);
		ctx1.arcTo(left_frame,top_frame2+height_frame2,left_frame,top_frame2+height_frame2-radius,radius);
		ctx1.lineTo(left_frame,top_frame2);
		ctx1.stroke();
		
		
		ctx1.drawImage(ns_menu,left_frame+20,top_frame2+height_frame2-30);
		ctx1.font = "21px Arial";
		ctx1.textAlign="left";
		ctx1.fillStyle = "white";
		ctx1.fillText("Exit",left_frame+20+ns_menu.width+10,top_frame2+height_frame2-30+ns_menu.height-4);
		
		ctx1.fillStyle = "#eaa100";
		ctx1.fillText(param.title,left_frame+20,top_frame1+36);
		
		ctx1.fillStyle = "white";
		var exp=/^[a-zA-Z0-9]+$/;
		var r=0;
		var text_write="";
		for(var j=0;j<param.content.length&&j<700;j++)
		{
			var reg = param.content[j].match(exp);
			if(reg==null)
			{
				if(text_write.length>=68)
				{
					ctx1.fillText(text_write,left_frame+20,top_frame2+50+r*30);
					text_write="";
					r++;
				}
			}
			text_write+=param.content[j];
			if(j==param.content.length-1)
			{
				ctx1.fillText(text_write,left_frame+20,top_frame2+50+r*30);
				text_write="";
				r = 0;
			}
		}	
	}
	
	this.close = function()
	{
		ctx1.clearRect(0, 0, window_width, window_height);
		if(document.getElementById("canvas1"))
		{
			body.removeChild(canvas1);
		};
		current_dialog_object = null;
	}
	this.menu = function()
	{
		this.close();
	}
	this.keydownevent = function(keycode)
	{
		switch(keycode)
		{
			case 18:
			{
				this.menu();
			}
		}
	}
	return this;
}

/*
service lock dialog
var param = {
					fun_ok:function()
					{
						checkOK();
					},
					fun_check:function(pin)
					{
						return checkPin(pin);
					}
				};
		current_dialog_object = dialog6_object;
		dialog6_object.show(param);
*/
function Dialog6Class()
{
	
	var width_frame;
	var height_frame1;
	var height_frame2;
	var space_v1;
	
	var left_frame;
	var top_frame1;
	var top_frame2;
	
	var count_pin_input;
	var pin_input=new Array();
		
	var param;
	this.show = function(param1)
	{
		pin_input=['0','0','0','0'];
		body.appendChild(canvas3);
		width_frame = 500;
		height_frame1 = 50;
		height_frame2 = 220;
		space_v1 = 3;
		radius = 4;
		
		count_pin_input = 0;
		param = param1;


		
		left_frame = window_width/2-width_frame/2;
		top_frame1 = 180;
		top_frame2 = top_frame1+height_frame1+space_v1;

		ctx3.clearRect(0, 0, window_width, window_height);
		
		ctx3.fillStyle = "black";
		ctx3.globalAlpha = 0.9;
			
		public_draw_object.drawRoundRect(left_frame, top_frame1, width_frame, height_frame1+space_v1+height_frame2, radius,ctx3);
			
		ctx3.strokeStyle = "rgba(255,255,255,0.8)";
		ctx3.lineWidth = 2;
		ctx3.beginPath();
		ctx3.moveTo(left_frame,top_frame1+height_frame1);
		ctx3.arcTo(left_frame,top_frame1,left_frame+radius,top_frame1,radius);
		ctx3.lineTo(left_frame+width_frame-radius,top_frame1);
		ctx3.arcTo(left_frame+width_frame,top_frame1,left_frame+width_frame,top_frame1+radius,radius);
		ctx3.lineTo(left_frame+width_frame,top_frame1+height_frame1);
		ctx3.lineTo(left_frame,top_frame1+height_frame1);
		ctx3.stroke();
			
		ctx3.beginPath();
		ctx3.moveTo(left_frame,top_frame2);
		ctx3.lineTo(left_frame+width_frame,top_frame2);
		ctx3.lineTo(left_frame+width_frame,top_frame2+height_frame2-radius);
		ctx3.arcTo(left_frame+width_frame,top_frame2+height_frame2,left_frame+width_frame-radius,top_frame2+height_frame2,radius);
		ctx3.lineTo(left_frame+radius,top_frame2+height_frame2);
		ctx3.arcTo(left_frame,top_frame2+height_frame2,left_frame,top_frame2+height_frame2-radius,radius);
		ctx3.lineTo(left_frame,top_frame2);
		ctx3.stroke();
		
		ctx3.globalAlpha = 1;
		ctx3.font = "28px Arial";
		ctx3.textAlign="center";
		ctx3.fillStyle = "white";
		ctx3.fillText("Enter Pin-Code",left_frame+width_frame/2,top_frame1+36);
		
		drawPin();	
	}
	
	function drawPin()
	{
		var width_img1 = ns_lock.width;
		var width_img2 = ns_code1.width;
		var space_h1 = 20;
		var left_lock = window_width/2-width_img1/2;
		var top_lock = top_frame2+30;
		var left_code1 = window_width/2-(4*width_img2+3*space_h1)/2;
		var left_code2 = left_code1+width_img2+space_h1;
		var left_code3 = left_code2+width_img2+space_h1;
		var left_code4 = left_code3+width_img2+space_h1;
		var top_code = top_lock+140;
		
		ctx3.clearRect(left_frame+6, top_frame2+6, width_frame-12, height_frame2-12);
		ctx3.fillStyle = 'black';
		ctx3.fillRect(left_frame+5, top_frame2+6, width_frame-11, height_frame2-12);
		
		ctx3.drawImage(ns_lock,left_lock,top_lock);
 
		if(count_pin_input == 0)
		{
			ctx3.drawImage(ns_code1,left_code1,top_code);
			ctx3.drawImage(ns_code1,left_code2,top_code);
			ctx3.drawImage(ns_code1,left_code3,top_code);
			ctx3.drawImage(ns_code1,left_code4,top_code);
		}

		if(count_pin_input==1)
		{
			ctx3.drawImage(ns_code2,left_code1,top_code);
			ctx3.drawImage(ns_code1,left_code2,top_code);
			ctx3.drawImage(ns_code1,left_code3,top_code);
			ctx3.drawImage(ns_code1,left_code4,top_code);
			
		}
		if(count_pin_input==2)
		{
			ctx3.drawImage(ns_code2,left_code1,top_code);
			ctx3.drawImage(ns_code2,left_code2,top_code);
			ctx3.drawImage(ns_code1,left_code3,top_code);
			ctx3.drawImage(ns_code1,left_code4,top_code);
		}
		if(count_pin_input==3)
		{
			ctx3.drawImage(ns_code2,left_code1,top_code);
			ctx3.drawImage(ns_code2,left_code2,top_code);
			ctx3.drawImage(ns_code2,left_code3,top_code);
			ctx3.drawImage(ns_code1,left_code4,top_code);
		}
		if(count_pin_input==4)
		{
			ctx3.drawImage(ns_code2,left_code1,top_code);
			ctx3.drawImage(ns_code2,left_code2,top_code);
			ctx3.drawImage(ns_code2,left_code3,top_code);
			ctx3.drawImage(ns_code2,left_code4,top_code);
			
			var pin = ""+pin_input[0]+pin_input[1]+pin_input[2]+pin_input[3];
			if(param.fun_check(pin))
			{
				ctx3.clearRect(0, 0, window_width, window_height);
				if(document.getElementById("canvas3"))
				{
					body.removeChild(canvas3);
				};
				if(current_dialog_object!=programs_list_object && current_dialog_object!=programs_fav_object)
				{
					current_dialog_object = null;
				}
				param.fun_ok(pin);
				count_pin_input = 0;
			}
			else 
			{
				console.log("error");
				count_pin_input = 0;
				drawError();
			}
		}
	}
	
	function drawError()
	{
		ctx3.clearRect(left_frame+6, top_frame2+6, width_frame-12, height_frame2-12);
		ctx3.fillStyle = 'black';
		ctx3.fillRect(left_frame+5, top_frame2+6, width_frame-11, height_frame2-12);
		
		ctx3.font = "25px Arial";
		ctx3.textAlign="center";
		ctx3.fillStyle = "white";
		ctx3.fillText("Error Pin",left_frame+width_frame/2,top_frame2+100);
		
		setTimeout(drawPin,2000);
	}

	function pinInput(num)
	{
		if(count_pin_input < 4)
		{
			pin_input[count_pin_input]=num;
			count_pin_input++;
			drawPin();
		}
	}

	this.left = function()
	{
		if(count_pin_input > 0)
		{
			count_pin_input --;
			pin_input[count_pin_input] = 0;
			drawPin();
		}
	}
	
	this.menu = function()
	{
	}
		
	this.close = function()
	{	
		ctx3.clearRect(0, 0, window_width, window_height);
		if(document.getElementById("canvas3"))
		{
			body.removeChild(canvas3);
		};
	}

	this.keydownevent = function(keycode)
	{
		switch(keycode)
		{
			case 18:
			{
				this.menu();
			}
			break;
			case 27:
			{
				this.menu();
			}
			break;
			case 37:
			{
				this.left();
			}
			break;
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
				pinInput(keycode-48);
			}
			break;
		}
	}
	return this;
}

/*
param = 
{
	name:"",
	fun_ok:function(time)
	{
		turn(time);
	}
}

*/

function Dialog7Class()
{
	var width_frame;
	var height_frame1;
	var height_frame2;
	var space_v1;
	
	var left_frame;
	var top_frame1;
	var top_frame2;
	var param;
	
	var arr_time;
	var current_position;
	

	this.show = function(param1)
	{
		param = param1;
		body.appendChild(canvas1);
		width_frame = 500;
		height_frame1 = 50;
		height_frame2 = 220;
		space_v1 = 3;
		radius1 = 4;
		
		arr_time = [0,0,0,0,0,0];
		current_position = 0;
			
		
		left_frame = window_width/2-width_frame/2;
		top_frame1 = 170;
		top_frame2 = top_frame1+height_frame1+space_v1;
		
		ctx1.clearRect(0, 0, window_width, window_height);

		ctx1.fillStyle = "black";
			
		public_draw_object.drawRoundRect(left_frame, top_frame1, width_frame, height_frame1+space_v1+height_frame2, radius1,ctx1);
			
		ctx1.strokeStyle = "rgb(255,255,255)";
		ctx1.lineWidth = 2;
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame1+height_frame1);
		ctx1.arcTo(left_frame,top_frame1,left_frame+radius1,top_frame1,radius1);
		ctx1.lineTo(left_frame+width_frame-radius1,top_frame1);
		ctx1.arcTo(left_frame+width_frame,top_frame1,left_frame+width_frame,top_frame1+radius1,radius1);
		ctx1.lineTo(left_frame+width_frame,top_frame1+height_frame1);
		ctx1.lineTo(left_frame,top_frame1+height_frame1);
		ctx1.stroke();
			
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2+height_frame2-radius1);
		ctx1.arcTo(left_frame+width_frame,top_frame2+height_frame2,left_frame+width_frame-radius1,top_frame2+height_frame2,radius1);
		ctx1.lineTo(left_frame+radius1,top_frame2+height_frame2);
		ctx1.arcTo(left_frame,top_frame2+height_frame2,left_frame,top_frame2+height_frame2-radius1,radius1);
		ctx1.lineTo(left_frame,top_frame2);
		ctx1.stroke();
		
		ctx1.globalAlpha = 1;
		ctx1.font = "28px Arial";
		ctx1.textAlign="center";
		ctx1.fillStyle = "white";
		ctx1.fillText(param.name,left_frame+width_frame/2,top_frame1+36);
		
		//content;
		
		drawContent();
				
		drawButton();
	}
	
	function drawContent()
	{
		
		ctx1.font = "20px Arial";
		ctx1.textAlign="left";
		
		ctx1.clearRect(left_frame+3,top_frame2+3,width_frame-6,height_frame2-100);
		ctx1.fillStyle="black";
		ctx1.fillRect(left_frame+2,top_frame2+2,width_frame-4,height_frame2-98);
		
		
		var top_time;
		var left_time;
		var width_time;
		
		var width_select;
		var height_select;
		
		var top_select;
		var left_select;
		var width_pre=0;
			
		var text_content = "";
		for(var i=0;i<arr_time.length;i++)
		{
			if(i==current_position)
			{
				width_pre = ctx1.measureText(text_content).width;
				width_select = ctx1.measureText(""+arr_time[i]).width;
			}
			
			text_content+=arr_time[i];
			if(i==1||i==3)
			{
				text_content+=":";
			}
		}
		
		
		width_time = ctx1.measureText(text_content).width;
		left_time = left_frame+(width_frame-width_time)/2;
		top_time = top_frame2 + 100;
		
		height_select = 26;
		left_select = left_time+width_pre;
		top_select = top_time-height_select+6;
		
		ctx1.fillStyle = "#dfdfdf";
		ctx1.fillRect(left_select,top_select,width_select,height_select);
		
		var left_start = left_time;
		
		ctx1.fillStyle="white";
		
		for(var i=0;i<arr_time.length;i++)
		{
			if(i==current_position)
			{
				ctx1.fillStyle="black";
			}
			else
			{
				ctx1.fillStyle="white";
			}
			
			ctx1.fillText(arr_time[i],left_start,top_time);
			left_start+=ctx1.measureText(""+arr_time[i]).width;
			
			if(i==1||i==3)
			{
				ctx1.fillText(":",left_start,top_time);
				left_start+=ctx1.measureText(":").width;
			}
		}
	}
	
	function drawButton()
	{
		var space_h1 = 18;
		var width_botton = 80;
		var height_botton = 20;
		var radius2 = 2;
		
		var left_botton1 = window_width/2-space_h1/2-width_botton;
		var left_botton2 = window_width/2+space_h1/2;
		var top_botton = top_frame2+160;
		
		ctx1.clearRect(left_botton1-6, top_botton-6, width_botton*2+space_h1+12, height_botton+12);
		ctx1.fillStyle = 'black';
		ctx1.fillRect(left_botton1-7, top_botton-6, width_botton*2+space_h1+13, height_botton+12);
		
		ctx1.drawImage(ns_edittype,left_botton1,top_botton,width_botton,height_botton);
		ctx1.drawImage(ns_edittype,left_botton2,top_botton,width_botton,height_botton);
		
		public_draw_object.drawRoundStroke(ctx1,left_botton1,top_botton,width_botton,height_botton,radius2,1,"white");
		public_draw_object.drawRoundStroke(ctx1,left_botton2,top_botton,width_botton,height_botton,radius2,1,"white");
		ctx1.strokeStyle = "white";
		ctx1.beginPath();
		ctx1.moveTo(left_botton1,top_botton+2);
		ctx1.lineTo(left_botton1+width_botton,top_botton+2);
		ctx1.stroke();
		
		ctx1.beginPath();
		ctx1.moveTo(left_botton2,top_botton+2);
		ctx1.lineTo(left_botton2+width_botton,top_botton+2);
		ctx1.stroke();
		
		ctx1.fillStyle = "white";
		ctx1.font = "20px Arial";
		ctx1.textAlign = "center";
		ctx1.fillText("Ok",left_botton1+width_botton/2,top_botton+18);
		ctx1.fillText("Exit",left_botton2+width_botton/2,top_botton+18);
	}
	
	this.left = function()
	{
		current_position = (current_position -1 + 6)%6;
		drawContent();
	}
	
	this.right = function()
	{
		current_position = (current_position+1)%6;
		drawContent();
	}
	
	this.up = function()
	{
		if(current_position%2 == 0&&current_position!=0)
		{
			arr_time[current_position] = (arr_time[current_position]+1)%6;
		}
		else
		{
			arr_time[current_position] = (arr_time[current_position]+1)%10;
		}
		drawContent();
	}
	
	this.down = function()
	{
		if(current_position%2 == 0&&current_position!=0)
		{
			arr_time[current_position] = (arr_time[current_position] -1 + 6)%6;
		}
		else
		{
			arr_time[current_position] = (arr_time[current_position] -1 + 10)%10;
		}
		drawContent();
	}
	
	this.num = function(num)
	{
		if(current_position%2 == 0&&current_position!=0)
		{
			if(num>5)
			{
				arr_time[current_position]=5;
			}
			else
			{
				arr_time[current_position] = num;
			}
		}
		else
		{
			arr_time[current_position] = num;
		}
		current_position = (current_position+1)%6;
		drawContent();
	}
	
	this.ok = function()
	{
		this.close();
		var time_sec = arr_time[0]*10*3600+arr_time[1]*3600+arr_time[2]*10*60+arr_time[3]*60+arr_time[4]*10+arr_time[5];
		param.fun_ok(time_sec);

	}
	this.close = function()
	{
		ctx1.clearRect(0, 0, window_width, window_height);
		if(document.getElementById("canvas1"))
		{
			body.removeChild(canvas1);
		};
		current_dialog_object = null;
	}
	
	this.menu = function()
	{
		this.close();
	}
	this.keydownevent = function(keycode)
	{
		switch(keycode)	
		{
			//Left
			case 37:
			{
				this.left();
			}
			break;
			//Right
			case 39:
			{
				this.right();
			}
			break;
			case 38:
			{
				this.up();
			}
			break;
			case 40:
			{
				this.down();
			}break;
			case 13:
			{
				this.ok();
			}
			break;
			case 18:
			{
				this.menu();
			}
			break;
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
				this.num(keycode-48);	
			}
			break;
		}
	}
	return this;
}

/*
var param = 
					{
						title:language[configure_object.language].information,
						content:language[configure_object.language].saving,
						timeout:3000
					};
		dialog8_object.show(param);
*/
function Dialog8Class()
{
	var param;
	
	var IsExit = false;
	var timeout;
	var timer = "";
	function delay()
	{
		timeout = timeout - 500;
		if(timeout <=0)
		{
			dialog8_object.close();
		}
	}
	this.show = function(param1)
	{
		var width_frame;
		var height_frame1;
		var height_frame2;
		var space_v1;
		
		var left_frame;
		var top_frame1;
		var top_frame2;

		body.appendChild(canvas3);
		width_frame = 500;
		height_frame1 = 50;
		height_frame2 = 220;
		space_v1 = 3;
		radius = 4;
		param = param1;
		timeout = param.timeout; 
		
		left_frame = window_width/2-width_frame/2;
		top_frame1 = 200;
		top_frame2 = top_frame1+height_frame1+space_v1;
		
		ctx3.clearRect(0, 0, window_width, window_height);

		ctx3.fillStyle = "black";
			

		public_draw_object.drawRoundRect(left_frame, top_frame1, width_frame, height_frame1+space_v1+height_frame2, radius,ctx3);
			
		ctx3.strokeStyle = "rgb(255,255,255)";
		ctx3.lineWidth = 2;
		ctx3.beginPath();
		ctx3.moveTo(left_frame,top_frame1+height_frame1);
		ctx3.arcTo(left_frame,top_frame1,left_frame+radius,top_frame1,radius);
		ctx3.lineTo(left_frame+width_frame-radius,top_frame1);
		ctx3.arcTo(left_frame+width_frame,top_frame1,left_frame+width_frame,top_frame1+radius,radius);
		ctx3.lineTo(left_frame+width_frame,top_frame1+height_frame1);
		ctx3.lineTo(left_frame,top_frame1+height_frame1);
		ctx3.stroke();
			
		ctx3.beginPath();
		ctx3.moveTo(left_frame,top_frame2);
		ctx3.lineTo(left_frame+width_frame,top_frame2);
		ctx3.lineTo(left_frame+width_frame,top_frame2+height_frame2-radius);
		ctx3.arcTo(left_frame+width_frame,top_frame2+height_frame2,left_frame+width_frame-radius,top_frame2+height_frame2,radius);
		ctx3.lineTo(left_frame+radius,top_frame2+height_frame2);
		ctx3.arcTo(left_frame,top_frame2+height_frame2,left_frame,top_frame2+height_frame2-radius,radius);
		ctx3.lineTo(left_frame,top_frame2);
		ctx3.stroke();
		
		ctx3.globalAlpha = 1;
		ctx3.font = "28px Arial";
		
		ctx3.fillStyle = "white";
		ctx3.fillText(param.title,left_frame+width_frame/2,top_frame1+36);

		var cont = param.content;
		
		if(cont.length<30)
		{
			ctx3.textAlign="center";
			ctx3.fillText(cont,left_frame+width_frame/2,top_frame2+100);
		}
		
		else
		{
			ctx3.textAlign="left";
			
			var exp=/^[a-zA-Z0-9]+$/;
			var r=0;
			var text_write=" ";
			for(var j=0;j<cont.length&&j<120;j++)
			{
				var reg = cont[j].match(exp);
				if(reg==null)
				{
					if(text_write.length>25)
					{
						ctx3.fillText(text_write,left_frame+23,top_frame2+50+r*35);
						text_write = "";
						r++;
					}
				}
				text_write+=cont[j];
				if(j==cont.length-1)
				{
					ctx3.fillText(text_write,left_frame+23,top_frame2+50+r*35);
					text_write = "";
					r = 0;
				}
			}
		}	
		timer = setInterval(function(){delay();},500);
	}
	
	this.close = function()
	{
		
		if(timer != "")
		{
			clearInterval(timer); 
			timer = "";
		}
		
		
		if(document.getElementById("canvas3"))
		{
			ctx3.clearRect(0, 0, window_width, window_height);
			body.removeChild(canvas3);
		}
	}
	this.keydownevent = function(keycode)
	{
		this.close();
	}
	return this;
}

/*
var param = {
						title:language[configure_object.language].information,
						content:language[configure_object.language].do_you_want_to_factory_reset,
						timeout:5000,
						fun_ok:function()
						{
							//handle
							factory_set();
							current_object = installation_object;
							current_object.show();	
						},
						fun_no:function()
						{
							//return menu
							current_object = installation_object;
							current_object.show();	
						}
					};
		dialog9_object.show(param);
*/
function Dialog9Class()
{
	var width_frame;
	var height_frame1;
	var height_frame2;
	var space_v1;
	
	var left_frame;
	var top_frame1;
	var top_frame2;
	var param;
	
	var yes_no;
	var default_timeout;
	var timeout;
	var timer = "";
	function delay()
	{
		timeout = timeout - 500;
		if(timeout <=0)
		{
			dialog2_object.close();
		}
	}

	this.show = function(param1)
	{
		
		param = param1;
		default_timeout = param.timeout;
		timeout = default_timeout;
		body.appendChild(canvas4);
		width_frame = 500;
		height_frame1 = 50;
		height_frame2 = 220;
		space_v1 = 3;
		radius1 = 4;
			
		yes_no = true;
		
		left_frame = window_width/2-width_frame/2;
		top_frame1 = 170;
		top_frame2 = top_frame1+height_frame1+space_v1;
		
		ctx4.clearRect(0, 0, window_width, window_height);

		ctx4.fillStyle = "black";
		ctx4.globalAlpha = 0.9;
			
		public_draw_object.drawRoundRect(left_frame, top_frame1, width_frame, height_frame1+space_v1+height_frame2, radius1,ctx4);
			
		ctx4.strokeStyle = "rgba(255,255,255,0.8)";
		ctx4.lineWidth = 2;
		ctx4.beginPath();
		ctx4.moveTo(left_frame,top_frame1+height_frame1);
		ctx4.arcTo(left_frame,top_frame1,left_frame+radius1,top_frame1,radius1);
		ctx4.lineTo(left_frame+width_frame-radius1,top_frame1);
		ctx4.arcTo(left_frame+width_frame,top_frame1,left_frame+width_frame,top_frame1+radius1,radius1);
		ctx4.lineTo(left_frame+width_frame,top_frame1+height_frame1);
		ctx4.lineTo(left_frame,top_frame1+height_frame1);
		ctx4.stroke();
			
		ctx4.beginPath();
		ctx4.moveTo(left_frame,top_frame2);
		ctx4.lineTo(left_frame+width_frame,top_frame2);
		ctx4.lineTo(left_frame+width_frame,top_frame2+height_frame2-radius1);
		ctx4.arcTo(left_frame+width_frame,top_frame2+height_frame2,left_frame+width_frame-radius1,top_frame2+height_frame2,radius1);
		ctx4.lineTo(left_frame+radius1,top_frame2+height_frame2);
		ctx4.arcTo(left_frame,top_frame2+height_frame2,left_frame,top_frame2+height_frame2-radius1,radius1);
		ctx4.lineTo(left_frame,top_frame2);
		ctx4.stroke();
		
		ctx4.globalAlpha = 1;
		ctx4.font = "28px Arial";
		ctx4.textAlign="center";
		ctx4.fillStyle = "white";
		ctx4.fillText(param.title,left_frame+width_frame/2,top_frame1+36);
		ctx4.fillText(param.content,left_frame+width_frame/2,top_frame2+80);
		
		drawButton();
		timer = setInterval(function(){delay();},500);
	}
	
	function drawButton()
	{
		var space_h1 = 18;
		var width_botton = 80;
		var height_botton = 20;
		var radius2 = 2;
		
		var left_botton1 = window_width/2-space_h1/2-width_botton;
		var left_botton2 = window_width/2+space_h1/2;
		var top_botton = top_frame2+160;
		
		ctx4.clearRect(left_botton1-6, top_botton-6, width_botton*2+space_h1+12, height_botton+12);
		ctx4.fillStyle = 'black';
		ctx4.fillRect(left_botton1-7, top_botton-6, width_botton*2+space_h1+13, height_botton+12);
		
		if(yes_no)
		{
			ctx4.drawImage(ns_edittype,left_botton1,top_botton,width_botton,height_botton);
		}
		else
		{
			ctx4.drawImage(ns_edittype,left_botton2,top_botton,width_botton,height_botton);
		}
		
		public_draw_object.drawRoundStroke(ctx4,left_botton1,top_botton,width_botton,height_botton,radius2,1,"rgba(255,255,255,1)");
		public_draw_object.drawRoundStroke(ctx4,left_botton2,top_botton,width_botton,height_botton,radius2,1,"rgba(255,255,255,1)");
		ctx4.strokeStyle = "rgba(255,255,255,1)";
		ctx4.beginPath();
		ctx4.moveTo(left_botton1,top_botton+2);
		ctx4.lineTo(left_botton1+width_botton,top_botton+2);
		ctx4.stroke();
		
		ctx4.beginPath();
		ctx4.moveTo(left_botton2,top_botton+2);
		ctx4.lineTo(left_botton2+width_botton,top_botton+2);
		ctx4.stroke();
		
		ctx4.fillStyle = "white";
		ctx4.font = "20px Arial";
		ctx4.textAlign = "center";
		ctx4.fillText("Yes",left_botton1+width_botton/2,top_botton+18);
		ctx4.fillText("No",left_botton2+width_botton/2,top_botton+18);
	}
	
	this.left = function()
	{
		yes_no = true;
		drawButton();
		timeout = default_timeout;
	}
	
	this.right = function()
	{
		yes_no = false;
		drawButton();
		timeout = default_timeout;
	}
	
	this.ok = function()
	{
		this.close();
		if(yes_no)
		{

			param.fun_ok();
		}else
		{
			param.fun_no();
		}
	}
	this.close = function()
	{
		param.fun_no();
		ctx4.clearRect(0, 0, window_width, window_height);
		if(document.getElementById("canvas4"))
		{
			body.removeChild(canvas4);
		}
		if(timer != "")
		{
			clearInterval(timer); 
			timer = "";
		}
		timeout = default_timeout;
		current_dialog_object = null;
	}
	this.keydownevent = function(keycode)
	{
		switch(keycode)	
		{
			//Left
			case 37:
			{
				this.left();
			}
			break;
			//Right
			case 39:
			{
				this.right();
			}
			break;
			case 13:
			{
				this.ok();
			}
			break;
		}
	}
	return this;
}

function MuteClass()
{	
	this.show = function ()
	{
		var left_mute = 100;
		var top_mute = 100;
		
		body.appendChild(canvas2);
		
		ctx2.clearRect(0,0, window_width, window_height);
		
		ctx2.drawImage(ns_mute,left_mute,top_mute);
	}
	
	this.close = function()
	{
		if(document.getElementById("canvas2"))
		{
			body.removeChild(canvas2);
		};
	}
	return this;
}
function RecordVideoClass()
{	
	var left_pic;
	var top_pic;
	var left_time;
	var top_time;
	
	var width_frame;
	var height_frame;
	var left_frame;
	var top_frame;
	
	var time_info_default;
	var time_info_per;
	
	var time_interval;
	var pvr_item;
	
	var count_time;
	
	var timer_int;
	var timer_info;
	
	var channelName;
	var recordedTime;
	var recordStatus;
	
	var startPosition;
	var stopPosition;
	var width_name_scroll;
	var length_name_scroll;
	var channelScrollName;
	var space="    ";
	
	var flag=true;
	var isInfoShow;
	this.check_hdd_cnt;
	function initData()
	{
		time_interval = 1000;
		time_info_default = 3000;
		time_info_per = 1000;
		
		time_interval = 500;
		startPosition = 0;
		stopPosition = 1;
		width_name_scroll = 180;
		length_name_scroll = 10;
		channelName="";
		channelScrollName="";
		timer_int = "";
		timer_info = "";
		pvr_item = PVR.getRecordingItems();
		isInfoShow = false;
		refreshData();
	}
	
	function initView()
	{
		left_pic = window_width-100;
		left_pic2 = left_pic+(ns_rec_bg.width-ns_rec_r.width)/2;
		top_pic = 26;
		top_pic2 = top_pic+16;
		left_time = left_pic;
		top_time = top_pic + 100;
		
		width_frame = 400;
		height_frame = 230;
		left_frame = (window_width-width_frame)/2;
		top_frame = 200;
		
		ctx4.clearRect(0,0,window_width,window_height);
			
		ctx4.drawImage(ns_rec_bg,left_pic,top_pic);	
		
		ctx4.drawImage(ns_rec_r,left_pic2,top_pic2);
		
		ctx4.fillStyle = "white";
		ctx4.font = "20px Arial";
		ctx4.textAlign="left";
		ctx4.fillText(public_draw_object.formatSeconds(pvr_item[0].validTime),left_time,top_time);
	}
	
	this.show = function()
	{
		this.check_hdd_cnt = 0;
		body.appendChild(canvas4);
		initData();
		initView();
		this.resume();
	}
	
	function refreshData()
	{
		channelName = pvr_item[0].channelName;
		if(channelName.length>1)
		{
			if(channelName.charCodeAt(0)==5)
			{
				channelName = channelName.substring(1,channelName.length);
			}
		}
		
		recordedTime = public_draw_object.formatSeconds(pvr_item[0].validTime);
		recordStatus = pvr_item[0].pauseFlag;
	}

	this.resume = function()
	{		
		timer_int = setInterval(function()
		{
			record_video_object.check_hdd_cnt++;
			//check disk free size
			if(record_video_object.check_hdd_cnt >= 20)
			{
				record_video_object.check_hdd_cnt = 0;
				var partitionInfoArray;
				var storageEntryArray = StorageService.getStorageInfos();
				for (var i = 0; i < storageEntryArray.length; i++)
				{
					partitionInfoArray = storageEntryArray[i].getPartitionsInfo();
					usbArray[i]=partitionInfoArray[0];
				}
				console.log("usb disk freeSize:"+usbArray[usbSelect].freeSize/1024);
				if(usbArray[usbSelect].freeSize/1024 < 100)
				{
						var param = 
						{
							title:"Information",
							content:"HDD_FULL,PVR STOP!",
							timeout:4000
						};
						current_dialog_object = dialog1_object;
						current_dialog_object.show(param);
						ctx4.clearRect(0,0,window_width,window_height);
						play_object.closePvr();
						return;
				}
			}
			
			ctx4.clearRect(0,0,window_width,150);
			if(current_object != play_object)
			{
				ctx4.clearRect(0,0,window_width,window_height);
			}
			else
			{
				if(pvr_item[0].pauseFlag == true)
				{
					ctx4.drawImage(ns_rec_bg,left_pic,top_pic);
					ctx4.drawImage(ns_rec_r,left_pic2,top_pic2);
				}
				else
				{
					if(flag == true)
					{
						ctx4.drawImage(ns_rec_bg,left_pic,top_pic);
						ctx4.drawImage(ns_rec_r,left_pic2,top_pic2);
						ctx4.fillText(public_draw_object.formatSeconds(pvr_item[0].validTime),left_time,top_time);
						flag = false;
					}
					else
					{
						ctx4.drawImage(ns_rec_bg,left_pic,top_pic);
						ctx4.fillText(public_draw_object.formatSeconds(pvr_item[0].validTime),left_time,top_time);
						flag = true;
					}
				}
			}
			
		},time_interval);
	}
	
	function drawInfo()
	{
		ctx4.clearRect(left_frame-1,top_frame-1,width_frame+2,height_frame+2);
		
		ctx4.fillStyle = "black";
		ctx4.fillRect(left_frame,top_frame,width_frame,height_frame);
		ctx4.strokeStyle = "white";
		ctx4.lineWidth = 1;
		ctx4.beginPath();
		ctx4.moveTo(left_frame,top_frame+43);
		ctx4.lineTo(left_frame+width_frame,top_frame+43);
		ctx4.closePath();
		ctx4.stroke();
		ctx4.strokeRect(left_frame,top_frame,width_frame,height_frame);
		
		var text1 = new Array();
		text1[0] = "Channel Name";
		text1[1] = "Recorded Time";
		text1[2] = "Record Status";
		
		ctx4.font = "20px Arial";
		var length=0;
		
		for(var i=0;i<3;i++)
		{
			if(ctx4.measureText(text1[i]).width>length)
			{
				length = ctx4.measureText(text1[i]).width;
			}
		}
		
		var left_text1 = left_frame + 20+length;
		var top_text = top_frame+80;
		var left_text2 = left_text1+20;
		var space_v1 = 40;
		
		ctx4.fillStyle = "white";
		ctx4.font = "25px Arial";
		ctx4.textAlign = "center";
		
		ctx4.fillText("PVR Info",left_frame+width_frame/2,top_frame+30);
		ctx4.font = "20px Arial";
		ctx4.textAlign = "right";
		for(var i=0;i<3;i++)
		{
			ctx4.fillText(text1[i]+" :",left_text1,top_text+i*space_v1);
		}
		ctx4.textAlign = "left";
		
		drawNameScroll();
		ctx4.fillText(channelScrollName,left_text2,top_text);
		ctx4.fillText(recordedTime,left_text2,top_text+1*space_v1);

		if(recordStatus == false)
		{
			ctx4.fillText("Recording",left_text2,top_text+space_v1*2);
		}
		else
		{
			ctx4.fillText("Stoped",left_text2,top_text+space_v1*2);
		}
		
	}
	
	function drawNameScroll()
	{
		ctx4.fillStyle="white";
		ctx4.font = "20px Arial";
		if(channelName.length>0)
		{
			var length_name = channelName.length;
			var names="";
			var j;
			for(j=0;j<length_name;j++)
			{
				if(ctx4.measureText(names+channelName.charAt(j)).width<width_name_scroll)
				{
					names = names + channelName.charAt(j);
				}
				else
				{
					length_name_scroll = j;
					break;
				}
			}
			
			if(j>=length_name)
			{
				length_name_scroll = length_name;
			}

			if(length_name>length_name_scroll)
			{
			
				var length_show = length_name_scroll+space.length;
				var name_deal = channelName+space;
				
				if(startPosition>=name_deal.length)
				{
					startPosition = 0;
					stopPosition = 1;
				}
				
				if(startPosition+length_show<=name_deal.length)
				{
					channelScrollName = name_deal.substring(startPosition,startPosition+length_show);
				}
				
				if(startPosition+length_show>name_deal.length&&startPosition<name_deal.length)
				{
					channelScrollName = name_deal.substring(startPosition,name_deal.length)+name_deal.substring(0,stopPosition);
					stopPosition++;
				}
				
				startPosition++;
			}
			else
			{
				channelScrollName = channelName;
			}
		}
		console.log("ahname:"+channelName+"  chs:"+channelScrollName);
	}
	
	this.info = function()
	{
		isInfoShow = true;
		
		refreshData();
		drawInfo();
		if(timer_info!="")
		{
			clearTimeout(timer_info);
			timer_info = "";
			time_info_default = time_info_per*3;
		}
		
		time();
	}
	
	function time()
	{
		if(time_info_default<=0)
		{
			if(timer_info!="")
			{
				clearTimeout(timer_info);
				timer_info = "";
			}
			isInfoShow = false;
			time_info_default = time_info_per*3;
			ctx4.clearRect(left_frame-1,top_frame-1,width_frame+2,height_frame+2);
			return;
		}
		
		refreshData();
		drawInfo();
		
		time_info_default -= time_info_per;
		timer_info = setTimeout(time,time_info_per);
	}

	
	this.close = function()
	{
		if(timer_int != "")
		{
			clearInterval(timer_int);
			timer_int = "";
		}
		
		if(timer_info != "")
		{
			clearInterval(timer_info);
			timer_info = "";
		}
		ctx4.clearRect(0,0,window_width,window_height);
		if(document.getElementById("canvas4"))
		{
			body.removeChild(canvas4);
		}
	}
	return this;
}

function TimeShiftDialogClass()
{	
	var left_pic;
	var top_pic;
	var left_pic2;
	var top_pic2;
	var left_time;
	var top_time;
	
	var width_frame;
	var height_frame;
	var left_frame;
	var top_frame;
	
	var top_baseline;
	
	var time_info_default;
	var time_info_per;
	
	var time_interval;
	var pvr_item;
	
	var count_time;
	
	var timer_int;
	var timer_info;
	
	var flag=true;
	var isInfoShow;
	
	var rate_play;
	var isPause;
	var process_play;
	var process_rec;
	
	function initData()
	{
		time_info_default = 3000;
		time_info_per = 1000;
		rate_play = 1;

		timer_info = "";
		isInfoShow = false;
	}
	
	function initView()
	{
		left_pic = window_width-100;
		left_pic2 = left_pic+(ns_rec_bg.width-ns_rec_r.width)/2;
		top_pic = 26;
		top_pic2 = top_pic+16;
		left_time = left_pic;
		top_time = top_pic + 100;
		
		width_frame = ns_ban_l.width+ns_ban_u.width+ns_ban_r.width;
		height_frame = ns_ban_l.height;
		left_frame = window_width/2-width_frame/2;
		
		top_baseline = 650;
		top_frame = top_baseline-height_frame;
	}
	
	this.show = function()
	{
		body.appendChild(canvas4);
		initData();
		initView();
		this.icon();
	}

	this.icon = function()
	{		
		ctx4.clearRect(0,0,window_width,150);
		if(current_object != time_shift_object)
		{
			ctx4.clearRect(0,0,window_width,window_height);
		}
		else
		{
			ctx4.drawImage(ns_rec_bg,left_pic,top_pic);
			ctx4.drawImage(ns_rec_t,left_pic2,top_pic2);
		}
	}
	
	
	function drawBanner()
	{
		isInfoShow = true;
		
		ctx4.clearRect(left_frame-1,top_frame-1,width_frame+2,height_frame+2);
		
		ctx4.drawImage(ns_ban_l,left_frame,top_frame);
		ctx4.drawImage(ns_ban_u,left_frame+ns_ban_l.width,top_frame);
		ctx4.drawImage(ns_ban_r,left_frame+ns_ban_l.width+ns_ban_u.width,top_frame);
		ctx4.drawImage(ns_ban_m,left_frame+ns_ban_l.width,top_frame+ns_ban_u.height);
		ctx4.drawImage(ns_ban_d,left_frame+ns_ban_l.width,top_frame+ns_ban_u.height+ns_ban_m.height);
		
		ctx4.fillStyle = "white";
		ctx4.font = "20px Arial";
		ctx4.textAlign = "left";
		
		ctx4.fillText(play_object.current_service.name,left_frame+26,top_frame+50);
		ctx4.fillText("Time Shift",left_frame+556,top_frame+50);
		ctx4.fillText(getSimpleTime(),left_frame+750,top_frame+50);
		
		
		//draw rate
		
		var left_x = left_frame+120;
		var top_text_rate = top_frame + 81;
		
		if(rate_play!=1)
		{
			if(rate_play<0)
			{
				ctx4.fillText(Math.abs(rate_play),left_x-22,top_text_rate);
			}
			
			ctx4.fillText("x",left_x,top_text_rate);
			if(rate_play>0)
			{
				ctx4.fillText(rate_play,left_x+10,top_text_rate);
			}
		}
		
		var width_process = 501;
		var height_process = 10;
		var top_process = top_text_rate+6;
		var left_process=0;
		
		if(rate_play>1)
		{
			ctx4.fillText(">>",left_x,top_process+10);
			left_process = left_x + ctx4.measureText(">>").width+6;
		}
		else if(rate_play == 1)
		{
			if(isPause == true)
			{
				ctx4.fillRect(left_x,top_process,2,10);
				ctx4.fillRect(left_x+4,top_process,2,10);
				left_process = left_x + 6 + 6;
			}
			else
			{
				ctx4.fillText(">",left_x,top_process+10);
				left_process = left_x + ctx4.measureText(">").width+6;
			}
			
		}
		else if(rate_play<1)
		{
			ctx4.fillText("<<",left_x,top_process+10);
			left_process = left_x + ctx4.measureText("<<").width+6;
		}
		
		ctx4.lineWidth = 1;
		ctx4.strokeStyle = "white";
		
		ctx4.strokeRect(left_process,top_process,width_process+2,height_process+3);
		
		if(Timeshift.totalRecordTime<7000)
		{
			process_rec = Math.floor(Timeshift.totalRecordTime/12);
			
			process_play = Math.floor(Timeshift.totalReplayTime/12);
		}
		else
		{
			process_rec = 500;
			
			if(Timeshift.totalRecordTime-Timeshift.totalReplayTime<7000)
			{
				process_play = Math.floor((Timeshift.totalRecordTime-Timeshift.totalReplayTime)/12);
			}
			else
			{
				process_play = 0;
			}
		}

		if(process_rec>0)
		{
			ctx4.fillStyle = "#dfdfdf";
			ctx4.fillRect(left_process+1,top_process+1,process_rec,height_process);
		}
		
		if(process_play>0)
		{
			ctx4.fillStyle = "yellow";
			ctx4.fillRect(left_process+1,top_process+1,process_play,height_process);
		}
		
		
		var top_slice = top_process+12+8;
		
		var left_slice_r = left_process+1+process_rec;
		var left_slice_p = left_process+1+process_play;
		
		
		ctx4.fillStyle="white";
		
		ctx4.textAlign = "right";
		ctx4.fillRect(left_slice_p,top_process+1,1,40);		
		ctx4.fillText(public_draw_object.formatSeconds(Timeshift.totalReplayTime),left_slice_p-3,top_slice+16);
		
		ctx4.textAlign = "left";
		ctx4.fillRect(left_slice_r,top_process+1,1,40);		
		ctx4.fillText(public_draw_object.formatSeconds(Timeshift.totalRecordTime),left_slice_r+3,top_slice+16);
		
		var left_start = left_frame+60;
		var top_pic = top_baseline - 40;
		var top_text_bottom = top_baseline-20;
		
		ctx4.drawImage(ns_pvr_rew,left_start,top_pic);
		left_start = left_start +ns_pvr_rew.width+10;
		ctx4.fillText("REW",left_start,top_text_bottom);
		left_start = left_start + ctx4.measureText("REW").width+20;
		
		ctx4.drawImage(ns_pvr_ff,left_start,top_pic);
		left_start = left_start +ns_pvr_ff.width+10;
		ctx4.fillText("FF",left_start,top_text_bottom);
		left_start = left_start + ctx4.measureText("FF").width+20;
		
		ctx4.drawImage(ns_pvr_pause,left_start,top_pic);
		left_start = left_start +ns_pvr_pause.width+10;
		ctx4.fillText("PAUSE",left_start,top_text_bottom);
		left_start = left_start + ctx4.measureText("PAUSE").width+20;
		
		ctx4.drawImage(ns_pvr_play,left_start,top_pic);
		left_start = left_start +ns_pvr_play.width+10;
		ctx4.fillText("PLAY",left_start,top_text_bottom);
		left_start = left_start + ctx4.measureText("PLAY").width+20;
		
		ctx4.drawImage(ns_green,left_start,top_pic);
		left_start = left_start +ns_green.width+10;
		ctx4.fillText("SEEK",left_start,top_text_bottom);
	}
	
	this.info = function(rate,pause)
	{
		rate_play = rate;
		isPause = pause;
		
		drawBanner();
		
		if(timer_info!="")
		{
			clearTimeout(timer_info);
			timer_info = "";
			time_info_default = time_info_per*3;
		}

		time();
	}
	
	function time()
	{
		if(time_info_default<=0)
		{
			if(timer_info!="")
			{
				clearTimeout(timer_info);
				timer_info = "";
			}
			isInfoShow = false;
			time_info_default = time_info_per*3;
			ctx4.clearRect(left_frame-1,top_frame-1,width_frame+2,height_frame+2);
			return;
		}
		
		if(current_object != time_shift_object)
		{
			if(timer_info!="")
			{
				clearTimeout(timer_info);
				timer_info = "";
			}
			return;
		}
		drawBanner();
		time_info_default -= time_info_per;
		
		timer_info = setTimeout(time,time_info_per);
	}

	
	this.close = function()
	{
		if(timer_info != "")
		{
			clearInterval(timer_info);
			timer_info = "";
		}

		ctx4.clearRect(0,0,window_width,window_height);
		if(document.getElementById("canvas4"))
		{
			body.removeChild(canvas4);
		}
	}
	return this;
}


function DialogTip()
{
	var width_frame;
	var height_frame;
	var left_pic;
	var top_pic;
	var left_text;
	var top_text;
	
	var content;
	
	function initData(con)
	{
		content = con;
	}
	
	function initView()
	{
		body.appendChild(canvas1);

		ctx1.font="25px Arial";
		ctx1.textAlign="center";
		ctx1.fillStyle="white";
		
		width_frame = ctx1.measureText(content).width+30;
		height_frame = ns_usbl.height;
		
		left_pic = window_width-180;
		top_pic = window_height-80;
		
		left_text = left_pic + width_frame/2;
		top_text = top_pic + height_frame*0.7;
		
		
		
		ctx1.clearRect(left_pic-1,top_pic-1,width_frame+2,ns_usbr.height+2);
		ctx1.fillStyle = "black";
		ctx1.fillRect(left_pic-2,top_pic-2,width_frame+4,ns_usbr.height+4);
	}
	
	this.show = function(con)
	{
		initData(con);
		initView();
		
		
		ctx1.drawImage(ns_usbl,left_pic,top_pic);
		ctx1.drawImage(ns_usbm,left_pic+ns_usbl.width,top_pic,width_frame-ns_usbl.width-ns_usbr.width,height_frame);
		ctx1.drawImage(ns_usbr,left_pic+width_frame-ns_usbr.width,top_pic);
		
		ctx1.fillText(content,left_text,top_text);
	}
	
	
	this.close = function()
	{
		ctx1.clearRect(0,0,window_width,window_height);
		if(document.getElementById("canvas1"))
		{
			body.removeChild(canvas1);
		};
	}
	
}

function VolumeClass()
{
	var timer1 = null;
	this.show = function (volume)
	{
		var width_volume = ns_unmute.width;
		var width_pro_l = ns_vl.width;
		var width_pro_m = 400;
		var width_pro_r = ns_vr.width;
		
		var per = width_pro_m/31;
		
		var left1 = 150;
		var left2 = left1+width_volume+10;
		var left3 = left2+width_pro_l;
		var left4 = left3+width_pro_m;
		var left5 = left4+width_pro_r+6	;
		
		var top1 = 626;
		
		body.appendChild(canvas2);
		
		ctx2.clearRect(0,0, window_width, window_height);
		
		ctx2.drawImage(ns_unmute,left1,top1);
		
		ctx2.drawImage(ns_vl,left2,top1);
		ctx2.drawImage(ns_vm,left3,top1,width_pro_m,36);
		ctx2.drawImage(ns_vr,left4,top1);
		ctx2.drawImage(ns_vo,left3,top1+14,per*volume,8);

		ctx2.fillStyle = "black";
		ctx2.fillRect(left5,top1,38,38);
		ctx2.strokeStyle  = "white";
		ctx2.strokeRect(left5,top1,38,38);
		ctx2.fillStyle = "white";
		ctx2.font = "30px Arial";
		ctx2.textAlign="left";	
		var volume1 = volume<10?"0"+volume:volume;	
		ctx2.fillText(volume1,left5+2,top1+28);
		if(timer1 != null)
		{
			clearTimeout(timer1);
			timer1 = null;
		}
		timer1 = setTimeout(function(){volume_object.close();},1000);
	}
	
	this.close = function()
	{
		if(timer1 != null)
		{
			clearTimeout(timer1);
			timer1 = null;
		}
		ctx2.clearRect(0,0, window_width, window_height);
		if(document.getElementById("canvas2"))
		{
			body.removeChild(canvas2);
		};
		
	}
	return this;
}

function ChannelInputClass()
{
	var show_num_size = 4;
	var current_input_num = new Array();
	var input_count;
	var text_result;
	
	var timer1 = null;
	var timer2 = null;
	function open_timing()
	{
		close_timing(timer1);
		timer1 = setTimeout(function()
		{
			channel_input_object.close();
		},2500);

	}
	function close_timing()
	{
		if(timer1 != null)
		{
			clearTimeout(timer1);
			timer1 = null;
		}
	}
	this.show = function(num)
	{
		//first input
		if(timer1 == null)
		{
			body.appendChild(canvas2);
			input_count = 0;
			text_result = "";
			current_input_num.length = 0;
			for(var i=0;i<show_num_size;i++)
			{
				current_input_num[i] = 0;
			}
		}
		if(timer2 != null)
		{
			clearTimeout(timer2);
			timer2 = null;
		}
		open_timing();
		channelInput(num);
		drawChannel();
	}

	function drawChannel()
	{
		ctx2.clearRect(900,50,show_num_size*30,100);
		ctx2.drawImage(ns_channelinput,900,50,show_num_size*28,50);
		ctx2.lineWidth=3;
		ctx2.strokeStyle = "white";
		ctx2.strokeRect(900,50,show_num_size*28,50);
	
		
		ctx2.fillStyle = "#F7BA10";
		ctx2.font = "40px Arial";
		ctx2.textAlign = "right";

		for(var i=0;i<show_num_size;i++)
		{
			ctx2.fillText(current_input_num[i],900+(i+1)*27,90);
		}

		ctx2.drawImage(ns_xm,850,110,250,33);
		ctx2.lineWidth=2;
		ctx2.strokeStyle = "white";
		ctx2.strokeRect(850,110,250,33);
		


		ctx2.fillStyle = "black";
		ctx2.font = "20px Arial";
		ctx2.textAlign = "left";
		ctx2.fillText(text_result,860,130);
	}

	function checkInput(num)
	{
		var flag = -1;
		length = play_object.channel_list[configure_object.effective_list].length;
		var service;
		for(i = 0;i < length ;i++)
		{
			service =play_object.getServiceById( play_object.channel_list[configure_object.effective_list][i]);
			if(num == service.logicNumber)
			{	
				flag = i;
				break;
			}
		}
		return flag;
	}

	function channelInput(num)
	{
		if(input_count < show_num_size)
		{
			input_count++;
			//put the num into array
			var tempArray = new Array();
			for(var i=0;i<show_num_size;i++)
			{
				tempArray[i] = current_input_num[i];
			}
			for(var i = show_num_size - 1;i > 0;i--)
			{
				current_input_num[i - 1] = tempArray[i];
			}
			current_input_num[show_num_size - 1] = parseInt(num); 

			//string into dec
			var decNum = 0;
			var a = 1;
			for(var i=show_num_size-1;i>=0;i--)
			{
				decNum =decNum + a*current_input_num[i];
				a = a*10;
			}
			
			//check num
			var flag = checkInput(decNum);
			if(flag == -1)
			{
				text_result = "Input Wrong!";
			}
			else
			{
				var service = play_object.getServiceById( play_object.channel_list[configure_object.effective_list][flag]);
				text_result = public_draw_object.hanleCharacter(service.name);
				//change tv
				timer2 = setTimeout(function()
				{
						channel_input_object.close();
					
						//change tv
						if(configure_object.tv_num != flag)
						{
							configure_object.tv_num = flag;
							if(public_draw_object.checkServiceLock(configure_object.tv_num) == false)
							{
								play_object.playTV();
								var param = {
												num:configure_object.tv_num,
												disappear:true,
												isCheckLock:true
											};
								current_dialog_object = banner_object;
								current_dialog_object.show(param);
							}
							else
							{
								play_object.stopTV();
								var param = {
											num:configure_object.tv_num,
											disappear:true,
											isCheckLock:true
										};
								current_dialog_object = banner_object;
								current_dialog_object.show(param);
							}
						}	

				},1000);	
			}
		}
	}

	this.close = function()
	{
		input_count = 0;
		text_result = "";
		current_input_num.length = 0;
		close_timing(timer1);
		if(timer2 != null)
		{
			clearTimeout(timer2);
			timer2 = null;
		}
		if(document.getE)
		{
			
		}
		if(document.getElementById("canvas2"))
		{
			body.removeChild(canvas2);
		};
		current_dialog_object = null;
	}
	this.keydownevent = function(keycode)
	{
		switch(keycode)	
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
				channel_input_object.show(keycode-48);
			}
			break;
		}
	}
	return this;
}
function BannerClass()
{
	this.infoShow;
	var isLockShow;
	var current_page;
	
	var present_name;
	var follow_name;
	var count_info;
	var list_present = new Array();
	var list_follow = new Array();
	var list_info = new Array();
	
	
	var space;
	var start_position_present;
	var start_position_follow;
	var stop_position_present;
	var stop_position_follow;
	var width_name_scroll;
	var length_name_scroll;
	
	var service;
	var ServiceProgramArr = new Array();
	var pre_programs = new Array();
	var sortNum;
	
	var param;

	var strength;
	var quality;
	var banner_time;

	var width1 = ns_ban_m.width;
	var height1 = ns_ban_m.height;
	var width_lr = ns_ban_l.width;
	var height_ud = ns_ban_u.height;
	
	var left1;
	var top1;
	left1 = window_width/2-(width1+24)/2;
	top1 = 660-height1-26;
	
	var timer1=null;
	var timer2=null;
	
	function open_timing()
	{
		close_timing();
		timer1 = setTimeout(function()
		{
			banner_object.close();
		},configure_object.display_time*1000);
	}
	function close_timing()
	{
		if(timer1 != null)
		{
			clearTimeout(timer1);
			timer1 = null;
		}
	}

	this.flushData = function()
	{
		if(play_object.current_service != null)
		{
			DVB.getSignal(play_object.current_service.frequency,play_object.current_service.symbolRate,play_object.current_service.modulation);
			strength = DVB.signalStrength;
			quality = DVB.signalQuality;
		}
		banner_time = getSimpleTime();
		drawNameScroll();
		drawBanner();
	}
	
	
	function stopPlay()
	{
		tvplayer.stop();
		ctx.clearRect(0,0,window_width,window_height);
	}
	function serviceCheckDeal()
	{
		close_timing();
		if(isLockShow == false)
		{
			stopPlay();
			//param.disappear = false;
			isLockShow = true;
			var param2 = {
				fun_ok:function()
				{
					isLockShow = false;
					play_object.isUnlock = true;
					play_object.play();
					//param.disappear = true;
					open_timing();
				},
				fun_check:function(pin)
				{
					return checkPin(pin);
				}
			};
			dialog6_object.show(param2);
		}
	}
	function checkPin(inputPin)
	{
		var realPin = configure_object.parent_pin;
		if(realPin == inputPin)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function drawBackGround()
	{
		ctx1.drawImage(ns_ban_l,left1,top1);
		ctx1.drawImage(ns_ban_u,left1+width_lr,top1);
		ctx1.drawImage(ns_ban_m,left1+width_lr,top1+height_ud);
		ctx1.drawImage(ns_ban_d,left1+width_lr,top1+height_ud+height1);
		ctx1.drawImage(ns_ban_r,left1+width_lr+width1,top1);
	}
	this.show = function(param1)
	{
		
		//ctx.clearRect(0,0,window_width,window_height);		
		//ctx.fillStyle = 'FFFFB0';
		//ctx.fillRect(0, 0, window_width, window_height);
		this.infoShow = false;
		isLockShow = false;
		strength = DVB.signalStrength;
		quality = DVB.signalQuality;
		banner_time = getSimpleTime();
		present_name = "";
		follow_name = "";
		space = "       ";
		start_position_present = 0;
		start_position_follow = 0;
		stop_position_present = 1;
		stop_position_follow = 1;

		width_name_scroll = 560;
		length_name_scroll = 30;
		param = param1;
		timer2 = setInterval(function()
							{
								banner_object.flushData();
							},500);
		sortNum = param.num;
		if( play_object.channel_list[configure_object.effective_list].length >0)
		{
			var id = play_object.channel_list[configure_object.effective_list][sortNum];
			service = play_object.getServiceById(id);
		}
		body.appendChild(canvas1);
		getEPG(sortNum);
		drawNameScroll();
		drawBackGround();
		drawBanner();
		
		if(param.isCheckLock == true)
		{
			if(public_draw_object.checkServiceLock(configure_object.tv_num))
			{
				tvplayer.stop();
				serviceCheckDeal();
			}
			else
			{
				play_object.playTV();
				if(param.disappear == true)
				{
					open_timing();
				}
			}
		}
		else if(param.disappear == true)
		{
			open_timing();
		}
	}
	
	this.left = function()
	{
		if(!this.infoShow)
		{
			if(current_page>=2)
			{
				current_page--;
				this.drawBanner();
			}
			if(!isLockShow)
			{
				open_timing();
			}
		}
	}
	this.right = function()
	{
		if(!this.infoShow)
		{
			if(current_page<list_program.length/2)
			{
				current_page++;
				drawBanner();
			}
			if(!isLockShow)
			{
				open_timing();
			}
		}
	}
	this.up = function()
	{
		if(!this.infoShow)
		{
			if(sortNum<play_object.channel_list[configure_object.effective_list].length-1)
			{
				sortNum++;
			}
			else 
			{
				sortNum = 0;
			}
			getEPG(sortNum);
			drawBanner();
			if(isLockShow)
			{
				dialog6_object.close();
				isLockShow = false;
			}
			open_timing();
		}
	}
	this.down = function()
	{
		if(!this.infoShow)
		{
			if(sortNum>0)
			{
				sortNum--;
			}
			else 
			{
				sortNum = play_object.channel_list[configure_object.effective_list].length-1;
			}
			getEPG(sortNum);
			drawBanner();
			if(isLockShow)
			{
				dialog6_object.close();
				isLockShow = false;
			}
			open_timing();
		}
	}
	this.ok =function()
	{
		if(!this.infoShow)
		{
			if(current_object == play_object)
			{
				if(sortNum != configure_object.tv_num)
				{
					configure_object.tv_num = sortNum;
					if(public_draw_object.checkServiceLock(configure_object.tv_num))
					{
						serviceCheckDeal();
					}
					else
					{
						if(isLockShow)
						{
							dialog6_object.close();
							isLockShow = false;
						}
						play_object.playTV();
						open_timing();
					}
				}
			}

			else if(current_object == pip_object)
			{
				if(pip_object.focus == 0)
				{
					if(sortNum != configure_object.tv_num)
					{
						configure_object.tv_num = sortNum;
						play_object.ts_play();
						open_timing();
					}
				}
				else
				{
					if(sortNum != configure_object.p_num)
					{
						pip_object.smallPlay(sortNum);
						open_timing();
					}
				}
			}
		}
	}
	this.menu = function()
	{
		if(!this.infoShow)
		{
			if(isLockShow ==true && dialog6_object!=null)
			{
				isLockShow = false;
				dialog6_object.close();
				ctx1.clearRect(0,0,window_width,window_height);
				service = null;
				clearInterval(timer2); 
				close_timing();
				current_dialog_object = null;
				body.removeChild(canvas1);
				play_object.show();
			}
			else
			{
				this.close();
			}
		}
		else 
		{
			this.infoShow = false;
			count_info = 0;
			ctx1.clearRect(0,0,window_width,window_height);
			drawBanner();
			if(param.disappear == true)
			{
				open_timing();
			}
		}
	}
	this.info =function()
	{
		if(isLockShow == false)
		{
			if(this.infoShow == false)
			{
				this.infoShow = true;
				count_info = 0;
				drawInfo();
				close_timing();
			}
			else 
			{
				if(count_info<list_info.length-1)
				{
					count_info++;
					drawInfo();
				}
				else 
				{
					this.infoShow = false;
					count_info = 0;
					ctx1.clearRect(0,0,window_width,window_height);
					drawBanner();
					if(param.disappear == true)
					{
						open_timing();
					}
				}
			}
		}
		
	}
	this.channel_up = function()
	{
		if(this.infoShow==false)
		{
			if(current_object == play_object)
			{
				play_object.playNext();
				sortNum = parseInt(configure_object.tv_num);
				getEPG(sortNum);
				drawBanner();
				if(isLockShow == true)
				{
					dialog6_object.close();
					isLockShow = false;
				}
				if(public_draw_object.checkServiceLock(configure_object.tv_num))
				{
					serviceCheckDeal();
				}
				else
				{
					play_object.playTV();
					open_timing();
				}
			}
			else if(current_object == pip_object)
			{
				if(pip_object.focus == 0)
				{
					play_object.playNext();
					sortNum = parseInt(configure_object.tv_num);
					play_object.ts_play();
				}
				else
				{
					pip_object.channel_up();
					sortNum = parseInt(configure_object.p_num);
				}
				getEPG(sortNum);
				drawBanner();
				open_timing();
			}
		}
	}
	this.channel_down = function()
	{
		if(!this.infoShow)
		{
			if(current_object == play_object)
			{
				play_object.playPresent();
				sortNum = parseInt(configure_object.tv_num);
				getEPG(sortNum);
				drawBanner();
				
				if(isLockShow == true)
				{
					dialog6_object.close();
					isLockShow = false;
				}
				if(public_draw_object.checkServiceLock(configure_object.tv_num))
				{
					serviceCheckDeal();
				}
				else
				{
					play_object.playTV();
					open_timing();
				}
			}
			else  if(current_object == pip_object)
			{
				if(pip_object.focus == 0)
				{
					play_object.playPresent();
					sortNum = parseInt(configure_object.tv_num);
					play_object.ts_play();
				}
				else
				{
					pip_object.channel_down();
					sortNum = parseInt(configure_object.p_num);
				}
				getEPG(sortNum);
				drawBanner();
				open_timing();
			}
		}
	}
	
	this.close = function()
	{
		ctx1.clearRect(0,0,window_width,window_height);
		service = null;
		if(timer2 !=null)
		{
			clearInterval(timer2); 
			timer2 = null;
		}
		close_timing();
		if(timer1 != null)
		{
			clearTimeout(timer1);
			timer1 = null;
		}
		current_dialog_object = null;
		ctx.clearRect(0,0,window_width,window_height);
		if(document.getElementById("canvas1"))
		{
			body.removeChild(canvas1);
		};
		if(current_object == play_object)
		{
			play_object.show();
		}else  if(current_object == pip_object)
		{
			pip_object.drawFrame();
		}
	}
	
	this.keydownevent = function(keycode)
	{
		switch(keycode)	
		{
			//Left
			case 37:
			{
				this.left();
			}
			break;
			//Right
			case 39:
			{
				this.right();
			}
			break;
			case 38:
			{
				this.up();
			}
			break;
			case 40:
			{
				this.down();
			}
			break;
			case 18:
			{
				this.menu();
			}
			break;
			case 27:
			{
				this.menu();
			}
			break;
			case 13:
			{
				if(isLockShow ==true && dialog6_object!=null)
				{
					if(dialog6_object.hasOwnProperty("keydownevent"))
					{
						dialog6_object.keydownevent(keycode);
					}
				}
				else
				{
					this.ok();
				}
			}
			break;
			case 126:
			{
				this.info();
			}
			break;
			case 124:
			{
				this.channel_up();
			}
			break;
			case 125:
			{
				this.channel_down();
			}
			break;
			default:
			{
				if(isLockShow ==true && dialog6_object!=null)
				{
					if(dialog6_object.hasOwnProperty("keydownevent"))
					{
						dialog6_object.keydownevent(keycode);
					}
				}
			}
			break;
		}
	}
	
	function getEPG(sortNum)
	{
		if( play_object.channel_list[configure_object.effective_list].length>0)
		{
			service = play_object.getServiceByNum(sortNum);
		}
		present_name = "";
		follow_name = "";
		list_present = new Array();
		list_follow= new Array();
		list_info = new Array();
		
		if(service!=null)
		{
			var present = null; present = service.presentProgram;
			var follow = null;follow = service.followingProgram;
			var j = 0;

			if(present !=  null)
			{
				var startTime = present.startTime;  
				startTime = TimeZoneHandle(startTime);
				var startHour = (startTime.getHours() >= 10 )? startTime.getHours():("0"+startTime.getHours());
				var startMinute = (startTime.getMinutes() >= 10 )? startTime.getMinutes():("0"+startTime.getMinutes());

				var endTime = present.endTime;
				endTime = TimeZoneHandle(endTime);
				var endHour = (endTime.getHours() >= 10 )? endTime.getHours():("0"+endTime.getHours());
				var endMinute = (endTime.getMinutes() >= 10 )? endTime.getMinutes():("0"+endTime.getMinutes());

				present_name = present.name;

				if(present_name.length>1)
				{
					if(present_name.charCodeAt(0)==5)
					{
						present_name = present_name.substring(1,present_name.length);
					}
				}

				var present_time = startHour+":"+startMinute+ " -- "+endHour+":"+endMinute;
				var present_description = present.description;
				if(present_description.length>1)
				{
					if(present_description.charCodeAt(0)==5)
					{
						present_description = present_description.substring(1,present_description.length);
					}
				}
				list_info[0] = new Array();
				list_info[0][0] = present_time+"   "+present_name;
				list_info[0][1] = present_description;
				if(present_name.length>0)
				{
					list_present[0] = present_time;
					list_present[1] = present_name;
				}
				
				drawNameScroll();
				console.log("GetEPG,present_follow:"+present_time);
			}
			
			if(follow!=null)
			{
				var startTime = follow.startTime;  
				startTime = TimeZoneHandle(startTime);
				var startHour = (startTime.getHours() >= 10 )? startTime.getHours():("0"+startTime.getHours());
				var startMinute = (startTime.getMinutes() >= 10 )? startTime.getMinutes():("0"+startTime.getMinutes());

				var endTime = follow.endTime;
				endTime = TimeZoneHandle(endTime);
				var endHour = (endTime.getHours() >= 10 )? endTime.getHours():("0"+endTime.getHours());
				var endMinute = (endTime.getMinutes() >= 10 )? endTime.getMinutes():("0"+endTime.getMinutes());
				
				//var startHour = (follow.startTime.getHours() >= 10 )? follow.startTime.getHours():("0"+follow.startTime.getHours());
				//var startMinute = (follow.startTime.getMinutes() >= 10 )? follow.startTime.getMinutes():("0"+follow.startTime.getMinutes());
				//var endHour = (follow.endTime.getHours() >= 10 )? follow.endTime.getHours():("0"+follow.endTime.getHours());
				//var endMinute = (follow.endTime.getMinutes() >= 10 )? follow.endTime.getMinutes():("0"+follow.endTime.getMinutes());
				follow_name = follow.name;
				if(follow_name.length>1)
				{
					if(follow_name.charCodeAt(0)==5)
					{
						follow_name = follow_name.substring(1,follow_name.length);
					}
				}

				var follow_time = startHour+":"+startMinute+ " -- "+endHour+":"+endMinute;
				
				var follow_description = follow.description;
				if(follow_description.length>1)
				{
					if(follow_description.charCodeAt(0)==5)
					{
						follow_description = follow_description.substring(1,follow_description.length);
					}
				}
				list_info[1] = new Array();
				list_info[1][0] = follow_time+"   "+follow_name;
				list_info[1][1] = follow_description;
				
				if(follow_name.length>0)
				{
					list_follow[0] = follow_time;
					list_follow[1] = follow_name;
				}
				drawNameScroll();
				
			}
		}
	}
	
	function drawNameScroll()
	{
		ctx1.fillStyle="white";
		ctx1.font = "20px Arial";
		if(present_name.length>0)
		{
			var length_name_present = present_name.length;
			var names="";
			var j;
			for(j=0;j<length_name_present;j++)
			{
				if(ctx1.measureText(names+present_name.charAt(j)).width<width_name_scroll)
				{
					names = names + present_name.charAt(j);
				}
				else
				{
					length_name_scroll = j;
					break;
				}
			}
			
			if(j>=length_name_present)
			{
				length_name_scroll = length_name_present;
			}
			
			
				
			if(length_name_present>length_name_scroll)
			{
			
				var length_show = length_name_scroll+space.length;
				var name_deal = present_name+space;
				
				if(start_position_present>=name_deal.length)
				{
					start_position_present = 0;
					stop_position_present = 1;
				}
				
				if(start_position_present+length_show<=name_deal.length)
				{
					list_present[1] = name_deal.substring(start_position_present,start_position_present+length_show);
				}
				
				if(start_position_present+length_show>name_deal.length&&start_position_present<name_deal.length)
				{
					list_present[1] = name_deal.substring(start_position_present,name_deal.length)+name_deal.substring(0,stop_position_present);
					stop_position_present++;
				}
				
				start_position_present++;
			}
			else
			{
				list_present[1] = present_name;
			}
		}
		
		if(follow_name.length>0)
		{
			var length_name_follow = follow_name.length;
			var names="";
			var j;
			
			for(j=0;j<length_name_follow;j++)
			{
				if(ctx1.measureText(names+follow_name.charAt(j)).width<width_name_scroll)
				{
					names = names + follow_name.charAt(j);
				}
				else
				{
					length_name_scroll = j;
					break;
				}
			}
			
			if(j>=length_name_follow)
			{
				length_name_scroll = length_name_follow;
			}
				
			if(length_name_follow>length_name_scroll)
			{
				var length_show = length_name_scroll+space.length;
				var name_deal = follow_name+space;
				
				if(start_position_follow>=name_deal.length)
				{
					start_position_follow = 0;
					stop_position_follow = 1;
				}
				
				if(start_position_follow+length_show<=name_deal.length)
				{
					list_follow[1] = name_deal.substring(start_position_follow,start_position_follow+length_show);
				}
				
				if(start_position_follow+length_show>name_deal.length&&start_position_follow<name_deal.length)
				{
					list_follow[1] = name_deal.substring(start_position_follow,name_deal.length)+name_deal.substring(0,stop_position_follow);
					stop_position_follow++;
				}
				
				start_position_follow++;
			}
			else
			{
				list_follow[1] = follow_name;
			}
		}
	}
	
	function drawBanner()
	{
		var top2;
		var top3;
	
		var width_pro = 100;
		var height_pro = 10;
		var space_h1 = 8;
		
		var left2;
		var left3;
		var per_pro;
		
		
		left2 = left1+490;
		left3 = left2+space_h1+width_pro+100;
		
		top2 = top1+height_ud+38;
		top3 = top2+103;
		per_pro = width_pro/100;


		ctx1.clearRect(left1+17,top1+30,456,28);
		ctx1.clearRect(left1+488,top1+30,222,28);
		ctx1.clearRect(left1+723,top1+30,124,28);
		ctx1.clearRect(left1+17,top1+79,853,59);
		ctx1.clearRect(left1+17,top1+145,853,30);

		ctx1.fillStyle = "#2b2b2b";
		ctx1.fillRect(left1+17-1,top1+30-1,456+2,28+2);
		ctx1.fillRect(left1+723-1,top1+30-1,124+2,28+2);

		ctx1.fillStyle="black";
		ctx1.fillRect(left1+488-1,top1+30-1,222+2,28+2);
		ctx1.fillRect(left1+17-1,top1+79-1,853+2,59+2);
		ctx1.fillRect(left1+17-1,top1+145-1,853+2,30+2);
		
		
		
		ctx1.fillStyle="white";
		ctx1.font = "20px Arial";
		ctx1.textAlign = "left";
		
		var channel_num;
		if(service != null)
		{
			channel_num = service.logicNumber;
			
			ctx1.fillText(channel_num+"       "+public_draw_object.hanleCharacter(service.name),left1+width_lr+20,top2);
			ctx1.fillText(""+service.audioTrack,left1+width_lr+500,top2);
			ctx1.fillText(banner_time,left1+width_lr+750,top2);

			
			if(list_present.length>0)
			{
				ctx1.fillText(list_present[0]+"     "+list_present[1],left1+60,top1+100);
			}
			if(list_follow.length>0)
			{
				ctx1.fillText(list_follow[0]+"     "+list_follow[1],left1+60,top1+130);
			}
		}
		
		//service additional tips;
		var left_tip = left1+66;
		var top_tip = top3-4;

		
		if(service!=null)
		{
			if(service.isHasTeleText == true)
			{
				ctx1.drawImage(ns_ttx,left_tip,top_tip);
				left_tip = left_tip+ns_ttx.width + 6;
			}

			var suba = service.subTitle;
			if(suba!=null)
			{
				if(suba.length>0)
				{
					ctx1.drawImage(ns_sub,left_tip,top_tip);
					left_tip = left_tip+ns_sub.width + 6;
				}
			}

			if(service.isMultiAudio == true)
			{
				ctx1.drawImage(ns_aud1,left_tip,top_tip);
				left_tip = left_tip+ns_aud1.width + 6;
			}

			if(service.isFree != true)
			{
				ctx1.drawImage(money1,left_tip,top3-4);
				left_tip = left_tip+money1.width + 6;
			}

			if(service.lock == true)
			{
				ctx1.drawImage(ns_editlock,left_tip,top_tip-4);
				left_tip = left_tip+ns_editlock.width + 6;
			}

			if(service.favorite == true)
			{
				ctx1.drawImage(ns_editfav,left_tip,top_tip);
				left_tip = left_tip+ns_editfav.width + 6;
			}
		}
		
		

		ctx1.fillText("S",left2-space_h1*3,top3+12);
		ctx1.fillText(strength+"%",left2+width_pro+space_h1,top3+12);
		ctx1.fillText("Q",left3-space_h1*3,top3+12);
		ctx1.fillText(quality+"%",left3+width_pro+space_h1,top3+12);

		ctx1.fillStyle="#c7c9ca";
		public_draw_object.drawRoundRect(left2,top3,width_pro,height_pro,4,ctx1);
		public_draw_object.drawRoundRect(left3,top3,width_pro,height_pro,4,ctx1);
		
		/*ctx1.drawImage(ns_progress_wl,left2,top3);
		ctx1.drawImage(ns_progress_wm,left2+6,top3,width_pro-6*2,height_pro);
		ctx1.drawImage(ns_progress_wr,left2+6+width_pro-6*2,top3);
		
		ctx1.drawImage(ns_progress_wl,left3,top3);
		ctx1.drawImage(ns_progress_wm,left3+6,top3,width_pro-6*2,height_pro);
		ctx1.drawImage(ns_progress_wr,left3+6+width_pro-6*2,top3);*/

		if(strength>0)
		{
			ctx1.fillStyle="#d0ab27";
			public_draw_object.drawRoundRect(left2,top3,strength*per_pro,height_pro,4,ctx1);
		}

		if(quality)
		{
			ctx1.fillStyle="#4cc037";
			public_draw_object.drawRoundRect(left3,top3,quality*per_pro,height_pro,4,ctx1);
		}
		
		
		/*if(strength>0&&strength<=6)
		{
			ctx1.drawImage(ns_progress_yl,left2,top3);
		}
		else if(strength>6&&strength<=12)
		{
			ctx1.drawImage(ns_progress_yl,left2,top3);
			ctx1.drawImage(ns_progress_yr,left2+6,top3);
		}
		else if(strength>12)
		{
			ctx1.drawImage(ns_progress_yl,left2,top3);
			ctx1.drawImage(ns_progress_ym,left2+6,top3,per_pro*(strength-12),height_pro);
			ctx1.drawImage(ns_progress_yr,left2+6+per_pro*(strength-12),top3);
		}
		
		if(quality>0&&quality<=6)
		{
			ctx1.drawImage(ns_progress_gl,left3,top3);
		}
		else if(quality>6&&quality<=12)
		{
			ctx1.drawImage(ns_progress_gl,left3,top3);
			ctx1.drawImage(ns_progress_gr,left3+6,top3);
		}
		else if(quality>12)
		{
			ctx1.drawImage(ns_progress_gl,left3,top3);
			ctx1.drawImage(ns_progress_gm,left3+6,top3,per_pro*(quality-12),height_pro);
			ctx1.drawImage(ns_progress_gr,left3+6+per_pro*(quality-12),top3);
		}*/
		
	}
	
	function drawInfo()
	{
		var width_frame;
		var height_frame1;
		var height_frame2;
		var space_v1;
		
		var left_frame;
		var top_frame1;
		var top_frame2;

		width_frame = width1+width_lr*2-10;
		height_frame1 = 48;
		height_frame2 = 270;
		space_v1 = 3;
		radius = 4;
		
		left_frame = window_width/2-width_frame/2;
		top_frame1 = top1-6-height_frame2-height_frame1-space_v1;
		top_frame2 = top_frame1+height_frame1+space_v1;
		
		ctx1.clearRect(0, top_frame1-2, window_width, height_frame1+height_frame2+space_v1+4);

		ctx1.fillStyle = "black";
			
		public_draw_object.drawRoundRect(left_frame, top_frame1, width_frame, height_frame1+space_v1+height_frame2, radius,ctx1);
			
		ctx1.strokeStyle = "rgba(255,255,255,0.8)";
		ctx1.lineWidth = 2;
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame1+height_frame1);
		ctx1.arcTo(left_frame,top_frame1,left_frame+radius,top_frame1,radius);
		ctx1.lineTo(left_frame+width_frame-radius,top_frame1);
		ctx1.arcTo(left_frame+width_frame,top_frame1,left_frame+width_frame,top_frame1+radius,radius);
		ctx1.lineTo(left_frame+width_frame,top_frame1+height_frame1);
		ctx1.lineTo(left_frame,top_frame1+height_frame1);
		ctx1.stroke();
			
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2+height_frame2-radius);
		ctx1.arcTo(left_frame+width_frame,top_frame2+height_frame2,left_frame+width_frame-radius,top_frame2+height_frame2,radius);
		ctx1.lineTo(left_frame+radius,top_frame2+height_frame2);
		ctx1.arcTo(left_frame,top_frame2+height_frame2,left_frame,top_frame2+height_frame2-radius,radius);
		ctx1.lineTo(left_frame,top_frame2);
		ctx1.stroke();
		
		ctx1.globalAlpha = 1;
		ctx1.font = "20px Arial";
		ctx1.textAlign="left";
		ctx1.fillStyle = "white";
		
		if(list_info.length>0)
		{
			if(count_info<list_info.length)
			{
				ctx1.fillText(list_info[count_info][0],left_frame+23,top_frame1+36);
				var description = list_info[count_info][1];
				
				var exp=/^[a-zA-Z0-9]+$/;
				var r=0;
				var text_write=" ";
				for(var j=0;j<description.length&&j<700;j++)
				{
					var reg = description[j].match(exp);
					if(reg==null)
					{
						if(text_write.length>80)
						{
							ctx1.fillText(text_write,left_frame+23,top_frame2+50+r*25);
							text_write = "";
							r++;
						}
					}
					text_write+=description[j];
					if(j==description.length-1)
					{
						ctx1.fillText(text_write,left_frame+23,top_frame2+50+r*25);
						text_write = "";
						r = 0;
					}
				}
			}
			
			
			if(count_info<list_info.length-1)
			{
				ctx1.fillText("Next Event Info",left_frame+23+43+12,top1-6-10-3);
			}
			else
			{
				ctx1.fillText("Exit",left_frame+23+43+12,top1-6-10-3);
			}
		}
		else
		{
			ctx1.fillText("No Event Info",left_frame+23,top_frame1+36);
			ctx1.fillText("No Event Info",left_frame+23,top_frame2+150);
			ctx1.fillText("Exit",left_frame+23+43+12,top1-6-10-3);
		}
		ctx1.drawImage(ns_infor,left_frame+23,top1-6-10-22);
	}
	return this;
}

function ProgramsList()
{
	var width_content;
	var height_content;
	var left_frame;
	var top_frame;
	
	var current_position;
	var present_start_postion=-1;
	var present_position;
	var page_r;
	
	var isFindShow;
	
	var isShow_sort;
	var current_sort_position;
	var page_rs;
	
	var text_item = new Array();
	var length_list;


	var info_timer = "";
	var text_sort = new Array();
	text_sort[0] = "A     to    Z";
	text_sort[1] = "Z     to    A";
	text_sort[2] = "0     to    9";
	text_sort[3] = "9     to    0";
	text_sort[4] = "Lock    to    Unlock";
	text_sort[5] = "Unlock    to    Lock";
	text_sort[6] = "Pay   to    FTA";
	text_sort[7] = "FTA   to    Pay";
	//text_sort[8] = "Frequency";
	
	var name_title;
	var isLockShow;
	var timer1;

	function initData()
	{
		present_start_postion=-1
		present_position = -1;
		current_position = configure_object.tv_num;
		
		page_r = 12;
		length_list = 0;
		text_item.length = 0;
		
		var num = configure_object.effective_list % 4;
		if(num == 0)
		{
			name_title = "All Channels";
		}
		else 
		{
			name_title = "FAV"+num;
		}
		
		isFindShow =false;
		
		isShow_sort = false;
		page_rs = 9;
		current_sort_position = 0;
		
		isLockShow = false;
		timer1 = null;

		var service;
		for(var i=0;i<play_object.channel_list[configure_object.effective_list].length;i++)
		{
			service = play_object.getServiceById(play_object.channel_list[configure_object.effective_list][i]);
			var sId = "";
			sId += service.logicNumber;
			if(sId.length ==1)
			{
				sId ="      "+sId;
			}
			if(sId.length ==2)
			{
				sId ="    "+sId;
			}
			if(sId.length ==3)
			{
				sId ="  "+sId;
			}
			text_item[i] = new Array();
			text_item[i][0] = sId+"      "+public_draw_object.hanleCharacter(service.name);
			text_item[i][1] = service.isFree;
			text_item[i][2] = service.lock;
			text_item[i][3] = service.favorite;
			text_item[i][4] = service.logicNumber;
		}
		length_list = text_item.length;
	}
	
	function initView()
	{
		width_content = ns_listu.width;
		height_content = ns_listm.height-ns_listtitle.height;
		
		left_frame = 100;
		top_frame = 50;
		body.appendChild(canvas1);
		ctx1.clearRect(0,0,window_width,window_height);
	}

	function sortList(orderBy,isAsc)
	{
		var listNum = configure_object.effective_list;
		var service_i;
		var service_j;
		var id;
		var i;
		var j;
		switch(orderBy)
		{
			case 0:
			{
				if(isAsc == true)
				{
					play_object.channel_list[listNum].sort(function(a,b){
													var serviceA = play_object.getServiceById(a);
													var serviceB = play_object.getServiceById(b);
													if(serviceA.name > serviceB.name)
													{
														return  1;
													}else
													{
														return  -1;
													}
													});
				}
				else
				{
					play_object.channel_list[listNum].sort(function(a,b){
													var serviceA = play_object.getServiceById(a);
													var serviceB = play_object.getServiceById(b);
													if(serviceA.name < serviceB.name)
													{
														return  1;
													}else
													{
														return  -1;
													}
													});
				}
				break;
			}
			case 1:
			{
				if(isAsc == true)
				{
					play_object.channel_list[listNum].sort(function(a,b){
													var serviceA = play_object.getServiceById(a);
													var serviceB = play_object.getServiceById(b);
													return serviceA.logicNumber-serviceB.logicNumber;
													});
				}
				else
				{
					play_object.channel_list[listNum].sort(function(a,b){
													var serviceA = play_object.getServiceById(a);
													var serviceB = play_object.getServiceById(b);
													return serviceB.logicNumber-serviceA.logicNumber;
													});
				}
				break;
			}
			case 2:
			{
				if(isAsc == true)
				{
					play_object.channel_list[listNum].sort(function(a,b){
													var serviceA = play_object.getServiceById(a);
													var serviceB = play_object.getServiceById(b);
													return serviceB.lock-serviceA.lock;
													});
				}
				else
				{
					play_object.channel_list[listNum].sort(function(a,b){
													var serviceA = play_object.getServiceById(a);
													var serviceB = play_object.getServiceById(b);
													return serviceA.lock-serviceB.lock;
													});
				}
				break;
			}
			case 3:
			{
				if(isAsc == true)
				{
					play_object.channel_list[listNum].sort(function(a,b){
													var serviceA = play_object.getServiceById(a);
													var serviceB = play_object.getServiceById(b);
													return serviceA.isFree-serviceB.isFree;
													});
				}
				else
				{
					play_object.channel_list[listNum].sort(function(a,b){
													var serviceA = play_object.getServiceById(a);
													var serviceB = play_object.getServiceById(b);
													return serviceB.isFree-serviceA.isFree;
													});
				}
				break;
			}
		}
		
		var str = play_object.returnStringByList(listNum);
		play_object.saveStringToList(listNum,str);
		id = play_object.current_service.id;
		var num = -1;
		for(var i=0;i<play_object.channel_list[listNum].length;i++)
		{
			if(play_object.channel_list[listNum][i] == id)
			{
				num = i;
			}
		}
		if(num >= 0)
		{
			configure_object.tv_num = num;
		}
		dialog4_object.close();
	}

	
	function drawBackground()
	{
		ctx1.fillStyle = 'black';
		ctx1.drawImage(ns_listl,left_frame,top_frame);
		ctx1.drawImage(ns_listu,left_frame+ns_listl.width,top_frame);
		ctx1.drawImage(ns_listr,left_frame+ns_listl.width+width_content,top_frame);
		ctx1.fillRect(left_frame+ns_listl.width,top_frame+ns_listu.height,width_content,ns_listm.height);
		ctx1.drawImage(ns_listtitle,left_frame+ns_listl.width,top_frame+ns_listu.height);
		
		ctx1.drawImage(ns_listd,left_frame+ns_listl.width,top_frame+ns_listu.height+ns_listtitle.height+height_content);
		
		
		ctx1.fillStyle = "white";
		ctx1.font = "20px Arial";
		ctx1.textAlign = "center";
		ctx1.fillText(name_title,left_frame+ns_listl.width+width_content/2,top_frame+ns_listu.height+40);
		
		
		var top_bottom = top_frame+ns_listl.height+20;
		ctx1.fillStyle = "black";
		public_draw_object.drawRoundRect(left_frame,top_bottom,width_content+ns_listl.width*2,40,4,ctx1);
		public_draw_object.drawRoundStroke(ctx1,left_frame,top_bottom,width_content+ns_listl.width*2,40,4,1,"rgb(255,255,255)");
		
		ctx1.fillStyle = "white";
		ctx1.textAlign = "left";
		var left_draw = left_frame+10;
		ctx1.drawImage(ns_ok,left_draw,top_bottom+8);
		left_draw = left_draw+ns_ok.width+10;
		ctx1.fillText("Select",left_draw,top_bottom+26);
		left_draw = left_draw + ctx1.measureText("Select").width+20;
		ctx1.drawImage(ns_red,left_draw,top_bottom+8);
		left_draw = left_draw +ns_red.width+10;
		ctx1.fillText("Sort",left_draw,top_bottom+26);
		left_draw = left_draw + ctx1.measureText("Sort").width+20;
		ctx1.drawImage(ns_green,left_draw,top_bottom+8);
		left_draw = left_draw + ns_green.width+10;
		ctx1.fillText("Find",left_draw,top_bottom+26);
	}
	
	this.show = function()
	{
		ctx1.clearRect(0,0,window_width,window_height);
		ctx1.fillStyle = 'FFFFB0';
		ctx1.fillRect(0, 0, window_width, window_height);
		initData();
		initView();
		drawBackground();
		drawList();
	};
	
	function drawList()
	{
		
		var left_frame1 = left_frame+2;
		var top_frame1 = top_frame+2;
		var width_content1 = width_content-4;
		var height_content1 = height_content-4;
		var height_scroll = height_content1;
		var height_siderm = 22;
		var height_sider = ns_scrolldown.height*2+height_siderm;
		var height_per_scroll = (height_scroll-height_sider)/(length_list-1);
		
		var space_v1 = height_content1/page_r;
		
		
		
		
		

		if(present_position < 0)
		{
			present_start_postion = -1;
		}
		else
		{
			present_start_postion = Math.floor(present_position/page_r)*page_r;
		}
		var start_position = Math.floor(current_position/page_r)*page_r;
		var stop_position = length_list-start_position<=page_r?length_list:start_position +page_r;
		var width_cover = width_content1-ns_sider.width-ns_xl.width-ns_xr.width-2;
		var left_cover = left_frame1+ns_listl.width;
		var left_text = left_cover+10;
		
		var top_cover = top_frame1+ns_listu.height+ns_listtitle.height+2;
		var top_text = top_cover+space_v1-space_v1*0.3;
		
		
		ctx1.font = "20px Arial";
		ctx1.textAlign = "left";

		if(present_start_postion == start_position)
		{
			ctx1.fillStyle="black";
			ctx1.clearRect(left_frame+15,top_frame+79+(present_position-start_position)*space_v1,width_content1-ns_sider.width-2,space_v1);
			ctx1.fillRect(left_frame+15-1,top_frame+79-1+(present_position-start_position)*space_v1,width_content1-ns_sider.width-2+2,space_v1+2);
			ctx1.clearRect(left_frame+15,top_frame+79+(current_position-start_position)*space_v1,width_content1-ns_sider.width-2,space_v1);
			ctx1.fillRect(left_frame+15-1,top_frame+79-1+(current_position-start_position)*space_v1,width_content1-ns_sider.width-2+2,space_v1+2);

			ctx1.fillStyle="white";
			ctx1.fillText(text_item[present_position][0],left_text,top_text+(present_position-start_position)*space_v1);
			if(text_item[present_position][1] == false)
			{
				ctx1.drawImage(money1,left_text+390,top_cover+5+(present_position-start_position)*space_v1);
				//ctx1.fillText("M",left_text+390,top_text+(present_position-start_position)*space_v1);
			}
			if(text_item[present_position][2] == true)
			{
				ctx1.drawImage(ns_editlock,left_text+420,top_cover+5+(present_position-start_position)*space_v1-2);
			}
			if(text_item[present_position][3] == true)	
			{
				ctx1.drawImage(ns_editfav,left_text+450,top_cover+5+(present_position-start_position)*space_v1+1);
			}

			ctx1.drawImage(ns_xm,left_cover+5,top_cover+(current_position-start_position)*space_v1,width_cover+3,space_v1-6);
							
			ctx1.fillStyle="black";
			ctx1.fillText(text_item[current_position][0],left_text,top_text+(current_position-start_position)*space_v1);
			ctx1.fillStyle="white";
			
			if(text_item[current_position][1] == false)
			{
				ctx1.drawImage(money,left_text+390,top_cover+5+(current_position-start_position)*space_v1);
				//ctx1.fillText("M",left_text+390,top_text+(current_position-start_position)*space_v1);
			}
			if(text_item[current_position][2] == true)
			{
				ctx1.drawImage(ns_editlock,left_text+420,top_cover+5+(current_position-start_position)*space_v1-2);	
			}
			if(text_item[current_position][3] == true)	
			{
				ctx1.drawImage(ns_editfav,left_text+450,top_cover+5+(current_position-start_position)*space_v1+1);
			}

			
			present_position = current_position;
		}
		else
		{
			ctx1.fillStyle="black";
			ctx1.clearRect(left_frame+15,top_frame+79,496,461);
			ctx1.fillRect(left_frame+15-1,top_frame+79-1,496+2,461+2);
			present_position = current_position;
			for(var i=start_position;i<stop_position;i++)
			{
				//var service = play_object.getServiceById(play_object.channel_list[configure_object.effective_list][i]);
				if(i == current_position)
				{
					ctx1.drawImage(ns_xm,left_cover+5,top_cover+(i-start_position)*space_v1,width_cover+3,space_v1-6);;
							
					ctx1.fillStyle="black";
					ctx1.fillText(text_item[i][0],left_text,top_text+(i-start_position)*space_v1);
					ctx1.fillStyle="white";
					
					if(text_item[i][1] == false)
					{
						ctx1.drawImage(money,left_text+390,top_cover+5+(i-start_position)*space_v1);
						//ctx1.fillText("M",left_text+390,top_text+(i-start_position)*space_v1);
					}	
				}
				else
				{
					ctx1.fillStyle="white";
					ctx1.fillText(text_item[i][0],left_text,top_text+(i-start_position)*space_v1);
					if(text_item[i][1] == false)
					{
						ctx1.drawImage(money1,left_text+390,top_cover+5+(i-start_position)*space_v1);
						//ctx1.fillText("M",left_text+390,top_text+(i-start_position)*space_v1);
					}
				}
				
				if(text_item[i][2] == true)
				{
					ctx1.drawImage(ns_editlock,left_text+420,top_cover+5+(i-start_position)*space_v1-2);
				}
				if(text_item[i][3] == true)	
				{
					ctx1.drawImage(ns_editfav,left_text+450,top_cover+5+(i-start_position)*space_v1+1);
				}		
			}
		}

		var left_scroll = left_frame1+ns_listl.width+width_content1-ns_sider.width-1;
		var top_scroll = top_frame1+ns_listu.height+ns_listtitle.height;
		ctx1.fillStyle="#888888";
		ctx1.fillRect(left_scroll,top_scroll,ns_sider.width,height_content1);
		
		ctx1.fillStyle="#e8e8e8";
		public_draw_object.drawRoundRect(left_scroll,top_scroll+height_per_scroll*current_position,ns_sider.width,height_siderm,4,ctx1);
		//draw Info
		console.log("info:"+getTopTime());
		if(info_timer != "")
		{
			clearTimeout(info_timer);
		}
		info_timer = setTimeout(function(){
		var width_info_frame = 340;
		var height_info_frame = 260;
		var left_info_frame = left_frame+ns_listl.width+ns_listr.width+width_content+16;
		var left_info_text = left_info_frame+2;
		var top_info_frame = top_frame+260;
		var top_info_text = top_info_frame+30;
		
		var space_v2 = 40;
		
		ctx1.fillStyle = "black";
		ctx1.fillRect(left_info_frame,top_info_frame,width_info_frame,height_info_frame);
		ctx1.strokeStyle = "white";
		ctx1.strokeRect(left_info_frame,top_info_frame,width_info_frame,height_info_frame);

		ctx1.fillStyle="white";
		ctx1.font = "20px Arial";
		ctx1.textAlign = "left";
	
		var service = play_object.getServiceById(play_object.channel_list[configure_object.effective_list][current_position]);
		var TS =service.tsId;
		var Fre =service.frequency;
		var Sym =service.symbolRate;
		var qam = service.modulation;
		if(qam == 1)
		{
			Qam = "16 QAM";
		}
		else if(qam == 2)
		{
			Qam = "32 QAM";
		}else if(qam == 3)
		{
			Qam = "64 QAM";
		}else if(qam == 4)
		{
			Qam = "128 QAM";
		}else if(qam == 5)
		{
			Qam = "256 QAM";
		}

		var VId = service.videoPID;
		var AId = service.audioPID;
		var PId = service.pcrPID;
		ctx1.fillText("TS"+":  "+Fre +"/"+Sym+"/"+Qam,left_info_text,top_info_text);
		ctx1.fillText("Video  PID"+" : "+VId,left_info_text,top_info_text+space_v2);
		ctx1.fillText("Audio  PID"+" : "+AId,left_info_text,top_info_text+space_v2*2);
		ctx1.fillText("PCR    PID"+" : "+PId,left_info_text,top_info_text+space_v2*3);
							},1000);
		
		
	}
	
	function drawSort()
	{
		if(!isShow_sort)
		{
			current_sort_position = 0;
			isShow_sort = true;
		}
		var width_sort_frame = 298;
		var height_sort_frame = 354;
		
		var space_v1 = 33+6;
		
		var left_sort_frame = left_frame+206;
		var top_sort_frame = top_frame+174;
		
		ctx1.fillStyle = "black";
		ctx1.fillRect(left_sort_frame,top_sort_frame,width_sort_frame,height_sort_frame);
		ctx1.strokeStyle = "white";
		ctx1.strokeRect(left_sort_frame,top_sort_frame,width_sort_frame,height_sort_frame);
		
		var length_text_sort = text_sort.length;
		if(length_text_sort > 0)
		{
			var start_position = Math.floor(current_sort_position/page_rs)*page_rs;
			var stop_position = length_text_sort-start_position<=page_rs?length_text_sort:start_position +page_rs;
			
			var left_cover = left_sort_frame+2;
			var top_cover = top_sort_frame+2;
			var width_cover = width_sort_frame -13 ;
			for(var i=start_position;i<stop_position;i++)
			{
				if(i == current_sort_position)
				{
					ctx1.drawImage(ns_xl,left_cover,top_cover+(i-start_position)*space_v1,ns_xl.width,space_v1-6);
					ctx1.drawImage(ns_xm,left_cover+5,top_cover+(i-start_position)*space_v1,width_cover,space_v1-6);
					ctx1.drawImage(ns_xr,left_cover+5+width_cover,top_cover+(i-start_position)*space_v1,ns_xr.width,space_v1-6);
					
					ctx1.fillStyle = "black";
					ctx1.fillText(text_sort[i],left_sort_frame+3,top_sort_frame+23+(i-start_position)*space_v1);
				}
				else
				{
					ctx1.fillStyle = "white";
					ctx1.fillText(text_sort[i],left_sort_frame+3,top_sort_frame+23+(i-start_position)*space_v1);
				}
			}
		}
	}
	
	function open_timing()
	{
		close_timing(timer1);
		timer1 = setTimeout(function()
		{
			configure_object.tv_num = current_position;
			if(public_draw_object.checkServiceLock(configure_object.tv_num))
			{
				serviceCheckDeal();
			}
			else 
			{
				play_object.play();	
				timer1 = null;
			}
		},1000);
	}
	function close_timing()
	{
		if(timer1 != null)
		{
			clearTimeout(timer1);
			timer1 = null;
		}
	}
	
	
	function stopPlay()
	{
		tvplayer.stop();
		ctx.clearRect(0,0,window_width,window_height);
	}
	function serviceCheckDeal()
	{
		if(isLockShow == false)
		{
			stopPlay();
			isLockShow = true;
			var param2 = {
				fun_ok:function()
				{
					play_object.isUnlock = true;
					isLockShow = false;
					ctx.fillStyle="FFFFB0";
					ctx.fillRect(0,0,window_width,window_height);
					play_object.play();
					timer1 = null;
				},
				fun_check:function(pin)
				{
					return checkPin(pin);
				}
			};
			dialog6_object.show(param2);
		}
	}
	function checkPin(inputPin)
	{
		var realPin = configure_object.factory_set_pin;
		if(realPin == inputPin)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	this.up = function()
	{
		if(!isShow_sort)
		{
			if(length_list>0)
			{
				if(current_position>0)
				{
					current_position--;
				}
				else
				{
					current_position = length_list - 1;
				}
				//console.log("begin:"+getTopTime());
				drawList();
				//console.log("end:"+getTopTime());
				if(isLockShow)
				{
					dialog6_object.close();
					isLockShow = false;
				}
				if(configure_object.channel_select_with_ok == 1)
				{
					open_timing();
				}
			}
			
		}
		else
		{
			if(current_sort_position>0)
			{
				current_sort_position--;
			}
			else
			{
				current_sort_position = text_sort.length-1;
			}
			drawList();
			drawSort();
		}
		
	}
	
	this.down = function()
	{
		if(!isShow_sort)
		{
			if(length_list>0)
			{
				if(current_position<length_list - 1)
				{
					current_position++;
				}
				else
				{
					current_position = 0;
				}
			//	console.log("begin:"+getTopTime());
				drawList();
			//	console.log("end:"+getTopTime());
				if(isLockShow)
				{
					dialog6_object.close();
					isLockShow = false;
				}
				if(configure_object.channel_select_with_ok == 1)
				{
					open_timing();
				}
			}
		}
		else
		{
			if(current_sort_position<text_sort.length-1)
			{
				current_sort_position++;
			}
			else
			{
				current_sort_position = 0;
			}
			drawList();
			drawSort();
		}
	}
	
	this.left = function()
	{
		if(!isShow_sort)
		{
			if(length_list>0)
			{
				var start_position = Math.floor(current_position/page_r)*page_r;
				if(start_position-page_r<0)
				{
					current_position = length_list%page_r==0?(length_list-page_r):(length_list-length_list%page_r);
				}
				else
				{
					current_position = start_position-page_r;
				}
				drawList();
				if(isLockShow)
				{
					dialog6_object.close();
					isLockShow = false;
				}
				if(configure_object.channel_select_with_ok == 1)
				{
					open_timing();
				}
			}
		}
		
	}
	
	this.right = function()
	{
		if(!isShow_sort)
		{
			if(length_list>0)
			{
				var start_position = Math.floor(current_position/page_r)*page_r;
				current_position = length_list>(start_position+page_r)?(start_position+page_r):0;
				drawList();
				if(isLockShow)
				{
					dialog6_object.close();
					isLockShow = false;
				}
				if(configure_object.channel_select_with_ok == 1)
				{
					open_timing();
				}
			}
		}
	}
	this.channel_up = function()
	{
		if(!isShow_sort)
		{
			if(length_list>0)
			{
				if(current_position>0)
				{
					current_position--;
				}
				else
				{
					current_position = length_list - 1;
				}
				drawList();
				if(isLockShow)
				{
					dialog6_object.close();
					isLockShow = false;
				}

				open_timing();
			}
			
		}
	}
	
	this.channel_down = function()
	{
		if(!isShow_sort)
		{
			if(length_list>0)
			{
				if(current_position<length_list - 1)
				{
					current_position++;
				}
				else
				{
					current_position = 0;
				}
				drawList();
				if(isLockShow)
				{
					dialog6_object.close();
					isLockShow = false;
				}

				open_timing();
			}
		}
	}
	
	
	this.red = function()
	{
		drawSort();
	}
	
	function findChannel(name)
	{
		isFindShow = false;
		//find the channel with name 
		var id;
		var service;
		for(var i=0;i<play_object.channel_list[configure_object.effective_list].length;i++)
		{
			service = play_object.getServiceById(play_object.channel_list[configure_object.effective_list][i]);
			if(service == null)
			{
				continue;
			}
			if(name == service.name)
			{
				if(configure_object.tv_num == i)
				{
					return;
				}
				else
				{
					current_position = i;
					configure_object.tv_num = i;
					play_object.playTV();
					drawList();
					return;
				}
				
				return;
			}
		}
		
		for(var i=0;i<play_object.channel_list[configure_object.effective_list].length;i++)
		{
			service = play_object.getServiceById(play_object.channel_list[configure_object.effective_list][i]);
			if(service == null)
			{
				continue;
			}
			if(service.name.indexOf(name)==0)
			{
				if(configure_object.tv_num == i)
				{
					return;
				}
				else
				{
					current_position = i;
					configure_object.tv_num = i;
					play_object.playTV();
					flag = 1;
					drawList();
					return;
				}
			}
		}
	}
	
	this.green = function()
	{
		isFindShow = true;
		openT(600,300,findChannel,"");
	}
	
	this.ok = function()
	{
		if(!isShow_sort)
		{
			if(configure_object.channel_select_with_ok == 0)
			{	
				if(public_draw_object.checkServiceLock(current_position))
				{
					configure_object.tv_num = current_position;
					serviceCheckDeal();
				}
				else 
				{
					if(configure_object.tv_num != current_position)
					{
						configure_object.tv_num = current_position;
						play_object.playTV();
					}
				}	

			}
			else
			{
				
			}
		}
		else
		{
			isShow_sort = false;
			var params=
			{
				title:"Information",
				content:"Channel Sorting..."
			}
		
			dialog4_object.show(params);
			
			setTimeout(function()
			{
				if(current_sort_position == 0)
				{
					//order by name - Asc
					sortList(0,true);
				}
				else if(current_sort_position == 1)
				{
					//order by name - Desc
					sortList(0,false);
				}
				else if(current_sort_position == 2)
				{
					//order by logicalnum - Asc
					sortList(1,true);
				}
				else if(current_sort_position == 3)
				{
					//order by logicalnum - Desc
					sortList(1,false);
				}
				else if(current_sort_position == 4)
				{
					//order by lock - Asc
					sortList(2,true);
				}
				else if(current_sort_position == 5)
				{
					//order by lock - Desc
					sortList(2,false);
				}
				else if(current_sort_position == 6)
				{
					//order by pay - Asc
					sortList(3,true);
				}
				else if(current_sort_position == 7)
				{
					//order by pay - Desc
					sortList(3,false);
				}
				programs_list_object.show();
					},500);
		}
		
	}
	this.close = function()
	{
		this.menu();
	}
	this.menu = function()
	{
		if(!isShow_sort)
		{
			if(isLockShow ==true && dialog6_object!=null)
			{
				isLockShow = false;
				dialog6_object.close();
			}
			current_dialog_object = null;
			ctx1.clearRect(0,0,window_width,window_height);
			if(document.getElementById("canvas1"))
			{
				body.removeChild(canvas1);
			}
		}
		else
		{
			isShow_sort = false;
			drawList();
		}
		
		play_object.show();
	}
	
	this.keydownevent = function(keycode)
	{
		if(!isFindShow)
		{
			switch(keycode)	
			{
				//Left
				case 37:
				{
					if(isLockShow ==true && dialog6_object!=null)
					{
						if(dialog6_object.hasOwnProperty("keydownevent"))
						{
							dialog6_object.keydownevent(keycode);
						}
					}
					else 
					{
						this.left();
					}
					
				}
				break;
				//Right
				case 39:
				{
					this.right();
				}
				break;
				case 38:
				{
					this.up();
				}
				break;
				case 40:
				{
					this.down();
				}
				break;
				case 18:
				{
					this.menu();	
				}
				break;
				case 13:
				{
					if(isLockShow ==true && dialog6_object!=null)
					{
						if(dialog6_object.hasOwnProperty("keydownevent"))
						{
							dialog6_object.keydownevent(keycode);
						}
					}
					else
					{
						this.ok();
					}
				}
				break;
				case 27:
				{
					this.menu();
				}
				break;
				case 124:
				{
					this.channel_up();
				}
				break;
				case 125:
				{
					this.channel_down();
				}
				break;
				//tv audio mode
				case 119:
				{
					play_object.change_play_mode();
					
					this.close();
				}
				break;
				case 129:
				{
					this.red();
				}
				break;
				case 130:
				{
					this.green();
				}
				break;
				default:
				{
					if(isLockShow ==true && dialog6_object!=null)
					{
						if(dialog6_object.hasOwnProperty("keydownevent"))
						{
							dialog6_object.keydownevent(keycode);
						}
					}
				}
				break;
			}
		}
		else
		{
			switch(keycode)
			{
				case 18:
				{
					isFindShow = false;
					closeT();
				}
				break;
			}	
		}
	}
	
	return this;
}
function ProgramsGuide()
{
	var width_content;
	var height_content;
	var left_frame;
	var top_frame;
	
	var current_position;
	var page_r;
	
	var isShow_sort;
	var page_rs;
	
	var text_item = new Array();
	var length_list;
	

	function initData()
	{
		current_position = 0;//
		
		page_r = 12;
		length_list = 0;
		text_item.length = 0;		
		text_item[0] = "All Channels";
		text_item[1] = "FAV1";
		text_item[2] = "FAV2";
		text_item[3] = "FAV3";

		length_list = text_item.length;
	}
	
	function initView()
	{
		width_content = ns_listu.width;
		height_content = ns_listm.height-ns_listtitle.height;
		
		left_frame = 100;
		top_frame = 50;
		
		body.appendChild(canvas1);
		ctx1.clearRect(0,0,window_width,window_height);
	}
	
	
	function drawBackground()
	{
		ctx1.fillStyle = 'black';
		ctx1.drawImage(ns_listl,left_frame,top_frame);
		ctx1.drawImage(ns_listu,left_frame+ns_listl.width,top_frame);
		ctx1.drawImage(ns_listr,left_frame+ns_listl.width+width_content,top_frame);
		ctx1.fillRect(left_frame+ns_listl.width,top_frame+ns_listu.height,width_content,ns_listm.height);
		ctx1.drawImage(ns_listtitle,left_frame+ns_listl.width,top_frame+ns_listu.height);
		
		ctx1.drawImage(ns_listd,left_frame+ns_listl.width,top_frame+ns_listu.height+ns_listtitle.height+height_content);
		
		
		ctx1.fillStyle = "white";
		ctx1.font = "20px Arial";
		ctx1.textAlign = "center";
		ctx1.fillText("Guide",left_frame+ns_listl.width+width_content/2,top_frame+ns_listu.height+40);
		
		
		

	
	}
	
	this.show = function()
	{
		ctx.clearRect(0,0,window_width,window_height);
		ctx.fillStyle = 'FFFFB0';
		ctx.fillRect(0, 0, window_width, window_height);
		initData();
		initView();
		drawBackground();
		drawList();
	};
	
	function drawList()
	{
		var left_frame1 = left_frame+2;
		var top_frame1 = top_frame+2;
		var width_content1 = width_content-4;
		var height_content1 = height_content-4;
		var height_scroll = height_content1;
		var height_siderm = 22;
		var height_sider = ns_scrolldown.height*2+height_siderm;
		var height_per_scroll = (height_scroll-height_sider)/(length_list-1);
		
		var space_v1 = height_content1/page_r;
		
		ctx1.fillStyle="black";
		ctx1.clearRect(left_frame+15,top_frame+79,496,461);
		ctx1.fillRect(left_frame+15-1,top_frame+79-1,496+2,461+2);
				
		var left_scroll = left_frame1+ns_listl.width+width_content1-ns_sider.width-1;
		var top_scroll = top_frame1+ns_listu.height+ns_listtitle.height;
		ctx1.fillStyle="#888888";
		ctx1.fillRect(left_scroll,top_scroll,ns_sider.width,height_content1);
		ctx1.fillStyle="#e8e8e8";
		public_draw_object.drawRoundRect(left_scroll,top_scroll+height_per_scroll*current_position,ns_sider.width,height_siderm,4,ctx1);
		
		
		
		var start_position = Math.floor(current_position/page_r)*page_r;
		var stop_position = length_list-start_position<=page_r?length_list:start_position +page_r;
		
		var width_cover = width_content-ns_sider.width-ns_xl.width-ns_xr.width-2;
		var left_cover = left_frame+ns_listl.width;
		var left_text = left_cover+10;
		
		var top_cover = top_frame+ns_listu.height+ns_listtitle.height+2;
		var top_text = top_cover+space_v1-space_v1*0.3;
		
		
		ctx1.font = "20px Arial";
		ctx1.textAlign = "left";
		for(var i=start_position;i<stop_position;i++)
		{
			if(i == current_position)
			{
				ctx1.drawImage(ns_xm,left_cover+5,top_cover+(i-start_position)*space_v1,width_cover,space_v1-6);

						
				ctx1.fillStyle="black";
						
				ctx1.fillText(text_item[i],left_text,top_text+(i-start_position)*space_v1);
				ctx1.fillStyle="white";				
			}
			else
			{
				ctx1.fillText(text_item[i],left_text,top_text+(i-start_position)*space_v1);
			}
		}
		
		var top_bottom = top_frame+ns_listl.height+20;
		ctx1.fillStyle = "black";
		public_draw_object.drawRoundRect(left_frame,top_bottom,width_content+ns_listl.width*2+100,40,4,ctx1);
		
		public_draw_object.drawRoundStroke(ctx1,left_frame,top_bottom,width_content+ns_listl.width*2+100,40,4,1,"rgb(255,255,255)");
		
		
		ctx1.fillStyle = "white";
		ctx1.textAlign = "left";
		var left_draw = left_frame+10;
		ctx1.drawImage(ns_move,left_draw,top_bottom+8);
		left_draw = left_draw+ns_move.width+10;
		ctx1.fillText("Move",left_draw,top_bottom+26);
		left_draw = left_draw + ctx1.measureText("Move").width+20;
		ctx1.drawImage(ns_ok,left_draw,top_bottom+8);
		left_draw = left_draw +ns_ok.width+10;
		ctx1.fillText("Select",left_draw,top_bottom+26);
		left_draw = left_draw + ctx1.measureText("Select").width+20;
		
		if(current_position>0)
		{
			ctx1.drawImage(ns_red,left_draw,top_bottom+8);
			left_draw = left_draw + ns_red.width+10;
			ctx1.fillText("Edit Fav Name",left_draw,top_bottom+26);
		}
		
	}
	
	this.up = function()
	{
		if(length_list>0)
		{
			if(current_position>0)
			{
				current_position--;
			}
			else
			{
				current_position = length_list - 1;
			}
			drawList();
		}
	}
	
	this.down = function()
	{
		if(length_list>0)
		{
			if(current_position<length_list - 1)
			{
				current_position++;
			}
			else
			{
				current_position = 0;
			}
			drawList();
		}
	}
	
	this.left = function()
	{
		if(length_list>0)
		{
			var start_position = Math.floor(current_position/page_r)*page_r;
			if(start_position-page_r<0)
			{
				current_position = length_list%page_r==0?(length_list-page_r):(length_list-length_list%page_r);
			}
			else
			{
				current_position = start_position-page_r;
			}
			drawList();
		}
	}
	
	this.right = function()
	{
		if(length_list>0)
		{
			var start_position = Math.floor(current_position/page_r)*page_r;
			current_position = length_list>(start_position+page_r)?(start_position+page_r):0;
			drawList();
		}
	}

	this.ok = function()
	{
		console.log("current list:"+configure_object.effective_list +"        current_position:"+current_position);
		if(configure_object.effective_list < 4)
		{
			if(play_object.channel_list[current_position].length <= 0)
			{
				var param = 
				{
					title:"Information",
					content:"The FAV List Is Empty!",
					timeout:1000
				};
				dialog8_object.show(param);
				return;
			}
			else
			{
				if(current_position>=0 && current_position<8)
				{
					configure_object.effective_list = current_position;
				}	
			}
			
		}
		else
		{
			if(play_object.channel_list[current_position+4].length <= 0)
			{
				var param = 
				{
					title:"Information",
					content:"The FAV List Is Empty!",
					timeout:1000
				};
				dialog8_object.show(param);
				return;
			}
			else
			{
				if(current_position>=0 && current_position<8 )
				{
					configure_object.effective_list = current_position+4;
				}
			}
			
		}
		current_dialog_object = programs_fav_object;
		current_dialog_object.show();
	}
	this.close = function()
	{
		this.menu();
	}
	this.menu = function()
	{
		current_dialog_object = null;
		ctx1.clearRect(0,0,window_width,window_height);
		if(document.getElementById("canvas1"))
		{
			body.removeChild(canvas1);
		}
		play_object.show();
	}
	
	this.keydownevent = function(keycode)
	{
		switch(keycode)	
		{
			//Left
			case 37:
			{
				this.left();
			}
			break;
			//Right
			case 39:
			{
				this.right();
			}
			break;
			case 38:
			{
				this.up();
			}
			break;
			case 40:
			{
				this.down();
			}
			break;
			case 18:
			{
				this.menu();	
			}
			break;
			case 13:
			{
				this.ok();
			}
			break;
			case 27:
			{
				this.menu();
			}
			break;
		}
	}
	
	return this;
}

function ProgramsFAV()
{
	var width_content;
	var height_content;
	var left_frame;
	var top_frame;

	var init_position;
	var last_position ;
	var current_position;
	var page_r;
	
	var text_item;
	var length_list;
	
	var num_list;
	var name_title;
	
	var isLockShow;
	var isMove;
	
	var timer1;

	function initData()
	{
		checkPlayServiceIsInList();
		page_r = 12;
		length_list = 0;
		text_item = new Array();
		num_list = configure_object.effective_list;
		var num = num_list % 4;
		if(num == 0)
		{
			name_title = "All Channels";
		}
		else 
		{
			name_title = "FAV"+num;
		}
		initChannelList();
		isLockShow = false;
		isMove = false;
		timer1 = null;
		
	}

	function initChannelList()
	{
		length_list.length = 0;
		var service;
		for(var i=0;i<play_object.channel_list[num_list].length;i++)
		{
			service = play_object.getServiceById(play_object.channel_list[num_list][i]);
			var sId = "";
			sId += service.logicNumber;
			if(sId.length ==1)
			{
				sId ="      "+sId;
			}
			if(sId.length ==2)
			{
				sId ="    "+sId;
			}
			if(sId.length ==3)
			{
				sId ="  "+sId;
			}
			text_item[i] = new Array();
			text_item[i][0] = sId+"      "+public_draw_object.hanleCharacter(service.name);
			text_item[i][1] = service.isFree;
			text_item[i][2] = service.lock;
			text_item[i][3] = service.favorite;
			text_item[i][4] = service.logicNumber;
			text_item[i][5] = service.id;
		}
		length_list = text_item.length;
	}
	
	function initView()
	{
		width_content = ns_listu.width;
		height_content = ns_listm.height-ns_listtitle.height;
		
		left_frame = 100;
		top_frame = 50;
		
		body.appendChild(canvas1);
		ctx1.clearRect(0,0,window_width,window_height);
	}
	function checkPlayServiceIsInList()
	{
		console.log("checkPlayServiceIsInList    current list:"+configure_object.effective_list);
		var id;
		var flag = -1;
		var service = play_object.current_service;
		if(service == null)
		{
			id = -1;
		}else
		{
			id = service.id
		}
		current_position = 0;
		for(var i=0;i<play_object.channel_list[configure_object.effective_list].length;i++)
		{
			if(play_object.channel_list[configure_object.effective_list][i] == id)
			{
				current_position = i;
				flag = 0;
			}
		}
		if(flag == -1)
		{
			configure_object.tv_num = 0;
			//check is lock
			open_timing();
		}
	}
	
	function drawBackground()
	{
		ctx1.fillStyle = 'black';
		ctx1.drawImage(ns_listl,left_frame,top_frame);
		ctx1.drawImage(ns_listu,left_frame+ns_listl.width,top_frame);
		ctx1.drawImage(ns_listr,left_frame+ns_listl.width+width_content,top_frame);
		ctx1.fillRect(left_frame+ns_listl.width,top_frame+ns_listu.height,width_content,ns_listm.height);
		ctx1.drawImage(ns_listtitle,left_frame+ns_listl.width,top_frame+ns_listu.height);
		
		ctx1.drawImage(ns_listd,left_frame+ns_listl.width,top_frame+ns_listu.height+ns_listtitle.height+height_content);
		
		
		ctx1.fillStyle = "white";
		ctx1.font = "20px Arial";
		ctx1.textAlign = "center";
		ctx1.fillText(name_title,left_frame+ns_listl.width+width_content/2,top_frame+ns_listu.height+40);
		
		var top_bottom = top_frame+ns_listl.height+20;
		ctx1.fillStyle = "black";
		public_draw_object.drawRoundRect(left_frame,top_bottom,width_content+ns_listl.width*2,40,4,ctx1);
		
		public_draw_object.drawRoundStroke(ctx1,left_frame,top_bottom,width_content+ns_listl.width*2,40,4,1,"rgb(255,255,255)");
		
		ctx1.fillStyle = "white";
		ctx1.textAlign = "left";
		
		var left_draw = left_frame+10;
		ctx1.drawImage(ns_move,left_draw,top_bottom+8);
		left_draw = left_draw+ns_move.width+10;
		ctx1.fillText("Move",left_draw,top_bottom+26);
		left_draw = left_draw + ctx1.measureText("Move").width+20;
		ctx1.drawImage(ns_ok,left_draw,top_bottom+8);
		left_draw = left_draw +ns_ok.width+10;
		if(isMove)
		{
			ctx1.fillText("Save",left_draw,top_bottom+26);
			left_draw = left_draw + ctx1.measureText("Save").width+20;
		}
		else
		{
			ctx1.fillText("Select",left_draw,top_bottom+26);
			left_draw = left_draw + ctx1.measureText("Select").width+20;
		}

		ctx1.drawImage(ns_red,left_draw,top_bottom+8);
		left_draw = left_draw + ns_red.width+10;
		if(isMove)
		{
			ctx1.fillText("Release",left_draw,top_bottom+26);
		}
		else
		{
			ctx1.fillText("Move Mode",left_draw,top_bottom+26);
		}
	}
	
	this.show = function()
	{
		
		ctx.clearRect(0,0,window_width,window_height);
		ctx.fillStyle = 'FFFFB0';
		ctx.fillRect(0, 0, window_width, window_height);
		initData();
		initView();
		drawBackground();
		drawList();
	};
	
	function drawList()
	{
		var left_frame1 = left_frame+2;
		var top_frame1 = top_frame+2;
		var width_content1 = width_content-4;
		var height_content1 = height_content-4;
		var height_scroll = height_content1;
		var height_siderm = 22;
		var height_sider = ns_scrolldown.height*2+height_siderm;
		var height_per_scroll = (height_scroll-height_sider)/(length_list-1);
		
		var space_v1 = height_content1/page_r;
		
		ctx1.fillStyle="black";
		ctx1.clearRect(left_frame+15,top_frame+79,496,461);
		ctx1.fillRect(left_frame+15-1,top_frame+79-1,496+2,461+2);
		
		
		
		var left_scroll = left_frame1+ns_listl.width+width_content1-ns_sider.width-1;
		var top_scroll = top_frame1+ns_listu.height+ns_listtitle.height;
		ctx1.fillStyle="#888888";
		ctx1.fillRect(left_scroll,top_scroll,ns_sider.width,height_content1);
		/*ctx1.drawImage(ns_scrollup,left_scroll,top_scroll+height_per_scroll*current_position);
		ctx1.drawImage(ns_scrollm,left_scroll,top_scroll+height_per_scroll*current_position+ns_scrollup.height,ns_scrollm.width,height_siderm);
		ctx1.drawImage(ns_scrolldown,left_scroll,top_scroll+height_per_scroll*current_position+ns_scrollup.height+height_siderm);*/
		
		ctx1.fillStyle="#e8e8e8";
		public_draw_object.drawRoundRect(left_scroll,top_scroll+height_per_scroll*current_position,ns_sider.width,height_siderm,4,ctx1);
		
		
		
		var start_position = Math.floor(current_position/page_r)*page_r;
		var stop_position = length_list-start_position<=page_r?length_list:start_position +page_r;
		
		var width_cover = width_content-ns_sider.width-ns_xl.width-ns_xr.width-2;
		var left_cover = left_frame+ns_listl.width;
		var left_text = left_cover+10;
		
		var top_cover = top_frame+ns_listu.height+ns_listtitle.height+2;
		var top_text = top_cover+space_v1-space_v1*0.3;
		
		
		ctx1.font = "20px Arial";
		ctx1.textAlign = "left";
		for(var i=start_position;i<stop_position;i++)
		{
			var service = play_object.getServiceById(play_object.channel_list[num_list][i]);
			if(i == current_position)
			{
				if(isMove)
				{
					ctx1.drawImage(ns_mitem,left_cover,top_cover+(i-start_position)*space_v1,width_cover+10,space_v1-6);
				}
				else
				{
					ctx1.drawImage(ns_xm,left_cover+5,top_cover+(i-start_position)*space_v1,width_cover,space_v1-6);
				}
						
				ctx1.fillStyle="black";
						
				ctx1.fillText(text_item[i][0],left_text,top_text+(i-start_position)*space_v1);
				ctx1.fillStyle="white";
				
				if(text_item[i][1] == false)
				{
					ctx1.drawImage(money,left_text+390,top_cover+5+(i-start_position)*space_v1);
				}	
			}
			else
			{
				ctx1.fillText(text_item[i][0],left_text,top_text+(i-start_position)*space_v1);
				if(text_item[i][1] == false)
				{
					ctx1.drawImage(money1,left_text+390,top_cover+5+(i-start_position)*space_v1);
				}
			}
			
			if(text_item[i][2] == true)
			{
				ctx1.drawImage(ns_editlock,left_text+420,top_cover+5+(i-start_position)*space_v1);
			}
			if(text_item[i][3] == true)	
			{
				ctx1.drawImage(ns_editfav,left_text+450,top_cover+5+(i-start_position)*space_v1);
			}		
		}
		
		//draw Info
		
		var width_info_frame = 340;
		var height_info_frame = 260;
		var left_info_frame = left_frame+ns_listl.width+ns_listr.width+width_content+16;
		var left_info_text = left_info_frame+2;
		
		var top_info_frame = top_frame+260;
		var top_info_text = top_info_frame+30;
		
		var space_v2 = 40;
		
		ctx1.fillStyle = "black";
		ctx1.fillRect(left_info_frame,top_info_frame,width_info_frame,height_info_frame);
		ctx1.strokeStyle = "white";
		ctx1.strokeRect(left_info_frame,top_info_frame,width_info_frame,height_info_frame);
		
		ctx1.fillStyle="white";
		ctx1.font = "20px Arial";
		ctx1.textAlign = "left";

		var service = play_object.getServiceById(play_object.channel_list[configure_object.effective_list][current_position]);
		var TS =service.tsId;
		var Fre =service.frequency;
		var Sym =service.symbolRate;
		var Qam;
		var qam = service.modulation;
		if(qam == 1)
		{
			Qam = "16 QAM";
		}
		else if(qam == 2)
		{
			Qam = "32 QAM";
		}else if(qam == 3)
		{
			Qam = "64 QAM";
		}else if(qam == 4)
		{
			Qam = "128 QAM";
		}else if(qam == 5)
		{
			Qam = "256 QAM";
		}

		var VId = service.videoPID;
		var AId = service.audioPID;
		var PId = service.pcrPID;
		ctx1.fillText("TS"+":  "+Fre +"/"+Sym+"/"+Qam,left_info_text,top_info_text);
		ctx1.fillText("Video  PID"+" : "+VId,left_info_text,top_info_text+space_v2);
		ctx1.fillText("Audio  PID"+" : "+AId,left_info_text,top_info_text+space_v2*2);
		ctx1.fillText("PCR    PID"+" : "+PId,left_info_text,top_info_text+space_v2*3);
	}
	
	function open_timing()
	{
		close_timing(timer1);
		timer1 = setTimeout(function()
		{
			configure_object.tv_num = current_position;
			if(public_draw_object.checkServiceLock(configure_object.tv_num))
			{
				serviceCheckDeal();
			}
			else 
			{
				play_object.play();	
			}
		},1000);
	}
	function close_timing()
	{
		if(timer1 != null)
		{
			clearTimeout(timer1);
			timer1 = null;
		}
	}
	
	function stopPlay()
	{
		tvplayer.stop();
		ctx.clearRect(0,0,window_width,window_height);
	}
	function serviceCheckDeal()
	{
		if(isLockShow == false)
		{
			stopPlay();
			isLockShow = true;
			var param2 = {
				fun_ok:function()
				{
					play_object.isUnlock = true;
					isLockShow = false;
					ctx.fillStyle="FFFFB0";
					ctx.fillRect(0,0,window_width,window_height);
					play_object.play();
				},
				fun_check:function(pin)
				{
					return checkPin(pin);
				}
			};
			dialog6_object.show(param2);
		}
	}
	function checkPin(inputPin)
	{
		var realPin = configure_object.factory_set_pin;
		if(realPin == inputPin)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	this.up = function()
	{
		if(length_list>0)
		{
			if(!isMove)
			{
				if(current_position>0)
				{
					current_position--;
				}
				else
				{
					current_position = length_list - 1;
				}
				drawList();
				if(isLockShow)
				{
					dialog6_object.close();
					isLockShow = false;
				}
				if(configure_object.channel_select_with_ok == 1)
				{
					open_timing();
				}
			}
			else
			{
				last_position = current_position;
				var text_move = new Array();
				
				if(current_position>0)
				{
					current_position--;
				}
				else
				{
					current_position = length_list - 1;
				}
				
				text_move[0] = text_item[last_position][0];
				text_move[1] = text_item[last_position][1];
				text_move[2] = text_item[last_position][2];
				text_move[3] = text_item[last_position][3];
				text_move[4] = text_item[last_position][4];
				text_move[5] = text_item[last_position][5];
				if(last_position<current_position)
				{
					text_item.splice(current_position+1,0,text_move);
					text_item.splice(last_position,1);
				}
				else
				{
					text_item.splice(last_position,1);
					text_item.splice(current_position,0,text_move);
				}
				drawList();
			}			
		}
	}
	
	this.down = function()
	{
		if(length_list>0)
		{
			if(!isMove)
			{
				if(current_position<length_list - 1)
				{
					current_position++;
				}
				else
				{
					current_position = 0;
				}
				drawList();
				if(isLockShow)
				{
					dialog6_object.close();
					isLockShow = false;
				}
				if(configure_object.channel_select_with_ok == 1)
				{
					open_timing();
				}
			}
			else
			{
				last_position = current_position;
				var text_move = new Array();
				
				if(current_position<length_list - 1)
				{
					current_position++;
				}
				else
				{
					current_position = 0;
				}
				
				text_move[0] = text_item[last_position][0];
				text_move[1] = text_item[last_position][1];
				text_move[2] = text_item[last_position][2];
				text_move[3] = text_item[last_position][3];
				text_move[4] = text_item[last_position][4];
				text_move[5] = text_item[last_position][5];
				if(last_position<current_position)
				{
					text_item.splice(current_position+1,0,text_move);
					text_item.splice(last_position,1);
				}
				else
				{
					text_item.splice(last_position,1);
					text_item.splice(current_position,0,text_move);
				}
				
				drawList();
			}
			
		}
	}
	
	this.left = function()
	{
		if(length_list>0)
		{
			if(!isMove)
			{
				var start_position = Math.floor(current_position/page_r)*page_r;
				if(start_position-page_r<0)
				{
					current_position = length_list%page_r==0?(length_list-page_r):(length_list-length_list%page_r);
				}
				else
				{
					current_position = start_position-page_r;
				}
				drawList();
				if(isLockShow)
				{
					dialog6_object.close();
					isLockShow = false;
				}
				if(configure_object.channel_select_with_ok == 1)
				{
					open_timing();
				}
			}
			else
			{
				last_position = current_position;
				var text_move = new Array();
				
				var start_position = Math.floor(current_position/page_r)*page_r;
				if(start_position-page_r<0)
				{
					current_position = length_list%page_r==0?(length_list-page_r):(length_list-length_list%page_r);
				}
				else
				{
					current_position = start_position-page_r;
				}
				
				text_move[0] = text_item[last_position][0];
				text_move[1] = text_item[last_position][1];
				text_move[2] = text_item[last_position][2];
				text_move[3] = text_item[last_position][3];
				text_move[4] = text_item[last_position][4];
				text_move[5] = text_item[last_position][5];
				if(last_position<current_position)
				{
					text_item.splice(current_position+1,0,text_move);
					text_item.splice(last_position,1);
				}
				else
				{
					text_item.splice(last_position,1);
					text_item.splice(current_position,0,text_move);
				}
				
				drawList();
			}
			
		}
	}
	
	this.right = function()
	{
		if(length_list>0)
		{
			if(!isMove)
			{
				var start_position = Math.floor(current_position/page_r)*page_r;
				current_position = length_list>(start_position+page_r)?(start_position+page_r):0;
				drawList();
				if(isLockShow)
				{
					dialog6_object.close();
					isLockShow = false;
				}
				if(configure_object.channel_select_with_ok == 1)
				{
					open_timing();
				}
			}
			else
			{
				last_position = current_position;
				var text_move = new Array();
				
				var start_position = Math.floor(current_position/page_r)*page_r;
				current_position = length_list>(start_position+page_r)?(start_position+page_r):0;
				
				text_move[0] = text_item[last_position][0];
				text_move[1] = text_item[last_position][1];
				text_move[2] = text_item[last_position][2];
				text_move[3] = text_item[last_position][3];
				text_move[4] = text_item[last_position][4];
				text_move[5] = text_item[last_position][5];
				if(last_position<current_position)
				{
					text_item.splice(current_position+1,0,text_move);
					text_item.splice(last_position,1);
				}
				else
				{
					text_item.splice(last_position,1);
					text_item.splice(current_position,0,text_move);
				}
				
				drawList();
			}
			
		}
	}
	
	this.channel_up = function()
	{
		if(length_list>0)
		{
			if(current_position>0)
			{
				current_position--;
			}
			else
			{
				current_position = length_list - 1;
			}
			drawList();
			if(isLockShow)
			{
				dialog6_object.close();
				isLockShow = false;
			}

			open_timing();

		}
	}
	
	this.channel_down = function()
	{
		if(length_list>0)
		{
			if(current_position<length_list - 1)
			{
				current_position++;
			}
			else
			{
				current_position = 0;
			}
			drawList();
			if(isLockShow)
			{
				dialog6_object.close();
				isLockShow = false;
			}

			open_timing();
		}
	}
	
	this.updateList=function()
	{
		if(init_position<0 || init_position >= play_object.channel_list[num_list].length )
		{
			return;
		}
		if(current_position<0 || current_position >= play_object.channel_list[num_list].length )
		{
			return;
		}
		if(current_position == init_position)
		{
			return;
		}
		console.log("current_position:"+current_position+"      init_position:"+init_position);
		var str = play_object.returnStringByList(num_list);
		console.log("before list:"+num_list+"     :"+str);
		if(init_position > current_position)
		{
			var id = play_object.channel_list[num_list][init_position];
			//first remove 
			play_object.channel_list[num_list].splice(init_position,1);
			//second  insert
			play_object.channel_list[num_list].splice(current_position,0,id);
		}
		else
		{
			var id = play_object.channel_list[num_list][init_position];
			//first insert
			play_object.channel_list[num_list].splice(current_position+1,0,id);
			//second remove
			play_object.channel_list[num_list].splice(init_position,1);
		}
		str = play_object.returnStringByList(num_list);
		console.log("after list:"+num_list+"     :"+str);
		configure_object.tv_num = current_position;
		play_object.saveStringToList(num_list,str);
	}
	this.red = function()
	{
		if(isMove == false)
		{
			isMove = true;
			init_position = current_position;
			drawList();
		}
		else
		{
			isMove = false;
			initChannelList();
			drawList();
		}
	}
	
	this.ok = function()
	{
		if(text_item.length>0)
		{
			if(isMove == false)
			{
				if(configure_object.channel_select_with_ok == 0)
				{
					if(public_draw_object.checkServiceLock(current_position))
					{
						configure_object.tv_num = current_position;
						serviceCheckDeal();
					}
					else 
					{
						if(configure_object.tv_num != current_position)
						{
							configure_object.tv_num = current_position;
							play_object.playTV();
							programs_fav_object.close();
						}
					}	
				}
				else
				{
					programs_fav_object.close();
				}
			}
			else
			{
				isMove = false;
				//save & update list
				this.updateList();
				//initChannelList();
				drawList();
			}
			
		}
	}
	this.close = function()
	{
		if(isLockShow ==true && dialog6_object!=null)
		{
			isLockShow = false;
			dialog6_object.close();
		}
		current_dialog_object = null;
		ctx1.clearRect(0,0,window_width,window_height);
		if(document.getElementById("canvas1"))
		{
			body.removeChild(canvas1);
		}
	}
	this.menu = function()
	{
		this.close();
		current_dialog_object = programs_guide_object;
		current_dialog_object.show();
	}
	
	this.keydownevent = function(keycode)
	{
		switch(keycode)	
		{
			//Left
			case 37:
			{
				if(isLockShow ==true && dialog6_object!=null)
				{
					if(dialog6_object.hasOwnProperty("keydownevent"))
					{
						dialog6_object.keydownevent(keycode);
					}
				}
				else 
				{
					this.left();
				}
				this.left();
			}
			break;
			//Right
			case 39:
			{
				this.right();
			}
			break;
			case 38:
			{
				this.up();
			}
			break;
			case 40:
			{
				this.down();
			}
			break;
			case 124:
			{
				this.channel_up();
			}
			break;
			case 125:
			{
				this.channel_down();
			}
			break;
			case 18:
			{
				this.menu();	
			}
			break;
			case 13:
			{
				if(isLockShow ==true && dialog6_object!=null)
				{
					if(dialog6_object.hasOwnProperty("keydownevent"))
					{
						dialog6_object.keydownevent(keycode);
					}
				}
				else
				{
					this.ok();
				}
			}
			break;
			case 27:
			{
				this.menu();
			}
			break;
			//tv audio mode
			case 119:
			{
				play_object.change_play_mode();
				
				this.close();
			}
			break;
			case 129:
			{
				this.red();
			}
			break;
			default:
			{
				if(isLockShow ==true && dialog6_object!=null)
				{
					if(dialog6_object.hasOwnProperty("keydownevent"))
					{
						dialog6_object.keydownevent(keycode);
					}
				}
			}
			break;
		}
	}
	
	return this;
}
function LangClass()
{
	var content_show;
	var main_position;
	var content_position1;
	var content_position2;

	var audiotext = new Array();
	var tracktext = new Array();
	this.init = function()
	{
		var audioinfoArray =tvplayer.getAudioPIDs();
		for (var i = 0;i < audioinfoArray.length; i++)
		{
			audiotext[i] = new Array();
			//console.log(i + " pid = " + audioinfoArray[i].audioPid + " format = " + audioinfoArray[i].audioFormat + " language = " + audioinfoArray[i].audioLanguage);
			if(audioinfoArray[i].audioLanguage == "")
			{
				audiotext[i][0] = ""+(i+1)+"  Other";
			}
			else
			{
				audiotext[i][0] = audioinfoArray[i].audioLanguage;
			}
			audiotext[i][1] = audioinfoArray[i].audioPid;
		}

		tracktext[0] = "Mixed";
		tracktext[1] = "Left";
		tracktext[2] = "Right";
		tracktext[3] = "Stereo";
	}
	this.show = function()
	{
		audiotext.length = 0;
		body.appendChild(canvas1);
		content_show = false;
		main_position = 0;
		content_position1 = -1;
		content_position2 = -1;
		this.init();
		drawMain();
	}
	function drawMain()
	{
		var width_frame;
		var height_frame1;
		var height_frame2;
		var space_v1;
		var space_v2;
		
		var left_frame;
		var top_frame1;
		var top_frame2;
		var top_frame3;

		width_frame = 140;
		height_frame1 = 40;
		height_frame2 = 140;
		space_v1 = 3;
		space_v2 = 40;
		radius = 4;
		
		left_frame = 100;
		top_frame1 = 400;
		top_frame2 = top_frame1+height_frame1+space_v1;
		top_frame3 = top_frame2+(height_frame2-space_v2*2)/2;
		
		ctx1.clearRect(0, 0, window_width, window_height);

		ctx1.fillStyle = "black";
		ctx1.globalAlpha = 0.9;
			
		ctx1.beginPath();
		public_draw_object.drawRoundRect(left_frame, top_frame1, width_frame, height_frame1+space_v1+height_frame2, radius,ctx1);
			
		ctx1.strokeStyle = "rgba(255,255,255,0.8)";
		ctx1.lineWidth = 2;
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame1+height_frame1);
		ctx1.arcTo(left_frame,top_frame1,left_frame+radius,top_frame1,radius);
		ctx1.lineTo(left_frame+width_frame-radius,top_frame1);
		ctx1.arcTo(left_frame+width_frame,top_frame1,left_frame+width_frame,top_frame1+radius,radius);
		ctx1.lineTo(left_frame+width_frame,top_frame1+height_frame1);
		ctx1.lineTo(left_frame,top_frame1+height_frame1);
		ctx1.stroke();
			
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2+height_frame2-radius);
		ctx1.arcTo(left_frame+width_frame,top_frame2+height_frame2,left_frame+width_frame-radius,top_frame2+height_frame2,radius);
		ctx1.lineTo(left_frame+radius,top_frame2+height_frame2);
		ctx1.arcTo(left_frame,top_frame2+height_frame2,left_frame,top_frame2+height_frame2-radius,radius);
		ctx1.lineTo(left_frame,top_frame2);
		ctx1.stroke();
		
		ctx1.fillStyle = "white";
		ctx1.font="20px Arial";
		ctx1.textAlign = "center";
		
		ctx1.fillText("Audio",left_frame+width_frame/2,top_frame1+30);
		
		
		ctx1.drawImage(ns_xl,left_frame+2,top_frame3+space_v2*main_position);
		ctx1.drawImage(ns_xm,left_frame+2+5,top_frame3+space_v2*main_position,width_frame-4-10,33);
		ctx1.drawImage(ns_xr,left_frame+2+5+width_frame-4-10,top_frame3+space_v2*main_position);
		
		if(main_position==0)
		{
			ctx1.fillStyle = "black";
			ctx1.fillText("Multi Audio",left_frame+width_frame/2,top_frame3+27);
			ctx1.fillStyle = "white";
			ctx1.fillText("Track",left_frame+width_frame/2,top_frame3+27+space_v2);
		}
		if(main_position==1)
		{
			ctx1.fillStyle = "white";
			ctx1.fillText("Multi Audio",left_frame+width_frame/2,top_frame3+27);
			ctx1.fillStyle = "black";
			ctx1.fillText("Track",left_frame+width_frame/2,top_frame3+27+space_v2);
		}
	}
	
	function drawContent()
	{
		var space_v1 = 33;
		var space_v2 = 10;
		var width = 200;
		var height = space_v1*4+space_v2*2;
		var top1 = 380;
		var left1 = 260;
		var top2 = top1+space_v2;
		var left2 = left1+4+ns_mainx.width+10;
		var top3 = top2+26;
		
		ctx1.clearRect(left1-2,top1-2,width+4,height+4);
		
		ctx1.fillStyle = "black";
		ctx1.globalAlpha = 0.9;
		
		ctx1.fillRect(left1,top1,width,height);
		
		ctx1.strokeStyle="white";
		ctx1.strokeRect(left1,top1,width,height);
		if(main_position==0)
		{
			
			var currPid = tvplayer.getAudioPID();
			content_position1 = -1;
			for(var i = 0;i<audiotext.length;i++)
			{
				if(currPid == audiotext[i][1])
				{
					content_position1 = i;
					break;
				}
			}
			
			if(content_position1 < 0)
			{
				content_position1 = 0;
			}
			var length = audiotext.length;
			var page_r = 4;
			var start_position = Math.floor(content_position1/page_r)*page_r;
			var stop_position = length-start_position<=page_r?length:start_position +page_r;

			
			
			ctx1.fillStyle="white";
			ctx1.textAlign="left";
			for(var i=start_position;i<stop_position;i++)
			{
				if(content_position1==i)
				{
					ctx1.drawImage(ns_xl,left1+2,top2+space_v1*(i-start_position));
					ctx1.drawImage(ns_xm,left1+2+5,top2+space_v1*(i-start_position),width-4-10,33);
					ctx1.drawImage(ns_xr,left1+2+5+width-4-10,top2+space_v1*(i-start_position));
					
					ctx1.drawImage(ns_mainx,left1+4,top2+space_v1*(i-start_position)+8);
					
					ctx1.fillStyle="black";
					ctx1.fillText(audiotext[i][0],left2,top3+space_v1*(i-start_position));
					ctx1.fillStyle="white";
				}
				else
				{
					ctx1.fillText(audiotext[i][0],left2,top3+space_v1*(i-start_position));
				}
			}
		}
		else
		{
			if(!content_show)
			{
				content_position2 = -1;
				for(var i=0;i<tracktext.length ;i++)
				{
					if(play_object.current_service !=null)
					{
						if(play_object.current_service.audioTrack == tracktext[i])
						{
							content_position2 = i;
						}
					}
					else
					{
						content_position2 = 3;
					}
				}
			}
			
			if(content_position2 < 0)
			{
				content_position2 = 3;
			}
			
			ctx1.fillStyle="white";
			ctx1.textAlign="left";
			for(var i=0;i<tracktext.length;i++)
			{
				var sortn = i+1;
				if(content_position2==i)
				{
					ctx1.drawImage(ns_xl,left1+2,top2+space_v1*content_position2);
					ctx1.drawImage(ns_xm,left1+2+5,top2+space_v1*content_position2,width-4-10,33);
					ctx1.drawImage(ns_xr,left1+2+5+width-4-10,top2+space_v1*content_position2);
					
					ctx1.drawImage(ns_mainx,left1+4,top2+space_v1*content_position2+8);
					
					ctx1.fillStyle="black";
					ctx1.fillText(sortn+"  "+tracktext[i],left2,top3+space_v1*i);
					ctx1.fillStyle="white";
				}
				else
				{
					ctx1.fillText(sortn+"  "+tracktext[i],left2,top3+space_v1*i);
				}
			}
		}
	}
	
	this.close = function()
	{
		ctx1.clearRect(0, 0, window_width, window_height);
		if(document.getElementById("canvas1"))
		{
			body.removeChild(canvas1);
		}
		current_dialog_object = null;
		play_object.show();
	}
	this.left = function()
	{
		if(content_show)
		{
			content_show = false;
			drawMain();
		}
		else
		{
			this.close();
		}
	}
	
	this.right = function()
	{
		if(!content_show)
		{
			content_show = true;
			drawContent();
		}
	}
	this.up = function()
	{
		if(content_show)
		{
			if(main_position == 0)
			{
				
				if(content_position1 > 0)
				{
					content_position1--;
				}
				else
				{
					content_position1 = audiotext.length-1;
				}
				
				tvplayer.setAudioPID(audiotext[content_position1][1]);
			}
			else
			{
				if(content_position2>0)
				{
					content_position2--;
				}
				else
				{
					content_position2 = 3;
				}
				play_object.current_service.audioTrack = tracktext[content_position2];
			}
			drawContent();
		}
		else
		{
			if(main_position==0)
			{
				main_position = 1;
			}
			else
			{
				main_position = 0;
			}
			drawMain();
		}
	}
	this.down = function()
	{
		if(content_show)
		{
			if(main_position == 0)
			{
				if(content_position1 < audiotext.length-1)
				{
					content_position1++;
				}
				else
				{
					content_position1=0;
				}
				tvplayer.setAudioPID(audiotext[content_position1][1]);
			}
			else
			{
				if(content_position2<3)
				{
					content_position2++;
				}
				else
				{
					content_position2 = 0;
				}
				if(play_object.current_service != null)
				{
					play_object.current_service.audioTrack = tracktext[content_position2];
				}	
			}
			drawContent();
		}
		else
		{
			if(main_position==0)
			{
				main_position = 1;
			}
			else
			{
				main_position = 0;
			}
			drawMain();
		}
	}
	this.ok = function()
	{
		if(!content_show)
		{
			content_show = true;
			drawContent();
		}
	}
	this.menu = function()
	{
		if(content_show)
		{
			content_show = false;
			drawMain();
		}
		else
		{
			this.close();
		}
	}
	this.keydownevent = function(keycode)
	{
		switch(keycode)	
		{
			case 37:
			{
				this.left();
			}
			break;
			case 39:
			{
				this.right();
			}
			break;
			case 38:
			{
				this.up();
			}
			break;
			case 40:
			{
				this.down();
			}
			break;
			case 13:
			{
				this.ok();
			}
			break;
			case 27:
			{
				this.close();
			}
			break;
			case 18:
			{
				this.menu();
			}
			break;
		}
	}
	return this;
}
function Lang1Class()
{
	var content_show;
	var main_position;
	var content_position1;
	var content_position2;

	var audiotext = new Array();
	var tracktext = new Array();
	this.init = function()
	{
		var audioinfoArray =tvplayer.getAudioTracks();
		for (var i = 0;i < audioinfoArray.length; i++)
		{
			audiotext[i] = new Array();
			//console.log(i + " pid = " + audioinfoArray[i].audioPid + " format = " + audioinfoArray[i].audioFormat + " language = " + audioinfoArray[i].audioLanguage);
			if(audioinfoArray[i].audioLanguage == "")
			{
				audiotext[i][0] = ""+(i+1)+"  Other";
			}
			else
			{
				audiotext[i][0] = audioinfoArray[i].trackLanguage;
			}
			audiotext[i][1] = audioinfoArray[i].trackID;
		}

		tracktext[0] = "Mixed";
		tracktext[1] = "Left";
		tracktext[2] = "Right";
		tracktext[3] = "Stereo";
	}
	this.show = function()
	{
		audiotext.length = 0;
		body.appendChild(canvas1);
		content_show = false;
		main_position = 0;
		content_position1 = -1;
		content_position2 = -1;
		this.init();
		drawMain();
	}
	function drawMain()
	{
		var width_frame;
		var height_frame1;
		var height_frame2;
		var space_v1;
		var space_v2;
		
		var left_frame;
		var top_frame1;
		var top_frame2;
		var top_frame3;

		width_frame = 140;
		height_frame1 = 40;
		height_frame2 = 140;
		space_v1 = 3;
		space_v2 = 40;
		radius = 4;
		
		left_frame = 100;
		top_frame1 = 400;
		top_frame2 = top_frame1+height_frame1+space_v1;
		top_frame3 = top_frame2+(height_frame2-space_v2*2)/2;
		
		ctx1.clearRect(0, 0, window_width, window_height);

		ctx1.fillStyle = "black";
		ctx1.globalAlpha = 0.9;
			
		ctx1.beginPath();
		public_draw_object.drawRoundRect(left_frame, top_frame1, width_frame, height_frame1+space_v1+height_frame2, radius,ctx1);
			
		ctx1.strokeStyle = "rgba(255,255,255,0.8)";
		ctx1.lineWidth = 2;
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame1+height_frame1);
		ctx1.arcTo(left_frame,top_frame1,left_frame+radius,top_frame1,radius);
		ctx1.lineTo(left_frame+width_frame-radius,top_frame1);
		ctx1.arcTo(left_frame+width_frame,top_frame1,left_frame+width_frame,top_frame1+radius,radius);
		ctx1.lineTo(left_frame+width_frame,top_frame1+height_frame1);
		ctx1.lineTo(left_frame,top_frame1+height_frame1);
		ctx1.stroke();
			
		ctx1.beginPath();
		ctx1.moveTo(left_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2);
		ctx1.lineTo(left_frame+width_frame,top_frame2+height_frame2-radius);
		ctx1.arcTo(left_frame+width_frame,top_frame2+height_frame2,left_frame+width_frame-radius,top_frame2+height_frame2,radius);
		ctx1.lineTo(left_frame+radius,top_frame2+height_frame2);
		ctx1.arcTo(left_frame,top_frame2+height_frame2,left_frame,top_frame2+height_frame2-radius,radius);
		ctx1.lineTo(left_frame,top_frame2);
		ctx1.stroke();
		
		ctx1.fillStyle = "white";
		ctx1.font="20px Arial";
		ctx1.textAlign = "center";
		
		ctx1.fillText("Audio",left_frame+width_frame/2,top_frame1+30);
		
		
		ctx1.drawImage(ns_xl,left_frame+2,top_frame3+space_v2*main_position);
		ctx1.drawImage(ns_xm,left_frame+2+5,top_frame3+space_v2*main_position,width_frame-4-10,33);
		ctx1.drawImage(ns_xr,left_frame+2+5+width_frame-4-10,top_frame3+space_v2*main_position);
		
		if(main_position==0)
		{
			ctx1.fillStyle = "black";
			ctx1.fillText("Multi Audio",left_frame+width_frame/2,top_frame3+27);
			ctx1.fillStyle = "white";
			ctx1.fillText("Track",left_frame+width_frame/2,top_frame3+27+space_v2);
		}
		if(main_position==1)
		{
			ctx1.fillStyle = "white";
			ctx1.fillText("Multi Audio",left_frame+width_frame/2,top_frame3+27);
			ctx1.fillStyle = "black";
			ctx1.fillText("Track",left_frame+width_frame/2,top_frame3+27+space_v2);
		}
	}
	
	function drawContent()
	{
		var space_v1 = 33;
		var space_v2 = 10;
		var width = 200;
		var height = space_v1*4+space_v2*2;
		var top1 = 380;
		var left1 = 260;
		var top2 = top1+space_v2;
		var left2 = left1+4+ns_mainx.width+10;
		var top3 = top2+26;
		
		ctx1.clearRect(left1-2,top1-2,width+4,height+4);
		
		ctx1.fillStyle = "black";
		ctx1.globalAlpha = 0.9;
		
		ctx1.fillRect(left1,top1,width,height);
		
		ctx1.strokeStyle="white";
		ctx1.strokeRect(left1,top1,width,height);
		if(main_position==0)
		{
			var currPid = tvplayer.getAudioTrack();
			content_position1 = -1;
			for(var i = 0;i<audiotext.length;i++)
			{
				if(currPid == audiotext[i][0])
				{
					content_position1 = i;
					break;
				}
			}
			
			if(content_position1 < 0)
			{
				content_position1 = 0;
			}
			var length = audiotext.length;
			var page_r = 4;
			var start_position = Math.floor(content_position1/page_r)*page_r;
			var stop_position = length-start_position<=page_r?length:start_position +page_r;

			
			
			ctx1.fillStyle="white";
			ctx1.textAlign="left";
			for(var i=start_position;i<stop_position;i++)
			{
				if(content_position1==i)
				{
					ctx1.drawImage(ns_xl,left1+2,top2+space_v1*(i-start_position));
					ctx1.drawImage(ns_xm,left1+2+5,top2+space_v1*(i-start_position),width-4-10,33);
					ctx1.drawImage(ns_xr,left1+2+5+width-4-10,top2+space_v1*(i-start_position));
					
					ctx1.drawImage(ns_mainx,left1+4,top2+space_v1*(i-start_position)+8);
					
					ctx1.fillStyle="black";
					ctx1.fillText(audiotext[i][0],left2,top3+space_v1*(i-start_position));
					ctx1.fillStyle="white";
				}
				else
				{
					ctx1.fillText(audiotext[i][0],left2,top3+space_v1*(i-start_position));
				}
			}
		}
		else
		{
			
			if(content_position2 < 0)
			{
				content_position2 = 3;
			}
			
			ctx1.fillStyle="white";
			ctx1.textAlign="left";
			for(var i=0;i<tracktext.length;i++)
			{
				var sortn = i+1;


				ctx1.fillText(sortn+"  "+tracktext[i],left2,top3+space_v1*i);

			}
		}
	}
	
	this.close = function()
	{
		ctx1.clearRect(0, 0, window_width, window_height);
		if(document.getElementById("canvas1"))
		{
			body.removeChild(canvas1);
		}
		current_dialog_object = null;
	}
	this.left = function()
	{
		if(content_show)
		{
			content_show = false;
			drawMain();
		}
		else
		{
			this.close();
		}
	}
	
	this.right = function()
	{
		if(!content_show)
		{
			content_show = true;
			drawContent();
		}
	}
	this.up = function()
	{
		if(content_show)
		{
			if(main_position == 0)
			{
				
				if(content_position1 > 0)
				{
					content_position1--;
				}
				else
				{
					content_position1 = audiotext.length-1;
				}
				tvplayer.setTrackID(audiotext[content_position1][1]);
			}
			else
			{
				if(content_position2>0)
				{
					content_position2--;
				}
				else
				{
					content_position2 = 3;
				}
			}
			drawContent();
		}
		else
		{
			if(main_position==0)
			{
				main_position = 1;
			}
			else
			{
				main_position = 0;
			}
			drawMain();
		}
	}
	this.down = function()
	{
		if(content_show)
		{
			if(main_position == 0)
			{
				if(content_position1 < audiotext.length-1)
				{
					content_position1++;
				}
				else
				{
					content_position1=0;
				}
				tvplayer.setTrackID(audiotext[content_position1][1]);
			}
			else
			{
				if(content_position2<3)
				{
					content_position2++;
				}
				else
				{
					content_position2 = 0;
				}	
			}
			drawContent();
		}
		else
		{
			if(main_position==0)
			{
				main_position = 1;
			}
			else
			{
				main_position = 0;
			}
			drawMain();
		}
	}
	this.ok = function()
	{
		if(!content_show)
		{
			content_show = true;
			drawContent();
		}
	}
	this.menu = function()
	{
		if(content_show)
		{
			content_show = false;
			drawMain();
		}
		else
		{
			this.close();
		}
	}
	this.keydownevent = function(keycode)
	{
		switch(keycode)	
		{
			case 37:
			{
				this.left();
			}
			break;
			case 39:
			{
				this.right();
			}
			break;
			case 38:
			{
				this.up();
			}
			break;
			case 40:
			{
				this.down();
			}
			break;
			case 13:
			{
				this.ok();
			}
			break;
			case 27:
			{
				this.close();
			}
			break;
			case 18:
			{
				this.menu();
			}
			break;
		}
	}
	return this;
}
function TeletextClass()
{
	var box_width;
	var box_height;
	var begin_x;
	var begin_y;
	var textArray;
	var listNum;
	var spacing;    
	var current_position;
	var current_page;
	var total_page;
	this.isInTeletext == false;
	function initData()
	{
		listNum = textArray.length;
		spacing =50;
		box_width = 300;
		if(listNum < 4)
		{
			box_height = listNum*spacing;
		}
		else
		{
			box_height = 4*spacing;
		}
		
		begin_x = (window_width-box_width)/2;
		begin_y = (window_height-box_height)/2
		current_position = 0;
		current_page = 0;
		total_page =  Math.floor(listNum/4)+1;
		body.appendChild(canvas1);
	}
	function drawContent()
	{
		ctx1.clearRect(0, 0, window_width, window_height);
		//draw rect
		ctx1.fillStyle = "black";
		ctx1.globalAlpha = 1;
		ctx1.beginPath();
		public_draw_object.drawRoundRect(begin_x, begin_y, box_width, box_height, 4,ctx1);
		
		

		//draw line
		ctx1.strokeStyle = "rgba(255,255,255,1)";
		if(listNum >= 4)
		{
			ctx1.moveTo(begin_x,begin_y+spacing);
			ctx1.lineTo(begin_x+box_width,begin_y+spacing);
			ctx1.moveTo(begin_x,begin_y+spacing*2);
			ctx1.lineTo(begin_x+box_width,begin_y+spacing*2);
			ctx1.moveTo(begin_x,begin_y+spacing*3);
			ctx1.lineTo(begin_x+box_width,begin_y+spacing*3);
		}
		else
		{
			for(var i=0;i<listNum-1;i++)
			{
				ctx1.moveTo(begin_x,begin_y+spacing*i);
				ctx1.lineTo(begin_x+box_width,begin_y+spacing*i);
			}
		}
		ctx1.stroke();

		//draw yellow rect
		ctx1.fillStyle = '#ea8a18';
		ctx1.fillRect(begin_x+1,begin_y+spacing*(current_position%4),box_width-1,spacing-2);

		
		//draw text
		ctx.textAlign = "left";
		ctx1.font = "20px Arial"; 
		ctx1.textAlign = "Center";
		for(var i=current_page*4;i<textArray.length && i<current_page*4+4;i++)
		{
			if(current_position == i)
			{
				ctx1.fillStyle = "black";
			}
			else
			{
				ctx1.fillStyle = "white";
			}
			ctx1.fillText(textArray[i],begin_x+box_width/2,begin_y+spacing*(i%4)+spacing/2);
			
		}
	}
	
	this.up = function()
	{
		if(current_position%4 == 0)
		{
			if(current_page == 0)
			{
				current_page = total_page-1;
				current_position = listNum -1;;
			}
			else
			{
				current_page = current_page -1;
				current_position = current_page*4+3;
			}
		}
		else
		{
			current_position = current_position-1;
		}
		drawContent();
	}
	this.down = function()
	{
		if(current_position == listNum-1)
		{
			current_position = 0;
			current_page = 0;
		}
		else if((current_position+1)%4 == 0)
		{
			current_page = current_page+1;
			current_position = current_page*4;
		}
		else
		{
			current_position = current_position+1;
		}
		drawContent();
	}
	this.ok = function()
	{
		ctx1.clearRect(0, 0, window_width, window_height);
		this.isInTeletext = true;
		Teletext.start(textArray[current_position]);
	}
	this.show=function(languages)
	{
		play_object.isInTeletext == true;
		this.isInTeletext = false;
		textArray = languages;
		initData();
		drawContent();
	}
	
	this.menu = function()
	{
		ctx1.clearRect(0, 0, window_width, window_height);
		if(document.getElementById("canvas1"))
		{
			body.removeChild(canvas1);
		}
		this.isInTeletext = false;
		play_object.isInTeletext = false;
		current_dialog_object = null;
		play_object.show();
	}
	this.keydownevent = function(keycode)
	{
		if(this.isInTeletext == true)
		{
			if(keycode == 27)
			{
				this.menu();
				Teletext.stop();
			}
			switch(keycode)
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
					Teletext.keyPressed(keycode - 48);
				}
				break;
				case 129:
				case 130:
				case 131:
				case 132:
				{
					Teletext.keyPressed(keycode-119);
				}
				break;
				case 37:
				{
					Teletext.keyPressed(14);
				}
				break;
				case 38:
				{
					Teletext.keyPressed(16);
				}
				break;
				case 39:
				{
					Teletext.keyPressed(15);
				}
				break;
				case 40:
				{
					Teletext.keyPressed(17);
				}
				break;
				case 13:
				{
					Teletext.keyPressed(18);
				}
				break;
				case 122:
				{
					Teletext.keyPressed(19);
				}
				break;
			}
			
		}
		else
		{
			switch(keycode)	
			{
				case 38:
				{
					this.up();
				}
				break;
				case 40:
				{
					this.down();
				}
				break;
				case 13:
				{
					this.ok();
				}
				break;
				case 18:
				{
					this.menu();
				}
				break;
				case 27:
				{
					this.menu();
				}
				break;
			}
		}
	}
	return this;
}

function SubtitleClass()
{
	var begin_x;
	var begin_y;
	var title_height;
	var current_position;
	var statusArray;
	var statusSelect;
	var languageArray;
	var languageSelect;
	var isExpand = false;
	function initData()
	{
		body.appendChild(canvas1);
		statusArray = new Array();
			statusArray[0] = "DVB";
			statusArray[1] = "Closed";
		statusSelect = 0;
		languageArray = play_object.current_service.subTitle;
		languageSelect = 0;
		
		var i = play_object.getNumBySubArray(play_object.current_service.id);
		if(i >= 0 )
		{
			if(play_object.subJsonArray[i].isOpen == 0)
			{
				statusSelect = 1;
			}
			else
			{
				statusSelect = 0;
			}

			if(play_object.subJsonArray[i].language != "")
			{
				for(var j=0;j<languageArray.length;j++)
				{
					if(languageArray[j] ==play_object.subJsonArray[i].language )
					{
						languageSelect = j;
					}
				}
			}
		}
	 	begin_x = 100;
	 	begin_y = 200;
		title_height = 60;
		current_position = 0;
	}
	function drawContent()
	{
		//draw rect frame
		ctx1.clearRect(0, 0, window_width, window_height);
		ctx1.drawImage(ns_tlb2,begin_x,begin_y,ns_tlb2.width,title_height);
		ctx1.lineWidth=1;
		ctx1.fillStyle="#000000";
		ctx1.fillRect(begin_x+1,begin_y+title_height,ns_tlb2.width-3,2*title_height);;

		//draw title
		var title_text = "Subtitle  Menu";
		ctx1.font = "30px Arial"; 
		ctx1.textAlign = "Center";
		ctx1.fillStyle = "white";
		var text_width =  ctx1.measureText(title_text).width;
		ctx1.fillText("Subtitle Menu",(begin_x+ns_tlb2.width/2)-text_width/2,(begin_y+title_height/2)+7);

		//draw white rect   4d4d4d 
		ctx1.fillStyle = '#e3e3e3';
		if(current_position == 0)
		{
			ctx1.fillRect(begin_x+2,begin_y+title_height,ns_tlb2.width-3,title_height);
		}
		else
		{
			ctx1.fillRect(begin_x+1,begin_y+title_height*2,ns_tlb2.width-3,title_height);
		}
		
		//draw list text
		ctx1.font = "25px Arial"; 
		ctx1.textAlign = "left";
		for(var i=0;i<2;i++)
		{
			
			if(i == current_position)
			{
				ctx1.fillStyle = "black";
				//draw arrow
				ctx1.drawImage(ns_al,begin_x+200,begin_y+title_height*(i+1)+20);
				ctx1.drawImage(ns_ar,begin_x+ns_tlb2.width-20,begin_y+title_height*(i+1)+20);
			}else
			{
				ctx1.fillStyle = "white";
			}

			var a = begin_x+200;
			var b = begin_x+ns_tlb2.width-20;
			if(i == 0)
			{
				ctx1.fillText("Status",begin_x+30,(begin_y+title_height*(i+1)+title_height/2)+7);
				var c= ctx1.measureText(statusArray[statusSelect]).width;
				ctx1.fillText(statusArray[statusSelect],a+(b-a)/2-c/2,(begin_y+title_height*(i+1)+title_height/2)+7);
			}
			else
			{
				var c= ctx1.measureText(languageArray[languageSelect]).width;
				ctx1.fillText("Language",begin_x+30,(begin_y+title_height*(i+1)+title_height/2)+7);
				ctx1.fillText(languageArray[languageSelect],a+(b-a)/2-c/2,(begin_y+title_height*(i+1)+title_height/2)+7);
			}
		}
	}
	this.show = function()
	{
		initData();
		drawContent();
	}
	function checkIsOpenSub()
	{
		var i = play_object.getNumBySubArray(play_object.current_service.id);
		if(i <0 )
		{
			console.log("i< 0");
			return;
		}
		if(statusSelect == 1)
		{
			console.log("statusSelect == 1");
			play_object.subJsonArray[i].isOpen = 0;
			play_object.subJsonArray[i].language = "";
		}
		else
		{
			console.log("statusSelect == 0");
			play_object.subJsonArray[i].isOpen = 1;
			play_object.subJsonArray[i].language = languageArray[languageSelect];
		}
		play_object.saveSubtitleJsonArray();
	}
	this.close = function()
	{
		checkIsOpenSub();
		ctx1.clearRect(0, 0, window_width, window_height);
		if(document.getElementById("canvas1"))
		{
			body.removeChild(canvas1);
		}
		current_dialog_object = null;
		play_object.show();
	}
	this.up = function()
	{
		if(statusSelect == 1)
		{
			return;
		}
		
		if(current_position == 0)
		{
			current_position = 1;
		}
		else
		{
			current_position = 0;
		}
		drawContent();
	}
	this.down = function()
	{
		if(statusSelect == 1)
		{
			return;
		}
		if(current_position == 1)
		{
			current_position = 0;
		}
		else
		{
			current_position = 1;
		}
		drawContent();
	}
	this.right = function()
	{
		if(isExpand == false)
		{
			if(current_position == 0)
			{
				if(statusSelect == statusArray.length-1)
				{
					statusSelect = 0;
				}
				else
				{
					statusSelect=statusSelect+1;
				}
			}
			else if(current_position == 1)
			{
				if(languageSelect == languageArray.length-1)
				{
					languageSelect = 0;
				}
				else
				{
					languageSelect = languageSelect+1;
				}
			}
			console.log("right statusSelect:"+statusSelect);
			drawContent();
		}
		
	}
	this.left = function()
	{
		if(isExpand == false)
		{
			if(current_position == 0)
			{
				if(statusSelect == 0)
				{
					statusSelect = statusArray.length-1;
				}
				else
				{
					statusSelect=statusSelect-1;
				}
			}
			else if(current_position == 1)
			{
				if(languageSelect == 0)
				{
					languageSelect = languageArray.length-1;
				}
				else
				{
					languageSelect = languageSelect-1;
				}
			}
			console.log("left statusSelect:"+statusSelect);
			drawContent();
		}
	}
	this.keydownevent = function(keycode)
	{
		switch(keycode)	
		{
			case 37:
			{
				this.left();
			}
			break;
			case 39:
			{
				this.right();
			}
			break;
			case 38:
			{
				this.up();
			}
			break;
			case 40:
			{
				this.down();
			}
			break;
			case 13:
			{
				this.ok();
			}
			break;
			case 18:
			{
				this.close();
			}
			break;
			case 27:
			{
				this.close();
			}
			break;
		}
	}
	return this;
}

function USBCheck()
{
	var width_frame;
	var height_frame;
	var left_pic;
	var top_pic;
	var left_text;
	var top_text;
	
	var content;

	var timer="";
	
	function initData(con)
	{
		content = con;
		
	}
	
	function initView()
	{
		if(!document.getElementById("canvas2"))
		{
			body.appendChild(canvas2);
		}
		
		ctx2.font="25px Arial";
		
		width_frame = ctx2.measureText(content).width+30;
		height_frame = ns_usbl.height;
		
		left_pic = window_width-width_frame-30;
		top_pic = window_height-80;
		
		left_text = left_pic + width_frame/2;
		top_text = top_pic + height_frame*0.7;

		ctx2.clearRect(0,0,window_width,window_height);

		if(timer!="")
		{
			clearTimeout(timer);
			timer = "";
		}
		
		timer = setTimeout(function()
		{
			if(document.getElementById("canvas2"))
			{
				play_object.isClearScreen = true;
				ctx2.clearRect(left_pic-1,top_pic-1,width_frame+2,ns_usbr.height+2);
				body.removeChild(canvas2);
			}
			timer = "";
		},2000);
	}
	
	this.show = function(con)
	{
		initData(con);
		initView();
		
		ctx2.font="25px Arial";
		ctx2.textAlign="center";
		ctx2.fillStyle="white";
		
		ctx2.drawImage(ns_usbl,left_pic,top_pic);
		ctx2.drawImage(ns_usbm,left_pic+ns_usbl.width,top_pic,width_frame-ns_usbl.width-ns_usbr.width,height_frame);
		ctx2.drawImage(ns_usbr,left_pic+width_frame-ns_usbr.width,top_pic);

		ctx2.drawImage(ns_usbicon,left_pic+80,top_pic+height_frame+10);
		
		ctx2.fillText(content,left_text,top_text);
	}
	
	
	this.close = function()
	{
		ctx2.clearRect(left_pic-1,top_pic-1,width_frame+2,ns_usbr.height+2);
		if(document.getElementById("canvas2"))
		{
			body.removeChild(canvas2);
		}
	}
	
}

