/**
 *
 */
package abItems;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;

import com.thoughtworks.xstream.XStream;

import mypackage.Upload;

import abItemsShow.Conflicts;
import abItemsShow.Course;
import abItemsShow.CourseDays;
import abItemsShow.CoursesShow;
import abItemsShow.ECourse;
import abItemsShow.ResourceHolidayShow;
import actions.GeneralActions;
import database.DataSourceConnection;

/**
 * @author noha
 * 
 */
public class Calendar {

	static String idClient = "";

	static String idContract = "";

	static String idCourse = "";

	static String idResource = "";

	static String idCoordinator = "";

	static String filterStatment = "";

	// //////////////////////////////

	static String clientName = "";

	static String contractName = "";

	static String courseName = "";

	static String resourceName = "";

	static String coordinatorName = "";
	
	static int colorNumber = 1;

	public ArrayList retreiveContractEmptyCourses(
			DataSourceConnection database, HttpServletRequest request)
			throws SQLException {

		ResultSet rs = database
				.retrieve("select* from contractcourse where Contracts_idContracts = "
						+ request.getSession().getAttribute("contractId")
						+ " and ContractCourseStatus != 9 ");

		ArrayList<ECourse> Show = new ArrayList<ECourse>();

		String clientName = null;
		String ClientApp = null;

		ResultSet contract_rs = database
				.retrieve("SELECT* FROM contracts where idContracts = "
						+ request.getSession().getAttribute("contractId"));
		if (contract_rs.next()) {

			ResultSet clientName_rs = database
					.retrieve("select ClientName,ClientApp from clients where idClients = "
							+ contract_rs.getString(5) + ";");
			if (clientName_rs.next()) {
				clientName = clientName_rs.getString(1);
				ClientApp = clientName_rs.getString(2);

			}
			clientName_rs.close();
		}

		while (rs.next()) {

			// // ////System.out.println(">>>>>>>>>>>>> " + rs.getString(7));
			if (database.retrieve(
					"select* from eventday where EventDayContractCourseId = "
							+ rs.getString(1)).next())
				continue;

			ECourse c = new ECourse();

			// Clients client = (Clients) session.get(Clients.class,
			// contract_course.getContracts().getContract().getIdClients());

			c.setClient(clientName);

			c.setContent(contract_rs.getString(2));

			ResultSet courses_rs = database
					.retrieve("select CourseNameEng,CourseColor,CourseApp from courses where idCourses = "
							+ rs.getString(2));
			if (courses_rs.next()) {
				c.setCourseName(courses_rs.getString(1));

				c.setTitle(courses_rs.getString(1));
				c.setMainColor(courses_rs.getString(2));
				c.setMainApp(courses_rs.getString(3));
			}
			courses_rs.close();

			if (rs.getString(6) != null) {

				ResultSet coordinators_rs = database
						.retrieve("SELECT TrainingCoordinateFirstName,TrainingCoordinateLastName from trainingcoordinators where idTrainingCoordinators = "
								+ rs.getInt(6));
				if (coordinators_rs.next())
					c.setCoordinatorName(coordinators_rs.getString(1) + " "
							+ coordinators_rs.getString(2));

				coordinators_rs.close();

			}

			if (rs.getString(5) != null) {

				ResultSet resources_rs = database
						.retrieve("SELECT ResourceFirstName,ResourceLastName from resources where idResources = "
								+ rs.getInt(5));
				if (resources_rs.next())
					c.setResourceName(resources_rs.getString(1) + " "
							+ resources_rs.getString(2));

				resources_rs.close();

			}

			c.setCourseid(rs.getInt(1));
			String location = "Not Assigned";
			if (rs.getString(30) != null && !rs.getString(30).equals("")) {

				if (rs.getString(30).equals("@ Client Premises"))// @ Client
				// Premises
				{
					location = "@ Client Premises";
					if (rs.getString(40) != null
							&& !rs.getString(40).equals(""))
						location = location + " - " + rs.getString(40);
				} else if (rs.getString(30).equals("@ a Venue")
						&& rs.getString(4) == null)
					location = rs.getString(40);
				else if (rs.getString(30).equals("@ a Venue")
						&& rs.getString(4) != null) {
					ResultSet venues_rs = database
							.retrieve("SELECT VenueName from venues where idVenues = "
									+ rs.getInt(4));
					if (venues_rs.next())
						location = venues_rs.getString(1);
					venues_rs.close();
				} else if (rs.getString(30).equals("@ Our Premises"))
					location = "@ Our Premises";

			}
			c.setLocation(location);
			c.setNoOfDays(rs.getInt(15));
			c.setRuns(rs.getInt(33));
			c.setRunNo(rs.getInt(16));

			c.setSecApp(ClientApp);

			switch (rs.getInt(31)) {
			case 1:
				c.setPeriod("FD");
				break;

			case 2:
				c.setPeriod("MS");
				break;
			case 3:
				c.setPeriod("ES");
				break;

			}
			Show.add(c);
		}

		contract_rs.close();
		rs.close();

		return Show;
	}

