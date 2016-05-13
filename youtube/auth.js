// JavaScript Document
apiKeySet = function()
{
	//console.log("client.js ok");
	gapi.client.setApiKey('AIzaSyBwmeDcBV0TDNs8IYWkmTYmMzqnUwM7HXQ');
	loadAPIClientInterfaces();
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
function loadAPIClientInterfaces() 
{
	//console.log("sssss66666666666666666666666ssslll:");
    gapi.client.load('youtube', 'v3', function() 
	{
		//console.log("ssssssssssssssslll:");
		var param = getSearchParam();
   	    search(param);
    });
}