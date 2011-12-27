package mypackage;
import java.io.PrintWriter;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import abItemsShow.CoordinateHistoryShow;
import abItemsShow.CoordinatorShow;
import abItemsShow.TeamShow;
import tablespackage.Teammembers;
import tablespackage.Teams;
import tablespackage.Trainingcoordinatehistory;
import tablespackage.Trainingcoordinators;
import HibernatePackage.Hiber_CoordinateHistory;
import HibernatePackage.Hiber_Coordinators;
//import HibernatePackage.HibernateUtil;


import com.mysql.jdbc.Statement;
import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

public class ListCoordinators extends org.apache.struts.action.Action {
	  static Logger logger = Logger.getLogger(ListCoordinators.class);
    // Global Forwards
    public static final String GLOBAL_FORWARD_start = "start";
    private static Serializable serObj;
    // Local Forwards
   // Session session = null;

    public ListCoordinators() {
    }

    public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
    	Hiber_Coordinators HC=new Hiber_Coordinators();
    	Hiber_CoordinateHistory HCH=new Hiber_CoordinateHistory();
    	XStream xstream = new XStream();
    	HttpSession session=request.getSession(true);

    	// create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);



    	if(request.getParameter("task").equals("list"))
    	{
	    	ArrayList coordinators=HC.getCoordinators(database);
	    	ArrayList<CoordinatorShow> coo=new ArrayList<CoordinatorShow>();
	    	for(int i=0;i<coordinators.size();i++)
	    	{
	    		Trainingcoordinators t=(Trainingcoordinators)coordinators.get(i);
	    		CoordinatorShow cS=new CoordinatorShow();
	    		cS.setTrainingCoordinateFirstName(t.getTrainingCoordinateFirstName());
	    		cS.setTrainingCoordinateLastName(t.getTrainingCoordinateLastName());
	    		cS.setTrainingCoordinateAbb(t.getTrainingCoordinateAbb());
	    		cS.setTrainingCoordinateAddress(t.getTrainingCoordinateAddress());
	    		cS.setTrainingCoordinateEmail(t.getTrainingCoordinateEmail());
	    		cS.setTrainingCoordinateMobile(t.getTrainingCoordinateMobile());
	    		cS.setTrainingCoordinateTelephone(t.getTrainingCoordinateTelephone());
	    		cS.setTrainingCoordinateDescription(t.getTrainingCoordinateDescription());
	    		cS.setTrainingCoordinatorCurrentSalary(t.getTrainingCoordinatorCurrentSalary());
	    		cS.setTrainingCoordinatorCurrentTitle(t.getTrainingCoordinatorCurrentTitle());
	    		ArrayList<Integer> ids=HC.getCourseCoordinators(t.getIdTrainingCoordinators(), database);
	    	//	cS.setManDay(ids.size());
	    		SimpleDateFormat s=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
	    		if(t.getTrainingCoordinateBirthDate()!=null)
	    		{
		    		String d=s.format(t.getTrainingCoordinateBirthDate());
		    		cS.setTrainingCoordinateBirthDate(d);
	    		}
	    		else
	    			cS.setTrainingCoordinateBirthDate(null);
	    		if(t.getTrainingCoordinateHireDate()!=null)
	    		{
	    			String d1=s.format(t.getTrainingCoordinateHireDate());
	    			cS.setTrainingCoordinateHireDate(d1);
	    		}
	    		if(t.getTrainingCoordinatorResignationDate()!=null)
	    		{
	    			String d=s.format(t.getTrainingCoordinatorResignationDate());
	    			cS.setTrainingCoordinatorResignationDate(d);
	    		}
	    		else
	    			cS.setTrainingCoordinatorResignationDate(null);
	    		cS.setIdTrainingCoordinators(t.getIdTrainingCoordinators());
	    		coo.add(cS);
	    		Integer length=ids.size();
//	    		//System.out.println("length= "+length);
//	    		Date d=new Date();
//	    		for(int j=0;j<ids.size();j++)
//	    		{
//	    			String years=HC.getYear(ids.get(j));
//	    			//System.out.println(years.substring(0, 4));
//	    			if(years!=null)
//	    			{//System.out.println("ana goa el if");
//		    			if(years.substring(0, 4).equals("2009"))
//		    			{////System.out.println("ana goa el if "+years.substring(0, 4));
//		    				length--;
//		    			}
//	    			}
//	    		}
	    		cS.setManDay(length);
	    	}
	        xstream.alias("Trainingcoordinators", CoordinatorShow.class);
	        String returnText = xstream.toXML(coo);
	        // //System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8");
	        PrintWriter out = response.getWriter();
			out.write(returnText);
    	}
    	else if(request.getParameter("task").equals("AddCoordinator"))
    	{
    		String [] l=request.getParameterValues("types");
    		Trainingcoordinators Tc=new Trainingcoordinators();
    		Tc.setTrainingCoordinateAbb(request.getParameter("trainingCoordinateAbb"));
    		Tc.setTrainingCoordinateAddress(request.getParameter("trainingCoordinateAddress"));
    		Tc.setTrainingCoordinateColor(request.getParameter("trainingCoordinateColor"));
    		Tc.setTrainingCoordinateEmail(request.getParameter("trainingCoordinateEmail"));
    		Tc.setTrainingCoordinateFirstName(request.getParameter("trainingCoordinateFirstName"));
    		Tc.setTrainingCoordinateLastName(request.getParameter("trainingCoordinateLastName"));
    		Tc.setTrainingCoordinateMobile(request.getParameter("trainingCoordinateMobile"));
    		Tc.setTrainingCoordinateTelephone(request.getParameter("trainingCoordinateTelephone"));
    		Tc.setTrainingCoordinateDescription(request.getParameter("trainingCoordinateDescription"));
    	// Tc.setTrainingCoordinatorCurrentSalary(request.getParameter("trainingCoordinateCurrentSalary"));
    	// Tc.setTrainingCoordinatorCurrentTitle(request.getParameter("trainingCoordinateCurrentTitle"));
    		String trainingCoordinateHireDate=null;
            if(!request.getParameter("trainingCoordinateHireDate").equals("3000-01-01"))
            	trainingCoordinateHireDate=request.getParameter("trainingCoordinateHireDate");

            String trainingCoordinateBirthDate=null;
            if(!request.getParameter("trainingCoordinateBirthDate").equals("3000-01-01"))
           	trainingCoordinateBirthDate=request.getParameter("trainingCoordinateBirthDate");
    		HC.insertCoordinator(Tc,trainingCoordinateHireDate,trainingCoordinateBirthDate, database);
    		Integer id=HC.getLastOne(database);
    		// // //////System.out.println("length= "+l.length);
    		// //////System.out.println("length of types = "+len);
    		if(!Integer.valueOf(request.getParameter("length")).equals(0))
    		{
    			Trainingcoordinators t=new Trainingcoordinators();
    			Integer len=Integer.valueOf(request.getParameter("length"));
	    		for(int i=0;i<len;i++)
	    		{// //////System.out.println("ana goa el for");
	    			Trainingcoordinatehistory tH=new Trainingcoordinatehistory();
	    			tH.setTrainingCoordinateHistoryType(l[i]);
	    			tH.setTrainingCoordinateHistoryValid(true);
	    			// //////System.out.println(request.getParameterValues("validFroms")[i]);
	    			String x=request.getParameterValues("validFroms")[i]+"x";
	    			String validFrom=null;

	    			if(x.equals("x"))
	    			{
	    				validFrom=null;
	    			}
	    			else
	    			{
	    				validFrom=request.getParameterValues("validFroms")[i];
	    			}

	        	//	t.setIdTrainingCoordinators(id);
	        		tH.setTrainingCoordinators(id);
	        		t.setIdTrainingCoordinators(id);
	        		tH.setTrainingCoordinateHistoryValue(request.getParameterValues("values")[i]);
	        		boolean b=true;
	        		if(l[i].equals("Salary"))
	        			t.setTrainingCoordinatorCurrentSalary(request.getParameterValues("values")[i]);
	        		else if(l[i].equals("Title"))
	        		{
	        			t.setTrainingCoordinatorCurrentTitle(request.getParameterValues("values")[i]);
	        			b=false;
	        		}
	        			//HC.update(t);
	        		// AL.add(tH);
	        		HCH.insertCoordHistory(tH,validFrom, database);
	        		if(i!=len-1 && request.getParameterValues("validFroms")[i+1]!=null)
	        		{
	        		String s=l[i];
	        	//	Integer thID=HCH.getLastOne();
	        		Integer THid=HCH.getLastOne(s,id, database);
	        		//System.out.println("iddddddddddd= "+THid);
	        		Trainingcoordinatehistory T=new Trainingcoordinatehistory();
	        		T.setIdTrainingCoordinateHistory(THid);
	        		String validFrom1=null;
	        		if(!request.getParameterValues("validFroms")[i+1].equals("3000-01-01"))
	        			validFrom1=request.getParameterValues("validFroms")[i+1];
	        		if(THid!=0)
	        			HCH.update(T,THid,validFrom1,true, database);
	        		}
	        		HC.update(t,b, database);
	    		}

    		}
    	}
		 else if(request.getParameter("task").equals("listHistory"))
		 {

		 ArrayList AL=new ArrayList();
		 xstream.alias("Trainingcoordinatehistory", CoordinateHistoryShow.class);
		 String returnText = xstream.toXML(AL);
		 // //////System.out.println(AL.size());
		 // //////System.out.println("return text = "+returnText);
		 response.setContentType("application/xml;charset=UTF-8");
		 PrintWriter out = response.getWriter();
		 out.write(returnText);
		 }
		 else if(request.getParameter("task").equals("Hdata"))
		 {
		 ArrayList<Trainingcoordinators> l=new ArrayList<Trainingcoordinators>();
		 Integer id=(Integer)session.getAttribute("coordinatorID");
		 Trainingcoordinators c=HC.getCoordinatorById(id, database);
		 l.add(c);
		 xstream.alias("Trainingcoordinators", Trainingcoordinators.class);
		 String returnText = xstream.toXML(l);
		 // //////System.out.println(l.size());
		 // //////System.out.println("return text = "+returnText);
		 response.setContentType("application/xml;charset=UTF-8");
		 PrintWriter out = response.getWriter();
		 out.write(returnText);
		 }

