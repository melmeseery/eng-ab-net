/*
 * Ext JS Library 2.1
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 *
 * http://extjs.com/license
 */

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

    /////////////////////////////////////////////////////////////////////


    dataProxy = new Ext.data.HttpProxy({
     	url: '../listCProperties.do',
     	method: 'POST',
        headers:{'request-type':'ajax' }
      });

  /*  var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "coursetypes"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({

       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Coursetypes"},           // The repeated element which contains row information
   		[{name: 'courseTypeName', type: 'string'}]

        )
      });*/
      var ds=[['Individual','Individual'],['Group','Group'],['Both','Both']];

    var Tds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "Trainingareas"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({

       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Trainingareas"},           // The repeated element which contains row information
   		[{name: 'trainingAreaName', type: 'string'},{name: 'idTrainingAreas', type: 'int'}]

        )
      });

      dataProxy = new Ext.data.HttpProxy({
     	url: '../listCProperties.do',
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
   		record: "Course"},           // The repeated element which contains row information
   		[{name: 'courseColor', type: 'string'}]

        )
      });
    col.load();
/*------------------------------------------------------------------------------*/
  dataProxy = new Ext.data.HttpProxy({
     	url: '../listCProperties.do',
     	method: 'POST',
        headers:{'request-type':'ajax' }
      });

var CAds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "CompetenceAdd"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({

       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Competencesaddressed"},           // The repeated element which contains row information
   		[{name: 'competencesAddressedName', type: 'string'},{name: 'idCompetencesAddressed', type: 'int'}]

        )
      });



/*------------------------------------------------------------------------------*/
   var Prices  = Ext.data.Record.create([
      {name: 'idPrices', type: 'int'},
      {name: 'priceImcClient', type: 'string'},
      {name: 'priceImcCompany', type: 'string'},
      {name: 'priceInternational', type: 'string'},
      {name: 'pricePublicClient', type: 'string'},
      {name: 'pricePublicCompany', type: 'string'},
      {name: 'priceValid', type: 'boolean'},
      {name: 'priceValidFrom',type:'string'},
      {name: 'currency', type: 'string'}

     ]);

    dataProxy = new Ext.data.HttpProxy({
     	url: '../listCProperties.do',
     	method: 'POST',
        headers:{'request-type':'ajax' }
      });

    var Pds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "listP"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Prices",           // The repeated element which contains row information
   		id: "idPrices"
        },Prices
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
      var colModel = new Ext.grid.ColumnModel([
      	{header: "IMC Rate @ Company Premises", width: 200, sortable: true, locked:false, dataIndex: 'priceImcCompany'},
        {header: "IMC Rate @ Client Premises", width: 200, sortable: true, locked:false, dataIndex: 'priceImcClient'},
        {header: "Local Rate @ Company Premises", width: 200, sortable: true, dataIndex: 'pricePublicCompany'},
        {header: "Local Rate @ Client Premises", width: 200, sortable: true, dataIndex: 'pricePublicClient'},
        {header: "International Rate", width: 150, sortable: true, dataIndex: 'priceInternational'},
		{header: "Valid From", width: 150, sortable: true, dataIndex: 'priceValidFrom'},
        {header: "Currency", width: 150, sortable: true, dataIndex: 'currency'}
    ]);

// Pds.on('add', function(){
	//Pds.reload();
