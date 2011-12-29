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
Ext.override(Ext.layout.FormLayout, {
    getAnchorViewSize : function(ct, target)
    {
        return (ct.body || ct.el).getStyleSize();
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
     	url: '../listClients.do',
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
        {header: "Contact First Name", width: 150, sortable: true, dataIndex: 'personFirstName'},
        {header: "Contact Last Name", width: 150, sortable: true, dataIndex: 'personLastName'},
        {header: "Contact Title", width: 130, sortable: true, dataIndex: 'personTitle'},
        {header: "Contact Department", width: 130, sortable: true, dataIndex: 'personAddress'},
        {header: "Contact Phone", width: 130, sortable: true, dataIndex: 'personTelePhone'},
        {header: "Contact Mobile", width: 130, sortable: true, dataIndex: 'personMobile'},
		{header: "Contact Email", width: 130, sortable: true, dataIndex: 'personEmail'}


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
        height:350,
     //   width:600,
       autoScroll:true,
        title:'Contacts',
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

var Clients  = Ext.data.Record.create([
      {name: 'clientName', type: 'string'},
      {name: 'clientAddress', type: 'string'},
      {name: 'clientColor', type: 'string'},
      {name: 'clientWorkDate', type: 'string'},
      {name: 'clientInfo', type: 'string'},
      {name: 'clientApproachDate', type: 'string'},
      {name: 'clientApproachPerson', type: 'string'},
      {name: 'clientApp', type: 'string'},
      {name: 'idClients', type: 'int'},
      {name: 'personFName', type: 'string'},
      {name: 'personLName', type: 'string'},
      {name: 'personMobile', type: 'string'},
      {name: 'personTitle', type: 'string'},
      {name: 'personTelePhone', type: 'string'}

     ]);

    dataProxy = new Ext.data.HttpProxy({
     	url: '../listClients.do',
     	method: 'POST',
        headers:{'request-type':'ajax' }
      });

    var Cds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "listC"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Clients",           // The repeated element which contains row information
   		id: "idClients"
        },Clients
        )
      });
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
			fieldLabel: 'First Name <html><font color=red> *</font></html> ',
      		allowBlank: false,
      		width:220,
    		id:'personFirstName',
    		maskRe: /([a-zA-Z0-9\s]+)$/
            });
   CLNameField = new Ext.form.TextField({
			fieldLabel: 'Last Name <html><font color=red> *</font></html> ',
      		allowBlank: false,
      		width:220,
    		id:'personLastName',
    		maskRe: /([a-zA-Z0-9\s]+)$/
            });
   CMailField = new Ext.form.TextField({
			fieldLabel: 'E-Mail',
      		//allowBlank: false,
      		width:220,
      		vtype:'email',
    		id:'personEmail'
            });
  CMobileField = new Ext.form.TextField({
			fieldLabel: 'Mobile',
      		//allowBlank: false,
      		width:220,
      		maskRe: /([0-9\s]+)$/,
    		id:'personMobile'
            });
  CTitleField = new Ext.form.TextField({
			fieldLabel: 'Title <html><font color=red> *</font></html> ',
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
			fieldLabel: 'Department <html><font color=red> *</font></html> ',
      		//allowBlank: false,
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
			fieldLabel: 'First Name <html><font color=red> *</font></html> ',
      		allowBlank: false,
      		width:220,
      		maskRe: /([a-zA-Z0-9\s]+)$/
    //		id:'personFirstName',
            });
   LNameField = new Ext.form.TextField({
			fieldLabel: 'Last Name <html><font color=red> *</font></html> ',
      		allowBlank: false,
      		width:220,
      		maskRe: /([a-zA-Z0-9\s]+)$/
    //		id:'personLastName',
            });
   MailField = new Ext.form.TextField({
			fieldLabel: 'E-Mail',
      	//	allowBlank: false,
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
			fieldLabel: 'Title <html><font color=red> *</font></html> ',
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
			fieldLabel: 'Department <html><font color=red> *</font></html> ',
      		allowBlank: false,
      		width:220

    //		id:'personAddress',
            });

 ///////////////////////////////////////edit form//////////////////////////////////////////

   var valid=1;
   var valid1=1;
   //var flag=true;
   var edit = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
      //  labelWidth: 250,
        width:700,
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
                items: [CTelephoneField,
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
      width: 750,
      height: 270,
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
   if(isCourseFormValid()){
      Ext.Ajax.request({
        waitMsg: 'Please wait...',
        url: '../listClients.do',
        params: {
          task: "EditContact",
          id:selections[0].id,
          personTelePhone:		CTelephoneField.getValue(),
		  personAddress:   		CAddField.getValue(),
		  personTitle:	    	CTitleField.getValue(),
		  personFirstName:      CFNameField.getValue(),
		  personLastName:       CLNameField.getValue(),
		  personEmail:			CMailField.getValue(),
		  mainContact1:			valid1,
		  personMobile:			CMobileField.getValue()
        },
        method:'POST',
        success: function(response){

							ds.reload();
						    EditContactWindow.hide();

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

  //  var flag=true;
  var fs = new Ext.FormPanel({
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
                items: [FNameField,
                		LNameField,
                		TitleField,
                		AddField
                		]
            },{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [TelephoneField,
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
  return(AddField.isValid() && MailField.isValid() && TitleField.isValid()&& LNameField.isValid() && FNameField.isValid() && TelephoneField.isValid() && MobileField.isValid());
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

   if(isAddFormValid()){
      Ext.Ajax.request({
        waitMsg: 'Please wait...',
        url: '../listClients.do',
        params: {
          task: "AddContact",
          personTelePhone:		TelephoneField.getValue(),
		  personAddress:   		AddField.getValue(),
		  personTitle:	    	TitleField.getValue(),
		  personFirstName:      FNameField.getValue(),
		  personLastName:       LNameField.getValue(),
		  personEmail:			MailField.getValue(),
		  mainContact:			valid,
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
						   ds.reload();
						    AddTAWindow.hide();
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

   var ClientNameField;
  var ClientAddField;
  var ClientAppField;
 var ClientAppDateField;
  var AppPersonField;
  var WorkDateField;
  var ClientColorField;

  var AppD='3000-01-01';
  var WorkD='3000-01-01';

    ClientNameField = new Ext.form.TextField({
    id: 'clientName',
    fieldLabel: 'Client Company Name <html><font color=red> *</font></html> ',
 //   maxLength: 20,
    allowBlank: false,
    width:220,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });

  ClientAddField = new Ext.form.TextField({
    id: 'clientAddress',
    fieldLabel: 'Address',
 //   maxLength: 20,
    width:220,
  //  allowBlank: false,
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
   ClientAppField = new Ext.form.TextField({
    id: 'clientApp',
    fieldLabel: 'abbreviation <html><font color=red> *</font></html> ',
 //   maxLength: 20,
    width:220,
    allowBlank: false,
    maskRe: /([a-zA-Z0-9\s]+)$/
      });

 ClientAppDateField = new Ext.form.DateField({
			fieldLabel: 'Approach Date',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
               // disabledDays: [5, 6],
                id: 'clientApproachDate',
             //   allowBlank: false,
        		vtype: 'daterange',
        		   //        anchor : '35%',
        	//	endDateField:'clientWorkDate'
            });

   WorkDateField = new Ext.form.DateField({
			fieldLabel: 'Start Business Date',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                 //anchor : '35%',
              //  allowBlank: false,
                id: 'clientWorkDate',
                vtype: 'daterange',
            //    startDateField:'clientApproachDate',
             //   disabledDays: [5, 6]
            });

  ClientColorField =  new Ext.ux.form.ColorPickerField ({
 	fieldLabel: 'Color Legend',
	id: 'color',
	allowBlank: false,
	name: 'color',
   value: '123456',
   //width:320,
//	disable:true
//	allowBlank: false
 });
//  new Ext.form.TextField({
//	fieldLabel: 'Color Legend',
//	id: 'picker1',
//	width: 220
////	allowBlank: false
//});

 AppPersonField = new Ext.form.TextField({
    id: 'clientApproachPerson',
    fieldLabel: 'Approached by',
 //   maxLength: 20,
 //   allowBlank: false,
    width:220,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
 var c;
  Cds.load();
  Cds.on('load', function(){//////console.log(Cds.getAt(0));
//alert(Cds.getAt(0));
var clientRec = Cds.getAt(0);//alert(clientRec.get('clientName'));
ClientNameField.setValue(clientRec.get('clientName'));
ClientAddField.setValue(clientRec.get('clientAddress'));
ClientAppField.setValue(clientRec.get('clientApp'));
ClientAppDateField.setValue(clientRec.get('clientApproachDate'));
WorkDateField.setValue(clientRec.get('clientWorkDate'));
ClientColorField.setValue(clientRec.get('clientColor'));
c=clientRec.get('clientColor');
AppPersonField.setValue(clientRec.get('clientApproachPerson'));
// jQuery(function($)
//	        {
//	            $("#picker1").attachColorPicker(c);
//	            $("#picker1").change(function() {$("#picker1").getValue();
//	         /*   for(var i=0;i<col.getCount();i++)
//	            {
//	            	var colorRec = col.getAt(i);
//	            	if(CourseColorField.getValue()==colorRec.get('courseColor'))
//	            	{
//	            		Ext.MessageBox.alert('Warning', 'The color is selected before, please select another color');
//	            		CourseColorField.reset();
//	            	}
//	            }*/
//	            });
//	        });

});
 /**==========================================================================*/
////////////////////////////////////Contracts/////////////////////////////////////////////
 var Contracts  = Ext.data.Record.create([
	  {name: 'contractId', type: 'int'},
      {name: 'clientName', type: 'string'},
      {name: 'contractDateOfRequest', type: 'string'},
      {name: 'contractFirstStartDate', type: 'string'},
      {name: 'contractFirstEndDate', type: 'string'},
      {name: 'contractFundType', type: 'string'},
      {name: 'contractProactiveType', type: 'string'},
      {name: 'proposalID', type: 'string'},
      {name: 'contractFee', type:'string'},
      {name: 'contractDateOfRequest', type: 'string'},
      {name: 'contractDealPerson', type: 'string'}
     ]);

    dataProxy = new Ext.data.HttpProxy({
     	url: '../listClients.do',
     	method: 'POST',
        headers:{'request-type':'ajax' }
      });

    var Conds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "listCon"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)

   		record: "Contracts",           // The repeated element which contains row information
   		id: "idContracts"
        },Contracts
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
      	{header: "Proposal ID", width: 100, sortable: true, locked:false, dataIndex: 'proposalID'},
        {header: "Deal Person", width: 100, sortable: true, dataIndex: 'contractDealPerson'},
        {header: "Fund Type", width: 100, sortable: true, dataIndex: 'contractFundType'},
        {header: "Proactive Type", width: 100, sortable: true, dataIndex: 'contractProactiveType'},
        {header: "Request Date", width: 100, sortable: true, dataIndex: 'contractDateOfRequest'},
        {header: "Tentative Start Date", width: 150, sortable: true, dataIndex: 'contractFirstStartDate'},
        {header: "Tentative End Date", width: 150, sortable: true, dataIndex: 'contractFirstEndDate'},
       	{header: "Contract Value", width: 100, sortable: true, locked:false, dataIndex: 'contractFee'},

    ]);

 //ds.on('add', function(){
//	ds.reload();
//myGrid.getView().refresh();
 //  });

    var myContractGrid = new Ext.grid.GridPanel({
        ds: Conds,
        cm: colModel,
      //   sm: sm,
        stripeRows: true,
        autoScroll:true,
        height:350,
    //    width:600,
       autoScroll:true,
        title:'Contracts',
        tbar: [//new Ext.Toolbar.Button({
             //text: 'Add Contract',
          //  handler: displayFormWindow
         //    }),//new Ext.Toolbar.Button({
             // text: 'Delete Selection',
           //  handler: confirmDeleteCourses
           //   })
              ],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})

    });
   Conds.load();
////////////////////////////////////////////////////////////////////////////////////////


 var h=new Ext.TabPanel({
                    region:'center',
                   height:300,
                   buttonAlign:'center',
                    width:1250,
        			//renderTo: 'binding-example',
                    deferredRender:false,
                    activeTab:0,
                    items:[myGrid,myContractGrid]});

 var simple = new Ext.FormPanel({
        labelAlign: 'left',
        title: 'Edit Client',
        bodyStyle:'padding:10px',
       // width: 980,
        labelWidth:140,
        frame:true,
        items: [new Ext.form.FieldSet({
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
        	//title:'Client Details',
            layout:'column',
            border:false,
            items:[{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [ClientNameField,
  						ClientAddField,
  						ClientAppField,
  						AppPersonField
                		]
            },{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [ClientAppDateField,
  						WorkDateField,
  						ClientColorField
                		]
            }]
        }]},h

//        {
//            xtype:'tabpanel',
//            plain:true,
//            activeTab: 0,
//            height:300,
//
//            defaults:{bodyStyle:'padding:10px'},
//            items:[myGrid,myContractGrid]
//            }

            ]})
			]

    });

////////////////////////////////////////////////////////////////////////////////////////////
// simple.render(document.body);

   var pan= new Ext.TabPanel({
                    region:'center',
                     height:495,
                     buttonAlign:'center',
                     width:1250,
        			renderTo: 'binding-example',
                    deferredRender:false,
                    activeTab:0,
                    items:[simple],
                     buttons:[{
                text:'Save',
                formBind: true,
                // Function that fires when user clicks the button
                handler:function(){
                	if(WorkDateField.getValue()!='')
                	{
                		WorkD=WorkDateField.getValue().format('Y-m-d');
                	}
                	if(ClientAppDateField.getValue()!='')
                	{
                		AppD=ClientAppDateField.getValue().format('Y-m-d');
                	}
                	if(ClientNameField.isValid() && ClientAddField.isValid() && ClientAppField.isValid()&& ClientColorField.isValid())
                	{
                  simple.getForm().submit(
                    	      Ext.Ajax.request({
        						waitMsg: 'Please wait...',
        						url: '../listClients.do',
								params: {
								  task: "EditClient",
								  clientName:         	ClientNameField.getValue(),
						          clientAddress:      	ClientAddField.getValue(),
						          clientApp:		  	ClientAppField.getValue(),
						          clientColor:		  	ClientColorField.getValue(),
						          clientWorkDate:	  	WorkD,
						          clientApproachDate: 	AppD,
						          clientApproachPerson:	AppPersonField.getValue(),

								},
						        method:'POST',
						        success: function(response){ //////console.log("success");//alert(valid);
						        		 var redirect = 'clients.jsp';
		                        window.location = redirect;

						        },
						        failure: function(response){//////console.log("faaaaaaaaaail");//alert(ValidFromField.getValue().format('Y-m-d'));
						        	simple.getForm().reset();
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
            	handler:function(){window.location='clients.jsp';}
            	}
           ] });
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
          //	alert(selections[i].id);
          }

         }
          if(selectedCourse.length!=0)
          {
	         Ext.Ajax.request({
	            waitMsg: 'Please Wait',
	            url: '../listClients.do',
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

 function stcCallBack1001(record, opts, success) {
//if (success)
//// do whatever
//alert("the sucess ");
//alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
//////console.log("  LOOOOOOOOOOOOOOD "+"record "+ds.getCount());

};
loadtest=   ds.load({callback :  stcCallBack1001});
});