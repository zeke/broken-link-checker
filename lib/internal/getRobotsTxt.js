"use strict";
var guard = require("robots-txt-guard");
var parse = require("robots-txt-parse");

var requestPromise = require("request-promise");
var urllib = require("url");
var urlobj = require("urlobj");



function getRobotsTxt(url, options)
{
	url = urlobj.parse(url);
	
	// TODO :: this mutates the original (if was an object)
	url.hash = null;
	url.path = url.pathname = "/robots.txt";
	url.query = null;
	url.search = null;
	
	return requestPromise.get(urllib.format(url),  // TODO :: https://github.com/joepie91/node-bhttp/issues/3
	{
		discardResponse: true,
		headers: { "user-agent":options.userAgent },
		stream: true
	})
	.then(parse)
	.then(guard);
}



module.exports = getRobotsTxt;