//myGrid.getView().refresh();
   //});

    var myGrid = new Ext.grid.GridPanel({
        ds: Pds,
        cm: colModel,
        stripeRows: true,
        height:470,
        /* width:980,*/

        title:'Prices',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Price ',
             iconCls:'add',
             handler: displayFormWindow
             })//,new Ext.Toolbar.Button({
          //    text: 'Delete Selection',
          //    handler: confirmDeleteCourses
           //   })
              ],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})

    });

   var Audiencetypes  = Ext.data.Record.create([
      {name: 'audienceName', type: 'string'},
      {name: 'idAudienceTypes', type: 'int'}
     ]);

    dataProxy = new Ext.data.HttpProxy({
     	url: '../listCourses.do',
     	method: 'POST',
        headers:{'request-type':'ajax' }
      });



      var TPds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "listAud"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({

       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Audiencetypes"},           // The repeated element which contains row information
   		[{name: 'audienceName', type: 'string'},{name: 'idAudienceTypes', type: 'int'}]

        )
      });

  TPds.load();
 // alert('????????');

  TPds.on('load', function(){
  //	alert('????????');
//  	jQuery(function($)
//	        {
//	            $("#picker1").attachColorPicker();
//	            $("#picker1").change(function() {$("#picker1").getValue();
////	            for(var i=0;i<col.getCount();i++)
////	            {
////	            	var colorRec = col.getAt(i);
////	            	if(CourseColorField.getValue()==colorRec.get('courseColor') && courseC !=CourseColorField.getValue())
////	            	{
////	            		Ext.MessageBox.alert('Warning', 'The color is selected before, please select another color');
////	            		CourseColorField.reset();
////	            	}
////	            }
//	            });
//
//	        });

});

 // Pds.load();
    /////////////////////////////////////////////////////////////////////
var Resources  = Ext.data.Record.create([
      {name: 'resourceName', type: 'string'},
      {name: 'idResources', type: 'int'}
     ]);

    dataProxy = new Ext.data.HttpProxy({
     	url: '../listResources.do',
     	method: 'POST',
        headers:{'request-type':'ajax' }
      });



      var Rds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "listR"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({

       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Resources"},           // The repeated element which contains row information
   		[{name: 'resourceName', type: 'string'},{name: 'idResources', type: 'int'}]

        )
      });

  //Rds.load();

    /*
     * ================  Simple form  =======================
     */
    bd.createChild({tag: 'h2', html: ''});

    /*======================== Form Fields=========================*/

    var CourseNameArField = new Ext.form.TextField({
      		fieldLabel: 'Course Name in Arabic <html><font color=red> *</font></html>',
      		allowBlank: false,
    		id:'courseNameAr',
    		width:250
     		});

     var CourseNameEngField = new Ext.form.TextField({
      		fieldLabel: 'Course Name in English <html><font color=red> *</font></html>',
      		allowBlank: false,
    		id:'courseNameEng',
    		width:250,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});

     var CourseTypeField = new Ext.form.ComboBox({
                       store: ds,
                       id: 'courseType',
					    fieldLabel: 'Course Type <html><font color=red> *</font></html>',
					    displayField:'courseTypeName',
					    typeAhead: true,
					    allowBlank: false,
					    editable: false,
					    width:250,
					    triggerAction: 'all',
					    emptyText:'Select a Type...',
					    selectOnFocus:true,
					    listeners: {
	     				select: function (combo, record, index) {

	    				type = this.getValue();
	    				if(type=='Individual')
	    					price.enable();
	    				else if(type=='Group')
	    					price.disable();
	    				else if(type=='Both')
	    					price.enable();
	    			 }}

		    });
	var checkds=[['Yes','Yes'],['No','No']];

		var checkField = new Ext.form.ComboBox({
                       store: checkds,
                     //  id: 'courseType',
					    fieldLabel: 'Course Ownership',
					  //  displayField:'courseTypeName',
					    typeAhead: true,
					    editable: false,
					    width:250,
					    triggerAction: 'all',
					    emptyText:'Select...',
					    selectOnFocus:true,
					    listeners: {
	     				select: function (combo, record, index) {

	    				type = this.getValue();
	    				if(type=='Yes')
	    				{
	    					ResourcesField.disable();
	    					ResourcesField.reset();
	    				}
	    				else if(type=='No')
	    				{
	    					ResourcesField.enable();
	    				}
	    			 }}

		    });
	var ResourcesField = new Ext.form.ComboBox({
                       store: Rds,
                       id: 'resources',
					    fieldLabel: 'Resource Name',
					    displayField:'resourceName',
					    valueField:'idResources',
					    typeAhead: true,
					    editable: false,
					    width:250,
					    triggerAction: 'all',
					    emptyText:'Select Resource...',
					    selectOnFocus:true
		    });
	var CourseTAField = new Ext.form.ComboBox({
                       store: Tds,
                       id: 'trainArea',
					    fieldLabel: 'Course Training Area <html><font color=red> *</font></html>',
					    displayField:'trainingAreaName',
					    valueField:'idTrainingAreas',
					    typeAhead: true,
					    editable: false,
					    allowBlank: false,
					    width:250,
					    triggerAction: 'all',
					    emptyText:'Select Training Area...',
					    selectOnFocus:true
		    });


      var CourseDaysField = new Ext.form.TextField({
		    id: 'courseDays',
		    fieldLabel: 'Course Duration <html><font color=red> *</font></html>',
		  //  maxLength: 20,
		    width:250,
		    allowNegative: false,
		    allowBlank: false,
		 //   anchor : '95%'
		    maskRe: /([0-9\s]+)$/
		      });

	  var CourseCodeField = new Ext.form.TextField({
		    id: 'courseCode',
		    fieldLabel: 'Course Code <html><font color=red> *</font></html>',
		  //  maxLength: 4,
		    width:250,
		    allowNegative: false,
		    allowBlank: false
		  //  anchor : '95%'
		//   maskRe: /([a-zA-Z0-9\s]+)$/
		      });
	var CourseAppField = new Ext.form.TextField({
		    id: 'courseApp',
		    fieldLabel: 'Course Abbreviation <html><font color=red> *</font></html>',
		    width:250,
		    maxLength: 5,
		    allowBlank: false,
		  //  anchor : '95%'
		   maskRe: /([a-zA-Z0-9\s]+)$/
		      });
	 var CourseColorField = new Ext.ux.form.ColorPickerField ({
 	fieldLabel: 'Color <html><font color=red> *</font></html>',
	id: 'color',
	allowBlank: false,
	name: 'color',
   value: '123456'
//	disable:true
//	allowBlank: false
 });

