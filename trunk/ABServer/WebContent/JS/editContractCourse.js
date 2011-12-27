Ext.onReady(function() {

      Ext.form.Field.prototype.msgTarget = 'side';

      var bd = Ext.getBody();

	   var EditCourseForm;
	  var CourseNameCombo;
	  var CourseType;
	  var CoursePrice;
	  var CoursePriceTypeCombo;
	  var CourseNumOfRuns;
	  var CourseNumDays;
	  var CourseNumParticipants;
	  var saveAndQuit = true;
	  
	  var oldCourseId = '';
	   var newCourseId = '';
	//  courseId
	  var Course  = Ext.data.Record.create([
		  {name: 'courseId', type: 'int'},
  		  {name: 'courseName', type: 'string'},
		  {name: 'courseRuns', type: 'int'},
		  {name: 'courseDays', type: 'int'},
		  {name: 'courseTotalDays', type: 'int'},
		  {name: 'courseType', type: 'string'},
		  {name: 'coursePriceType', type: 'string'},
		  {name: 'coursePrice', type: 'int'},
		  {name: 'courseParticipantsPerRun', type: 'int'},
		  {name: 'courseTotalPrice', type: 'int'},
		  {name: 'courseFund', type: 'int'},
		  
		  {name: 'coordinatorId', type: 'int'},
		  {name: 'venueId', type: 'int'},
		  {name: 'venueConfirmDate', type: 'date'},
		  {name: 'venueLocation', type: 'string'},
		  {name: 'datashowRequest', type: 'int'},
		  {name: 'courseTime', type: 'int'}

      ]);
	  
	  formDataProxy = new Ext.data.HttpProxy({
	     	url: '../ContractCoursesActions.do',
	     	method: 'POST', 
	        headers:{'request-type':'ajax' }
	      	});
	  var ds = new Ext.data.Store({
		       // load using HTTP
		      proxy: formDataProxy,
		      baseParams:{task:'RETRIEVECONTRACTCOURSE'}, 
		      // the return will be XML, so lets set up a reader
		      reader: new Ext.data.XmlReader({
		        totalRecords: "results", // The element which contains the total dataset size (optional)
		   		record: "Course",           // The repeated element which contains row information
		   		id: "courseId"
		        },Course
		        )
		      });
  
	  
	  /*------------------------------intializations-------------------------------------*/
 dataProxy = new Ext.data.HttpProxy({
	     	url: '../ContractCoursesActions.do',
	     	method: 'POST', 
	        headers:{'request-type':'ajax' }
	      	});
 
  var coursesDS = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "ALLCOURSES"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // The element which contains the total dataset size (optional)
   		record: "Course"
        },[{name: 'courseName', type: 'string'},{name: 'courseId', type: 'int'}]
        )
      });
 
 
  CourseNameCombo = new Ext.form.ComboBox({
    
     store: coursesDS,
	 fieldLabel: 'Course Name',
     displayField:'courseName',
     valueField: 'courseId',
	 selectOnFocus: true,
	 typeAhead: true,
     editable: false,
     triggerAction: 'all',

     emptyText:'Select Course...',
     listeners: {
     select: function (combo, record, index) {
    	this.selectedIndex = index;
    	newCourseId = this.getValue();
    	Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../ContractCoursesActions.do',
        params: {
          task: "RETRIEVETYPEANDPRICE",
          courseid:  this.getValue()//,

        },
        method:'POST', 
        success: function(response){        

	   var typeAndPrice = response.responseText.split('-');
       CourseType.setValue(typeAndPrice[0]);
       CoursePrice.setValue(typeAndPrice[1]);
       if(CourseType.getValue() == 'Group'){
       CoursePriceTypeCombo.setValue(typeAndPrice[2]);
       CoursePriceTypeCombo.disable();
       }
       else{
       	if(typeAndPrice[3] == '0')
       	CoursePriceTypeCombo.enable();
       	else
       	CoursePriceTypeCombo.disable();
       }
       CourseNumDays.setValue(typeAndPrice[4]);
       
        CourseNumParticipants.reset();
    	CourseNumOfRuns.reset();
       
        },
        failure: function(response){
          var result=response.responseText;
          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
        }                      
      });

   }}

});


     var CourseType = new Ext.form.TextField({
      		fieldLabel: 'Course Type',
      		allowBlank: false,
      		editable: false,
    		readOnly : true,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
     		
      var CoursePrice = new Ext.form.NumberField({
      		fieldLabel: 'Course Price',
      		
    		readOnly : true,
    		 
		    allowNegative: false,
		    allowBlank: false
     		});	
      
 
      CourseNumOfRuns = new Ext.form.NumberField({
      	id: 'courseRuns',
    	fieldLabel: 'Number Of Runs',
    	allowNegative: false,
    	allowBlank: false
      });
  
      CourseNumDays = new Ext.form.NumberField({
    	id:'courseDays',
    	fieldLabel: 'Days Number',
   		readOnly : true,
    	allowNegative: false,
    	allowBlank: false
    
    });
    
      var courseTypeData = [
        ['1','International'],
        ['2','Local'],['3','Other']];
        
	  var courseTypeDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: courseTypeData
    });
    
	//courseTypeDS.load();
	
	  CoursePriceTypeCombo = new Ext.form.ComboBox({            	
		    store: courseTypeDS,
		    fieldLabel: 'Price Type',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Select a Course Type...'
	  });
	
	  CourseNumParticipants = new Ext.form.NumberField({
	    id: 'courseParticipantsPerRun',
	    fieldLabel: 'Participants Number Per Run',
	    allowNegative: false,
	    allowBlank: false
      });
   
    var courseTimeRadio = new Ext.form.RadioGroup({
        	//xtype: 'radiogroup',
        	fieldLabel: 'Course Time',
        	//columns: 1,
        	columns: 1,
                items: [
                    {boxLabel: 'Full Day', name: 'rb-auto1', inputValue: 1, checked: true},
                    {boxLabel: 'Half Session', name: 'rb-auto1', inputValue: 2},
                    {boxLabel: 'Evening Sesstion', name: 'rb-auto1', inputValue: 3}
                ]
        	
        	
        });
        
        
	 function getCourseTimeRadioValue() {
	    var v;
	
	    courseTimeRadio.items.each(function(item) {
	      v = item.getRawValue();
	      return !item.getValue();
	    });
	
	    return v;
	  };
	  
	  var courseNameFieldSet = new Ext.form.FieldSet({
        	
            
         //   labelWidth: 90,
         //   hideBorders : false,
            title:'Select the Course Name',
            defaults: {width: 250},	// Default config options for child items
            
            height: 60,
           
              items:[CourseNameCombo]}
			);
			
