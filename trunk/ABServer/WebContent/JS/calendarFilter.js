Ext.onReady(function() {

      Ext.form.Field.prototype.msgTarget = 'side';

      var bd = Ext.getBody();

	 var filterButton = new Ext.Toolbar.Button({
	 	renderTo:'fi-button',
        iconCls: 'upload-icon',
        handler: displayCalendarFilterWindow
             });
             
             
         	 var  ConflictButton = new Ext.Toolbar.Button({
	 	renderTo:'Conflict-button',
        iconCls: 'upload-icon',
        handler: function (){
        	
        	Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../CalendarAction.do', 
            params: { 
               task: "resetCalendar", 
               
              }, method:'POST',
            success: function(response){
             var redirect = '../pages/ConflictlCalendarInterface.jsp'; 
			 window.location = redirect;
            },
            failure: function(response){
              var result=response.responseText;
              Ext.MessageBox.alert('error','could not connect to the database. retry later');      
              }
         });
        }
          
             });  
             
             
               
        var resetButton = new Ext.Toolbar.Button({
	 	renderTo:'reset-button',
        iconCls: 'upload-icon',
        handler: function(){
        	
        	Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../CalendarAction.do', 
            params: { 
               task: "resetCalendar", 
               
              }, method:'POST',
            success: function(response){
             var redirect = '../pages/generalCalendarInterface.jsp'; 
			 window.location = redirect;
            },
            failure: function(response){
              var result=response.responseText;
              Ext.MessageBox.alert('error','could not connect to the database. retry later');      
              }
         });
        }
             });
    
             
    var retreivingDataProxy = new Ext.data.HttpProxy({
     	url: '../GeneralRetreivingAction.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
  });    
 
 /////////////////////////clients//////////////////////////////////////////////////////
 
  var clientsDS = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
      baseParams:{task:'clients'}, 
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Client",           // The repeated element which contains row information
   		id: "clientId"
        },[{name: 'clientId', type: 'int'},{name: 'clientName', type: 'string'}]
        )
      });
   
   


	  var clientsCombo = new Ext.form.ComboBox({            	
		    store: clientsDS,
		    fieldLabel: 'Clients',
		    displayField:'clientName',
		    valueField: 'clientId',
		    selectOnFocus: true,
			 typeAhead: true,
		     editable: false,
		     triggerAction: 'all',
		     mode: 'local',
			 hideLabel: true,
		    emptyText:'Select Client...',
         listeners: {
         select: function (combo, record, index) {
    	    this.selectedIndex = index;

		
//			
//		
//		
//		
		
		coordinatorsCheckBox.setValue(false);
		resourcesCheckBox.setValue(false);
		coursesCheckBox.setValue(false);
		contractsCheckBox.setValue(false);
			
         }}
	  });
	  clientsCombo.disable();
       var clientsCheckBox = new Ext.form.Checkbox({
	     	boxLabel: 'Clients',
	     	 hideLabel: true,

			checked: false,
			width:190
		});
	
	// when check the contract fund checkbox enable the cotract rate comboBox
 	clientsCheckBox.on('check', function(){
 		if(clientsCheckBox.checked){
 			clientsCombo.enable();
 			
 			clientsCombo.reset();
 			clientsDS.load({params:{task:'clients'}});
 		}
 		else{
 			clientsCombo.disable();
 			
 			clientsCombo.reset();
 		
 		}
   	});
   	
   	//////////////////////////////contracts/////////////////////////////////
   	
   	 var contractsDS = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
     // baseParams:{task:'ALLCONTRACTS'}, 
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Contract",           // The repeated element which contains row information
   		id: "contractId"
        },[{name: 'contractId', type: 'int'},{name: 'contractName', type: 'string'}]
        )
      });
      
