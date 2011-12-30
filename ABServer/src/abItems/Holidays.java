/**
 *
 */
package abItems;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.fortuna.ical4j.data.CalendarBuilder;

import org.apache.log4j.Logger;

import abItemsShow.HolidayShow;
import actions.GeneralActions;
import database.DataSourceConnection;



import org.apache.log4j.Logger;
import net.fortuna.ical4j.data.CalendarBuilder;
import net.fortuna.ical4j.model.Component;
import net.fortuna.ical4j.model.DateTime;
import net.fortuna.ical4j.model.Property;
import net.fortuna.ical4j.model.property.DateProperty;
import net.fortuna.ical4j.model.Calendar;;
/**
 * @author noha
 *
 */
public class Holidays {

//  public  static int  v=0;
	 static Logger logger = Logger.getLogger(Holidays.class);
	public void addNewHoliday(DataSourceConnection database,
			HttpServletRequest request, HttpServletResponse response)
			throws SQLException, IOException {

		// SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);

		Boolean oneDay = null;

		Date startDate = new Date();
		startDate = GeneralActions.parseDate(request.getParameter("startDate"));

		Date endDate = new Date();
		endDate = GeneralActions.parseDate(request.getParameter("endDate"));

		if (endDate.after(startDate))
			oneDay = false;
		else
			oneDay = true;

		// //insert new row to the database///////////////
		database.update("INSERT INTO holidays (HolidayName,StartDate,EndDate,OneDay) VALUES('"
						+ request.getParameter("holiday_name")
						+ "','"
						+ request.getParameter("startDate")
						+ "','"
						+ request.getParameter("endDate")
						+ "',"
						+ oneDay
						+ ");");

	}

	////////////////////////////////////////////////////////////////////////////
	// ////////////////////////
	public ArrayList<HolidayShow> retreiveHolidaysforCalendar(
			DataSourceConnection database) throws SQLException {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss Z",
				Locale.US);

		ResultSet rs = database.retrieve("SELECT* FROM holidays;");
		ArrayList<HolidayShow> Show = new ArrayList<HolidayShow>();
		while (rs != null && rs.next()) {
			if (rs.getString(8) == null) {
				HolidayShow h = new HolidayShow();

				h.setHolidayID(rs.getInt(1));
				h.setHolidayName(rs.getString(2));
				h.setOneDay(rs.getBoolean(6));
				h.setStarttime(sdf.format(rs.getDate(4)));
				h.setEndtime(sdf.format(rs.getDate(5)));

				Show.add(h);
			}
		}
		rs.close();

