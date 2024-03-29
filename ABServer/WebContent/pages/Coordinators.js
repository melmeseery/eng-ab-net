
Ext.onReady(function() {

    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

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
      {name: 'trainingCoordinatorResignationDate', type: 'string'},
      {name: 'manDay', type: 'int'}
     ]);

    dataProxy = new Ext.data.HttpProxy({
     	url: '../listCoordinators.do',
     	method: 'POST',
        headers:{'request-type':'ajax' }
      });

    var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "list"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)

   		record: "Trainingcoordinators",           // The repeated element which contains row information
   		id: "idTrainingCoordinators"
        },Trainingcoordinators
        ),
        sortInfo:{field: "trainingCoordinateFirstName", direction: "ASC"}
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
        {header: "FirstName", width: 100, sortable: true, dataIndex: 'trainingCoordinateFirstName'},
        {header: "LastName", width: 100, sortable: true, dataIndex: 'trainingCoordinateLastName'},
        {header: "Abbreviation", width: 100, sortable: true, dataIndex: 'trainingCoordinateAbb'},
		{header: "Current Title", width: 100, sortable: true, dataIndex: 'trainingCoordinatorCurrentTitle'},
        {header: "Current Salary", width: 100, sortable: true,dataIndex: 'trainingCoordinatorCurrentSalary'},
        {header: "Address", width: 100, sortable: true, dataIndex: 'trainingCoordinateAddress'},
    	{header: "BirthDate", width: 100, sortable: true, dataIndex: 'trainingCoordinateBirthDate'},
        {header: "E-mail", width: 100, sortable: true, dataIndex: 'trainingCoordinateEmail'},
		{header: "Telephone", width: 100, sortable: true, dataIndex: 'trainingCoordinateTelephone'},
        {header: "Mobile", width: 100, sortable: true,dataIndex: 'trainingCoordinateMobile'},
        {header: "HireDate", width: 100, sortable: true, dataIndex: 'trainingCoordinateHireDate'},
    	{header: "Resignation Date", width: 100, sortable: true, locked:false, dataIndex: 'trainingCoordinatorResignationDate'},
    	{header: "Man Day", width: 100, sortable: true, locked:false, dataIndex: 'manDay'}

    ]);



    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
      height:495,
        renderTo: 'binding-example',
               /* width:980,*/
        title:'Training Coordinators',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Coordinator',
             iconCls:'add',
             handler: function(){  window.location = 'addCoordinator.jsp';}
             }),'-',new Ext.Toolbar.Button({
              text: 'Delete Selection',
              iconCls:'remove',
              handler: confirmDeleteCourses
              })
              ],
        viewConfig: {
			forceFit: true
		},
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})

    });

   myGrid.on("rowdblclick", function(myGrid) {
	  var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
         // alert("ssssssssssssss>>>>>> "+selections[i].id);
         }

window.location = 'editCoordinator.jsp?cor='+selections[0].id;
});

// ds.on('add', function(){
//	ds.reload();
////myGrid.getView().refresh();
//   });



 /********************************************************************/

  ////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idTrainingCoordinators);
  }

