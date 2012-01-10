Ext.onReady(function(){
    Ext.QuickTips.init();
// alert("hiii")
	// Create a variable to hold our EXT Form Panel.
	// Assign various config options as seen.

	var UserEmailField = new Ext.form.TextField({
      		fieldLabel: 'User Email',
      		allowBlank: false,
    		id:'userEmail',
    		vtype : 'email'

     		});

     var PasswordField = new Ext.form.TextField({
      		fieldLabel: 'Password',
      		allowBlank: false,
      		inputType:'password',
    		id:'userPassword',
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});
    var login = new Ext.FormPanel({
        labelWidth:80,
     //   url:'../Test_Login',
        frame:true,
        title:'Please Login',
        width:500,
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
                items:[UserEmailField,PasswordField],

	// All the magic happens after the user clicks the button
        buttons:[{
                text:'Login',
                formBind: true,
                // Function that fires when user clicks the button
                handler:function(){
                    login.getForm().submit({
                    url: '../login.do',
								params: {
								  task: "login",
								  userEmail:        UserEmailField.getValue() ,
								  userPassword:       	PasswordField.getValue()
								},
                        method:'POST',
                        waitTitle:'Connecting',
                        waitMsg:'Sending data...',

			// Functions that fire (success or failure) when the server responds.
			// The one that executes is determined by the
			// response that comes from login.asp as seen below. The server would
			// actually respond with valid JSON,
			// something like: response.write "{ success: true}" or
			// response.write "{ success: false, errors: { reason: 'Login failed. Try again.' }}"
			// depending on the logic contained within your server script.
			// If a success occurs, the user is notified with an alert messagebox,
			// and when they click "OK", they are redirected to whatever page
			// you define as redirect.

                        success:function(){
                   //    	Ext.Msg.alert('Status', 'Login Successful!', function(btn, text){
				   //   if (btn == 'ok'){
		                        var redirect = 'index-login.jsp';
		                        window.location = redirect;
                            //       }
			     //   });
                        },

			// Failure function, see comment above re: success and failure.
			// You can see here, if login fails, it throws a messagebox
			// at the user telling him / her as much.

                        failure:function(form, action){
                            Ext.Msg.alert('Status', 'Login failed!, please check your user name and password', function(btn, text){
                            if (btn == 'ok'){
                            login.getForm().reset();
                            }
                            });
                        }
                    });
                }
            }]}) ]
    });


	// This just creates a window to wrap the login form.
	// The login object is passed to the items collection.
  var win = new Ext.Window({
        layout:'fit',
        width:300,
        height:150,
      //  renderTo:'binding-example',
        closable: false,
        resizable: false,
        plain: true,
        items: [login]
	});
	win.show();
});

/*var pan= new Ext.TabPanel({
                    region:'center',
                     height:495,

        			renderTo: 'binding-example',
                    deferredRender:false,
                    activeTab:0,
                    items:[login]});*/