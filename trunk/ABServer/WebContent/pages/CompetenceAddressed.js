Ext.onReady(function() {

	Ext.form.Field.prototype.msgTarget = 'side';

	var bd = Ext.getBody();

	var Competencesaddressed = Ext.data.Record.create([{
				name : 'competencesAddressedName',
				type : 'string'
			}, {
				name : 'idCompetencesAddressed',
				type : 'int'
			}]);

	dataProxy = new Ext.data.HttpProxy({
				url : '../listCourses.do',
				method : 'POST',
				headers : {
					'request-type' : 'ajax'
				}
			});

	var ds = new Ext.data.Store({
				// load using HTTP
				proxy : dataProxy,
				baseParams : {
					task : "listCA"
				},
				// the return will be XML, so lets set up a reader
				reader : new Ext.data.XmlReader({
							totalRecords : "results", // The element which
														// contains the total
														// dataset size
														// (optional)
							record : "Competencesaddressed", // The repeated
																// element which
																// contains row
																// information
							id : "idCompetencesAddressed"
						}, Competencesaddressed),
				sortInfo : {
					field : "competencesAddressedName",
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
				header : "Competence Addressed Name",
				width : 180,
				sortable : true,
				locked : false,
				dataIndex : 'competencesAddressedName'
			}]);

	var myGrid = new Ext.grid.GridPanel({
				ds : ds,
				cm : colModel,
				stripeRows : true,
				height : 495,
				/* width:980, */
				renderTo : 'binding-example',
				title : 'Competences Addressed',
				tbar : [new Ext.Toolbar.Button({
									text : 'Add Competences Addressed',
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

				var sel = myGrid.getSelectionModel().getSelected();
				var selIndex = ds.indexOf(sel);
				var seldata = sel.data;

				displayEditCAWindow();
				ECANameField.setValue(seldata.competencesAddressedName);

			});

	ds.on('add', function() {
		ds.reload();
			// myGrid.getView().refresh();
		});

	// //////////////////adding new record//////////////////////////////
	var AddCAForm;
	var AddCAWindow;

	var CANameField;

	CANameField = new Ext.form.TextField({
		id : 'competencesAddressedName',
		fieldLabel : 'Competence Addressed Name <html><font color=red> *</font></html>',
		width : 180,
		// maxLength: 20,
		allowBlank : false,
		// anchor : '95%',
		maskRe : /([a-zA-Z0-9\s]+)$/
	});

	// ////////////************adding form****************/////////////////
	AddCAForm = new Ext.FormPanel({
				labelAlign : 'left',
				bodyStyle : 'padding:5px',
				labelWidth : 150,
				width : 370,
				hight : 150,
				frame : true,
				items : [new Ext.form.FieldSet({
							title : 'Competence Addressed Details',
							autoHeight : true,
							defaultType : 'textfield',
							items : [CANameField]
						})],

				buttons : [{
							text : 'Save and Close',
							handler : addCA
						}, {
							text : 'Cancel',
							handler : function() {
								// because of the global vars, we can only
								// instantiate one window... so let's just hide
								// it.
								AddCAWindow.hide();
							}
						}]
			});

	AddCAWindow = new Ext.Window({
				id : 'AddCAWindow',
				title : 'Creating a New Competence Addressed',
				closable : false,
				width : 440,
				height : 170,
				plain : true,
				layout : 'fit',
				items : AddCAForm
			});

	// ////////////********display form
	// functions********************/////////////////

	// reset the Form before opening it
	function resetCAForm() {
		CANameField.reset();

	}

	// check if the form is valid
	function isCAFormValid() {
		return (CANameField.isValid());
	}

	// display or bring forth the form
	function displayFormWindow() {
		if (!AddCAWindow.isVisible()) {
			resetCAForm();
			AddCAWindow.show();
		} else {
			AddCAWindow.toFront();
		}

	}

	// ///////////////adding Area function/////////////////////
	function addCA() {

		if (CANameField.isValid()) {
			Ext.Ajax.request({
				waitMsg : 'Please wait...',
				url : '../listCourses.do',
				params : {
					task : "AddCA",
					competencesAddressedName : CANameField.getValue()
				},
				method : 'POST',
				success : function(response) {
					var record = new Ext.data.Record({
								competencesAddressedName : CANameField
										.getValue()
							});
					ds.add(record);
					AddCAWindow.hide();

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

	// //////////////////editing new record//////////////////////////////
	var EditCAForm;
	var EditCAWindow;

	var ECANameField;

	ECANameField = new Ext.form.TextField({
				// id: 'audienceName',
				fieldLabel : 'Competence Addressed Name',
				width : 180,
				// maxLength: 20,
				allowBlank : false,
				// anchor : '95%',
				maskRe : /([a-zA-Z0-9\s]+)$/
			});

	// ////////////************editing form****************/////////////////
	EditCAForm = new Ext.FormPanel({
				labelAlign : 'left',
				bodyStyle : 'padding:5px',
				labelWidth : 150,
				width : 370,
				hight : 150,
				frame : true,
				items : [new Ext.form.FieldSet({
							title : 'Targeted Participants Details',
							autoHeight : true,
							defaultType : 'textfield',
							items : [ECANameField]
						})],

				buttons : [{
							text : 'Save and Close',
							handler : EditCA
						}, {
							text : 'Cancel',
							handler : function() {
								// because of the global vars, we can only
								// instantiate one window... so let's just hide
								// it.
								EditCAWindow.hide();
							}
						}]
			});

	EditCAWindow = new Ext.Window({
				id : 'EditCAWindow',
				title : 'Edit Competence Addressed Name',
				closable : false,
				width : 440,
				height : 170,
				plain : true,
				layout : 'fit',
				items : EditCAForm
			});

	// ////////////********display form
	// functions********************/////////////////

	// reset the Form before opening it
	function resetEditCAForm() {
		ECANameField.reset();

	}

	// check if the form is valid
	function isEditCAFormValid() {
		return (ECANameField.isValid());
	}

	// display or bring forth the form
	function displayEditCAWindow() {
		if (!EditCAWindow.isVisible()) {
			resetEditCAForm();
			EditCAWindow.show();
		} else {
			EditCAWindow.toFront();
		}

	}

	// ///////////////Edit Audio function/////////////////////
	function EditCA() {

		if (isEditCAFormValid()) {
			var selections = myGrid.selModel.getSelections();
			var selectedCourse = [];
			for (i = 0; i < myGrid.selModel.getCount(); i++) {
				selectedCourse.push(selections[i].id);
			}
			Ext.Ajax.request({
				waitMsg : 'Please wait...',
				url : '../listCourses.do',
				params : {
					id : selections[0].id,
					task : "EditCA",
					competencesAddressedName : ECANameField.getValue()
				},
				method : 'POST',
				success : function(response) {

					ds.reload();
					EditCAWindow.hide();

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

	/** ***************************************************************** */

	// //////////////////delete selection
	// record(s)//////////////////////////////
	var selections = myGrid.selModel.getSelections();
	var selectedCourse = [];
	for (i = 0; i < myGrid.selModel.getCount(); i++) {
		selectedCourse.push(selections[i].xml.idCompetencesAddressed);
	}

	function confirmDeleteCourses() {
		if (myGrid.selModel.getCount() == 1) // only one president is
												// selected here
		{
			Ext.MessageBox
					.confirm(
							'Confirmation',
							'Are you sure you want to delete this Competence Addressed?',
							deleteCourses);
		} else if (myGrid.selModel.getCount() > 1) {
			Ext.MessageBox
					.confirm(
							'Confirmation',
							'Are you sure you want to delete those Competences Addressed?',
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
			var selectedArea = [];
			for (i = 0; i < myGrid.selModel.getCount(); i++) {
				selectedArea.push(selections[i].id);
				// alert("ssssssssssssss>>>>>> "+selections[i].id);
			}

			Ext.Ajax.request({
						waitMsg : 'Please Wait',
						url : '../listCourses.do',
						params : {
							task : "DELETECA",
							ids : selectedArea
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
		// //console.log(" LOOOOOOOOOOOOOOD ");

	};

	loadtest = ds.load({
				callback : stcCallBack1001
			});

});