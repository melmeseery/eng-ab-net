/**
 *
 */
package abItems;

import java.awt.Color;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import com.lowagie.text.Cell;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Table;
import com.lowagie.text.pdf.PdfWriter;

import abItemsShow.ContractsShow;
import abItemsShow.CoursesShow;
import actions.GeneralActions;
import mypackage.Upload;

import database.DataSourceConnection;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
/**
 * @author noha
 *
 */



public class Contracts {
  static Logger logger = Logger.getLogger(Contracts.class);
	SimpleDateFormat s = new SimpleDateFormat("dd-MMM-yyyy", Locale.US);

	public ArrayList retreiveAcceptedContracts(DataSourceConnection database)
			throws SQLException, ParseException {

		ResultSet rs = database
				.retrieve("SELECT* FROM contracts where ContractStatus  > 2 and Deleted = 0;");

		ArrayList<ContractsShow> Show = new ArrayList<ContractsShow>();
		while (rs != null && rs.next()) {

			ContractsShow e = new ContractsShow();

			e.setContractId(Integer.parseInt(rs.getString(1)));

			String q = "select ContractCoursePayPrice from contractcourse where Contracts_idContracts = "
					+ rs.getString(1) + " and ContractCourseStatus != 9;";

			ResultSet contractCourses_rs = database.retrieve(q);

			while (contractCourses_rs.next()) {

				e.setContractTotalPrice(e.getContractTotalPrice()
						+ contractCourses_rs.getInt(1));

			}
			contractCourses_rs.close();

			ResultSet clientName_rs = database
					.retrieve("select ClientName from clients where idClients = "
							+ rs.getString(5) + ";");
			if (clientName_rs.next()) {
				String clientName = clientName_rs.getString(1);
				e.setClientName(clientName);

			}
			clientName_rs.close();

			e.setContractNumber(rs.getString(3));
			String dat = "";
			if (rs.getString(13) != null && !rs.getString(13).equals("")) {
				dat = s.format(GeneralActions.parseDateToRequiredDate(rs
						.getString(13)));
				e.setContractStartDate(dat);
			}
			if (rs.getString(14) != null && !rs.getString(14).equals("")) {
				dat = s.format(GeneralActions.parseDateToRequiredDate(rs
						.getString(14)));
				e.setContractEndDate(dat);
			}

			ResultSet status_rs = database
					.retrieve("SELECT ContractStatusName from contractstatus where idContractStatus = "
							+ rs.getString(18));
			if (status_rs.next())
				e.setContractStatus(status_rs.getString(1));

			status_rs.close();

			e.setContractName(rs.getString(4));
			e.setProgressHistory(rs.getString(33));
			e.setContractFee(Integer.parseInt(rs.getString(19)));
			if (rs.getString(7).equals("1"))
				e.setContractFundType("Funded By IMC");
			else {
				e.setContractFundType("Not Funded");
				// // ////System.out.println(rs.getString(16));
				if (rs.getString(16).equals("1"))
					e.setContractRateType("International");
				else if (rs.getString(16).equals("2"))
					e.setContractRateType("Local");
				else if (rs.getString(16).equals("3"))
					e.setContractRateType("Other");
			}
			e.setProposalID(rs.getString(2));
			if (rs.getString(6).equals(1))
				e.setContractProactiveType("Proactive");
			else
				e.setContractProactiveType("Reactive");

			if (rs.getString(10) != null && !rs.getString(10).equals("")) {
				dat = s.format(GeneralActions.parseDateToRequiredDate(rs
						.getString(10)));
				e.setContractDateOfRequest(dat);
			} else
				e.setContractDateOfRequest(null);

			if (rs.getString(11) != null && !rs.getString(11).equals("")) {
				dat = s.format(GeneralActions.parseDateToRequiredDate(rs
						.getString(11)));
				e.setContractFirstStartDate(dat);
			} else
				e.setContractFirstStartDate(null);
			if (rs.getString(12) != null && !rs.getString(12).equals("")) {
				dat = s.format(GeneralActions.parseDateToRequiredDate(rs
						.getString(12)));
				e.setContractFirstEndDate(dat);
			} else
				e.setContractFirstEndDate(null);

			q = "";
			if (rs.getString(25).equals("Resources"))
				q = "select ResourceFirstName,ResourceLastName from resources where idResources = "
						+ rs.getInt(32) + ";";

			else if (rs.getString(25).equals("TrainingCoordinators"))
				q = "select TrainingCoordinateFirstName,TrainingCoordinateLastName from trainingcoordinators where idTrainingCoordinators = "
						+ rs.getInt(32) + ";";

			else if (rs.getString(25).equals("Users"))
				q = "select UserUsername from users where idUsers = "
						+ rs.getInt(32) + ";";

			if (!q.equals("")) {
				ResultSet contractDealPerson_rs = database.retrieve(q);
				if (contractDealPerson_rs.next()) {
					if (rs.getString(25).equals("Users"))
						e.setContractDealPerson(contractDealPerson_rs
								.getString(1));
					else
						e.setContractDealPerson(contractDealPerson_rs
								.getString(1)
								+ " " + contractDealPerson_rs.getString(2));

				}
				contractDealPerson_rs.close();
			} else
				e.setContractDealPerson(rs.getString(25));

			Show.add(e);

		}
		rs.close();
		return Show;

	}

	////////////////////////////////////////////////////////////////////////////
	// ///////////////////////////

	public ArrayList retreivePendingContracts(DataSourceConnection database)
			throws SQLException, ParseException {

		ResultSet rs = database
				.retrieve("SELECT* FROM contracts where ContractStatus  <= 2 and Deleted = 0;");

		// rs.last();
		// // ////System.out.println(rs.getRow());
		//
		// rs.beforeFirst();
		String clientName = "";
		ArrayList<ContractsShow> Show = new ArrayList<ContractsShow>();
		while (rs.next()) {

			ContractsShow e = new ContractsShow();
			// //// // // ////System.out.println("contract id ---->
			// "+c.getIdContracts());
			e.setContractId(Integer.parseInt(rs.getString(1)));

			ResultSet clientName_rs = database
					.retrieve("select ClientName from clients where idClients = "
							+ rs.getString(5) + ";");
			if (clientName_rs.next()) {
				clientName = clientName_rs.getString(1);
				e.setClientName(clientName);

			}
			clientName_rs.close();

			String q = "select ContractCoursePayPrice from contractcourse where Contracts_idContracts = "
					+ rs.getString(1) + " and ContractCourseStatus != 9;";

			ResultSet contractCourses_rs = database.retrieve(q);

			while (contractCourses_rs.next()) {

				e.setContractTotalPrice(e.getContractTotalPrice()
						+ contractCourses_rs.getInt(1));

			}
			contractCourses_rs.close();

			e.setContractNumber(rs.getString(3));
			e.setProgressHistory(rs.getString(33));
			String dat = "";
			if (rs.getString(13) != null && !rs.getString(13).equals("")) {
				dat = s.format(rs.getString(13));
				e.setContractStartDate(dat);
			}
			if (rs.getString(14) != null && !rs.getString(14).equals("")) {
				dat = s.format(rs.getString(14));
				e.setContractEndDate(dat);
			}

			ResultSet status_rs = database
					.retrieve("SELECT ContractStatusName from contractstatus where idContractStatus = "
							+ rs.getString(18));
			if (status_rs.next())
				e.setContractStatus(status_rs.getString(1));

			status_rs.close();

			e.setContractName(rs.getString(4));
			e.setContractFee(Integer.parseInt(rs.getString(19)));
			if (rs.getString(7).equals("1"))
				e.setContractFundType("Funded By IMC");
			else {
				e.setContractFundType("Not Funded");
				// // ////System.out.println(rs.getString(16));
				if (rs.getString(16).equals("1"))
					e.setContractRateType("International");
				else if (rs.getString(16).equals("2"))
					e.setContractRateType("Local");
				else if (rs.getString(16).equals("3"))
					e.setContractRateType("Other");
			}
			e.setProposalID(rs.getString(2));
			if (rs.getString(6).equals(1))
				e.setContractProactiveType("Proactive");
			else
				e.setContractProactiveType("Reactive");

			if (rs.getString(10) != null && !rs.getString(10).equals("")) {
				dat = s.format(GeneralActions.parseDateToRequiredDate(rs
						.getString(10)));
				e.setContractDateOfRequest(dat);
			} else
				e.setContractDateOfRequest(null);

			if (rs.getString(11) != null && !rs.getString(11).equals("")) {
				dat = s.format(GeneralActions.parseDateToRequiredDate(rs
						.getString(11)));
				e.setContractFirstStartDate(dat);
			} else
				e.setContractFirstStartDate(null);
			if (rs.getString(12) != null && !rs.getString(12).equals("")) {
				dat = s.format(GeneralActions.parseDateToRequiredDate(rs
						.getString(12)));
				e.setContractFirstEndDate(dat);
			} else
				e.setContractFirstEndDate(null);
			q = "";
			if (rs.getString(25).equals("Resources"))
				q = "select ResourceFirstName,ResourceLastName from resources where idResources = "
						+ rs.getInt(32) + ";";

			else if (rs.getString(25).equals("TrainingCoordinators"))
				q = "select TrainingCoordinateFirstName,TrainingCoordinateLastName from trainingcoordinators where idTrainingCoordinators = "
						+ rs.getInt(32) + ";";

			else if (rs.getString(25).equals("Users"))
				q = "select UserUsername from users where idUsers = "
						+ rs.getInt(32) + ";";

			if (!q.equals("")) {
				ResultSet contractDealPerson_rs = database.retrieve(q);
				if (contractDealPerson_rs.next()) {
					if (rs.getString(25).equals("Users"))
						e.setContractDealPerson(contractDealPerson_rs
								.getString(1));
					else
						e.setContractDealPerson(contractDealPerson_rs
								.getString(1)
								+ " " + contractDealPerson_rs.getString(2));

				}
				contractDealPerson_rs.close();
			} else
				e.setContractDealPerson(rs.getString(25));
			Show.add(e);

		}
		rs.close();
		return Show;

	}