		 else if(request.getParameter("task").equals("Cdata"))
		 {
		 Integer id=(Integer)session.getAttribute("coordinatorID");
		 ArrayList<Trainingcoordinatehistory> AL=new
		 ArrayList<Trainingcoordinatehistory>();
		 AL=HCH.getCoordinatorById(id, database);
		 ArrayList coordinators=HC.getCoordinators(database);
		 ArrayList<CoordinateHistoryShow> H=new ArrayList<CoordinateHistoryShow>();
		 // //////System.out.println("id= "+id);
		 for(int i=0;i<AL.size();i++)
		 {// //////System.out.println("ana goa el for "+AL.size());
		 CoordinateHistoryShow CHS=new CoordinateHistoryShow();
		 Trainingcoordinatehistory t=(Trainingcoordinatehistory)AL.get(i);
		 Trainingcoordinators x=HC.getCoordinatorById(t.getTrainingCoordinators(), database);
		 CHS.setIdTrainingCoordinateHistory(t.getIdTrainingCoordinateHistory());
		 CHS.setTrainingCoordinateHistoryType(t.getTrainingCoordinateHistoryType());
		 //String myString = DateFormat.getDateInstance().format(d);
		 if(t.getTrainingCoordinateHistoryValidFrom() !=null)
		 {
		 SimpleDateFormat s=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
		 String d=s.format(t.getTrainingCoordinateHistoryValidFrom());
		 CHS.setTrainingCoordinateHistoryValidFrom(d);
		 }
		 else
		 CHS.setTrainingCoordinateHistoryValidFrom(null);
		 if(t.getTrainingCoordinateHistoryValidTo() !=null)
		 {
		 SimpleDateFormat s=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
		 String d=s.format(t.getTrainingCoordinateHistoryValidTo());
		 CHS.setTrainingCoordinateHistoryValidTo(d);

		 }
		 else
		 CHS.setTrainingCoordinateHistoryValidTo(null);
		 //CHS.setTrainingCoordinateHistoryValid(t.getTrainingCoordinateHistoryValid());
		 CHS.setTrainingCoordinateHistoryValue(t.getTrainingCoordinateHistoryValue());

		 for(int j=0;j<coordinators.size();j++)
		 {
		 Trainingcoordinators tC=(Trainingcoordinators)coordinators.get(j);
		 if(tC.getIdTrainingCoordinators().equals(x.getIdTrainingCoordinators()))
		 {
		 CHS.setTrainingCoordinators(tC.getTrainingCoordinateEmail());
		 }
		 }
		 H.add(CHS);
		 }
		 xstream.alias("Trainingcoordinatehistory", CoordinateHistoryShow.class);
		 String returnText = xstream.toXML(H);
		 // //////System.out.println("size= "+H.size());
		 // //////System.out.println("return text = "+returnText);
		 response.setContentType("application/xml;charset=UTF-8");
		 PrintWriter out = response.getWriter();
		 out.write(returnText);
		 }
		 else if(request.getParameter("task").equals("EditCoordinator"))
		 {
			 Integer id=(Integer)session.getAttribute("coordinatorID");
				 String [] l=request.getParameterValues("types");
				 // //////System.out.println("length= "+l.length);
				 Trainingcoordinators Tc=new Trainingcoordinators();
				 Tc.setIdTrainingCoordinators(id);
				 Tc.setTrainingCoordinateAbb(request.getParameter("trainingCoordinateAbb"));
				 Tc.setTrainingCoordinateAddress(request.getParameter("trainingCoordinateAddress"));
				 Tc.setTrainingCoordinateColor(request.getParameter("trainingCoordinateColor"));
				 Tc.setTrainingCoordinateEmail(request.getParameter("trainingCoordinateEmail"));
				 Tc.setTrainingCoordinateFirstName(request.getParameter("trainingCoordinateFirstName"));
				 Tc.setTrainingCoordinateLastName(request.getParameter("trainingCoordinateLastName"));
				 Tc.setTrainingCoordinateMobile(request.getParameter("trainingCoordinateMobile"));
				 Tc.setTrainingCoordinateTelephone(request.getParameter("trainingCoordinateTelephone"));
				 Tc.setTrainingCoordinateDescription(request.getParameter("trainingCoordinateDescription"));
				 //
				 Tc.setTrainingCoordinatorCurrentSalary(request.getParameter("trainingCoordinateCurrentSalary"));
				 //
				 Tc.setTrainingCoordinatorCurrentTitle(request.getParameter("trainingCoordinateCurrentTitle"));
				 String trainingCoordinateHireDate=null;
		            if(!request.getParameter("trainingCoordinateHireDate").equals("3000-01-01"))
		            	trainingCoordinateHireDate=request.getParameter("trainingCoordinateHireDate");

		            String trainingCoordinateBirthDate=null;
		            if(!request.getParameter("trainingCoordinateBirthDate").equals("3000-01-01"))
		            	trainingCoordinateBirthDate=request.getParameter("trainingCoordinateBirthDate");

		            String trainingCoordinatorResignationDate=null;
		            if(!request.getParameter("trainingCoordinatorResignationDate").equals("3000-01-01"))
		            	trainingCoordinatorResignationDate=request.getParameter("trainingCoordinatorResignationDate");
				//System.out.println("resign= "+trainingCoordinatorResignationDate);
		            HC.updateCoordinator(Tc,trainingCoordinateBirthDate,trainingCoordinateHireDate,trainingCoordinatorResignationDate, database);
		 }
			 else if(request.getParameter("task").equals("AddHistory"))
			 {// //////System.out.println("ana goa add history");
				 Integer id=(Integer)session.getAttribute("coordinatorID");
				 Trainingcoordinatehistory tH=new Trainingcoordinatehistory();
				// Trainingcoordinators t=new Trainingcoordinators();

				 tH.setTrainingCoordinateHistoryType(request.getParameter("trainingCoordinateHistoryType"));
				 tH.setTrainingCoordinateHistoryValid(true);
				 Date d1=new Date();
				 d1=parseDate(request.getParameter("trainingCoordinateHistoryValidFrom"));
				 tH.setTrainingCoordinateHistoryValidFrom(d1);
				 // Date d3=new Date();
				 // d3=parseDate(request.getParameter("trainingCoordinateHistoryValidTo"));
				 // tH.setTrainingCoordinateHistoryValidTo(d3);
				// t.setIdTrainingCoordinators(id);
				 tH.setTrainingCoordinators(id);
				 tH.setTrainingCoordinateHistoryValue(request.getParameter("trainingCoordinateHistoryValue"));
				 String s=request.getParameter("trainingCoordinateHistoryType");
				 Integer THid=HCH.getLastOne(s,id, database);
				 //System.out.println("id= "+THid);
				 Trainingcoordinatehistory T=new Trainingcoordinatehistory();
				 T.setIdTrainingCoordinateHistory(THid);
				// Date d=new Date();
				 String d=null;
				 if(!request.getParameter("trainingCoordinateHistoryValidFrom").equals("3000-01-01"))
				 {
					 d=request.getParameter("trainingCoordinateHistoryValidFrom");
					 HCH.update(T,THid, d,true, database);
				 }
				 HCH.insertCoordHistory(tH,d, database);
				 Trainingcoordinators Tc=new Trainingcoordinators();
				 Tc.setIdTrainingCoordinators(id);
				 //System.out.println("type= "+request.getParameter("trainingCoordinateHistoryType"));
				 if(request.getParameter("trainingCoordinateHistoryType").equals("Salary"))
				 {
					 //System.out.println("ana goa el salary");
					 Tc.setTrainingCoordinatorCurrentSalary(request.getParameter("trainingCoordinateHistoryValue"));
					 HC.update(Tc,true, database);
				 }
				  else if(request.getParameter("trainingCoordinateHistoryType").equals("Title"))
				 {
				 	Tc.setTrainingCoordinatorCurrentTitle(request.getParameter("trainingCoordinateHistoryValue"));
				 	HC.update(Tc,false, database);
				 }



			 }
			 else if(request.getParameter("task").equals("EditHistory"))
			 {
			 Integer Tid=(Integer)session.getAttribute("coordinatorID");
			 Integer id=Integer.valueOf(request.getParameter("id"));
			 Trainingcoordinatehistory Tc=new Trainingcoordinatehistory();
			 Tc.setIdTrainingCoordinateHistory(id);
			 Tc.setTrainingCoordinateHistoryType(request.getParameter("trainingCoordinateHistoryType"));
			 Tc.setTrainingCoordinateHistoryValue(request.getParameter("trainingCoordinateHistoryValue"));
			 String d3=null;
			 if(!request.getParameter("trainingCoordinateHistoryValidFrom").equals("3000-01-01"))
				 d3=request.getParameter("trainingCoordinateHistoryValidFrom");
			 Tc.setTrainingCoordinators(Tid);
			 HCH.update(Tc,id, d3,false, database);
			 Integer THid = HCH.getLastOne(request.getParameter("trainingCoordinateHistoryType"),Tid, database);
			 Trainingcoordinators t = new Trainingcoordinators();
			 t.setIdTrainingCoordinators(Tid);
			 if(THid!=null)
			 {
				 if(THid.equals(id))
				 {
					 if(request.getParameter("trainingCoordinateHistoryType").equals("Salary"))
					 {
						 t.setTrainingCoordinatorCurrentSalary(request.getParameter("trainingCoordinateHistoryValue"));
						 HC.update(t, true, database);
					 }
					 else if(request.getParameter("trainingCoordinateHistoryType").equals("Title"))
					 {
						 t.setTrainingCoordinatorCurrentTitle(request.getParameter("trainingCoordinateHistoryValue"));
						 HC.update(t, false, database);
					 }
				 }

			 }
			 }
			 else if(request.getParameter("task").equals("DELETESELECTIONS"))
			 {
				 Integer cID=(Integer)session.getAttribute("coordinatorID");
				 if (request.getParameterValues("ids").length == 1)
	              {
	            	  try{

	          			HC.updateC(cID,request.getParameterValues("type")[0], database);
	          			database.update("delete from trainingcoordinatehistory where idTrainingCoordinateHistory = "+request.getParameterValues("ids")[0]);

	          		}
	          		  catch (Exception e) { e.printStackTrace();

	          	      }  finally {

	          	      }

	              }
	              else if (request.getParameterValues("ids").length > 1)
	              {
	            	  try{

	            			for (int i = 0; i < request.getParameterValues("ids").length; i++)
	                  	  	{

	            				database.update("delete from trainingcoordinatehistory where idTrainingCoordinateHistory = "+request.getParameterValues("ids")[i]);

	                  	  	}
	            	     }

	            		  catch (Exception e) { e.printStackTrace();

	            	      }  finally {

	            	      }
	            	  }

			 }
			 else if(request.getParameter("task").equals("DELETE"))
			 {
				 logger.info("  in the task of delete .....");
				 ArrayList<String>  ids_ar=new ArrayList<String>();

				 if (request.getParameterValues("ids").length == 1)
	              {

					 ids_ar.add(request.getParameterValues("ids")[0]);


	              }
	              else if (request.getParameterValues("ids").length > 1)
	              {

	            	  for (int i = 0; i < request.getParameterValues("ids").length; i++)
                	  	{
	         			 ids_ar.add(request.getParameterValues("ids")[i]);

                	  	}


	            	  }

				       deleteTrainingCoordinator(database, ids_ar);


			 		}
			    	else if(request.getParameter("task").equals("listTeams"))
			    	{
			    		ArrayList<Teams> t=HC.getTeams(database);
			    		xstream.alias("Teams", Teams.class);
				        String returnText = xstream.toXML(t);
				        // //System.out.println("return text = "+returnText);
				        response.setContentType("application/xml;charset=UTF-8");
				        PrintWriter out = response.getWriter();
						out.write(returnText);
			    	}
			    	else if(request.getParameter("task").equals("AddCT"))
			    	{
						 Teams t=new Teams();
						 t.setTeamsName(request.getParameter("teamsName"));
						 HC.insertCoordinatorTeam(t, database);
						 }
						 else if(request.getParameter("task").equals("DELETETeam"))
						 {
							 if (request.getParameterValues("ids").length == 1)
				              {
				            	  try{

				          			database.update("delete from teams where Teamsid = "+request.getParameterValues("ids")[0]);

				          		}
				          		  catch (Exception e) { e.printStackTrace();

				          	      }  finally {

				          	      }

				              }
				              else if (request.getParameterValues("ids").length > 1)
				              {
				            	  try{

				            			for (int i = 0; i < request.getParameterValues("ids").length; i++)
				                  	  	{

				            				database.update("delete from teams where Teamsid = "+request.getParameterValues("ids")[i]);

				                  	  	}
				            	     }

				            		  catch (Exception e) { e.printStackTrace();

				            	      }  finally {

				            	      }
				            	  }

			 }
				 else if(request.getParameter("task").equals("listTByID"))
				 {
					 Integer id=(Integer)session.getAttribute("teamID");
					 Teams e=HC.getTeamById(id, database);
					 ArrayList<Teams>l=new ArrayList<Teams>();
					 l.add(e);
					 xstream.alias("Teams", Teams.class);
					 String returnText = xstream.toXML(l);
					 // //////System.out.println("return text = "+returnText);
					 response.setContentType("application/xml;charset=UTF-8");
					 PrintWriter out = response.getWriter();
					 out.write(returnText);
				 }
				 else if(request.getParameter("task").equals("EditTeam"))
				 {
					 Integer id=(Integer)session.getAttribute("teamID");
					 Teams t=new Teams();
					 t.setTeamsid(id);
					 t.setTeamsName(request.getParameter("names"));
					 HC.updateTeams(t, database);
				 }
				 else if(request.getParameter("task").equals("listTeamMembers"))
			 	{
				 Integer id=(Integer)session.getAttribute("teamID");
				 ArrayList<Teammembers> l=HC.getCIDs(id, database);
				 ArrayList<TeamShow> tShow=new ArrayList<TeamShow>();
				 if(l!=null)
				 {
				 Integer len=Integer.valueOf(l.size());
				 session.setAttribute("length",len);
				 //System.out.println("length= "+len);
				  for(int i=0;i<l.size();i++)
				  {
					  Teammembers t=l.get(i);
					  TeamShow cNew=new TeamShow();
					  cNew.setIdTeammembers(t.getIdTeammembers());
					  cNew.setTeamsid(t.getTeamid());
					  Trainingcoordinators tc=HC.getCoordinatorById(t.getMemberid(), database);
					  cNew.setCoordinatorName(tc.getTrainingCoordinateFirstName()+tc.getTrainingCoordinateLastName());
					  cNew.setCoordinatorApp(tc.getTrainingCoordinateAbb());
					  cNew.setCoordinatorEmail(tc.getTrainingCoordinateEmail());
					  tShow.add(cNew);

				  }
				 }
				 xstream.alias("Teammembers", TeamShow.class);
				 String returnText = xstream.toXML(tShow);
				 //System.out.println("return text = "+returnText);
				 response.setContentType("application/xml;charset=UTF-8");
				 PrintWriter out = response.getWriter();
				 out.write(returnText);
			 }
			 else if(request.getParameter("task").equals("listAll"))
				 {////////System.out.println("list All");
				 Integer id=(Integer)session.getAttribute("teamID");
				 ArrayList<Teammembers> l=HC.getCIDs(id, database);
				 ArrayList<Integer> coordinatorsIDs=new ArrayList<Integer>();
				 for(int j=0;j<l.size();j++)
				 {
					 Trainingcoordinators t=HC.getCoordinatorById(l.get(j).getMemberid(), database);
					 Integer ID=t.getIdTrainingCoordinators();
					 coordinatorsIDs.add(ID);
				 }
				 if(coordinatorsIDs.size()!=0)
				 {
				 ArrayList<Trainingcoordinators>c=HC.getC(coordinatorsIDs, database);
				 // Integer len=Integer.valueOf(l.size());
				 ArrayList<Trainingcoordinators> cShow=new ArrayList<Trainingcoordinators>();
				 for(int i=0;i<c.size();i++)
				 {
				 Trainingcoordinators cc=(Trainingcoordinators)c.get(i);
				 Trainingcoordinators cNew=new Trainingcoordinators();
				 cNew.setTrainingCoordinateFirstName(cc.getTrainingCoordinateFirstName()+cc.getTrainingCoordinateLastName());
				 cNew.setIdTrainingCoordinators(cc.getIdTrainingCoordinators());
				 cShow.add(cNew);

				 }
				 xstream.alias("Trainingcoordinators", Trainingcoordinators.class);
				 String returnText = xstream.toXML(cShow);
				 ////////System.out.println("return text = "+returnText);
				 response.setContentType("application/xml;charset=UTF-8");
				 PrintWriter out = response.getWriter();
				 out.write(returnText);
				 }
				 else
				 {////System.out.println("ana goa e else");
				 ArrayList ll=HC.getCoordinators(database);
				 Integer len=Integer.valueOf(l.size());
				 session.setAttribute("length",len);
				 ArrayList<Trainingcoordinators> cShow=new ArrayList<Trainingcoordinators>();
				 for(int i=0;i<ll.size();i++)
				 {
				 Trainingcoordinators c=(Trainingcoordinators)ll.get(i);
				 Trainingcoordinators cNew=new Trainingcoordinators();
				 cNew.setIdTrainingCoordinators(c.getIdTrainingCoordinators());
				 cNew.setTrainingCoordinateFirstName(c.getTrainingCoordinateFirstName()+c.getTrainingCoordinateLastName());
				 cNew.setTrainingCoordinateEmail(c.getTrainingCoordinateEmail());
				 cNew.setTrainingCoordinateAbb(c.getTrainingCoordinateAbb());
				 cShow.add(cNew);

				 }
				 xstream.alias("Trainingcoordinators", Trainingcoordinators.class);
				 String returnText = xstream.toXML(cShow);
				 ////////System.out.println("return text = "+returnText);
				 response.setContentType("application/xml;charset=UTF-8");
				 PrintWriter out = response.getWriter();
				 out.write(returnText);
				 }
			 }
			 else if(request.getParameter("task").equals("AddCToTeams"))
			 {////////System.out.println("ana goa el add");
				 Teams t=new Teams();
				 Boolean b=true;
				 Integer id=(Integer)session.getAttribute("teamID");
				 ////System.out.println("id= "+id);
				 ArrayList<Teammembers> tt=new ArrayList<Teammembers>();
				 t.setTeamsid(id);
				 for (int i = 0; i < request.getParameterValues("ids").length; i++)
				 {
					 b=HC.checkCoordinator(id,Integer.valueOf(request.getParameterValues("ids")[i]), database);
					 ////System.out.println("b= "+b);
					 if(b)
					 {
						// Trainingcoordinators
						// c=HC.getCoordinatorById(Integer.valueOf(request.getParameterValues("ids")[i]));
						 //Integer cDays=c.getCourseDays();
						 ////System.out.println(request.getParameterValues("ids")[i]);
						 Teammembers tc=new Teammembers();
						 //tc.setCourseTrackDays(cDays);
						 tc.setMemberid(Integer.valueOf(request.getParameterValues("ids")[i]));
						 tc.setTeamid(id);
						 tt.add(tc);

					 }
				 }
				 HC.insertCoor(tt, database);
			 }
		 else if(request.getParameter("task").equals("DELETECoo"))
		 {

			 logger.info("  in the task of deleteCoo .....");
			 if (request.getParameterValues("ids").length == 1)
             {
           	  try{

         			database.update("delete from teammembers where idTeammembers = "+request.getParameterValues("ids")[0]);

         		}
         		  catch (Exception e) { e.printStackTrace();

         	      }  finally {

         	      }

             }
             else if (request.getParameterValues("ids").length > 1)
             {
           	  try{

           			for (int i = 0; i < request.getParameterValues("ids").length; i++)
                 	  	{

           				database.update("delete from teammembers where idTeammembers = "+request.getParameterValues("ids")[i]);

                 	  	}
           	     }

           		  catch (Exception e) { e.printStackTrace();

           	      }  finally {

           	      }
           	  }

		 }
		 else if(request.getParameter("task").equals("colors"))
	        {
	        	ArrayList<Trainingcoordinators> c=HC.getCoordinators(database);
	        	ArrayList<Trainingcoordinators>cs=new ArrayList<Trainingcoordinators>();
	        	for(int i=0;i<c.size();i++)
	        	{
	        		Trainingcoordinators cc=new Trainingcoordinators();
	        		cc.setTrainingCoordinateColor(c.get(i).getTrainingCoordinateColor());
	        		cc.setIdTrainingCoordinators(c.get(i).getIdTrainingCoordinators());
	        		cs.add(cc);
	        	}
	        	xstream.alias("Trainingcoordinators", Trainingcoordinators.class);
	            String returnText = xstream.toXML(cs);
	             // //////System.out.println("return text = "+returnText);
	             response.setContentType("application/xml;charset=UTF-8");
	             PrintWriter out = response.getWriter();
	     			out.write(returnText);
	        }


