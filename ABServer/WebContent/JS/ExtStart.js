
Ext.onReady(function() {

    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

	var Course  = Ext.data.Record.create([
      {name: 'courseName', type: 'string'},
      {name: 'trainerName', type: 'string'},
      {name: 'trainingArea', type: 'string'},
      {name: 'courseId', type: 'int'},
      {name: 'dayes', type: 'int'}

     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../makeAction.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
         
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Course",           // The repeated element which contains row information
   		id: "courseId"
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
        {id:'courseName',header: "Course", width: 100, sortable: true, locked:false, dataIndex: 'courseName'},
        {header: "CourseID", width: 75, sortable: true, dataIndex: 'courseId'},
        {header: "Training Area", width: 150, sortable: true, renderer: change, dataIndex: 'trainingArea'},
        {header: "Trainer Name", width: 120, sortable: true, renderer: pctChange, dataIndex: 'trainerName'},
        {id:'dayes',header: "Dayes", width: 85, sortable: true, dataIndex: 'dayes'}
    ]);

 
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
        autoExpandColumn: 'dayes',
        height:350,
        width:600,
        title:'Courses',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Course',
             handler: displayFormWindow
             }),new Ext.Toolbar.Button({
              text: 'Delete Selection',
              handler: confirmDeleteCourses
              })],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });

   myGrid.on("rowdblclick", function(myGrid) {
	 var sel = myGrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;
        Ext.MessageBox.show({
			title: 'Course Details',
			msg: 'Course Name: '+seldata.courseName+' '+'Training Area: '+seldata.trainingArea+' Trainer Name: '+seldata.trainerName,
			width:185,
			buttons: Ext.MessageBox.OK
});
});

  
  ds.on('add', function(){
	ds.reload();
//myGrid.getView().refresh();
   });

 ////////////////////adding new record//////////////////////////////
  var AddCourseForm;
  var AddCourseWindow;
  
  var CourseNameField;
  var CourseIdField;
  var TrainingAreaField;
  var TrainerNameField;
  var DayesField;
 
  CourseNameField = new Ext.form.TextField({
    id: 'courseName',
    fieldLabel: 'Course Name',
    maxLength: 20,
    allowBlank: false,
    anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  CourseIdField = new Ext.form.NumberField({
    id: 'courseId',
    fieldLabel: 'Course ID',
    maxLength: 20,
    allowNegative: false,
    allowBlank: false,
    anchor : '95%'    
   
      });
  
  TrainingAreaField = new Ext.form.TextField({
    id:'trainingArea',
    fieldLabel: 'Training Area',
    allowBlank: false,
    anchor:'95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
    });
    
  TrainerNameField = new Ext.form.TextField({
    id:'trainerNamr',
    fieldLabel: 'Trainer Name',
    allowBlank: false,
    anchor:'95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
    });
  
  DayesField = new Ext.form.NumberField({
    id:'dayes',
    fieldLabel: 'Course Dayes',
    allowNegative: false,
    allowBlank: false,
    anchor:'95%'
   
    });
    
    //////////////************adding form****************/////////////////
    AddCourseForm = new Ext.FormPanel({
        labelAlign: 'top',
        bodyStyle:'padding:5px',
        width: 390,        
        items: [{
            layout:'column',
            border:false,
            items:[{
                columnWidth:0.5,
                layout: 'form',
                border:false,
                items: [CourseNameField, CourseIdField, TrainingAreaField]
            },{
                columnWidth:0.5,
                layout: 'form',
                border:false,
                items: [TrainerNameField, DayesField]
            }]
        }],
    buttons: [{
      text: 'Save and Close',
      handler: addCourse
    },{
      text: 'Cancel',
      handler: function(){
        // because of the global vars, we can only instantiate one window... so let's just hide it.
        AddCourseWindow.hide();
      }
    }]
    });
  
  AddCourseWindow= new Ext.Window({
      id: 'AddCourseWindow',
      title: 'Creating a New Course',
      closable:true,
      width: 400,
      height: 250,
      plain:true,
      layout: 'fit',
      items: AddCourseForm
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetCourseForm(){
    CourseNameField.setValue('');
    CourseIdField.setValue('');
    TrainingAreaField.setValue('');
    TrainerNameField.setValue('');
    DayesField.setValue('');
   
  }
  
  // check if the form is valid
  function isCourseFormValid(){
  return(CourseNameField.isValid() && CourseIdField.isValid() && TrainingAreaField.isValid() && TrainerNameField.isValid() && DayesField.isValid());
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
  
   if(isCourseFormValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../courses.do',
        params: {
          task: "CREATECOURSE",
          coursename:      CourseNameField.getValue(),
          courseid:        CourseIdField.getValue(),
          trainingarea:    TrainingAreaField.getValue(),
          trainername:     TrainerNameField.getValue(),
          dayes:      	   DayesField.getValue()
        },
        method:'POST', 
        success: function(response){        

        var result=1;
        
          switch(result){
          case 1:
         
 			var course = new Ext.data.Record({
      		courseId : CourseIdField.getValue(),
      		courseName  : CourseNameField.getValue(),
      		trainingArea  : TrainingAreaField.getValue(),
      		trainerName  : TrainerNameField.getValue(),
      		dayes  : DayesField.getValue()
    		});

    		ds.add(course);
 		//	ds.reload();
			AddCourseWindow.hide();
            
            break;
          default:
            Ext.MessageBox.alert('Warning','Could not create the course.');
            break;
          }        
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
  
  ////////////////////////////////////////////////////////////////////  
    /////////////////////FINISH ADDING/////////////////////////////
 ////////////////////////////////////////////////////////////////////
 
 /********************************************************************/
 
  ////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.courseId);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Do you not like that Course at all?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Delete those  Courses?', deleteCourses);
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
            url: '../courses.do?', 
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

var viewport = new Ext.Viewport({
            layout:'border',
            items:[
                new Ext.BoxComponent({ // raw
                    region:'north',
                    el: 'north',
                    height:32
                }), {
                    region:'west',
                    id:'west-panel',
                    title:'West',
                    split:true,
                    width: 200,
                    minSize: 175,
                    maxSize: 400,
                    collapsible: true,
                    margins:'0 0 0 5',
                    layout:'accordion',
                    layoutConfig:{
                        animate:true
                    },
                    items: [{
                        contentEl: 'west',
                        title:'Navigation',
                        border:false,
                        iconCls:'nav'
                    },{
                        title:'Settings',
                        html:'<p>Some settings in here.</p>',
                        border:false,
                        iconCls:'settings'
                    }]},
                new Ext.TabPanel({
                    region:'center',
                    deferredRender:false,
                    activeTab:0,
                    items:[myGrid]})
      

]});
	
	function stcCallBack1001(record, opts, success) {
//if (success) 
//// do whatever
//alert("the sucess ");
//// alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;

};

	loadtest=   ds.load({callback :  stcCallBack1001});

});