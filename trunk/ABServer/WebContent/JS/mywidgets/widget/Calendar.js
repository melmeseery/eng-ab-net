dojo.provide("mywidgets.widget.Calendar");
dojo.require("dojo.date.common");
dojo.require("dojo.date.format");
dojo.require("dojo.date.serialize");
dojo.require("dojo.widget.*");
dojo.require("dojo.widget.HtmlWidget");
dojo.require("dojo.event.*");
dojo.require("dojo.dom");
dojo.require("dojo.html.style");
dojo.require("dojo.json");
dojo.require("dojo.widget.Menu2");
dojo.require("dojo.dnd.*");
dojo.require("dojo.widget.FloatingPane");
dojo.require("dojo.widget.TimePicker");
dojo.require("dojo.gfx.Colorspace");
dojo.require("dojo.gfx.color.hsv");

/******************change log *************************************************************
 * **** This is the log of changes done to this file . Maha
 *
 * edit change 26-9
 * 1. Added period to edit course list in display and in how
 * many day to click calculation (see function drop and click event )
 * 2. add the interpert the xml from this script not the script.js and general
 * calendar.xml.
 *  3. make save days to courses from calendar. in
 *  4. remove the change event widget.
 *  -------------------------
 *  edit change 08-10 by Maha and
 * noha
 * 1) corrected errror related to retirving the xml see function
 * "getCheckEntry" and "getIntegerEntry"
 *  2) removed the check for "if value
 * changed" from the pre init it made problems when chaning view. The down side
 * of this it will load all event from db. every time the view is refreshed.
 * ------------------------------------------
 * Edit and change made on 9 and 10-oct
 * 1. add the max string length function to shorten the title of course if it
 * is larger than 19 character
 * 2. the secondery color is now the group color generated using function getColorBasedOnGroup based  on the number of runs
 *and their run no. of the current event
 *3. a change on what will be viewed in
 * the event format due to the meeting with eng. hossam on 8-10 see function
 * createColoredDayEvent and createColoredEvent
 * ------------------------------------------------
 * Edit and change on 18 - oct (maha)
 * 1. changed the edit event...
 * ---------------------------------
 * Edit and change on 24 oct (mah )
 * 1. Add the legend using two funciton
 * setCoursesForLegend (to set the values which will be dipslayed. ) a
 * and function  onLegendDisplay to actually display
 * now according to main app, mainname, main color the legend will be displayed
 * an if DisplayLegend == true a legend will be displayed other wise only in multi month view will be
 * displayed.
 * 2. Added two variable to be used in speeding up by only retriveing the current dates
 * the parmeters are firstdayincal, lastdayincal see
 * 	 firstDayInCal: Date(),
	 LastDayInCal:Date(),
* they are computed every  change  in function "UdjustStartEnd"
* 3. correcte the problem with extra event when chanig the veiw
* by deleting all the tool tips and generating them again
* used funciton    ""getElementsByClass" and function "_initToolTip" to delete all tool tip
*
--------------------------------------------------------------------------
* 3-1-2009
* i added this condition
* if (this.calendarType == 'MultiMonth' && EventCount>this.MaxEventPerDay ){
* to the  "onSetCalendarCourseEntries "  line 3111  to remove the rectange that appears on every day
* make it only appear in the multimonth view when the counts of course is larger than that can be viewed on
* a single day (genearly 4).
*
 * 1-2-2009
 ******************************************************************************/

 //maximum length of the string displayed in the event...
  //used in with or in the funciton getSmallerLengthString|
var Max_Length = 20;


function getElementsByClass( searchClass, domNode, tagName) {
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
			el[j++] = tags[i];
	}
	return el;
}

/*****
 * This function takes the group number and produce the crosponding color.
 * For each group number there is a specific color for example
 * for group no. 1 color is light blue.
 *     group no. 2 color is yellow....
 * @param groupno. the number of group
 * @return  string contains the rgb color of the group.
 *
 *
 * **/
function getColorBasedOnGroup(groupno, noOfRuns, color) {

	var c;
	// if (groupno==0)
	// c=new RGBColor("#faebd7"); // this color is
	//
	if (groupno == 1)
		c = new RGBColor("#DC143C"); // crimson
	else if (groupno == 2)
		c = new RGBColor("#FFA500");// orange 1 (orange) #FFA500
	else if (groupno == 3)

		c = new RGBColor("#8470FF");// lightslateblue #8470FF
	else if (groupno == 4)

		c = new RGBColor("#00F5FF");// turquoise 1 #00F5FF
	else if (groupno == 5)

		c = new RGBColor("#00C78C"); // turquoiseblue #00C78C
	else if (groupno == 6)

		c = new RGBColor("#EEDC82");// lightgoldenrod 2 #EEDC82
	else if (groupno == 7)

		c = new RGBColor("#FF3E96");// violetred 1 #FF3E96
	else if (groupno == 8)
		c = new RGBColor("#800000");// maroon* #800000
	else if (groupno == 9)

		c = new RGBColor("#8E388E");// sgi beet #8E388E
	else if (groupno == 10)

		c = new RGBColor("#7171C6");// sgi slateblue #7171C6
	else if (groupno == 11)

		c = new RGBColor("#7D9EC0");// light blue
	else if (groupno == 12)

		c = new RGBColor("#388E8E");// teal
	else if (groupno == 13)

		c = new RGBColor("#71C671");// chartreuse #71C671

	else if (groupno == 14)

		c = new RGBColor("#C67171");// salmon
	else if (groupno == 15)

		c = new RGBColor("#555555");// gray
	else if (groupno == 16)

		c = new RGBColor("#8E8E38");// olivedrab #8E8E38
	else if (groupno == 17)

		c = new RGBColor("#FFF68F");// khaki 1 #FFF68F

	else if (groupno == 18)

		c = new RGBColor("#BCEE68");// darkolivegreen 2 #BCEE68
	else if (groupno == 19)

		c = new RGBColor("#76EEC6");// aquamarine 2 #76EEC6
	else

		c = new RGBColor("#8470FF");// lightslateblue #8470FF

	/*
	 * var c=new RGBColor(color);
	 *
	 * if (c){
	 *  // //  //console.log(" c ok is next "); if (c.ok) { // //  //console.log(c);
	 * //get the c.r , c.g, c.b var arr=[c.r, c.g, c.b];
	 *
	 * var arrTo = {};
	 *  // //  //console.log(" color "+color + " has "+arr) arrTo =
	 * dojo.gfx.color.rgb2hsv(c.r, c.g, c.b,null); //now change in the hue or
	 * the percent=(groupno/noOfRuns) ;
	 *  //   //console.log("getColorBasedOnGroup percent = "+ percent); percent*=255 ;
	 *  //   //console.log("getColorBasedOnGroup 255* percent = "+ percent);
	 * arrTo[1]=percent; //noow i need to get change the value of the
	 * finalRGb=dojo.gfx.color.hsv2rgb(arrTo[0],arrTo[1],arrTo[2]);
	 *
	 * //now format it as in the style //rgb c.r=finalRGb[0]; c.g=finalRGb[1];
	 * c.b=finalRGb[2]; return c.toRGB();
	 *  }
	 *  }
	 */
	return c.toRGB();

}
/*******
 * This function cut down the string in "field" if its length is larger then
 * "max_length"
 * @param
 *   field   any string
 * @param
 *   max_length  maximum length which to truncat the string
 * @return
 *    the truncated string.
 *
 * ******/
function getSmallerLengthString(field, max_length) {

	var newString = "";

	if (field.length > max_length) {

		newString = field.substr(0, max_length);
		newString += "..";
		return newString;
	}
	return field;

}
/*******
 *
 * This function retrieve the  integer value of the "field"
 * from the xml "entry".
 * The function first check if the entry exits and contains values
 * and has fields with valid values.
 * if value exit the function return it other wise it return 0
  *  @param
 *     entry   xml entry to search in it.
 *  @param
 *     field   field to find and retrive
 *   @return
 *     intger value of entry[field]
 *
 *
 * **********/
function getIntegerEntry(entry, field) {

	var value = 0;

	var test = entry.getElementsByTagName(field);
	if (test)
		if (test.length > 0) {
			if (entry.getElementsByTagName(field)[0].firstChild) {
				var valueS = entry.getElementsByTagName(field)[0].firstChild.nodeValue;
				if (valueS != null) {
					var valueI = parseInt(dojo.string.trim(valueS));
					if (valueI)
						return valueI;

				}
			}

		}
	//   //console.log("in elselllllllllllllllllllllllllllllllllllllllll"+field)
	return value;

}
/*******
 *
 * This function retrieve the  string value of the "field"
 * from the xml "entry".
 * The function first check if the entry exits and contains values
 * and has fields with valid values.
 *  if value exit the function return it other wise it return ""
 *  @param
 *     entry   xml entry to search in it.
 *  @param
 *     field   field to find and retrive
 *   @return
 *     string value of entry[field]
 *
 * **********/
function getCheckEntry(entry, field) {
	var test = entry.getElementsByTagName(field);
	 //  //console.log(" value of "+field +" = "+test);
	 //  //console.log(eval (test));
	if (test) {
		if (test.length > 0) {

			//   //console.log(" value of "+field +" = "+test);
			//   //console.log(eval (test));
			if (entry.getElementsByTagName(field)[0].firstChild != null) {

				var value = entry.getElementsByTagName(field)[0].firstChild.nodeValue;

				if (value != null) {
					return dojo.string.trim(value);

				}
			}

		}

	}

	//   //console.log("in elselllllllllllllllllllllllllllllllllllllllll"+field)
	return "";

}
/***
 * thie function checki if the browser is firefox or another browser.
 * ***/
var __isFireFox = navigator.userAgent.match(/gecko/i);
/*
 * function isArray(obj) {
 *
 * ////  //console.log(eval(obj)); ////  //console.log(obj.constructor.toString()); if
 * (obj.constructor.toString().indexOf("Array") == -1) return false; else return
 * true;
 *
 *
 *
 *
 *  }
 */

/**
 * A class to parse color values
 *
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * @link http://www.phpied.com/rgb-color-parser-in-javascript/
 * @license Use it if you like it
 */
function RGBColor(color_string) {

	this.ok = false;

	// strip any leading #
	if (color_string.charAt(0) == '#') { // remove # if any
		color_string = color_string.substr(1, 6);
	}

	color_string = color_string.replace(/ /g, '');
	color_string = color_string.toLowerCase();

	// before getting into regexps, try simple matches
	// and overwrite the input
	var simple_colors = {
		aliceblue :'f0f8ff',
		antiquewhite :'faebd7',
		aqua :'00ffff',
		aquamarine :'7fffd4',
		azure :'f0ffff',
		beige :'f5f5dc',
		bisque :'ffe4c4',
		black :'000000',
		blanchedalmond :'ffebcd',
		blue :'0000ff',
		blueviolet :'8a2be2',
		brown :'a52a2a',
		burlywood :'deb887',
		cadetblue :'5f9ea0',
		chartreuse :'7fff00',
		chocolate :'d2691e',
		coral :'ff7f50',
		cornflowerblue :'6495ed',
		cornsilk :'fff8dc',
		crimson :'dc143c',
		cyan :'00ffff',
		darkblue :'00008b',
		darkcyan :'008b8b',
		darkgoldenrod :'b8860b',
		darkgray :'a9a9a9',
		darkgreen :'006400',
		darkkhaki :'bdb76b',
		darkmagenta :'8b008b',
		darkolivegreen :'556b2f',
		darkorange :'ff8c00',
		darkorchid :'9932cc',
		darkred :'8b0000',
		darksalmon :'e9967a',
		darkseagreen :'8fbc8f',
		darkslateblue :'483d8b',
		darkslategray :'2f4f4f',
		darkturquoise :'00ced1',
		darkviolet :'9400d3',
		deeppink :'ff1493',
		deepskyblue :'00bfff',
		dimgray :'696969',
		dodgerblue :'1e90ff',
		feldspar :'d19275',
		firebrick :'b22222',
		floralwhite :'fffaf0',
		forestgreen :'228b22',
		fuchsia :'ff00ff',
		gainsboro :'dcdcdc',
		ghostwhite :'f8f8ff',
		gold :'ffd700',
		goldenrod :'daa520',
		gray :'808080',
		green :'008000',
		greenyellow :'adff2f',
		honeydew :'f0fff0',
		hotpink :'ff69b4',
		indianred :'cd5c5c',
		indigo :'4b0082',
		ivory :'fffff0',
		khaki :'f0e68c',
		lavender :'e6e6fa',
		lavenderblush :'fff0f5',
		lawngreen :'7cfc00',
		lemonchiffon :'fffacd',
		lightblue :'add8e6',
		lightcoral :'f08080',
		lightcyan :'e0ffff',
		lightgoldenrodyellow :'fafad2',
		lightgrey :'d3d3d3',
		lightgreen :'90ee90',
		lightpink :'ffb6c1',
		lightsalmon :'ffa07a',
		lightseagreen :'20b2aa',
		lightskyblue :'87cefa',
		lightslateblue :'8470ff',
		lightslategray :'778899',
		lightsteelblue :'b0c4de',
		lightyellow :'ffffe0',
		lime :'00ff00',
		limegreen :'32cd32',
		linen :'faf0e6',
		magenta :'ff00ff',
		maroon :'800000',
		mediumaquamarine :'66cdaa',
		mediumblue :'0000cd',
		mediumorchid :'ba55d3',
		mediumpurple :'9370d8',
		mediumseagreen :'3cb371',
		mediumslateblue :'7b68ee',
		mediumspringgreen :'00fa9a',
		mediumturquoise :'48d1cc',
		mediumvioletred :'c71585',
		midnightblue :'191970',
		mintcream :'f5fffa',
		mistyrose :'ffe4e1',
		moccasin :'ffe4b5',
		navajowhite :'ffdead',
		navy :'000080',
		oldlace :'fdf5e6',
		olive :'808000',
		olivedrab :'6b8e23',
		orange :'ffa500',
		orangered :'ff4500',
		orchid :'da70d6',
		palegoldenrod :'eee8aa',
		palegreen :'98fb98',
		paleturquoise :'afeeee',
		palevioletred :'d87093',
		papayawhip :'ffefd5',
		peachpuff :'ffdab9',
		peru :'cd853f',
		pink :'ffc0cb',
		plum :'dda0dd',
		powderblue :'b0e0e6',
		purple :'800080',
		red :'ff0000',
		rosybrown :'bc8f8f',
		royalblue :'4169e1',
		saddlebrown :'8b4513',
		salmon :'fa8072',
		sandybrown :'f4a460',
		seagreen :'2e8b57',
		seashell :'fff5ee',
		sienna :'a0522d',
		silver :'c0c0c0',
		skyblue :'87ceeb',
		slateblue :'6a5acd',
		slategray :'708090',
		snow :'fffafa',
		springgreen :'00ff7f',
		steelblue :'4682b4',
		tan :'d2b48c',
		teal :'008080',
		thistle :'d8bfd8',
		tomato :'ff6347',
		turquoise :'40e0d0',
		violet :'ee82ee',
		violetred :'d02090',
		wheat :'f5deb3',
		white :'ffffff',
		whitesmoke :'f5f5f5',
		yellow :'ffff00',
		yellowgreen :'9acd32'
	};
	for ( var key in simple_colors) {
		if (color_string == key) {
			color_string = simple_colors[key];
		}
	}

	// emd of simple type-in colors

	// array of color definition objects
	var color_defs = [
			{
				re :/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
				example : [ 'rgb(123, 234, 45)', 'rgb(255,234,245)' ],
				process : function(bits) {
					return [ parseInt(bits[1]), parseInt(bits[2]),
							parseInt(bits[3]) ];
				}
			},
			{
				re :/^(\w{2})(\w{2})(\w{2})$/,
				example : [ '#00ff00', '336699' ],
				process : function(bits) {
					return [ parseInt(bits[1], 16), parseInt(bits[2], 16),
							parseInt(bits[3], 16) ];
				}
			},
			{
				re :/^(\w{1})(\w{1})(\w{1})$/,
				example : [ '#fb0', 'f0f' ],
				process : function(bits) {
					return [ parseInt(bits[1] + bits[1], 16),
							parseInt(bits[2] + bits[2], 16),
							parseInt(bits[3] + bits[3], 16) ];
				}
			} ];

	// search through the definitions to find a match
	for ( var i = 0; i < color_defs.length; i++) {
		var re = color_defs[i].re;
		var processor = color_defs[i].process;
		var bits = re.exec(color_string);
		if (bits) {
			channels = processor(bits);
			this.r = channels[0];
			this.g = channels[1];
			this.b = channels[2];
			this.ok = true;
		}

	}

	// validate/cleanup values
	this.r = (this.r < 0 || isNaN(this.r)) ? 0
			: ((this.r > 255) ? 255 : this.r);
	this.g = (this.g < 0 || isNaN(this.g)) ? 0
			: ((this.g > 255) ? 255 : this.g);
	this.b = (this.b < 0 || isNaN(this.b)) ? 0
			: ((this.b > 255) ? 255 : this.b);

	// some getters
	this.toRGB = function() {
		return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
	}
	this.toHex = function() {
		var r = this.r.toString(16);
		var g = this.g.toString(16);
		var b = this.b.toString(16);
		if (r.length == 1)
			r = '0' + r;
		if (g.length == 1)
			g = '0' + g;
		if (b.length == 1)
			b = '0' + b;
		return '#' + r + g + b;
	}

	// help
	this.getHelpXML = function() {

		var examples = new Array();
		// add regexps
		for ( var i = 0; i < color_defs.length; i++) {
			var example = color_defs[i].example;
			for ( var j = 0; j < example.length; j++) {
				examples[examples.length] = example[j];
			}
		}
		// add type-in colors
		for ( var sc in simple_colors) {
			examples[examples.length] = sc;
		}

		var xml = document.createElement('ul');
		xml.setAttribute('id', 'rgbcolor-examples');
		for ( var i = 0; i < examples.length; i++) {
			try {
				var list_item = document.createElement('li');
				var list_color = new RGBColor(examples[i]);
				var example_div = document.createElement('div');
				example_div.style.cssText = 'margin: 3px; '
						+ 'border: 1px solid black; ' + 'background:'
						+ list_color.toHex() + '; ' + 'color:'
						+ list_color.toHex();
				example_div.appendChild(document.createTextNode('test'));
				var list_item_value = document.createTextNode(' ' + examples[i]
						+ ' -> ' + list_color.toRGB() + ' -> '
						+ list_color.toHex());
				list_item.appendChild(example_div);
				list_item.appendChild(list_item_value);
				xml.appendChild(list_item);

			} catch (e) {
			}
		}
		return xml;

	}

}

/**
 * Converts an RGB color value to HSL. Conversion formula adapted from
 * http://en.wikipedia.org/wiki/HSL_color_space. Assumes r, g, and b are
 * contained in the set [0, 255] and returns h, s, and l in the set [0, 1].
 *
 * @param {Number}
 *            r The red color value
 * @param {Number}
 *            g The green color value
 * @param {Number}
 *            b The blue color value
 * @return {Array} The HSL representation
 */
var rgbToHsl = function(r, g, b) {
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
		case r:
			h = (g - b) / d + (g < b ? 6 : 0);
			break;
		case g:
			h = (b - r) / d + 2;
			break;
		case b:
			h = (r - g) / d + 4;
			break;
		}
		h /= 6;
	}

	return [ h, s, l ];
};

/**
 * Converts an HSL color value to RGB. Conversion formula adapted from
 * http://en.wikipedia.org/wiki/HSL_color_space. Assumes h, s, and l are
 * contained in the set [0, 1] and returns r, g, and b in the set [0, 255].
 *
 * @param {Number}
 *            h The hue
 * @param {Number}
 *            s The saturation
 * @param {Number}
 *            l The lightness
 * @return {Array} The RGB representation
 */
var hslToRgb = function(h, s, l) {
	var r, g, b;

	if (s == 0) {
		r = g = b = l; // achromatic
	} else {
		function hue2rgb(p, q, t) {
			if (t < 0)
				t += 1;
			if (t > 1)
				t -= 1;
			if (t < 1 / 6)
				return p + (q - p) * 6 * t;
			if (t < 1 / 2)
				return q;
			if (t < 2 / 3)
				return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		}
		;

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return [ r * 255, g * 255, b * 255 ];
};

/**
 * Converts an RGB color value to HSV. Conversion formula adapted from
 * http://en.wikipedia.org/wiki/HSV_color_space. Assumes r, g, and b are
 * contained in the set [0, 255] and returns h, s, and v in the set [0, 1].
 *
 * @param {Number}
 *            r The red color value
 * @param {Number}
 *            g The green color value
 * @param {Number}
 *            b The blue color value
 * @return {Array} The HSV representation
 */
var rgbToHsv = function(r, g, b) {
	r = r / 255;
	g = g / 255;
	b = b / 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, v = max;

	var d = max - min;
	s = max == 0 ? 0 : d / max;

	if (max == min) {
		h = 0; // achromatic
	} else {
		switch (max) {

		case r:
			h = (g - b) / d + (g < b ? 6 : 0);
			break;
		case g:
			h = (b - r) / d + 2;

			break;
		case b:
			h = (r - g) / d + 4;
			break;
		}
		h /= 6;
	}

	return [ h, s, v ];
};

/**
 * Converts an HSV color value to RGB. Conversion formula adapted from
 * http://en.wikipedia.org/wiki/HSV_color_space. Assumes h, s, and v are
 * contained in the set [0, 1] and returns r, g, and b in the set [0, 255].
 *
 * @param {Number}
 *            h The hue
 * @param {Number}
 *            s The saturation
 * @param {Number}
 *            v The value
 * @return {Array} The RGB representation
 */
var hsvToRgb = function(h, s, v) {
	var r, g, b;

	var i = Math.floor(h * 6);
	var f = h * 6 - i;
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);

	switch (i) {
	case 0:
		r = v, g = t, b = p;
		break;
	case 1:
		r = q, g = v, b = p;
		break;
	case 2:
		r = p, g = v, b = t;
		break;
	case 3:
		r = p, g = q, b = v;
		break;
	case 4:
		r = t, g = p, b = v;
		break;
	case 5:
		r = v, g = p, b = q;
		break;
	}

	return [ r * 255, g * 255, b * 255 ];
};


// dojo.gfx.color.extractRGB
// RGB_to_HSV
// RGB_to_HSL
// dojo.gfx.Colorspace.prototype.

// IE:
// style = element.currentStyle.backgroundColor;
//
// MOZ:
// style = document.defaultView.getComputedStyle(element,
// '').getPropertyValue("backgroundColor");
/*******************************************************************************
 * this function check if a color is dark or ligth
 * @param
 *  color  input color of backgroud to check if dark
 *
 ******************************************************************************/
function isDarkColor(color) {

	// //console.log (" in the color of the "+color);
	var c = new RGBColor(color);
	// //  //console.log(c);

	if (c) {

		// //  //console.log(" c ok is next ");
		if (c.ok) {
			// //  //console.log(c);
			// get the c.r , c.g, c.b
			var arr = [ c.r, c.g, c.b ];

			var arrTo = {};

			// //  //console.log(" color "+color + " has "+arr)
			arrTo = dojo.gfx.color.rgb2hsv(c.r, c.g, c.b, null);
			// arrTo = rgbToHsl(c.r, c.g, c.b);
			// arrTo = rgbToHsl(c.r, c.g, c.b);

			// //  //console.log(" arrTo "+arrTo);
			if (arrTo) {
				h = arrTo[0];
				s = arrTo[1];
				v = arrTo[2];
				if (v < 100) {
					return true;

				}// if v

			}// if arr to
			//

		}// if c.ok
	}// if c
	return false;
}

function isArray(testObject) {

	return testObject && !(testObject.propertyIsEnumerable('length'))
			&& typeof testObject === 'object'
			&& typeof testObject.length === 'number';
}
function isCourse(obj) {

	return true;

}
function sortDate(A,B){

return	dojo.date.compare(A,B,dojo.date.compareTypes.DATE);

}
function SortDateArray(/*Array*/ dates){


	//  //console.log("[(line 808)SortDateArray  calendar .js ]Sorting the arrays of dates ")
	dateArray=new Array();
	k=0;
	for(var i=0;i<dates.length;i++){
		if (dates[i]){
		   dateArray[k]=dojo.date.fromRfc3339(dates[i]);
		   k++;
		}


	}

	dateArray.sort(sortDate);

		//  //console.log("[(line 808)SortDateArray  calendar .js ]After sorting dates ")


	for( i=0;i<dateArray.length;i++){

		dates[i]=dojo.date.toRfc3339(dateArray[i]);



	}
	return dates;


}



function getMaxMonthDayCount(/* Date */dateObject,/* integer */n) {

	var maxmonth = 28;
	var tempmonth = 0;

	for ( var i = 0; i < n; i++) {
		tempdate = dojo.date.add(dateObject, dojo.date.dateParts.MONTH, i);

		tempmonth = dojo.date.getDaysInMonth(tempdate);

		if (maxmonth < tempmonth) {

			maxmonth = tempmonth;
		}

	}

	return maxmonth;

}
function getFirstDayInMonth(/* Date */dateObject) {

	var newDate = new Date(dateObject.getFullYear(), dateObject.getMonth(), 1);

	return newDate;

}

