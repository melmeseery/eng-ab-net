/**
 * 
 */
package abItems;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import abItemsShow.ContractsShow;
import abItemsShow.RFilesShow;
import abItemsShow.ResourceHolidayShow;
import abItemsShow.ResourceRatesShow;
import abItemsShow.ResourcesShow;
import actions.GeneralActions;
import database.DataSourceConnection;

/**
 * @author noha
 * 
 */
public class Resources {

	SimpleDateFormat s = new SimpleDateFormat("dd-MMM-yyyy", Locale.US);

	// SimpleDateFormat database_sdf = new SimpleDateFormat("yyyy-m-d",
	// Locale.US);

	public ArrayList retreiveAllResources(DataSourceConnection database,
			String query, HttpServletRequest request) throws SQLException,
			ParseException {

		ResultSet rs = database.retrieve(query);
		ArrayList<ResourcesShow> Show = new ArrayList<ResourcesShow>();
		while (rs != null && rs.next()) {

			ResourcesShow r = new ResourcesShow();

			if ((rs.getInt(20) == 2 || rs.getInt(20) == 3)
					&& request.getParameter("ta") != null
					&& request.getParameter("ta") != ""
					&& request.getParameter("c") == "") {

				ResultSet courses_rs = database
						.retrieve("select idCourses from courses where Course_idTrainingAreas = "
								+ request.getParameter("ta"));

				ResultSet res_courses_rs = database
						.retrieve("select ResourceCourse_idCourses from resourcecourses where ResourceCourse_idResources = "
								+ rs.getString(1));

				boolean flag = false;

				while (courses_rs.next()) {

					while (res_courses_rs.next()) {

						if (courses_rs.getInt(1) == res_courses_rs.getInt(1)) {

							flag = true;
							break;

						} else {
							flag = false;
							continue;
						}

					}
					if (flag) {
						break;
					}
				}
				if (!flag) {
					continue;
				}

				courses_rs.close();
				res_courses_rs.close();
			}

			if (rs.getBoolean(40)) {
				r.setContracted("Yes");
				r.setTargetedDays(rs.getInt(41));
			} else
				r.setContracted("No");

			if ((rs.getInt(20) == 2 || rs.getInt(20) == 3)
					&& request.getParameter("c") != null
					&& request.getParameter("c") != "") {

				String res_courses_query = "";

				if (request.getParameter("c").contains(",")) {
					String s = request.getParameter("c");

					String id = s.substring(0, s.indexOf(","));
					s = s.substring(s.indexOf(",") + 1);
					res_courses_query = res_courses_query + id + " ";

					while (s != "") {
						res_courses_query = res_courses_query
								+ "or ResourceCourse_idCourses = ";
						if (s.contains(",")) {
							id = s.substring(0, s.indexOf(","));
							s = s.substring(s.indexOf(",") + 1);
						} else {
							id = s;
							s = "";
						}
						res_courses_query = res_courses_query + id + " ";

					}

				} else
					res_courses_query = request.getParameter("c");

				res_courses_query = "ResourceCourse_idCourses = "
						+ res_courses_query;
				res_courses_query = "(" + res_courses_query + ")";

				ResultSet res_courses_rs = database
						.retrieve("select* from resourcecourses where ResourceCourse_idResources = "
								+ rs.getString(1) + " and " + res_courses_query);

				if (!res_courses_rs.next())
					continue;

				res_courses_rs.close();
			}

			else if (rs.getInt(20) == 1 && request.getParameter("c") != null
					&& request.getParameter("c") != "")
				continue;

			if ((rs.getInt(20) == 1 || rs.getInt(20) == 3)
					&& request.getParameter("ca") != null
					&& request.getParameter("ca") != "")

			{
				ResultSet res_consulting_rs = database
						.retrieve("select* from resourceconsultingareas where resourceConsultingAreaIdResources = "
								+ rs.getString(1)
								+ " and resourceConsultingAreaIdConsultingArea = "
								+ request.getParameter("ca"));

				if (!res_consulting_rs.next())
					continue;

				res_consulting_rs.close();
			}

			else if (rs.getInt(20) == 2 && request.getParameter("ca") != null
					&& request.getParameter("ca") != "")
				continue;

			r.setResourceId(rs.getInt(1));
			r.setResourceName(rs.getString(2));
			r.setResourceLastName(rs.getString(3));

			r.setFirstmobilNum(rs.getString(12));
			r.setSecmobilNum(rs.getString(8));

			r.setResFirstEmail(rs.getString(13));
			r.setResSecEmail(rs.getString(32));

			r.setResFirstTel(rs.getString(11));
			r.setResSecTel(rs.getString(36));

			r.setResFax(rs.getString(37));

			r.setCvLink(rs.getString(33));
			r.setBriefLink(rs.getString(18));

			if (rs.getString(23) != null)
				r.setLastCVUpdate(s.format(GeneralActions
						.parseDateToRequiredDate(rs.getString(23))));

			////////////////////////////////////////////////////////////////////
			// ///

			int resourceDaysCounter = 0;

			Calendar cal = Calendar.getInstance();
			ResultSet resourceCourses_rs = database
					.retrieve("Select idContractCourse from contractcourse where Resources_idResources = "
							+ rs.getInt(1) + " and ContractCourseStatus != 9;");

			while (resourceCourses_rs.next()) {
				ResultSet courseDays_rs = database
						.retrieve("select EventDayDayId from eventday where EventDayContractCourseId = "
								+ resourceCourses_rs.getString(1) + ";");

				while (courseDays_rs.next()) {

					ResultSet days_rs = database
							.retrieve("select Date from days where DayId = "
									+ courseDays_rs.getString(1) + ";");

					if (days_rs.next()) {

						////System.out.println(s.format(cal.getTime()).substring(7
						// , 11)+"    "+Integer.parseInt(days_rs.getString(1).
						// substring(0, 4)));
						if (Integer.parseInt(s.format(cal.getTime()).substring(
								7, 11)) == Integer.parseInt(days_rs
								.getString(1).substring(0, 4)))
							resourceDaysCounter++;

					}

					days_rs.close();

				}
				courseDays_rs.close();
			}

			resourceCourses_rs.close();

			r.setAssignedDays(resourceDaysCounter);

			////////////////////////////////////////////////////////////////////
			// ///

			r.setResourceAbb(rs.getString(30));

			if (rs.getInt(20) == 1)
				r.setResourceType("Consultant");
			else if (rs.getInt(20) == 2)
				r.setResourceType("Trainer");
			else
				r.setResourceType("Both");

			if (rs.getInt(22) == 1)

				r.setResourceHiegherDegree("B.Sc.");
			else if (rs.getInt(22) == 2)

				r.setResourceHiegherDegree("M.Sc.");
			else if (rs.getInt(22) == 3)

				r.setResourceHiegherDegree("Ph.D.");
			else if (rs.getInt(22) == 4)

				r.setResourceHiegherDegree("MBA");
			else if (rs.getInt(22) == 5)

				r.setResourceHiegherDegree("MPA");
			else if (rs.getInt(22) == 6)

				r.setResourceHiegherDegree("Diploma");

			if (rs.getInt(21) == 1)
				r.setSeniority("Senior");
			else if (rs.getInt(21) == 2)
				r.setSeniority("Middle Agged");
			else if (rs.getInt(21) == 3)
				r.setSeniority("Junior");

			if (rs.getString(35) != null && rs.getInt(35) == 1)
				r.setContractingStatus("Associate");
			else if (rs.getString(35) != null && rs.getInt(35) == 2)
				r.setContractingStatus("Freelancer");
			else if (rs.getString(35) != null && rs.getInt(35) == 3)
				r.setContractingStatus("Not Yet");

			r.setBirthdate(s.format(GeneralActions.parseDateToRequiredDate((rs
					.getString(5)))));

			Date d = new Date();
			// // // ////System.out.println(d.toString().substring(
			// d.toString().length() - 4, d.toString().length())
			// + " " + resource.getResourceBirthDate().toString());
			int age = Integer.parseInt(d.toString().substring(
					d.toString().length() - 4, d.toString().length()))
					- Integer.parseInt(rs.getString(5).substring(0, 4));

			// // // ////System.out.println(age);
			r.setAge(age);

			if (rs.getString(14) != null) {

				r.setResourcePhotoName(rs.getString(14));
			} else
				r.setResourcePhotoName("no_image.jpg");

			Show.add(r);

		}
		rs.close();
		return Show;

	}

