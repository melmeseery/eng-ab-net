/**
 * 
 */
package actions;

import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

import abItems.Contracts;
import abItems.Holidays;
import abItemsShow.ContractsShow;
import abItemsShow.HolidayShow;

/**
 * @author noha
 *
 */
public class HolidaysAction extends Action {
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		// create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);
		
		// /////////////////////////////////////////////////////////////////////////////
		if (request.getParameter("task").equals("addNewHoliday")) {
			Holidays holidays = new Holidays();
			
			holidays.addNewHoliday(database, request,response);
			
		}	
		
		// ///////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("retreiveHolidays")) {

			XStream xstream = new XStream();
			xstream.alias("Holiday", HolidayShow.class);
			Holidays holidays = new Holidays();
			String returnText = xstream.toXML(holidays
					.retreiveHolidaysforCalendar(database));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		// ///////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("Holidays")) {

			Holidays holidays = new Holidays();
			String returnText = holidays
					.retreiveHolidays(database);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		// ///////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("deleteHoliday")) {

			Holidays holidays = new Holidays();
			holidays
					.deleteHoliday(database, request);
			
		}
		
		// ///////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("editHoliday")) {

			Holidays holidays = new Holidays();
			holidays
					.editHoliday(database, request);
			
		}
		try {

			database.finalize();
		} catch (SQLException e) {

			e.printStackTrace();
		} catch (Throwable e) {

			e.printStackTrace();
		}
		return null;
		
	}
}
