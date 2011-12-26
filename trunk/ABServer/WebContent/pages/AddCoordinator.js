
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
    
    var TrainingcoordinateHistory  = Ext.data.Record.create([
      {name: 'idTrainingCoordinateHistory', type: 'int'},
      {name: 'trainingCoordinateHistoryType', type: 'string'},
      {name: 'trainingCoordinateHistoryValid', type: 'boolean'},
      {name: 'trainingCoordinateHistoryValidFrom', type: 'string'},
      {name: 'trainingCoordinateHistoryValidTo', type: 'string'},
      {name: 'trainingCoordinateHistoryValue', type: 'string'}
      
     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listCoordinators.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var ds = new Ext.data.GroupingStore({
       // load using HTTP
      proxy: dataProxy,
      groupField:'trainingCoordinateHistoryType',
      sortInfo:{field: 'trainingCoordinateHistoryType', direction: "ASC"},
     //  baseParams:{task: "Cdata"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		
   		record: "Trainingcoordinatehistory",           // The repeated element which contains row information
   		id: "idTrainingCoordinateHistory"
        },TrainingcoordinateHistory
        )
      });
  var Trainingcoordinators  = Ext.data.Record.create([
      {name: 'idTrainingCoordinators', type: 'int'},
      {name: 'trainingCoordinateAbb', type: 'string'},
      {name: 'trainingCoordinateAddress', type: 'string'},
      {name: 'trainingCoordinateBirthDate', type: 'string'},
      {name: 'trainingCoordinateDescription', type: 'string'},
      {name: 'trainingCoordinateEmail', type: 'string'},
      {name: 'trainingCoordinateFirstName', type: 'string'},
      {name: 'trainingCoordinateHireDate', type: 'string'},
      {name: 'trainingCoordinateLastName', type: 'string'},
      {name: 'trainingCoordinateMobile', type: 'string'},
      {name: 'trainingCoordinateColor', type: 'string'},
      {name: 'trainingCoordinateTelephone', type: 'string'},
      {name: 'trainingCoordinatorCurrentSalary', type: 'string'},
      {name: 'trainingCoordinatorCurrentTitle', type: 'string'},
      {name: 'trainingCoordinatorResignationDate', type: 'string'}  
      
     ]);
  dataProxy = new Ext.data.HttpProxy({
     	url: '../listCoordinators.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });
    
    var col = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "colors"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Trainingcoordinators"},           // The repeated element which contains row information
   		[{name: 'trainingCoordinateColor', type: 'string'}]
        
        )
      });
    col.load();
    col.on('load', function(){
  //	alert('????????');
  	jQuery(function($)
	        {
	            $("#picker1").attachColorPicker();
	            $("#picker1").change(function() {$("#picker1").getValue();
//	            for(var i=0;i<col.getCount();i++)
//	            {
//	            	var colorRec = col.getAt(i);
//	            	if(ColorField.getValue()==colorRec.get('trainingCoordinateColor'))
//	            	{
//	            		Ext.MessageBox.alert('Warning', 'The color is selected before, please select another color');
//	            		ColorField.reset();
//	            	}
//	            }
	            });
	            
	        });

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
        {header: "Type", width: 100, sortable: true, dataIndex: 'trainingCoordinateHistoryType'},
        {header: "Valid From", width: 100, sortable: true, dataIndex: 'trainingCoordinateHistoryValidFrom'},
		{header: "Valid To", width: 100, sortable: true, dataIndex: 'trainingCoordinateHistoryValidTo'},
    	{header: "Value", width: 100, sortable: true, dataIndex: 'trainingCoordinateHistoryValue'}
		
    ]);