    	 try{

       		database.finalize();
     	  } catch (SQLException e) {

   			e.printStackTrace();
   		} catch (Throwable e) {

   			e.printStackTrace();
   		}



    	return mapping.findForward("success");


    }

    private void deleteTrainingCoordinator( DataSourceConnection database,ArrayList ids){

    	// delte the coordinator from the database....

    	try{

    		for (int i = 0; i < ids.size()-1; i++) {

    			// first check if the coordinator has any current contract to last id in list...
    			// get all current contracts or contract coures with this coordinator..
		         int contracCourseId=0;
    		   	 int contract=0;

    		String	query = "select idContracts from contracts where Deleted = 0 and ContractStatus < 6  and Contract_idTrainingCoordinators="+ ids.get(i);
    	    logger.info(query);

    		ResultSet  rs_contract=database.retrieve(query);

         	if (rs_contract.next()){
                do {
				contract= rs_contract.getInt(1);

			database
					.update("UPDATE contracts SET Contract_idTrainingCoordinators = "
							+ ids.get(ids.size()-1)
							+ "  where idContracts = "
							+ contract + ";");
			logger.info( "UPDATE contracts SET Contract_idTrainingCoordinators = "
					+ ids.get(ids.size()-1)
					+ " where idContracts = "
					+ contract + ";" );


                }while (rs_contract.next());

         	}// if contract with the coordinators...
    	      // for each contract course and each contract change coordiantor to another coordinator.
    			// //update the contract course in the database///////////////
    			ResultSet rs = database
    					.retrieve("select idContractCourse from contractcourse where  ContractCourseStatus < 7 and TrainingCoordinators_idTrainingCoordinators = "
    							+ ids.get(i));
    			if (rs.next()){
                     do {
    				contracCourseId=rs.getInt(1);

    			database .update("UPDATE contractcourse SET TrainingCoordinators_idTrainingCoordinators = "
    							+ ids.get(ids.size()-1)
    							+ " where idContractCourse = "
    							+ contracCourseId + ";");

    			logger.info( "UPDATE contractcourse SET TrainingCoordinators_idTrainingCoordinators = "
						+ ids.get(ids.size()-1)
						+ " where idContractCourse = "
						+ contracCourseId + ";");

                     }while (rs.next());
    			}// finish the loop // finish contract coorse ,.
    			// now change to delete = 1;
    			//database.update("delete from trainingcoordinators where idTrainingCoordinators = "+ids.get(i));
    			database.update("update trainingcoordinators set TrainingCoordinatorDeleted=1 where idTrainingCoordinators="+ids.get(i));

    			logger.info("update trainingcoordinators set TrainingCoordinatorDeleted=1 where idTrainingCoordinators="+ids.get(i) );
    		}// for all coordinator deleted....

  		}// tryyyy ..
  		  catch (Exception e) {
  			  e.printStackTrace();

  	      }  finally {

  	      }

//  	  try{
//
//			for (int i = 0; i < request.getParameterValues("ids").length; i++)
//    	  	{
//
//				database.update("delete from trainingcoordinators where idTrainingCoordinators = "+request.getParameterValues("ids")[i]);
//
//    	  	}
//	     }
//
//		  catch (Exception e) { e.printStackTrace();
//
//	      }  finally {
//
//	      }


    }



    public Date parseDate(String s)
    {
    	 Calendar cal = Calendar.getInstance();
    	 cal.set(cal.YEAR,Integer.parseInt(s.substring(0,4)) );// //////System.out.println(s.substring(0,4));
    	 cal.set(cal.MONTH, Integer.parseInt(s.substring(5,7))-1);// //////System.out.println(s.substring(5,7));
    	 cal.set(cal.DATE, Integer.parseInt(s.substring(8,10)));// //////System.out.println(s.substring(8,10));
    	 // //////System.out.println(cal.getTime());
    	 return cal.getTime();
    }
}