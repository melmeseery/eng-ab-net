/**
 *
 */
package database;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.struts.action.ActionServlet;

/**org.apache.commons.dbcp.BasicDataSource
 * @author Noha
 *
 */
public class DataSourceConnection {

	private javax.sql.DataSource dataSource;

	Connection conn = null;

	Statement stmt = null;

	ResultSet rs = null;

	public void initializeConnecton(ActionServlet servlet) {

		dataSource = (javax.sql.DataSource) servlet.getServletContext().getAttribute("abDB");
		try {
			conn = dataSource.getConnection();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public ResultSet retrieve(String query) {

		try {

			////System.out.println(query);
			if (conn.isClosed())
				conn = dataSource.getConnection();
			stmt = conn.createStatement();

			rs = stmt.executeQuery(query);

			/**
			 * Here we put field 4 (the name) and field 7 (the city) in the
			 * customerList:
			 */
			// rs.close();
		} catch (SQLException e) {

			System.err
					.println("SQL Exception occured while accessing the table");
			e.printStackTrace();
			return null;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return rs;
	}

	//////////////////////////////////////////////////////////////////////////////////////////
	public void update(String query) {
		      ////System.out.println(query);

		int rowId = 0;

		try {
			if (conn.isClosed())
				conn = dataSource.getConnection();
			stmt = conn.createStatement();
			rowId = stmt.executeUpdate(query);

		} catch (SQLException e) {
			System.err
					.println("SQL Exception occured while accessing the table");
			e.printStackTrace();

		} catch (Exception e) {
			e.printStackTrace();

		}
		//return rowId;
	}

	public void finalize() throws Throwable {

		if (rs != null)
			rs.close();

		if (stmt != null)
			stmt.close();

		if (conn != null)
			if (!conn.isClosed())
				conn.close();


		super.finalize();
	}
}