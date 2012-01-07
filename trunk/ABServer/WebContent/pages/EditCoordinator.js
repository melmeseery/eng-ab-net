
Ext.apply(Ext.form.VTypes, {
  daterange: function(val, field) {
    var date = field.parseDate(val);

    // We need to force the picker to update values to recaluate the disabled dates display
    var dispUpd = function(picker) {
      var ad = picker.activeDate;
      picker.activeDate = null;
      picker.update(ad);
    };
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
    return true;
  }
});

var TCid;

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
       baseParams:{task: "Cdata"},
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
      {name: 'trainingCoordinatorResignationDate', type: 'string'},
      {name: 'trainingCoordinatorCV', type: 'string'}
     ]);

    dataProxy = new Ext.data.HttpProxy({
     	url: '../listCoordinators.do',
     	method: 'POST',
        headers:{'request-type':'ajax' }
      });
var Tds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "Hdata"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)

   		record: "Trainingcoordinators",           // The repeated element which contains row information
   		id: "idTrainingCoordinators"
        },Trainingcoordinators
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
  //   var sm = new Ext.grid.CheckboxSelectionModel();
      var colModel = new Ext.grid.ColumnModel([
        {header: "Type", width: 100, sortable: true, dataIndex: 'trainingCoordinateHistoryType'},
        {header: "Valid From", width: 100, sortable: true, dataIndex: 'trainingCoordinateHistoryValidFrom'},
		{header: "Valid To", width: 100, sortable: true, dataIndex: 'trainingCoordinateHistoryValidTo'},
    	{header: "Value", width: 100, sortable: true, dataIndex: 'trainingCoordinateHistoryValue'}

    ]);

 ds.on('add', function(){
	ds.reload();
//myGrid.getView().refresh();
   });

 Tds.load();