//	 new Ext.form.TextField({
//	fieldLabel: 'Course Color Legend <html><font color=red> *</font></html>',
//	id: 'picker1',
//	allowBlank: false,
//	width:250
////	disable:true
////	allowBlank: false
//});



       var CourseDescField = new Ext.form.ComboBox({
                       store: CAds,
                       id: 'idCompetencesAddressed',
					    fieldLabel: 'Competences Addressed',
					    displayField:'competencesAddressedName',
					    valueField:'idCompetencesAddressed',
					    typeAhead: true,
					    editable: false,
					    width:250,
					    triggerAction: 'all',
					    emptyText:'Select Competence Addressed...',
					    selectOnFocus:true
		    });
     	var uploadOutlineArField = new Ext.form.TextField({
      		fieldLabel: 'Course Outline in Arabic',
      		width:250,
    		inputType: 'file'

     		});
       var uploadOutlineEngField = new Ext.form.TextField({
      		fieldLabel: 'Course Outline in English',
      		width:250,
    		inputType: 'file'

     		});

	 var tab=new Ext.TabPanel({
                    region:'center',
                    deferredRender:false,
                    activeTab:0,
                    items:[myGrid]});

     var price=new Ext.FormPanel({

                title:'Prices',
             //   defaults: {width: 1020},
                defaultType: 'textfield',
				autoScroll:true,
                items: [tab]
     });

     var msg = function(title, msg){
        Ext.Msg.show({
            title: title,
            msg: msg,
            minWidth: 200,
            modal: true,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK
        });
    };

    var TargetedP=new Ext.ux.Multiselect({

     fieldLabel:"Targeted Participants",
            name:"multiselect",
            dataFields:["idAudienceTypes", "audienceName"],
            valueField:"idAudienceTypes",
            displayField:"audienceName",
            width:250,
            height:130,
           // allowBlank:false,
            store:TPds
    });
    /*=================================================================*/
  var valid=1;
  ResourcesField.disable();
  checkField.setValue('Yes');
   var simple = new Ext.FormPanel({
    	fileUpload: true,
        labelAlign: 'left',
        title: 'Add Course',
        frame: true,
   		autoHeight : true,
    	autoScroll : true,
   		layout:'table',
   		layoutConfig: {columns:2},
        labelWidth: 150,
        defaultType: 'fieldset',
      //  frame:true,
        items: [new Ext.form.FieldSet({
               // title: 'Course Details',
               labelWidth: 150,
            hideBorders : true,
            border:false,
         //   title:'Contract Info',
           width: 600,	// Default config options for child items
            defaultType: 'grid',
            height: 397,
            bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
           // border: false,
            style: {
                "margin-left": "10px", // when you add custom margin in IE 6...
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
            },
                items: [CourseAppField,
                		CourseCodeField,
                		CourseNameEngField,
                		CourseNameArField,
                		CourseDaysField,
                		CourseColorField,
                		uploadOutlineArField,
                		uploadOutlineEngField

                		]
        }),new Ext.form.FieldSet({
             //   title: 'Course Details',
                labelWidth: 150,
            hideBorders : true,
          //  title:'Contract Info',
          border:false,
            width: 600,	// Default config options for child items
            defaultType: 'grid',
            height: 400,
            bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
           // border: false,
            style: {
                "margin-left": "10px", // when you add custom margin in IE 6...
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
            },
                items: [ CourseTypeField,
                		CourseTAField,
                		CourseDescField,
                		 checkField,
                  ResourcesField,
                TargetedP
                		]

         })]



    });