	////////////////////////////////////////////////////////////////////////////
	// ////////
	public String retreiveContractCourses(DataSourceConnection database,
			HttpServletRequest request) throws SQLException, IOException {
		ResultSet rs = database
				.retrieve("select* from contractcourse where Contracts_idContracts = "
						+ request.getSession().getAttribute("contractId"));

		ArrayList<Course> Show = new ArrayList<Course>();

		String clientName = null;
		String ClientApp = null;
		String ClientColor = null;

		ResultSet contract_rs = database
				.retrieve("SELECT* FROM contracts where idContracts = "
						+ request.getSession().getAttribute("contractId"));
		if (contract_rs.next()) {

			ResultSet clientName_rs = database
					.retrieve("select ClientName,ClientApp,ClientColor from clients where idClients = "
							+ contract_rs.getString(5) + ";");
			if (clientName_rs.next()) {
				clientName = clientName_rs.getString(1);
				ClientApp = clientName_rs.getString(2);
				ClientColor = clientName_rs.getString(3);

			}
			clientName_rs.close();
		}

		String returnText = "";

		while (rs.next()) {

			ResultSet courseDays_rs = database
					.retrieve("select* from eventday where EventDayContractCourseId = "
							+ rs.getString(1));

			if (courseDays_rs.next() && rs.getInt(8) != 9) {

				Course c = new Course();

				// Clients client = (Clients) session.get(Clients.class,
				// contract_course.getContracts().getContract().getIdClients());

				c.setClient(clientName);

				c.setDetails(contract_rs.getString(2));

				ResultSet courses_rs = database
						.retrieve("select CourseNameEng,CourseColor,CourseApp from courses where idCourses = "
								+ rs.getString(2));
				if (courses_rs.next()) {
					c.setName(courses_rs.getString(1));

					c.setTitle(courses_rs.getString(1));
					c.setMainColor(courses_rs.getString(2));
					c.setMainApp(courses_rs.getString(3));
				}
				courses_rs.close();

				if (rs.getString(6) != null) {

					ResultSet coordinators_rs = database
							.retrieve("SELECT TrainingCoordinateFirstName,TrainingCoordinateLastName,TrainingCoordinateColor,TrainingCoordinateAbb from trainingcoordinators where idTrainingCoordinators = "
									+ rs.getInt(6));
					if (coordinators_rs.next())
						c.setCoordinatorName(coordinators_rs.getString(1) + " "
								+ coordinators_rs.getString(2));

					c.setCoordinatorColor(coordinators_rs.getString(3));
					c.setCoordinatorApp(coordinators_rs.getString(4));
					
					coordinators_rs.close();

				}

				if (rs.getString(5) != null) {

					ResultSet resources_rs = database
							.retrieve("SELECT ResourceFirstName,ResourceLastName,ResourceColor,ResourceAbb from resources where idResources = "
									+ rs.getInt(5));
					if (resources_rs.next())
						c.setResourceName(resources_rs.getString(1) + " "
								+ resources_rs.getString(2));

					c.setResourceColor(resources_rs.getString(3));
					c.setResourceApp(resources_rs.getString(4));
					
					resources_rs.close();

				}

				//1--> funded
				//2---> not funded
				c.setFunded(contract_rs.getInt(7));
			
				c.setID(rs.getInt(1));
				String location = "Not Assigned";
				if (rs.getString(30) != null && !rs.getString(30).equals("")) {

					if (rs.getString(30).equals("@ Client Premises"))// @ Client
					// Premises
					{
						location = "@ Client Premises";
						if (rs.getString(40) != null
								&& !rs.getString(40).equals(""))
							location = location + " - " + rs.getString(40);
					} else if (rs.getString(30).equals("@ a Venue")
							&& rs.getString(4) == null)
						location = rs.getString(40);
					else if (rs.getString(30).equals("@ a Venue")
							&& rs.getString(4) != null) {
						ResultSet venues_rs = database
								.retrieve("SELECT VenueName from venues where idVenues = "
										+ rs.getInt(4));
						if (venues_rs.next())
							location = venues_rs.getString(1);
						venues_rs.close();
					} else if (rs.getString(30).equals("@ Our Premises"))
						location = "@ Our Premises";

				}
				c.setLocation(location);

				c.setDays(rs.getInt(15));
				c.setRuns(rs.getInt(33));
				c.setRunNo(rs.getInt(16));

				c.setClientApp(ClientApp);
				c.setClientColor(ClientColor);

				switch (rs.getInt(31)) {
				case 1:
					c.setPeriod("FD");
					break;

				case 2:
					c.setPeriod("MS");
					break;
				case 3:
					c.setPeriod("ES");
					break;

				}

				ArrayList<CourseDays> ShowCourseDays = new ArrayList<CourseDays>();
				SimpleDateFormat sdf = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss Z", Locale.US);
				do {
					CourseDays courseDay = new CourseDays();

					ResultSet days_rs = database
							.retrieve("select Date from days where DayId = "
									+ courseDays_rs.getInt(5));
					// yyyy-MM-dd HH:mm:ss Z
					if (days_rs.next()) {

						Date date = days_rs.getDate(1);
						// sdf.
						courseDay.setEventDate(sdf.format(date));
						courseDay.setStarttime(sdf.format(date));
						courseDay.setEndtime(sdf.format(date));

					}
					days_rs.close();

					courseDay.setAllday(courseDays_rs.getBoolean(3));
					courseDay.setDayNo(courseDays_rs.getInt(6));
					courseDay.setPeriod(courseDays_rs.getString(2));

					ShowCourseDays.add(courseDay);
				} while (courseDays_rs.next());

				c.setCourseDays(ShowCourseDays);

				Show.add(c);

			}
			// contract_rs.close();
		}

		rs.close();

		XStream xstream = new XStream();
		xstream.alias("CourseDays", CourseDays.class);
		xstream.alias("Course", Course.class);
		String finalCoursesResult = "";
		if(Show.size()>0){
		returnText = returnText + xstream.toXML(Show);

		// returnText = returnText + "</feed>";

		////System.out.println(returnText);

		String startTag = "<list>";
		String endTag = "</list>";
		int start = returnText.indexOf(startTag) + startTag.length();
		int end = returnText.indexOf(endTag);
		String result = returnText.substring(start, end);

		String[] courseResultArray = result.split("<Course>");
		

		for (int i = 1; i < courseResultArray.length; i++) {

			courseResultArray[i] = "<Course>" + courseResultArray[i];
			// ////System.out.println("course---"+courseResultArray[i] );
			String[] singleCourseResultArray = courseResultArray[i]
					.split("<CourseDays>");
			String singleCourseResult = singleCourseResultArray[0];

			for (int k = 2; k < singleCourseResultArray.length; k++) {

				singleCourseResultArray[k] = "<CourseDays>" + "<CourseDays>"
						+ singleCourseResultArray[k];

				// ////System.out.println("days---"+singleCourseResultArray[k]);

				startTag = "<CourseDays>";
				endTag = "</CourseDays>";
				start = singleCourseResultArray[k].indexOf(startTag)
						+ startTag.length();
				end = singleCourseResultArray[k].indexOf(endTag);
				result = singleCourseResultArray[k].substring(start, end);

				result = result + "</CourseDays>";

				singleCourseResult = singleCourseResult + result;
			}

			singleCourseResult = singleCourseResult + "</Course>";

			finalCoursesResult = finalCoursesResult + singleCourseResult;
		}

		// "<Course></Course>"

		// finalCoursesResult = finalCoursesResult.substring(10);

		finalCoursesResult = "<feed>" + finalCoursesResult + "</feed>";
		}
		////System.out.println(finalCoursesResult);

		return finalCoursesResult;
	}

