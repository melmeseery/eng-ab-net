

  Ext.apply(Ext.form.VTypes, {

         password: function(value, field)

         {

            if (field.initialPasswordField)

            {

               var pwd = Ext.getCmp(field.initialPasswordField);

               this.passwordText = 'Confirmation does not match your intial password entry.';

               return (value == pwd.getValue());

            }



            this.passwordText = 'Passwords must be at least 5 characters, containing either a number, or a valid special character (!@#$%^&*()-_=+)';

            var hasSpecial = value.match(/[0-9!@#\$%\^&\*\(\)\-_=\+]+/i);

            var hasLength = (value.length >= 5);



            return (hasSpecial && hasLength);

         },



         passwordText: 'Passwords must be at least 5 characters, containing either a number, or a valid special character (!@#$%^&*()-_=+)',

      });



Ext.onReady(function() {

    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

	var Users  = Ext.data.Record.create([
      {name: 'idUsers', type: 'int'},
      {name: 'userPrivilage', type: 'string'},
      {name: 'userUsername', type: 'string'},
      {name:'userPassword', type: 'string'},
       {name:'userEmail', type: 'string'}
     ]);

    dataProxy = new Ext.data.HttpProxy({
     	url: '../listUsers.do',
     	method: 'POST',
        headers:{'request-type':'ajax' }
      });

    var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "list"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Users",           // The repeated element which contains row information
   		id: "idUsers"
        },Users
        ),
        sortInfo:{field: "userUsername", direction: "ASC"}
      });
//  ////console.log("ana henaaa")
    // example of custom renderer function
    function italic(value){
        return '' + value + '';
    }

    // example of custom renderer function
    function change(val){
        if(val > 0){
            return '' + val + '';
        }else if(val < 0){
            return '' + val + '';
        }
        return val;
    }
    // example of custom renderer function
    function pctChange(val){
        if(val > 0){
            return '' + val + '%';
        }else if(val < 0){
            return '' + val + '%';
        }
        return val;
    }

    // the DefaultColumnModel expects this blob to define columns. It can be extended to provide
    // custom or reusable ColumnModels
      var colModel = new Ext.grid.ColumnModel([
        {header: "User Name", width: 150, sortable: true, dataIndex: 'userUsername'},
		{header: "User Privilage", width: 200, sortable: true, dataIndex: 'userPrivilage'},
			{header: "User Email", width: 200, sortable: true, dataIndex: 'userEmail'}
    ]);

