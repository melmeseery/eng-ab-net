package HibernatePackage;
import abItemsShow.TrackCourseShow;
import tablespackage.Audiencetypes;
import tablespackage.Courses;
import tablespackage.Coursetypes;
import tablespackage.Trackcourses;
import tablespackage.Trainingareas;

import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

import javax.servlet.http.HttpServletRequest;

import mypackage.ListCourseAction;

import org.apache.log4j.Logger;

public class Hiber_Courses
{
	  static Logger logger = Logger.getLogger( Hiber_Courses.class);
	public Hiber_Courses() {
		// TODO Auto-generated constructor stub
	}



/*--------------------------------------------------------------------------------------------------*/
	public ArrayList<Courses> getCources(DataSourceConnection database, HttpServletRequest request) throws SQLException
	{

		String q = "";
		for (int s = 0; s < 3; s++) {
			String[] filterType = request.getParameterValues("filter[" + s
					+ "][data][type]");
			// ////  //  //  ////System.out.println(filterType+ " "+s+" "+filterType[0]);
			if (filterType != null) {

					String[] filter = request.getParameterValues("filter[" + s
							+ "][field]");

					for (int i = 0; i < filter.length; i++) {

						String[] values = request.getParameterValues("filter["
								+ s + "][data][value]");

						if (filter[i].equals("courseNameEng")) {
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

							q = q + " (courseNameEng like '" + upperCase+remain
									+ "%' or courseNameEng like '" + lowerCase+remain
									+ "%')";
						}else if (filter[i].equals("trainArea")) {
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

							String taQ = "Select idTrainingAreas from trainingareas where TrainingAreaName like '" + upperCase+remain
									+ "%' or TrainingAreaName like '" + lowerCase+remain
									+ "%'";

							ResultSet taRS = database.retrieve(taQ);
							int j = 0;
							while(taRS.next()){
								if (j > 0)
									q = q + " or";
								else
									q = q+"(";
							q = q + " Course_idTrainingAreas = " + taRS.getString(1);
							j++;
							}
							if(j>0)
								q = q+")";
						}

					}
				//}
			}
		}
		if (!q.equals(""))
			q = " where" + q;

		ArrayList<Courses> c=new ArrayList<Courses>();
		try{

			ResultSet l =database.retrieve("select * from courses"+q);
			while(l.next())
			 {
				Courses courses=new Courses();
				courses.setIdCourses(l.getInt(1));
				courses.setCourseCode(l.getString(2));
				courses.setCourseNameEng(l.getString(3));
				courses.setCourseNameAr(l.getString(4));
				courses.setCourseOutlineEng(l.getString(5));
				courses.setCourseOutlineAr(l.getString(6));
				courses.setCourseDays(l.getInt(7));
				courses.setCourseCompetenceAddressed(l.getInt(8));
				courses.setCourseColor(l.getString(9));
				courses.setIdTrainingArea(l.getInt(10));
				courses.setIdCourseTypes(l.getInt(11));
				courses.setCourseDescription(l.getString(12));
				courses.setCourse(l.getInt(14));
				courses.setCourseApp(l.getString(15));
				c.add(courses);
			 }
			 l.close();

		}catch(Exception e){
		}finally{
			}
		return c;
	}
/*--------------------------------------------------------------------------------------------------*/
	public String getCourseCT(Integer id,DataSourceConnection database)
	{
		String name="";
		try{

			ResultSet l =database.retrieve("select CourseTypeName from coursetypes where idCourseTypes= "+id);
		 	while(l.next())
		 	{
		 		name=l.getString(1);

		 	}

		 l.close();


		}catch(Exception e){//e.printStackTrace();

		}finally{
			}
		return name;
	}

/*--------------------------------------------------------------------------------------------------*/