var c;
var TrainCV="../files/trainingCoordinatorCV/";
Tds.on('load', function(){//////console.log(Cds.getAt(0));
//alert(Cds.getAt(0));
var coordinateRec = Tds.getAt(0);
TCid=coordinateRec.get('idTrainingCoordinators');
FNameField.setValue(coordinateRec.get('trainingCoordinateFirstName'));
LNameField.setValue(coordinateRec.get('trainingCoordinateLastName'));
MobileField.setValue(coordinateRec.get('trainingCoordinateMobile'));
TelephoneField.setValue(coordinateRec.get('trainingCoordinateTelephone'));
BirthDateField.setValue(coordinateRec.get('trainingCoordinateBirthDate'));
HireDateField.setValue(coordinateRec.get('trainingCoordinateHireDate'));
AbbField.setValue(coordinateRec.get('trainingCoordinateAbb'));
AddressField.setValue(coordinateRec.get('trainingCoordinateAddress'));
EmailField.setValue(coordinateRec.get('trainingCoordinateEmail'));
ColorField.setValue(coordinateRec.get('trainingCoordinateColor'));
DescField.setValue(coordinateRec.get('trainingCoordinateDescription'));
c=coordinateRec.get('trainingCoordinateColor');
SalaryField.setValue(coordinateRec.get('trainingCoordinatorCurrentSalary'));
TitleField.setValue(coordinateRec.get('trainingCoordinatorCurrentTitle'));
ResignationDateField.setValue(coordinateRec.get('trainingCoordinatorResignationDate'));


testout=coordinateRec.get('trainingCoordinatorCV');
TrainCV+=coordinateRec.get('trainingCoordinatorCV');
if(testout == '')
	TrainCVLink.setVisible(false);
else
	TrainCVLink.setVisible(true);

	TrainCVLink.setText('<font size=2><a href="'+TrainCV+'" target="_blank">Open/Download CV</a></font>',false);


//jQuery(function($)
//	        {
//	            $("#picker1").attachColorPicker(c);
//	            $("#picker1").change(function() {$("#picker1").getValue();
//
//	            });
//	        });
});


    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
       //  sm: sm,
        stripeRows: true,
       height:300,
    //    width:600,
        view: new Ext.grid.GroupingView({
            forceFit:true,
            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
        }),
        title:'Training Coordinator History',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Coordinator History',
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

		displayEFormWindow();
		EPriceValueField.setValue(seldata.trainingCoordinateHistoryValue);
		EValidFromField.setValue(seldata.trainingCoordinateHistoryValidFrom);
		EValidToField.setValue(seldata.trainingCoordinateHistoryValidTo);
		EtypeCombo.setValue(seldata.trainingCoordinateHistoryType);
});


    /*
     * ================  Form 5  =======================
     */
    bd.createChild({tag: 'h2', html: ''});


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
               // disabledDays: [5, 6],
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
              //  disabledDays: [5, 6],
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
	allowBlank: false,
	valueField:'name',
	typeAhead: true,
	editable: false,
	width:220,
	mode: 'local',
	triggerAction: 'all',
	emptyText:'Select a Type...',
	selectOnFocus:true
    });


    //////////////************adding form****************/////////////////
    var valid='Salary';
    var flag=1;
    var fs = new Ext.FormPanel({
        frame: true,
      //  title:'Add Coordinator History',
        labelAlign: 'left',
        labelWidth: 85,
        width:340,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [typeCombo,
                 ValidFromField,
					  // ValidToField,
					   PriceValueField
		                   ]
            })
        ],
         buttons:[{
                text:'Save',
                formBind: true,
                // Function that fires when user clicks the button
                handler:AddHistoryForm
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
    typeCombo.reset();
    ValidFromField.reset();
    PriceValueField.reset();
 //   ValidToField.reset();

  }

  // check if the form is valid
  function isCourseFormValid(){
  return(typeCombo.isValid() && ValidFromField.isValid() && PriceValueField.isValid()  );
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
    function AddHistoryForm(){//alert('ana henaaaaaaaaa');
      if(typeCombo.isValid() && ValidFromField.isValid() && PriceValueField.isValid()){//alert(ValidFromField.getValue().format('d-M-Y'));
      Ext.Ajax.request({
        waitMsg: 'Please wait...',
        url: '../listCoordinators.do',
        params: {
          task: "AddHistory",
           trainingCoordinateHistoryValue:		PriceValueField.getValue() ,
		   trainingCoordinateHistoryValidFrom:   ValidFromField.getValue().format('Y-m-d'),
		//   trainingCoordinateHistoryValidTo:	 ValidToField.getValue().format('Y-m-d'),
		   trainingCoordinateHistoryType:        typeCombo.getValue(),
		   trainingCoordinateHistoryValid:       true
        },
        method:'POST',
        success: function(response){

			 var record = new Ext.data.Record({
						    	  trainingCoordinateHistoryValue:		PriceValueField.getValue() ,
								  trainingCoordinateHistoryValidFrom:   ValidFromField.getValue().format('d-M-Y'),
								//  trainingCoordinateHistoryValidTo:	    ValidToField.getValue().format('d-M-Y'),
								  trainingCoordinateHistoryType:        typeCombo.getValue(),
								  trainingCoordinateHistoryValid:       true
						    });
						    ds.add(record);
						    AddTAWindow.hide();

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


 ////////////////////////////////////editing form/////////////////////////////////////////
 var EPriceValueField = new Ext.form.TextField({
		    id: 'EtrainingCoordinateHistoryValue',
		    fieldLabel: 'Value <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:220,
		    allowBlank: false,
		    maskRe: /([a-zA-Z0-9\s]+)$/
		      });


	 var EValidFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
               // disabledDays: [5, 6],
               allowBlank: false,
                id: 'EtrainingCoordinateHistoryValidFrom',
        		vtype: 'daterange',
        		endDateField: 'EtrainingCoordinateHistoryValidTo'
            });

    var EValidToField = new Ext.form.DateField({
			fieldLabel: 'Valid To',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                id:'EtrainingCoordinateHistoryValidTo',
                vtype: 'daterange',
              //  disabledDays: [5, 6],
                startDateField:'EtrainingCoordinateHistoryValidFrom'
            });
 var EtypeCombo = new Ext.form.ComboBox({
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


    var valid1='Salary';
    var flag1=1;
    var valid2=1;
    var fs1 = new Ext.FormPanel({
        frame: true,
      //  title:'Edit Coordinator History',
        labelAlign: 'left',
        labelWidth: 85,
        width:340,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [EtypeCombo,
                 EValidFromField,
					 //  EValidToField,
					   EPriceValueField

		                   ]
            })
        ],
         buttons:[{
                text:'Save',
                formBind: true,
                // Function that fires when user clicks the button
                handler:EditHistoryForm
            },{text:'Cancel',
            	handler:function(){EditTAWindow.hide();}
            	}
           ]

    });
  EditTAWindow= new Ext.Window({
      id: 'EditTAWindow',
      title: 'Edit Coordinator History',
      closable:false,
      width: 400,
      height: 210,
      plain:true,
      layout: 'fit',
      items: fs1
    });

 //////////////********display form functions********************/////////////////

   // reset the Form before opening it
  function resetECourseForm(){
    EtypeCombo.reset();
    EValidFromField.reset();
  //  EValidToField.reset();

  }

  // check if the form is valid
  function isECourseFormValid(){
  return(EtypeCombo.isValid()&& EValidFromField.isValid() && EPriceValueField.isValid()  );
  }

  // display or bring forth the form
  function displayEFormWindow(){
  if(!EditTAWindow.isVisible()){
    resetECourseForm();
    EditTAWindow.show();
  } else {
    EditTAWindow.toFront();
  }


  }
    function EditHistoryForm(){//alert('ana henaaaaaaaaa');
      if(EtypeCombo.isValid()&& EValidFromField.isValid() && EPriceValueField.isValid()){
      var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
      Ext.Ajax.request({
        waitMsg: 'Please wait...',
        url: '../listCoordinators.do',
        params: {
          task: "EditHistory",
          id:selections[0].id,
           trainingCoordinateHistoryValue:		 EPriceValueField.getValue() ,
		   trainingCoordinateHistoryValidFrom:   EValidFromField.getValue().format('Y-m-d'),
		 //  trainingCoordinateHistoryValidTo:	 EValidToField.getValue().format('Y-m-d'),
		   trainingCoordinateHistoryType:        EtypeCombo.getValue(),
		   trainingCoordinateHistoryValid:       true
        },
        method:'POST',
        success: function(response){


						    ds.reload();
						    EditTAWindow.hide();

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
      		fieldLabel: 'Phone ',
      	//	allowBlank: false,
    		id:'trainingCoordinateTelephone',
    		width: 300,
    		maskRe: /([0-9\s]+)$/
     		});
      var AbbField = new Ext.form.TextField({
		    id: 'trainingCoordinateAbb',
		    fieldLabel: 'Abbreviation <html><font color=red> *</font></html>',
		//    maxLength: 20,
		//    allowNegative: false,
		    allowBlank: false,
		    width: 300,
		//    anchor:'95%',
		    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
	 var AddressField = new Ext.form.TextField({
		    id: 'trainingCoordinateAddress',
		    fieldLabel: 'Address',
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
	 var ColorField =   new Ext.ux.form.ColorPickerField ({
 	fieldLabel: ' Color ',
	id: 'color',
	allowBlank: false,
	name: 'color',
   value: '123456'
//	disable:true
//	allowBlank: false
 });
//	 new Ext.form.TextField({
//	fieldLabel: 'Color',
//	id: 'picker1',
//	width:300,
////	disable:true
////	allowBlank: false
//});
	 var HireDateField = new Ext.form.DateField({
			fieldLabel: 'Hire Date <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1990-01-01',
              //  disabledDays: [5, 6],
                width: 300,
                id: 'trainingCoordinateHireDate',
                allowBlank: false,
        		vtype: 'daterange'
        	//	anchor:'60%'
        	//	requestDateField: 'requestdt'
            });
    var SalaryField = new Ext.form.NumberField({
		    id: 'trainingCoordinateCurrentSalary',
		    fieldLabel: 'Current Salary',
		//    maxLength: 20,
		    width: 300
		//    allowNegative: false,
	//	anchor:'95%',
		//    allowBlank: false,
		//    maskRe: /([.-0-9\s]+)$/
		      });

	var TitleField = new Ext.form.TextField({
		    id: 'trainingCoordinateCurrentTitle',
		    fieldLabel: 'Current Title',
		//    maxLength: 20,
		    width: 300,
		//    allowNegative: false,
	//	anchor:'95%',
		//    allowBlank: false,
		    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
    var BirthDateField = new Ext.form.DateField({
			fieldLabel: 'Birth Date',
                format: 'd-M-Y',
                id:'trainingCoordinateBirthDate',
            //    anchor:'95%',
            	width: 300,
            //	allowBlank: false,
                minValue: '1950-01-01'
              //  disabledDays: [5, 6]

            });
     var ResignationDateField = new Ext.form.DateField({
			fieldLabel: 'Resignation Date',
                format: 'd-M-Y',
                id:'ResignationDate',
            //    anchor:'95%',
            	width: 300,
                minValue: '1950-01-01'
              //  disabledDays: [5, 6]

            });

            var uploadCVField = new Ext.form.TextField({
      		fieldLabel: 'Coordinator CV',
      		width:50,
    		inputType: 'file'
     		});

	var TrainCVLink = new Ext.form.Label({html:'<font size=2><a href="'+TrainCV+'" target="_blank">Open/Download CV</a></font>'});
TrainCVLink.setVisible(false);

     var DescField = new Ext.form.HtmlEditor({
     			id:'trainingCoordinateDescription',
                    fieldLabel:'Description'
     });



/**==========================================================================*/

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
        title: 'Edit Coordinator',
        bodyStyle:'padding:5px',
     //   width: 600,
        frame:true,
                labelWidth: 150,
        defaultType: 'fieldset',
       // autoScroll:true,
        items:new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                width:1300,
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
                		TelephoneField,
                		MobileField
                		]
            },{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [EmailField,
                BirthDateField,
                HireDateField,
                ColorField,
                ResignationDateField,
              new Ext.form.FieldSet({
              //  title: 'Photo',
                labelWidth: 140,
                autoHeight: true,
             //   autoWidth: true,
                border: false,
           //   defaults: {width: 150},
                layout:'column',
           //    width: 350,
              //  defaultType: 'textfield',
                items: [
                {width:350,layout: 'form',
                items: [ uploadCVField]},
                {width:100,layout: 'form',
                items: [ TrainCVLink]}
		                   ]
            })

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
        })



            });

 //   tab2.render(document.body);

 //   var viewport = new Ext.Viewport({
   //         layout:'border',
     //       items:[
    var tap= new Ext.TabPanel({
                    region:'center',
                     height:495,
                     buttonAlign:'center',
                    width:1250,
        			renderTo: 'binding-example',
                    deferredRender:false,
                    activeTab:0,
                    items:[tab2],
        buttons: [{
                text:'Save',
                formBind: true,
                // Function that fires when user clicks the button
                handler:function(){
                var d='3000-01-01';
                var d2='3000-01-01';
                var d3='3000-01-01';
                if(HireDateField.getValue()!='')
                {
                	d=HireDateField.getValue().format('Y-m-d');
                }
                if(BirthDateField.getValue()!='')
                {
                	d2=BirthDateField.getValue().format('Y-m-d');
                }
                if(ResignationDateField.getValue()!='')
                {
                	d3=ResignationDateField.getValue().format('Y-m-d');
                }
                if(FNameField.isValid() && LNameField.isValid() && AbbField.isValid() && AddressField.isValid() && EmailField.isValid() && BirthDateField.isValid()
  && HireDateField.isValid() && ColorField.isValid() && TelephoneField.isValid() && MobileField.isValid() && EmailField.isValid() && BirthDateField.isValid())
  {

                    	      Ext.Ajax.request({
        						waitMsg: 'Please wait...',
        						url: '../listCoordinators.do',
								params: {
								  task: "EditCoordinator",

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
								  trainingCoordinateCurrentSalary:	 SalaryField.getValue(),
								  trainingCoordinateCurrentTitle:	 TitleField.getValue(),
								  trainingCoordinatorResignationDate: d3,
								  trainingCoordinatorCv: uploadCVField.getValue()

								},
						        method:'POST',
						        success:function(response){
		                           tab2.getForm().submit({

	              		url: '../upload.do?task=coordinatorCV&CoordinatorID='+TCid,
	                    waitMsg: 'Uploading your File...',

	                    success: function(fp, o){
	                        msg('Success', 'Processed your files on the server');
	                      	//addTab();
	                    var redirect = 'coordinators.jsp';
			 			window.location = redirect;


	                    }
                   }

                 );
						        }

						        ,
						        failure: function(response){////console.log("faaaaaaaaaail");
						        	tab2.getForm().reset();
						       }
						      });
  }
  else {
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


//]});
////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
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
         var type = [];
         var sel = myGrid.getSelectionModel().getSelected();

         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
          var sel = selections[i];
          var selIndex = ds.indexOf(sel);
          var seldata=sel.data;
          type.push(seldata.trainingCoordinateHistoryType);
         // alert("ssssssssssssss>>>>>> "+seldata.trainingCoordinateHistoryType);
         // var HistoryRec = ds.getAt(i);
         }

         Ext.Ajax.request({
            waitMsg: 'Please Wait',
            url: '../listCoordinators.do',
            params: {
               task: "DELETESELECTIONS",
               ids:  selectedCourse,
               type:type
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
//alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
////console.log("  LOOOOOOOOOOOOOOD ");

};
loadtest=   ds.load({callback :  stcCallBack1001});
});