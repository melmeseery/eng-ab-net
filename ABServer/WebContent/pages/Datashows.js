
Ext.onReady(function() {

    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

	var Datashows  = Ext.data.Record.create([
      {name: 'datashowInfo', type: 'string'},
      {name: 'datashowName', type: 'string'},
      {name: 'datashowPrice', type: 'int'},
      {name: 'datashowPurchaseDate', type: 'string'},
      {name: 'datashowSalvageDate', type: 'string'},
      {name: 'datashowValid', type: 'boolean'},
      {name: 'idDatashows', type: 'int'}
     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listDataShows.do',
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
   		record: "Datashows",           // The repeated element which contains row information
   		id: "idDatashows"
        },Datashows
        ),
        sortInfo:{field: "datashowName", direction: "ASC"}
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
        {header: "Datashow Name", width: 150, sortable: true, dataIndex: 'datashowName'},
		{header: "Datashow Purchase Date", width: 150, sortable: true, renderer: pctChange, dataIndex: 'datashowPurchaseDate'},
        {header: "Datashow Price", width: 150, sortable: true, dataIndex: 'datashowPrice'},
   		{header: "DataShow Info", width: 150, sortable: true, locked:false, dataIndex: 'datashowInfo'}
        
    ]);


// ////console.log("ana hena");
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
       height:495, 
               /* width:980,*/
        renderTo: 'binding-example',
        title:'Datashows',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Datashow',
             iconCls:'add',
             handler: function(){  window.location = 'addDataShow.jsp';}
             }),'-',new Ext.Toolbar.Button({
              text: 'Delete Selection',
              iconCls:'remove',
              handler: confirmDeleteCourses
              })
             ],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });

   myGrid.on("rowdblclick", function(myGrid) {
/*	 var sel = myGrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;
        Ext.MessageBox.show({
			title: 'Course Details',
			msg: 'Course Name: '+seldata.courseName+' '+'Training Area: '+seldata.trainingArea+' Trainer Name: '+seldata.trainerName,
			width:185,
			buttons: Ext.MessageBox.OK
});*/
 
 ds.on('add', function(){
	ds.reload();
//myGrid.getView().refresh();
   });
 
 var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }

window.location = 'editDataShow.jsp?d='+selections[0].id;
});

  
 
 
 /********************************************************************/
 
  ////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idDatashows);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Do you want to delete this datashow?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those datashows?', deleteCourses);
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
            url: '../listDataShows.do?', 
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


	
	function stcCallBack1001(record, opts, success) {
//if (success) 
//// do whatever
//alert("the sucess ");
//// alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
////console.log("  LOOOOOOOOOOOOOOD ");

};

	loadtest=   ds.load({callback :  stcCallBack1001});

});