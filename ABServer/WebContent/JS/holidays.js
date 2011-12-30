//Dates Validation
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

    var holidayId = 0;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     dataProxy = new Ext.data.HttpProxy({
     	url: '../HolidaysAction.do',
     	method: 'POST',
        headers:{'request-type':'ajax' }
      });

  var sm3 = new Ext.grid.CheckboxSelectionModel();

  var holidayDS = new Ext.data.Store({
             // load using HTTP
      		proxy: dataProxy,
    		baseParams:{task: "Holidays"},
     		 // the return will be XML, so lets set up a reader
      		reader: new Ext.data.XmlReader({
       		// The element which contains the total dataset size (optional)
   			record: "Holiday"
        	},[{name: 'holidayId', type: 'int'},{name: 'HolidayName', type: 'string'},{name: 'fromDate', type: 'string'},{name: 'toDate', type: 'string'}]
        	),
        sortInfo:{field: "HolidayName", direction: "ASC"}
        });
holidayDS.load();

    var holidaysGrid = new Ext.grid.GridPanel({
       title:'Holidays',
        store: holidayDS,
        cm: new Ext.grid.ColumnModel([
            sm3,

            {id:'holidayId',header: "Holiday Name", width: 300, sortable: true, dataIndex: 'HolidayName'}
            ,{header: "From", width: 250, sortable: true, dataIndex: 'fromDate'},
            {header: "To", width: 250, sortable: true, dataIndex: 'toDate'}
        ]),
        sm: sm3,

        viewConfig: {
            forceFit:true
        },

        // inline toolbars
        tbar:[{
            text:'Add Holiday',
            tooltip:'Add a new Holiday',
            iconCls:'add',
            handler: function(){
            	var redirect = '../JSP/createHoliday.jsp';
			 	window.location = redirect;
            }
        },'-',{
            text:'Remove Holiday(s)',
            tooltip:'Remove the selected Holiday(s)',
            iconCls:'remove',
            handler: confirmDeleteHoliday
        },{
            text:'Load Holiday Calendar',
            tooltip:'Load Holiday Calendar from internet',
            iconCls:'add',
            handler: loadHoliday
        }],

        width:600,
        height: 400,
        frame:true
    });
//////////////////////////////////////delete Holiday//////////////////////////////////////////////////////////

 function loadHoliday(){
 	   Ext.MessageBox.confirm('Confirmation','Do you like to load Holiday ?', LoadiCalHoliday);

 }
 function LoadiCalHoliday(btn){
    if(btn=='yes'){
   Ext.Ajax.request({
            waitMsg: 'Please Wait',
            url: '../HolidaysAction.do',
        	params: {
          		task: "loadiCalHoliday",

              },
            method:'POST',
            success: function(response){


                holidaysGrid.getStore().load();


            },
            failure: function(response){
              var result=response.responseText;
              Ext.MessageBox.alert('error','could not connect to the database. retry later');
              }
         });
    }

 }
 //confirm delete function
  function confirmDeleteHoliday(){
    if(holidaysGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Do you not like that Holiday at all?', deleteHoliday);
    } else if(holidaysGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Delete those Holiday(s)?', deleteHoliday);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected');
    }
  }

  function deleteHoliday(btn){
    if(btn=='yes'){
         var selections = holidaysGrid.getSelections();
         var selectedHoliday = [];
         for(i = 0; i< selections.length; i++){
          selectedHoliday.push(selections[i].get('holidayId'));
        //	contractPriceValue = contractTotalPrice.getValue()-selections[i].get('courseTotalPrice');

         }

         Ext.Ajax.request({
            waitMsg: 'Please Wait',
            url: '../HolidaysAction.do',
        	params: {
          		task: "deleteHoliday",

               holidayIds:  selectedHoliday
              },
            method:'POST',
            success: function(response){


                holidaysGrid.getStore().load();


            },
            failure: function(response){
              var result=response.responseText;
              Ext.MessageBox.alert('error','could not connect to the database. retry later');
              }
         });

      }
  }

  ////////////////////////////////edit resource///////////////////////////////////////

   var holidayName = new Ext.form.TextField({
      		fieldLabel: 'Holiday Name',
      		allowBlank: false,
      		//editable: false,
    		//readOnly : true,
    		width:200,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});



	var startHolidayDateField = new Ext.form.DateField({
	 fieldLabel: 'Start Date',
     format: 'd-M-Y',
   //  minValue: '1999-01-10',
    // disabledDays: [5, 6],
     width:200,
	// disabled: true,
	 id: 'startdt',
	 vtype: 'daterange',
	 endDateField: 'enddt'
    });

	var endHolidayDateField = new Ext.form.DateField({
	  fieldLabel: 'End Date',
      format: 'd-M-Y',
   //   minValue: '1999-01-10',
    //  disabledDays: [5, 6],
      width:200,
	//  disabled: true,
	  id: 'enddt',
	  vtype: 'daterange',
	  startDateField: 'startdt' // id of the start date field

    });

  var editHolidayForm = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 100,
        width:340,
        waitMsgTarget: true,
        autoHeight: true,
        items: [
					   holidayName,startHolidayDateField,endHolidayDateField

        ],
         buttons:[{
                text:'Save',
                iconCls:'save',
                formBind: true,
                // Function that fires when user clicks the button
                handler:editHoliday
            },{text:'Cancel',
            	handler:function(){editHolidayWindow.hide();}
            	}
           ]

    });

  editHolidayWindow= new Ext.Window({
      id: 'editHolidayWindow',
      title: 'Editing a Holiday',
      closable:true,
      width: 400,
      height: 200,
      plain:true,
      layout: 'fit',
      items: editHolidayForm
    });