	////////////////////////////////////////////////////////////////////////////
	// ///////////////////
	public static int getTheLastResourceId(DataSourceConnection database)
			throws SQLException {

		ResultSet rs = database.retrieve("SELECT idResources FROM resources;");

		if (rs != null && rs.last()) {

			int resourceId = rs.getInt(1);
			rs.close();

			return resourceId;
		}
		return 0;

	}

	////////////////////////////////////////////////////////////////////////////
	// /////////////////////////
	public void addNewResource(DataSourceConnection database,
			HttpServletRequest request) throws SQLException {

		Boolean gender = null;
		String lastCVUpdateDate = null;
		String photoPath = "'" + "../images/no_image.jpg" + "'";
		String companyCVPath = null;
		String resourceCVPath = null;
		String breifPath = null;
		String idPhotoPath = null;

		Integer resId = getTheLastResourceId(database) + 1;
		// intialize the above variables
		if (Integer.parseInt(request.getParameter("gender")) == 1)
			gender = true;
		else
			gender = false;

		if (!request.getParameter("photo").equals("")) {

			String extfile = request.getParameter("photo").substring(
					request.getParameter("photo").indexOf("."));
			photoPath = "'" + "../files/resource_files/" + resId + "_photo"
					+ extfile + "'";

		}
		if (!request.getParameter("companycv").equals("")) {

			String extfile = request.getParameter("companycv").substring(
					request.getParameter("companycv").indexOf("."));
			companyCVPath = "'" + "../files/resource_files/" + resId
					+ "_company_cv" + extfile + "'";

		}
		if (!request.getParameter("owncv").equals("")) {

			String extfile = request.getParameter("owncv").substring(
					request.getParameter("owncv").indexOf("."));
			resourceCVPath = "'" + "../files/resource_files/" + resId + "_cv"
					+ extfile + "'";
			lastCVUpdateDate = "'" + request.getParameter("cvupdatedate") + "'";

		}
		if (!request.getParameter("brief").equals("")) {

			String extfile = request.getParameter("brief").substring(
					request.getParameter("brief").indexOf("."));
			breifPath = "'" + "../files/resource_files/" + resId + "_brief"
					+ extfile + "'";

		}
		if (!request.getParameter("idphoto").equals("")) {

			String extfile = request.getParameter("idphoto").substring(
					request.getParameter("idphoto").indexOf("."));
			idPhotoPath = "'" + "../files/resource_files/" + resId + "_idphoto"
					+ extfile + "'";

		}

		boolean contracted = false;
		int targetedDays = 0;
		if (request.getParameter("contracted").equals("2")){
			contracted = true;
			targetedDays = Integer.parseInt(request.getParameter("targeteddays"));
			
		}

		// //insert new row to the database///////////////
		database
				.update("INSERT INTO resources (ResourceFirstName,ResourceLastName,ResourceAbb"
						+ ",ResourceGender,ResourceNationality,"
						+ "ResourceForeignCountry,ResourceBirthDate,"
						+ "ResourceFirstLandTelephone,ResourceSecLandTelephone,"
						+ "ResourceFax,ResourceFirstMobile,"
						+ "ResourceSecMobile,ResourceFirstEmail"
						+ ",ResourceSecEmail,ResourceAddress,ResourceCity,"
						+ "ResourceType,ResourceSeniority,Contracted,ResourceTargetedDays,"
						+ "ResourceHigherDegree,ResourceNationalIdNo,"
						+ "ResourceTaxNo,ResourceTaxDistrict,"
						+ "ResourceTaxPaymentPercent,ResourceTaxFileNumber,"
						+ "Deleted,ResourceImage,"
						+ "ResourceCompanyFormatResume,ResourceOwnResume,ResourceCVUpdate,"
						+ "ResourceBreifFile,ResourceIdPhotoCopy) VALUES ('"
						+ request.getParameter("firstname")
						+ "','"
						+ request.getParameter("lastname")
						+ "','"
						+ request.getParameter("abbreviations")
						+ "',"
						+ gender
						+ ",'"
						+ request.getParameter("resNationality")
						+ "','"
						+ request.getParameter("foreignCountry")
						+ "','"
						+ request.getParameter("birthdate")
						+ "','"
						+ request.getParameter("firstLandTel")
						+ "','"
						+ request.getParameter("secLandTel")
						+ "','"
						+ request.getParameter("fax")
						+ "','"
						+ request.getParameter("firstMobile")
						+ "','"
						+ request.getParameter("secMobile")
						+ "','"

						+ request.getParameter("firstEmail")
						+ "','"
						+ request.getParameter("secEmail")
						+ "','"
						+ request.getParameter("country")
						+ " - "
						+ request.getParameter("resAddress")
						+ "','"
						+ request.getParameter("resCity")
						+ "',"

						+ request.getParameter("resType")
						+ ","
						+ request.getParameter("seniority")
						+ ","

						+ contracted
						+ ","

						+ targetedDays
						+ ","

						+ request.getParameter("highestDegree")
						+ ",'"
						+ request.getParameter("idNumber")
						+ "','"

						+ request.getParameter("taxId")
						+ "','"
						+ request.getParameter("taxDistrict")
						+ "','"

						+ request.getParameter("taxPayment")
						+ "','"
						+ request.getParameter("taxFileNum")
						+ "',0,"
						+ photoPath
						+ ","
						+ companyCVPath
						+ ","
						+ resourceCVPath
						+ ","
						+ lastCVUpdateDate
						+ ","
						+ breifPath + "," + idPhotoPath + ");");

	}

