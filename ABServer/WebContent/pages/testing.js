


    YAHOO.util.Event.onContentReady("button-container", function () {

        function onButtonOption() {

            /*
                 Create a new ColorPicker instance, placing it inside the body
                 element of the Menu instance.
            */

            var oColorPicker = new YAHOO.widget.ColorPicker(oColorPickerMenu.body.id, {
                                    showcontrols: false,
                                    images: {
                                        PICKER_THUMB: "../yui/build/colorpicker/assets/picker_thumb.png",
                                        HUE_THUMB: "../yui/build/colorpicker/assets/hue_thumb.png"
                                    }
                                });


            /*
                Add a listener for the ColorPicker instance's "rgbChange" event
                to update the background color and text of the Button's
                label to reflect the change in the value of the ColorPicker.
            */

            oColorPicker.on("rgbChange", function (p_oEvent) {

                var sColor = "#" + this.get("hex");

                oButton.set("value", sColor);

                YAHOO.util.Dom.setStyle("current-color", "backgroundColor", sColor);
                YAHOO.util.Dom.get("current-color").innerHTML = "Current color is " + sColor;

            });


            // Remove this event listener so that this code runs only once

            this.unsubscribe("option", onButtonOption);

        }


        // Create a Menu instance to house the ColorPicker instance

        var oColorPickerMenu = new YAHOO.widget.Menu("color-picker-menu");


        // Create a Button instance of type "split"

        var oButton = new YAHOO.widget.Button({
                                            type: "split",
                                            id: "color-picker-button",
                                            label: "<em id=\"current-color\">Current color is #FFFFFF.</em>",
                                            menu: oColorPickerMenu,
                                            container: "button-container" });


        oButton.on("appendTo", function () {

			/*
				Create an empty body element for the Menu instance in order to
				reserve space to render the ColorPicker instance into.
			*/

			oColorPickerMenu.setBody("&#32;");

			oColorPickerMenu.body.id = "color-picker-container";



			// Render the Menu into the Button instance's parent element

			oColorPickerMenu.render(this.get("container"));

        });


        /*
            Add a listener for the "option" event.  This listener will be
            used to defer the creation the ColorPicker instance until the
            first time the Button's Menu instance is requested to be displayed
            by the user.
        */

        oButton.on("option", onButtonOption);


		/*
			Add a listener for the "click" event.  This listener will be used to apply the
			the background color to the photo.
		*/

        oButton.on("click", function () {

        	YAHOO.util.Dom.setStyle("photo", "backgroundColor", this.get("value"));

        });

    });