function toggle(el) {

	if (el.style.display != 'none') {
		el.style.display = 'none';
	} else {
		el.style.display = '';
	}
}
// returns the absolute position of some element within document
function GetElementAbsolutePos(element) {
	var res = new Object();
	res.x = 0;
	res.y = 0;
	if (element !== null) {
		res.x = element.offsetLeft;
		res.y = element.offsetTop;

		var offsetParent = element.offsetParent;
		var parentNode = element.parentNode;

		while (offsetParent !== null) {
			res.x += offsetParent.offsetLeft;
			res.y += offsetParent.offsetTop;

			if (offsetParent != document.body
					&& offsetParent != document.documentElement) {
				res.x -= offsetParent.scrollLeft;
				res.y -= offsetParent.scrollTop;
			}
			// next lines are necessary to support FireFox problem with
			// offsetParent
			if (__isFireFox) {
				while (offsetParent != parentNode && parentNode !== null) {
					res.x -= parentNode.scrollLeft;
					res.y -= parentNode.scrollTop;

					parentNode = parentNode.parentNode;
				}
			}
			parentNode = offsetParent.parentNode;
			offsetParent = offsetParent.offsetParent;
		}
	}
	return res;
}
dojo.widget
		.defineWidget(
				"mywidgets.widget.Calendar",
				dojo.widget.HtmlWidget,
				{
					// value: String|Date
					// value property of displayed date
					value :"",
					// calendarType: String
					// which type of calendar to render first. month, week or
					// day or MultiMonth
					calendarType :'MultiMonth',// 'MultiMonth',//'month',
					// m_WeekStartsOn: Integer
					// adjusts the first day of the week in month display
					// 0==Sunday..6==Saturday

					MultiMonthCount :4,

					// m_WeekStartsOn: Integer
					// adjusts the first day of the week in month display
					// 0==Sunday..6==Saturday|
					m_WeekStartsOn :6,
					// w_WeekStartsOn: Integer
					// adjusts the first day of the week in week display
					// 0==Sunday..6==Saturday
					w_WeekStartsOn :6,
					// ShowWeekNo: Bolean
					// if we should use week numbers on week display
					ShowWeekNo :true,
					// selectedtimezone: Object
					// Timezone used. See mywidgets.widget.Timezones
					selectedtimezone :"",
					// timezones: Array
					// Array of all timezones. See mywidgets.widget.Timezones
					timezones :"",

					// eventtypes: Object
					// The different types of events with title and src url.
					eventtypes : {
						meeting : {
							title :"Meeting",
							src :dojo.uri
									.dojoUri("../mywidgets/widget/templates/calimages/meeting.gif")
						},
						reminder : {
							title :"Reminder",
							src :dojo.uri
									.dojoUri("../mywidgets/widget/templates/calimages/reminder.gif")
						},
						appointment : {
							title :"Appointment",
							src :dojo.uri
									.dojoUri("../mywidgets/widget/templates/calimages/appointment.gif")
						}
					},

					calendarEvents : {},
					// /maximum number of events to be displayed in each day
					// this value change based on the type of calendar week 5,
					// month 3, multimont 4,
					MaxEventPerDay :4,
					//
					//changeEventTimes :true,
					createNewEntries :false,

					isValueChanged :true,

					DragObject :"",
					DropObject :"",

					templatePath :dojo.uri
							.dojoUri("../mywidgets/widget/templates/Calendar.html"),
					templateCssPath :dojo.uri
							.dojoUri("../mywidgets/widget/templates/Calendar.css"),

					//DropActive :false,

					// this variables are added by maha
					// UserMessage :String
					// ---------------------------------
					// message displayed to the user to inform him of what is
					// being done.
					UserMessage :"",
					// calendarCourseEvents : array of course objects
					// carry the courses and its event => for display
					calendarCourseEvents : {},
					// WeeklyHoliday : array of integers
					// which day are holiday in weeks (day of the week in month
					// display 0==Sunday..6==Saturday)
					WeeklyHoliday :null,

					// ----------------------------------
					// ChooseDaysEnable: boolean
					// let the user click on day to enble choosing of it
					// mainly add the click event to the day ...
					//ChooseDaysEnable :true,
					// EidtMode : boolean
					// edit or view calendar mode
					//EidtMode :true,
					EditMode:true,
					// calendarChoose : array of days
					// the selected days that the user choose in edit mode
					calendarChoose : {},

					// addCourse: boolean
					// enble the add of course in the
					addCourses :true,
					// CoursesList: array of courses
					// list of empty course to add days to it. (edit mode only )
					CoursesList :null,
					// true if there is a course that is currently with a click state
					// used to keep the state of the coures if either click or unclicked.
					courseClickOn :false,
					// current course to edit
					CurrentCourse :null,
					// the course id to edit
					CurrentCourseID :-2,
					// current selected days
					clicks :null,
					// number fo selected days
					clickcount :0,
					// Maximum number of click user can click in this course
					MaxClickCount :7,
					//@deprecated
					clickEvent :0,
					// you can edit days of the course or no
					// true when the user is currenlty editing a course
					// if (true) ==> user can click on days to add to "clicks"
					//             the save button is displayed.
					//               user can click on the save button
					//
					// false when user is in ready state. user cannot choose a day for a course.
					//
					//
					clickEventEnable :false,

					// --------------Resource and holiday events
					// ResourceCal: Ical of resource or the list of event s
					ResourcesCal : {},
					// DisplayResource: boolean to display resource
					DisplayResource :true,
					// is resource data avaliable or assume all free
					isResourceAvaliable :true,
					// current resource data
					CurrentResource : {},
					// / the list of ical holiday or list of dataes
					HolidayEntries : {},
                   //flag to display and hide holidays.
					DisplayHoliday :true,
                    // the message and infor displayed when the calendar is in ready state.
					WelcomeMessage :"",
					filterMessage :"",
					// displaylegend boolean
					//flag to enable display of legend.
					DisplayLegend:true,

					//flag on the current color mode
					//CurrentColorMode:"Courses",// (resource,course,funding, coordinator�..)
					CurrentColorMode:"Clients",// (resource,course,funding, coordinator�..)

					LegendTitle:"Clients",
					LegendList:{},
					List:{},
					Title:"",
					LegendMainList:{},
					LegendMainTitle:"Courses",  //Coordinators , Resources
					UseMainLegend:true,

					 firstDayInCal: Date(),
					 LastDayInCal:Date(),
					 ConflictEntries:{},
					 ConflictStatus:false,
				TotalConflicts:0,
                  ConflictsDaysCount:0,


                  CheckHolidays:false,


					/**
					 * *** ***************** after mixing properties - like init
					 * for the widget *************************************
					 */

					postMixInProperties : function() {
						mywidgets.widget.Calendar.superclass.postMixInProperties
								.apply(this, arguments);
					//   //console.log(" [line 239 (postMixInProperties)] === in function postMixInProperties");
						if (!this.m_WeekStartsOn) {
							this.m_WeekStartsOn = dojo.date
									.getFirstDayOfWeek(this.lang);
						}

						// Localized month names in the template
						// if we dont use unnest, we risk modifying the array
						// inside of dojo.date and screwing up other calendars
						// on the page
						this.monthLabels = dojo.lang.unnest(dojo.date.getNames(
								'months', 'wide', 'standAlone', this.lang));

						// Localized day names in the template
						// if we dont use unnest, we risk modifying the array
						// inside of dojo.date and screwing up other calendars
						// on the page
						var m_DayLabels = dojo.lang.unnest(dojo.date.getNames(
								'days', 'wide', 'standAlone', this.lang));
						if (this.m_WeekStartsOn > 0) {
							// adjust dayLabels for different first day of week.
							// ie: Monday or Thursday instead of Sunday
							for ( var i = 0; i < this.m_WeekStartsOn; i++) {
								m_DayLabels.push(m_DayLabels.shift());
							}
						}
						this.WelcomeMessage = "Welcome........";
						// this.addCourses=true;
						this.m_DayLabels = m_DayLabels;

						this.today = new Date();
					},
					/**
					 * *** ***************** called just after template is
					 * filled after load *************************************
					 */
					fillInTemplate : function(args, frag) {
						mywidgets.widget.Calendar.superclass.fillInTemplate
								.apply(this, arguments);
						// Copy style info from input node to output node
						var source = this.getFragNodeRef(frag);
						dojo.html.copyStyle(this.domNode, source);

						if (this.WeeklyHoliday == null) {
							// changes done by maha for holiday display
							// 0 saturday --6 friday
							this.WeeklyHoliday = new Array(1);
							this.WeeklyHoliday[0] = 5;// friday
							// this.WeeklyHoliday[1]=6;//saturday
						}
						// //  //console.log(this.WeeklyHoldiay);
						this._preInitUI(this.today);
					},

					/**
					 * *** ***************** this is init when day , view is
					 * changed *************************************
					 */
					// redraw all the view gain with the new data
					_preInitUI : function(dateObj) {
					//  //console.log(" [line 1098 (_preInitUI) calendar.js] === first in pre init ui. ...........");
						dojo.dom.removeChildren(this.calendarHeadNode);
						dojo.dom.removeChildren(this.calendarBodyNode);
						dojo.dom.removeChildren(this.calendarFootNode);
						dojo.dom.removeChildren(this.UserMessageNode);
						dojo.dom.removeChildren(this.LegendNode);
						this._initToolTip();
						//   //console.log("calendar removeeeeeeed ");
						// if these calendar is in edit mode and has a courses
						// view
						// remove childeren to clear its view.
						if (this.addCourses&&this.EditMode) {

							dojo.dom.removeChildren(this.CoursesHeadNode);
							dojo.dom.removeChildren(this.CoursesBodyNode);

						}
						// //  //console.log(" value. ...........");

						// set the current values of data
						this.value = new Date(dateObj);
						this.firstDay = this._initFirstDay(dateObj);
						this.UdjustStartEnd();
						// set the labels
						this._setLabels();
					//  //console.log(" [line 1121 (_preInitUI) calendar.js] === before calendar init ...........");

						//UdjustStartEnd
						// / init the calendar it self.
						if (this.calendarType == 'month') {

							this._initMonthUI();
						} else if (this.calendarType == 'week') {

							this._initWeekUI();
						} else if (this.calendarType == 'day') {

							this._initDayUI();
						} else if (this.calendarType == 'MultiMonth') {

							this._initMultiUI();

						}

                   //    	  //console.log(" [line 1141 (_preInitUI) calendar.js] === after calendar init ...........");

						this.setMaxDisplayPerDay();

                 //    //console.log(" [line 1144 (_preInitUI) calendar.js] === getting udata  ...........");

						// if (this.isValueChanged){
						this.onValueChanged(new Date(dateObj));

					//	  //console.log(" [line 1149 (_preInitUI) calendar.js] === after the data...........");


						// }else
						// {
						// this.onViewNotChanged( );
						// }

						// //  //console.log(" in the pre min ");
						if (this.addCourses&&this.EditMode) {
					///	  //console.log(" [line 1098 (_preInitUI) calendar.js] === after calendar init ...........");

							// //  //console.log(" try to get coureses ");
							// this._iniCourseUIDiv();
							this._initCourseUIDiv_Rows();
							this.EnableSaveButton(this.clickEventEnable);
						}

						// this.onCoursesChanged();
						this.updateUserMessage(this.WelcomeMessage);
						// onCalenderChoose();
					},
					_initToolTip:function (){
					//	  //console.log(" [line 1098 (_initToolTip) calendar.js] === REmove all toool tipppppppppppssssssssssss");


					tooltips=getElementsByClass("dojoTooltip",document,"div");

					if (	tooltips!=null){
					for (i=0;i<tooltips.length;i++){
						//dojo.dom.removeChildren(tooltips[i]);
						tooltips[i].parentNode.removeChild(tooltips[i]);
					}


					}
						//  //console.log("finishedd............");
					},
					/**
					 * *** ***************** INIT Multi Month view
					 * *************************************
					 */
					/***********************************************************
					 * changed on 26-9 by maha to add make the day label
					 * constant as in do not move firday and sunday arround.
					 *
					 *
					 */
					_initMultiUI : function() {

						var nextDate = new Date(this.firstDay);

						// var currentday=nextDate;
						var today = new Date();

						this.curMonth = new Date(nextDate);

						// this.curMonth.setDate(nextDate.getDate()+6); //first
						// saturday gives us the current Month
						// this.curMonth.setDate(1);
						var displayMonths = this.MultiMonthCount;
						var oLabelsTR = this.calendarHeadNode.insertRow(-1);
						var oLabelsTD;

						// /\
						var maxDays = 30;

						// ////  //console.log("[line 386 (_initMultiUI)] ==next
						// date "+nextDate );
						// ////  //console.log( getFirstDayInMonth(nextDate) );
						nextDate = new Date(getFirstDayInMonth(nextDate));
						maxDays = getMaxMonthDayCount(nextDate, displayMonths);
						var nextDateForLabels = new Date(nextDate);
						// LabeslDays=dojo.date.getDayShortName( nextDate );

						var labelsDays = Array(maxDays + 1 + 7);

						for ( var i = 0; i < (maxDays + 1 + 7); i++) {

							oLabelsTD = oLabelsTR.insertCell(-1);
							if (i == 0) {
								oLabelsTD.innerHTML = "Month";

							} else {
								oLabelsTD.innerHTML = dojo.date
										.getDayShortName(nextDateForLabels);

								nextDateForLabels = dojo.date.add(
										nextDateForLabels,
										dojo.date.dateParts.DAY, 1);
							}

							labelsDays[i] = oLabelsTD.innerHTML;
						}// for
						var oTR, oTD, oDateDiv, oItemDiv;

						// for the month get this month

						// Labels= getLabelOfNextMonths(nextDate ,
						// displayMonths);
						// for each month in the view do the follwing
						for ( var j = 0; j < displayMonths; j++) {
							// create a new row to carray all month days
							oTR = this.calendarBodyNode.insertRow(-1);
							oTR.valign = 'top';
							oTD = oTR.insertCell(-1);

							// add a td to display the label of the month
							oTD.innerHTML = dojo.date.getMonthShortName(
									nextDate, this.lang);

							// dojo.date.getMonthShortName()
							// get the number of days in this month
							monthDays = dojo.date.getDaysInMonth(nextDate);
							// get the object of the first day.
							nextDay = nextDate;
							// used to check that the month days starts
							// in days same as label.
							labelindex = 0;

							// / for each day in the month do
							for ( var d = 0; d < monthDays; d++) {

								labelindex++;
								// see if this is same day as the label day.
								dayname = dojo.date.getDayShortName(nextDay);
								labeldayname = labelsDays[labelindex];

								if (dayname.match(labeldayname) == null) {
									// create a td that will carry all elements.
									oTD = oTR.insertCell(-1);
									// / the main class for the day in multiview
									currentClassName = "OtherMonthMulti";

									// set the class name of the day.
									dojo.html.setClass(oTD, currentClassName);
									d--;   // still in day...

									continue;
								} // if label not match

								// create a td that will carry all elements.
								oTD = oTR.insertCell(-1);
								// / the main class for the day in multiview
								currentClassName = "MultiView";

								// If day == today add the class to display
								// today with a different color.
								if (dojo.date.compare(today, nextDay,
										dojo.date.compareTypes.DATE) == 0) {
									currentClassName += " currentDate"
									// dojo.html.setClass(oTD,ClassName);
								}
								// if the day is holiday
								var flagholiday = false;
								// ////  //console.log("[line 442(_initMultiUI)]
								// ==next date "+nextDay +" id = "+d);
								var day = nextDay.getDay();
								// ////  //console.log("[line 444 (_initMultiUI)]
								// ==next date "+day );
								for ( var indexi = 0; indexi < this.WeeklyHoliday.length; indexi++) {

									if (this.WeeklyHoliday[indexi] == day) {
										// ////  //console.log("day "+day+" is a
										// holiday ")
										flagholiday = true;
										break;
									}

								}
								if (flagholiday == true) {
									currentClassName = currentClassName + " "
											+ "weekDay";

								}

								// set the class name of the day.
								dojo.html.setClass(oTD, currentClassName);

								// add the attribute and id
								oTD.setAttribute("Day", dojo.date.toRfc3339(
										nextDay, "dateOnly"));
								oTD.id = "Day_"
										+ dojo.date.toRfc3339(nextDay,
												"dateOnly");

								// create div to carry the number and name of
								// day.
								// //(number 1-31) name (sun, mon...)
								oDateDiv = document.createElement("div");
								// set the class of the div
								dojo.html.setClass(oDateDiv, "MonthDay");
								oDateDiv.setAttribute("date", dojo.date
										.toRfc3339(nextDay, "dateOnly"));
								dojo.event.connect(oDateDiv, "onclick", this,
										"onDateClicked");
								// now get the number and name of day.
								oDateDiv.innerHTML = nextDay.getDate();// + "
																		// "+dojo.date.getDayShortName(
																		// nextDay
																		// );
								// ////  //console.log(eval(oDateDiv));
								// add the div to the day td.
								oTD.appendChild(oDateDiv);
								// create the div that will carry the items
								var oItemDiv = document.createElement("div");
								dojo.html.setClass(oItemDiv, "calendarItems");
								var oUL = document.createElement("ul");
								oUL.id = dojo.date.toRfc3339(nextDay,
										"dateOnly");
								// now the items itself
								dojo.html.setClass(oUL, "listItems");
								oItemDiv.appendChild(oUL);

								// enable the drag for courses and events
								// ////  //console.log(" [line 499 (_initMultiUI)]
								// == i am creating the drag list dates fro the
								// daty "+nextDate);
								var dt = new dojo.dnd.HtmlDropTarget(oUL,
										[ "dragListDates" ]);
								var dt2 = new dojo.dnd.HtmlDropTarget(oUL,
										[ "dragListCoures" ]);

								dojo.event
										.connect(
												dt,
												"onDrop",
												this,
												dojo.widget.byId(this.widgetId)._dropFunction);
								dojo.event
										.connect(
												dt2,
												"onDrop",
												this,
												dojo.widget.byId(this.widgetId)._dropCourseFunction);

								oTD.appendChild(oItemDiv);

								// dojo.event.connect(oDateDiv, "ondblclick",
								// this, "OnClickDate");
								// oDateDiv.setAttribute("Day",
								// dojo.date.toRfc3339(nextDate,"dateOnly"));
								if (this.EditMode) {
									dojo.event.connect(oItemDiv, "ondblclick",
											this, "OnClickDate");
									oItemDiv.setAttribute("Day", dojo.date
											.toRfc3339(nextDay, "dateOnly"));
									oUL.setAttribute("Day", dojo.date
											.toRfc3339(nextDay, "dateOnly"));
									dojo.event.connect(oUL, "ondblclick", this,
											"OnClickDate");
								}

								// go the next day.
								nextDay = dojo.date.add(nextDay,
										dojo.date.dateParts.DAY, 1);

							}/// for d  (days in month...)

							nextDate = dojo.date.add(nextDate,
									dojo.date.dateParts.MONTH, 1);

						}

					},

					/**
					 * *** ***************** INIT Month view
					 * *************************************
					 */
					// ////////////////////finish course courses
					_initMonthUI : function() {
						var nextDate = new Date(this.firstDay);
						this.curMonth = new Date(nextDate);
						this.curMonth.setDate(nextDate.getDate() + 6); // first
																		// saturday
																		// gives
																		// us
																		// the
																		// current
																		// Month
						this.curMonth.setDate(1);
						var displayWeeks = Math.ceil((dojo.date
								.getDaysInMonth(this.curMonth) + this
								._getAdjustedDay(this.curMonth,
										this.m_WeekStartsOn)) / 7);
						var oLabelsTR = this.calendarHeadNode.insertRow(-1);
						var oLabelsTD;
						for ( var i = 0; i < 7; i++) {
							oLabelsTD = oLabelsTR.insertCell(-1);
							oLabelsTD.innerHTML = this.m_DayLabels[i];
						}

						var oTR, oTD, oDateDiv, oItemDiv;
						for ( var week = 0; week < displayWeeks; week++) {
							oTR = this.calendarBodyNode.insertRow(-1);
							oTR.valign = 'top';
							for ( var day = 0; day < 7; ++day) {
								oTD = oTR.insertCell(-1);
								var currentClassName = (nextDate.getMonth() < this.value
										.getMonth()) ? 'otherMonth'
										: (nextDate.getMonth() == this.value
												.getMonth()) ? 'currentMonth'
												: 'otherMonth';
								if (dojo.date.toRfc3339(nextDate, 'dateOnly') == dojo.date
										.toRfc3339(this.today, 'dateOnly')) {
									currentClassName = currentClassName + " "
											+ "currentDate";

								}
								var flagholiday = false;
								var dday = nextDate.getDay();
								// ////  //console.log(" day "+day);
								// changes done by maha to add the click of
								// choose
								for ( var indexi = 0; indexi < this.WeeklyHoliday.length; indexi++) {

									// ////  //console.log(" holiday =
									// "+this.WeeklyHoliday[indexi] );
									if (this.WeeklyHoliday[indexi] == dday) {
										// ////  //console.log("day "+day+" is a
										// holiday ")
										flagholiday = true;
										break;
									}

								}

								if (flagholiday == true) {
									currentClassName = currentClassName + " "
											+ "weekDay";

								}

								dojo.html.setClass(oTD, currentClassName);
								oTD.setAttribute("Day", dojo.date.toRfc3339(
										nextDate, "dateOnly"));
								oTD.id = "Day_"
										+ dojo.date.toRfc3339(nextDate,
												"dateOnly");
								// if (flagholiday==false){
								if (this.EditMode) {
									dojo.event.connect(oTD, "ondblclick", this,
											"OnClickDate");
								}
								// }

								// ////  //console.log(eval(oTD));
								// changes done by maha
								/*
								 * oDayDate=document.createElement("div");
								 * dojo.html.setClass(oDayDate, "DayDate");
								 * oDayDate.setAttribute("date",
								 * dojo.date.toRfc3339(nextDate,"dateOnly"));
								 * dojo.event.connect(oDayDate, "onclick", this,
								 * "onDateClicked");
								 */

								oDateDiv = document.createElement("div");
								dojo.html.setClass(oDateDiv, "clickDate");
								oDateDiv.setAttribute("date", dojo.date
										.toRfc3339(nextDate, "dateOnly"));
								// onDateClicked
								// dojo.event.connect(oDateDiv, "onclick", this,
								// "onDateDoubleClicked");
								dojo.event.connect(oDateDiv, "onclick", this,
										"onDateClicked");
								// dojo.event.connect(oDateDiv,"onmouseover",this,"onDateHover");
								oDateDiv.innerHTML = nextDate.getDate();
								// ////  //console.log(eval(oDateDiv));
								oTD.appendChild(oDateDiv);

								oItemDiv = document.createElement("div");
								dojo.html.setClass(oItemDiv,
										"calendarItemsMonth");
								var oUL = document.createElement("ul");
								oUL.id = dojo.date.toRfc3339(nextDate,
										"dateOnly");
								dojo.html.setClass(oUL, "listItems");
								oItemDiv.appendChild(oUL);
								// ////  //console.log(" [line 373 (_initMonthUI)]
								// == i am creating the drag list dates fro the
								// daty "+nextDate);
								var dt = new dojo.dnd.HtmlDropTarget(oUL,
										[ "dragListDates" ]);
								var dt2 = new dojo.dnd.HtmlDropTarget(oUL,
										[ "dragListCoures" ]);

								dojo.event
										.connect(
												dt,
												"onDrop",
												this,
												dojo.widget.byId(this.widgetId)._dropFunction);
								// var dt2= new dojo.dnd.HtmlDropTarget(oUL,
								// ["dragListCoures"]);
								dojo.event
										.connect(
												dt2,
												"onDrop",
												this,
												dojo.widget.byId(this.widgetId)._dropCourseFunction);

								oTD.appendChild(oItemDiv);

								// dojo.event.connect(oDateDiv, "ondblclick",
								// this, "OnClickDate");
								// oDateDiv.setAttribute("Day",
								// dojo.date.toRfc3339(nextDate,"dateOnly"));
								if (this.EditMode) {
									dojo.event.connect(oItemDiv, "ondblclick",
											this, "OnClickDate");
									oItemDiv.setAttribute("Day", dojo.date
											.toRfc3339(nextDate, "dateOnly"));
									oUL.setAttribute("Day", dojo.date
											.toRfc3339(nextDate, "dateOnly"));
									dojo.event.connect(oUL, "ondblclick", this,
											"OnClickDate");
								}
								// ////  //console.log(" line 390 calendar == otd
								// inner htmls "+ oTD.innerHTML)
								// oTD.appendChild(oDayDate);

								nextDate = dojo.date.add(nextDate,
										dojo.date.dateParts.DAY, 1);
							}
						}

						// /this.onS
					},// /ednd of evedn t_initmonth ui.
					/**
					 * *** ***************** INIT week view
					 * *************************************
					 */
					_initWeekUI : function() {
						function createDateContent(/* Object */tdObject,/* Date */
								dateObj,/* this */that) {
							var oDateDiv = document.createElement("div");
							dojo.html.setClass(oDateDiv, "clickDate weekDate");

							oDateDiv.setAttribute("date", dojo.date.toRfc3339(
									dateObj, "dateOnly"));
							dojo.event.connect(oDateDiv, "onclick", that,
									"onDateClicked");
							oDateDiv.innerHTML = dateObj.getDate();
							tdObject.appendChild(oDateDiv);
							tdObject.id="Day_"
										+ dojo.date.toRfc3339(dateObj,
												"dateOnly");
							var oMonthDiv = document.createElement("div");
							dojo.html.setClass(oMonthDiv, "weekMonth");
							sHTML = dojo.date.format(dateObj, {
								datePattern :"eeee",
								selector :"dateOnly",
								locale :that.lang
							}) + '<br />';
							sHTML += dojo.date.format(dateObj, {
								datePattern :"MMMM yyyy",
								selector :"dateOnly",
								locale :that.lang
							});
							oMonthDiv.innerHTML = sHTML;
							tdObject.appendChild(oMonthDiv);
							var emptyDiv =document.createElement("div");
							emptyDiv.innerHTML="    ";
							tdObject.appendChild( emptyDiv);

							var oItemDiv = document.createElement("div");
							dojo.html.setClass(oItemDiv, "calendarItemsWeek");
							var oUL = document.createElement("ul");
							oUL.id = dojo.date.toRfc3339(dateObj, "dateOnly");
							dojo.html.setClass(oUL, "listItems");
							oItemDiv.appendChild(oUL);
							var dt = new dojo.dnd.HtmlDropTarget(oUL,
									[ "dragListDates" ]);

							dojo.event.connect(dt, "onDrop", that, dojo.widget
									.byId(that.widgetId)._dropFunction);
							var dt2 = new dojo.dnd.HtmlDropTarget(oUL,
									[ "dragListCoures" ]);
							dojo.event.connect(dt2, "onDrop", that, dojo.widget
									.byId(that.widgetId)._dropCourseFunction);

							tdObject.appendChild(oItemDiv);
						}

						var nextDate = new Date(this.firstDay);
						var oTR, oTD;
						for ( var r = 0; r < 4; ++r) {
							oTR = this.calendarBodyNode.insertRow(-1);
							if (r < 3) {
								oTD = oTR.insertCell(-1);
								var currentClassName = "weekDay currentMonth";
								if (dojo.date.toRfc3339(nextDate, 'dateOnly') == dojo.date
										.toRfc3339(this.today, 'dateOnly')) {
									currentClassName += " " + "currentDate";
								}
								dojo.html.setClass(oTD, currentClassName);
								if (r == 2) {
									oTD.rowSpan = 2;
								}
								createDateContent(oTD, nextDate, this);
								nextDate = dojo.date.add(nextDate,
										dojo.date.dateParts.DAY, 3);
							}
							oTD = oTR.insertCell(-1);
							var currentClassName = "weekDay currentMonth";
							if (dojo.date.toRfc3339(nextDate, 'dateOnly') == dojo.date
									.toRfc3339(this.today, 'dateOnly')) {
								currentClassName += " " + "currentDate";
							}
							dojo.html.setClass(oTD, currentClassName);
							createDateContent(oTD, nextDate, this);
							if (r == 2) {
								nextDate = dojo.date.add(nextDate,
										dojo.date.dateParts.DAY, 1);
							} else {
								nextDate = dojo.date.add(nextDate,
										dojo.date.dateParts.DAY, -2);
							}
						}
					}, // / initweek ui
					/**
					 * *** ***************** INIT Day view
					 * *************************************
					 */
					_initDayUI : function() {
						function createDateContent(/* Object */tdObject,/* Date */
								dateObj,/* this */that) {
							var oDateDiv = document.createElement("div");
							dojo.html.setClass(oDateDiv, "weekDate");
							oDateDiv.innerHTML = dateObj.getDate();
							tdObject.id="Day_"
										+ dojo.date.toRfc3339(dateObj,
												"dateOnly");
							tdObject.appendChild(oDateDiv);
							var oMonthDiv = document.createElement("div");
							dojo.html.setClass(oMonthDiv, "weekMonth");
							sHTML = dojo.date.format(dateObj, {
								datePattern :"eeee",
								selector :"dateOnly",
								locale :that.lang
							}) + '<br />';
							sHTML += dojo.date.format(dateObj, {
								datePattern :"MMMM yyyy",
								selector :"dateOnly",
								locale :that.lang
							});
							oMonthDiv.innerHTML = sHTML;
							tdObject.appendChild(oMonthDiv);
							var emptyDiv =document.createElement("div");
							emptyDiv.innerHTML="    ";
							tdObject.appendChild( emptyDiv);

							var oItemDiv = document.createElement("div");
							dojo.html.setClass(oItemDiv, "calendarItemsDay");

							var oUL = document.createElement("ul");
							oUL.id = dojo.date.toRfc3339(dateObj, "dateOnly");
							dojo.html.setClass(oUL, "listItems");
							oItemDiv.appendChild(oUL);
							var dt = new dojo.dnd.HtmlDropTarget(oUL,
									[ "dragListDates" ]);
							dojo.event.connect(dt, "onDrop", that, dojo.widget
									.byId(that.widgetId)._dropFunction);
							var dt2 = new dojo.dnd.HtmlDropTarget(oUL,
									[ "dragListCoures" ]);
							dojo.event.connect(dt2, "onDrop", that, dojo.widget
									.byId(that.widgetId)._dropCourseFunction);
							tdObject.appendChild(oItemDiv);
						}

						var nextDate = new Date(this.firstDay);
						var oTR, oTD;
						oTR = this.calendarBodyNode.insertRow(-1);
						oTD = oTR.insertCell(-1);
						var currentClassName = "currentMonth";
						if (dojo.date.toRfc3339(nextDate, 'dateOnly') == dojo.date
								.toRfc3339(this.today, 'dateOnly')) {
							currentClassName += " " + "currentDate";
						}
						dojo.html.setClass(oTD, currentClassName);
						createDateContent(oTD, nextDate, this);
					}, // end of initdayUI

					/**
					 * *** *****************Refresh the screen and redraw all
					 * event *************************************
					 */
					refreshScreen : function() {
						this.updateUserMessage("Please wait while refreshing the screen");
					//	  //console.log("[ line 1709 (refreshScreen) calendar .js ] Rrefresh the screeeeeeeeeeeeeen  ...........");
						this._preInitUI(new Date(this.value));
						//this.updateUserMessage(this.WelcomeMessage);
						// this.onView();
					},

					/**
					 * *** ***************** oon view changed
					 * *************************************
					 */
					onViewNotChanged : function() {
						// this.onView();
						this.setTheDatesClicked();
						this.onSetCalendarCourseEntries();
						this.onSetResourcesCal();
						this.onSetHolidayEntries();
					},
					/**
					 * *** ***************** oon view changed
					 * *************************************
					 */
					onViewChanged : function() {
						this.onView();

					},
					/**
					 * *** ***************** on view changed
					 * *************************************
					 */

					onView : function() {
						if (this.clickEvent == 1) {
							// ////  //console.log("in the set date clicked. ")
							this.setTheDatesClicked();
						} else {

							// ////  //console.log("not in the first time ");

						}

					},
					/**
					 * *** ***************** Edit mode function : first function
					 * of the click day event (add day ,remove day)
					 * *************************************
					 */

					onSetEditMode : function(mode) {

						this.EditMode = mode;
						// if false
						// remove all clicks
						// remove all courses
						// refresh the screen
						// if true ==> get all empty coures
						// ==> enble edit
						// refresh screen
						// TODO:: complet this edit and view mode change

					},

					/**
					 * *** ***************** check if the day is in list of
					 * clicked days *************************************
					 */
					/**
					 * this funciton check if "day" was clicked before or not if
					 * it is clicked before then the second click means to
					 * remove the first
					 *
					 * the funciton remove the click and change click count and
					 * the clickks array. else it will return false
					 */
					checkClick : function(day) {
						if (this.clickcount == 0)
							return true;
						for ( var i = 0; i < this.clicks.length; i++) {
							// remove this click
							//
							// ////  //console.log("checking clicks
							// .........."+this.clicks.length);
							if (this.clicks[i]) {
								if (this.clicks[i].match(day)) {
									// ////  //console.log(" iteration "+i+" day
									// "+day+" click = "+this.clicks[i]);
									this.clicks[i] = null;
									this.clickcount--;
									return false;
								}
							}

						}
						return true;
					},

					/**
					 * *** ***************** add this day to current list of
					 * clicks *************************************
					 */
					/**
					 * This function add a day to the list of current click in
					 * the calendar. check if it is previously clicked check if
					 * it a holiday check if the current resource is empty check
					 * if the maximum number of days is reached. if no condition
					 * to stop the selection of the day then the day is add to
					 * list of click
					 *
					 */
					AddDayToClicks : function(day) {
                    // console.log("check if day........... ..........");
						// check count not avaliable
						if (!this.checkClick(day)) {

							this.RemoveDateClick(day);
							// setTheDatesClicked();
							// clicks[i]=clicks[clickcount-1];
							// ////  //console.log(" the day have been
							// removed.....");
							// oCalendar.refreshScreen();
							return false;

						} else {

								// console.log("check if holiday ..........");


                            if (this.CheckHolidays){
							var holiday = this.checkiFHoliday(day);

							if (holiday) {

								// this.updateUserMessage(" This is a national
								// Holiday ");
								return false;
							}

                            }
							// this.check
//							var resourceFree = this.checkResourcesFreeDay(day);
//
//							if (resourceFree) {

								if (this.clickcount >= this.MaxClickCount) {
									// ////  //console.log(evt.target.getAttribute("Day"));

									this
											.updateUserMessage("Course day completed, you can only save or remove a clicked day");
									return;
								}// ////exceeed course day limit.

								// if (clickcount < MaxClickCount){
								this.clickcount++;
								// find a undefined date to set this click

								for ( var index = 0; index < this.clicks.length; index++) {
									if (!this.clicks[index]) {

										this.clicks[index] = day;
										break;
									}
								}// end of for

								// ADDClickToCal(click[c])
//							}// if resource is free
//							//
//							else {
//
//								this
//										.updateUserMessage("Please choose another day resources are not free. ");
//								return false;
//							}// els if resource fee
						}
		 //console.log(" will return ture ");
						return true;

					},
					/**
					 * *** ***************** check if the current recsource of
					 * the calendar is free in this day
					 * *************************************
					 */
					checkAddDayToCourse : function(course, dayO) {

						// ////  //console.log(" [ line 900 checkAddDayToCourse ]
						// indede the check add day ");

						var day = dojo.date.toRfc3339(dayO, "dateOnly")
    					if (this.CheckHolidays){
						var holiday = this.checkiFHoliday(day);

						if (holiday) {

							// this.updateUserMessage(" This is a national
							// Holiday ");
							return false;
						}
    }
//						// this.check
//						var resourceFree = this.checkResourcesFreeDay(day);
//
//						if (resourceFree) {
							var dayObject = dojo.date.fromRfc3339(day);

							currentDays = course.CourseDays;
							for ( var d = 0; d < currentDays.length; d++) {
								// ////  //console.log("[(line 920)
								// checkAddDayToCourse] the days is ");
								// ////  //console.log(dojo.json.serialize(currentDays[d]));
								tesday = dojo.date
										.fromRfc3339(currentDays[d].starttime);
								// tesday.starttime
								// compare starttime
								// ////  //console.log(" start time "+tesday);
								// ////  //console.log(" day o "+dayO);
								// //console.log
								// (dojo.date.compare(dayObject,tesday,
								// dojo.date.compareTypes.DATE))
								if (dojo.date.compare(dayObject, tesday,
										dojo.date.compareTypes.DATE) == 0) {

									this
											.updateUserMessage(" Error this course already posted in this day please choose another... ");
									return false;
									// do nothing
								}
//								// else {
//								// // ////  //console.log(" noooooooooooooooooooooot
//								// correct .....");
//								// }
//
							}
							//		 console.log(" will return ture ");
							return true;
//						} else {
//							this.updateUserMessage("Please choose another day resources are not free. ");
//							return false;
//						}

			//	 console.log(" will return ture ");
				//	return true;
					},
					checkResourcesFreeDay : function(day) {
						oDateObject = dojo.byId("Day_" + day);

						if (oDateObject) {
							// getAttribute
							Resource = oDateObject.getAttribute("ResourceName");
							classname = oDateObject.className;
							if (Resource) {

								if (classname.match("TrainerBusyDay")) {
									return false;
								}

							}

						}

						return true;
					},
					/**
					 * *** ***************** check if this day is holiday
					 * *************************************
					 */

					checkiFHoliday : function(day) {

						oDateObject = dojo.byId("Day_" + day);

						if (oDateObject) {
							// getAttribute
							Holiday = oDateObject.getAttribute("Holiday");
							classname = oDateObject.className;
							if (Holiday) {

								if (classname.match("Holiday")) {
									this.updateUserMessage(" This is  "
											+ Holiday + "  Holiday");

									return true;
								}

							}// if holiday exist

						}// if the date exit in this calendar.......
						// check if not in the weekly holidays..........
						//
						//
						dayobject = dojo.date.fromRfc3339(day);

						var flagholiday = false;
						// ////  //console.log("[line 442(_initMultiUI)] ==next date
						// "+nextDay +" id = "+d);
						var dayd = dayobject.getDay();
						// ////  //console.log("[line 444 (_initMultiUI)] ==next
						// date "+day );
						for ( var indexi = 0; indexi < this.WeeklyHoliday.length; indexi++) {

							if (this.WeeklyHoliday[indexi] == dayd) {
								// ////  //console.log("day "+day+" is a holiday ")
								flagholiday = true;
								break;
							}

						}

						if (flagholiday == true) {
							this.updateUserMessage(" This is a holiday");
							return true;
						}

						return false;

					},
					/**
					 * *** ***************** check if room is avaliable
					 * *************************************
					 */

					checkRoomAvaliablity : function(day, room) {

					},
					/**
					 * *** ***************** save clicks of a course to server
					 * *************************************
					 */

					/** * this must be ovrride to save to data base . ****** */
					SaveCourseClicks : function(course, coursedays) {
						// ----------------this funciton supposed to save the
						// course days to the database.


						this.updateUserMessage("Please wait till course schedule is saved");

						//this line was added to sort the course days before saving them
						coursedays=SortDateArray(coursedays);


						// var varstring= course.Name + " "+course.ID+"
						// "+course.Days+" "+course.Runs;
						// var cdays=" ";
						// SaveCourseClicks
						// ////  //console.log(coursedays);
						// ////  //console.log(coursedays.length)
						// for(var index=0; index<coursedays.length; index++) {
						// if (coursedays[index]){
						// cdays+=" "+coursedays[index];
						// }
						//
						// }
						// oCalendar.calendarCourseEvents
						// add course to oCalendar.calendarCourseEvents
						// var oldlength=this.calendarCourseEvents.length;
						// this.calendarCourseEvents.length=
						// this.calendarCourseEvents.length+1;
						// //  //console.log()

						// var
						// newEntries=dojo.json.evalJson(dojo.json.serialize(this.calendarCourseEvents));
						// newcourse=this.calendarCourseEvents.length;
						// NewcalendarCourseEvents=this.calendarCourseEvents;

						// NewcalendarCourseEvents.length=NewcalendarCourseEvents.length+1;
						calEnt = new Array(coursedays.length);

						var id;
						var calEntry;
						// if (course.Period.match("S"))
						// {
						//
						// numberOfDays=
						// }

						for ( var index = 0; index < coursedays.length; index++) {
							// alert("id: " + id + ", title: " + title + ",
							// date: " + eDate + ", endDate: " + endDate + ",
							// link: " + link);
							var day = new Object;
							day.starttime = dojo.date.toRfc3339(dojo.date
									.fromRfc3339(coursedays[index]));

							day.EventDate = dojo.date.toRfc3339(dojo.date
									.fromRfc3339(coursedays[index]));

							day.endtime = dojo.date.toRfc3339(dojo.date
									.fromRfc3339(coursedays[index]));
							day.allday = true;
							day.Period = course.Period;
							day.DayNo = index + 1;

							calEnt[index] = day;

						}
						course.CourseDays = calEnt;

						// /add default data.............
						course.type = [ 'reminder' ];

						// NewcalendarCourseEvents[newcourse]=course;

						this.SaveToDatabase(course);
						// //  //console.log(dojo.json.serialize(course));
						// //  //console.log("aftet the adding of course ");
						// //  //console.log(dojo.json.serialize(
						// NewcalendarCourseEvents));
						// save to database

						// then refresh screeeeeeeeeeen.
						// this.setCalendarCoursesEntries(NewcalendarCourseEvents);

						// this.refreshScreen();

					},
					SaveToDatabase : function(course) {
					},
					/**
					 * *** ***************** click event handlar (see initmonth
					 * to see inovke of this event)
					 * *************************************
					 */

					OnClickDate : function(evt) {
						// this.clickEventEnable updateUserMessage

						if (this.clickEventEnable) {
							// ////  //console.log("on the click date ");
							this.clickEvent = 1;
							dojo.event.browser.stopEvent(evt);
							// ////  //console.log("A NEW CLICK ................");
							// //  //console.log(eval(evt.Target));
							/*
							 * if (this.clickcount==0){ this.clicks=new
							 * Array(40); }
							 */
							var eventTarget = evt.target;
							// dojo.event.browser.stopEvent(evt);
							// ////  //console.log(" clicking on
							// "+eventTarget.getAttribute("Day"));
							// ////  //console.log("click clikck click no of click
							// is "+this.clickcount);
							if (eventTarget.getAttribute("Day") == null) {
								// ////  //console.log(evt);
								// ////  //console.log(eval(evt.target));
								// ////  //console.log(evt.target);

								alert("error clicking on the day "
										+ eventTarget.getAttribute("Day")
										+ " on event " + eventTarget);
								return;
							}
							var day = eventTarget.getAttribute("Day");
							this.AddDayToClicks(day);
							this.setTheDatesClicked();

						} else {
							this
									.updateUserMessage(" Please choose a course first ");

						}

					},
					/**
					 * *** ***************** set the clicks to current view
					 * *************************************
					 */
					/*
					 * Simply this funciton calls the funciton that will display
					 * click on the current view.
					 *
					 */

					setTheDatesClicked : function() {
						if (this.clicks != null) {
							// ////  //console.log("settttttttttttting clicjks
							// ........");
							this.setCalenderChoose(this.clicks);
						}

					},
					/** *** ***************** setCalenderChoose******* */
					/** *** this funciton is deprected ******** */
					setCalenderChoose : function(entriesObj) {

						/*
						 * if(entriesObj != "" && typeof entriesObj=="string"){
						 * entriesObj = dojo.json.evalJson(entriesObj); }
						 */
						if (entriesObj) {
							this.calendarChoose = entriesObj;
							// ////  //console.log(this.calendarChoose);
							this.onCalenderChoose();
						}

					},
						/**
					 * *** ***************** add a click to view
					 * *************************************
					 */
					/**
					 * If a day is clicked and approved as a day of course then
					 * we change the view and add a class to this day to display
					 * the selected day diffrenet from the others.
					 *
					 *
					 */

					onCalenderChoose : function() {

						var allDay = false;
						var startDate, endDate, rStartTime, oDateObject, oLI, oSpan, sHTML, src, oAttributes, iAttr;
						var oDiv, toolTip, oToolTip, tooltipArgs, oImgDiv;

						for ( var i in this.calendarChoose) {

							if (this.calendarChoose[i]) {
								cDate = dojo.date
										.fromRfc3339(this.calendarChoose[i]);

								// ////  //console.log(" for calender event "+i);

								oDateObject = dojo.byId("Day_"
										+ dojo.date
												.toRfc3339(cDate, 'dateOnly'));

								// var pos = GetElementAbsolutePos(oDateObject);
								// alert("Elements left: " + pos.x+ " and top "
								// + pos.y);

								if (oDateObject) {

									currentClassName = oDateObject.className;
									// ////  //console.log("before the addd ");
									// ////  //console.log(eval(oDateObject));

									if (currentClassName.match("SelectedDay") == null) {
										currentClassName = currentClassName
												+ " " + "SelectedDay";

										dojo.html.setClass(oDateObject,
												currentClassName);
										// oDateObject.style.backgroundColor="green";

										// .style.backgroundColor

									}
									// ////  //console.log("AFter the addd ");
									// ////  //console.log(eval(oDateObject));
								}
							}
						}

					},

					/**
					 * *** ***************** remove a click from view
					 * *************************************
					 */
					/**
					 * If a day was clicked and view changed then when remvoing
					 * the click the view must return as befor e so call this
					 * function to remove click from view
					 *
					 */
					RemoveDateClick : function(day) {
						// ////  //console.log(" On the remove funciton s")
						cDate = dojo.date.fromRfc3339(day);
						// ////  //console.log(cDate);
						oDateObject = dojo.byId("Day_"
								+ dojo.date.toRfc3339(cDate, 'dateOnly'));
						if (oDateObject) {
							// ////  //console.log("before the removal ");
							// ////  //console.log(eval(oDateObject));
							currentClassName = oDateObject.className;

							currentClassName = currentClassName.replace(
									"SelectedDay", "");
							dojo.html.setClass(oDateObject, currentClassName);
						}
						// ////  //console.log("After the removal ");
						// ////  //console.log(eval(oDateObject));

					},
					/**
					 * *** ***************** add a click to view
					 * *************************************
					 */
					/**
					 * If a day is clicked and approved as a day of course then
					 * we change the view and add a class to this day to display
					 * the selected day diffrenet from the others.
					 *
					 *
					 */


					/** *** ***************** setCalenderChoose******* */

					/**
					 * *** ***************** function for courses events
					 * display.......... *************************************
					 */
					/**
					 * *** ***************** Set courses events of the calendar
					 * (from a jason string or array of objects)
					 * ..................................*******
					 */

					setCalendarCoursesEntries : function(entriesObj) {

						if (entriesObj != "" && typeof entriesObj == "string") {
							entriesObj = dojo.json.evalJson(entriesObj);
						}
						if (entriesObj) {
							// //  //console.log("[ line 886
							// (setCalendarCoursesEntries) ]in the couress
							// entriessssssssssssssssssssssssssss " );
							this.calendarCourseEvents = entriesObj;
							this.onSetCalendarCourseEntries();
						}

					},
					CreateExtraToolTipDiv : function(dayid) {
							ToolTipExtraDiv = document.createElement('div');
						dojo.html.setClass(ToolTipExtraDiv, " ExtraItems");
						ToolTipExtraDiv.id = "ExtraItemsToolTipDiv" + dayid;//iiiiiiiiiiiiiiiiiiiiiiiiiii

						oItemDiv = document.createElement("div");
						dojo.html
								.setClass(oItemDiv, " ExtraItems"); //calendarItems

						var oUL = document.createElement("div");


						oUL.id = "ExtraEvent_" + dayid;///iiiiiiiiiiiiiiiiiiiiiiiiiiii


						dojo.html.setClass(oUL, "ExtraItems");//listItems

						oItemDiv.appendChild(oUL);

						// ToolTipExtraDiv.style.backgroundColor=oDateObject.style.backgroundColor;

						ToolTipExtraDiv.appendChild(oItemDiv);

						//   //console.log("[line 1984(CreateExtraToolTipDiv)
						// calendar.js] before end of fucntion ");

						//   //console.log(ToolTipExtraDiv) ;

						return [ ToolTipExtraDiv, oItemDiv ];
					},

					OnExtraClick : function(evt) {
						var eventTarget = evt.target;
						// dojo.event.browser.stopEvent(evt);
						// ////  //console.log(" clicking on
						// "+eventTarget.getAttribute("Day"));
						// ////  //console.log("click clikck click no of click is
						// "+this.clickcount);
						if (eventTarget.getAttribute("Day") == null) {

						}
					},
				onLegendDisplay:function (){
					//  //console.log("inside the legned. ..... ");
					//now i have to display the
					//this.LegendNode

					//remove pervious
				  dojo.dom.removeChildren(this.LegendNode)
				  //this.LegendNode
				  legDiv=document.createElement("table");
				   legDiv.colSpan=6;
				   ///////////////////now first row that contains the title legend. ...
				   rd=document.createElement("tr");
				    td=document.createElement("td");
				    td.innerHTML="Legend";
				    td.colSpan=5;

				    dojo.html.setClass(td,"LegendTitle")

				    rd.appendChild(td);
				    legDiv.appendChild(rd);
				    //////////second row contains the both legend with there title....

				     rd2=document.createElement("tr");
				    td1=document.createElement("td");
				    td1.innerHTML=this.LegendTitle;
				    dojo.html.setClass(td1,"LegendSmallTitle")
				    rd2.appendChild(td1);

				    td2=document.createElement("td");
				    if (this.UseMainLegend){
				    td2.innerHTML=this.LegendMainTitle;
				    }
				    dojo.html.setClass(td2,"LegendSmallTitle")
				    rd2.appendChild(td2);
				   // legDiv.appendChild(rd2);
				    if(List.length>0){
				    td3=document.createElement("td");

				    td3.innerHTML=this.Title;

				    dojo.html.setClass(td3,"LegendSmallTitle")
				    rd2.appendChild(td3);

				    }
				    legDiv.appendChild(rd2);
				    //////////////now for the legend it self ....
				    var max=0;
				   //get the maximum of the two legends....
				   if (LegendList.length>LegendMainList.length)
				   {
				   	max=LegendList.length;
				   }
				   else {
				   	  	max=LegendMainList.length;
				   }
				   if(List.length>max)
				   max=List.length;
				   /////////////   now loop on the maximum number
				      for(i=0;i<max;i++){
				      	//row for each legend item ...
				      	   rd3=document.createElement("tr");



				      	    td1=document.createElement("td");
				    		//create a new span // then a div.
				      	  dojo.html.setClass(td1,"LegendRows");


				      	 td2=document.createElement("td");
				    	 //create a new span // then a div.
				      	 dojo.html.setClass(td2,"LegendRows");


				      	 td3=document.createElement("td");
				    	 //create a new span // then a div.
				      	 dojo.html.setClass(td3,"LegendRows");

				      	  if (i<LegendList.length){
				      	  	if(LegendList[i]){
				      	  		  tdspan1=document.createElement("span");
				    		  tdspan1.innerHTML=i+1+".";

				    		    tdsdiv1=document.createElement("span");
				    		    tdsdiv1.innerHTML="  "+LegendList[i]+". ";
				    		 	td1.appendChild( tdspan1);
				    			td1.appendChild(tdsdiv1);
				      	  	}
				      	  }

				      	 if(i<LegendMainList.length && this.UseMainLegend){
				      	 	if(LegendMainList[i]){

				    		//create a new span // then a div.

				    		  tdspan2=document.createElement("span");
				    		  		  //change this based on eng. hossam request  from
				    		  //tdspan2.innerHTML=(i+1)+".  "+LegendMainList[i].app;
				    		  //to  (with no index to add to the legned list
				    		   tdspan2.innerHTML=" "+LegendMainList[i].app;
				    		  tdspan2.style.backgroundColor= LegendMainList[i].color+" ";
				    	     // tdspan2.style.border="2px";

				    		    tdsdiv2=document.createElement("span");
				    		    tdsdiv2.innerHTML="  "+LegendMainList[i].name;
				    		 	td2.appendChild( tdspan2);
				    			td2.appendChild(tdsdiv2);
				    	}



				      	 }//if length....

				      	//written by noha

				      	 if(i<List.length){
				      	 	if(List[i]){

				    		//create a new span // then a div.

				    		  tdspan3=document.createElement("span");
				    		  		  //change this based on eng. hossam request  from
				    		  //tdspan2.innerHTML=(i+1)+".  "+LegendMainList[i].app;
				    		  //to  (with no index to add to the legned list
				    		   tdspan3.innerHTML=" "+List[i].app;
				    		  tdspan3.style.backgroundColor= List[i].color+" ";
				    	     // tdspan2.style.border="2px";

				    		    tdsdiv3=document.createElement("span");
				    		    tdsdiv3.innerHTML="  "+List[i].name;
				    		 	td3.appendChild( tdspan3);
				    			td3.appendChild(tdsdiv3);
				    	}



				      	 }//if length....
//


				      rd3.appendChild(td1);
				 rd3.appendChild(td2);
				 rd3.appendChild(td3);
				   legDiv.appendChild(rd3);
				      }



//				    dojo.html.setClass(td1,"LegendRows");
//				    for(i=0;i<LegendList.length;i++){
//
//				    	if(LegendList[i]){
//
//
//
//				    		  tdspan1=document.createElement("span");
//				    		  tdspan1.innerHTML=i;
//
//				    		    tdsdiv1=document.createElement("div");
//				    		    tdsdiv1.innerHTML=LegendList[i];
//				    		 	td1.appendChild( tdspan1);
//				    			td1.appendChild(tdsdiv1);
//				    	}
//				    }
//
//				     td2=document.createElement("td");
//				    dojo.html.setClass(td2,"LegendRows");
//				  if (this.UseMainLegend){
//				  for(i=0;i<LegendMainList.length;i++){
//				    	if(LegendMainList[i]){
//
//				    		//create a new span // then a div.
//
//				    		  tdspan2=document.createElement("span");
//				    		  tdspan2.innerHTML=i+".  "+LegendMainList[i].MainApp;
//				    		  tdspan2.style.backgroundColor= LegendMainList[i].MainColor;
//
//				    		    tdsdiv2=document.createElement("div");
//				    		    tdsdiv2.innerHTML=LegendMainList[i].MainName;
//				    		 	td2.appendChild( tdspan2);
//				    			td2.appendChild(tdsdiv2);
//				    	}
//				    }
//
//				  }


				 //   LegendMainList
				    //dojo.dom





				  this.LegendNode.appendChild(legDiv)

					},
					setCoursesForLegend:function ( ){

						//  //console.log("setCoursesForLegend line 2507 ")

						//add the legend id , to the course to be displayed
						MaxClients=this.calendarCourseEvents.length;
						LegendList=new Array();
						LegendMainList=new Array();
						List=new Array();

						for ( i=0; i<this.calendarCourseEvents.length;i++) {
							Course=this.calendarCourseEvents[i];

						/// check if man legend name is empty or not
							if (Course.MainName==""){

								if (this.LegendMainTitle=='Courses')


								{

									Course.MainName=Course.Name;

								}



							}

							mainname=Course.MainName;//currently make ti course
							foundm=false;

							for(k=0; k <LegendMainList.length;k++){
								if (LegendMainList[k]){
									if (mainname.match(	LegendMainList[k].name))
									{
										foundm=true;
										break;
									}
								}
							}

							if (foundm==false){ // not of the legend list
								//add to the list of legends
							obj  =new Object();
							obj.name=Course.MainName;
							obj.color=Course.MainColor;
							obj.app=Course.MainApp;
							LegendMainList[k]=obj;


							}




							//for each event get the client name
							//
							//
							clname=	Course.Client;
							foundC=false; // currentl yit is not found



						//	this.calendarCourseEvents[i].ClientLegendID=1;

							for(k=0; k <LegendList.length;k++){
								if (LegendList[k]){
									if (clname.match(	LegendList[k]))
									{
										foundC=true;
										Course.ClientLegendID=k+1;
										break;
									}
								}
							}
							if (foundC==false){ // not of the legend list
								//add to the list of legends
								 Course.ClientLegendID=k+1;
								 LegendList[k]=clname;

							}


							  /////written by noha
							 if(this.CurrentColorMode != "Courses"){
							if(this.CurrentColorMode == "Clients"){
							mainname=Course.Client;//currently make ti course
							found=false;

							for(k=0; k <List.length;k++){
								if (List[k]){
									if (mainname.match(	List[k].name))
									{
										found=true;
										break;
									}
								}
							}

							if (found==false){ // not of the legend list
								//add to the list of legends
							obj  =new Object();
							obj.name=Course.Client;
							obj.color=Course.clientColor;
							obj.app=Course.clientApp;
							List[k]=obj;


							}
							}
							else if(this.CurrentColorMode == "Resources"){
							mainname=Course.ResourceName;//currently make ti course
							found=false;

							for(k=0; k <List.length;k++){
								if (List[k]){
									if (mainname.match(	List[k].name))
									{
										found=true;
										break;
									}
								}
							}

							if (found==false){ // not of the legend list
								//add to the list of legends
							obj  =new Object();
							obj.name=Course.ResourceName;
//							if(Course.resourceColor == "#EECBAD")
//							obj.color="#009900";
//							else
							obj.color=Course.resourceColor;
							obj.app=Course.resourceApp;
							List[k]=obj;


							}
							}

							 else if(this.CurrentColorMode == "Funding"){
							 	if(Course.funded == 1){
							mainname="Funded";

							}
							else{
								mainname="Not Funded";

							}

							found=false;

							for(k=0; k <List.length;k++){
								if (List[k]){
									if (mainname.match(	List[k].name))
									{
										found=true;
										break;
									}
								}
							}

							if (found==false){ // not of the legend list
								//add to the list of legends
							obj  =new Object();
							if(Course.funded == 1){
							obj.name="Funded";
							obj.color="#009900";
							obj.app="F";
							}
							else{
								obj.name="Not Funded";
							obj.color="#FF9900";
							obj.app="NF";
							}
							List[k]=obj;


							}
							}




							else if(this.CurrentColorMode == "Coordinators"){
							mainname=Course.CoordinatorName;//currently make ti course
							found=false;

							for(k=0; k <List.length;k++){
								if (List[k]){
									if (mainname.match(	List[k].name))
									{
										found=true;
										break;
									}
								}
							}

							if (found==false){ // not of the legend list
								//add to the list of legends
							obj  =new Object();
							obj.name=Course.CoordinatorName;
							obj.color=Course.coordinatorColor;
							obj.app=Course.coordinatorApp;
							List[k]=obj;


							}
							}


							 }

							}


					},
					/**
					 * *** ***************** add the coureses to dispalyed html
					 *
					 * *************************************
					 */
					onSetCalendarCourseEntries : function() {

                    	//	console.log("---------------------------------inslide the calendar entries.----------------")
					//	console.log(dojo.json.serialize(course));


						this.updateUserMessage("Please wait till courses are displayed");

						if (this.DisplayLegend||(this.calendarType == 'MultiMonth')){

							this.setCoursesForLegend();
						//		onLegendDisplay();

						}

						// //  //console.log("[line 897
						// (onSetCalendarCourseEntries)] === on set calendar
						// entries...........");
						var ExtraEvents = false;
						/**
						 * *** ***************** check time zone
						 * *************************************
						 */
						var hasTimeZone = false;
						if (typeof this.selectedtimezone != "string"
								&& this.selectedtimezone != null) {
							hasTimeZone = true;
						}// end of time zone

						var allDay = false;
						var startDate, endDate, rStartTime, oDateObject, oLI, oSpan, sHTML, src, oAttributes, iAttr;
						var oDiv, toolTip, oToolTip, tooltipArgs, oImgDiv;

						// /
						var EventDayindex = 0;

	 						if ((!this.calendarCourseEvents)||(this.calendarCourseEvents.length==0))
						{
								this.updateUserMessage(this.WelcomeMessage);
							return;



						}

						/**
						 * *** ***************** for all the calendar event s
						 * *************************************
						 */




						 //var i in
						for (var i=0; i<this.calendarCourseEvents.length;i++ ) {
									//  //console.log("([Line 2380] onSetCalendarCourseEntries calendar.js) int the last loops"+i)

									//  //console.log("([Line 2380] onSetCalendarCourseEntries calendar.js) this course is ");
								////	  //console.log(dojo.json.serialize(this.calendarCourseEvents[i]) )
								//
//							if (i>=CL-2)
//							{
//									  //console.log("([Line 2380] onSetCalendarCourseEntries calendar.js) int the last loops before last "+i)
//
//									  //console.log("([Line 2380] onSetCalendarCourseEntries calendar.js) this course is ");
//									  //console.log(dojo.json.serialize(this.calendarCourseEvents[i]) )
//
//
//
//							}
							var course = this.calendarCourseEvents[i];

							/**
							 * *** ***************** for every day in the coures
							 * *************************************
							 */
							for ( var j = 0; j < course.CourseDays.length; j++) {
								ExtraEvents = false;
								EventDayindex++;
								var eventDate = course.CourseDays[j];

//                           if (i>=CL-2)
//							{
							//  //console.log("([Line 2400] onSetCalendarCourseEntries calendar.js) this course is  "+i+" and day is "+j);
							//  //console.log( dojo.json.serialize(course.CourseDays[j]))
//
//
//
//							}


								allDay = false;//eventDate.allday;
								/**
								 * *** ***************** get start date
								 * ************************************
								 */

		//						 //console.log(" eventDate.starttime ="+eventDate.starttime);
								startDate = dojo.date
										.fromRfc3339(eventDate.starttime);
								 //console.log(" I am looking for date befoer set time  "+startDate);
//										tempDateString= dojo.date
//										.toRfc3339(startDate);
										//console.log("After conversion again = "+tempDateString);


								if (!allDay && hasTimeZone) {
									startDate = this.setTZDate(startDate);
								}

								// / get the location of the day that will be
								// displayeeeeeeed

								/**
								 * *** ***************** get the date div from
								 * calendar view
								 * *************************************
								 */


								// check if the date of the event is in the
								// current view of the calendar
								// / if it exist in this month it will return
								// the dom object if not it will return nulmm
								oDateObject = dojo.byId(dojo.date.toRfc3339(
										startDate, 'dateOnly'));

								var dayid;


								var ToolTipExtraDiv;
								if (oDateObject) {
									// get the current id of the date
									dayid = oDateObject.id;
								//	 console.log(console.log(dojo.json.serialize(course)));


								 //console.log(" I found date  "+dayid);
									endDate = dojo.date
											.fromRfc3339(eventDate.endtime);
									if (!allDay && hasTimeZone) {
										endDate = this.setTZDate(endDate);
									} // / end of if not all day
									//   //console.log(eval(oDateObject));
									/**
									 * *** ***************** create a new event
									 * item
									 * *************************************
									 */
									oLI = document.createElement('div'); // may
																			// change
																			// it
																			// to
																			// div
									dojo.html.setClass(oLI, "listItem");

									// / add the specific class for the event
									// list
									if (allDay) {
										// add the class for all day
										dojo.html.setClass(oLI,
												"listItem allDayEvent");
									}
									//   //console.log(eval(oDateObject));
									// set the attribute of the event dom object
									oLI.setAttribute("starttime",
											Number(startDate));
									oLI
											.setAttribute("endtime",
													Number(endDate));
									oLI.setAttribute("coursei", i);
									oLI.setAttribute("dayj", j);

									var EventCount=  oDateObject
											.getAttribute("eventcount");
									// EventCount=

									if (!EventCount) {
										EventCount = 0;
									}
									if (EventCount == null) {
										EventCount = 0;
									}



									/**
									 * *** ***************** adde event in the
									 * correct order of day event.
									 * *************************************
									 */
									// check if there are different other events
									// in this day.........
									if (oDateObject.childNodes.length > 0) { // of
										//


										if ((EventCount) >= this.MaxEventPerDay) {

										//	  //console.log(eventDate);
											ExtraEvents = true;
											// now i will check if nodes reached
											// the maximum or
								//		   //console.log("[line 2047(onSetCalendarCourseEntries)]ExtraEvents "+ ExtraEvents);

											var oDateExtraObject = dojo
													.byId("ExtraArrow_" + dayid);

											if (oDateExtraObject) {
												// there is an old object for
												// extra data
                                                    //gethgon the ottem div


												oItemDiv = dojo.byId("ExtraEvent_"+ dayid);//iiiiiiiiiii
													//   //console.log("In type of calendar....  "+this.calendarType)
												//   //console.log("[line 2878(onSetCalendarCourseEntries)]oItemDiv  ")

												//    //console.log(oItemDiv)
											///	  if (this.calendarType == 'month'  ){
											ToolTipExtraDiv =dojo.byId("ExtraItemsToolTipDiv"+ dayid);
											//	  }
//											else{
//												// get the already tool kit data
//												ToolTipExtraDiv =document.getElementById("ExtraItemsToolTipDiv"+ dayid);//iiiiiiiiiiiii
//											}
												//   //console.log("[line 2878(onSetCalendarCourseEntries)] ToolTipExtraDiv  ")
												//			    //console.log(	ToolTipExtraDiv)
												moreDiv=oDateExtraObject.firstChild;

													current = EventCount
														- this.MaxEventPerDay
														+ 1;
												moreDiv.innerHTML = current;

												if (oItemDiv==null	) {
													if (ToolTipExtraDiv==null) {
														extra = this.CreateExtraToolTipDiv(dayid);
														ToolTipExtraDiv = extra[0];
														oItemDiv = extra[1];
                                                //          //console.log(" [2882]	onSetCalendarCourseEntries  ERRRRRRRRRRRRRRRRRRRORRRRRRRRRRRRRRRRRRRR");
													}
													else{



														var oUL = document.createElement("div");


														oUL.id = "ExtraEvent_" + dayid;///iiiiiiiiiiiiiiiiiiiiiiiiiiii


														dojo.html.setClass(oUL, "ExtraItems");//listItems

														oItemDiv=oUL;




														//oItemDiv=""
															ToolTipExtraDiv.appendChild(oItemDiv)
													}
													//create and oitem div and atttaceit


												}
//												else{
//													ToolTipExtraDiv = document.createElement('div');
//														dojo.html.setClass(ToolTipExtraDiv, " ExtraItems");
//														ToolTipExtraDiv.id = "ExtraItemsToolTipDiv" + dayid;//iiiiiiiiiiiiiiiiiiiiiiiiiii
//
//
//															//oItemDiv=""
//															ToolTipExtraDiv.appendChild(oItemDiv);
//												}


												//finally after
//												   //console.log("[line 2978(onSetCalendarCourseEntries)]oItemDiv  ")
//												    //console.log(oItemDiv)
//													   //console.log("[line 2978(onSetCalendarCourseEntries)] ToolTipExtraDiv  ")
//															    //console.log(	ToolTipExtraDiv)
//												  //console.log("------------------------------------------------")
//

											}//
											else {// create a div and add it
													// to the

												//   //console.log("[ line 2176
												// (onSetCalendarCourseEntries)
												// calendar.js] create a div ");

												var oDateObjectMain;
												if (oDateObject.tagName == 'UL'||oDateObject.tagName == 'ul') {
													oDateObjectMain = oDateObject.parentNode;
												}
												//
												else if (oDateObject.tagName == 'DIV'||oDateObject.tagName == 'div') {
													oDateObjectMain = oDateObject.parentNode;
												}
												var oDateExtraObject = document
														.createElement('div');
												// create a new div for the
												oDateExtraObject.id = "ExtraArrow_"+ dayid;
												// create span that will caryy
												// the number of extra events
												// / var
												// countspan=document.createElement('span');

												// countspan.innerHTML=
												// EventCount;
												// oDateExtraObject.appendChild(countspan);
												var moreDiv = document.createElement('div');

													current = EventCount
														- this.MaxEventPerDay
														+ 1;
												moreDiv.innerHTML = current;
												dojo.html.setClass(moreDiv,"ExtraEvents");
												moreDiv.id = "ExtraToolArrowTip"
														+ dayid;

												// dojo.event.connect(moreDiv,
												// "onclick", this,
												// "OnExtraClick");

												oDateExtraObject
														.appendChild(moreDiv);
												// the oToolTipExtra must
												// contain the div for the
												// event.
												oDateObjectMain
														.insertBefore(
																oDateExtraObject,
																oDateObject.nextSibling);



												// ToolTipExtraDiv=this.CreateExtraToolTipDiv(dayid)
												// ;
												extra = this.CreateExtraToolTipDiv(dayid);
												ToolTipExtraDiv = extra[0];
												oItemDiv = extra[1];


											}


											oItemDiv.appendChild(oLI);

										} else {

											if (allDay) {
												oDateObject
														.insertBefore(
																oLI,
																oDateObject.childNodes[0]);
											}// if all day
											else {
												insertedLI = false;
//												for ( var r = 0; r < oDateObject.childNodes.length; r++) {
//													rStartTime = oDateObject.childNodes[r]
//															.getAttribute("starttime");
//													if (Number(endDate) <= rStartTime
//															|| Number(startDate) <= rStartTime) {
//														oDateObject
//																.insertBefore(
//																		oLI,
//																		oDateObject.childNodes[r]);
//														insertedLI = true;
//														break;
//													}// / if
//												}// for (loop on current
//													// event of the day)
												if (!insertedLI) {
													oDateObject.appendChild(oLI);
												}// if
											}// else ( means not all day
												// event )
										}// else (means the count of event is
											// less than max number of display)
									}// / if chide nodes > 0 (i day had other
										// events)
									else {

										oDateObject.appendChild(oLI);
									}// else this is the firse event

									/**
									 * *** ***************** now add creat the
									 * div object that will carry the event data
									 * *************************************
									 */
									//   //console.log(" [line 2210
									// (onSetCalendarCourseEntries)] === now
									// create the color..................... ");
									var CourseDiv;
									EventCount++;
									oDateObject.setAttribute("eventcount",
											EventCount);



						if (this.calendarType == 'MultiMonth' && EventCount>this.MaxEventPerDay ){


                  	  eventcountSpan = dojo.byId("EC"+ oDateObject.id);

					  if (!eventcountSpan){

					  	  //  Daydiv=	oDateObject.parentNode
                 dayDiv=oDateObject.parentNode.previousSibling;

                 fillcell=document.createElement("div");
                     	dojo.html.setClass( fillcell,"fillcell");

                      // now i need to add the span that will contains the event cournt
                  eventcountSpan=document.createElement("span");


                 if (dayDiv.tagName=='div'||dayDiv.tagName=='DIV'){
                 	dayDiv.appendChild(fillcell);
                         fillcell.appendChild(eventcountSpan);
                 }

                  eventcountSpan.id="EC"+	oDateObject.id;
                  	dojo.html.setClass(eventcountSpan,"countSpan");

					  }

						 eventcountSpan.innerHTML=" "+EventCount+" ";
						}
								    if (ExtraEvents){
								    	CourseDiv = this.createColoredEvent(
												course, eventDate,
												EventDayindex);
								    }
											else {

									if (this.calendarType == 'MultiMonth') {
										CourseDiv = this.createSmallColorEvent(
												course, eventDate,
												EventDayindex);
										// oLI.appendChild(CourseDiv);
										// //oLI=CourseDiv;
										// oToolTip=this.createSmallEventToolTip(course,eventDate);
										//
									} else if (this.calendarType == 'day'
											|| this.calendarType == 'week') {

										CourseDiv = this.createColoredDayEvent(
												course, eventDate,
												EventDayindex);
									} else {

										CourseDiv = this.createColoredEvent(
												course, eventDate,
												EventDayindex);
									}
											}
									oLI.appendChild(CourseDiv);
									oLI.setAttribute("CourseID",
											Number(course.ID));
									oLI.id = "CourseEvent_" + course.ID;
//									if (ExtraEvents) {
//										//   //console.log("[ line 2254
//										// (onSetCalendarCourseEntries)
//										// calendar.js] Extra eventsss after the
//										// add of the course di ");
//									}
									// dojo.event.connect(oLI, "onclick", this,
									// "OnEventClick");
									// oLI=CourseDiv;
									// oToolTip=this.createEventToolTip(course,eventDate);
									oToolTip = this.createSmallEventToolTip(
											course, eventDate);
									/**
									 * *** ***************** add the ability to
									 * drag the event
									 * *************************************
									 */

									if (this.EditMode) {
										new dojo.dnd.HtmlDragSource(oLI,
												"dragListDates");
									}
									/**
									 * *** ***************** create the tool tip
									 * *************************************
									 */

									if (ExtraEvents) {
										//   //console.log("[ line 2280
										// (onSetCalendarCourseEntries)
										// calendar.js] Extra eventsss ");

										//   //console.log(ToolTipExtraDiv );
										if (ToolTipExtraDiv!=null) {
											dojo.body().appendChild(
													ToolTipExtraDiv);
											toolEtipArgs = {
												connectId :"ExtraToolArrowTip"
														+ dayid,
												templateCssPath :"",
												toggle :"fade"
											};
												ExtraToolTip = dojo.widget
													.createWidget(
															"dojo:Tooltip",
															toolEtipArgs,
															ToolTipExtraDiv);

										}
									}

//									if (ExtraEvents) {
//
//										//   //console.log("[line
//										// 2361(onSetCalendarCourseEntries)]
//										// after the tool tip and before
//										// dojo.widget.createWidget ")
//										//   //console.log(oToolTip);
//
//									}
									// if (!ExtraEvents)
									// {
									dojo.body().appendChild(oToolTip);

									tooltipArgs = {
										connectId :"toolTip" + EventDayindex,
										templateCssPath :"",
										toggle :"fade"
									};
//									if (ExtraEvents) {
//
////										console
////												.log("[line 2289(onSetCalendarCourseEntries)] --------------after the tool tip and before  dojo.widget.createWidget ")
////										  //console.log(oToolTip);
////										  //console.log(tooltipArgs);
////										  //console.log(dojo.body());
//
//									}
									toolTip = dojo.widget.createWidget(
											"dojo:Tooltip", tooltipArgs,
											oToolTip);
									// }

								}// if day not in currrent view of calendar
							}// / for day

							//   //console.log("[ line 2277
							// (onSetCalendarCourseEntries) calendar.js] next
							// course "+course);
						}// for coures

						if (this.DisplayLegend||(this.calendarType == 'MultiMonth')){

							//this.setCoursesForLegend();
								this.onLegendDisplay();

						}
						this.updateUserMessage(this.WelcomeMessage);

					},

					/**
					 * *** ***************** add the event to dispalyed html
					 * *************************************
					 */
					// / this function is deprecated if called then this is an
					// errror
					onSetCalendarEntries : function() {
						//console
						//		.log(" (  line 2206 [onSetCalendarEntries]calendar.js )this function is deprecated if called then this is an errror ")
						// ////  //console.log("on set calendar
						// entries...........");
						var hasTimeZone = false;
						if (typeof this.selectedtimezone != "string"
								&& th.selectedtimezone != null) {
							hasTimeZone = true;
						}// end of time zone

						var allDay = false;
						var startDate, endDate, rStartTime, oDateObject, oLI, oSpan, sHTML, src, oAttributes, iAttr;
						var oDiv, toolTip, oToolTip, tooltipArgs, oImgDiv;
						for ( var i in this.calendarEvents) {
							allDay = this.calendarEvents[i].allday;
							//
							// ////  //console.log(" all day "+allDay);
							startDate = dojo.date
									.fromRfc3339(this.calendarEvents[i].starttime);
							if (!allDay && hasTimeZone) {
								startDate = this.setTZDate(startDate);
							}
							// ////  //console.log(" for calender event "+i);

							oDateObject = dojo.byId(dojo.date.toRfc3339(
									startDate, 'dateOnly'));
							// ////  //console.log(eval(oDateObject));
							if (oDateObject) {
								endDate = dojo.date
										.fromRfc3339(this.calendarEvents[i].endtime);
								if (!allDay && hasTimeZone) {
									endDate = this.setTZDate(endDate);
								}
								oLI = document.createElement('li');

								dojo.html.setClass(oLI, "listItem");
								/***********************************************
								 * <table>
								 * <tr>
								 * <td colspan="2" bgcolor="#00FFFF"> RES </td>
								 * </tr>
								 * <tr>
								 * <td bgcolor="#FF0000"> EJB </td>
								 * <td> <span class="timetext">10:00 AM </span>
								 * <span id="toolTip3" class="titletext">EJB
								 * Course</span> </td>
								 * </tr>
								 * </table>
								 *
								 **********************************************/

								// / i will need to add the event is
								if (allDay) {
									dojo.html.setClass(oLI,
											"listItem allDayEvent");
								}
								oLI
										.setAttribute("starttime",
												Number(startDate));
								oLI.setAttribute("endtime", Number(endDate));
								if (oDateObject.childNodes.length > 0) {
									if (allDay) {
										oDateObject.insertBefore(oLI,
												oDateObject.childNodes[0]);
									} else {
										insertedLI = false;
										for ( var r = 0; r < oDateObject.childNodes.length; r++) {
											rStartTime = oDateObject.childNodes[r]
													.getAttribute("starttime");
											if (Number(endDate) <= rStartTime
													|| Number(startDate) <= rStartTime) {
												oDateObject
														.insertBefore(
																oLI,
																oDateObject.childNodes[r]);
												insertedLI = true;
												break;
											}
										}
										if (!insertedLI) {
											oDateObject.appendChild(oLI);
										}
									}
								} else {
									oDateObject.appendChild(oLI);
								}

								oToolTip = document.createElement('span');
								oImgDiv = document.createElement('div');
								oToolTip.appendChild(oImgDiv);

								if (this.calendarType != 'month') {
									oSpan = document.createElement('span');
								}
								for ( var t = 0; t < this.calendarEvents[i].type.length; t++) {
									if (this.eventtypes[this.calendarEvents[i].type[t]]) {
										oImage = document.createElement("img");
										oImage
												.setAttribute(
														"title",
														this.eventtypes[this.calendarEvents[i].type[t]].title);
										oImage
												.setAttribute(
														"src",
														this.eventtypes[this.calendarEvents[i].type[t]].src);
										if (this.calendarType != 'month') {
											oSpan.appendChild(oImage);
											oLI.appendChild(oSpan);
										}
										oImgDiv.appendChild(oImage
												.cloneNode(true));
									}
								}

								oDiv = document.createElement('div');
								dojo.html.setClass(oDiv, "toolkittime");
								// sDate = dojo.date.format(startDate,
								// {formatLength:"medium", selector:"dateOnly",
								// locale:this.lang}) + "<br />";
								// sStart = sHTML = sEnd = '';
								// ////  //console.log(" now create the
								// colorr..................... ");
								oLI = this.createColoredEvent(
										this.calendarEvents[i], oLI, i);
								/*
								 * if(!allDay){ oSpan =
								 * document.createElement('span');
								 * if(!this.calendarEvents[i].repeated &&
								 * this.changeEventTimes){
								 * dojo.html.setClass(oSpan, "timetext"); }
								 * sStart = dojo.date.format(startDate,
								 * {formatLength:"short", selector:"timeOnly",
								 * locale:this.lang}); sHTML = ''; sHTML += ' - ';
								 * sHTML += dojo.date.format(endDate,
								 * {formatLength:"short", selector:"timeOnly",
								 * locale:this.lang}); sEnd = (hasTimeZone?" (" +
								 * unescape(this.selectedtimezone.sn) + ")":"");
								 *
								 * oSpan.innerHTML =
								 * this.calendarType!='month'&&Number(startDate)!=Number(endDate)?sStart+sHTML:sStart;
								 * oLI.appendChild(oSpan); }
								 */
								oDiv.innerHTML = sDate
										+ sStart
										+ (Number(startDate) != Number(endDate) ? sHTML
												: "") + sEnd;
								oToolTip.appendChild(oDiv);

								oDiv = document.createElement('div');
								dojo.html.setClass(oDiv, "toolkittitle");
								oDiv.innerHTML = this.calendarEvents[i].title;
								oToolTip.appendChild(oDiv);
								if (this.calendarEvents[i].body != "") {
									oDiv = document.createElement('div');
									dojo.html.setClass(oDiv, "toolkitbody");
									oDiv.innerHTML = this.calendarEvents[i].body;
									oToolTip.appendChild(oDiv);
								}

								oLI.setAttribute("itemid", i);
								/*
								 * oSpan = document.createElement('span');
								 * dojo.html.setClass(oSpan, "titletext");
								 *
								 * sHTML = this.calendarEvents[i].title;
								 * if(this.calendarEvents[i].url != ''){ sHTML = '<a
								 * href="' + this.calendarEvents[i].url + '"
								 * target="_blank">' +
								 * this.calendarEvents[i].title + '</a>'; }
								 * oSpan.innerHTML = sHTML
								 */
								sHTMLA = '';
								oAttributes = this.calendarEvents[i].attributes;
								iAttr = 0;
								for ( var a in oAttributes) {
									if (iAttr > 0) {
										sHTMLA += '<br />';
									}
									sHTMLA += a + ': ' + oAttributes[a];
									iAttr++;
								}
								if (sHTMLA != "") {
									oDiv = document.createElement('div');
									dojo.html.setClass(oDiv,
											"toolkitattributes");
									oDiv.innerHTML = sHTMLA;
									oToolTip.appendChild(oDiv);
								}

								/*
								 * oLI.appendChild(oSpan); oSpan.id = "toolTip" +
								 * i;
								 *
								 */
								if (!this.calendarEvents[i].repeated
										&& this.EditMode) {
									new dojo.dnd.HtmlDragSource(oLI,
											"dragListDates");
								}

								dojo.body().appendChild(oToolTip);
								tooltipArgs = {
									connectId :"toolTip" + i,
									templateCssPath :"",
									toggle :"fade"
								};
								toolTip = dojo.widget.createWidget(
										"dojo:Tooltip", tooltipArgs, oToolTip);
							}
						}
						// ////  //console.log("finished with the set ");

						this.updateUserMessage(this.WelcomeMessage);
					},

					/**
					 * *** ***************** Set events of the calendar (from a
					 * jason string or array of objects)
					 * ..................................*******
					 */
					setCalendarEntries : function(/* Object|String */entriesObj) {
						/*
						 * Example: entriesObj: { "id1": (String - Unique
						 * identifier of event) { starttime:
						 * "2006-12-30T08:05:00-06:00", (String - Formatted
						 * according to RFC 3339. See dojo.date.serialize)
						 * endtime: "2006-12-30T10:05:00-06:00", (String -
						 * Formatted according to RFC 3339. See
						 * dojo.date.serialize) allday: false, (Boolean - Is
						 * event an all day event) title: "Title 1", (String -
						 * Event title) url:
						 * "http://yourdomain.com/events/thisevent", (String -
						 * Event URL (if any)) body: "This is the body", (String -
						 * Event body text (if any)) attributes:
						 * {Location:"Location 1",Chair:"John Doe"}, (Object -
						 * All attributes you want in name value pairs) type:
						 * ["meeting","reminder"] (Array - Event/Icon types you
						 * want for this event. See "eventtypes") } }
						 */
						if (entriesObj != "" && typeof entriesObj == "string") {
							entriesObj = dojo.json.evalJson(entriesObj);
						}
						if (entriesObj) {
							this.calendarEvents = entriesObj;
							this.onSetCalendarEntries();
						}
					},// end of funcion set calendar entries

					/**
					 * *** ***************** setCurrentResource free/busy time
					 * displayed*******
					 */
					onSetResourcesCal : function() {

						if (this.DisplayResource) {

							var startDate, endDate, rStartTime, oDateObject, oLI, oSpan, sHTML, src, oAttributes, iAttr;
							var oDiv, toolTip, oToolTip, tooltipArgs, oImgDiv;

							var Resource;

							for ( var i in this.ResourcesCal) {

								Resource = this.ResourcesCal[i];

								for ( var j in Resource.Schedule) {
									DaySch = Resource.Schedule[j];
									// get the resource name and color..

									// Resource.Name;
									// Resource.Color;
									// startT=DaySch.starttime;
									startDate = dojo.date
											.fromRfc3339(DaySch.starttime);
									endDate = dojo.date
											.fromRfc3339(DaySch.endtime);
									nextDate = startDate;
									// ////  //console.log(startDate);
									// ////  //console.log(endDate);

									oDateObject = dojo.byId("Day_"
											+ dojo.date.toRfc3339(nextDate,
													'dateOnly'));
									if (oDateObject) {
										this.createResourceTime(Resource,
												DaySch, oDateObject);
									}
									// ////  //console.log(dojo.date.compare(startDate,endDate,
									// dojo.date.compareTypes.DATE))
									if (dojo.date.compare(startDate, endDate,
											dojo.date.compareTypes.DATE) != 0) {
										// fro loop from startdate till end
										// date.
										var daydiff = dojo.date.diff(startDate,
												endDate,
												dojo.date.dateParts.DAY);
										// ////  //console.log("day diffff
										// "+daydiff);

										for ( var d = 0; d < daydiff; d++) {

											nextDate = dojo.date.add(nextDate,
													dojo.date.dateParts.DAY, 1);

											oDateObject = dojo.byId("Day_"
													+ dojo.date.toRfc3339(
															nextDate,
															'dateOnly'));
											if (oDateObject) {
												this.createResourceTime(
														Resource, DaySch,
														oDateObject);
											}

										}// for days

									}// if different days

									// for this day in shcedule get start tiem
									// and end time.
									// start from the start day
									// //get the calendar item (html item )0
									// add resource display clas for the type
									// check status

								}// for each schedule.......

							}// for each resource...

						}// if display resources..........

					},
					/**
					 * *** ***************** setResourceEntries free/busy time
					 * displayed*******
					 */
					setResourceEntries : function(entriesObj) {

						if (entriesObj != "" && typeof entriesObj == "string") {
							entriesObj = dojo.json.evalJson(entriesObj);
						}
						if (entriesObj) {
							// //  //console.log(" [ line 1432 (setResourceEntries)]
							// in the resources entries. ");
							this.ResourcesCal = entriesObj;
							this.onSetResourcesCal();
						}

					},

					onSetCalendarConflictEntries:function (){

					//		console.log("now i am in conflict");
						     if (this.ConflictStatus){

						     	ConflictSize=this.ConflictEntries.length;
						     		for ( i=0;i< ConflictSize;i++){
						     	//		console.log("now i am in conflict entry "+i+"  from  "+ ConflictSize);
						     			ConflictDay=this.ConflictEntries[i];

						     			ConflictDate=dojo.date
											.fromRfc3339(ConflictDay.Day);


						     			dateString=dojo.date.toRfc3339(ConflictDate,'dateOnly');


						     			oDateObject = dojo.byId( "Day_"+dateString);

						     	//		console.log("  The date is conflict date is  "+ConflictDate);
						     	//		console.log("  The date is string  date is  "+dateString);

						     			if (oDateObject) {

						     	//		console.log("the day is found ");
						     			         this.ConflictDayColor(oDateObject,ConflictDay.Reason);
						     			          this.ConflictDayToolTipTest(oDateObject,ConflictDay);


						     			}//if data object


						     		}//for conflicts size





						     }// if conflict status ==true

//			  this.TotalConflicts
//	this.ConflictsDaysCount++;
						     	this.updateUserMessage(" There are "+this.TotalConflicts+ " Conflicts "+"  in "+this.ConflictsDaysCount+ " Days ");

					},
					ConflictDayToolTipTest:function (oDateObject,ConflictDay){

								//	console.log("add toooooooooooooool tip ");

						//first getting formating the tool tip

						//oToolTipMain = document.createElement('span');
							oToolTip = document.createElement('span');
						//addin the first reasons

								oDiv = document.createElement('div');
						dojo.html.setClass(oDiv, "toolkittitle" );
						oDiv.innerHTML=" Conflicts ";
						 oToolTip.appendChild(oDiv);




						    		mainString="";
							oDivmain = document.createElement('div');
							dojo.html.setClass(oDivmain, "toolkitbody");
							if (ConflictDay.ConflictNo==1)
										mainString=" There is "+ConflictDay.ConflictNo +"  conflict with details : <br>";
				else
							mainString=" There are "+ConflictDay.ConflictNo +"  conflicts : <br>";
							oDivmain.innerHTML= mainString;
							oToolTip.appendChild(oDivmain);




							for( var ce = 0; ce < ConflictDay.ConflictNo; ce++){

								var Conflict =ConflictDay.Conflicts[ce];

								oDiv = document.createElement('div');
							dojo.html.setClass(oDiv, "toolkitbody");
							 if (Conflict.Reason==1){

							 		TheConflictString= "A Resource conflict  ";

							 }
							 else {
							 	if (Conflict.Reason==2)
							 		TheConflictString= " A Venue conflict ";
							 		else
							 		 		TheConflictString= " A Session conflict (AB premises) ";

							 }

							if (Conflict.Course1RunNo!=0&&Conflict.Course2RunNo!=0){

							TheConflictString= TheConflictString+" between Course   = " + Conflict.Course1Name +" G# " +Conflict.Course1RunNo +" "+
							 " and Course   = " + Conflict.Course2Name +" G# " +Conflict.Course2RunNo +" <br> ";
							}




							 if (Conflict.Reason==1){
							 TheConflictString=TheConflictString+"  and the name of the resource is  ";


							 }else if (Conflict.Reason==2){

						  TheConflictString=TheConflictString+"  and the name of the venue is ";


							 }
							   TheConflictString=TheConflictString+Conflict.Name;
							oDiv.innerHTML = TheConflictString;
							oToolTip.appendChild(oDiv);

							}//loops on the conflict of this day




			//addin the tool tip
						dojo.body().appendChild(oToolTip);
								tooltipArgs = {
									connectId :oDateObject.id,
									templateCssPath :"",
									toggle :"fade"
								};
								toolTip = dojo.widget.createWidget(
										"dojo:Tooltip", tooltipArgs, oToolTip);





					},
					ConflictDayToolTip:function (oDateObject,ConflictDay){

					//	console.log("add toooooooooooooool tip ");

						//first getting formating the tool tip

						//oToolTipMain = document.createElement('span');
							oToolTip = document.createElement('span');
						//addin the first reasons
						numberOfConflicts=1;
						if (ConflictDay.Reason>3)
						 {
						 	numberOfConflicts=2;
						 }



							oDivmain = document.createElement('div');
							dojo.html.setClass(oDivmain, "toolkitbody");
							mainString=" There are "+numberOfConflicts +" Conflicts ";
						//	oDivmain.innerHTML = " There are "+numberOfConflicts +" details are:";

						if (ConflictDay.Reason==1||ConflictDay.Reason==4||ConflictDay.Reason==5)
						{  //resource conflict

							mainString= mainString+" a Resource Conflict ";
							if (ConflictDay.Reason==4||ConflictDay.Reason==5)
							{
								mainString= mainString+" and ";


							}
									if (ConflictDay.ResourceCourse1Name != "" && ConflictDay.ResourceCourse1RunNo!=0) {

							oDiv = document.createElement('div');
							dojo.html.setClass(oDiv, "toolkitbody");
							oDiv.innerHTML = "a Resource Conflict between  Course   = " + ConflictDay.ResourceCourse1Name +" G# " +ConflictDay.ResourceCourse1RunNo +" ";

							oToolTip.appendChild(oDiv);

						}

								if (ConflictDay.ResourceCourse2Name != "" && ConflictDay.ResourceCourse2RunNo!=0) {




							oDiv = document.createElement('div');
							dojo.html.setClass(oDiv, "toolkitbody2");
							oDiv.innerHTML = " and Course  = " + ConflictDay.ResourceCourse2Name +" G# " +ConflictDay.ResourceCourse2RunNo +" ";

							oToolTip.appendChild(oDiv);

						}

								if (ConflictDay.ResourceName!= ""  ) {

							oDiv = document.createElement('div');
							dojo.html.setClass(oDiv, "toolkitbody2");
							oDiv.innerHTML = " For the resource = " + ConflictDay.ResourceName ;

							oToolTip.appendChild(oDiv);

						}


						}
						 if  (ConflictDay.Reason==2||ConflictDay.Reason==3||ConflictDay.Reason==4||ConflictDay.Reason==5){
									mainString= mainString+"  Venue Conflict";

									if (ConflictDay.VenueCourse1Name != "" && ConflictDay.VenueCourse1RunNo!=0) {

							oDiv = document.createElement('div');
							dojo.html.setClass(oDiv, "toolkitbody");
							oDiv.innerHTML = " Venue Conflict between Course   = " + ConflictDay.VenueCourse1Name +" G# " +ConflictDay.VenueCourse1RunNo +" ";

							oToolTip.appendChild(oDiv);

						}

								if (ConflictDay.VenueCourse2Name != "" && ConflictDay.VenueCourse2RunNo!=0) {

							oDiv = document.createElement('div');
							dojo.html.setClass(oDiv, "toolkitbody2");
							oDiv.innerHTML = " and Course  = " + ConflictDay.VenueCourse2Name +" G# " +ConflictDay.VenueCourse2RunNo +" ";

							oToolTip.appendChild(oDiv);

						}






						}
						oDivmain.innerHTML = mainString;




							oToolTip.insertBefore(oDivmain,
												oToolTip.childNodes[0]);


								oDiv = document.createElement('div');
						dojo.html.setClass(oDiv, "toolkittitle" );
						oDiv.innerHTML=" Conflicts ";
						 	//oToolTip.appendChild(oDiv);

						 	oToolTip.insertBefore(oDiv,
												oToolTip.childNodes[0]);


			//addin the tool tip
						dojo.body().appendChild(oToolTip);
								tooltipArgs = {
									connectId :oDateObject.id,
									templateCssPath :"",
									toggle :"fade"
								};
								toolTip = dojo.widget.createWidget(
										"dojo:Tooltip", tooltipArgs, oToolTip);


					},
					ConflictDayColor:function(oDateObject,Reason){
							currentClassName = oDateObject.className;

										+ "TrainerBusyDay";
						/****  eiter do this way or ********/
						ReasonClass="";
						if (Reason==1){
					//	oDateObject.style.backgroundColor="RED";  ///resource

						ReasonClass="ResourceConflict";
					}
						if (Reason==2){
						 //	oDateObject.style.backgroundColor="Yellow"; //venue

						 			ReasonClass="VenueConflict";
					}
						 	if (Reason==3){
						 //	oDateObject.style.backgroundColor="Yellow";//session
						 			ReasonClass="VenueConflict";//VenueConflict  SessionConflict

						 	//
						 	}
						 		else if (Reason>=4){
						 //	oDateObject.style.backgroundColor="Orange"; //session and resource
						 	//
						 	//
						 			ReasonClass="ResourceVenueConflict";//

						  }

						 currentClassName = currentClassName +" "+ReasonClass;

						  dojo.html.setClass(oDateObject, currentClassName);

					},

setCalendarConflictEntries: function (/*Object|String*/ entriesObj){


						if (entriesObj != "" && typeof entriesObj == "string") {
							entriesObj = dojo.json.evalJson(entriesObj);
						}
						if (entriesObj) {
							this.ConflictEntries = entriesObj;
							this.onSetCalendarConflictEntries();
						}



},
					/**
					 * *** ***************** createResourceTime
					 * *****************************
					 */
					createResourceTime : function(resource, schedule, dateDiv) {

						currentClassName = dateDiv.className;
						// ////  //console.log("before the remove ");
						// ////  //console.log(eval(oCourseObject));

						prevResource = dateDiv.getAttribute("ResourceID");
						if (prevResource != null) {
							// check if resource if
							if (currentClassName.match("TrainerBusyDay") == null) {
								currentClassName.replace("TrainerBusyDay", "");
								currentClassName.replace("TrainerTentiveDay",
										"");
								currentClassName = currentClassName + "  "
										+ "TrainerBusyDay";
							}

						} else {

							dateDiv.setAttribute("ResourceName", resource.Name);
							dateDiv.setAttribute("ResourceID", resource.ID);

							if (currentClassName.match("Trainer") == null) {
								if (schedule.BusyState.match("Busy")) {

									currentClassName = currentClassName + " "
											+ "TrainerBusyDay";

								}// if busy
								if (schedule.BusyState.match("Tentive")) {

									currentClassName = currentClassName + " "
											+ "TrainerTentiveDay";

								}// if busy
							} else {

								currentClassName.replace("TrainerBusyDay", "");
								currentClassName.replace("TrainerTentiveDay",
										"");
								currentClassName = currentClassName + "  "
										+ "TrainerBusyDay";

							}
						}// end else

						dojo.html.setClass(dateDiv, currentClassName);
						// }
					},

					/**
					 * *** ***************** onSetHolidayEntries
					 * *****************************
					 */
					/***********************************************************
					 * This function Re render the holiday entries is algorithm
					 * as following. 1. get the dates of the holiday 2. see if
					 * the date in the current view/ 3. if the view contain the
					 * date add the holiday class to the date div so it can be
					 * rendered diffrentaly
					 *
					 *
					 **********************************************************/
					onSetHolidayEntries : function() {
						if (this.DisplayHoliday) {

							// var startDate, endDate, rStartTime, oDateObject,
							// oLI, oSpan, sHTML, src, oAttributes, iAttr;
							// var oDiv, toolTip, oToolTip, tooltipArgs,
							// oImgDiv;

							var Holiday;

							for ( i=0;i<this.HolidayEntries.length ;i++) {

								Holiday = this.HolidayEntries[i];


								if (Holiday.OneDay) {

								startDate = dojo.date
											.fromRfc3339(Holiday.starttime);
									oDateObject = dojo.byId("Day_"
											+ dojo.date.toRfc3339(startDate,
													'dateOnly'));
									if (oDateObject) {
										this
												.createHoliday(Holiday,
														oDateObject);
									}
									// ////  //console.log("one
									// day....."+onDateObject.innerHTML) ;
								} else {


                                //  console.log(" int holiday no. "+i);
                             if (Holiday.starttime!="")
									startDate = dojo.date
											.fromRfc3339(Holiday.starttime);
							 if (Holiday.endtime!="")
									endDate = dojo.date
											.fromRfc3339(Holiday.endtime);



									nextDate = startDate;

									oDateObject = dojo.byId("Day_"
											+ dojo.date.toRfc3339(nextDate,
													'dateOnly'));
									if (oDateObject) {
										this
												.createHoliday(Holiday,
														oDateObject);
									}
									if (dojo.date.compare(startDate, endDate,
											dojo.date.compareTypes.DATE) != 0) {
										// ////  //console.log(" different
										// days............")
										// fro loop from startdate till end
										// date.
										var daydiff = dojo.date.diff(startDate,
												endDate,
												dojo.date.dateParts.DAY);
										// ////  //console.log(" duration in days
										// ......"+daydiff);

										for ( var d = 0; d < daydiff; d++) {

											nextDate = dojo.date.add(nextDate,
													dojo.date.dateParts.DAY, 1);
											oDateObject = dojo.byId("Day_"
													+ dojo.date.toRfc3339(
															nextDate,
															'dateOnly'));
											if (oDateObject) {
												this.createHoliday(Holiday,
														oDateObject);
											}

										}// for days

									}// if different days

								}// for each schedule.......

							}// for each resource...

						}// if display resources..........

					},
					/** *******************************setHolidayEntries**************************************************** */

					/***********************************************************
					 * this is function is called when the holidays are changed
					 * it then call the function to rerender the holdiay to
					 * current view.
					 **********************************************************/
					setHolidayEntries : function(entriesObj) {

						if (entriesObj != "" && typeof entriesObj == "string") {
							entriesObj = dojo.json.evalJson(entriesObj);
						}
						if (entriesObj) {
							// //  //console.log(" [ line 1574 (setHolidayEntries)]
							// in the holidays entries ");
							this.HolidayEntries = entriesObj;
							this.onSetHolidayEntries();
						}

					},

					/***********************************************************
					 * createHoliday The actual render of the holiday day.
					 *
					 **********************************************************/
					createHoliday : function(Holiday, oDateObject) {

						prevHoliday = oDateObject.getAttribute("Holiday");
						if (prevHoliday != null) {

							return;

						} else {

							oDateObject.setAttribute("Holiday", Holiday.Name);
							// dateDiv.setAttribute("ResourceID",resource.ID);
							currentClassName = oDateObject.className;

							if (currentClassName.match("Holiday") == null) {

								currentClassName = currentClassName + " "
										+ "Holiday";

							}
							dojo.html.setClass(oDateObject, currentClassName);

						}// end else

					},
					/**
					 * *** *****************change a time zone of the calendar
					 * ..................................*******
					 */
					setTimeZones : function(/* Object|String */timezoneObj) {
						if (timezoneObj != "" && typeof timezoneObj == "string") {
							timezoneObj = dojo.json.evalJson(timezoneObj);
						}
						if (timezoneObj) {
							dojo.html.setClass(this.timezoneLabelNode,
									"selecticon timezoneicon");
							this.timezones = timezoneObj;
						}
					},

					createSmallEventToolTip : function(course, eventData) {

						startDate = dojo.date.fromRfc3339(eventData.starttime);
						// ////  //console.log("start data "+eventData.starttime)
						// ////  //console.log("start data "+startDate)
						// ////  //console.log("create new table ..............")
						endDate = dojo.date.fromRfc3339(eventData.endtime);
						sDate = dojo.date.format(startDate, {
							formatLength :"medium",
							selector :"dateOnly",
							locale :this.lang
						}) + "<br />";
						sStart = sHTML = sEnd = '';

						/**
						 * ******************** create a tool tips object
						 * *************************************
						 */
						oToolTip = document.createElement('span');
						oImgDiv = document.createElement('div');
						oToolTip.appendChild(oImgDiv);

						//removed by maha on 18-oct.
						//oToolTip.style.backgroundColor = course.MainColor;
						addingClass = "";
//						if (isDarkColor(course.MainColor)) {
//							addingClass = "  lightfont";
//
//						}
						// if(this.calendarType!='MultiMonth'){
						// oSpan = document.createElement('span');
						// }
						/**
						 * *** ***************** add the imge for course type
						 * *************************************
						 */
						for ( var t = 0; t < course.type.length; t++) {
							if (this.eventtypes[course.type[t]]) {
								oImage = document.createElement("img");
								oImage.setAttribute("title",
										this.eventtypes[course.type[t]].title);
								oImage.setAttribute("src",
										this.eventtypes[course.type[t]].src);
								// if(this.calendarType!='MultiMonth' ){
								// oSpan.appendChild(oImage);
								// oLI.appendChild(oSpan);
								// }
								oImgDiv.appendChild(oImage.cloneNode(true));
							}
						}

						oDiv = document.createElement('div');
						dojo.html.setClass(oDiv, "toolkittime" + addingClass);
						oDiv.innerHTML = sDate
								+ sStart
								+ (Number(startDate) != Number(endDate) ? sHTML
										: "") + sEnd;
						oToolTip.appendChild(oDiv);
						/**
						 * *** ***************** now add all other tool tip
						 * details *************************************
						 */

						oDiv = document.createElement('div');
						dojo.html.setClass(oDiv, "toolkittitle" + addingClass);
						oDiv.innerHTML = course.title;
						oToolTip.appendChild(oDiv);
						/**
						 * *** ***************** details
						 * *************************************
						 */

						if (course.Details != "") {
							oDiv = document.createElement('div');
							dojo.html.setClass(oDiv, "toolkitbody"
									+ addingClass);
							oDiv.innerHTML = course.Details;
							oToolTip.appendChild(oDiv);
						}
						/**
						 * *** ***************** client
						 * *************************************
						 */

						if (course.Client != "") {

							oDiv = document.createElement('div');
							dojo.html.setClass(oDiv, "toolkitbody"
									+ addingClass);
							oDiv.innerHTML = "<b> Client  :  </b> "
									+ course.Client;
							oToolTip.appendChild(oDiv);

						}

						/**
						 * *** ***************** location
						 * *************************************
						 */
						if (course.Location != "") {

							oDiv = document.createElement('div');
							dojo.html.setClass(oDiv, "toolkitbody"
									+ addingClass);
							oDiv.innerHTML = "<b> Location  :  </b> "
									+ course.Location;
							oToolTip.appendChild(oDiv);

						}
						/**
						 * *** ***************** coordinaotrs
						 * *************************************
						 */
						var NamesDiv = document.createElement('div');

						dojo.html.setClass(NamesDiv, "toolkitbody"
								+ addingClass);
						if (course.CoordinatorName != "") {

							oDiv = document.createElement('span');
							dojo.html.setClass(oDiv, "toolkitbody"
									+ addingClass);
							oDiv.innerHTML = " <b>  Coordinator Name :  </b> "
									+ course.CoordinatorName;
							NamesDiv.appendChild(oDiv);

						}
						/**
						 * *** ***************** Resource
						 * *************************************
						 */

						if (course.ResourceName != "") {

							oDiv = document.createElement('span');
							dojo.html.setClass(oDiv, "toolkitbody"
									+ addingClass);
							oDiv.innerHTML = " <b>  Resource Name :  </b> "
									+ course.ResourceName;
							NamesDiv.appendChild(oDiv);

						}
						oToolTip.appendChild(NamesDiv);
						/**
						 * *** ***************** no of runs
						 * *************************************
						 */

						if (course.RunNo > 0) {

							oDiv = document.createElement('span');
							dojo.html.setClass(oDiv, "toolkitbody"
									+ addingClass);
							oDiv.innerHTML = "<b>  G # : </b> " + course.RunNo;
							oToolTip.appendChild(oDiv);

						}

						/**
						 * *** ***************** no of days
						 * *************************************
						 */

						if (course.Days > 0 && eventData.DayNo > 0) {
							oDiv = document.createElement('span');
							dojo.html.setClass(oDiv, "toolkitbody"
									+ addingClass);
							oDiv.innerHTML = "  <b> Day # </b> "
									+ eventData.DayNo;
							oToolTip.appendChild(oDiv);

							oDiv = document.createElement('span');
							dojo.html.setClass(oDiv, "toolkitbody"
									+ addingClass);
							oDiv.innerHTML = " of " + course.Days + "  Days ";
							oToolTip.appendChild(oDiv);

						}

						// Day.DayNo
						// Course.Location

						return oToolTip;
					},

					/**
					 * ********************create the div and html for the tool
					 * tip ..................................*******
					 */
					/***********************************************************
					 * this function is called to render the event tool tip.
					 *
					 **********************************************************/
					createEventToolTip : function(course, eventData) {

						startDate = dojo.date.fromRfc3339(eventData.starttime);
						// ////  //console.log("start data "+eventData.starttime)
						// ////  //console.log("start data "+startDate)
						// ////  //console.log("create new table ..............")
						endDate = dojo.date.fromRfc3339(eventData.endtime);
						sDate = dojo.date.format(startDate, {
							formatLength :"medium",
							selector :"dateOnly",
							locale :this.lang
						}) + "<br />";
						sStart = sHTML = sEnd = '';

						/**
						 * *** ***************** create a tool tips object
						 * *************************************
						 */
						oToolTip = document.createElement('span');
						oImgDiv = document.createElement('div');
						oToolTip.appendChild(oImgDiv);

						// if(this.calendarType!='month'){
						// oSpan = document.createElement('span');
						// }

						/**
						 * *** ***************** add the imge for course type
						 * *************************************
						 */
						for ( var t = 0; t < course.type.length; t++) {
							if (this.eventtypes[course.type[t]]) {
								oImage = document.createElement("img");
								oImage.setAttribute("title",
										this.eventtypes[course.type[t]].title);
								oImage.setAttribute("src",
										this.eventtypes[course.type[t]].src);
								// if(this.calendarType!='month'){
								// oSpan.appendChild(oImage);
								// oLI.appendChild(oSpan);
								// }
								oImgDiv.appendChild(oImage.cloneNode(true));
							}
						}

						oDiv = document.createElement('div');
						dojo.html.setClass(oDiv, "toolkittime");
						oDiv.innerHTML = sDate
								+ sStart
								+ (Number(startDate) != Number(endDate) ? sHTML
										: "") + sEnd;
						oToolTip.appendChild(oDiv);
						/**
						 * *** ***************** now add all other tool tip
						 * details *************************************
						 */

						oDiv = document.createElement('div');
						dojo.html.setClass(oDiv, "toolkittitle");
						oDiv.innerHTML = course.title;
						oToolTip.appendChild(oDiv);
						/**
						 * *** ***************** details
						 * *************************************
						 */

						if (course.Details != "") {
							oDiv = document.createElement('div');
							dojo.html.setClass(oDiv, "toolkitbody");
							oDiv.innerHTML = course.Details;
							oToolTip.appendChild(oDiv);
						}
						/**
						 * *** ***************** client
						 * *************************************
						 */

						if (course.Client != "") {

							oDiv = document.createElement('div');
							dojo.html.setClass(oDiv, "toolkitbody");
							oDiv.innerHTML = " Client  : " + course.Client;
							oToolTip.appendChild(oDiv);

						}

						/**
						 * *** ***************** no of runs
						 * *************************************
						 */

						if (course.RunNo > 0) {

							oDiv = document.createElement('span');
							dojo.html.setClass(oDiv, "toolkitbody");
							oDiv.innerHTML = " Run Number : " + course.RunNo;
							oToolTip.appendChild(oDiv);

						}
						/**
						 * *** ***************** coordinaotrs
						 * *************************************
						 */

						if (course.CoordinatorName != "") {

							oDiv = document.createElement('span');
							dojo.html.setClass(oDiv, "toolkitbody");
							oDiv.innerHTML = " Course CoordinatorName : "
									+ course.CoordinatorName;
							oToolTip.appendChild(oDiv);

						}

						return oToolTip;
					},
					createSmallColorEvent : function(course, eventData,
							eventindex) {
						// ////  //console.log(" -------- "+"
						// "+eventindex+""+eventindex+""+eventindex+""+eventindex+""+eventindex+""+eventindex+""+eventindex+""+eventindex+""+eventindex+""+eventindex+"
						// --- ")
						/**
						 * *** ***************** get time data from event
						 * ..................................*******
						 */
						var hasTimeZone = false;
						if (typeof this.selectedtimezone != "string"
								&& this.selectedtimezone != null) {
							hasTimeZone = true;
						}// end of time zone
						// ////  //console.log(dojo.json.serialize(eventData));

						startDate = dojo.date.fromRfc3339(eventData.starttime);
						// ////  //console.log("start data "+eventData.starttime)
						// ////  //console.log("start data "+startDate)
						// ////  //console.log("create new table ..............")
						endDate = dojo.date.fromRfc3339(eventData.endtime);
						sDate = dojo.date.format(startDate, {
							formatLength :"medium",
							selector :"dateOnly",
							locale :this.lang
						}) + "<br />";
						sStart = sHTML = sEnd = '';

						/**
						 * *** ***************** create the html object that
						 * will carry the data *******
						 */

						listDiv = document.createElement("div");

						otable = document.createElement("table");
						otable.cellPadding = 0;
						otable.cellSpacing = 0;
						/*******************************************************
						 * create a Row and column for
						 * colors...............................
						 ******************************************************/
						// / cellspacing="0" cellpadding="0"
						oRow = document.createElement("tr");

						classname = "EventSmallDiv";

						oTd = document.createElement("td");
						if(this.CurrentColorMode == "Courses"){
						oTd.style.backgroundColor = course.MainColor;
					   	otable.style.backgroundColor = course.MainColor;
						}
						else if(this.CurrentColorMode == "Resources"){
						oTd.style.backgroundColor = course.resourceColor;
					   	otable.style.backgroundColor = course.resourceColor;
						}
						else if(this.CurrentColorMode == "Clients"){
						oTd.style.backgroundColor = course.clientColor;
					   	otable.style.backgroundColor = course.clientColor;
						}
						else if(this.CurrentColorMode == "Coordinators"){
						oTd.style.backgroundColor = course.coordinatorColor;
					   	otable.style.backgroundColor = course.coordinatorColor;
						}
						else if(this.CurrentColorMode == "Funding"){
							if(course.funded == 2){
								oTd.style.backgroundColor = "#FF9900";
							   	otable.style.backgroundColor = "#FF9900";
							}
							else if(course.funded == 1){
								oTd.style.backgroundColor = "#009900";
							   	otable.style.backgroundColor = "#009900";
							}
						}

						// oTd.innerHTML=course.MainApp;
						dojo.html.setClass(oTd, classname);

						oRow.appendChild(oTd);
						otable.appendChild(oRow);
						/**
						 * *** Create a row for
						 * infromation..................................*******
						 */
						// ////  //console.log(" the row11 1 "+oRow.innerHTML);
						var oRow2 = oRow;// document.createElement("tr");
						// oRow2.appendChild(oTds);

						oTd2 = oTd;// document.createElement("td");
						classname = "eventTextsmall";
						if (isDarkColor(course.MainColor)) {
							classname += "  lightfont";

						}

						dojo.html.setClass(oTd2, classname);
						// ////  //console.log(eval(otable));
						// ////  //console.log(otable.innerHTML);
						// ////  //console.log("11111111111111111111111111111111111111111")
						/**
						 * *** span for the course name
						 * ..................................*******
						 */

						oSpan = document.createElement('span');

						dojo.html.setClass(oSpan, "titletext");
						// sHTML = course.Name;//.title
						sHTML = course.MainApp + ",";

						if (  course.ClientLegendID )
							sHTML+= course.ClientLegendID ;

					/*	if (course.link != '') {

							sHTML = '<a href="' + course.link
									+ '" target="_blank">' + sHTML + '</a>';
						}*/


						oSpan.innerHTML = sHTML;
						/**
						 * *** Now add spans to table
						 * ..................................*******
						 */
						oTd2.appendChild(oSpan);


						if(this.CurrentColorMode == "Courses"){
						oTd2.style.backgroundColor = course.MainColor;

						}
						else if(this.CurrentColorMode == "Resources"){
						oTd2.style.backgroundColor = course.resourceColor;
						}
						else if(this.CurrentColorMode == "Clients"){
						oTd2.style.backgroundColor = course.clientColor;
						}
						else if(this.CurrentColorMode == "Coordinators"){
						oTd2.style.backgroundColor = course.coordinatorColor;
						}
						else if(this.CurrentColorMode == "Funding"){
							if(course.funded == 2){
								oTd2.style.backgroundColor = "#FF9900";
							}
							else if(course.funded == 1){
								oTd2.style.backgroundColor = "#009900";
							}
						}


						//oTd2.style.backgroundColor = course.MainColor;
						// ////  //console.log(" the td "+oTd2.innerHTML);
						oRow2.appendChild(oTd2);
						// ////  //console.log(" the row "+oRow2.innerHTML);
						otable.appendChild(oRow2);
						classname = "EventSmallDiv";
						// dojo.html.setClass( otable, classname);
						// dojo.event.connect(oRow2, "onclick", this,
						// "OnEventClick");

						/**
						 * *** add the tool tip id
						 * ..................................*******
						 */
						otable.id = "toolTip" + eventindex;

						/**
						 * *** add events attrib and click
						 * ..................................*******
						 */

						listDiv.setAttribute("CourseID", Number(course.ID));
						listDiv.id = "CourseEvent_" + course.ID;
						listDiv.setAttribute("courseindex", Number(eventindex));

						// dojo.event.connect( otable, "onclick", this,
						// "OnEventClick");

						if(this.CurrentColorMode == "Courses"){
							listDiv.style.backgroundColor = course.MainColor;

						}
						else if(this.CurrentColorMode == "Resources"){
							listDiv.style.backgroundColor = course.resourceColor;
						}
						else if(this.CurrentColorMode == "Clients"){
						listDiv.style.backgroundColor = course.clientColor;
						}
						else if(this.CurrentColorMode == "Coordinators"){
							listDiv.style.backgroundColor = course.coordinatorColor;
						}
						else if(this.CurrentColorMode == "Funding"){
							if(course.funded == 2){
									listDiv.style.backgroundColor = "#FF9900";
							}
							else if(course.funded == 1){
									listDiv.style.backgroundColor = "#009900";
							}
						}

					//listDiv.style.backgroundColor = course.MainColor;
						listDiv.appendChild(otable);

						classname = "EventSmallDiv";
						dojo.html.setClass(listDiv, classname);

						return listDiv

					},
					createColoredDayEvent : function(course, eventData,
							eventindex) {
						var hasTimeZone = false;
						if (typeof this.selectedtimezone != "string"
								&& this.selectedtimezone != null) {
							hasTimeZone = true;
						}// end of time zone
						// ////  //console.log(dojo.json.serialize(eventData));

						startDate = dojo.date.fromRfc3339(eventData.starttime);
						// ////  //console.log("start data "+eventData.starttime)
						// ////  //console.log("start data "+startDate)
						// ////  //console.log("create new table ..............")
						endDate = dojo.date.fromRfc3339(eventData.endtime);
						sDate = dojo.date.format(startDate, {
							formatLength :"medium",
							selector :"dateOnly",
							locale :this.lang
						}) + "<br />";
						sStart = sHTML = sEnd = '';

						/**
						 * *** ***************** create the html object that
						 * will carry the data *******
						 */

						listDiv = document.createElement("div");

						otable = document.createElement("table");
						otable.cellPadding = 0;
						otable.cellSpacing = 0;
						/*******************************************************
						 * create a Row and column for
						 * colors...............................
						 ******************************************************/
						// / cellspacing="0" cellpadding="0"
						oRow = document.createElement("tr");
						classname = "RightEventLabel";
						oTds = document.createElement("td");
						oTds.style.backgroundColor = getColorBasedOnGroup(
								course.RunNo, course.Runs, course.MainColor);
						// oTds.style.backgroundColor=course.SecColor;
						// oTds.innerHTML=course.SecApp;
						oTds.innerHTML = eventData.DayNo + "/" + course.Days;
						dojo.html.setClass(oTds, classname);

						oTds.rowSpan = 2;
						// // ////  //console.log(" the row11 1 "+oTds.innerHTML);
						// //oTds.style.backgroundColor="Red";
						// // oTds.innerHTML="RA";
						//
						//
						// dojo.html.setClass(oTds, classname);
						//
						// classname="UpperEventLabel";
						//
						// oTd=document.createElement("td");
						// oTd.style.backgroundColor=course.MainColor;
						// oTd.innerHTML=course.MainApp;
						// dojo.html.setClass(oTd, classname);
						// oRow.appendChild(oTds);
						// oRow.appendChild(oTd);
						// otable.appendChild(oRow);
						/**
						 * *** Create a row for
						 * infromation..................................*******
						 */
						// ////  //console.log(" the row11 1 "+oRow.innerHTML);
						var oRow2 = document.createElement("tr");
						// oRow2.appendChild(oTds);

						oTd2 = document.createElement("td");

						// ////  //console.log(eval(otable));
						// ////  //console.log(otable.innerHTML);
						/**
						 * *** span for the
						 * time..................................*******
						 */
						oSpan = document.createElement('span');

						/**
						 * *** span for the course name
						 * ..................................*******
						 */

						oSpan = document.createElement('span');

						dojo.html.setClass(oSpan, "titletext");

						sHTML = getSmallerLengthString(course.title,
								course.title.length);// .title
						// sHTML+=",G#"+course.RunNo;
						// sHTML+=","+getSmallerLengthString(course.ResourceName,Max_Length);
						// sHTML+=","+getSmallerLengthString(course.Client,Max_Length);

						// if ( course.Period.match("S")||
						// eventData.Period.match("S")){
						//
						// if ( course.Period.match("S"))
						// sHTML+=","+course.Period;
						// else
						// sHTML+=","+eventData.Period;
						// }

						oSpan.innerHTML = " <b>  " + sHTML + " </b>";

						/**
						 * *** Now add spans to table
						 * ..................................*******
						 */
						oTd2.appendChild(oSpan);

						if(this.CurrentColorMode == "Courses"){
						oTd2.style.backgroundColor = course.MainColor;

						}
						else if(this.CurrentColorMode == "Resources"){
						oTd2.style.backgroundColor = course.resourceColor;
						}
						else if(this.CurrentColorMode == "Clients"){
						oTd2.style.backgroundColor = course.clientColor;
						}
						else if(this.CurrentColorMode == "Coordinators"){
						oTd2.style.backgroundColor = course.coordinatorColor;
						}
						else if(this.CurrentColorMode == "Funding"){
							if(course.funded == 2){
								oTd2.style.backgroundColor = "#FF9900";
							}
							else if(course.funded == 1){
								oTd2.style.backgroundColor = "#009900";
							}
						}


						//oTd2.style.backgroundColor = course.MainColor;
						if (isDarkColor(course.MainColor)) {
							classname = "eventText lightfont";

						} else {
							classname = "eventText";
						}
						dojo.html.setClass(oTd2, classname);
						// ////  //console.log(" the td "+oTd2.innerHTML);
						oRow2.appendChild(oTds);
						oRow2.appendChild(oTd2);
						// ////  //console.log(" the row "+oRow2.innerHTML);
						otable.appendChild(oRow2);

						// now add all other information

						var oRow3 = document.createElement("tr");
						oTd3 = document.createElement("td");
						// oTd3.colSpan=2;
						//oTd3.style.backgroundColor = course.MainColor;

						if(this.CurrentColorMode == "Courses"){
						oTd3.style.backgroundColor = course.MainColor;

						}
						else if(this.CurrentColorMode == "Resources"){
						oTd3.style.backgroundColor = course.resourceColor;
						}
						else if(this.CurrentColorMode == "Clients"){
						oTd3.style.backgroundColor = course.clientColor;
						}
						else if(this.CurrentColorMode == "Coordinators"){
						oTd3.style.backgroundColor = course.coordinatorColor;
						}
						else if(this.CurrentColorMode == "Funding"){
							if(course.funded == 2){
								oTd3.style.backgroundColor = "#FF9900";
							}
							else if(course.funded == 1){
								oTd3.style.backgroundColor = "#009900";
							}
						}

						dojo.html.setClass(oTd3, classname);
						TempString = "";

						if (course.Details != "") {

							// dojo.html.setClass(oDiv,
							// "toolkitbody"+addingClass);
							TempString += course.Details + ",";

						}
						/**
						 * *** ***************** client
						 * *************************************
						 */

						if (course.Client != "") {

							oDiv = document.createElement('span');
							// dojo.html.setClass(oDiv,
							// "toolkitbody"+addingClass);
							TempString += "   <b> Client  :  </b> "
									+ course.Client + ",";

						}

						/**
						 * *** ***************** coordinaotrs
						 * *************************************
						 */
						// var NamesDiv = document.createElement('span');
						// dojo.html.setClass(NamesDiv ,
						// "toolkitbody"+addingClass);
						if (course.CoordinatorName != "") {
							// /
							// oDiv = document.createElement('span');
							// dojo.html.setClass(oDiv,
							// "toolkitbody"+addingClass);
							TempString += "  <b>  Coordinator Name :  </b> "
									+ course.CoordinatorName + ",";
							// NamesDiv.appendChild(oDiv);

						}
						/**
						 * *** ***************** Resource
						 * *************************************
						 */

						if (course.ResourceName != "") {

							// oDiv = document.createElement('span');
							// dojo.html.setClass(oDiv,
							// "toolkitbody"+addingClass);
							TempString += "  <b>  Resource Name :  </b> "
									+ course.ResourceName + ",";
							// NamesDiv.appendChild(oDiv);

						}
						/**
						 * *** ***************** location
						 * *************************************
						 */
						if (course.Location != "") {

							// oDiv = document.createElement('span');
							// /dojo.html.setClass(oDiv,
							// "toolkitbody"+addingClass);
							TempString += "  <b> Location  :  </b> "
									+ course.Location + ",";
							// oTd3.appendChild(oDiv);

						}

						if (eventData.Period != "")
							TempString += "  <b> " + eventData.Period
									+ " </b> , ";
						if (course.Period != "")
							TempString += "  <b> " + course.Period + " </b> , ";

						// oTd3.appendChild(NamesDiv);
						/**
						 * *** ***************** no of runs
						 * *************************************
						 */

						if (course.RunNo > 0) {

							// oDiv = document.createElement('span');
							// dojo.html.setClass(oDiv,
							// "toolkitbody"+addingClass);
							TempString += "  <b>  Group# : </b> "
									+ course.RunNo + ",";
							// oTd3.appendChild(oDiv);

						}

						/**
						 * *** ***************** no of days
						 * *************************************
						 */

						if (course.Days > 0 && eventData.DayNo > 0) {
							// oDiv = document.createElement('span');
							// dojo.html.setClass(oDiv,
							// "toolkitbody"+addingClass);
							TempString += "  <b> Day# </b> " + eventData.DayNo;
							// oTd3.appendChild(oDiv);

							// oDiv = document.createElement('span');
							// dojo.html.setClass(oDiv,
							// "toolkitbody"+addingClass);
							TempString += " of " + course.Days + " Days.";
							// oTd3.appendChild(oDiv);

						}

						oTd3.innerHTML = TempString;
						oRow3.appendChild(oTd3);

						// ////  //console.log(" the row "+oRow2.innerHTML);
						otable.appendChild(oRow3);

						classname = "eventTable";
						dojo.html.setClass(otable, classname);
						/**
						 * *** add the tool tip id
						 * ..................................*******
						 */
						otable.id = "toolTip" + eventindex;

						/**
						 * *** add events attrib and click
						 * ..................................*******
						 */

						listDiv.setAttribute("courseindex", Number(eventindex));
						listDiv.setAttribute("CourseID", Number(course.ID));
						listDiv.id = "CourseEvent_" + course.ID;
						dojo.event.connect(oRow2, "onclick", this,
								"OnEventClick");
						dojo.event.connect(listDiv, "onclick", this,
								"OnEventClick");
						dojo.event.connect(otable, "onclick", this,
								"OnEventClick");

						listDiv.appendChild(otable);

						classname = "eventDiv";
						dojo.html.setClass(listDiv, classname);

						return listDiv
					},
					/**
					 * *** *****************create the dive and html for the
					 * event itself ..................................*******
					 */
					/**
					 * this function render the course event dat with html
					 * objects for display.
					 */
					createColoredEvent : function(course, eventData, eventindex) {
						// ////  //console.log(" -------- "+"
						// "+eventindex+""+eventindex+""+eventindex+""+eventindex+""+eventindex+""+eventindex+""+eventindex+""+eventindex+""+eventindex+""+eventindex+"
						// --- ")
						/**
						 * *** ***************** get time data from event
						 * ..................................*******
						 */
						var hasTimeZone = false;
						if (typeof this.selectedtimezone != "string"
								&& this.selectedtimezone != null) {
							hasTimeZone = true;
						}// end of time zone
						// ////  //console.log(dojo.json.serialize(eventData));

						startDate = dojo.date.fromRfc3339(eventData.starttime);
						// ////  //console.log("start data "+eventData.starttime)
						// ////  //console.log("start data "+startDate)
						// ////  //console.log("create new table ..............")
						endDate = dojo.date.fromRfc3339(eventData.endtime);
						sDate = dojo.date.format(startDate, {
							formatLength :"medium",
							selector :"dateOnly",
							locale :this.lang
						}) + "<br />";
						sStart = sHTML = sEnd = '';

						/**
						 * *** ***************** create the html object that
						 * will carry the data *******
						 */

						listDiv = document.createElement("div");

						otable = document.createElement("table");
						otable.cellPadding = 0;
						otable.cellSpacing = 0;
						/*******************************************************
						 * create a Row and column for
						 * colors...............................
						 ******************************************************/
						// / cellspacing="0" cellpadding="0"

						oRow = document.createElement("tr");
						classname = "RightEventLabel";
						oTds = document.createElement("td");

						oTds.style.backgroundColor = getColorBasedOnGroup(
								course.RunNo, course.Runs, course.MainColor);
						// oTds.style.backgroundColor=course.SecColor;
						// oTds.innerHTML=course.SecApp;
						oTds.innerHTML = eventData.DayNo + "/" + course.Days;

						// oTds.rowSpan=2;
						// ////  //console.log(" the row11 1 "+oTds.innerHTML);
						// oTds.style.backgroundColor="Red";
						// oTds.innerHTML="RA";

						dojo.html.setClass(oTds, classname);

						// classname="UpperEventLabel";

						// oTd=document.createElement("td");
						// oTd.style.backgroundColor=course.MainColor;
						// oTd.innerHTML=course.MainApp;
						// dojo.html.setClass(oTd, classname);
						// oRow.appendChild(oTds);
						// oRow.appendChild(oTd);
						// otable.appendChild(oRow);
						/**
						 * *** Create a row for
						 * infromation..................................*******
						 */
						// ////  //console.log(" the row11 1 "+oRow.innerHTML);
						var oRow2 = document.createElement("tr");
						// oRow2.appendChild(oTds);

						oTd2 = document.createElement("td");

						// ////  //console.log(eval(otable));
						// ////  //console.log(otable.innerHTML);
						/**
						 * *** span for the
						 * time..................................*******
						 */
						oSpan = document.createElement('span');
						// //////  //console.log(dojo.json.serialize(eventData))
						// console.debug(dojo.json.serialize(course));
						// console.debug(dojo.json.serialize(eventData));
						// if(this.changeEventTimes){
						// dojo.html.setClass(oSpan, "timetext");
						// }
						// sStart = dojo.date.format(startDate,
						// {formatLength:"short", selector:"timeOnly",
						// locale:this.lang});
						// //////  //console.log(sStart);
						// sHTML = '';
						// sHTML += ' - ';
						// sHTML += dojo.date.format(endDate,
						// {formatLength:"short", selector:"timeOnly",
						// locale:this.lang});
						// //sHTML+= " "+course.title;
						// //////  //console.log(" shtmls 1041 "+sHTML);
						// sEnd = (hasTimeZone?" (" +
						// unescape(this.selectedtimezone.sn) + ")":"");
						// //////  //console.log("end....... "+sEnd);
						// var spanString;
						//
						// spanString =
						// this.calendarType!='month'&&Number(startDate)!=Number(endDate)?sStart+sHTML:sStart;
						// oSpan.innerHTML = spanString;
						// // ////  //console.log(oSpan.innerHTML);
						// //////  //console.log(oSpan.innerHTML);
						// //
						// ////  //console.log("0000000000000000000000000000000000000000")
						// oTd2.appendChild(oSpan);
						// ////  //console.log("11111111111111111111111111111111111111111")
						/**
						 * *** span for the course name
						 * ..................................*******
						 */

						oSpan = document.createElement('span');

						dojo.html.setClass(oSpan, "titletext");

						//
						// sHTML+= " D("+eventData.DayNo+")" ;
						// if(course.link != ''){
						//
						// sHTML = '<a href="' + course.link + '"
						// target="_blank">' + course.title + '</a>';
						// }
						sHTML = getSmallerLengthString(course.title, Max_Length);// .title
						sHTML += ", G#" + course.RunNo;

						if (!course.ResourceName.match("Not Assigned"))
							sHTML += ", "
									+ getSmallerLengthString(
											course.ResourceName, Max_Length);

						sHTML += ", "
								+ getSmallerLengthString(course.Client,
										Max_Length);

						if (course.Period.match("S")
								|| eventData.Period.match("S")) {

							if (course.Period.match("S"))
								sHTML += ", " + course.Period;
							else
								sHTML += "," + eventData.Period;
						}

						//   //console.log("[] the length of the string is
						// "+sHTML.length)
						if (sHTML.length > 28) {
							// create the smaller size length....

							sHTML = getSmallerLengthString(course.title,
									Max_Length / 2);
							// .title
							sHTML += ",G#" + course.RunNo;

							if (!course.ResourceName.match("Not Assigned"))
								sHTML += ","
										+ getSmallerLengthString(
												course.ResourceName, 5);

							sHTML += ","
									+ getSmallerLengthString(course.Client, 5);

							if (course.Period.match("S")
									|| eventData.Period.match("S")) {

								if (course.Period.match("S"))
									sHTML += "," + course.Period;
								else
									sHTML += "," + eventData.Period;
							}

						}

						oSpan.innerHTML = sHTML;
						/**
						 * *** Now add spans to table
						 * ..................................*******
						 */
						oTd2.appendChild(oSpan);
						//oTd2.style.backgroundColor = course.MainColor;

						if(this.CurrentColorMode == "Courses"){
						oTd2.style.backgroundColor = course.MainColor;

						}
						else if(this.CurrentColorMode == "Resources"){
						oTd2.style.backgroundColor = course.resourceColor;
						}
						else if(this.CurrentColorMode == "Clients"){
						oTd2.style.backgroundColor = course.clientColor;
						}
						else if(this.CurrentColorMode == "Coordinators"){
						oTd2.style.backgroundColor = course.coordinatorColor;
						}
						else if(this.CurrentColorMode == "Funding"){
							if(course.funded == 2){
								oTd2.style.backgroundColor = "#FF9900";
							}
							else if(course.funded == 1){
								oTd2.style.backgroundColor = "#009900";
							}
						}

						if (isDarkColor(course.MainColor)) {
							classname = "eventText lightfont";

						} else {
							classname = "eventText";
						}
						dojo.html.setClass(oTd2, classname);
						// ////  //console.log(" the td "+oTd2.innerHTML);
						oRow2.appendChild(oTds);
						oRow2.appendChild(oTd2);
						// ////  //console.log(" the row "+oRow2.innerHTML);
						otable.appendChild(oRow2);
						classname = "eventTable";
						dojo.html.setClass(otable, classname);
						/**
						 * *** add the tool tip id
						 * ..................................*******
						 */
						otable.id = "toolTip" + eventindex;

						/**
						 * *** add events attrib and click
						 * ..................................*******
						 */

						listDiv.setAttribute("courseindex", Number(eventindex));
						listDiv.setAttribute("CourseID", Number(course.ID));
						listDiv.id = "CourseEvent_" + course.ID;
						dojo.event.connect(oRow2, "onclick", this,
								"OnEventClick");
						dojo.event.connect(listDiv, "onclick", this,
								"OnEventClick");
						dojo.event.connect(otable, "onclick", this,
								"OnEventClick");

						listDiv.appendChild(otable);

						classname = "eventDiv";
						dojo.html.setClass(listDiv, classname);

						return listDiv

					},

					/**
					 * ********* on click of event day
					 * *****************************************
					 */
					onEventClick : function(evt) {

						var eventTarget = evt.target;
						dojo.event.browser.stopEvent(evt);
						// //  //console.log(eval(eventTarget));

						// //  //console.log("couse clicked..........");
						var CourseID = eventTarget.getAttribute("CourseID");
						// ////  //console.log(eval( eventTarget ));
						if (CourseID) {
							EventItemID = "CourseEvent_" + CourseID;
							oSObject = dojo.byId(EventItemID);
							//   //console.log(dojo.json.serialize(oObject))

						}
					},
					// createColoredEvent: function (eventData
					// ,listDiv,eventindex){
					// /**
					// <table>
					// <tr>
					// <td colspan="2" bgcolor="#00FFFF"> RES </td> </tr>
					// <tr>
					// <td bgcolor="#FF0000"> EJB </td> <td>
					// <span class="timetext">10:00 AM </span>
					// <span id="toolTip3" class="titletext">EJB Course</span>
					// </td>
					// </tr>
					// </table>
					// *
					// * **/
					// ////  //console.log(" in the wrong
					// oneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
					// var hasTimeZone = false;
					// if(typeof this.selectedtimezone != "string" &&
					// this.selectedtimezone != null){
					// hasTimeZone = true;
					// }// end of time zone
					//
					// startDate = dojo.date.fromRfc3339(eventData.starttime);
					// endDate = dojo.date.fromRfc3339(eventData.endtime);
					// sDate = dojo.date.format(startDate,
					// {formatLength:"medium", selector:"dateOnly",
					// locale:this.lang}) + "<br />";
					// sStart = sHTML = sEnd = '';
					//
					// otable = document.createElement("table");
					//
					// /**************
					// * Row colors...............................
					// * *************/
					//
					// oRow=document.createElement("tr");
					//
					//
					//
					//
					//
					// classname="RightEventLabel";
					//
					//
					// oTds=document.createElement("td");
					// oTds.style.backgroundColor=eventData.SecColor;
					// oTds.innerHTML=eventData.SecApp;
					// ////  //console.log(" the row11 1 "+oTds.innerHTML);
					// //oTds.style.backgroundColor="Red";
					// // oTds.innerHTML="RA";
					// oTds.rowSpan=2;
					//
					// dojo.html.setClass(oTds, classname);
					//
					// classname="UpperEventLabel";
					//
					//
					// oTd=document.createElement("td");
					// oTd.style.backgroundColor=eventData.MainColor;
					// oTd.innerHTML=eventData.MainApp;
					// ////  //console.log(" the row11 1 "+oTd.innerHTML);
					// // oTd.style.backgroundColor="green";
					// //oTd.innerHTML="CABB";
					// // oTd.style.height="20%";
					// // oTd.colSpan=2;
					//
					// dojo.html.setClass(oTd, classname);
					//
					//
					// oRow.appendChild(oTds);
					// oRow.appendChild(oTd);
					// otable.appendChild(oRow);
					// ////  //console.log(" the row11 1 "+oRow.innerHTML);
					// // ////  //console.log(eval(oRow));
					// var oRow2=document.createElement("tr");
					//
					//
					// // oRow2.appendChild(oTds);
					//
					// oTd2=document.createElement("td");
					// // ////  //console.log(eval(otable));
					// ////  //console.log(otable.innerHTML);
					//
					// /***** span for the
					// time..................................********/
					// oSpan = document.createElement('span');
					// //////  //console.log(dojo.json.serialize(eventData))
					//
					// if(!eventData.repeated && this.changeEventTimes){
					// dojo.html.setClass(oSpan, "timetext");
					// }
					// sStart = dojo.date.format(startDate,
					// {formatLength:"short", selector:"timeOnly",
					// locale:this.lang});
					// //////  //console.log(sStart);
					// sHTML = '';
					// sHTML += ' - ';
					// sHTML += dojo.date.format(endDate, {formatLength:"short",
					// selector:"timeOnly", locale:this.lang});
					// ////  //console.log("shtmls "+sHTML);
					// sEnd = (hasTimeZone?" (" +
					// unescape(this.selectedtimezone.sn) + ")":"");
					// ////  //console.log("end......."+sEnd);
					// oSpan.innerHTML =
					// this.calendarType!='month'&&Number(startDate)!=Number(endDate)?sStart+sHTML:sStart;
					//
					//
					// ////  //console.log(oSpan.innerHTML);
					//
					// oTd2.appendChild(oSpan);
					//
					//
					//
					//
					// /***** span for the course name
					// ..................................********/
					//
					//
					// oSpan = document.createElement('span');
					// dojo.html.setClass(oSpan, "titletext");
					//
					// sHTML = eventData.title;
					// if(eventData.url != ''){
					//
					// sHTML = '<a href="' + eventData.url + '"
					// target="_blank">' + eventData.title + '</a>';
					// }
					// oSpan.innerHTML = sHTML
					// //oSpan.id = "toolTip" + eventindex;
					//
					// oTd2.appendChild(oSpan);
					//
					//
					//
					//
					// //////  //console.log(" the otd "+oTd2.innerHTML);
					// //////  //console.log(" the row "+oRow2.innerHTML);
					// //////  //console.log(eval(oRow2));
					// oRow2.appendChild(oTd2);
					// // ////  //console.log(" the row "+oRow2.innerHTML);
					// otable.appendChild(oRow2);
					// otable.id = "toolTip" + eventindex;
					//
					// // oDiv= document.createElement("div");
					// // oDiv.innerHTML="jskfjskldjf sdkljfkl sd jfksdjf klsd
					// jfklsd";
					// // oDiv.appendChild(otable);
					// // classname="MultiDay";
					// // dojo.html.setClass(oDiv, classname);
					// // listDiv.appendChild(oDiv);
					// listDiv.appendChild(otable);
					//
					//
					// //////  //console.log("table..............")
					// // ////  //console.log(otable.innerHTML);
					// //////  //console.log(listDiv.innerHTML);
					// return listDiv
					//
					//
					//
					// },
					// /////////////////////add my function for courses
					// _iniCourseUI: function (){ //tables i
					// // ////  //console.log(" int he init course ui ");
					// var oLabelsTR = this.CoursesHeadNode.insertRow(-1);
					// var labels=new Array("Courses","Days","Runs");
					//
					// for(var i=0; i<labels.length; i++) {
					// oLabelsTD = oLabelsTR.insertCell(-1);
					// oLabelsTD.innerHTML =labels[i] ;
					// }
					//
					//
					// var oTR, oTD, oDateDiv, oItemDiv;
					// //////  //console.log("willl try t");
					// /// this is only for testing
					// if (this.CoursesList==null){
					// //////  //console.log(" Trying to create list .......");
					// this.CoursesList=new Array();
					// var Course=new Object();
					// Course.Name="Course name here";
					// Course.Days=5;
					// Course.Runs=1;
					// this.CoursesList[0]=Course;
					// Course=new Object();
					// Course.Name="Course 2";
					// Course.Days=7;
					// Course.Runs=2;
					// this.CoursesList[1]=Course;
					// Course=new Object();
					// Course.Name="Course 3";
					// Course.Days=7;
					// Course.Runs=2;
					// this.CoursesList[2]=Course;
					//
					//
					// }
					// // ////  //console.log("courses are now defined. ");
					// //for the list of coures CoursesList
					// var classname="";
					// //
					// ////  //console.log(this.CoursesList.length);
					// for (var i = 0; i < this.CoursesList.length; ++i){
					//
					// oTR = this.CoursesBodyNode.insertRow(-1);
					// oTR.valign = 'top';
					//
					// classname = "courseDisplay";
					// dojo.html.setClass(oTR, classname);
					//
					// ///----------------------addding event
					//
					// dojo.event.connect(oTR, "onclick", this,
					// "onCourseClicked");
					// new dojo.dnd.HtmlDragSource(oTR, "dragListCoures");
					//
					//
					// oTR.setAttribute("CourseID", Number(i));
					// oTR.setAttribute("CourseName",this.CoursesList[i].Name)
					//
					// for (var cells=0;cells<labels.length;++cells) {
					// ////  //console.log("Adding the cell.......");
					// oTD = oTR.insertCell(-1);
					// if (labels[cells].match('Courses')){
					// classname = "courseDisplayList";
					// dojo.html.setClass(oTD, classname);
					// oTD.innerHTML=this.CoursesList[i].Name;
					// }
					// else if (labels[cells].match('Days')){
					// ////  //console.log("Days............");
					//
					// classname = "courseDisplayList";
					// dojo.html.setClass(oTD, classname);
					// oTD.innerHTML=this.CoursesList[i].Days;
					// }
					// else if (labels[cells].match('Runs')){
					// ////  //console.log("Days............");
					//
					// classname = "courseDisplayList";
					// dojo.html.setClass(oTD, classname);
					// oTD.innerHTML=this.CoursesList[i].Runs;
					// }
					//
					// dojo.event.connect(oTD, "onclick", this,
					// "onCourseClicked");
					// oTD.setAttribute("CourseID", Number(i));
					// oTD.setAttribute("CourseName",this.CoursesList[i].Name);
					//
					// // dojo.html.setClass(oTD, currentClassName);
					// }
					// }
					// },
					/**
					 * ********* init course display ( list on the top)
					 * *****************************************
					 */
					/*
					 * This function draws the courses divs, render it to the
					 * html then add 1. the save button 2. the drag event on
					 * each div(course) 3. the on click button on each div
					 * (course ). function changed on 26-9 by maha to make
					 * changes in display in course list as requested by client.
					 *
					 */
					_initCourseUIDiv_Rows : function() {
						// ////  //console.log(" before
						// 99999999999999999999999999999999999999999999 ");
						dojo.dom.removeChildren(this.CoursesHeadNode);
						dojo.dom.removeChildren(this.CoursesBodyNode);
						dojo.dom.removeChildren(this.SaveButtonNode);


				      //)
						if (!this.addCourses)
							return;

						if (this.CoursesList == null)
							return;

						// var saveButton= this.CoursesHeadNode.insertRow(-1);
						osaveDiv = document.createElement("div");

						osaveDiv.id = "SaveButton";

						this.SaveButtonNode.appendChild(osaveDiv);
						// .log(" before
						// 88888888888888888888888888888888888888888888888 ");
						// var oLabelsTR = this.CoursesHeadNode.insertRow(-1);
						// var labels=new Array("Courses","Days","Runs");
						//
						// for(var i=0; i<labels.length; i++) {
						// oLabelsTD = oLabelsTR.insertCell(-1);
						// oLabelsTD.innerHTML =labels[i] ;
						// }

						var oTR, oTD, oCourseDiv, oItemDiv;
						// ////  //console.log("willl try t");
						// / this is only for testing

						// ////  //console.log(" before
						// 77777777777777777777777777777777777777777 ");
						// for the list of coures CoursesList
						var classname = "";
						//

						oTR = this.CoursesBodyNode.insertRow(-1);
						oTR.valign = 'top';

						// ////  //console.log(this.CoursesList.length);
						// ////  //console.log(" before
						// 6666666666666666666666666666666666666666 ");

						for ( var i = 0; i < this.CoursesList.length; ++i) {

							if (i % 5 == 0) {
								oTR = this.CoursesBodyNode.insertRow(-1);
								oTR.valign = 'top';

							}

							oTD = oTR.insertCell(-1);
							classname = "courseDisplay";
							dojo.event.connect(oTD, "onclick", this,
									"onCourseClicked");
							oTD.setAttribute("CourseID", Number(i));
							oTD.setAttribute("Course.ID",
									this.CoursesList[i].ID);

							oTD.id = "Course_" + Number(i);
							dojo.html.setClass(oTD, classname);
							// oTD.colSpan="3";
							// innerString="";
							var period = this.CoursesList[i].Period;
							if (!period)
								period = "";

							innerString = getSmallerLengthString(
									this.CoursesList[i].Name, 20)
									+ " | "
									+ this.CoursesList[i].Days
									+ "D "
									+ period
									+ " | G# "
									+ this.CoursesList[i].RunNo + "";
							oTD.innerHTML = innerString;
							new dojo.dnd.HtmlDragSource(oTD, "dragListCoures");
						}

					},
					/**
					 * ********* init course display ( list on the right)
					 * *****************************************
					 */
					/*
					 * This function draws the courses divs, render it to the
					 * html then add 1. the save button 2. the drag event on
					 * each div(course) 3. the on click button on each div
					 * (course ).
					 *
					 */
					_iniCourseUIDiv : function() { // tables i
						// ////  //console.log(" int he init course ui ");
						// ////  //console.log( dojo.json.serialize(this));

						// ////  //console.log(
						// dojo.json.serialize(this.CoursesHeadNode));
						dojo.dom.removeChildren(this.CoursesHeadNode);
						dojo.dom.removeChildren(this.CoursesBodyNode);

						// ////  //console.log(
						// dojo.json.serialize(this.mywidgets));
						var saveButton = this.CoursesHeadNode.insertRow(-1);

						saveButton.id = "SaveButton";

						// ////  //console.log(eval(saveButton));

						var oLabelsTR = this.CoursesHeadNode.insertRow(-1);
						var labels = new Array("Courses", "Days", "Runs");

						for ( var i = 0; i < labels.length; i++) {
							oLabelsTD = oLabelsTR.insertCell(-1);
							oLabelsTD.innerHTML = labels[i];
						}

						var oTR, oTD, oCourseDiv, oItemDiv;
						// ////  //console.log("willl try t");
						// / this is only for testing

						// ////  //console.log(" before `coursel list in div ");
						// for the list of coures CoursesList
						var classname = "";
						//
						// ////  //console.log(this.CoursesList)
						if (this.CoursesList == null)
							return;
						// ////  //console.log(this.CoursesList.length);
						for ( var i = 0; i < this.CoursesList.length; ++i) {

							oTR = this.CoursesBodyNode.insertRow(-1);
							oTR.valign = 'top';

							oTD = oTR.insertCell(-1);

							classname = "courseDisplay";
							dojo.event.connect(oTD, "onclick", this,
									"onCourseClicked");
							oTD.setAttribute("CourseID", Number(i));
							oTD.setAttribute("Course.ID",
									this.CoursesList[i].ID);

							oTD.id = "Course_" + Number(i);
							dojo.html.setClass(oTD, classname);

							oTD.colSpan = "3";

							// innerString="";
							innerString = this.CoursesList[i].Name + " | "
									+ this.CoursesList[i].Days + " | "
									+ this.CoursesList[i].Runs + "  ";
							oTD.innerHTML = innerString;

							new dojo.dnd.HtmlDragSource(oTD, "dragListCoures");
							/*
							 * classname = "courseDisplayList";
							 * //---------------------------create divs for the
							 * types ..........
							 *
							 * var oItemDiv = document.createElement("div");
							 * dojo.html.setClass(oItemDiv, classname);
							 * oItemDiv.innerHTML= this.CoursesList[i].Name+" ";
							 * oItemDiv.setAttribute("CourseID", Number(i));
							 * oTD.appendChild(oItemDiv);
							 *
							 *
							 * oItemDiv = document.createElement("div");
							 * dojo.html.setClass(oItemDiv, classname);
							 * oItemDiv.innerHTML= this.CoursesList[i].Days+" ";
							 * oItemDiv.setAttribute("CourseID", Number(i));
							 * oTD.appendChild(oItemDiv);
							 *
							 *
							 * oItemDiv = document.createElement("div");
							 * dojo.html.setClass(oItemDiv, classname);
							 * oItemDiv.innerHTML= this.CoursesList[i].Runs+" ";
							 * oItemDiv.setAttribute("CourseID", Number(i));
							 * oTD.appendChild(oItemDiv);
							 *
							 *
							 */

							/*
							 * oCourseDiv=document.createElement("div");
							 * classname = "courseDisplayList";
							 * dojo.html.setClass(oCourseDiv, classname);
							 * oCourseDiv.innerHTML=innerString; new
							 * dojo.dnd.HtmlDragSource(oCourseDiv,
							 * "dragListCourses");
							 *
							 * oTR.appendChild(oCourseDiv);
							 */

							/*
							 * for (var cells=0;cells<labels.length;++cells) {
							 * ////  //console.log("Adding the cell......."); oTD =
							 * oTR.insertCell(-1); if
							 * (labels[cells].match('Courses')){ classname =
							 * "courseDisplay"; dojo.html.setClass(oTD,
							 * classname);
							 * oTD.innerHTML=this.CoursesList[i].Name; } else if
							 * (labels[cells].match('Days')){
							 * ////  //console.log("Days............");
							 *
							 * classname = "courseDisplay";
							 * dojo.html.setClass(oTD, classname);
							 * oTD.innerHTML=this.CoursesList[i].Days; } else if
							 * (labels[cells].match('Runs')){
							 * ////  //console.log("Days............");
							 *
							 * classname = "courseDisplay";
							 * dojo.html.setClass(oTD, classname);
							 * oTD.innerHTML=this.CoursesList[i].Runs; }
							 *  // dojo.html.setClass(oTD, currentClassName); }
							 */
						}
					},
					/**
					 * ************88888 this function must be called when
					 * course list is changes to update the view
					 */
					onCoursesChanged : function(courseList) {
						//  //console.log("[ line 4880 ] onCoursesChanged in course  changed....................");
						if (courseList == null) {
							// ----------------------------example
							/*
							 * //if (this.CoursesList==null){
							 * //////  //console.log(" Trying to create list
							 * ......."); this.CoursesList=new Array(); var
							 * Course=new Object(); Course.Name="Course name
							 * here"; Course.ID=455; Course.Days=5;
							 * Course.Runs=1; this.CoursesList[0]=Course;
							 * Course=new Object(); Course.Name="Course name 2";
							 * Course.Days=7; Course.Runs=2; Course.ID=45;
							 * this.CoursesList[1]=Course; Course=new Object();
							 * Course.Name="Course 3"; Course.Days=7;
							 * Course.Runs=2; Course.ID=4445;
							 * this.CoursesList[2]=Course;
							 *
							 * //}
							 *
							 */

							this.CoursesList = this.GetCoursesList();

						} else {
							var CourseFormat = false;
							// check if the courselist carry courses.
							if (courseList) {
								//
								// ////  //console.log("course list exist ");
								if (isArray(courseList)) {
									// ////  //console.log(" course list is array
									// ");

									if (courseList.length > 0) {

										if (isCourse(courseList[0])) {

											// ////  //console.log("course list is a
											// course. ");
											CourseFormat = true;
										}
									}
								}

							}
							if (CourseFormat)
								this.CoursesList = courseList;
							else {
								this.CoursesList = null;
							}

						}

						//	  //console.log("[line 4933  onCoursesChanged] in the calendar.js  ")
						//  //console.log( dojo.json.serialize(this.CoursesList));

						this._initCourseUIDiv_Rows();
						// this._iniCourseUIDiv();
					},
					GetCoursesList : function() {

						return;

					},
					/**
					 * ***********888 this funciton is called when a user click
					 * on a course div
					 *
					 * the funciton do the following 1. check that there is not
					 * previous click on other course to remove before adding
					 * this one. 1. if same course is clicked more than once
					 * then remove the click and dispable every thing else. then
					 * return., 2. enable calendar clicks. 3. set current course
					 * 4. set the maximum clicks for current course 5. create a
					 * new clicks array with new maximum 6. enable or disable
					 * save button to be used as savve. functin update by maha
					 * on 26-9 to check on the period of course to edit the
					 * number of days to save.
					 *
					 */
					onCourseClicked : function(evt) {
						var eventTarget = evt.target;
						dojo.event.browser.stopEvent(evt);
						// ////  //console.log(eval(eventTarget));

						// ////  //console.log("couse clicked..........");
						var CourseID = eventTarget.getAttribute("CourseID");
						// course to select
						// /
						// ////  //console.log("CourseName"+this.CoursesList[CourseID]);
						// this.setCalendarType('day');

						// on click course reset the clicks and wait for the
						// user to click

						// else {

						/*
						 * courseClickOn:false, CurrentCourse:null, clicks:null,
						 * clickcount:0, MaxClickCount:7, clickEvent:0,
						 */

						// ////  //console.log(" the course id = "+CourseID);
						if (CourseID) {

							// if (this.courseClickOn){

							// i had already clicked on a previous course and i
							// need to clear clicks.

							// }// end if to check if the

							// this.courseClickOn=!this.courseClickOn;
							if (this.CurrentCourseID == CourseID
									&& this.courseClickOn) {
								// ////  //console.log("Previous =
								// "+this.CurrentCourseID);

								// ////  //console.log(" Current "+CourseID);
								// remove the current and prviousclick
								this.CheckCourseClick(this.CurrentCourseID, 0);

								this.CheckCourseClick(CourseID, 0);
								this.courseClickOn = false;
								this.clickEventEnable = false;
								this.updateUserMessage("");

							} else {

								if (this.courseClickOn) {

									this.CheckCourseClick(this.CurrentCourseID,
											0);

								}
								this.courseClickOn = true;
								this.clickEventEnable = true;

								// ////  //console.log(" state now is
								// .........."+this.courseClickOn);
								this.CurrentCourse = this.CoursesList[CourseID]
								if (this.CurrentCourse) {
									if (this.CurrentCourse.Period.match("FD"))
										this.MaxClickCount = this.CurrentCourse.Days;
									else if (this.CurrentCourse.Period
											.match("S"))
										this.MaxClickCount = this.CurrentCourse.Days * 2;
									else {
										this
												.updateUserMessage(" Error in Period ");

									}
									this.clicks = new Array(this.MaxClickCount);
									this.clickcount = 0;
									this.updateUserMessage("Please choose the "
											+ this.MaxClickCount
											+ " days for  "
											+ this.CurrentCourse.Name
											+ " then click save ");

									this.CheckCourseClick(CourseID, 1);

								}// / if current coures exist

							}// else function
							this.CurrentCourseID = CourseID;
						}// / if correct course id
						// }// else a new click. ....

						// /if the course click event is enble create

						this.EnableSaveButton(this.clickEventEnable);

						// this.re

					},
					/***********************************************************
					 * this funciton will display and hidde the save button (
					 * the save button (save div html item ) will appear over
					 * the course list it will attache the on click event to the
					 * div item. or it will dattache the event and hide the div
					 * item.
					 **********************************************************/
					EnableSaveButton : function(enable) {

						oSaveObject = dojo.byId("SaveButton");

						if (oSaveObject) {
							// ////  //console.log(" save button get by id ");
							// ////  //console.log(eval(oSaveObject));

							// ////  //console.log(eval(document));
							dojo.dom.removeChildren(oSaveObject);
							// oSaveObject.innerHTML="";
							if (enable) {
								oSaveDiv = document.createElement("div");
								oSaveDiv.id = "SaveButtonDiv";
								oSaveDiv.innerHTML = "SAVE ";
								dojo.event.connect(oSaveDiv, "onclick", this,
										"onSaveButtonClicked");

								oSaveObject.appendChild(oSaveDiv);

							}// if enablle
						}
					},
					/***********************************************************
					 * This funciton will save the current saved clicks withe
					 * the current selected course. the funciton will first
					 * check the user had choosen all the days (maximum numbers
					 * of days.) other wise it will display message for the user
					 * and not save. if it save the clicks it will call clear
					 * view to display a calendar view of clicks. and return to
					 * inital state.
					 */
					onSaveButtonClicked : function(enable) {

						// ////  //console.log(" in save funtion ..............");
						if (this.clickcount < this.MaxClickCount) {

							this.updateUserMessage("Please choose the "
									+ this.MaxClickCount
									+ " days before you save");

						} else {

							this.updateUserMessage("Saving..........");
							var s = "";

							// this.updateUserMessage("Saving courses dates");
							this.SaveCourseClicks(this.CurrentCourse,
									this.clicks);
							this.clickEventEnable = false;

							// /-------------------to display
							for ( var index = 0; index < this.clicks.length; index++) {
								if (this.clicks[index] != null) {
									s += this.clicks[index] + "  ";
								}
							}

							// alert(" Adding the selected days to course" +
							// clickcount + " days " +s);

							for ( var index = 0; index < this.clicks.length; index++) {
								if (this.clicks[index] != null) {
									this.RemoveDateClick(this.clicks[index]);

									this.clicks[index] = null;
								}
							}
							this.clicks = null;
							this.clickcount = 0;
							// ////  //console.log("now the click count is =
							// "+this.clickcount);
							this.EnableSaveButton(this.clickEventEnable);
							this.MaxClickCount = 0;

							this.updateUserMessage("..........");
						}// end of else

					},
					/**
					 * ***************8888 this funciton remove or add the class
					 * coure courseDisplayClicked to the course div. The funcitn
					 * takes a course id , and mode ( 1 for remove , 0 for add)
					 * if the course click is addded before and it need to be
					 * removed the funciton must send 1 in mode if a course
					 * click need to be removed then the funcito must send 0 in
					 * mode.
					 */
					CheckCourseClick : function(CourseID, mode) {

						oCourseObject = dojo.byId("Course_" + CourseID);
						if (oCourseObject) {

							currentClassName = oCourseObject.className;
							// ////  //console.log("before the remove ");
							// ////  //console.log(eval(oCourseObject));

							if (currentClassName.match("courseDisplayClicked") == null) // /
																						// the
																						// line
																						// doesnot
																						// exit
							{
								if (mode == 1) {

									currentClassName = currentClassName + " "
											+ "courseDisplayClicked";
									dojo.html.setClass(oCourseObject,
											currentClassName);

								}// if mode ==1 (add click and no)

								// else remove click but there is no click so do
								// nothing
								// oDateObject.style.backgroundColor="green";

								// .style.backgroundColor

							} else {
								currentClassName = currentClassName.replace(
										"courseDisplayClicked", "");
								dojo.html.setClass(oCourseObject,
										currentClassName);
							}

						}// if course div exist

						// / if match classes

					},
					/**
					 * **********88 this funciton update the message to the user
					 * to be displayed.
					 */
					updateUserMessage : function(message) {

						this.UserMessageNode.innerHTML = message;

					},

					getValue : function() {
						// summary: return current date in RFC 3339 format
						return dojo.date.toRfc3339(new Date(this.value),
								'dateOnly'); /* String */
					},

					getDate : function() {
						// summary: return current date as a Date object
						return this.value; /* Date */
					},

					onValueChanged : function(/* Date */dateObj) {
						// summary: function to overide event by end user
					},

					onEventChanged : function(/* string */eventId, /* day id */
							dayId, /* object */eventObject) {
						// summary: function to overide event by end user
					},

					_eventChanged : function(/* boolean */changed,/* string */
							eventId,/* string */dayId,/* Date */startTime,/* Date */
							endTime) {

						var course = this.calendarCourseEvents[eventId];

						if (changed && course) {
							var dayEvent = course.CourseDays[dayId];



//							oldDateValue = dojo.date
//									.fromIso8601(dayEvent.EventDate);
							// Change the event time and date
							// var oObject = this.calendarEvents[eventId];
							// oObject.starttime =
							// this.updateToRfc3339(startTime);
							// oObject.endtime = this.updateToRfc3339(endTime);
							dayEvent.EventDate = this
									.updateToRfc3339(startTime);
							dayEvent.starttime = this
									.updateToRfc3339(startTime);
							dayEvent.endtime = this.updateToRfc3339(endTime);

							newDate = dojo.date.fromRfc3339(dayEvent.EventDate);
						//  //console.log( "[ (L5292)  _eventChanged in calendar.js ]sortinggggggggggggggggggggggggggggggg")
							// / now resort the day in day no.
							noOfdays = course.CourseDays.length;

							//now after the new date we need to sort date
							//now take the current value and

							//create an array with the dates

							dates=new Array( course.CourseDays.length);
							for(k=0;k<course.CourseDays.length;k++){
								dates[k]=course.CourseDays[k].EventDate;
							}
							dates=SortDateArray(dates);

								for(k=0;k<course.CourseDays.length;k++){
							course.CourseDays[k].EventDate=dates[k];
							course.CourseDays[k].starttime=dates[k]	;
							course.CourseDays[k].endtime=dates[k]	;
							}

							// first remove the index of the old value

//							for ( var d = 0; d < noOfdays; d++) {
//								dateC = dojo.date
//										.fromIso8601(course.CourseDays[d].EventDate);
//								var a = dojo.date.compare(oldDateValue, dateC,
//										dojo.date.compareTypes.DATE);
//								// //  //console.log("compare output is "+a+" for
//								// oldDateValue "+oldDateValue+" and "+dateC);
//								if (a >= 0) {
//									// new date> old one
//
//								} else {
//									// ////  //console.log("now will remove =====
//									// "+d)
//									currindex = course.CourseDays[d].DayNo;
//									currindex--;
//
//									for ( var cd = d; cd < noOfdays; cd++) {
//										course.CourseDays[cd].DayNo = currindex;
//										// ////  //console.log(currindex);
//										currindex++;
//									}
//									break;
//								}
//
//							}
//
//							for ( var d = 0; d < noOfdays; d++) {
//
//								dateC = dojo.date
//										.fromIso8601(course.CourseDays[d].EventDate);
//
//								var a = dojo.date.compare(newDate, dateC,
//										dojo.date.compareTypes.DATE);
//								// //  //console.log("compare output is "+a+" for
//								// day "+newDate+" and "+dateC);
//								// Returns 0 if equal, positive if a > b, else
//								// negative.
//								if (a >= 0) {
//									// new date>old one
//
//								} else { // the new date index must be
//									if (d == 0)// first day
//									{
//
//										dayEvent.DayNo = 1;
//
//										tempindex = 1;
//										for ( var cd = d; cd < noOfdays; cd++) {
//											// //  //console.log(tempindex);
//											tempindex++;
//											course.CourseDays[cd].DayNo = tempindex;
//										}
//									} else {
//
//										var tempindex = course.CourseDays[d].DayNo;
//
//										dayEvent.index = course.CourseDays[d].DayNo;
//										// now change the indecs of all
//										// remaining days
//										// //  //console.log("now will add e =====
//										// "+d)
//										for ( var cd = d; cd < noOfdays; cd++) {
//											// //  //console.log(tempindex);
//											tempindex++;
//											course.CourseDays[cd].DayNo = tempindex;
//
//										}
//
//									}
//									break;
//
//								}
//
//							}

                          //    //console.log("[ (L5292)  _eventChanged in calendar.js ] after the sorting the days are ");
							//  //console.log(dojo.json.serialize(course.CourseDays));
							this.onEventChanged(eventId, dayId, course);
							// this.calendarEvents[eventId] = null;
							// this.onEventChanged(eventId, oObject);
						}

						if (!changed) {
							this.refreshScreen();
						}
					},// end event changed.
                        checkConflict:function (evt){

                        	evt.stopPropagation();
				               this.GetConflictFromServer();

                        },

                        //this code written by noha
                        changeColorToResourceState:function (evt){


				               this.CurrentColorMode = "Resources";
				               this.Title = "Resources";
				               this.refreshScreen();

                        },
                        changeColorToCoordinatorState:function (evt){

                        	this.CurrentColorMode = "Coordinators";
                        	this.Title = "Coordinators";
                        	this.refreshScreen();

                        },
                        changeColorToClientState:function (evt){

                        	this.CurrentColorMode = "Clients";
                        	this.Title = "Clients";
                        	this.refreshScreen();

                        },
                        changeColorToFundingState:function (evt){

                        	this.CurrentColorMode = "Funding";
                        	this.Title = "Funding";
                        	this.refreshScreen();

                        },
                        changeColorToCourseState:function (evt){

                            this.CurrentColorMode = "Courses";
                            this.Title = "";
                            this.refreshScreen();

                        },printCalendarFromServer: function() {

						return;

					},  printIconClick:function (evt){

					console.log(" in the print icon click ... ");
                          this.printCalendarFromServer();

                        } ,


                    //maha code
					onMoveToDate : function(evt) {
						evt.stopPropagation();
						var d = new Date();
						this.moveToDate(d);
					}, // end move to date

					moveToDate : function(/* Date|String */dateObj) {
						// summary: move to date dateObj and update the UI
						if (typeof dateObj == "string") {
							this.value = dojo.date.fromRfc3339(dateObj);
						} else {
							this.value = new Date(dateObj);
						}
						this._preInitUI(this.value);
					},
                   UdjustStartEnd:function(){
                       console.log(" inside the uDjustStartEnd  with type "+this.calendarType);
                   	// firstDayInCal: Date(),
					 //LastDayInCal:Date(),
						// / init the calendar it self.
						if (this.calendarType == 'month') {
                           console.log(" currest value is  month"+this.value);
							 this.firstDayInCal=this._initFirstDay(this.value)
						     this.LastDayInCal=dojo.date.add(this.firstDayInCal,dojo.date.dateParts.DAY,7*5);



						} else if (this.calendarType == 'week') {
							console.log(" weekkkk ")
								 this.firstDayInCal=this._initFirstDay(this.value);
						     this.LastDayInCal=dojo.date.add(this.firstDayInCal,dojo.date.dateParts.DAY,7);


						} else if (this.calendarType == 'day') {
							      console.log(" currest value is  day  "+this.value);
	                         this.firstDayInCal=this.value;
						     this.LastDayInCal=this.value;

						} else if (this.calendarType == 'MultiMonth') {
                           console.log(" currest value is multi month "+this.value);
//						  this.firstDayInCal=this.value;
//						   //this.firstDayInCal.setDate(1);
//						  this.firstDayInCal.setDate(1);
                          this.firstDayInCal=this._initFirstDay(this.value);
						  this.LastDayInCal=dojo.date.add(this.firstDayInCal,dojo.date.dateParts.DAY,31*this.MultiMonthCount );



						}

						console.log("end of undjust calendar dates");

                   },
					setMaxDisplayPerDay : function() {

						// / init the calendar it self.
						if (this.calendarType == 'month') {
							this.MaxEventPerDay = 4;

						} else if (this.calendarType == 'week') {
							this.MaxEventPerDay = 6;

						} else if (this.calendarType == 'day') {
							this.MaxEventPerDay = 70;

						} else if (this.calendarType == 'MultiMonth') {
							this.MaxEventPerDay = 4;

						}

					},
					/***********************************************************
					 * This function is called from the top icons on the calendr
					 * to change the view between caledar types. day, week,
					 * month, view, multiview.
					 **********************************************************/
					onSetCalendarType : function(evt) {

						evt.stopPropagation();
						switch (evt.currentTarget) {
						case this.dayLabelNode:

							this.setCalendarType('day');

							break;

						case this.weekLabelNode:

							this.setCalendarType('week');

							break;

						case this.monthLabelNode:

							this.setCalendarType('month');

							break;
						case this.multiLabelNode:

							this.setCalendarType('MultiMonth');

							break;

						}
						this.setMaxDisplayPerDay();
						//removed because it is called in the preint
						//this.UdjustStartEnd();
					},

					// ////////////// on date clicked
					onDateDoubleClicked : function(evt) {
						// ////  //console.log(" the date double click..........");
						this.OnClickDate(evt);
						/*
						 * var eventTarget = evt.target;
						 * dojo.event.browser.stopEvent(evt); this.value =
						 * dojo.date.fromRfc3339(eventTarget.getAttribute("date"));
						 * this.setCalendarType('day');
						 */
					},
					onDateClicked : function(evt) {

						var eventTarget = evt.target;
						dojo.event.browser.stopEvent(evt);
						this.value = dojo.date.fromRfc3339(eventTarget
								.getAttribute("date"));
						this.setCalendarType('day');

					},
					// ////////////////////hover funciton
					onDateHover : function(evt) {
						// var eventTarget=evt.target;
						// console.debug("hover effect ");

					},
					onSetEditMode : function(editmode) {
						// if (editmode==true){

						//this.createNewEntries = false;

						// }
					//	this.changeEventTimes = editmode;
           			//    this.DisplayHoliday = editmode;
						this.DisplayResource = editmode;
					//	this.ChooseDaysEnable = editmode;
						this.addCourses = editmode;
						this.EditMode = editmode;
						// this.refreshScreen();

					},
					// ///////////////set calendar type

					/***********************************************************
					 * this function is called when the calendar has changed the
					 * tyep it call pre init to init all the calendar veiw.
					 *
					 **********************************************************/
					setCalendarType : function(/* String */sType) {
						this.calendarType = sType;
						var d = new Date(this.value);

						this._preInitUI(d);
					},
					// ///////////////to prooper case
					toProperCase : function(/* String */sString) {
						var stringArray = sString.split(" ");
						var retString = "";
						for ( var i = 0; i < stringArray.length; i++) {
							if (i > 0) {
								retString += " ";
							}
							retString += stringArray[i].charAt(0).toUpperCase()
									+ stringArray[i].substring(1,
											stringArray[i].length)
											.toLowerCase();
						}
						return retString;
					},
					// //////////////////set lables
					/**
					 * **************************set labels
					 * *********************************
					 */
					/***********************************************************
					 * This function set the labels on the previous and next
					 * arrows at the header of the calendar they vary according
					 * to type of the calendar.
					 *
					 **********************************************************/
					_setLabels : function() {
						var d = new Date(this.value);
						var currentMonthLabel = this.monthLabels[d.getMonth()];
						var currentYearLabel = d.getFullYear();

						var prevDate, nextDate, prevLabel, nextLabel;
						var lookup = dojo.date._getGregorianBundle(this.lang);
						if (this.calendarType == 'month') {
							prevDate = dojo.date.add(d,
									dojo.date.dateParts.MONTH, -1);
							nextDate = dojo.date.add(d,
									dojo.date.dateParts.MONTH, 1);
							prevLabel = dojo.date.format(prevDate, {
								datePattern :"MMM yyyy",
								selector :"dateOnly",
								locale :this.lang
							});
							nextLabel = dojo.date.format(nextDate, {
								datePattern :"MMM yyyy",
								selector :"dateOnly",
								locale :this.lang
							});
						} else if (this.calendarType == 'MultiMonth') {

							prevDate = dojo.date.add(d,
									dojo.date.dateParts.MONTH, -1);
							nextDate = dojo.date.add(d,
									dojo.date.dateParts.MONTH, 1);
							prevLabel = dojo.date.format(prevDate, {
								datePattern :"MMM yyyy",
								selector :"dateOnly",
								locale :this.lang
							});
							nextLabel = dojo.date.format(nextDate, {
								datePattern :"MMM yyyy",
								selector :"dateOnly",
								locale :this.lang
							});

						} else if (this.calendarType == 'week') {
							d = new Date(this.firstDay);
							var end = dojo.date.add(d, dojo.date.dateParts.DAY,
									6);
							if (d.getMonth() != end.getMonth()) {
								currentMonthLabel = this.monthLabels[d
										.getMonth()]
										+ " - "
										+ this.monthLabels[end.getMonth()];
							}
							if (d.getFullYear() != end.getFullYear()) {
								currentYearLabel = d.getFullYear() + " - "
										+ end.getFullYear();
							}
							prevDate = dojo.date.add(d,
									dojo.date.dateParts.WEEK, -1);
							nextDate = dojo.date.add(d,
									dojo.date.dateParts.WEEK, 1);
							if (this.ShowWeekNo) {
								var prevWeekNo = dojo.date.getWeekOfYear(
										prevDate, this.w_WeekStartsOn) + 1;
								var currentWeekNo = dojo.date.getWeekOfYear(d,
										this.w_WeekStartsOn) + 1;
								var nextWeekNo = dojo.date.getWeekOfYear(
										nextDate, this.w_WeekStartsOn) + 1;
								var fieldWeek = lookup["field-week"];
								prevLabel = fieldWeek + " " + prevWeekNo;
								nextLabel = fieldWeek + " " + nextWeekNo;
								currentLabel = fieldWeek + " " + currentWeekNo
										+ " - " + currentMonthLabel;
							} else {
								prevLabel = dojo.date.format(prevDate, {
									formatLength :"medium",
									selector :"dateOnly",
									locale :this.lang
								});
								nextLabel = dojo.date.format(nextDate, {
									formatLength :"medium",
									selector :"dateOnly",
									locale :this.lang
								});
							}
						} else if (this.calendarType == 'day') {
							d = new Date(this.firstDay);
							prevDate = dojo.date.add(d,
									dojo.date.dateParts.DAY, -1);
							nextDate = dojo.date.add(d,
									dojo.date.dateParts.DAY, 1);
							prevLabel = dojo.date.format(prevDate, {
								formatLength :"medium",
								selector :"dateOnly",
								locale :this.lang
							});
							nextLabel = dojo.date.format(nextDate, {
								formatLength :"medium",
								selector :"dateOnly",
								locale :this.lang
							});
						}

						this.prevLabelNode.innerHTML = prevLabel;
						this.currentMonthLabelNode.innerHTML = currentMonthLabel;
						this.currentYearLabelNode.innerHTML = currentYearLabel;
						this.nextLabelNode.innerHTML = nextLabel;

						// Top icons
						this.dayLabelNode.title = this
								.toProperCase(lookup["field-day"]);
						this.weekLabelNode.title = this
								.toProperCase(lookup["field-week"]);
						this.monthLabelNode.title = this
								.toProperCase(lookup["field-month"]);
						this.todayLabelNode.title = this.toProperCase(dojo.date
								.format(this.today, {
									formatLength :"long",
									selector :"dateOnly",
									locale :this.lang
								}));

								this.multiLabelNode.title='MultiMonth View';
								this.ConflictIconNode.title='Conflict View';

								this.ResourceColloringLabelNode.title='View Courses based on Resource Color';
								this.CoordinatorColloringLabelNode.title='View Courses based on Coordinator Color';
								this.FundingColloringLabelNode.title='View Courses based on Course Funding';
								this.CoursesColloringLabelNode.title='View Courses based on Course Color';
								this.ClientColloringLabelNode.title='View Courses based on Client Color';
                                this.PrintPdfLabelNode.title="print calendar to pdf";

						if (this.createNewEntries) {
							dojo.html.setClass(this.newEntryLabelNode,
									"selecticon newentryicon");
						} else {
							dojo.html.setClass(this.newEntryLabelNode, "");
						}

						if (this.timezones != "") {
							dojo.html.setClass(this.timezoneLabelNode,
									"selecticon timezoneicon");
							if (typeof this.selectedtimezone != "string"
									&& this.selectedtimezone != null) {
								this.timezoneLabelNode.title = this
										.toProperCase(lookup["field-zone"])
										+ ": "
										+ unescape(this.selectedtimezone.sn);
								var oTR = document.createElement('tr');
								var oTD = document.createElement('td');
								oTD.colSpan = "6";
								oTD.style.paddingLeft = "4px";
								oTD.innerHTML = this
										.toProperCase(lookup["field-zone"])
										+ ": " + this.selectedtimezone.name;
								oTR.appendChild(oTD);
								this.calendarFootNode.appendChild(oTR);
							} else {
								this.timezoneLabelNode.title = this
										.toProperCase(lookup["field-zone"]);
							}
						} else {
							dojo.html.setClass(this.timezoneLabelNode, "");
						}
					},
					// ////////////////menu item selected
					menuItemSelected : function(/* string */type, /* number */
							value) {
						var d = new Date(this.value);
						if (type == 'month') {
							d = d.setMonth(value);
							var newDate = new Date(d);
							if (newDate.getMonth() != value) {
								var days = dojo.date.getDaysInMonth(new Date(
										newDate.getFullYear(), newDate
												.getMonth() - 1));
								d = new Date(newDate.getFullYear(), newDate
										.getMonth() - 1, days);
							}
						} else if (type == 'year') {
							d = d.setFullYear(value);
						}
						this.moveToDate(d);
					},
					// ///////////////this menu for choosing month and year from
					// the header.
					showMenu : function(evt) {
						evt.stopPropagation();
						var sWidgetId = this.widgetId;
						var d = new Date(this.value);
						var menu;
						switch (evt.currentTarget) {
						case this.currentMonthLabelNode:
							// Create month menu
							menu = dojo.widget.createWidget("PopupMenu2", {});
							var attr, newDate;
							var iMonth = 0;
							for ( var i = 0; i < this.monthLabels.length; i++) {
								var sValue = this.monthLabels[i] + " hello";
								attr = {
									templateString :'<tr class="dojoMenuItem2" dojoAttachEvent="onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick; onKey:onKey;">'
											+ '<td>&nbsp;</td>'
											+ '<td tabIndex="-1" class="dojoMenuItem2Label">${this.caption}</td>'
											+ '<td class="dojoMenuItem2Accel">${this.accelKey}</td>'
											+ '</tr>',
									caption :this
											.toProperCase(this.monthLabels[i]),
									month :i,
									disabled :(d.getMonth() == i ? true : false),
									onClick : function() {
										dojo.widget.byId(sWidgetId)
												.menuItemSelected('month',
														this.month);
									}
								};
								menu.addChild(dojo.widget.createWidget(
										"MenuItem2", attr));
								iMonth++;
							}
							break;

						case this.currentYearLabelNode:
							// Create year menu
							var prevYear = dojo.date.add(d,
									dojo.date.dateParts.YEAR, -2);
							menu = dojo.widget.createWidget("PopupMenu2", {});
							var attr, newDate;
							for ( var i = 0; i < 13; i++) {
								attr = {
									templateString :'<tr class="dojoMenuItem2" dojoAttachEvent="onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick; onKey:onKey;">'
											+ '<td>&nbsp;</td>'
											+ '<td tabIndex="-1" class="dojoMenuItem2Label">${this.caption}</td>'
											+ '<td class="dojoMenuItem2Accel">${this.accelKey}</td>'
											+ '</tr>',
									caption :prevYear.getFullYear() + i,
									disabled :(prevYear.getFullYear() + i == d
											.getFullYear() ? true : false),
									onClick : function() {
										dojo.widget.byId(sWidgetId)
												.menuItemSelected('year',
														this.caption);
									}
								};
								menu.addChild(dojo.widget.createWidget(
										"MenuItem2", attr));
							}
							break;
						}
						menu.open(evt.currentTarget, null, evt.currentTarget);
					},

					dayOfWeek : function(day, month, year) {
						var a = Math.floor((14 - month) / 12);
						var y = year - a;
						var m = month + 12 * a - 2;
						var d = (day + y + Math.floor(y / 4)
								- Math.floor(y / 100) + Math.floor(y / 400) + Math
								.floor((31 * m) / 12)) % 7;
						return d + 1;
					},

					NthDay : function(nth, weekday, month, year) {
						if (nth > 0) {
							return (nth - 1)
									* 7
									+ 1
									+ (7 + weekday - this.dayOfWeek(
											(nth - 1) * 7 + 1, month, year))
									% 7;
						}
						var days = dojo.date.getDaysInMonth(new Date(year,
								month));
						return days
								- (this.dayOfWeek(days, month, year) - weekday + 7)
								% 7;
					},

					isDST : function(/* Date */dateObject) {
						if (this.selectedtimezone.dst == 0) {
							return false;
						} else {
							var year = dateObject.getFullYear();
							var aDST = this.selectedtimezone.dst.split(',');
							var aStandard = this.selectedtimezone.standard
									.split(',');
							var startMonth = aDST[0];
							var startNumber = aDST[1];
							var startDayOfWeek = aDST[2];
							var endMonth = aStandard[0];
							var endNumber = aStandard[1];
							var endDayOfWeek = aStandard[2];
							var startDST = new Date(year, startMonth - 1, this
									.NthDay(startNumber, startDayOfWeek,
											startMonth, year), 2, dateObject
									.getTimezoneOffset()
									+ this.selectedtimezone.offset);
							var endDST = new Date(year, endMonth - 1, this
									.NthDay(endNumber, endDayOfWeek, endMonth,
											year), 2, dateObject
									.getTimezoneOffset()
									+ this.selectedtimezone.offset);
							if (Number(startDST) < Number(endDST)) {
								if (Number(dateObject) > Number(startDST)
										&& Number(dateObject) < Number(endDST)) {
									return true;
								} else {
									return false;
								}
							} else {
								endDST = new Date(year + 1, endMonth - 1, this
										.NthDay(endNumber, endDayOfWeek,
												endMonth, year + 1), 2,
										dateObject.getTimezoneOffset()
												+ this.selectedtimezone.offset);
								if (Number(dateObject) > Number(startDST)
										&& Number(dateObject) < Number(endDST)) {
									return true;
								} else {
									return false;
								}
							}
						}
					},

					setTZDate : function(/* Date */dateObject) {
						var DSTOffset = this.isDST(dateObject) ? 3600000 : 0;
						var utc = dateObject.getTime()
								+ (dateObject.getTimezoneOffset() * 60000);
						return new Date(utc
								+ (this.selectedtimezone.offset * 60000)
								+ DSTOffset);
					},

					setAbleToCreateNew : function(/* Bolean */bAble) {
						this.createNewEntries = bAble;
						if (bAble) {
							dojo.html.setClass(this.newEntryLabelNode,
									"selecticon newentryicon");
						}
					},
					createNewCourse : function(evt) {

						// ////  //console.log(" on add new course ");
					},

					createNewEntry : function(evt) {
						evt.stopPropagation();
						if (dojo.widget.byId('newentrydialog')) {
							dojo.widget.byId('newentrydialog').show();
						} else {
							var width = "460px";
							var height = "350px";
							var div = document.createElement("div");
							div.style.position = "absolute";
							div.style.width = width;
							div.style.height = height;
							dojo.body().appendChild(div);
							var pars = {
								contentClass :"mywidgets:CalendarDialogNewEntry",
								openerId :this.widgetId,
								title :"New Entry",
								iconSrc :dojo.uri
										.dojoUri("../mywidgets/widget/templates/calimages/calendar_add.gif"),
								id :"newentrydialog",
								width :width,
								height :height,
								resizable :false
							};
							var widget = dojo.widget.createWidget(
									"mywidgets:CalendarDialog", pars, div);
						}
					},

					onNewEntry : function(/* object */oEntry) {
						// summary: function to overide event by end user
					},

					_createNewEntry : function(/* object */oEntry) {
						this.onNewEntry(oEntry);
						var d = new Date(this.value);
						this._preInitUI(d);
					},

					showTimeZone : function(evt) {
						evt.stopPropagation();
						if (dojo.widget.byId('timezonedialog')) {
							dojo.widget.byId('timezonedialog').show();
						} else {
							if (this.timezones != "") {
								var lookup = dojo.date
										._getGregorianBundle(this.lang);
								var width = "445px";
								var height = "130px";
								var div = document.createElement("div");
								div.style.position = "absolute";
								div.style.width = width;
								div.style.height = height;
								dojo.body().appendChild(div);
								var pars = {
									contentClass :"mywidgets:CalendarDialogTimezone",
									openerId :this.widgetId,
									title :this
											.toProperCase(lookup["field-zone"]),
									iconSrc :dojo.uri
											.dojoUri("../mywidgets/widget/templates/calimages/timezone_icon.png"),
									id :"timezonedialog",
									width :width,
									height :height,
									resizable :false
								};
								var widget = dojo.widget.createWidget(
										"mywidgets:CalendarDialog", pars, div);
							}
						}
					},

					onSetTimeZone : function() {
						// summary: function to overide event by end user
					},

					_setTimeZone : function(/* string */shortname) {
						if (shortname == '') {
							this.selectedtimezone = "";
						} else {
							for ( var i = 0; i < this.timezones.length; i++) {
								if (this.timezones[i].sn == shortname) {
									this.selectedtimezone = this.timezones[i];
									break;
								}
							}
						}
						this.onSetTimeZone();
						var d = new Date(this.value);
						this._preInitUI(d);
					},

					updateToRfc3339 : function(/* Date */dateObject) {
						// ////  //console.log("chainigng
						// datesssssssssssssssssssss");
						var _ = dojo.string.pad;
						var formattedDate = [];
						var date = [ _(dateObject.getFullYear(), 4),
								_(dateObject.getMonth() + 1, 2),
								_(dateObject.getDate(), 2) ].join('-');
						formattedDate.push(date);

						var time = [ _(dateObject.getHours(), 2),
								_(dateObject.getMinutes(), 2),
								_(dateObject.getSeconds(), 2) ].join(':');
						var timezoneOffset = dateObject.getTimezoneOffset();
						if (typeof this.selectedtimezone != "string"
								&& this.selectedtimezone != null) {
							timezoneOffset = -this.selectedtimezone.offset;
						}
						time += (timezoneOffset > 0 ? "-" : "+")
								+ _(Math.floor(Math.abs(timezoneOffset) / 60),
										2) + ":"
								+ _(Math.abs(timezoneOffset) % 60, 2);
						formattedDate.push(time);

						return formattedDate.join('T'); // String
					},

					/***********************************************************
					 * This function is called when the a course is droped to
					 * day. the funciton do the following 1.if previously
					 * clicked on course or dropped a course refresh screen and
					 * rturn. 2. set current course 3. set the maximum clicks
					 * for current course 4. create a new clicks array with new
					 * maximum (computed by period and day count) 5. starting
					 * for the day the course is droped to add days to the
					 * clicks
					 *
					 * 6. enable or disable save button to be used as savve.
					 * functin update by maha on 26-9 to check on the period of
					 * course to edit the number of days to save.
					 *
					 *
					 **********************************************************/
					_dropCourseFunction : function(evt)

					{
						//console.log(" inside the drooooooooooooop course ");

						evt.stopPropagation();

						// if ( this.clickcount>0)
						// {
						// ////  //console.log("willlllllllllllllllllllllllllllllllllllll
						// refresh ...............");
						// // undo the previous add
						// this.refreshScreen();
						//
						// return ;
						// }

						/*
						 * if (this.DropActive) {
						 * //dojo.dnd.HtmlDragManager.cancelEvent(evt);
						 *
						 * return ; }
						 */

						// if (!this.DropActive)
						// this.DropActive=true;
						// cancelEvent dropAcceptable disabled
						// reset the manager's drop flag to false, since in our
						// case DnD operations always start on a container that
						// will not allow "self drops"
						// dojo.dnd.manager().canDrop(false);

						this
								.updateUserMessage(" Please press Save before draging another course. ");
						this.DragObject = evt.dragObject.domNode;
						this.DropObject = evt.dropTarget;

						if (this.DropObject.tagName == 'LI') {
							this.DropObject = this.DropObject.parentNode;
						}
						if (this.DropObject.tagName == 'DIV') {
							this.DropObject = this.DropObject.parentNode;
							// ////  //console.log(" [line 3694 (_dropFunction)] ===
							// divvvvvvvvvvvvv ");
						}
						// ////  //console.log("inside course drag");
						// ////  //console.log(eval(this.DragObject));

						// ////  //console.log(eval( this.DropObject));

						var CourseID = this.DragObject.getAttribute("CourseID");

						if (CourseID) {

							this.clickEventEnable = true;

							this.CurrentCourse = this.CoursesList[CourseID]
							if (this.CurrentCourse) {

								if (this.CurrentCourse.Period) {

									if (this.CurrentCourse.Period.match("FD"))
										this.MaxClickCount = this.CurrentCourse.Days;
									else if (this.CurrentCourse.Period
											.match("S"))
										this.MaxClickCount = this.CurrentCourse.Days * 2;
									else {
										this
												.updateUserMessage(" Error in Period ");

									}
								} else
									this.MaxClickCount = this.CurrentCourse.Days;
								this.clicks = new Array(this.MaxClickCount);
								this.clickcount = 0;
								this.updateUserMessage("Please choose the "
										+ this.MaxClickCount + " days for  "
										+ this.CurrentCourse.Name
										+ " then click save ");

							}// / if current coures exist

							this.CurrentCourseID = CourseID;

							this.clickEventEnable = true;
							this.EnableSaveButton(this.clickEventEnable);

						}// / if correct course id
						// }// else a new click. ....

						// ///////now add the clicks from this date to next
						// course days.
						var dropDate = dojo.date.fromRfc3339(this.DropObject
								.getAttribute("id"));
						this.clickcounts = 0;
						// ////  //console.log("inside course drag");
						var nextDate = dropDate;
						this.clicks = new Array(this.MaxClickCount);

						for ( var index = 0; this.clickcount < this.MaxClickCount; index++) {

							// i can use this funciton or just add the date.
							// AddDayToClicks
							if (this.AddDayToClicks(dojo.date.toRfc3339(
									nextDate, "dateOnly"))) {

								// this.clicks[index]=dojo.date.toRfc3339(nextDate,"dateOnly");
								// this.clickcounts++;
								// this.clickcount++;
							}
							nextDate = dojo.date.add(nextDate,
									dojo.date.dateParts.DAY, 1);

						}
						this.setTheDatesClicked();

					},
					/***********************************************************
					 * This function is called when an event is dropped into a
					 * day.
					 *
					 **********************************************************/
					_dropFunction : function(evt) {
					//  //console.log( " [line 93647 (_dropFunction)] === in drop ");
						evt.stopPropagation();
						try {
							// ////  //console.log("inside drag");
							this.DragObject = evt.dragObject.domNode;
							this.DropObject = evt.dropTarget;
							if (this.DropObject.tagName == 'LI') {
								this.DropObject = this.DropObject.parentNode;
							}
							if (this.DropObject.tagName == 'DIV') {
								this.DropObject = this.DropObject.parentNode;
								// ////  //console.log(" [line 3694 (_dropFunction)]
								// === divvvvvvvvvvvvv ");
							}
							// if (this.DragObject.getAttribute(""))

							var courseId = this.DragObject
									.getAttribute("coursei");
							var course = this.calendarCourseEvents[courseId];
							var eventId = this.DragObject.getAttribute("dayj");
							var dayEvent = course.CourseDays[eventId];

							if (dayEvent.allday) {
								// ////  //console.log( " [line 93647
								// (_dropFunction)] === all day event ");
								var starttime = new Date(
										parseInt(this.DragObject
												.getAttribute("starttime")));
								var endtime = new Date(parseInt(this.DragObject
										.getAttribute("endtime")));
								var dropDateString = this.DropObject
										.getAttribute("id");
								// //  //console.log(eval(this.DropObject));
								var dropDate = dojo.date
										.fromRfc3339(dropDateString);
								// ////  //console.log( " [line 3694
								// (_dropFunction)] === drop date "
								// +dropDateString);

								starttime.setFullYear(dropDate.getFullYear());
								starttime.setMonth(dropDate.getMonth());
								starttime.setDate(dropDate.getDate());
								endtime.setFullYear(dropDate.getFullYear());
								endtime.setMonth(dropDate.getMonth());
								endtime.setDate(dropDate.getDate());

								// check the days for additionon to
								if (this.checkAddDayToCourse(course, dropDate)) {
									this._eventChanged(true, courseId, eventId,
											starttime, endtime);
								} else {
									this._eventChanged(false, courseId,
											eventId, starttime, endtime);

								}
								// this._eventChanged(true, eventId, starttime,
								// endtime);
							} else {
								var starttime = new Date(
										parseInt(this.DragObject
												.getAttribute("starttime")));
								var endtime = new Date(parseInt(this.DragObject
										.getAttribute("endtime")));
								var dropDateString = this.DropObject
										.getAttribute("id");
								// //  //console.log(eval(this.DropObject));
								var dropDate = dojo.date
										.fromRfc3339(dropDateString);
								if (!this.checkAddDayToCourse(course, dropDate)) {
									this._eventChanged(false, courseId,
											eventId, starttime, endtime);
									return;
								} else {

									var dropDate = dojo.date
											.fromRfc3339(dropDateString);
									// ////  //console.log( " [line 3694
									// (_dropFunction)] === drop date "
									// +dropDateString);

									starttime.setFullYear(dropDate
											.getFullYear());
									starttime.setMonth(dropDate.getMonth());
									starttime.setDate(dropDate.getDate());
									endtime.setFullYear(dropDate.getFullYear());
									endtime.setMonth(dropDate.getMonth());
									endtime.setDate(dropDate.getDate());

									this._eventChanged(true, courseId, eventId,
											starttime, endtime);

								}
								// ////  //console.log( " [line 93647
								// (_dropFunction)] === in not full day ");
								/*
								 * var width = "300px"; var height = "290px";
								 * var div = document.createElement("div");
								 * div.style.position="absolute";
								 * div.style.width = width; div.style.height =
								 * height; dojo.body().appendChild(div); var
								 * pars = { contentClass:
								 * "mywidgets:CalendarDialogChangeTime",
								 * openerId: this.widgetId, title: "Change",
								 * iconSrc:
								 * dojo.uri.dojoUri("../mywidgets/widget/templates/calimages/timezone_icon.png"),
								 * width: width, height: height, resizable:
								 * false }; var widget =
								 * dojo.widget.createWidget("mywidgets:CalendarDialog",
								 * pars, div);
								 */
							}
						} catch (e) {
						}
					},

					onIncrementCalendar : function(evt) {
						evt.stopPropagation();
						var d = new Date(this.value);
						switch (evt.currentTarget) {
						case this.nextLabelNode:
							if (this.calendarType == 'month') {
								d = dojo.date.add(d, dojo.date.dateParts.MONTH,
										1);
							} else if (this.calendarType == 'week') {
								d = dojo.date.add(d, dojo.date.dateParts.WEEK,
										1);
							} else if (this.calendarType == 'day') {
								d = dojo.date
										.add(d, dojo.date.dateParts.DAY, 1);
							} else if (this.calendarType == 'MultiMonth') {
								d = dojo.date.add(d, dojo.date.dateParts.MONTH,
										1);

							}
							break;

						case this.prevLabelNode:
							if (this.calendarType == 'month') {
								d = dojo.date.add(d, dojo.date.dateParts.MONTH,
										-1);
							} else if (this.calendarType == 'week') {
								d = dojo.date.add(d, dojo.date.dateParts.WEEK,
										-1);
							} else if (this.calendarType == 'day') {
								d = dojo.date.add(d, dojo.date.dateParts.DAY,
										-1);
							} else if (this.calendarType == 'MultiMonth') {

								d = dojo.date.add(d, dojo.date.dateParts.MONTH,
										-1);
							}
							break;
						}

						this._preInitUI(d);
					},

					_initFirstDay : function(/* Date */dateObj) {
						// adj: false for first day of month, true for first day
						// of week adjusted by startOfWeek
						var d = new Date(dateObj);
						if (this.calendarType == 'month') {
							d.setDate(1);
							d.setDate(d.getDate()
									- this._getAdjustedDay(d,
											this.m_WeekStartsOn));
						} else if (this.calendarType == 'week') {
							d.setDate(d.getDate()
									- this._getAdjustedDay(d,
											this.w_WeekStartsOn));
						}
       						else if (this.calendarType == 'MultiMonth'){

       								d.setDate(1);
       							   d.setMonth(d.getMonth());
       						}

//						else if (this.calendarType=='Multi'){
//
////							d.setDate(d.getDate()
////									- this._getAdjustedDay(d,
////											this.m_WeekStartsOn));
//
//
//
//						}
						d.setHours(0, 0, 0, 0);
						return d; // Date
					},

					_getAdjustedDay : function(/* Date */dateObj,/* Intiger */
							startsOn) {
						// summary: used to adjust date.getDay() values to the
						// new values based on the current first day of the week
						// value
						var days = [ 0, 1, 2, 3, 4, 5, 6 ];
						if (startsOn > 0) {
							for ( var i = 0; i < startsOn; i++) {
								days.unshift(days.pop());
							}
						}
						return days[dateObj.getDay()]; // Number: 0..6 where
														// 0=Sunday
					},

					destroy : function() {
						mywidgets.widget.Calendar.superclass.destroy.apply(
								this, arguments);
						// dojo.html.destroyNode(this.m_WeekTemplate);
					},

					readEmptyCourseFromXml : function(type, xml, e) {

						var CourseEntries;
						// ////  //console.log(" in the XMLLLLLLLLLLLL EMPTHY ");
					var xmlentries = xml.getElementsByTagName("ECourse");
					var cEntry;

					// //  //console.log("No of empty courses =
					// "+xmlentries.length);

					CourseEntries = new Array(xmlentries.length);

					// ////  //console.log(xmlentries.length)
					for ( var c = 0; c < xmlentries.length; c++) {
						// get entry
						cEntry = xmlentries.item(c);
						// if (c==11){
						// ////  //console.log(cEntry);
						//
						// }
						// map from xml to the course object ..........
						var Course = new Object();

						var dateString = getCheckEntry(cEntry, "summary");
						// console.debug(dojo.json.serialize(Course));
						// dojo.string.trim(cEntry.getElementsByTagName("summary")[0].firstChild.nodeValue);
						//
						// ////  //console.log( dateString);
						datePart = dateString.substring(6, 25);
						var eDate = dojo.date.fromIso8601(datePart);
						var durationString = dojo.string.trim(dateString
								.substring(26));
						var endDate = dojo.date.add(eDate,
								dojo.date.dateParts.MINUTE,
								parseInt(durationString));
						// var link =
						// cEntry.getElementsByTagName("link")[0].attributes.getNamedItem("href").value;

						// Course.link=link;
						// Course.StartDate=eDate;
						// Course.EndDate=endDate;

						if (eDate) {
							Course.starttime = dojo.date.toRfc3339(eDate);

						}
						if (endDate) {
							Course.endtime = dojo.date.toRfc3339(endDate);
						}

						Course.ID = getCheckEntry(cEntry, "Courseid");
						Course.MainColor = getCheckEntry(cEntry, "MainColor");
						Course.MainApp = getCheckEntry(cEntry, "MainApp");

						Course.ContractID = getCheckEntry(cEntry, "ContractID");
						Course.SecColor = getCheckEntry(cEntry, "SecColor");

						Course.Client = getCheckEntry(cEntry, "Client");
						Course.SecApp = getCheckEntry(cEntry, "SecApp");

						Course.ResourceName = getCheckEntry(cEntry,
								"ResourceName");

						Course.CoordinatorName = getCheckEntry(cEntry,
								"CoordinatorName");

						// this line is added by maha (26-9) to write the period
						// in list of courses
						// //request by client
						Course.Period = getCheckEntry(cEntry, "Period");

						Course.Location = getCheckEntry(cEntry, "Location");
						Course.Details = getCheckEntry(cEntry, "content");
						Course.Name = getCheckEntry(cEntry, "CourseName");

						Course.title = getCheckEntry(cEntry, "title");
						// console.debug(dojo.json.serialize(Course));
						Course.Days = getIntegerEntry(cEntry, "NoOfDays");
						Course.RunNo = getIntegerEntry(cEntry, "RunNo");
						Course.Runs = getIntegerEntry(cEntry, "Runs");

						CourseEntries[c] = Course;
						// console.debug(dojo.json.serialize(CourseEntries));
						// console.debug( c);

					}
					// console.debug(" all entriessssssssssss.")
					// console.debug(dojo.json.serialize(CourseEntries));
					return CourseEntries;

				},

				readFromResourcesXml : function(type, xml, e) {

					var ResoourceEntries;
					// //  //console.log(" in the Resourse xmL");
					var xmlentries = xml.getElementsByTagName("Resource");
					var cEntry;

					// ////  //console.log(eval(xmlentries));

					ResoourceEntries = new Array(xmlentries.length);

					// //  //console.log(" no of entries === inrrrrrrrrrrrrrrrrr
					// resource "+xmlentries.length)
					for ( var c = 0; c < xmlentries.length; c++) {
						// get entry

						REntry = xmlentries.item(c);
						// console.debug(REntry);
						// map from xml to the course object ..........
						var Resource = new Object();
						// console.debug(dojo.json.serialize(Resource));
						// var dateString =
						// dojo.string.trim(REntry.getElementsByTagName("summary")[0].firstChild.nodeValue);
						// datePart = dateString.substring(6,25);
						// var eDate = dojo.date.fromIso8601(datePart);
						// var durationString =
						// dojo.string.trim(dateString.substring(26));
						// var endDate = dojo.date.add(eDate,
						// dojo.date.dateParts.MINUTE,
						// parseInt(durationString));

						var testlink = REntry.getElementsByTagName("link");

						// ////  //console.log(eval(testlink));
						if (testlink.length > 0)
							link = testlink[0].attributes.getNamedItem("href").value;
						else
							link = "";
						Resource.link = link;

						// console.debug(dojo.json.serialize(Resource));
						Resource.ID = getCheckEntry(REntry, "ResourceID");

						Resource.Name = getCheckEntry(REntry, "ResourceName");

						Resource.App = getCheckEntry(REntry, "ResourceApp");

						Resource.Color = getCheckEntry(REntry, "ResourceColor");

						// console.debug(dojo.json.serialize(Course));

						var Dayentries = REntry.getElementsByTagName("Entry");
						// ////  //console.log(dojo.json.serialize(Dayentries));

						var ResourceDays = new Array(Dayentries.length);

						// ////////////////////////////////////////////
						/**
						 * ****************************88888 now get the days
						 * (event of the course............
						 */

						// console.debug(" no of day for resource is
						// "+Dayentries.length );
						for ( var d = 0; d < Dayentries.length; d++) {
							var Dentry = Dayentries.item(d);
							var Day = new Object();

							Day.ID = getIntegerEntry(Dentry, "id");

							// Day.Period=dojo.string.trim(
							// Dentry.getElementsByTagName("Period")[0].firstChild.nodeValue);
							var allDay = getCheckEntry(Dentry, "AllDay");
							// console.debug(dojo.json.serialize(Resource));

							if (allDay.match("true"))
								Day.allday = true;
							else
								Day.allday = false;

							// Day.EventDate=
							// dojo.date.toRfc3339(dojo.date.fromIso8601(dojo.string.trim(
							// Dentry.getElementsByTagName("Date")[0].firstChild.nodeValue)));
							Day.starttime = dojo.date.toRfc3339(dojo.date
									.fromRfc3339(getCheckEntry(Dentry,
											"starttime")));
							Day.endtime = dojo.date.toRfc3339(dojo.date
									.fromRfc3339(getCheckEntry(Dentry,
											"endtime")));
							// console.debug(dojo.json.serialize(Day));
							Day.BusyState = getCheckEntry(Dentry, "BusyState");

							ResourceDays[d] = Day;

						}
						// console.debug(dojo.json.serialize(CourseDays));

						Resource.Schedule = ResourceDays;

						ResoourceEntries[c] = Resource;
						// ////  //console.log("the reourse is............")
						// console.debug(dojo.json.serialize(Resource));
					}
					// console.debug(dojo.json.serialize( ResoourceEntries));
					return ResoourceEntries;

				},
				GetConflictFromServer:function (){

				},

				readConflictFromXml:function (type, xml, e){
						var ConflictEntries;
				// console.log(" in the Conflict  xmL");
					var xmlentries = xml.getElementsByTagName("CalendarConflictDay");

                    this.ConflictStatus=true;
                    this.ConflictsDaysCount=0;
                    this.TotalConflicts=0;
					// ////  //console.log(eval(xmlentries));

					ConflictEntries = new Array(xmlentries.length);

					//console.log(" no of entries in conflicts === "+xmlentries.length)
					for ( var c = 0; c < xmlentries.length; c++) {
						// get entry

						var Centry = xmlentries.item(c);
						// map from xml to the course object ..........
						var Conflict = new Object();
					//	console.log("stargint to add conflicts");
     		 Conflict.Day= dojo.date.toRfc3339(dojo.date.fromRfc3339(getCheckEntry(Centry, "day")));



     		Conflict.VenueCourse1Name=getCheckEntry(Centry, "vFirstCourseName");
     		Conflict.VenueCourse2Name=getCheckEntry(Centry, "vSecCourseName");


     		Conflict.VenueCourse1RunNo=getIntegerEntry(Centry, "vFirstCourseRunNo");
     		Conflict.VenueCourse2RunNo=getIntegerEntry(Centry, "vSecCourseRunNo");

           Conflict.ResourceCourse1Name=getCheckEntry(Centry, "rFirstCourseName");
     		Conflict.ResourceCourse2Name=getCheckEntry(Centry, "rSecCourseName");



     		Conflict.ResourceCourse1RunNo=getIntegerEntry(Centry, "rFirstCourseRunNo");
     		Conflict.ResourceCourse2RunNo=getIntegerEntry(Centry, "rSecCourseRunNo");
     		Conflict.Reason=getIntegerEntry(Centry,"conflictReason");




			Conflict.ResourceName=getCheckEntry(Centry,"ResourceName");


	this.ConflictsDaysCount++;
	     		if (Conflict.Reason<3)
     		   this.TotalConflicts++;
     		   else
     		     this.TotalConflicts=  this.TotalConflicts+2;


						ConflictEntries[c] = Conflict;
                        //	  console.log(dojo.json.serialize( Conflict));
						// console.debug(dojo.json.serialize(Course));
					}
						 // console.log(dojo.json.serialize( ConflictEntries));
					// console.debug(dojo.json.serialize( HolidayEntries));
					return ConflictEntries;
				},


					readConflictFromXmlTest:function (type, xml, e){
						var ConflictEntries;
					// ////  //console.log(" in the Resourse xmL");
					var xmlentries = xml.getElementsByTagName("CalendarConflictDay");

                    this.ConflictStatus=true;
                    this.TotalConflicts=0;
                    this.ConflictsDaysCount=0;
					// ////  //console.log(eval(xmlentries));

					ConflictEntries = new Array(xmlentries.length);

					// ////  //console.log(" no of entries in holidays ===
					// "+xmlentries.length)
					for ( var c = 0; c < xmlentries.length; c++) {
						// get entry

						var Centry = xmlentries.item(c);
						// map from xml to the course object ..........
						var ConflictDay = new Object();

     		 			ConflictDay.Day= dojo.date.toRfc3339(dojo.date.fromRfc3339(getCheckEntry(Centry, "day")));
     					Reason=getIntegerEntry(Centry,"conflictReason");


     					DayEntries=Centry.getElementsByTagName("Conflicts");
     					DayConflicts=new Array(DayEntries.length);
     						for ( var ce = 0; ce < DayEntries.length; ce++) {
     							entry=DayEntries.item(ce);
     							var Conflict = new Object();
     							Conflict.Course1Name=getCheckEntry(entry, "FirstCourseName");
     							Conflict.Course2Name=getCheckEntry(entry, "SecCourseName");
     							Conflict.Course1RunNo=getIntegerEntry(entry, "FirstCourseRunNo");
     							Conflict.Course2RunNo=getIntegerEntry(entry, "SecCourseRunNo");
     							Conflict.Reason=getIntegerEntry(entry,"conflictReason");
								Conflict.Name=getCheckEntry(entry,"Name");

								//addin reasonssssssss

								if ( Reason==0||Reason==Conflict.Reason)
								{
									 Reason=Conflict.Reason;
								}else if (Conflict.Reason==1&&(Reason>1))
								{
									if (Reason==2)
									{
										Reason=4;
									}
										if (Reason==3)
									{
										Reason=5;
									}
								}else if (Conflict.Reason>1){

								 	if (Reason==1)
									{
										Reason=Conflict.Reason+Reason+1;
									}

									if (Conflict.Reason>3){
										Reason=Conflict.Reason;
									}
//									else	if (Conflict.Reason>Reason )
//									{
//										Reason=Conflict.Reason;
//									}


								}


								DayConflicts[ce]=Conflict;
     						}



							ConflictDay.Conflicts=DayConflicts;
							ConflictDay.ConflictNo= DayEntries.length;

							ConflictDay.Reason=Reason;
							ConflictEntries[c] = ConflictDay;


							this.ConflictsDaysCount++;
							this.TotalConflicts=this.TotalConflicts+DayEntries.length;

						// console.debug(dojo.json.serialize(Course));
					}
					  //console.log(dojo.json.serialize( ConflictEntries));
					return ConflictEntries;
				},


				readHolidayFromXml : function(type, xml, e) {

					var HolidayEntries;
				//	console.log(" in the holiday  xmL");
					var xmlentries = xml.getElementsByTagName("Holiday");
					var hEntry;

					// ////  //console.log(eval(xmlentries));

					HolidayEntries = new Array(xmlentries.length);

					//console.log(" no of entries in holidays === "+xmlentries.length)
					for ( var c = 0; c < xmlentries.length; c++) {
						// get entry

						var Hentry = xmlentries.item(c);
						// map from xml to the course object ..........
						var Holiday = new Object();

						Holiday.Name = getCheckEntry(Hentry, "HolidayName");
						Holiday.Color = getCheckEntry(Hentry, "HolidayColor");
						var oneDay = getCheckEntry(Hentry, "OneDay");

						if (oneDay.match("true"))
							Holiday.OneDay = true;
						else
							Holiday.OneDay = false;
						Holiday.starttime = dojo.date
								.toRfc3339(dojo.date.fromRfc3339(getCheckEntry(
										Hentry, "starttime")));
						Holiday.endtime = dojo.date.toRfc3339(dojo.date
								.fromRfc3339(getCheckEntry(Hentry, "endtime")));

						HolidayEntries[c] = Holiday;

					// console.debug(dojo.json.serialize(Holiday));
					}
					// console.debug(dojo.json.serialize( HolidayEntries));
					return HolidayEntries;
				},
				readCourseFromXml : function(type, xml, e) {
					var CourseEntries;
				//	  //console.log(" in the XMLLLLLLLLLLLL "+xml);
					var xmlentries = xml.getElementsByTagName("Course");
					var filterStatment = xml.getElementsByTagName("filterStatment");
					var cEntry;
					var fEntry;

					for ( var c = 0; c < filterStatment.length; c++) {
						// get entry
					//	  //console.log("[ line 6674 in readCourseFromXml ]  "+c);


						fEntry = filterStatment.item(c);

						var filterStatment = new Object();

						filterStatment.text = getCheckEntry(fEntry, "text")
						// console.log('>>> '+filterStatment.text);

						this.filterMessage =  filterStatment.text;
						//this.updateUserMessage(this.WelcomeMessage);
					}

					CourseEntries = new Array(xmlentries.length);
				//  //console.log("No of courses = "+xmlentries.length);

				  //  //console.log(xmlentries.length)
					for ( var c = 0; c < xmlentries.length; c++) {
						// get entry
					//	  //console.log("[ line 6674 in readCourseFromXml ]  "+c);


						cEntry = xmlentries.item(c);
						//	  //console.log(cEntry);
						// map from xml to the course object ..........
						var Course = new Object();

						// var dateString =
						// dojo.string.trim(cEntry.getElementsByTagName("summary")
						// ;
						// datePart = dateString.substring(6,25);
						// var eDate = dojo.date.fromIso8601(datePart);
						// var durationString =
						// dojo.string.trim(dateString.substring(26));
						// var endDate = dojo.date.add(eDate,
						// dojo.date.dateParts.MINUTE,
						// parseInt(durationString));

						testlink = cEntry.getElementsByTagName("link");

						var link = "";

						if (testlink) {
							if (testlink.length > 0)
							 {
							 	if (testlink[0].attributes.length>0)
								link = testlink[0].attributes.getNamedItem("href").value;
							 }
							else
								link = "";
						}
						// }
						Course.link = link;

						// Course.StartDate=eDate;
						// Course.EndDate=endDate;
						Course.starttime = getCheckEntry(cEntry, "starttime");
						Course.endtime = getCheckEntry(cEntry, "endtime");

						Course.ID = getCheckEntry(cEntry, "ID");
						Course.MainColor = getCheckEntry(cEntry, "MainColor");
						Course.MainApp = getCheckEntry(cEntry, "MainApp");
					    Course.MainName=getCheckEntry(cEntry, "MainName");

						Course.ContractID = getCheckEntry(cEntry, "ContractID");

						Course.SecColor = getCheckEntry(cEntry, "SecColor");
						Course.Client = getCheckEntry(cEntry, "Client");
						Course.SecApp = getCheckEntry(cEntry, "SecApp");
						Course.ResourceName = getCheckEntry(cEntry,
								"ResourceName");
						Course.CoordinatorName = getCheckEntry(cEntry,
								"CoordinatorName");


						Course.resourceColor= getCheckEntry(cEntry, "resourceColor");
						Course.coordinatorColor= getCheckEntry(cEntry, "coordinatorColor");
						Course.clientColor= getCheckEntry(cEntry, "clientColor");
						Course.funded= getCheckEntry(cEntry, "funded");

						Course.resourceApp= getCheckEntry(cEntry, "resourceApp");
						Course.coordinatorApp= getCheckEntry(cEntry, "coordinatorApp");
						Course.clientApp= getCheckEntry(cEntry, "clientApp");


						var temptype = getCheckEntry(cEntry, "type");
						Course.type = [ temptype ];
						// ["reminder"];
						//  //console.log("after cordinoator ")
						 //console.debug(dojo.json.serialize(Course));

						Course.Period = getCheckEntry(cEntry, "Period");
						Course.Location = getCheckEntry(cEntry, "Location");
						Course.Details = getCheckEntry(cEntry, "Details");
						Course.Name = getCheckEntry(cEntry, "Name");

						Course.title = getCheckEntry(cEntry, "title");
						Course.Days = getIntegerEntry(cEntry, "Days");
						Course.RunNo = getIntegerEntry(cEntry, "RunNo");
						Course.Runs = getIntegerEntry(cEntry, "Runs");

						// ////  //console.log("before course days reading");
						// console.debug(dojo.json.serialize(Course));

						var Dayentries = cEntry
								.getElementsByTagName("CourseDays");

						// ////  //console.log("after course days reading");

						// ////  //console.log("course days = "+Dayentries.length);

						var CourseDays = new Array(Dayentries.length);

						// ////////////////////////////////////////////
						/**
						 * ****************************88888 now get the days
						 * (event of the course............
						 */

						for ( var d = 0; d < Dayentries.length; d++) {
							var Dentry = Dayentries.item(d);
							var Day = new Object();

							Day.DayNo = getIntegerEntry(Dentry, "DayNo");

							Day.Period = getCheckEntry(Dentry, "Period");
							var allDay = getCheckEntry(Dentry, "allday");

							if (allDay.match("true"))
								Day.allday = true;
							else
								Day.allday = false;

							Day.EventDate = getCheckEntry(Dentry, "EventDate");
							Day.starttime = getCheckEntry(Dentry, "starttime");
							Day.endtime = getCheckEntry(Dentry, "endtime");
							// console.debug(dojo.json.serialize(Day));

							CourseDays[d] = Day;

						}


						Course.CourseDays = CourseDays;

						CourseEntries[c] = Course;

						//WelcomeMessage =  cEntry.getElementsByTagName("filterStatment");
						// console.debug(dojo.json.serialize(Course));
					}
				//console.log(" these are the course entries");
				 //console.log(dojo.json.serialize(CourseEntries));
					return CourseEntries;

				}

				});