	////////////////////////////////////////////////////////////////////////////
	// /////////////////////////
	public ArrayList retreiveResourceById(DataSourceConnection database,
			HttpServletRequest request) throws SQLException {

		Integer resId = null;
		if (request.getParameter("res_id") == null)
			resId = (Integer) request.getSession().getAttribute("resourceId");
		else
			resId = Integer.parseInt(request.getParameter("res_id"));

		ResultSet resource_rs = database
				.retrieve("select* from resources where Deleted = 0 and idResources = "
						+ resId);

		ArrayList<ResourcesShow> Show = new ArrayList<ResourcesShow>();
		while (resource_rs != null && resource_rs.next()) {

			ResourcesShow rs = new ResourcesShow();

			rs.setResourceId(resource_rs.getInt(1));
			rs.setResourceName(resource_rs.getString(2));
			rs.setResourceLastName(resource_rs.getString(3));

			rs.setResColor(resource_rs.getString(42));
			
			rs.setBirthdate(resource_rs.getString(5));
			rs.setCountry(resource_rs.getString(7).substring(0,
					resource_rs.getString(7).indexOf("-") - 1));
			rs.setResAddress(resource_rs.getString(7).substring(
					resource_rs.getString(7).indexOf("-") + 2,
					resource_rs.getString(7).length()));

			rs.setResNationality(resource_rs.getString(6));
			rs.setForeignCountry(resource_rs.getString(38));

			rs.setIdNumber(resource_rs.getString(15));
			rs.setResCity(resource_rs.getString(9));
			rs.setTaxDestrict(resource_rs.getString(17));
			rs.setTaxId(resource_rs.getString(16));
			rs.setTaxPayment(resource_rs.getString(28));
			rs.setTaxFileNum(resource_rs.getString(29));

			rs.setFirstmobilNum(resource_rs.getString(12));
			rs.setSecmobilNum(resource_rs.getString(8));

			rs.setResFirstEmail(resource_rs.getString(13));
			rs.setResSecEmail(resource_rs.getString(32));

			rs.setResFirstTel(resource_rs.getString(11));
			rs.setResSecTel(resource_rs.getString(36));

			if (resource_rs.getBoolean(40)) {
				rs.setContracted("Yes");
				rs.setTargetedDays(resource_rs.getInt(41));
			} else
				rs.setContracted("No");

			rs.setResFax(resource_rs.getString(37));

			rs.setCvLink(resource_rs.getString(33));
			rs.setBriefLink(resource_rs.getString(18));

			rs.setCompanyCVLink(resource_rs.getString(19));
			rs.setIdPhotoLink(resource_rs.getString(27));

			if (resource_rs.getString(23) != null)
				rs.setLastCVUpdate(resource_rs.getString(23));
			rs.setResourceAbb(resource_rs.getString(30));

			rs.setResourceType(resource_rs.getString(20));

			if (resource_rs.getBoolean(4))
				rs.setGender(1);
			else
				rs.setGender(2);

			rs.setResourceHiegherDegree(resource_rs.getString(22));

			rs.setSeniority(resource_rs.getString(21));

			if (resource_rs.getString(35) != null)
				rs.setContractingStatus(resource_rs.getString(35));

			// Date d = new Date();
			//
			// int age = Integer.parseInt(d.toString().substring(
			// d.toString().length() - 4, d.toString().length()))
			// - Integer.parseInt(resource.getResourceBirthDate()
			// .toString().substring(0, 4));

			// // // ////System.out.println(age);
			rs.setAge(resource_rs.getInt(34));

			if (resource_rs.getString(14) != null) {

				rs.setResourcePhotoName(resource_rs.getString(14));
			} else
				rs.setResourcePhotoName("no_image.jpg");

			Show.add(rs);
		}
		resource_rs.close();
		return Show;
	}

