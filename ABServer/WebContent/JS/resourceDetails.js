//Dates Validation
Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.maxValue = date;
            //start.validate();
            this.dateRangeMax = date;
        } 
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.minValue = date;
          //  end.validate();
            this.dateRangeMin = date;
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
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


Ext.onReady(function() {

    Ext.QuickTips.init();

    // turn on validation errors beside the field globally
    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();
    
    var resourceid = '';
	var resourceName = '';
 
    var Resource  = Ext.data.Record.create([
                                        
        {name: 'resourceId', type: 'int'},                                  
      {name: 'resourceName', type: 'string'},
	  {name: 'resourceLastName', type: 'string'},
	  {name: 'resNationality', type: 'string'},
	  {name: 'birthdate', type: 'string'},
	  {name: 'firstmobilNum', type: 'string'},
	  {name: 'secmobilNum', type: 'string'},
	  {name: 'resFirstTel', type: 'string'},
	  {name: 'resSecTel', type: 'string'},
	  {name: 'resFirstEmail', type: 'string'},
	  {name: 'resSecEmail', type: 'string'},
	  {name: 'resFax', type: 'string'},
	  {name: 'resourceAbb', type: 'string'},
	  {name: 'resourceType', type: 'string'},
	  {name: 'seniority', type: 'string'},
	  {name: 'resourceHiegherDegree', type: 'string'},
	  {name: 'resAddress', type: 'string'}, 
	  {name: 'resCity', type: 'string'},
	  {name: 'gender', type: 'int'},
	  {name: 'country', type: 'string'},
	  {name: 'idNumber', type: 'string'},
	  {name: 'taxId', type: 'string'},     
	  {name: 'taxDestrict', type: 'string'},
	  {name: 'taxPayment', type: 'string'},
	  {name: 'resourcePhotoName', type: 'string'},
	  {name: 'lastCVUpdate', type: 'string'},
	  {name: 'cvLink', type: 'string'},
	  {name: 'briefLink', type: 'string'},
	  {name: 'idPhotoLink', type: 'string'},
	  {name: 'taxFileNum', type: 'string'},
	  {name: 'foreignCountry', type: 'string'},
	  {name: 'companyCVLink', type: 'string'},
      {name: 'contractingStatus', type: 'string'},
      {name: 'resColor', type: 'string'},
      {name: 'age', type: 'int'}
        

       ]); 
    dataProxy = new Ext.data.HttpProxy({
     	url: '../ResourcesAction.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });


    var resourceDS = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task:'retreiveResource'},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results",// The element which contains the total dataset size (optional)
   		record: "Resource",
   		id: "resourceId"
        },Resource
        )
      });
      
   //     //console.log("befor load");
      
    resourceDS.load();
    
    resourceDS.on('load', function(){
  		var resourceRec = resourceDS.getAt(0);
  		
  		
  		
  		resourceid = resourceRec.get('resourceId');
  		resourcetype = resourceRec.get('resourceType');
  		
  		if(resourceRec.get('resColor') != '')
  		ColorField.setValue(resourceRec.get('resColor'));
  		
  		resourceName = resourceRec.get('resourceName')+' '+resourceRec.get('resourceLastName');
  		  		
  		if(resourcetype == 1){
  			consultingManDayFeeRadio.enable();
  			consultingManDayPercentageRadio.enable();
  			consultingManDayFeeField.enable();
  			CurrFields.enable();
  			consultingManDayPercentageField.enable();

			trainingManDayRateField.disable();
			trainingCurrFields.disable();		
  		}
  		else if(resourcetype == 2){
  			consultingManDayFeeRadio.disable();
  			consultingManDayPercentageRadio.disable();
  			consultingManDayFeeField.disable();
  			CurrFields.disable();
  			consultingManDayPercentageField.disable();

			trainingManDayRateField.enable();
			trainingCurrFields.enable();		
  		}
  		else if(resourcetype == 3){
  			
  			consultingManDayFeeRadio.enable();
  			consultingManDayPercentageRadio.enable();
  			consultingManDayFeeField.enable();
  			CurrFields.enable();
  			consultingManDayPercentageField.enable();

			trainingManDayRateField.enable();
			trainingCurrFields.enable();
  			
  		}
  		 Courses_ds.load({params:{task:'remainCoursesByResourceId',res_id: resourceid}});
  		tabs.getTopToolbar().add('<DIV style="color:'+"black"+'"><h4>Details Of: '+resourceName+'</h4></DIV>');
  		
  		jQuery(function($)
	        {
	            $("#picker1").attachColorPicker(resourceRec.get('resColor'));
	            $("#picker1").change(function() {$("#picker1").getValue();
	            flag = true;
//	            for(var i=0;i<col.getCount();i++)
//	            {
//	            	var colorRec = col.getAt(i);
//	            	if(ColorField.getValue()==colorRec.get('resourceColor'))
//	            	{
//	            		Ext.MessageBox.alert('Warning', 'The color is selected before, please select another color');
//	            		ColorField.reset();
//	            		flag = false;
//	            		break;
//	            	}
//	            }
	            if(flag == true){
	            	
	            	Ext.Ajax.request({  
			            waitMsg: 'Please Wait',
			            url: '../ResourcesAction.do',
			        	params: {
			          		task: "editResourceColor",
			               color:  ColorField.getValue(),
			               resId :resourceid
			              }, 
			            method:'POST',
			            success: function(response){
			
			                
			            
			            },
			            failure: function(response){
			              var result=response.responseText;
			              Ext.MessageBox.alert('error','could not connect to the database. retry later');      
			              }
		         });
	            	
	            }
	            });
	            
	        });
  		
  		
       addTabs();
      });
    
    
