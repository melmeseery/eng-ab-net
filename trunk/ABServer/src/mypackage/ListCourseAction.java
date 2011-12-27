package mypackage;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import tablespackage.Audiencetypes;
import tablespackage.Competencesaddressed;
import tablespackage.Courses;
import tablespackage.Tracks;
import HibernatePackage.Hiber_Audiencetypes;
import HibernatePackage.Hiber_CompetenceAddressed;
import HibernatePackage.Hiber_Courses;
import HibernatePackage.Hiber_Tracks;
import abItemsShow.CShow;

import com.mysql.jdbc.Statement;
import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;
public class ListCourseAction extends org.apache.struts.action.Action {
	 static public int  COLUMN_NAMES_idCourses = 1  ;
	 static public int  COLUMN_NAMES_CourseCode = 2  ;
	 static public int  COLUMN_NAMES_CourseNameEng = 3  ;
	 static public int  COLUMN_NAMES_CourseNameAr = 4  ;
	 static public int  COLUMN_NAMES_CourseOutlineEng = 5  ;
	 static public int  COLUMN_NAMES_CourseOutlineAr = 6  ;
	 static public int  COLUMN_NAMES_CourseDays = 7  ;
	 static public int  COLUMN_NAMES_CourseCompetenceAddressed = 8  ;
	 static public int  COLUMN_NAMES_CourseColor = 9  ;
	 static public int  COLUMN_NAMES_Course_idTrainingAreas = 10  ;
	 static public int  COLUMN_NAMES_Course_idCourseTypes = 11  ;
	 static public int  COLUMN_NAMES_CourseDescription = 12  ;
	 static public int  COLUMN_NAMES_CourseCalender = 13  ;
	 static public int  COLUMN_NAMES_Course_idResources = 14  ;


	  static Logger logger = Logger.getLogger( ListCourseAction.class);
    // Global Forwards
    public static final String GLOBAL_FORWARD_start = "start";

    // Local Forwards


    public ListCourseAction() {
    }

    public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
        // TODO: Write method body
    	Hiber_Courses HC=new Hiber_Courses();
    	Hiber_CompetenceAddressed HCA=new Hiber_CompetenceAddressed();
    	Hiber_Tracks HT=new Hiber_Tracks();
    	Hiber_Audiencetypes HA=new Hiber_Audiencetypes();

    	// create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);


