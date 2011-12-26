package HibernatePackage;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import tablespackage.Courses;
import tablespackage.Datashows;
import tablespackage.Datashowsmaintainance;
import tablespackage.Personals;
import tablespackage.Resourcecourses;
import tablespackage.Resourcefiles;
import tablespackage.Resources;
import tablespackage.Venues;

public class Hiber_ResourcesFiles 
{
	public Hiber_ResourcesFiles(){}
	
//	public ArrayList<Resourcefiles> getResourcesFiles(Integer id)
//	{
//		
//		ArrayList<Resourcefiles> Al=new ArrayList<Resourcefiles>();
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
//		 	List l =session.createQuery("from Resourcefiles where resourceFileType=1 and ResourceCourses_idResourcesCourses="+id).list();
//		 	for(Iterator it=l.iterator();it.hasNext();)
//		 	{
//		 		Object row = (Object) it.next();
//		 		if (row instanceof Resourcefiles) {
//		 			Resourcefiles r=new Resourcefiles();
//		 			r = (Resourcefiles) row;
//					Al.add(r);
//		 		}
//					
//				//	// //////System.out.println("courseType= "+r.getResourceFirstName());
//					
//				
//		 		else {
//		 			
//		 			// //////System.out.println(" errorrrrrrrrrrrr");
//		 		}
//		 		
//		 	}
//		 		
//		 		
//	        session.close();
//		}catch(Exception e){
//			// //////System.out.println(e.getMessage());
//		}finally{
//			}
//		return Al;
//	}
///*=====================================resourses courses==============================================*/	
//	public ArrayList<Resourcecourses> getResourceCourses(Integer id)
//	{
//		
//		ArrayList<Resourcecourses> Al=new ArrayList<Resourcecourses>();
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
//		 	List l =session.createQuery("from Resourcecourses where ResourceCourse_idResources="+id).list();
//		 	for(Iterator it=l.iterator();it.hasNext();)
//		 	{
//		 		Object row = (Object) it.next();
//		 		if (row instanceof Resourcecourses) 
//		 		{
//		 			Resourcecourses r=new Resourcecourses();	
//					r = (Resourcecourses) row;
//					Al.add(r);
//				    // //////System.out.println(Al.size());
//		 		
//		 		}
//		 	}
//		 		
//		 		
//	        session.close();
//		}catch(Exception e){
//			// //////System.out.println(e.getMessage());
//		}finally{
//			}
//		return Al;
//	}
//	/*----------------------------------------------------------------------------------------*/
//	public Integer getLastOne()
//	{
//		Integer id=0;
//	//	Trainingcoordinators TC=new Trainingcoordinators();
//	//	ArrayList Al=new ArrayList();
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
//		 	List l =session.createQuery("select idResources from Resources").list();
//		 	for(Iterator it=l.iterator();it.hasNext();)
//		 	{
//		 		Object row = (Object) it.next();
//		 		if (row instanceof Integer) {
//					id=(Integer)row;
//				//	// //////System.out.println("courseType= "+DS.getDatashowName());
//					
//				}
//		 		else {
//		 			
//		 			// //////System.out.println(" errorrrrrrrrrrrr");
//		 		}
//		 		
//		 	}
//		 		
//		 		
//	        session.close();
//		}catch(Exception e){
//			// //////System.out.println(e.getMessage());
//		}finally{
//			}
//		return id;
//		
//
//	}
///*----------------------------------------------------------------------------------------------------------*/
//	public void insertResourseCourse(Resourcecourses c)
//	{
//		Session session=HibernateUtil.getSessionFactory().openSession();
//		session.beginTransaction();
//		// //////System.out.println("ana goa el insert");
//		  session.save(c);
//		  session.getTransaction().commit();
//		  session.close();
//
//	}
///*----------------------------------------------------------------------------------------------------------*/
//	public void insertResourseFile(Resourcefiles c)
//	{
//		Session session=HibernateUtil.getSessionFactory().openSession();
//		session.beginTransaction();
//		// //////System.out.println("ana goa el insert");
//		  session.save(c);
//		  session.getTransaction().commit();
//		  session.close();
//
//	}
		
}