var retreivingDataProxy = new Ext.data.HttpProxy({
     	url: '../GeneralRetreivingAction.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
  });


  var Courses_ds = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
    //   baseParams:{task: "remainCoursesByResourceId"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Course",
   		id:'courseId'},        // The repeated element which contains row information
   		[{name: 'courseId', type: 'int'},{name: 'courseName', type: 'string'}]
        
        )
      });

 
 
 var resource_Courses_ds = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
     //  baseParams:{task: "coursesByResourceId"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Course", 
   		id:'courseId'},          // The repeated element which contains row information
   		[{name: 'courseId', type: 'int'},{name: 'courseName', type: 'string'},{name: 'resourceAbility', type: 'int'}]
        
        )
      });
 //resource_Courses_ds.load();
 
 
 var resource_future_Courses_ds = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
     //  baseParams:{task: "coursesByResourceId"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Course",
   		id:'courseId'},           // The repeated element which contains row information
   		[{name: 'courseId', type: 'int'},{name: 'courseName', type: 'string'},{name: 'resourceAbility', type: 'int'}]
        
        )
      });

 

 
 
 ////////////////////////////////////add course cababilities///////////////////////////////////////////
 
  
  /**---------------------------------------Add form------------------------------------------*/  
       var CourseNameEngField = new Ext.form.TextField({
      		fieldLabel: 'Course Name',
      		allowBlank: false,
      		width:220,
    		id:'courseNameEng',
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});


 var Tds = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
       baseParams:{task: "trainingAreas"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "TrainingArea"},           // The repeated element which contains row information
   		[{name: 'trainingAreaName', type: 'string'},{name: 'trainingAreaId', type: 'int'}]
        
        )
      });
     		
  var CourseTAField = new Ext.form.ComboBox({
                       store: Tds,
                       id: 'trainArea',
					    fieldLabel: 'Course Training Area',
					    displayField:'trainingAreaName',
					    valueField:'trainingAreaId',
					    typeAhead: true,
					    editable: false,
					    width:250,
					    triggerAction: 'all',
					    emptyText:'Select Training Area...',
					    selectOnFocus:true
		    });   			
     var typeDs=[['Group','Group'],['Individual','Individual'],['Both','Both']];		
     var CourseTypeField = new Ext.form.ComboBox({
                       store: typeDs,
                       id: 'courseType',
					    fieldLabel: 'Course Type',
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
		    fieldLabel: 'Course Days',
		//    maxLength: 20,
		    width:220,
		    allowNegative: false,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
		 //   anchor : '95%'    
		   
		      });
		      
	  var CourseCodeField = new Ext.form.TextField({
		    id: 'courseCode',
		    fieldLabel: 'Course Code',
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
                items: [ CourseTAField,CourseNameEngField,
					   CourseCodeField,
					   CourseTypeField,
					   CourseDaysField
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                iconCls:'save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:addNewCourse 
            },{text:'Cancel',
            	handler:function(){AddNewCourseWindow.hide();}
            	}
           ] 
  
    });
  AddNewCourseWindow= new Ext.Window({
      id: 'AddNewCourseWindow',
      title: 'Adding Course to Training Area',
      closable:true,
      width: 400,
      height: 270,
      plain:true,
      layout: 'fit',
      items: fs
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetCourseForm(){
    CourseNameEngField.reset();
    CourseTAField.reset();
    CourseCodeField.reset();
    CourseTypeField.reset();
    CourseDaysField.reset();
   
  }
  
  // check if the form is valid
  function isCourseFormValid(){
  return(CourseNameEngField.isValid() && CourseCodeField.isValid() && CourseDaysField.isValid() && CourseTAField.isValid());
  }
  
  // display or bring forth the form
  function displayNewCourseWindow(){
  if(!AddNewCourseWindow.isVisible()){
    resetCourseForm();
    AddNewCourseWindow.show();
  } else {
    AddNewCourseWindow.toFront();
  }
  
  
  }
     /////////////////adding course function/////////////////////
  function addNewCourse(){
  
   if(isCourseFormValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listTraingAreas.do',
        params: {
        task: "AddCourse",
        courseNameEng:     CourseNameEngField.getValue(),
        TAID:		       CourseTAField.getValue(),
		courseType:	       CourseTypeField.getValue(),
		courseCode:	       CourseCodeField.getValue(),
		courseDays:	       CourseDaysField.getValue()
								       },
        method:'POST', 
        success: function(response){ 

				Courses_ds.load({params:{task:'remainCoursesByResourceId',res_id: resourceid}}); 
		 
				   //console.log('data store modified records = '+Courses_ds.getModifiedRecords());    
			
            AddNewCourseWindow.hide();
        },
        failure: function(response){
          var result=response.responseText;
          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
        }                      
      });
    } else {
      Ext.MessageBox.alert('Warning', 'Your Form is not valid!');
    }
  
  
  }
 /////////////////////////////////////////////////////////////////////////////////////////
 
 var allCourses=new Ext.ux.Multiselect({
    
     fieldLabel:"All Courses",
            name:"multiselect1",
            dataFields:["courseId", "courseName"], 
            valueField:"courseId",
            displayField:"courseName",
            width:250,
            height:370,
            autoScroll:true,
            store:Courses_ds
            
            ,
            tbar:[{
                text:"Add Course",
                handler:function(){
	                displayNewCourseWindow();

	            },
            iconCls:'add'
            },{
                text:"Reset",
                handler:function(){
                //	loadAllDS = true;
	                Courses_ds.load({params:{task:'remainCoursesByResourceId',res_id: resourceid}});

	            }
            }]
    });
    
    
    
    
    var currentCourses=new Ext.ux.Multiselect({
    
     fieldLabel:"Resource Courses",
            name:"multiselect2",
            dataFields:["courseId", "courseName"], 
            valueField:"courseId",
            displayField:"courseName",
            width:250,
            height:175,
           // allowBlank:false,
            store:resource_Courses_ds
            ,
            tbar:[{
                text:"Save",
                iconCls:'save',
                handler:function(){
                    // add resource cources to database
                	var selectedCourses = [];
					  for(i = 0; i< resource_Courses_ds.getCount(); i++){
					    selectedCourses.push(resource_Courses_ds.getAt(i).get('courseId'));
					  }
                	
                	  Ext.Ajax.request({   
	        			waitMsg: 'Please wait...',
	        			url: '../ResourcesAction.do',	
	        			
	        			params: {
	          				task: "addCourseToResource",
	          				resId:resourceid,
	          				ability:1,
	          				resourceCourses: selectedCourses
	        			},
	        			method:'POST', 
	        			success: function(response){
	        			
	              
	                    },
	        			failure: function(response){
	          				var result=response.responseText;
	          				Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
	        			}                      
	      			});

	            }
            }]
            
    }); 
    
     var futureCourses=new Ext.ux.Multiselect({
    
     fieldLabel:"Resource Future Courses",
            name:"multiselect3",
            dataFields:["courseId", "courseName"], 
            valueField:"courseId",
            displayField:"courseName",
            width:250,
            height:175,
           // allowBlank:false,
            store:resource_future_Courses_ds
             ,
            tbar:[{
                text:"Save",
                iconCls:'save',
                handler:function(){
                  // add resource future cources to database
                	var selectedFutureCourses = [];
					  for(i = 0; i< resource_future_Courses_ds.getCount(); i++){
					    selectedFutureCourses.push(resource_future_Courses_ds.getAt(i).get('courseId'));
					  }
                	
                	  Ext.Ajax.request({   
	        			waitMsg: 'Please wait...',
	        			url: '../ResourcesAction.do',	
	        			
	        			params: {
	          				task: "addCourseToResource",
	          				resId:resourceid,
	          				ability:0,
	          				resourceCourses: selectedFutureCourses
	        			},
	        			method:'POST', 
	        			success: function(response){
	        			
	              
	                    },
	        			failure: function(response){
	          				var result=response.responseText;
	          				Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
	        			}                      
	      			});
                	

	            }
            }]
           
    }); 
    
   
   	var addCourse = new Ext.Button({
		text: 'Add Course',
		minWidth:100,
		
		cls:"x-btn-text-icon",
        icon:'../images/icons/forward.gif',
		handler:function(){
			
			  //console.log(addTrainingCapabilitiesform.getForm().findField("multiselect1").getValue());
			
			resource_Courses_ds.add(Courses_ds.getById(addTrainingCapabilitiesform.getForm().findField("multiselect1").getValue()));
			Courses_ds.remove(Courses_ds.getById(addTrainingCapabilitiesform.getForm().findField("multiselect1").getValue()));
		}

		});
   
   
   var removeCourse = new Ext.Button({
		text: 'Remove Course',
		minWidth:100,
		
		cls:"x-btn-text-icon",
        icon:'../images/icons/backward.gif',
		handler:function(){
			
			  //console.log(addTrainingCapabilitiesform.getForm().findField("multiselect1").getValue());
			
			Courses_ds.add(resource_Courses_ds.getById(addTrainingCapabilitiesform.getForm().findField("multiselect2").getValue()));
			resource_Courses_ds.remove(resource_Courses_ds.getById(addTrainingCapabilitiesform.getForm().findField("multiselect2").getValue()));
		}

		});
		
		
		var addFutureCourse = new Ext.Button({
		text: 'Add Course',
		minWidth:100,
		
		cls:"x-btn-text-icon",
        icon:'../images/icons/forward.gif',
		handler:function(){
			
			  //console.log(addTrainingCapabilitiesform.getForm().findField("multiselect1").getValue());
			
			resource_future_Courses_ds.add(Courses_ds.getById(addTrainingCapabilitiesform.getForm().findField("multiselect1").getValue()));
			Courses_ds.remove(Courses_ds.getById(addTrainingCapabilitiesform.getForm().findField("multiselect1").getValue()));
		}

		});
   
   
   var removeFutureCourse = new Ext.Button({
		text: 'Remove Course',
		minWidth:100,
		
		cls:"x-btn-text-icon",
        icon:'../images/icons/backward.gif',
		handler:function(){
			
			  //console.log(addTrainingCapabilitiesform.getForm().findField("multiselect1").getValue());
			
			Courses_ds.add(resource_future_Courses_ds.getById(addTrainingCapabilitiesform.getForm().findField("multiselect3").getValue()));
			resource_future_Courses_ds.remove(resource_future_Courses_ds.getById(addTrainingCapabilitiesform.getForm().findField("multiselect3").getValue()));
		}

		});
   
   
     
 var addTrainingCapabilitiesform = new Ext.form.FormPanel({
        
        
        labelAlign: 'left',
        labelWidth: 75,
        frame: true,
    autoWidth : true, 
    autoHeight : true,
   
    	title:'Training Capabilities',
    	//defaultType: 'fieldset',
		layout:'table',
    defaults: {
        // applied to each contained panel
        bodyStyle:'padding:20px'
    },
    layoutConfig: {
        // The total column count must be specified here
        columns: 3
    },
    items: [{
    	layout:'form',
        items: allCourses,
        rowspan: 4
    },{
        items: addCourse

    },{
        layout:'form',
        items: currentCourses,
        rowspan: 2
    },{
        items: removeCourse

    },{
        items: addFutureCourse
    },{
        layout:'form',
        items: futureCourses,
        rowspan: 2
    },{
        items: removeFutureCourse
    }]
    
    });
 //////////////////////////////////////////////////////////////////////////////////////////////////
 
 var col = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "colors"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Resource"},           // The repeated element which contains row information
   		[{name: 'resourceColor', type: 'string'}]
        
        )
      });
   
    col.on('load', function(){
  //	alert('????????');
  	

});
 
 var ColorField =new Ext.form.TextField({
	fieldLabel: 'Color',
	id: 'picker1',
	width:300
});    
 
  var resourceColorform = new Ext.form.FormPanel({
        
        
    labelAlign: 'left',
    labelWidth: 75,
    frame: true,
    autoWidth : true, 
    height : 400,
   
    title:'Resource Color',
    items: [
    
    ColorField
    ]
    
    });
 
 
 /////////////////////////////////////////////////////////////////////////////////////////////////
 var Resourcefiles  = Ext.data.Record.create([
      {name: 'resourceFileLocation', type: 'string'},
      {name: 'resourceFileName', type: 'string'},
      {name: 'resourceFileType', type: 'string'},
      {name: 'resourceFileUploadDate', type: 'string'},
      {name: 'resourceFileValid', type: 'string'},
      {name: 'courseName', type: 'string'},
      {name: 'idResourceFiles',type:'int'}

     ]);
 

    var ds = new Ext.data.GroupingStore({
       // load using HTTP
      proxy: dataProxy,
      groupField:'courseName',
      sortInfo:{field: 'courseName', direction: "ASC"},
     //  baseParams:{task: "list"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Resourcefiles",           // The repeated element which contains row information
   		id: "idResourceFiles"
        },Resourcefiles
        )
      });


    // the DefaultColumnModel expects this blob to define columns. It can be extended to provide
    // custom or reusable ColumnModels
      var colModel = new Ext.grid.ColumnModel([
      {id:'idResourceFiles',header: "Course Name", width: 250, sortable: true, dataIndex: 'courseName'},
        {header: "Handout Name", width: 250, sortable: true, renderer:renderTopic, dataIndex: 'resourceFileName'},
		{header: "Handout UploadDate", width: 300, sortable: true, dataIndex: 'resourceFileUploadDate'}
       ]);