//  ////console.log("ana henaaaa")
 /*------------------------------------add price-----------------------------*/
  var Currds=[['EGP','EGP'],['USD','USD'],['Euro','Euro']];

    var CurrFields = new Ext.form.ComboBox({
                       store: Currds,
                       id: 'currency',
					    fieldLabel: 'Currency <html><font color=red> *</font></html>',
					    displayField:'currency',
					    typeAhead: true,
					    editable: false,
					    allowBlank: false,
					    width:220,
					    triggerAction: 'all',
					    emptyText:'Select Currency ...',
					    selectOnFocus:true
		    });


 var ImcField_Com = new Ext.form.NumberField({
      		fieldLabel: 'IMC Funded Rate <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:200,
    		id:'priceImc_comp'
    	//	maskRe: /([0-9\s]+)$/
     		});
   var ImcField_Client = new Ext.form.NumberField({
      		fieldLabel: 'IMC Funded Rate <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:200,
    		id:'priceImc_client'
    	//	maskRe: /([0-9\s]+)$/
     		});
     var InternationalField = new Ext.form.NumberField({
      		fieldLabel: 'International Rate <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:200,
    		id:'priceInternational'
    	//	maskRe: /([0-9\s]+)$/
     		});
     var PuplicField_Comp = new Ext.form.NumberField({
		    id: 'pricePulic_comp',
		    fieldLabel: 'Local Common Rate <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:200,
		//    allowNegative: false,
		    allowBlank: false
		 //   maskRe: /([0-9\s]+)$/
		      });
	 var PuplicField_Client = new Ext.form.NumberField({
		    id: 'pricePulic_client',
		    fieldLabel: 'Local Common Rate <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:200,
		//    allowNegative: false,
		    allowBlank: false
		 //   maskRe: /([0-9\s]+)$/
		      });
	 var ValidFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                id:'priceValidFrom',
                allowBlank: false,
                vtype: 'daterange'
              //  disabledDays: [5, 6],
               // endDateField:'priceValidTo'
            });

    var ValidToField = new Ext.form.DateField({
			fieldLabel: 'Valid To',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                id:'priceValidTo',
                vtype: 'daterange',
             //   disabledDays: [5, 6],
                startDateField:'priceValidFrom'

            });

      //////////////************adding form****************/////////////////
   // var valid='Salary';
   // var flag=true;
   var dates=[];
   var currencies=[];
    var fs = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 125,
        width:500,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [new Ext.form.FieldSet({
                title: '@ Company Premises',
                autoHeight: true,
                defaultType: 'textfield',
                items:[ImcField_Com,PuplicField_Comp]}),
                new Ext.form.FieldSet({
                title: '@ Client Premises',
                autoHeight: true,
                defaultType: 'textfield',
                items:[ImcField_Client,PuplicField_Client]}),
					   InternationalField,
					   CurrFields,
					   ValidFromField

		                   ]
            })
        ],
         buttons:[{
                text:'Save',
                formBind: true,
                // Function that fires when user clicks the button
                handler:function(){
                	currencies.push(CurrFields.getValue());
                	if(ValidFromField.getValue()!='')
                	{
                 				vF=ValidFromField.getValue().format('d-M-Y');
                 				dates.push(ValidFromField.getValue().format('Y-m-d'));
                	}
                 	else
                 	{
                 				vF='';
                 				dates.push('3000-01-01');
                 	}

//                 			if(ValidToField.getValue()!='')
//                 				vT=ValidToField.getValue().format('d-M-Y');
//                 			else
//                 				vT='';
					if(ImcField_Client.isValid() && ImcField_Com.isValid() && PuplicField_Comp.isValid() && InternationalField.isValid() && PuplicField_Client.isValid() && ValidFromField.isValid() && CurrFields.isValid())
					{
                	var record = new Ext.data.Record({
						    	  priceImcCompany:		 	 ImcField_Com.getValue(),
						    	  priceImcClient:		 	 ImcField_Client.getValue(),
								  priceValidFrom:   		 vF,
								  priceInternational:        InternationalField.getValue(),
								  pricePublicCompany:        PuplicField_Comp.getValue(),
								  pricePublicClient:		 PuplicField_Client.getValue(),
								  currency:					 CurrFields.getValue()
						    });
						    Pds.add(record);
						    AddPriceWindow.hide(); }
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
            	handler:function(){AddPriceWindow.hide();}
            	}
           ]

    });
  AddPriceWindow= new Ext.Window({
      id: 'AddPriceWindow',
      title: 'Add new Price',
      closable:false,
      width: 440,
      height: 400,
      plain:true,
      layout: 'fit',
      items: fs
    });

 //////////////********display edit form functions********************/////////////////

   // reset the Form before opening it
  function resetPriceForm(){
    ImcField_Client.setValue(0);
    PuplicField_Client.setValue(0);
    ImcField_Com.setValue(0);
    PuplicField_Comp.setValue(0);
    InternationalField.setValue(0);
    CurrFields.reset();
   // PuplicField.setValue(0);
    ValidFromField.reset();
  }

  // check if the form is valid
  function isPriceFormValid(){
  return(ImcField_Client.isValid() && ImcField_Com.isValid() && PuplicField_Comp.isValid() && InternationalField.isValid() && PuplicField_Client.isValid() && ValidFromField.isValid());
  }

  // display or bring forth the form
  function displayFormWindow(){
  if(!AddPriceWindow.isVisible()){
    resetPriceForm();
    AddPriceWindow.show();
  } else {
    AddPriceWindow.toFront();
  }


  }



 /*---------------------------------------------------------------------------*/
