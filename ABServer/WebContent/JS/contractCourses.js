  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////contract courses/////////////////////////////////////////////////
 Ext.onReady(function() {

      Ext.form.Field.prototype.msgTarget = 'side';

      var bd = Ext.getBody();
 
 			gridDataProxy = new Ext.data.HttpProxy({
	     	url: '../ContractCoursesActions.do',
	     	method: 'POST', 
	        headers:{'request-type':'ajax' }
	      	});
 
 			var ds = new Ext.data.GroupingStore({
		       // load using HTTP
		      proxy: gridDataProxy,
		      baseParams:{task:'CONTRACTCOURSES'}, 
		      // the return will be XML, so lets set up a reader
		      reader: new Ext.data.XmlReader({
		        totalRecords: "results", // The element which contains the total dataset size (optional)
		   		record: "Course",           // The repeated element which contains row information
		   		id: "courseId"
		        },Course
		        ),
            groupField:'courseName',
            sortInfo:{field: 'courseName', direction: "ASC"}
            
		        
		      });
  
	
		 	function stcCallBack1001(record, opts, success) {
		
		};
		
			loadtest=   ds.load({callback :  stcCallBack1001});
		  
 
////////////////the courses grid ///////////////////////////////////
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
    sm,
        {id:'courseName',header: "Course", width: 120, sortable: true, locked:false, dataIndex: 'courseName'},
        {header: "Run Number", width: 100, sortable: true, dataIndex: 'courseRuns'},
        {header: "Course Days", width: 100, sortable: true, renderer: change, dataIndex: 'courseDays'},
        
        {header: "Course Type", width: 100, sortable: true, dataIndex: 'courseType'},
        {header: "Price Type", width: 130, sortable: true, dataIndex: 'coursePriceType'},
        {header: "Price", width: 70, sortable: true, renderer: change, dataIndex: 'coursePrice'},
        {header: "Participants Per Run", width: 170, sortable: true, renderer: change, dataIndex: 'courseParticipantsPerRun'},
        {id:'courseTotalPrice',header: "Course Total Price", width: 170, sortable: true, dataIndex: 'courseTotalPrice'}
    ]);

 
/*-------------------------contract courses grid-------------------------------------*/
var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
      colspan:2,
        autoExpandColumn: 'courseTotalPrice',
      //  frame:true,
      	 sm: sm,
      	 height: 290,
         autoHeight: false,
         width: 900,
         border: true,
         region: 'center',
         autoScroll: true,
         title:'Contract Courses',
         tbar: [new Ext.Toolbar.Button({
             text: 'Add Course',
             handler: function(){
             	
             	 var redirect = '../JSP/addContractCourse.jsp?contractId='+contractId; 
		 		 window.location = redirect;
             	
             }
             }),new Ext.Toolbar.Button({
             text: 'Open Running Page',
             handler: openRunningCourses
             }),new Ext.Toolbar.Button({
              text: 'Delete Selection',
             handler: confirmDeleteCourses
              })],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false}),
        view: new Ext.grid.GroupingView({
            forceFit:true,
            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Runs" : "Item"]})'
        }),
        

    });
//    myGrid.on("rowdblclick", function(myGrid) {
//
//	 var sel = myGrid.getSelectionModel().getSelected();
//        var selIndex = ds.indexOf(sel);
//        var seldata=sel.data;
//        var redirect = '../JSP/editContractCourse.jsp?contractId='+contractId+'&courseId='+seldata.courseId+'&courseFund='+checkBoxValue; 
//		window.location = redirect;
// 		//displayEditWindow(seldata);
//        
//});

 var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.courseName);
  }

/*-------------------------------open Running Course Page--------------------------*/
 function openRunningCourses(){
   
         var selections = myGrid.getSelections();
         
         if(selections.length == 0)
          Ext.MessageBox.alert('Uh oh...','You can\'t really open running page for course you haven\'t selected');
          else if(selections.length > 1)
          Ext.MessageBox.alert('Uh oh...','Select one course, only one');
         
         else if(selections.length == 1){
         	var redirect = '../JSP/runningCoursePage.jsp?courseId='+selections[0].get('courseId')+'&contractId='+contractId; 
			window.location = redirect;
          
         }
    
 }

/*--------------------------------------------------------------------------------*/

/*---------------------------deleting contract course(s)---------------------------------------------------------*/

 
 //confirm delete function 
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Do you not like that Course Run at all?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Delete those Course(s) Runs?', deleteCourses);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected');
    }
  }
  
  function deleteCourses(btn){
    if(btn=='yes'){
         var selections = myGrid.getSelections();
         var selectedCourse = [];
         for(i = 0; i< selections.length; i++){
          selectedCourse.push(selections[i].get('courseId'));
        //	contractPriceValue = contractTotalPrice.getValue()-selections[i].get('courseTotalPrice');
   	
         }
        
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../ContractCoursesActions.do',
        params: {
          task: "DELETECONTRACTCOURSE",
               coursesIds:  selectedCourse
              }, method:'POST',
            success: function(response){
              var result=1;
              switch(result){
              case 1:  // Success : simply reload
                ds.reload();
                
                for(i = 0; i< selections.length; i++){
          
                
                var newCourse = new Ext.data.Record({
      				courseName : selections[i].get('courseName'),courseId : selections[i].get('courseId')});
      			
            
            //	coursesDS.add(newCourse);
                }
                
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
       //   contractTotalPrice.setValue(contractPriceValue);
      }  
  }
 
var pan= new Ext.TabPanel({
                    region:'center',
                    height:495, 
                           /* width:980,*/
        			renderTo: 'binding-example',
                    deferredRender:false,
                    autoScroll: true,
                    buttonAlign:'center',
                    activeTab:0,
                    items:[myGrid],
     		buttons:[]});//end
});