var type_priceFieldSet = new Ext.form.FieldSet({
        	
           
          //  labelWidth: 90,
         //   hideBorders : false,
            title:'Course Type & Price',
            defaults: {width: 250},	// Default config options for child items
         //   layout: 'column',
            height: 90,
           
              items:[CourseType,CoursePrice]
        });
        
	var schedualFieldSet = new Ext.form.FieldSet({

            title:'Schedual Details',
           // width: 430,
            defaults: {width: 250},	// Default config options for child items

            height: 230,
            
            items:[courseTimeRadio,CoursePriceTypeCombo,CourseNumOfRuns
     		,
            CourseNumDays,CourseNumParticipants
     		]});
     		
 EditCourseForm = new Ext.FormPanel({
      labelWidth: 150,
    frame: true,
   defaultType: 'fieldset',
    autoHeight : false,
    autoScroll : true, 
    layout:'table',
   layoutConfig: {columns:1},
   //  autoWidth : true, 
    title:'Edit Contract Course',
    defaultType: 'fieldset',
        items: [courseNameFieldSet,type_priceFieldSet,schedualFieldSet],
    buttons: [{
      text: 'Save',
      handler: function(){
      	saveAndQuit = true;
        editCourse();
        
      //  AddCourseWindow.hide();
      }},{
      text: 'Cancel',
      handler: function(){
        // because of the global vars, we can only instantiate one window... so let's just hide it.
        var redirect = '../JSP/completeProposal.jsp'; 
		window.location = redirect;
      }
    }]
    });
    
       // reset the Form before opening it
  function resetCourseForm(){
  	
  	EditCourseForm.getForm().reset();
  	
    CourseNameCombo.reset();
    CourseNumOfRuns.reset();
    CourseNumDays.reset();
    CoursePriceTypeCombo.reset();
    CoursePriceTypeCombo.enable();
    CourseNumParticipants.reset();
    CourseNumOfRuns.reset();
    CourseType.reset();
    CoursePrice.reset();

  }
  
  // check if the form is valid
  function isCourseFormValid(){
  return(CourseNameCombo.isValid() && CourseNumOfRuns.isValid() && CourseNumDays.isValid() && CoursePriceTypeCombo.isValid());
  }
  
  // display or bring forth the form
  function displayFormWindow(){
 //	coordinatorsCombo.setValue(coordinatorVar);
 	
  if(!AddCourseWindow.isVisible()){
    
    AddCourseWindow.show();
  } else {
    AddCourseWindow.toFront();
  }
  }