ds.on('add', function(){
	ds.reload();
//myGrid.getView().refresh();
   });

    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
         height:495,
        renderTo: 'binding-example',
               /* width:980,*/
        title:'Users',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add User',
             iconCls:'add',
             handler: displayFormWindow
             }),'-',new Ext.Toolbar.Button({
              text: 'Delete Selection',
              iconCls:'remove',
              handler: confirmDeleteCourses
              })],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})

    });

    myGrid.on("rowdblclick", function(myGrid) {
	var sel = myGrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;

		displayEditUserWindow();
		EUserNameField.setValue(seldata.userUsername);
		EPrivillageField.setValue(seldata.userPrivilage);
		EPasswordField.setValue(seldata.userPassword);
		EConfirmPassField.setValue(seldata.userPassword);
		EUserEmailField.setValue(seldata.userEmail);

});



 ////////////////////adding new record//////////////////////////////
  var AddUserForm;
  var AddUserWindow;

  var UserNameField;
  var PasswordField;
  var PrivillageField;
  var ConfirmPassField;
   var UserEmailField;
 var Itemsds=[['0','Admin'],['1','Accountant'],['2','Employee'],['3','User']];
    var ItemsDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: Itemsds
    });
  UserNameField = new Ext.form.TextField({
      		fieldLabel: 'User Name <html><font color=red> *</font></html>',
      		allowBlank: false,
    		id:'userUsername',
    		width:200,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});

  PasswordField = new Ext.form.TextField({
      		fieldLabel: 'Password <html><font color=red> *</font></html>',
      		allowBlank: false,
      		inputType:'password',
      		width:200,
    		id:'userPassword'
    	//	vtype: 'password',
    	//	maskRe: /([a-zA-Z0-9\s]+)$/
     		});
  PrivillageField = new Ext.form.ComboBox({
    id:'userPrivilage',
    fieldLabel: 'User Privillage <html><font color=red> *</font></html>',
    store: ItemsDS,
	displayField:'name',
	valueField:'name',
	typeAhead: true,
	editable: false,
	allowBlank: false,
	width:220,
	mode: 'local',
	triggerAction: 'all',
	emptyText:'Select a Type...',
	selectOnFocus:true
    });
    ConfirmPassField = new Ext.form.TextField({
      		fieldLabel: 'Confirm Password <html><font color=red> *</font></html>',
      		allowBlank: false,
      		inputType:'password',
      		width:200,
      		vtype: 'password',
      		allowBlank: false,
      		initialPasswordField: 'userPassword',
    		id:'conuserPassword',
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});

	UserEmailField = new Ext.form.TextField({
				fieldLabel : 'User E-Mail <html><font color=red> *</font></html>',
				// allowBlank: false,
				width : 200,
			    allowBlank: false,
				vtype : 'email',
				id : 'userEmail'
			});
    //////////////************adding form****************/////////////////
    var fs = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 120,
        width:500,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [UserNameField,
                	   PasswordField,
                	   ConfirmPassField,
					   PrivillageField,
                        UserEmailField
		                   ]
            })
        ],
         buttons:[{
                text:'Save',
                formBind: true,
                // Function that fires when user clicks the button
                handler:AddUserForm
            },{text:'Cancel',
            	handler:function(){AddUserWindow.hide();}
            	}
           ]

    });
  AddUserWindow= new Ext.Window({
      id: 'AddUserWindow',
      title: 'Add New User',
      closable:false,
      width: 420,
      height: 280,
      plain:true,
      layout: 'fit',
      items: fs
    });

 //////////////********display form functions********************/////////////////

   // reset the Form before opening it
  function resetUserForm(){
    UserNameField.reset();
    PasswordField.reset();
    PrivillageField.reset();
    ConfirmPassField.reset();
    UserEmailField.reset();

  }

  // check if the form is valid
  function isUserFormValid(){
  return(UserNameField.isValid() && PasswordField.isValid() && PrivillageField.isValid() && ConfirmPassField.isValid()&& UserEmailField.isValid());
  }

  // display or bring forth the form
  function displayFormWindow(){
  if(!AddUserWindow.isVisible()){
    resetUserForm();
    AddUserWindow.show();
  } else {
    AddUserWindow.toFront();
  }
  }


  /////////////////adding course function/////////////////////
  function AddUserForm(){

   if(isUserFormValid()){
      Ext.Ajax.request({
        waitMsg: 'Please wait...',
        url: '../listUsers.do',
        params: {
          task: "AddUser",
          userUsername:      	UserNameField.getValue(),
          userPrivilage:        PrivillageField.getValue(),
          userPassword:    		PasswordField.getValue(),
          userEmail:  UserEmailField.getValue()
        },
        method:'POST',
        success: function(response){

        var result=1;

          switch(result){
          case 1:

 			var user = new Ext.data.Record({
      		userUsername:      		UserNameField.getValue(),
          	userPrivilage:        	PrivillageField.getValue(),
          	userPassword:    		PasswordField.getValue(),
          	userEmail:  UserEmailField.getValue()
    		});

    		ds.add(user);
 		//	ds.reload();
			AddUserWindow.hide();

            break;
          default:
            Ext.MessageBox.alert('Warning','Could not create the course.');
            break;
          }
        },
        failure: function(response){
          var result=response.responseText;
          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');
        }
      });
    } else {
      var errorMsg='Your Form is not valid!';
                			Ext.Msg.show({
							         title: 'Error',
							        msg: errorMsg,
							        minWidth: 200,
							        modal: true,
							        icon: Ext.Msg.ERROR,
							        buttons: Ext.Msg.OK
								 });
    }


  }


 ////////////////////edit record//////////////////////////////
  var EditUserForm;
  var EditUserWindow;

  var EUserNameField;
  var EPasswordField;
  var EPrivillageField;
  var EConfirmPassField;
