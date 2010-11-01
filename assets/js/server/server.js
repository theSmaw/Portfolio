var SMAW = {};

SMAW.modules = {
    events : require('events'),
    fs : require('fs'),
    http : require('http'),
    path : require('path'),
    sanitizer : require('sanitizer'),
    sys : require('sys'),
    url : require('url'),
    yql : require('yql')
};

SMAW.createServer = function () {
    
    SMAW.modules.http.createServer(function (request, response) {
        var uri = SMAW.modules.url.parse(request.url).pathname;
        
        if (uri === '/Flickr') {
            SMAW.serveDynamicContent['flickr'](response);
        } else if (uri === '/Delicious') {
            SMAW.serveDynamicContent['delicious'](response);
        } else if (uri === '/Twitter') {
            SMAW.serveDynamicContent['twitter'](response);
        } else if (uri === '/Tumblr') {
            SMAW.serveDynamicContent['tumblr'](response);
        } else if (uri === '/Posterous') {
            SMAW.serveDynamicContent['posterous'](response);
        } else if (uri === '/LastFM') {
            SMAW.serveDynamicContent['lastfm'](response);
        } else {
            SMAW.loadStaticFile(uri, response);
        }
    }).listen(80);
};

SMAW.loadStaticFile = function (uri, response) {
    var filename = SMAW.modules.path.join(process.cwd(), uri);
    SMAW.modules.sys.puts(filename);
    if ((filename === '') || (filename === '/')) {
        filename = "index.html";
    }
    
    SMAW.modules.path.exists(filename, function (exists) {
		if (!exists) {
			response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
			response.write('404 Not Found\n');
			response.end();
            
			return;
		}
		SMAW.modules.fs.readFile(filename, 'binary', function (err, file) {
			if (err) {
				response.writeHead(500, {
                    'Content-Type' : 'text/plain'
                });
				response.write(err + '\n');
				response.end();

				return;
			}
			response.writeHead(200);
			response.write(file, 'binary');
			response.end();
		});
	});
};

SMAW.handleRequest = function () {
    
};

SMAW.createServer();

