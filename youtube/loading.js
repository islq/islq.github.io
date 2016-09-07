// JavaScript Documentvar 
var _PageHeight = 700;
var  _PageWidth = 1250;
var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0;
var  _LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2 : 0;
var _LoadingHtml = '<div id="loadingDiv" style="position:absolute;left:0;width:'+_PageWidth+'px;height:' + _PageHeight + 'px;top:0;/*background:#fff*/;z-index:2;"><div style="position: absolute; left: ' + 550 + 'px; top:' + _LoadingTop + 'px; width: 100px; height: 57px; line-height: 57px; padding-left: 50px; padding-right:5px; font-size:30px;  color: #000; font-family:\'Microsoft YaHei\';z-index:3;">Loading...</div></div>';
   
document.write(_LoadingHtml);

function completeLoading() 
{

	var loadingMask = document.getElementById('loadingDiv');
	loadingMask.parentNode.removeChild(loadingMask);
	apiKeySet();

}