/**
 *
 */
package abItems;

import java.sql.ResultSet;
import java.sql.SQLException;

import database.DataSourceConnection;

/**
 * @author noha for AB Items Retreiving all methods return xml string the
 *         returned string contains the name and id of the item
 */
public class ABItemsRetreiving {

	// //////////////////////////////////////////////////////////////////////////////////
	public String retreiveCourses(DataSourceConnection database)
			throws SQLException {

		String xmlText = "";
		ResultSet rs = database
				.retrieve("Select idCourses,CourseNameEng from courses;");

		while (rs.next()) {

			xmlText = xmlText + "<Course><courseId>" + rs.getString(1)
					+ "</courseId><courseName>" + rs.getString(2)
					+ "</courseName></Course>";

		}
		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// /////////////////////////////////////////////////////////////////////////////////////
	public String retreiveClients(DataSourceConnection database)
			throws SQLException {

		String xmlText = "";
		ResultSet rs = database
				.retrieve("Select idClients,ClientName from clients;");

		while (rs.next()) {

			xmlText = xmlText + "<Client><clientId>" + rs.getString(1)
					+ "</clientId><clientName>" + rs.getString(2)
					+ "</clientName></Client>";

		}
		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// /////////////////////////////////////////////////////////////////////////////////////
	public String retreiveCoordinators(DataSourceConnection database)
			throws SQLException {

		String xmlText = "";
		ResultSet rs = database
				.retrieve("Select idTrainingCoordinators,TrainingCoordinateFirstName,TrainingCoordinateLastName from trainingcoordinators  where TrainingCoordinatorDeleted = 0  ;");

		while (rs.next()) {

			xmlText = xmlText + "<Coordinator><coordinatorId>"
					+ rs.getString(1) + "</coordinatorId><coordinatorName>"
					+ rs.getString(2) +" "+ rs.getString(3)+ "</coordinatorName></Coordinator>";

		}
		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// /////////////////////////////////////////////////////////////////////////////////////
	public String retreiveCoordinatorsTeams(DataSourceConnection database)
			throws SQLException {

		String xmlText = "";
		ResultSet rs = database
				.retrieve("Select Teamsid,TeamsName from teams;");

		while (rs.next()) {

			xmlText = xmlText + "<CoordinatorsTeam><coordinatorsTeamId>"
					+ rs.getString(1)
					+ "</coordinatorsTeamId><coordinatorsTeamName>"
					+ rs.getString(2)
					+ "</coordinatorsTeamName></CoordinatorsTeam>";

		}
		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// /////////////////////////////////////////////////////////////////////////////////////
	public String retreiveResources(DataSourceConnection database)
			throws SQLException {

		String xmlText = "";
		ResultSet rs = database
				.retrieve("Select idResources,ResourceFirstName,ResourceLastName from resources where Deleted = 0;");

		while (rs.next()) {

			xmlText = xmlText + "<Resource><resourceId>" + rs.getString(1)
					+ "</resourceId><resourceName>" + rs.getString(2)
					+" "+ rs.getString(3)+ "</resourceName></Resource>";

		}
		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// /////////////////////////////////////////////////////////////////////////////////////
	public String retreiveVenues(DataSourceConnection database)
			throws SQLException {

		String xmlText = "";
		ResultSet rs = database
				.retrieve("Select idVenues,VenueName from venues;");

		while (rs.next()) {

			xmlText = xmlText + "<Venue><venueId>" + rs.getString(1)
					+ "</venueId><venueName>" + rs.getString(2)
					+ "</venueName></Venue>";

		}
		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// /////////////////////////////////////////////////////////////////////////////////////
	public String retreiveTracks(DataSourceConnection database)
			throws SQLException {

		String xmlText = "";
		ResultSet rs = database
				.retrieve("Select idTracks,TrackName from tracks;");

		while (rs.next()) {

			xmlText = xmlText + "<Track><trackId>" + rs.getString(1)
					+ "</trackId><trackName>" + rs.getString(2)
					+ "</trackName></Track>";

		}
		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// /////////////////////////////////////////////////////////////////////////////////////
	public String retreiveTrainingAreas(DataSourceConnection database)
			throws SQLException {

		String xmlText = "";
		ResultSet rs = database
				.retrieve("Select idTrainingAreas,TrainingAreaName from trainingareas;");

		while (rs.next()) {

			xmlText = xmlText + "<TrainingArea><trainingAreaId>"
					+ rs.getString(1) + "</trainingAreaId><trainingAreaName>"
					+ rs.getString(2) + "</trainingAreaName></TrainingArea>";

		}
		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// /////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveCoursesByTrainingAreaId(
			DataSourceConnection database, String taId) throws SQLException {

		String xmlText = "";
		ResultSet rs = database
				.retrieve("Select idCourses,CourseNameEng from courses where Course_idTrainingAreas = "
						+ taId + ";");

		while (rs.next()) {

			xmlText = xmlText + "<Course><courseId>" + rs.getString(1)
					+ "</courseId><courseName>" + rs.getString(2)
					+ "</courseName></Course>";
		}
		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// /////////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveCoursesByTrackId(DataSourceConnection database,
			String trackId) throws SQLException {
		String xmlText = "";
		ResultSet rs = database
				.retrieve("select TrackCourses_idCourses from trackcourses where TrackCoures_idTracks = "
						+ trackId + ";");

		while (rs.next()) {

			ResultSet course_rs = database
					.retrieve("select idCourses,CourseNameEng from courses where idCourses = "
							+ rs.getString(1) + ";");

			if (course_rs.next()) {
				xmlText = xmlText + "<Course><courseId>"
						+ course_rs.getString(1) + "</courseId><courseName>"
						+ course_rs.getString(2) + "</courseName></Course>";
			}
		}
		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// /////////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveResourcesByCourseId(DataSourceConnection database,
			String courseId) throws SQLException {
		String xmlText = "";
		ResultSet rs = database
				.retrieve("Select idResources,ResourceFirstName,ResourceLastName from resources where Deleted = 0;");

		ResultSet courses_rs = database
				.retrieve("Select Courses_idCourses from contractcourse where idContractCourse = "
						+ courseId);
		if(courses_rs.next())
		while (rs.next()) {

				ResultSet resourceCourses_rs = database
						.retrieve("Select idResourceCourse from resourcecourses where ResourceCourse_idCourses = "
								+ courses_rs.getString(1)
								+ " and ResourceCourse_idResources = "
								+ rs.getString(1));
				if (resourceCourses_rs.next())
					xmlText = xmlText + "<Resource><resourceId>"
							+ rs.getString(1) + "</resourceId><resourceName>"
							+ rs.getString(2)+" "+rs.getString(3) + "</resourceName></Resource>";

				resourceCourses_rs.close();


		}
		courses_rs.close();
		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// /////////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveCoordinatorsByTeamId(DataSourceConnection database,
			String teamId) throws SQLException {
		String xmlText = "";

		ResultSet rs = database
				.retrieve("select Memberid from teammembers where Teamid = "
						+ teamId);

		while (rs.next()) {

			ResultSet coordinator_rs = database
					.retrieve("Select idTrainingCoordinators,TrainingCoordinateFirstName,TrainingCoordinateLastName from trainingcoordinators where idTrainingCoordinators = "
							+ rs.getString(1) + ";");

			if (coordinator_rs.next())
				xmlText = xmlText + "<Coordinator><coordinatorId>"
						+ coordinator_rs.getString(1)
						+ "</coordinatorId><coordinatorName>"
						+ coordinator_rs.getString(2)+" "+coordinator_rs.getString(3)
						+ "</coordinatorName></Coordinator>";

			coordinator_rs.close();
		}
		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// //////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveConsultingAreas(DataSourceConnection database)
			throws SQLException {
		String xmlText = "";
		ResultSet rs = database
				.retrieve("Select idConsultingAreas,ConsultingAreasName from consultingareas;");

		while (rs.next()) {

			xmlText = xmlText + "<ConsultingArea><consultingAreaId>"
					+ rs.getString(1)
					+ "</consultingAreaId><consultingAreaName>"
					+ rs.getString(2)
					+ "</consultingAreaName></ConsultingArea>";

		}
		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// ////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveCoursesByResourceId(DataSourceConnection database,
			String resId) throws SQLException {

		String xmlText = "";
		ResultSet rs = database
				.retrieve("Select ResourceCourse_idCourses,ResourceCourseAbility from resourcecourses where ResourceCourse_idResources = "
						+ resId + ";");

		while (rs.next()) {
			ResultSet course_rs = database
					.retrieve("select idCourses,CourseNameEng from courses where idCourses = "
							+ rs.getString(1) + ";");

			if (course_rs.next()) {
				xmlText = xmlText + "<Course><courseId>"
						+ course_rs.getString(1) + "</courseId><courseName>"
						+ course_rs.getString(2)
						+ "</courseName><resourceAbility>" + rs.getString(2)
						+ "</resourceAbility></Course>";
			}
			course_rs.close();
		}

		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// ////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveRemainCoursesByResourceId(
			DataSourceConnection database, String resId) throws SQLException {

		String xmlText = "";

		ResultSet courses_rs = database
				.retrieve("select idCourses,CourseNameEng from courses");

		while (courses_rs.next()) {
			ResultSet rs = database
					.retrieve("Select ResourceCourse_idCourses from resourcecourses where ResourceCourse_idCourses = "
							+ courses_rs.getString(1)
							+ " and ResourceCourse_idResources = "
							+ resId
							+ ";");

			if (!rs.next()) {
				xmlText = xmlText + "<Course><courseId>"
						+ courses_rs.getString(1) + "</courseId><courseName>"
						+ courses_rs.getString(2) + "</courseName></Course>";
			}
			rs.close();
		}

		courses_rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// /////////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveConsultingAreasByResourceId(
			DataSourceConnection database, String resId) throws SQLException {
		String xmlText = "";
		ResultSet rs = database
				.retrieve("Select ResourceConsultingArea_idConsultingArea from resourceconsultingareas where ResourceConsultingArea_idResources = "
						+ resId + ";");

		while (rs.next()) {
			ResultSet consultingArea_rs = database
					.retrieve("Select idConsultingAreas,ConsultingAreasName from consultingareas where idConsultingAreas = "
							+ rs.getString(1) + ";");

			if (consultingArea_rs.next()) {
				xmlText = xmlText + "<ConsultingArea><consultingAreaId>"
						+ consultingArea_rs.getString(1)
						+ "</consultingAreaId><consultingAreaName>"
						+ consultingArea_rs.getString(2)
						+ "</consultingAreaName></ConsultingArea>";
			}
			consultingArea_rs.close();
		}

		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// ////////////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveRemainConsultingAreasByResourceId(
			DataSourceConnection database, String resId) throws SQLException {
		String xmlText = "";

		ResultSet consultingArea_rs = database
				.retrieve("Select idConsultingAreas,ConsultingAreasName from consultingareas");

		while (consultingArea_rs.next()) {
			ResultSet rs = database
					.retrieve("Select ResourceConsultingArea_idResources from resourceconsultingareas where ResourceConsultingArea_idConsultingArea = "
							+ consultingArea_rs.getString(1)
							+ " and ResourceConsultingArea_idResources = "
							+ resId + ";");

			if (!rs.next()) {
				xmlText = xmlText + "<ConsultingArea><consultingAreaId>"
						+ consultingArea_rs.getString(1)
						+ "</consultingAreaId><consultingAreaName>"
						+ consultingArea_rs.getString(2)
						+ "</consultingAreaName></ConsultingArea>";
			}
			rs.close();

		}

		consultingArea_rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// ////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveContractsByClientId(DataSourceConnection database,
			String clientId) throws SQLException {
		String xmlText = "";

		ResultSet rs = database
				.retrieve("Select idContracts,ContractName from contracts where Contract_idClients = "
						+ clientId+" and Deleted = 0");

		while (rs.next()) {

			xmlText = xmlText + "<Contract><contractId>" + rs.getString(1)
					+ "</contractId><contractName>" + rs.getString(2)
					+ "</contractName></Contract>";

		}

		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// ////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveCoursesByContractId(DataSourceConnection database,
			String contractId) throws SQLException {

		String xmlText = "";

		ResultSet rs = database
				.retrieve("Select distinct Courses_idCourses from contractcourse where Contracts_idContracts = "
						+ contractId);

		while (rs.next()) {
			ResultSet course_rs = database
					.retrieve("select idCourses,CourseNameEng from courses where idCourses = "
							+ rs.getString(1) + ";");

			if (course_rs.next()) {
				xmlText = xmlText + "<Course><courseId>"
						+ course_rs.getString(1) + "</courseId><courseName>"
						+ course_rs.getString(2) + "</courseName></Course>";
			}
			course_rs.close();
		}

		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// ///////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveCoursesByClientId(DataSourceConnection database,
			String clientId) throws SQLException {
		String xmlText = "";

		ResultSet contracts_rs = database
				.retrieve("Select idContracts from contracts where Contract_idClients = "
						+ clientId+" and Deleted = 0");

		String query = "Select distinct Courses_idCourses from contractcourse where ";
		while (contracts_rs.next()) {

			query = query + "Contracts_idContracts = "
					+ contracts_rs.getString(1) + " or ";

		}

		ResultSet rs = database
				.retrieve(query.substring(0, query.length() - 3));

		while (rs.next()) {
			ResultSet course_rs = database
					.retrieve("select idCourses,CourseNameEng from courses where idCourses = "
							+ rs.getString(1) + ";");

			if (course_rs.next()) {
				xmlText = xmlText + "<Course><courseId>"
						+ course_rs.getString(1) + "</courseId><courseName>"
						+ course_rs.getString(2) + "</courseName></Course>";
			}
			course_rs.close();
		}

		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// /////////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveAssignedResourcesByContractId(
			DataSourceConnection database, String contractId)
			throws SQLException {

		String xmlText = "";

		ResultSet rs = database
				.retrieve("select distinct Resources_idResources from contractcourse where Contracts_idContracts = "
						+ contractId);

		while (rs.next()) {
			ResultSet resource_rs = database
					.retrieve("Select idResources,ResourceFirstName,ResourceLastName from resources where idResources = "
							+ rs.getString(1) + " and Deleted = 0;");

			if (resource_rs.next()) {
				xmlText = xmlText + "<Resource><resourceId>"
						+ resource_rs.getString(1)
						+ "</resourceId><resourceName>"
						+ resource_rs.getString(2)+" "+resource_rs.getString(3)
						+ "</resourceName></Resource>";
			}
			resource_rs.close();
		}

		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;

	}

	// /////////////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveAssignedResourcesByClientId(
			DataSourceConnection database, String clientId) throws SQLException {
		String xmlText = "";

		ResultSet contracts_rs = database
				.retrieve("Select idContracts from contracts where Contract_idClients = "
						+ clientId+" and Deleted = 0");

		String query = "Select distinct Resources_idResources from contractcourse where ";
		while (contracts_rs.next()) {

			query = query + "Contracts_idContracts = "
					+ contracts_rs.getString(1) + " or ";

		}

		ResultSet rs = database
				.retrieve(query.substring(0, query.length() - 3));

		while (rs.next()) {
			ResultSet resource_rs = database
					.retrieve("Select idResources,ResourceFirstName,ResourceLastName from resources where idResources = "
							+ rs.getString(1) + " and Deleted = 0;");

			if (resource_rs.next()) {
				xmlText = xmlText + "<Resource><resourceId>"
						+ resource_rs.getString(1)
						+ "</resourceId><resourceName>"
						+ resource_rs.getString(2)+" "+resource_rs.getString(3)
						+ "</resourceName></Resource>";
			}
			resource_rs.close();
		}

		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// /////////////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveAssignedResourcesByCourseId(
			DataSourceConnection database, String courseId) throws SQLException {
		String xmlText = "";

		ResultSet rs = database
				.retrieve("select distinct Resources_idResources from contractcourse where Courses_idCourses = "
						+ courseId);

		while (rs.next()) {
			ResultSet resource_rs = database
					.retrieve("Select idResources,ResourceFirstName,ResourceLastName from resources where idResources = "
							+ rs.getString(1) + " and Deleted = 0;");

			if (resource_rs.next()) {
				xmlText = xmlText + "<Resource><resourceId>"
						+ resource_rs.getString(1)
						+ "</resourceId><resourceName>"
						+ resource_rs.getString(2)+" "+resource_rs.getString(3)
						+ "</resourceName></Resource>";
			}
			resource_rs.close();
		}

		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;

	}

	// ////////////////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveAssignedCoordinatorsByContractId(
			DataSourceConnection database, String contractId)
			throws SQLException {

		String xmlText = "";

		ResultSet rs = database
				.retrieve("select distinct TrainingCoordinators_idTrainingCoordinators from contractcourse where Contracts_idContracts = "
						+ contractId);

		while (rs.next()) {
			ResultSet coordinator_rs = database
					.retrieve("Select idTrainingCoordinators,TrainingCoordinateFirstName,TrainingCoordinateLastName from trainingcoordinators where idTrainingCoordinators = "
							+ rs.getString(1) + ";");

			if (coordinator_rs.next())
				xmlText = xmlText + "<Coordinator><coordinatorId>"
						+ coordinator_rs.getString(1)
						+ "</coordinatorId><coordinatorName>"
						+ coordinator_rs.getString(2)+" "+coordinator_rs.getString(3)
						+ "</coordinatorName></Coordinator>";

			coordinator_rs.close();
		}

		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// ////////////////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveAssignedCoordinatorsByClientId(
			DataSourceConnection database, String clientId) throws SQLException {
		String xmlText = "";

		ResultSet contracts_rs = database
				.retrieve("Select idContracts from contracts where Contract_idClients = "
						+ clientId+" and Deleted = 0");

		String query = "Select distinct TrainingCoordinators_idTrainingCoordinators from contractcourse where ";
		while (contracts_rs.next()) {

			query = query + "Contracts_idContracts = "
					+ contracts_rs.getString(1) + " or ";

		}

		ResultSet rs = database
				.retrieve(query.substring(0, query.length() - 3));

		while (rs.next()) {
			ResultSet coordinator_rs = database
					.retrieve("Select idTrainingCoordinators,TrainingCoordinateFirstName,TrainingCoordinateLastName from trainingcoordinators where idTrainingCoordinators = "
							+ rs.getString(1) + ";");

			if (coordinator_rs.next())
				xmlText = xmlText + "<Coordinator><coordinatorId>"
						+ coordinator_rs.getString(1)
						+ "</coordinatorId><coordinatorName>"
						+ coordinator_rs.getString(2)+" "+coordinator_rs.getString(3)
						+ "</coordinatorName></Coordinator>";

			coordinator_rs.close();
		}

		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// /////////////////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveAssignedCoordinatorsByCourseId(
			DataSourceConnection database, String courseId) throws SQLException {
		String xmlText = "";

		ResultSet rs = database
				.retrieve("select distinct TrainingCoordinators_idTrainingCoordinators from contractcourse where Courses_idCourses = "
						+ courseId);

		while (rs.next()) {
			ResultSet coordinator_rs = database
					.retrieve("Select idTrainingCoordinators,TrainingCoordinateFirstName,TrainingCoordinateLastName from trainingcoordinators where idTrainingCoordinators = "
							+ rs.getString(1) + ";");

			if (coordinator_rs.next())
				xmlText = xmlText + "<Coordinator><coordinatorId>"
						+ coordinator_rs.getString(1)
						+ "</coordinatorId><coordinatorName>"
						+ coordinator_rs.getString(2)+" "+coordinator_rs.getString(3)
						+ "</coordinatorName></Coordinator>";

			coordinator_rs.close();
		}

		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	// ///////////////////////////////////////////////////////////////////////////////////////////////////
	public String retreiveContractDealPersons(DataSourceConnection database,int dealPersonType)
			throws SQLException {
		String xmlText = "";

		if(dealPersonType == 2){
		ResultSet rs = database
				.retrieve("Select idTrainingCoordinators,TrainingCoordinateFirstName,TrainingCoordinateLastName from trainingcoordinators;");

		while (rs.next()) {

			xmlText = xmlText + "<DealPerson><dealPersonId>" + rs.getString(1)
					+ "</dealPersonId><dealPersonName>" + rs.getString(2)+" "+rs.getString(3)
					+ "</dealPersonName><dealPersonType>" + "TrainingCoordinators"
					+ "</dealPersonType></DealPerson>";

		}
		rs.close();
		}
		else if(dealPersonType == 3){
			ResultSet rs = database
				.retrieve("Select idResources,ResourceFirstName,ResourceLastName from resources where ResourceContractualType = 1 and Deleted = 0;");

		while (rs.next()) {

			xmlText = xmlText + "<DealPerson><dealPersonId>" + rs.getString(1)
					+ "</dealPersonId><dealPersonName>" + rs.getString(2)+" "+rs.getString(3)
					+ "</dealPersonName><dealPersonType>" + "Resources"
					+ "</dealPersonType></DealPerson>";

		}
		rs.close();
		}
		else if(dealPersonType == 1){
			ResultSet rs = database.retrieve("Select idUsers,UserUsername from users;");

		while (rs.next()) {

			xmlText = xmlText + "<DealPerson><dealPersonId>" + rs.getString(1)
					+ "</dealPersonId><dealPersonName>" + rs.getString(2)
					+ "</dealPersonName><dealPersonType>" + "Users"
					+ "</dealPersonType></DealPerson>";

		}
		rs.close();
		}

		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	/////////////////////////////////////////////////////////////////////////////
	public String retreiveContractCourseVenues(DataSourceConnection database) throws SQLException {
		String xmlText = "";
		ResultSet rs = database
				.retrieve("Select idVenues,VenueName from venues;");

		while (rs.next()) {

			xmlText = xmlText + "<Venue><venueId>" + rs.getString(1)
					+ "</venueId><venueName>" + rs.getString(2)
					+ "</venueName></Venue>";

		}

		xmlText = xmlText + "<Venue><venueId>" + "-1"
		+ "</venueId><venueName>" + "Other"
		+ "</venueName></Venue>";

		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}

	////////////////////////////////////////////////////////////////////////////////
	public String retreiveContracts(DataSourceConnection database) throws SQLException {
		String xmlText = "";

		ResultSet rs = database
				.retrieve("Select idContracts,ContractName from contracts where Deleted = 0");

		while (rs.next()) {

			xmlText = xmlText + "<Contract><contractId>" + rs.getString(1)
					+ "</contractId><contractName>" + rs.getString(2)
					+ "</contractName></Contract>";

		}

		rs.close();
		xmlText = "<list>" + xmlText + "</list>";
		return xmlText;
	}
}
