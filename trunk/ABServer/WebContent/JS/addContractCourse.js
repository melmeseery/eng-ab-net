Ext.onReady(function() {

      Ext.form.Field.prototype.msgTarget = 'side';

      var bd = Ext.getBody();

	   var AddCourseForm;
	  var CourseNameCombo;
	  var CourseType;
	  var CoursePrice;
	  var CoursePriceTypeCombo;
	  var CourseNumOfRuns;
	  var CourseNumDays;
	  var CourseNumParticipants;
	  var saveAndQuit = true;
	  
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
    	Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../ContractCoursesActions.do',
        params: {
          task: "RETRIEVETYPEANDPRICE",
          courseid:  this.getValue()//,
//          contractfund: checkBoxValue,
//          contractratetype: contractRateType.getValue()
        },
        method:'POST', 
        success: function(response){        

	   var typeAndPrice = response.responseText.split('-');
       CourseType.setValue(typeAndPrice[0]);
       CoursePrice.setValue(typeAndPrice[1]);
       if(CourseType.getValue() == 'Group'){
       	if(typeAndPrice[2] == '0')
       	CoursePriceTypeCombo.setValue('');
       	else
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
  	  //  readOnly : true,
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
            
            height: 70,
           
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
     		
 AddCourseForm = new Ext.FormPanel({
      labelWidth: 150,
    frame: true,
   defaultType: 'fieldset',
    autoHeight : true,
    autoScroll : true, 
    layout:'form',
    title:'Add New Contract Course',
    defaults: {width: 450},
        items: [courseNameFieldSet,type_priceFieldSet,schedualFieldSet],
    buttons: [{
      text: 'Add another Course',
      handler: function(){
      	saveAndQuit = false;
       addCourse();
      // resetCourseForm();
      }},{
      text: 'Save and Quit',
      handler: function(){
      	saveAndQuit = true;
        addCourse();
        
      //  AddCourseWindow.hide();
      }},{
      text: 'Cancel',
      handler: function(){
        var redirect = '../JSP/completeProposal.jsp'; 
		 window.location = redirect;
      }
    }]
    });
    
       // reset the Form before opening it
  function resetCourseForm(){
  	
  	AddCourseForm.getForm().reset();
  	
    CourseNameCombo.reset();
    CourseNumOfRuns.reset();
    CourseNumDays.reset();
    CoursePriceTypeCombo.reset();
    CoursePriceTypeCombo.enable();
    CourseNumParticipants.reset();
    CourseType.reset();
    CoursePrice.reset();

  }
  
  // check if the form is valid
  function isCourseFormValid(){
  return(CourseNameCombo.isValid() && CourseNumOfRuns.isValid() && CourseNumDays.isValid() && CoursePriceTypeCombo.isValid());
  }

/////////////////adding course function/////////////////////
  function addCourse(){
  
   if(isCourseFormValid()){
   	
   	var totalDays =   CourseNumDays.getValue();
   	var totalPrice = 0;
   	var priceTypeIndex = 0;
   	if(CourseType.getValue() == 'Group')
   	totalPrice = CoursePrice.getValue()*totalDays;
   	else
   	totalPrice = CoursePrice.getValue() *CourseNumParticipants.getValue();
 //  	contractPriceValue = contractPriceValue+totalPrice;
//  alert(CoursePriceTypeCombo.getValue());
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
          task: "ADDCONTRACTCOURSE",
          courseId : CourseNameCombo.getValue(),
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
          	
          if(saveAndQuit == true){
          var redirect = '../JSP/completeProposal.jsp'; 
		 window.location = redirect;
          }
			
 		
 	
 		
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
    } else {
      Ext.MessageBox.alert('Warning', 'Your Form is not valid!');
    }
  
  
  }
 //resetCourseForm(); 
/*-----------------------FINISH ADDING----------------------------------------*/
var pan= new Ext.TabPanel({
                    region:'center',
                     height:495, 
                           /* width:980,*/
        			renderTo: 'binding-example',
                    deferredRender:false,
                    autoScroll: true,
                    autoWidth:true,
                    activeTab:0,
                    items:[AddCourseForm]}); 
});