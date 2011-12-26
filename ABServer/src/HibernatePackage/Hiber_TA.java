package HibernatePackage;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;


import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import abItemsShow.CShow;
import tablespackage.Courses;
import tablespackage.Trainingareas;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;

public class Hiber_TA 
{
/*----------------------------------------------------------------------------------------------------------*/
	
	public ArrayList<Trainingareas> getCourseTA(DataSourceConnection database)
	{
		ArrayList<Trainingareas> tA=new ArrayList<Trainingareas>();
	
		try{
		
		 	ResultSet l =database.retrieve("select * from trainingareas");
		 	while(l.next())
		 	{	
		 			Trainingareas tArea=new Trainingareas();
					tArea.setIdTrainingAreas(l.getInt(1));
					tArea.setTrainingAreaName(l.getString(2));
					tArea.setTrainingAreaCode(l.getString(3));
					tA.add(tArea);
		 	}
		 	l.close();
		 	
	        
		}catch(Exception e){e.printStackTrace();
			// //////System.out.println(e.getMessage());
		}finally{//session.close();
			
			}
		return tA;
	}
//	public ArrayList<CShow> getCourses()
//	{
//		
//		Session session = null;
//		Trainingareas tArea=new Trainingareas();
//		ArrayList<CShow> cShow=new ArrayList<CShow>();
//	
//		try{
//			// This step will read hibernate.cfg.xml and prepare hibernate for use
//			SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
//			//tx=session.beginTransaction();
//			session =sessionFactory.openSession();
//		    // //////System.out.println("*******************************");
//		    // //////System.out.println("Query using Hibernate Query Language");
//			//Query using Hibernate Query Language
//		 	List l =session.createQuery(" from Trainingareas").list();
//		 	for(Iterator it=l.iterator();it.hasNext();)
//		 	{
//		 		Object row = (Object) it.next();
//		 		if (row instanceof Trainingareas) {
//					tArea = (Trainingareas) row;
//					//tA.add(tArea);
//					Collection c=tArea.getCourses();
//					for(Iterator it1=c.iterator();it1.hasNext();)
//	    		 	{
//	    		 		Object row1 = (Object) it1.next();
//	    		 		if (row1 instanceof Courses) {//////System.out.println("we ba3deeeeeeeeen");
//	    		 			Courses cs=new Courses();
//	    	        		cs = (Courses) row1;
//	    					//cShow.add(DS);
//	    	        		if(cs!=null)
//	    	        		{
//		    					CShow cNew=new CShow();
//		    	        		cNew.setIdCourses(cs.getIdCourses());
//		    	        	//	////System.out.println("?????"+cs.getCourseNameEng());
//		    	        	//	cNew.setCourseCalender(cs.getCourseCalender());
//		    	        		cNew.setCourseCode(cs.getCourseCode());
//		    	        		cNew.setCourseColor(cs.getCourseColor());
//		    	        		cNew.setCourseDays(cs.getCourseDays());
//		    	        		cNew.setCourseDescription(cs.getCourseDescription());
//		    	        		cNew.setCourseNameAr(cs.getCourseNameAr());
//		    	        		cNew.setCourseNameEng(cs.getCourseNameEng());
//		    	        		cNew.setCourseOutlineAr(cs.getCourseOutlineAr());
//		    	        		cNew.setCourseOutlineEng(cs.getCourseOutlineEng());
//		    	        		cNew.setTrainArea(tArea.getTrainingAreaName()); 
//		    	        		if(cs.getCourseCompetenceAddressed()!=null)
//		    	        		{
//			    	        		cNew.setCourseCompetenceAddressed(cs.getCourseCompetenceAddressed().getCompetencesAddressedName());
//			    	        		cNew.setIdCourseCompetenceAddressed(cs.getCourseCompetenceAddressed().getIdCompetencesAddressed());
//		    	        		}
//		    	        		if(cs.getCourse_2().getIdCourseTypes().equals(1))
//		    	        			cNew.setCourseType("Group");
//		    	        		else if(cs.getCourse_2().getIdCourseTypes().equals(2))
//		    	        			cNew.setCourseType("Individual");
//		    	        		else if(cs.getCourse_2().getIdCourseTypes().equals(3))
//		    	        			cNew.setCourseType("Both");
//		    	        		cShow.add(cNew);
//	    	        		}
//	    				}
//	    		 		
//	    		 	}
//			 	//	////System.out.println("Coursename= "+((Courses)tArea.getCourses().toArray()[0]).getCourseNameEng());
//				}
//		 		
//		 		
//		 	}
//		 		
//		 		
//	      //  
//		}catch(Exception e){
//			// //////System.out.println(e.getMessage());
//		}finally{session.close();
//			}
//		return cShow;
//	}		
	/*-----------------------------------------------------------------------------------------------------*/
	public void insertTA(Trainingareas t,DataSourceConnection database)
	{
		try{
			
			String name=null;
			String code=null;
			if(t.getTrainingAreaName()!=null)
				name="'"+t.getTrainingAreaName()+"'";
			if(t.getTrainingAreaCode()!=null)
				code="'"+t.getTrainingAreaCode()+"'";
			database.update("insert into trainingareas (TrainingAreaName,TrainingAreaCode) values("+name+","+code+")");
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void update(Trainingareas t,DataSourceConnection database)
	{
		
		try{
			
			String name=null;
			String code=null;
			if(t.getTrainingAreaName()!=null)
				name="'"+t.getTrainingAreaName()+"'";
			if(t.getTrainingAreaCode()!=null)
				code="'"+t.getTrainingAreaCode()+"'";
			
			database.update("update trainingareas set TrainingAreaName="+name+", TrainingAreaCode="+code+" where idTrainingAreas="+t.getIdTrainingAreas());
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}	
/*----------------------------------------------------------------------------------------------------------*/
	
	public Trainingareas getTAById(Integer id,DataSourceConnection database)
	{
		Trainingareas tArea=new Trainingareas();
		
		try{
			
			
			ResultSet l =database.retrieve("select * from trainingareas where idTrainingareas="+id);
		 	while(l.next())
		 	{
		 		
				tArea.setIdTrainingAreas(l.getInt(1));
				tArea.setTrainingAreaName(l.getString(2));
				tArea.setTrainingAreaCode(l.getString(3));						
		 	}
		 	
		}catch(Exception e){e.printStackTrace();
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return tArea;
	}
/*---------------------------------------------------------------------------------------------------*/	
	public Trainingareas getMiscID(String ta,DataSourceConnection database)
	{
		Trainingareas c=new Trainingareas();
		try{
			
			ResultSet l =database.retrieve("select * from trainingareas where trainingAreaName='"+ta+"'");
		 	while(l.next())
		 	{
		 		c.setIdTrainingAreas(l.getInt(1));
		 		c.setTrainingAreaName(l.getString(2));
		 		c.setTrainingAreaCode(l.getString(3));
		 	}
		 		
		 	l.close();
			
		}catch(Exception e){e.printStackTrace();
		}finally{
			}
		
		return c;
	}
/*---------------------------------------------------------------------------------------------------*/	
//	public Trainingareas getTAID(String q)
//	{
//	Trainingareas c=new Trainingareas();
//	Session session = null;
//
//	try{
//		// This step will read hibernate.cfg.xml and prepare hibernate for use
//		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
//		//tx=session.beginTransaction();
//		session =sessionFactory.openSession();
//	    // //////System.out.println("*******************************");
//	    // //////System.out.println("Query using Hibernate Query Language");
//		//Query using Hibernate Query Language
//	 	List l =session.createQuery(" from Trainingareas").list();
//	 	for(Iterator it=l.iterator();it.hasNext();)
//	 	{
//	 		Object row = (Object) it.next();
//	 		c=(Trainingareas)row;						
//	 	}
//	 		
//	 		
//        session.close();
//	}catch(Exception e){
//		// //////System.out.println(e.getMessage());
//	}finally{
//		}
//	return c;
//	}
}
