package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import abItemsShow.CShow;
import tablespackage.Audiencetypes;
import tablespackage.Competencesaddressed;
import tablespackage.Courses;
import tablespackage.Trainingareas;

public class Hiber_CompetenceAddressed 
{
	public ArrayList<Competencesaddressed> getCompetencesaddressed(DataSourceConnection database)
	{
		ArrayList<Competencesaddressed> Al=new ArrayList<Competencesaddressed>();
		
	
		try{
			
			ResultSet l =database.retrieve("select * from competencesaddressed");
			while(l.next())
		 	{
				Competencesaddressed DS=new Competencesaddressed();
				DS.setIdCompetencesAddressed(l.getInt(1));
				DS.setCompetencesAddressedName(l.getString(2));
		 		Al.add(DS);
		 	}
		 		
		 	l.close();
		 	
		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return Al;
	}
/*----------------------------------------------------------------------------------------------------------*/
	
	public Competencesaddressed getCAById(Integer id,DataSourceConnection database)
	{
		Competencesaddressed DS=new Competencesaddressed();
		
		try{
			
			
			ResultSet l =database.retrieve("select * from competencesaddressed where idCompetencesaddressed="+id);
		 	while(l.next())
		 	{
		 		
		 		DS.setIdCompetencesAddressed(l.getInt(1));
				DS.setCompetencesAddressedName(l.getString(2));						
		 	}
		 	
		}catch(Exception e){e.printStackTrace();
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return DS;
	}	
//	public ArrayList<CShow> getCompetencesaddressedName()
//	{
//		Competencesaddressed DS=new Competencesaddressed();
//		ArrayList<CShow> cShow=new ArrayList<CShow>();
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
//		 	List l =session.createQuery("from Competencesaddressed").list();
//		 	for(Iterator it=l.iterator();it.hasNext();)
//		 	{
//		 		Object row = (Object) it.next();
//		 		if (row instanceof Competencesaddressed) {
//					DS = (Competencesaddressed) row;
//					Collection c=DS.getCourses();
//					if(c !=null)
//					{
//						for(Iterator it1=c.iterator();it1.hasNext();)
//		    		 	{
//		    		 		Object row1 = (Object) it1.next();
//		    		 		if (row1 instanceof Courses) {//////System.out.println("we ba3deeeeeeeeen");
//		    		 			Courses cs=new Courses();
//		    	        		cs = (Courses) row1;
//		    					//cShow.add(DS);
//		    	        		if(cs!=null)
//		    	        		{
//			    					CShow cNew=new CShow();
//			    	        		cNew.setIdCourses(cs.getIdCourses());
//			    	        		cNew.setCourseCompetenceAddressed(DS.getCompetencesAddressedName());
//			    	        		cNew.setIdCourseCompetenceAddressed(DS.getIdCompetencesAddressed());
//			    	        		cShow.add(cNew);
//		    	        		}
//		    				}
//		    		 	}
//					}
//					//Al.add(DS);
//					
//				}
//		 		
//		 	}
//		 		
//		 		
//	       
//		}catch(Exception e){
//			// //////System.out.println(e.getMessage());
//		}finally{ session.close();
//			}
//		return cShow;
//	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void insertCompetencesaddressed(Competencesaddressed a,DataSourceConnection database)
	{
		try{
			
			database.update("insert into competencesaddressed (competencesAddressedName) values('"+a.getCompetencesAddressedName()+"')");
			
		}
		  catch (Exception e) { e.printStackTrace();

		  }

	}	
	/*----------------------------------------------------------------------------------------------------------*/
	public void updateCA(Competencesaddressed c,DataSourceConnection database)
	{
		
		try{
			
			
			database.update("update competencesaddressed set competencesAddressedName='"+c.getCompetencesAddressedName()+"' where idCompetencesAddressed="+c.getIdCompetencesAddressed());
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}	

}
