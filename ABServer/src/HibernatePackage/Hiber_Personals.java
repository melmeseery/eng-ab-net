package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

import mypackage.ListClients;

import org.apache.log4j.Logger;

import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import tablespackage.Clients;
import tablespackage.Courses;
import tablespackage.Personals;
import tablespackage.Venues;
import abItemsShow.PersonalShow;
import abItemsShow.TrackCourseShow;
public class Hiber_Personals
{
	static Logger logger = Logger.getLogger(Hiber_Personals.class);
//	public ArrayList getPersons()
//	{
//		Personals p=new Personals();
//		ArrayList Al=new ArrayList();
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
//		 	List l =session.createQuery("from Personals").list();
//		 	for(Iterator it=l.iterator();it.hasNext();)
//		 	{
//		 		Object row = (Object) it.next();
//		 		if (row instanceof Personals) {
//					p = (Personals) row;
//					Al.add(p);
//				//	// //////System.out.println("courseType= "+cT.getCourseTypeName());
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
///*====================================================================================*/
//	public Personals getPersonById(Integer id)
//	{
//		Personals c=new Personals();
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
//		 	List l =session.createQuery(" from Personals where idPersonals="+id).list();
//		 	for(Iterator it=l.iterator();it.hasNext();)
//		 	{
//		 		Object row = (Object) it.next();
//		 		c=(Personals)row;
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
/*---------------------------------------------------------------------------------------*/
	public int insertPersonal(Personals d,DataSourceConnection database)
	{
		int id=0;
		try{

			String PersonFirstName=null;
			String PersonLastName=null;
			String PersonEmail=null;
			String PersonTitle=null;
			String PersonTelePhone=null;
			String PersonMobile=null;
			String PersonAddress=null;

			if(d.getPersonFirstName()!=null)
				PersonFirstName="'"+d.getPersonFirstName()+"'";
			if(d.getPersonLastName()!=null)
				PersonLastName="'"+d.getPersonLastName()+"'";
			if(d.getPersonEmail()!=null)
				PersonEmail="'"+d.getPersonEmail()+"'";
			if(d.getPersonTitle()!=null)
				PersonTitle="'"+d.getPersonTitle()+"'";
			if(d.getPersonTelePhone()!=null)
				PersonTelePhone="'"+d.getPersonTelePhone()+"'";
			if(d.getPersonMobile()!=null)
				PersonMobile="'"+d.getPersonMobile()+"'";
			if(d.getPersonAddress()!=null)
				PersonAddress="'"+d.getPersonAddress()+"'";

			database.update("insert into personals (PersonFirstName,PersonLastName,PersonEmail,PersonTitle,PersonTelePhone,PersonMobile,PersonAddress) values("+PersonFirstName+","+PersonLastName+","+PersonEmail+","+PersonTitle+","+PersonTelePhone+","+PersonMobile+","+PersonAddress+")");
			logger.info("insert into personals (PersonFirstName,PersonLastName,PersonEmail,PersonTitle,PersonTelePhone,PersonMobile,PersonAddress) values("+PersonFirstName+","+PersonLastName+","+PersonEmail+","+PersonTitle+","+PersonTelePhone+","+PersonMobile+","+PersonAddress+")");


			ResultSet l =database.retrieve("select idPersonals from personals where  PersonFirstName="+PersonFirstName+" And PersonLastName="+ PersonLastName+ "  And  PersonTitle="+PersonTitle);
			while(l.next())
		 	{
		 	   id=l.getInt(1);
		 	}
		 	l.close();

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }
		return id;
	}
/*----------------------------------------------------------------------------------------*/
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
//		 	List l =session.createQuery("select idPersonals from Personals").list();
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
//	}
/*------------------------insert Relation-----------------------------------*/

