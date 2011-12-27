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
    var dispUpd = function(picker) {
      var ad = picker.activeDate;
      picker.activeDate = null;
      picker.update(ad);
    };
    
    if (field.ValidFromField) {
      var sd = Ext.getCmp(field.ValidFromField);
      sd.maxValue = date;
      if (sd.menu && sd.menu.picker) {
        sd.menu.picker.maxDate = date;
        dispUpd(sd.menu.picker);
      }
    } else if (field.ValidToField) {
      var ed = Ext.getCmp(field.ValidToField);
      ed.minValue = date;
      if (ed.menu && ed.menu.picker) {
        ed.menu.picker.minDate = date;
        dispUpd(ed.menu.picker);
      }
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
    
    var Resourcefiles  = Ext.data.Record.create([
      {name: 'resourceFileLocation', type: 'string'},
      {name: 'resourceFileName', type: 'string'},
      {name: 'resourceFileType', type: 'string'},
      {name: 'resourceFileUploadDate', type: 'string'},
      {name: 'resourceFileValid', type: 'string'},
      {name: 'idResourceFiles',type:'int'}

     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listResources.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });
     
    var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
    //   baseParams:{task: "listHistory"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		
   		record: "Resourcefiles",           // The repeated element which contains row information
   		id: "idResourceFiles"
        },Resourcefiles
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

    // the DefaultColumnModel expects this blob to define columns. It can be extended to provide
    // custom or reusable ColumnModels
      var colModel = new Ext.grid.ColumnModel([
        {header: "Handout", width: 150, sortable: true, dataIndex: 'resourceFileName'},
        {header: "Date", width: 150, sortable: true, dataIndex: 'resourceFileUploadDate'}
		
    ]);

 //ds.on('add', function(){
//	ds.reload();
//myGrid.getView().refresh();
 //  });
 
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
        height:500,
        width:700,
        title:'Handouts',
        tbar: [new Ext.Toolbar.Button({
             text: 'Upload Handout',
            handler: displayFormWindow
             }),new Ext.Toolbar.Button({
              text: 'Delete Selection',
            //  handler: confirmDeleteCourses
              })
              ],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });

    /////////////////////////////////////////////////////////////////////
 var Courses  = Ext.data.Record.create([
      {name: 'courseNameEng', type: 'string'},
      {name: 'courseNameAr', type: 'string'},
      {name: 'courseOutlineEng', type: 'string'},
      {name: 'courseOutlineAr', type: 'string'},
      {name: 'courseType', type: 'string'},
      {name: 'trainArea',type:'string'},
      {name: 'idCourses', type: 'int'},
      {name: 'courseDays', type: 'int'}

     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listResources.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

      var Cds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "Courses"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Courses"},           // The repeated element which contains row information
   		[{name: 'courseNameEng', type: 'string'},{name: 'idCourses', type: 'int'}]
        
        )
      });
    
  /**---------------------------------------Add form------------------------------------------*/  
    
 var CourseDescField = new Ext.form.TextArea({
      		fieldLabel: 'Handout Description',
      		allowBlank: false,
    		id: 'courseDescription',
    		width:200,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
   var uploadHandoutField = new Ext.form.TextField({
      		fieldLabel: 'Handout File',
      		width:200,
    		inputType: 'file'

     		});
 
 
   
  var fullDate;
 
    //////////////************adding form****************/////////////////
  //  var valid='Salary';
 //   var flag=true;
    var fs = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 90,
        width:340,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
                title: 'Handout Details',
                autoHeight: true,
                defaultType: 'textfield',
                items: [ uploadHandoutField,
					   CourseDescField
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:AddHandout
            },{text:'Cancel',
            	handler:function(){AddTAWindow.hide();}
            	}
           ] 
  
    });
  AddTAWindow= new Ext.Window({
      id: 'AddTAWindow',
      title: 'Adding a Datashow Maintainance',
      closable:true,
      width: 400,
      height: 220,
      plain:true,
      layout: 'fit',
      items: fs
    });


