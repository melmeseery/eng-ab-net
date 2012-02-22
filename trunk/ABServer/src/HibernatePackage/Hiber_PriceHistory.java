package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import tablespackage.Pricegrouphistory;
import tablespackage.Prices;
import tablespackage.Tracks;
public class Hiber_PriceHistory
{
	public ArrayList getPricesHistory(DataSourceConnection database)
	{

		ArrayList<Pricegrouphistory> c=new ArrayList<Pricegrouphistory>();
		try{

			ResultSet l =database.retrieve("select * from pricegrouphistory");
			while(l.next())
		 	{////System.out.println("ana goa el while");
				Pricegrouphistory P=new Pricegrouphistory();
				P.setIdPriceGroupHistory(l.getInt(1));
				P.setPriceGroupHitoryImcCompany(l.getString(2));
				P.setPriceGroupHitoryPulicCompany(l.getString(3));
				P.setPriceGroupHitoryInternational(l.getString(4));
				P.setPriceGroupValidFrom(l.getDate(5));
				P.setPriceGroupValidTo(l.getDate(6));
				P.setPriceGroupValid(l.getBoolean(7));
				P.setCurrency(l.getString(8));
				P.setPriceGroupHitoryImcClient(l.getString(9));
				P.setPriceGroupHitoryPulicClient(l.getString(10));
				c.add(P);
		 	}
			l.close();

		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return c;
	}
/*--------------------------------------------------------------------------------------------*/
	public void insertPriceGroup(Pricegrouphistory d,String validFrom,DataSourceConnection database)
	{
		try{

			String comIMC=null;
			String comPub=null;
			String clientIMC=null;
			String clientPub=null;
			String Inter=null;
			String curr=null;
			if(d.getPriceGroupHitoryImcCompany()!=null)
				comIMC="'"+d.getPriceGroupHitoryImcCompany()+"'";
			if(d.getPriceGroupHitoryPulicCompany()!=null)
				comPub="'"+d.getPriceGroupHitoryPulicCompany()+"'";
			if(d.getPriceGroupHitoryImcClient()!=null)
				clientIMC="'"+d.getPriceGroupHitoryImcClient()+"'";
			if(d.getPriceGroupHitoryPulicClient()!=null)
				clientPub="'"+d.getPriceGroupHitoryPulicClient()+"'";
			if(d.getPriceGroupHitoryInternational()!=null)
				Inter="'"+d.getPriceGroupHitoryInternational()+"'";
			if(d.getCurrency()!=null)
				curr="'"+d.getCurrency()+"'";
			if(validFrom!=null)
				validFrom="'"+validFrom+"'";

			database.update("insert into pricegrouphistory (PriceGroupHitoryIMC_Company,PriceGroupHitoryPulic_Company,PriceGroupHitoryInternational,PriceGroupValidFrom,PriceGroupValid,PriceGroupValidTo,Currency,PriceGroupHitoryIMC_Client,PriceGroupHitoryPulic_Client) values("+comIMC+","+comPub+","+Inter+","+validFrom+","+d.getPriceGroupValid()+","+d.getPriceGroupValidTo()+","+curr+","+clientIMC+","+clientPub+")");

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }
	}

/*--------------------------------------------------------------------------------------------*/
	public Pricegrouphistory getPriceGroupById(Integer id,DataSourceConnection database)
	{
		Pricegrouphistory P=new Pricegrouphistory();
		try{

			ResultSet l =database.retrieve("select * from pricegrouphistory where idPriceGroupHistory="+id);
		 	if(l.next())
		 	{
		 		P.setIdPriceGroupHistory(l.getInt(1));
				P.setPriceGroupHitoryImcCompany(l.getString(2));
				P.setPriceGroupHitoryPulicCompany(l.getString(3));
				P.setPriceGroupHitoryInternational(l.getString(4));
				P.setPriceGroupValidFrom(l.getDate(5));
				P.setPriceGroupValidTo(l.getDate(6));
				P.setCurrency(l.getString(8));
				P.setPriceGroupHitoryImcClient(l.getString(9));
				P.setPriceGroupHitoryPulicClient(l.getString(10));

		 	}
		 	////System.out.println();
		 	l.close();

		}catch(Exception e){e.printStackTrace();
		}

		return P;
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void updatePrice(Pricegrouphistory d,String validFrom,DataSourceConnection database)
	{

		try{

			String comIMC=null;
			String comPub=null;
			String clientIMC=null;
			String clientPub=null;
			String Inter=null;
			String curr=null;
			if(d.getPriceGroupHitoryImcCompany()!=null)
				comIMC="'"+d.getPriceGroupHitoryImcCompany()+"'";
			if(d.getPriceGroupHitoryPulicCompany()!=null)
				comPub="'"+d.getPriceGroupHitoryPulicCompany()+"'";
			if(d.getPriceGroupHitoryImcClient()!=null)
				clientIMC="'"+d.getPriceGroupHitoryImcClient()+"'";
			if(d.getPriceGroupHitoryPulicClient()!=null)
				clientPub="'"+d.getPriceGroupHitoryPulicClient()+"'";
			if(d.getPriceGroupHitoryInternational()!=null)
				Inter="'"+d.getPriceGroupHitoryInternational()+"'";
			if(d.getCurrency()!=null)
				curr="'"+d.getCurrency()+"'";
			if(validFrom!=null)
				validFrom="'"+validFrom+"'";

			database.update("update pricegrouphistory set PriceGroupHitoryIMC_Company="+comIMC+",PriceGroupHitoryPulic_Company="+comPub+", PriceGroupHitoryInternational="+Inter+", PriceGroupValidFrom="+validFrom+",Currency="+curr+",PriceGroupHitoryIMC_Client="+clientIMC+",PriceGroupHitoryPulic_Client="+clientPub+" where idPriceGroupHistory="+d.getIdPriceGroupHistory());

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
	/*----------------------------------------------------------------------------------------*/
	public Integer getValidPriceId(DataSourceConnection database)
	{
		Integer id=0;

		try{

			ResultSet l =database.retrieve("select idPriceGroupHistory from pricegrouphistory  where PriceGroupValid="+true);
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
	public void update(Integer id,DataSourceConnection database)
	{

		try{

			boolean b=false;

			database.update("update pricegrouphistory set PriceGroupValid="+b+" where idPriceGroupHistory="+id);

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
}

