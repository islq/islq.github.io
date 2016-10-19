// JavaScript Document

lang_en = 
{
	city:"City: ",
	key:"Key Word: ",
	youtube:"Youtube",
	cuge:"Current Page: ",
	tots:"Total Results: ",
	search:"Search",
	seek:"Seek",
	language:"language",
	menu:"Menu",
	lang:
		[
			"English",
			"Slovak",
			"Czech"
		]
}
lang_sk = 
{
	city:"Mesto: ",
	key:"Klúcové Slovo: ",
	youtube:"Youtube",
	cuge:"Aktuálna stránka: ",
	tots:"Celkové výsledky: ",
	language:"Jazyk",
	search:"Vyhladávanie",
	seek:"Prehrat od",
	menu:"Menu",
	lang:
		[
			"Anglicky",
			"Slovensky",
			"Czech"
		]

}

lang_cz = 
{
	city:"Místo: ",
	key:"Klíčové slovo: ",
	youtube:"Youtube",
	cuge:"Strana: ",
	tots:"Celkové výsledky: ",
	language:"Jazyk",
	search:"Vyhledávání",
	seek:"Prehrat od",
	menu:"Menu",
	lang:
		[
			"Anglicky",
			"Slovensky",
			"Czech"
		]
}



lang_index = 1;

lang = 
[
	lang_en,
	lang_sk,
	lang_cz
]

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}
var _query_lang = getQueryVariable('lang');
if(typeof _query_lang != 'undefined') {
    if (_query_lang>=0 && _query_lang <lang.length) {
        lang_index = _query_lang;
    }
}