	////////////////////////////////////////////////////////////////////////////
	// //////////////////////////
	public void editResource(DataSourceConnection database,
			HttpServletRequest request) throws SQLException {

		Boolean gender = null;
		String lastCVUpdateDate = null;
		String photoPath = null;
		String companyCVPath = null;
		String resourceCVPath = null;
		String breifPath = null;
		String idPhotoPath = null;

		Integer resId = Integer.parseInt(request.getParameter("resourceId"));

		ResultSet resource_rs = database
				.retrieve("select ResourceImage,ResourceBreifFile,ResourceCompanyFormatResume,ResourceIdPhotoCopy,ResourceOwnResume,ResourceCVUpdate from resources where idResources = "
						+ resId);

		if (resource_rs.next()) {
			if (resource_rs.getString(1) != null)
				photoPath = "'" + resource_rs.getString(1) + "'";

			if (resource_rs.getString(3) != null)
				companyCVPath = "'" + resource_rs.getString(3) + "'";
			if (resource_rs.getString(5) != null)
				resourceCVPath = "'" + resource_rs.getString(5) + "'";
			if (resource_rs.getString(2) != null)
				breifPath = "'" + resource_rs.getString(2) + "'";
			if (resource_rs.getString(4) != null)
				idPhotoPath = "'" + resource_rs.getString(4) + "'";
			if (resource_rs.getString(6) != null)
				lastCVUpdateDate = "'" + resource_rs.getString(6) + "'";

		}

		resource_rs.close();

		// intialize the above variables
		if (Integer.parseInt(request.getParameter("gender")) == 1)
			gender = true;
		else
			gender = false;

		if (!request.getParameter("photo").equals("")) {

			String extfile = request.getParameter("photo").substring(
					request.getParameter("photo").indexOf("."));
			photoPath = "'" + "../files/resource_files/" + resId + "_photo"
					+ extfile + "'";

		}
		if (!request.getParameter("companycv").equals("")) {

			String extfile = request.getParameter("companycv").substring(
					request.getParameter("companycv").indexOf("."));
			companyCVPath = "'" + "../files/resource_files/" + resId
					+ "_company_cv" + extfile + "'";

		}
		if (!request.getParameter("owncv").equals("")) {

			String extfile = request.getParameter("owncv").substring(
					request.getParameter("owncv").indexOf("."));
			resourceCVPath = "'" + "../files/resource_files/" + resId + "_cv"
					+ extfile + "'";

			lastCVUpdateDate = "'" + request.getParameter("cvupdatedate") + "'";

		}
		if (!request.getParameter("brief").equals("")) {

			String extfile = request.getParameter("brief").substring(
					request.getParameter("brief").indexOf("."));
			breifPath = "'" + "../files/resource_files/" + resId + "_brief"
					+ extfile + "'";

		}
		if (!request.getParameter("idphoto").equals("")) {

			String extfile = request.getParameter("idphoto").substring(
					request.getParameter("idphoto").indexOf("."));
			idPhotoPath = "'" + "../files/resource_files/" + resId + "_idphoto"
					+ extfile + "'";

		}

		boolean contracted = false;
		int targetedDays = 0;
		if (request.getParameter("contracted").equals("2")){
			contracted = true;
			targetedDays = Integer.parseInt(request.getParameter("targeteddays"));
			
		}

		// //insert new row to the database///////////////
		database.update("UPDATE resources SET ResourceFirstName = '"
				+ request.getParameter("firstname") + "',ResourceLastName = '"
				+ request.getParameter("lastname") + "',ResourceAbb = '"
				+ request.getParameter("abbreviations") + "',ResourceGender = "
				+ gender + ",ResourceNationality = '"
				+ request.getParameter("resNationality") + "',"
				+ "ResourceForeignCountry = '"
				+ request.getParameter("foreignCountry")
				+ "',ResourceBirthDate = '" + request.getParameter("birthdate")
				+ "'," + "ResourceFirstLandTelephone = '"
				+ request.getParameter("firstLandTel")
				+ "',ResourceSecLandTelephone = '"
				+ request.getParameter("secLandTel") + "'," + "ResourceFax = '"
				+ request.getParameter("fax") + "',ResourceFirstMobile = '"
				+ request.getParameter("firstMobile") + "',"
				+ "ResourceSecMobile = '" + request.getParameter("secMobile")
				+ "',ResourceFirstEmail = '"
				+ request.getParameter("firstEmail") + "'"
				+ ",ResourceSecEmail = '" + request.getParameter("secEmail")
				+ "',ResourceAddress = '" + request.getParameter("country")
				+ " - " + request.getParameter("resAddress")
				+ "',ResourceCity = '" + request.getParameter("resCity") + "',"
				+ "ResourceType = " + request.getParameter("resType")
				+ ",ResourceSeniority = " + request.getParameter("seniority")
				+ ",Contracted = " + contracted + ",ResourceTargetedDays = "
				+ targetedDays + ","
				+ "ResourceHigherDegree = "
				+ request.getParameter("highestDegree")
				+ ",ResourceNationalIdNo = '"
				+ request.getParameter("idNumber") + "'," + "ResourceTaxNo = '"
				+ request.getParameter("taxId") + "',ResourceTaxDistrict = '"
				+ request.getParameter("taxDistrict") + "',"
				+ "ResourceTaxPaymentPercent = '"
				+ request.getParameter("taxPayment")
				+ "',ResourceTaxFileNumber = '"
				+ request.getParameter("taxFileNum") + "',"
				+ "ResourceImage = " + photoPath + ","
				+ "ResourceCompanyFormatResume = " + companyCVPath
				+ ",ResourceOwnResume = " + resourceCVPath
				+ ",ResourceCVUpdate = " + lastCVUpdateDate
				+ ",ResourceBreifFile = " + breifPath
				+ ",ResourceIdPhotoCopy = " + idPhotoPath
				+ " where idResources = " + resId + ";");

	}

