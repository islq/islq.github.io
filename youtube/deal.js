// JavaScript Document

//video list
function drawList()
{
	clearScreen();
	
	ctx.drawImage(ns_bkhead,0,0);
	
	var width_pic = 130;
	var height_pic = 90;
	var width_pic_increment = 20;
	var height_pic_increment = 14;
	
	var left_split = 780;
	
	var space_v = 110;
	var top_pic = top_up;
	var top_text = top_up+18;
	
	var left_pic = left_split+24;
	var left_text = left_pic+150;
	
	ctx.fillStyle = "white";
	ctx.textAlign = "left";
	
	//init view
	ctx.font="18px Arial";
	
	ctx.fillText("Key Word: "+keyWord,30,top_up-50);
	
	ctx.font="30px Arial";
	ctx.textAlign="center";
	ctx.fillText("Youtube List",window_width/2,top_up-50);
	
	ctx.font="18px Arial";
	ctx.textAlign = "left";
	ctx.fillText("Current Page: "+(results.current_page+1),790,top_up-50);
	ctx.fillText("Total Results: "+totalResults,1010,top_up-50);
	
	ctx.strokeStyle = "#FFEA62";
	ctx.lineWidth = 3;

	ctx.moveTo(left_split,top_up-16);
	ctx.lineTo(left_split,top_up+550);
	ctx.stroke();
	
	var top_bottom = 640;
	var top_bottom_pic = top_bottom+8;
	var top_bottom_text = top_bottom + 28;
	
	var left_bottom = 36;
	
	
	
	ctx.drawImage(ns_navigation,left_bottom,top_bottom);	
	
	//draw video list
	
	var space_vv = 20;//line space
	var width_list_title = 270;
	
	var url_img1;
	var url_img2;
	var url_img3;
	var url_img4;
	var url_img5;
	
	var left_selected = left_split + 10;
	var top_selected = top_up- 22;
	var width_frame = 440;
	var height_frame = space_v+10;
	var space_vs = height_frame + 2;
	ctx.lineWidth = 2;
	if(videoList.length>0)
	{
		url_img1 = new Image();
		url_img1.src = videoList[0][1];
		
		var top_start = top_text+space_v*0 ;
		
		ctx.font = "17px Arial";
		if(focus_position == 0)
		{
			ctx.fillStyle = "#FFEA62";
			ctx.strokeStyle="#FFEA62";
			ctx.strokeRect(left_selected,top_selected + space_v*0,width_frame,height_frame);
		}
		else
		{
			ctx.fillStyle="white";
		}

		var text_arr = textWrap(ctx,videoList[0][2],width_list_title,2);
		
		for(var i=0;i<text_arr.length;i++)
		{
			//console.log(text_arr[i]);
			top_start = top_start+i*space_vv;
			ctx.fillText(text_arr[i],left_text,top_start);
		}
		
		top_start = top_start + space_vv+5;
		ctx.fillStyle="#ddd";
		ctx.font="15px Arial";
		ctx.fillText(videoList[0][3],left_text,top_start);
		
		top_start = top_start + space_vv+1;
		ctx.fillText(videoList[0][4],left_text,top_start);
		
		url_img1.onload = function()
		{
			if(focus_position == 0)
			{
				ctx.drawImage(url_img1,left_pic-width_pic_increment/2,top_pic-height_pic_increment+space_v*0,width_pic+width_pic_increment,height_pic+height_pic_increment);
			}
			else
			{
				ctx.drawImage(url_img1,left_pic,top_pic+space_v*0,width_pic,height_pic);
			}
		}
	}
	
	if(videoList.length>1)
	{
		url_img2 = new Image();
		url_img2.src = videoList[1][1];
		
		var top_start = top_text+space_v*1 ;
		
		ctx.font = "17px Arial";
		if(focus_position == 1)
		{
			ctx.fillStyle = "#FFEA62";
			ctx.strokeStyle="#FFEA62";
			ctx.strokeRect(left_selected,top_selected + space_v*1,width_frame,height_frame);
		}
		else
		{
			ctx.fillStyle="white";
		}

		var text_arr = textWrap(ctx,videoList[1][2],width_list_title,2);
		
		for(var i=0;i<text_arr.length;i++)
		{
			//console.log(text_arr[i]);
			top_start = top_start+i*space_vv;
			ctx.fillText(text_arr[i],left_text,top_start);
		}
		
		top_start = top_start + space_vv+5;
		ctx.fillStyle="#ddd";
		ctx.font="15px Arial";
		ctx.fillText(videoList[1][3],left_text,top_start);
		
		top_start = top_start + space_vv+1;
		ctx.fillText(videoList[1][4],left_text,top_start);
		
		url_img2.onload = function()
		{
			if(focus_position == 1)
			{
				ctx.drawImage(url_img2,left_pic-width_pic_increment/2,top_pic-height_pic_increment/2+space_v*1,width_pic+width_pic_increment,height_pic+height_pic_increment);
			}
			else
			{
				ctx.drawImage(url_img2,left_pic,top_pic+space_v*1,width_pic,height_pic);
			}
		}
	}
	
	if(videoList.length>2)
	{
		url_img3 = new Image();
		//console.log("url:"+videoList[2][1]);
		url_img3.src = videoList[2][1];
		
		var top_start = top_text+space_v*2 ;
		
		ctx.font = "17px Arial";
		if(focus_position == 2)
		{
			ctx.fillStyle = "#FFEA62";
			ctx.strokeStyle="#FFEA62";
			ctx.strokeRect(left_selected,top_selected + space_v*2,width_frame,height_frame);
		}
		else
		{
			ctx.fillStyle="white";
		}

		var text_arr = textWrap(ctx,videoList[2][2],width_list_title,2);
		
		for(var i=0;i<text_arr.length;i++)
		{
			//console.log(text_arr[i]);
			top_start = top_start+i*space_vv;
			ctx.fillText(text_arr[i],left_text,top_start);
		}
		
		top_start = top_start + space_vv+5;
		ctx.fillStyle="#ddd";
		ctx.font="15px Arial";
		ctx.fillText(videoList[2][3],left_text,top_start);
		
		top_start = top_start + space_vv+1;
		ctx.fillText(videoList[2][4],left_text,top_start);
		
		
		url_img3.onload = function()
		{
			if(focus_position == 2)
			{
				ctx.drawImage(url_img3,left_pic-width_pic_increment/2,top_pic-height_pic_increment/2+space_v*2,width_pic+width_pic_increment,height_pic+height_pic_increment);
			}
			else
			{
				ctx.drawImage(url_img3,left_pic,top_pic+space_v*2,width_pic,height_pic);
			}
		}
	}
	
	if(videoList.length>3)
	{
		url_img4 = new Image();
		//console.log("url:"+videoList[3][1]);
		url_img4.src = videoList[3][1];
	
		var top_start = top_text+space_v*3 ;
		
		ctx.font = "17px Arial";
		if(focus_position == 3)
		{
			ctx.fillStyle = "#FFEA62";
			ctx.strokeStyle="#FFEA62";
			ctx.strokeRect(left_selected,top_selected + space_v*3,width_frame,height_frame);
		}
		else
		{
			ctx.fillStyle="white";
		}

		var text_arr = textWrap(ctx,videoList[3][2],width_list_title,2);
		
		for(var i=0;i<text_arr.length;i++)
		{
			//console.log(text_arr[i]);
			top_start = top_start+i*space_vv;
			ctx.fillText(text_arr[i],left_text,top_start);
		}
		
		top_start = top_start + space_vv+5;
		ctx.fillStyle="#ddd";
		ctx.font="15px Arial";
		ctx.fillText(videoList[3][3],left_text,top_start);
		
		top_start = top_start + space_vv+1;
		ctx.fillText(videoList[3][4],left_text,top_start);
		
		url_img4.onload = function()
		{
			if(focus_position == 3)
			{
				ctx.drawImage(url_img4,left_pic-width_pic_increment/2,top_pic-height_pic_increment/2+space_v*3,width_pic+width_pic_increment,height_pic+height_pic_increment);
			}
			else
			{
				ctx.drawImage(url_img4,left_pic,top_pic+space_v*3,width_pic,height_pic);
			}
		}
	}
	
	if(videoList.length>4)
	{
		url_img5 = new Image();
		url_img5.src = videoList[4][1];
		
		
		var top_start = top_text+space_v*4 ;
		
		ctx.font = "17px Arial";
		if(focus_position == 4)
		{
			ctx.fillStyle = "#FFEA62";
			ctx.strokeStyle="#FFEA62";
			ctx.strokeRect(left_selected,top_selected + space_v*4,width_frame,height_frame);
		}
		else
		{
			ctx.fillStyle="white";
		}

		var text_arr = textWrap(ctx,videoList[4][2],width_list_title,2);
		
		for(var i=0;i<text_arr.length;i++)
		{
			top_start = top_start+i*space_vv;
			ctx.fillText(text_arr[i],left_text,top_start);
		}
		
		top_start = top_start + space_vv+5;
		ctx.fillStyle="#ddd";
		ctx.font="15px Arial";
		ctx.fillText(videoList[4][3],left_text,top_start);
		
		top_start = top_start + space_vv+1;
		ctx.fillText(videoList[4][4],left_text,top_start);
		
		url_img5.onload = function()
		{
			if(focus_position == 4)
			{
				ctx.drawImage(url_img5,left_pic-width_pic_increment/2,top_pic-height_pic_increment/2+space_v*4,width_pic+width_pic_increment,height_pic+height_pic_increment);
			}
			else
			{
				ctx.drawImage(url_img5,left_pic,top_pic+space_v*4,width_pic,height_pic);
			}
		}
	}
}

