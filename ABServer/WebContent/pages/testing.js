/**
 *
 */

Ext.onReady(function(){
    Ext.QuickTips.init();


var retreivingDataProxy = new Ext.data.HttpProxy({
     	url: '../GeneralRetreivingAction.do',
     	method: 'POST',
        headers:{'request-type':'ajax' }
  });
var coordinatorsDS = new Ext.data.Store({
    // load using HTTP
   proxy: retreivingDataProxy,
   baseParams:{task: "coordinators"},
   // the return will be XML, so lets set up a reader
   reader: new Ext.data.XmlReader({
    // The element which contains the total dataset size (optional)
		record: "Coordinator"
     },[{name: 'coordinatorName', type: 'string'},{name: 'coordinatorId', type: 'int'}]
     )
   });
var coordinatorId;
var coordinatorNameCombo = new Ext.form.ComboBox({
    store: coordinatorsDS,
    width: 200,
    fieldLabel: 'Coordinator <html><font color=red> *</font></html>',
    valueField: 'coordinatorId',
    displayField:'coordinatorName',
    selectOnFocus: true,
    typeAhead: true,
    editable: false,
    triggerAction: 'all',
    emptyText:'Select Coordinator...',
    selectOnFocus:true,
     listeners: {
     select: function (combo, record, index) {
	    coordinatorId = this.getValue();
	    console.log(" the main in coordinator id  "+ coordinatorId);

     }}
});

//console.log("  coordinato   oooo rr ");
///////////////////////////

var login = new Ext.FormPanel({
    labelWidth:80,
 //   url:'../Test_Login',
    frame:true,
    title:'Please choose another coordinator',
    width:700,
  //  padding:500,
 //   defaultType:'textfield',
	monitorValid:true,

// Specific attributes for the text fields for username / password.
// The "name" attribute defines the name of variables sent to the server.
    items:[new Ext.form.FieldSet({
          //  title: 'Course Details',
            autoHeight: true,
          //  width:1000,
          //  height:500,
            border:false,
             buttonAlign:'center',
            defaultType: 'textfield',
            items:[coordinatorNameCombo],

// All the magic happens after the user clicks the button
    buttons:[{
            text:'Confirm Delete',
            formBind: true,

            // Function that fires when user clicks the button
            handler:function(){
        	    console.log(" the main in coordinator id  "+ coordinatorId);
            	  console.log("  handler  ");
                   var idd=5;
                    var selections = [1 , 4 , 1, 2,3];
                    var selectedCourse = [];
                    for(i = 0; i< selections.length; i++){
                     selectedCourse.push(selections[i].id);
                   //  alert("ssssssssssssss>>>>>> "+selections[i].id);
                    }

            	  selectedCourse.push(coordinatorId);


            	  Ext.Ajax.request({
                      waitMsg: 'Please Wait',
                      url: '../listCoordinators.do',
                      params: {
                         task: "DELETE",
                         ids:  selectedCourse
                        }, method:'POST',
                      success: function(response){
                        var result=1;
                        switch(result){
                        case 1:  // Success : simply reload
                            Ext.MessageBox.alert('  Sucess .... .');

                          break;
                        default:
                          Ext.MessageBox.alert('Warning','Could not delete the entire selection.');
                          break;
                        }
                      },
                      failure: function(response){
                        var result=response.responseText;
                        Ext.MessageBox.alert('error','could not connect to the database. retry later');
                        }
                   });


            }
        },{text:'Cancel',
        	handler:function(){

        		//Ext.MessageBox.alert('error','could not connect to the database. retry later');
        		win.hide();
             }
    	}]
    })
    ]
});



var win = new Ext.Window({
    layout:'fit',
    width:380,
    height:180,
  //  renderTo:'binding-example',
    closable: false,
    resizable: false,
    plain: true,
    items: [login]
});
console.log(" winnn  ");
win.show();

});

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