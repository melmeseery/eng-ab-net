
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
      {name: 'personMobile', type: 'string'},
      {name: 'personFirstName', type: 'string'},
      {name: 'personLastName', type: 'string'},
      {name: 'personTelePhone', type: 'string'},
      {name: 'personTitle', type: 'string'},
      {name: 'personEmail', type: 'string'}
      
     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listPersonals.do',
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
        {header: "Contact Title", width: 150, sortable: true, dataIndex: 'personTitle'},
		{header: "Contact Telephone", width: 150, sortable: true, dataIndex: 'personTelePhone'},
    	{header: "Contact Mobile", width: 150, sortable: true, dataIndex: 'personMobile'}
		
    ]);

 //ds.on('add', function(){
//	ds.reload();
//myGrid.getView().refresh();
 //  });
 
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
      //   sm: sm,
        stripeRows: true,
        height:500,
        width:500,
        title:'Venue Contacts List',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Contact',
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
    
 
  var PriceValueField = new Ext.form.TextField({
		    id: 'trainingCoordinateHistoryValue',
		    fieldLabel: 'Value',
		   // maxLength: 20,
		    width:220,
		    allowBlank: false,
		    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
		      
	 var ValidFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From',
                format: 'Y-m-d',
                minValue: '1960-01-01',
                width:220,
             //   disabledDays: [5, 6],
                id: 'trainingCoordinateHistoryValidFrom',
        		vtype: 'daterange',
        		endDateField: 'trainingCoordinateHistoryValidTo'
            });
    
    var ValidToField = new Ext.form.DateField({
			fieldLabel: 'Valid To',
                format: 'Y-m-d',
                minValue: '1960-01-01',
                width:220,
                id:'trainingCoordinateHistoryValidTo',
                vtype: 'daterange',
             //   disabledDays: [5, 6],
                startDateField:'trainingCoordinateHistoryValidFrom'
            });
 
 
 
   
  
 
    //////////////************adding form****************/////////////////
    var valid='Salary';
    var flag=true;
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
                items: [{xtype:'ux-radiogroup',
						fieldLabel:'Type',
						//name:'group1',
						horizontal:true,
						radios:[{
							value:1,
							boxLabel:'Salary',
							listeners:{
								'check':function(r,c){//alert(r.boxLabel+" "+c);
									valid = 'Salary';
								}
							},
							checked:true
						}, {
							value:2,
							boxLabel:'Mobile allowance',
							listeners:{
								'check':function(r,c){//alert(r.boxLabel+" "+c);
									valid = 'Mobile allowance';
								}
							}
						},{
							value:3,
							boxLabel:'Title',
							listeners:{
								'check':function(r,c){//alert(r.boxLabel+" "+c);
									valid ='Title';
								}
							}
						}]
					}, ValidFromField,
					   ValidToField,
					   PriceValueField
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){ 
                 
						    var record = new Ext.data.Record({
						    	  trainingCoordinateHistoryValue:		PriceValueField.getValue() ,
								  trainingCoordinateHistoryValidFrom:   ValidFromField.getValue().format('Y-m-d'),
								  trainingCoordinateHistoryValidTo:	    ValidToField.getValue().format('Y-m-d'),
								  trainingCoordinateHistoryType:        valid,
								  trainingCoordinateHistoryValid:       flag
						    });  
						    ds.add(record);  
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
      height: 250,
      plain:true,
      layout: 'fit',
      items: fs
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetCourseForm(){
    PriceValueField.reset();
    ValidFromField.reset();
    ValidToField.reset();
   
  }
  
  // check if the form is valid
  function isCourseFormValid(){
  return(PriceValueField.isValid() && ValidFromField.isValid() && ValidToField.isValid());
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
 	var VNameField = new Ext.form.TextField({
      		fieldLabel: 'Venue Name',
      		allowBlank: false,
      		width: 300,
    		id:'venueName',
    	//	anchor:'95%',
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});
     		
     var VAddressField = new Ext.form.TextField({
      		fieldLabel: 'Venue Address',
      		allowBlank: false,
    		id:'venueAddress',
    		width: 300,
    	//	anchor:'95%',
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
     		
     var VDistrictField = new Ext.form.TextField({
      		fieldLabel: 'Venue Destrict',
      		allowBlank: false,
    		id:'venueDistrict',
    		width: 300,
    	//	anchor:'95%',
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
      var VTelephoneField = new Ext.form.NumberField({
      		fieldLabel: 'Venue Telephone',
      		allowBlank: false,
    		id:'venuMainContact',
    		width: 300
    	//	maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
/**==========================================================================*/
 var tab2 = new Ext.FormPanel({
        labelAlign: 'left',
        title: 'Add Contact',
        bodyStyle:'padding:5px',
      
        width: 600,
        frame:true,
        items: [{
        //	title:'Personal Information',
            layout:'column',
            border:false,
            items:[{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [VNameField,
                		VAddressField
                		]
            },{
                columnWidth:.5,
                layout: 'form',
               
                border:false,
                items: [VTelephoneField,
                VDistrictField
                		]
            }]
        },{
            xtype:'tabpanel',
            plain:true,
            activeTab: 0,
            height:400,
           
            defaults:{bodyStyle:'padding:10px'},
            items:[{
                title:'Venue Contacts List',
                layout:'form',
                defaults: {width: 970},
                defaultType: 'textfield',
				 autoScroll:true,
                items: [new Ext.TabPanel({
                    region:'center',
                    deferredRender:false,
                    activeTab:0,
                    items:[myGrid]})]
            }]
        }],


        buttons: [{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){
                var Type=[];
                var Valid=[];
                var validFrom=[];
                var validTo=[];
                var Value=[];
                	for(i=0;i<ds.getCount();i++)
                	{
                		var HistoryRec = ds.getAt(i);
                		Value.push(HistoryRec.get('trainingCoordinateHistoryValue'));
                		Type.push(HistoryRec.get('trainingCoordinateHistoryType'));
                		Valid.push(HistoryRec.get('trainingCoordinateHistoryValid'));
                		validFrom.push(HistoryRec.get('trainingCoordinateHistoryValidFrom'));
                		validTo.push(HistoryRec.get('trainingCoordinateHistoryValidTo'));
                	}
                    tab2.getForm().submit( 
                    	      Ext.Ajax.request({   
        						waitMsg: 'Please wait...',
        						url: '../listCoordinators.do',
        						
								params: {
								  task: "AddCoordinator",
								  values:Value,
								  types:Type,
								  valids:Valid,
								  validFroms:validFrom,
								  validTos:validTo,
								  trainingCoordinateFirstName:       FNameField.getValue() ,
								  trainingCoordinateLastName:        LNameField.getValue(),
								  trainingCoordinateMobile:	       	 MobileField.getValue(),
								  trainingCoordinateTelephone:       TelephoneField.getValue(),
								  trainingCoordinateAbb:    	     AbbField.getValue(),
								  trainingCoordinateAddress:	     AddressField.getValue(),
								  trainingCoordinateEmail:	         EmailField.getValue(),
								  trainingCoordinateColor:  		 ColorField.getValue(),
								  trainingCoordinateHireDate:		 HireDateField.getValue().format('Y-m-d'),
								  trainingCoordinateBirthDate:		 BirthDateField.getValue().format('Y-m-d'),
								  trainingCoordinateDescription:	 DescField.getValue()
								},
						        method:'POST', 
						        success: function(response){ ////console.log("success");
						        		 var redirect = 'coordinators.jsp'; 
		                        window.location = redirect;
      
						        },
						        failure: function(response){////console.log("faaaaaaaaaail");
						        	tab2.getForm().reset(); 
						       }                      
						      })); 
                } 
            },{text:'Cancel',
            	handler:function(){window.location='coordinators.jsp';}
            	}
           ]
    });

    tab2.render(document.body);
    
   var pan= new Ext.TabPanel({
                    region:'center',
                    /* height:495, */
                     /* width:980,*/
        			renderTo: 'binding-example',
                    deferredRender:false,
                    activeTab:0,
                    items:[tab2]});
      
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
////console.log("  LOOOOOOOOOOOOOOD ");

};
loadtest=   ds.load({callback :  stcCallBack1001});
});