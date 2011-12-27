
Ext.onReady(function() {

    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

	var Resourcefiles  = Ext.data.Record.create([
      {name: 'resourceFileLocation', type: 'string'},
      {name: 'resourceFileName', type: 'string'},
      {name: 'resourceFileType', type: 'string'},
      {name: 'resourceFileUploadDate', type: 'string'},
      {name: 'resourceFileValid', type: 'string'},
      {name: 'courseName', type: 'string'},
      {name: 'idResourceFiles',type:'int'}

     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listResources.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var ds = new Ext.data.GroupingStore({
       // load using HTTP
      proxy: dataProxy,
      groupField:'courseName',
      sortInfo:{field: 'courseName', direction: "ASC"},
       baseParams:{task: "list"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Resourcefiles",           // The repeated element which contains row information
   		id: "idResourceFiles"
        },Resourcefiles
        )
      });
  
 

    // the DefaultColumnModel expects this blob to define columns. It can be extended to provide
    // custom or reusable ColumnModels
      var colModel = new Ext.grid.ColumnModel([
        {header: "Course Name", width: 100, sortable: true, locked:false, dataIndex: 'courseName'}, 
        {header: "Handout Name", width: 100, sortable: true, dataIndex: 'resourceFileName'},
		{header: "Handout UploadDate", width: 150, sortable: true, dataIndex: 'resourceFileUploadDate'}
       ]);

    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
        /* height:495, */
        renderTo: 'binding-example',
		view: new Ext.grid.GroupingView({
            forceFit:true,
            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
        }),
               /* width:980,*/
        title:'Resource Courses',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Course',
             handler: function(){  window.location = 'addResourceCourse.jsp';}
             }),new Ext.Toolbar.Button({
              text: 'Delete Selection',
              handler: confirmDeleteCourses
              })],
        bbar: [{
		      text: 'Save',
		      handler: function(){
		      	
		         var redirect = 'addResourceCapabilities.jsp'; 
		 		window.location = redirect;
		      }},{
		      text: 'Cancel',
		      handler: function(){
		        // because of the global vars, we can only instantiate one window... so let's just hide it.
		        var redirect = '../JSP/addResourceCapabilities.jsp'; 
		 		window.location = redirect;
		      }
		    }],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });

 /*  myGrid.on("rowdblclick", function(myGrid) {
		 var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }

window.location = 'editCourse.jsp?c='+selections[0].id;
});
*/
 
 
/*************************************************************************/
 
  ////////////////////delete selection record(s)//////////////////////////////
//  var selections = myGrid.selModel.getSelections();
//  var selectedCourse = [];
//  for(i = 0; i< myGrid.selModel.getCount(); i++){
//    selectedCourse.push(selections[i].xml.idCourses);
//  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this course?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Delete those Courses?', deleteCourses);
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
////console.log("  LOOOOOOOOOOOOOOD ");

};

	loadtest=   ds.load({callback :  stcCallBack1001});

});