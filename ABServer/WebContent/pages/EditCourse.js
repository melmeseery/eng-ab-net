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

	var Course  = Ext.data.Record.create([
      {name: 'courseNameEng', type: 'string'},
      {name: 'courseNameAr', type: 'string'},
      {name: 'courseOutlineEng', type: 'string'},
      {name: 'courseOutlineAr', type: 'string'},
      {name: 'courseType', type: 'string'},
      {name: 'trainArea',type:'string'},
      {name: 'idCourses', type: 'int'},
      {name: 'courseDays', type: 'int'},
      {name: 'courseCode', type: 'string'},
      {name: 'courseApp', type: 'string'},
      {name: 'courseColor',type:'string'},
      {name: 'idTrainingArea',type:'int'},
      {name: 'idResources',type:'int'},
      {name: 'resourceName', type: 'string'},
      {name: 'courseCompetenceAddressed', type: 'string'},
      {name: 'idCourseCompetenceAddressed',type:'int'}

     ]);

	 var Cds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "data"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Course",           // The repeated element which contains row information
   		id: "idCourses"
        },Course
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

 // Rds.load();


/*------------------------------------------------------------------------------*/

Cds.load();
var idResources;
var idTrainingArea;
var courseC;
var c;
var idCompetencesAdd;
var Aroutline="../files/outlines_files/";
var Engoutline="../files/outlines_files/";
Cds.on('load', function(){//////console.log(Cds.getAt(0));
//alert(Cds.getAt(0));
var courseRec = Cds.getAt(0);
CourseNameArField.setValue(courseRec.get('courseNameAr'));
CourseNameEngField.setValue(courseRec.get('courseNameEng'));
CourseTypeField.setValue(courseRec.get('courseType'));
if(courseRec.get('courseType')=='Group')
	price.disable();
CourseTAField.setValue(courseRec.get('trainArea'));
idTrainingArea=courseRec.get('idTrainingArea');
Aroutline+=courseRec.get('courseOutlineAr');
if(Aroutline == '')
	AroutLink.setVisible(false);
else
	AroutLink.setVisible(true);
Engoutline+=courseRec.get('courseOutlineEng');
if(Engoutline == '')
	EngoutLink.setVisible(false);
else
	EngoutLink.setVisible(true);
//uploadOutlineEngField.setValue(courseRec.get('courseOutlineEng'));
//uploadOutlineArField.setValue(courseRec.get('courseOutlineAr'));
CourseDaysField.setValue(courseRec.get('courseDays'));
CourseCodeField.setValue(courseRec.get('courseCode'));
CourseColorField.setValue(courseRec.get('courseColor'));
CourseAppField.setValue(courseRec.get('courseApp'));
courseC=courseRec.get('courseColor');
c=courseRec.get('courseColor');
//alert('c= '+c);
CourseDescField.setValue(courseRec.get('courseCompetenceAddressed'));
idCompetencesAdd=courseRec.get('idCourseCompetenceAddressed');
//alert(courseRec.get('courseCompetenceAddressed'));
//alert(courseRec.get('idCourseCompetenceAddressed'));
if(courseRec.get('resourceName')!='')
{
ResourcesField.setValue(courseRec.get('resourceName'));
idResources=courseRec.get('idResources');
//alert(courseRec.get('idResources'));
checkField.setValue('No');
}
else
{
	checkField.setValue('Yes');
	ResourcesField.disable();
}
//alert(idCompetencesAdd);
EngoutLink.setText('<font size=2><a href="'+Engoutline+'" target="_blank">Open/Download English Outline</a></font>',false);
AroutLink.setText('<font size=2><a href="'+Aroutline+'" target="_blank">Open/Download Arabic Outline</a></font>',false);
//jQuery(function($)
//	        {
//	            $("#picker1").attachColorPicker(c);
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


    var ds=[['Individual','Individual'],['Group','Group'],['Both','Both']];
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listCProperties.do',
     	method: 'POST',
        headers:{'request-type':'ajax' }
      });

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
      	{header: "IMC Rate @ Company Premises", width: 180, sortable: true, locked:false, dataIndex: 'priceImcCompany'},
        {header: "IMC Rate @ Client Premises", width: 160, sortable: true, locked:false, dataIndex: 'priceImcClient'},
        {header: "Local Rate @ Company Premises", width: 180, sortable: true, dataIndex: 'pricePublicCompany'},
        {header: "Local Rate @ Client Premises", width: 160, sortable: true, dataIndex: 'pricePublicClient'},
        {header: "International Rate", width: 150, sortable: true, dataIndex: 'priceInternational'},
		{header: "Valid From", width: 150, sortable: true, dataIndex: 'priceValidFrom'},
        {header: "Currency", width: 150, sortable: true, dataIndex: 'currency'}
    ]);



    var myGrid = new Ext.grid.GridPanel({
        ds: Pds,
        cm: colModel,
        stripeRows: true,
        height:470,
      //  width:400,
        title:'Prices',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Price ',
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
		EImcField_Client.setValue(seldata.priceImcClient);
		EImcField_Com.setValue(seldata.priceImcCompany);
		EInternationalField.setValue(seldata.priceInternational);
		EPuplicField_Client.setValue(seldata.pricePublicClient);
		EPuplicField_Comp.setValue(seldata.pricePublicCompany);
		EValidFromField.setValue(seldata.priceValidFrom);
		//EValidToField.setValue(seldata.priceValidTo);
		ECurrFields.setValue(seldata.currency);

});
Pds.load();
 var valid;
    Pds.on('load', function(){//alert(ds.getCount());
    	for(var i=0;i<Pds.getCount();i++)
    	{
    		var Rec = Pds.getAt(i);
    		//alert(Rec.get('priceGroupValid'))
    		if(Rec.get('priceValid')==true)
    		{
    			valid=Rec.get('idPrices');
    			//alert('valid= '+Rec.get('priceGroupValid'));
    		}
    	}
    });
 Pds.on('add', function(){
	Pds.reload();
myGrid.getView().refresh();
  });

    /////////////////////////////////////////////////////////////////////
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
       baseParams:{task: "listTA"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({

       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Audiencetypes"},           // The repeated element which contains row information
   		[{name: 'audienceName', type: 'string'},{name: 'idAudienceTypes', type: 'int'}]

        )
      });

  TPds.load();
  dataProxy = new Ext.data.HttpProxy({
     	url: '../listCourses.do',
     	method: 'POST',
        headers:{'request-type':'ajax' }
      });
  var selectedAudDS = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "listselectedAud"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({

       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Audiencetypes"},           // The repeated element which contains row information
   		[{name: 'audienceName', type: 'string'},{name: 'idAudienceTypes', type: 'int'}]

        )
      });

  selectedAudDS.load();
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
					    editable: false,
					    allowBlank: false,
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
					    selectOnFocus:true,
					    listeners: {
						     select: function (combo, record, index) {

						    	idTrainingArea = this.getValue();
						     }}
		    });


      var CourseDaysField = new Ext.form.TextField({
		    id: 'courseDays',
		    fieldLabel: 'Course Duration <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:250,
		    allowNegative: false,
		    allowBlank: false,
		 //   anchor : '95%'
		    maskRe: /([0-9\s]+)$/
		      });

	  var CourseCodeField = new Ext.form.TextField({
		    id: 'courseCode',
		    fieldLabel: 'Course Code <html><font color=red> *</font></html>',
		   // maxLength: 4,
		    width:250,
		  //  maxLength: 4,
		    allowNegative: false,
		    allowBlank: false,
		  //  anchor : '95%'
		   maskRe: /([a-zA-Z0-9\s]+)$/
		      });
	 var CourseAppField = new Ext.form.TextField({
		    id: 'courseApp',
		    fieldLabel: 'Course Abbreviation <html><font color=red> *</font></html>',
		    width:250,
		    maxLength: 5,
		   // allowNegative: false,
		    allowBlank: false,
		  //  anchor : '95%'
		   maskRe: /([a-zA-Z0-9\s]+)$/
		      });
 var CourseColorField = new Ext.ux.form.ColorPickerField ({
 	fieldLabel: 'Course Color Legend <html><font color=red> *</font></html>',
	id: 'color',
	allowBlank: false,
	name: 'color',
   value: '123456',
//	disable:true
//	allowBlank: false
 });



