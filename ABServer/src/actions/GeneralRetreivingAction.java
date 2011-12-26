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

import abItems.ABItemsRetreiving;
import abItems.Contracts;
import abItemsShow.ContractsShow;

import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

/**
 * @author noha
 *
 */
public class GeneralRetreivingAction extends Action {

	/* (non-Javadoc)
	 * @see org.apache.struts.action.Action#execute(org.apache.struts.action.ActionMapping, org.apache.struts.action.ActionForm, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		//create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);
		
		ABItemsRetreiving ab_items_retreiving = new ABItemsRetreiving();
		
		//retreive courses/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("courses")) {

			String returnText = ab_items_retreiving.retreiveCourses(database);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive clients/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("clients")) {

			String returnText = ab_items_retreiving.retreiveClients(database);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive contract deal persons/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("contractDealPersons")) {

			String returnText = ab_items_retreiving.retreiveContractDealPersons(database,Integer.parseInt(request.getParameter("dealPersonType")));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive coordinators/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("coordinators")) {

			String returnText = ab_items_retreiving.retreiveCoordinators(database);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive coordinators teams/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("coordinatorsTeams")) {

			String returnText = ab_items_retreiving.retreiveCoordinatorsTeams(database);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive resources/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("resources")) {

			String returnText = ab_items_retreiving.retreiveResources(database);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive venues/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("venues")) {

			String returnText = ab_items_retreiving.retreiveVenues(database);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive venues/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("contractcoursevenues")) {

			String returnText = ab_items_retreiving.retreiveContractCourseVenues(database);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive tracks/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("tracks")) {

			String returnText = ab_items_retreiving.retreiveTracks(database);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive trainingAreas/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("trainingAreas")) {

			String returnText = ab_items_retreiving.retreiveTrainingAreas(database);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive consultingAreas/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("consultingAreas")) {

			String returnText = ab_items_retreiving.retreiveConsultingAreas(database);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive courses by trainingArea id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("coursesByTrainingAreaId")) {

			String returnText = ab_items_retreiving.retreiveCoursesByTrainingAreaId(database,request.getParameter("ta_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}	
		
		//retreive courses by track id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("coursesByTrackId")) {

			String returnText = ab_items_retreiving.retreiveCoursesByTrackId(database,request.getParameter("track_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive resources by course id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("resourcesByCourseId")) {

			String returnText = ab_items_retreiving.retreiveResourcesByCourseId(database,request.getParameter("course_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive coordinators by team id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("coordinatorsByTeamId")) {

			String returnText = ab_items_retreiving.retreiveCoordinatorsByTeamId(database,request.getParameter("team_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive courses by resource id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("coursesByResourceId")) {

			String returnText = ab_items_retreiving.retreiveCoursesByResourceId(database,request.getParameter("res_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive remain courses by resource id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("remainCoursesByResourceId")) {

			String returnText = ab_items_retreiving.retreiveRemainCoursesByResourceId(database,request.getParameter("res_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
			
		//retreive courses by resource id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("consultingAreasByResourceId")) {

			String returnText = ab_items_retreiving.retreiveConsultingAreasByResourceId(database,request.getParameter("res_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive courses by resource id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("remainConsultingAreasByResourceId")) {

			String returnText = ab_items_retreiving.retreiveRemainConsultingAreasByResourceId(database,request.getParameter("res_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive contract by client id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("contractsByClientId")) {

			String returnText = ab_items_retreiving.retreiveContractsByClientId(database,request.getParameter("client_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive contract by client id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("contracts")) {

			String returnText = ab_items_retreiving.retreiveContracts(database);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive courses by contract id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("coursesByContractId")) {

			String returnText = ab_items_retreiving.retreiveCoursesByContractId(database,request.getParameter("contract_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive courses by client id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("coursesByClientId")) {

			String returnText = ab_items_retreiving.retreiveCoursesByClientId(database,request.getParameter("client_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive assigned resources by contract id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("assignedResourcesByContractId")) {

			String returnText = ab_items_retreiving.retreiveAssignedResourcesByContractId(database,request.getParameter("contract_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive assigned resources by client id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("assignedResourcesByClientId")) {

			String returnText = ab_items_retreiving.retreiveAssignedResourcesByClientId(database,request.getParameter("client_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive assigned resources by course id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("assignedResourcesByCourseId")) {

			String returnText = ab_items_retreiving.retreiveAssignedResourcesByCourseId(database,request.getParameter("course_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive assigned coordinators by contract id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("assignedCoordinatorsByContractId")) {

			String returnText = ab_items_retreiving.retreiveAssignedCoordinatorsByContractId(database,request.getParameter("contract_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive assigned coordinators by client id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("assignedCoordinatorsByClientId")) {

			String returnText = ab_items_retreiving.retreiveAssignedCoordinatorsByClientId(database,request.getParameter("client_id"));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		//retreive assigned coordinators by course id/////////////////////////////////////////////////////
		if (request.getParameter("task").equals("assignedCoordinatorsByCourseId")) {

			String returnText = ab_items_retreiving.retreiveAssignedCoordinatorsByCourseId(database,request.getParameter("course_id"));
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
