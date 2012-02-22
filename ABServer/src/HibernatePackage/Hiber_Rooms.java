package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import abItemsShow.PersonalShow;


import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import tablespackage.Courses;
import tablespackage.Datashows;
import tablespackage.Datashowsmaintainance;
import tablespackage.Personals;
import tablespackage.Rooms;
import tablespackage.Venues;

public class Hiber_Rooms
{
/*----------------------------------------------------------------------------------------------------------*/

	public ArrayList<Rooms> getRoomsById(Integer id,DataSourceConnection database)
	{

		ArrayList<Rooms> al=new ArrayList<Rooms>();
		try{

			ResultSet l =database.retrieve("select * from rooms where Room_idVenues="+id);
			while(l.next())
			 {
				Rooms r=new Rooms();
				r.setIdRooms(l.getInt(1));
				r.setRoomCapacity(l.getInt(2));
				r.setRoomNumber(l.getInt(3));
				r.setRoomValidFrom(l.getDate(5));
				r.setRoom(l.getInt(6));
				r.setRoomValidTo(l.getDate(8));
				al.add(r);
			 }
			 l.close();


		}catch(Exception e){
		}finally{
			}
		return al;
	}
	/*---------------------------------------------------------------------------------------*/
	public void insertRoom(Rooms p,String validFrom,DataSourceConnection database)
	{
		try{

			if(validFrom!=null)
				validFrom="'"+validFrom+"'";
			database.update("insert into rooms (RoomCapacity,RoomNumber,RoomValidFrom,Room_idVenues,RoomValid) values("+p.getRoomCapacity()+","+p.getRoomNumber()+","+validFrom+","+p.getRoom()+","+p.getRoomValid()+")");

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
	/*----------------------------------------------------------------------------------------*/
	public Integer getValidRoomId(int idvenue, DataSourceConnection database)
	{
		Integer id=0;

		try{

			ResultSet l =database.retrieve("select idRooms from rooms where RoomValid=true and Room_idVenues="+ idvenue);
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
/*-----------------------------------------------------------------------------*/
	public Rooms getRoomById(Integer id,DataSourceConnection database)
	{
		Rooms p=new Rooms();

		try{

				ResultSet l =database.retrieve("select * from rooms where idRooms="+id);
				while(l.next())
				 {
					p.setIdRooms(l.getInt(1));
					p.setRoomCapacity(l.getInt(2));
					p.setRoomNumber(l.getInt(3));
					p.setRoomValidFrom(l.getDate(5));
					p.setRoom(l.getInt(6));
					p.setRoomValidTo(l.getDate(8));
				 }
				 l.close();

		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return p;
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void update(Integer rid,String validTo,DataSourceConnection database)
	{

		try{

			database.update("update rooms set RoomValidTo='"+validTo+"',RoomValid=false where idRooms="+rid);

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
/*----------------------------------------------------------------------------------------------------------*/
	public void updateRoom(Rooms r,String validFrom,String validTo,DataSourceConnection database)
	{

		try{

			if(validFrom!=null)
				validFrom="'"+validFrom+"'";
			if(validTo!=null)
				validTo="'"+validTo+"'";
			database.update("update rooms set RoomCapacity="+r.getRoomCapacity()+",RoomNumber="+r.getRoomNumber()+",RoomValidFrom="+validFrom+",RoomValidTo="+validTo+",RoomValid=+"+r.getRoomValid()+" where idRooms="+r.getIdRooms());

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}

}
