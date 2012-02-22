package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;

import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import abItemsShow.TeamShow;
import tablespackage.Courses;
import tablespackage.Pricegrouphistory;
import tablespackage.Teammembers;
import tablespackage.Teams;
import tablespackage.Trackcourses;
import tablespackage.Trainingcoordinators;

public class Hiber_Coordinators
{

	SimpleDateFormat s = new SimpleDateFormat("dd-MMM-yyyy", Locale.US);

	public Hiber_Coordinators() {
		// TODO Auto-generated constructor stub
	}
	public ArrayList<Trainingcoordinators> getCoordinators(DataSourceConnection database)
	{
		ArrayList<Trainingcoordinators> Al=new ArrayList<Trainingcoordinators>();

		try{

			ResultSet l =database.retrieve("select * from trainingcoordinators where TrainingCoordinatorDeleted = 0 ");
		 	while(l.next())
		 	{
		 		Trainingcoordinators TC=new Trainingcoordinators();
				TC.setIdTrainingCoordinators(l.getInt(1));
				TC.setTrainingCoordinateFirstName(l.getString(2));
				TC.setTrainingCoordinateAbb(l.getString(3));
				TC.setTrainingCoordinateLastName(l.getString(4));
				TC.setTrainingCoordinateHireDate(l.getDate(5));
				TC.setTrainingCoordinateBirthDate(l.getDate(6));
				TC.setTrainingCoordinateDescription(l.getString(7));
				TC.setTrainingCoordinateColor(l.getString(8));
				TC.setTrainingCoordinateAddress(l.getString(9));
				TC.setTrainingCoordinateEmail(l.getString(10));
				TC.setTrainingCoordinateTelephone(l.getString(11));
				TC.setTrainingCoordinateMobile(l.getString(12));
				TC.setTrainingCoordinatorResignationDate(l.getDate(13));
				TC.setTrainingCoordinatorCurrentSalary(l.getString(14));
				TC.setTrainingCoordinatorCurrentTitle(l.getString(15));
				TC.setTrainingCoordinatorCV(l.getString(18));
				//TC.setManDay(l.getInt(16));
				Al.add(TC);
		 	}
		 	l.close();


		}catch(Exception e){e.printStackTrace();
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return Al;
	}
/*---------------------------------------------------------------------------------------*/
	public String getYear(Integer id,DataSourceConnection database)
	{
		String years=new String();
		try{

			ResultSet l =database.retrieve("select EventDayDate from eventday where EventDayContract="+id);
			while(l.next())
		 	{
		 			Date d=l.getDate(1);
		 			String s=d.toString();
		 			years=s.substring(0,4);
		 		//	//System.out.println("year= "+y);
		 			//years.add(y);
		 	}
		 	l.close();


		}catch(Exception e){
			//System.out.println(e.getMessage());
		}finally{
			}
		return years;
	}
/*---------------------------------------------------------------------------------------*/
	public Integer insertCoordinator(Trainingcoordinators c,String TrainingCoordinateHireDate,String TrainingCoordinateBirthDate,DataSourceConnection database)
	{
		Integer id=0;
		try{

			String TrainingCoordinateFirstName=null;
			String TrainingCoordinateAbb=null;
			String TrainingCoordinateLastName=null;
			String TrainingCoordinateDescription=null;
			String TrainingCoordinateColor=null;
			String TrainingCoordinateAddress=null;
			String TrainingCoordinateEmail=null;
			String TrainingCoordinateTelephone=null;
			String TrainingCoordinateMobile=null;
			String TrainingCoordinateCV=null;

			if(c.getTrainingCoordinateFirstName()!=null)
				TrainingCoordinateFirstName="'"+c.getTrainingCoordinateFirstName()+"'";
			if(c.getTrainingCoordinateAbb()!=null)
				TrainingCoordinateAbb="'"+c.getTrainingCoordinateAbb()+"'";
			if(c.getTrainingCoordinateLastName()!=null)
				TrainingCoordinateLastName="'"+c.getTrainingCoordinateLastName()+"'";
			if(c.getTrainingCoordinateDescription()!=null)
				TrainingCoordinateDescription="'"+c.getTrainingCoordinateDescription()+"'";
			if(c.getTrainingCoordinateColor()!=null)
				TrainingCoordinateColor="'"+c.getTrainingCoordinateColor()+"'";
			if(c.getTrainingCoordinateAddress()!=null)
				TrainingCoordinateAddress="'"+c.getTrainingCoordinateAddress()+"'";
			if(c.getTrainingCoordinateEmail()!=null)
				TrainingCoordinateEmail="'"+c.getTrainingCoordinateEmail()+"'";
			if(c.getTrainingCoordinateTelephone()!=null)
				TrainingCoordinateTelephone="'"+c.getTrainingCoordinateTelephone()+"'";
			if(c.getTrainingCoordinateMobile()!=null)
				TrainingCoordinateMobile="'"+c.getTrainingCoordinateMobile()+"'";
			if(TrainingCoordinateBirthDate!=null)
				TrainingCoordinateBirthDate="'"+TrainingCoordinateBirthDate+"'";
			if(TrainingCoordinateHireDate!=null)
				TrainingCoordinateHireDate="'"+TrainingCoordinateHireDate+"'";
			if(c.getTrainingCoordinatorCV()!=null)
				TrainingCoordinateCV="'"+c.getTrainingCoordinatorCV()+"'";

			database.update("insert into trainingcoordinators (TrainingCoordinateFirstName,TrainingCoordinateAbb,TrainingCoordinateLastName,TrainingCoordinateDescription,TrainingCoordinateColor,TrainingCoordinateAddress,TrainingCoordinateEmail,TrainingCoordinateTelephone,TrainingCoordinateMobile,TrainingCoordinateHireDate,TrainingCoordinateBirthDate,TrainingCoordinatorCV) values("+TrainingCoordinateFirstName+","+TrainingCoordinateAbb+","+TrainingCoordinateLastName+","+TrainingCoordinateDescription+","+TrainingCoordinateColor+","+TrainingCoordinateAddress+","+TrainingCoordinateEmail+","+TrainingCoordinateTelephone+","+TrainingCoordinateMobile+","+TrainingCoordinateHireDate+","+TrainingCoordinateBirthDate+","+TrainingCoordinateCV+")");


			ResultSet l =database.retrieve("select idTrainingCoordinators from trainingcoordinators  where TrainingCoordinateFirstName="+TrainingCoordinateFirstName+" And TrainingCoordinateAbb="+TrainingCoordinateAbb+"  And TrainingCoordinateLastName="+TrainingCoordinateLastName);


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
//	public Integer getLastOne(DataSourceConnection database)
//	{
//		Integer id=0;
//
//		try{
//
//			ResultSet l =database.retrieve("select idTrainingCoordinators from trainingcoordinators");
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

/*----------------------------------------------------------------------------------------------------------*/
	public ArrayList<Integer> getCourseCoordinators(Integer id,DataSourceConnection database)
	{
		ArrayList<Integer> ids=new ArrayList<Integer>();
		//Integer counter=0;
		try{
			Calendar cal = Calendar.getInstance();
			ResultSet l =database.retrieve("select Courses_idCourses,idContractCourse from contractcourse where TrainingCoordinators_idTrainingCoordinators="+id+" and ContractCourseStatus != 9;");
			while(l.next())
		 	{



				ResultSet courseDays_rs = database
						.retrieve("select EventDayDayId from eventday where EventDayContractCourseId = "
								+ l.getString(2) + ";");

				while (courseDays_rs.next()) {

					ResultSet days_rs = database
							.retrieve("select Date from days where DayId = "
									+ courseDays_rs.getString(1) + ";");

					if (days_rs.next()) {


						if (Integer.parseInt(s.format(cal.getTime()).substring(
								7, 11)) == Integer.parseInt(days_rs
								.getString(1).substring(0, 4)))
							{
							Integer i=l.getInt(1);
					 		ids.add(i);
					 		days_rs.close();
					 		break;
							}

					}

					days_rs.close();

				}
				courseDays_rs.close();




		 	}
		 	l.close();

		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return ids;
	}
/*----------------------------------------------------------------------------------------------------------*/

	public Trainingcoordinators getCoordinatorById(Integer id,DataSourceConnection database)
	{
		Trainingcoordinators TC=new Trainingcoordinators();
		try{

			ResultSet l =database.retrieve("select * from trainingcoordinators where idTrainingCoordinators="+id);
			while(l.next())
			 {
				//Trainingcoordinators TC=new Trainingcoordinators();
				TC.setIdTrainingCoordinators(l.getInt(1));
				TC.setTrainingCoordinateFirstName(l.getString(2));
				TC.setTrainingCoordinateAbb(l.getString(3));
				TC.setTrainingCoordinateLastName(l.getString(4));
				TC.setTrainingCoordinateHireDate(l.getDate(5));
				TC.setTrainingCoordinateBirthDate(l.getDate(6));
				TC.setTrainingCoordinateDescription(l.getString(7));
				TC.setTrainingCoordinateColor(l.getString(8));
				TC.setTrainingCoordinateAddress(l.getString(9));
				TC.setTrainingCoordinateEmail(l.getString(10));
				TC.setTrainingCoordinateTelephone(l.getString(11));
				TC.setTrainingCoordinateMobile(l.getString(12));
				TC.setTrainingCoordinatorResignationDate(l.getDate(13));
				TC.setTrainingCoordinatorCurrentSalary(l.getString(14));
				TC.setTrainingCoordinatorCurrentTitle(l.getString(15));
				TC.setTrainingCoordinatorCV(l.getString(18));
			 }
			 l.close();

	}catch(Exception e){
		// //////System.out.println(e.getMessage());
	}finally{
		}
		return TC;
	}
/*----------------------------------------------------------------------------------------------------------*/
	public ArrayList<Teams> getTeams(DataSourceConnection database)
	{
		ArrayList<Teams> Al=new ArrayList<Teams>();

		try{

			ResultSet l =database.retrieve("select * from teams");
		 	while(l.next())
		 	{
		 		Teams TC=new Teams();
				TC.setTeamsid(l.getInt(1));
				TC.setTeamsName(l.getString(2));
				Al.add(TC);
		 	}
		 	l.close();


		}catch(Exception e){
		}finally{
			}
		return Al;
	}
	/*---------------------------------------------------------------------------------------*/
	public void insertCoordinatorTeam(Teams t,DataSourceConnection database)
	{
		try{

			database.update("insert into teams (TeamsName) values('"+t.getTeamsName()+"')");

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }
	}
/*------------------------------------------------------------------------------------*/
	public ArrayList<Teammembers> getCIDs(Integer id,DataSourceConnection database)
	{
		ArrayList<Teammembers> al=new ArrayList<Teammembers>();

		try{

			ResultSet l =database.retrieve("select * from teammembers where Teamid="+id);
			while(l.next())
			 {
				Teammembers t=new Teammembers();
				t.setIdTeammembers(l.getInt(3));
				t.setMemberid(l.getInt(2));
				t.setTeamid(l.getInt(1));
				al.add(t);
			 }
			 l.close();

	}catch(Exception e){
		// //////System.out.println(e.getMessage());
	}finally{
		}
		return al;
	}
/*------------------------------------------------------------------------------------*/
	public ArrayList<Trainingcoordinators> getC(ArrayList ids,DataSourceConnection database)
	{
		ArrayList<Trainingcoordinators> al=new ArrayList<Trainingcoordinators>();

		try{

			String s="select * from trainingcoordinators where idTrainingCoordinators Not IN (";
			for(int i=0;i<ids.size();i++)
			{
				s+=ids.get(i);
				if(i!=ids.size()-1)
					s+=',';
			//	else
				//	s+=')';
			}
			s+=')';
			//System.out.println(s);
			ResultSet l =database.retrieve(s);
		 	while(l.next())
		 	{
		 		Trainingcoordinators TC=new Trainingcoordinators();
				TC.setIdTrainingCoordinators(l.getInt(1));
				TC.setTrainingCoordinateFirstName(l.getString(2));
				TC.setTrainingCoordinateAbb(l.getString(3));
				TC.setTrainingCoordinateLastName(l.getString(4));
				TC.setTrainingCoordinateHireDate(l.getDate(5));
				TC.setTrainingCoordinateBirthDate(l.getDate(6));
				TC.setTrainingCoordinateDescription(l.getString(7));
				TC.setTrainingCoordinateColor(l.getString(8));
				TC.setTrainingCoordinateAddress(l.getString(9));
				TC.setTrainingCoordinateEmail(l.getString(10));
				TC.setTrainingCoordinateTelephone(l.getString(11));
				TC.setTrainingCoordinateMobile(l.getString(12));
				TC.setTrainingCoordinatorCurrentSalary(l.getString(14));
				TC.setTrainingCoordinatorCurrentTitle(l.getString(15));
				TC.setTrainingCoordinatorCV(l.getString(18));
				al.add(TC);
		 	}

		 	l.close();

		}catch(Exception e){e.printStackTrace();
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return al;
	}

/*----------------------------------------------------------------------------------------------------------*/

	public Teams getTeamById(Integer id,DataSourceConnection database)
	{
		Teams TC=new Teams();
		try{

			ResultSet l =database.retrieve("select * from teams where Teamsid="+id);
			while(l.next())
			 {
				TC.setTeamsid(l.getInt(1));
				TC.setTeamsName(l.getString(2));

			 }
			 l.close();

	}catch(Exception e){
		// //////System.out.println(e.getMessage());
	}finally{
		}
		return TC;
	}
	///////////////////////////////////////////////////////////////////////////////////
	public Boolean checkCoordinator(Integer id, Integer id2,DataSourceConnection database)
	{
		Boolean flag=true;

		try{

			ResultSet l =database.retrieve("select * from teammembers where Teamid="+id2+ " and Memberid="+id);
			while(l.next())
			 {
				flag=false;
			 }
			 l.close();

			}catch(Exception e){
				// //////System.out.println(e.getMessage());
			}finally{
		}
		return flag;
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void insertCoor(ArrayList<Teammembers> c,DataSourceConnection database)
	{
		for(int i=0;i<c.size();i++)
		{
			try{

				////System.out.println("insert into teammembers (Teamid,Memberid) values("+c.get(i).getTeamid()+","+c.get(i).getMemberid()+")");
				database.update("insert into teammembers (Teamid,Memberid) values("+c.get(i).getTeamid()+","+c.get(i).getMemberid()+")");

			}
			  catch (Exception e) { e.printStackTrace();

		      }  finally {

		      }
		}

	}

	/*----------------------------------------------------------------------------------------------------------*/
	public void update(Trainingcoordinators t,boolean b,DataSourceConnection database)
	{

		try{

		//	//System.out.println("update Trainingcoordinatehistory set TrainingCoordinateHistoryValidFrom="+date+" where idTrainingCoordinateHistory="+id);
			String salary=null;
			String title=null;
			if(t.getTrainingCoordinatorCurrentSalary()!=null)
				salary="'"+t.getTrainingCoordinatorCurrentSalary()+"'";
			if(t.getTrainingCoordinatorCurrentTitle()!=null)
				title="'"+t.getTrainingCoordinatorCurrentTitle()+"'";
			if(b)
			{
				database.update("update trainingcoordinators set TrainingCoordinatorCurrentSalary="+salary+" where idTrainingCoordinators="+t.getIdTrainingCoordinators());
				////System.out.println("update trainingcoordinators set TrainingCoordinatorCurrentSalary="+salary+" where idTrainingCoordinators="+t.getIdTrainingCoordinators());
			}
			else
				database.update("update trainingcoordinators set TrainingCoordinatorCurrentTitle="+title+" where idTrainingCoordinators="+t.getIdTrainingCoordinators());



		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void updateC(Integer id,String type,DataSourceConnection database)
	{

		try{

			if(type.equals("Salary"))
			{
				////System.out.println("update trainingcoordinators set TrainingCoordinatorCurrentSalary=null where idTrainingCoordinators="+id);
				database.update("update trainingcoordinators set TrainingCoordinatorCurrentSalary=null where idTrainingCoordinators="+id);
			}
			else if(type.equals("Title"))
			{
				////System.out.println("update trainingcoordinators set TrainingCoordinatorCurrentTitle=null where idTrainingCoordinators="+id);
				database.update("update trainingcoordinators set TrainingCoordinatorCurrentTitle=null where idTrainingCoordinators="+id);
			}

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void updateCoordinator(Trainingcoordinators c,String TrainingCoordinateBirthDate,String TrainingCoordinateHireDate,String Resign,DataSourceConnection database)
	{

		try{

			String TrainingCoordinateFirstName=null;
			String TrainingCoordinateAbb=null;
			String TrainingCoordinateLastName=null;
			String TrainingCoordinateDescription=null;
			String TrainingCoordinateColor=null;
			String TrainingCoordinateAddress=null;
			String TrainingCoordinateEmail=null;
			String TrainingCoordinateTelephone=null;
			String TrainingCoordinateMobile=null;
			String TrainingCoordinateCV=null;
			if(c.getTrainingCoordinateFirstName()!=null)
				TrainingCoordinateFirstName="'"+c.getTrainingCoordinateFirstName()+"'";
			if(c.getTrainingCoordinateAbb()!=null)
				TrainingCoordinateAbb="'"+c.getTrainingCoordinateAbb()+"'";
			if(c.getTrainingCoordinateLastName()!=null)
				TrainingCoordinateLastName="'"+c.getTrainingCoordinateLastName()+"'";
			if(c.getTrainingCoordinateDescription()!=null)
				TrainingCoordinateDescription="'"+c.getTrainingCoordinateDescription()+"'";
			if(c.getTrainingCoordinateColor()!=null)
				TrainingCoordinateColor="'"+c.getTrainingCoordinateColor()+"'";
			if(c.getTrainingCoordinateAddress()!=null)
				TrainingCoordinateAddress="'"+c.getTrainingCoordinateAddress()+"'";
			if(c.getTrainingCoordinateEmail()!=null)
				TrainingCoordinateEmail="'"+c.getTrainingCoordinateEmail()+"'";
			if(c.getTrainingCoordinateTelephone()!=null)
				TrainingCoordinateTelephone="'"+c.getTrainingCoordinateTelephone()+"'";
			if(c.getTrainingCoordinateMobile()!=null)
				TrainingCoordinateMobile="'"+c.getTrainingCoordinateMobile()+"'";
			if(TrainingCoordinateBirthDate!=null)
				TrainingCoordinateBirthDate="'"+TrainingCoordinateBirthDate+"'";
			if(TrainingCoordinateHireDate!=null)
				TrainingCoordinateHireDate="'"+TrainingCoordinateHireDate+"'";
			if(Resign!=null)
				Resign="'"+Resign+"'";
			if(c.getTrainingCoordinatorCV()!=null)
				TrainingCoordinateCV="'"+c.getTrainingCoordinatorCV()+"'";
			database.update("update trainingcoordinators set TrainingCoordinateFirstName="+TrainingCoordinateFirstName+",TrainingCoordinateAbb="+TrainingCoordinateAbb+",TrainingCoordinateLastName="+TrainingCoordinateLastName+",TrainingCoordinateHireDate="+TrainingCoordinateHireDate+",TrainingCoordinateBirthDate="+TrainingCoordinateBirthDate+",TrainingCoordinateDescription="+TrainingCoordinateDescription+",TrainingCoordinateColor="+TrainingCoordinateColor+",TrainingCoordinateAddress="+TrainingCoordinateAddress+",TrainingCoordinateEmail="+TrainingCoordinateEmail+",TrainingCoordinateTelephone="+TrainingCoordinateTelephone+",TrainingCoordinateMobile="+TrainingCoordinateMobile+",TrainingCoordinatorResignationDate="+Resign+", TrainingCoordinatorCV="+	TrainingCoordinateCV+" where idTrainingCoordinators="+c.getIdTrainingCoordinators());

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
/*-------------------------------------------------------------------------------------------*/
	public void updateTeams(Teams t,DataSourceConnection database)
	{

		try{

			database.update("update teams set TeamsName='"+t.getTeamsName()+"' where Teamsid="+t.getTeamsid());

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}

}