	////////////////////////////////////////////////////////////////////////////
	// /////////////////////////
	public void deleteResource(DataSourceConnection database,
			HttpServletRequest request) {
		if (request.getParameterValues("ids").length == 1) {

			database
					.update("UPDATE resources SET Deleted = 1 where idResources = "
							+ request.getParameterValues("ids")[0] + ";");

			database
					.update("UPDATE contractcourse SET Resources_idResources = null WHERE Resources_idResources = "
							+ request.getParameterValues("ids")[0]);

		} else if (request.getParameterValues("ids").length > 1) {
			for (int i = 0; i < request.getParameterValues("ids").length; i++) {

				database
						.update("UPDATE resources SET Deleted = 1 where idResources = "
								+ request.getParameterValues("ids")[i] + ";");

				database
						.update("UPDATE contractcourse SET Resources_idResources = null WHERE Resources_idResources = "
								+ request.getParameterValues("ids")[i]);

			}
		}

	}

	////////////////////////////////////////////////////////////////////////////
	// //////////////////////
	public void addConsultingAreaToResource(DataSourceConnection database,
			HttpServletRequest request) {

		if (request.getParameterValues("selectedconsultingareas") != null) {

			String q = "delete from resourceconsultingareas where ResourceConsultingArea_idResources = "
					+ request.getParameter("resId");

			database.update(q);

			for (int i = 0; i < request
					.getParameterValues("selectedconsultingareas").length; i++) {

				database
						.update("INSERT INTO resourceconsultingareas (ResourceConsultingArea_idResources,ResourceConsultingArea_idConsultingArea) VALUES ("
								+ request.getParameter("resId")
								+ ","
								+ request
										.getParameterValues("selectedconsultingareas")[i]
								+ ");");

			}

		}

	}

	////////////////////////////////////////////////////////////////////////////
	// ////////////////////
	public void addCourseToResource(DataSourceConnection database,
			HttpServletRequest request) {
		if (request.getParameterValues("resourceCourses") != null) {

			Integer id = Integer.parseInt(request.getParameter("resId"));

			String q = "delete from resourcecourses where ResourceCourse_idResources = "
					+ id
					+ " and resourceCourseAbility = "
					+ request.getParameter("ability");

			database.update(q);

			for (int i = 0; i < request.getParameterValues("resourceCourses").length; i++) {

				database
						.update("INSERT INTO resourcecourses (ResourceCourse_idResources,ResourceCourse_idCourses,ResourceCourseAbility) VALUES ("
								+ request.getParameter("resId")
								+ ","
								+ request.getParameterValues("resourceCourses")[i]
								+ "," + request.getParameter("ability") + ");");
			}

		}

	}

	////////////////////////////////////////////////////////////////////////////
	// ////////////////////////
	public String checkIdNumberValidity(DataSourceConnection database,
			HttpServletRequest request) throws SQLException {

		ResultSet resource_rs = database
				.retrieve("Select idResources from resources where ResourceNationalIdNo = '"
						+ request.getParameter("idNumber") + "';");

		if (resource_rs.next())
			return "fail";

		return "success";
	}