//var viewport = new Ext.Viewport({
     //       layout:'border',
  //          items:[
  var pan= new Ext.TabPanel({
                    region:'center',
                    height:495,
                  //width:980,
                  buttonAlign:'center',
        			renderTo: 'binding-example',
                    deferredRender:false,
                    activeTab:0,
                    items:[simple,price],        buttons:[{
                text:'Save',
                formBind: true,
                // Function that fires when user clicks the button
                handler:function(){ //alert(TargetedP.getValue());
                var imcComp=[];
                var imcClient=[];
                var international=[];
                var publicsComp=[];
                var publicsClient=[];
                var validTo=[];
                var validFrom=[];
                var vF='3000-01-01';
    			var vT='3000-01-01';
    			var cur=[];
            //    alert(imc.length);
                	for(i=0;i<Pds.getCount();i++)
                	{
                		var PriceRec = Pds.getAt(i);

                		imcComp.push(PriceRec.get('priceImcCompany'));
                		imcClient.push(PriceRec.get('priceImcClient'));
                		international.push(PriceRec.get('priceInternational'));
                		publicsComp.push(PriceRec.get('pricePublicCompany'));
                		publicsClient.push(PriceRec.get('pricePublicClient'));
//                			vF=PriceRec.get('priceValidFrom');
//                			if(vF=='')
//                				vF='3000-01-01';
//
//                		validFrom.push(vF);
//                		validTo.push(vT);
                		cur.push(PriceRec.get('currency'));
                	}
                	if(CourseCodeField.isValid() &&
                		CourseAppField.isValid() &&
                		CourseNameEngField.isValid() &&
                		CourseNameArField.isValid() &&
                		CourseDaysField.isValid() &&
                		CourseTypeField.isValid() &&
                		CourseTAField.isValid()&&
                		CourseColorField.isValid())
                		{
                    	      Ext.Ajax.request({
        						waitMsg: 'Please wait...',
        						url: '../listCProperties.do',
								params: {
								  task: "AddCourse",
								  imcCompany:			   imcComp,
								  imcClient:		   	   imcClient,
								  length:			       international.length,
								  international:	       international,
								  publicsCompany:		   publicsComp,
								  publicsClient:		   publicsClient,
								  validFrom:			   dates,
								  courseNameAr:        CourseNameArField.getValue() ,
								  courseNameEng:       CourseNameEngField.getValue(),
								  courseType:	       CourseTypeField.getValue(),
								  trainarea:           CourseTAField.getValue(),
								  courseCode:	       CourseCodeField.getValue(),
								  courseDays:	       CourseDaysField.getValue(),
								  courseColor:	       CourseColorField.getValue(),
								  courseCompetenceAddressed:   CourseDescField.getValue(),
								  courseOutlineAr:	   uploadOutlineArField.getValue(),
								  courseOutlineEng:	   uploadOutlineEngField.getValue(),
								  audienceName:  	   TargetedP.getValue(),
								  resource:				ResourcesField.getValue(),
								  courseApp:			CourseAppField.getValue(),
								  currency:				currencies
								},
						        method:'POST',
						        success: function(response){
		                      simple.getForm().submit({

	                    url: '../upload.do?task='+'outline',
	                    waitMsg: 'Uploading your Files...',

	                    success: function(fp, o){
	                        msg('Success', 'Processed your files on the server');
	                      	//addTab();
	                    var redirect = '../pages/cources.jsp';
			 			window.location = redirect;


	                    },

 						failure: function(response){
						        	//////console.log("faaaaaaaaaail");
						        		var errorMsg='Error uploading files!';

                			Ext.Msg.show({
							         title: 'Error',
							        msg: errorMsg,
							        minWidth: 200,
							        modal: true,
							        icon: Ext.Msg.ERROR,
							        buttons: Ext.Msg.OK
								 });

	                      	//addTab();
	                    var redirect = '../pages/cources.jsp';
			 			window.location = redirect;


						       }
                   }

                 );

						        },
						        failure: function(response){
						        	//////console.log("faaaaaaaaaail");
						        	simple.getForm().reset();
						       }
						      });
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
            },
            	{text:'Cancel',
            	handler:function(){window.location='cources.jsp';}
            	}
           ]});


//]});
function stcCallBack1001(record, opts, success) {
//if (success)
//// do whatever
//alert("the sucess ");
//// alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
//////console.log("  LOOOOOOOOOOOOOOD ");

};
//loadtest=   ds.load({callback :  stcCallBack1001});
    simple.render(document.body);


});