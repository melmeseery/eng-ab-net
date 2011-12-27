dojo.require("mywidgets.widget.Calendar");
dojo.require("mywidgets.widget.Timezones");

dojo.addOnLoad(init);
var oCalendar;
var clicks=null;
var clickcount=0;
var MaxClickCount=7;
var clickEvent=0;

var currentCalEntries=null;
var EmptyCourseList=null;

//var calentriesCount=0;


	function init(){
		//djConfig={ isDebug:true,debugContainerId:"dojoDebug"};
		//  //console.log("  [line 19 (init)]  in the Test script ");
		oCalendar = dojo.widget.byId("dojoCalendar");
		//  //console.log(" [line 21 (init)]  oCalednar "+oCalendar);
		oCalendar.setTimeZones(mywidgets.widget.timezones);
		oCalendar.selectedtimezone = dojo.io.cookie.getObjectCookie("DCTZ");
		
		//oCalendar.calendarType= 'MultiMonth';
		//oCalendar.onSetTimeZone = widgetTimeZoneChanged;
		oCalendar.changeEventTimes = true;
		oCalendar.onEventChanged = widgetEventChanged;
	//	oCalendar.onEventChanged=getCoursesFromServer;
		oCalendar.setAbleToCreateNew(false);
		//what to do 
		//oCalendar.onNewEntry = widgetNewEntry;
	oCalendar.onValueChanged =getDataFromServer;
	//   oCalendar.onValueChanged =getCoursesFromServer;
		// what to do when value change 
	//	oCalendar.onValueChanged = widgetValueChanged;
	//	oCalendar.onDateClicked=OnClickDate;
		//oCalendar.onViewChanged=onView;
		//widgetValueChanged(new Date());
		  oCalendar.onValueChanged(new Date());
		 //
		 // oCalendar.SaveCourseClicks=  saveCourse;
		 
		 oCalendar.SaveToDatabase=SaveToDatabase;
		  oCalendar.GetCoursesList=RetriveCourseList;
		 //  //console.log(" iniiit..............................."+courseexample());
		 oCalendar.onCoursesChanged(null);
	
	
		 //checkResourcesFreeDay
		//onClick();
	}
	
	function RetriveCourseList()
	{
		oCalendar.updateUserMessage("Reteriving Course List....");
	//	  //console.log(" get couresse from the servers$$$$$$$$$$$$$$$$$$$$$$$$$$$44");
		//getCoursesFromServer();
		getEditCourseListFromServer();
//		  //console.log("tetisn teh emptycourse list. nowwwwwwwwwwwww")
//		if (EmptyCourseList==null)
//		{ 
//			  //console.log("empty.....................");
//			return courseexample();
//		}
//		else 
//		{
//			return EmptyCourseList;
//		}
		
	}
	
	function json2xml(o, tab) {
   var toXml = function(v, name, ind) {
      var xml = "";
      if (v instanceof Array) {
         for (var i=0, n=v.length; i<n; i++)
            xml += ind + toXml(v[i], name, ind+"\t") + "\n";
      }
      else if (typeof(v) == "object") {
         var hasChild = false;
         xml += ind + "<" + name;
         for (var m in v) {
            if (m.charAt(0) == "@")
               xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
            else
               hasChild = true;
         }
         xml += hasChild ? ">" : "/>";
         if (hasChild) {
            for (var m in v) {
               if (m == "#text")
                  xml += v[m];
               else if (m == "#cdata")
                  xml += "<![CDATA[" + v[m] + "]]>";
               else if (m.charAt(0) != "@")
                  xml += toXml(v[m], m, ind+"\t");
            }
            xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
         }
      }
      else {
         xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
      }
      return xml;
   }, xml="";
   for (var m in o)
      xml += toXml(o[m], m, "");
   return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
}
	

	function SaveToDatabase(course){
		 
		 
		 dojo.require("dojo.io.*");
		dojo.require("dojo.xml.*");
		dojo.require("dojo.string");
		dojo.require("dojo.date.serialize");
		
		 
		//   //console.log("------------------ in SaveToDatabase function ----------------------------- ");
		 var tab = "";
	//	   //console.log(json2xml(course, tab));//dojo.json.serialize(course));
//		
//		dojo.io.bind({
//		    url: "../saveCalendarCourses.do",
//		    method: "post",
//		    /* optional content. If the content is in the
//		     * form of a hashref they are converted to
//		     * post paramters */
//		    content: {
//		        xmlCourse: json2xml(course, tab),
//		        courseId: course.ID
//		    },
//		    load: function(type,data,evt) {
//		       getEditCourseListFromServer();
//		     
//		              //console.log(" (line 193 [ SaveToDatabase]script.js ) testing the before sresh ... ")
//	 
//		   //    oCalendar.refreshScreen();
//		    },
//		    mimetype:'text/xml'
//		});
//		
	
		// convert to json or xml 
		//send as text in paramter to server 
		
		//call action to save in db. 
	}
	 function saveCourse(course,coursedays){
	 	//----------------this funciton supposed to save the course days to the database.
	 	
	 	var varstring= course.Name + "    "+course.ID+"   "+course.Days+"   "+course.Runs;
	 	var cdays=" ";
	 	//SaveCourseClicks
	 	//  //console.log(coursedays);
	 	//  //console.log(coursedays.length)
	 	for(var index=0; index<coursedays.length; index++) {
	 		if (coursedays[index]){
	 				cdays+="    "+coursedays[index];
	 		}
	 		
	 	}
	// 	oCalendar.calendarCourseEvents
	 	// add course to  	oCalendar.calendarCourseEvents
	 	var oldlength=oCalendar.calendarCourseEvents.length;
	 	oCalendar.calendarCourseEvents.length=	oCalendar.calendarCourseEvents.length+1;
	 //	  //console.log()
	 	
      var newEntries=dojo.json.evalJson(dojo.json.serialize(oCalendar.calendarCourseEvents));
       newcourse=oCalendar.calendarCourseEvents.length;
        NewcalendarCourseEvents=oCalendar.calendarCourseEvents;
       
       NewcalendarCourseEvents.length=NewcalendarCourseEvents.length+1;
       calEnt=new Array(coursedays.length);
       
          	var id;
          		var calEntry;
	 		for(var index=0; index<coursedays.length; index++){
					//alert("id: " + id + ", title: " + title + ", date: " + eDate + ", endDate: " + endDate + ", link: " + link);
				var day = new Object;
				day.starttime = dojo.date.toRfc3339(dojo.date.fromRfc3339(coursedays[index]));

					day.EventDate=dojo.date.toRfc3339(dojo.date.fromRfc3339(coursedays[index]));

				day.endtime =  dojo.date.toRfc3339(dojo.date.fromRfc3339(coursedays[index]));
				day.allday = true;
				day.Period = "FD";
				day.DayNo=  index;
		
				 calEnt[index] = day;
					
			}
			course.CourseDays=calEnt;
			
			///add default data.............
			course.type=['reminder'];
		
			  NewcalendarCourseEvents[newcourse]=course;
			  SaveToDatabase(course);
			///    //console.log(dojo.json.serialize(course));
			//  //console.log("aftet the adding of course ");
			//	  //console.log(dojo.json.serialize( NewcalendarCourseEvents));
			// save to database 
			
			
			// then refresh screeeeeeeeeeen.
				oCalendar.setCalendarCoursesEntries(NewcalendarCourseEvents);
				
			
	 	//oCalendar.refreshScreen();
	}
	
	
