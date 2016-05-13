// JavaScript Document
// weather is searching video
var isSearch = false;

var results = 
{
	current_page:0,
	prepage:"",
	nextpage:""
}

function keySearch()
{
	isKeyBoardShow = true;
	isSearch = true;
	openT(160,200,inputDeal,"");
}

function getSearchParam(options)
{
	var param = 
	{
		part:'snippet',
		q:keyWord,
		type:'video',
		videoEmbeddable:'true',
		//videoSyndicated:'true',
		maxResults:5
	}
	if(options == null)
	{
		return param;
	}
	
	var result = $.extend({},param,options);
	
	
	
	return result;
} 


function inputDeal(text)
{
	keyWord = text;
	
	var option = 
	{
		q:keyWord
	}
	var param = getSearchParam(option);
	
	search(param);
}

function search(param) 
{
	isSearch = true;
	focus_position = 0;
	var request = gapi.client.youtube.search.list(param);

	request.execute(function(response)
	{
		//console.log(JSON.stringify(response.result));
      	var str = JSON.stringify(response.result.items[0].id.videoId);
	  	totalResults = response.result.pageInfo.totalResults;
	
		if(totalResults>0)
		{
			if(param.hasOwnProperty("pageToken"))
			{
				if(response.result.hasOwnProperty("prevPageToken"))
				{
					results.prepage = response.result.prevPageToken;
				}
				else
				{
					results.prepage = "";
				}
				if(response.result.hasOwnProperty("nextPageToken"))
				{
					results.nextpage = response.result.nextPageToken;
				}
				else
				{
					results.nextpage = "";
				}
			}
			else
			{
				results.current_page = 0;
				if(response.result.hasOwnProperty("nextPageToken"))
				{
					results.nextpage = response.result.nextPageToken;
				}
				
				//console.log("ssssssssssssssssssssss:"+results.nextpage);
			}
			
			videoList = new Array();
			for(var i=0;i<response.result.items.length;i++)
			{
				videoList[i] = new Array();
				videoList[i][0] = response.result.items[i].id.videoId;
				videoList[i][1] = response.result.items[i].snippet.thumbnails.medium.url;
				videoList[i][2] = response.result.items[i].snippet.title;
				videoList[i][3] = response.result.items[i].snippet.channelTitle;
				videoList[i][4] = response.result.items[i].snippet.publishedAt;	
			}
			
			var ids ="";
			for(var i=0;i<response.result.items.length;i++)
			{
				if(i == response.result.items.length-1)
				{
					ids = ids + videoList[i][0];
				}
				else
				{
					ids = videoList[i][0]+","+ids;
				}
			}
			
			var param1 = 
			{
				part:'snippet',
				id:ids,
				maxResults:param.maxResults
			}
			var request1 = gapi.client.youtube.videos.list(param1);
			request1.execute(function(response1)
			{
				for(var i=0;i<response1.result.items.length;i++)
				{
					videoList[i][5] = response1.result.items[i].snippet.description;
				}
				
				drawList();
				drawInfo();
				
				isKeyBoardShow = false;
				isSearch = false;
			});
		}
	});
}