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
    var dispUpd = function(picker) {
      var ad = picker.activeDate;
      picker.activeDate = null;
      picker.update(ad);
    };
    
    if (field.ValidFromField) {
      var sd = Ext.getCmp(field.ValidFromField);
      sd.maxValue = date;
      if (sd.menu && sd.menu.picker) {
        sd.menu.picker.maxDate = date;
        dispUpd(sd.menu.picker);
      }
    } else if (field.ValidToField) {
      var ed = Ext.getCmp(field.ValidToField);
      ed.minValue = date;
      if (ed.menu && ed.menu.picker) {
        ed.menu.picker.minDate = date;
        dispUpd(ed.menu.picker);
      }
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
    
var Trainingareas  = Ext.data.Record.create([
      {name: 'trainingAreaCode', type: 'string'},
      {name: 'idTrainingAreas', type: 'int'},
      {name: 'trainingAreaName', type: 'string'}
     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listTraingAreas.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var tds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "listT"},    
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Trainingareas",           // The repeated element which contains row information
   		id: "idTrainingAreas"
        },Trainingareas
        )
      });
  tds.load();
var Tname;
tds.on('load', function(){//////console.log(Cds.getAt(0));
//alert(Cds.getAt(0));
var TARec = tds.getAt(0);
AreaNameField.setValue(TARec.get('trainingAreaName'));
Tname=TARec.get('trainingAreaName');
AreaCodeField.setValue(TARec.get('trainingAreaCode'));

});
  
   var Course  = Ext.data.Record.create([
      {name: 'courseNameEng', type: 'string'},
      {name: 'courseNameAr', type: 'string'},
      {name: 'courseOutlineEng', type: 'string'},
      {name: 'courseOutlineAr', type: 'string'},
      {name: 'courseType', type: 'string'},
      {name: 'courseCode', type:'string'},
      {name: 'trainArea',type:'string'},
      {name: 'idCourses', type: 'int'},
      {name: 'courseDays', type: 'int'}

     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listTraingAreas.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "listC"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Course",           // The repeated element which contains row information
   		id: "idCourses"
        },Course
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
        {header: "Course Code", width: 100, sortable: true, locked:false, dataIndex: 'courseCode'},
        {header: "Course Name", width: 100, sortable: true, locked:false, dataIndex: 'courseNameEng'}, 
        {header: "Course Type", width: 100, sortable: true, dataIndex: 'courseType'},
        {header: "Course Days", width: 85, sortable: true, dataIndex: 'courseDays'}
    ]);

 ds.on('add', function(){
	ds.reload();
//myGrid.getView().refresh();
   });

 	var x=1;
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
        autoScroll:true,
        height:320,
        width:600,
        title:'Courses',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Course',
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

	var typeDs=[['Group','Group'],['Individual','Individual'],['Both','Both']];
	
	 myGrid.on("rowdblclick", function(myGrid) {
	var sel = myGrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;

		displayEFormWindow();
		ECourseNameEngField.setValue(seldata.courseNameEng);
		ECourseTypeField.setValue(seldata.courseType);
		ECourseCodeField.setValue(seldata.courseCode);
		ECourseDaysField.setValue(seldata.courseDays);
		
});
    /////////////////////////////////////////////////////////////////////
 
  /**---------------------------------------Add form------------------------------------------*/  
       var CourseNameEngField = new Ext.form.TextField({
      		fieldLabel: 'Course Name <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220,
    		id:'courseNameEng',
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
     		
     var CourseTypeField = new Ext.form.ComboBox({
                       store: typeDs,
                       id: 'courseType',
					    fieldLabel: 'Course Type <html><font color=red> *</font></html>',
					    displayField:'courseTypeName',
					    typeAhead: true,
					    width:220,
					    editable: false,
					    allowBlank: false,
					    triggerAction: 'all',
					    emptyText:'Select a Type...',
					    selectOnFocus:true
		    });	
	 var CourseDaysField = new Ext.form.TextField({
		    id: 'courseDays',
		    fieldLabel: 'Course Days <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:220,
		    allowNegative: false,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
		 //   anchor : '95%'    
		   
		      });
		      
	  var CourseCodeField = new Ext.form.TextField({
		    id: 'courseCode',
		    fieldLabel: 'Course Code <html><font color=red> *</font></html>',
	//	    maxLength: 20,
		    width:220,
		    allowNegative: false,
		    allowBlank: false,
		  //  anchor : '95%'    
		   maskRe: /([a-zA-Z0-9\s]+)$/
		      });
 
 
   
  
 
    //////////////************adding form****************/////////////////
  //  var valid='Salary';
 //   var flag=true;
    var fs = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 90,
        width:340,
        autoScroll:true,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [ CourseNameEngField,
					   CourseCodeField,
					   CourseTypeField,
					   CourseDaysField
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:addCourse 
            },{text:'Cancel',
            	handler:function(){AddCourseWindow.hide();}
            	}
           ] 
  
    });
  AddCourseWindow= new Ext.Window({
      id: 'AddCourseWindow',
      title: 'Adding Course to Training Area',
      closable:false,
      width: 400,
      height: 230,
      plain:true,
      layout: 'fit',
      items: fs
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetCourseForm(){
    CourseNameEngField.reset();
    CourseCodeField.reset();
    CourseDaysField.reset();
   CourseTypeField.reset();
  }
  
  // check if the form is valid
  function isCourseFormValid(){
  return(CourseNameEngField.isValid() && CourseCodeField.isValid() && CourseTypeField.isValid() && CourseDaysField.isValid());
  }
  
  // display or bring forth the form
  function displayFormWindow(){
  if(!AddCourseWindow.isVisible()){
    resetCourseForm();
    AddCourseWindow.show();
  } else {
    AddCourseWindow.toFront();
  }
  
  
  }
  
    /////////////////adding course function/////////////////////
  function addCourse(){
  
   if(CourseNameEngField.isValid() && CourseCodeField.isValid() && CourseTypeField.isValid() && CourseDaysField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listTraingAreas.do',
        params: {
        task: "AddCourse",
        courseNameEng:     CourseNameEngField.getValue(),
		courseType:	       CourseTypeField.getValue(),
		courseCode:	       CourseCodeField.getValue(),
		courseDays:	       CourseDaysField.getValue()
								       },
        method:'POST', 
        success: function(response){        
			var record = new Ext.data.Record({
						    	  courseNameEng:       CourseNameEngField.getValue(),
								  courseType:	       CourseTypeField.getValue(),
								  courseCode:	       CourseCodeField.getValue(),
								  courseDays:	       CourseDaysField.getValue()
								  
						    });  
						    ds.add(record);  
						    AddCourseWindow.hide(); 
              
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
   
    /////////////////////////////////////////////////////////////////////
    
   /**---------------------------------------edit form------------------------------------------*/  
       var ECourseNameEngField = new Ext.form.TextField({
      		fieldLabel: 'Course Name <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220,
    	//	id:'courseNameEng',
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
     		
     var ECourseTypeField = new Ext.form.ComboBox({
                       store: typeDs,
          //             id: 'courseType',
					    fieldLabel: 'Course Type <html><font color=red> *</font></html>',
					    displayField:'courseTypeName',
					    typeAhead: true,
					    width:220,
					    editable: false,
					    allowBlank: false,
					    triggerAction: 'all',
					    emptyText:'Select a Type...',
					    selectOnFocus:true
		    });	
	 var ECourseDaysField = new Ext.form.TextField({
		  //  id: 'courseDays',
		    fieldLabel: 'Course Days <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:220,
		    allowNegative: false,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
		 //   anchor : '95%'    
		   
		      });
		      
	  var ECourseCodeField = new Ext.form.TextField({
		   // id: 'courseCode',
		    fieldLabel: 'Course Code <html><font color=red> *</font></html>',
		 //   maxLength: 20,
		    width:220,
		    allowNegative: false,
		    allowBlank: false,
		  //  anchor : '95%'    
		   maskRe: /([a-zA-Z0-9\s]+)$/
		      });
 
 
   
  
 
    //////////////************adding form****************/////////////////
  //  var valid='Salary';
 //   var flag=true;
    var Efs = new Ext.FormPanel({
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
                items: [ ECourseNameEngField,
					   ECourseCodeField,
					   ECourseTypeField,
					   ECourseDaysField
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:editCourse 
            },{text:'Cancel',
            	handler:function(){EditCourseWindow.hide();}
            	}
           ] 
  
    });
  EditCourseWindow= new Ext.Window({
      id: 'ditCourseWindow',
      title: 'Edit Course Details',
      closable:false,
      width: 400,
      height: 230,
      plain:true,
      layout: 'fit',
      items: Efs
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetECourseForm(){
    ECourseNameEngField.reset();
    ECourseCodeField.reset();
    ECourseDaysField.reset();
    ECourseTypeField.reset();
  }
  
  // check if the form is valid
  function isECourseFormValid(){
  return(ECourseNameEngField.isValid() && ECourseCodeField.isValid() && ECourseDaysField.isValid());
  }
  
  // display or bring forth the form
  function displayEFormWindow(){
  if(!EditCourseWindow.isVisible()){
    resetECourseForm();
    EditCourseWindow.show();
  } else {
    EditCourseWindow.toFront();
  }
  
  
  }
  
    /////////////////adding course function/////////////////////
  function editCourse(){
  
   if(ECourseNameEngField.isValid() && ECourseCodeField.isValid() && ECourseTypeField.isValid() && ECourseDaysField.isValid()){
   	var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listTraingAreas.do',
        params: {
        task: "EditCourse",
        id:selections[0].id,
        courseNameEng:     ECourseNameEngField.getValue(),
		courseType:	       ECourseTypeField.getValue(),
		courseCode:	       ECourseCodeField.getValue(),
		courseDays:	       ECourseDaysField.getValue()
								       },
        method:'POST', 
        success: function(response){        
			
						    ds.reload();  
						    EditCourseWindow.hide(); 
              
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
     * ================  Simple form  =======================
     */
    bd.createChild({tag: 'h2', html: ''});
    
    /*======================== Form Fields=========================*/
    
  var AreaNameField;
  var AreaCodeField;
 
  AreaNameField = new Ext.form.TextField({
    id: 'trainingAreaName',
    fieldLabel: 'Training Area Name <html><font color=red> *</font></html>',
 //   maxLength: 100,
    width: 200,
    allowBlank: false,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  AreaCodeField = new Ext.form.TextField({
    id: 'TrainingAreaCode',
    fieldLabel: 'Training Area Code <html><font color=red> *</font></html>',
     width: 200,
  //  maxLength: 100,
 //   allowNegative: false,
    allowBlank: false,
 //   anchor : '95%'    
  //  maskRe: /([0-9\s]+)$/
      });
  
 
    /*=================================================================*/
    var simple = new Ext.FormPanel({
        labelWidth: 150, // label settings here cascade unless overridden
     //   url:'../listCProperties',
        frame:true,
        title: 'Edit Training Area',
        bodyStyle:'padding:5px 5px 0',
        width: 600,
        buttonAlign:'center',
        defaults: {width: 541},
        defaultType: 'textfield',

        items: [ new Ext.form.FieldSet({
             autoHeight: true,
             title:"Training Area Details",
                defaultType: 'textfield',
                items:[
        		   AreaNameField,
        		   AreaCodeField, myGrid] }),
        		  
        		]
    });
//  ////console.log("ana henaaaa")  
  
var pan= new Ext.TabPanel({
                    region:'center',
                     height:495, 
                           /* width:980,*/
        			renderTo: 'binding-example',
                    deferredRender:false,
                    activeTab:0,
                    buttonAlign:'center',
                    items:[simple],

        buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){ 
                	if(AreaNameField.isValid() && AreaCodeField.isValid())
                	{
                    simple.getForm().submit( 
                    	      Ext.Ajax.request({   
        						waitMsg: 'Please wait...',
        						url: '../listTraingAreas.do',
								params: {
								  task: "editTA",
								  trainingAreaName:		        		AreaNameField.getValue(),
								  trainingAreaCode:				        AreaCodeField.getValue()
								},
						        method:'POST', 
						        success: function(response){ ////console.log("success");//alert(valid);
						        		 var redirect = 'trainarea.jsp'; 
		                        window.location = redirect;
      
						        },
						        failure: function(response){////console.log("faaaaaaaaaail");//alert(ValidFromField.getValue().format('Y-m-d'));
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
            	handler:function(){window.location='trainarea.jsp';}
            	}
           ]});
           
/********************************************************************/
 
  ////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idCourses);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Do you not like that Course at all?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Courses?', deleteCourses);
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
       //  alert(Tname);
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../listTraingAreas.do', 
            params: { 
               task: "DELETE", 
               Tname:Tname, 
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
//alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
////console.log("  LOOOOOOOOOOOOOOD ");

};
loadtest=   ds.load({callback :  stcCallBack1001});
  simple.render(document.body);

   
});