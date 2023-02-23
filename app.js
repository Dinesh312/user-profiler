const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const shell = require('shelljs')
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
const hmac = require("./public/js/hash/hmac-sha512")
const base64 = require("./public/js/hash/enc-base64")
const utf8 = require("./public/js/hash/enc-utf8")

// import {hmacSHA512} from '../user-profiler/public/';

let uuid = undefined
let staticFp = undefined
let shoppingFp = undefined
let surveyFp = undefined
let signinFp = undefined
let riddleFp = undefined
let deviceHash = undefined
let browserHash = undefined
let dirName = undefined

app.get('/', (req, res) => {
	// if(staticFp == undefined){
		// shell.exec('./tesh.sh')
	// }
	if(staticFp != undefined && shoppingFp != undefined && signinFp != undefined && surveyFp != undefined && riddleFp != undefined){
		res.render('hash', {deviceHash : deviceHash, browserHash: browserHash})
		
		setTimeout(() => {
			console.log("==========New Session Started==========");
			uuid = undefined
			staticFp = undefined
			shoppingFp = undefined
			surveyFp = undefined
			signinFp = undefined
			riddleFp = undefined
			deviceHash = undefined
			browserHash = undefined
		}, 3000);
	} else {
		res.redirect('home.html')
	}
})

app.post('/', (req, res) =>{
	if(req.body.pathname.includes('home') && staticFp == undefined){
		staticFp = req.body;
		// console.log(staticFp);

		dirName = 'fingerprints/' + req.get('X-df-uuid');
		if(!fs.existsSync(dirName)) {
			fs.mkdirSync(dirName, { recursive: true });
		}

		fs.writeFile(dirName + '/staticfp.json', JSON.stringify(staticFp), function(err) {
			if(err) {
				throw err;
			}
			console.log('==========Static fingerprint recorded==========')

			deviceFp = {}
			Object.keys(staticFp).forEach(key => {
				if(deviceProperties.includes(key)){
					deviceFp[key] = staticFp[key];
				}
			});
			// console.log(deviceFp);

			browserFp = {}
			Object.keys(staticFp).forEach(key => {
				if(browserProperties.includes(key)){
					browserFp[key] = staticFp[key];
				}
			});
			// console.log(browserFp);

			deviceHash = hashGenerator(req.body.href, deviceFp, req.get('X-df-timestamp'), req.get('X-df-uuid'))
			browserHash = hashGenerator(req.body.href, browserFp, req.get('X-df-timestamp'), req.get('X-df-uuid'))
			// console.log(deviceHash + "\n" + browserHash);
		})
	}

	if(req.body.pathname.includes('shopping') && shoppingFp == undefined){
		shoppingFp = req.body;
		// console.log(shoppingFp);

		dirName = 'fingerprints/' + req.get('X-df-uuid');
		if(!fs.existsSync(dirName)) {
			fs.mkdirSync(dirName, { recursive: true });
		}

		fs.writeFile(dirName + '/shoppingfp.json', JSON.stringify(shoppingFp), function(err) {
			if(err) {
				throw err;
			}
			console.log('==========Shopping fingerprint recorded==========')
		})
	}	

	if(req.body.pathname.includes('survey') && surveyFp == undefined){
		surveyFp = req.body;
		// console.log(surveyFp);

		dirName = 'fingerprints/' + req.get('X-df-uuid');
		if(!fs.existsSync(dirName)) {
			fs.mkdirSync(dirName, { recursive: true });
		}

		fs.writeFile(dirName + '/surveyfp.json', JSON.stringify(surveyFp), function(err) {
			if(err) {
				throw err;
			}
			console.log('==========Survey fingerprint recorded==========')
		})
	}	

	if(req.body.pathname.includes('signin') && signinFp == undefined){
		signinFp = req.body;
		// console.log(signinFp);

		dirName = 'fingerprints/' + req.get('X-df-uuid');
		if(!fs.existsSync(dirName)) {
			fs.mkdirSync(dirName, { recursive: true });
		}

		fs.writeFile(dirName + '/signinfp.json', JSON.stringify(signinFp), function(err) {
			if(err) {
				throw err;
			}
			console.log('==========Signin fingerprint recorded==========')
		})
	}	

	if(req.body.pathname.includes('riddle') && riddleFp == undefined){
		riddleFp = req.body;
		// console.log(riddleFp);

		dirName = 'fingerprints/' + req.get('X-df-uuid');
		if(!fs.existsSync(dirName)) {
			fs.mkdirSync(dirName, { recursive: true });
		}

		fs.writeFile(dirName + '/riddlefp.json', JSON.stringify(riddleFp), function(err) {
			if(err) {
				throw err;
			}
			console.log('==========Riddle fingerprint recorded==========')
		})
	}	
})

function hashGenerator(href, json, timestamp, uuid){
	delete json.date
	// console.log(json)
	var temp = href + "\n" + JSON.stringify(json) + "\n" + uuid
	hash = base64.stringify(hmac(temp, base64.stringify(utf8.parse(uuid))))
	return hash
}

const deviceProperties = ['userAgent', 'platform', 'touchClick', 'sensors', 'canvas', 'height', 'width', 'colorDepth', 'vendor', 'renderer', 'languages', 'deviceMemory', 'timeZone', 'devicePixelRatio']
const browserProperties = ['errors', 'evals', 'userMedia', 'availWidth', 'availHeight', 'orientationType', 'orientationAngle', 'appCodeName', 'appName', 'cookieEnabled', 'doNotTrack', 'braveBrowser', 'hostname', 'href', 'pathname', 'origin']

app.get('/shopping', (req, res) => {
  res.redirect('shopping.html')
})

app.get('/survey', (req, res) => {
  res.redirect('survey.html')
})

app.get('/signin', (req, res) => {
  res.redirect('signin.html')
})

app.get('/riddle', (req, res) => {
  res.redirect('riddle.html')
})

app.get('/hash', (req, res) => {
  res.redirect('hash.html')
})

var server = app.listen(port, () => {
  console.log(`Server running on port 3000...`)
})