	////////////////////////////////////////////////////////////////////////////
	// ///////////////////////////
	public ArrayList retreiveResourceHandouts(DataSourceConnection database,
			HttpServletRequest request) throws SQLException, ParseException {

		String resourceId = request.getParameter("res_id");

		ArrayList<RFilesShow> Show = new ArrayList<RFilesShow>();

		ResultSet rs = database
				.retrieve("Select ResourceCourse_idCourses,idResourceCourse from resourcecourses where ResourceCourse_idResources = "
						+ resourceId + ";");

		while (rs.next()) {

			ResultSet course_rs = database
					.retrieve("select CourseNameEng from courses where idCourses = "
							+ rs.getString(1) + ";");

			if (course_rs.next()) {

				ResultSet handouts_rs = database
						.retrieve("select* from resourcefiles where ResourcesFile_idResources = "
								+ resourceId
								+ " and ResourceCourses_idResourcesCourses = "
								+ rs.getString(2) + ";");

				while (handouts_rs.next()) {

					RFilesShow rsf = new RFilesShow();
					rsf.setIdResourceFiles(handouts_rs.getInt(1));
					rsf
							.setResourceFileUploadDate(s.format(GeneralActions
									.parseDateToRequiredDate(handouts_rs
											.getString(4))));
					rsf.setResourceFileName(handouts_rs.getString(2));
					rsf.setResourceFileLocation(handouts_rs.getString(3));
					rsf.setCourseName(course_rs.getString(1));
					// // ////System.out.println(course_rs.getString(1));
					Show.add(rsf);
				}
				handouts_rs.close();

			}
			course_rs.close();
		}
		rs.close();
		return Show;
	}

	////////////////////////////////////////////////////////////////////////////
	// /////////////////////////
	public void AddHandoutToResource(DataSourceConnection database,
			HttpServletRequest request) throws SQLException {

		String resourceId = request.getParameter("resId");

		ResultSet resourceCourse_rs = database
				.retrieve("Select idResourceCourse from resourcecourses where ResourceCourse_idResources = "
						+ resourceId
						+ " and ResourceCourse_idCourses = "
						+ request.getParameter("courseId") + ";");

		if (resourceCourse_rs.next()) {
			String resourceCourseId = resourceCourse_rs.getString(1);

			String[] files = request.getParameterValues("files");
			String[] names = request.getParameterValues("names");
			for (int i = 0; i < files.length; i++) {
				String fileLocation = "";
				if (!files[i].equals(""))
					fileLocation = "'" + "../files/handouts/" + files[i] + "'";
				// //insert new row to the database/////
				database
						.update("INSERT INTO resourcefiles (ResourcesFile_idResources,ResourceFileName,ResourceFileLocation,ResourceFileUploadDate,ResourceCourses_idResourcesCourses,ResourceFileType,ResourceFileValid) VALUES("
								+ resourceId
								+ ",'"
								+ names[i]
								+ "',"
								+ fileLocation
								+ ",'"
								+ request.getParameter("uploadDate")
								+ "',"
								+ resourceCourseId + ",1,true);");

			}
		}

	}

	////////////////////////////////////////////////////////////////////////////
	// //////////////////
	public void deleteResourceHandout(DataSourceConnection database,
			HttpServletRequest request) {

		for (int i = 0; i < request.getParameterValues("courseHandoutIds").length; i++) {

			String query = "delete from resourcefiles where idResourcefiles = "
					+ request.getParameterValues("courseHandoutIds")[i];

			database.update(query);
		}

	}

	////////////////////////////////////////////////////////////////////////////
	// ///////////////////
	public void addResourceCertificate(DataSourceConnection database,
			HttpServletRequest request) {

		String resourceId = request.getParameter("resId");

		String file = "../files/certificates/"
				+ request.getParameter("resourceFileLocation");
		String name = request.getParameter("resourceFileName");

		// //insert new row to the database/////
		database
				.update("INSERT INTO resourcefiles (ResourcesFile_idResources,ResourceFileName,ResourceFileLocation,ResourceFileUploadDate,ResourceCourses_idResourcesCourses,ResourceFileType,ResourceFileValid) VALUES("
						+ resourceId
						+ ",'"
						+ name
						+ "','"
						+ file
						+ "','"
						+ request.getParameter("uploadDate")
						+ "',"
						+ null
						+ ",2,true);");

	}

	////////////////////////////////////////////////////////////////////////////
	// //////////////////////////
	public ArrayList retreiveResourceCertificates(
			DataSourceConnection database, HttpServletRequest request)
			throws SQLException, ParseException {

		String resourceId = request.getParameter("res_id");

		ArrayList<RFilesShow> Show = new ArrayList<RFilesShow>();

		ResultSet certificates_rs = database
				.retrieve("Select* from resourcefiles where ResourcesFile_idResources = "
						+ resourceId + " and ResourceFileType = 2");

		while (certificates_rs.next()) {

			RFilesShow rsf = new RFilesShow();
			rsf.setIdResourceFiles(certificates_rs.getInt(1));
			rsf.setResourceFileUploadDate(s.format(GeneralActions
					.parseDateToRequiredDate(certificates_rs.getString(4))));
			rsf.setResourceFileName(certificates_rs.getString(2));
			rsf.setResourceFileLocation(certificates_rs.getString(3));

			Show.add(rsf);

		}
		certificates_rs.close();
		return Show;
	}