///**
//
//
// *
// */
//
//////create a namespace object in the example namespace:
////YAHOO.namespace("example.colorpicker")
////
//////create a new object for this module:
////YAHOO.example.colorpicker.inDialog = function() {
////
////	//Some shortcuts to use in our example:
////	var Event=YAHOO.util.Event,
////		Dom=YAHOO.util.Dom,
////		lang=YAHOO.lang;
////
////	return {
////
////		//In our initialization function, we'll create the dialog;
////		//in its render event, we'll create our Color Picker instance.
////        init: function() {
////
////            // Instantiate the Dialog
////            this.dialog = new YAHOO.widget.Dialog("yui-picker-panel", {
////				width : "500px",
////				close: true,
////				fixedcenter : true,
////				visible : false,
////				constraintoviewport : true,
////				buttons : [ { text:"Submit", handler:this.handleSubmit, isDefault:true },
////							{ text:"Cancel", handler:this.handleCancel } ]
////             });
////
////			// Once the Dialog renders, we want to create our Color Picker
////			// instance.
////            this.dialog.renderEvent.subscribe(function() {
////				if (!this.picker) { //make sure that we haven't already created our Color Picker
////					YAHOO.log("Instantiating the color picker", "info", "example");
////					this.picker = new YAHOO.widget.ColorPicker("yui-picker", {
////						container: this.dialog,
////						images: {
////							PICKER_THUMB: "assets/picker_thumb.png",
////							HUE_THUMB: "assets/hue_thumb.png"
////						}
////						//Here are some other configurations we could use for our Picker:
////						//showcontrols: false,  // default is true, false hides the entire set of controls
////						//showhexcontrols: true, // default is false
////						//showhsvcontrols: true  // default is false
////					});
////
////					//listen to rgbChange to be notified about new values
////					this.picker.on("rgbChange", function(o) {
////						YAHOO.log(lang.dump(o), "info", "example");
////					});
////				}
////			});
////
////			// If we wanted to do form validation on our Dialog, this
////			// is where we'd do it.  Remember to return true if validation
////			// passes; otherwise, your Dialog's submit method won't submit.
////            this.dialog.validate = function() {
////				return true;
////            };
////
////            // Wire up the success and failure handlers
////            this.dialog.callback = { success: this.handleSuccess, thisfailure: this.handleFailure };
////
////            // We're all set up with our Dialog's configurations;
////			// now, render the Dialog
////            this.dialog.render();
////
////			// We can wrap up initialization by wiring all of the buttons in our
////			// button dashboard to selectively show and hide parts of the
////			// Color Picker interface.  Remember that "Event" here is an
////			// alias for YAHOO.util.Event and "Event.on" is therfor a shortcut
////			// for YAHOO.util.Event.onAvailable -- the standard Dom event attachment
////			// method:
////            Event.on("show", "click", this.dialog.show, this.dialog, true);
////            Event.on("hide", "click", this.dialog.hide, this.dialog, true);
////            Event.on("btnhsv", "click", function(e) {
////                        var p = this.picker;
////                        p.set(p.OPT.SHOW_HSV_CONTROLS, !p.get(p.OPT.SHOW_HSV_CONTROLS));
////                    }, this.dialog, true);
////            Event.on("btnhex", "click", function(e) {
////                        var p = this.picker;
////                        p.set(p.OPT.SHOW_HEX_CONTROLS, !p.get(p.OPT.SHOW_HEX_CONTROLS));
////                    }, this.dialog, true);
////            Event.on("btnrgb", "click", function(e) {
////                        var p = this.picker;
////                        p.set(p.OPT.SHOW_RGB_CONTROLS, !p.get(p.OPT.SHOW_RGB_CONTROLS));
////                    }, this.dialog, true);
////            Event.on("btnhexsummary", "click", function(e) {
////                        var p = this.picker;
////                        p.set(p.OPT.SHOW_HEX_SUMMARY, !p.get(p.OPT.SHOW_HEX_SUMMARY));
////                    }, this.dialog, true);
////
////			//initialization complete:
////			YAHOO.log("Example initialization complete.", "info", "example");
////
////		},
////
////		//We'll wire this to our Dialog's submit button:
////		handleSubmit: function() {
////			//submit the Dialog:
////			this.submit();
////			//log this step to logger:
////			YAHOO.log("Dialog was submitted.", "info", "example");
////		},
////
//// 		//If the Dialog's cancel button is clicked,
////		//this function fires
////		handleCancel: function() {
////			//the cancel method automatically hides the Dialog:
////			this.cancel();
////			//log this step to logger:
////			YAHOO.log("Dialog was submitted.", "info", "example");
////		},
////
////		//We'll use Connection Manager to post our form data to the
////		//server; here, we set up our "success" handler.
////		handleSuccess: function(o) {
////			YAHOO.log("Connection Manager returned results to the handleSuccess method.", "info", "example");
////			var response = o.responseText;
////			//On Yahoo servers, we may get some page stamping;
////			//we can trim off the trailing comment:
////			response = response.split("<!")[0];
////			//write the response to the page:
////			response = "<strong>The data received by the server was the following:</strong> " + response;
////			document.getElementById("resp").innerHTML = response;
////		},
////
////		handleFailure: function(o) {
////			YAHOO.log("Connection Manager returned results to the handleFailure method.", "error", "example");
////			YAHOO.log("Response object:" + lang.dump(o), "error", "example");
////		}
////
////	}
////
////
////}();
////
//////The earliest safe moment to instantiate a Dialog (or any
//////Container element is onDOMReady; we'll initialize then:
////YAHOO.util.Event.onDOMReady(YAHOO.example.colorpicker.inDialog.init, YAHOO.example.colorpicker.inDialog, true);
////
////
//
//  YAHOO.util.Event.onContentReady("button-container", function () {
//console.log(" in script testing .js  21 ");
//        function onButtonOption() {
//
//            /*
//                 Create a new ColorPicker instance, placing it inside the body
//                 element of the Menu instance.
//            */
//console.log(" in script testing .js 2 ");
//            var oColorPicker = new YAHOO.widget.ColorPicker(oColorPickerMenu.body.id, {
//                                    showcontrols: false,
//                                    images: {
//                                        PICKER_THUMB: "../yui/build/colorpicker/assets/picker_thumb.png",
//                                        HUE_THUMB: "../yui/build/colorpicker/assets/hue_thumb.png"
//                                    }
//                                });
//
//
//            /*
//                Add a listener for the ColorPicker instance's "rgbChange" event
//                to update the background color and text of the Button's
//                label to reflect the change in the value of the ColorPicker.
//            */
//console.log(" in script testing .js 3 ");
//            oColorPicker.on("rgbChange", function (p_oEvent) {
//
//                var sColor = "#" + this.get("hex");
//
//                oButton.set("value", sColor);
//
//                YAHOO.util.Dom.setStyle("current-color", "backgroundColor", sColor);
//                YAHOO.util.Dom.get("current-color").innerHTML = "Current color is " + sColor;
//
//            });
//
//
//            // Remove this event listener so that this code runs only once
//
//            this.unsubscribe("option", onButtonOption);
//
//        }
//
//
//        // Create a Menu instance to house the ColorPicker instance
//
//        var oColorPickerMenu = new YAHOO.widget.Menu("color-picker-menu");
//
//
//        // Create a Button instance of type "split"
//
//        var oButton = new YAHOO.widget.Button({
//                                            type: "split",
//                                            id: "color-picker-button",
//                                            label: "<em id=\"current-color\">Current color is #FFFFFF.</em>",
//                                            menu: oColorPickerMenu,
//                                            container: "button-container" });
//
//
//        oButton.on("appendTo", function () {
//
//			/*
//				Create an empty body element for the Menu instance in order to
//				reserve space to render the ColorPicker instance into.
//			*/
//
//			oColorPickerMenu.setBody("&#32;");
//
//			oColorPickerMenu.body.id = "color-picker-container";
//
//
//
//			// Render the Menu into the Button instance's parent element
//
//			oColorPickerMenu.render(this.get("container"));
//
//        });
//
//
//        /*
//            Add a listener for the "option" event.  This listener will be
//            used to defer the creation the ColorPicker instance until the
//            first time the Button's Menu instance is requested to be displayed
//            by the user.
//        */
//
//        oButton.on("option", onButtonOption);
//
//
//		/*
//			Add a listener for the "click" event.  This listener will be used to apply the
//			the background color to the photo.
//		*/
//
//        oButton.on("click", function () {
//
//        	YAHOO.util.Dom.setStyle("photo", "backgroundColor", this.get("value"));
//
//        });
//
//    });