function renderTopic(value, p, record){
 	if(record.get('resourceFileLocation')!='')
 	{
 		  //console.log(record.get('resourceFileLocation'));
	 	var s=record.get('resourceFileLocation');
	 	var link= '<b><a href="'+s+'" target="_blank">{0}</a></b>'
	        return String.format(
	                link,value);
	 	}
	 else
	 {
	 	return(value);
	 }
    }


    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
        colspan:2,
        autoExpandColumn: 'resourceFileUploadDate',
      
      	 height: 400,
         autoHeight: false,
        
         border: true,
         region: 'center',
         autoScroll: true,
		view: new Ext.grid.GroupingView({
            forceFit:true,
            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
        }),
        width:680,
        title:'Courses Handouts',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Handout(s)',
             iconCls:'add',
            handler: function(){
            	handoutsDs.removeAll();
            	displayCourseWindow();
            	}
             }),new Ext.Toolbar.Button({
              text: 'Delete Selection',
              iconCls:'remove',
              handler:confirmDeleteCourseHandout
              })]
              

		    ,
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });
//////////////////////////////////////delete handout from courses grid//////////////////////////////////////////////////////////

 
 //confirm delete function 
  function confirmDeleteCourseHandout(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this Course Handout?', deleteCourseHandout);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Delete those Course Handout(s)?', deleteCourseHandout);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected');
    }
  }
  
  function deleteCourseHandout(btn){
    if(btn=='yes'){
         var selections = myGrid.getSelections();
         var selectedCourseHandout = [];
         for(i = 0; i< selections.length; i++){
          selectedCourseHandout.push(selections[i].get('idResourceFiles'));
        //	contractPriceValue = contractTotalPrice.getValue()-selections[i].get('courseTotalPrice');
   	
         }
        
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../ResourcesAction.do',
        	params: {
          		task: "deleteResourceHandout",
               courseHandoutIds:  selectedCourseHandout
              }, 
            method:'POST',
            success: function(response){

                ds.load({params:{task:'resourceHandouts',res_id: resourceid}});
            
            },
            failure: function(response){
              var result=response.responseText;
              Ext.MessageBox.alert('error','could not connect to the database. retry later');      
              }
         });
       
      }  
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 
    var handoutsDs = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
    //   baseParams:{task: "listHistory"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		
   		record: "Resourcefiles",           // The repeated element which contains row information
   		id: "idResourceFiles"
        },Resourcefiles
        )
      });
  


    // the DefaultColumnModel expects this blob to define columns. It can be extended to provide
    // custom or reusable ColumnModels
      var colModel = new Ext.grid.ColumnModel([
        {header: "Handout", width: 150, sortable: true, dataIndex: 'resourceFileName'},
        {header: "Date", width: 150, sortable: true, dataIndex: 'resourceFileUploadDate'}
		
    ]);

 
    var handoutsGrid = new Ext.grid.GridPanel({
        ds: handoutsDs,
        cm: colModel,
        stripeRows: true,
        height:200,
        width:300,
        title:'Handouts',
        tbar: [new Ext.Toolbar.Button({
             text: 'Upload Handout',
             iconCls:'upload',
            handler: displayFormWindow
             }),new Ext.Toolbar.Button({
              text: 'Delete Selection',
              iconCls:'remove',
              handler: deleteHandouts
              })
              ],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });
/////////////////////////////delete handout////////////////////////////////////////

  
  function deleteHandouts(){
    
         var selections = handoutsGrid.getSelections();
         var selectedHandout = [];
         for(i = 0; i< selections.length; i++){
          handoutsGrid.getStore().remove(selections[i]);
       
   	
         }
       
  }
/////////////////////////////////////////////////////////////////////////////////////

    
  /**---------------------------------------Add form------------------------------------------*/  
    
 var CourseDescField = new Ext.form.TextField({
      		fieldLabel: 'Handout Description',
      		allowBlank: false,
    		id: 'courseDescription',
    		width:200,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
   var uploadHandoutField = new Ext.form.TextField({
      		fieldLabel: 'Handout File',
      		width:200,
    		inputType: 'file'

     		});
 
 
   
  var fullDate;
 
 //////////////************adding form****************/////////////////

    var addHandoutForm = new Ext.FormPanel({
        frame: true,
        fileUpload: true,
        labelWidth: 100,
        width:340,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
                title: 'Handout Details',
                autoHeight: true,
                defaultType: 'textfield',
                items: [
					   CourseDescField,uploadHandoutField
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                iconCls:'save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){
                	  addHandoutForm.getForm().submit({
	                	
	                    url: '../upload.do?task='+'ADDHANDOUT',
	                    waitMsg: 'Uploading your Files...',
	                   
	                    success: function(fp, o){
	                       AddHandout();
	                        
	                        
	                    }
                   }
	              
                 );
                	
                	
                	}
            },{text:'Cancel',
            	handler:function(){AddTAWindow.hide();}
            	}
           ] 
  
    });
  AddTAWindow= new Ext.Window({
      id: 'AddTAWindow',
      title: 'Add Course Handout',
      closable:true,
      width: 400,
      height: 200,
      plain:true,
      layout: 'fit',
      items: addHandoutForm
    });
function resetHandoutForm(){
	uploadHandoutField.reset();
	CourseDescField.reset();
}		    
function displayFormWindow(){
  if(!AddTAWindow.isVisible()){
    resetHandoutForm();
    AddTAWindow.show();
  } else {
    AddTAWindow.toFront();
  }
  
  
  }		  

var CoursesField = new Ext.form.ComboBox({
                       store: resource_Courses_ds,
                       id: 'courseName',
					    fieldLabel: 'Course Name',
					    displayField:'courseName',
					    valueField:'courseId',
					    typeAhead: true,
					    editable: false,
					    mode:'local',
					    width:200,
					    triggerAction: 'all',
					    emptyText:'Select Course...',
					    selectOnFocus:true
					    
		    }); 
 	    
    /*=================================================================*/
    var addCoursePanel = new Ext.FormPanel({
        labelWidth: 150, // label settings here cascade unless overridden
     //   url:'../listCProperties',
        frame:true,
     //   title: 'Add Course',
        bodyStyle:'padding:5px 5px 0',
        width: 500,
         
        defaults: {width: 400},
        defaultType: 'textfield',
		height:400,
        items: [  new Ext.form.FieldSet({
             autoHeight: true,
             title:"Courses",
                defaultType: 'textfield',
                items:[
        		   CoursesField]}),
        		   handoutsGrid
        		] ,
        		
        		buttons:[{ 
                text:'Save',
                iconCls:'save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){
                	
                	
                var files=[];
                var names=[];
                	for(i=0;i<handoutsDs.getCount();i++)
                	{
                		var fileRec = handoutsDs.getAt(i);
                		
                		files.push(fileRec.get('resourceFileLocation'));
                		names.push(fileRec.get('resourceFileName'));
                	}
                    	      Ext.Ajax.request({   
        						waitMsg: 'Please wait...',
        						url: '../ResourcesAction.do',
        						
								params: {
								  task: "AddHandoutToResource",
								  courseId:CoursesField.getValue(),
								  resId:resourceid,
								  uploadDate:(new Date()).format('Y-m-d'),
								  names:names,
								  files:files,
								  ability:'1'
								  },
						        method:'POST', 
						        success: function(response){ 
						        	ds.load({params:{task:'resourceHandouts',res_id: resourceid}});
	                     			//AddCourseWindow.hide();
						
      
						        },
						        failure: function(response){  //console.log("faaaaaaaaaail");
						        	addCoursePanel.getForm().reset(); 
						       }                      
						      }); 
               AddCourseWindow.hide();
                	}
                	
                
            },{text:'Cancel',
            	handler:function(){AddCourseWindow.hide();
            	
                	}
       			}]   
            });

      AddCourseWindow= new Ext.Window({
      id: 'AddCourseWindow',
      title: 'Course Handout(s)',
      closable:true,
      width: 480,
      height: 400,
      plain:true,
      layout: 'fit',
      items: addCoursePanel
    });
   
   function resetCourseForm(){
	addCoursePanel.getForm().reset(); 
	handoutsGrid.getStore().removeAll();
}
     
  function displayCourseWindow(){
  	resource_Courses_ds.filter('resourceAbility',1);
  if(!AddCourseWindow.isVisible()){
    resetCourseForm();
    AddCourseWindow.show();
  } else {
    AddCourseWindow.toFront();
  }
  
  
  }	   
      
 function AddHandout(){
 
    				 var d=new Date();//alert(d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate());
	                       
			 		var d1=d.getMonth();
			 		if(d1<10)
			 			d1='0'+d1;
			 		
			 		var d2=d.getDate();
			 		if(d2<10)
			 			d2='0'+d2	
			 			
			 		fullDate=d.getFullYear()+'-'+d1+'-'+d2;	
			 		 var record = new Ext.data.Record({
						    	  resourceFileLocation:			uploadHandoutField.getValue(),
						    	  resourceFileName:         CourseDescField.getValue(),
								  resourceFileUploadDate:   fullDate
								  
								  
						    });  
						    handoutsDs.add(record);
	                  		AddTAWindow.hide();      
	                        
	                    }      
   




/////////////////////////////////////////////////////////////////////////////////////////////////////////

 
 var consultingDS = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
    //  baseParams:{task: "remainConsultingAreas"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // The element which contains the total dataset size (optional)
   		record: "ConsultingArea"
        },[{name: 'consultingAreaId', type: 'int'},{name: 'consultingAreaName', type: 'string'}]
        )
      });

 var selectedConsultingDS = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
   //   baseParams:{task: "consultingAreasByResourceId"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // The element which contains the total dataset size (optional)
   		record: "ConsultingArea"
        },[{name: 'consultingAreaId', type: 'int'},{name: 'consultingAreaName', type: 'string'}]
        )
      });
 

 var consultingItemSelect = new Ext.ux.ItemSelector({
           
            name:"itemselector",
          //  iconCls: 'demo-ct',
            
            title:"Consulting Capabilities",
            frame: true,
            dataFields:["consultingAreaId", "consultingAreaName"],
            toStore: selectedConsultingDS,
			valueField:"consultingAreaId",
            displayField:"consultingAreaName",
			fromStore: consultingDS,
            msWidth:400,
            msHeight:400,
            imagePath:"images/",
            toLegend:"Selected",
            fromLegend:"Available",
         
            toTBar:[{
                text:"Clear",
                handler:function(){

					for(var index=0; index<selectedConsultingDS.getCount(); index++) {
						consultingDS.add(selectedConsultingDS.getAt(index));
					}
					selectedConsultingDS.removeAll();
                   
                }
            },{
                text:"Save",
                iconCls:'save',
                handler:function(){
                   // add consulting areas to database
                	var selectedConsultingAreas = [];
					  for(i = 0; i< selectedConsultingDS.getCount(); i++){
					    selectedConsultingAreas.push(selectedConsultingDS.getAt(i).get('consultingAreaId'));
					  }
                	
                	  Ext.Ajax.request({   
	        			waitMsg: 'Please wait...',
	        			url: '../ResourcesAction.do',	
	        			
	        			params: {
	          				task: "addConsultingAreaToResource",
	          				resId: resourceid,
	          				selectedconsultingareas: selectedConsultingAreas
	        			},
	        			method:'POST', 
	        			success: function(response){
	        			
	              
	                        
	                        
	                    },
	        			failure: function(response){
	          				var result=response.responseText;
	          				Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
	        			}                      
	      			});
                	
                }
            }]
        } );
 

                
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
 