// ds.on('add', function(){
//	ds.reload();
////myGrid.getView().refresh();
//  });
 
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
      //   sm: sm,
        stripeRows: true,
        autoScroll:true,
        height:300,
       // width:800,
        view: new Ext.grid.GroupingView({
            forceFit:true,
            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
        }),
        title:'Training Coordinator History',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Coordinator History',
             iconCls:'add',
            handler: displayFormWindow
             }),//new Ext.Toolbar.Button({
             // text: 'Delete Selection',
           //  handler: confirmDeleteCourses
           //   })
              ],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });

   myGrid.on("rowdblclick", function(myGrid) {
	/* var sel = myGrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;
        Ext.MessageBox.show({
			title: 'Course Details',
			msg: 'Course Name: '+seldata.courseName+' '+'Training Area: '+seldata.trainingArea+' Trainer Name: '+seldata.trainerName,
			width:185,
			buttons: Ext.MessageBox.OK
});*/
});


    /*
     * ================  Form 5  =======================
     */
    bd.createChild({tag: 'h2', html: ''});
    
 var d='3000-01-01';
 var vF='3000-01-01';
 var vT='3000-01-01';
  var PriceValueField = new Ext.form.TextField({
		    id: 'trainingCoordinateHistoryValue',
		    fieldLabel: 'Value <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:220,
		    allowBlank: false,
		    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
		      
	 var ValidFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
            //    disabledDays: [5, 6],
            allowBlank: false,
                id: 'trainingCoordinateHistoryValidFrom',
        		vtype: 'daterange',
        		endDateField: 'trainingCoordinateHistoryValidTo'
            });
    
    var ValidToField = new Ext.form.DateField({
			fieldLabel: 'Valid To',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                id:'trainingCoordinateHistoryValidTo',
                vtype: 'daterange',
             //   disabledDays: [5, 6],
                startDateField:'trainingCoordinateHistoryValidFrom'
            });
 
 
 var Itemsds=[['1','Salary'],['2','Mobile allowance'],['2','Title']];
    var ItemsDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: Itemsds
    }); 
  var typeCombo = new Ext.form.ComboBox({
   // id:'userPrivilage',
    fieldLabel: 'Type <html><font color=red> *</font></html>',
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
   
  
 
    //////////////************adding form****************/////////////////
    var valid='Salary';
 //   var flag=true;
 var dates=[];
    var fs = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 90,
        width:340,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [typeCombo,
                	 ValidFromField,
					   PriceValueField
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){ 
                 			if(ValidFromField.getValue()!='')
                 				vF=ValidFromField.getValue().format('d-M-Y');
                 			else
                 				vF='';
                 				
                 			if(ValidToField.getValue()!='')
                 				vT=ValidToField.getValue().format('d-M-Y');
                 			else
                 				vT='';
						    var record = new Ext.data.Record({
						    	  trainingCoordinateHistoryValue:		PriceValueField.getValue() ,
								  trainingCoordinateHistoryValidFrom:   vF,
								  trainingCoordinateHistoryValidTo:	    vT,
								  trainingCoordinateHistoryType:        typeCombo.getValue(),
								  trainingCoordinateHistoryValid:       true
						    });  
						    ds.add(record);
						    dates.push(ValidFromField.getValue().format('Y-m-d'))  
						    AddTAWindow.hide();  
                } 
            },{text:'Cancel',
            	handler:function(){AddTAWindow.hide();}
            	}
           ] 
  
    });
  AddTAWindow= new Ext.Window({
      id: 'AddTAWindow',
      title: 'Adding a new Coordinator History',
      closable:false,
      width: 400,
      height: 200,
      plain:true,
      layout: 'fit',
      items: fs
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetCourseForm(){
    PriceValueField.reset();
    ValidFromField.reset();
  //  ValidToField.reset();
   typeCombo.reset();
  }
  
  // check if the form is valid
  function isCourseFormValid(){
  return(PriceValueField.isValid() && ValidFromField.isValid() && typeCombo.isValid());
  }
  
  // display or bring forth the form
  function displayFormWindow(){
  if(!AddTAWindow.isVisible()){
    resetCourseForm();
    AddTAWindow.show();
  } else {
    AddTAWindow.toFront();
  }
  
  
  }
    
 	/*
     * ================  Form Fields  =======================
     */
 	var FNameField = new Ext.form.TextField({
      		fieldLabel: 'First Name <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width: 300,
    		id:'trainingCoordinateFirstName',
    	//	anchor:'95%',
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});
     		
     var LNameField = new Ext.form.TextField({
      		fieldLabel: 'Last Name <html><font color=red> *</font></html>',
      		allowBlank: false,
    		id:'trainingCoordinateLastName',
    		width: 300,
    	//	anchor:'95%',
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
     		
     var MobileField = new Ext.form.TextField({
      		fieldLabel: 'Mobile',
      	//	allowBlank: false,
      		width: 300,
    		id:'trainingCoordinateMobile',
    		maskRe: /([0-9\s]+)$/
     		});	
      var TelephoneField = new Ext.form.TextField({
      		fieldLabel: 'Phone',
      	//	allowBlank: false,
    		id:'trainingCoordinateTelephone',
    		width: 300,
    		maskRe: /([0-9\s]+)$/
     		});				
      var AbbField = new Ext.form.TextField({
		    id: 'trainingCoordinateAbb',
		    fieldLabel: 'Abbreviation <html><font color=red> *</font></html>',
	//	    maxLength: 20,
		//    allowNegative: false,
		    allowBlank: false,
		    width: 300,
		//    anchor:'95%',
		    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
	 var AddressField = new Ext.form.TextField({
		    id: 'trainingCoordinateAddress',
		    fieldLabel: 'Address',
		    width: 300,
		  //  allowBlank: false,
		    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
	var SalaryField = new Ext.form.NumberField({
		    id: 'trainingCoordinateCurrentSalary',
		    fieldLabel: 'Current Salary',
		//    maxLength: 20,
		    width: 300,
		//    allowNegative: false,
	//	anchor:'95%',
		 //   allowBlank: false,
		//    maskRe: /([.-0-9\s]+)$/
		      });
		      
	var TitleField = new Ext.form.TextField({
		    id: 'trainingCoordinateCurrentTitle',
		    fieldLabel: 'Current Title',
		//    maxLength: 20,
		    width: 300,
		//    allowNegative: false,
	//	anchor:'95%',
		  //  allowBlank: false,
		    maskRe: /([a-zA-Z0-9\s]+)$/
		      });	      	      
		      	
      var EmailField = new Ext.form.TextField({
		    id: 'trainingCoordinateEmail',
		    fieldLabel: 'Email',
		//    maxLength: 20,
		//    allowNegative: false,
		//    allowBlank: false,
		//    anchor:'70%',
		    width: 300,
		    vtype:'email'
		//    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
	 var ColorField =new Ext.form.TextField({
	fieldLabel: 'Color',
	id: 'picker1',
	width:300,
//	disable:true
//	allowBlank: false
});   
	 var HireDateField = new Ext.form.DateField({
			fieldLabel: 'Hire Date <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1990-01-01',
             //   disabledDays: [5, 6],
                width: 300,
                id: 'trainingCoordinateHireDate',
        	//	vtype: 'daterange',
        		allowBlank: false
        	//	anchor:'60%'
        	//	requestDateField: 'requestdt'
            });
    
    var BirthDateField = new Ext.form.DateField({
			fieldLabel: 'Birth Date',
                format: 'd-M-Y',
                id:'trainingCoordinateBirthDate',
            //    anchor:'95%',
            	width: 300,
                minValue: '1950-01-01',
            //    allowBlank: false
              //  disabledDays: [5, 6]
               
            });
     var DescField = new Ext.form.HtmlEditor({
     			id:'trainingCoordinateDescription',
                    fieldLabel:'Description'
     });
/**==========================================================================*/
 
 function isAddCoFormValid(){
  return(FNameField.isValid() && LNameField.isValid() && AbbField.isValid() && AddressField.isValid() && EmailField.isValid() && BirthDateField.isValid() 
  && HireDateField.isValid() && ColorField.isValid() && TelephoneField.isValid() && MobileField.isValid() && EmailField.isValid());
  }
 
     var h=new Ext.TabPanel({
                    region:'center',
                   height:280,
                   buttonAlign:'center',
                    width:1250,
        			//renderTo: 'binding-example',
                    deferredRender:false,
                    activeTab:0,
                    items:[myGrid,{
                cls:'x-plain',
                title:'Comments',
                layout:'fit',
                items: [
                    DescField
               ]
            }]});
 
 
 
 var tab2 = new Ext.FormPanel({
        labelAlign: 'left',
        title: 'Add Coordinator',
        bodyStyle:'padding:5px',
      //  width: 600,
        frame:true,
       // autoScroll:true,
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
                items: [FNameField,
                		LNameField,
                		AbbField,
                		AddressField,
                		EmailField
                		
                		]
            },{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [
                		TelephoneField,
                		MobileField,
                BirthDateField,
                HireDateField,
                ColorField
                		]
            }]
        },h
        
        
//        {
//            xtype:'tabpanel',
//            plain:true,
//            activeTab: 0,
//            height:280,
//            defaults:{bodyStyle:'padding:10px'},
//            items:[myGrid,{
//                cls:'x-plain',
//                title:'Comments',
//                layout:'fit',
//                items: [
//                    DescField
//               ]
//            }]
//        }
        
        ]
        }),
        


            });

   // tab2.render(document.body);
    
//    var viewport = new Ext.Viewport({
  //          layout:'border',
   //         items:[
    var pan=new Ext.TabPanel({
                    region:'center',
                   height:495,
                   buttonAlign:'center',
                    width:1250,
        			renderTo: 'binding-example',
                    deferredRender:false,
                    activeTab:0,
                    items:[tab2],buttons: [{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){
                var Type=[];
              //  var validFrom=[];
               // var validTo=[];
                var Value=[];
                var d2='3000-01-01';
                	for(i=0;i<ds.getCount();i++)
                	{
                		var HistoryRec = ds.getAt(i);
                		Value.push(HistoryRec.get('trainingCoordinateHistoryValue'));
                		Type.push(HistoryRec.get('trainingCoordinateHistoryType'));
                		//validFrom.push(HistoryRec.get('trainingCoordinateHistoryValidFrom'));
                		}
                if(HireDateField.getValue()!='')
                {
                	d=HireDateField.getValue().format('Y-m-d');
                }
                if(BirthDateField.getValue()!='')
                {
                	d2=BirthDateField.getValue().format('Y-m-d');
                }
                //	alert(Type.length);
                	if(FNameField.isValid() && LNameField.isValid() && AbbField.isValid() && AddressField.isValid() && EmailField.isValid() && BirthDateField.isValid() 
  && HireDateField.isValid() && ColorField.isValid() && TelephoneField.isValid() && MobileField.isValid() && EmailField.isValid() && BirthDateField.isValid())
                	{//alert('hiiiiiiiii');
                	//alert(length);
                    tab2.getForm().submit( 
                    	      Ext.Ajax.request({   
        						waitMsg: 'Please wait...',
        						url: '../listCoordinators.do',
        						
								params: {
								  task: "AddCoordinator",
								  values:Value,
								  length:Type.length,
								  types:Type,
								  validFroms:dates,
								  trainingCoordinateFirstName:       FNameField.getValue() ,
								  trainingCoordinateLastName:        LNameField.getValue(),
								  trainingCoordinateMobile:	       	 MobileField.getValue(),
								  trainingCoordinateTelephone:       TelephoneField.getValue(),
								  trainingCoordinateAbb:    	     AbbField.getValue(),
								  trainingCoordinateAddress:	     AddressField.getValue(),
								  trainingCoordinateEmail:	         EmailField.getValue(),
								  trainingCoordinateColor:  		 ColorField.getValue(),
								  trainingCoordinateHireDate:		 d,
								  trainingCoordinateBirthDate:		 d2,
								  trainingCoordinateDescription:	 DescField.getValue(),
								 },
						        method:'POST', 
						        success: function(response){
						        	// ////console.log("success");
						        		 var redirect = 'coordinators.jsp'; 
		                        window.location = redirect;
      
						        },
						        failure: function(response){
						        	//////console.log("faaaaaaaaaail");
						        	tab2.getForm().reset(); 
						       }                      
						      })); 
                	}else {
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
            	handler:function(){window.location='coordinators.jsp';}
            	}
           ]});
      


 ////////////////////delete selection record(s)//////////////////////////////
/*  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idTrainingCoordinateHistory);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Do you want to delete this history?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those histories?', deleteCourses);
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
            url: '../listCoordinators.do?', 
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
*/
function stcCallBack1001(record, opts, success) {
//if (success) 
//// do whatever
//alert("the sucess ");
//alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
//////console.log("  LOOOOOOOOOOOOOOD ");

};
//loadtest=   ds.load({callback :  stcCallBack1001});
});