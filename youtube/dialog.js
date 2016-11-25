// JavaScript Document
//infomation prompt
function InfoTipClass()
{
	var param;
	
	var IsExit = false;
	var timeout;
	var timer = "";
	var that = this;
	function delay()
	{
		timeout = timeout - 500;
		if(timeout <=0)
		{
			that.close();
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
		
		ctx2.clearRect(0, 0, window_width, window_height);

		ctx2.fillStyle = "black";
			

		drawRoundRect(left_frame, top_frame1, width_frame, height_frame1+space_v1+height_frame2, radius,ctx2);
			
		ctx2.strokeStyle = "rgb(255,255,255)";
		ctx2.lineWidth = 2;
		ctx2.beginPath();
		ctx2.moveTo(left_frame,top_frame1+height_frame1);
		ctx2.arcTo(left_frame,top_frame1,left_frame+radius,top_frame1,radius);
		ctx2.lineTo(left_frame+width_frame-radius,top_frame1);
		ctx2.arcTo(left_frame+width_frame,top_frame1,left_frame+width_frame,top_frame1+radius,radius);
		ctx2.lineTo(left_frame+width_frame,top_frame1+height_frame1);
		ctx2.lineTo(left_frame,top_frame1+height_frame1);
		ctx2.stroke();
			
		ctx2.beginPath();
		ctx2.moveTo(left_frame,top_frame2);
		ctx2.lineTo(left_frame+width_frame,top_frame2);
		ctx2.lineTo(left_frame+width_frame,top_frame2+height_frame2-radius);
		ctx2.arcTo(left_frame+width_frame,top_frame2+height_frame2,left_frame+width_frame-radius,top_frame2+height_frame2,radius);
		ctx2.lineTo(left_frame+radius,top_frame2+height_frame2);
		ctx2.arcTo(left_frame,top_frame2+height_frame2,left_frame,top_frame2+height_frame2-radius,radius);
		ctx2.lineTo(left_frame,top_frame2);
		ctx2.stroke();
		
		ctx2.globalAlpha = 1;
		ctx2.font = "28px Arial";
		
		ctx2.fillStyle = "white";
		ctx2.textAlign = "center";
		ctx2.fillText(param.title,left_frame+width_frame/2,top_frame1+36);

		var cont = param.content;
		
		if(cont.length<30)
		{
			ctx2.textAlign="center";
			ctx2.fillText(cont,left_frame+width_frame/2,top_frame2+100);
		}
		
		else
		{
			ctx2.textAlign="left";
			
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
						ctx2.fillText(text_write,left_frame+23,top_frame2+50+r*35);
						text_write = "";
						r++;
					}
				}
				text_write+=cont[j];
				if(j==cont.length-1)
				{
					ctx2.fillText(text_write,left_frame+23,top_frame2+50+r*35);
					text_write = "";
					r = 0;
				}
			}
		}	
		timer = setInterval(function(){delay();},500);
	}
	
	this.close = function()
	{
		ctx2.clearRect(0, 0, window_width, window_height);
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

//video seek 
/*******************
var param = 
	{
		name:"Seek Play",
		fun_ok:function(time)
		{
			seekTurnTo(time);
		}
	}
current_dialog_object = info_tip_object;
current_dialog_object.show(param);
*/
function SeekClass()
{
	var width_frame;
	var height_frame;
	var height_frame1;
	var height_frame2;
	var space_v1;
	
	var left_frame;
	var top_frame1;
	var top_frame2;
	var param;
	
	var arr_time;
	var current_position;
	var that = this;
	

	this.show = function(param1)
	{
		param = param1;
		width_frame = 500;
		height_frame1 = 50;
		height_frame2 = 220;
		space_v1 = 3;
		height_frame = height_frame1 + height_frame2 + space_v1;
		
		radius1 = 4;
		
		arr_time = [0,0,0,0,0,0];
		current_position = 0;
			
		
		left_frame = window_width/2-width_frame/2;
		top_frame1 = 170;
		top_frame2 = top_frame1+height_frame1+space_v1;
		
		ctx2.clearRect(left_frame-2, top_frame1-2, width_frame+4, height_frame+4);

		ctx2.fillStyle = "black";
			
		drawRoundRect(left_frame, top_frame1, width_frame, height_frame1+space_v1+height_frame2, radius1,ctx2);
			
		ctx2.strokeStyle = "rgb(255,255,255)";
		ctx2.lineWidth = 2;
		ctx2.beginPath();
		ctx2.moveTo(left_frame,top_frame1+height_frame1);
		ctx2.arcTo(left_frame,top_frame1,left_frame+radius1,top_frame1,radius1);
		ctx2.lineTo(left_frame+width_frame-radius1,top_frame1);
		ctx2.arcTo(left_frame+width_frame,top_frame1,left_frame+width_frame,top_frame1+radius1,radius1);
		ctx2.lineTo(left_frame+width_frame,top_frame1+height_frame1);
		ctx2.lineTo(left_frame,top_frame1+height_frame1);
		ctx2.stroke();
			
		ctx2.beginPath();
		ctx2.moveTo(left_frame,top_frame2);
		ctx2.lineTo(left_frame+width_frame,top_frame2);
		ctx2.lineTo(left_frame+width_frame,top_frame2+height_frame2-radius1);
		ctx2.arcTo(left_frame+width_frame,top_frame2+height_frame2,left_frame+width_frame-radius1,top_frame2+height_frame2,radius1);
		ctx2.lineTo(left_frame+radius1,top_frame2+height_frame2);
		ctx2.arcTo(left_frame,top_frame2+height_frame2,left_frame,top_frame2+height_frame2-radius1,radius1);
		ctx2.lineTo(left_frame,top_frame2);
		ctx2.stroke();
		
		ctx2.globalAlpha = 1;
		ctx2.font = "28px Arial";
		ctx2.textAlign="center";
		ctx2.fillStyle = "white";
		ctx2.fillText(param.name,left_frame+width_frame/2,top_frame1+36);
		
		//content;
		
		drawContent();
				
		drawButton();
	}
	
	function drawContent()
	{
		
		ctx2.font = "20px Arial";
		ctx2.textAlign="left";
		
		ctx2.clearRect(left_frame+3,top_frame2+3,width_frame-6,height_frame2-100);
		ctx2.fillStyle="black";
		ctx2.fillRect(left_frame+2,top_frame2+2,width_frame-4,height_frame2-98);
		
		
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
				width_pre = ctx2.measureText(text_content).width;
				width_select = ctx2.measureText(""+arr_time[i]).width;
			}
			
			text_content+=arr_time[i];
			if(i==1||i==3)
			{
				text_content+=":";
			}
		}
		
		
		width_time = ctx2.measureText(text_content).width;
		left_time = left_frame+(width_frame-width_time)/2;
		top_time = top_frame2 + 100;
		
		height_select = 26;
		left_select = left_time+width_pre;
		top_select = top_time-height_select+6;
		
		ctx2.fillStyle = "#dfdfdf";
		ctx2.fillRect(left_select,top_select,width_select,height_select);
		
		var left_start = left_time;
		
		ctx2.fillStyle="white";
		
		for(var i=0;i<arr_time.length;i++)
		{
			if(i==current_position)
			{
				ctx2.fillStyle="black";
			}
			else
			{
				ctx2.fillStyle="white";
			}
			
			ctx2.fillText(arr_time[i],left_start,top_time);
			left_start+=ctx2.measureText(""+arr_time[i]).width;
			
			if(i==1||i==3)
			{
				ctx2.fillText(":",left_start,top_time);
				left_start+=ctx2.measureText(":").width;
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
		
		ctx2.clearRect(left_botton1-6, top_botton-6, width_botton*2+space_h1+12, height_botton+12);
		ctx2.fillStyle = 'black';
		ctx2.fillRect(left_botton1-7, top_botton-6, width_botton*2+space_h1+13, height_botton+12);
		
		ctx2.drawImage(ns_edittype,left_botton1,top_botton,width_botton,height_botton);
		ctx2.drawImage(ns_edittype,left_botton2,top_botton,width_botton,height_botton);
		
		drawRoundStroke(ctx2,left_botton1,top_botton,width_botton,height_botton,radius2,1,"white");
		drawRoundStroke(ctx2,left_botton2,top_botton,width_botton,height_botton,radius2,1,"white");
		ctx2.strokeStyle = "white";
		ctx2.beginPath();
		ctx2.moveTo(left_botton1,top_botton+2);
		ctx2.lineTo(left_botton1+width_botton,top_botton+2);
		ctx2.stroke();
		
		ctx2.beginPath();
		ctx2.moveTo(left_botton2,top_botton+2);
		ctx2.lineTo(left_botton2+width_botton,top_botton+2);
		ctx2.stroke();
		
		ctx2.fillStyle = "white";
		ctx2.font = "20px Arial";
		ctx2.textAlign = "center";
		ctx2.fillText("Ok",left_botton1+width_botton/2,top_botton+18);
		ctx2.fillText("Exit",left_botton2+width_botton/2,top_botton+18);
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
		ctx2.clearRect(left_frame-2, top_frame1-2, width_frame+4, height_frame+4);
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
			case 8:
			{
				this.menu();
			}
			break;
			case 27:
			{
				this.menu();
				e.preventDefult();
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

function drawRoundRect(cornerX, cornerY, width, height, cornerRadius,context) 
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
	
	function drawRoundStroke(ctx,left,top,width,height,radius,widthLine,rgba)
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