dojo.widget.defineWidget("mywidgets.widget.CalendarDialog", [
		dojo.widget.HtmlWidget, dojo.widget.FloatingPaneBase,
		dojo.widget.ModalDialogBase ], {
	// summary:
	// Provides a Dialog which can be modal or normal.
	templatePath :dojo.uri
			.dojoUri("src/widget/templates/Editor2/EditorDialog.html"),
	// modal: Boolean: Whether this is a modal dialog. True by default.
	modal :true,
	// width: String: Width of the dialog. None by default.
	width :"",
	// height: String: Height of the dialog. None by default.
	height :"",
	// windowState: String: startup state of the dialog
	windowState :"normal",
	displayCloseAction :true,
	// contentClass: String
	contentClass :"",
	openerId :"",

	fillInTemplate : function(args, frag) {
		this.fillInFloatingPaneTemplate(args, frag);
		mywidgets.widget.CalendarDialog.superclass.fillInTemplate.call(this,
				args, frag);
	},
	postCreate : function() {
		if (this.modal) {
			dojo.widget.ModalDialogBase.prototype.postCreate.call(this);
		} else {
			with (this.domNode.style) {
				zIndex = 999;
				display = "none";
			}
		}
		dojo.widget.FloatingPaneBase.prototype.postCreate
				.apply(this, arguments);
		mywidgets.widget.CalendarDialog.superclass.postCreate.call(this);
		if (this.width && this.height) {
			with (this.domNode.style) {
				width = this.width;
				height = this.height;
			}
		}
	},
	createContent : function() {
		if (!this.contentWidget && this.contentClass) {
			this.contentWidget = dojo.widget.createWidget(this.contentClass);
			this.addChild(this.contentWidget);
		}
	},
	show : function() {
		if (!this.contentWidget) {
			// buggy IE: if the dialog is hidden, the button widgets
	// in the dialog can not be shown, so show it temporary (as the
	// dialog may decide not to show it in loadContent() later)
	mywidgets.widget.CalendarDialog.superclass.show.apply(this, arguments);
	this.createContent();
	mywidgets.widget.CalendarDialog.superclass.hide.call(this);
}

if (!this.contentWidget || !this.contentWidget.loadContent()) {
	return;
}
this.showFloatingPane();
mywidgets.widget.CalendarDialog.superclass.show.apply(this, arguments);
if (this.modal) {
	this.showModalDialog();
}
if (this.modal) {
	// place the background div under this modal pane
	this.bg.style.zIndex = this.domNode.style.zIndex - 1;
}
},
onShow : function() {
mywidgets.widget.CalendarDialog.superclass.onShow.call(this);
this.onFloatingPaneShow();
},
closeWindow : function() {
this.hide();
mywidgets.widget.CalendarDialog.superclass.closeWindow.apply(this, arguments);
},
hide : function() {
if (this.modal) {
	this.hideModalDialog();
}
mywidgets.widget.CalendarDialog.superclass.hide.call(this);
},
// modified from ModalDialogBase.checkSize to call _sizeBackground conditionally
	checkSize : function() {
		if (this.isShowing()) {
			if (this.modal) {
				this._sizeBackground();
			}
			this.placeModalDialog();
			this.onResized();
		}
	}
});