var EUserEmailField;
  EUserNameField = new Ext.form.TextField({
      		fieldLabel: 'User Name <html><font color=red> *</font></html>',
      		allowBlank: false,
    		id:'userUsername1',
    		width:200,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});

  EPasswordField = new Ext.form.TextField({
      		fieldLabel: 'Password <html><font color=red> *</font></html>',
      		allowBlank: false,
      		inputType:'password',
      		width:200,
    		id:'userPassword1',
    		//vtype: 'password',
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});
  EPrivillageField = new Ext.form.ComboBox({
  //  id:'userPrivilage',
    fieldLabel: 'User Privillage <html><font color=red> *</font></html>',
    store: ItemsDS,
	displayField:'name',
	valueField:'name',
	typeAhead: true,
	editable: false,
	allowBlank: false,
	width:220,
	mode: 'local',
	triggerAction: 'all',
	emptyText:'Select a Type...',
	selectOnFocus:true
    });
    EConfirmPassField = new Ext.form.TextField({
      		fieldLabel: 'Confirm Password <html><font color=red> *</font></html>',
      		allowBlank: false,
      		inputType:'password',
      		width:200,
      		vtype: 'password',
      		initialPasswordField: 'userPassword1',
    		id:'conuserPassword1',
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});
EUserEmailField=   new Ext.form.TextField({
				fieldLabel : 'User E-Mail <html><font color=red> *</font></html>',
				// allowBlank: false,
				width : 200,
			    allowBlank: false,
				vtype : 'email',
				id : 'userEmail1'
			});
    //////////////************EDIT form****************/////////////////
    var edit = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 120,
        width:500,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [EUserNameField,
                	   EPasswordField,
                	   EConfirmPassField,
					   EPrivillageField,
						EUserEmailField
		                   ]
            })
        ],
         buttons:[{
                text:'Save',
                formBind: true,
                // Function that fires when user clicks the button
                handler:EditUserForm
            },{text:'Cancel',
            	handler:function(){EditUserWindow.hide();}
            	}
           ]

    });
  EditUserWindow= new Ext.Window({
      id: 'EditUserWindow',
      title: 'Edit User',
      closable:false,
      width: 400,
      height: 280,
      plain:true,
      layout: 'fit',
      items: edit
    });

 //////////////********display form functions********************/////////////////

   // reset the Form before opening it
  function resetEditUserForm(){
    EUserNameField.reset();
    EPasswordField.reset();
    EPrivillageField.reset();
    EConfirmPassField.reset();
    EUserEmailField.reset();

  }

  // check if the form is valid
  function isEUserFormValid(){
  return(EUserNameField.isValid() && EPasswordField.isValid() && EPrivillageField.isValid() && EConfirmPassField.isValid() && EUserEmailField.isValid());
  }

  // display or bring forth the form
  function displayEditUserWindow(){
  if(!EditUserWindow.isVisible()){
    resetEditUserForm();
    EditUserWindow.show();
  } else {
    EditUserWindow.toFront();
  }
  }
  /////////////////edit user function/////////////////////
  function EditUserForm(){
  var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
   if(EUserNameField.isValid() && EPasswordField.isValid()  && EConfirmPassField.isValid() && EPrivillageField.isValid() && EUserEmailField.isValid()){
      Ext.Ajax.request({
        waitMsg: 'Please wait...',
        url: '../listUsers.do',
        params: {
          task: "EditUser",
          id:selections[0].id,
          userUsername:      	EUserNameField.getValue(),
          userPrivilage:        EPrivillageField.getValue(),
          userPassword:    		EPasswordField.getValue(),
          userEmail:   EUserEmailField.getValue()
        },
        method:'POST',
        success: function(response){
							ds.reload();
						    EditUserWindow.hide();

        },
        failure: function(response){
          var result=response.responseText;
          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');
        }
      });
    } else {
      var errorMsg='Your Form is not valid!';
                			Ext.Msg.show({
							         title: 'Error',
							        msg: errorMsg,
							        minWidth: 200,
							        modal: true,
							        icon: Ext.Msg.ERROR,
							        buttons: Ext.Msg.OK
								 });
    }


  }
  ////////////////////////////////////////////////////////////////////
    /////////////////////FINISH ADDING/////////////////////////////
 ////////////////////////////////////////////////////////////////////

 /********************************************************************/

  ////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idUsers);
  }


  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this user?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those users?', deleteCourses);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected huh?');
    }
  }

  function deleteCourses(btn){
    if(btn=='yes'){
         var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }

         Ext.Ajax.request({
            waitMsg: 'Please Wait',
            url: '../listUsers.do',
            params: {
               task: "DELETESELECTIONS",
               ids:  selectedCourse
              }, method:'POST',
            success: function(response){
              var result=1;
              switch(result){
              case 1:  // Success : simply reload
                ds.reload();
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
  }


  //////////////////////////FINISH DELETING//////////////////////////////////////////



	function stcCallBack1001(record, opts, success) {
//if (success)
//// do whatever
//alert("the sucess ");
//// alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
////console.log("  LOOOOOOOOOOOOOOD ");

};

	loadtest=   ds.load({callback :  stcCallBack1001});

});