/**
 * 
 */
package abItems;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.thoughtworks.xstream.XStream;

import abItemsShow.Conflicts;
import abItemsShow.ContractsShow;
import abItemsShow.HolidayShow;
import actions.GeneralActions;

import database.DataSourceConnection;

/**
 * @author noha
 * 
 */
public class Holidays {

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
		database
				.update("INSERT INTO holidays (HolidayName,StartDate,EndDate,OneDay) VALUES('"
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
}