/////////////////adding course function/////////////////////
  function editCourse(){
   	
   	var totalDays = CourseNumOfRuns.getValue() * CourseNumDays.getValue();
   	var totalPrice = 0;
   	var priceTypeIndex = 0;
   	if(CourseType.getValue() == 'Group')
   	totalPrice = CoursePrice.getValue()*totalDays;
   	else
   	totalPrice = CoursePrice.getValue()*CourseNumOfRuns.getValue()*CourseNumParticipants.getValue();
  
//   	if(CoursePriceTypeCombo.getValue() == 'International')
//   	priceTypeIndex = 1;
//   	else if(CoursePriceTypeCombo.getValue() == 'Local')
//   	priceTypeIndex = 2;
//   	else
//   	priceTypeIndex = 3;
 
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../ContractCoursesActions.do',
        params: {
          task: "EDITCONTRACTCOURSE",
          oldCourseId: oldCourseId,
          newCourseId : newCourseId,
      		courseRuns  : CourseNumOfRuns.getValue(),
      		courseDays  : CourseNumDays.getValue(),
      		courseTotalDays: totalDays,
      		coursePriceType: CoursePriceTypeCombo.getValue(),
      		coursePrice: CoursePrice.getValue(),
      		courseParticipantsPerRun: CourseNumParticipants.getValue(),
      		courseTotalPrice: totalPrice,
      		courseType  : CourseType.getValue(),
      		
      		coursetime: getCourseTimeRadioValue()
        },
        method:'POST', 
        success: function(response){        

        var result=1;
     
          switch(result){
          case 1:
 			var redirect = '../JSP/completeProposal.jsp'; 
		    window.location = redirect;
      
            break;
          default:
            Ext.MessageBox.alert('Warning','Could not add this course.');
            break;
          }        
        },
        failure: function(response){
          var result=response.responseText;
          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
        }                      
      });
    
  
  }
  
  	ds.load();
	ds.on('load', function(){ 
		
		var courseRec = ds.getAt(0);
		
	//	alert(courseRec.get('courseName'));
		
		CourseNameCombo.setValue(courseRec.get('courseName'));
		
		oldCourseId = courseRec.get('courseId');
		
		newCourseId = oldCourseId;
		
		
	 CourseType.setValue(courseRec.get('courseType'));
	 CoursePrice.setValue(courseRec.get('coursePrice'));
	// courseTypeDS.load();
	 CoursePriceTypeCombo.setValue('1');
	 
	 
	 if(CourseType.getValue() == 'Group'){
     //  CoursePriceTypeCombo.setValue(typeAndPrice[2]);
       CoursePriceTypeCombo.disable();
       }
       else{
       	if(courseRec.get('courseFund') == '0')
       	CoursePriceTypeCombo.enable();
       	else
       	CoursePriceTypeCombo.disable();
       }
	// CourseTimeRadio.items[0].checked = true;
 //	
 	
	 CourseNumOfRuns.setValue(courseRec.get('courseRuns'));
	 CourseNumDays.setValue(courseRec.get('courseDays'));
	 CourseNumParticipants.setValue(courseRec.get('courseParticipantsPerRun'));
		
		
		
	}); 
	  
  
  
/*-----------------------FINISH ADDING----------------------------------------*/
  //the view port 
var viewport = new Ext.Viewport({
            layout:'border',
            items:[
                new Ext.BoxComponent({ // raw
                    region:'north',
                    el: 'north',
                    height:32
                }), 
                new Ext.TabPanel({
                    region:'center',
                    deferredRender:false,
                    activeTab:0,
                    autoScroll : true,
                    height:700,
                    items:[EditCourseForm]})
      

]});  
});