//(function() {
//    var Event = YAHOO.util.Event,
//        picker;
//console.log("  piker ");
//    Event.onDOMReady(function() {
//    	console.log("  coordinato  creating......... ");
//			YAHOO.log("Creating Color Picker.", "info", "example");
//            picker = new YAHOO.widget.ColorPicker("container", {
//                    showhsvcontrols: true,
//                    showhexcontrols: true,
//					images: {
//						PICKER_THUMB: "assets/picker_thumb.png",
//						HUE_THUMB: "assets/hue_thumb.png"
//    				}
//                });
//			YAHOO.log("Finished creating Color Picker.", "info", "example");
//
//			//a listener for logging RGB color changes;
//			//this will only be visible if logger is enabled:
//			var onRgbChange = function(o) {
//				/*o is an object
//					{ newValue: (array of R, G, B values),
//					  prevValue: (array of R, G, B values),
//					  type: "rgbChange"
//					 }
//				*/
//				YAHOO.log("The new color value is " + o.newValue, "info", "example");
//			}
//
//			//subscribe to the rgbChange event;
//			picker.on("rgbChange", onRgbChange);
//
//			//use setValue to reset the value to white:
//			Event.on("reset", "click", function(e) {
//				picker.setValue([255, 255, 255], false); //false here means that rgbChange
//													     //will fire; true would silence it
//			});
//
//			//use the "get" method to get the current value
//			//of one of the Color Picker's properties; in
//			//this case, we'll get the hex value and write it
//			//to the log:
//			Event.on("gethex", "click", function(e) {
//				YAHOO.log("Current hex value: " + picker.get("hex"), "info", "example");
//			});
//
//        });
//})();