//loadtest=   resourcesDS.load({callback :  stcCallBack1002});
//       resourcesDS.on('load', function(){ 
//		
//		var courseRec = resourcesDS.getAt(0);
//		courseId = courseRec.get('resourceId');
//		
//	//	alert(courseId);
//       });
	//alert(resourcesDS.get(0).get('resourceId'));
	  var contractsCombo = new Ext.form.ComboBox({            	
		    store: contractsDS,
		    fieldLabel: 'Contracts',
		    displayField:'contractName',
		    valueField: 'contractId',
		    selectOnFocus: true,
			 typeAhead: true,
		     editable: false,
		     triggerAction: 'all',
		     mode: 'local',
			 hideLabel: true,
		    emptyText:'Select Contract...',
         listeners: {
         select: function (combo, record, index) {
    	    this.selectedIndex = index;
    	 
		coordinatorsCheckBox.setValue(false);
		resourcesCheckBox.setValue(false);
		coursesCheckBox.setValue(false);
		
		
    	 
         }}
	  });
	  contractsCombo.disable();
	  
       var contractsCheckBox = new Ext.form.Checkbox({
	     	boxLabel: 'Contracts',
	     	 hideLabel: true,
			//boxLabel: 'Funded By IMC',
			//name: 'search_option',
		//	value: '1',
			checked: false,
			width:190
		});
	
	// when check the contract fund checkbox enable the cotract rate comboBox
 	contractsCheckBox.on('check', function(){
 		if(contractsCheckBox.checked){
 			contractsCombo.enable();
 			
 			contractsCombo.reset();
 			
 			if(clientsCombo.getValue() == '')
 			contractsDS.load({params:{task:'contracts'}});
 			else 
 			contractsDS.load({params:{task:'contractsByClientId',client_id: clientsCombo.getValue()}});
 		}
 		else{
 			contractsCombo.disable();
 			
 			contractsCombo.reset();
 		
 		}
   	});
   	//////////////////courses/////////////////////////////////////
   	
   	 var coursesDS = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
   //   baseParams:{task:'ALLCOURSES'}, 
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Course",           // The repeated element which contains row information
   		id: "courseId"
        },[{name: 'courseId', type: 'int'},{name: 'courseName', type: 'string'}]
        )
      });
      

	  var coursesCombo = new Ext.form.ComboBox({            	
		    store: coursesDS,
		    fieldLabel: 'Courses',
		    displayField:'courseName',
		    valueField: 'courseId',
		    selectOnFocus: true,
			 typeAhead: true,
		     editable: false,
		     triggerAction: 'all',
		     mode: 'local',
			 hideLabel: true,
		    emptyText:'Select Course...',
         listeners: {
         select: function (combo, record, index) {
    	    this.selectedIndex = index;
    	
		coordinatorsCheckBox.setValue(false);
		resourcesCheckBox.setValue(false);
		
		
         }}
	  });
	  coursesCombo.disable();
	  
       var coursesCheckBox = new Ext.form.Checkbox({
	     	boxLabel: 'Courses',
	     	 hideLabel: true,
			//boxLabel: 'Funded By IMC',
			//name: 'search_option',
		//	value: '1',
			checked: false,
			width:190
		});
	
	// when check the contract fund checkbox enable the cotract rate comboBox
 	coursesCheckBox.on('check', function(){
 		if(coursesCheckBox.checked){
 			coursesCombo.enable();
 			
 			coursesCombo.reset();
 			
 			if(contractsCombo.getValue() == ''){
 				if(clientsCombo.getValue() == '')
 				coursesDS.load({params:{task:'courses'}});
 				else
 					coursesDS.load({params:{task:'coursesByClientId',client_id: clientsCombo.getValue()}});
 			}
 			else
 			coursesDS.load({params:{task:'coursesByContractId',contract_id: contractsCombo.getValue()}});	
 			
 		}
 		else{
 			coursesCombo.disable();
 			
 			coursesCombo.reset();
 		
 		}
   	});
   	
  //////////////////////////////resources///////////////////////////////////////////////
   	
 var resourcesDS = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
   //   baseParams:{task:'ALLRESOURCES'}, 
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Resource",           // The repeated element which contains row information
   		id: "resourceId"
        },[{name: 'resourceId', type: 'int'},{name: 'resourceName', type: 'string'}]
        )
      });
      
	  var resourcesCombo = new Ext.form.ComboBox({            	
		    store: resourcesDS,
		    fieldLabel: 'Resources',
		    displayField:'resourceName',
		    valueField: 'resourceId',
		    selectOnFocus: true,
			 typeAhead: true,
		     editable: false,
		     triggerAction: 'all',
		     mode: 'local',
			 hideLabel: true,
		    emptyText:'Select Resource...',
         listeners: {
         select: function (combo, record, index) {
    	    this.selectedIndex = index;
    	
         }}
	  });
	  resourcesCombo.disable();
       var resourcesCheckBox = new Ext.form.Checkbox({
	     	boxLabel: 'Resources',
	     	 hideLabel: true,
			
			checked: false,
			width:190
		});
	
	// when check the contract fund checkbox enable the cotract rate comboBox
 	resourcesCheckBox.on('check', function(){
 		if(resourcesCheckBox.checked){
 			resourcesCombo.enable();
 			
 			resourcesCombo.reset();
 			if(coursesCombo.getValue() == ''){
 			if(contractsCombo.getValue() == ''){
 				if(clientsCombo.getValue() == '')
 				resourcesDS.load({params:{task:'resources'}});
 				else
 					resourcesDS.load({params:{task:'assignedResourcesByClientId',client_id: clientsCombo.getValue()}});
 			}
 			else
 			resourcesDS.load({params:{task:'assignedResourcesByContractId',contract_id: contractsCombo.getValue()}});
 			}
 			else
 			resourcesDS.load({params:{task:'assignedResourcesByCourseId',course_id: coursesCombo.getValue()}});	
 			
 		}
 		else{
 			resourcesCombo.disable();
 			
 			resourcesCombo.reset();
 		
 		}
   	});
   	
     //////////////////////////////coordinators///////////////////////////////////////////////
   	
 var coordinatorsDS = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
    //  baseParams:{task:'ALLCOORDINATORS'}, 
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Coordinator",           // The repeated element which contains row information
   		id: "coordinatorId"
        },[{name: 'coordinatorId', type: 'int'},{name: 'coordinatorName', type: 'string'}]
        )
      });
      
	  var coordinatorsCombo = new Ext.form.ComboBox({            	
		    store: coordinatorsDS,
		    fieldLabel: 'Coordinators',
		    displayField:'coordinatorName',
		    valueField: 'coordinatorId',
		    selectOnFocus: true,
			 typeAhead: true,
		     editable: false,
		     mode: 'local',
		     triggerAction: 'all',
			 hideLabel: true,
		    emptyText:'Select Coordinator...'
	  });
	  coordinatorsCombo.disable();
       var coordinatorsCheckBox = new Ext.form.Checkbox({
	     	boxLabel: 'Coordinators',
	     	 hideLabel: true,
			//boxLabel: 'Funded By IMC',
			//name: 'search_option',
		//	value: '1',
			checked: false,
			width:190
		});
	
	// when check the contract fund checkbox enable the cotract rate comboBox
 	coordinatorsCheckBox.on('check', function(){
 		if(coordinatorsCheckBox.checked){
 			coordinatorsCombo.enable();
 			
 			coordinatorsCombo.reset();
 			if(coursesCombo.getValue() == ''){
 			if(contractsCombo.getValue() == ''){
 				if(clientsCombo.getValue() == '')
 				coordinatorsDS.load({params:{task:'coordinators'}});
 				else
 					coordinatorsDS.load({params:{task:'assignedCoordinatorsByClientId',client_id: clientsCombo.getValue()}});
 			}
 			else
 			coordinatorsDS.load({params:{task:'assignedCoordinatorsByContractId',contract_id: contractsCombo.getValue()}});
 			}
 			else
 			coordinatorsDS.load({params:{task:'assignedCoordinatorsByCourseId',course_id: coursesCombo.getValue()}});	
 			
 		}
 		else{
 			coordinatorsCombo.disable();
 			
 			coordinatorsCombo.reset();
 		
 		}
   	});
   	
