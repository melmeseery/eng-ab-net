/**
 * 
 */
package actions;

import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import abItems.Contracts;
import abItemsShow.ContractsShow;
import abItemsShow.CoursesShow;

import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

/**
 * @author noha
 * 
 */
public class ContractsAction extends Action {

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

		if (request.getParameter("task").equals("list")) {

			XStream xstream = new XStream();
			xstream.alias("Contracts", ContractsShow.class);
			Contracts contracts = new Contracts();
			String returnText = xstream.toXML(contracts
					.retreiveAcceptedContracts(database));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		// ///////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("listPending")) {

			XStream xstream = new XStream();
			xstream.alias("Contracts", ContractsShow.class);
			Contracts contracts = new Contracts();
			String returnText = xstream.toXML(contracts
					.retreivePendingContracts(database));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("generateProposalId")) {

			Contracts contracts = new Contracts();
			String returnText = contracts.generateProposalId(database, Integer
					.parseInt(request.getParameter("clientid")));
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("addNewContract")) {
			Contracts contracts = new Contracts();
			contracts.addNewContract(database, request);
		}

		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("editContract")) {
			Contracts contracts = new Contracts();
			contracts.editContract(database, request, request.getParameter("contractId"));
		}

		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("deleteContract")) {
			Contracts contracts = new Contracts();
			contracts.deleteContract(database, request);
		}

		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("retreiveContractPrice")) {

			Contracts contracts = new Contracts();
			String returnText = contracts.retreiveContractPrice(database,
					request.getParameter("priceType"));
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}

		// ////////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("retreiveContract")) {

			XStream xstream = new XStream();
			xstream.alias("Contract", ContractsShow.class);
			Contracts contracts = new Contracts();
			String returnText = xstream.toXML(contracts.retreiveContractById(
					database, (Integer) request.getSession().getAttribute(
							"contractid")));
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}

		// ////////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("retreiveContractCourses")) {

			XStream xstream = new XStream();
			xstream.alias("Course", CoursesShow.class);
			Contracts contracts = new Contracts();
			String returnText = xstream.toXML(contracts
					.retreiveContractCourses(database, (Integer) request
							.getSession().getAttribute("contractid")));
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("addNewContractCourse")) {
			Contracts contracts = new Contracts();
			contracts.addNewContractCourse(database, request);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("editContractCourse")) {
			Contracts contracts = new Contracts();
			contracts.editContractCourse(database, request);
		}		

		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("deleteContractCourse")) {
			Contracts contracts = new Contracts();
			contracts.deletetContractCourse(database, request);
		}

		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("assignResourceToContractCourse")) {
			Contracts contracts = new Contracts();
			contracts.assignResourceToContractCourse(database, request);
		}

		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("assignCoordinatorToConractCourse")) {
			Contracts contracts = new Contracts();
			contracts.assignCoordinatorToContractCourse(database, request);
		}

		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("assignVenueAndDatashowToContractCourse")) {
			Contracts contracts = new Contracts();
			contracts.assignVenueAndDatashowToContractCourse(database, request);
		}

		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("assignClientCofirmationToContractCourse")) {
			Contracts contracts = new Contracts();
			contracts.assignClientConfirmationToContractCourse(database, request);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("saveLOCToContractCourse")) {
			Contracts contracts = new Contracts();
			contracts.saveLOCToContractCourse(database, request);
		}
	
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("generateContractPDF")) {
			Contracts contracts = new Contracts();
			contracts.generateContractPDF(database, request);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("addContractCourseComment")) {
			Contracts contracts = new Contracts();
			contracts.addContractCourseComment(database, request);
		}
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("changeProposalId")) {

			Contracts contracts = new Contracts();
			String returnText = contracts.changeProposalId(database, Integer
					.parseInt(request.getParameter("clientid")), Integer
					.parseInt(request.getParameter("contractId")));
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
