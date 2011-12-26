package mypackage;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import abItemsShow.CShow;
import abItemsShow.RFilesShow;
import abItemsShow.RShow;
import tablespackage.Competencesaddressed;
import tablespackage.Consultingareas;
import tablespackage.Courses;
import tablespackage.Expensescategories;
import tablespackage.Resourcecourses;
import tablespackage.Resourcefiles;
import tablespackage.Resources;
import HibernatePackage.Hiber_Consultingareas;
import HibernatePackage.Hiber_Courses;
import HibernatePackage.Hiber_Resources;
import HibernatePackage.Hiber_ResourcesFiles;
//import HibernatePackage.HibernateUtil;
//import HibernatePackage.SessionGetter;

import com.mysql.jdbc.Statement;
import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

public class ListResources extends org.apache.struts.action.Action {
    
    // Global Forwards
    public static final String GLOBAL_FORWARD_start = "start"; 

    // Local Forwards

    
    public ListResources() {
    }
    
    public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
    	Hiber_ResourcesFiles HR=new Hiber_ResourcesFiles();
    	Hiber_Resources HRE=new Hiber_Resources();
    	Hiber_Consultingareas HConAreas=new Hiber_Consultingareas();
    	SimpleDateFormat s = new SimpleDateFormat("dd-MMM-yyyy", Locale.US);
        XStream xstream = new XStream();
        
      	// create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);
        
        HttpSession session=request.getSession(true);
        if(request.getParameter("task").equals("Courses"))
		{
			Hiber_Courses HC=new Hiber_Courses();
			ArrayList<Courses> l=HC.getCources(database, request);
			ArrayList<CShow>al=new ArrayList<CShow>();
			for(int i=0;i<l.size();i++)
			{
				CShow cs=new CShow();
				Courses c=l.get(i);
				cs.setCourseNameEng(c.getCourseNameEng());
				cs.setIdCourses(c.getIdCourses());
				al.add(cs);
			}
			xstream.alias("Courses", CShow.class);
		       String returnText = xstream.toXML(al);
		        // //////System.out.println("return text = "+returnText);
		        response.setContentType("application/xml;charset=UTF-8"); 
		        PrintWriter out = response.getWriter();
				

					out.write(returnText);
		}
        else if(request.getParameter("task").equals("listR"))
        {
        	ArrayList<Resources> r=HRE.getResources(database);
        	ArrayList<RShow> rShow=new ArrayList<RShow>();
        	for(int i=0;i<r.size();i++)
        	{
        		RShow rs=new RShow();
        		rs.setIdResources(r.get(i).getIdResources());
        		rs.setResourceName(r.get(i).getResourceFirstName()+" "+r.get(i).getResourceLastName());
        		rShow.add(rs);
        	}
        	xstream.alias("Resources", RShow.class);
		       String returnText = xstream.toXML(rShow);
		        // //////System.out.println("return text = "+returnText);
		        response.setContentType("application/xml;charset=UTF-8"); 
		        PrintWriter out = response.getWriter();
				

					out.write(returnText);
        }
//        else if(request.getParameter("task").equals("list"))
//        {
//               	
//        	Integer id=(Integer) request.getSession().getAttribute("resourceId");
//        	ArrayList<Resourcecourses> rs=HR.getResourceCourses(id);
//        	ArrayList<RFilesShow> al=new ArrayList<RFilesShow>();
//        	for(int i=0;i<rs.size();i++)
//        	{
//        		Integer rcId=rs.get(i).getIdResourceCourse();
//        		ArrayList<Resourcefiles>rf=HR.getResourcesFiles(rcId);
//        		for(int j=0;j<rf.size();j++)
//        		{
//        			RFilesShow rsf=new RFilesShow();
//        			rsf.setIdResourceFiles(rf.get(j).getIdResourceFiles());
//        			rsf.setResourceFileUploadDate(s.format(rf.get(j).getResourceFileUploadDate()));
//        			rsf.setResourceFileName(rf.get(j).getResourceFileName());
//        			rsf.setCourseName(rs.get(i).getResourceCourse_1().getCourseNameEng());
//        			al.add(rsf);
//        		}
//        	}
//        	
//        	 xstream.alias("Resourcefiles", RFilesShow.class);
//		     String returnText = xstream.toXML(al);
//		        // //////System.out.println("return text = "+returnText);
//		     response.setContentType("application/xml;charset=UTF-8"); 
//		     PrintWriter out = response.getWriter();
//				
//
//				out.write(returnText);
//        }

/*---------------------------------Consulting Areas-----------------------------------*/
        else if(request.getParameter("task").equals("listCAreas"))
        {
        	
        	ArrayList<Consultingareas> al=HConAreas.getConsultingAreas(database);
        	 xstream.alias("Consultingareas", Consultingareas.class);
 	        String returnText = xstream.toXML(al);
 	        // //////System.out.println("return text = "+returnText);
 	        response.setContentType("application/xml;charset=UTF-8"); 
 	        PrintWriter out = response.getWriter();
 			out.write(returnText);
        }
        else if(request.getParameter("task").equals("AddConArea"))
        {
        	Consultingareas cArea=new Consultingareas();
        	cArea.setConsultingAreasName(request.getParameter("consultingAreasName"));
        	HConAreas.insertConArea(cArea, database);
        }
        else if(request.getParameter("task").equals("DELETE"))
        {
        	 if (request.getParameterValues("ids").length == 1)
             {
           	  try{
         			
         			database.update("delete from consultingareas where idConsultingAreas = "+request.getParameterValues("ids")[0]);
         			
         		}
         		  catch (Exception e) { e.printStackTrace();
         	          
         	      }  
           	  
             }
             else if (request.getParameterValues("ids").length > 1)
             {
           	  try{
           			
           			for (int i = 0; i < request.getParameterValues("ids").length; i++) 
                 	  	{
           				
           				database.update("delete from consultingareas where idConsultingAreas = "+request.getParameterValues("ids")[i]);
               			
                 	  	}
           	     }
           			
           		  catch (Exception e) { e.printStackTrace();
           	          
           	      }  
           	  }  

        }
        else if(request.getParameter("task").equals("EditConArea"))
    	{
    			Integer id=Integer.valueOf(request.getParameter("id"));
    			Consultingareas Tc=new Consultingareas();
    			Tc.setIdConsultingAreas(id);
	    		Tc.setConsultingAreasName(request.getParameter("consultingAreasName"));
	    		HConAreas.updateCA(Tc, database);
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