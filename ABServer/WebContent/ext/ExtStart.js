
Ext.onReady(function() {

    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

	var Course  = Ext.data.Record.create([
      {name: 'courseNameEng', type: 'string'},
      {name: 'courseNameAr', type: 'string'},
      {name: 'courseOutlineEng', type: 'string'},
      {name: 'courseOutlineAr', type: 'string'},
      {name: 'courseType', type: 'string'},
      {name: 'trainArea',type:'string'},
      {name: 'idCourses', type: 'int'},
      {name: 'courseColor', type: 'string'},
      {name: 'courseDays', type: 'int'},
      {name: 'courseCompetenceAddressed', type: 'string'}

     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listCourses.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var ds = new Ext.data.GroupingStore({
       // load using HTTP
      proxy: dataProxy,
      groupField:'trainArea',
      sortInfo:{field: 'trainArea', direction: "ASC"},
       baseParams:{task: "list"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Course",           // The repeated element which contains row information
   		id: "idCourses"
        },Course
        ),
        sortInfo:{field: "courseNameEng", direction: "ASC"}
      });
  
    // example of custom renderer function
    function italic(value){
        return '' + value + '';
    }

    // example of custom renderer function
    function change(val,p,record){var s='<DIV style="background-color:'+val+'">&nbsp;</DIV>';
   return String.format(s);
        
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


var filters = new Ext.grid.GridFilters({
	  filters:[
	    
	    {type: 'string',  dataIndex: 'trainArea'},
	    {type: 'string',  dataIndex: 'courseNameEng'}
	]});


    // the DefaultColumnModel expects this blob to define columns. It can be extended to provide
    // custom or reusable ColumnModels
      var colModel = new Ext.grid.ColumnModel([
        {header: "Course Name Eng", width: 130, sortable: true, renderer:renderTopic, locked:false, dataIndex: 'courseNameEng'}, 
        {header: "Course Name Ar", width: 130, sortable: true, renderer:renderArTopic, dataIndex: 'courseNameAr'},
		{header: "Course Days", width: 100, sortable: true, dataIndex: 'courseDays'},
        {header: "Course Type", width: 100, sortable: true, dataIndex: 'courseType'},
        {header: "Training Area", width: 100, sortable: true, dataIndex: 'trainArea'},
        {header: "Competence Addressed", width: 130, sortable: true, dataIndex: 'courseCompetenceAddressed'},
        {header: "Course Color", width: 100, sortable: true, renderer:change, dataIndex: 'courseColor'}
    ]);

 function renderTopic(value, p, record){
 	if(record.get('courseOutlineEng')!='')
 	{
	 	var s="../files/outlines_files/"+record.get('courseOutlineEng');
	 	var link= '<b><a href="'+s+'" target="_self">{0}</a></b>'
	        return String.format(
	                link,value);
	 	}
	 else
	 {
	 	return(value);
	 }
    }
function renderArTopic(value, p, record){
	if(record.get('courseOutlineAr')!='')
 	{
	 	var s="../files/outlines_files/"+record.get('courseOutlineAr');
	 	var link= '<b><a href="'+s+'" target="_self">{0}</a></b>'
	        return String.format(
	                link,value);
 	}
 	else
	 {
	 	return(value);
	 }
    }
 	var x=1;
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
        height:495, 
        plugins: filters,
        enableColLock: false,
	  loadMask: true,
        renderTo: 'binding-example',
		view: new Ext.grid.GroupingView({
            forceFit:true,
            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
        }),
               /* width:980,*/
        title:'Courses',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Course',
             iconCls:'add',
             handler: function(){  window.location = 'AddCourse.jsp';}
             }),'-',new Ext.Toolbar.Button({
              text: 'Delete Selection',
              handler: confirmDeleteCourses,
              iconCls:'remove'
              }),'-',//new Ext.Toolbar.Button({
            // text: 'Add Training Area',
            // handler: displayFormWindow
            // }),
            new Ext.Toolbar.Button({
             text: 'Add To Track',
             iconCls:'add',
             handler: displayAddToTrackFormWindow
             })],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });
ds.on('add', function(){
	ds.reload();
//myGrid.getView().refresh();
   });
   myGrid.on("rowdblclick", function(myGrid) {
		 var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }

window.location = 'editCourse.jsp?c='+selections[0].id;
});

  myGrid.on("rowclick", function(myGrid) {
  x=0;
  });
   var Tracksds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "Tracks"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Tracks"},           // The repeated element which contains row information
   		[{name: 'trackName', type: 'string'},{name: 'idTracks', type: 'int'}]
        
        )
      });
 ////////////////////adding new record//////////////////////////////
  var AddTAForm;
  var AddTAWindow;
  
  var AreaNameField;
  var AreaCodeField;
 
  AreaNameField = new Ext.form.TextField({
    id: 'trainingAreaName',
    fieldLabel: 'Training Area Name',
    maxLength: 100,
    width: 200,
    allowBlank: false,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  AreaCodeField = new Ext.form.TextField({
    id: 'TrainingAreaCode',
    fieldLabel: 'Training Area Code',
     width: 200,
    maxLength: 100,
 //   allowNegative: false,
    allowBlank: false,
 //   anchor : '95%'    
  //  maskRe: /([0-9\s]+)$/
      });
  
 
    //////////////************adding form****************/////////////////
    AddTAForm = new Ext.FormPanel({
       frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 120,
        width:500,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [AreaNameField,
                	   AreaCodeField
					   
		                   ]
            })
        ],
       
    buttons: [{
      text: 'Save and Close',
      handler: addTA
    },{
      text: 'Cancel',
      handler: function(){
        // because of the global vars, we can only instantiate one window... so let's just hide it.
        AddTAWindow.hide();
      }
    }]
    });
  
  AddTAWindow= new Ext.Window({
      id: 'AddTAWindow',
      title: 'Creating a New Training Area',
      closable:true,
      width: 400,
      height: 180,
      plain:true,
      layout: 'fit',
      items: AddTAForm
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetCourseForm(){
    AreaNameField.reset();
    AreaCodeField.reset();
   
  }
  
  // check if the form is valid
  function isCourseFormValid(){
  return(AreaNameField.isValid() && AreaCodeField.isValid());
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
    
    
  /////////////////adding course function/////////////////////
  function addTA(){
  
   if(isCourseFormValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listCProperties.do',
        params: {
          task: "CREATETA",
          trainingAreaName:      AreaNameField.getValue(),
          trainingAreaCode:      AreaCodeField.getValue()
        },
        method:'POST', 
        success: function(response){        

			AddTAWindow.hide();
              
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
 
/*******************************add to track*******************************/ 
 // var AddToTrackForm;
  var AddToTrackWindow;
  
  var TrackNameField;
  var TrackCodeField;
  var CourseTAField;
  var checked=0;
  TrackNameField = new Ext.form.TextField({
    id: 'trackName',
    fieldLabel: 'Track Name',
    maxLength: 100,
    width: 200,
    disabled:true,
    allowBlank: false,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  TrackCodeField = new Ext.form.TextField({
    id: 'trackCode',
    fieldLabel: 'Track Code',
     width: 200,
    maxLength: 100,
    disabled:true,
 //   allowNegative: false,
    allowBlank: false,
 //   anchor : '95%'    
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
  
 CourseTAField = new Ext.form.ComboBox({
                       store: Tracksds,
                       id: 'tracks',
					    fieldLabel: 'Tracks',
					    displayField:'trackName',
					    valueField:'idTracks',
					    typeAhead: true,
					    editable: false,
					    triggerAction: 'all',
					    emptyText:'Select Track...',
					    selectOnFocus:true,
					//    allowBlank: false
		    });
		  
  var myCheckBox = new Ext.form.Checkbox({
     	fieldLabel: 'Add new Track',
	//	boxLabel: 'Add new Track',
		//name: 'search_option',
		value: '1',
		checked: false,
		width:190
	});
	
	// when check the contract fund checkbox enable the cotract rate comboBox
 	myCheckBox.on('check', function(){
 		if(myCheckBox.checked){
 			CourseTAField.disable();
 			TrackNameField.enable();
			TrackCodeField.enable();
 		checked = 1;
 		}
 		else{
 			TrackNameField.reset();
 			TrackCodeField.reset();
			TrackNameField.disable();
			TrackCodeField.disable();
			CourseTAField.enable();
 		checked = 0;
 		}
   	});
    //////////////************adding form****************/////////////////
        addToTrack = new Ext.FormPanel({
        labelWidth: 100, // label settings here cascade unless overridden
       // url:'save-form.php',
        frame:true,
     //   title: 'Simple Form with FieldSets',
        bodyStyle:'padding:5px 5px 0',
        width: 350,

        items: [{
            xtype:'fieldset',
            title: 'Choose from existing Tracks',
            collapsible: true,
            autoHeight:true,
            defaults: {width: 210},
            defaultType: 'textfield',
            items :[ CourseTAField
            ]
        },{
            xtype:'fieldset',
          //  checkboxToggle:true
         //   title: 'Add New Track',
            autoHeight:true,
            defaults: {width: 210},
            defaultType: 'textfield',
          //  collapsed: true,
            items :[myCheckBox,
            	    TrackNameField,
  					TrackCodeField
            ]
        }],

        buttons: [{
      text: 'Save and Close',
      handler: addToTrackForm
    },{
      text: 'Cancel',
      handler: function(){
        // because of the global vars, we can only instantiate one window... so let's just hide it.
        AddToTrackWindow.hide();
      }
    }]
    });

  AddToTrackWindow= new Ext.Window({
      id: 'AddToTrackWindow',
      title: 'Add Courses to track',
      closable:true,
      width: 400,
      height: 280,
      plain:true,
      layout: 'fit',
      items: addToTrack
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetAddToTrackForm(){
    TrackNameField.reset();
    TrackCodeField.reset();
//    myCheckBox.unchecked();
  }
  
  // check if the form is valid
  function isAddToTrackFormValid(){
  return(TrackNameField.isValid() && TrackCodeField.isValid());
  }
 function isCAddToTrackFormValid(){
  return(CourseTAField.isValid());
  } 
  // display or bring forth the form
  function displayAddToTrackFormWindow(){
  	 
  if(myGrid.selModel.getCount()!=0)
  {
	  if(!AddToTrackWindow.isVisible()){
	    resetAddToTrackForm();
	    AddToTrackWindow.show();
	  } else {
	    AddToTrackWindow.toFront();
	  }
  }else{Ext.MessageBox.alert('Warning', 'You did not select any course, please select course first!!');}
  
  }
    
    
  /////////////////adding course function/////////////////////
  function addToTrackForm(){
  var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }
  if(checked==1)
  {
	   if(isAddToTrackFormValid()){//alert(checked);
	      Ext.Ajax.request({   
	        waitMsg: 'Please wait...',
	        url: '../listCProperties.do',
	        params: {
	          task: "AddToTrackN",
	          trackName:      TrackNameField.getValue(),
	          trackCode:      TrackCodeField.getValue(),
	          ids:  		  selectedCourse
	        },
	        method:'POST', 
	        success: function(response){        
	
				AddToTrackWindow.hide();
	              
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
    else 
    {
    	if(isCAddToTrackFormValid())
    	{//alert(checked);
	      Ext.Ajax.request({   
	        waitMsg: 'Please wait...',
	        url: '../listCProperties.do',
	        params: {
	          task: "AddToTrack",
	          idTracks:      CourseTAField.getValue(),
	          ids:  selectedCourse
	        },
	        method:'POST', 
	        success: function(response){        
	
				AddToTrackWindow.hide();
	              
	        },
	        failure: function(response){
	          var result=response.responseText;
	          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
	        }                      
	      });
	    }
    	else
    	 Ext.MessageBox.alert('Warning', 'Your Form is not valid!');
    }
  
  
  }
  
  
 
/*************************************************************************/
 
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
            url: '../listCProperties.do', 
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
/*
var viewport = new Ext.Viewport({
            layout:'border',
            items:[
                new Ext.TabPanel({
                    region:'center',
                    deferredRender:false,
                    activeTab:0,
                    items:[myGrid]})
      

]});
	*/
	function stcCallBack1001(record, opts, success) {
//if (success) 
//// do whatever
//alert("the sucess ");
//// alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
//////console.log("  LOOOOOOOOOOOOOOD ");

};

	loadtest=   ds.load({callback :  stcCallBack1001});

});