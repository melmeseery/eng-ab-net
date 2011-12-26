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

//import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import abItems.Contracts;
import abItemsShow.CShow;
import abItemsShow.PriceShow;
import tablespackage.Audiencetypes;
import tablespackage.Competencesaddressed;
import tablespackage.Courses;
import tablespackage.Coursetypes;
import tablespackage.Prices;
import tablespackage.Resources;
import tablespackage.Suppliers;
import tablespackage.Trackcourses;
import tablespackage.Tracks;
import tablespackage.Trainingareas;
import HibernatePackage.Hiber_CompetenceAddressed;
import HibernatePackage.Hiber_Courses;
import HibernatePackage.Hiber_Prices;
import HibernatePackage.Hiber_Resources;
import HibernatePackage.Hiber_TA;
import HibernatePackage.Hiber_Tracks;
//import HibernatePackage.HibernateUtil;

import com.mysql.jdbc.Statement;
import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

public class ListCProperties extends org.apache.struts.action.Action {
	  static Logger logger = Logger.getLogger(ListCProperties.class);
    // Global Forwards
    public static final String GLOBAL_FORWARD_start = "start";

    // Local Forwards


    public ListCProperties() {
    }

    public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
             System.out.println("ana goa el action");
    	/* Retrieve Session Factory */
    	//ServletContext context = request.getSession().getServletContext();
    	Hiber_Courses HC=new Hiber_Courses();
    	Hiber_Tracks HT=new Hiber_Tracks();
    	HttpSession session=request.getSession(true);
    	Hiber_Prices HP=new Hiber_Prices();
    	//ArrayList cTypes=HC.getCourseType();
    	Hiber_TA HTA=new Hiber_TA();
        XStream xstream = new XStream();
    	// create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);

