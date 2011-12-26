
Ext.onReady(function() {

    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

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

    var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "list"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Venues",           // The repeated element which contains row information
   		id: "idVenues"
        },Venues
        ),
        sortInfo:{field: "venueName", direction: "ASC"}
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
      var colModel = new Ext.grid.ColumnModel([
        {header: "Venue Name", width: 130, sortable: true, locked:false, dataIndex: 'venueName'}, 
        {header: "Venue Address", width: 130, sortable: true, dataIndex: 'venueAddress'},
		{header: "Venue District", width: 130, sortable: true, dataIndex: 'venueDistrict'},
		{header: "Venue Telephone", width: 130, sortable: true, dataIndex: 'venuMainContact'},
        {header: "Contact First Name", width: 140, sortable: true, dataIndex: 'personFName'},
        {header: "Contact Last Name", width: 140, sortable: true, dataIndex: 'personLName'},
        {header: "Contact Email", width: 130, sortable: true, dataIndex: 'personEmail'}
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
        title:'Venues',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Venue',
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
/*	 var sel = myGrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;
        Ext.MessageBox.show({
			title: 'Course Details',
			msg: 'Course Name: '+seldata.courseNameEng+' '+'Training Area: '+seldata.trainingArea+' Trainer Name: '+seldata.trainerName,
			width:185,
			buttons: Ext.MessageBox.OK
});*/

		 var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }

window.location = 'editVenue.jsp?v='+selections[0].id;
});

  
  ds.on('add', function(){
	ds.reload();
//myGrid.getView().refresh();
   });

////////////////////adding new record//////////////////////////////
  var AddSupplierForm;
  var AddSupplierWindow;
  
  var VNameField;
  var VAddField;
  var VMainContactField;
  var VDistrictField;
  
  var CFNameField;
  var CLNameField;
  var CMailField;
  var CTitleField;
  var CTelephoneField;
  var CMobileField;
  var CAddressField;
  
   	VNameField = new Ext.form.TextField({
		    id: 'venueName',
		    fieldLabel: 'Venue Name <html><font color=red> *</font></html>',
		 //   maxLength: 20,
		    width:220,
		    allowBlank: false,
		    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
		      
	 VAddField = new Ext.form.TextField({
			id: 'venueAddres',
		    fieldLabel: 'Venue Address',
		 //   maxLength: 20,
		    width:220,
		 //   allowBlank: false,
		//    maskRe: /([a-zA-Z0-9\s]+)$/
            });
    
   	VMainContactField = new Ext.form.TextField({
			fieldLabel: 'Venue Phone',
      	//	allowBlank: false,
      		width:220,
    		id:'venueMainContact',
    		 maskRe: /([0-9\s]+)$/
            });
   	VDistrictField = new Ext.form.TextField({
			fieldLabel: 'Venue District',
      	//	allowBlank: false,
      		width:220,
    		id:'venueDistrict',
            });
 
   CFNameField = new Ext.form.TextField({
			fieldLabel: 'First Name <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220,
    		id:'personFirstName',
            });
   CLNameField = new Ext.form.TextField({
			fieldLabel: 'Last Name <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220,
    		id:'personLastName',
            });
   CMailField = new Ext.form.TextField({
			fieldLabel: 'E-Mail',
      	//	allowBlank: false,
      		width:220,
      		vtype:'email',
    		id:'personEmail',
            });
  CMobileField = new Ext.form.TextField({
			fieldLabel: 'Mobile',
      	//	allowBlank: false,
      		width:220,
    		id:'personMobile',
    		 maskRe: /([0-9\s]+)$/
            });
  CTitleField = new Ext.form.TextField({
			fieldLabel: 'Title <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220,
    		id:'personTitle',
            });
   CTelephoneField = new Ext.form.TextField({
			fieldLabel: 'Phone',
      	//	allowBlank: false,
      		width:220,
    		id:'personTelePhone',
    		 maskRe: /([0-9\s]+)$/
            }); 
   CAddField = new Ext.form.TextField({
			fieldLabel: 'Department <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220,
      		
    		id:'personAddress',
            });        
    //////////////************adding form****************/////////////////
   // var valid='Salary';
    var flag=true;
    var fs = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 120,
        width:600,
        waitMsgTarget: true,
        items: [{
        	title:'Venue Details',
            layout:'column',
            border:false,
            items:[{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [VNameField,
                		VAddField
                		]
            },{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [VMainContactField,
                VDistrictField
                		]
            }]
        },{
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
                		CMailField
                		]
            }]
        }
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:AddSupplierForm
            },{text:'Cancel',
            	handler:function(){AddSupplierWindow.hide();}
            	}
           ] 
  
    });
  AddSupplierWindow= new Ext.Window({
      id: 'AddSupplierWindow',
      title: 'Add new Venue',
      closable:false,
      width: 770,
      height: 320,
      plain:true,
      layout: 'fit',
      items: fs
    });

 //////////////********display edit form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetCourseForm(){
    VNameField.reset();
    VAddField.reset();
    VMainContactField.reset();
    VDistrictField.reset();
    CFNameField.reset();
    CLNameField.reset();
    CAddField.reset();
    CMailField.reset();
    CTelephoneField.reset();
    CMobileField.reset();
    CTitleField.reset();           		
  }
  
  // check if the form is valid
  function isCourseFormValid(){
  return(VNameField.isValid() && VAddField.isValid() && VMainContactField.isValid() && VDistrictField.isValid() && CFNameField.isValid() && CLNameField.isValid() && CAddField.isValid() && CMailField.isValid()&& CTelephoneField.isValid() && CMobileField.isValid()&& CTitleField.isValid());
  }
  
  // display or bring forth the form
  function displayFormWindow(){
  if(!AddSupplierWindow.isVisible()){
    resetCourseForm();
    AddSupplierWindow.show();
  } else {
    AddSupplierWindow.toFront();
  }
  
  
  }
    
    
  /////////////////adding course function/////////////////////
  function AddSupplierForm(){
  
   if(VNameField.isValid() && VAddField.isValid() && VMainContactField.isValid() && VDistrictField.isValid() && CFNameField.isValid() && CLNameField.isValid() && CAddField.isValid() && CMailField.isValid()&& CTelephoneField.isValid() && CMobileField.isValid()&& CTitleField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listVenus.do',
        params: {
          task: "AddVenue",
          venueName:			VNameField.getValue() ,
		  venueAddress:   		VAddField.getValue(),
		  venueMainContact:	    VMainContactField.getValue(),
		  venueDistrict:        VDistrictField.getValue(),
		  personAddress:		CAddField.getValue(),
		  personEmail:			CMailField.getValue(),
		  personFirstName:		CFNameField.getValue(),
		  personLastName:		CLNameField.getValue(),
		  personTelePhone:		CTelephoneField.getValue(),
		  personTitle:			CTitleField.getValue(),
		  personMobile:			CMobileField.getValue()
        },
        method:'POST', 
        success: function(response){        

			 var record = new Ext.data.Record({
						    	  venueName:			VNameField.getValue(),
								  venueAddress:   		VAddField.getValue(),
								  venueMainContact:	    VMainContactField.getValue(),
								  venueDistrict:        VDistrictField.getValue(),
								  personEmail:			CMailField.getValue(),
								  personFirstName:		CFNameField.getValue(),
								  personLastName:		CLNameField.getValue(),
								  
						    });  
						    ds.add(record);  
						    AddSupplierWindow.hide();  
              
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
    selectedCourse.push(selections[i].xml.idVenues);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this venue?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Venues?', deleteCourses);
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
            url: '../listVenus.do', 
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