//Ext.onReady(function(){
//    Ext.QuickTips.init();
//
//
//var retreivingDataProxy = new Ext.data.HttpProxy({
//     	url: '../GeneralRetreivingAction.do',
//     	method: 'POST',
//        headers:{'request-type':'ajax' }
//  });
//var coordinatorsDS = new Ext.data.Store({
//    // load using HTTP
//   proxy: retreivingDataProxy,
//   baseParams:{task: "coordinators"},
//   // the return will be XML, so lets set up a reader
//   reader: new Ext.data.XmlReader({
//    // The element which contains the total dataset size (optional)
//		record: "Coordinator"
//     },[{name: 'coordinatorName', type: 'string'},{name: 'coordinatorId', type: 'int'}]
//     )
//   });
//var coordinatorId;
//var coordinatorNameCombo = new Ext.form.ComboBox({
//    store: coordinatorsDS,
//    width: 200,
//    fieldLabel: 'Coordinator <html><font color=red> *</font></html>',
//    valueField: 'coordinatorId',
//    displayField:'coordinatorName',
//    selectOnFocus: true,
//    typeAhead: true,
//    editable: false,
//    triggerAction: 'all',
//    emptyText:'Select Coordinator...',
//    selectOnFocus:true,
//     listeners: {
//     select: function (combo, record, index) {
//	    coordinatorId = this.getValue();
//	    console.log(" the main in coordinator id  "+ coordinatorId);
//
//     }}
//});
//
////console.log("  coordinato   oooo rr ");
/////////////////////////////
//
//var login = new Ext.FormPanel({
//    labelWidth:80,
// //   url:'../Test_Login',
//    frame:true,
//    title:'Please choose another coordinator',
//    width:700,
//  //  padding:500,
// //   defaultType:'textfield',
//	monitorValid:true,
//
//// Specific attributes for the text fields for username / password.
//// The "name" attribute defines the name of variables sent to the server.
//    items:[new Ext.form.FieldSet({
//          //  title: 'Course Details',
//            autoHeight: true,
//          //  width:1000,
//          //  height:500,
//            border:false,
//             buttonAlign:'center',
//            defaultType: 'textfield',
//            items:[coordinatorNameCombo],
//
//// All the magic happens after the user clicks the button
//    buttons:[{
//            text:'Confirm Delete',
//            formBind: true,
//
//            // Function that fires when user clicks the button
//            handler:function(){
//        	    console.log(" the main in coordinator id  "+ coordinatorId);
//            	  console.log("  handler  ");
//                   var idd=5;
//                    var selections = [1 , 4 , 1, 2,3];
//                    var selectedCourse = [];
//                    for(i = 0; i< selections.length; i++){
//                     selectedCourse.push(selections[i].id);
//                   //  alert("ssssssssssssss>>>>>> "+selections[i].id);
//                    }
//
//            	  selectedCourse.push(coordinatorId);
//
//
//            	  Ext.Ajax.request({
//                      waitMsg: 'Please Wait',
//                      url: '../listCoordinators.do',
//                      params: {
//                         task: "DELETE",
//                         ids:  selectedCourse
//                        }, method:'POST',
//                      success: function(response){
//                        var result=1;
//                        switch(result){
//                        case 1:  // Success : simply reload
//                            Ext.MessageBox.alert('  Sucess .... .');
//
//                          break;
//                        default:
//                          Ext.MessageBox.alert('Warning','Could not delete the entire selection.');
//                          break;
//                        }
//                      },
//                      failure: function(response){
//                        var result=response.responseText;
//                        Ext.MessageBox.alert('error','could not connect to the database. retry later');
//                        }
//                   });
//
//
//            }
//        },{text:'Cancel',
//        	handler:function(){
//
//        		//Ext.MessageBox.alert('error','could not connect to the database. retry later');
//        		win.hide();
//             }
//    	}]
//    })
//    ]
//});
//
//
//
//var win = new Ext.Window({
//    layout:'fit',
//    width:380,
//    height:180,
//  //  renderTo:'binding-example',
//    closable: false,
//    resizable: false,
//    plain: true,
//    items: [login]
//});
//console.log(" winnn  ");
//win.show();
//
//});

//Ext.onReady(function(){
//    var win;
//    var button = Ext.get('show-btn');
//
//    button.on('click', function(){
//
//
//
//if(!win){
//            win = new Ext.Window({
//                applyTo     : 'hello-win',
//                layout      : 'fit',
//                width       : 500,
//                height      : 300,
//                closeAction :'hide',
//                plain       : true,
//                items       : new Ext.FormPanel({
//        labelWidth: 75, // label settings here cascade unless overridden
//        url:'save-form.php',
//        frame:true,
//        title: 'Simple Form',
//        bodyStyle:'padding:5px 5px 0',
//        width: 350,
//        defaults: {width: 230},
//        defaultType: 'textfield',
//
//        items: [{
//                fieldLabel: 'First Name',
//                name: 'first',
//                allowBlank:false
//            },{
//                fieldLabel: 'Last Name',
//                name: 'last'
//            },{
//                fieldLabel: 'Company',
//                name: 'company'
//            }, {
//                fieldLabel: 'Email',
//                name: 'email',
//                vtype:'email'
//            }, new Ext.form.TimeField({
//                fieldLabel: 'Time',
//                name: 'time',
//                minValue: '8:00am',
//                maxValue: '6:00pm'
//            })
//        ],
//
//        buttons: [{
//            text: 'Save'
//        },{
//            text: 'Cancel'
//        }]
//    });
//                buttons: [{
//                    text     : 'Submit',
//                    disabled : true
//                },{
//                    text     : 'Close',
//                    handler  : function(){
//                        win.hide();
//                    }
//                }]
//            });
//        }
//        win.show(button);
//    });
//
//});