     //   HttpSession session=request.getSession(true);
/*-----------------------------------list Courses------------------------------------------------*/
    	if(request.getParameter("task").equals("list"))
    	{
    		XStream xstream = new XStream();

//			String q = "";
//    		int counter=0;
//			for (int s = 0; s < 2; s++) {
//				String[] filterType = request.getParameterValues("filter[" + s
//						+ "][data][type]");
//				// //////System.out.println(filterType+ " "+s+" "+filterType[0]);
//				if (filterType != null) {
//					if(filterType[0].equals("string")) {
//						String[] filter = request.getParameterValues("filter[" + s
//								+ "][field]");
//
//						for (int i = 0; i < filter.length; i++) {
//
//							String[] values = request.getParameterValues("filter["
//									+ s + "][data][value]");
//							// ////System.out.println(values.length);
//							if (filter[i].equals("trainArea")) {
//								q=values[0];
//    							counter=1;
//    							////System.out.println("counter ="+counter);
//
//							} else if (filter[i].equals("courseCompetenceAddressed")) {
//								q=values[0];
//    							counter=2;
//    							////System.out.println("counter ="+counter);
//
//							}
//
//						}
//					}
//				}
//			}
//			//if (!q.equals(""))
//			//	q = " where" + q;
//			String s="";
//    		if(!q.equals(""))
//    		{
//    			if(counter==1)
//    			{////System.out.println("counter=1");
//    				Integer id=HC.getTAID(q);
//    				s+="where Course_idTrainingAreas="+id;
//    				counter=0;
//    			}
//    			else if(counter==2)
//    			{
//    				Integer id=HC.getCAID(q);
//    				////System.out.println("id= "+id);
//    				s+="where CourseCompetenceAddressed="+id;
//    				counter=0;
//    			}
//    		}

//    		ArrayList l=HC.getCources(s);
    		ArrayList<CShow> al=new ArrayList<CShow>();
        	ArrayList<Courses> cShow=HC.getCources(database,request);
        	for(int i=0;i<cShow.size();i++)
        	{
        		CShow c=new CShow();
        		Courses co=cShow.get(i);
        		c.setIdCourses(co.getIdCourses());
        		c.setCourseApp(co.getCourseApp());
        		c.setCourseCode(co.getCourseCode());
        		c.setCourseColor(co.getCourseColor());
        		c.setCourseDays(co.getCourseDays());
        		c.setCourseDescription(co.getCourseDescription());
        		c.setCourseNameAr(co.getCourseNameAr());
        		c.setCourseNameEng(co.getCourseNameEng());
        		c.setCourseOutlineAr(co.getCourseOutlineAr());
        		c.setCourseOutlineEng(co.getCourseOutlineEng());
        		c.setIdCourseCompetenceAddressed(co.getCourseCompetenceAddressed());
        		c.setIdTrainingArea(co.getIdTrainingArea());
        		String ta=HC.getCourseTA(co.getIdTrainingArea(), database);
        		c.setTrainArea(ta);
        		String ca=HC.getCourseCA(co.getCourseCompetenceAddressed(), database);
        		c.setCourseCompetenceAddressed(ca);
        		String ct=HC.getCourseCT(co.getIdCourseTypes(), database);
        		c.setCourseType(ct);
        		al.add(c);
        	}
        	logger.warn("  listing the courses...............");
            xstream.alias("Course", CShow.class);
            String returnText = xstream.toXML(al);
            response.setContentType("application/xml;charset=UTF-8");
            PrintWriter out = response.getWriter();


    			out.write(returnText);
    }
/*---------------------------------list Tracks---------------------------------------------------*/
    	else if(request.getParameter("task").equals("Tracks"))
        {
    		XStream xstream = new XStream();
        	ArrayList<Tracks>t=HT.getTracks(database);
        	xstream.alias("Tracks", Tracks.class);
	        // //////System.out.println("ana ba3d el alias");
	        String returnText = xstream.toXML(t);
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8");
	        PrintWriter out = response.getWriter();
			out.write(returnText);
        }
/*-------------------------------Login-------------------------------------------------*/
//    	else if(request.getParameter("task").equals("login"))
//    	{
//    		Users u=new Users();
//    		 u.setUserUsername(request.getParameter("userUsername"));
//    		 u.setUserPassword(request.getParameter("userPassword"));
//    		// HU.insert();
//    		String pass = HU.checkUser(u.getUserUsername());
//    		////System.out.println(request.getParameter("userUsername"));
//    		////System.out.println("pass= "+pass);
//    		////System.out.println("password= "+u.getUserPassword());
//    		if (!pass.equals("")) {
//    			try {
//    				if (pass.equals(u.getUserPassword())) {
//    					////System.out.println("valid data ");
//    					HttpSession sess=request.getSession(true);
//    					sess.setAttribute("LogIn", u.getUserUsername());
//
//    					return mapping.findForward("success");
//    				} else {
//    					System.out.print("Invalid password!!!");
//    			//		ActionErrors errors = new ActionErrors();
//    			//		errors.add("InvalidPassword", new ActionError(
//    			//				"InvalidPassword"));
//    			//		saveErrors(request, errors);
//    			//		((mypackage.FormData) form).setPassword("");
//    					response.getWriter().print("{'success':false,'message':'failure'}");
//    					return null;
//    				}
//    			} catch (Exception ex) {
//
//    				ex.printStackTrace();
//
//    			}
//
//    		}
//    		else
//    		{
//    			response.getWriter().print("{'success':false,'message':'failure'}");
//				return null;
//    		}
//
//    	}
/*---------------------------------------list audiences--------------------------------*/
    	else if(request.getParameter("task").equals("listAud"))
    	{
    		ArrayList<Audiencetypes> a=HA.getAudience(database);
    		XStream xstream = new XStream();
    		xstream.alias("Audiencetypes", Audiencetypes.class);
    	    String returnText = xstream.toXML(a);
    	    response.setContentType("application/xml;charset=UTF-8");
    	    PrintWriter out = response.getWriter();
    	    out.write(returnText);

    	}
/*------------------------------------add audio--------------------------------------*/
    	else if(request.getParameter("task").equals("AddAudio"))
    	{
    		Audiencetypes a=new Audiencetypes();
    		a.setAudienceName(request.getParameter("audienceName"));
    		HA.insertAudio(a, database);
    	}
/*------------------------------------edit audio-------------------------------------*/
    	else if(request.getParameter("task").equals("EditAudio"))
    	{
    			Integer id=Integer.valueOf(request.getParameter("id"));
    		  	Audiencetypes Tc=new Audiencetypes();
    		  	Tc.setIdAudienceTypes(id);
	    		Tc.setAudienceName(request.getParameter("audienceName"));
	    		HA.updateAT(Tc, database);
    	}
/*----------------------------------delete audio--------------------------------------*/
    	else if(request.getParameter("task").equals("DELETEAUDIO"))
        {
    		 if (request.getParameterValues("ids").length == 1)
             {
           	  try{

         			database.update("delete from audiencetypes where idAudienceTypes = "+request.getParameterValues("ids")[0]);

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

           				database.update("delete from audiencetypes where idAudienceTypes = "+request.getParameterValues("ids")[i]);

                 	  	}
           	     }

           		  catch (Exception e) { e.printStackTrace();

           	      }  finally {

           	      }
           	  }

        }
    	else if(request.getParameter("task").equals("listselectedAud"))
    	{
    		HttpSession session=request.getSession(true);
    		Integer id=(Integer)session.getAttribute("courseID");
    		ArrayList<Integer> CAIds=HC.getAudID(id, database);
    		ArrayList<Audiencetypes> a=new ArrayList<Audiencetypes>();
    		for(int i=0;i<CAIds.size();i++)
    		{
    			Audiencetypes at=HC.getAud(CAIds.get(i), database);
    			a.add(at);
    		}
    		//System.out.println("size of a="+a.size());
    		XStream xstream = new XStream();
    		xstream.alias("Audiencetypes", Audiencetypes.class);
    	    String returnText = xstream.toXML(a);
    	    response.setContentType("application/xml;charset=UTF-8");
    	    PrintWriter out = response.getWriter();
    	    out.write(returnText);
    	}