	public String getCourseTA(Integer id,DataSourceConnection database)
	{
		String name="";
		try{

			ResultSet l =database.retrieve("select TrainingAreaName from trainingareas where idTrainingAreas= "+id);
		 	while(l.next())
		 	{
		 		name=l.getString(1);

		 	}

		 	 l.close();

		}catch(Exception e){//e.printStackTrace();

		}finally{
			}
		return name;
	}

/*--------------------------------------------------------------------------------------------------*/
	public String getCourseCA(Integer id,DataSourceConnection database)
	{
		String name="";
		try{

			ResultSet l =database.retrieve("select competencesAddressedName from competencesaddressed where idCompetencesAddressed= "+id);
		 	while(l.next())
		 	{
		 		name=l.getString(1);

		 	}
		 	l.close();


		}catch(Exception e){
		}finally{
			}
		return name;
	}

/*--------------------------------------------------------------------------------------------------*/

//	public Integer getTAID(String name)
//	{
//		//Coursetypes cT=new Coursetypes();
//		//ArrayList Al=new ArrayList();
//		Integer id=null;
//		Session session = null;
//
//		try{
//			// This step will read hibernate.cfg.xml and prepare hibernate for use
//			SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
//			//tx=session.beginTransaction();
//			session =sessionFactory.openSession();
//		    // //////System.out.println("*******************************");
//		    // //////System.out.println("Query using Hibernate Query Language");
//			//Query using Hibernate Query Language
//			////System.out.println("select idTrainingAreas from Trainingareas where trainingAreaName like '"+name+"'");
//			String ss=name.toLowerCase();
//		 	List l =session.createQuery("select idTrainingAreas from Trainingareas where trainingAreaName = '"+ss+"'").list();
//		 	for(Iterator it=l.iterator();it.hasNext();)
//		 	{
//		 		Object row = (Object) it.next();
//		 		id=(Integer)row;
//		 	}
//
//
//	        session.close();
//		}catch(Exception e){
//			// //////System.out.println(e.getMessage());
//		}finally{
//			}
//		return id;
//	}
///*--------------------------------------------------------------------------------------------------*/
//
//	public Integer getCAID(String name)
//	{
//		//Coursetypes cT=new Coursetypes();
//		//ArrayList Al=new ArrayList();
//		Integer id=null;
//		Session session = null;
//
//		try{
//			// This step will read hibernate.cfg.xml and prepare hibernate for use
//			SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
//			//tx=session.beginTransaction();
//			session =sessionFactory.openSession();
//		    // //////System.out.println("*******************************");
//		    // //////System.out.println("Query using Hibernate Query Language");
//			//Query using Hibernate Query Language
//			//////System.out.println("select idTrainingAreas from Trainingareas where trainingAreaName like '"+name+"'");
//			//String ss=name.toLowerCase();
//		 	List l =session.createQuery("select idCompetencesAddressed from Competencesaddressed where competencesAddressedName = '"+name+"'").list();
//		 	for(Iterator it=l.iterator();it.hasNext();)
//		 	{
//		 		Object row = (Object) it.next();
//		 		id=(Integer)row;
//		 	}
//
//
//	        session.close();
//		}catch(Exception e){e.printStackTrace();
//			// //////System.out.println(e.getMessage());
//		}finally{
//			}
//		return id;
//	}
//
	/*----------------------------------------------------------------------------------------------------------*/
	public void insertCourse(Courses c,DataSourceConnection database)
	{

		try{

			String outlineAr=null;
			String outlineEng=null;
			String courseCode=null;
			String courseNameEng=null;
			String courseNameAr=null;
			String courseColor=null;
			String courseDesc=null;
			String courseApp=null;
			if(c.getCourseOutlineAr()!=null)
				outlineAr="'"+c.getCourseOutlineAr()+"'";
			if(c.getCourseOutlineEng()!=null)
				outlineEng="'"+c.getCourseOutlineEng()+"'";
			if(c.getCourseCode()!=null)
				courseCode="'"+c.getCourseCode()+"'";
			if(c.getCourseNameAr()!=null)
				courseNameAr="'"+c.getCourseNameAr()+"'";
			if(c.getCourseNameEng()!=null)
				courseNameEng="'"+c.getCourseNameEng()+"'";
			if(c.getCourseColor()!=null)
				courseColor="'"+c.getCourseColor()+"'";
			if(c.getCourseDescription()!=null)
				courseDesc="'"+c.getCourseDescription()+"'";
			if(c.getCourseApp()!=null)
				courseApp="'"+c.getCourseApp()+"'";
			String s="insert into courses (courseCode,courseNameEng,courseNameAr,courseOutlineEng,courseOutlineAr,courseDays,CourseCompetenceAddressed,courseColor,Course_idTrainingAreas,Course_idCourseTypes,CourseDescription,CourseCalender,Course_idResources,CourseApp) values("+courseCode+","+courseNameEng+","+courseNameAr+","+outlineEng+","+outlineAr+","+c.getCourseDays()+","+c.getCourseCompetenceAddressed()+","+courseColor+","+c.getIdTrainingArea()+","+c.getIdCourseTypes()+","+courseDesc+",'',"+c.getCourse()+","+courseApp+")";
			////System.out.println("s= "+s);

			database.update("insert into courses (courseCode,courseNameEng,courseNameAr,courseOutlineEng,courseOutlineAr,courseDays,CourseCompetenceAddressed,courseColor,Course_idTrainingAreas,Course_idCourseTypes,CourseDescription,CourseCalender,Course_idResources,CourseApp) values("+courseCode+","+courseNameEng+","+courseNameAr+","+c.getCourseOutlineAr()+","+c.getCourseOutlineAr()+","+c.getCourseDays()+","+c.getCourseCompetenceAddressed()+","+courseColor+","+c.getIdTrainingArea()+","+c.getIdCourseTypes()+","+courseDesc+",'',"+c.getCourse()+","+courseApp+")");

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}

/*----------------------------------------------------------------------------------------------------------*/
	public void updateCourse(Courses c,DataSourceConnection database)
	{

		try{

			//String s="insert into courses values('"+c.getCourseCode()+"','"+c.getCourseNameEng()+"','"+c.getCourseNameAr()+"','"+c.getCourseOutlineEng()+"','"+c.getCourseOutlineAr()+"',"+c.getCourseDays()+","+c.getCourseCompetenceAddressed()+",'"+c.getCourseColor()+"',"+c.getIdTrainingArea()+","+c.getIdCourseTypes()+",'"+c.getCourseDescription()+"','',"+c.getCourse()+",'"+c.getCourseApp()+"')";
			////System.out.println("s= "+s);
			String outlineAr=null;
			String outlineEng=null;
			if(c.getCourseOutlineAr()!=null)
				outlineAr="'"+c.getCourseOutlineAr()+"'";
			if(c.getCourseOutlineEng()!=null)
				outlineEng="'"+c.getCourseOutlineEng()+"'";
			////System.out.println("update courses set CourseOutlineAr="+outlineAr+", courseOutlineEng="+outlineEng+" where idCourses="+c.getIdCourses());
			database.update("update courses set CourseOutlineAr="+outlineAr+", courseOutlineEng="+outlineEng+" where idCourses="+c.getIdCourses());

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void updateCourseTA(Courses c,DataSourceConnection database)
	{

		try{

			////System.out.println("update courses set Course_idTrainingAreas="+c.getIdTrainingArea()+" where idCourses="+c.getIdCourses());
			database.update("update courses set Course_idTrainingAreas="+c.getIdTrainingArea()+" where idCourses="+c.getIdCourses());

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}

	/*----------------------------------------------------------------------------------------------------------*/
	public void updateAllCourse(Courses c,DataSourceConnection database)
	{

		try{

			//String s="insert into courses values('"+c.getCourseCode()+"','"+c.getCourseNameEng()+"','"+c.getCourseNameAr()+"','"+c.getCourseOutlineEng()+"','"+c.getCourseOutlineAr()+"',"+c.getCourseDays()+","+c.getCourseCompetenceAddressed()+",'"+c.getCourseColor()+"',"+c.getIdTrainingArea()+","+c.getIdCourseTypes()+",'"+c.getCourseDescription()+"','',"+c.getCourse()+",'"+c.getCourseApp()+"')";
			////System.out.println("s= "+s);
			String outlineAr=null;
			String outlineEng=null;
			String courseCode=null;
			String courseNameEng=null;
			String courseNameAr=null;
			String courseColor=null;
			String courseDesc=null;
			String courseApp=null;
			if(c.getCourseOutlineAr()!=null)
				outlineAr="'"+c.getCourseOutlineAr()+"'";
			if(c.getCourseOutlineEng()!=null)
				outlineEng="'"+c.getCourseOutlineEng()+"'";
			if(c.getCourseCode()!=null)
				courseCode="'"+c.getCourseCode()+"'";
			if(c.getCourseNameAr()!=null)
				courseNameAr="'"+c.getCourseNameAr()+"'";
			if(c.getCourseNameEng()!=null)
				courseNameEng="'"+c.getCourseNameEng()+"'";
			if(c.getCourseColor()!=null)
				courseColor="'"+c.getCourseColor()+"'";
			if(c.getCourseDescription()!=null)
				courseDesc="'"+c.getCourseDescription()+"'";
			if(c.getCourseApp()!=null)
				courseApp="'"+c.getCourseApp()+"'";

			database.update("update courses set courseCode="+courseCode+",courseNameAr="+courseNameAr+", courseNameEng="+courseNameEng+", courseColor="+courseColor+", CourseDescription="+courseDesc+",courseApp="+courseApp+",courseDays="+c.getCourseDays()+",CourseCompetenceAddressed="+c.getCourseCompetenceAddressed()+",Course_idTrainingAreas="+c.getIdTrainingArea()+",Course_idCourseTypes="+c.getIdCourseTypes()+",Course_idResources="+c.getCourse()+" where idCourses="+c.getIdCourses());

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
/*----------------------------------------------------------------------------------------------------------*/
	public void updatecourseTA(Courses c,DataSourceConnection database)
	{

		try{

			String nameEng=null;
			String code=null;
			if(c.getCourseNameEng()!=null)
				nameEng="'"+c.getCourseNameEng()+"'";
			if(c.getCourseCode()!=null)
				code="'"+c.getCourseCode()+"'";
		//	//System.out.println("update courses set courseNameEng="+nameEng+" and courseCode="+code+" and courseDays= "+c.getCourseDays()+" and Course_idCourseTypes= "+c.getIdCourseTypes()+" where idCourses="+c.getIdCourses());
			database.update("update courses set courseNameEng="+nameEng+", courseCode="+code+", courseDays= "+c.getCourseDays()+", Course_idCourseTypes= "+c.getIdCourseTypes()+" where idCourses="+c.getIdCourses());

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
/*-----------------------------------------------------------------------------*/
	public Courses getCourseById(Integer id,DataSourceConnection database)
	{
		Courses courses=new Courses();

		try{

				ResultSet l =database.retrieve("select * from courses where idCourses="+id);
				while(l.next())
				 {
					courses.setIdCourses(l.getInt(1));
					courses.setCourseCode(l.getString(2));
					courses.setCourseNameEng(l.getString(3));
					courses.setCourseNameAr(l.getString(4));
					courses.setCourseOutlineEng(l.getString(5));
					courses.setCourseOutlineAr(l.getString(6));
					courses.setCourseDays(l.getInt(7));
					courses.setCourseCompetenceAddressed(l.getInt(8));
					courses.setCourseColor(l.getString(9));
					courses.setIdTrainingArea(l.getInt(10));
					courses.setIdCourseTypes(l.getInt(11));
					courses.setCourseDescription(l.getString(12));
					courses.setCourse(l.getInt(14));
					courses.setCourseApp(l.getString(15));

				 }
				 l.close();

		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return courses;
	}


//////////////////////////get MM relation//////////////////////////
	public ArrayList<TrackCourseShow> getCIDs(Integer id,DataSourceConnection database)
	{
		ArrayList<TrackCourseShow> cShow=new ArrayList<TrackCourseShow>();

		try{

			ResultSet l =database.retrieve("select * from trackcourses where TrackCoures_idTracks="+id);
		 	while(l.next())
		 	{
		 		TrackCourseShow cNew=new TrackCourseShow();
         		cNew.setTableId(l.getInt(4));
         		cNew.setCourseTrackDays(l.getInt(3));
         	//	cNew.setCourseNameEng(c.getTrackCourses().getCourseNameEng());
         		cNew.setIdCourses(l.getInt(2));
         		cShow.add(cNew);
		 	}

		 	l.close();

		}catch(Exception e){e.printStackTrace();
		}

		return cShow;
	}

/*------------------------insert Relation-----------------------------------*/

	public void insertRelationCourses(Trackcourses tc,DataSourceConnection database)
	{

		try{

			////System.out.println("insert into Trackcourses (TrackCoures_idTracks,TrackCourses_idCourses,CourseTrackDays) values("+tc.getTrackCoures()+","+tc.getTrackCourses()+","+tc.getCourseTrackDays()+")");
			database.update("insert into trackcourses (TrackCoures_idTracks,TrackCourses_idCourses,CourseTrackDays) values("+tc.getTrackCoures()+","+tc.getTrackCourses()+","+tc.getCourseTrackDays()+")");

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
/*--------------------------checkCourseExistance----------------------------*/
	public Boolean checkCourse(Integer id, Integer id2,DataSourceConnection database)
	{
		Boolean flag=true;
		try{

			ResultSet l =database.retrieve("select * from trackcourses where TrackCoures_idTracks="+id2+ " and TrackCourses_idCourses="+id);
			if(l.next())
		 	{
				flag=false;
		 	}

		 	l.close();

		}catch(Exception e){e.printStackTrace();
		}finally{
			}

		return flag;
	}

/*----------------------------------------------------------------------------------------------------------*/

	public ArrayList<Courses> getCoursesById(Integer id,DataSourceConnection database)
	{

		ArrayList<Courses> al=new ArrayList<Courses>();

		try{

			ResultSet l =database.retrieve("select * from courses where Course_idTrainingAreas= "+id);
		 	while(l.next())
		 	{
		 		Courses courses=new Courses();
				courses.setIdCourses(l.getInt(1));
				courses.setCourseCode(l.getString(2));
				courses.setCourseNameEng(l.getString(3));
				courses.setCourseNameAr(l.getString(4));
				courses.setCourseOutlineEng(l.getString(5));
				courses.setCourseOutlineAr(l.getString(6));
				courses.setCourseDays(l.getInt(7));
				courses.setCourseCompetenceAddressed(l.getInt(8));
				courses.setCourseColor(l.getString(9));
				courses.setIdTrainingArea(l.getInt(10));
				courses.setIdCourseTypes(l.getInt(11));
				courses.setCourseDescription(l.getString(12));
				courses.setCourseApp(l.getString(15));
				al.add(courses);
		 	}
		 	l.close();


		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return al;
	}
/////////////////////////////////////////////////////////////////////////////////////////////////
	public ArrayList<Courses> getC(ArrayList ids,DataSourceConnection database)
	{
		ArrayList<Courses> al=new ArrayList<Courses>();

		try{

			String s="select * from courses where idCourses Not IN (";
			for(int i=0;i<ids.size();i++)
			{
				s+=ids.get(i);
				if(i!=ids.size()-1)
					s+=',';
			//	else
				//	s+=')';
			}
			s+=')';
			////System.out.println(s);
			ResultSet l =database.retrieve(s);
		 	while(l.next())
		 	{
		 		Courses courses=new Courses();
		 		courses.setIdCourses(l.getInt(1));
				courses.setCourseCode(l.getString(2));
				courses.setCourseNameEng(l.getString(3));
				courses.setCourseNameAr(l.getString(4));
				courses.setCourseOutlineEng(l.getString(5));
				courses.setCourseOutlineAr(l.getString(6));
				courses.setCourseDays(l.getInt(7));
				courses.setCourseCompetenceAddressed(l.getInt(8));
				courses.setCourseColor(l.getString(9));
				courses.setIdTrainingArea(l.getInt(10));
				courses.setIdCourseTypes(l.getInt(11));
				courses.setCourseDescription(l.getString(12));
				courses.setCourseApp(l.getString(15));
				al.add(courses);
		 	}

		 	l.close();

		}catch(Exception e){e.printStackTrace();
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return al;
	}
	/*--------------------------checkCourseColor----------------------------*/
	public Boolean checkCourseColor(String c,DataSourceConnection database)
	{
		Boolean flag=true;

		try{

			ResultSet l =database.retrieve("select * from courses where courseColor="+c);
		 	if(l.next())
		 	{
		 		flag=false;
		 	}

		 	l.close();

		}catch(Exception e){
		}finally{
			}
		return flag;
	}

/*----------------------------------------------------------------------------------------*/
	public Integer getLastOne(DataSourceConnection database)
	{
		Integer id=0;

		try{

			ResultSet l =database.retrieve("select idCourses from courses");
			while(l.next())
		 	{
		 			id=l.getInt(1);
		 	}
		 	l.close();


		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return id;


	}
/*------------------------insert Relation-----------------------------------*/

	public void insertMMCTP(Integer id,Integer aId,DataSourceConnection database)
	{
		try{


			database.update("insert into coursesaudience (CoursesAudience_idAudienceTypes,CoursesAudience_idCourses) values("+aId+","+id+")");

		}
		  catch (Exception e) {// e.printStackTrace();

	      }  finally {

	      }

	}

//////////////////////////get MM relation//////////////////////////
	public ArrayList<Integer> getAudID(Integer id,DataSourceConnection database)
	{
		ArrayList<Integer> Al=new ArrayList<Integer>();
		try{

			ResultSet l =database.retrieve("select CoursesAudience_idAudienceTypes from coursesaudience where CoursesAudience_idCourses="+id);
		 	while(l.next())
		 	{
		 		Integer CAId=0;
				CAId=l.getInt(1);
				Al.add(CAId);
		 	}

		 	l.close();

		}catch(Exception e){e.printStackTrace();
		}finally{
			}
		return Al;
	}
/////////////////////////////////////////////////////////////////////////////////////////////////
	public Audiencetypes getAud(Integer id,DataSourceConnection database)
	{
		//ArrayList<Audiencetypes> Al=new ArrayList<Audiencetypes>();
		Audiencetypes DS=new Audiencetypes();

		try{

			ResultSet l =database.retrieve("select * from audiencetypes where idAudienceTypes="+id);
		 	if(l.next())
		 	{
		 		DS.setIdAudienceTypes(l.getInt(1));
				DS.setAudienceName(l.getString(2));
				//Al.add(DS);
		 	}
		 	////System.out.println();
		 	l.close();

		}catch(Exception e){e.printStackTrace();
		}finally{
			}
		return DS;
	}
/////////////////////////////////////////////////////////////////////////////////////////////////
	public ArrayList<Audiencetypes> getAudiences(ArrayList ids,DataSourceConnection database)
	{
		ArrayList<Audiencetypes> al=new ArrayList<Audiencetypes>();

		try{

			String s="select * from audiencetypes where idAudienceTypes Not IN (";
			for(int i=0;i<ids.size();i++)
			{
				s+=ids.get(i);
				if(i!=ids.size()-1)
					s+=',';
			//	else
				//	s+=')';
			}
			s+=')';
			////System.out.println(s);
			ResultSet l =database.retrieve(s);
		 	while(l.next())
		 	{
		 		Audiencetypes DS=new Audiencetypes();
				DS.setIdAudienceTypes(l.getInt(1));
				DS.setAudienceName(l.getString(2));
		 		al.add(DS);
		 	}

		 	l.close();

		}catch(Exception e){e.printStackTrace();
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return al;
	}
/////////////////////////////////////////////////////////////////////////////////////////////////
public void deleteMMCAud(Integer CAid,Integer Cid,DataSourceConnection database)
	{
		try{


			database.update("delete from coursesaudience where CoursesAudience_idAudienceTypes= "+CAid+" and CoursesAudience_idCourses="+Cid);

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }
	}
/*----------------------------------------------------------------------------------------------------------*/
public void updateTrackCourse(Trackcourses c,DataSourceConnection database)
{

	try{

		//String s="insert into courses values('"+c.getCourseCode()+"','"+c.getCourseNameEng()+"','"+c.getCourseNameAr()+"','"+c.getCourseOutlineEng()+"','"+c.getCourseOutlineAr()+"',"+c.getCourseDays()+","+c.getCourseCompetenceAddressed()+",'"+c.getCourseColor()+"',"+c.getIdTrainingArea()+","+c.getIdCourseTypes()+",'"+c.getCourseDescription()+"','',"+c.getCourse()+",'"+c.getCourseApp()+"')";
		////System.out.println("s= "+s);


		database.update("update trackcourses set CourseTrackDays="+c.getCourseTrackDays()+" where tableId="+c.getTableId());

	}
	  catch (Exception e) { e.printStackTrace();

      }  finally {

      }

}
}
