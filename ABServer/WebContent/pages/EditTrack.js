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
    
   var flag=0; 
	var Tracks  = Ext.data.Record.create([
      {name: 'trackCode', type: 'string'},
      {name: 'trackName', type: 'string'},
      {name: 'idTracks', type: 'int'}

     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listTracks.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "listT"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Tracks",           // The repeated element which contains row information
   		id: "idTracks"
        },Tracks
        )
      });
 ds.load();
//alert("???????");
ds.on('load', function(){//alert("ay 7agaaaaaa");
//alert(ds.getAt(0));
var catRec = ds.getAt(0);
TrackNameField.setValue(catRec.get('trackName'));
TrackCodeField.setValue(catRec.get('trackCode'));
});
  
  
var Trackcourses  = Ext.data.Record.create([
      {name: 'courseNameEng', type: 'string'},
      {name: 'tableId', type: 'int'},
      {name: 'courseDays', type: 'int'}

     ]);
dataProxy = new Ext.data.HttpProxy({
     	url: '../listTracks.do',
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
   		record: "Trackcourses",           // The repeated element which contains row information
   		id: "tableId"
        },Trackcourses
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
 var sm = new Ext.grid.CheckboxSelectionModel();
  
    // the DefaultColumnModel expects this blob to define columns. It can be extended to provide
    // custom or reusable ColumnModels
      var colModel = new Ext.grid.ColumnModel([
        {header: "Course Name", width: 150, sortable: true, dataIndex: 'courseNameEng'}, 
        {header: "Course Days", width: 150, sortable: true, dataIndex: 'courseDays'}
    ]);

var Course  = Ext.data.Record.create([
      {name: 'courseNameEng', type: 'string'},
      {name: 'courseNameAr', type: 'string'},
      {name: 'courseOutlineEng', type: 'string'},
      {name: 'courseOutlineAr', type: 'string'},
      {name: 'courseType', type: 'string'},
      {name: 'trainArea',type:'string'},
      {name: 'idCourses', type: 'int'},
      {name: 'courseDays', type: 'int'}

     ]);

    var myGrid = new Ext.grid.GridPanel({
        ds: Cds,
        cm: colModel,
        stripeRows: true,
        autoScroll:true,
        height:255,
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
              })],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });
      var colModel = new Ext.grid.ColumnModel([sm,
        {header: "Course Name", width: 150, sortable: true, dataIndex: 'courseNameEng'}
    ]);

