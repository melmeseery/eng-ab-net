Ext.apply(Ext.form.VTypes, {
			daterange : function(val, field) {
				var date = field.parseDate(val);

				// We need to force the picker to update values to recaluate the
				// disabled dates display
				if (!date) {
					return;
				}
				if (field.startDateField
						&& (!this.dateRangeMax || (date.getTime() != this.dateRangeMax
								.getTime()))) {
					var start = Ext.getCmp(field.startDateField);
					start.maxValue = date;
					// start.validate();
					this.dateRangeMax = date;
				}
				if (field.endDateField
						&& (!this.dateRangeMin || (date.getTime() != this.dateRangeMin
								.getTime()))) {
					var end = Ext.getCmp(field.endDateField);
					end.minValue = date;
					// end.validate();
					this.dateRangeMin = date;
				}

				/*
				 * Always return true since we're only using this vtype to set
				 * the min/max allowed values (these are tested for after the
				 * vtype test)
				 */
				return true;
			}
		});

Ext.onReady(function() {

	Ext.form.Field.prototype.msgTarget = 'side';

	var bd = Ext.getBody();

	var Clients = Ext.data.Record.create([{
				name : 'clientName',
				type : 'string'
			}, {
				name : 'clientAddress',
				type : 'string'
			}, {
				name : 'clientColor',
				type : 'string'
			}, {
				name : 'clientWorkDate',
				type : 'string'
			}, {
				name : 'clientInfo',
				type : 'string'
			}, {
				name : 'clientApproachDate',
				type : 'string'
			}, {
				name : 'clientApproachPerson',
				type : 'string'
			}, {
				name : 'clientApp',
				type : 'string'
			}, {
				name : 'idClients',
				type : 'int'
			}, {
				name : 'personFName',
				type : 'string'
			}, {
				name : 'personLName',
				type : 'string'
			}, {
				name : 'personMobile',
				type : 'string'
			}, {
				name : 'personTitle',
				type : 'string'
			}, {
				name : 'personTelePhone',
				type : 'string'
			}, {
				name : 'personEmail',
				type : 'string'
			}, {
				name : 'personDep',
				type : 'string'
			}

	]);

	dataProxy = new Ext.data.HttpProxy({
				url : '../listClients.do',
				method : 'POST',
				headers : {
					'request-type' : 'ajax'
				}
			});

	var ds = new Ext.data.Store({
				// load using HTTP
				proxy : dataProxy,
				baseParams : {
					task : "list"
				},
				// the return will be XML, so lets set up a reader
				reader : new Ext.data.XmlReader({
							totalRecords : "results", // The element which
														// contains the total
														// dataset size
														// (optional)
							record : "Clients", // The repeated element which
												// contains row information
							id : "idClients"
						}, Clients),
				sortInfo : {
					field : "clientName",
					direction : "ASC"
				}
			});

	// example of custom renderer function
	function italic(value) {
		return '' + value + '';
	}

	// example of custom renderer function
	function change(val) {
		if (val > 0) {
			return '' + val + '';
		} else if (val < 0) {
			return '' + val + '';
		}
		return val;
	}
	// example of custom renderer function
	function pctChange(val) {
		if (val > 0) {
			return '' + val + '%';
		} else if (val < 0) {
			return '' + val + '%';
		}
		return val;
	}

	// the DefaultColumnModel expects this blob to define columns. It can be
	// extended to provide
	// custom or reusable ColumnModels
	var colModel = new Ext.grid.ColumnModel([{
				header : "Client Company Name",
				width : 130,
				sortable : true,
				locked : false,
				dataIndex : 'clientName'
			}, {
				header : "Client Abbreviation",
				width : 130,
				sortable : true,
				locked : false,
				dataIndex : 'clientApp'
			}, {
				header : "Main Contact First Name",
				width : 150,
				sortable : true,
				dataIndex : 'personFName'
			}, {
				header : "Main Contact Last Name",
				width : 150,
				sortable : true,
				dataIndex : 'personLName'
			}, {
				header : "Main Contact  Title",
				width : 130,
				sortable : true,
				locked : false,
				dataIndex : 'personTitle'
			}, {
				header : "Main Contact  Departnment",
				width : 150,
				sortable : true,
				locked : false,
				dataIndex : 'personDep'
			}, {
				header : "Main Contact Telephone ",
				width : 130,
				sortable : true,
				locked : false,
				dataIndex : 'personTelePhone'
			}, {
				header : "Main Contact Mobile ",
				width : 130,
				sortable : true,
				dataIndex : 'personMobile'
			}, {
				header : "Main Contact E-Mail ",
				width : 130,
				sortable : true,
				dataIndex : 'personEmail'
			}

	]);

	var filters = new Ext.grid.GridFilters({
				filters : [

				{
							type : 'string',
							dataIndex : 'clientName'
						}

				]
			});

	var myGrid = new Ext.grid.GridPanel({
				ds : ds,
				plugins : filters,
				bbar : new Ext.PagingToolbar({
							store : ds,
							pageSize : 15,
							plugins : filters
						}),
				cm : colModel,
				stripeRows : true,
				height : 495,
				renderTo : 'binding-example',
				/* width:980, */
				title : 'Clients',
				tbar : [new Ext.Toolbar.Button({
									text : 'Add Client',
									iconCls : 'add',
									handler : displayFormWindow
								}), '-', new Ext.Toolbar.Button({
									text : 'Delete Selection',
									iconCls : 'remove',
									handler : confirmDeleteCourses
								})],
				selModel : new Ext.grid.RowSelectionModel({
							singleSelect : false
						})

			});

	myGrid.on("rowdblclick", function(myGrid) {

				var selections = myGrid.selModel.getSelections();
				var selectedCourse = [];
				for (i = 0; i < myGrid.selModel.getCount(); i++) {
					selectedCourse.push(selections[i].id);
					// alert("ssssssssssssss>>>>>> "+selections[i].id);
				}

				window.location = 'editClient.jsp?client=' + selections[0].id;
			});

	ds.on('add', function() {
		ds.reload();
			// myGrid.getView().refresh();
		});

	// //////////////////adding new record//////////////////////////////
	var AddClientForm;
	var AddClientWindow;

	var ClientNameField;
	var ClientAddField;
	var ClientAppField;
	var ClientInfoField;
	var ClientAppDateField;
	var AppPersonField;
	var WorkDateField;

	var CFNameField;
	var CLNameField;
	var CMailField;
	var CTitleField;
	var CTelephoneField;
	var CMobileField;
	var CAddressField;

	ClientNameField = new Ext.form.TextField({
		id : 'clientName',
		fieldLabel : 'Client Company Name <html><font color=red> *</font></html>',
		// maxLength: 20,

		allowBlank : false,
		width : 180,
		// anchor : '95%',
		maskRe : /([a-zA-Z0-9\s]+)$/
	});

	ClientAddField = new Ext.form.TextField({
				id : 'clientAddress',
				fieldLabel : 'Address ',
				// maxLength: 20,
				width : 180,
				// allowBlank: false,
				maskRe : /([a-zA-Z0-9\s]+)$/
			});
	ClientAppField = new Ext.form.TextField({
				id : 'clientApp',
				fieldLabel : 'abbreviation <html><font color=red> *</font></html> ',
				// maxLength: 20,
				width : 180,
				allowBlank : false,
				maskRe : /([a-zA-Z0-9\s]+)$/
			});
	ClientInfoField = new Ext.form.TextField({
				id : 'clientInfo',
				fieldLabel : 'Information ',
				// maxLength: 20,
				width : 180,
				// allowBlank: false,
				maskRe : /([a-zA-Z0-9\s]+)$/
			});
	ClientAppDateField = new Ext.form.DateField({
		fieldLabel : 'Approach Date ',
		format : 'd-M-Y',
		minValue : '1960-01-01',
		width : 180,
		// disabledDays: [5, 6],
		id : 'clientApproachDate'
		,
			// allowBlank: false,
			// vtype: 'daterange',
			// endDateField:'clientWorkDate'
		});

	WorkDateField = new Ext.form.DateField({
		fieldLabel : 'Start Business Date',
		format : 'd-M-Y',
		minValue : '1960-01-01',
		width : 180,
		id : 'clientWorkDate'
		,
			// allowBlank: false,
			// vtype: 'daterange',
			// startDateField:'clientApproachDate',
			// disabledDays: [5, 6]
		});

	AppPersonField = new Ext.form.TextField({
				id : 'clientApproachPerson',
				fieldLabel : 'Approached by ',
				// maxLength: 20,
				// allowBlank: false,
				width : 180,
				// anchor : '95%',
				maskRe : /([a-zA-Z0-9\s]+)$/
			});

	CFNameField = new Ext.form.TextField({
				fieldLabel : 'First Name <html><font color=red> *</font></html> ',
				allowBlank : false,
				width : 180,
				id : 'personFirstName',
				maskRe : /([a-zA-Z0-9\s]+)$/
			});
	CLNameField = new Ext.form.TextField({
				fieldLabel : 'Last Name <html><font color=red> *</font></html> ',
				allowBlank : false,
				width : 180,
				id : 'personLastName',
				maskRe : /([a-zA-Z0-9\s]+)$/
			});
	CMailField = new Ext.form.TextField({
				fieldLabel : 'E-Mail ',
				// allowBlank: false,
				width : 180,
				vtype : 'email',
				id : 'personEmail'
			});
	CMobileField = new Ext.form.TextField({
				fieldLabel : 'Mobile ',
				// allowBlank: false,
				width : 180,
				id : 'personMobile',
				maskRe : /([0-9\s]+)$/
			});
	CTitleField = new Ext.form.TextField({
				fieldLabel : 'Title <html><font color=red> *</font></html> ',
				allowBlank : false,
				width : 180,
				id : 'personTitle'
			});
	CTelephoneField = new Ext.form.NumberField({
				fieldLabel : 'Phone ',
				// allowBlank: false,
				width : 180,
				id : 'personTelePhone'
				,
			});
	CAddField = new Ext.form.TextField({
				fieldLabel : 'Department <html><font color=red> *</font></html> ',
				allowBlank : false,
				width : 180,

				id : 'personAddress'
				,
			});
	var WorkD = '3000-01-01';
	var AppD = '3000-01-01';
	// ////////////************adding form****************/////////////////
	var AddClientForm = new Ext.FormPanel({
				frame : true,
				// title:'Add Coordinator History',
				// labelAlign: 'right',
				labelWidth : 140,
				width : 620,
				waitMsgTarget : true,
				items : [{
					title : 'Clients Details',
					layout : 'column',
					border : false,
					items : [{
						columnWidth : .5,
						layout : 'form',
						border : false,
						items : [ClientNameField, ClientAddField,
								ClientAppField

						]
					}, {
						columnWidth : .5,
						layout : 'form',
						border : false,
						items : [ClientAppDateField, WorkDateField,
								AppPersonField]
					}]
				}, {
					title : 'Main Contact Details',
					layout : 'column',
					border : false,
					items : [{
						columnWidth : .5,
						layout : 'form',
						border : false,
						items : [CFNameField, CLNameField, CTitleField,
								CAddField]
					}, {
						columnWidth : .5,
						layout : 'form',
						border : false,
						items : [CTelephoneField, CMobileField, CMailField]
					}]
				}],
				buttons : [{
							text : 'Save',
							formBind : true,
							// Function that fires when user clicks the button
							handler : AddClientForm
						}, {
							text : 'Cancel',
							handler : function() {
								AddClientWindow.hide();
								resetCourseForm();
							}
						}]

			});

	AddClientWindow = new Ext.Window({
				id : 'AddClientWindow',
				title : 'Add new Client',
				closable : false,
				width : 750,
				height : 350,
				plain : true,
				layout : 'fit',
				items : AddClientForm
			});

	// ////////////********display form
	// functions********************/////////////////

	// reset the Form before opening it
	function resetCourseForm() {
		ClientNameField.reset();
		ClientAddField.reset();
		ClientAppField.reset();
		ClientAppDateField.reset();
		WorkDateField.reset();
		AppPersonField.reset();
		CFNameField.reset();
		CLNameField.reset();
		CAddField.reset();
		CMailField.reset();
		CTelephoneField.reset();
		CMobileField.reset();
		CTitleField.reset();
	}

	// check if the form is valid
	function isCourseFormValid() {
		return (ClientNameField.isValid() && ClientAddField.isValid()
				&& ClientAppField.isValid() && ClientAppDateField.isValid()
				&& WorkDateField.isValid() && AppPersonField.isValid()
				&& CFNameField.isValid() && CLNameField.isValid()
				&& CAddField.isValid() && CMailField.isValid()
				&& CTelephoneField.isValid() && CMobileField.isValid() && CTitleField
				.isValid());
	}

	// display or bring forth the form
	function displayFormWindow() {
		if (!AddClientWindow.isVisible()) {

			AddClientWindow.show();
		} else {
			AddClientWindow.toFront();
		}

	}

	// ///////////////adding course function/////////////////////
	function AddClientForm() {
		if (WorkDateField.getValue() != '') {
			WorkD = WorkDateField.getValue().format('Y-m-d');
		}
		if (ClientAppDateField.getValue() != '') {
			AppD = ClientAppDateField.getValue().format('Y-m-d');
		}
		if (ClientNameField.isValid() && ClientAddField.isValid()
				&& ClientAppField.isValid() && ClientAppDateField.isValid()
				&& WorkDateField.isValid() && AppPersonField.isValid()
				&& CFNameField.isValid() && CLNameField.isValid()
				&& CAddField.isValid() && CMailField.isValid()
				&& CTelephoneField.isValid() && CMobileField.isValid()
				&& CTitleField.isValid()) {
			Ext.Ajax.request({
				waitMsg : 'Please wait...',
				url : '../listClients.do',
				params : {
					task : "AddClient",
					clientName : ClientNameField.getValue(),
					clientAddress : ClientAddField.getValue(),
					clientApp : ClientAppField.getValue(),
					clientWorkDate : WorkD,
					clientApproachDate : AppD,
					clientApproachPerson : AppPersonField.getValue(),
					personAddress : CAddField.getValue(),
					personEmail : CMailField.getValue(),
					personFirstName : CFNameField.getValue(),
					personLastName : CLNameField.getValue(),
					personTelePhone : CTelephoneField.getValue(),
					personTitle : CTitleField.getValue(),
					personMobile : CMobileField.getValue()
				},
				method : 'POST',
				success : function(response) {
					var record = new Ext.data.Record({
								clientName : ClientNameField.getValue(),
								clientApp : ClientAppField.getValue(),
								personAddress : CAddField.getValue(),
								personFName : CFNameField.getValue(),
								personLName : CLNameField.getValue(),
								personTelePhone : CTelephoneField.getValue(),
								personTitle : CTitleField.getValue(),
								personMobile : CMobileField.getValue(),
								personEmail : CMailField.getValue()

							});
					ds.add(record);
					AddClientWindow.hide();
					resetCourseForm();

				},
				failure : function(response) {
					var result = response.responseText;
					Ext.MessageBox
							.alert(
									'error',
									result
											+ '  could not connect to the database. retry later');
				}
			});
		} else {
			var errorMsg = 'Your Form is not valid!';
			Ext.Msg.show({
						title : 'Error',
						msg : errorMsg,
						minWidth : 200,
						modal : true,
						icon : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK
					});
		}

	}

	// //////////////////////////////////////////////////////////////////
	// ///////////////////FINISH ADDING/////////////////////////////
	// //////////////////////////////////////////////////////////////////

	/** ***************************************************************** */

	// //////////////////delete selection
	// record(s)//////////////////////////////
	var selections = myGrid.selModel.getSelections();
	var selectedCourse = [];
	for (i = 0; i < myGrid.selModel.getCount(); i++) {
		selectedCourse.push(selections[i].xml.idClients);
	}

	function confirmDeleteCourses() {
		if (myGrid.selModel.getCount() == 1) // only one president is
												// selected here
		{
			Ext.MessageBox.confirm('Confirmation',
					'Are you sure you want to delete this Client?',
					deleteCourses);
		} else if (myGrid.selModel.getCount() > 1) {
			Ext.MessageBox.confirm('Confirmation',
					'Are you sure you want to delete those Clients?',
					deleteCourses);
		} else {
			Ext.MessageBox
					.alert('Uh oh...',
							'You can\'t really delete something you haven\'t selected huh?');
		}
	}

	function deleteCourses(btn) {
		if (btn == 'yes') {
			var selections = myGrid.selModel.getSelections();
			var selectedCourse = [];
			for (i = 0; i < myGrid.selModel.getCount(); i++) {
				selectedCourse.push(selections[i].id);
				// alert("ssssssssssssss>>>>>> "+selections[i].id);
			}

			Ext.Ajax.request({
						waitMsg : 'Please Wait',
						url : '../listClients.do',
						params : {
							task : "DELETESELECTIONS",
							ids : selectedCourse
						},
						method : 'POST',
						success : function(response) {
							var result = 1;
							switch (result) {
								case 1 : // Success : simply reload
									ds.reload();
									break;
								default :
									Ext.MessageBox
											.alert('Warning',
													'Could not delete the entire selection.');
									break;
							}
						},
						failure : function(response) {
							var result = response.responseText;
							Ext.MessageBox
									.alert('error',
											'could not connect to the database. retry later');
						}
					});
		}
	}

	// ////////////////////////FINISH
	// DELETING//////////////////////////////////////////

	function stcCallBack1001(record, opts, success) {
		// if (success)
		// // do whatever
		// alert("the sucess ");
		// // alert (" number of records "+ds.getCount() +" recourd
		// "+ds.getAt(0)) ;
		// ////console.log(" LOOOOOOOOOOOOOOD ");

	};

	loadtest = ds.load({
				callback : stcCallBack1001
			});

});