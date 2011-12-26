package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import abItemsShow.TrackCourseShow;

import com.mysql.jdbc.Statement;

import database.DataSourceConnection;


import tablespackage.Clients;
import tablespackage.Contractcourse;
import tablespackage.Contracts;
import tablespackage.Contractstatus;
import tablespackage.Datashows;
import tablespackage.Datashowsmaintainance;
import tablespackage.Rooms;
import tablespackage.Venues;

public class Hiber_Contracts 
{
/*----------------------------------------------------------------------------------------------------------*/
	
	public ArrayList<Contracts> getContractsById(Integer id,DataSourceConnection database)
	{
		
		ArrayList<Contracts> al=new ArrayList<Contracts>();
		
		try{
			
			ResultSet l =database.retrieve("select * from contracts where Contract_idClients="+id);
		 	while(l.next())
		 	{
		 		Contracts c=new Contracts();
		 		c.setContractProposalId(l.getString(2));
		 		c.setContractProactiveType(l.getInt(6));
		 		c.setContractFundType(l.getInt(7));
		 		c.setContractDateOfRequest(l.getDate(10));
		 		c.setContractFirstStartDate(l.getDate(11));
		 		c.setContractFirstEndDate(l.getDate(12));
		 		c.setContractRateType(l.getInt(16));
		 		c.setContractFee(l.getInt(19));
		 		c.setContractDealPerson(l.getString(25));
		 		al.add(c);
		 	}
		 		
		 	l.close();
			
		}catch(Exception e){e.printStackTrace();
		}
		
		return al;
	}
//////////////////////////getAllContacts//////////////////////////////
//	public ArrayList getAccpContarcts()
//	{
//		Contracts DS=new Contracts();
//		ArrayList<Contracts> Al=new ArrayList<Contracts>();
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
//		 	List l =session.createQuery("from Contracts where ContractStatus > 2 and Deleted=0").list();
//		 	for(Iterator it=l.iterator();it.hasNext();)
//		 	{
//		 		Object row = (Object) it.next();
//		 		if (row instanceof Contracts) {
//					DS = (Contracts) row;
//					Al.add(DS);
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
//		return Al;
//	}
//	
//	
//	////////////////////////////////////////////////////////////////////////////////////
//	public String getContarctStatus(int s)
//	{
//		Contracts DS=new Contracts();
//		ArrayList<Contracts> Al=new ArrayList<Contracts>();
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
//		 	List l =session.createQuery("from Contractstatus where idContractStatus = "+s).list();
//		 	
//		    Contractstatus row = (Contractstatus) l.iterator().next();
//		 	
//		 		
//	        session.close();
//	        return row.getContractStatusName();
//		}catch(Exception e){
//			// //////System.out.println(e.getMessage());
//		}finally{
//			}
//		return "";
//	}
///////////////////////////////////////////////////////////////
//	
//	
//	public ArrayList getPendContarcts()
//	{
//		Contracts DS=new Contracts();
//		ArrayList<Contracts> Al=new ArrayList<Contracts>();
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
//		 	List l =session.createQuery("from Contracts where ContractStatus <= 2 and Deleted=0").list();
//		 	for(Iterator it=l.iterator();it.hasNext();)
//		 	{
//		 		Object row = (Object) it.next();
//		 		if (row instanceof Contracts) {
//					DS = (Contracts) row;
//					Al.add(DS);
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
//		return Al;
//	}
//	
//	/*----------------------------------------------------------------------------------------------------------*/
//	public Contracts getContractById(Integer id)
//	{
//		Contracts c=new Contracts();
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
//		 	List l =session.createQuery(" from Contracts where idContracts="+id).list();
//		 	for(Iterator it=l.iterator();it.hasNext();)
//		 	{
//		 		Object row = (Object) it.next();
//		 		c=(Contracts)row;						
//		 	}
//		 		
//		 		
//	        session.close();
//		}catch(Exception e){
//			// //////System.out.println(e.getMessage());
//		}finally{
//			}
//		return c;
//	}
//	
///*----------------------------------------------------------------------------------------------------------*/
//	
//	public ArrayList<Contractcourse> getContractCoursesById(Integer id)
//	{
//		
//		ArrayList<Contractcourse> al=new ArrayList<Contractcourse>();
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
//		 	List l =session.createQuery(" from Contractcourse where Contracts_idContracts="+id).list();
//		 	for(Iterator it=l.iterator();it.hasNext();)
//		 	{
//		 		Object row = (Object) it.next();
//		 		Contractcourse c=new Contractcourse();
//		 		c=(Contractcourse)row;	
//		 		// //////System.out.println("ana goa el contractcourse");
//		 		al.add(c);
//		 	}
//		 	// //////System.out.println("size = "+al.size());	
//		 		
//	        session.close();
//		}catch(Exception e){
//			// //////System.out.println(e.getMessage());
//			e.printStackTrace();
//		}finally{
//			}
//		return al;
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
//		 	List l =session.createQuery("select idContracts from Contracts").list();
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
}