	////////////////////////////////////////////////////////////////////////////
	// ////////////
	public void saveContractCourse(DataSourceConnection database,
			HttpServletRequest request) throws SQLException, IOException {

		String contractCourseId = request.getParameter("courseId");

		ResultSet rs = database
				.retrieve("select* from contractcourse where idContractCourse = "
						+ contractCourseId);
		if (rs.next()) {

			String xmlText = request.getParameter("xmlCourse");

			database
					.update("DELETE FROM eventday WHERE EventDayContractCourseId = "
							+ contractCourseId);

			String[] coursedays = xmlText.split("<CourseDays>");

			for (int i = 1; i < coursedays.length; i++) {

				String startTag = "<EventDate>";
				String endTag = "</EventDate>";
				int start = coursedays[i].indexOf(startTag) + startTag.length();
				int end = coursedays[i].indexOf(endTag);
				String result = coursedays[i].substring(start, end);

				String[] splittingDateStirng = result.split("T");

				String[] splittingDateStirngItems = splittingDateStirng[0]
						.split("-");

				String dateString = splittingDateStirngItems[0] + "/"
						+ splittingDateStirngItems[1] + "/"
						+ splittingDateStirngItems[2];

				////////////////////////////////////////////////////////////////

				String dayId = "";

				ResultSet days_rs = database
						.retrieve("SELECT DayId FROM days where Date = '"
								+ dateString + "';");

				if (days_rs.next()) {
					dayId = days_rs.getString(1);

				}

				else {

					database.update("insert into days (Date) values ('"
							+ dateString + "')");

					days_rs = database.retrieve("SELECT DayId FROM days;");

					if (days_rs != null && days_rs.last()) {

						dayId = days_rs.getString(1);

					}
				}
				days_rs.close();
				////////////////////////////////////////////////////////////////

				startTag = "<allday>";
				endTag = "</allday>";
				start = coursedays[i].indexOf(startTag) + startTag.length();
				end = coursedays[i].indexOf(endTag);
				String allDay = coursedays[i].substring(start, end);

				startTag = "<Period>";
				endTag = "</Period>";
				start = coursedays[i].indexOf(startTag) + startTag.length();
				end = coursedays[i].indexOf(endTag);
				String period = coursedays[i].substring(start, end);

				startTag = "<DayNo>";
				endTag = "</DayNo>";
				start = coursedays[i].indexOf(startTag) + startTag.length();
				end = coursedays[i].indexOf(endTag);
				String dayNumber = coursedays[i].substring(start, end);

				database
						.update("insert into eventday (EventDayPeriod,EventDayIsFullDay,EventDayContractCourseId,EventDayDayId,EventDayNo) values ('"
								+ period
								+ "',"
								+ allDay
								+ ","
								+ contractCourseId
								+ ","
								+ dayId
								+ ","
								+ dayNumber + ")");
			}

			int status = rs.getInt(8);

			if (rs.getBoolean(10) && rs.getBoolean(9))
				status = 3;
			else
				status = 2;

			database
					.update("UPDATE contractcourse SET ContractCourseCalender = null"
							+ ",ContractCourseStatus = "
							+ status
							+ " where idContractCourse = "
							+ request.getParameter("courseId") + ";");

			if (Contracts.retreiveContractStatus(database, rs.getInt(3)) == 3)
				Contracts.updateContractStatus(database, rs.getInt(3));

		}
		rs.close();
	}

