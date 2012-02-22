package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;



import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import abItemsShow.PersonalShow;
import tablespackage.Clients;
import tablespackage.Courses;
import tablespackage.Personals;
import tablespackage.Pricegrouphistory;

public class Hiber_Clients
{
	public ArrayList<Clients> getClients(DataSourceConnection database, HttpServletRequest request)
	{
		ArrayList<Clients> Al=new ArrayList<Clients>();

		try{

			String q = "";
			for (int s = 0; s < 1; s++) {
				String[] filterType = request.getParameterValues("filter[" + s
						+ "][data][type]");
				// ////  //  //  ////System.out.println(filterType+ " "+s+" "+filterType[0]);
				if (filterType != null) {

						String[] filter = request.getParameterValues("filter[" + s
								+ "][field]");

						for (int i = 0; i < filter.length; i++) {

							String[] values = request.getParameterValues("filter["
									+ s + "][data][value]");


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

								q = q + " (clientName like '" + upperCase+remain
										+ "%' or clientName like '" + lowerCase+remain
										+ "%')";


						}
					//}
				}
			}
			if (!q.equals(""))
				q = " where" + q;
			ResultSet l = database.retrieve("select * from clients"+q);
		 	while(l.next())
		 	{
		 		Clients DS=new Clients();
				DS.setIdClients(l.getInt(1));
		 		DS.setClientName(l.getString(2));
		 		DS.setClientApp(l.getString(3));
		 		DS.setClientColor(l.getString(4));
		 		DS.setClientApproachDate(l.getDate(5));
		 		DS.setClientWorkDate(l.getDate(6));
		 		DS.setClientMain(l.getInt(7));
		 		DS.setClientApproachPerson(l.getString(8));
		 		DS.setClientInfo(l.getString(9));
		 		DS.setClientAddress(l.getString(10));
		 		Al.add(DS);
		 	}
		 	l.close();


		}catch(Exception e){

		}finally{
			}
		return Al;
	}
	/*--------------------------------------------------------------------------------------------------*/
	public Personals getClientPersonal(Integer id,DataSourceConnection database)
	{
		Personals p=new Personals();
		try{

			ResultSet l = database.retrieve("select * from personals where idPersonals= "+id);
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


		}catch(Exception e){//e.printStackTrace();

		}finally{
			}
		return p;
	}

/*--------------------------------------------------------------------------------------------------*/