////////////////////////////////////////////////////////////////////////////////
//load all data store
		
		
		
  

//var filterItems  = Ext.data.Record.create([
//{name: 'client', type: 'int'},
//  {name: 'contract', type: 'int'},
//  {name: 'course', type: 'int'},
//  {name: 'resource', type: 'int'},
//  {name: 'coordinator', type: 'int'}
//
// ]);
//   
//   var ds = new Ext.data.Store({
//       // load using HTTP
//      proxy: dataProxy,
//      baseParams:{task:'RETRIEVEFILTERITEMS'},  
//      // the return will be XML, so lets set up a reader
//      reader: new Ext.data.XmlReader({
//        
//   		record: "FilterItems"
//        },filterItems
//        )
//      });
//  
//   
//   
//   ds.on('load',function(){
//   	
//   	var filterRec = ds.getAt(0);
//   	
//   	if(filterRec.get('client') != ''){
//   	clientsCheckBox.setValue(true);
//   clientsCombo.enable();
//   	clientsCombo.setValue(clientsDS.getById(filterRec.get('client')).get('clientName'));
//   	}
//   	
//   });
   
   
   
         
	   var addCalendarFilterPanel = new Ext.FormPanel({
        labelWidth: 70, // label settings here cascade unless overridden
     //   url:'../listCProperties',
        frame:true,
     //   title: 'Add Course',
        bodyStyle:'padding:5px 5px 0',
        width: 500,
         
        defaults: {width: 200},
        defaultType: 'textfield',
		height:400,
        items: [ clientsCheckBox,clientsCombo,contractsCheckBox,contractsCombo,coursesCheckBox,coursesCombo, resourcesCheckBox,resourcesCombo, coordinatorsCheckBox,coordinatorsCombo
        		] ,
        		
        		buttons:[{text:'Filter',
            	handler:function(){startFiltering();AddCalendarFilterWindow.hide();}
            	},{text:'Cancel',
            	handler:function(){AddCalendarFilterWindow.hide();}
            	}]   });


    AddCalendarFilterWindow= new Ext.Window({
      id: 'AddCalFilterWindow',
      title: 'Adding a Calendar Filter',
      closable:true,
      width: 350,
      height: 420,
      plain:true,
      layout: 'fit',
      items: addCalendarFilterPanel
    }); 
  
     
  function displayCalendarFilterWindow(){
  	
  	
//  	
//  	
//	
//	
	
  if(!AddCalendarFilterWindow.isVisible()){
  	
    AddCalendarFilterWindow.show();
  } else {
    AddCalendarFilterWindow.toFront();
  }
  
  
  }	
  
  
  
  function startFiltering(){
  	
  	     Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../CalendarAction.do', 
            params: { 
               task: "setFilterItems", 
               
               client:clientsCombo.getValue(),
               contract:contractsCombo.getValue(),
               course:coursesCombo.getValue(),
               resource:resourcesCombo.getValue(),
               coordinator:coordinatorsCombo.getValue()
             
              }, method:'POST',
            success: function(response){
             var redirect = '../pages/generalCalendarInterface.jsp'; 
			 window.location = redirect;
            },
            failure: function(response){
              var result=response.responseText;
              Ext.MessageBox.alert('error','could not connect to the database. retry later');      
              }
         });
  	
  	
   }
      
});