dojo.widget
		.defineWidget(
				"mywidgets.widget.CalendarDialogTimezone",
				dojo.widget.HtmlWidget,
				{
					// summary:
					// This is the actual content.
					templatePath :dojo.uri
							.dojoUri("../mywidgets/widget/templates/timezones.html"),
					widgetsInTemplate :true,
					openerId :"",

					loadContent : function() {
						// summary: Load the content. Called when first shown
						this.openerId = dojo.widget.byId(this.parent.openerId);
						this.timezonesnode.options.length = 0;
						this.timezonesnode.options[this.timezonesnode.options.length] = new Option(
								"Default", "");
						for ( var i = 0; i < this.openerId.timezones.length; i++) {
							this.timezonesnode.options[this.timezonesnode.options.length] = new Option(
									this
											._buildGMT(this.openerId.timezones[i].offset)
											+ this.openerId.timezones[i].name,
									this.openerId.timezones[i].sn);
							if (this.openerId.selectedtimezone
									&& this.openerId.timezones[i].sn == this.openerId.selectedtimezone.sn) {
								this.timezonesnode.options[this.timezonesnode.options.length - 1].selected = true;
							}
						}
						return true;
					},
					_buildGMT : function(/* int */offset) {
						if (offset == 0)
							return "(GMT) ";

						var hour = Math.abs(parseInt(offset / 60));
						var minute = 60 * (Math.abs(offset / 60) - hour);
						return "(GMT" + (offset < 0 ? '-' : '+')
								+ dojo.string.pad("" + hour, 2) + ':'
								+ dojo.string.pad("" + minute, 2) + ') '; // string
					},
					ok : function() {
						this.openerId
								._setTimeZone(this.timezonesnode.options[this.timezonesnode.selectedIndex].value);
						this.cancel();
					},
					cancel : function() {
						this.parent.hide();
					}
				});