//  var certificatesDataProxy = new Ext.data.HttpProxy({
//  	
//  	url: '../listResourceCertificates.do',
//     	method: 'POST', 
//        headers:{'request-type':'ajax' }
//     
//      });
  
  var sm2 = new Ext.grid.CheckboxSelectionModel();
  
  
    var certificatesGrid = new Ext.grid.GridPanel({
       title:'Certificates',
        store: new Ext.data.Store({
             // load using HTTP
      		proxy: dataProxy,
    		//baseParams:{task: "resourceCertificates"},
     		 // the return will be XML, so lets set up a reader
      		reader: new Ext.data.XmlReader({
      			totalRecords: "results",
       		// The element which contains the total dataset size (optional)
   			record: "Resourcefiles",           // The repeated element which contains row information
   			id: "idResourceFiles"
        	},Resourcefiles
        	)
        }),
        cm: new Ext.grid.ColumnModel([
            sm2,
            {id:'idResourceFiles',header: "Certification Name", width: 300, sortable: true, renderer:renderTopic, dataIndex: 'resourceFileName'},
         
            {header: "Upload Date", width: 280, sortable: true, dataIndex: 'resourceFileUploadDate'}
        ]),
        sm: sm2,

        viewConfig: {
            forceFit:true
        },

        // inline toolbars
        tbar:[{
            text:'Add Certificate',
            tooltip:'Add a new Certificate',
            iconCls:'add',
            handler: displayCertificationWindow
        },'-',{
            text:'Remove Certificate(s)',
            tooltip:'Remove the selected Certificate(s)',
            iconCls:'remove',
            handler: confirmDeleteCertificate
        }],

        width:600,
        height: 400,
        frame:true
     
    });
//////////////////////////////////////delete Certificate//////////////////////////////////////////////////////////

 
 //confirm delete function 
  function confirmDeleteCertificate(){
    if(certificatesGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this Certificate?', deleteCertificate);
    } else if(certificatesGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Delete those Resource Certificate(s)?', deleteCertificate);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected');
    }
  }
  
  function deleteCertificate(btn){
    if(btn=='yes'){
         var selections = certificatesGrid.getSelections();
         var selectedCertificate = [];
         for(i = 0; i< selections.length; i++){
          selectedCertificate.push(selections[i].get('idResourceFiles'));
        //	contractPriceValue = contractTotalPrice.getValue()-selections[i].get('courseTotalPrice');
   	
         }
        
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../ResourcesAction.do',
        	params: {
          		task: "deleteResourceCertificate",
               certificateIds:  selectedCertificate
              }, 
            method:'POST',
            success: function(response){
             
             
                certificatesGrid.getStore().load({params:{task:'resourceCertificates',res_id: resourceid}});
				
              
            },
            failure: function(response){
              var result=response.responseText;
              Ext.MessageBox.alert('error','could not connect to the database. retry later');      
              }
         });
       
      }  
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
 var certificateNameField = new Ext.form.TextField({
      		fieldLabel: 'Certification Name',
      		allowBlank: false,
    		id: 'ResourceFileName',
    		width:200,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
   var uploadCertificationField = new Ext.form.TextField({
      		fieldLabel: 'Certification Photo Copy',
      		width:200,
    		inputType: 'file'

     		});

var addCertificateForm = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        fileUpload: true,
        labelWidth: 100,
        width:340,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
                title: 'Handout Details',
                autoHeight: true,
                defaultType: 'textfield',
                items: [
					   certificateNameField,uploadCertificationField
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                iconCls:'save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){
                	
                	 addCertificateForm.getForm().submit({
	                	
	                    url: '../upload.do?task=ADDCERTIFICATE',
	                    waitMsg: 'Uploading your Files...',
	                   
	                    success: function(fp, o){
	                    	AddCertification();
	                      //  msg('Success', 'Processed your files on the server');
	                       
	                    }
                   }
	              
                 );
                	
                }
            },{text:'Cancel',
            	handler:function(){AddCertificationWindow.hide();}
            	}
           ] 
  
    });
  AddCertificationWindow= new Ext.Window({
      id: 'AddCertificationWindow',
      title: 'Adding a Certification',
      closable:true,
      width: 400,
      height: 200,
      plain:true,
      layout: 'fit',
      items: addCertificateForm
    });
function resetCertificationForm(){
	uploadCertificationField.reset();
	certificateNameField.reset();
}		    
function displayCertificationWindow(){
  if(!AddCertificationWindow.isVisible()){
    resetCertificationForm();
    AddCertificationWindow.show();
  } else {
    AddCertificationWindow.toFront();
  }
  
  
  }		  
  
  
  function AddCertification(){
  	
  	
  	
  	
  	 Ext.Ajax.request({   
			waitMsg: 'Please wait...',
			url: '../ResourcesAction.do',
			
			params: {
			  task: "AddResourceCertificate",
			  resId:resourceid,
			  uploadDate:(new Date()).format('Y-m-d'),
			  resourceFileName:			certificateNameField.getValue(),
	    	  resourceFileLocation:     uploadCertificationField.getValue()
			  },
	        method:'POST', 
	        success: function(response){ 
	        	certificatesGrid.getStore().load({params:{task:'resourceCertificates',res_id: resourceid}});
     			
			 },
			failure: function(response){  //console.log("faaaaaaaaaail");
	        	
	       }                      
	      });  
		    
      	AddCertificationWindow.hide();   
  	      
  	
  };
        
                
////////////////////////////////////////////////////////////////////////////////////////////////////////////////                
 
  var sm3 = new Ext.grid.CheckboxSelectionModel();
  
  var holidayDS = new Ext.data.Store({
             // load using HTTP
      		proxy: dataProxy,
    	//	baseParams:{task: "resourceHolidays"},
     		 // the return will be XML, so lets set up a reader
      		reader: new Ext.data.XmlReader({
       		// The element which contains the total dataset size (optional)
   			record: "ResourceHoliday"
        	},[{name: 'holidayId', type: 'int'},{name: 'HolidayName', type: 'string'},{name: 'fromDate', type: 'string'},{name: 'toDate', type: 'string'}]
        	)
        });

  
    var holidaysGrid = new Ext.grid.GridPanel({
       title:'Resource Availability',
        store: holidayDS,
        cm: new Ext.grid.ColumnModel([
            sm3,
            {header: "From", width: 250, sortable: true, dataIndex: 'fromDate'},
            {header: "To", width: 250, sortable: true, dataIndex: 'toDate'},
            {id:'HolidayName',header: "Vacation Comment", width: 300, sortable: true, dataIndex: 'HolidayName'}
        ]),
        sm: sm3,

        viewConfig: {
            forceFit:true
        },

        // inline toolbars
        tbar:[{
            text:'Add Holiday',
            tooltip:'Add a new Holiday',
            iconCls:'add',
            handler: displayHolidayWindow
        },'-',{
            text:'Remove Holiday(s)',
            tooltip:'Remove the selected Holiday(s)',
            iconCls:'remove',
            handler: confirmDeleteHoliday
        }],

        width:600,
        height: 400,
        frame:true
    });
