 <%@ taglib uri="/WEB-INF/struts-html" prefix="html" %>

<html:html>
<head>
	 <title>Login Page</title>
 <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	background-color: #00548F;

}
-->
</style>
<link href="../css/css.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
#Layer1 {
	position:absolute;
	width:200px;
	height:115px;
	z-index:1;
}
-->
</style>
<style type="text/css">
<!--
@import url("../css/new.css");
.style1 {
	color: #FFFFFF;
	font-weight: bold;
	font-family: Arial;
}
-->
</style>
<!-- Dependencies -->



<link rel="stylesheet" type="text/css" href="../yui/build/slider/assets/skins/sam/slider.css" />
<link rel="stylesheet" type="text/css" href="../yui/build/fonts/fonts-min.css" />
<link rel="stylesheet" type="text/css" href="../yui/build/colorpicker/assets/skins/sam/colorpicker.css" />
<link rel="stylesheet" type="text/css" href="../yui/build/menu/assets/skins/sam/menu.css" />
<link rel="stylesheet" type="text/css" href="../yui/build/button/assets/skins/sam/button.css" />
<script type="text/javascript" src="../yui/build/yahoo-dom-event/yahoo-dom-event.js"></script>
<script type="text/javascript" src="../yui/build/dragdrop/dragdrop-min.js"></script>
<script type="text/javascript" src="../yui/build/slider/slider-min.js"></script>
<script type="text/javascript" src="../yui/build/element/element-min.js"></script>
<script type="text/javascript" src="../yui/build/colorpicker/colorpicker-min.js"></script>
<script type="text/javascript" src="../yui/build/container/container_core-min.js"></script>
<script type="text/javascript" src="../yui/build/menu/menu-min.js"></script>
<script type="text/javascript" src="../yui/build/button/button-min.js"></script>


 <script type="text/javascript" src="../ext/adapter/yui/ext-yui-adapter.js"></script>
   <script type="text/javascript" src="../ext/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="../ext/ext-all-debug.js"></script>
 <script type="text/javascript" src="testing.js"></script>


<!--begin custom header content for this example-->
<style type="text/css">

    /*
        Set the "zoom" property to "normal" since it is set to "1" by the
        ".example-container .bd" rule in yui.css and this causes a Menu
        instance's width to expand to 100% of the browser viewport.
    */

    div.yuimenu .bd {

        zoom: normal;

    }

    #button-container {

        padding: .5em;

    }

	#color-picker-button {

		vertical-align: baseline;

	}

    #color-picker-button button {

        outline: none;  /* Safari */
        line-height: 1.5;

    }


    /*
        Style the Button instance's label as a square whose background color
        represents the current value of the ColorPicker instance.
    */

    #current-color {

        display: block;
        display: inline-block;
        *display: block;    /* For IE */
        margin-top: .5em;
        *margin: .25em 0;    /* For IE */
        width: 1em;
        height: 1em;
        overflow: hidden;
        text-indent: 1em;
        background-color: #fff;
        white-space: nowrap;
        border: solid 1px #000;

    }


    /* Hide default colors for the ColorPicker instance. */

    #color-picker-container .yui-picker-controls,
    #color-picker-container .yui-picker-swatch,
    #color-picker-container .yui-picker-websafe-swatch {

        display: none;

    }


    /*
        Size the body element of the Menu instance to match the dimensions of
        the ColorPicker instance.
    */

    #color-picker-menu .bd {

        width: 220px;
        height: 190px;

    }

	#photo {

		background: #fff url(../yui/build/button/assets/bridge.jpg) top left no-repeat;

		/*
			Hide the alpha PNG from IE 6 and make the background image transparent via the use of
			the AlphaImageLoader that is applied by the filter property.
		*/

		_background-image: none;
		_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../yui/build/button/assets/bridge.jpg', sizingMethod='image');;

		border: solid 1px #000;
		width: 400px;
		height: 300px;

		_width: 398px;	/* For IE 6 */
		_height: 298px;	/* For IE 6 */

	}

	#button-container {

        border-top: solid 1px #000;
        padding: .5em .25em;
        margin-top: .5em;

	}

</style>
<!--end custom header content for this example-->

</head>

<body class="yui-skin-sam">


<h1>Color Picker Button</h1>

<div class="exampleIntro">
	<p>
This example demonstrates how to render a Color Picker into the Menu of a Split Button.
Use the Color Picker Button below to create a duotone by selecting the background color
that should be applied to the image.
</p>
</div>

<!--BEGIN SOURCE CODE FOR EXAMPLE =============================== -->



<div id="photo"></div>
<div id="button-container"><label for="color-picker-button">Background Color: </label></div>
<!--END SOURCE CODE FOR EXAMPLE =============================== -->

</body>
</html:html>