//	 var CourseColorField =new Ext.form.TextField({
//	fieldLabel: 'Course Color Legend <html><font color=red> *</font></html>',
//	id: 'picker1',
//	allowBlank: false,
//	width:250,
////	disable:true
////	allowBlank: false
//});


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
					    selectOnFocus:true,
					    listeners: {
						     select: function (combo, record, index) {

						    	idResources = this.getValue();
						     }}
		    });
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
					    selectOnFocus:true,
					    listeners: {
						     select: function (combo, record, index) {

						    	idCompetencesAdd = this.getValue();
						     }}
		    });
     	var uploadOutlineArField = new Ext.form.TextField({
      		fieldLabel: 'Arabic Outline',
      		width:250,
    		inputType: 'file'

     		});
       var uploadOutlineEngField = new Ext.form.TextField({
      		fieldLabel: 'English Outline',
      		width:250,
    		inputType: 'file'

     		});
    var EngoutLink = new Ext.form.Label({html:'<font size=2><a href="../files/outlines_files/"'+Engoutline+'" target="_blank">Open/Download English Outline</a></font>'});
	var AroutLink = new Ext.form.Label({html:'<font size=2><a href="../files/outlines_files/"'+Aroutline+'" target="_blank">Open/Download Arabic Outline</a></font>'});
	EngoutLink.setVisible(false);
	AroutLink.setVisible(false);
	 var tab=new Ext.TabPanel({
                    region:'center',
                    deferredRender:false,
                    activeTab:0,
                    items:[myGrid]});

     var price=new Ext.FormPanel({

                title:'Prices',
                defaults: {width: 1230},
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

    var TargetedParticipants = new Ext.ux.ItemSelector({

            name:"itemselector",
          //  iconCls: 'demo-ct',

           // title:"Targeted Participants",
            title:"Targeted Participants",

            frame: true,
            dataFields:["idAudienceTypes", "audienceName"],
            toStore: selectedAudDS,
			valueField:"idAudienceTypes",
            displayField:"audienceName",
			fromStore: TPds,
            msWidth:400,
            msHeight:400,
            imagePath:"../JSP/images/",
            toLegend:"Selected",
            fromLegend:"Available",

            toTBar:[{
                text:"Clear",
                handler:function(){

				//	var i=simple.getForm().findField("itemselector");
                 //   i.reset.call(i);

                    for(var index=0; index<selectedAudDS.getCount(); index++) {
						TPds.add(selectedAudDS.getAt(index));
					}
					selectedAudDS.removeAll();

                }
            }]
 });
    /*=================================================================*/
   var simple = new Ext.FormPanel({
    	fileUpload: true,
        labelAlign: 'left',
        title: 'Edit Course',
        bodyStyle:'padding:5px',
     //   width: 600,
        frame: true,
   		autoHeight : true,
    	autoScroll : true,
   		layout:'table',
   		layoutConfig: {columns:2},
        labelWidth: 150,
        defaultType: 'fieldset',
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
                		CourseNameArField,
                		CourseNameEngField,
                		CourseDaysField,
                		CourseColorField,
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
                items: [uploadOutlineArField]},
                {width:100,layout: 'form',
                items: [AroutLink]}
		                   ]
            }),    new Ext.form.FieldSet({
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
                items: [uploadOutlineEngField]},
                {width:100,layout: 'form',
                items: [EngoutLink]}
		                   ]
            })


                		//uploadOutlineArField,
                		//uploadOutlineEngField
        		 		]
        }),new Ext.form.FieldSet({
             //   title: 'Course Details',
                labelWidth: 150,
            hideBorders : true,
          //  title:'Contract Info',
          border:false,
            width: 600,	// Default config options for child items
            defaultType: 'grid',
            height: 397,
            bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
           // border: false,
            style: {
                "margin-left": "10px", // when you add custom margin in IE 6...
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
            },
                items: [CourseTypeField,
                		CourseTAField,
                		CourseDescField,
                		checkField,
                ResourcesField

                		]

         })]



    });
 // ////console.log("ana henaaaa")

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
					    width:200,
					    triggerAction: 'all',
					    emptyText:'Select Currency ...',
					    selectOnFocus:true
		    });

 var ImcField_Com = new Ext.form.NumberField({
      		fieldLabel: 'IMC Funded Rate <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:200,
    		id:'priceImc_comp',
    	//	maskRe: /([0-9\s]+)$/
     		});
   var ImcField_Client = new Ext.form.NumberField({
      		fieldLabel: 'IMC Funded Rate <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:200,
    		id:'priceImc_client',
    	//	maskRe: /([0-9\s]+)$/
     		});
     var InternationalField = new Ext.form.NumberField({
      		fieldLabel: 'International Rate <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:200,
    		id:'priceInternational',
    	//	maskRe: /([0-9\s]+)$/
     		});
     var PuplicField_Comp = new Ext.form.NumberField({
		    id: 'pricePulic_comp',
		    fieldLabel: 'Local Common Rate <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:200,
		//    allowNegative: false,
		    allowBlank: false,
		 //   maskRe: /([0-9\s]+)$/
		      });
	 var PuplicField_Client = new Ext.form.NumberField({
		    id: 'pricePulic_client',
		    fieldLabel: 'Local Common Rate <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:200,
		//    allowNegative: false,
		    allowBlank: false,
		 //   maskRe: /([0-9\s]+)$/
		      });
	 var ValidFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1930-01-01',
                width:100,
                id:'priceValidFrom',
                allowBlank: false,
                vtype: 'daterange',
              //  disabledDays: [5, 6],
             //   endDateField:'priceValidTo'
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
                handler:AddPriceForm
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

  /////////////////adding price function/////////////////////
  function AddPriceForm(){
  var vF='3000-01-01';
  var vT='3000-01-01';

  if(ValidFromField.getValue()!='')
  {
  	vF=ValidFromField.getValue().format('Y-m-d');
  }
  if(ValidToField.getValue()!='')
  {
  	vT=ValidToField.getValue().format('Y-m-d');
  }
   if(ImcField_Client.isValid() && ImcField_Com.isValid() && PuplicField_Comp.isValid() && InternationalField.isValid() && PuplicField_Client.isValid() && ValidFromField.isValid() && CurrFields.isValid()){
      Ext.Ajax.request({
        waitMsg: 'Please wait...',
        url: '../listCProperties.do',
        params: {
          task: "AddPrice",
          priceImcCompany:		 	 ImcField_Com.getValue(),
		  priceImcClient:		 	 ImcField_Client.getValue(),
		  priceValidFrom:   		 vF,
		  priceInternational:        InternationalField.getValue(),
		  pricePublicCompany:        PuplicField_Comp.getValue(),
		  pricePublicClient:		 PuplicField_Client.getValue(),
		  currency:					 CurrFields.getValue()
        },
        method:'POST',
        success: function(response){
			if(ValidFromField.getValue()!='')
                 				vF=ValidFromField.getValue().format('d-M-Y');
                 			else
                 				vF='';


			 var record = new Ext.data.Record({
						    	  priceImcCompany:		 	 ImcField_Com.getValue(),
		  						  priceImcClient:		 	 ImcField_Client.getValue(),
		  						  priceValidFrom:   		 vF,
		  						  priceInternational:        InternationalField.getValue(),
		  						  pricePublicCompany:        PuplicField_Comp.getValue(),
		  						  pricePublicClient:		 PuplicField_Client.getValue(),
		  						  currency:					 CurrFields.getValue()
						    });
						    Pds.reload();
						    AddPriceWindow.hide();

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

///////////////////////////////////////////////////////////////////////////////////
  /*------------------------------------edit price-----------------------------*/
      var ECurrFields = new Ext.form.ComboBox({
                       store: Currds,
                       id: 'Ecurrency',
					    fieldLabel: 'Currency <html><font color=red> *</font></html>',
					    displayField:'currency',
					    typeAhead: true,
					    editable: false,
					    allowBlank: false,
					    width:200,
					    triggerAction: 'all',
					    emptyText:'Select Currency ...',
					    selectOnFocus:true
		    });

 var EImcField_Com = new Ext.form.NumberField({
      		fieldLabel: 'IMC Funded Rate <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:200,
    		id:'EpriceImc_comp',
    	//	maskRe: /([0-9\s]+)$/
     		});
   var EImcField_Client = new Ext.form.NumberField({
      		fieldLabel: 'IMC Funded Rate <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:200,
    		id:'EpriceImc_client',
    	//	maskRe: /([0-9\s]+)$/
     		});
     var EInternationalField = new Ext.form.NumberField({
      		fieldLabel: 'International Rate <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:200,
    		id:'EpriceInternational',
    	//	maskRe: /([0-9\s]+)$/
     		});
     var EPuplicField_Comp = new Ext.form.NumberField({
		    id: 'EpricePulic_comp',
		    fieldLabel: 'Local Common Rate <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:200,
		//    allowNegative: false,
		    allowBlank: false,
		 //   maskRe: /([0-9\s]+)$/
		      });
	 var EPuplicField_Client = new Ext.form.NumberField({
		    id: 'EpricePulic_client',
		    fieldLabel: 'Local Common Rate <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:200,
		//    allowNegative: false,
		    allowBlank: false,
		 //   maskRe: /([0-9\s]+)$/
		      });
	 var EValidFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:200,
                allowBlank: false,
                id:'EpriceValidFrom',
                vtype: 'daterange',
            //    disabledDays: [5, 6],
             //   endDateField:'priceValidTo'
            });

      //////////////************adding form****************/////////////////
   var valid=1;
   // var flag=true;
var Efs = new Ext.FormPanel({
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
                items:[EImcField_Com,EPuplicField_Comp]}),
                new Ext.form.FieldSet({
                title: '@ Client Premises',
                autoHeight: true,
                defaultType: 'textfield',
                items:[EImcField_Client,EPuplicField_Client]}),
					   EInternationalField,
					   ECurrFields,
					   EValidFromField

		                   ]
            })
        ],
         buttons:[{
                text:'Save',
                formBind: true,
                // Function that fires when user clicks the button
                handler:EditPriceForm
            },{text:'Cancel',
            	handler:function(){EditPriceWindow.hide();}
            	}
           ]

    });
  EditPriceWindow= new Ext.Window({
      id: 'EditPriceWindow',
      title: 'Edit Price',
      closable:false,
      width: 440,
      height: 400,
      plain:true,
      layout: 'fit',
      items: Efs
    });

 //////////////********display edit form functions********************/////////////////

   // reset the Form before opening it
  function resetEPriceForm(){
    EImcField_Client.setValue(0);
    EPuplicField_Client.setValue(0);
    EImcField_Com.setValue(0);
    EPuplicField_Comp.setValue(0);
    EInternationalField.setValue(0);
   // PuplicField.setValue(0);
    EValidFromField.reset();
    ECurrFields.reset();
  }

  // check if the form is valid
   function isEPriceFormValid(){
  return(EImcField_Client.isValid() && EImcField_Com.isValid() && EPuplicField_Comp.isValid() && EInternationalField.isValid() && EPuplicField_Client.isValid() && EValidFromField.isValid());
  }

  // display or bring forth the form
  function displayEFormWindow(){
  if(!EditPriceWindow.isVisible()){
    resetEPriceForm();
    EditPriceWindow.show();
  } else {
    EditPriceWindow.toFront();
  }


  }

  /////////////////adding price function/////////////////////
  function EditPriceForm(){

   if(EImcField_Client.isValid() && EImcField_Com.isValid() && EPuplicField_Comp.isValid() && EInternationalField.isValid() && EPuplicField_Client.isValid() && EValidFromField.isValid() && ECurrFields.isValid()){
   	var EvF='3000-01-01';
   var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
          if(EValidFromField.getValue()!='')
                 EvF=EValidFromField.getValue().format('Y-m-d');


      Ext.Ajax.request({
        waitMsg: 'Please wait...',
        url: '../listCProperties.do',
        params: {
          task: "EditPrice",
          id:selections[0].id,
          priceImcCompany:		 	 EImcField_Com.getValue(),
		  priceImcClient:		 	 EImcField_Client.getValue(),
		  priceValidFrom:   		 EvF,
		  priceInternational:        EInternationalField.getValue(),
		  pricePublicCompany:        EPuplicField_Comp.getValue(),
		  pricePublicClient:		 EPuplicField_Client.getValue(),
		  currency:					 ECurrFields.getValue()
        },
        method:'POST',
        success: function(response){


						    Pds.reload();
						    EditPriceWindow.hide();

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

//////////////////////////////////////////////////////////////////////////////////////

var pan= new Ext.TabPanel({
                    region:'center',
                     height:495,
                           /* width:980,*/
        			renderTo: 'binding-example',
                    deferredRender:false,
                    buttonAlign:'center',
                    activeTab:0,
                    items:[simple,TargetedParticipants,price],
                    buttons:[{
                text:'Save',
                formBind: true,
                // Function that fires when user clicks the button
                handler:function(){// alert(idCompetencesAdd);
                var selectedTA = [];
					  for(i = 0; i< selectedAudDS.getCount(); i++){
					    selectedTA.push(selectedAudDS.getAt(i).get('idAudienceTypes'));
					  }
					//  alert(idCompetencesAdd);
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
								  task: "EditCourse",
								  courseNameAr:        CourseNameArField.getValue() ,
								  courseNameEng:       CourseNameEngField.getValue(),
								  courseType:	       CourseTypeField.getValue(),
								  trainarea:           idTrainingArea,
								  courseCode:	       CourseCodeField.getValue(),
								  courseDays:	       CourseDaysField.getValue(),
								  courseColor:	       CourseColorField.getValue(),
								  courseOutlineAr:	   uploadOutlineArField.getValue(),
								  courseOutlineEng:	   uploadOutlineEngField.getValue(),
								  courseApp:			CourseAppField.getValue(),
								  courseCompetenceAddressed:   idCompetencesAdd,
								  audienceName:		selectedTA,
								  resourceName:		ResourcesField.getValue(),
								  idResources:		idResources,
								  len:				selectedTA.length
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


	                    }
                   }

                 );
						        },
						        failure: function(response){////console.log("faaaaaaaaaail");
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
            },{text:'Cancel',
            	handler:function(){window.location='cources.jsp';}
            	}
           ] });
 ////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idPrices);
  }


  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Do you want to delete this Price?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Prices?', deleteCourses);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected huh?');
    }
  }

  function deleteCourses(btn){
    if(btn=='yes'){
         var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
         if(selections[i].id != valid)
          		selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
        else
        	Ext.MessageBox.alert('error','You can not delete the valid price');
         }
        if(selectedCourse.length != 0)
        {
         Ext.Ajax.request({
            waitMsg: 'Please Wait',
            url: '../listCProperties.do?',
            params: {
               task: "DELETEPRICE",
               ids:  selectedCourse
              }, method:'POST',
            success: function(response){
              var result=1;
              switch(result){
              case 1:  // Success : simply reload
                Pds.reload();
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

//function stcCallBack1001(record, opts, success) {
//if (success)
//// do whatever
//alert("the sucess ");
// alert (" number of records "+Cds.getCount() +"  recourd "+Cds.getAt(0)) ;
//////console.log("  LOOOOOOOOOOOOOOD ");

//};
//loadtest=   Cds.load({callback :  stcCallBack1001});


    simple.render(document.body);
});