//////////////////////////////////////delete Holiday//////////////////////////////////////////////////////////

 
 //confirm delete function 
  function confirmDeleteHoliday(){
    if(holidaysGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this holiday?', deleteHoliday);
    } else if(holidaysGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Delete those Resource Holiday(s)?', deleteHoliday);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected');
    }
  }
  
  function deleteHoliday(btn){
    if(btn=='yes'){
         var selections = holidaysGrid.getSelections();
         var selectedHoliday = [];
         for(i = 0; i< selections.length; i++){
          selectedHoliday.push(selections[i].get('holidayId'));
        //	contractPriceValue = contractTotalPrice.getValue()-selections[i].get('courseTotalPrice');
   	
         }
        
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../ResourcesAction.do',
        	params: {
          		task: "deleteResourceHoliday",
          		resId:resourceid,
               holidayIds:  selectedHoliday
              }, 
            method:'POST',
            success: function(response){
             
             
                holidaysGrid.getStore().load({params:{task:'resourceHolidays',res_id: resourceid}});
				
              
            },
            failure: function(response){
              var result=response.responseText;
              Ext.MessageBox.alert('error','could not connect to the database. retry later');      
              }
         });
       
      }  
  }
//////////////////////////////////////////////////////////////////////////////////////////////
var holidayNameField = new Ext.form.TextArea({
      		fieldLabel: 'Comment',
      		allowBlank: false,
    		id: 'HolidayName',
    		width:200,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
   var fromDateField = new Ext.form.DateField({
			fieldLabel: 'From',
            format: 'd-M-Y',
            width:200,
            minValue: '2006-01-01',
          //  disabledDays: [5, 6],
        	id: 'startdt',
        	 vtype: 'daterange',
        	 endDateField: 'enddt'
            });	
            
     var toDateField = new Ext.form.DateField({
	fieldLabel: 'To',
    format: 'd-M-Y',
    width:200,
    minValue: '2006-01-01',
   // disabledDays: [5, 6],
	id: 'enddt',
    vtype: 'daterange',
    startDateField: 'startdt' // id of the start date field
    });			    

var addHolidayForm = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 100,
        width:340,
        waitMsgTarget: true,
        autoHeight: true,
        items: [
					   fromDateField,toDateField,holidayNameField
		     
        ],
         buttons:[{ 
                text:'Save',
                iconCls:'save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:AddHoliday
            },{text:'Cancel',
            	handler:function(){AddHolidayWindow.hide();}
            	}
           ] 
  
    });
    
  AddHolidayWindow= new Ext.Window({
      id: 'AddHolidayWindow',
      title: 'Adding a Holiday',
      closable:true,
      width: 400,
      height: 200,
      plain:true,
      layout: 'fit',
      items: addHolidayForm
    });
function resetHolidayForm(){
	holidayNameField.reset();
	fromDateField.reset();
	toDateField.reset();
}		    
function displayHolidayWindow(){
  if(!AddHolidayWindow.isVisible()){
    resetHolidayForm();
    AddHolidayWindow.show();
  } else {
    AddHolidayWindow.toFront();
  }
  
  
  }		  
  
  
  function AddHoliday(){
  
	Ext.Ajax.request({   
		waitMsg: 'Please wait...',
		url: '../ResourcesAction.do',
		
		params: {
		  task: "addResourceHoliday",
		  resId:           resourceid,
		  holidayname:     holidayNameField.getValue(),
		  from:            fromDateField.getValue().format('Y-m-d'),
		  to:              toDateField.getValue().format('Y-m-d')
		  },
        method:'POST', 
        success: function(response){ 
        	holidayDS.load({params:{task:'resourceHolidays',res_id: resourceid}});
      		AddHolidayWindow.hide();  
		},
			failure: function(response){  //console.log("faaaaaaaaaail");
        	//addCertificateForm.getForm().reset(); 
       }                      
      });

		        
  	
  };

  /*-----------------------------resource rates------------------------------------------------*/
 
 function pctChange(val){
        if(val > 50){
            return '<span style="color:green;">' + val + '%</span>';
        }else if(val < 50){
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }
 
 function renderRateLink(value, p, record){
 	if(record.get('contractCopy')!='')
 	{
 		
	 	var s=record.get('contractCopy');
	 	var link= '<b><a href="'+s+'" target="_blank">'+'Contract Copy_'+record.get('resourceRateId')+'</a></b>'
	        return String.format(
	                link,value);
	 	}
	 else
	 {
	 	return(value);
	 }
    }

  var sm4 = new Ext.grid.CheckboxSelectionModel();
  
  
    var ratesGrid = new Ext.grid.GridPanel({
       	title:'Rates and Contracting Status',
        store: new Ext.data.Store({
             // load using HTTP
      		proxy: dataProxy,
    		//baseParams:{task: "resourceRates"},
     		 // the return will be XML, so lets set up a reader
      		reader: new Ext.data.XmlReader({
       		// The element which contains the total dataset size (optional)
   			record: "ResourceRates"
        	},[{name: 'resourceRateId', type: 'int'},
        	{name: 'resourceContractualType', type: 'string'},
        	{name: 'contractCopy', type: 'string'},
        	{name: 'validFrom', type: 'string'},
        	{name: 'developmentRate', type: 'int'},      	
        	{name: 'consultingMDFee', type: 'int'},      	
        	{name: 'consultingCurrency', type: 'string'},      	
        	{name: 'consultingMDPercentage', type: 'int'},      	
        	{name: 'trainingMDRate', type: 'int'},      	
        	{name: 'trainingCurrency', type: 'string'},      	
        	{name: 'taxExempted', type: 'string'},      	
        	{name: 'comment', type: 'string'}]
        	)
        }),
        cm: new Ext.grid.ColumnModel([
            sm4,{id:'contractCopy',header: "Contract", width: 270, sortable: true,renderer:renderRateLink, dataIndex: 'contractCopy'},
            {header: "Contractual Type", width: 300, sortable: true, dataIndex: 'resourceContractualType'},
            {header: "Valid From", width: 300, sortable: true, dataIndex: 'validFrom'},
            {header: "Consulting MD Fee", width: 300, sortable: true, dataIndex: 'consultingMDFee'},
            {header: "Consulting MD %", width: 300, sortable: true, renderer: pctChange, dataIndex: 'consultingMDPercentage'},
            {header: "Training MD Rate", width: 300, sortable: true, dataIndex: 'trainingMDRate'},       
            {header: "Business Development Rate", width: 300, sortable: true, renderer: pctChange, dataIndex: 'developmentRate'},           
            {header: "Tax Exempted", width: 300, sortable: true, dataIndex: 'taxExempted'},
            {header: "Comment", width: 300, sortable: true, dataIndex: 'comment'}
        ]),
        sm: sm4,

        viewConfig: {
            forceFit:true
        },

        // inline toolbars
        tbar:[{
            text:'Add Resource Rate',
            tooltip:'Add a new Resource Rate',
            iconCls:'add',
            handler: displayRateWindow
        },'-',{
            text:'Remove Resource Rate(s)',
            tooltip:'Remove the selected Resource Rate(s)',
            iconCls:'remove',
            handler: confirmDeleteRate
        }],

        width:600,
        height: 400,
        frame:true
    });

//////////////////////////////////////delete Holiday//////////////////////////////////////////////////////////

 
 //confirm delete function 
  function confirmDeleteRate(){
    if(ratesGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this Resource Rate?', deleteRate);
    } else if(ratesGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Delete those Resource Rate(s)?', deleteRate);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected');
    }
  }
  
  function deleteRate(btn){
    if(btn=='yes'){
         var selections = ratesGrid.getSelections();
         var selectedRate = [];
         for(i = 0; i< selections.length; i++){
          selectedRate.push(selections[i].get('resourceRateId'));
        //	contractPriceValue = contractTotalPrice.getValue()-selections[i].get('courseTotalPrice');
   	
         }
        
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../ResourcesAction.do',
        	params: {
          		task: "deleteResourceRate",
               rateIds:  selectedRate
              }, 
            method:'POST',
            success: function(response){
             
             
                ratesGrid.getStore().load({params:{task:'resourceRates',res_id: resourceid}});
				
              
            },
            failure: function(response){
              var result=response.responseText;
              Ext.MessageBox.alert('error','could not connect to the database. retry later');      
              }
         });
       
      }  
  }