	////////////////////////////////////////////////////////////////////////////
	// ////////////
	public String retreiveGeneralCalendarCourses(DataSourceConnection database,
			HttpServletRequest request) throws IOException, SQLException {

		String[] splittingStartDateStirng = request.getParameter("startDate")
				.split("T");

		String[] splittingStartDateStirngItems = splittingStartDateStirng[0]
				.split("-");

		String startDateString = splittingStartDateStirngItems[0] + "/"
				+ splittingStartDateStirngItems[1] + "/"
				+ splittingStartDateStirngItems[2];

		// -------------------------------------------------------------------//
		String[] splittingEndDateStirng = request.getParameter("endDate")
				.split("T");

		// String[] splittingEndDateStirng = "2009-03-31T10:00:00-08:00"
		// .split("T");

		String[] splittingEndDateStirngItems = splittingEndDateStirng[0]
				.split("-");

		String endDateString = splittingEndDateStirngItems[0] + "/"
				+ splittingEndDateStirngItems[1] + "/"
				+ splittingEndDateStirngItems[2];

		Date startDate = GeneralActions.parseDate(startDateString);
		Date endDate = GeneralActions.parseDate(endDateString);

		String query = "select* from contractcourse ";
		String conditionalQuery = "where";

		if (!idClient.equals("")) {

			ResultSet contracts_rs = database
					.retrieve("Select idContracts from contracts where Contract_idClients = "
							+ idClient);
			conditionalQuery = conditionalQuery + "(";

			while (contracts_rs.next()) {

				conditionalQuery = conditionalQuery
						+ " Contracts_idContracts = "
						+ contracts_rs.getString(1) + " or";

			}

			conditionalQuery = conditionalQuery.substring(0, conditionalQuery
					.length() - 3);
			conditionalQuery = conditionalQuery + ")";

			ResultSet rs = database
					.retrieve("Select ClientName from clients where idClients = "
							+ idClient + ";");

			if (rs.next()) {
				filterStatment = "'" + rs.getString(1) + "'" + " (Client)";
			}
			rs.close();
		}

		if (!idContract.equals("") && idClient.equals("")) {
			conditionalQuery = conditionalQuery + " Contracts_idContracts = "
					+ idContract;

			ResultSet rs = database
					.retrieve("Select ContractName from contracts where idContracts = "
							+ idContract + ";");

			if (rs.next()) {
				filterStatment = "'" + rs.getString(1) + "'" + " (Contract)";
			}
			rs.close();

		}

		else if (!idContract.equals("")) {
			ResultSet rs = database
					.retrieve("Select ContractName from contracts where idContracts = "
							+ idContract + ";");

			if (rs.next()) {
				filterStatment = filterStatment + " ," + "'" + rs.getString(1)
						+ "'" + " (Contract)";
			}
			rs.close();
		}

		if (!idCourse.equals("")) {
			if (!conditionalQuery.equals("where"))
				conditionalQuery = conditionalQuery + " and";
			conditionalQuery = conditionalQuery + " Courses_idCourses = "
					+ idCourse;

			ResultSet rs = database
					.retrieve("Select CourseNameEng from courses where idCourses = "
							+ idCourse + ";");

			if (rs.next()) {
				if (!filterStatment.equals(""))
					filterStatment = filterStatment + " ," + "'"
							+ rs.getString(1) + "'" + " (Course)";
				else
					filterStatment = "'" + rs.getString(1) + "'" + " (Course)";
			}
			rs.close();

		}

		if (!idResource.equals("")) {
			if (!conditionalQuery.equals("where"))
				conditionalQuery = conditionalQuery + " and";
			conditionalQuery = conditionalQuery + " Resources_idResources = "
					+ idResource;

			ResultSet rs = database
					.retrieve("Select ResourceFirstName from resources where idResources = "
							+ idResource + ";");

			if (rs.next()) {
				if (!filterStatment.equals(""))
					filterStatment = filterStatment + " ," + "'"
							+ rs.getString(1) + "'" + " (Resource)";
				else
					filterStatment = "'" + rs.getString(1) + "'"
							+ " (Resource)";
			}
			rs.close();

		}

		if (!idCoordinator.equals("")) {
			if (!conditionalQuery.equals("where"))
				conditionalQuery = conditionalQuery + " and";
			conditionalQuery = conditionalQuery
					+ " TrainingCoordinators_idTrainingCoordinators = "
					+ idCoordinator;

			ResultSet rs = database
					.retrieve("Select TrainingCoordinateFirstName from trainingcoordinators where idTrainingCoordinators = "
							+ idCoordinator + ";");

			if (rs.next()) {
				if (!filterStatment.equals(""))
					filterStatment = filterStatment + " ," + "'"
							+ rs.getString(1) + "'" + " (Coordinator)";
				else
					filterStatment = "'" + rs.getString(1) + "'"
							+ " (Coordinator)";
			}
			rs.close();

		}

		if (!filterStatment.equals("")) {
			filterStatment = "Courses Filtered By " + filterStatment;

			if (filterStatment.contains(","))
				filterStatment = filterStatment.replace(",", "and ");

		}
		// // ////System.out.println("filterStatment = "+filterStatment);

		if (!conditionalQuery.equals("where"))
			query = query + conditionalQuery + " and ContractCourseStatus != 9";
		else
			query = query + " where ContractCourseStatus != 9";
		ResultSet rs = database.retrieve(query);

		ArrayList<Course> Show = new ArrayList<Course>();

		String returnText = "";

		while (rs.next()) {

			String clientName2 = "";
			String ClientApp = "";
			String ClientColor= "";
			ResultSet contract_rs = database
					.retrieve("SELECT* FROM contracts where idContracts = "
							+ rs.getString(3));
			if (contract_rs.next()) {

				ResultSet clientName_rs = database
						.retrieve("select ClientName,ClientApp,ClientColor from clients where idClients = "
								+ contract_rs.getString(5) + ";");
				if (clientName_rs.next()) {
					clientName2 = clientName_rs.getString(1);
					ClientApp = clientName_rs.getString(2);
					ClientColor = clientName_rs.getString(3);
				}
				clientName_rs.close();
			}

			ResultSet courseDays_rs = database
					.retrieve("select* from eventday where EventDayContractCourseId = "
							+ rs.getString(1));

			if (courseDays_rs.next() && rs.getInt(8) != 9) {

				Course c = new Course();

				c.setClient(clientName2);

				c.setDetails(contract_rs.getString(2));

				ResultSet courses_rs = database
						.retrieve("select CourseNameEng,CourseColor,CourseApp from courses where idCourses = "
								+ rs.getString(2));
				if (courses_rs.next()) {
					c.setName(courses_rs.getString(1));

					c.setTitle(courses_rs.getString(1));
					c.setMainColor(courses_rs.getString(2));
					c.setMainApp(courses_rs.getString(3));
				}
				courses_rs.close();

				if (rs.getString(6) != null) {

					ResultSet coordinators_rs = database
							.retrieve("SELECT TrainingCoordinateFirstName,TrainingCoordinateLastName,TrainingCoordinateColor,TrainingCoordinateAbb from trainingcoordinators where idTrainingCoordinators = "
									+ rs.getInt(6));
					if (coordinators_rs.next())
						c.setCoordinatorName(coordinators_rs.getString(1) + " "
								+ coordinators_rs.getString(2));

					c.setCoordinatorColor(coordinators_rs.getString(3));
					c.setCoordinatorApp(coordinators_rs.getString(4));
					
					coordinators_rs.close();

				}

				if (rs.getString(5) != null) {

					ResultSet resources_rs = database
							.retrieve("SELECT ResourceFirstName,ResourceLastName,ResourceColor,ResourceAbb from resources where idResources = "
									+ rs.getInt(5));
					if (resources_rs.next())
						c.setResourceName(resources_rs.getString(1) + " "
								+ resources_rs.getString(2));

					c.setResourceColor(resources_rs.getString(3));
					c.setResourceApp(resources_rs.getString(4));
					
					resources_rs.close();

				}

				//1--> funded
				//2---> not funded
				c.setFunded(contract_rs.getInt(7));

				c.setID(rs.getInt(1));
				String location = "Not Assigned";
				if (rs.getString(30) != null && !rs.getString(30).equals("")) {

					if (rs.getString(30).equals("@ Client Premises"))// @ Client
					// Premises
					{
						location = "@ Client Premises";
						if (rs.getString(40) != null
								&& !rs.getString(40).equals(""))
							location = location + " - " + rs.getString(40);
					} else if (rs.getString(30).equals("@ a Venue")
							&& rs.getString(4) == null)
						location = rs.getString(40);
					else if (rs.getString(30).equals("@ a Venue")
							&& rs.getString(4) != null) {
						ResultSet venues_rs = database
								.retrieve("SELECT VenueName from venues where idVenues = "
										+ rs.getInt(4));
						if (venues_rs.next())
							location = venues_rs.getString(1);
						venues_rs.close();
					} else if (rs.getString(30).equals("@ Our Premises"))
						location = "@ Our Premises";

				}
				c.setLocation(location);
				c.setDays(rs.getInt(15));
				c.setRuns(rs.getInt(33));
				c.setRunNo(rs.getInt(16));

				c.setClientApp(ClientApp);
				c.setClientColor(ClientColor);

				switch (rs.getInt(31)) {
				case 1:
					c.setPeriod("FD");
					break;

				case 2:
					c.setPeriod("MS");
					break;
				case 3:
					c.setPeriod("ES");
					break;

				}

				ArrayList<CourseDays> ShowCourseDays = new ArrayList<CourseDays>();
				SimpleDateFormat sdf = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss Z", Locale.US);
				do {
					CourseDays courseDay = new CourseDays();

					ResultSet days_rs = database
							.retrieve("select Date from days where DayId = "
									+ courseDays_rs.getInt(5));

					if (days_rs.next()) {

						Date date = days_rs.getDate(1);
						// sdf.
						courseDay.setEventDate(sdf.format(date));
						courseDay.setStarttime(sdf.format(date));
						courseDay.setEndtime(sdf.format(date));

					}
					Date EventDate = days_rs.getDate(1);
					days_rs.close();

					courseDay.setAllday(courseDays_rs.getBoolean(3));
					courseDay.setDayNo(courseDays_rs.getInt(6));
					courseDay.setPeriod(courseDays_rs.getString(2));

//					//System.out.println("startDate = " + startDate
//							+ "  endDate = " + endDate + "  EventDate = "
//							+ EventDate);

					Date startDate2 = startDate;
					Date endDate2 = endDate;
					
					java.util.Calendar cal = java.util.Calendar.getInstance();
					cal.setTime(startDate);
					SimpleDateFormat sdf2 = new SimpleDateFormat(
							"yyyy-MM-dd", Locale.US);
					while ((startDate2.before(endDate2) || startDate2
							.equals(endDate2))) {
						
						String startDate2_string = sdf2.format(startDate2);
						String EventDate_string = sdf2.format(EventDate);
						
						if(startDate2_string.equals(EventDate_string)){
						ShowCourseDays.add(courseDay);
						break;
						}

						cal.add(java.util.Calendar.DATE, 1);

						startDate2 = cal.getTime();
					}
				} while (courseDays_rs.next());
				if (ShowCourseDays.size() > 0) {
					c.setStarttime(((CourseDays) ShowCourseDays.get(0))
							.getStarttime());

					c.setEndtime(((CourseDays) ShowCourseDays
							.get(ShowCourseDays.size() - 1)).getEndtime());

					c.setCourseDays(ShowCourseDays);

					Show.add(c);
				}
			}
			contract_rs.close();
		}

		rs.close();

		XStream xstream = new XStream();
		xstream.alias("CourseDays", CourseDays.class);
		xstream.alias("Course", Course.class);
		String finalCoursesResult = "";
		if (Show.size() > 0) {
			returnText = returnText + xstream.toXML(Show);

			// returnText = returnText + "</feed>";

			// ////System.out.println(returnText);

			String startTag = "<list>";
			String endTag = "</list>";
			int start = returnText.indexOf(startTag) + startTag.length();
			int end = returnText.indexOf(endTag);
			String result = returnText.substring(start, end);

			String[] courseResultArray = result.split("<Course>");

			for (int i = 1; i < courseResultArray.length; i++) {

				courseResultArray[i] = "<Course>" + courseResultArray[i];

				String[] singleCourseResultArray = courseResultArray[i]
						.split("<CourseDays>");
				String singleCourseResult = singleCourseResultArray[0];

				for (int k = 2; k < singleCourseResultArray.length; k++) {

					singleCourseResultArray[k] = "<CourseDays>"
							+ "<CourseDays>" + singleCourseResultArray[k];

					startTag = "<CourseDays>";
					endTag = "</CourseDays>";
					start = singleCourseResultArray[k].indexOf(startTag)
							+ startTag.length();
					end = singleCourseResultArray[k].indexOf(endTag);
					result = singleCourseResultArray[k].substring(start, end);

					result = result + "</CourseDays>";

					singleCourseResult = singleCourseResult + result;
				}

				singleCourseResult = singleCourseResult + "</Course>";

				finalCoursesResult = finalCoursesResult + singleCourseResult;
			}

			// "<Course></Course>"

			// finalCoursesResult = finalCoursesResult.substring(10);

			finalCoursesResult = "<feed>" + finalCoursesResult + "</feed>";

			////System.out.println(finalCoursesResult);
		}
		return finalCoursesResult;

	}

