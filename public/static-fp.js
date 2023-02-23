document.addEventListener('DOMContentLoaded', (event) => {
	
	const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const fontScore = fontCheck();
    const errors = errorCheck();
	const evals = evalCheck();
	const userMedia = userMediaCheck();
    const touchClick = touchClickCheck();
    const sensors = [false, false]
    const canvas = canvasCheck();
    const screenDimensions = screenDimensionsCheck();
    const webGl = webGlCheck();

	const appCodeName = navigator.appCodeName;
	const appName = navigator.appName;
	const languages = navigator.languages
	const cookieEnabled = navigator.cookieEnabled;
	const deviceMemory = navigator.deviceMemory;
	const doNotTrack = navigator.doNotTrack;
	const braveBrowser = (navigator.brave && navigator.brave.isBrave() || false)
	const date = new Date();	
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const devicePixelRatio = window.devicePixelRatio
	const hostname = location.hostname
	const port = location.port
	const href = location.href
	const pathname = location.pathname
	const origin = location.origin
	const search = location.search

    const contextChange = [];
    const mouseMovements = [];
    const mouseClicks = [];
    const mouseScrolls = [];
    const contextMenu = [];
    const keyLogger = [];
    const copyEvents = [];
    const pasteEvents = [];
    var copiedText = "";
    var pastedText = "";
    const focusEvents = [];
    const blurEvents = [];
    const loadEvents = [];
    const beforeUnloadEvents = [];
    const unloadEvents = [];
    const selectEvents = [];
    
    // Function to log mouseover
	
	document.addEventListener('mouseover', function(event) {
		mouseMovements.push({
			time: Date.now(),
			x: event.pageX,
			y: event.pageY,
		 	event: event.type
		})
	});
   
    // Function to log mousemove
    
    document.addEventListener('mousemove', function(event) {
		mouseMovements.push({
			time: Date.now(),
			x: event.pageX,
			y: event.pageY,
		 	event: event.type
		})
	});
    
	// Function to log mouseup 
	
	document.addEventListener('mouseup', function(event){
		mouseClicks.push({
			time: Date.now(),
			x: event.pageX,
			y: event.pageY,
			event: event.type
		})
	})
	
	// Function to log mouseup 
	
	document.addEventListener('mousedown', function(event){
		mouseClicks.push({
			time: Date.now(),
			x: event.pageX,
			y: event.pageY,
			event: event.type
		})
	})
	
	// Function to log clicks
	
	document.addEventListener('click', function(event){
		mouseClicks.push({
			time: Date.now(),
			x: event.pageX,
			y: event.pageY,
			event: event.type
		})
	})
	
	// Function to log scroll movements
	
	document.addEventListener('scroll', function(event){
		mouseScrolls.push({
			time: Date.now(),
			x: 0,
			y: 0,
			event: event.type
		})
	})
	
	// Function to log contextmenu
	
	document.addEventListener('contextmenu', function(event){
		contextMenu.push({
			time: Date.now(),
			x: event.pageX,
			y: event.pageY,
			event: event.type
		})
	})
	
    // Function to log copied text
    
    document.addEventListener('copy', function(){
		copiedText = document.getSelection().toString();
		copyEvents.push({
			time: Date.now(),
			x: 0,
			y: 0,
			event: 'copy'
		})
	})
	
    // Function to log pasted text
    
    document.addEventListener('paste', function(){
        if (window.event.clipboardData && window.event.clipboardData.getData) {
            pastedText = window.event.clipboardData.getData('text/plain'); 
        } else if (event.clipboardData && event.clipboardData.getData) {
            pastedText = event.clipboardData.getData('text/plain');
        }
        pasteEvents.push({
			time: Date.now(),
			x: 0,
			y: 0,
			event: 'paste'
		})
	})
	
	// Function to log focus 
	
	document.querySelectorAll('.form-control').forEach(form => {
		form.addEventListener('focus', function(event){
			focusEvents.push({
				time: Date.now(),
				x: 0,
				y: 0,
				event: event.type
			})
		})
	})
	
	// Function to log blur
	
	document.querySelectorAll('.form-control').forEach(form => {
		form.addEventListener('blur', function(event){
			blurEvents.push({
				time: Date.now(),
				x: 0,
				y: 0,
				event: event.type
			})
		})
	})
	
	// Function to log load events
	
	window.addEventListener('load', function(event){
		loadEvents.push({
			time: Date.now(),
			x: 0,
			y: 0,
			event: event.type
		})
	})
	
	// Function to log beforeunload events
	
	window.addEventListener('beforeunload', function(event){
		beforeUnloadEvents.push({
			time: Date.now(),
			x: 0,
			y: 0,
			event: event.type
		})
	})
	
	// Function to log unload events
	
	window.addEventListener('unload', function(event){
		unloadEvents.push({
			time: Date.now(),
			x: 0,
			y: 0,
			event: event.type
		})
		sendParams()
	})
	
	// Function to log select events
	
	document.addEventListener('select', function(event){
		selectEvents.push({
			time: Date.now(),
			x: 0,
			y: 0,
			event: event.type
		})
	})
	
	// Function to log keys
	
	document.addEventListener('keyup', function(event) {
            var charCode = event.code
			keyLogger.push({
				time: Date.now(),
				key: charCode
			})
    })
    
    // Function to log context change from visible to hidden
    
    document.onvisibilitychange = function(){
		contextChange.push({
			id: contextChange.length,
			timestamp: Date.now(),
			visibility: document.visibilityState
		})
	};


    function sansDimensions (){
        body = document.getElementsByTagName("body")[0];
        div = document.createElement("div");
        span = document.createElement("span");

        div.appendChild(span);
        div.style.fontFamily = "Liberation Serif";
        span.style.fontFamily = "Liberation Serif";
        span.style.fontSize = "72px";
        span.innerHTML = "fpScanner";
        body.appendChild(div);

        sansTextWidth = span.offsetWidth;
        sansTextHeight = span.offsetHeight;
        body.removeChild(div);
        
        return [sansTextWidth, sansTextHeight];
    }
    
    function fontDimensions (font) {
		body = document.getElementsByTagName("body")[0];
        div = document.createElement("div");
        span = document.createElement("span");

        div.appendChild(span);
        div.style.fontFamily = font;
        span.style.fontFamily = font;
        span.style.fontSize = "72px";
        span.innerHTML = "fpScanner";
        body.appendChild(div);

        textWidth = span.offsetWidth;
        textHeight = span.offsetHeight;
        body.removeChild(div);
        
        return [textWidth, textHeight];
	}
	
	function fontCheck (){
		
		var fontScore = 0;
		var defDimensions = sansDimensions();
		
		var osPlatforms = {
			"Linux": ["Linux i686","Linux x86_64"],
			"Windows" : ["Win32", "Win64"],
			"iOS" : ["iPhone", "iPad"],
			"Android": ["Linux armv71", "Linux i686"],
			"macOS": ["MacIntel"],
			"FreeBSD": ["FreeBSD amd64", "FreeBSD i386"]
		};
		
		var fontsInOs = {
			"Windows" : ["Arial", "Arial Italic", "Arial Bold", "Arial Bold Italic", "Arial Black", "Bahnschrift", "Calibri Light", "Calibri Light Italic", "Calibri", "Calibri Italic", "Calibri Bold", "Calibri Bold Italic", "Cambria", "Cambria Italic", "Cambria Bold", "Cambria Bold Italic", "Cambria Math", "Candara Light", "Candara Light Italic", "Candara", "Candara Italic", "Candara Bold", "Candara Bold Italic", "Cascadia Code ExtraLight *", "Cascadia Code ExtraLight Italic *", "Cascadia Code Light *", "Cascadia Code Light Italic *", "Cascadia Code SemiLight *", "Cascadia Code SemiLight Italic *", "Cascadia Code Regular *", "Cascadia Code Italic *", "Cascadia Code SemiBold *", "Cascadia Code SemiBold Italic *", "Cascadia Code Bold *", "Cascadia Code Bold Italic *", "Cascadia Mono ExtraLight *", "Cascadia Mono ExtraLight Italic *", "Cascadia Mono Light *", "Cascadia Mono Light Italic *", "Cascadia Mono SemiLight *", "Cascadia Mono SemiLight Italic *", "Cascadia Mono Regular *", "Cascadia Mono Italic *", "Cascadia Mono SemiBold *", "Cascadia Mono SemiBold Italic *", "Cascadia Mono Bold *", "Cascadia Mono Bold Italic *", "Comic Sans MS", "Comic Sans MS Italic", "Comic Sans MS Bold", "Comic Sans MS Bold Italic", "Consolas", "Consolas Italic", "Consolas Bold", "Consolas Bold Italic", "Constantia", "Constantia Italic", "Constantia Bold", "Constantia Bold Italic", "Corbel Light", "Corbel Light Italic", "Corbel", "Corbel Italic", "Corbel Bold", "Corbel Bold Italic", "Courier New", "Courier New Italic", "Courier New Bold", "Courier New Bold Italic", "Ebrima", "Ebrima Bold", "Franklin Gothic Medium", "Franklin Gothic Medium Italic", "Gabriola", "Gadugi", "Gadugi Bold", "Georgia", "Georgia Italic", "Georgia Bold", "Georgia Bold Italic", "HoloLens MDL2 Assets", "Impact", "Ink Free", "Javanese Text", "Leelawadee UI", "Leelawadee UI Semilight", "Leelawadee UI Bold", "Lucida Console", "Lucida Sans Unicode", "Malgun Gothic", "Malgun Gothic Bold", "Malgun Gothic Semilight", "Marlett", "Microsoft Himalaya", "Microsoft JhengHei Light", "Microsoft JhengHei", "Microsoft JhengHei Bold", "Microsoft JhengHei UI Light", "Microsoft JhengHei UI", "Microsoft JhengHei UI Bold", "Microsoft New Tai Lue", "Microsoft New Tai Lue Bold", "Microsoft PhagsPa", "Microsoft PhagsPa Bold", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Tai Le Bold", "Microsoft YaHei Light", "Microsoft YaHei", "Microsoft YaHei Bold", "Microsoft YaHei UI Light", "Microsoft YaHei UI", "Microsoft YaHei UI Bold", "Microsoft Yi Baiti", "MingLiU-ExtB", "PMingLiU-ExtB", "MingLiU_HKSCS-ExtB", "Mongolian Baiti", "MS Gothic", "MS PGothic", "MS UI Gothic", "MV Boli", "Myanmar Text", "Myanmar Text Bold", "Nirmala UI Semilight", "Nirmala UI", "Nirmala UI Bold", "Palatino Linotype", "Palatino Linotype Italic", "Palatino Linotype Bold", "Palatino Linotype Bold Italic", "Segoe Fluent Icons *", "Segoe MDL2 Assets", "Segoe Print", "Segoe Print Bold", "Segoe Script", "Segoe Script Bold", "Segoe UI Light", "Segoe UI Light Italic", "Segoe UI Semilight", "Segoe UI Semilight Italic", "Segoe UI", "Segoe UI Italic", "Segoe UI Semibold", "Segoe UI Semibold Italic", "Segoe UI Bold", "Segoe UI Bold Italic", "Segoe UI Black", "Segoe UI Black Italic", "Segoe UI Emoji", "Segoe UI Historic", "Segoe UI Symbol", "Segoe UI Variable Display Light *", " Segoe UI Variable Display Semilight *", " Segoe UI Variable Display Regular *", " Segoe UI Variable Display Semibold *", " Segoe UI Variable Display Bold *", " Segoe UI Variable Small Light *", " Segoe UI Variable Small Semilight *", " Segoe UI Variable Small Regular *", " Segoe UI Variable Small Semibold *", " Segoe UI Variable Small Bold *", " Segoe UI Variable Text Light *", " Segoe UI Variable Text Semilight *", " Segoe UI Variable Text Regular *", " Segoe UI Variable Text Semibold *", " Segoe UI Variable Text Bold *", "SimSun", "NSimSun", "SimSun-ExtB", "Sitka Banner", "Sitka Banner Italic", "Sitka Banner Semibold *", "Sitka Banner Semibold Italic *", "Sitka Banner Bold", "Sitka Banner Bold Italic", "Sitka Display", "Sitka Display Italic", "Sitka Display Semibold *", "Sitka Display Semibold Italic *", "Sitka Display Bold", "Sitka Display Bold Italic", "Sitka Small", "Sitka Small Italic", "Sitka Small Semibold *", "Sitka Small Semibold Italic *", "Sitka Small Bold", "Sitka Small Bold Italic", "Sitka Heading", "Sitka Heading Italic", "Sitka Heading Semibold *", "Sitka Heading Semibold Italic *", "Sitka Heading Bold", "Sitka Heading Bold Italic", "Sitka Subheading", "Sitka Subheading Italic", "Sitka Subheading Semibold *", "Sitka Subheading Semibold Italic *", "Sitka Subheading Bold", "Sitka Subheading Bold Italic", "Sitka Text", "Sitka Text Italic", "Sitka Text Semibold *", "Sitka Text Semibold Italic *", "Sitka Text Bold", "Sitka Text Bold Italic", "Sylfaen", "Symbol", "Tahoma", "Tahoma Bold", "Times New Roman", "Times New Roman Italic", "Times New Roman Bold", "Times New Roman Bold Italic", "Trebuchet MS", "Trebuchet MS Italic", "Trebuchet MS Bold", "Trebuchet MS Bold Italic", "Verdana", "Verdana Italic", "Verdana Bold", "Verdana Bold Italic", "Webdings", "Wingdings", "Yu Gothic Light", "Yu Gothic Regular", "Yu Gothic Medium", "Yu Gothic Bold", "Yu Gothic UI Light", "Yu Gothic UI Semilight", "Yu Gothic UI Regular", "Yu Gothic UI Semibold", "Yu Gothic UI Bold"],
			"Linux" : ["aakar", "Abyssinica SIL", "Ani", "AnjaliOldLipi", "Bitstream Charter", "C059", "Chandas", "Chilanka", "Courier 10 Pitch", "D050000L", "DejaVu Math TeX Gyre", "DejaVu Sans", "DejaVu Sans Mono", "DejaVu Serif", "Droid Sans Fallback", "Dyuthi", "FreeMono", "FreeSans", "FreeSerif", "Gargi", "Garuda", "Gayathri", "Gubbi", "IPAGothic", "IPAPGothic", "Jamrul", "KacstArt", "KacstBook", "KacstDecorative", "KacstDigital", "KacstFarsi", "KacstLetter", "KacstNaskh", "KacstOffice", "KacstOne", "KacstPen", "KacstPoster", "KacstQurn", "KacstScreen", "KacstTitle", "KacstTitleL", "Kalapi", "Kalimati", "Karumbi", "Keraleeyam", "Khmer OS", "Khmer OS System", "Kinnari", "Laksaman", "Lato", "Liberation Mono", "Liberation Sans", "Liberation Sans Narrow", "Liberation Serif", "Likhan", "LKLUG", "Lohit Assamese", "Lohit Bengali", "Lohit Devanagari", "Lohit Gujarati", "Lohit Gurmukhi", "Lohit Kannada", "Lohit Malayalam", "Lohit Odia", "Lohit Tamil", "Lohit Tamil Classical", "Lohit Telugu", "Loma", "Manjari", "Meera", "Mitra Mono", "mry_KacstQurn", "Mukti Narrow", "Nakula", "Navilu", "Nimbus Mono PS", "Nimbus Roman", "Nimbus Sans", "Nimbus Sans Narrow", "Norasi", "Noto Color Emoji", "Noto Mono", "Noto Sans CJK HK", "Noto Sans CJK JP", "Noto Sans CJK KR", "Noto Sans CJK SC", "Noto Sans CJK TC", "Noto Sans Mono CJK HK", "Noto Sans Mono CJK JP", "Noto Sans Mono CJK KR", "Noto Sans Mono CJK SC", "Noto Sans Mono CJK TC", "Noto Serif CJK JP", "Noto Serif CJK KR", "Noto Serif CJK SC", "Noto Serif CJK TC", "OpenSymbol", "ori1Uni", "P052", "Padauk", "Padauk Book", "padmaa", "padmaa-Bold.1.1", "Pagul", "Phetsarath OT", "Pothana2000", "Purisa", "Rachana", "RaghuMalayalamSans", "Rasa", "Rekha", "Saab", "Sahadeva", "Samanata", "Samyak Devanagari", "Samyak Gujarati", "Samyak Malayalam", "Samyak Tamil", "Sarai", "Sawasdee", "Standard Symbols PS", "Suruma", "Tibetan Machine Uni", "Tlwg Mono", "Tlwg Typewriter", "Tlwg Typist", "Tlwg Typo", "Ubuntu", "Ubuntu Condensed", "Ubuntu Mono", "Umpush", "Unifont", "Unifont CSUR", "Unifont Upper", "Uroob", "URW Bookman", "URW Gothic", "Vemana2000", "Waree", "WenQuanYi Zen Hei", "WenQuanYi Zen Hei Mono", "WenQuanYi Zen Hei Sharp", "Yrsa", "Z003"],
			"macOS" : ["Al Bayan Bold", "Al Bayan Plain", "Al Nile", "Al Nile Bold", "Al Tarikh Regular", "American Typewriter", "American Typewriter Bold", "American Typewriter Condensed", "American Typewriter Condensed Bold", "American Typewriter Condensed Light", "American Typewriter Light", "American Typewriter Semibold", "Andale Mono", "Apple Braille", "Apple Braille Outline 6 Dot", "Apple Braille Outline 8 Dot", "Apple Braille Pinpoint 6 Dot", "Apple Braille Pinpoint 8 Dot", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo Bold", "Apple SD Gothic Neo Heavy", "Apple SD Gothic Neo Light", "Apple SD Gothic Neo Medium", "Apple SD Gothic Neo Regular", "Apple SD Gothic Neo SemiBold", "Apple SD Gothic Neo Thin", "Apple SD Gothic Neo UltraLight", "Apple SD Gothic Neo ExtraBold", "Apple Symbols", "AppleGothic Regular", "AppleMyungjo Regular", "Arial", "Arial Black", "Arial Bold", "Arial Bold Italic", "Arial Hebrew", "Arial Hebrew Bold", "Arial Hebrew Light", "Arial Hebrew Scholar", "Arial Hebrew Scholar Bold", "Arial Hebrew Scholar Light", "Arial Italic", "Arial Narrow", "Arial Narrow Bold", "Arial Narrow Bold Italic", "Arial Narrow Italic", "Arial Rounded MT Bold", "Arial Unicode MS", "Avenir Black", "Avenir Black Oblique", "Avenir Book", "Avenir Book Oblique", "Avenir Heavy", "Avenir Heavy Oblique", "Avenir Light", "Avenir Light Oblique", "Avenir Medium", "Avenir Medium Oblique", "Avenir Next Bold", "Avenir Next Bold Italic", "Avenir Next Condensed Bold", "Avenir Next Condensed Bold Italic", "Avenir Next Condensed Demi Bold", "Avenir Next Condensed Demi Bold Italic", "Avenir Next Condensed Heavy", "Avenir Next Condensed Heavy Italic", "Avenir Next Condensed Italic", "Avenir Next Condensed Medium", "Avenir Next Condensed Medium Italic", "Avenir Next Condensed Regular", "Avenir Next Condensed Ultra Light", "Avenir Next Condensed Ultra Light Italic", "Avenir Next Demi Bold", "Avenir Next Demi Bold Italic", "Avenir Next Heavy", "Avenir Next Heavy Italic", "Avenir Next Italic", "Avenir Next Medium", "Avenir Next Medium Italic", "Avenir Next Regular", "Avenir Next Ultra Light", "Avenir Next Ultra Light Italic", "Avenir Oblique", "Avenir Roman", "Ayuthaya", "Baghdad Regular", "Bangla MN", "Bangla MN Bold", "Bangla Sangam MN", "Bangla Sangam MN Bold", "Baskerville", "Baskerville Bold", "Baskerville Bold Italic", "Baskerville Italic", "Baskerville SemiBold", "Baskerville SemiBold Italic", "Beirut Regular", "Big Caslon Medium", "Bodoni 72 Bold", "Bodoni 72 Book", "Bodoni 72 Book Italic", "Bodoni 72 Oldstyle Bold", "Bodoni 72 Oldstyle Book", "Bodoni 72 Oldstyle Book Italic", "Bodoni 72 Smallcaps Book", "Bodoni Ornaments", "Bradley Hand Bold", "Brush Script MT Italic", "Chalkboard", "Chalkboard Bold", "Chalkboard SE Bold", "Chalkboard SE Light", "Chalkboard SE Regular", "Chalkduster", "Charter Black", "Charter Black Italic", "Charter Bold", "Charter Bold Italic", "Charter Italic", "Charter Roman", "Cochin", "Cochin Bold", "Cochin Bold Italic", "Cochin Italic", "Copperplate", "Copperplate Bold", "Copperplate Light", "Corsiva Hebrew", "Corsiva Hebrew Bold", "Courier", "Courier Bold", "Courier Bold Oblique", "Courier New", "Courier New Bold", "Courier New Bold Italic", "Courier New Italic", "Courier Oblique", "DIN Alternate Bold", "DIN Condensed Bold", "Damascus Bold", "Damascus Light", "Damascus Medium", "Damascus Regular", "Damascus Semi Bold", "DecoType Naskh Regular", "Devanagari MT", "Devanagari MT Bold", "Devanagari Sangam MN", "Devanagari Sangam MN Bold", "Didot", "Didot Bold", "Didot Italic", "Diwan Kufi Regular", "Diwan Thuluth Regular", "Euphemia UCAS", "Euphemia UCAS Bold", "Euphemia UCAS Italic", "Farah Regular", "Farisi Regular", "Futura Bold", "Futura Condensed ExtraBold", "Futura Condensed Medium", "Futura Medium", "Futura Medium Italic", "GB18030 Bitmap", "Galvji", "Galvji Bold", "Galvji Bold Oblique", "Galvji Oblique", "Geeza Pro Bold", "Geeza Pro Regular", "Geneva", "Georgia", "Georgia Bold", "Georgia Bold Italic", "Georgia Italic", "Gill Sans", "Gill Sans Bold", "Gill Sans Bold Italic", "Gill Sans Italic", "Gill Sans Light", "Gill Sans Light Italic", "Gill Sans SemiBold", "Gill Sans SemiBold Italic", "Gill Sans UltraBold", "Gujarati MT", "Gujarati MT Bold", "Gujarati Sangam MN", "Gujarati Sangam MN Bold", "Gurmukhi MN", "Gurmukhi MN Bold", "Gurmukhi MT", "Gurmukhi Sangam MN", "Gurmukhi Sangam MN Bold", "Heiti SC Light", "Heiti SC Medium", "Heiti TC Light", "Heiti TC Medium", "Helvetica", "Helvetica Bold", "Helvetica Bold Oblique", "Helvetica Light", "Helvetica Light Oblique", "Helvetica Neue", "Helvetica Neue Bold", "Helvetica Neue Bold Italic", "Helvetica Neue Condensed Black", "Helvetica Neue Condensed Bold", "Helvetica Neue Italic", "Helvetica Neue Light", "Helvetica Neue Light Italic", "Helvetica Neue Medium", "Helvetica Neue Medium Italic", "Helvetica Neue Thin", "Helvetica Neue Thin Italic", "Helvetica Neue UltraLight", "Helvetica Neue UltraLight Italic", "Helvetica Oblique", "Herculanum", "Hiragino Maru Gothic ProN W4", "Hiragino Mincho ProN W3", "Hiragino Mincho ProN W6", "Hiragino Sans GB W3", "Hiragino Sans GB W6", "Hiragino Sans W0", "Hiragino Sans W1", "Hiragino Sans W2", "Hiragino Sans W3", "Hiragino Sans W4", "Hiragino Sans W5", "Hiragino Sans W6", "Hiragino Sans W7", "Hiragino Sans W8", "Hiragino Sans W9", "Hoefler Text", "Hoefler Text Black", "Hoefler Text Black Italic", "Hoefler Text Italic", "Hoefler Text Ornaments", "ITF Devanagari Bold", "ITF Devanagari Book", "ITF Devanagari Demi", "ITF Devanagari Light", "ITF Devanagari Marathi Bold", "ITF Devanagari Marathi Book", "ITF Devanagari Marathi Demi", "ITF Devanagari Marathi Light", "ITF Devanagari Marathi Medium", "ITF Devanagari Medium", "Impact", "InaiMathi", "InaiMathi Bold", "Kailasa Bold", "Kailasa Regular", "Kannada MN", "Kannada MN Bold", "Kannada Sangam MN", "Kannada Sangam MN Bold", "Kefa Bold", "Kefa Regular", "Khmer MN", "Khmer MN Bold", "Khmer Sangam MN", "Kohinoor Bangla", "Kohinoor Bangla Bold", "Kohinoor Bangla Light", "Kohinoor Bangla Medium", "Kohinoor Bangla Semibold", "Kohinoor Devanagari Bold", "Kohinoor Devanagari Light", "Kohinoor Devanagari Medium", "Kohinoor Devanagari Regular", "Kohinoor Devanagari Semibold", "Kohinoor Gujarati Bold", "Kohinoor Gujarati Light", "Kohinoor Gujarati Regular", "Kohinoor Telugu", "Kohinoor Telugu Bold", "Kohinoor Telugu Light", "Kohinoor Telugu Medium", "Kohinoor Telugu Semibold", "Kokonor Regular\t", "Krungthep", "KufiStandardGK Regular", "Lao MN", "Lao MN Bold", "Lao Sangam MN", "Lucida Grande", "Lucida Grande Bold", "Luminari", "Malayalam MN", "Malayalam MN Bold", "Malayalam Sangam MN", "Malayalam Sangam MN Bold", "Marker Felt Thin", "Marker Felt Wide", "Menlo Bold", "Menlo Bold Italic", "Menlo Italic", "Menlo Regular", "Microsoft Sans Serif", "Mishafi Gold Regular", "Mishafi Regular", "Monaco", "Mshtakan", "Mshtakan Bold", "Mshtakan BoldOblique", "Mshtakan Oblique", "MuktaMahee Bold", "MuktaMahee Light", "MuktaMahee Medium", "MuktaMahee Regular", "MuktaMahee SemiBold", "Muna Black", "Muna Bold", "Muna Regular", "Myanmar MN", "Myanmar MN Bold", "Myanmar Sangam MN", "Myanmar Sangam MN Bold", "Nadeem Regular", "New Peninim MT", "New Peninim MT Bold", "New Peninim MT Bold Inclined", "New Peninim MT Inclined", "Noteworthy Bold", "Noteworthy Light", "Noto Nastaliq Urdu", "Noto Nastaliq Urdu Bold", "Noto Sans Javanese Regular", "Noto Sans Kannada Black", "Noto Sans Kannada Bold", "Noto Sans Kannada ExtraBold", "Noto Sans Kannada ExtraLight", "Noto Sans Kannada Light", "Noto Sans Kannada Medium", "Noto Sans Kannada Regular", "Noto Sans Kannada SemiBold", "Noto Sans Kannada Thin", "Noto Sans Myanmar Black", "Noto Sans Myanmar Bold", "Noto Sans Myanmar ExtraBold", "Noto Sans Myanmar ExtraLight", "Noto Sans Myanmar Light", "Noto Sans Myanmar Medium", "Noto Sans Myanmar Regular", "Noto Sans Myanmar SemiBold", "Noto Sans Myanmar Thin", "Noto Sans Oriya", "Noto Sans Oriya Bold", "Optima Bold", "Optima Bold Italic", "Optima ExtraBlack", "Optima Italic", "Optima Regular", "Oriya MN", "Oriya MN Bold", "Oriya Sangam MN", "Oriya Sangam MN Bold", "PT Mono", "PT Mono Bold", "PT Sans", "PT Sans Bold", "PT Sans Bold Italic", "PT Sans Caption", "PT Sans Caption Bold", "PT Sans Italic", "PT Sans Narrow", "PT Sans Narrow Bold", "PT Serif", "PT Serif Bold", "PT Serif Bold Italic", "PT Serif Caption", "PT Serif Caption Italic", "PT Serif Italic", "Palatino", "Palatino Bold", "Palatino Bold Italic", "Palatino Italic", "Papyrus", "Papyrus Condensed", "Party LET Plain", "Phosphate Inline", "Phosphate Solid", "PingFang HK Light", "PingFang HK Medium", "PingFang HK Regular", "PingFang HK Semibold", "PingFang HK Thin", "PingFang HK Ultralight", "PingFang SC Light", "PingFang SC Medium", "PingFang SC Regular", "PingFang SC Semibold", "PingFang SC Thin", "PingFang SC Ultralight", "PingFang TC Light", "PingFang TC Medium", "PingFang TC Regular", "PingFang TC Semibold", "PingFang TC Thin", "PingFang TC Ultralight", "Plantagenet Cherokee", "Raanana", "Raanana Bold", "Rockwell", "Rockwell Bold", "Rockwell Bold Italic", "Rockwell Italic", "STIXGeneral-Bold", "STIXGeneral-BoldItalic", "STIXGeneral-Italic", "STIXGeneral-Regular", "STIXIntegralsD-Bold", "STIXIntegralsD-Regular", "STIXIntegralsSm-Bold", "STIXIntegralsSm-Regular", "STIXIntegralsUp-Bold", "STIXIntegralsUp-Regular", "STIXIntegralsUpD-Bold", "STIXIntegralsUpD-Regular", "STIXIntegralsUpSm-Bold", "STIXIntegralsUpSm-Regular", "STIXNonUnicode-Bold", "STIXNonUnicode-BoldItalic", "STIXNonUnicode-Italic", "STIXNonUnicode-Regular", "STIXSizeFiveSym-Regular", "STIXSizeFourSym-Bold", "STIXSizeFourSym-Regular", "STIXSizeOneSym-Bold", "STIXSizeOneSym-Regular", "STIXSizeThreeSym-Bold", "STIXSizeThreeSym-Regular", "STIXSizeTwoSym-Bold", "STIXSizeTwoSym-Regular", "STIXVariants-Bold", "STIXVariants-Regular", "STSong", "Sana Regular", "Sathu", "Savoye LET Plain:1.0", "Shree Devanagari 714", "Shree Devanagari 714 Bold", "Shree Devanagari 714 Bold Italic", "Shree Devanagari 714 Italic", "SignPainter-HouseScript", "SignPainter-HouseScript Semibold", "Silom", "Sinhala MN", "Sinhala MN Bold", "Sinhala Sangam MN", "Sinhala Sangam MN Bold", "Skia Black", "Skia Black Condensed", "Skia Black Extended", "Skia Bold", "Skia Condensed", "Skia Extended", "Skia Light", "Skia Light Condensed", "Skia Light Extended", "Skia Regular", "Snell Roundhand", "Snell Roundhand Black", "Snell Roundhand Bold", "Songti SC Black", "Songti SC Bold", "Songti SC Light", "Songti SC Regular", "Songti TC Bold", "Songti TC Light", "Songti TC Regular", "Sukhumvit Set Bold", "Sukhumvit Set Light", "Sukhumvit Set Medium", "Sukhumvit Set Semi Bold", "Sukhumvit Set Text", "Sukhumvit Set Thin", "Symbol", "Tahoma", "Tahoma Bold", "Tamil MN", "Tamil MN Bold", "Tamil Sangam MN", "Tamil Sangam MN Bold", "Telugu MN", "Telugu MN Bold", "Telugu Sangam MN", "Telugu Sangam MN Bold", "Thonburi", "Thonburi Bold", "Thonburi Light", "Times Bold", "Times Bold Italic", "Times Italic", "Times New Roman", "Times New Roman Bold", "Times New Roman Bold Italic", "Times New Roman Italic", "Times Roman", "Trattatello", "Trebuchet MS", "Trebuchet MS Bold", "Trebuchet MS Bold Italic", "Trebuchet MS Italic", "Verdana", "Verdana Bold", "Verdana Bold Italic", "Verdana Italic", "Waseem Light", "Waseem Regular", "Webdings", "Wingdings", "Wingdings 2", "Wingdings 3", "Zapf Dingbats", "Zapfino"]
		};
		
        var fonts = [];
		for (const os of Object.keys(osPlatforms)) {
			if (osPlatforms[os].includes(platform)) {
				fonts = fontsInOs[os];
			}
		}					
		
        fonts.forEach(font => {
	
			var testFont = fontDimensions(font);
			var defFont = defDimensions;
            
            if(testFont[0] !== defFont[0] || testFont[1] !== defFont[1]){
                fontScore++;
            }
        });

        return fontScore;
	}
	
	function errorCheck() {
        var recursiveErr = null;
        var nullErr = null;

		try {
            function foo(){
                foo();
            }

            foo();
        } catch (error) {
            recursiveErr = error.name;
        }

        try{
           null[0]; 
        } catch (error){
            nullErr = error.message;
        }

        return [recursiveErr, nullErr];
	}

    function evalCheck() {
		var evalLength = eval.toString().length;
        var productSub = navigator.productSub;

        return [evalLength.toString(), productSub.toString()];
    }

    function userMediaCheck() {

        if (navigator.userAgent.includes("WebKit")){
            if(typeof navigator.webkitGetUserMedia === "function"){
                return true;
            }
        } else if(typeof navigator.mozGetUserMedia === "function"){
            return true;
        }
        
        return false;
    }
    
    function touchClickCheck() {
        var isTouch = (('ontouchstart' in window) || ('ontouchmove' in window) || (navigator.maxTouchPoints > 0));
        
        var isClick = ('onmousemove' in document || 'onclick' in document); 
        
        return [isTouch, isClick];
    }

    function sensorCheck() {
        var acl = new Accelerometer();
        var gyr = new Gyroscope();

        acl.start();
        isAccel = acl.activated;

        gyr.start();
        isGyro = gyr.activated;

        return [isAccel, isGyro];
    }

    function isTransPixel(arr){
		if(arr.every((val, ind) => val === [0, 0, 0, 0][ind])){
        	return true;
    	}
    	return false;
    }

    function isOrange(arr){

        var orange = [255, 102, 0, 100];
        var res = [];
        for(let i = 0; i < arr.length; i++) {
            const el = Math.abs((orange[i] || 0) - (arr[i] || 0));
            res[i] = el;
        }

        if(arr.every((val, ind) => val === orange[ind]) || res.every((val, ind) => val < [4, 4, 4, 4][ind])){
            return true;
        }
        return false;
    }

    function canvasCheck() {
        body = document.getElementsByTagName("body")[0];
        canv = document.createElement("canvas");
        canv.style.height = "100px";
        canv.style.width = "500px";
		canv.style.border = "1px solid";
        body.appendChild(canv);
        var ctx = canv.getContext("2d");

		ctx.font = "50px Arial";
        ctx.fillText("How quickly daft jumping zebras vex", 30, 80, 250);
		
        var img = ctx.getImageData(0, 0, 500, 100);
        var pixMap = img.data;

        var pixelArr = [];
        for(var i=0; i<pixMap.length; i+=4){
			var pixel = [pixMap[i], pixMap[i+1], pixMap[i+2], pixMap[i+3]];
			pixelArr.push(pixel);
		}
        
        var transPix = 0;
        var nonTransPix = 0;
        var isolatedPix = 0;
        var orangePix = 0;

        for(var i=0; i<pixelArr.length; i++){
	
            var pixel = pixelArr[i];
			
			// Transparent pixel check
			if(isTransPixel(pixel)){
                transPix++;
            } else {
				nonTransPix++;
			}
			
			// Isolated Pixel Check
			if (i > 4 && i < pixelArr.length-4){
				if (!(isTransPixel(pixel)) 
                && isTransPixel(pixelArr[i-1]) && isTransPixel(pixelArr[i-2]) && isTransPixel(pixelArr[i-3]) && isTransPixel(pixelArr[i-4]) 
                && isTransPixel(pixelArr[i+1]) && isTransPixel(pixelArr[i+2]) && isTransPixel(pixelArr[i+3]) && isTransPixel(pixelArr[i+4])) {
                    isolatedPix++;
                }
			}
			
			//Orange Pixel Check
            if (isOrange(pixel)){
                orangePix++;
            }
		}
		
		body.removeChild(canv);

        return [transPix, nonTransPix, isolatedPix, orangePix];
    }     

    function screenDimensionsCheck() {
        const width = screen.width;
        const height = screen.height;
        const availWidth = screen.availWidth;
        const availHeight = screen.availHeight;
        const colorDepth = screen.colorDepth;
        const orientationType = screen.orientation.type;
        const orientationAngle = screen.orientation.angle;

        return [width, height, availWidth, availHeight, colorDepth, orientationType, orientationAngle]
    }

    function webGlCheck() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl')

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

        return [vendor, renderer]
    }   

	function uuidv4() {
		return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		  (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
		);
	}
    
    function sendParams() {
	
		var params = {
			userAgent: userAgent,
			platform: platform,
			errors: errors,
			evals: evals,
			userMedia: userMedia,
			touchClick: touchClick,
			sensors: sensors,
			canvas: canvas,
			width: screenDimensions[0],
			height: screenDimensions[1],
			availWidth: screenDimensions[2],
			availHeight: screenDimensions[3],
			colorDepth: screenDimensions[4],
			orientationType: screenDimensions[5],
			orientationAngle: screenDimensions[6],
			vendor: webGl[0],
			renderer: webGl[1],
			appCodeName: appCodeName,
			appName: appName,
			languages: languages,
			cookieEnabled: cookieEnabled,
			deviceMemory: deviceMemory,
			doNotTrack: doNotTrack,
			braveBrowser: braveBrowser,
			date: date,
			timeZone: timeZone,
			devicePixelRatio: devicePixelRatio,
			hostname: hostname,
			href: href,
			pathname: pathname,
			origin: origin,
		}
	
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/", true);
        
        xhr.onload = function() {
			if(xhr.status == 200 && xhr.readyState == 4){
				console.log("xhr posted...");
			}
		}
          
        xhr.setRequestHeader("Content-Type", "application/json"); 
		var x = new Date().getTime();
		var n = localStorage.getItem("did");
		if(n==null){
			n = uuidv4();
			localStorage.setItem("did", n);
		} 
		var d = href + "\n" + JSON.stringify(params) + "\n" + x + "\n" + n;
		// var s = base64.stringify(hmac(d, base64.stringify(utf8.parse(x))));
		xhr.setRequestHeader("X-df-timestamp", x);
		xhr.setRequestHeader("X-df-uuid", n);
		// xhr.setRequestHeader("X-df-signature", s);
		xhr.setRequestHeader("X-df-headers", ["X-df-timestamp", "X-df-uuid"]);

		xhr.send(JSON.stringify(params))
    }
    sendParams();	

    // document.getElementById('submit').addEventListener('click', function(event){
		// sendParams();
	// })
});