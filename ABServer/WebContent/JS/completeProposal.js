// dates validation
Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.maxValue = date;
            //start.validate();
            this.dateRangeMax = date;
        } 
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.minValue = date;
          //  end.validate();
            this.dateRangeMin = date;
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
         */
        return true;
    }
});


Ext.onReady(function() {

      Ext.form.Field.prototype.msgTarget = 'side';

      var bd = Ext.getBody();

	  var radioValue = 'checked';
	  var checkBoxValue = '0';
	  var editedCoursePrice = 0;
	  var contractPriceValue = 0;
	  var oldCourseName = '';
	
	  var addHideOrReset = true;
      var contractId = '';
 	  var AddCourseWindow;
 	  
/*---------------------add and edit forms elements-------------------------------*/

	  var EditCourseNameCombo;
	  var EditCourseType;
	  var EditCoursePrice;
	  var EditCoursePriceTypeCombo;
	  var EditCourseNumOfRuns;
	  var EditCourseNumDays;
	  var EditCourseNumParticipants;
	  var EditDatashowRadio;
	  var EditCourseTimeRadio;
	  var EditConfirmationDateField;
	  var EditVenuesCombo;
	  var EditVenuesCheckBox;
	  var EditCoordinatorsCombo;
	  var EditVenueLocation;













 
var Course  = Ext.data.Record.create([
{name: 'courseId', type: 'int'},
  {name: 'courseName', type: 'string'},
  {name: 'courseRuns', type: 'int'},
  {name: 'courseDays', type: 'int'},
  {name: 'courseTotalDays', type: 'int'},
  {name: 'courseType', type: 'string'},
  {name: 'coursePriceType', type: 'string'},
  {name: 'coursePrice', type: 'int'},
  {name: 'courseParticipantsPerRun', type: 'int'},
  {name: 'courseTotalPrice', type: 'int'},
  
  {name: 'coordinatorId', type: 'int'},
  {name: 'venueId', type: 'int'},
  {name: 'venueConfirmDate', type: 'date'},
  {name: 'venueLocation', type: 'string'},
  {name: 'datashowRequest', type: 'int'},
  {name: 'courseTime', type: 'int'}

 ]);
 


var Contract = Ext.data.Record.create([
	  {name: 'contractId', type: 'int'},
      {name: 'clientName', type: 'string'},
      {name: 'proposalID', type: 'string'},
      {name: 'contractProactiveType', type: 'string'},
      {name: 'contractRateType', type: 'string'},
      {name: 'contractFundType', type: 'string'},
      {name: 'requestDate', type: 'string'},
      {name: 'tentativeStartDate', type: 'string'},
      {name: 'tentativeEndDate', type: 'string'},
      {name: 'contractDealPerson', type: 'string'},
      {name: 'contractPrice', type: 'int'},
      {name: 'contractTotalPrice', type: 'int'}

     ]);


	var venueFeeIncludedData = [
        ['1','Yes'],
        ['2','No']];

	var venueFeeIncludedDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: venueFeeIncludedData
    });

    dataProxy = new Ext.data.HttpProxy({
     	url: '../proposalActions.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });


    var contractDS = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task:'COMPLETEPROPOSAL'},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results",// The element which contains the total dataset size (optional)
   		record: "Contract",
   		id: "contractId"
        },Contract
        )
      });
      
   //   Console.log("befor load");
      
      contractDS.load();
      
  
  			var clientName = new Ext.form.TextField({
      		fieldLabel: 'Client Name',
      		allowBlank: false,
      		editable: false,
    		readOnly : true,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});
     		
     		
     		var contractDealPerson = new Ext.form.TextField({
      		fieldLabel: 'Coordinator Name',
      		allowBlank: false,
      		editable: false,
    		readOnly : true,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});
     		
