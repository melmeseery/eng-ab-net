/**
 *
 */
package abItemsShow;

import java.util.ArrayList;

/**
 * @author Administrator
 *
 */
public class Course {


	String starttime = "2008-06-02T15:52:07-08:00";
	String endtime = "2008-06-02T15:52:07-08:00";

	String ContractID;

	int ID;

	String MainColor = "#EECBAD";
    String MainApp = "MA";

    String SecColor = "red";
    String SecApp = "SA";

    String resourceColor = "";
    String coordinatorColor = "";
    String clientColor = "";

    String resourceApp = "";
    String coordinatorApp = "";
    String clientApp = "";

    int funded = 1;

    String Name = "";
    String Client = "";
    String type = "reminder";

    String ResourceName = "Not Assigned";
    String CoordinatorName = "Not Assigned";
    String Location = "Not Assigned";
    String Details = "What will be written in the tool tip";
    String summary = "When: 2008-08-23T10:00:00 60";
    String title = "";
    int    RunNo = 0;
    int    Runs = 0;
    int    Days = 0;
    String Period="FD";

    ArrayList CourseDays_array;

	/**
	 * @return the clientColor
	 */
	public String getClientColor() {
		return clientColor;
	}
	/**
	 * @param clientColor the clientColor to set
	 */
	public void setClientColor(String clientColor) {
		this.clientColor = clientColor;
	}
	/**
	 * @return the resourceApp
	 */
	public String getResourceApp() {
		return resourceApp;
	}
	/**
	 * @param resourceApp the resourceApp to set
	 */
	public void setResourceApp(String resourceApp) {
		this.resourceApp = resourceApp;
	}
	/**
	 * @return the coordinatorApp
	 */
	public String getCoordinatorApp() {
		return coordinatorApp;
	}
	/**
	 * @param coordinatorApp the coordinatorApp to set
	 */
	public void setCoordinatorApp(String coordinatorApp) {
		this.coordinatorApp = coordinatorApp;
	}
	/**
	 * @return the clientApp
	 */
	public String getClientApp() {
		return clientApp;
	}
	/**
	 * @param clientApp the clientApp to set
	 */
	public void setClientApp(String clientApp) {
		this.clientApp = clientApp;
	}
	/**
	 * @return the funded
	 */
	public int getFunded() {
		return funded;
	}
	/**
	 * @return the resourceColor
	 */
	public String getResourceColor() {
		return resourceColor;
	}
	/**
	 * @param resourceColor the resourceColor to set
	 */
	public void setResourceColor(String resourceColor) {
		this.resourceColor = resourceColor;
	}
	/**
	 * @return the coordinatorColor
	 */
	public String getCoordinatorColor() {
		return coordinatorColor;
	}
	/**
	 * @param coordinatorColor the coordinatorColor to set
	 */
	public void setCoordinatorColor(String coordinatorColor) {
		this.coordinatorColor = coordinatorColor;
	}
	/**
	 * @return the funded
	 */
	public int isFunded() {
		return funded;
	}
	/**
	 * @param funded the funded to set
	 */
	public void setFunded(int funded) {
		this.funded = funded;
	}
	/**
	 * @return the courseDaysXml
	 */
	public ArrayList getCourseDays() {
		return CourseDays_array;
	}
	/**
	 * @param courseDaysXml the courseDaysXml to set
	 */
	public void setCourseDays(ArrayList courseDaysXml) {
		CourseDays_array = courseDaysXml;
	}
	/**
	 * @return the starttime
	 */
	public String getStarttime() {
		return starttime;
	}
	/**
	 * @param starttime the starttime to set
	 */
	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}


    /**
	 * @return the iD
	 */
	public int getID() {
		return ID;
	}
	/**
	 * @param id the iD to set
	 */
	public void setID(int id) {
		ID = id;
	}

	/**
	 * @return the endtime
	 */
	public String getEndtime() {
		return endtime;
	}
	/**
	 * @param endtime the endtime to set
	 */
	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}
	/**
	 * @return the contractID
	 */
	public String getContractID() {
		return ContractID;
	}
	/**
	 * @param contractID the contractID to set
	 */
	public void setContractID(String contractID) {
		ContractID = contractID;
	}
	/**
	 * @return the mainColor
	 */
	public String getMainColor() {
		return MainColor;
	}
	/**
	 * @param mainColor the mainColor to set
	 */
	public void setMainColor(String mainColor) {
		MainColor = mainColor;
	}
	/**
	 * @return the mainApp
	 */
	public String getMainApp() {
		return MainApp;
	}
	/**
	 * @param mainApp the mainApp to set
	 */
	public void setMainApp(String mainApp) {
		MainApp = mainApp;
	}
	/**
	 * @return the secColor
	 */
	public String getSecColor() {
		return SecColor;
	}
	/**
	 * @param secColor the secColor to set
	 */
	public void setSecColor(String secColor) {
		SecColor = secColor;
	}
	/**
	 * @return the secApp
	 */
	public String getSecApp() {
		return SecApp;
	}
	/**
	 * @param secApp the secApp to set
	 */
	public void setSecApp(String secApp) {
		SecApp = secApp;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return Name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		Name = name;
	}
	/**
	 * @return the client
	 */
	public String getClient() {
		return Client;
	}
	/**
	 * @param client the client to set
	 */
	public void setClient(String client) {
		Client = client;
	}
	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}
	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}
	/**
	 * @return the resourceName
	 */
	public String getResourceName() {
		return ResourceName;
	}
	/**
	 * @param resourceName the resourceName to set
	 */
	public void setResourceName(String resourceName) {
		ResourceName = resourceName;
	}
	/**
	 * @return the coordinatorName
	 */
	public String getCoordinatorName() {
		return CoordinatorName;
	}
	/**
	 * @param coordinatorName the coordinatorName to set
	 */
	public void setCoordinatorName(String coordinatorName) {
		CoordinatorName = coordinatorName;
	}
	/**
	 * @return the location
	 */
	public String getLocation() {
		return Location;
	}
	/**
	 * @param location the location to set
	 */
	public void setLocation(String location) {
		Location = location;
	}
	/**
	 * @return the details
	 */
	public String getDetails() {
		return Details;
	}
	/**
	 * @param details the details to set
	 */
	public void setDetails(String details) {
		Details = details;
	}
	/**
	 * @return the summary
	 */
	public String getSummary() {
		return summary;
	}
	/**
	 * @param summary the summary to set
	 */
	public void setSummary(String summary) {
		this.summary = summary;
	}
	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}
	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	/**
	 * @return the runNo
	 */
	public int getRunNo() {
		return RunNo;
	}
	/**
	 * @param runNo the runNo to set
	 */
	public void setRunNo(int runNo) {
		RunNo = runNo;
	}
	/**
	 * @return the runs
	 */
	public int getRuns() {
		return Runs;
	}
	/**
	 * @param runs the runs to set
	 */
	public void setRuns(int runs) {
		Runs = runs;
	}
	/**
	 * @return the days
	 */
	public int getDays() {
		return Days;
	}
	/**
	 * @param days the days to set
	 */
	public void setDays(int days) {
		Days = days;
	}
	/**
	 * @return the period
	 */
	public String getPeriod() {
		return Period;
	}
	/**
	 * @param period the period to set
	 */
	public void setPeriod(String period) {
		Period = period;
	}



}