SMAW.serveDynamicContent = {
    
    delicious : function (response) {
        
        new SMAW.modules.yql.exec('select * from rss where url="http://feeds.delicious.com/v2/rss/bensmawfield?count=8"', function (yqlResponse) {
            var current,
                i,
                items = [],
                responseItems = yqlResponse.query.results.item,
                length = responseItems.length;
                
            for (i = 0; i < length; i += 1) {
                current = responseItems[i];
                items.push('<h3><a href="' + current.link + '" title="View this bookmark in Delicious">' + SMAW.modules.sanitizer.escape(current.title) + '</a></h3><p>' + current.description + '</p>');
            }
            SMAW.serveDynamicContent.serve(response, JSON.stringify({
                'items' : items
            }));
        });
    },
    
    flickr : function (response) {
        
        new SMAW.modules.yql.exec('select * from flickr.people.publicphotos(0,30) where user_id="21099545@N07"', function (yqlResponse) {
            var current,
                i,
                items = [],
                responseItems = yqlResponse.query.results.photo,
                length = responseItems.length;
                
            for (i = 0; i < length; i += 1) {
                current = responseItems[i];
                items.push('<a href="http://www.flickr.com/bsmawfield/' + current.id + '" title="View this photo on Flickr"><img src="http://farm' + current.farm + '.static.flickr.com/' + current.server + '/' + current.id + '_' + current.secret + '_m.jpg" alt="" /></a>');
            }
            SMAW.serveDynamicContent.serve(response, JSON.stringify({
                'items' : items
            }));
        });
    },
    
    lastfm : function (response) {
        
        new SMAW.modules.yql.exec('select * from lastfm.recenttracks where user="bensmawfield" AND api_key="2f8fdf39b34897d01810fce2213c8c56"', function (yqlResponse) {
            var current,
                description,
                i,
                items = [],
                responseItems,
                length;
                
            if (yqlResponse.query.results) {
                responseItems = yqlResponse.query.results.lfm.recenttracks.track;
                length = (responseItems.length < 9) ? responseItems.length : 8;
                for (i = 0; i < length; i += 1) {
                    current = responseItems[i];
                    items.push('<h3>' + current.artist.content + '</h3><p>' + current.name + '</p><img alt="" src="' + current.image[0].content + '" />');
                }
            }
            SMAW.serveDynamicContent.serve(response, JSON.stringify({
                'items' : items
            }));
        });
    },  
    
    posterous : function (response) {
        
        new SMAW.modules.yql.exec('select * from rss where url="http://feeds.feedburner.com/PosterousOfSmaw?format=xml"', function (yqlResponse) {
            var current,
                description,
                i,
                items = [],
                responseItems,
                length;
                
            if (yqlResponse.query.results) {
                responseItems = yqlResponse.query.results.item;
                length = (responseItems.length < 9) ? responseItems.length : 8;
                for (i = 0; i < length; i += 1) {
                    current = responseItems[i];
                    description = SMAW.modules.sanitizer.sanitize(current.description).split('<p>').join('').split('</p>').join('');
                    if (description.length > 100) {
                        description = description.substr(0, 99) + '&hellip;';
                    }
                    items.push('<h3><a href="' + current.origLink + '" title="View this post on Posterous">' + current.title + '</a></h3><p>' + description + '</p>');
                }
            }
            SMAW.serveDynamicContent.serve(response, JSON.stringify({
                'items' : items
            }));
        });
    },  
    
    tumblr : function (response) {
        
        new SMAW.modules.yql.exec('select * from tumblr.posts where username="populr"', function (yqlResponse) {
            var current,
                i,
                items = [],
                responseItems,
                length;
                
            if (yqlResponse.query.results) {
                responseItems = yqlResponse.query.results.posts.post;
                length = (responseItems.length < 9) ? responseItems.length : 8;
                for (i = 0; i < length; i += 1) {
                    current = responseItems[i];
                    items.push('<a href="http://www.flickr.com/bsmawfield/' + current.url + '" title="View this post on Tumblr"><img src="'  + current["photo-url"][3].content + '" alt="" /></a>');
                }
            }
            SMAW.serveDynamicContent.serve(response, JSON.stringify({
                'items' : items
            }));
        });
    },  
    
    twitter : function (response) {
        
        new SMAW.modules.yql.exec('select * from twitter.user.timeline(0, 10) where id="thesmaw"', function (yqlResponse) {
            var current,
                i,
                items = [],
                responseItems = yqlResponse.query.results.statuses.status,
                length = responseItems.length,
                date;
                
            for (i = 0; i < length; i += 1) {
                current = responseItems[i];
                date = new Date(current.created_at);                
                items.push('<h3>' + date.getDate() + '/' + (parseInt(date.getMonth(), 10) + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + '</h3><p>' + current.text + '</p>');
            }
            SMAW.serveDynamicContent.serve(response, JSON.stringify({
                'items' : items
            }));
        });
    },
    
    serve : function (response, str) {
        response.writeHead(200, {
            'Content-Type' : 'text/plain'
        });
        response.write(str);
        response.end();    
    }
};






/*


var twitter_client = http.createClient(80, "api.twitter.com");

var tweet_emitter = new events.EventEmitter();

function get_tweets() {
	var request = twitter_client.request("GET", "/1/statuses/public_timeline.json", {"host": "api.twitter.com"});

	request.addListener("response", function(response) {
		var body = "";
		response.addListener("data", function(data) {
			body += data;
		});

		response.addListener("end", function() {
			var tweets = JSON.parse(body);
			if(tweets.length > 0) {
				tweet_emitter.emit("tweets", tweets);
			}
		});
	});

	request.end();
}

setInterval(get_tweets, 5000);
 */



SMAW.modules.sys.puts("Server running at http://localhost:8080/");