dojo.widget.defineWidget("mywidgets.widget.CalendarDialogChangeTime",
		dojo.widget.HtmlWidget, {
			// summary:
			// This is the actual content.
			templatePath :dojo.uri
					.dojoUri("../mywidgets/widget/templates/changetime.html"),
			widgetsInTemplate :true,
			openerId :"",
			itemId :"",
			eventChanged :false,
			dropDate :"",
			starttime :"",
			endtime :"",
			newstarttime :"",
			newendtime :"",
			dayid :"",

			loadContent : function() {
				// summary: Load the content. Called when first shown
				this.openerId = dojo.widget.byId(this.parent.openerId);
				var oDragObject = this.openerId.DragObject;
				var oDropObject = this.openerId.DropObject;

				this.itemId = oDragObject.getAttribute("coursei");

				this.dayid = oDragObject.getAttribute("dayj");
				this.starttime = new Date(parseInt(oDragObject
						.getAttribute("starttime")));
				this.endtime = new Date(parseInt(oDragObject
						.getAttribute("endtime")));

				this.dropDate = dojo.date.fromRfc3339(oDropObject
						.getAttribute("id"));
				this.date_node.innerHTML = dojo.date.format(this.dropDate, {
					formatLength :"medium",
					selector :"dateOnly",
					locale :this.openerId.lang
				});

				var startPars = {
					storedTime :dojo.date.toRfc3339(this.starttime),
					lang :this.openerId.lang
				};
				this.startPicker = dojo.widget.createWidget("TimePicker",
						startPars, this.starttime_node);

				var endPars = {
					storedTime :dojo.date.toRfc3339(this.endtime),
					lang :this.openerId.lang
				};
				this.endPicker = dojo.widget.createWidget("TimePicker",
						endPars, this.endtime_node);

				return true;
			},

			ok : function() {
				this.eventChanged = true;

				this.newstarttime = new Date(this.startPicker.time);
				this.newendtime = new Date(this.endPicker.time);

				this.newstarttime.setFullYear(this.dropDate.getFullYear());
				this.newstarttime.setMonth(this.dropDate.getMonth());
				this.newstarttime.setDate(this.dropDate.getDate());
				this.newendtime.setFullYear(this.dropDate.getFullYear());
				this.newendtime.setMonth(this.dropDate.getMonth());
				this.newendtime.setDate(this.dropDate.getDate());
				var course = this.openerId.calendarCourseEvents[this.itemId];
				if (this.openerId.checkAddDayToCourse(course, this.dropDate)) {
					this.eventChanged = true;
				} else {
					this.eventChanged = false;
				}
				this.cancel();
			},

			cancel : function() {
				this.parent.hide();

				this.openerId._eventChanged(this.eventChanged, this.itemId,
						this.dayid, this.newstarttime, this.newendtime);
				this.startPicker.destroy();
				this.endPicker.destroy();
			}
		});

