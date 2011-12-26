package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


import com.mysql.jdbc.Statement;

import database.DataSourceConnection;


import tablespackage.Clients;
import tablespackage.Personals;
import tablespackage.Suppliers;
import tablespackage.Trainingcoordinators;
import tablespackage.Venues;

public class Hiber_Venus 
{
	public ArrayList<Venues> getVenus(DataSourceConnection database)
	{
		ArrayList<Venues> Al=new ArrayList<Venues>();
		
		try{
			
			ResultSet l =database.retrieve("select * from venues");
			while(l.next())
		 	{
				Venues v=new Venues();
				v.setIdVenues(l.getInt(1));
		 		v.setVenueName(l.getString(2));
		 		v.setVenueAddress(l.getString(3));
		 		v.setVenueDistrict(l.getString(4));
		 		v.setVenuMainContact(l.getString(5));
		 		v.setPersonals(l.getInt(6));
		 		Al.add(v);
		 	}
		 	l.close();
		 	
		 	
		}catch(Exception e){
			
		}finally{
			}
		return Al;
	}
	/*--------------------------------------------------------------------------------------------------*/	
	public Personals getVenuePersonal(Integer id,DataSourceConnection database)
	{
		Personals p=new Personals();
		try{
			
			ResultSet l =database.retrieve("select * from personals where idPersonals= "+id);
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
		
/*---------------------------------------------------------------------------------------*/
	public void insertVenue(Venues c,DataSourceConnection database)
	{
		try{
			
			String VenueName=null;
			String VenueAddress=null;
			String VenueDistrict=null;
			String VenuMainContact=null;
			
			if(c.getVenueName()!=null)
				VenueName="'"+c.getVenueName()+"'";
			if(c.getVenueAddress()!=null)
				VenueAddress="'"+c.getVenueAddress()+"'";
			if(c.getVenueDistrict()!=null)
				VenueDistrict="'"+c.getVenueDistrict()+"'";
			if(c.getVenuMainContact()!=null)
				VenuMainContact="'"+c.getVenuMainContact()+"'";
			
			database.update("insert into venues (VenueName,VenueAddress,VenueDistrict,VenuMainContact,Personals_idPersonals) values("+VenueName+","+VenueAddress+","+VenueDistrict+","+VenuMainContact+","+c.getPersonals()+")");
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }

	}
/*----------------------------------------------------------------------------------------------------------*/
	
	public Venues getVenueById(Integer id,DataSourceConnection database)
	{
		Venues v=new Venues();
		try{
			
			ResultSet l =database.retrieve("select * from venues where idVenues="+id);
		 	if(l.next())
		 	{
		 		v.setIdVenues(l.getInt(1));
		 		v.setVenueName(l.getString(2));
		 		v.setVenueAddress(l.getString(3));
		 		v.setVenueDistrict(l.getString(4));
		 		v.setVenuMainContact(l.getString(5));
		 		v.setPersonals(l.getInt(6));
				
		 	}
		 	////System.out.println();	
		 	l.close();
			
		}catch(Exception e){e.printStackTrace();
		}
	
		return v;
	}	
	
	/*----------------------------------------------------------------------------------------*/
	public Integer getLastOne(DataSourceConnection database)
	{
		Integer id=0;
		
		try{
			
			ResultSet l =database.retrieve("select idVenues from venues");
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
/*----------------------------------------------------------------------------------------------------------*/
	public void updateVenue(Venues c,DataSourceConnection database)
	{
		
		try{
			
			String VenueName=null;
			String VenueAddress=null;
			String VenueDistrict=null;
			String VenuMainContact=null;
			
			if(c.getVenueName()!=null)
				VenueName="'"+c.getVenueName()+"'";
			if(c.getVenueAddress()!=null)
				VenueAddress="'"+c.getVenueAddress()+"'";
			if(c.getVenueDistrict()!=null)
				VenueDistrict="'"+c.getVenueDistrict()+"'";
			if(c.getVenuMainContact()!=null)
				VenuMainContact="'"+c.getVenuMainContact()+"'";
			
			
			
			database.update("update venues set VenueName="+VenueName+", VenueAddress="+VenueAddress+", VenueDistrict= "+VenueDistrict+", VenuMainContact= "+VenuMainContact+" where idVenues="+c.getIdVenues());
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}	
	/*----------------------------------------------------------------------------------------------------------*/
	public void update(Venues c,DataSourceConnection database)
	{
		
		try{
			
			
			database.update("update venues set Personals_idPersonals="+c.getPersonals()+" where idVenues="+c.getIdVenues());
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}		
}