//  var retreivingDataProxy = new Ext.data.HttpProxy({
//    	url: '../GeneralRetreivingAction.do',
//    	method: 'POST',
//       headers:{'request-type':'ajax' }
// });
//var coordinatorsDS = new Ext.data.Store({
//   // load using HTTP
//  proxy: retreivingDataProxy,
//  baseParams:{task: "coordinators"},
//  // the return will be XML, so lets set up a reader
//  reader: new Ext.data.XmlReader({
//   // The element which contains the total dataset size (optional)
//		record: "Coordinator"
//    },[{name: 'coordinatorName', type: 'string'},{name: 'coordinatorId', type: 'int'}]
//    )
//  });
//var coordinatorId;
//var coordinatorNameCombo = new Ext.form.ComboBox({
//   store: coordinatorsDS,
//   width: 200,
//   fieldLabel: 'Coordinator <html><font color=red> *</font></html>',
//   valueField: 'coordinatorId',
//   displayField:'coordinatorName',
//   selectOnFocus: true,
//   typeAhead: true,
//   editable: false,
//   triggerAction: 'all',
//   emptyText:'Select Coordinator...',
//   selectOnFocus:true,
//    listeners: {
//    select: function (combo, record, index) {
//	    coordinatorId = this.getValue();
//	   // console.log(" the main in coordinator id  "+ coordinatorId);
//
//    }}
//});

  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this Coordinator?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Coordinators?', deleteCourses);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected huh?');
    }
  }

  function deleteCourses(btn){

	  var retreivingDataProxy = new Ext.data.HttpProxy({
	    	url: '../GeneralRetreivingAction.do',
	    	method: 'POST',
	       headers:{'request-type':'ajax' }
	 });
	var coordinatorsDS = new Ext.data.Store({
	   // load using HTTP
	  proxy: retreivingDataProxy,
	  baseParams:{task: "coordinators"},
	  // the return will be XML, so lets set up a reader
	  reader: new Ext.data.XmlReader({
	   // The element which contains the total dataset size (optional)
			record: "Coordinator"
	    },[{name: 'coordinatorName', type: 'string'},{name: 'coordinatorId', type: 'int'}]
	    )
	  });
	var coordinatorId;
	var coordinatorNameCombo = new Ext.form.ComboBox({
	   store: coordinatorsDS,
	   width: 200,
	   fieldLabel: 'Coordinator <html><font color=red> *</font></html>',
	   valueField: 'coordinatorId',
	   displayField:'coordinatorName',
	   selectOnFocus: true,
	   typeAhead: true,
	   editable: false,
	   triggerAction: 'all',
	   emptyText:'Select Coordinator...',
	    listeners: {
	    select: function (combo, record, index) {
		    coordinatorId = this.getValue();
		   // console.log(" the main in coordinator id  "+ coordinatorId);

	    }}
	});

    if(btn=='yes'){
         var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }




     //console.log("  coordinato   oooo rr ");
     ///////////////////////////

     var login = new Ext.FormPanel({
         labelWidth:80,
      //   url:'../Test_Login',
         frame:true,
         title:'Please choose another coordinator',
         width:700,
       //  padding:500,
      //   defaultType:'textfield',
     	monitorValid:true,

     // Specific attributes for the text fields for username / password.
     // The "name" attribute defines the name of variables sent to the server.
         items:[new Ext.form.FieldSet({
               //  title: 'Course Details',
                 autoHeight: true,
               //  width:1000,
               //  height:500,
                 border:false,
                  buttonAlign:'center',
                 defaultType: 'textfield',
                 items:[coordinatorNameCombo],

     // All the magic happens after the user clicks the button
         buttons:[{
                 text:'Confirm Delete',
                 formBind: true,

                 // Function that fires when user clicks the button
                 handler:function(){
             	    console.log(" the main in coordinator id  "+ coordinatorId);
                 	  console.log("  handler  ");
                      //  var idd=5;
//                         var selections = [1 , 4 , 1, 2,3];
//                         var selectedCourse = [];
//                         for(i = 0; i< selections.length; i++){
//                          selectedCourse.push(selections[i].id);
//                        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
//                         }

                 	  selectedCourse.push(coordinatorId);


                 	  Ext.Ajax.request({
                           waitMsg: 'Please Wait',
                           url: '../listCoordinators.do',
                           params: {
                              task: "DELETE",
                              ids:  selectedCourse
                             }, method:'POST',
                           success: function(response){
                             var result=1;
                             switch(result){
                             case 1:  // Success : simply reload
                              //   Ext.MessageBox.alert('  Sucess .... .');
                                 ds.reload();
                                 win.hide();
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
             },{text:'Cancel',
             	handler:function(){

             		//Ext.MessageBox.alert('error','could not connect to the database. retry later');
             		win.hide();
                  }
         	}]
         })
         ]
     });



     var win = new Ext.Window({
         layout:'fit',
         width:380,
         height:180,
       //  renderTo:'binding-example',
         closable: false,
         resizable: false,
         plain: true,
         items: [login]
     });
     console.log(" winnn  ");

     win.show();



//         Ext.Ajax.request({
//            waitMsg: 'Please Wait',
//            url: '../listCoordinators.do',
//            params: {
//               task: "DELETE",
//               ids:  selectedCourse
//              }, method:'POST',
//            success: function(response){
//              var result=1;
//              switch(result){
//              case 1:  // Success : simply reload
//                ds.reload();
//                break;
//              default:
//                Ext.MessageBox.alert('Warning','Could not delete the entire selection.');
//                break;
//              }
//            },
//            failure: function(response){
//              var result=response.responseText;
//              Ext.MessageBox.alert('error','could not connect to the database. retry later');
//              }
//         });
      }  //  fair










  }


  //////////////////////////FINISH DELETING//////////////////////////////////////////



	function stcCallBack1001(record, opts, success) {
//if (success)
//// do whatever
//alert("the sucess ");
//// alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
//////console.log("  LOOOOOOOOOOOOOOD ");

};

	loadtest=   ds.load({callback :  stcCallBack1001});

});