//////////////////////add resource rate/////////////////////////////////////////////////////
	  var resourceContractualTypeData = [
        ['1','Associate'],
        ['2','freelancer'],
        ['3','Not Yet']];
        
	  var resourceContractualTypeDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: resourceContractualTypeData
    	});
	
	  var resourceContractualTypeCombo = new Ext.form.ComboBox({            	
		    store: resourceContractualTypeDS,
		    fieldLabel: 'Contractual Type',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Select Contractual Type...',
         listeners: {
         select: function (combo, record, index) {
    	    this.selectedIndex = index;
    	    
    	    if(index == 0){
    	    	devRateField.enable();
    	    }
    	    
         }}
	  });
	  

 	var contractCopyField = new Ext.form.TextField({
      		fieldLabel: 'Contract Copy',
      		//hideLabel: true,
      		//width: 200,
    		inputType: 'file'

     		});
     	
     		contractCopyField.on('valid',function(){
		
		contractCopyUploadButton.enable();
		});
     		
 		var contractCopyUploadButton = new Ext.Button({
  		text: 'Upload Contract',
  		minWidth:100,
  		type : 'submit',
  		disabled:true
  		,
  		handler:function(){
  			
  			 addRateForm.getForm().submit({
	                	
	                    url: '../upload.do?task='+'CONTRACTS'+'&contract='+contractCopyField.getValue(),
	                    waitMsg: 'Uploading your Files...',
	                   
	                    success: function(fp, o){
	                        msg('Success', 'Processed your files on the server');
	                       
	                    }
                   }
	              
                 );
  			
  		}

 		});

  var validFromDateField = new Ext.form.DateField({
			fieldLabel: 'Valid From',
            format: 'd-M-Y',
            width:200
            });	



    var consultingManDayFeeRadio = new Ext.form.Radio({
        	//xtype: 'radiogroup',
        	hideLabel:true,
        	columns:1,
        	name:'n1',
        	value:1,
        	
        	boxLabel:'Fee',
	         listeners: {
	         check: function () {
	    	  if(this.checked == true){  
	    	consultingManDayFeeField.enable();
			CurrFields.enable();
			consultingManDayPercentageField.disable()    	
	    	  }
	    	  else{
	    	  	consultingManDayPercentageField.enable();
	    	  	consultingManDayFeeField.disable();
				CurrFields.disable();
	    	  }    
			         }}
		        	
        	
        });
       var consultingManDayPercentageRadio = new Ext.form.Radio({
        	//xtype: 'radiogroup',
        	
        	hideLabel:true,
        	columns:1,
        	name:'n1',
        	value:2,
            boxLabel:'% of Invoicing Rate',
	         listeners: {
	         check: function () {
	    	  if(this.checked == true){  
	    	consultingManDayFeeField.disable();
			CurrFields.disable();
			consultingManDayPercentageField.enable()    	
	    	  }
	    	  else{
	    	  	consultingManDayPercentageField.disable();
	    	  	consultingManDayFeeField.enable();
				CurrFields.enable();
	    	  }    
			         }}
        });
        
        
         
      /******************get value***********************************/  
	 function getConsultingManDayValue() {
	 	  //console.log(consultingManDayFeeRadio.checked);
	 	var v = 0;
	 	if(consultingManDayFeeRadio.checked == true)
	 	
	 	 v = 1;
	 	else if(consultingManDayPercentageRadio.checked == true)
	 	
	 	 v = 2;
	 	 
	 	 
	 	
	 	return v;
	 	

	  };
	  
	  
			var consultingManDayFeeField = new Ext.form.NumberField({
      		fieldLabel: 'Fee',
      		disabled:true,
      		width:110
      		
     		});	
     		
     		
     		var Currds=[['EGP','EGP'],['USD','USD']];
       
    		var CurrFields = new Ext.form.ComboBox({
	           store: Currds,
	           id: 'currency1',
			    fieldLabel: 'Currency',
			    hideLabel:true,
			    displayField:'currency',
			    typeAhead: true,
			    editable: false,
			    disabled:true,
			    width:120,
			    triggerAction: 'all',
			    emptyText:'Select Currency ...',
			    selectOnFocus:true
		    });	
     		
     		var consultingManDayPercentageField = new Ext.form.NumberField({
      		fieldLabel: '% of Invoicing Rate',
      		width:170,
      		maxValue:100,
      		disabled:true,
      		minValue:0 
     		});	


var trainingManDayRateField = new Ext.form.NumberField({
      		fieldLabel: 'Training Man Day Rate',
      		disabled:true,
      		width:200
      		
     		});


var trainingCurrFields = new Ext.form.ComboBox({
	           store: Currds,
	           id: 'currency2',
			    fieldLabel: 'Currency',
			   // hideLabel:true,
			    displayField:'currency',
			    typeAhead: true,
			    editable: false,
			    width:200,
			    triggerAction: 'all',
			    disabled:true,
			    emptyText:'Select Currency ...',
			    selectOnFocus:true
		    });
	

var devRateField = new Ext.form.NumberField({
		fieldLabel: 'Business Development Rate',
		width:200,
		disabled:true,
      	maxValue:100,
      	minValue:0 
		});	


 var taxExemptedRadio = new Ext.form.RadioGroup({
        	
        	fieldLabel: 'Tax Exempted',
        	columns: [100, 100],
        vertical: true,
                items: [
                    {boxLabel: 'Yes', name: 'rb-auto', inputValue: 1},
                    {boxLabel: 'No', name: 'rb-auto', inputValue: 2}
                ]
        	
        	
        });
        
        
 function getTaxExemptedRadioValue() {
    var v;

    taxExemptedRadio.items.each(function(item) {
      v = item.getRawValue();
      return !item.getValue();
    });

    return v;
  }