dataProxy = new Ext.data.HttpProxy({
     	url: '../listTracks.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var all = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "listAll"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Course",           // The repeated element which contains row information
   		id: "idCourses"
        },Course
        )
      });
  

     
    var myAllGrid = new Ext.grid.GridPanel({
        ds: all,
        sm:sm,
        cm: colModel,
        stripeRows: true,
        autoScroll:true,
        height:255,
        width:600,
        title:'Courses',
      //  tbar: [new Ext.Toolbar.Button({
        //     text: 'Add To Track',
          //   handler: addToTrackForm
            // })],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });
    
     myGrid.on("rowdblclick", function(myGrid) {
	var sel = myGrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;

		displayEFormWindow();
		CourseNameField.setValue(seldata.courseNameEng);
		CourseDaysField.setValue(seldata.courseDays);
		
		
});

myGrid.on("rowclick", function(myAllGrid) {
  flag=1;
  });
    
 function displayFormWindow(){
	  if(!win.isVisible()){//alert('hiiiiii');
	  //  resetAddToTrackForm();
	  all.reload();
	    win.show();
	  } else {
	    win.toFront();
	  }
  
  
  }
    

    
    //////////////////////////////////////////////////////////////////////////////
    
       bd.createChild({tag: 'h2', html: ''});
    
    /*======================== Form Fields=========================*/
    var valid =1;  
 	var TrackNameField;
 	var TrackCodeField;
 	 var courseName=[];
 	 var TrackDurationField;
  TrackNameField = new Ext.form.TextField({
    id: 'trackName',
    fieldLabel: 'Track Name <html><font color=red> *</font></html>',
//    maxLength: 20,
    width:200,
    allowBlank: false,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  TrackCodeField = new Ext.form.TextField({
    id: 'trackCode',
    fieldLabel: 'Track Code <html><font color=red> *</font></html>',
//   maxLength: 20,
    width:200,
 //   allowNegative: false,
    allowBlank: false,
 //   anchor : '95%'    
  //  maskRe: /([0-9\s]+)$/
      });
    TrackDurationField = new Ext.form.TextField({
    id: 'TrackDurationField',
    fieldLabel: 'Track Duration',
//   maxLength: 20,
    width:200,
 //   allowNegative: false,
    allowBlank: false,
 //   anchor : '95%'    
  //  maskRe: /([0-9\s]+)$/
      });  
  var CourseNameField;
  var CourseDaysField;
  
  
  CourseNameField = new Ext.form.TextField({
    id: 'courseName',
    fieldLabel: 'Course Name',
//    maxLength: 20,
    width:200,
    
    allowBlank: false,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  CourseDaysField = new Ext.form.NumberField({
    id: 'courseDays',
    fieldLabel: 'Course Days <html><font color=red> *</font></html>',
//    maxLength: 20,
    width:200,
    allowBlank: false
      });   
     
    CourseNameField.disable(); 
    TrackDurationField.disable();
    /*
     * ================  Simple form  =======================
     */
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
                items: [ CourseNameField,
					   CourseDaysField
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
      id: 'editCourseWindow',
      title: 'Edit Course Days',
      closable:false,
      width: 400,
      height: 170,
      plain:true,
      layout: 'fit',
      items: Efs
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetECourseForm(){
    CourseNameField.reset();
    CourseDaysField.reset();
   
  }
  
  // check if the form is valid
  function isECourseFormValid(){
  return( CourseNameField.isValid() && CourseDaysField.isValid());
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
  
   if(CourseDaysField.isValid()){
   	var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listTracks.do',
        params: {
        task: "EditCourse",
        id:selections[0].id,
		courseDays:	       CourseDaysField.getValue()
								       },
        method:'POST', 
        success: function(response){        
			
						    Cds.reload();  
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
     
  
          	    
    /*=================================================================*/
    var simple = new Ext.FormPanel({
        labelWidth: 150, // label settings here cascade unless overridden
     //   url:'../listCProperties',
        frame:true,
        title: 'Edit Track',
        bodyStyle:'padding:5px 5px 0',
   //     width: 1000,
        defaults: {width: 500},
        defaultType: 'textfield',

        items: [new Ext.form.FieldSet({
             autoHeight: true,
             title:"Track Details",
                defaultType: 'textfield',
                items:[
        		   TrackNameField,
        		   TrackCodeField,
        		   TrackDurationField,
        		   myGrid] }),
        		   
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
                if(TrackNameField.isValid() && TrackCodeField.isValid())
                {
                  simple.getForm().submit( 
                  			 
                    	      Ext.Ajax.request({   
        						waitMsg: 'Please wait...',
        						url: '../listTracks.do',
								params: {
								  task: "EditTrack",
								  names:					courseName,
								  trackName:		        TrackNameField.getValue(),
								  trackCode:				TrackCodeField.getValue(),
								  trackDuration:			TrackDurationField.getValue()
								},
						        method:'POST', 
						        success: function(response){ ////console.log("success");//alert(valid);
						        		 var redirect = 'tracks.jsp'; 
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
            	handler:function(){window.location='tracks.jsp';}
            	}
           ]});
                    
function stcCallBack1001(record, opts, success) {
//if (success) 
//// do whatever
//alert("the sucess ");
//alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
////console.log("  LOOOOOOOOOOOOOOD ");

};
Cds.load();
Cds.on('load',function(){//alert(Cds.getCount())
	var duration=0;
	if(Cds.getCount() != 0)
	{
		for(var i=0;i<Cds.getCount();i++)
		{
		var catRec = Cds.getAt(i);
		if(catRec.get('courseDays') != '')
			duration+=catRec.get('courseDays');
		//alert(duration);
		TrackDurationField.setValue(duration);
		//alert(TrackDurationField.getValue());
		}
	}
	else
		TrackDurationField.setValue(0);
	
});

 //loadtest=   Cds.load({callback :  stcCallBack1001});
//loadtest1=   Eds.load({callback :  stcCallBack1001});
  simple.render(document.body);  
  
  
   var win= new Ext.Window({
      id: 'AddCourseWindow',
      title: 'Adding Courses to Track',
      closable:false,
      width: 400,
      height: 400,
      plain:true,
      layout: 'fit',
      items: [myAllGrid],buttons: [{text:'Add To Track',handler:addToTrackForm},{text:'Cancel',handler:function(){win.hide();}}]
  });
 // win.show();
   function addToTrackForm(){
  var selections = myAllGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myAllGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }
 		  if(myAllGrid.selModel.getCount()==0)
 		  	Ext.MessageBox.alert('Warning','You did not select any course, please select course first!'); 
    	  else
    	  {
    	  Ext.Ajax.request({   
	        waitMsg: 'Please wait...',
	        url: '../listTracks.do',
	        params: {
	          task: "AddCoursesToTrack",
	          ids:  selectedCourse
	        },
	        method:'POST', 
	        success: function(response){        
	
				//win.hide();
				Cds.reload();
				all.reload();
	            Ext.MessageBox.alert('','Courses added successfully');  
	            win.hide();
	        },
	        failure: function(response){
	          var result=response.responseText;
	          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
	        }                      
	      });
	  
    	  }
  
  } 
  
  ////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idCourses);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this course?', deleteCourses);
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
         
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../listTracks.do', 
            params: { 
               task: "DELETE", 
               ids:  selectedCourse
              }, method:'POST',
            success: function(response){
              var result=1;
              switch(result){
              case 1:  // Success : simply reload
                Cds.reload();
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
  
});