var CoursesField = new Ext.form.ComboBox({
                       store: Cds,
                       id: 'courseNameEng',
					    fieldLabel: 'Course Name',
					    displayField:'courseNameEng',
					    valueField:'idCourses',
					    typeAhead: true,
					    editable: false,
					    width:200,
					    triggerAction: 'all',
					    emptyText:'Select Course...',
					    selectOnFocus:true
		    }); 
var validFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From',
                format: 'Y-m-d',
                width:200,
                minValue: '06-01-01',
            //    disabledDays: [5, 6],
            //    id: 'datashowSalvageDate',
        	//	vtype: 'daterange',
        	//	requestDateField: 'requestdt'
            });		     
var msg = function(title, msg){
        Ext.Msg.show({
            title: title, 
            msg: msg,
            minWidth: 200,
            modal: true,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK
        });
    };		    
function resetCourseForm(){
	uploadHandoutField.reset();
	CourseDescField.reset();
}		    
function displayFormWindow(){
  if(!AddTAWindow.isVisible()){
    resetCourseForm();
    AddTAWindow.show();
  } else {
    AddTAWindow.toFront();
  }
  
  
  }		       	    
    /*=================================================================*/
    var simple = new Ext.FormPanel({
        labelWidth: 150, // label settings here cascade unless overridden
     //   url:'../listCProperties',
        frame:true,
        title: 'Add Course',
        bodyStyle:'padding:5px 5px 0',
        width: 600,
         fileUpload: true,
        defaults: {width: 541},
        defaultType: 'textfield',

        items: [  new Ext.form.FieldSet({
             autoHeight: true,
             title:"Courses",
                defaultType: 'textfield',
                items:[
        		   CoursesField,validFromField]}),
        		   myGrid
        		]    });
//  //console.log("ana henaaaa")  
  

 var pan= new Ext.TabPanel({
                    region:'center',
                    deferredRender:false,
                    activeTab:0,
                    /* height:495, */
                           /* width:980,*/
                    bbar: [{
		      text: 'Save',
		      handler:function(){
                var files=[];
                	for(i=0;i<ds.getCount();i++)
                	{
                		var fileRec = ds.getAt(i);
                		files.push(fileRec.get('resourceFileName'));
                	}
                    	      Ext.Ajax.request({   
        						waitMsg: 'Please wait...',
        						url: '../listResources.do',
        						
								params: {
								  task: "AddCourse",
								  courseName:CoursesField.getValue(),
								  files:files,
								  validFrom:validFromField.getValue().format('Y-m-d'),
								  fullDate:fullDate
								  },
						        method:'POST', 
						        success: function(response){ //console.log("success");
						  simple.getForm().submit({
	                	
	                    url: '../upload.do',
	                    waitMsg: 'Uploading your Files...',
	                   
	                    success: function(fp, o){
	                        msg('Success', 'Processed your files on the server');
	                      	//addTab();
	                    var redirect = '../JSP/addResourceCapabilities.jsp'; 
			 			window.location = redirect;
	                        
	                        
	                    }
                   }
	              
                 );
      
						        },
						        failure: function(response){//console.log("faaaaaaaaaail");
						        	simple.getForm().reset(); 
						       }                      
						      }); 
                } 
            }
		      ,{
		      text: 'Cancel',
		      handler:function(){window.location='addResourceCapabilities.jsp';}
		    }],
        	renderTo: 'binding-example',
            items:[simple]});
      
 function AddHandout(){
 
    				 var d=new Date();//alert(d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate());
	                       
			 		var d1=d.getMonth();
			 		if(d1<10)
			 			d1='0'+d1;
			 		
			 		var d2=d.getDate();
			 		if(d2<10)
			 			d2='0'+d2	
			 			
			 		fullDate=d.getFullYear()+'-'+d1+'-'+d2;	
			 		 var record = new Ext.data.Record({
						    	  resourceFileName:			uploadHandoutField.getValue(),
								  resourceFileUploadDate:   fullDate
								  
								  
						    });  
						    ds.add(record);
	                  		AddTAWindow.hide();      
	                        
	                    }      
   
  
  
  

  ////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idResourceFiles);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this File?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Delete those Files?', deleteCourses);
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
            url: '../listResources.do', 
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
//loadtest=   ds.load({callback :  stcCallBack1001});
    simple.render(document.body);

   
});