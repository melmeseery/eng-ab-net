package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import tablespackage.Courses;
import tablespackage.Datashowsmaintainance;
import tablespackage.Prices;

public class Hiber_Prices 
{
/*----------------------------------------------------------------------------------------------------------*/
	
	public ArrayList<Prices> getPricesById(Integer id,DataSourceConnection database)
	{
		ArrayList<Prices> al=new ArrayList<Prices>();
		
		try{
				
				ResultSet l =database.retrieve("select * from prices where Courses_idCourses="+id);
				while(l.next())
				 {
					Prices p=new Prices();
					p.setIdPrices(l.getInt(1));
					p.setPriceImcCompany(l.getString(2));
					p.setPricePublicCompany(l.getString(3));
					p.setPriceInternational(l.getString(4));
					p.setPriceValidFrom(l.getDate(5));
					p.setPriceValid(l.getBoolean(6));
					p.setCourses(l.getInt(8));
					p.setCurrency(l.getString(9));
					p.setPriceImcClient(l.getString(10));
					p.setPricePublicClient(l.getString(11));
					al.add(p);
				 }
				 l.close();
				 
		}catch(Exception e){e.printStackTrace();
			// //////System.out.println(e.getMessage());
		}finally{
			}
		
		return al;
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void insertPrice(Prices d,String validFrom,DataSourceConnection database)
	{
		try{
			
			String comIMC=null;
			String comPub=null;
			String clientIMC=null;
			String clientPub=null;
			String Inter=null;
			String curr=null;
			if(d.getPriceImcCompany()!=null)
				comIMC="'"+d.getPriceImcCompany()+"'";
			if(d.getPricePublicCompany()!=null)
				comPub="'"+d.getPricePublicCompany()+"'";
			if(d.getPriceImcClient()!=null)
				clientIMC="'"+d.getPriceImcClient()+"'";
			if(d.getPricePublicClient()!=null)
				clientPub="'"+d.getPricePublicClient()+"'";
			if(d.getPriceInternational()!=null)
				Inter="'"+d.getPriceInternational()+"'";
			if(d.getCurrency()!=null)
				curr="'"+d.getCurrency()+"'";
			if(validFrom!=null)
				validFrom="'"+validFrom+"'";
			
			String s="insert into prices (PriceIMC_Company,PricePublic_Company,PriceInternational,PriceValidFrom,PriceValid,PriceValidTo,Courses_idCourses,courseColor,Currency,PriceIMC_Client,PricePublic_Client) values("+comIMC+","+comPub+","+Inter+","+validFrom+","+d.getPriceValid()+","+d.getPriceValidTo()+","+d.getCourses()+","+curr+","+clientIMC+","+clientPub+")";
			
			database.update("insert into prices (PriceIMC_Company,PricePublic_Company,PriceInternational,PriceValidFrom,PriceValid,PriceValidTo,Courses_idCourses,Currency,PriceIMC_Client,PricePublic_Client) values("+comIMC+","+comPub+","+Inter+","+validFrom+","+d.getPriceValid()+","+d.getPriceValidTo()+","+d.getCourses()+","+curr+","+clientIMC+","+clientPub+")");
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
		
		
	}	
	/*----------------------------------------------------------------------------------------*/
	public Integer getLastOne(Integer id1,DataSourceConnection database)
	{
		Integer id=0;
		
		try{
			
			ResultSet l =database.retrieve("select idPrices from prices where Courses_idCourses= "+id1);
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
	public void updatePrice(Prices d,String validFrom,DataSourceConnection database)
	{
		
		try{
			
			String comIMC=null;
			String comPub=null;
			String clientIMC=null;
			String clientPub=null;
			String Inter=null;
			String curr=null;
			if(d.getPriceImcCompany()!=null)
				comIMC="'"+d.getPriceImcCompany()+"'";
			if(d.getPricePublicCompany()!=null)
				comPub="'"+d.getPricePublicCompany()+"'";
			if(d.getPriceImcClient()!=null)
				clientIMC="'"+d.getPriceImcClient()+"'";
			if(d.getPricePublicClient()!=null)
				clientPub="'"+d.getPricePublicClient()+"'";
			if(d.getPriceInternational()!=null)
				Inter="'"+d.getPriceInternational()+"'";
			if(d.getCurrency()!=null)
				curr="'"+d.getCurrency()+"'";
			if(validFrom!=null)
				validFrom="'"+validFrom+"'";
			
			database.update("update prices set PriceIMC_Company="+comIMC+",PricePublic_Company="+comPub+", PriceInternational="+Inter+", PriceValidFrom="+validFrom+", Courses_idCourses="+d.getCourses()+",Currency="+curr+",PriceIMC_Client="+clientIMC+",PricePublic_Client="+clientPub+" where idPrices="+d.getIdPrices());
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}	
/*----------------------------------------------------------------------------------------------------------*/
	public void update(Integer id,DataSourceConnection database)
	{
		
		try{
			
			boolean b=false;
		
			database.update("update prices set PriceValid="+b+" where idPrices="+id);
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}		
}