	////////////////////////////////////////////////////////////////////////////
	// ///////////////////////////

	public void addNewContract(DataSourceConnection database,
			HttpServletRequest request) throws SQLException, ParseException {

		int contractRate = 0;
		int venueLocation = 0;
		int venueArrangmentRes = 0;
		int venueCostRes = 0;
		Integer coordinatorTeam = null;
		Integer individualCoordinator = null;
		String tsd = null;
		String ted = null;
		String progressHistory = null;

		// ///// intialize the above variables///////////////
		if (Integer.parseInt(request.getParameter("fund")) == 1)
			contractRate = 0;
		else
			contractRate = Integer.parseInt(request
					.getParameter("contractRate"));
		if (request.getParameter("contractVenueLocation") != null
				&& !request.getParameter("contractVenueLocation").equals("")) {
			venueLocation = Integer.parseInt(request
					.getParameter("contractVenueLocation"));
		} else
			venueLocation = 0;

		if (request.getParameter("contractVenueArrangment") != null
				&& !request.getParameter("contractVenueArrangment").equals("")) {
			venueArrangmentRes = Integer.parseInt(request
					.getParameter("contractVenueArrangment"));
		} else
			venueArrangmentRes = 0;

		if (request.getParameter("venueCostRes") != null
				&& !request.getParameter("venueCostRes").equals("")) {
			venueCostRes = Integer.parseInt(request
					.getParameter("venueCostRes"));
		} else
			venueCostRes = 0;

		if (request.getParameter("coordinatorselection") != null
				&& !request.getParameter("coordinatorselection").equals("")) {
			if (Integer.parseInt(request.getParameter("coordinatorselection")) == 1)
				individualCoordinator = Integer.parseInt(request
						.getParameter("coordinatorindividual"));
			else if (Integer.parseInt(request
					.getParameter("coordinatorselection")) == 2)
				coordinatorTeam = Integer.parseInt(request
						.getParameter("coordinatorteam"));

		}

		if (!request.getParameter("tentativeStart").equals(""))
			tsd = "'" + request.getParameter("tentativeStart") + "'";
		if (!request.getParameter("tentativeEnd").equals(""))
			ted = "'" + request.getParameter("tentativeEnd") + "'";

		if (!request.getParameter("progressHistory").equals(""))
			progressHistory = "'" + request.getParameter("progressHistory")
					+ "'";

		// //insert new row to the database///////////////
		database
				.update("INSERT INTO contracts (ContractName,ContractFee,Contract_idClients,ContractDateOfRequest"
						+ ",ContractDealPersonType,ContractDealPersonTypeId,ContractProposalID,"
						+ "ContractFirstStartDate,ContractFirstEndDate,"
						+ "ContractProactiveType,ContractFundType,"
						+ "ContractRateType,ContractVenueLocation,"
						+ "ContractVenueArrangmentRes,ContractVenueCostRes"
						+ ",ContractPriceNote,ContractGroupPrice,"
						+ "Contract_idTrainingCoordinators,ContractCoordinatorTeam,"
						+ "ContractStatus,Deleted,ContractProgressHistory) VALUES ('"
						+ request.getParameter("clientname")
						+ "-"
						+ request.getParameter("proposalid")
						+ "',0,"
						+ request.getParameter("clientname")
						+ ",'"
						+ request.getParameter("requestDate")
						+ "','"
						+ request.getParameter("contractdealpersontype")
						+ "',"
						+ request.getParameter("contractdealpersontypeid")
						+ ",'"
						+ request.getParameter("proposalid")
						+ "',"
						+ tsd
						+ ","
						+ ted
						+ ","
						+ request.getParameter("contractProactive")
						+ ","
						+ request.getParameter("fund")
						+ ","
						+ contractRate
						+ ","
						+ venueLocation
						+ ","
						+ venueArrangmentRes
						+ ","
						+ venueCostRes
						+ ",'"
						+ request.getParameter("contractPriceNote")
						+ "',"
						+ request.getParameter("contractgroupPrice")
						+ ","
						+ individualCoordinator
						+ ","
						+ coordinatorTeam
						+ ",1,0," + progressHistory + ");");

	}

	////////////////////////////////////////////////////////////////////////////
	// ///////////////////////////

	public void editContract(DataSourceConnection database,
			HttpServletRequest request, String contractId) throws SQLException,
			ParseException {

		int contractRate = 0;
		int venueLocation = 0;
		int venueArrangmentRes = 0;
		int venueCostRes = 0;
		Integer coordinatorTeam = null;
		Integer individualCoordinator = null;

		String clientProposalRecievingDate = null;
		String clientProposalApprovingDate = null;

		String proposalId = "";

		String tsd = null;
		String ted = null;
		String progressHistory = null;

		int status = 1;

		proposalId = request
		.getParameter("proposalid");

		ResultSet contract_rs = database
				.retrieve("select ContractStatus from contracts where idContracts = "
						+ contractId);

		if (contract_rs.next()) {

			status = contract_rs.getInt(1);


		}

		contract_rs.close();

		if (Integer.parseInt(request.getParameter("fund")) == 1)
			contractRate = 0;
		else
			contractRate = Integer.parseInt(request
					.getParameter("contractRate"));
		if (request.getParameter("contractVenueLocation") != null
				&& !request.getParameter("contractVenueLocation").equals("")) {
			venueLocation = Integer.parseInt(request
					.getParameter("contractVenueLocation"));
		} else
			venueLocation = 0;

		if (request.getParameter("contractVenueArrangment") != null
				&& !request.getParameter("contractVenueArrangment").equals("")) {
			venueArrangmentRes = Integer.parseInt(request
					.getParameter("contractVenueArrangment"));
		} else
			venueArrangmentRes = 0;

		if (request.getParameter("venueCostRes") != null
				&& !request.getParameter("venueCostRes").equals("")) {
			venueCostRes = Integer.parseInt(request
					.getParameter("venueCostRes"));
		} else
			venueCostRes = 0;

		if (request.getParameter("coordinatorselection") != null
				&& !request.getParameter("coordinatorselection").equals("")) {
			if (Integer.parseInt(request.getParameter("coordinatorselection")) == 1) {
				individualCoordinator = Integer.parseInt(request
						.getParameter("coordinatorindividual"));

			} else if (Integer.parseInt(request
					.getParameter("coordinatorselection")) == 2) {
				coordinatorTeam = Integer.parseInt(request
						.getParameter("coordinatorteam"));

			}

		}

		if (!request.getParameter("clientReceiveDate").equals("")) {

			clientProposalRecievingDate = "'"
					+ request.getParameter("clientReceiveDate") + "'";
		}

		if (!request.getParameter("clientApproveDate").equals("")) {

			clientProposalApprovingDate = "'"
					+ request.getParameter("clientApproveDate") + "'";
		}

		if (!request.getParameter("clientReceiveDate").equals("")
				&& !request.getParameter("clientApproveDate").equals("")) {

			ResultSet contractCount_rs = database
					.retrieve("SELECT* FROM contracts where ContractStatus  > 2 and Deleted = 0;");

			int counter = 0;
			if (contractCount_rs.last() && status <= 2)
				counter = contractCount_rs.getRow() + 1;
			else
				counter = contractCount_rs.getRow();

			contractCount_rs.close();

			String contractCounter = "000";

			if (counter < 10) {
				if (counter == 0)
					counter = counter + 1;
				contractCounter = "00" + counter;
			} else if (counter < 100)
				contractCounter = "0" + counter;
			else
				contractCounter = "" + counter;

			String DATE_FORMAT_NOW = "yyyy-MM-dd";
			SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT_NOW);
			Calendar cal = Calendar.getInstance();

			proposalId = "Tr_Cont-"
					+ contractCounter
					+ "/"
					+ sdf.format(cal.getTime()).substring(2, 4)
					+ "/"
					+ proposalId.substring(proposalId.lastIndexOf("/") + 1,
							proposalId.length());

			status = 3;

		}

		else if (!request.getParameter("clientReceiveDate").equals("")
				&& request.getParameter("clientApproveDate").equals("")) {

			ResultSet proposalCount_rs = database
					.retrieve("SELECT* FROM contracts where ContractStatus  <= 2 and Deleted = 0;");

			int counter = 0;
			if (proposalCount_rs.last())
				counter = proposalCount_rs.getRow();

			proposalCount_rs.close();

			String proposalCounter = "000";

			if (counter < 10) {
				if (counter == 0)
					counter = counter + 1;
				proposalCounter = "00" + counter;
			} else if (counter < 100)
				proposalCounter = "0" + counter;
			else
				proposalCounter = "" + counter;

			String DATE_FORMAT_NOW = "yyyy-MM-dd";
			SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT_NOW);
			Calendar cal = Calendar.getInstance();

			proposalId = "Tr_Pro-"
					+ proposalCounter
					+ "/"
					+ sdf.format(cal.getTime()).substring(2, 4)
					+ "/"
					+ proposalId.substring(proposalId.lastIndexOf("/") + 1,
							proposalId.length());

