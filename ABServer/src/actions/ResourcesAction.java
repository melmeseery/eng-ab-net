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

import abItems.Contracts;
import abItems.Resources;
import abItemsShow.ContractsShow;
import abItemsShow.RFilesShow;
import abItemsShow.ResourceHolidayShow;
import abItemsShow.ResourceRatesShow;
import abItemsShow.ResourcesShow;

import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

/**
 * @author noha
 *
 */
public class ResourcesAction extends Action {

	/* (non-Javadoc)
	 * @see org.apache.struts.action.Action#execute(org.apache.struts.action.ActionMapping, org.apache.struts.action.ActionForm, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		//create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);
		
		//handling the requested tasks///////////////////////////
		
		if (request.getParameter("task").equals("list")) {

			String q = "";

			for (int s = 0; s < 5; s++) {
				String[] filterType = request.getParameterValues("filter[" + s
						+ "][data][type]");
				// ////  //  //  ////System.out.println(filterType+ " "+s+" "+filterType[0]);
				if (filterType != null) {
					if (filterType[0].equals("list")) {
						String[] filter = request.getParameterValues("filter[" + s
								+ "][field]");

						for (int i = 0; i < filter.length; i++) {

							String[] values = request.getParameterValues("filter["
									+ s + "][data][value]");
							// //  //  //  ////System.out.println(values.length);
							if (filter[i].equals("resourceType")) {

								if (!q.equals(""))
									q = q + " and";
								if (values.length > 1)
									q = q + " (";
								int v = 0;
								for (int j = 0; j < values.length; j++) {
									if (j > 0)
										q = q + " or";
									if (values[j].equals("Consultant"))
										v = 1;
									else if (values[j].equals("Trainer"))
										v = 2;
									else if (values[j].equals("Both"))
										v = 3;
									q = q + " resourceType = " + v;
								}
								if (values.length > 1)
									q = q + " )";
							} else if (filter[i].equals("seniority")) {
								if (!q.equals(""))
									q = q + " and";
								if (values.length > 1)
									q = q + " (";
								int v = 0;
								for (int j = 0; j < values.length; j++) {
									if (j > 0)
										q = q + " or";
									if (values[j].equals("Senior"))
										v = 1;
									else if (values[j].equals("Middle Agged"))
										v = 2;
									else if (values[j].equals("Junior"))
										v = 3;

									q = q + " resourceSeniority = " + v;
								}
								if (values.length > 1)
									q = q + " )";
							} else if (filter[i]
									.equals("resourceHiegherDegree")) {
								if (!q.equals(""))
									q = q + " and";
								if (values.length > 1)
									q = q + " (";
								int v = 0;
								for (int j = 0; j < values.length; j++) {
									if (j > 0)
										q = q + " or";
									if (values[j].equals("B.Sc."))
										v = 1;
									else if (values[j].equals("M.Sc."))
										v = 2;
									else if (values[j].equals("Ph.D."))
										v = 3;
									else if (values[j].equals("MBA"))
										v = 4;
									else if (values[j].equals("MPA"))
										v = 5;
									else if (values[j].equals("Diploma"))
										v = 6;

									q = q + " resourceHigherDegree = " + v;
								}
								if (values.length > 1)
									q = q + " )";
							}

						}
					} else {
						String[] filter = request.getParameterValues("filter[" + s
								+ "][field]");

						for (int i = 0; i < filter.length; i++) {

							String[] values = request.getParameterValues("filter["
									+ s + "][data][value]");
							// //  //  //  ////System.out.println(values.length);
							if (filter[i].equals("resourceLastName")) {

								if (!q.equals(""))
									q = q + " and";

								String firstLetter = values[0];
								String remain = "";
								if(values[0].length() > 1){
								firstLetter = values[0].substring(0, 1);
								remain = values[0].substring(1, values[0].length());
								}
								String upperCase = firstLetter.toUpperCase();
								String lowerCase = firstLetter.toLowerCase();
								
								q = q + " (resourceLastName like '" + upperCase+remain
										+ "%' or resourceLastName like '" + lowerCase+remain
										+ "%')";
								//System.out.println(q);
							} else if (filter[i].equals("resourceName")) {
								if (!q.equals(""))
									q = q + " and";

								String firstLetter = values[0];
								String remain = "";
								if(values[0].length() > 1){
								firstLetter = values[0].substring(0, 1);
								remain = values[0].substring(1, values[0].length());
								}
								String upperCase = firstLetter.toUpperCase();
								String lowerCase = firstLetter.toLowerCase();
								
								q = q + " resourceFirstName like '" + upperCase+remain
										+ "%' or resourceFirstName like '" + lowerCase+remain
										+ "%'";
							}

						}
					}
				}
			}
			if (!q.equals(""))
				q = " where Deleted = 0 and " + q;
			else
				q = " where Deleted = 0";
			XStream xstream = new XStream();
			xstream.alias("Resource", ResourcesShow.class);
			Resources resources = new Resources();
			String returnText = xstream.toXML(resources.retreiveAllResources(database, "SELECT* from resources"+q, request));
		
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		
		}

		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("addNewResource")) {
			Resources resources = new Resources();
			resources.addNewResource(database, request);
		}

		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("editResource")) {
			Resources resources = new Resources();
			resources.editResource(database, request);
		}

		// ////////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("retreiveResource")) {

			XStream xstream = new XStream();
			xstream.alias("Resource", ResourcesShow.class);
			Resources resources = new Resources();
			String returnText = xstream.toXML(resources.retreiveResourceById(
					database, request));
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("deleteResource")) {
			Resources resources = new Resources();
			resources.deleteResource(database, request);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("addConsultingAreaToResource")) {
			Resources resources = new Resources();
			resources.addConsultingAreaToResource(database, request);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("addCourseToResource")) {
			Resources resources = new Resources();
			resources.addCourseToResource(database, request);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("checkIdNumberValidity")) {
			Resources resources = new Resources();
			String returnText =resources.checkIdNumberValidity(database, request);
			PrintWriter out = response.getWriter();

			out.write(returnText);
			
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("resourceHandouts")) {
			XStream xstream = new XStream();
			xstream.alias("Resourcefiles", RFilesShow.class);
			Resources resources = new Resources();
			String returnText = xstream.toXML(resources.retreiveResourceHandouts(database, request));
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();
			out.write(returnText);
			
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("AddHandoutToResource")) {
			Resources resources = new Resources();
			resources.AddHandoutToResource(database, request);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("deleteResourceHandout")) {
			Resources resources = new Resources();
			resources.deleteResourceHandout(database, request);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("resourceCertificates")) {
			XStream xstream = new XStream();
			xstream.alias("Resourcefiles", RFilesShow.class);
			Resources resources = new Resources();
			String returnText = xstream.toXML(resources.retreiveResourceCertificates(database, request));
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();
			out.write(returnText);
			
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("AddResourceCertificate")) {
			Resources resources = new Resources();
			resources.addResourceCertificate(database, request);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("deleteResourceCertificate")) {
			Resources resources = new Resources();
			resources.deleteResourceCertificate(database, request);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("resourceHolidays")) {
			XStream xstream = new XStream();
			xstream.alias("ResourceHoliday", ResourceHolidayShow.class);
			Resources resources = new Resources();
			String returnText = xstream.toXML(resources.retreiveResourceHolidays(database, request));
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();
			out.write(returnText);
			
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("addResourceHoliday")) {
			Resources resources = new Resources();
			resources.AddResourceHoliday(database, request);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("deleteResourceHoliday")) {
			Resources resources = new Resources();
			resources.deleteResourceHoliday(database, request);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("resourceRates")) {
			XStream xstream = new XStream();
			xstream.alias("ResourceRates", ResourceRatesShow.class);
			Resources resources = new Resources();
			String returnText = xstream.toXML(resources.retreiveResourceRates(database, request));
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();
			out.write(returnText);
			
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("AddResourceRate")) {
			Resources resources = new Resources();
			resources.AddResourceRate(database, request);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("deleteResourceRate")) {
			Resources resources = new Resources();
			resources.deleteResourceRate(database, request);
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("colors")) {
			XStream xstream = new XStream();
			Resources resources = new Resources();
			
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();
			out.write(resources.retreiveResourceColors(database));
			
		}
		
		// /////////////////////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("editResourceColor")) {
			Resources resources = new Resources();
			resources.editResourceColor(database, request);
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
