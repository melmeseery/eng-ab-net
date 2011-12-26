
Ext.onReady(function() {

    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

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
      baseParams:{task: "listTeams"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Teams",           // The repeated element which contains row information
   		id: "teamsid"
        },Teams
        ),
        sortInfo:{field: "teamsName", direction: "ASC"}
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
      	{header: "Team Name", width: 180, sortable: true, locked:false, dataIndex: 'teamsName'}
    ]);


 
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
         height:495, 
               /* width:980,*/
        renderTo: 'binding-example',
        title:'Teams',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Team',
             iconCls:'add',
             handler: displayFormWindow             
             }),'-',new Ext.Toolbar.Button({
              text: 'Delete Selection',
              iconCls:'remove',
              handler: confirmDeleteCourses
              })],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });

   myGrid.on("rowdblclick", function(myGrid) {
 var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }

window.location = 'editTeam.jsp?d='+selections[0].id;
});

  
  ds.on('add', function(){
	ds.reload();
//myGrid.getView().refresh();
   });

 ////////////////////adding new record//////////////////////////////
  var AddTForm;
  var AddTWindow;
  
  var TNameField;
 
  TNameField = new Ext.form.TextField({
    id: 'teamsName',
    fieldLabel: 'Team Name <html><font color=red> *</font></html>',
    width:180,
  //  maxLength: 20,
    allowBlank: false,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  
  
 
    //////////////************adding form****************/////////////////
    AddTForm = new Ext.FormPanel({
        labelAlign: 'left',
        bodyStyle:'padding:5px',
        labelWidth: 150,
        width: 370, 
        hight:150, 
        frame:true,      
        items: [ new Ext.form.FieldSet({
                title: 'Team Details',
                autoHeight: true,
                defaultType: 'textfield',
                items: [
               TNameField]
            })],
       
    buttons: [{
      text: 'Save and Close',
      handler: addT
    },{
      text: 'Cancel',
      handler: function(){
        // because of the global vars, we can only instantiate one window... so let's just hide it.
        AddTWindow.hide();
      }
    }]
    });
  
  AddTWindow= new Ext.Window({
      id: 'AddTWindow',
      title: 'Creating a New Team',
      closable:false,
      width: 440,
      height: 170,
      plain:true,
      layout: 'fit',
      items: AddTForm
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetTForm(){
    TNameField.reset();
   
  }
  
  // check if the form is valid
  function isTFormValid(){
  return(TNameField.isValid());
  }
  
  // display or bring forth the form
  function displayFormWindow(){
  if(!AddTWindow.isVisible()){
    resetTForm();
    AddTWindow.show();
  } else {
    AddTWindow.toFront();
  }
  
  
  }
    
    
  /////////////////adding Area function/////////////////////
  function addT(){
  
   if(TNameField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listCoordinators.do',
        params: {
          task: "AddCT",
          teamsName:      TNameField.getValue()
        },
        method:'POST', 
        success: function(response){        
			 var record = new Ext.data.Record({
						    	  teamsName:      TNameField.getValue()
						    });  
						    ds.add(record); 
						    AddTWindow.hide();   
		
              
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
    
 ////////////////////editing new record//////////////////////////////
  var EditTForm;
  var EditTWindow;
  
  var ETNameField;
 
  ETNameField = new Ext.form.TextField({
   // id: 'audienceName',
    fieldLabel: 'Team Name',
    width:180,
  //  maxLength: 20,
    allowBlank: false,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  
  
 
    //////////////************editing form****************/////////////////
    EditTForm = new Ext.FormPanel({
        labelAlign: 'left',
        bodyStyle:'padding:5px',
        labelWidth: 150,
        width: 370, 
        hight:150, 
        frame:true,      
        items: [ new Ext.form.FieldSet({
                title: 'Targeted Participants Details',
                autoHeight: true,
                defaultType: 'textfield',
                items: [
               ETNameField]
            })],
       
    buttons: [{
      text: 'Save and Close',
      handler: EditT
    },{
      text: 'Cancel',
      handler: function(){
        // because of the global vars, we can only instantiate one window... so let's just hide it.
        EditTWindow.hide();
      }
    }]
    });
  
  EditTWindow= new Ext.Window({
      id: 'EditTWindow',
      title: 'Edit Team Name',
      closable:false,
      width: 440,
      height: 170,
      plain:true,
      layout: 'fit',
      items: EditTForm
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetEditTForm(){
    ETNameField.reset();
   
  }
  
  // check if the form is valid
  function isEditTFormValid(){
  return(ETNameField.isValid());
  }
  
  // display or bring forth the form
  function displayEditTWindow(){
  if(!EditTWindow.isVisible()){
    resetEditTForm();
    EditTWindow.show();
  } else {
    EditTWindow.toFront();
  }
  
  
  }
    
    
  /////////////////Edit Audio function/////////////////////
  function EditT(){
  
   if(isEditTFormValid()){
   	var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listCoordinators.do',
        params: {
          id:selections[0].id,
          task: "EditT",
          competencesAddressedName:      ETNameField.getValue()
        },
        method:'POST', 
        success: function(response){        
			 
						    ds.reload(); 
						    EditTWindow.hide();   
		
              
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
  
 
 /********************************************************************/
 
  ////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.teamsid);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this team?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those teams?', deleteCourses);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected huh?');
    }
  }
  
  function deleteCourses(btn){
    if(btn=='yes'){
         var selections = myGrid.selModel.getSelections();
         var selectedArea = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedArea.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }
         
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../listCoordinators.do', 
            params: { 
               task: "DELETETeam", 
               ids:  selectedArea
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
//// alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
////console.log("  LOOOOOOOOOOOOOOD ");

};

	loadtest=   ds.load({callback :  stcCallBack1001});

});