package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.mysql.jdbc.Statement;

import database.DataSourceConnection;


import tablespackage.Courses;
import tablespackage.Trainingcoordinatehistory;
import tablespackage.Trainingcoordinators;

public class Hiber_CoordinateHistory
{
//	public ArrayList getCoordinateHistory()
//	{
//		Trainingcoordinatehistory TC=new Trainingcoordinatehistory();
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
//		 	List l =session.createQuery("from Trainingcoordinatehistory").list();
//		 	for(Iterator it=l.iterator();it.hasNext();)
//		 	{
//		 		Object row = (Object) it.next();
//		 		if (row instanceof Trainingcoordinatehistory) {
//					TC = (Trainingcoordinatehistory) row;
//					Al.add(TC);
//					// //////System.out.println(Al.size());
//
//				}
//
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
	/*----------------------------------------------------------------------------------------------------------*/
	public void insertCoordHistory(Trainingcoordinatehistory c,String TrainingCoordinateHistoryValidFrom,DataSourceConnection database)
	{
		try{

			String TrainingCoordinateHistoryType=null;
			String TrainingCoordinateHistoryValue=null;

			if(c.getTrainingCoordinateHistoryType()!=null)
				TrainingCoordinateHistoryType="'"+c.getTrainingCoordinateHistoryType()+"'";
			if(c.getTrainingCoordinateHistoryValue()!=null)
				TrainingCoordinateHistoryValue="'"+c.getTrainingCoordinateHistoryValue()+"'";
			if(TrainingCoordinateHistoryValidFrom!=null)
				TrainingCoordinateHistoryValidFrom="'"+TrainingCoordinateHistoryValidFrom+"'";

			database.update("insert into trainingcoordinatehistory (TrainingCoordinateHistoryType,TrainingCoordinateHistoryValidFrom,TrainingCoordinateHistoryValue,TrainingCoordinators_idTrainingCoordinators) values("+TrainingCoordinateHistoryType+","+TrainingCoordinateHistoryValidFrom+","+TrainingCoordinateHistoryValue+","+c.getTrainingCoordinators()+")");

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
/*----------------------------------------------------------------------------------------------------------*/

	public ArrayList<Trainingcoordinatehistory> getCoordinatorById(Integer id,DataSourceConnection database)
	{

		ArrayList<Trainingcoordinatehistory> al=new ArrayList<Trainingcoordinatehistory>();
		try{

			ResultSet l =database.retrieve("select * from trainingcoordinatehistory where TrainingCoordinators_idTrainingCoordinators="+id);
			while(l.next())
		 	{
		 			Trainingcoordinatehistory t=new Trainingcoordinatehistory();
		 			t.setIdTrainingCoordinateHistory(l.getInt(1));
		 			t.setTrainingCoordinateHistoryType(l.getString(2));
		 			t.setTrainingCoordinateHistoryValidFrom(l.getDate(3));
		 			t.setTrainingCoordinateHistoryValidTo(l.getDate(4));
		 			t.setTrainingCoordinateHistoryValue(l.getString(6));
		 			t.setTrainingCoordinators(l.getInt(7));
		 			al.add(t);
		 	}
		 	l.close();

		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return al;
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	public Integer getCoordinatorID(String s,Integer Tid,DataSourceConnection database)
	{
		Integer id=0;
		try{

			////System.out.println("select idTrainingCoordinateHistory from Trainingcoordinatehistory where trainingCoordinateHistoryType='"+s+"' and TrainingCoordinators_idTrainingCoordinators="+Tid);
			ResultSet l =database.retrieve("select idTrainingCoordinateHistory from trainingcoordinatehistory where trainingCoordinateHistoryType='"+s+"' and TrainingCoordinators_idTrainingCoordinators="+Tid);
			while(l.next())
		 	{
		 			id=l.getInt(1);
		 	}
		 	l.close();


		}catch(Exception e){e.printStackTrace();
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return id;
	}

/*----------------------------------------------------------------------------------------------------------*/
	public void update(Trainingcoordinatehistory t,Integer id,String date,boolean b,DataSourceConnection database)
	{

		try{

			String type = null;
			String value = null;
			if(date!=null)
				date="'"+date+"'";
			if(t.getTrainingCoordinateHistoryValue()!=null)
				value="'"+t.getTrainingCoordinateHistoryValue()+"'";
			if(t.getTrainingCoordinateHistoryType()!=null)
				type="'"+t.getTrainingCoordinateHistoryType()+"'";
			////System.out.println("update Trainingcoordinatehistory set TrainingCoordinateHistoryValidFrom="+date+" where idTrainingCoordinateHistory="+id);
			if(b==true)
				database.update("update trainingcoordinatehistory set TrainingCoordinateHistoryValidTo="+date+" where idTrainingCoordinateHistory="+id);
			else
				database.update("update trainingcoordinatehistory set TrainingCoordinateHistoryValidFrom="+date+", TrainingCoordinateHistoryType="+type+", TrainingCoordinateHistoryValue="+value+" where idTrainingCoordinateHistory="+id);

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
	/*----------------------------------------------------------------------------------------*/
//	public Integer getLastOne(DataSourceConnection database)
//	{
//		Integer id=0;
//
//		try{
//
//			ResultSet l =database.retrieve("select idTrainingCoordinateHistory from trainingcoordinatehistory");
//			while(l.next())
//		 	{
//		 			id=l.getInt(1);
//		 	}
//		 	l.close();
//
//		}catch(Exception e){
//			// //////System.out.println(e.getMessage());
//		}finally{
//			}
//		return id;
//
//
//	}


}