		return Show;
	}

	////////////////////////////////////////////////////////////////////////////
	// ////////////////////////
	public String retreiveHolidays(DataSourceConnection database)
			throws SQLException, ParseException {
		SimpleDateFormat s = new SimpleDateFormat("dd-MMM-yyyy", Locale.US);
		ResultSet rs = database.retrieve("SELECT* FROM holidays;");
		String xmlText = "";
		while (rs != null && rs.next()) {
			if (rs.getString(8) == null)
				xmlText = xmlText
						+ "<Holiday><holidayId>"
						+ rs.getString(1)
						+ "</holidayId><HolidayName>"
						+ rs.getString(2)
						+ "</HolidayName><fromDate>"
						+ s.format(GeneralActions.parseDateToRequiredDate(rs
								.getString(4)))
						+ "</fromDate><toDate>"
						+ s.format(GeneralActions.parseDateToRequiredDate(rs
								.getString(5))) + "</toDate></Holiday>";

		}
		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	////////////////////////////////////////////////////////////////////////////
	// ////////////////////////
	public void deleteHoliday(DataSourceConnection database,
			HttpServletRequest request) throws SQLException, ParseException {

		for (int i = 0; i < request.getParameterValues("holidayIds").length; i++) {

			String q = "delete from holidays where idHolidays = "
					+ request.getParameterValues("holidayIds")[i];

			database.update(q);

		}

	}

	////////////////////////////////////////////////////////////////////////////
	// ///////////////////////////
	public void editHoliday(DataSourceConnection database,
			HttpServletRequest request) {

		String holidayId = request.getParameter("holidayid");

		Boolean oneDay = null;

		Date startDate = new Date();
		startDate = GeneralActions.parseDate(request.getParameter("startDate"));

		Date endDate = new Date();
		endDate = GeneralActions.parseDate(request.getParameter("endDate"));

		if (endDate.after(startDate))
			oneDay = false;
		else
			oneDay = true;

		// //insert new row to the database///////////////
		database
				.update("UPDATE holidays SET HolidayName = '"
						+ request.getParameter("holiday_name")
						+ "',StartDate = '" + request.getParameter("startDate")
						+ "',EndDate = '" + request.getParameter("endDate")
						+ "',OneDay = " + oneDay + " where idHolidays = " + holidayId + ";");
	}

	public void loadIcalHoliday(DataSourceConnection database,
			HttpServletRequest request) {

		logger.info(" Inside the load local holiday no all i have to do is java code ");

		Calendar cal = getiCal(1);
		processCalendar(database,cal);
        cal = getiCal(2);
		processCalendar(database,cal);
		// SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);

//				Boolean oneDay = null;
//				Date startDate = new Date();
//				Date endDate = new Date();
//				if (endDate.after(startDate))
//					oneDay = false;
//				else
//					oneDay = true;
//
//				// //insert new row to the database///////////////
//				database.update("INSERT INTO holidays (HolidayName,StartDate,EndDate,OneDay) VALUES('"
//								+ request.getParameter("holiday_name")
//								+ "','"
//								+ request.getParameter("startDate")
//								+ "','"
//								+ request.getParameter("endDate")
//								+ "',"
//								+ oneDay
//								+ ");");

	}


	public Calendar  getiCal(int cal){
		  InputStreamReader  fr = null;
		  //FileReader fr=null;
		BufferedReader br = null;
		 URL tempurl =null;
		try
		{
			if(cal==1)
			{
	            tempurl  = new URL("http://ical.mac.com/ical/US32Holidays.ics");
			}else if(cal==2){
			    tempurl  = new URL("http://ical.mac.com/ical/Islamic32Holidays.ics");
			}
			else{
				tempurl  = new URL("http://ical.mac.com/ical/Egypt32Holidays.ics");
			}

			//fr = new FileReader(temp);
	        fr=   new InputStreamReader(tempurl.openStream());
			br = new BufferedReader(fr);
			CalendarBuilder builder = new CalendarBuilder();
			Calendar calendar = builder.build(br);

			return calendar;
		}
	catch (Exception e)
	{
		e.printStackTrace(System.out);
	}
	finally
	{
		try
		{
			if (br != null)
			{
				br.close();
			}
		}
		catch (Exception e)
		{
		}
		//
		try
		{
			if (fr != null)
			{
				fr.close();
			}
		}
		catch (Exception e)
		{
		}
	}
		return null;

	}

	public void processCalendar(DataSourceConnection database,Calendar  calendar){

		for (Iterator i = calendar.getComponents().iterator(); i.hasNext();) {
			Component component = (Component) i.next();
		    System.out.println("Component [" + component.getName() + "]");

			Boolean oneDay = null;
			Date currentdate = new Date();
			Date startDate = new Date();
			Date endDate = new Date();

			String HolidayName="";

		    logger.info("----------------------------------------------------------------------------");
			Property property = component.getProperty(Property.DTSTART);
			DateProperty  tempStart = (DateProperty) component.getProperty(Property.DTSTART);
	//		startDate  = GeneralActions.parseDateFromiCal( property.getValue());
			startDate=tempStart.getDate();
		    logger.info(" Start Date =" + property.getValue());

		    logger.info("----------------------------------------------------------------------------");
			Property property3 = component.getProperty(Property.DTEND);
			tempStart = (DateProperty) component.getProperty(Property.DTEND);
		    //endDate=GeneralActions.parseDateFromiCal(property3.getValue());
			endDate=tempStart.getDate();
		    logger.info(" End Date =" + property3.getValue());

		    logger.info("----------------------------------------------------------------------------");
			Property property2 = component.getProperty(Property.SUMMARY);
			logger.info(" Summary =" + property2.getValue());
            HolidayName=property2.getValue();




       	if (endDate.compareTo(startDate)>2)
       		  oneDay = false;
		 	else
		 	  oneDay = true;

       	if (currentdate.after(startDate))
       		continue;


       	HolidayName=HolidayName.replace("'","_");
            logger.info("INSERT INTO holidays (HolidayName,StartDate,EndDate,OneDay) VALUES('"
    				+HolidayName
    				+ "','"
    				+ startDate
    				+ "','"
    				+ endDate
    				+ "',"
    				+ oneDay
    				+ ");");
			//DateProperty  tempStart = (DateProperty) component.getProperty(Property.DTSTART);
		database.update("INSERT INTO holidays (HolidayName,StartDate,EndDate,OneDay) VALUES('"
				+HolidayName
				+ "','"
				+ startDate
				+ "','"
				+ endDate
				+ "',"
				+ oneDay
				+ ");");




	}
	}


}
