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
	var Teams  = Ext.data.Record.create([
      {name: 'teamsName', type: 'string'},
      {name: 'teamsid', type: 'int'}
     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listCoordinators.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "listTByID"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Teams",           // The repeated element which contains row information
   		id: "teamsid"
        },Teams
        )
      });
  
 ds.load();
//alert("???????");
ds.on('load', function(){//alert("ay 7agaaaaaa");
//alert(ds.getAt(0));
var TRec = ds.getAt(0);
TNameField.setValue(TRec.get('teamsName'));
});
  
  
var Teammembers  = Ext.data.Record.create([
      {name: 'coordinatorName', type: 'string'},
      {name: 'coordinatorApp', type: 'string'},
      {name: 'coordinatorEmail', type: 'string'},
      {name: 'idTeammembers', type: 'int'}

     ]);
dataProxy = new Ext.data.HttpProxy({
     	url: '../listCoordinators.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var Tds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "listTeamMembers"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Teammembers",           // The repeated element which contains row information
   		id: "idTeammembers"
        },Teammembers
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
        {header: "Coordinator Name", width: 150, sortable: true, dataIndex: 'coordinatorName'}, 
        {header: "Coordinator App", width: 150, sortable: true, dataIndex: 'coordinatorApp'},
        {header: "Coordinator E-Mail", width: 150, sortable: true, dataIndex: 'coordinatorEmail'}
   
    ]);

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
      {name: 'trainingCoordinateTelephone', type: 'string'},
      {name: 'trainingCoordinatorCurrentSalary', type: 'string'},
      {name: 'trainingCoordinatorCurrentTitle', type: 'string'},
      {name: 'trainingCoordinatorResignationDate', type: 'string'}      
     ]);

    var myGrid = new Ext.grid.GridPanel({
        ds: Tds,
        cm: colModel,
        stripeRows: true,
        autoScroll:true,
        height:350,
        width:600,
        title:'Training Coordinators',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Coordinator',
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
        {header: "Coordinator Name", width: 150, sortable: true, dataIndex: 'trainingCoordinateFirstName'}
    ]);

dataProxy = new Ext.data.HttpProxy({
     	url: '../listCoordinators.do',
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
   		record: "Trainingcoordinators",           // The repeated element which contains row information
   		id: "idTrainingCoordinators"
        },Trainingcoordinators
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
        title:'Training Coordinators',
      //  tbar: [new Ext.Toolbar.Button({
        //     text: 'Add To Track',
          //   handler: addToTrackForm
            // })],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });
    
  /*   myGrid.on("rowdblclick", function(myGrid) {
	var sel = myGrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;

		displayEFormWindow();
		CourseNameField.setValue(seldata.courseNameEng);
		CourseDaysField.setValue(seldata.courseDays);
		
		
});*/

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
 	var TNameField;
 //	var TrackCodeField;
 	 var courseName=[];
  TNameField = new Ext.form.TextField({
    id: 'teamName',
    fieldLabel: 'Team Name <html><font color=red> *</font></html>',
//    maxLength: 20,
    width:200,
    allowBlank: false,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  
     
    /*=================================================================*/
    var simple = new Ext.FormPanel({
        labelWidth: 150, // label settings here cascade unless overridden
     //   url:'../listCProperties',
        frame:true,
        title: 'Edit Team',
        bodyStyle:'padding:5px 5px 0',
   //     width: 1000,
        defaults: {width: 500},
        defaultType: 'textfield',

        items: [new Ext.form.FieldSet({
             autoHeight: true,
             title:"Team Details",
                defaultType: 'textfield',
                items:[
        		   TNameField,
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
                	if(TNameField.isValid())
                	{
	                  simple.getForm().submit( 
	                  			 
	                    	      Ext.Ajax.request({   
	        						waitMsg: 'Please wait...',
	        						url: '../listCoordinators.do',
									params: {
									  task: "EditTeam",
									  names:					TNameField.getValue()
								
									},
							        method:'POST', 
							        success: function(response){ ////console.log("success");//alert(valid);
							        		 var redirect = 'Teams.jsp'; 
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
            	handler:function(){window.location='Teams.jsp';}
            	}
           ]});
                    
function stcCallBack1001(record, opts, success) {
//if (success) 
//// do whatever
//alert("the sucess ");
//alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
////console.log("  LOOOOOOOOOOOOOOD ");

};

 loadtest=   Tds.load({callback :  stcCallBack1001});
//loadtest1=   Eds.load({callback :  stcCallBack1001});
  simple.render(document.body);  
  
  
   var win= new Ext.Window({
      id: 'AddCourseWindow',
      title: 'Adding Coordinators to Team',
      closable:false,
      width: 400,
      height: 400,
      plain:true,
      layout: 'fit',
      items: [myAllGrid],buttons: [{text:'Add To Team',handler:addToTeamForm},{text:'Cancel',handler:function(){win.hide();}}]
  });
 // win.show();
   function addToTeamForm(){
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
	        url: '../listCoordinators.do',
	        params: {
	          task: "AddCToTeams",
	          ids:  selectedCourse
	        },
	        method:'POST', 
	        success: function(response){        
	
				//win.hide();
				Tds.reload();
				all.reload();
	            Ext.MessageBox.alert('','Coordinators added successfully');  
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
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this coordinator?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those coordinators?', deleteCourses);
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
            url: '../listCoordinators.do', 
            params: { 
               task: "DELETECoo", 
               ids:  selectedCourse
              }, method:'POST',
            success: function(response){
              var result=1;
              switch(result){
              case 1:  // Success : simply reload
                Tds.reload();
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