	public int insertClient(Clients c,String appDate,String workDate,DataSourceConnection database)
	{
		int id=0;

		try{

			String clientName=null;
			String clientApp=null;
			String clientColor=null;
			String ClientApproachPerson=null;
			String ClientInfo=null;
			String ClientAddress=null;

			if(c.getClientName()!=null)
				clientName="'"+c.getClientName()+"'";
			if(c.getClientApp()!=null)
				clientApp="'"+c.getClientApp()+"'";
			if(c.getClientColor()!=null)
				clientColor="'"+c.getClientColor()+"'";
			if(c.getClientApproachPerson()!=null)
				ClientApproachPerson="'"+c.getClientApproachPerson()+"'";
			if(c.getClientInfo()!=null)
				ClientInfo="'"+c.getClientInfo()+"'";
			if(c.getClientAddress()!=null)
				ClientAddress="'"+c.getClientAddress()+"'";
			if(workDate!=null)
				workDate="'"+workDate+"'";
			if(appDate!=null)
				appDate="'"+appDate+"'";

			database.update("insert into clients (clientName,clientApp,clientColor,ClientApproachDate,ClientWorkDate,ClientApproachPerson,ClientInfo,ClientAddress) values("+clientName+","+clientApp+","+clientColor+","+appDate+","+workDate+","+ClientApproachPerson+","+ClientInfo+","+ClientAddress+")");




			ResultSet l =database.retrieve("select idClients from clients where clientName="+clientName+" And clientApp="+clientApp);
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
/*----------------------------------------------------------------------------------------------------------*/
	public Clients getClientById(Integer id,DataSourceConnection database)
	{
		Clients DS=new Clients();
		try{

			ResultSet l =database.retrieve("select * from clients where idClients="+id);
		 	if(l.next())
		 	{
		 		DS.setIdClients(l.getInt(1));
		 		DS.setClientName(l.getString(2));
		 		DS.setClientApp(l.getString(3));
		 		DS.setClientColor(l.getString(4));
		 		DS.setClientApproachDate(l.getDate(5));
		 		DS.setClientWorkDate(l.getDate(6));
		 		DS.setClientMain(l.getInt(7));
		 		DS.setClientApproachPerson(l.getString(8));
		 		DS.setClientInfo(l.getString(9));
		 		DS.setClientAddress(l.getString(10));

		 	}
		 	////System.out.println();
		 	l.close();

		}catch(Exception e){e.printStackTrace();
		}


		return DS;
	}

	/*----------------------------------------------------------------------------------------------------------*/
	public Integer getPer(Integer id,DataSourceConnection database)
	{
		Integer ids=0;
		try{

			ResultSet l =database.retrieve("select Personals_idPersonals from venues where idVenues="+id);
			while(l.next())
		 	{
				ids=l.getInt(1);

		 	}
		 	l.close();


		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return ids;
	}
/*------------------------insert Relation-----------------------------------*/

	public void insertMMPersonal(Integer id,Integer p,DataSourceConnection database)
	{
		try{


			database.update("insert into clientpersonal (ClientsPersonal_idClients,ClientPersonals_idPersonals) values("+id+","+p+")");

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
	/*----------------------------------------------------------------------------------------------------------*/

	public Integer getClientId(DataSourceConnection database, Clients c){
		Integer id=0;

		try{


			String clientName=null;
			String clientApp=null;


			if(c.getClientName()!=null)
				clientName="'"+c.getClientName()+"'";
			if(c.getClientApp()!=null)
				clientApp="'"+c.getClientApp()+"'";



			ResultSet l =database.retrieve("select idClients from clients where  clientName="+clientName+" AND clientApp="+clientApp+" ");
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
	/*----------------------------------------------------------------------------------------*/
//	public Integer getLastOne(DataSourceConnection database)
//	{
//		Integer id=0;
//
//		try{
//
//			ResultSet l =database.retrieve("select idClients from clients");
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
/*-------------------------------------------------------------------------------------------*/
	public void update(Clients c,DataSourceConnection database)
	{
		try{


			database.update("update clients set ClientMain_idPersonals="+c.getClientMain()+" where idClients="+c.getIdClients());

			////System.out.println("updated successfully"+"update clients set ClientMain_idPersonals="+c.getClientMain()+" where idClients="+c.getIdClients());
		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void updateClient(Clients c,String workDate,String appDate,DataSourceConnection database)
	{

		try{

			String clientName=null;
			String clientApp=null;
			String clientColor=null;
			String ClientApproachPerson=null;
			String ClientInfo=null;
			String ClientAddress=null;

			if(c.getClientName()!=null)
				clientName="'"+c.getClientName()+"'";
			if(c.getClientApp()!=null)
				clientApp="'"+c.getClientApp()+"'";
			if(c.getClientColor()!=null)
				clientColor="'"+c.getClientColor()+"'";
			if(c.getClientApproachPerson()!=null)
				ClientApproachPerson="'"+c.getClientApproachPerson()+"'";
			if(c.getClientInfo()!=null)
				ClientInfo="'"+c.getClientInfo()+"'";
			if(c.getClientAddress()!=null)
				ClientAddress="'"+c.getClientAddress()+"'";
			if(workDate!=null)
				workDate="'"+workDate+"'";
			if(appDate!=null)
				appDate="'"+appDate+"'";


			database.update("update clients set ClientName="+clientName+", ClientApp="+clientApp+", ClientColor= "+clientColor+", ClientApproachDate= "+appDate+", ClientWorkDate= "+workDate+", ClientApproachPerson= "+ClientApproachPerson+", ClientInfo="+ClientInfo+",ClientAddress="+ClientAddress+" where idClients="+c.getIdClients());

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
}