	////////////////////////////////////////////////////////////////////////////
	// //////////////////
	public void deleteResourceCertificate(DataSourceConnection database,
			HttpServletRequest request) {

		for (int i = 0; i < request.getParameterValues("certificateIds").length; i++) {

			String query = "delete from resourcefiles where idResourcefiles = "
					+ request.getParameterValues("certificateIds")[i];

			database.update(query);
		}

	}

	////////////////////////////////////////////////////////////////////////////
	// ////////////////////////
	public ArrayList retreiveResourceHolidays(DataSourceConnection database,
			HttpServletRequest request) throws SQLException, ParseException {

		String resourceId = request.getParameter("res_id");

		ArrayList<ResourceHolidayShow> Show = new ArrayList<ResourceHolidayShow>();

		ResultSet rs = database
				.retrieve("Select ResourceHolidays_idHolidays from resourceholidays where ResourceHolidays_idResources = "
						+ resourceId + ";");

		while (rs.next()) {

			ResultSet holiday_rs = database
					.retrieve("Select* from holidays where idHolidays = "
							+ rs.getString(1) + ";");

			if (holiday_rs.next()) {
				ResourceHolidayShow rhs = new ResourceHolidayShow();

				rhs.setHolidayId(holiday_rs.getInt(1));
				rhs.setHolidayName(holiday_rs.getString(2));

				// //////
				// // //
				// ////System.out.println(databaseH.getStartDate().toString());

				rhs.setFromDate(s.format(GeneralActions
						.parseDateToRequiredDate(holiday_rs.getString(4))));
				rhs.setToDate(s.format(GeneralActions
						.parseDateToRequiredDate(holiday_rs.getString(5))));

				Show.add(rhs);
			}
			holiday_rs.close();
		}
		rs.close();
		return Show;
	}

	////////////////////////////////////////////////////////////////////////////
	// /////////////////////////
	public void AddResourceHoliday(DataSourceConnection database,
			HttpServletRequest request) throws SQLException {

		String resourceId = request.getParameter("resId");

		// // ////System.out.println("i am in insert holiday");

		boolean oneDay = false;

		Date startDate = new Date();
		startDate = GeneralActions.parseDate(request.getParameter("from"));

		Date endDate = new Date();
		endDate = GeneralActions.parseDate(request.getParameter("to"));

		if (endDate.after(startDate))
			oneDay = false;
		else
			oneDay = true;

		// //insert new row to the database/////
		int resourceHolidayId = 0;

		database
				.update("INSERT INTO holidays (HolidayName,EndDate,StartDate,HolidayFlag,OneDay) VALUES('"
						+ request.getParameter("holidayname")
						+ "','"
						+ request.getParameter("to")
						+ "','"
						+ request.getParameter("from")
						+ "','ResourceHoliday"
						+ "'," + oneDay + ");");

		ResultSet rs = database.retrieve("SELECT idHolidays FROM holidays;");

		if (rs != null && rs.last()) {

			resourceHolidayId = rs.getInt(1);
			rs.close();

			database
					.update("INSERT INTO resourceholidays (ResourceHolidays_idResources,ResourceHolidays_idHolidays) VALUES("
							+ resourceId + "," + resourceHolidayId

							+ ");");

		}

	}

	////////////////////////////////////////////////////////////////////////////
	// //////////////////////
	public void deleteResourceHoliday(DataSourceConnection database,
			HttpServletRequest request) {

		String resourceId = request.getParameter("resId");

		for (int i = 0; i < request.getParameterValues("holidayIds").length; i++) {

			String q = "delete from holidays where idHolidays = "
					+ request.getParameterValues("holidayIds")[i];

			database.update(q);

			q = "delete from resourceholidays where idResourceHolidays = "
					+ request.getParameterValues("holidayIds")[i]
					+ " and ResourceHolidays_idResources = " + resourceId;
			database.update(q);

		}

	}

	////////////////////////////////////////////////////////////////////////////
	// /////////////////////////
	public ArrayList retreiveResourceRates(DataSourceConnection database,
			HttpServletRequest request) throws SQLException, ParseException {
		String resourceId = request.getParameter("res_id");

		ArrayList<ResourceRatesShow> Show = new ArrayList<ResourceRatesShow>();

		ResultSet rs = database
				.retrieve("Select* from resourceratehistory where ResourceRateHistory_idResources = "
						+ resourceId + ";");

		while (rs.next()) {

			ResourceRatesShow rrs = new ResourceRatesShow();

			rrs.setResourceRateId(rs.getInt(1));

			if (rs.getInt(13) == 1)
				rrs.setResourceContractualType("Associate");
			else if (rs.getInt(13) == 2)
				rrs.setResourceContractualType("Freelancer");
			else if (rs.getInt(13) == 3)
				rrs.setResourceContractualType("Not Yet");

			if (rs.getString(7) != null)
				rrs.setDevelopmentRate(rs.getInt(7));

			rrs.setContractCopy(rs.getString(17));

			rrs.setValidFrom(s.format(GeneralActions.parseDateToRequiredDate(rs
					.getString(5))));

			if (rs.getString(14) != null)
				rrs.setConsultingMDFee(rs.getInt(14));

			if (rs.getString(18) != null)
				rrs.setConsultingCurrency(rs.getString(18));

			if (rs.getString(15) != null)
				rrs.setConsultingMDPercentage(rs.getInt(15));

			if (rs.getString(16) != null)
				rrs.setTrainingMDRate(rs.getInt(16));

			if (rs.getString(19) != null)
				rrs.setTrainingCurrency(rs.getString(19));

			if (rs.getBoolean(11))
				rrs.setTaxExempted("Yes");
			else
				rrs.setTaxExempted("No");

			rrs.setComment(rs.getString(12));

			Show.add(rrs);

		}
		rs.close();
		return Show;
	}

