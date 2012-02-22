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

import tablespackage.Audiencetypes;
import tablespackage.Consultingareas;
import tablespackage.Expensescategories;
import tablespackage.Personals;
import tablespackage.Suppliers;
import tablespackage.Tracks;
import tablespackage.Venues;

public class Hiber_Tracks
{
	public Hiber_Tracks() {
		// TODO Auto-generated constructor stub
	}
	public ArrayList<Tracks> getTracks(DataSourceConnection database)
	{
		ArrayList<Tracks> Al=new ArrayList<Tracks>();

		try{
			// This step will read hibernate.cfg.xml and prepare hibernate for use

			ResultSet l =database.retrieve("select * from tracks");
		 	while(l.next())
		 	{

				Tracks T=new Tracks();
				T.setIdTracks(l.getInt(1));
				T.setTrackName(l.getString(2));
				T.setTrackCode(l.getString(3));
				T.setTrackDuration(l.getInt(4));
				Al.add(T);
		 	}
		 	l.close();


		}catch(Exception e){

		}finally{
			}
		return Al;
	}
	/*---------------------------------------------------------------------------------------*/
	public int insertTrack(Tracks t,DataSourceConnection database)
	{
		int id=0;
		try{

			String name=null;
			String code=null;
			if(t.getTrackName()!=null)
				name="'"+t.getTrackName()+"'";
			if(t.getTrackCode()!=null)
				code="'"+t.getTrackCode()+"'";
			database.update("insert into tracks (TrackName,TrackCode) values("+name+","+code+")");

			ResultSet l =database.retrieve("select idTracks from tracks where TrackName="+name + " And TrackCode="+code);
			while(l.next())
		 	{
		 			id=l.getInt(1);
		 	}
		 	l.close();


		}
		  catch (Exception e) {// e.printStackTrace();

	      }  finally {

	      }
		return id;
	}

	/*----------------------------------------------------------------------------------------------------------*/
	public Tracks getTrackById(Integer id,DataSourceConnection database)
	{
		Tracks T=new Tracks();
		try{

			ResultSet l =database.retrieve("select * from tracks where idTracks="+id);
		 	if(l.next())
		 	{
		 		T.setIdTracks(l.getInt(1));
				T.setTrackName(l.getString(2));
				T.setTrackCode(l.getString(3));
		 	}
		 	////System.out.println();
		 	l.close();

		}catch(Exception e){e.printStackTrace();
		}
		return T;
	}
	/*----------------------------------------------------------------------------------------*/
	public Integer getTrackId(Tracks t, DataSourceConnection database)
	{
		Integer id=0;

		try{


			String name=null;
			String code=null;
			if(t.getTrackName()!=null)
				name="'"+t.getTrackName()+"'";
			if(t.getTrackCode()!=null)
				code="'"+t.getTrackCode()+"'";
//			database.update("insert into tracks (TrackName,TrackCode) values("+name+","+code+")");

			ResultSet l =database.retrieve("select idTracks from tracks where TrackName="+name + " And TrackCode="+code);
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
//	public Integer getLastOne(DataSourceConnection database)
//	{
//		Integer id=0;
//
//		try{
//
//			ResultSet l =database.retrieve("select idTracks from tracks");
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
//
//
//	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void updateTrack(Tracks t,DataSourceConnection database)
	{

		try{

			String name=null;
			String code=null;
			if(t.getTrackName()!=null)
				name="'"+t.getTrackName()+"'";
			if(t.getTrackCode()!=null)
				code="'"+t.getTrackCode()+"'";
			database.update("update tracks set trackName="+name+",trackCode="+code+",trackDuration="+t.getTrackDuration()+" where idTracks="+t.getIdTracks());

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}

}