//video info
function drawInfo()
{
	var top_title = top_up-8;
	var space_vv1 = 25;
	var space_vv2 = 28;
	
	var left_title = 380;
	var left_content = 20;
	
	var left_time = 510;
	
	
	ctx.fillStyle = "white";
	ctx.font = "22px Arial";
	ctx.textAlign = "center";
	
	var text_title_arr = textWrap(ctx,videoList[focus_position][2],708,2);
	
	for(var i=0;i<text_title_arr.length;i++)
	{
		top_title = top_title+space_vv1;
		ctx.fillText(text_title_arr[i],left_title,top_title);
	}
	
	ctx.fillStyle = "#ddd";
	ctx.font = "17px Arial";
	ctx.fillText(videoList[focus_position][3],left_title,top_title+20);
	
	var top_content = top_title+30;
	
	ctx.fillStyle = "white";
	ctx.font="20px Arial";
	ctx.textAlign="left";
	
	var text_content_arr = textWrap(ctx,"      "+videoList[focus_position][5],730,13);
	
	for(var i=0;i<text_content_arr.length;i++)
	{
		top_content = top_content+space_vv2;
		ctx.fillText(text_content_arr[i],left_content,top_content);
	}
	
	ctx.font = "17px Arial";
	ctx.fillStyle = "#ddd";
	ctx.fillText(videoList[focus_position][4],left_time,top_content+42);
}

//content new line ,please set the ctx's font
function textWrap(ctx,text,maxWidth,maxR)
{
	//console.log(text);
	var text_arr = new Array();
	var text_word = "";
	var text_r = "";
	var r=0;
	
	var exp=/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/;
	for(var i=0;i<text.length;i++)
	{
		var reg = text[i].match(exp);
		if(reg == null)
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