	////////////////////////////////////////////////////////////////////////////
	// //////////////
	public void AddResourceRate(DataSourceConnection database,
			HttpServletRequest request) throws SQLException {

		String resourceId = request.getParameter("resId");

		String developmentRate = null;
		Boolean taxExempted = null;
		String trainingManDayRate = null;
		String trainingcurrency = null;
		String consultingManDayFee = null;
		String consultingCurrency = null;
		String consultingManDayPercentage = null;
		String contractCopy = null;

		// intialize the zbove variables
		if (!request.getParameter("devRate").equals(""))
			developmentRate = request.getParameter("devRate");

		if (Integer.parseInt(request.getParameter("taxExempted")) == 1)
			taxExempted = true;
		else if (Integer.parseInt(request.getParameter("taxExempted")) == 2)
			taxExempted = false;

		if (!request.getParameter("consultingManDayFee").equals(""))
			consultingManDayFee = request.getParameter("consultingManDayFee");

		if (!request.getParameter("consultingCurrency").equals(""))
			consultingCurrency = request.getParameter("consultingCurrency");

		if (!request.getParameter("consultingManDayPercentage").equals(""))
			consultingManDayPercentage = request
					.getParameter("consultingManDayPercentage");

		if (!request.getParameter("trainingManDayRate").equals(""))
			trainingManDayRate = request.getParameter("trainingManDayRate");

		if (!request.getParameter("trainingCurrency").equals(""))
			trainingcurrency = request.getParameter("trainingCurrency");

		if (!request.getParameter("contractCopy").equals(""))
			contractCopy = "'" + "../files/contracts/"
					+ request.getParameter("contractCopy") + "'";

		// //insert new row to the database/////
		int resourceRateId = 0;

		database
				.update("INSERT INTO resourceratehistory (ResourceRateHistory_idResources,ResourceRateHistoryContractualType,ResourceRateHistoryContractCopy,ResourceRateHistoryTaxExempted,ResourceRateHistoryValid"
						+ ",ResourceRateHistoryValidFrom,ResourceRateHistoryConsultingMdfee,ResourceRateHistoryConsultingCurrency,"
						+ "ResourceRateHistoryConsultingMdpercentage,ResourceRateHistoryTrainingMdrate,ResourceRateHistoryTrainingCurrency,ResourceRateHistoryComment,ResourceRateHistoryDevelopment) VALUES("
						+ resourceId
						+ ","
						+ request.getParameter("contractualType")
						+ ","
						+ contractCopy
						+ ","
						+ taxExempted
						+ ",1,'"
						+ request.getParameter("validFrom")
						+ "',"
						+ consultingManDayFee
						+ ",'"
						+ consultingCurrency
						+ "',"
						+ consultingManDayPercentage
						+ ","
						+ trainingManDayRate
						+ ",'"
						+ trainingcurrency
						+ "','"
						+ request.getParameter("rateComment")
						+ "',"
						+ developmentRate + ");");

		database.update("UPDATE resources SET ResourceContractualType ="
				+ request.getParameter("contractualType")
				+ " where idResources = " + resourceId + ";");

		ResultSet rs = database
				.retrieve("SELECT idResourceRateHistory FROM resourceratehistory;");

		if (rs != null && rs.last()) {

			resourceRateId = rs.getInt(1);
			rs.close();

			database
					.update("UPDATE resourceratehistory SET ResourceRateHistoryValidTo = '"
							+ request.getParameter("validFrom")
							+ "' where idResourceRateHistory = "
							+ (resourceRateId - 1) + ";");
		}

	}

	////////////////////////////////////////////////////////////////////////////
	// ///////////////
	public void deleteResourceRate(DataSourceConnection database,
			HttpServletRequest request) {

		for (int i = 0; i < request.getParameterValues("rateIds").length; i++) {

			String q = "delete from resourceratehistory where idResourceRateHistory = "
					+ request.getParameterValues("rateIds")[i];

			database.update(q);
		}

	}

	//////////////////////////////////////////////////////////////////////////////
	public String retreiveResourceColors(DataSourceConnection database) throws SQLException {
		String xmlText = "";
		ResultSet rs = database
				.retrieve("Select ResourceColor from resources;");

		
		while (rs.next() && rs.getString(1) != null && !rs.getString(1).equals("")) {

			xmlText = xmlText + "<Resource><resourceColor>" + rs.getString(1)
					+ "</resourceColor></Resource>";

		}
		rs.close();
		
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	/////////////////////////////////////////////////////////////////////////////////////
	public void editResourceColor(DataSourceConnection database,
			HttpServletRequest request) {
		
		// //insert new row to the database///////////////
		database.update("UPDATE resources SET ResourceColor = '"
				+ request.getParameter("color")
				+ "' where idResources = " + request.getParameter("resId") + ";");
	}
}