var rateComment = new Ext.form.TextArea({
      		fieldLabel: 'Comment',
      		allowBlank: false,
    		
    		width:200,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
     		
     		
     		
     		

var addRateForm = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        fileUpload: true,
        labelWidth: 100,
        width:340,
        autoHieght: true,
        waitMsgTarget: true,
        items: [
					   resourceContractualTypeCombo,
					   contractCopyField,
					//   contractCopyUploadButton,
					   validFromDateField,
					   new Ext.form.FieldSet({
		                title: 'Consulting Man Day',
		                labelWidth: 30,
		                autoHeight: true,
		             //   autoWidth: true,
		                border: true,
		         		anchor:'100% 100%',
		                layout:'table',
			           layoutConfig: {
        				// The total column count must be specified here
       					 columns: 2
    					},
		                items: [
		                {width:150,layout: 'form',
		                items: [consultingManDayFeeRadio]},
		                {width:150,layout: 'form',
		                items: [consultingManDayPercentageRadio]},
		                {width:150,layout: 'form',
		                items: [consultingManDayFeeField]},
		                {width:150,layout: 'form',
		                items: [CurrFields]},{colspan:2,layout: 'form',labelWidth: 100,
		                items: [consultingManDayPercentageField]}]
            			}),
            			trainingManDayRateField,trainingCurrFields,
            			
					   devRateField,
					   taxExemptedRadio,rateComment
		                 
        ],
         buttons:[{ 
                text:'Save',
                iconCls:'save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){
                	
                	 addRateForm.getForm().submit({
	                	
	                    url: '../upload.do?task=CONTRACTS',
	                    waitMsg: 'Uploading your Files...',
	                   
	                    success: function(fp, o){
	                    	AddRate();
	                      //  msg('Success', 'Processed your files on the server');
	                       
	                    }
                   }
	              
                 );
                	
                }
            },{text:'Cancel',
            	handler:function(){AddRateWindow.hide();}
            	}
           ] 
  
    });
    
  AddRateWindow= new Ext.Window({
      id: 'AddRateWindow',
      title: 'Adding a Resource Rate',
      closable:true,
      width: 370,
      height: 530,
      plain:true,
      layout: 'fit',
      items: addRateForm
    });
function resetRateForm(){
	addRateForm.getForm().reset();
	
}		    
function displayRateWindow(){
  if(!AddRateWindow.isVisible()){
    resetRateForm();
    AddRateWindow.show();
  } else {
    AddRateWindow.toFront();
  }
  
  
  }		  
  
  
  function AddRate(){



	Ext.Ajax.request({   
		waitMsg: 'Please wait...',
		url: '../ResourcesAction.do',
		
		params: {
		  task: "AddResourceRate",
		  resId:                        resourceid,
		  contractualType:              resourceContractualTypeCombo.getValue(),
		  contractCopy:                 contractCopyField.getValue(),
		  validFrom:                    validFromDateField.getValue().format('Y-m-d'),
		  
		  consultingManDayFee:          consultingManDayFeeField.getValue(),
		  consultingCurrency:           CurrFields.getValue(),
		  consultingManDayPercentage:   consultingManDayPercentageField.getValue(),
		  trainingManDayRate:           trainingManDayRateField.getValue(),
		  trainingCurrency:             trainingCurrFields.getValue(),
		  devRate:                      devRateField.getValue(),
		  taxExempted:                  getTaxExemptedRadioValue(),
		  rateComment:                  rateComment.getValue()
		  },
        method:'POST', 
        success: function(response){ 
        	ratesGrid.getStore().load({params:{task:'resourceRates',res_id: resourceid}});
      		AddRateWindow.hide();    
		},
			failure: function(response){  //console.log("faaaaaaaaaail");
        	//addCertificateForm.getForm().reset(); 
       }                      
      });
 
		      
  	
  };
            
  var addRatesform = new Ext.form.FormPanel({
        
        fileUpload: true,
        labelAlign: 'left',
        labelWidth: 75,
        frame: true,
     	height : 450,
   
    	title:'Rates and Contracting Status',
    	//defaultType: 'fieldset',
		bodyStyle:'padding:5px 5px 0',
		

    items: [ 
           ratesGrid
           ],buttons:[{text: 'Save',
           iconCls:'save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){
                	// add Certification to database
                	
                	
                	var redirect = '../JSP/resourceslist.jsp'; 
			 		window.location = redirect;
                	
                } 
            },{text: 'Cancel',  
                // Function that fires when user clicks the button 
                handler:function(){
                	var redirect = '../JSP/resourceslist.jsp'; 
			 		window.location = redirect;
                	
                } }]});
 
 
 /*--------------------------------------------------------------------------------------------**/

//function addConsultingTab(){
// 	 	
//        tabs.add(consultingItemSelect);
//    };
//
//function addCertificatesTab(){
// 	 //	certificatesGrid.getStore().removeAll();
//        tabs.add(certificatesGrid);
//    };
//    
//function addHolidaysTab(){
// 	 	//holidaysGrid.getStore().removeAll();
//        tabs.add(holidaysGrid);
//    };
//    
//function addRatesTab(){
// 	//ratesGrid.getStore().removeAll();
//    tabs.add(ratesGrid);
//};

function addTabs(){

//	//	addConsultingTab();
//	
//	addCertificatesTab();
//	addHolidaysTab();
//	addRatesTab();
//	
	if(resourcetype == 1){
		tabs.getComponent(0).disable();
	tabs.getComponent(1).disable();
	tabs.activate(consultingItemSelect);
	}
	else if(resourcetype == 2){
		tabs.getComponent(2).disable();
	
	}
	
}
//

//ds.load();

	  Courses_ds.on('load',function(){
	
	resource_Courses_ds.load({params:{task:'coursesByResourceId',res_id: resourceid}});
	
});
 resource_Courses_ds.on('load',function(){
	
	resource_Courses_ds.each(function(record){
		
		if(record.get('resourceAbility') == 0)
		resource_Courses_ds.remove(record);
		
	});
	
	
	//resource_Courses_ds.filter('resourceAbility',1);
	
	resource_future_Courses_ds.load({params:{task:'coursesByResourceId',res_id: resourceid}});
	
});

resource_future_Courses_ds.on('load',function(){
	
	resource_future_Courses_ds.each(function(record){
		
		if(record.get('resourceAbility') == 1)
		resource_future_Courses_ds.remove(record);
		
	});
	
//resource_future_Courses_ds.filter('resourceAbility',0);
 consultingDS.load({params:{task:'remainConsultingAreasByResourceId',res_id: resourceid}});
});	

consultingDS.on('load',function(){
	
	selectedConsultingDS.load({params:{task:'consultingAreasByResourceId',res_id: resourceid}});
	
});
selectedConsultingDS.on('load',function(){
	
	ds.load({params:{task:'resourceHandouts',res_id: resourceid}});
	
});

ds.on('load',function(){
	
	certificatesGrid.getStore().load({params:{task:'resourceCertificates',res_id: resourceid}});
	
});

certificatesGrid.getStore().on('load',function(){
	
	holidayDS.load({params:{task:'resourceHolidays',res_id: resourceid}});
	
});
holidayDS.on('load',function(){
	
	ratesGrid.getStore().load({params:{task:'resourceRates',res_id: resourceid}});
	
});

ratesGrid.getStore().on('load',function(){
	
	 col.load();
	
});
  

  
 
var tabs=  new Ext.TabPanel({
                   region:'center',
                    height:495, 
                           /* width:980,*/
                           autoHeight : true,
        			renderTo: 'binding-example',
                    deferredRender:false,
                    autoScroll: true,
                    buttonAlign:'center',
                    activeTab:0,
                    items:[addTrainingCapabilitiesform,myGrid,consultingItemSelect,certificatesGrid,holidaysGrid,ratesGrid,resourceColorform]
                    ,tbar: [
            			''
            			]
                    
                    
                    });
                    
                    
// tabs.on('beforeshow',function(){
// 	
// 	
// 	
// });                   

});
    