//	function checkDojoIcal(){
//			  //console.log(" icalllllllllllllllllllllllllllllllllllllllllllllllllllll");
//		
//		//creat the resource free busy time 
//		 
//             var tempString=" BEGIN:VCALENDAR " + "\n"+
//             		" VERSION:2.0 " + "\n"+
//             		" PRODID:-//RDU Software//NONSGML HandCal//EN " + "\n"+
//             		" BEGIN:VFREEBUSY " + "\n"+
//             		" ORGANIZER:MAILTO:jsmith@host.com " + "\n"+
//             		" DTSTART:19980313T141711Z " + "\n"+
//             		" DTEND:19980410T141711Z " + "\n"+
//             		" FREEBUSY:19980314T233000Z/19980315T003000Z " + "\n"+
//             		" FREEBUSY:19980316T153000Z/19980316T163000Z " + "\n"+
//             		" FREEBUSY:19980318T030000Z/19980318T040000Z " + "\n"+
//             		" URL:http://www.host.com/calendar/busytime/jsmith.ifb  " + "\n"+
//             		" END:VFREEBUSY  " + "\n"+
//             		" END:VCALENDAR  ";		 
//		//   //console.log(tempString);
//		var  ResourceCal=dojo.cal.iCalendar.fromText(tempString)  ;
//		
//		
//		
//		  //console.log(dojo.json.serialize(ResourceCal));
//		//	  //console.log(eval(ResourceCal))
//		//  //console.log(dojo.json.serialize(ResourceCal));
//		//dojo.cal.iCalendar.VCalendar.VCalendar()
//	//	var freetime =dojo.cal.iCalendar.VFreeBusy.VFreeBusy( ResourceCal);
//		//  //console.log(dojo.json.serialize(freetime));
//	
//		
//		
//	}		
/*	 function checkClick(day){
	 	if (clickcount==0)
	 	return true;
		for (var i=0 ;  i < clicks.length; i++){
			 //remove this click 
		          // 	
		if (clicks[i] == day)
			{
			//	  //console.log("  iteration "+i+"  day "+day+"  click  = "+clicks[i]);
		       	clicks[i]=null;
				clickcount--;					
				return false;	
			} 
			
		}
		return true;
	}*/