//     		var coordinatorName = new Ext.form.TextField({
//      		fieldLabel: 'Coordinator Name',
//      		allowBlank: false,
//      		editable: false,
//    		readOnly : true,
//    		maskRe: /([a-zA-Z0-9\s]+)$/
//     		});
     		
     		var proposalId = new Ext.form.TextField({
      		fieldLabel: 'Proposal ID',
      		allowBlank: false,
      		editable: false,
    		readOnly : true,
    		maskRe: /([a-zA-Z0-9\s]+)$/
    		
     		});
     		
     		var requestDateField = new Ext.form.TextField({
      		fieldLabel: 'Date of Request',
      		allowBlank: false,
      		editable: false,
    		readOnly : true
     		});
     		
     		var tentativeStartDateField = new Ext.form.TextField({
      		fieldLabel: 'Tentative Start Date',
      		allowBlank: false,
      		editable: false,
    		readOnly : true
     		});
     		
     		var tentativeEndDateField = new Ext.form.TextField({
      		fieldLabel: 'Tentative End Date',
      		allowBlank: false,
      		editable: false,
    		readOnly : true
     		});
     		
     		
     		var contractProactiveType = new Ext.form.TextField({
      		fieldLabel: 'Contract Proactive Type',
      		allowBlank: false,
      		editable: false,
    		readOnly : true,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});
     		
     		
     		// the contract fund checkBox
			var contractFundType = new Ext.form.Checkbox({
		     	fieldLabel: 'Contract Fund Type',
				boxLabel: 'Funded By IMC',
				readOnly : true,
				//hideLabel : true,
				value: '1',
				checked: false,
				width:350
			});
     			
     		var contractRateType = new Ext.form.TextField({
      		fieldLabel: 'Contract Rate Type',
      		allowBlank: false,
      		editable: false,
    		readOnly : true,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
     		
     		var contractPrice = new Ext.form.TextField({
      		fieldLabel: 'Contract Price',
      		allowBlank: false,
      		editable: false,
    		disabled : true,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
     		
     		var contractPriceNote = new Ext.form.TextArea({
      		fieldLabel: 'Contract Price Note',
      		allowBlank: false,
      		editable: false,
    		disabled : true,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
     		
     		// the contract rate comboBox
			var contractVenueFeeIncludedCombo = new Ext.form.ComboBox({            	
		    store: venueFeeIncludedDS,
		    fieldLabel: 'Contract Venue Fee Included?',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    value:'1'
			});
			/*-------------------------------------------------*/
	
			var contractTotalPrice = new Ext.form.NumberField({
      		fieldLabel: 'Contract Total Price',
      		allowBlank: false,
      		value: contractPriceValue,
      		readOnly: true

     		});	
	
			var clientReceiveDateField = new Ext.form.DateField({
			 fieldLabel: 'Client Receive Date',
             format: 'd-m-Y',
             minValue: '01-01-1940',
            // disabledDays: [5, 6],
      		 disabled: true,
      		 id: 'startdt',
        	 vtype: 'daterange',
        	 endDateField: 'enddt'
            });
            
     		var clientApproveDateField = new Ext.form.DateField({
			  fieldLabel: 'Client Approve Date',
              format: 'd-m-Y',
              minValue: '01-01-1940',
             // disabledDays: [5, 6],
     		  disabled: true,
        	  id: 'enddt',
        	  vtype: 'daterange',
        	  startDateField: 'startdt' // id of the start date field
     		  
            });
   
  
 
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
  
		contractDS.on('load', function(){
		var contractRec = contractDS.getAt(0);
		clientName.setValue(contractRec.get('clientName'));
		contractPrice.setValue(contractRec.get('contractPrice'));
		contractDealPerson.setValue(contractRec.get('contractDealPerson'));
		
		contractId = contractRec.get('contractId');
		
		proposalId.setValue(contractRec.get('proposalID'));
		requestDateField.setValue(contractRec.get('requestDate'));
		
		tentativeStartDateField.setValue(contractRec.get('tentativeStartDate'));
		tentativeEndDateField.setValue(contractRec.get('tentativeEndDate'));
		
		if(contractRec.get('contractProactiveType') == '1')
		contractProactiveType.setValue('Proactive');
		else
		contractProactiveType.setValue('Reactive');
		
		if(contractRec.get('contractFundType') == '1'){
		contractFundType.setValue(true);
		checkBoxValue = '1';
		contractFundType.disable();
		contractRateType.disable();
		
		contractVenueFeeIncludedCombo.setValue('2');
		contractVenueFeeIncludedCombo.disable();
		contractTotalPrice.setValue(contractRec.get('contractTotalPrice'));
		}
		else{
		contractFundType.setValue(false);
		checkBoxValue = '0';
		contractFundType.disable();
		contractRateType.enable();
		contractVenueFeeIncludedCombo.enable();
		//alert(contractRec.get('contractRateType'));
		
		if(contractRec.get('contractRateType') == '1')
		contractRateType.setValue('International');
		else if(contractRec.get('contractRateType') == '2')
		contractRateType.setValue('Local');
		else
		contractRateType.setValue('Other');
		
		
		contractTotalPrice.setValue(contractRec.get('contractTotalPrice'));
		
		}
		 	function stcCallBack1001(record, opts, success) {
		
		};
		
			loadtest=   ds.load({callback :  stcCallBack1001});
		  
 
  

});
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
 

//////////////************adding form****************/////////////////


/***********************the main form panel******************************/
 var createProposalForm = new Ext.form.FormPanel({
    labelWidth: 150,
    frame: true,
    autoHeight : true,
    autoScroll : true, 
   layout:'table',
   layoutConfig: {columns:2},
    title:'Complete Proposal',
    defaultType: 'fieldset',
   
    items: [{
        	
            xtype: 'fieldset',
            labelWidth: 150,
            hideBorders : false,
            title:'Contract Info',
            defaults: {width: 270},	// Default config options for child items
            defaultType: 'grid',
            height: 379,
            bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
           // border: false,
            style: {
                "margin-left": "10px", // when you add custom margin in IE 6...
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
            },
            items: [clientName,
     		proposalId,
     		contractProactiveType,
     		contractFundType,
     		contractRateType,
     		
     		contractVenueFeeIncludedCombo,
     		
     		contractDealPerson
     		
     		]
        },{
        	
            xtype: 'fieldset',
            labelWidth: 150,
            hideBorders : false,
            title:'Contract Prices & Dates',
            defaults: {width: 240},	// Default config options for child items
            
            height: 379,
            bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
         //   border: false,
            style: {
                "margin-left": "10px", // when you add custom margin in IE 6...
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
            },
            items: [contractPrice,
     		contractPriceNote,contractTotalPrice,requestDateField,
     		tentativeStartDateField,
     		tentativeEndDateField,
     		clientReceiveDateField,
     		clientApproveDateField]
        }
        ],
     		buttons:[{ 
                text:'Save Proposal',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){ 
                    createProposalForm.getForm().submit( 
                    	  	Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../proposalActions.do',
        params: {
          task: "COMPLETEANDSAVEPROPOSAL",
          contractfee:  contractTotalPrice.getValue(),
          contractgroupPrice: contractPrice.getValue(),
          contractVenueFee: contractVenueFeeIncludedCombo.getValue()
        },
        method:'POST', 
        success: function(response){        
			Ext.MessageBox.alert('Status', 'Changes saved successfully.', showResult);

        },
        failure: function(response){
          var result=response.responseText;
          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
        }                      
      })
                    	  ); 
                } 
            },{ 
                text:'Post To Calendar',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){
                	
                	createProposalForm.getForm().submit( 
                    	  	Ext.Ajax.request({   
						        waitMsg: 'Please wait...',
						        url: '../proposalActions.do',
						        params: {
						          task: "POSTTOCALENDAR"
						        },
						        method:'POST', 
						        success: function(response){        
									var redirect = '../pages/CalendarInterface.jsp'; 
								 	window.location = redirect;
						
						        },
						        failure: function(response){
						          var result=response.responseText;
						          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
						        }                      
						      })
                    	  );
                	 
                	 
                	
                } 
            },{ 
                text:'Generate PDF',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){ 
                    createProposalForm.getForm().submit( 
                    	  	Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../proposalActions.do',
        params: {
          task: 	   "GENERATEPDF",
          contractFee: contractTotalPrice.getValue()
        },
        method:'POST', 
        success: function(response){        
			Ext.MessageBox.alert('Status', 'Contract Details saved successfully.');

        },
        failure: function(response){
          var result=response.responseText;
          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
        }                      
      })
                    	  ); 
                } 
            }] 
     		
    
  });


function showResult(btn){
         var redirect = '../pages/contracts.jsp'; 
		 window.location = redirect;
    };


var pan= new Ext.TabPanel({
                    region:'center',
                    height:495, 
                           /* width:980,*/
        			renderTo: 'binding-example',
                    deferredRender:false,
                    autoScroll: true,
                    activeTab:0,
                    items:[createProposalForm,myGrid]});
//end
});