	////////////////////////////////////////////////////////////////////////////
	// /
	public void setFilterItems(HttpServletRequest request) {

		idClient = request.getParameter("client");
		idContract = request.getParameter("contract");
		idCourse = request.getParameter("course");
		idResource = request.getParameter("resource");
		idCoordinator = request.getParameter("coordinator");

	}

	////////////////////////////////////////////////////////////////////////////
	// /////////
	public void resetCalendar() {
		idCourse = "";
		idContract = "";
		idCoordinator = "";
		idResource = "";
		idClient = "";
		filterStatment = "";
		
		Calendar.colorNumber = 1;
	}

	////////////////////////////////////////////////////////////////////////////
	// //
	public String checkCalendarConfliction(DataSourceConnection database,
			HttpServletRequest request) throws SQLException, ParseException {

		String returnText = "";

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);

		String[] splittingStartDateStirng = request.getParameter("startDate")
				.split("T");

		// String[] splittingStartDateStirng = "2009-01-01T10:00:00-08:00"
		// .split("T");

		String[] splittingStartDateStirngItems = splittingStartDateStirng[0]
				.split("-");

		String startDateString = splittingStartDateStirngItems[0] + "/"
				+ splittingStartDateStirngItems[1] + "/"
				+ splittingStartDateStirngItems[2];