			status = 2;

		}

		if (!request.getParameter("tentativeStart").equals(""))
			tsd = "'" + request.getParameter("tentativeStart") + "'";
		if (!request.getParameter("tentativeEnd").equals(""))
			ted = "'" + request.getParameter("tentativeEnd") + "'";

		if (!request.getParameter("progressHistory").equals(""))
			progressHistory = "'" + request.getParameter("progressHistory")
					+ "'";

		// //update the contract in the database///////////////
		database.update("UPDATE contracts SET ContractProposalID = '"
				+ proposalId + "',ContractAcceptDate = "
				+ clientProposalApprovingDate
				+ ",ContractProposalReceiveDate = "
				+ clientProposalRecievingDate + ",ContractName = '"
				+ request.getParameter("clientname") + "-" + proposalId
				+ "',Contract_idClients = "
				+ request.getParameter("clientname")
				+ ",ContractDateOfRequest = '"
				+ request.getParameter("requestDate")
				+ "',ContractDealPersonType = '"
				+ request.getParameter("contractdealpersontype")
				+ "',ContractDealPersonTypeId = "
				+ request.getParameter("contractdealpersontypeid")
				+ ",ContractFirstStartDate = " + tsd
				+ ",ContractFirstEndDate = " + ted + ","
				+ "ContractProactiveType = "
				+ request.getParameter("contractProactive")
				+ ",ContractFundType = " + request.getParameter("fund") + ","
				+ "ContractRateType = " + contractRate
				+ ",ContractVenueLocation = " + venueLocation + ","
				+ "ContractVenueArrangmentRes = " + venueArrangmentRes
				+ ",ContractVenueCostRes = " + venueCostRes
				+ ",ContractPriceNote = '"
				+ request.getParameter("contractPriceNote")
				+ "',ContractFee = " + request.getParameter("contractfee")
				+ ",ContractGroupPrice = "
				+ request.getParameter("contractgroupPrice") + ","
				+ "Contract_idTrainingCoordinators = " + individualCoordinator
				+ ",ContractCoordinatorTeam = " + coordinatorTeam
				+ ",ContractStatus = " + status + ",ContractProgressHistory = "
				+ progressHistory + " where idContracts = " + contractId + ";");

		if (request.getParameter("coordinatorselection") != null
				&& !request.getParameter("coordinatorselection").equals("")) {
			if (Integer.parseInt(request.getParameter("coordinatorselection")) == 1) {
				setContractCoursesCoordinator(database, true, contractId,
						individualCoordinator);

			} else if (Integer.parseInt(request
					.getParameter("coordinatorselection")) == 2) {
				setContractCoursesCoordinator(database, false, contractId, 0);

			}

		}

	}

	////////////////////////////////////////////////////////////////////////////
	// ////////////////

	public void deleteContract(DataSourceConnection database,
			HttpServletRequest request) throws SQLException {

		if (request.getParameterValues("ids").length == 1) {

			ResultSet contractCourse_rs = database
					.retrieve("select* from contractcourse where Contracts_idContracts = "
							+ request.getParameterValues("ids")[0]);

			while (contractCourse_rs.next()) {

				database
						.update("DELETE FROM eventday WHERE EventDayContractCourseId = "
								+ contractCourse_rs.getString(1));

			}
			contractCourse_rs.close();
			database
					.update("DELETE FROM contractcourse WHERE Contracts_idContracts = "
							+ request.getParameterValues("ids")[0]);

			database
					.update("UPDATE contracts SET Deleted = 1 where idContracts = "
							+ request.getParameterValues("ids")[0] + ";");

		} else if (request.getParameterValues("ids").length > 1) {
			for (int i = 0; i < request.getParameterValues("ids").length; i++) {

				ResultSet contractCourse_rs = database
						.retrieve("select* from contractcourse where Contracts_idContracts = "
								+ request.getParameterValues("ids")[i]);

				while (contractCourse_rs.next()) {

					database
							.update("DELETE FROM eventday WHERE EventDayContractCourseId = "
									+ contractCourse_rs.getString(1));

				}
				contractCourse_rs.close();

				database
						.update("DELETE FROM contractcourse WHERE Contracts_idContracts = "
								+ request.getParameterValues("ids")[i]);

				database
						.update("UPDATE contracts SET Deleted = 1 where idContracts = "
								+ request.getParameterValues("ids")[i] + ";");

			}
		}

		String query = "";

		if (request.getParameter("contstatus").equals("proposal"))
			query = "select* from contracts where Deleted = 0 and ContractStatus <= 2";
		else if (request.getParameter("contstatus").equals("contract"))
			query = "select* from contracts where Deleted = 0 and ContractStatus > 2";

		ResultSet contracts_rs = database.retrieve(query);

		String contractCounter = "000";

		String DATE_FORMAT_NOW = "yyyy-MM-dd";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT_NOW);
		Calendar cal = Calendar.getInstance();

		String proposalId = "";
		int counter = 1;

		while (contracts_rs.next()) {

			if (counter < 10) {

				contractCounter = "00" + counter;
			} else if (counter < 100)
				contractCounter = "0" + counter;
			else
				contractCounter = "" + counter;

			proposalId = contracts_rs.getString(2);

			proposalId = proposalId.substring(0, proposalId.indexOf("-") + 1)
					+ contractCounter
					+ "/"
					+ sdf.format(cal.getTime()).substring(2, 4)
					+ "/"
					+ proposalId.substring(proposalId.lastIndexOf("/") + 1,
							proposalId.length());

			database.update("UPDATE contracts SET ContractProposalID = '"
					+ proposalId + "' WHERE idContracts = "
					+ contracts_rs.getString(1));

			counter++;
		}

		contracts_rs.close();

	}

	////////////////////////////////////////////////////////////////////////////
	// ////////////////
	public String generateProposalId(DataSourceConnection database, int clientId)
			throws SQLException {

		String DATE_FORMAT_NOW = "yyyy-MM-dd";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT_NOW);
		Calendar cal = Calendar.getInstance();
		String proposalId = sdf.format(cal.getTime());

		ResultSet proposalCount_rs = database
				.retrieve("SELECT* FROM contracts where ContractStatus  <= 2 and Deleted = 0;");

		int counter = 0;
		if (proposalCount_rs.last())
			counter = proposalCount_rs.getRow() + 1;

		proposalCount_rs.close();

		String proposalCounter = "000";

		if (counter < 10) {

			if (counter == 0)
				counter = counter + 1;
			proposalCounter = "00" + counter;
		} else if (counter < 100)
			proposalCounter = "0" + counter;
		else
			proposalCounter = "" + counter;

		ResultSet rs = database
				.retrieve("SELECT ClientApp FROM clients where idClients = "
						+ clientId);

		if (rs.next())
			proposalId = "Tr_Pro-" + proposalCounter + "/"
					+ proposalId.substring(2, 4) + "/" + rs.getString(1);

		return proposalId;
	}

	////////////////////////////////////////////////////////////////////////////
	// ////////////////
	public String retreiveContractPrice(DataSourceConnection database,
			String priceType) throws SQLException {

		String price = "0";

		ResultSet rs = database
				.retrieve("SELECT* from pricegrouphistory where PriceGroupValid = 1");

		if (rs.next()) {

			if (priceType.equals("A")) {

				price = rs.getString(2);
			}

			else if (priceType.equals("B")) {

				price = rs.getString(9);

			} else if (priceType.equals("C")) {

				price = rs.getString(3);

			} else if (priceType.equals("D")) {

				price = rs.getString(10);

			} else if (priceType.equals("E")) {

				price = rs.getString(4);

			}

		}

		return price;
	}

	////////////////////////////////////////////////////////////////////////////
	// /////////////////////////////
	public String retreiveCoursePrice(DataSourceConnection database,
			String priceType, String courseID) throws SQLException {

		String price = "0";

		ResultSet rs = database
				.retrieve("SELECT* from prices where Courses_idCourses ="
						+ courseID + " and PriceValid=1");

		if (rs.next()) {

			if (priceType.equals("A")) {

				price = rs.getString(2);
			}

			else if (priceType.equals("B")) {

				price = rs.getString(10);

			} else if (priceType.equals("C")) {

				price = rs.getString(3);

			} else if (priceType.equals("D")) {

				price = rs.getString(11);

			} else if (priceType.equals("E")) {

				price = rs.getString(4);

			}

		}

		return price;
	}

	////////////////////////////////////////////////////////////////////////////
	// //////////
	public ArrayList retreiveContractById(DataSourceConnection database,
			int contractId) throws SQLException, ParseException {

		ResultSet rs = database
				.retrieve("SELECT* FROM contracts where idContracts = "
						+ contractId);
		ArrayList<ContractsShow> Show = new ArrayList<ContractsShow>();
		if (rs.next()) {

			ContractsShow e = new ContractsShow();

			e.setContractId(rs.getInt(1));

			String q = "select ContractCoursePayPrice from contractcourse where Contracts_idContracts = "
					+ contractId + " and ContractCourseStatus != 9;";

			ResultSet contractCourses_rs = database.retrieve(q);

			while (contractCourses_rs.next()) {

				e.setContractTotalPrice(e.getContractTotalPrice()
						+ contractCourses_rs.getInt(1));

			}
			contractCourses_rs.close();
			q = "select ClientName from clients where idClients = "
					+ rs.getInt(5) + ";";

			ResultSet clientName_rs = database.retrieve(q);
			if (clientName_rs.next())
				e.setClientName(clientName_rs.getString(1));
			clientName_rs.close();
			e.setClientId(rs.getInt(5));

			e.setContractPriceNote(rs.getString(26));
			e.setProgressHistory(rs.getString(33));
			if (rs.getString(15) != null) {

				q = "select TrainingCoordinateFirstName,TrainingCoordinateLastName from trainingcoordinators where idTrainingCoordinators = "
						+ rs.getInt(15) + ";";

				ResultSet coordinatorName_rs = database.retrieve(q);
				if (coordinatorName_rs.next())
					e.setCoordinatorName(coordinatorName_rs.getString(1) + " "
							+ coordinatorName_rs.getString(2));
				coordinatorName_rs.close();
				e.setCoordinatorId(rs.getInt(15));
			}
			if (rs.getString(27) != null) {
				e.setCoordinatorTeamId(rs.getInt(27));
				q = "select TeamsName from teams where Teamsid = "
						+ rs.getInt(27) + ";";

				ResultSet coordinatorsTeamName_rs = database.retrieve(q);
				if (coordinatorsTeamName_rs.next())
					e.setCoordinatorTeam(coordinatorsTeamName_rs.getString(1));
				coordinatorsTeamName_rs.close();
			}

			e.setContractFundType(rs.getString(7));

			e.setContractProactiveType(rs.getString(6));

			ResultSet status_rs = database
					.retrieve("SELECT ContractStatusName from contractstatus where idContractStatus = "
							+ rs.getString(18));
			if (status_rs.next())
				e.setContractStatus(status_rs.getString(1));

			status_rs.close();

			e.setContractVenueLocation(rs.getInt(30));
			e.setContractVenueArrangment(rs.getInt(28));
			e.setVenueCostRes(rs.getInt(29));

			e.setContractRateType(rs.getString(16));

			if (rs.getString(25).equals("Resources"))
				q = "select ResourceFirstName,ResourceLastName from resources where idResources = "
						+ rs.getInt(32) + ";";

			else if (rs.getString(25).equals("TrainingCoordinators"))
				q = "select TrainingCoordinateFirstName,TrainingCoordinateLastName from trainingcoordinators where idTrainingCoordinators = "
						+ rs.getInt(32) + ";";

			else if (rs.getString(25).equals("Users"))
				q = "select UserUsername from users where idUsers = "
						+ rs.getInt(32) + ";";

			if (!q.equals("")) {
				ResultSet contractDealPerson_rs = database.retrieve(q);
				if (contractDealPerson_rs.next()) {
					if (rs.getString(25).equals("Users"))
						e.setContractDealPerson(contractDealPerson_rs
								.getString(1));
					else
						e.setContractDealPerson(contractDealPerson_rs
								.getString(1)
								+ " " + contractDealPerson_rs.getString(2));

				}
				contractDealPerson_rs.close();
			}

			e.setContractDealPersonType(rs.getString(25));
			e.setContractDealPersonTypeId(rs.getInt(32));

			e.setProposalID(rs.getString(2));

			String dat = s.format(GeneralActions.parseDateToRequiredDate(rs
					.getString(10)));
			e.setRequestDate(dat);

			if (rs.getString(12) != null) {
				dat = s.format(GeneralActions.parseDateToRequiredDate(rs
						.getString(12)));
				e.setTentativeEndDate(dat);
			}

			if (rs.getString(11) != null) {
				dat = s.format(GeneralActions.parseDateToRequiredDate(rs
						.getString(11)));
				e.setTentativeStartDate(dat);
			}

			if (rs.getString(8) != null) {
				dat = s.format(GeneralActions.parseDateToRequiredDate(rs
						.getString(8)));
				e.setClientReceiveDate(dat);
			} else
				e.setClientReceiveDate("");

			if (rs.getString(9) != null) {
				dat = s.format(GeneralActions.parseDateToRequiredDate(rs
						.getString(9)));
				e.setClientApproveDate(dat);
			} else
				e.setClientApproveDate("");

			e.setContractPrice(rs.getInt(23));
			Show.add(e);

		}
		rs.close();
		return Show;

	}

	////////////////////////////////////////////////////////////////////////////
	// //////////
	public ArrayList retreiveContractCourses(DataSourceConnection database,
			int contractId) throws SQLException, ParseException {

		ResultSet rs = database
				.retrieve("select* from contractcourse where Contracts_idContracts = "
						+ contractId);
		ArrayList<CoursesShow> Show = new ArrayList<CoursesShow>();
		while (rs.next()) {

			CoursesShow cs = new CoursesShow();

			ResultSet courses_rs = database
					.retrieve("select* from courses where idCourses = "
							+ rs.getString(2));

			cs.setCourseId(rs.getInt(1));
			cs.setCourseDays(rs.getInt(15));
			if (courses_rs.next()) {
				cs.setCourseName(courses_rs.getString(3));

				ResultSet coursesTypes_rs = database
						.retrieve("select CourseTypeName from coursetypes where idCourseTypes = "
								+ courses_rs.getString(11));
				if (coursesTypes_rs.next())
					cs.setCourseType(coursesTypes_rs.getString(1));

				if (coursesTypes_rs.getString(1).equals("Group"))
					cs.setPriceRole(2);
				else if (coursesTypes_rs.getString(1).equals("Individual"))
					cs.setPriceRole(1);
				else if (coursesTypes_rs.getString(1).equals("Both")) {

					cs.setPriceRole(rs.getInt(41));

				}

				coursesTypes_rs.close();

			}
			courses_rs.close();

			cs.setCourseParticipantsPerRun(rs.getInt(24));
			cs.setCoursePrice(rs.getInt(32));

			ResultSet status_rs = database
					.retrieve("SELECT ContractCourseStatus from contractcoursestatus where idContractCourseStatus = "
							+ rs.getInt(8));
			if (status_rs.next())
				cs.setStatus(status_rs.getString(1));
			status_rs.close();

			if (rs.getString(22) != null && rs.getInt(22) == 1)

				cs.setCoursePriceType("International");
			else if (rs.getString(22) != null && rs.getInt(22) == 2)
				cs.setCoursePriceType("Local");
			else if (rs.getString(22) != null && rs.getInt(22) == 3)
				cs.setCoursePriceType("Other");

			cs.setCourseRuns(rs.getInt(16));
			cs.setCourseTotalDays(rs.getInt(15) * rs.getInt(33));
			cs.setCourseTotalPrice(rs.getInt(23));

			if (rs.getString(5) != null) {
				cs.setResourceId(rs.getInt(5));

				ResultSet resources_rs = database
						.retrieve("SELECT ResourceFirstName,ResourceLastName from resources where idResources = "
								+ rs.getInt(5));
				if (resources_rs.next())
					cs.setResourceName(resources_rs.getString(1) + " "
							+ resources_rs.getString(2));
				cs.setResourceConfirm(rs.getBoolean(9));

				if (rs.getString(12) != null) {

					cs.setResourceConfirmDate(s.format(GeneralActions
							.parseDateToRequiredDate(rs.getString(12))));
				}
				resources_rs.close();
			}

			if (rs.getString(6) != null) {
				cs.setCoordinatorId(rs.getInt(6));

				ResultSet coordinators_rs = database
						.retrieve("SELECT TrainingCoordinateFirstName,TrainingCoordinateLastName from trainingcoordinators where idTrainingCoordinators = "
								+ rs.getInt(6));
				if (coordinators_rs.next())
					cs.setCoordinatorName(coordinators_rs.getString(1) + " "
							+ coordinators_rs.getString(2));
				coordinators_rs.close();
			}

			if (rs.getBoolean(10)) {
				cs.setVenueConfirmDate(s.format(GeneralActions
						.parseDateToRequiredDate(rs.getString(13))));
				cs.setVenueConfirm(rs.getBoolean(10));
			}

			if (rs.getString(4) != null) {

				cs.setVenueId(rs.getInt(4));

				ResultSet venues_rs = database
						.retrieve("SELECT VenueName from venues where idVenues = "
								+ rs.getInt(4));
				if (venues_rs.next())
					cs.setVenueName(venues_rs.getString(1));
				venues_rs.close();

			} else {
				if (rs.getString(30) != null
						&& rs.getString(30).equals("@ a Venue")) {
					cs.setVenueName("Other");
					cs.setVenueId(-1);
				}
			}
			if (rs.getString(30) != null)
				cs.setVenueLocation(rs.getString(30));

			if (rs.getString(40) != null)
				cs.setVenueDetails(rs.getString(40));

			if (rs.getString(29) != null && rs.getBoolean(29))
				cs.setDatashowRequest("AB Company");
			else if (rs.getString(29) != null && !rs.getBoolean(29))
				cs.setDatashowRequest("Client");
			else
				cs.setDatashowRequest("");

			if (rs.getString(34) != null)
				cs.setLocReceived(rs.getBoolean(34));

			if (rs.getString(20) != null)
				cs.setLocReceivedDate(s.format(GeneralActions
						.parseDateToRequiredDate(rs.getString(20))));

			if (rs.getString(35) != null)
				cs.setLocNumber(rs.getInt(35));

			if (rs.getString(36) != null)
				cs.setCPRReceived(rs.getBoolean(36));

			if (rs.getString(37) != null)
				cs.setCPRReceivedDate(s.format(GeneralActions
						.parseDateToRequiredDate(rs.getString(37))));

			if (rs.getString(11) != null)
				cs.setClientConfirm(rs.getBoolean(11));

			if (rs.getString(14) != null)
				cs.setClientConfirmDate(s.format(GeneralActions
						.parseDateToRequiredDate(rs.getString(14))));

			if (rs.getString(38) != null)
				cs.setCourseCancel(rs.getBoolean(38));

			if (rs.getString(39) != null)
				cs.setCancelDate(s.format(GeneralActions
						.parseDateToRequiredDate(rs.getString(39))));

			if (rs.getString(31) != null)
				cs.setCourseTime(rs.getInt(31));

			cs.setCourseComment(rs.getString(42));

			Show.add(cs);

		}
		rs.close();
		return Show;

	}
    public void DisplayColumnNames(	ResultSetMetaData  rsdata){
    	for (int j = 1; j < 16; j++) {
			try {
				System.out.println("   "+ j +"  =" +rsdata.getColumnName(j));
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}


    }

    public void insertContractCourse(DataSourceConnection database, int RunStarts,int MaxCourseRuns ,String contractID ,String CourseID, int  contractCoursePrice,
    		int courseType, int contractTotalPrice, String idTrainingCoordinators, String CourseDays)
    {

    	for (int i = RunStarts; i <= MaxCourseRuns; i++) {

			database
					.update("INSERT INTO contractcourse (Contracts_idContracts,ContractCourseIntendedAttendance,"
							+ "ContractCourseStatus,TrainingCoordinators_idTrainingCoordinators,"
							+ "ContractCoursePrice,ContractCoursePriceType,"
							+ "ContractCourseNumberOfRuns,ContractCourseRunNo,"
							+ "Courses_idCourses,ContractCourseDays,"
							+ "ContractCoursePayPrice,ContractCourseTime) VALUES ("
							+ contractID
							+ ",0,1,"
							+ idTrainingCoordinators
							+ ","
							+ contractCoursePrice
							+ ","
							+ courseType
							+ ","
							+ MaxCourseRuns
							+ ","
							+ i
							+ ","
							+ CourseID
							+ ","
							+ CourseDays
							+ ","
							+ contractTotalPrice + ",1" + ");");

		}

    }
	////////////////////////////////////////////////////////////////////////////
	public void addNewContractCourse(DataSourceConnection database,
			HttpServletRequest request) throws SQLException {
		//logger.setLevel(Level.DEBUG  );
		logger.info("  addding an new contract course ");
        //System.out.println(" contractt.; lllllllllllllllllllllll            ");
		if (request.getParameter("courseId") != null) {

			ResultSet rs = database
					.retrieve("select* from courses where idCourses = "
							+ request.getParameter("courseId") + ";");
           ////   get all courses with this id ,,,
			if (rs.next()) {
				 DisplayColumnNames( rs.getMetaData());



				ResultSet contract_rs = database
						.retrieve("select* from contracts where idContracts = "
								+ request.getParameter("contractId") + ";");

				int contractCoursePrice = 0;
				int contractTotalPrice = 0;



				int courseType = rs.getInt(11);

				if (courseType == 1) {

                logger.info(" course type == 1  group type ");
					if (contract_rs.next()){
				     contractCoursePrice = contract_rs.getInt(23);
				 	 DisplayColumnNames(contract_rs.getMetaData());
					}
                     contractTotalPrice = contractCoursePrice * rs.getInt(7);


					// }
				} else {
				    logger.info(" course type not equal to both or individual");
					if (contract_rs.next()) {
						DisplayColumnNames(contract_rs.getMetaData());
                     logger.info(" there is data in the contract (there is courses in contract) ");
						if (contract_rs.getInt(16) == 1)

							contractCoursePrice = Integer
									.parseInt(retreiveCoursePrice(database,
											"E", request
													.getParameter("courseId")
													+ ""));
						else if (contract_rs.getInt(16) == 2)

						{
							if (contract_rs.getInt(30) == 1)

								contractCoursePrice = Integer
										.parseInt(retreiveCoursePrice(
												database,
												"C",
												request
														.getParameter("courseId")
														+ ""));
							else if (contract_rs.getInt(30) == 2)

								contractCoursePrice = Integer
										.parseInt(retreiveCoursePrice(
												database,
												"D",
												request
														.getParameter("courseId")
														+ ""));
							else if (contract_rs.getInt(30) == 3) {
								if (contract_rs.getInt(28) == 1)
									contractCoursePrice = Integer
											.parseInt(retreiveCoursePrice(
													database,
													"D",
													request
															.getParameter("courseId")
															+ ""));
								else if (contract_rs.getInt(28) == 2)
									if (contract_rs.getInt(29) == 1)
										contractCoursePrice = Integer
												.parseInt(retreiveCoursePrice(
														database,
														"D",
														request
																.getParameter("courseId")
																+ ""));
									else if (contract_rs.getInt(29) == 1)
										contractCoursePrice = 0;

							}
						} else if (contract_rs.getInt(16) == 0)

						{
							if (contract_rs.getInt(30) == 1)

								contractCoursePrice = Integer
										.parseInt(retreiveCoursePrice(
												database,
												"A",
												request
														.getParameter("courseId")
														+ ""));
							else if (contract_rs.getInt(30) == 2)

								contractCoursePrice = Integer
										.parseInt(retreiveCoursePrice(
												database,
												"B",
												request
														.getParameter("courseId")
														+ ""));
							else if (contract_rs.getInt(30) == 3) {
								if (contract_rs.getInt(28) == 1)
									contractCoursePrice = Integer
											.parseInt(retreiveCoursePrice(
													database,
													"B",
													request
															.getParameter("courseId")
															+ ""));
								else if (contract_rs.getInt(28) == 2)
									if (contract_rs.getInt(29) == 1)
										contractCoursePrice = Integer
												.parseInt(retreiveCoursePrice(
														database,
														"B",
														request
																.getParameter("courseId")
																+ ""));
									else if (contract_rs.getInt(29) == 1)
										contractCoursePrice = 0;

							}
						}

					}
					contractTotalPrice = contractCoursePrice * 0;
				}



				logger.info("  I want to check if there is same  coures in contract with the same id.. or not... ");

				int NewMaxRunNo=Integer.parseInt(request .getParameter("courseRuns"));
				int oldMaxRun=0;
				int CurrentRunNo=0;
				ResultSet contract_Courses_rs = database
						.retrieve("select* from contractcourse where Contracts_idContracts="
								+ contract_rs.getString(1) + " AND Courses_idCourses="+ rs.getString(1)+";");


				if ( contract_Courses_rs.next()){
					DisplayColumnNames(contract_Courses_rs.getMetaData());
					// now get maximum Run number...
					oldMaxRun=contract_Courses_rs.getInt(33);
					System.out.println("  alll the old max run is   "+oldMaxRun);

				}
				else{
					insertContractCourse( database, 1,Integer.parseInt(request
							.getParameter("courseRuns")),contract_rs.getString(1) ,rs.getString(1),  contractCoursePrice,
				    		  courseType,   contractTotalPrice, contract_rs.getString(15),  rs.getString(7));
//				for (int i = 1; i <= Integer.parseInt(request
//						.getParameter("courseRuns")); i++) {
//
//					database
//							.update("INSERT INTO contractcourse (Contracts_idContracts,ContractCourseIntendedAttendance,"
//									+ "ContractCourseStatus,TrainingCoordinators_idTrainingCoordinators,"
//									+ "ContractCoursePrice,ContractCoursePriceType,"
//									+ "ContractCourseNumberOfRuns,ContractCourseRunNo,"
//									+ "Courses_idCourses,ContractCourseDays,"
//									+ "ContractCoursePayPrice,ContractCourseTime) VALUES ("
//									+ contract_rs.getString(1)
//									+ ",0,1,"
//									+ contract_rs.getString(15)
//									+ ","
//									+ contractCoursePrice
//									+ ","
//									+ courseType
//									+ ","
//									+ request.getParameter("courseRuns")
//									+ ","
//									+ i
//									+ ","
//									+ rs.getString(1)
//									+ ","
//									+ rs.getString(7)
//									+ ","
//									+ contractTotalPrice + ",1" + ");");
//
//				}
				}
			}

		} else {
			logger.debug( "  no courese with same id ");
			ResultSet rs = database
					.retrieve("select TrackCourses_idCourses from trackcourses where TrackCoures_idTracks = "
							+ request.getParameter("trackId") + ";");

			while (rs.next()) {

				ResultSet contract_rs = database
						.retrieve("select* from contracts where idContracts = "
								+ request.getParameter("contractId") + ";");

				ResultSet course_rs = database
						.retrieve("select* from courses where idCourses = "
								+ rs.getString(1) + ";");

				if (course_rs.next()) {

					int contractCoursePrice = 0;
					int contractTotalPrice = 0;
					int courseType = course_rs.getInt(11);

					if (courseType == 1) {

						if (contract_rs.next())
							contractCoursePrice = contract_rs.getInt(23);
						contractTotalPrice = contractCoursePrice
								* course_rs.getInt(7);
						// }
					} else {
						if (contract_rs.next()) {

							if (contract_rs.getInt(16) == 1)

								contractCoursePrice = Integer
										.parseInt(retreiveCoursePrice(
												database,
												"E",
												request
														.getParameter("courseId")
														+ ""));
							else if (contract_rs.getInt(16) == 2)

							{
								if (contract_rs.getInt(30) == 1)

									contractCoursePrice = Integer
											.parseInt(retreiveCoursePrice(
													database,
													"C",
													request
															.getParameter("courseId")
															+ ""));
								else if (contract_rs.getInt(30) == 2)

									contractCoursePrice = Integer
											.parseInt(retreiveCoursePrice(
													database,
													"D",
													request
															.getParameter("courseId")
															+ ""));
								else if (contract_rs.getInt(30) == 3) {
									if (contract_rs.getInt(28) == 1)
										contractCoursePrice = Integer
												.parseInt(retreiveCoursePrice(
														database,
														"D",
														request
																.getParameter("courseId")
																+ ""));
									else if (contract_rs.getInt(28) == 2)
										if (contract_rs.getInt(29) == 1)
											contractCoursePrice = Integer
													.parseInt(retreiveCoursePrice(
															database,
															"D",
															request
																	.getParameter("courseId")
																	+ ""));
										else if (contract_rs.getInt(29) == 1)
											contractCoursePrice = 0;

								}
							} else if (contract_rs.getInt(16) == 0)

							{
								if (contract_rs.getInt(30) == 1)

									contractCoursePrice = Integer
											.parseInt(retreiveCoursePrice(
													database,
													"A",
													request
															.getParameter("courseId")
															+ ""));
								else if (contract_rs.getInt(30) == 2)

									contractCoursePrice = Integer
											.parseInt(retreiveCoursePrice(
													database,
													"B",
													request
															.getParameter("courseId")
															+ ""));
								else if (contract_rs.getInt(30) == 3) {
									if (contract_rs.getInt(28) == 1)
										contractCoursePrice = Integer
												.parseInt(retreiveCoursePrice(
														database,
														"B",
														request
																.getParameter("courseId")
																+ ""));
									else if (contract_rs.getInt(28) == 2)
										if (contract_rs.getInt(29) == 1)
											contractCoursePrice = Integer
													.parseInt(retreiveCoursePrice(
															database,
															"B",
															request
																	.getParameter("courseId")
																	+ ""));
										else if (contract_rs.getInt(29) == 1)
											contractCoursePrice = 0;

								}
							}

						}
						contractTotalPrice = contractCoursePrice * 0;
					}
					insertContractCourse( database, 1,Integer.parseInt(request
								.getParameter("courseRuns")),contract_rs.getString(1) ,rs.getString(1),  contractCoursePrice,
					    		  courseType,   contractTotalPrice, contract_rs.getString(15),  rs.getString(7));
//
//					for (int i = 1; i <= Integer.parseInt(request
//							.getParameter("courseRuns")); i++) {
//
//						database
//								.update("INSERT INTO contractcourse (Contracts_idContracts,ContractCourseIntendedAttendance,"
//										+ "ContractCourseStatus,TrainingCoordinators_idTrainingCoordinators,"
//										+ "ContractCoursePrice,ContractCoursePriceType,"
//										+ "ContractCourseNumberOfRuns,ContractCourseRunNo,"
//										+ "Courses_idCourses,ContractCourseDays,"
//										+ "ContractCoursePayPrice,ContractCourseTime) VALUES ("
//										+ contract_rs.getString(1)
//										+ ",0,1,"
//										+ contract_rs.getString(15)
//										+ ","
//										+ contractCoursePrice
//										+ ","
//										+ courseType
//										+ ","
//										+ request.getParameter("courseRuns")
//										+ ","
//										+ i
//										+ ","
//										+ course_rs.getString(1)
//										+ ","
//										+ course_rs.getString(7)
//										+ ","
//										+ contractTotalPrice + ",1" + ");");
//
//					}
				}
				course_rs.close();
				contract_rs.close();
			}

			rs.close();
		}

	}

	////////////////////////////////////////////////////////////////////////////
	public static int retreiveContractStatus(DataSourceConnection database,
			int contractId) throws SQLException {

		ResultSet rs = database
				.retrieve("select ContractStatus from contracts where idContracts = "
						+ contractId);
		if (rs.next()) {
			int status = rs.getInt(1);

			rs.close();
			return status;

		}
		rs.close();
		return 0;
	}

	////////////////////////////////////////////////////////////////////////////
	// ////////
	public static void updateContractStatus(DataSourceConnection database,
			int contractId) throws SQLException {

		ResultSet rs = database
				.retrieve("select ContractCourseStatus from contractcourse where Contracts_idContracts = "
						+ contractId);

		boolean flag = false;

		while (rs.next()) {

			if (rs.getInt(1) == 3) {

				flag = true;

			} else if (rs.getInt(1) == 9) {
				continue;
			} else {
				flag = false;
				break;
			}

		}
		if (flag) {

			database.update("UPDATE contracts SET ContractStatus = 5"
					+ " where idContracts = " + contractId + ";");

		} else {

			rs.beforeFirst();
			flag = false;

			while (rs.next()) {

				if (rs.getInt(1) == 2) {

					flag = true;

				} else {
					flag = false;
					break;
				}

			}
			if (flag) {

				database.update("UPDATE contracts SET ContractStatus = 4"
						+ " where idContracts = " + contractId + ";");

			}

		}

		return;

	}

	////////////////////////////////////////////////////////////////////////////
	// ///
	private void setContractCoursesCoordinator(DataSourceConnection database,
			boolean b, String contractId, int individualCoordinator)
			throws SQLException {

		ResultSet rs = database
				.retrieve("select idContractCourse from contractcourse where Contracts_idContracts = "
						+ contractId);

		if (b) {
			while (rs.next()) {

				database
						.update("UPDATE contractcourse SET TrainingCoordinators_idTrainingCoordinators = "
								+ individualCoordinator
								+ " where idContractCourse = "
								+ rs.getString(1) + ";");

			}
		} else {
			while (rs.next()) {
				database
						.update("UPDATE contractcourse SET TrainingCoordinators_idTrainingCoordinators = "
								+ null
								+ " where idContractCourse = "
								+ rs.getString(1) + ";");
			}

		}
		rs.close();

	}

	////////////////////////////////////////////////////////////////////////////
	// ///////////////////////////
	public void editContractCourse(DataSourceConnection database,
			HttpServletRequest request) throws SQLException, ParseException {

		// //update the contract course in the database///////////////

		int priceRole = 0;
		int contractCourseTotalPrice = 0;
		if (request.getParameter("courseType").equals("Group"))
			contractCourseTotalPrice = Integer.parseInt(request
					.getParameter("coursePrice"))
					* Integer.parseInt(request.getParameter("courseDays"));
		else if (request.getParameter("courseType").equals("Individual"))
			contractCourseTotalPrice = Integer.parseInt(request
					.getParameter("coursePrice"))
					* Integer.parseInt(request
							.getParameter("courseParticipants"));
		else if (request.getParameter("courseType").equals("Both")) {
			if (request.getParameter("coursePriceRole").equals("1")) {
				contractCourseTotalPrice = Integer.parseInt(request
						.getParameter("coursePrice"))
						* Integer.parseInt(request
								.getParameter("courseParticipants"));
				priceRole = 1;
			} else if (request.getParameter("coursePriceRole").equals("2")) {
				contractCourseTotalPrice = Integer.parseInt(request
						.getParameter("coursePrice"))
						* Integer.parseInt(request.getParameter("courseDays"));
				priceRole = 2;
			}

		}
		database
				.update("UPDATE contractcourse SET ContractCourseIntendedAttendance = "
						+ request.getParameter("courseParticipants")
						+ ",ContractCoursePrice = "
						+ request.getParameter("coursePrice")
						+ ",ContractCourseDays = "
						+ request.getParameter("courseDays")
						+ ",ContractCourseTime = "
						+ request.getParameter("courseTime")
						+ ",ContractCoursePayPrice = "
						+ contractCourseTotalPrice
						+ ",ContractCoursePriceRole = "
						+ priceRole
						+ " where idContractCourse = "
						+ request.getParameter("courseId") + ";");

	}

	////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////
	public void deletetContractCourse(DataSourceConnection database,
			HttpServletRequest request) {
		if (request.getParameterValues("coursesIds").length == 1) {

			database
					.update("DELETE FROM eventday WHERE EventDayContractCourseId = "
							+ request.getParameterValues("coursesIds")[0]);

			database
					.update("delete from contractcourse where idContractCourse = "
							+ request.getParameterValues("coursesIds")[0]);

		} else if (request.getParameterValues("coursesIds").length > 1) {

			for (int i = 0; i < request.getParameterValues("coursesIds").length; i++) {

				database
						.update("DELETE FROM eventday WHERE EventDayContractCourseId = "
								+ request.getParameterValues("coursesIds")[i]);

				database
						.update("delete from contractcourse where idContractCourse = "
								+ request.getParameterValues("coursesIds")[i]);

			}
		}

	}

	////////////////////////////////////////////////////////////////////////////
	// ///////////////////////////
	public void assignResourceToContractCourse(DataSourceConnection database,
			HttpServletRequest request) throws SQLException {

		String resourceId = null;
		int status = 0;
		Boolean confirmResource = null;
		String confirmResourceDate = null;

		for (int i = 0; i < request.getParameterValues("course_ids").length; i++) {

			ResultSet contractCourse_rs = database
					.retrieve("select* from contractcourse where idContractCourse = "
							+ request.getParameterValues("course_ids")[i]);
			if (contractCourse_rs.next()) {
				status = contractCourse_rs.getInt(8);
				if (!request.getParameterValues("resource_ids")[i].equals("")
						&& !request.getParameterValues("resource_ids")[i]
								.equals("0"))
					resourceId = request.getParameterValues("resource_ids")[i];

				if (Integer.parseInt(request
						.getParameterValues("resource_confirm")[i]) == 1) {
					confirmResource = true;
					if (contractCourse_rs.getString(10) != null
							&& contractCourse_rs.getBoolean(10)
							&& contractCourse_rs.getString(7) != null
							&& !contractCourse_rs.getString(7).equals("")
							&& contractCourse_rs.getInt(8) < 3) {
						status = 3;

					}
				} else if (Integer.parseInt(request
						.getParameterValues("resource_confirm")[i]) == 0) {
					confirmResource = false;
					if (contractCourse_rs.getString(7) != null
							&& !contractCourse_rs.getString(7).equals(""))

						status = 2;

				}
				if (!request.getParameterValues("resource_confirm_date")[i]
						.equals(""))
					confirmResourceDate = "'"
							+ request
									.getParameterValues("resource_confirm_date")[i]
							+ "'";

				// //update the contract course in the database///////////////
				database
						.update("UPDATE contractcourse SET Resources_idResources = "
								+ resourceId
								+ ",ContractCourseStatus = "
								+ status
								+ ",ContractCourseConfirmResourceDate = "
								+ confirmResourceDate
								+ ",ContractCourseConfirmResource = "
								+ confirmResource
								+ " where idContractCourse = "
								+ request.getParameterValues("course_ids")[i]
								+ ";");

				if (status == 3) {
					if (Contracts.retreiveContractStatus(database, Integer
							.parseInt(request.getParameter("contractId"))) == 4)
						Contracts.updateContractStatus(database, Integer
								.parseInt(request.getParameter("contractId")));
				}

			}
			resourceId = null;
			status = 0;
			confirmResource = null;
			confirmResourceDate = null;

		}

	}

	////////////////////////////////////////////////////////////////////////////
	// ///////////
	public void assignCoordinatorToContractCourse(
			DataSourceConnection database, HttpServletRequest request)
			throws NumberFormatException, SQLException {
		String coordinatorId = null;

		for (int i = 0; i < request.getParameterValues("course_ids").length; i++) {

			if (!request.getParameterValues("coordinators_ids")[i].equals("")
					&& !request.getParameterValues("coordinators_ids")[i]
							.equals("0"))
				coordinatorId = request.getParameterValues("coordinators_ids")[i];

			// //update the contract course in the database///////////////
			database
					.update("UPDATE contractcourse SET TrainingCoordinators_idTrainingCoordinators = "
							+ coordinatorId
							+ " where idContractCourse = "
							+ request.getParameterValues("course_ids")[i] + ";");

			coordinatorId = null;
		}
	}

	////////////////////////////////////////////////////////////////////////////
	// ////////////////
	public void assignVenueAndDatashowToContractCourse(
			DataSourceConnection database, HttpServletRequest request)
			throws SQLException {

		String venueId = null;
		String venueDetail = null;
		String contractCourseLocation = null;
		int status = 0;
		Boolean confirmVenue = null;
		Boolean needDataShowFromCompany = null;
		String confirmVenueDate = null;

		for (int i = 0; i < request.getParameterValues("course_ids").length; i++) {

			ResultSet contractCourse_rs = database
					.retrieve("select* from contractcourse where idContractCourse = "
							+ request.getParameterValues("course_ids")[i]);
			if (contractCourse_rs.next()) {
				status = contractCourse_rs.getInt(8);

				if (!request.getParameterValues("venues_locations")[i]
						.equals("")) {
					contractCourseLocation = "'"
							+ request.getParameterValues("venues_locations")[i]
							+ "'";

					if (request.getParameterValues("venues_locations")[i]
							.equals("@ Our Premises")) {
						venueId = null;
						venueDetail = null;
					} else if (request.getParameterValues("venues_locations")[i]
							.equals("@ Client Premises")) {
						venueId = null;
						if (!request.getParameterValues("venues_details")[i]
								.equals(""))
							venueDetail = "'"
									+ request
											.getParameterValues("venues_details")[i]
									+ "'";
					}

					else if (request.getParameterValues("venues_locations")[i]
							.equals("@ a Venue")) {
						if (request.getParameterValues("venues_ids")[i]
								.equals("-1"))
							venueId = null;
						else
							venueId = request.getParameterValues("venues_ids")[i];
						if (!request.getParameterValues("venues_details")[i]
								.equals(""))
							venueDetail = "'"
									+ request
											.getParameterValues("venues_details")[i]
									+ "'";
					}

				}
				if (request.getParameterValues("datashow_res")[i]
						.equals("AB Company"))
					needDataShowFromCompany = true;
				else if (request.getParameterValues("datashow_res")[i]
						.equals("Client"))
					needDataShowFromCompany = false;

				if (Integer.parseInt(request
						.getParameterValues("venues_confirmations")[i]) == 0) {

					confirmVenue = false;

					if (contractCourse_rs.getString(7) != null
							&& !contractCourse_rs.getString(7).equals(""))

						status = 2;
				} else if (Integer.parseInt(request
						.getParameterValues("venues_confirmations")[i]) == 1) {

					confirmVenue = true;
					if (contractCourse_rs.getString(9) != null
							&& contractCourse_rs.getBoolean(9)
							&& contractCourse_rs.getString(7) != null
							&& !contractCourse_rs.getString(7).equals("")
							&& contractCourse_rs.getInt(8) < 3) {
						status = 3;

					}
				}

				if (!request.getParameterValues("venues_dates")[i].equals(""))
					confirmVenueDate = "'"
							+ request.getParameterValues("venues_dates")[i]
							+ "'";

				// //update the contract course in the database///////////////
				database.update("UPDATE contractcourse SET Venues_idVenues = "
						+ venueId + ",ContractCourseVenueDetail = "
						+ venueDetail + ",ContractCourseStatus = " + status
						+ ",ContractCourseConfirmVenueDate = "
						+ confirmVenueDate + ",ContractCourseConfirmVenue = "
						+ confirmVenue + ",ContractCourseRequestDataShow = "
						+ needDataShowFromCompany
						+ ",ContractCourseLocation = " + contractCourseLocation
						+ " where idContractCourse = "
						+ request.getParameterValues("course_ids")[i] + ";");

				if (status == 3) {
					if (Contracts.retreiveContractStatus(database, Integer
							.parseInt(request.getParameter("contractId"))) == 4)
						Contracts.updateContractStatus(database, Integer
								.parseInt(request.getParameter("contractId")));
				}
			}

			venueId = null;
			venueDetail = null;
			contractCourseLocation = null;
			status = 0;
			confirmVenue = null;
			needDataShowFromCompany = null;
			confirmVenueDate = null;

		}

	}

	////////////////////////////////////////////////////////////////////////////
	// /////////////
	public void assignClientConfirmationToContractCourse(
			DataSourceConnection database, HttpServletRequest request)
			throws SQLException {

		int status = 0;
		Boolean contractCourseCancel = null;
		Boolean confirmClient = null;
		String confirmClientDate = null;
		String contractCourseCancelDate = null;

		// // ////System.out.println("assignClientCofirmationToContractCourse");

		for (int i = 0; i < request.getParameterValues("course_ids").length; i++) {

			ResultSet contractCourse_rs = database
					.retrieve("select* from contractcourse where idContractCourse = "
							+ request.getParameterValues("course_ids")[i]);
			if (contractCourse_rs.next()) {
				status = contractCourse_rs.getInt(8);

				if (Integer.parseInt(request
						.getParameterValues("clientConfirm")[i]) == 0) {
					confirmClient = false;

					if (contractCourse_rs.getString(9) != null
							&& contractCourse_rs.getBoolean(9)
							&& contractCourse_rs.getString(10) != null
							&& contractCourse_rs.getBoolean(10)
							&& contractCourse_rs.getString(7) != null
							&& !contractCourse_rs.getString(7).equals("")) {
						status = 3;

					}

				} else if (Integer.parseInt(request
						.getParameterValues("clientConfirm")[i]) == 1) {

					confirmClient = true;

					if (contractCourse_rs.getString(9) != null
							&& contractCourse_rs.getBoolean(9)
							&& contractCourse_rs.getString(10) != null
							&& contractCourse_rs.getBoolean(10)
							&& contractCourse_rs.getString(7) != null
							&& !contractCourse_rs.getString(7).equals(""))
						status = 6;
				}

				if (!request.getParameterValues("clientConfirmDates")[i]
						.equals(""))
					confirmClientDate = "'"
							+ request.getParameterValues("clientConfirmDates")[i]
							+ "'";

				if (Integer
						.parseInt(request.getParameterValues("courseCancel")[i]) == 0)
					contractCourseCancel = false;

				else if (Integer.parseInt(request
						.getParameterValues("courseCancel")[i]) == 1) {

					contractCourseCancel = true;
					status = 9;

					// String xmlFilesPath = Upload.getmainPath()
					// + "\\webapps\\ABServer\\files\\xml\\CalendarCourses\\";
					//
					// File dir = new File(xmlFilesPath);
					//
					// // ////System.out.println(xmlFilesPath);
					// String filename = "";
					// String[] children = dir.list();
					// if (children == null) {
					// // Either dir does not exist or is not a directory
					// } else {
					//
					// for (int k = 0; k < children.length; k++) {
					// // Get filename of file or directory
					// filename = children[k];
					//
					// String domyString = filename.substring(9, filename
					// .lastIndexOf("_"));
					//
					// String contractCourseid = domyString
					// .substring(domyString.indexOf("_") + 1);
					// // ////System.out.println("contractCourseid = "
					// + contractCourseid);
					// if (contractCourseid.equals(request
					// .getParameterValues("course_ids")[i])) {
					// children = null;
					// break;
					//
					// }
					//
					// }
					//
					// if (!filename.equals("")
					// && new File(xmlFilesPath + filename).delete())
					// // ////System.out.println("the file deleted");
					// else if (!filename.equals("")) {
					// // ////System.out.println("the file did not delete");
					// }

					// }
				}

				if (!request.getParameterValues("courseCancelDates")[i]
						.equals(""))
					contractCourseCancelDate = "'"
							+ request.getParameterValues("courseCancelDates")[i]
							+ "'";

				// //update the contract course in the database///////////////
				database
						.update("UPDATE contractcourse SET ContractCourseCancel = "
								+ contractCourseCancel
								+ ",ContractCourseStatus = "
								+ status
								+ ",ContractCourseConfirmClienDate = "
								+ confirmClientDate
								+ ",ContractCourseConfirmClient = "
								+ confirmClient
								+ ",ContractCourseCancelDate = "
								+ contractCourseCancelDate
								+ " where idContractCourse = "
								+ request.getParameterValues("course_ids")[i]
								+ ";");

				if (status == 3) {
					if (Contracts.retreiveContractStatus(database, Integer
							.parseInt(request.getParameter("contractId"))) == 4)
						Contracts.updateContractStatus(database, Integer
								.parseInt(request.getParameter("contractId")));
				}

			}

			status = 0;
			contractCourseCancel = null;
			confirmClient = null;
			confirmClientDate = null;
			contractCourseCancelDate = null;

		}

	}

	////////////////////////////////////////////////////////////////////////////
	// ////
	public void saveLOCToContractCourse(DataSourceConnection database,
			HttpServletRequest request) throws NumberFormatException,
			SQLException {

		Boolean LOCReceived = null;
		Boolean CPRReceived = null;
		String LOCReceivedDate = null;
		String CPRReceivedDate = null;

		Integer LOCNumber = null;

		for (int i = 0; i < request.getParameterValues("course_ids").length; i++) {

			if (Integer.parseInt(request.getParameterValues("locReceived")[i]) == 0)

				LOCReceived = false;
			else if (Integer
					.parseInt(request.getParameterValues("locReceived")[i]) == 1)

				LOCReceived = true;
			//
			if (!request.getParameterValues("locNumbers")[i].equals(""))
				LOCNumber = Integer.parseInt(request
						.getParameterValues("locNumbers")[i]);

			if (Integer.parseInt(request.getParameterValues("cprReceived")[i]) == 0)

				CPRReceived = false;
			else if (Integer
					.parseInt(request.getParameterValues("cprReceived")[i]) == 1)

				CPRReceived = true;

			if (!request.getParameterValues("cprReceivedDates")[i].equals(""))
				CPRReceivedDate = "'"
						+ request.getParameterValues("cprReceivedDates")[i]
						+ "'";

			if (!request.getParameterValues("locReceivedDates")[i].equals(""))
				LOCReceivedDate = "'"
						+ request.getParameterValues("locReceivedDates")[i]
						+ "'";

			// //update the contract course in the database///////////////
			database
					.update("UPDATE contractcourse SET ContractCourseLOCReceived = "
							+ LOCReceived
							+ ",ContractCourseLOCReceivedDate = "
							+ LOCReceivedDate
							+ ",ContractCourseCPRReceived = "
							+ CPRReceived
							+ ",ContractCourseCPRReceivedDate = "
							+ CPRReceivedDate
							+ ",ContractCourseLOCNumber = "
							+ LOCNumber
							+ " where idContractCourse = "
							+ request.getParameterValues("course_ids")[i] + ";");

			LOCReceived = null;
			CPRReceived = null;
			LOCReceivedDate = null;
			CPRReceivedDate = null;

			LOCNumber = null;

		}

	}

	////////////////////////////////////////////////////////////////////////////
	// ///////////////
	public void generateContractPDF(DataSourceConnection database,
			HttpServletRequest request) throws DocumentException,
			FileNotFoundException, SQLException, IOException {

		ResultSet contract_rs = database
				.retrieve("SELECT* FROM contracts where idContracts = "
						+ request.getParameter("contractId"));

		ResultSet contractCourses_rs = database
				.retrieve("select* from contractcourse where Contracts_idContracts = "
						+ request.getParameter("contractId"));

		if (contract_rs.next()) {

			Document document = new Document(PageSize.A4, 50, 50, 50, 50);
			PdfWriter.getInstance(document, new FileOutputStream(Upload
					.getmainPath()
					+ "\\webapps\\ABServer\\files\\contractPDFs\\"
					+ contract_rs.getString(1) + ".pdf"));

			ResultSet client_rs = database
					.retrieve("SELECT clientName FROM clients where idClients = "
							+ contract_rs.getString(5));

			String clientName = "";
			if (client_rs.next())
				clientName = client_rs.getString(1);

			document.open();
			Calendar toDay = Calendar.getInstance();
			int year = toDay.get(Calendar.YEAR);
			int month = toDay.get(Calendar.MONTH) + 1;
			String m = String.valueOf(month);
			if (month < 10) {
				m = "0" + month;
			}
			int day = toDay.get(Calendar.DATE);
			String dd = String.valueOf(day);
			if (day < 10)
				dd = '0' + dd;
			String d = "" + year + '-' + m + '-' + dd;
			document.add(new Paragraph("Contract Details:        ", FontFactory
					.getFont(FontFactory.COURIER, 14, Font.BOLD, Color.black)));
			document.add(new Paragraph(
					"Client Name:             " + clientName, FontFactory
							.getFont(FontFactory.COURIER, 13, Color.black)));
			document.add(new Paragraph("Proposal ID:             "
					+ contract_rs.getString(2), FontFactory.getFont(
					FontFactory.COURIER, 13, Color.black)));

			document.add(new Paragraph("Date of Request:         "
					+ contract_rs.getString(10), FontFactory.getFont(
					FontFactory.COURIER, 13, Color.black)));
			document.add(new Paragraph("Tentative Start Date:    "
					+ contract_rs.getString(11), FontFactory.getFont(
					FontFactory.COURIER, 13, Color.black)));
			document.add(new Paragraph("Tentative End Date:      "
					+ contract_rs.getString(12), FontFactory.getFont(
					FontFactory.COURIER, 13, Color.black)));
			document.add(new Paragraph("Contract Total Price:    "
					+ request.getParameter("contractFee"), FontFactory.getFont(
					FontFactory.COURIER, 13, Color.black)));
			document.add(new Paragraph("Contract Generation Date:" + d,
					FontFactory.getFont(FontFactory.COURIER, 13, Color.black)));

			document.add(new Paragraph("Contract Courses:        ", FontFactory
					.getFont(FontFactory.COURIER, 14, Font.BOLD, Color.black)));

			int contractCourses_size = 0;
			contractCourses_rs.last();
			contractCourses_size = contractCourses_rs.getRow();
			contractCourses_rs.beforeFirst();
			// contractCourses_rs.next();

			Table t = new Table(4, contractCourses_size);
			t.setBorderColor(Color.black);

			t.setPadding(1);

			t.setSpacing(1);
			t.setWidth(100);

			Cell c1 = new Cell(new Paragraph("Course Name", FontFactory
					.getFont(FontFactory.COURIER, 14, Font.BOLD, Color.black)));

			c1.setHeader(true);

			t.addCell(c1);

			c1 = new Cell(new Paragraph("Course Days", FontFactory.getFont(
					FontFactory.COURIER, 14, Font.BOLD, Color.black)));

			t.addCell(c1);

			c1 = new Cell(new Paragraph("Course Number of Runs", FontFactory
					.getFont(FontFactory.COURIER, 14, Font.BOLD, Color.black)));

			t.addCell(c1);

			c1 = new Cell(new Paragraph("Course Price", FontFactory.getFont(
					FontFactory.COURIER, 14, Font.BOLD, Color.black)));

			t.addCell(c1);

			t.endHeaders();
			while (contractCourses_rs.next()) {

				ResultSet courses_rs = database
						.retrieve("SELECT CourseNameEng FROM courses where idCourses = "
								+ contractCourses_rs.getString(2));
				if (courses_rs.next())
					t.addCell(new Paragraph(courses_rs.getString(1),
							FontFactory.getFont(FontFactory.COURIER, 13,
									Color.black)));

				t.addCell(new Paragraph(contractCourses_rs.getString(15)
						.toString(), FontFactory.getFont(FontFactory.COURIER,
						13, Color.black)));

				t.addCell(new Paragraph(contractCourses_rs.getString(16)
						.toString(), FontFactory.getFont(FontFactory.COURIER,
						13, Color.black)));

				t.addCell(new Paragraph(contractCourses_rs.getString(23)
						.toString(), FontFactory.getFont(FontFactory.COURIER,
						13, Color.black)));

			}

			document.add(t);

			document.close();
			Runtime.getRuntime().exec(
					"rundll32 url.dll,FileProtocolHandler "
							+ Upload.getmainPath()
							+ "\\webapps\\ABServer\\files\\contractPDFs\\"
							+ contract_rs.getString(1) + ".pdf");

		}
	}

	////////////////////////////////////////////////////////////////////////////
	// //////////////
	public void addContractCourseComment(DataSourceConnection database,
			HttpServletRequest request) {

		String comment = null;
		if (!request.getParameter("courseComment").equals(""))
			comment = "'" + request.getParameter("courseComment") + "'";

		database.update("UPDATE contractcourse SET ContractCourseComment = "
				+ comment

				+ " where idContractCourse = "
				+ request.getParameter("courseId") + ";");

	}

	////////////////////////////////////////////////////////////////////////////
	// ////////////
	public String changeProposalId(DataSourceConnection database, int clientid,
			int contractid) throws SQLException {
		String proposalId = "";

		ResultSet proposal_rs = database
				.retrieve("SELECT ContractProposalID FROM contracts where idContracts  = "
						+ contractid);

		if (proposal_rs.next()) {
			proposalId = proposal_rs.getString(1);
		}

		ResultSet rs = database
				.retrieve("SELECT ClientApp FROM clients where idClients = "
						+ clientid);

		if (rs.next())
			proposalId = proposalId.substring(0, proposalId.length() - 2)
					+ rs.getString(1);

		//System.out.println(proposalId);
		return proposalId;
	}

}