/*	function onView(){
		if (clickEvent==1)
		{
		//  //console.log("in the set date clicked. ")
		 setTheDatesClicked();
		}
		else {
			
		//	  //console.log("not in the first time ");
			
		}
		
	}	
  function OnClickDate(evt) {
  	clickEvent=1;
  	   dojo.event.browser.stopEvent(evt);
	//	  //console.log("A  NEW CLICK ................"+evt.target);
		if (clickcount==0){
			clicks=new Array(40);
		}
	

	
	var eventTarget = evt.target;
	  //  dojo.event.browser.stopEvent(evt);
	      //console.log(eventTarget.getAttribute("Day"));
	//	  //console.log("click clikck click  no of click is "+clickcount);
				if (eventTarget.getAttribute("Day")==null)
				{
					  //console.log(evt);
					  //console.log(eval(evt));
					  //console.log(evt.target);
					alert ("error clicking on the day "+eventTarget.getAttribute("Day")  + " on event "+ eventTarget);
					return;
				}
		 //check count not avaliable 
			if (!checkClick(eventTarget.getAttribute("Day"))){
				
				oCalendar.RemoveDateClick(eventTarget.getAttribute("Day"));
				 //setTheDatesClicked();
				//clicks[i]=clicks[clickcount-1];
				  //console.log(" the day have been removed.....");
			//oCalendar.refreshScreen();
			
			}
			else {
				
					//if (clickcount < MaxClickCount){
				clickcount++;
	
				clicks[clickcount]=eventTarget.getAttribute("Day");
					if (clickcount >= MaxClickCount){
			//	  //console.log(evt.target.getAttribute("Day"));
				
				var s="";
				for(var index=0; index<clicks.length; index++) {
					if (clicks[index]!=null)
					{
						s+=clicks[index]+"  ";
					}
				}
				
				alert(" Adding the selected days to course" +  clickcount + " days " +s);
				for(var index=0; index<clicks.length; index++) {
					if (clicks[index]!=null)
					{
						oCalendar.RemoveDateClick(clicks[index]);
			
						clicks[index]=null;
					}
				}
				clickcount=0;
				  //console.log("now the click count is = "+clickcount);
			
		}
      //    ADDClickToCal(click[c])
			
			}
		
		
	//dojo.event.browser.start(evt);
			//oCalendar.refreshScreen();
//			this.value = dojo.date.fromRfc3339(eventTarget.getAttribute("date"));
//			this.setCalendarType('day');
 	oCalendar.setTheDatesClicked();
		}*/		