		// -------------------------------------------------------------------//
		String[] splittingEndDateStirng = request.getParameter("endDate")
				.split("T");

		// String[] splittingEndDateStirng = "2009-03-31T10:00:00-08:00"
		// .split("T");

		String[] splittingEndDateStirngItems = splittingEndDateStirng[0]
				.split("-");

		String endDateString = splittingEndDateStirngItems[0] + "/"
				+ splittingEndDateStirngItems[1] + "/"
				+ splittingEndDateStirngItems[2];

		Date startDate = GeneralActions.parseDate(startDateString);
		Date endDate = GeneralActions.parseDate(endDateString);

		int dayCounter = 1;

		java.util.Calendar cal = java.util.Calendar.getInstance();
		cal.setTime(startDate);

		XStream xstream = new XStream();
		xstream.alias("Conflicts", Conflicts.class);

		while (startDate.before(endDate) || startDate.equals(endDate)) {

			ResultSet day_rs = database
					.retrieve("select* from days where Date = '"
							+ sdf.format(startDate) + "'");
			// //System.out.println("start date = " + startDate);
			if (day_rs.next()) {

				ResultSet courses_rs = database
						.retrieve("select EventDayContractCourseId from eventday where EventDayDayId = "
								+ day_rs.getString(1));

				ResultSet courses_rs2 = database
						.retrieve("select EventDayContractCourseId from eventday where EventDayDayId = "
								+ day_rs.getString(1));

				int contractCourses_size = 0;
				courses_rs.last();
				contractCourses_size = courses_rs.getRow();

				ArrayList<Conflicts> conflictShow = new ArrayList<Conflicts>();
				Conflicts conflictDay = new Conflicts();
				if (contractCourses_size > 1) {
					courses_rs.beforeFirst();
					conflictDay = checkVenueConflict(database, courses_rs,
							courses_rs2, startDate);

					if (conflictDay != null)
						conflictShow.add(conflictDay);

					courses_rs2.beforeFirst();
					courses_rs.beforeFirst();

					conflictDay = checkResourceConflict(database, courses_rs,
							courses_rs2, startDate);

					if (conflictDay != null)

						conflictShow.add(conflictDay);

				}
				courses_rs.beforeFirst();

				conflictDay = checkResourceAvailability(database, courses_rs,
						startDate);

				if (conflictDay != null)

					conflictShow.add(conflictDay);

				String xmlText = xstream.toXML(conflictShow);
				// ////System.out.println("xmlText--1 = "+xmlText);
				if (xmlText != null && !xmlText.equals("")
						&& xmlText.length() > 7) {
					xmlText = xmlText.substring(6);
					// ////System.out.println("xmlText--2 = "+xmlText);
					xmlText = xmlText.substring(0, xmlText.length() - 7);
					returnText = returnText + "<CalendarConflictDay>" + xmlText
							+ "</CalendarConflictDay>";
				}
			}

			cal.add(java.util.Calendar.DATE, dayCounter);

			startDate = cal.getTime();

			// dayCounter = 1;

		}
		returnText = "<list>" + returnText + "</list>";
		return returnText;
	}

	// /////////////////////////////////////////////////////////////////////////
	private Conflicts checkVenueConflict(DataSourceConnection database,
			ResultSet courses_rs, ResultSet courses_rs2, Date startDate)
			throws SQLException {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss Z",
				Locale.US);
		java.util.Calendar cal = java.util.Calendar.getInstance();
		// cal.getTimeZone().setID("GMT[+|-]hh[[:]mm[[:]ss]]");
