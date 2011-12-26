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

import abItems.Calendar;
import abItems.Contracts;
import abItemsShow.Conflicts;
import abItemsShow.ContractsShow;
import abItemsShow.ECourse;

import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

/**
 * @author noha
 * 
 */
public class CalendarAction extends Action {

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.apache.struts.action.Action#execute(org.apache.struts.action.ActionMapping,
	 *      org.apache.struts.action.ActionForm,
	 *      javax.servlet.http.HttpServletRequest,
	 *      javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		// create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);

		// handling the requested tasks///////////////////////////

		if (request.getParameter("task").equals("retreiveContractEmptyCourses")) {

			XStream xstream = new XStream();
			xstream.alias("ECourse", ECourse.class);
			Calendar calendar = new Calendar();
			String returnText = xstream.toXML(calendar
					.retreiveContractEmptyCourses(database, request));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}

		// ////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("retreiveContractCourses")) {

			Calendar calendar = new Calendar();
			String returnText = calendar.retreiveContractCourses(database,
					request);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}

		// ////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("saveContractCourse")) {

			Calendar calendar = new Calendar();
			calendar.saveContractCourse(database, request);

		}

		// ////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("retreiveGeneralCalendarCourses")) {

			Calendar calendar = new Calendar();
			String returnText = calendar.retreiveGeneralCalendarCourses(database,
					request);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}

		// ////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("setFilterItems")) {

			Calendar calendar = new Calendar();
			calendar.setFilterItems(request);
			
		}

		// ////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("resetCalendar")) {

			Calendar calendar = new Calendar();
			calendar.resetCalendar();
			
		}

		// ////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("changeDisplayColor")) {

			Calendar calendar = new Calendar();
			calendar.changeDisplayColor(Integer.parseInt(request.getParameter("colorNumber")));
			
		}

		// ////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("checkCalendarConfliction")) {

			Calendar calendar = new Calendar();
			XStream xstream = new XStream();
			xstream.alias("Conflicts", Conflicts.class);
			String returnText = calendar.checkCalendarConfliction(database,
					request);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
			
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