//	function readFromXml(type, xml, e) {
//	//	alert("rading xml ");
//		var  CalEntries;
//			var entries = xml.getElementsByTagName("entry");
//	          CalEntries = new Object;
//			for(var e=0;e<entries.length;e++){
//				entry = entries.item(e);
//				var id = dojo.string.trim(entry.getElementsByTagName("id")[0].firstChild.nodeValue);
//				var title = dojo.string.trim(entry.getElementsByTagName("title")[0].firstChild.nodeValue);
//				var body = dojo.string.trim(entry.getElementsByTagName("content")[0].firstChild.nodeValue);
//				var dateString = dojo.string.trim(entry.getElementsByTagName("summary")[0].firstChild.nodeValue);						   
//				datePart = dateString.substring(6,25);
//				var eDate = dojo.date.fromIso8601(datePart);
//				var durationString = dojo.string.trim(dateString.substring(26));
//				var endDate = dojo.date.add(eDate, dojo.date.dateParts.MINUTE, parseInt(durationString));
//						    
//				var link = entry.getElementsByTagName("link")[0].attributes.getNamedItem("href").value;
//				//alert("id: " + id + ", title: " + title + ", date: " + eDate + ", endDate: " + endDate + ", link: " + link);
//				var calEntry = new Object;
//				calEntry.starttime = dojo.date.toRfc3339(eDate);
//				calEntry.endtime = dojo.date.toRfc3339(endDate);
//				calEntry.allday = false;
//				calEntry.repeated = false;
//				calEntry.title = title;
//				calEntry.url = link;
//				calEntry.body = body;
//				calEntry.attributes = "www.goole.com";
//				calEntry.type = ["reminder"];
//				calEntry.CourseName="CourseName";
//				calEntry.MainColor="red";
//				calEntry.MainApp="CS";
//				calEntry.SecColor="blue";
//				calEntry.SecApp="sm";
//				calEntry.Period="FD";
//				calEntry.ResourceName="samir";
//			calEntry.CoordinatorName="ahmed";
//			/*	calEntry.ResourceName="samir";
//				calEntry.MainApp="CS";
//				calEntry.SecApp="sm";
//				calEntry.Period="FD";
//				calEntry.ResourceName="Samir";
//				calEntry.CourseName="Course1";
//			    calEntry.Client="Client";
//				calEntry.CoordinatorName="ahmed";
//				calEntry.DayNo=4;
//				calEntry.Location="loc1";*/
//				CalEntries[id] = calEntry;
//					
//			}
//			
//				 
//		// console.debug(dojo.json.serialize(CalEntries));
//       return CalEntries;
//  
//		
//	}
	/*function readFromXmlClick(type, xml, e) {
		//alert("rading xml ");
		var  CalEntries;
			var entries = xml.getElementsByTagName("click");
	          	clicks = new Array[entries.length];
			for(var e=0;e<entries.length;e++){
				entry = entries.item(e);
			
				var sDate = dojo.date.fromIso8601(entry.getElementsByTagName("date")[0].firstChild.nodeValue);
						    
			
			clicks =sDate;
				
					
			}
			
				 

       return clicks;
  
		
	}*/
    function loadXMLandUpateHoliday(type,xml,e){
    	//alert("r,,,,,,,,, xml ");
    		//console.debug("logggggggg. loading xml ........ ");
    	var holidays=	oCalendar.readHolidayFromXml(type,xml,e);
  	
		oCalendar.setHolidayEntries( holidays);
	//	        	  //console.log("  [line 439 (loadXMLandUpateHoliday-  TestScrpit.js) ]    after the reading of the fil..............");
   
    }