//		 //System.out.println("venue>>>>>>>>>>>>>"+startDate);
		// + cal.getTimeZone().getID().substring(3));
		// ResultSet courses_rs2 = courses_rs;

		String location1;
		int courseTime1;
		int courseVenue1;

		String location2;
		int courseTime2;
		int courseVenue2;

		int counter = 1;

		int venueCounter = 0;

		HashMap<String, Integer> venueCount = new HashMap<String, Integer>();

		while (courses_rs.next()) {

			int innerCounter = 0;

			while (innerCounter < counter) {
				courses_rs2.next();
				innerCounter++;
			}

			ResultSet contractCourse_rs = database
					.retrieve("select* from contractcourse where idContractCourse = "
							+ courses_rs.getString(1));

			if (contractCourse_rs.next()) {

				location1 = contractCourse_rs.getString(30);
				courseTime1 = contractCourse_rs.getInt(31);
				courseVenue1 = contractCourse_rs.getInt(4);

				if (location1 == null || location1.equals("@ Client Premises")) {
					courses_rs2.next();
					continue;
				}

				while (courses_rs2.next()) {

					ResultSet contractCourse_rs2 = database
							.retrieve("select* from contractcourse where idContractCourse = "
									+ courses_rs2.getString(1));
					
					if (contractCourse_rs2.next()) {

						location2 = contractCourse_rs2.getString(30);
						courseTime2 = contractCourse_rs2.getInt(31);
						courseVenue2 = contractCourse_rs2.getInt(4);
//						 System.out
//						 .println("courseVenue1 = "+courseVenue1+"  courseVenue2 = "+courseVenue2);
						if (location1.equals(location2)) {

							if (location1.equals("@ a Venue")
									&& courseVenue2 == courseVenue1
									&& courseVenue1 != 0) {
								// ////System.out.println("at venue---1");
								if (venueCount.containsKey(courseVenue1 + "")) {
									venueCounter = ((Integer) venueCount
											.get(courseVenue1 + "")).intValue() + 1;
									venueCount.put(courseVenue1 + "",
											new Integer(venueCounter));
									// ////System.out.println("at venue---2  "
									// + venueCounter);
								} else {
									venueCount.put(courseVenue1 + "",
											new Integer(1));
								}

								// venueCounter++;
							} else if (location1.equals("@ a Venue"))
								continue;
							else if (location1.equals("@ Our Premises")) {

								if ((courseTime1 == 1 && courseTime2 == 3)
										|| (courseTime1 == 3 && courseTime2 == 1))
									continue;
								else if ((courseTime1 == 2 && courseTime2 == 3)
										|| (courseTime1 == 3 && courseTime2 == 2))
									continue;
								else {
									Conflicts conflictDay = new Conflicts();
									conflictDay.setDay(sdf.format(startDate));

									ResultSet course_rs = database
											.retrieve("select CourseNameEng from courses where idCourses = "
													+ contractCourse_rs
															.getString(2));
									course_rs.next();
									conflictDay.setFirstCourseName(course_rs
											.getString(1));
									conflictDay.setConflictReason(3);
									conflictDay
											.setFirstCourseRunNo(contractCourse_rs
													.getInt(16));
									course_rs = database
											.retrieve("select CourseNameEng from courses where idCourses = "
													+ contractCourse_rs2
															.getString(2));
									course_rs.next();
									conflictDay.setSecCourseName(course_rs
											.getString(1));
									conflictDay
											.setSecCourseRunNo(contractCourse_rs2
													.getInt(16));
									return conflictDay;
								}
							}

						}

					}

				}

			}
			courses_rs2.beforeFirst();
			counter++;
		}

		Iterator<String> iterator = venueCount.keySet().iterator();
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd",
				Locale.US);
		while (iterator.hasNext()) {
//			 //System.out.println("i am in venue check---1");
			String key = iterator.next();

			ResultSet rooms_rs = database
					.retrieve("select* from rooms where Room_idVenues = " + key
							+ " and RoomValid = 1");
			if (rooms_rs.next()) {
				// //System.out.println("i am in venue check---2");
				if (rooms_rs.getDate(8) != null) {
//					//System.out.println("startDate = "+startDate+" rooms_rs.getDate(5) = "+rooms_rs.getDate(5));
					
					Date startDate2 = rooms_rs.getDate(5);
					Date endDate2 = rooms_rs.getDate(8);
			
					cal.setTime(startDate2);
				
					while ((startDate2.before(endDate2) || startDate2
							.equals(endDate2))) {
						
						String startDate2_string = sdf2.format(startDate2);
						String EventDate_string = sdf2.format(startDate);
						
						if(startDate2_string.equals(EventDate_string)){


							int rooms_size = rooms_rs.getInt(3);
//							 //System.out.println("rooms_size = " + rooms_size +
//							 "  "
//							 + ((Integer) venueCount.get(key)).intValue());
							if (((Integer) venueCount.get(key)).intValue() > rooms_size) {

								Conflicts conflictDay = new Conflicts();
								conflictDay.setDay(sdf.format(startDate));

								conflictDay.setConflictReason(2);
								ResultSet venue_rs = database
										.retrieve("select VenueName from venues where idVenues = "
												+ key);
								venue_rs.next();
								conflictDay.setName(venue_rs.getString(1));

								return conflictDay;

							}
						
						
						}

						cal.add(java.util.Calendar.DATE, 1);

						startDate2 = cal.getTime();
					}
					

				}
			}

		}

		return null;
	}

	// ////////////////////////////////////////////////////////////////////////
	private Conflicts checkResourceConflict(DataSourceConnection database,
			ResultSet courses_rs, ResultSet courses_rs2, Date startDate)
			throws SQLException {

		// //System.out.println("i am in check resource conflict");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss Z",
				Locale.US);

		// ResultSet courses_rs2 = courses_rs;

		int resource1;
		int resource2;

		int counter = 1;

		while (courses_rs.next()) {

			int innerCounter = 0;

			while (innerCounter < counter) {
				courses_rs2.next();
				innerCounter++;
			}

			ResultSet contractCourse_rs = database
					.retrieve("select* from contractcourse where idContractCourse = "
							+ courses_rs.getString(1));

			if (contractCourse_rs.next()) {

				resource1 = contractCourse_rs.getInt(5);
				while (courses_rs2.next()) {

					ResultSet contractCourse_rs2 = database
							.retrieve("select* from contractcourse where idContractCourse = "
									+ courses_rs2.getString(1));

					if (contractCourse_rs2.next()) {
						resource2 = contractCourse_rs2.getInt(5);
						// ////System.out.println("resource1 = " + resource1
						// + " resource2 = " + resource2);
						if (resource1 == resource2 && resource1 != 0) {

							Conflicts conflictDay = new Conflicts();
							conflictDay.setDay(sdf.format(startDate));

							conflictDay.setConflictReason(1);

							ResultSet course_rs = database
									.retrieve("select CourseNameEng from courses where idCourses = "
											+ contractCourse_rs.getString(2));
							course_rs.next();
							conflictDay.setFirstCourseName(course_rs
									.getString(1));

							conflictDay.setFirstCourseRunNo(contractCourse_rs
									.getInt(16));
							course_rs = database
									.retrieve("select CourseNameEng from courses where idCourses = "
											+ contractCourse_rs2.getString(2));
							course_rs.next();
							conflictDay
									.setSecCourseName(course_rs.getString(1));
							conflictDay.setSecCourseRunNo(contractCourse_rs2
									.getInt(16));

							ResultSet resource_rs = database
									.retrieve("select ResourceFirstName,ResourceLastName from resources where idResources = "
											+ resource1);
							resource_rs.next();
							conflictDay.setName(resource_rs.getString(1) + " "
									+ resource_rs.getString(2));

							return conflictDay;

						}

					}

				}

			}
			courses_rs2.beforeFirst();
			counter++;
		}

		return null;
	}

	////////////////////////////////////////////////////////////////////////////
	private Conflicts checkResourceAvailability(DataSourceConnection database,
			ResultSet courses_rs, Date day) throws SQLException, ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss Z",
				Locale.US);
		// DateFormat df = new DateFormat();
		// sdf.p
		// day = GeneralActions.parseDate(sdf.format(day));
		String dayString = day.toString();
		// //System.out.println(dayString);
		dayString = dayString
				.replace(dayString.subSequence(11, 19), "00:00:00");

		int resourceId;
		while (courses_rs.next()) {
			// //System.out.println("i am in check resource availability");
			ResultSet contractCourse_rs = database
					.retrieve("select* from contractcourse where idContractCourse = "
							+ courses_rs.getString(1));

			if (contractCourse_rs.next()) {

				resourceId = contractCourse_rs.getInt(5);
				// //System.out.println("resource id = "+resourceId);
				ResultSet rs = database
						.retrieve("Select ResourceHolidays_idHolidays from resourceholidays where ResourceHolidays_idResources = "
								+ resourceId + ";");

				while (rs.next()) {

					ResultSet holiday_rs = database
							.retrieve("Select* from holidays where idHolidays = "
									+ rs.getString(1) + ";");
					////System.out.println("resource holiday id = "+rs.getString(1
					// ));
					if (holiday_rs.next()) {

						Date startDate = holiday_rs.getDate(4);
						Date endDate = holiday_rs.getDate(5);
						java.util.Calendar cal = java.util.Calendar
								.getInstance();
						cal.setTime(startDate);
						startDate = cal.getTime();
						// //System.out.println("start date = "+startDate+
						// " endDate = "+endDate);
						while (startDate.before(endDate)
								|| startDate.equals(endDate)) {
							// //System.out.println("start date = "+startDate+
							// " day = "+day);
							if (startDate.toString().equals(dayString)) {

								Conflicts conflictDay = new Conflicts();
								conflictDay.setDay(sdf.format(startDate));

								conflictDay.setConflictReason(1);

								ResultSet course_rs = database
										.retrieve("select CourseNameEng from courses where idCourses = "
												+ contractCourse_rs
														.getString(2));
								course_rs.next();
								conflictDay.setFirstCourseName(course_rs
										.getString(1));

								conflictDay
										.setFirstCourseRunNo(contractCourse_rs
												.getInt(16));

								ResultSet resource_rs = database
										.retrieve("select ResourceFirstName,ResourceLastName from resources where idResources = "
												+ resourceId);
								resource_rs.next();
								conflictDay.setName(resource_rs.getString(1)
										+ " " + resource_rs.getString(2)
										+ " Holiday");

								return conflictDay;

							}

							cal.add(java.util.Calendar.DATE, 1);

							startDate = cal.getTime();
						}

					}
					holiday_rs.close();
				}
			}
		}
		return null;
	}

	///////////////////////////////////////////////////////////////////////////////////////////
	public void changeDisplayColor(int colorNumber) {
		
		Calendar.colorNumber = colorNumber;
		
	}
}