function displayHolidayWindow(){
  if(!editHolidayWindow.isVisible()){

    editHolidayWindow.show();
  } else {
    editHolidayWindow.toFront();
  }


  }


  function editHoliday(){

	Ext.Ajax.request({
		waitMsg: 'Please wait...',
		url: '../HolidaysAction.do',

		params: {
		  task: "editHoliday",
		  holidayid:        holidayId,
		  holiday_name:     holidayName.getValue(),
		  startDate:        startHolidayDateField.getValue().format('Y-m-d'),
		  endDate:          endHolidayDateField.getValue().format('Y-m-d')
		  },
        method:'POST',
        success: function(response){
        	holidaysGrid.getStore().load();
      		editHolidayWindow.hide();
		},
			failure: function(response){  //console.log("faaaaaaaaaail");
        	//addCertificateForm.getForm().reset();
       }
      });



  };

      function returnFormatDate(value){
    	var dt = new Date(Date.parseDate(value,'d-M-Y'));
//    	  //console.log('>>>>>'+value);
//	    //dt = Sun Jan 15 2006 (all date parts specified)
		if(dt.format('Y-m-d') == 'NaN-NaN-NaN')
		dt = new Date(value);
  //console.log('the date = '+dt+' the new date = '+dt.format('Y-m-d'));
		return dt.format('Y-m-d');

    };

holidaysGrid.on("rowdblclick", function(holidaysGrid) {
	  var selections = holidaysGrid.selModel.getSelections();

	  holidayId = selections[0].get('holidayId');

	  holidayName.setValue(selections[0].get('HolidayName'));
	  startHolidayDateField.setValue(returnFormatDate(selections[0].get('fromDate')));
	  console.log(selections[0].get('fromDate')+'  '+returnFormatDate(selections[0].get('fromDate')));
	  endHolidayDateField.setValue(returnFormatDate(selections[0].get('toDate')));

	  displayHolidayWindow();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
var tabs=  new Ext.TabPanel({
                   region:'center',
                    height:495,
                           /* width:980,*/
                           autoHeight : true,
        			renderTo: 'binding-example',
                    deferredRender:false,
                    autoScroll: true,
                    buttonAlign:'center',
                    activeTab:0,
                    items:[holidaysGrid]
                    ,tbar: [
            			''
            			]


                    });


// tabs.on('beforeshow',function(){
//
//
//
// });

});