//    function loadXMLAndUpdate(type, xml, e){
//    	//alert("r,,,,,,,,, xml ");
//    		//console.debug("logggggggg. loading xml ........ ");
//    	var CalEntries=	oCalendar.readFromXml(type,xml,e);
//  		// console.debug(dojo.json.serialize(CalEntries));
//    	currentCalEntries=CalEntries;
//    	//console.debug(dojo.json.serialize(CalEntries));
//		oCalendar.setCalendarEntries(  CalEntries);
//    	
//    	
//    }
    function loadXMLAndUpdateResources(type, xml,e){
    	
    	    	//alert("r,,,,,,,,, xml ");
    		//console.debug("logggggggg. loading xml ........ ");
    	var Resources=	oCalendar.readFromResourcesXml(type,xml,e);
  		// console.debug(dojo.json.serialize(CalEntries));
    	//currentCalEntries=CalEntries;
    	//console.debug(dojo.json.serialize(CalEntries));
    	
    	
		oCalendar.setResourceEntries(   Resources);
//	  //console.log("  [line 464 (loadXMLandUpateResources-  TestScrpit.js) ]    after the reading of the fil..............");
  
    	
    }
    function  loadXMLAndUpdateCourses(type, xml, e){
      	//    //console.log("REadint the file...................");
      	var  CourseList=  	oCalendar.readCourseFromXml(type,xml,e);
      	 //console.debug(dojo.json.serialize( CourseList));
      	 // on course events changes....................
      	 oCalendar.setCalendarCoursesEntries( CourseList);
   //     //console.log("  [line 471 (loadXMLandUpateCourses-  TestScrpit.js) ]    after the reading of the fil..............");
  
    //  	 //	 oCalendar.onCoursesChanged( EmptyCourseList);
   //   		 console.debug(dojo.json.serialize( EmptyCourseList));
    //  	this.clicks=readFromXmlClick(type,xml,e);
   
      	//	  //console.log("  [line 480 (loadXMLandUpateCourses-  TestScrpit.js) ]    after the reading of the fil..............");
  
      }
      
      function loadXMLAndUpdateCoursesEmpty(type,xml,e){
      	
      	 var 	 EmptyCourseList= 	oCalendar.readEmptyCourseFromXml(type,xml,e);
      	 
      	 	 oCalendar.onCoursesChanged( EmptyCourseList);
      	//	  //console.log("after the reading of the fil..............");
      	//	 console.debug(dojo.json.serialize( EmptyCourseList));
    //  	this.clicks=readFromXmlClick(type,xml,e);
  //   	  //console.log("  [line 471 (loadXMLandUpateCoursesEmpty-  TestScrpit.js) ]    after the reading of the fil..............");
  
         	
      }

   function  loadXMLandUpateAllData(type, xml,e ){
   	
   	// fi edti mode 
    	loadXMLAndUpdateCoursesEmpty(type,xml,e);
    	loadXMLAndUpdateResources(type,xml,e);
    	
    	
    	
    	// if view mode......
    	loadXMLAndUpdateCourses(type,xml,e);
    	loadXMLandUpateHoliday(type,xml,e);	
    }
    
    function getDataFromServer(dateObj){
    
    	//getEditCourseListFromServer();
    	getCoursesFromServer(dateObj);
    	
   // if (oCalendar.isResourceAvaliable)
    	getResourcesFromServer(dateObj);
//    	
    	getHolidaysFromServer(dateObj);
    	
    	//or get alll date 
    //	 getAllDataFromServer(dateObj)
    		oCalendar.isValueChanged=false;

    }
    function getEditCourseListFromServer(){
    		 oCalendar.updateUserMessage("Get Courses List From Server....");
    	  //	  //console.log("get the emptyyyyyyyyyyyy courses from the server......................");
//    	dojo.require("dojo.io.*");
//		dojo.require("dojo.xml.*");
//		dojo.require("dojo.string");
//		dojo.require("dojo.date.serialize");
//		
//		dojo.io.bind({
//		url: "../listCalendarCourses.do",  //later this should be the action.....
//		mimetype: "text/xml",
//		content: {
//		    task: "RETRIEVEEMPTYCOURSES"
//		 },
//		 method: "post",
//		load: loadXMLAndUpdateCoursesEmpty
//		
//		});
		
		
	  		 oCalendar.updateUserMessage("Get Courses List From Server....");
    	  //	  //console.log("get the emptyyyyyyyyyyyy courses from the server......................");
    	dojo.require("dojo.io.*");
		dojo.require("dojo.xml.*");
		dojo.require("dojo.string");
		dojo.require("dojo.date.serialize");
		
		dojo.io.bind({
		url: "EmptyCourses.xml",  //later this should be the action.....
		mimetype: "text/xml",
	 
		load: loadXMLAndUpdateCoursesEmpty
		
		});	
		
		
		
		
    	
    }
    function getCoursesFromServer(dateObj){


   // 	  //console.log(" [line 561 (getCoursesFromServer)]  in the Test script-- get the courses from the server......................");
    			dojo.require("dojo.io.*");
		dojo.require("dojo.xml.*");
		dojo.require("dojo.string");
		dojo.require("dojo.date.serialize");
		
		dojo.io.bind({
		url: "Courses.xml",  //later this should be the action.....
		mimetype: "text/xml",
	 
		load: loadXMLAndUpdateCourses
		});



}
    
    function getResourcesFromServer(dateObj){
    	
    //	  //console.log("get the Resources  from the server......................");
    	dojo.require("dojo.io.*");
		dojo.require("dojo.xml.*");
		dojo.require("dojo.string");
		dojo.require("dojo.date.serialize");
		
		dojo.io.bind({
		url: "Resources.xml",  //later this should be the action.....
		mimetype: "text/xml",
		load: loadXMLAndUpdateResources
		});
    	
    }
    function getHolidaysFromServer(dateObj){
    	
   // 	var urls= "../holidayActions.do";    	
    	var urls="Resources.xml";
 //   		  //console.log("get the holidays  from the server......................");
    	dojo.require("dojo.io.*");
		dojo.require("dojo.xml.*");
		dojo.require("dojo.string");
		dojo.require("dojo.date.serialize");
		
		dojo.io.bind({
		url: urls,  //later this should be the action.....
		mimetype: "text/xml",
		load: loadXMLandUpateHoliday
		});
    	
    }
    

    
	function widgetValueChanged(dateObj){
		
		
	//	  //console.log("loading n...............");
	
		dojo.require("dojo.io.*");
		dojo.require("dojo.xml.*");
		dojo.require("dojo.string");
		dojo.require("dojo.date.serialize");
		
		dojo.io.bind({
		url: "calendar.xml",  //later this should be the action.....
		mimetype: "text/xml",
		load:  loadXMLAndUpdate
		});
	
		
	
	}
	
	
	
	function widgetTimeZoneChanged(){
		
		if(oCalendar.selectedtimezone == ""){
			dojo.io.cookie.deleteCookie("DCTZ");
		}else{
			dojo.io.cookie.setObjectCookie("DCTZ",oCalendar.selectedtimezone,3650);
		}
	}
	
	//function called when change an event. 
	function widgetEventChanged(/*string*/eventId, /*day id */ dayId, /*object*/eventObject){
		//create the jason object.
	/*	var sReturn = "id " + eventId + "=\n";
		for(var i in eventObject){
			if(typeof(eventObject[i]) != "object"){
				sReturn += i + " = " + eventObject[i] + "\n";
			}else{
				oChildObject = eventObject[i];
				var sChildReturn = "";
				var iNum = 0;
				for(var j in oChildObject){
					if(iNum > 0){
						sChildReturn += ", ";
					}
					sChildReturn += j + ": " + oChildObject[j];
					iNum++;
				}
				sReturn += i + " = " + sChildReturn + "\n";
			}
		}*/
		//alert(sReturn);
		saveToDB(course);
		//saveToXMLFile(sReturn);
		oCalendar.refreshScreen();
	}
	function saveToDB(course){
	SaveToDatabase(course);
	
	}
	
