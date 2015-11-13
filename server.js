var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    request = require('request'),
    compression = require('compression'),
    session = require('express-session'),
    csrf = require('csurf'),
    override = require('method-override'),
    yelp = require ('node-yelp')

function startServer() {

    // all environments
    app.set('port', process.argv[3] || process.env.PORT || 3000)
    app.disable('x-powered-by')
    app.use(/(.*).(css|js)/, compression())
    app.use(express.static(__dirname+'/dist'))
    app.use(express.static(__dirname+'/bower_components'))


    const querify = (queryParamsObject) => {
        var params = Object.keys(queryParamsObject).map(function(val, key) {
            return val + '=' + queryParamsObject[val]
        }).join('&')
        return params.length === 0 ? '' : '?' + params
    }


    // adds a new rule to proxy a localUrl -> webUrl
    // i.e. proxify ('/my/server/google', 'http://google.com/')
    const proxify = (localUrl, webUrl) => {
        app.get(localUrl, (req, res, next) => {
            var tokens = webUrl.match(/:(\w+)/ig)
            var remote = (tokens || []).reduce((a, t) => {
                return a.replace(new RegExp(t, 'ig'), req.params[t.substr(1)])
            }, webUrl)
            req.pipe(
                request(remote + querify(req.query))
                    .on('error', err => console.error(err))
            ).pipe(res)
        })
        app.post(localUrl, (req, res, next) => {
            var tokens = webUrl.match(/:(\w+)/ig)
            var remote = (tokens || []).reduce((a, t) => {
                return a.replace(new RegExp(t, 'ig'), req.params[t.substr(1)])
            }, webUrl)
            req.pipe(
                request.post(remote + querify(req.query), {form:req.query})
                    .on('error', err => console.error(err))
            ).pipe(res)
        })
    }

    var client = yelp.createClient({
        oauth: {
            "consumer_key": "PNUcozGKzI22fpJ2dmeGdg",
            "consumer_secret": "Q2p1vfBnJ71EXTlXbp8ggeIjaXc",
            "token": "fvRBKnpy6BvRIT4t7yUc7VGhocG4hIPi",
            "token_secret": "47-cUNi1bBv2d4Fslo_968yoS3E"
        }
    })
    // app.get('/myYelp/business', (req , res) => {

    // })32.7767,96.7970
    app.get('/myYelp', (req , res) => {
        var location = req.query.location||"Houston",
            ll   = req.query.location.match(',')?req.query.location:undefined,
            terms = 'community theater',
            limit = req.query.limit||10;
        console.log(location)
        console.log(terms)
        console.log('=======',{
          term: terms,
          location: (ll?'':location),
          limit:limit,
          ll:ll,
        })
        
        if(req.query.id){
            client.business(req.query.id,{cc:'US'}).then(function (data) {
                res.write(JSON.stringify({businesses:[data]}))
                res.end()
            })
        }
        else{
            client.search({
              term: terms,
              location: (ll?undefined:location),
              limit:limit,
              ll:ll
            }).then(function (data) {
                data.qty = data.businesses.length;
                res.write(JSON.stringify(data))
                res.end()
            })
        }
        //     else{
        //         res.write(JSON.stringify({error:'missing params'}))
        //         res.end()
        //     }
        // }
        // catch(e){
        //     res.write(JSON.stringify({error:'missing params'}))
        //     res.end()
        // }
        
        // res.write(typeof req.params)
        // for (var i in req.query)
        //     res.write(i+'\r\n')
        //     // res.write(JSON.stringify())
        //     res.end()

    })
    // request.write('s')

    // add your proxies here.
    //
    // examples:
    // proxify('/yummly/recipes', 'http://api.yummly.com/v1/api/recipes');
    // proxify('/brewery/styles', 'https://api.brewerydb.com/v2/styles');

    // SOME SECURITY STUFF
    // ----------------------------
    // more info: https://speakerdeck.com/ckarande/top-overlooked-security-threats-to-node-dot-js-web-applications
    // ----
    // remove some info so we don't divulge to potential
    // attackers what platform runs the website
    app.disable('x-powered-by')
    // change the generic session cookie name
    // app.use(session({ secret: 'some secret', key: 'sessionId', cookie: {httpOnly: true, secure: true} }))
    // enable overriding
    app.use(override("X-HTTP-Method-Override"))
    // enable CSRF protection
    // app.use(csrf())
    // app.use((req, res, next) => {
    //     res.locals.csrftoken = req.csrfToken() // send the token to the browser app
    //     next()
    // })
    // ---------------------------

    const throwYourHandsUp = (port=app.get('port')) => {
        http.createServer(app).listen(port, () => {
            console.log(`Express server listening on port ${port}`)
        }).on('error', e => {
            app.set('port', port+1)
            throwYourHandsUp()
        })
    }
    throwYourHandsUp()

}

module.exports.startServer = startServer