		logger.warn(" Inside the main listcproperties...............");
        if(request.getParameter("task").equals("Trainingareas"))
        {
        	ArrayList cTA=HTA.getCourseTA(database);
        	xstream.alias("Trainingareas", Trainingareas.class);
	        // //////System.out.println("ana ba3d el alias");
	        String returnText = xstream.toXML(cTA);
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8");
	        PrintWriter out = response.getWriter();
			out.write(returnText);
        }
        else if(request.getParameter("task").equals("AddCourse"))
        {
        	Courses c=new Courses();
        	if(request.getParameter("courseType").equals("Group"))
        		c.setIdCourseTypes(1);
        	else if(request.getParameter("courseType").equals("Individual"))
        		c.setIdCourseTypes(2);
        	else if(request.getParameter("courseType").equals("Both"))
        		c.setIdCourseTypes(3);
        	c.setIdTrainingArea(Integer.valueOf(request.getParameter("trainarea")));
        	c.setCourseCode(request.getParameter("courseCode"));
        	c.setCourseColor(request.getParameter("courseColor"));
        	c.setCourseApp(request.getParameter("courseApp"));
        	c.setCourseDays(new Integer(Integer.parseInt(request.getParameter("courseDays"))));
        	if(request.getParameter("courseCompetenceAddressed")=="")
        		c.setCourseCompetenceAddressed(null);
        	else
        		c.setCourseCompetenceAddressed(Integer.valueOf(request.getParameter("courseCompetenceAddressed")));


        	Resources r=new Resources();
        	if(request.getParameter("resource") != "")
        	{
	        	c.setCourse(Integer.parseInt(request.getParameter("resource")));
	        }
        	else
        		c.setCourse(null);
        	c.setCourseNameAr(request.getParameter("courseNameAr"));
        	c.setCourseNameEng(request.getParameter("courseNameEng"));
        	HC.insertCourse(c, database);
        	String names=request.getParameter("audienceName");
        	if(names !="")
        	{
        		Integer id=HC.getLastOne(database);
	        	String[] TPIds=names.split(",");
	        	////System.out.println("sizeeeeee= "+TPIds.length);
	        	for(int i=0;i<TPIds.length;i++)
	        	{
	        		HC.insertMMCTP(id, Integer.valueOf(TPIds[i]), database);
	        	}
        	}
        	if(request.getParameter("courseType").equals("Individual") || request.getParameter("courseType").equals("Both"))
        	{// //////System.out.println("Individual or Both");
	        	String[] imcClient=request.getParameterValues("imcClient");
	        //	String[] imcComp=request.getParameterValues("imcComp");
	        	int length=Integer.valueOf(request.getParameter("length"));
	        	////System.out.println("length= "+length);
	        	for(int i=0;i<length;i++)
	        	{
	        		Prices p=new Prices();
	        		p.setPriceImcClient(imcClient[i]);
	        		p.setPriceInternational(request.getParameterValues("international")[i]);
	        		p.setPricePublicClient(request.getParameterValues("publicsClient")[i]);
	        		p.setPriceImcCompany(request.getParameterValues("imcCompany")[i]);
	        		p.setPricePublicCompany(request.getParameterValues("publicsCompany")[i]);
	        		p.setPriceValid(true);
//	        		if(request.getParameterValues("validTo")[i].equals("3000-01-01"))
//	        			p.setPriceValidTo(null);
//	        		else{
//	        		Date d=new Date();
//	        		d=parseDate(request.getParameterValues("validTo")[i]);
//	        		p.setPriceValidTo(d);
//	        		}
	        		if(request.getParameterValues("validFrom")[i].equals("3000-01-01"))
	        			p.setPriceValidFrom(null);
	        		else{
	        		Date dd=new Date();
	        		////System.out.println(request.getParameterValues("validFrom")[i]);
	        		dd=parseDate(request.getParameterValues("validFrom")[i]);
	        		//System.out.println(request.getParameterValues("validFrom")[i]+dd);
	        		p.setPriceValidFrom(dd);
	        		}
	        		p.setCurrency(request.getParameterValues("currency")[i]);
	        		//Courses cc=new Courses();
	        		//cc.setIdCourses(HC.getLastOne());
	        		p.setCourses(HC.getLastOne(database));
	        	//	p.setPriceValid(true);
	        		Integer pid=HP.getLastOne(HC.getLastOne(database), database);
	        		HP.update(pid, database);
	        		HP.insertPrice(p,request.getParameterValues("validFrom")[i], database);
	        	}
        	}
       }
        else if(request.getParameter("task").equals("DELETESELECTIONS"))
        {

              if (request.getParameterValues("ids").length == 1)
              {
            	  try{

          			database.update("delete from courses where idCourses = "+request.getParameterValues("ids")[0]);

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

            				database.update("delete from courses where idCourses = "+request.getParameterValues("ids")[i]);

                  	  	}
            	     }

            		  catch (Exception e) { e.printStackTrace();

            	      }  finally {

            	      }
            	  }

        }
        else if(request.getParameter("task").equals("DELETEPRICE"))
        {

              if (request.getParameterValues("ids").length == 1)
              {
            	  try{

          			////System.out.println("delete from prices where idPrices = "+request.getParameterValues("ids")[0]);
            		  database.update("delete from prices where idPrices = "+request.getParameterValues("ids")[0]);

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

            				database.update("delete from prices where idPrices = "+request.getParameterValues("ids")[i]);

                  	  	}
            	     }

            		  catch (Exception e) { e.printStackTrace();

            	      }  finally {

            	      }
            	  }

        }
        else if(request.getParameter("task").equals("data"))
        {
        //	ArrayList cTA=HTA.getCourseTA();
        	Hiber_Resources HR=new Hiber_Resources();
        	Hiber_CompetenceAddressed HCA=new Hiber_CompetenceAddressed();
        	// //////System.out.println("ana geeeeeet"+session.getAttribute("courseID"));
        	ArrayList l=new ArrayList();
        	Integer id=(Integer)session.getAttribute("courseID");
        	Courses c=HC.getCourseById(id, database);
        	CShow cS=new CShow();
        	cS.setIdCourses(id);
        	cS.setCourseCalender(c.getCourseCalender());
        	cS.setCourseCode(c.getCourseCode());
        	cS.setCourseColor(c.getCourseColor());
        	cS.setCourseDays(c.getCourseDays());
        	cS.setCourseApp(c.getCourseApp());
        	cS.setCourseNameAr(c.getCourseNameAr());
        	cS.setCourseNameEng(c.getCourseNameEng());
        	cS.setCourseOutlineAr(c.getCourseOutlineAr());
        	cS.setCourseOutlineEng(c.getCourseOutlineEng());
        	if(c.getIdCourseTypes().equals(1))
        		cS.setCourseType("Group");
        	else if(c.getIdCourseTypes().equals(2))
        		cS.setCourseType("Individual");
        	else if(c.getIdCourseTypes().equals(3))
        		cS.setCourseType("Both");
        	Trainingareas T=HTA.getTAById(c.getIdTrainingArea(), database);
        	Competencesaddressed com=HCA.getCAById(c.getCourseCompetenceAddressed(), database);
        	cS.setTrainArea(T.getTrainingAreaName());
        	cS.setIdTrainingArea(T.getIdTrainingAreas());
        	if(com!=null)
        	{
        	cS.setCourseCompetenceAddressed(com.getCompetencesAddressedName());
        	cS.setIdCourseCompetenceAddressed(com.getIdCompetencesAddressed());
        	}
        	else
        	{
        		cS.setCourseCompetenceAddressed("");
    			cS.setIdCourseCompetenceAddressed(0);
        	}
        	//System.out.println("????????"+c.getCourse());
        	if(c.getCourse()!=null)
        	{//System.out.println("RID= "+c.getCourse());
	        	Resources cR=HR.getRById(c.getCourse(), database);
	    		if(cR.getIdResources() !=null)
	    		{//System.out.println("ana goa el if"+cR.getIdResources());
	    			cS.setResourceName(cR.getResourceFirstName()+" "+cR.getResourceLastName());
					cS.setIdResources(cR.getIdResources());
	    		}
	    		else
	    		{
	    			cS.setResourceName("");
	    		}
        	}
        	else
        		cS.setResourceName("");
    		l.add(cS);
             xstream.alias("Course", CShow.class);
             String returnText = xstream.toXML(l);
             // //////System.out.println("return text = "+returnText);
             response.setContentType("application/xml;charset=UTF-8");
             PrintWriter out = response.getWriter();

  			out.write(returnText);
  			// //////System.out.println("ana b3d el out");
         	return mapping.findForward("success");
        }
        else if(request.getParameter("task").equals("EditCourse"))
        {
        	logger.info("  edit course............");
        	//Session sess = null;
        	Integer id=(Integer)session.getAttribute("courseID");
        	String[] TargAud=request.getParameterValues("audienceName");
        	ArrayList<Integer> CAIds=HC.getAudID(id, database);
    		ArrayList<Audiencetypes> al=new ArrayList<Audiencetypes>();
    		for(int i=0;i<CAIds.size();i++)
    		{
    			Audiencetypes at=HC.getAud(CAIds.get(i), database);
    			al.add(at);
    		}
    		if(al !=null)
        	{
	        	for(int i=0;i<al.size();i++)
	        	{
	        		HC.deleteMMCAud(al.get(i).getIdAudienceTypes(),id, database);
	        	}
        	}
        	if(Integer.parseInt(request.getParameter("len")) !=0)
        	{
	        	for(int j=0;j<TargAud.length;j++)
	        	{
	        		HC.insertMMCTP(id, Integer.valueOf(TargAud[j]), database);
	        	}
        	}
        	      Courses c=new Courses();
        	      c.setIdCourses(id);
        	      c.setCourseCode(request.getParameter("courseCode"));
        	      c.setCourseColor(request.getParameter("courseColor"));
        	      c.setCourseDays(new Integer(Integer.parseInt(request.getParameter("courseDays"))));
              	  c.setCourseNameAr(request.getParameter("courseNameAr"));
              	  c.setCourseNameEng(request.getParameter("courseNameEng"));
               	  Competencesaddressed com=new Competencesaddressed();
               	  c.setCourseApp(request.getParameter("courseApp"));
               	  //System.out.println("resource name= "+request.getParameter("resourceName"));
               	  if(request.getParameter("resourceName").equals(""))
               		  c.setCourse(null);
               	  else
               	  {
               		  c.setCourse(Integer.parseInt(request.getParameter("idResources")));
               	  }
               	  if(request.getParameter("courseCompetenceAddressed")=="")
               		  c.setCourseCompetenceAddressed(null);
               	  else{
               		  c.setCourseCompetenceAddressed(Integer.valueOf(request.getParameter("courseCompetenceAddressed")));
               	  }
            	 Coursetypes ct=new Coursetypes();
		    	  if(request.getParameter("courseType").equals("Group"))
		        	{
		    		  c.setIdCourseTypes(1);
		        	}
		        	else if(request.getParameter("courseType").equals("Individual"))
		        	{
		        		c.setIdCourseTypes(2);
		        	}
		        	else if(request.getParameter("courseType").equals("Both"))
		        	{
		        		c.setIdCourseTypes(3);
		        	}

		    	  c.setIdTrainingArea(Integer.valueOf(request.getParameter("trainarea")));
        	      HC.updateAllCourse(c, database);

        }//edit course
        else if(request.getParameter("task").equals("CREATETA"))
        {// //////System.out.println("ana goa add ta");
        	Trainingareas t=new Trainingareas();
        	t.setTrainingAreaCode(request.getParameter("trainingAreaCode"));
        	t.setTrainingAreaName(request.getParameter("trainingAreaName"));
        	HTA.insertTA(t, database);
        }
        else if(request.getParameter("task").equals("AddToTrack"))
        {
        	// //////System.out.println("track id= "+request.getParameter("idTracks"));
        	Tracks t=new Tracks();
        	Boolean b=true;
        	t.setIdTracks(Integer.valueOf(request.getParameter("idTracks")));
        	Integer id=t.getIdTracks();// //////System.out.println("track ID= "+id);
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
	        		tc.setTrackCourses(Integer.valueOf(request.getParameterValues("ids")[i]));
	        		HC.insertRelationCourses(tc, database);
     			}
        	}
        }// add to track
        else if(request.getParameter("task").equals("AddToTrackN"))
        {
        	Tracks t=new Tracks();
    		t.setTrackCode(request.getParameter("trackCode"));
    		t.setTrackName(request.getParameter("trackName"));
    		HT.insertTrack(t, database);
    		Integer id=HT.getLastOne(database);
    		// //////System.out.println("ana b3d el insert");
    		for (int i = 0; i < request.getParameterValues("ids").length; i++)
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
        else if(request.getParameter("task").equals("listP"))
        {
        	Integer id=(Integer)session.getAttribute("courseID");
        	ArrayList<Prices> p=HP.getPricesById(id, database);
        	//System.out.println("size= "+p.size());
        	ArrayList<PriceShow> al=new ArrayList<PriceShow>();
        	for(int i=0;i<p.size();i++)
        	{
        		Prices pp=p.get(i);
        		PriceShow pShow=new PriceShow();
        		pShow.setIdPrices(pp.getIdPrices());
        		pShow.setPriceImcClient(pp.getPriceImcClient());
        		pShow.setPriceImcCompany(pp.getPriceImcCompany());
        		pShow.setPriceInternational(pp.getPriceInternational());
        		pShow.setPricePublicClient(pp.getPricePublicClient());
        		pShow.setPricePublicCompany(pp.getPricePublicCompany());
        		pShow.setPriceValid(pp.getPriceValid());
        		if(pp.getPriceValidFrom() !=null)
        		{
        		SimpleDateFormat s1=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
       		    String d1=s1.format(pp.getPriceValidFrom());
       		    pShow.setPriceValidFrom(d1);
        		}
        		else
        			pShow.setPriceValidFrom(null);
        		pShow.setCurrency(pp.getCurrency());
        	//	SimpleDateFormat s1=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
       		    //String d=s1.format(pp.getPriceValidFrom());
       		   // pShow.setPriceValidTo(d);
        	//	pShow.setPriceValidTo(pp.getPriceValidTo());
        	//	pShow.setPriceValid(pp.getPriceValid());
        		al.add(pShow);
        	}
        	xstream.alias("Prices", PriceShow.class);
	        // //////System.out.println("ana ba3d el alias");
	        String returnText = xstream.toXML(al);
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8");
	        PrintWriter out = response.getWriter();
			out.write(returnText);
        }
        else if(request.getParameter("task").equals("AddPrice"))
        {
        	Prices p=new Prices();
        	Integer id=(Integer)session.getAttribute("courseID");
        	p.setPriceImcClient(request.getParameter("priceImcClient"));
        	p.setPriceImcCompany(request.getParameter("priceImcCompany"));
        	p.setPriceInternational(request.getParameter("priceInternational"));
        	p.setPricePublicClient(request.getParameter("pricePublicClient"));
        	p.setPricePublicCompany(request.getParameter("pricePublicCompany"));
        	p.setPriceValid(true);
        	String date=null;
        //	// //////System.out.println("valid from= "+request.getParameter("priveValidFrom")+" valid to "+request.getParameter("priceValidTo"));
        	if(!request.getParameter("priceValidFrom").equals("3000-01-01"))
        		date=request.getParameter("priceValidFrom");

        	p.setCurrency(request.getParameter("currency"));
        //	Courses c=new Courses();
        //	c.setIdCourses(id);
        	p.setCourses(id);
        	Integer pid=HP.getLastOne(id, database);
    		HP.update(pid, database);
        	HP.insertPrice(p,date, database);
        }
        else if(request.getParameter("task").equals("EditPrice"))
        {
        		Integer id=Integer.valueOf(request.getParameter("id"));
        		Integer Cid=(Integer)session.getAttribute("courseID");
            	Prices p=new Prices();
    		    p.setIdPrices(id);
    		    p.setCourses(Cid);
	    	    p.setPriceImcClient(request.getParameter("priceImcClient"));
	        	p.setPriceImcCompany(request.getParameter("priceImcCompany"));
	        	p.setPriceInternational(request.getParameter("priceInternational"));
	        	p.setPricePublicClient(request.getParameter("pricePublicClient"));
	        	p.setPricePublicCompany(request.getParameter("pricePublicCompany"));
	        	String date=null;
	        	if(!request.getParameter("priceValidFrom").equals("3000-01-01"))
	        		date=request.getParameter("priceValidFrom");
	        	p.setCurrency(request.getParameter("currency"));
	    	    HP.updatePrice(p,date, database);

        }
        else if(request.getParameter("task").equals("checkColor"))
        {
        	String color=request.getParameter("courseColor");
        	boolean b=HC.checkCourseColor(color, database);
        }
        else if(request.getParameter("task").equals("colors"))
        {
        	ArrayList<Courses> c=HC.getCources(database, request);
        	ArrayList<CShow>cs=new ArrayList<CShow>();
        	for(int i=0;i<c.size();i++)
        	{
        		CShow cc=new CShow();
        		cc.setCourseColor(c.get(i).getCourseColor());
        		cc.setIdCourses(c.get(i).getIdCourses());
        		cs.add(cc);
        	}
        	xstream.alias("Course", CShow.class);
            String returnText = xstream.toXML(cs);
             // //////System.out.println("return text = "+returnText);
             response.setContentType("application/xml;charset=UTF-8");
             PrintWriter out = response.getWriter();
     			out.write(returnText);
        }
        else if(request.getParameter("task").equals("CompetenceAdd"))
        {
        	Hiber_CompetenceAddressed HCA=new Hiber_CompetenceAddressed();
        	ArrayList<Competencesaddressed> ca=HCA.getCompetencesaddressed(database);
        	xstream.alias("Competencesaddressed", Competencesaddressed.class);
            String returnText = xstream.toXML(ca);
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
    public Date parseDate(String s)
    {
    	 Calendar cal = Calendar.getInstance();
    	 cal.set(cal.YEAR,Integer.parseInt(s.substring(0,4)) );//System.out.println(s.substring(0,4));
    	 cal.set(cal.MONTH, Integer.parseInt(s.substring(5,7))-1);//System.out.println(s.substring(5,7));
    	 cal.set(cal.DATE, Integer.parseInt(s.substring(8,10)));//System.out.println(s.substring(8,10));
    	 //System.out.println(cal.getTime());
    	 return cal.getTime();
    }
}