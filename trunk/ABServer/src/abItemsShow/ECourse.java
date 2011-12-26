/**
 * 
 */
package abItemsShow;

/**
 * @author noha
 * Jul 7, 2008
 */
public class ECourse {

	int    Courseid = 1;
    String MainColor = "#EECBAD";
    String MainApp = "MA";
    
    String SecColor = "red";
    String SecApp = "SA";
    
    String CourseName = "";
    String Client = "";
    String type = "Remider";
  
    String ResourceName = "Not Assigned";
    String CoordinatorName = "Not Assigned";
    String Location = "Not Assigned";    
    String content = "What will be written in the tool tip";  
    String summary = "When: 2008-08-23T10:00:00 60"; 
    String title = "";
    int    RunNo = 0;
    int    Runs = 0;
    int    NoOfDays = 0;
    String Period="FD";
   
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
	 * @return the content
	 */
	public String getContent() {
		return content;
	}

	/**
	 * @param content the content to set
	 */
	public void setContent(String content) {
		this.content = content;
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
	 * @return the courseid
	 */
	public int getCourseid() {
		return Courseid;
	}

	/**
	 * @param courseid the courseid to set
	 */
	public void setCourseid(int courseid) {
		Courseid = courseid;
	}

	/**
	 * @return the courseName
	 */
	public String getCourseName() {
		return CourseName;
	}

	/**
	 * @param courseName the courseName to set
	 */
	public void setCourseName(String courseName) {
		CourseName = courseName;
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
	 * @return the noOfDays
	 */
	public int getNoOfDays() {
		return NoOfDays;
	}

	/**
	 * @param noOfDays the noOfDays to set
	 */
	public void setNoOfDays(int noOfDays) {
		NoOfDays = noOfDays;
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

}