/*---------------------------------------list Competences--------------------------------*/
    	else if(request.getParameter("task").equals("listCA"))
    	{
    		ArrayList<Competencesaddressed> a=HCA.getCompetencesaddressed(database);
    		XStream xstream = new XStream();
    		xstream.alias("Competencesaddressed", Competencesaddressed.class);
    	    String returnText = xstream.toXML(a);
    	    response.setContentType("application/xml;charset=UTF-8");
    	    PrintWriter out = response.getWriter();
    	    out.write(returnText);

    	}
/*------------------------------------add audio--------------------------------------*/
    	else if(request.getParameter("task").equals("AddCA"))
    	{
    		Competencesaddressed a=new Competencesaddressed();
    		a.setCompetencesAddressedName(request.getParameter("competencesAddressedName"));
    		HCA.insertCompetencesaddressed(a, database);
    	}
/*------------------------------------edit audio-------------------------------------*/
    	else if(request.getParameter("task").equals("EditCA"))
    	{
    			Integer id=Integer.valueOf(request.getParameter("id"));
    		    Competencesaddressed Tc=new Competencesaddressed();
    		    Tc.setIdCompetencesAddressed(id);
	    		Tc.setCompetencesAddressedName(request.getParameter("competencesAddressedName"));
	    		HCA.updateCA(Tc, database);
    	}
/*----------------------------------delete audio--------------------------------------*/
    	else if(request.getParameter("task").equals("DELETECA"))
        {
    		 if (request.getParameterValues("ids").length == 1)
             {
           	  try{

         			database.update("delete from competencesaddressed where idCompetencesAddressed = "+request.getParameterValues("ids")[0]);

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

           				database.update("delete from competencesaddressed where idCompetencesAddressed = "+request.getParameterValues("ids")[i]);

                 	  	}
           	     }

           		  catch (Exception e) { e.printStackTrace();

           	      }  finally {

           	      }
           	  }
        }
    	else if(request.getParameter("task").equals("listTA"))
    	{
    		HttpSession session=request.getSession(true);
//    		Integer id=(Integer)session.getAttribute("courseID");
//    		Integer CAId=HC.getAudID(id);
//    		ArrayList<Audiencetypes> a=HC.getAud(CAId);
//    		ArrayList<Integer> ids=new ArrayList<Integer>();
//    		//System.out.println("size= "+a.size());
//    		if(a.size()!=0)
//    		{
//
//	    		for(int i=0;i<a.size();i++)
//	    		{
//	    			ids.add(a.get(i).getIdAudienceTypes());
//	    		}
//	    		////System.out.println("size== "+ids.size());
//	    		aud=HC.getAudiences(ids);
//    		}
//    		else
//    		{
//    			aud=HA.getAudience();
//    		}
//
    		Integer id=(Integer)session.getAttribute("courseID");
    		ArrayList<Integer> CAIds=HC.getAudID(id, database);
    		ArrayList<Audiencetypes> aud=new ArrayList<Audiencetypes>();
    		if(CAIds.size()!=0)
    			aud=HC.getAudiences(CAIds, database);
    		else
    			aud=HA.getAudience(database);
    		XStream xstream = new XStream();
    		////System.out.println("size==="+aud.size());
    		xstream.alias("Audiencetypes", Audiencetypes.class);
    	    String returnText = xstream.toXML(aud);
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

}