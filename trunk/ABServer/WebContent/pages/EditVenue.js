Ext.apply(Ext.form.VTypes, {
  daterange: function(val, field) {
    var date = field.parseDate(val);
    
    // We need to force the picker to update values to recaluate the disabled dates display
     if(!date){
            return;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.maxValue = date;
           // start.validate();
            this.dateRangeMax = date;
        } 
        if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.minValue = date;
            //end.validate();
            this.dateRangeMin = date;
        }
		
    /* Always return true since we're only using this vtype
     * to set the min/max allowed values (these are tested
     * for after the vtype test)
     */
    return true;
  }
});




Ext.apply(Ext.form.VTypes, {
  daterange: function(val, field) {
    var date = field.parseDate(val);
    
    // We need to force the picker to update values to recaluate the disabled dates display
     if(!date){
            return;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.maxValue = date;
           // start.validate();
            this.dateRangeMax = date;
        } 
        if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.minValue = date;
            //end.validate();
            this.dateRangeMin = date;
        }
		
    /* Always return true since we're only using this vtype
     * to set the min/max allowed values (these are tested
     * for after the vtype test)
     */
    return true;
  }
});




Ext.onReady(function(){

    Ext.QuickTips.init();

    // turn on validation errors beside the field globally
    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();
    /*=====================Grid========================*/
    
    var Personals  = Ext.data.Record.create([
      {name: 'idPersonals', type: 'int'},
      {name: 'personAddress', type: 'string'},
      {name: 'personEmail', type: 'string'},
      {name: 'personFirstName', type: 'string'},
      {name: 'personLastName', type: 'string'},
      {name: 'personMobile', type: 'string'},
      {name: 'personTitle', type: 'string'},
      {name: 'personTelePhone', type: 'string'}
      
     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listVenus.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "listP"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		
   		record: "Personals",           // The repeated element which contains row information
   		id: "idPersonals"
        },Personals
        )
      });
  
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
  //  var sm = new Ext.grid.CheckboxSelectionModel();
      var colModel = new Ext.grid.ColumnModel([
        {header: "Contact First Name", width: 165, sortable: true, dataIndex: 'personFirstName'},
        {header: "Contact Last Name", width: 165, sortable: true, dataIndex: 'personLastName'},
        {header: "Contact Title", width: 165, sortable: true, dataIndex: 'personTitle'},
        {header: "Contact Department", width: 165, sortable: true, dataIndex: 'personAddress'},
        {header: "Contact Email", width: 165, sortable: true, dataIndex: 'personEmail'},
        {header: "Contact Phone", width: 165, sortable: true, dataIndex: 'personTelePhone'},
        {header: "Contact Mobile", width: 165, sortable: true, dataIndex: 'personMobile'}
		
    ]);

 ds.on('add', function(){
	ds.reload();
//myGrid.getView().refresh();
   });
  
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
      //   sm: sm,
        stripeRows: true,
        autoScroll:true,
        height:240,
        width:500,
        border:false,
      // autoScroll:true,
      //  title:'Contacts',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Contact',
             iconCls:'add',
             handler: displayFormWindow
             }),'-',new Ext.Toolbar.Button({
              text: 'Delete Selection',
             iconCls:'remove',
             handler: confirmDeleteCourses
              })
              ],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });

   myGrid.on("rowdblclick", function(myGrid) {
	var sel = myGrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;

		editFormWindow();
		CFNameField.setValue(seldata.personFirstName);
		CLNameField.setValue(seldata.personLastName);
		CMailField.setValue(seldata.personEmail);
		CMobileField.setValue(seldata.personMobile);
		CTitleField.setValue(seldata.personTitle);
		CTelephoneField.setValue(seldata.personTelePhone);
		CAddField.setValue(seldata.personAddress);
		
});

	var Venues  = Ext.data.Record.create([
      {name: 'personEmail', type: 'string'},
      {name: 'venueAddress', type: 'string'},
      {name: 'venueDistrict', type: 'string'},
      {name: 'venueName', type: 'string'},
      {name: 'venuMainContact', type: 'string'},
      {name: 'idVenues',type:'int'},
      {name: 'personFName', type: 'string'},
      {name: 'personLName', type: 'string'}

     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listVenus.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var Vds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "listV"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Venues",           // The repeated element which contains row information
   		id: "idVenues"
        },Venues
        )
      });
  

   
    /*
     * ================  Form 5  =======================
     */
    bd.createChild({tag: 'h2', html: ''});
    
 ////////////////////////////add contact////////////////////////////////////////////////
  var CFNameField;
  var CLNameField;
  var CMailField;
  var CTitleField;
  var CTelephoneField;
  var CMobileField;
  var CAddressField;
  
     CFNameField = new Ext.form.TextField({
			fieldLabel: 'First Name <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220,
    		id:'personFirstName',
    		maskRe: /([a-zA-Z0-9\s]+)$/
            });
   CLNameField = new Ext.form.TextField({
			fieldLabel: 'Last Name <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220,
    		id:'personLastName',
    		maskRe: /([a-zA-Z0-9\s]+)$/
            });
   CMailField = new Ext.form.TextField({
			fieldLabel: 'E-Mail',
      	//	allowBlank: false,
      		width:220,
      		vtype:'email',
    		id:'personEmail'
            });
  CMobileField = new Ext.form.TextField({
			fieldLabel: 'Mobile',
      	//	allowBlank: false,
      		width:220,
      		maskRe: /([0-9\s]+)$/,
    		id:'personMobile'
            });
  CTitleField = new Ext.form.TextField({
			fieldLabel: 'Title <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220,
    		id:'personTitle'
            });
   CTelephoneField = new Ext.form.TextField({
			fieldLabel: 'Phone',
      	//	allowBlank: false,
      		width:220,
      		maskRe: /([0-9\s]+)$/,
    		id:'personTelePhone'
            }); 
   CAddField = new Ext.form.TextField({
			fieldLabel: 'Department <html><font color=red> *</font></html>',
      	//	allowBlank: false,
      		width:220,
      		
    		id:'personAddress'
            });        
  var FNameField;
  var LNameField;
  var MailField;
  var TitleField;
  var TelephoneField;
  var MobileField;
  var AddressField;
  
     FNameField = new Ext.form.TextField({
			fieldLabel: 'First Name <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220,
      		maskRe: /([a-zA-Z0-9\s]+)$/
    //		id:'personFirstName',
            });
   LNameField = new Ext.form.TextField({
			fieldLabel: 'Last Name <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220,
      		maskRe: /([a-zA-Z0-9\s]+)$/
    //		id:'personLastName',
            });
   MailField = new Ext.form.TextField({
			fieldLabel: 'E-Mail',
      		//allowBlank: false,
      		width:220,
      		vtype:'email'
    //		id:'personEmail',
            });
  MobileField = new Ext.form.TextField({
			fieldLabel: 'Mobile',
      	//	allowBlank: false,
      		width:220,
      		maskRe: /([0-9\s]+)$/
    //		id:'personMobile',
            });
  TitleField = new Ext.form.TextField({
			fieldLabel: 'Title <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220
    //		id:'personTitle',
            });
   TelephoneField = new Ext.form.TextField({
			fieldLabel: 'Phone',
      	//	allowBlank: false,
      		width:220,
      		maskRe: /([0-9\s]+)$/
    //		id:'personTelePhone',
            }); 
   AddField = new Ext.form.TextField({
			fieldLabel: 'Department <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220
      		
    //		id:'personAddress',
            });        
	
 ///////////////////////////////////////edit form//////////////////////////////////////////
     
   var valid=1;
   //var flag=true;
   var edit = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 90,
        width:500,
        waitMsgTarget: true,
        items: [
            {
        	title:'Contact Details',
            layout:'column',
            border:false,
            items:[{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [CFNameField,
                		CLNameField,
                		CTitleField,
                		CAddField
                		]
            },{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [
                		CTelephoneField,
               			 CMobileField,
                		CMailField,
                		
                {xtype:'ux-radiogroup',
						fieldLabel:'Contact Type',
						//name:'group1',
						horizontal:true,
						radios:[{
							value:1,
							boxLabel:'Secondary Contact',
							listeners:{
								'check':function(r,c){
									valid = (c?1:0);//alert(r.boxLabel+": "+(c?"checked":"unchecked"));
								}
							},
							checked:true
						}, {
							value:0,
							boxLabel:'Main Contact'
						}]
					}
                		]
            }]
        }
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:EditContactForm
            },{text:'Cancel',
            	handler:function(){EditContactWindow.hide();}
            	}
           ] 
  
    });
  EditContactWindow= new Ext.Window({
      id: 'EditContactWindow',
      title: 'Edit Contact',
      closable:false,
      width: 700,
      height: 250,
      plain:true,
      layout: 'fit',
      items: edit
    });
  function resetCourseForm(){
    CTelephoneField.reset();
    CFNameField.reset();
    CLNameField.reset();
    CTitleField.reset();
    CMailField.reset();
    CAddField.reset();
   CMobileField.reset();
  }
  
  // check if the form is valid
  function isCourseFormValid(){
  return(CAddField.isValid() && CMailField.isValid() && CTitleField.isValid()&& CLNameField.isValid() && CFNameField.isValid() && CTelephoneField.isValid() && CMobileField.isValid());
  }  
 function editFormWindow(){
  if(!EditContactWindow.isVisible()){
    resetCourseForm();
    EditContactWindow.show();
  } else {
    EditContactWindow.toFront();
  }
  
  
  }      
  /////////////////edit contact function/////////////////////
  function EditContactForm(){
  var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
   if(CFNameField.isValid() && CLNameField.isValid() && CTitleField.isValid()&& CAddField.isValid() && CMailField.isValid() &&  CTelephoneField.isValid() && CMobileField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listVenus.do',
        params: {
          task: "EditContact",
          id:selections[0].id,
          personTelePhone:		CTelephoneField.getValue(),
		  personAddress:   		CAddField.getValue(),
		  personTitle:	    	CTitleField.getValue(),
		  personFirstName:      CFNameField.getValue(),
		  personLastName:       CLNameField.getValue(),
		  personEmail:			CMailField.getValue(),
		  mainContact:			valid,
		  personMobile:			CMobileField.getValue()
        },
        method:'POST', 
        success: function(response){        
							EditContactWindow.hide();  
							ds.reload();
						     
              
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
//////////////************adding form****************/////////////////
 
    var valid1=1;
   var fs = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 90,
        width:500,
        waitMsgTarget: true,
        items: [
            {
        	title:'Add Contact',
            layout:'column',
            border:false,
            items:[{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [FNameField,
                		LNameField,
                		TitleField,
                		AddField
                		]
            },{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [
                		TelephoneField,
                		MobileField,
                		MailField,
                		
                {xtype:'ux-radiogroup',
						fieldLabel:'Contact Type',
						//name:'group1',
						horizontal:true,
						radios:[{
							value:1,
							boxLabel:'Secondary Contact',
							listeners:{
								'check':function(r,c){
									valid1 = (c?1:0);//alert(r.boxLabel+": "+(c?"checked":"unchecked"));
								}
							},
							checked:true
						}, {
							value:0,
							boxLabel:'Main Contact'
						}]
					}
                		]
            }]
        }
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:AddVenueForm
            },{text:'Cancel',
            	handler:function(){AddTAWindow.hide();}
            	}
           ] 
  
    });
  AddTAWindow= new Ext.Window({
      id: 'AddTAWindow',
      title: 'Adding a new Contact',
      closable:false,
      width: 700,
      height: 250,
      plain:true,
      layout: 'fit',
      items: fs
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
 function resetAddForm(){
    TelephoneField.reset();
    FNameField.reset();
    LNameField.reset();
    TitleField.reset();
    MailField.reset();
    AddField.reset();
   MobileField.reset();
  }
  
  // check if the form is valid
  function isAddFormValid(){
  return( FNameField.isValid() && LNameField.isValid() && TitleField.isValid()&& AddField.isValid() && MailField.isValid() &&  TelephoneField.isValid() && MobileField.isValid());
  }
  
  // display or bring forth the form
  function displayFormWindow(){
  if(!AddTAWindow.isVisible()){
    resetAddForm();
    AddTAWindow.show();
  } else {
    AddTAWindow.toFront();
  }
  
  
  }         
  
  /////////////////adding course function/////////////////////
  function AddVenueForm(){
  
   if(FNameField.isValid() && LNameField.isValid() && TitleField.isValid()&& AddField.isValid() && MailField.isValid() &&  TelephoneField.isValid() && MobileField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listVenus.do',
        params: {
          task: "AddContact",
          personTelePhone:		TelephoneField.getValue(),
		  personAddress:   		AddField.getValue(),
		  personTitle:	    	TitleField.getValue(),
		  personFirstName:      FNameField.getValue(),
		  personLastName:       LNameField.getValue(),
		  personEmail:			MailField.getValue(),
		  mainContact1:			valid1,
		  personMobile:			MobileField.getValue()
        },
        method:'POST', 
        success: function(response){        

			  var record = new Ext.data.Record({
						    	  personTelePhone:		TelephoneField.getValue() ,
								  personAddress:   		AddField.getValue(),
								  personTitle:	    	TitleField.getValue(),
								  personFirstName:      FNameField.getValue(),
								  personLastName:       LNameField.getValue(),
								  personEmail:			MailField.getValue(),
								  personMobile:			MobileField.getValue()
						    });  
						  //  ds.add(record); 
						  AddTAWindow.hide(); 
						   ds.reload(); 
						      
              			//	valid=1;
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
 /********************************************************************/
 
  ////////////////////delete contacts//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idPersonals);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this Contact?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Contacts?', deleteCourses);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected huh?');
    }
  }
  
  function deleteCourses(btn){
   var selectedCourse = [];
   var flag=true;
         if(btn=='yes'){
         var selections = myGrid.selModel.getSelections();
          var row= ds.getAt(0);  
          var rowID=row.get('idPersonals');  
          
         for(i = 0; i< myGrid.selModel.getCount(); i++){
         	
          if(rowID==selections[i].id)
          		Ext.MessageBox.alert('Error','Sorry, you can\'t delete the main contact!');
          else
          {
          	selectedCourse.push(selections[i].id);
          	alert(selections[i].id);
          }
          
         }
          if(selectedCourse.length!=0)
          {		
	         Ext.Ajax.request({  
	            waitMsg: 'Please Wait',
	            url: '../listVenus.do', 
	            params: { 
	               task: "DELETECONTACT", 
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
  }
  
  
  //////////////////////////FINISH DELETING//////////////////////////////////////////
     
  ////////////////////adding new record//////////////////////////////  
  var VNameField;
  var VAddField;
  var VMainContactField;
  var VDistrictField;
   
   	VNameField = new Ext.form.TextField({
		    id: 'venueName',
		    fieldLabel: 'Venue Name <html><font color=red> *</font></html>',
		   // maxLength: 20,
		    width:300,
		    allowBlank: false,
		    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
		      
	 VAddField = new Ext.form.TextField({
			id: 'venueAddres',
		    fieldLabel: 'Venue Address',
		  //  maxLength: 20,
		    width:300,
		 //   allowBlank: false,
		//    maskRe: /([a-zA-Z0-9\s]+)$/
            });
    
   	VMainContactField = new Ext.form.NumberField({
			fieldLabel: 'Venue Phone',
      	//	allowBlank: false,
      		width:300,
    		id:'venueMainContact',
            });
   	VDistrictField = new Ext.form.TextField({
			fieldLabel: 'Venue District',
      	//	allowBlank: false,
      		width:300,
    		id:'venueDistrict',
            });
  
  Vds.load();
  Vds.on('load', function(){//////console.log(Cds.getAt(0));
//alert(Cds.getAt(0));
var venusRec = Vds.getAt(0);
VNameField.setValue(venusRec.get('venueName'));
VAddField.setValue(venusRec.get('venueAddress'));
VMainContactField.setValue(venusRec.get('venuMainContact'));
VDistrictField.setValue(venusRec.get('venueDistrict'));
});
 /**==========================================================================*/

//////////////////////////////////Room Grid//////////////////////////////////////////////
 var Rooms  = Ext.data.Record.create([
      {name: 'idRooms', type: 'int'},
      {name: 'roomCapacity', type: 'int'},
      {name: 'roomNumber', type: 'int'},
      {name: 'roomValid', type: 'boolean'},
      {name: 'roomValidFrom', type: 'string'},
      {name: 'roomValidTo', type: 'string'}
      
     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listVenus.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var Rds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "listR"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		
   		record: "Rooms",           // The repeated element which contains row information
   		id: "idRooms"
        },Rooms
        )
      });
  
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
  //  var sm = new Ext.grid.CheckboxSelectionModel();
      var colModel = new Ext.grid.ColumnModel([
        {header: "Number of Rooms", width: 150, sortable: true, dataIndex: 'roomNumber'},
        {header: "Start Date", width: 150, sortable: true, dataIndex: 'roomValidFrom'},
        {header: "End Date", width: 150, sortable: true, dataIndex: 'roomValidTo'}
    ]);

 Rds.on('add', function(){
	Rds.reload();
//myGrid.getView().refresh();
   });
  Rds.load();
    var myRoomGrid = new Ext.grid.GridPanel({
        ds: Rds,
        cm: colModel,
      //   sm: sm,
        stripeRows: true,
        autoScroll:true,
        height:240,
   //     autoScroll:true,
        border:false,
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Room',
            iconCls:'add',
             handler: displayAddRoomWindow
             }),'-',new Ext.Toolbar.Button({
              text: 'Delete Selection',
             iconCls:'remove',
            handler: confirmDeleteCourses1
              })
              ],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });
    myRoomGrid.on("rowdblclick", function(myGrid) {
	var sel = myGrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;

		displayEditRoomWindow();
		ERoomNumberField.setValue(seldata.roomNumber);
		ERoomValidFromField.setValue(seldata.roomValidFrom);
		ERoomValidToField.setValue(seldata.roomValidTo);
		
});
    
  ////////////////////adding new record//////////////////////////////
  var AddRoomForm;
  var AddRoomWindow;
  
  var RoomCapacityField;
  var RoomNumberField;
  var RoomValidFromField;
  var RoomValidToField;
 // var valid=1;
  
   	RoomCapacityField = new Ext.form.TextField({
		    id: 'roomCapacity',
		    fieldLabel: 'Room Capacity <html><font color=red> *</font></html>',
		  //  maxLength: 20,
		    width:220,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
		      });
		      
	 RoomNumberField = new Ext.form.TextField({
			id: 'roomNumber',
		    fieldLabel: 'Number of Rooms <html><font color=red> *</font></html>',
		   // maxLength: 30,
		    width:220,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
            });
    
   	RoomValidFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
              //  disabledDays: [5, 6],
                id: 'roomValidFrom',
        		vtype: 'daterange',
        		allowBlank: false,
		    	endDateField: 'roomValidTo'
            });
    
    RoomValidToField = new Ext.form.DateField({
			fieldLabel: 'Valid To',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                id:'roomValidTo',
                vtype: 'daterange',
              //  disabledDays: [5, 6],
                startDateField:'roomValidFrom'
            });
 
 
  
   
  
 
    //////////////************adding form****************/////////////////
   // var valid='Salary';
    var flag=1;
    var add = new Ext.FormPanel({
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
                items: [
                	   RoomNumberField,
					   RoomValidFromField,
					//   RoomValidToField
					   
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:AddRoomForm
            },{text:'Cancel',
            	handler:function(){AddRoomWindow.hide();}
            	}
           ] 
  
    });
  AddRoomWindow= new Ext.Window({
      id: 'AddRoomWindow',
      title: 'Add new Room',
      closable:false,
      width: 420,
      height: 180,
      plain:true,
      layout: 'fit',
      items: add
    });

 //////////////********display edit form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetAddRoomForm(){
  
    RoomNumberField.reset();
    RoomValidFromField.reset();
  //  RoomValidToField.reset();
					   
  }
  
  // check if the form is valid
  function isAddRoomValid(){
  return(RoomNumberField.isValid() && RoomValidFromField.isValid());
  }
  
  // display or bring forth the form
  function displayAddRoomWindow(){
  if(!AddRoomWindow.isVisible()){
    resetAddRoomForm();
    AddRoomWindow.show();
  } else {
    AddRoomWindow.toFront();
  }
  
  
  }
    
    
  /////////////////adding course function/////////////////////
  function AddRoomForm(){
  var RvF='3000-01-01';
  var RvT='3000-01-01';
//  if(RoomValidToField.getValue()!='')
//  {
//  	RvT=RoomValidToField.getValue().format('Y-m-d');
//  }
  if(RoomValidFromField.getValue()!='')
  {
  	RvF=RoomValidFromField.getValue().format('Y-m-d');
  }
   if(RoomNumberField.isValid() && RoomValidFromField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listVenus.do',
        params: {
          task: "AddRoom",
		  roomNumber:   	RoomNumberField.getValue(),
		//  roomValidTo:	    RvT,
		  roomValidFrom:    RvF
        },
        method:'POST', 
        success: function(response){    
//        	if(RvT != RoomValidToField.getValue()) 
//        		RvT='';
        	if(RvF != RoomValidFromField.getValue())
        		RvF='';   
			AddRoomWindow.hide();
			 var record = new Ext.data.Record({
		  						  roomNumber:   	RoomNumberField.getValue(),
		 						  roomValidFrom:    RvF,
		 					//	  roomValidTo:	    RvT
		  						  
						    });  
						    Rds.add(record);  
						      
              
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

/////////////////////////////////edit form/////////////////////////////////////////////////////////

  var EditRoomForm;
  var EditRoomWindow;
  
  var ERoomCapacityField;
  var ERoomNumberField;
  var ERoomValidFromField;
  var ERoomValidToField;
  var valid=1;
  
   	ERoomCapacityField = new Ext.form.NumberField({
		    id: 'EroomCapacity',
		    fieldLabel: 'Room Capacity',
		  //  maxLength: 20,
		    width:220,
		    allowBlank: false,
		//    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
		      
	 ERoomNumberField = new Ext.form.NumberField({
			id: 'EroomNumber',
		    fieldLabel: 'Number of Rooms <html><font color=red> *</font></html>',
		  //  maxLength: 30,
		    width:220,
		    allowBlank: false,
		//    maskRe: /([a-zA-Z0-9\s]+)$/
            });
    
   	ERoomValidFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
            //    disabledDays: [5, 6],
                id: 'EroomValidFrom',
        		allowBlank: false,
		    	vtype: 'daterange',
        	//	endDateField: 'EroomValidTo'
            });
    
    ERoomValidToField = new Ext.form.DateField({
			fieldLabel: 'Valid To',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                id:'EroomValidTo',
                vtype: 'daterange',
           //     disabledDays: [5, 6],
            //    startDateField:'EroomValidFrom'
            });
 
 
  
   
  
 
//////////////************editing form****************/////////////////

    var flag=1;
    var roomEdit = new Ext.FormPanel({
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
                items: [
                	   ERoomNumberField,
					   ERoomValidFromField,
					   ERoomValidToField
					   
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:EditRoomForm
            },{text:'Cancel',
            	handler:function(){EditRoomWindow.hide();}
            	}
           ] 
  
    });
  EditRoomWindow= new Ext.Window({
      id: 'EditRoomWindow',
      title: 'Edit Room',
      closable:false,
      width: 420,
      height: 200,
      plain:true,
      layout: 'fit',
      items: roomEdit
    });

 //////////////********display edit form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetEditRoomForm(){
 
    ERoomNumberField.reset();
    ERoomValidFromField.reset();
    ERoomValidToField.reset();
					   
  }
  
  // check if the form is valid
  function isEditRoomValid(){
  return(ERoomNumberField.isValid() && ERoomValidFromField.isValid() && ERoomValidToField.isValid());
  }
  
  // display or bring forth the form
  function displayEditRoomWindow(){
  if(!EditRoomWindow.isVisible()){
    resetEditRoomForm();
    EditRoomWindow.show();
  } else {
    EditRoomWindow.toFront();
  }
  
  
  }
    
    
  /////////////////editing room function/////////////////////
  function EditRoomForm(){
   var selections = myRoomGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
   var ERvF='3000-01-01';
   var ERvT='3000-01-01';
   
  if(ERoomValidToField.getValue()!='')
  {
  	ERvT=ERoomValidToField.getValue().format('Y-m-d');
  }
  if(ERoomValidFromField.getValue()!='')
  {
  	ERvF=ERoomValidFromField.getValue().format('Y-m-d');
  }
   if(ERoomNumberField.isValid() && ERoomValidFromField.isValid() && ERoomValidToField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listVenus.do',
        params: {
          task: "EditRoom",
          id:selections[0].id,
		  roomNumber:   	ERoomNumberField.getValue(),
		  roomValidTo:	    ERvT,
		  roomValidFrom:    ERvF
        },
        method:'POST', 
        success: function(response){ //alert(flag);  
        EditRoomWindow.hide();      
			
			 var record = new Ext.data.Record({
		  						  roomNumber:   	ERoomNumberField.getValue(),
		 						  roomValidTo:	    ERoomValidToField.getValue(),
		  						  roomValidFrom:    ERoomValidFromField.getValue()
						    });  
						    Rds.reload(); 
						    
						//    flag=1; 
              
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
  
 /********************************************************************/
 
  ////////////////////delete selection record(s)//////////////////////////////
  var selections = myRoomGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myRoomGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idRooms);
  }
 
  
  function confirmDeleteCourses1(){
    if(myRoomGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this Room?', deleteCourses);
    } else if(myRoomGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Rooms?', deleteCourses);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected huh?');
    }
  }
  
  function deleteCourses(btn){
    if(btn=='yes'){
         var selections = myRoomGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myRoomGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }
         
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../listVenus.do', 
            params: { 
               task: "DELETEROOM", 
               ids:  selectedCourse
              }, method:'POST',
            success: function(response){
              var result=1;
              switch(result){
              case 1:  // Success : simply reload
                Rds.reload();
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
  
   
///////////////////////////////MenuGrid///////////////////////////////////////////////////

// Ext.ns('Example');
  
 //Ext.BLANK_IMAGE_URL = './ext/resources/images/default/s.gif';
  var Menus  = Ext.data.Record.create([
      {name: 'idMenus', type: 'int'},
      {name: 'menuDescription', type: 'string'},
      {name: 'menuName', type: 'string'},
      {name: 'menuValid', type: 'boolean'},
      {name: 'menuValidFrom', type: 'string'},
      {name: 'menuValidTo', type: 'string'}
      
     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listVenus.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var Mds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "listM"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		
   		record: "Menus",           // The repeated element which contains row information
   		id: "idMenus"
        },Menus
        )
      });
  
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
  //  var sm = new Ext.grid.CheckboxSelectionModel();
      var colModel = new Ext.grid.ColumnModel([
        {header: "Menu Name", width: 140, sortable: true, dataIndex: 'menuName'},
        {header: "Valid From", width: 140, sortable: true, dataIndex: 'menuValidFrom'},
        {header: "Valid To", width: 140, sortable: true, dataIndex: 'menuValidTo'},
        {header: "Menu Description", width: 140, sortable: true, dataIndex: 'menuDescription'}
    ]);

 Mds.on('add', function(){
	Mds.reload();
//myGrid.getView().refresh();
   });
 

//var Itemid;
var x=1;
var Grid = new Ext.grid.GridPanel({
        ds: Mds,
        cm: colModel,
      //   sm: sm,
        stripeRows: true,
        height:465,
        autoScroll:true,
        width:550,
        title:'Menus',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Menu',
           //  disabled : true,
             iconCls:'add',
             handler: displayAddMenuWindow
             }),'-',new Ext.Toolbar.Button({
              text: 'Delete Selection',
             iconCls:'remove',
             handler: confirmDeleteCourses2
              })
              ],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });
  
  Grid.on("rowdblclick", function(Grid) {
	var sel = Grid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;

		displayEditMenuWindow();
		EMenuNameField.setValue(seldata.menuName);
		EMenuDescField.setValue(seldata.menuDescription);
		EMStartDateField.setValue(seldata.menuValidFrom);
		EMEndDateField.setValue(seldata.menuValidTo);
		
});

 Grid.on("rowclick", function(Grid) {
	 var selections = Grid.selModel.getSelections();
         var selectedCourse = [];
         x=0;
         for(i = 0; i< Grid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }
		  Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listVenus.do',
        params: {
          task: "check",
          id:selections[0].id
        },
        method:'POST', 
        success: function(response){        

			 MIds.reload();
			 var sel = Grid.getSelectionModel().getSelected();
        	 var selIndex = ds.indexOf(sel);
        	 var seldata=sel.data;
        	// alert(seldata.menuValidFrom);
			 MenuItemValidFromField.setValue(seldata.menuValidFrom);
        },
        failure: function(response){
          var result=response.responseText;
          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
        }                      
      });
		
});
  ////////////////////adding new record//////////////////////////////
  var AddMenuForm;
  var AddMenuWindow;
  
  var MenuNameField;
  var MenuDescField;
  var MStartDateField;
  var MEndDateField;
 // var valid=1;
  
   	MenuNameField = new Ext.form.TextField({
		    id: 'menuName',
		    fieldLabel: 'Menu Name <html><font color=red> *</font></html>',
		  //  maxLength: 20,
		    width:220,
		    allowBlank: false,
		//    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
		      
	 MenuDescField = new Ext.form.TextArea({
			id: 'menuDescription',
		    fieldLabel: 'Menu Description',
		 //   maxLength: 30,
		    width:220,
		 //   allowBlank: false,
		//    maskRe: /([a-zA-Z0-9\s]+)$/
            });
    
   	MStartDateField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
             //   disabledDays: [5, 6],
                id: 'menuStartDate',
        		vtype: 'daterange',
        		allowBlank: false,
        		endDateField: 'menuEndDate'
            });
    
    MEndDateField = new Ext.form.DateField({
			fieldLabel: 'Valid To',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                id:'menuEndDate',
                vtype: 'daterange',
            //    disabledDays: [5, 6],
            //    allowBlank: false,
                startDateField:'menuStartDate'
            });
 
 
  
   
  
 
    //////////////************adding form****************/////////////////
   // var valid='Salary';
    var flag=1;
    var addMenu = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 110,
        width:500,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [MenuNameField,
                	   MStartDateField,
					//   MEndDateField,
					   MenuDescField
					   
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:AddMenuForm
            },{text:'Cancel',
            	handler:function(){AddMenuWindow.hide();}
            	}
           ] 
  
    });
  AddMenuWindow= new Ext.Window({
      id: 'AddMenuWindow',
      title: 'Add new Menu',
      closable:false,
      width: 410,
      height: 220,
      plain:true,
      layout: 'fit',
      items: addMenu
    });

 //////////////********display edit form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetAddMenuForm(){
    MenuNameField.reset();
    MenuDescField.reset();
    MStartDateField.reset();
  //  MEndDateField.reset();
					   
  }
  
  // check if the form is valid
  function isAddMenuValid(){
  return(MenuNameField.isValid() && MenuDescField.isValid() && MStartDateField.isValid());
  }
  
  // display or bring forth the form
  function displayAddMenuWindow(){
  if(!AddMenuWindow.isVisible()){
    resetAddMenuForm();
    AddMenuWindow.show();
  } else {
    AddMenuWindow.toFront();
  }
  
  
  }
    
    
  /////////////////adding course function/////////////////////
  function AddMenuForm(){
  var MvF='3000-01-01';
  var MvT='3000-01-01';
  if(MStartDateField.getValue()!='')
  {
  	MvF=MStartDateField.getValue().format('Y-m-d');
  }
//  if(MEndDateField.getValue()!='')
//  {
//  	MvT=MEndDateField.getValue().format('Y-m-d');
//  }
   if(MenuNameField.isValid() && MenuDescField.isValid() && MStartDateField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listVenus.do',
        params: {
          task: "AddMenu",
          menuName:				MenuNameField.getValue() ,
		  menuDescription:   	MenuDescField.getValue(),
		  menuValidFrom:	    MvF,
		//  menuValidTo:    		MvT
        },
        method:'POST', 
        success: function(response){     
        	   if(MvF != MStartDateField.getValue())
        	   		MvF='';
//        	   if(MvT != MEndDateField.getValue())
//        	   		MvT='';
			AddMenuWindow.hide(); 
			 var record = new Ext.data.Record({
						    	     menuName:				MenuNameField.getValue() ,
		 							 menuDescription:   	MenuDescField.getValue(),
		  							 menuValidFrom:	        MvF,
		  						//	 menuValidTo:    		MvT,
		  						     
						    });  
						    Mds.add(record);  
						     
              
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
 
//////////////************editing form****************/////////////////
  var EditMenuForm;
  var EditMenuWindow;
  
  var EMenuNameField;
  var EMenuDescField;
  var EMStartDateField;
  var EMEndDateField;
 // var valid=1;
  
   	EMenuNameField = new Ext.form.TextField({
		//    id: 'menuName',
		    fieldLabel: 'Menu Name <html><font color=red> *</font></html>',
		 //   maxLength: 20,
		    width:220,
		    allowBlank: false,
		//    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
		      
	 EMenuDescField = new Ext.form.TextArea({
		//	id: 'menuDescription',
		    fieldLabel: 'Menu Description',
		 //   maxLength: 30,
		    width:220,
		 //   allowBlank: false,
		//    maskRe: /([a-zA-Z0-9\s]+)$/
            });
    
   	EMStartDateField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
             //   disabledDays: [5, 6],
                id: 'menuStartDate1',
        		vtype: 'daterange',
        		allowBlank: false,
        	//	endDateField: 'menuEndDate1'
            });
    
    EMEndDateField = new Ext.form.DateField({
			fieldLabel: 'Valid To',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                id:'menuEndDate1',
                vtype: 'daterange',
           //     disabledDays: [5, 6],
        //        allowBlank: false,
              //  startDateField:'menuStartDate1'
            });
 
 
    var flag2=1;
    var menuEdit = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 90,
        width:500,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [EMenuNameField,
                	   EMStartDateField,
					   EMEndDateField,
					   EMenuDescField
					   
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:EditMenuForm
            },{text:'Cancel',
            	handler:function(){EditMenuWindow.hide();}
            	}
           ] 
  
    });
  EditMenuWindow= new Ext.Window({
      id: 'EditMenuWindow',
      title: 'Edit Menu',
      closable:false,
      width: 400,
      height: 250,
      plain:true,
      layout: 'fit',
      items: menuEdit
    });

 //////////////********display edit form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetEditMenuForm(){
    EMenuNameField.reset();
    EMenuDescField.reset();
    EMStartDateField.reset();
    EMEndDateField.reset();
					   
  }
  
  // check if the form is valid
  function isEditMenuValid(){
  return(EMenuNameField.isValid() && EMenuDescField.isValid() && EMStartDateField.isValid() && EMEndDateField.isValid());
  }
  
  // display or bring forth the form
  function displayEditMenuWindow(){
  if(!EditMenuWindow.isVisible()){
    resetEditMenuForm();
    EditMenuWindow.show();
  } else {
    EditMenuWindow.toFront();
  }
  
  
  }
    
    
  /////////////////editing room function/////////////////////
  function EditMenuForm(){
  var EMvF='3000-01-01';
  var EMvT='3000-01-01';
  if(EMStartDateField.getValue()!='')
  {
  	EMvF=EMStartDateField.getValue().format('Y-m-d');
  }
  if(EMEndDateField.getValue()!='')
  {
  	EMvT=EMEndDateField.getValue().format('Y-m-d');
  }
   var selections = Grid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< Grid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
   if(EMenuNameField.isValid() && EMenuDescField.isValid() && EMStartDateField.isValid() && EMEndDateField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listVenus.do',
        params: {
          task: "EditMenu",
          id:selections[0].id,
          menuName:				EMenuNameField.getValue() ,
		  menuDescription:   	EMenuDescField.getValue(),
		  menuValidFrom:	    EMvF,
		  menuValidTo:    		EMvT
        },
        method:'POST', 
        success: function(response){ //alert(flag);       
			
						    Mds.reload(); 
						    EditMenuWindow.hide(); 
						
              
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
  
 /********************************************************************/
 
  ////////////////////delete selection record(s)//////////////////////////////
  var selections = Grid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< Grid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idMenus);
  }
 
  
  function confirmDeleteCourses2(){
    if(Grid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this Menu?', deleteCourses);
    } else if(Grid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Menus?', deleteCourses);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected huh?');
    }
  }
  
  function deleteCourses(btn){
    if(btn=='yes'){
         var selections = Grid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< Grid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }
         
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../listVenus.do', 
            params: { 
               task: "DELETEMENU", 
               ids:  selectedCourse
              }, method:'POST',
            success: function(response){
              var result=1;
              switch(result){
              case 1:  // Success : simply reload
                Mds.reload();
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
      
 //////////////////////////////////////////////Menu Items//////////////////////////////////////////////////// 
 var Menuitems = Ext.data.Record.create([
       {name: 'idMenuItems', type: 'int'},
       {name: 'menuItemDescription', type: 'string'},
       {name: 'menuItemName', type: 'string'},
       {name: 'menuItemPrice', type: 'int'},
       {name: 'menuItemTypePer', type: 'string'},
       {name: 'menuItemValid', type: 'boolean'},
       {name: 'menuItemValidFrom', type: 'string'},
       {name: 'menuItemValidTo', type: 'string'}
       
    ]);
dataProxy = new Ext.data.HttpProxy({
     	url: '../listVenus.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });
var MIds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "listMI"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		
   		record: "Menuitems",           // The repeated element which contains row information
   		id: "idMenuItems"
        },Menuitems
        )
      });
      
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
       var colModel = new Ext.grid.ColumnModel([
            {header: "Item Name", width: 100, sortable: true, dataIndex: 'menuItemName'},
            {header: "Item Price", width: 100, sortable: true, dataIndex: 'menuItemPrice'},
            {header: "Item Type", width: 100, sortable: true, dataIndex: 'menuItemTypePer'},
            {header: "Item Description", width: 100, sortable: true, dataIndex: 'menuItemDescription'},
            {header: "Valid From", width: 100, sortable: true, dataIndex: 'menuItemValidFrom'},
            {header: "Valid To", width: 100, sortable: true, dataIndex: 'menuItemValidTo'}
            ]);
     MIds.on('add', function(){
	MIds.reload();
//myGrid.getView().refresh();
   });
       
    var MIgrid = new Ext.grid.GridPanel({
        ds: MIds,
        cm: colModel,
      //   sm: sm,
        stripeRows: true,
        height:465,
        autoScroll:true,
        width:620,
        title:'Menu Items',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Menu Item',
             iconCls:'add',
             handler: displayAddMenuItemWindow
             }),'-',new Ext.Toolbar.Button({
              text: 'Delete Selection',
             iconCls:'remove',
             handler: confirmDeleteCourses3
              })
              ],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });
   MIgrid.on("rowdblclick", function(MIgrid) {
	var sel = MIgrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;

		displayEditMenuItemWindow();
		EMenuItemNameField.setValue(seldata.menuItemName);
		EMenuItemDescField.setValue(seldata.menuItemDescription);
		EMenuItemValidFromField.setValue(seldata.menuItemValidFrom);
		EMenuItemValidToField.setValue(seldata.menuItemValidTo);
		EMenuItemPriceField.setValue(seldata.menuItemPrice);
		EMenuItemTypePerField.setValue(seldata.menuItemTypePer);
});     


     ////////////////////adding new record//////////////////////////////
  var AddMenuItemForm;
  var AddMenuItemWindow;
  
  var MenuItemNameField;
  var MenuItemDescField;
  var MenuItemValidFromField;
  var MenuItemValidToField;
  var MenuItemPriceField;
  var MenuItemTypePerField;
  var v=1;
  var MItemsds=[['0','Per Person'],['1','Per Unit']];
    var ItemsDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: MItemsds
    }); 
   // alert(ItemsDS.length);
   	MenuItemNameField = new Ext.form.TextField({
		    id: 'menuItemName',
		    fieldLabel: 'Menu Item Name <html><font color=red> *</font></html>',
		   // maxLength: 20,
		    width:220,
		    allowBlank: false,
		    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
		      
	 MenuItemDescField = new Ext.form.TextArea({
			id: 'menuItemDescription',
		    fieldLabel: 'Menu Item Description',
		//    maxLength: 20,
		    width:220,
		//    allowBlank: false,
		//    maskRe: /([a-zA-Z0-9\s]+)$/
            });
    
   	MenuItemValidFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
             //   disabledDays: [5, 6],
                id: 'menuItemValidFrom',
        		vtype: 'daterange',
        		allowBlank: false,
        		endDateField: 'menuItemValidTo'
            });
    
    MenuItemValidToField = new Ext.form.DateField({
			fieldLabel: 'Valid To',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                id:'menuItemValidTo',
                vtype: 'daterange',
                
           //     disabledDays: [5, 6],
                startDateField:'menuItemValidFrom'
            });
   MenuItemPriceField = new Ext.form.TextField({
			id: 'menuItemPrice',
		    fieldLabel: 'Menu Item Price <html><font color=red> *</font></html>',
		   // maxLength: 30,
		    width:220,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
            });
            
   MenuItemTypePerField = new Ext.form.ComboBox({
			id: 'menuItemTypePer',
		    fieldLabel: 'Menu Item Type <html><font color=red> *</font></html>',
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
////////////////////////////////////////add form////////////////////////////////////////            
  
     var addMenuItem = new Ext.FormPanel({
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
                items: [MenuItemNameField,
  						MenuItemPriceField,
  						MenuItemTypePerField,
  						MenuItemValidFromField,
  						MenuItemValidToField,
					    MenuItemDescField
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:AddMenuItemForm
            },{text:'Cancel',
            	handler:function(){AddMenuItemWindow.hide();}
            	}
           ] 
  
    });
  AddMenuItemWindow= new Ext.Window({
      id: 'AddMenuItemWindow',
      title: 'Add new Menu Item',
      closable:false,
      width: 430,
      height: 320,
      plain:true,
      layout: 'fit',
      items: addMenuItem
    });

    
    
   // reset the Form before opening it
  function resetAddMenuItemForm(){
    MenuItemNameField.reset();
  	MenuItemDescField.reset();
 // 	MenuItemValidFromField.reset();
    MenuItemValidToField.reset();
  	MenuItemPriceField.reset();
  	MenuItemTypePerField.reset();
					   
  }
  
  // check if the form is valid
  function isAddMenuItemValid(){
  return(MenuItemNameField.isValid() && MenuItemDescField.isValid() && MenuItemValidFromField.isValid() && MenuItemPriceField.isValid() && MenuItemTypePerField.isValid());
  }
  
  // display or bring forth the form
  function displayAddMenuItemWindow(){
  if(Grid.selModel.getCount()!=0)
  {
  if(!AddMenuItemWindow.isVisible()){
    resetAddMenuItemForm();
    AddMenuItemWindow.show();
  } else {
    AddMenuItemWindow.toFront();
  }
  }
  else
  {Ext.MessageBox.alert('Warning','You did not select any menu, please select menu first!');}
  
  }
    
    
  /////////////////adding menu item function/////////////////////
  function AddMenuItemForm(){
  var MIvF='3000-01-01';
  var MIvT='3000-01-01';
  if(MenuItemValidFromField.getValue()!='')
  {
  	MIvF=MenuItemValidFromField.getValue().format('Y-m-d');
  }
  if(MenuItemValidToField.getValue()!='')
  {
  	MIvT=MenuItemValidToField.getValue().format('Y-m-d');
  }
   if(MenuItemNameField.isValid() && MenuItemDescField.isValid() && MenuItemValidFromField.isValid() && MenuItemPriceField.isValid() && MenuItemTypePerField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listVenus.do',
        params: {
          task: "AddMenuItem",
          menuItemName:				MenuItemNameField.getValue() ,
		  menuItemDescription:   	MenuItemDescField.getValue(),
		  menuItemValidFrom:	    MIvF,
		  menuItemValidTo:    		MIvT,
		  menuItemPrice:			MenuItemPriceField.getValue(),
		  menuItemTypePer:			MenuItemTypePerField.getValue()
        },
        method:'POST', 
        success: function(response){        
		if(MIvF!=MenuItemValidFromField.getValue())
			MIvF='';
		if(MIvT !=MenuItemValidToField.getValue())
			MIvT='';
			 var record = new Ext.data.Record({
						    	  menuItemName:				MenuItemNameField.getValue() ,
								  menuItemDescription:   	MenuItemDescField.getValue(),
								  menuItemValidFrom:	    MIvF,
								  menuItemValidTo:    		MIvT,
								  menuItemPrice:			MenuItemPriceField.getValue(),
								  menuItemTypePer:			MenuItemTypePerField.getValue(),
								  
						    });  
						    MIds.add(record); // alert(record.get('menuItemValidTo'));
						    AddMenuItemWindow.hide();  
              
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
    ////////////////////editing new record//////////////////////////////
  var EditMenuItemForm;
  var EditMenuItemWindow;
  
  var EMenuItemNameField;
  var EMenuItemDescField;
  var EMenuItemValidFromField;
  var EMenuItemValidToField;
  var EMenuItemPriceField;
  var EMenuItemTypePerField;
 // var v=1;
  
   	EMenuItemNameField = new Ext.form.TextField({
	//	    id: 'menuItemName',
		    fieldLabel: 'Menu Item Name <html><font color=red> *</font></html>',
		   // maxLength: 20,
		    width:220,
		    allowBlank: false,
		    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
		      
	 EMenuItemDescField = new Ext.form.TextArea({
		//	id: 'menuItemDescription',
		    fieldLabel: 'Menu Item Description',
		//    maxLength: 20,
		    width:220,
		 //   allowBlank: false,
		//    maskRe: /([a-zA-Z0-9\s]+)$/
            });
    
   	EMenuItemValidFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                allowBlank: false,
             //   disabledDays: [5, 6],
                id: 'menuItemValidFrom1',
        		vtype: 'daterange',
        	//	endDateField: 'menuItemValidTo1'
            });
    
    EMenuItemValidToField = new Ext.form.DateField({
			fieldLabel: 'Valid To',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                id:'menuItemValidTo1',
                vtype: 'daterange',
            //    disabledDays: [5, 6],
            //    startDateField:'menuItemValidFrom1'
            });
   EMenuItemPriceField = new Ext.form.TextField({
	//		id: 'menuItemPrice',
		    fieldLabel: 'Menu Item Price <html><font color=red> *</font></html>',
		 //   maxLength: 30,
		    width:220,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
            });
            
   EMenuItemTypePerField = new Ext.form.ComboBox({
			id: 'EmenuItemTypePer',
		    fieldLabel: 'Menu Item Type <html><font color=red> *</font></html>',
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
////////////////////////////////////////edit form////////////////////////////////////////            
  
     var editMenuItem = new Ext.FormPanel({
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
                items: [EMenuItemNameField,
  						EMenuItemPriceField,
  						EMenuItemTypePerField,
  						EMenuItemValidFromField,
  						EMenuItemValidToField,
					    EMenuItemDescField
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:EditMenuItemForm
            },{text:'Cancel',
            	handler:function(){EditMenuItemWindow.hide();}
            	}
           ] 
  
    });
  EditMenuItemWindow= new Ext.Window({
      id: 'EditMenuItemWindow',
      title: 'Edit Menu Item',
      closable:false,
      width: 430,
      height: 320,
      plain:true,
      layout: 'fit',
      items: editMenuItem
    });

    
    
   // reset the Form before opening it
  function resetEditMenuItemForm(){
    EMenuItemNameField.reset();
  	EMenuItemDescField.reset();
  	EMenuItemValidFromField.reset();
    EMenuItemValidToField.reset();
  	EMenuItemPriceField.reset();
  	EMenuItemTypePerField.reset();
					   
  }
  
  // check if the form is valid
  function isEditMenuItemValid(){
  return(EMenuItemNameField.isValid() && EMenuItemDescField.isValid() && EMenuItemValidFromField.isValid() && EMenuItemValidToField.isValid() && EMenuItemPriceField.isValid() && EMenuItemTypePerField.isValid());
  }
  
  // display or bring forth the form
  function displayEditMenuItemWindow(){
  if(!EditMenuItemWindow.isVisible()){
    resetEditMenuItemForm();
    EditMenuItemWindow.show();
  } else {
    EditMenuItemWindow.toFront();
  }
  
  
  }
  /////////////////editing room function/////////////////////
  function EditMenuItemForm(){
  var EMIvF='3000-01-01';
  var EMIvT='3000-01-01';
  if(EMenuItemValidFromField.getValue()!='')
  {
  	EMIvF=EMenuItemValidFromField.getValue().format('Y-m-d');
  }
  if(EMenuItemValidToField.getValue()!='')
  {
  	EMIvT=EMenuItemValidToField.getValue().format('Y-m-d');
  }
   var selections = MIgrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< MIgrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
   if(EMenuItemNameField.isValid() && EMenuItemDescField.isValid() && EMenuItemValidFromField.isValid() && EMenuItemValidToField.isValid() && EMenuItemPriceField.isValid() && EMenuItemTypePerField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listVenus.do',
        params: {
          task: "EditMenuItem",
          id:selections[0].id,
          menuItemName:				EMenuItemNameField.getValue() ,
		  menuItemDescription:   	EMenuItemDescField.getValue(),
		  menuItemValidFrom:	    EMIvF,
		  menuItemValidTo:    		EMIvT,
		  menuItemPrice:			EMenuItemPriceField.getValue(),
		  menuItemTypePer:			EMenuItemTypePerField.getValue()
        },
        method:'POST', 
        success: function(response){ //alert(flag);       
			
						    MIds.reload(); 
						    EditMenuItemWindow.hide(); 
						//    flag=1; 
              
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
  /********************************************************************/
 
  ////////////////////delete selection record(s)//////////////////////////////
  var selections = MIgrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< MIgrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idMenuItems);
  }
 
  
  function confirmDeleteCourses3(){
    if(MIgrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this Item?', deleteCourses);
    } else if(MIgrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Items?', deleteCourses);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected huh?');
    }
  }
  
  function deleteCourses(btn){
    if(btn=='yes'){
         var selections = MIgrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< MIgrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }
         
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../listVenus.do', 
            params: { 
               task: "DELETEMENUITEM", 
               ids:  selectedCourse
              }, method:'POST',
            success: function(response){
              var result=1;
              switch(result){
              case 1:  // Success : simply reload
                MIds.reload();
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
             
////////////////////////////////////////////////////////////////////////////////////////////

 var h=new Ext.TabPanel({
                    region:'center',
                   height:300,
                   buttonAlign:'center',
                    width:1250,
        			//renderTo: 'binding-example',
                    deferredRender:false,
                    activeTab:0,
                    items:[{
                title:'Contacts',
                layout:'form',
                defaults: {width: 1220},
                defaultType: 'textfield',
				//autoScroll:true,
                items: [myGrid
                    
                    ]
            },{
                title:'Rooms',
                layout:'form',
                defaults: {width: 1220},
                defaultType: 'textfield',
                //autoScroll:true,
                items: [myRoomGrid
                    
                    ]
            }]});

 var tab2 = new Ext.FormPanel({
        labelAlign: 'left',
        title: 'Edit Venue',
        bodyStyle:'padding:5px',
        width: 600,
        labelWidth: 120,
        frame:true,
        items:new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                width:1200,
                border:false,
                defaultType: 'textfield',
                items: [{
        //	title:'Personal Information',
            layout:'column',
             xtype: 'container',
            autoEl:{},
            border:false,
            items:[{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [ VNameField,
  						 VAddField
  						]
            },{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [ VMainContactField,
  						VDistrictField
                		]
            }]
        },h
        
        
//        {
//            xtype:'tabpanel',
//            plain:true,
//            activeTab: 0,
//           height:350,
//            
//            defaults:{bodyStyle:'padding:10px'},
//            items:[{
//                title:'Contacts',
//                layout:'form',
//                defaults: {width: 1220},
//                defaultType: 'textfield',
//				//autoScroll:true,
//                items: [myGrid
//                    
//                    ]
//            },{
//                title:'Rooms',
//                layout:'form',
//                defaults: {width: 1220},
//                defaultType: 'textfield',
//                //autoScroll:true,
//                items: [myRoomGrid
//                    
//                    ]
//            }]
//        }
        
        ]
        })


            });



//    tab2.render(document.body);
    var tap= new Ext.TabPanel({
                    region:'center',
                    deferredRender:false,
                    activeTab:0,
                    buttonAlign:'center',
                      height:495, 
                           /* width:980,*/
        			renderTo: 'binding-example',
                    
                    items:[tab2,{
                title:'Menus',
                layout:'form',
                defaults: {width: 1200},
                defaultType: 'textfield',
				autoScroll:true,
                items: [new Ext.form.FieldSet({
                    autoHeight: true,
                width:1200,
                border:false,
                    items:[{
        	header:false,
            layout:'column',
            border:false,
            items:[{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [ Grid
  						]
            },{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [ MIgrid
                		]
            }]
        }]}),
                    
                    ]
            }],buttons: [{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){
                if(VNameField.isValid() && VAddField.isValid() && VMainContactField.isValid() && VDistrictField.isValid())
                {
                    tab2.getForm().submit( 
                    	      Ext.Ajax.request({   
        						waitMsg: 'Please wait...',
        						url: '../listVenus.do',
        						
								params: {
								  task: "EditVenue",
								  
								  venueName:       			VNameField.getValue() ,
								  venueAddress:       		VAddField.getValue(),
								  venueMainContact:	       	VMainContactField.getValue(),
								  venueDistrict:       		VDistrictField.getValue()
								},
						        method:'POST', 
						        success: function(response){ ////console.log("success");
						        		 var redirect = 'venus.jsp'; 
		                        window.location = redirect;
      
						        },
						        failure: function(response){////console.log("faaaaaaaaaail");
						        	tab2.getForm().reset(); 
						       }                      
						      })); 
                }
                else
                {
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
            },{text:'Cancel',
            	handler:function(){window.location='venus.jsp';}
            	}
           ]});
    

function stcCallBack1001(record, opts, success) {
//if (success) 
//// do whatever
//alert("the sucess ");
//alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
////console.log("  LOOOOOOOOOOOOOOD "+"record "+ds.getCount());

};
loadtest=   ds.load({callback :  stcCallBack1001});
 Mds.load();
 //  MIds.load();
});

 