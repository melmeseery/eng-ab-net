package mypackage;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import abItemsShow.CShow;
import abItemsShow.TrackCourseShow;
import tablespackage.Courses;
import tablespackage.Coursetypes;
import tablespackage.Datashows;
import tablespackage.Expensescategories;
import tablespackage.Trackcourses;
import tablespackage.Tracks;
import tablespackage.Trainingareas;
import tablespackage.Venues;
import HibernatePackage.Hiber_Courses;
import HibernatePackage.Hiber_Tracks;
//import HibernatePackage.HibernateUtil;

import com.mysql.jdbc.Statement;
import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

public class ListTracks extends org.apache.struts.action.Action {
    
    // Global Forwards
    public static final String GLOBAL_FORWARD_start = "start"; 

    // Local Forwards

    
    public ListTracks() {
    }
    
    public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
    	Hiber_Tracks HT=new Hiber_Tracks();
        XStream xstream = new XStream();
        Hiber_Courses HC=new Hiber_Courses();
        HttpSession session=request.getSession(true);
        
      	// create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);
        
    	if(request.getParameter("task").equals("list"))
    	{
	    	ArrayList tracks=HT.getTracks(database);
	        xstream.alias("Tracks", Tracks.class);
	        // //////System.out.println("ana ba3d el alias");
	        String returnText = xstream.toXML(tracks);
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
    	}
    	else if(request.getParameter("task").equals("AddTrack"))
    	{
    		Tracks t=new Tracks();
    		t.setTrackCode(request.getParameter("trackCode"));
    		t.setTrackName(request.getParameter("trackName"));
    		HT.insertTrack(t, database);
    	}
    	else if(request.getParameter("task").equals("listT"))
    	{
    		//ArrayList<Tracks>al=new ArrayList<Tracks>();
    		Integer id=(Integer)session.getAttribute("trackID");// //////System.out.println("listT "+id);
    		Tracks e=HT.getTrackById(id, database);
    		ArrayList<Tracks>l=new ArrayList<Tracks>();
    		l.add(e);
    		xstream.alias("Tracks", Tracks.class);
	        String returnText = xstream.toXML(l);
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
    	}
    	else if(request.getParameter("task").equals("EditTrack"))
    	{
    			Integer id=(Integer)session.getAttribute("trackID");
    			Tracks Tc=new Tracks();
    			Tc.setIdTracks(id);
	    		Tc.setTrackCode(request.getParameter("trackCode"));
	    		Tc.setTrackName(request.getParameter("trackName"));
	    		Tc.setTrackDuration(Integer.valueOf(request.getParameter("trackDuration")));
	    		HT.updateTrack(Tc, database);
       	       
    		
    	}
    	 else if(request.getParameter("task").equals("DELETESELECTIONS"))
         {

        	 if (request.getParameterValues("ids").length == 1)
             {
           	  try{
         			
           		database.update("delete from tracks where idTracks = "+request.getParameterValues("ids")[0]);
         			
         		}
         		  catch (Exception e) { 
         	          
         	      }  
           	  
             }
             else if (request.getParameterValues("ids").length > 1)
             {
           	  try{
           			
           			for (int i = 0; i < request.getParameterValues("ids").length; i++) 
                 	  	{
           				
           				database.update("delete from tracks where idTracks = "+request.getParameterValues("ids")[i]);
               			
                 	  	}
           	     }
           			
           		  catch (Exception e) { 
           	          
           	      }  
           	  }  

         }
    	 else if(request.getParameter("task").equals("listC"))
     	{
     		Integer id=(Integer)session.getAttribute("trackID");
     		ArrayList<TrackCourseShow> ll=new ArrayList<TrackCourseShow>();
         	ArrayList<TrackCourseShow> l=HC.getCIDs(id, database);
         	////System.out.println("size="+l.size());
         	if(l!=null)
         	{
         		for(int i=0;i<l.size();i++)
             	{
             		Integer cid=l.get(i).getIdCourses();
             		Courses c=HC.getCourseById(cid, database);
             		TrackCourseShow t=new TrackCourseShow();
             		t.setCourseNameEng(c.getCourseNameEng());
             		t.setCourseTrackDays(l.get(i).getCourseTrackDays());
             		t.setTableId(l.get(i).getTableId());
             		t.setIdCourses(cid);
             		ll.add(t);
             	}
             	
	     		Integer len=Integer.valueOf(ll.size());
	     		session.setAttribute("length",len);
	         	
         	}
             xstream.alias("Trackcourses", TrackCourseShow.class);
             String returnText = xstream.toXML(ll);
             // //////System.out.println("return text = "+returnText);
             response.setContentType("application/xml;charset=UTF-8"); 
             PrintWriter out = response.getWriter();
     		 out.write(returnText);
     	}
    	 else if(request.getParameter("task").equals("listAll"))
      	{////////System.out.println("list All");
    		Integer id=(Integer)session.getAttribute("trackID");
    	    ArrayList<TrackCourseShow> l=HC.getCIDs(id, database); 
    	    ArrayList<Integer> coursesIDs=new ArrayList<Integer>();
    	    for(int j=0;j<l.size();j++)
    	    {
    	    	Integer ID=l.get(j).getIdCourses();
    	    	coursesIDs.add(ID);
    	    }
    	    if(coursesIDs.size()!=0)
    	    {
	    	    ArrayList<Courses>c=HC.getC(coursesIDs, database);
	      	//	Integer len=Integer.valueOf(l.size());
	      		ArrayList<CShow> cShow=new ArrayList<CShow>();
	          	for(int i=0;i<c.size();i++)
	          	{
	          		Courses cc=(Courses)c.get(i);
	          		CShow cNew=new CShow();
	          		cNew.setIdCourses(cc.getIdCourses());
	          		cNew.setCourseDays(cc.getCourseDays());
	          		cNew.setCourseNameEng(cc.getCourseNameEng());
	          		cShow.add(cNew);
	          		
	          	}
	              xstream.alias("Course", CShow.class);
	              String returnText = xstream.toXML(cShow);
	              ////////System.out.println("return text = "+returnText);
	              response.setContentType("application/xml;charset=UTF-8"); 
	              PrintWriter out = response.getWriter();
	      		 out.write(returnText);
    	    }
    	    else
    	    {////////System.out.println("ana goa e else");
    	    	ArrayList ll=HC.getCources(database, request);
          		Integer len=Integer.valueOf(l.size());
          		session.setAttribute("length",len);
              	ArrayList<CShow> cShow=new ArrayList<CShow>();
              	for(int i=0;i<ll.size();i++)
              	{
              		Courses c=(Courses)ll.get(i);
              		CShow cNew=new CShow();
              		cNew.setIdCourses(c.getIdCourses());
              		cNew.setCourseDays(c.getCourseDays());
              		cNew.setCourseNameEng(c.getCourseNameEng());
              		cShow.add(cNew);
              		
              	}
                  xstream.alias("Course", CShow.class);
                  String returnText = xstream.toXML(cShow);
                  ////////System.out.println("return text = "+returnText);
                  response.setContentType("application/xml;charset=UTF-8"); 
                  PrintWriter out = response.getWriter();
          		 out.write(returnText);
    	    }
      	}
    	 else if (request.getParameter("task").equals("EditCourse"))
    	 {
    		 Integer id=Integer.valueOf(request.getParameter("id"));
         	 Trackcourses c=new Trackcourses();
         	 c.setTableId(id);
         	 c.setCourseTrackDays(new Integer(Integer.parseInt(request.getParameter("courseDays"))));
             HC.updateTrackCourse(c, database);  	  

    	 }
    	 else if(request.getParameter("task").equals("AddCoursesToTrack"))
    	 {////////System.out.println("ana goa el add");
    		Tracks t=new Tracks();
         	Boolean b=true;
         	Integer id=(Integer)session.getAttribute("trackID");
         	t.setIdTracks(id);
         //	Integer id=t.getIdTracks();
         	//System.out.println("track ID= "+id);
         	for (int i = 0; i < request.getParameterValues("ids").length; i++)
         	{// //////System.out.println("course id= "+Integer.valueOf(request.getParameterValues("ids")[i]));
         		b=HC.checkCourse(Integer.valueOf(request.getParameterValues("ids")[i]),id, database);
         		// //////System.out.println("b= "+b);
      			if(b)
      			{
 	        		Courses c=HC.getCourseById(Integer.valueOf(request.getParameterValues("ids")[i]), database);
 	        		Integer cDays=c.getCourseDays();
 	        		Trackcourses tc=new Trackcourses();
 	        		tc.setCourseTrackDays(cDays);
 	        		tc.setTrackCoures(id);
 	        		tc.setTrackCourses(c.getIdCourses());
 	        		HC.insertRelationCourses(tc, database);
      			}
         	}
    	 }
    	 else if(request.getParameter("task").equals("DELETE"))
         {
    		 if (request.getParameterValues("ids").length == 1)
             {
           	  try{
         			
           		database.update("delete from trackcourses where tableId = "+request.getParameterValues("ids")[0]);
         			
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
           				
           				database.update("delete from trackcourses where tableId = "+request.getParameterValues("ids")[i]);
               			
                 	  	}
           	     }
           			
           		  catch (Exception e) { e.printStackTrace();
           	          
           	      }  finally { 
           	           
           	      }
           	  }  
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