dojo.widget
		.defineWidget(
				"mywidgets.widget.CalendarDialogNewEntry",
				dojo.widget.HtmlWidget,
				{
					// summary:
					// This is the actual content.
					templatePath :dojo.uri
							.dojoUri("../mywidgets/widget/templates/newcalendarentry.html"),
					widgetsInTemplate :true,
					openerId :"",

					loadContent : function() {
						// summary: Load the content. Called when first shown
						this.openerId = dojo.widget.byId(this.parent.openerId);
						this.ne_subject.value = "";
						this.ne_location.value = "";
						this.ne_categories.value = "";
						this.ne_body.value = "";
						this.ne_alldayevent.checked = false;
						var dDate = new Date();
						this.ne_starttime.value = dojo.date.format(dDate, {
							formatLength :"short",
							selector :"dateTime"
						});
						dDate.setHours(dDate.getHours() + 1);
						this.ne_endtime.value = dojo.date.format(dDate, {
							formatLength :"short",
							selector :"dateTime"
						});
						var oEventtypes = this.openerId.eventtypes;
						this.ne_type.options.length = 0;
						this.ne_type.options[this.ne_type.options.length] = new Option(
								"No Type", "");
						for ( var i in oEventtypes) {
							this.ne_type.options[this.ne_type.options.length] = new Option(
									oEventtypes[i].title, oEventtypes[i].title);
						}
						return true;
					},

					alldayclicked : function() {
						if (this.ne_alldayevent.checked) {
							var dDate = dojo.date.parse(
									this.ne_starttime.value, {
										selector :"dateTime",
										formatLength :"short"
									});
							if (dDate == null) {
								dDate = new Date();
							}
							this.ne_starttime.value = dojo.date.format(dDate, {
								formatLength :"short",
								selector :"dateOnly"
							});
							this.ne_endtime.value = "";
							this.ne_endtime.disabled = true;
						} else {
							var dDate = dojo.date.parse(
									this.ne_starttime.value, {
										selector :"dateOnly",
										formatLength :"short"
									});
							if (dDate == null) {
								dDate = new Date();
							} else {
								var newDate = new Date();
								dDate.setHours(newDate.getHours(), newDate
										.getMinutes());
							}
							this.ne_starttime.value = dojo.date.format(dDate, {
								formatLength :"short",
								selector :"dateTime"
							});
							dDate.setHours(dDate.getHours() + 1);
							this.ne_endtime.disabled = false;
							this.ne_endtime.value = dojo.date.format(dDate, {
								formatLength :"short",
								selector :"dateTime"
							});
						}
					},

					ok : function() {
						var isOk = true;
						var alertText = '';
						if (this.ne_subject.value == "") {
							isOk = false;
							alertText += '<br />' + 'Title:';
						}
						var attr;
						if (this.ne_alldayevent.checked) {
							attr = {
								selector :"dateOnly",
								formatLength :"short"
							};
						} else {
							attr = {
								selector :"dateTime",
								formatLength :"short"
							};
						}
						var dStartDate = dojo.date.parse(
								this.ne_starttime.value, attr);
						if (dStartDate == null) {
							isOk = false;
							dStartDate = new Date();
							alertText += '<br />' + 'Start time: Please format time correctly!<br />i.e. ' + dojo.date
									.format(dStartDate, attr);
						}
						var dEndDate;
						if (!this.ne_alldayevent.checked) {
							dEndDate = dojo.date.parse(this.ne_endtime.value, {
								selector :"dateTime",
								formatLength :"short"
							});
							if (dEndDate == null) {
								isOk = false;
								dEndDate = new Date();
								alertText += '<br />' + 'End time: Please format time correctly!<br />i.e. ' + dojo.date
										.format(dEndDate, {
											formatLength :"short"
										});
							}
						} else {
							dEndDate = dStartDate;
						}

						if (!isOk) {
							dojo.require("mywidgets.widget.ModalAlert");
							var params = {
								height :"230px",
								iconSrc :dojo.uri
										.dojoUri("../mywidgets/widget/templates/images/error.gif"),
								alertText :'<strong>Please edit/complete the following field(s):</strong><br />' + alertText
							};
							var modal = new mywidgets.widget.ModalAlert(params);
						} else {
							var oEntry = {
								starttime :dojo.date.toRfc3339(dStartDate),
								endtime :dojo.date.toRfc3339(dEndDate),
								allday :this.ne_alldayevent.checked,
								repeated :false,
								title :this.ne_subject.value,
								url :"",
								body :this.ne_body.value,
								attributes : {
									Location :this.ne_location.value,
									Categories :this.ne_categories.value
								},
								type : [ this.ne_type.options[this.ne_type.selectedIndex].value ]
							};

							this.openerId._createNewEntry(oEntry);
							this.cancel();
						}
					},

					cancel : function() {
						this.parent.hide();
					}
				});