	public void insertRelationPersonal(Integer vid,Integer pid,DataSourceConnection database)
	{
		try{

			database.update("insert into venuspersonal (Venues_idVenues,Personals_idPersonals) values("+vid+","+pid+")");

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }
	}
////////////////////////////get MM relation//////////////////////////
	public ArrayList<Integer> getPs(Integer id,DataSourceConnection database)
	{
		ArrayList<Integer> al=new ArrayList<Integer>();
		try{

			ResultSet l =database.retrieve("select Personals_idPersonals from venuspersonal where Venues_idVenues="+id);
			while(l.next())
		 	{
				Integer ids=l.getInt(1);
				al.add(ids);
		 	}
		 	l.close();

		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return al;
	}
//////////////////////////get MM relation//////////////////////////
	public ArrayList<Integer> getClientPs(Integer id,DataSourceConnection database)
	{
		ArrayList<Integer> p=new ArrayList<Integer>();

		try{

			ResultSet l =database.retrieve("select ClientPersonals_idPersonals from clientpersonal where ClientsPersonal_idClients="+id);
		 	while(l.next())
		 	{
		 		p.add(l.getInt(1));
		 	}

		 	l.close();

		}catch(Exception e){e.printStackTrace();
		}

		return p;
	}
	/*----------------------------------------------------------------------------------------*/
	public Integer getPersonID(Personals d, DataSourceConnection database)
	{
		Integer id=0;

		try{
			String PersonFirstName=null;
			String PersonLastName=null;
			String PersonTitle=null;
			if(d.getPersonFirstName()!=null)
				PersonFirstName="'"+d.getPersonFirstName()+"'";
			if(d.getPersonLastName()!=null)
				PersonLastName="'"+d.getPersonLastName()+"'";
			if(d.getPersonTitle()!=null)
				PersonTitle="'"+d.getPersonTitle()+"'";
		//	database.update("insert into personals (PersonFirstName,PersonLastName,PersonEmail,PersonTitle,PersonTelePhone,PersonMobile,PersonAddress) values("+PersonFirstName+","+PersonLastName+","+PersonEmail+","+PersonTitle+","+PersonTelePhone+","+PersonMobile+","+PersonAddress+")");
			ResultSet l =database.retrieve("select idPersonals from personals where  PersonFirstName="+PersonFirstName+" And PersonLastName="+ PersonLastName+ "  And  PersonTitle="+PersonTitle);
			while(l.next())
		 	{
		 	   id=l.getInt(1);
		 	}
		 	l.close();
		}catch(Exception e){
		}finally{
			}
		return id;
	}
///*----------------------------------------------------------------------------------------*/
//	public Integer getLastOne(DataSourceConnection database)
//	{
//		Integer id=0;
//
//		try{
//
//			ResultSet l =database.retrieve("select idPersonals from personals");
//			while(l.next())
//		 	{
//		 			id=l.getInt(1);
//		 	}
//		 	l.close();
//
//
//		}catch(Exception e){
//			// //////System.out.println(e.getMessage());
//		}finally{
//			}
//		return id;
//	}
	/*-----------------------------------------------------------------------------*/
	public PersonalShow getPersonById(Integer id,DataSourceConnection database)
	{
		PersonalShow p=new PersonalShow();

		try{
				ResultSet l =database.retrieve("select * from personals where idPersonals="+id);
				while(l.next())
				 {
					p.setIdPersonals(l.getInt(1));
					p.setPersonFirstName(l.getString(2));
					p.setPersonLastName(l.getString(3));
					p.setPersonEmail(l.getString(4));
					p.setPersonTitle(l.getString(5));
					p.setPersonTelePhone(l.getString(6));
					p.setPersonMobile(l.getString(7));
					p.setPersonAddress(l.getString(8));
				 }
				 l.close();

		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return p;
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void updateContact(Personals d,DataSourceConnection database)
	{

		try{

			String PersonFirstName=null;
			String PersonLastName=null;
			String PersonEmail=null;
			String PersonTitle=null;
			String PersonTelePhone=null;
			String PersonMobile=null;
			String PersonAddress=null;

			if(d.getPersonFirstName()!=null)
				PersonFirstName="'"+d.getPersonFirstName()+"'";
			if(d.getPersonLastName()!=null)
				PersonLastName="'"+d.getPersonLastName()+"'";
			if(d.getPersonEmail()!=null)
				PersonEmail="'"+d.getPersonEmail()+"'";
			if(d.getPersonTitle()!=null)
				PersonTitle="'"+d.getPersonTitle()+"'";
			if(d.getPersonTelePhone()!=null)
				PersonTelePhone="'"+d.getPersonTelePhone()+"'";
			if(d.getPersonMobile()!=null)
				PersonMobile="'"+d.getPersonMobile()+"'";
			if(d.getPersonAddress()!=null)
				PersonAddress="'"+d.getPersonAddress()+"'";

			database.update("update personals set PersonFirstName="+PersonFirstName+", PersonLastName="+PersonLastName+", PersonEmail= "+PersonEmail+", PersonTitle= "+PersonTitle+", PersonTelePhone= "+PersonTelePhone+", PersonMobile= "+PersonMobile+", PersonAddress="+PersonAddress+" where idPersonals="+d.getIdPersonals());

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}


}
