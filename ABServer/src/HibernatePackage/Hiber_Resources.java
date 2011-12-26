package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import tablespackage.Competencesaddressed;
import tablespackage.Resources;

public class Hiber_Resources 
{
	public Hiber_Resources(){}
	
	public ArrayList<Resources> getResources(DataSourceConnection database)
	{
		ArrayList<Resources> Al=new ArrayList<Resources>();
		
		try{
			
			ResultSet l =database.retrieve("select * from resources");
			while(l.next())
			{
				Resources r=new Resources();
				r.setIdResources(l.getInt(1));
				r.setResourceFirstName(l.getString(2));
				r.setResourceLastName(l.getString(3));
				Al.add(r);
		 	}
		 	l.close();	
		 	
	       
		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return Al;
	}
/*----------------------------------------------------------------------------------------------------------*/
	
	public Resources getRById(Integer id,DataSourceConnection database)
	{
		Resources r=new Resources();
		
		try{
			
			ResultSet l =database.retrieve("select * from resources where idResources="+id);
		 	while(l.next())
		 	{
		 		r.setIdResources(l.getInt(1));
		 		r.setResourceFirstName(l.getString(2));
		 		r.setResourceLastName(l.getString(3));
										
		 	}
		 	
		}catch(Exception e){e.printStackTrace();
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return r;
	}	

}
