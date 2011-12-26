/**
 * 
 */
package abItemsShow;

import java.util.Date;

/**
 * @author noha
 *
 */
public class CoursesShow {

	int courseId = 0;
//	int contractId = 0;
	String courseName = "";
	String courseType = "";
	String courseDescription = "";
	String coursePriceType = "";
	String courseComment = "";

	int courseRuns = 0;
	int courseDays = 0;
	int courseTotalDays = 0;
	int coursePrice = 0;
	int courseParticipantsPerRun = 0;
	int courseTotalPrice = 0;
	int courseFund = 0;
	int priceRole = 0;
	
	int coordinatorId = 0;
	int resourceId = 0;
	int venueId = 0;
	
	String coordinatorName= "";
	String resourceName = "";
	String venueName = "";
	String venueDetails = "";
	
	String status = "";
	
	boolean resourceConfirm = false;
	boolean venueConfirm = false;
	
	boolean locReceived = false;
	boolean CPRReceived = false;
	
	boolean clientConfirm = false;
	boolean courseCancel = false;
	
	String clientConfirmDate = "";
	String cancelDate = "";
	
	int locNumber = 0;
	
	String locReceivedDate = "";
	String CPRReceivedDate = "";
	
	String venueConfirmDate = "";
	String resourceConfirmDate = "";
	
	
	String venueLocation = "";
	
	String datashowRequest = "";
	
	int courseTime = 0;
	
	
	/**
	 * @return the priceRole
	 */
	public int getPriceRole() {
		return priceRole;
	}
	/**
	 * @param priceRole the priceRole to set
	 */
	public void setPriceRole(int priceRole) {
		this.priceRole = priceRole;
	}
	/**
	 * @return the courseComment
	 */
	public String getCourseComment() {
		return courseComment;
	}
	/**
	 * @param courseComment the courseComment to set
	 */
	public void setCourseComment(String courseComment) {
		this.courseComment = courseComment;
	}
	
	/**
	 * @return the venueDetails
	 */
	public String getVenueDetails() {
		return venueDetails;
	}
	/**
	 * @param venueDetails the venueDetails to set
	 */
	public void setVenueDetails(String venueDetails) {
		this.venueDetails = venueDetails;
	}
	/**
	 * @return the courseDays
	 */
	public int getCourseDays() {
		return courseDays;
	}
	/**
	 * @param courseDays the courseDays to set
	 */
	public void setCourseDays(int courseDays) {
		this.courseDays = courseDays;
	}
	/**
	 * @return the courseName
	 */
	public String getCourseName() {
		return courseName;
	}
	/**
	 * @param courseName the courseName to set
	 */
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	/**
	 * @return the courseParticipantsPerRun
	 */
	public int getCourseParticipantsPerRun() {
		return courseParticipantsPerRun;
	}
	/**
	 * @param courseParticipantsPerRun the courseParticipantsPerRun to set
	 */
	public void setCourseParticipantsPerRun(int courseParticipantsPerRun) {
		this.courseParticipantsPerRun = courseParticipantsPerRun;
	}
	/**
	 * @return the coursePrice
	 */
	public int getCoursePrice() {
		return coursePrice;
	}
	/**
	 * @param coursePrice the coursePrice to set
	 */
	public void setCoursePrice(int coursePrice) {
		this.coursePrice = coursePrice;
	}
	/**
	 * @return the coursePriceType
	 */
	public String getCoursePriceType() {
		return coursePriceType;
	}
	/**
	 * @param coursePriceType the coursePriceType to set
	 */
	public void setCoursePriceType(String coursePriceType) {
		this.coursePriceType = coursePriceType;
	}
	/**
	 * @return the courseRuns
	 */
	public int getCourseRuns() {
		return courseRuns;
	}
	/**
	 * @param courseRuns the courseRuns to set
	 */
	public void setCourseRuns(int courseRuns) {
		this.courseRuns = courseRuns;
	}
	/**
	 * @return the courseTotalDays
	 */
	public int getCourseTotalDays() {
		return courseTotalDays;
	}
	/**
	 * @param courseTotalDays the courseTotalDays to set
	 */
	public void setCourseTotalDays(int courseTotalDays) {
		this.courseTotalDays = courseTotalDays;
	}
	/**
	 * @return the courseTotalPrice
	 */
	public int getCourseTotalPrice() {
		return courseTotalPrice;
	}
	/**
	 * @param courseTotalPrice the courseTotalPrice to set
	 */
	public void setCourseTotalPrice(int courseTotalPrice) {
		this.courseTotalPrice = courseTotalPrice;
	}
	/**
	 * @return the courseType
	 */
	public String getCourseType() {
		return courseType;
	}
	/**
	 * @param courseType the courseType to set
	 */
	public void setCourseType(String courseType) {
		this.courseType = courseType;
	}
	/**
	 * @return the courseId
	 */
	public int getCourseId() {
		return courseId;
	}
	/**
	 * @param courseId the courseId to set
	 */
	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}
	/**
	 * @return the coordinatorId
	 */
	public int getCoordinatorId() {
		return coordinatorId;
	}
	/**
	 * @param coordinatorId the coordinatorId to set
	 */
	public void setCoordinatorId(int coordinatorId) {
		this.coordinatorId = coordinatorId;
	}
	/**
	 * @return the datashowRequest
	 */
	public String getDatashowRequest() {
		return datashowRequest;
	}
	/**
	 * @param datashowRequest the datashowRequest to set
	 */
	public void setDatashowRequest(String datashowRequest) {
		this.datashowRequest = datashowRequest;
	}
	/**
	 * @return the venueConfirmDate
	 */
	public String getVenueConfirmDate() {
		return venueConfirmDate;
	}
	/**
	 * @param venueConfirmDate the venueConfirmDate to set
	 */
	public void setVenueConfirmDate(String venueConfirmDate) {
		this.venueConfirmDate = venueConfirmDate;
	}
	/**
	 * @return the venueId
	 */
	public int getVenueId() {
		return venueId;
	}
	/**
	 * @param venueId the venueId to set
	 */
	public void setVenueId(int venueId) {
		this.venueId = venueId;
	}
	/**
	 * @return the venueLocation
	 */
	public String getVenueLocation() {
		return venueLocation;
	}
	/**
	 * @param venueLocation the venueLocation to set
	 */
	public void setVenueLocation(String venueLocation) {
		this.venueLocation = venueLocation;
	}
	/**
	 * @return the courseFund
	 */
	public int getCourseFund() {
		return courseFund;
	}
	/**
	 * @param courseFund the courseFund to set
	 */
	public void setCourseFund(int courseFund) {
		this.courseFund = courseFund;
	}
	/**
	 * @return the resourceId
	 */
	public int getResourceId() {
		return resourceId;
	}
	/**
	 * @param resourceId the resourceId to set
	 */
	public void setResourceId(int resourceId) {
		this.resourceId = resourceId;
	}
	/**
	 * @return the coordinatorName
	 */
	public String getCoordinatorName() {
		return coordinatorName;
	}
	/**
	 * @param coordinatorName the coordinatorName to set
	 */
	public void setCoordinatorName(String coordinatorName) {
		this.coordinatorName = coordinatorName;
	}
	/**
	 * @return the resourceName
	 */
	public String getResourceName() {
		return resourceName;
	}
	/**
	 * @param resourceName the resourceName to set
	 */
	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}
	/**
	 * @return the venueName
	 */
	public String getVenueName() {
		return venueName;
	}
	/**
	 * @param venueName the venueName to set
	 */
	public void setVenueName(String venueName) {
		this.venueName = venueName;
	}
	/**
	 * @return the courseDescription
	 */
	public String getCourseDescription() {
		return courseDescription;
	}
	/**
	 * @param courseDescription the courseDescription to set
	 */
	public void setCourseDescription(String courseDescription) {
		this.courseDescription = courseDescription;
	}
	/**
	 * @return the courseTime
	 */
	public int getCourseTime() {
		return courseTime;
	}
	/**
	 * @param courseTime the courseTime to set
	 */
	public void setCourseTime(int courseTime) {
		this.courseTime = courseTime;
	}
	/**
	 * @return the resourceConfirm
	 */
	public boolean getResourceConfirm() {
		return resourceConfirm;
	}
	/**
	 * @param resourceConfirm the resourceConfirm to set
	 */
	public void setResourceConfirm(boolean resourceConfirm) {
		this.resourceConfirm = resourceConfirm;
	}
	/**
	 * @return the resourceConfirmDate
	 */
	public String getResourceConfirmDate() {
		return resourceConfirmDate;
	}
	/**
	 * @param resourceConfirmDate the resourceConfirmDate to set
	 */
	public void setResourceConfirmDate(String resourceConfirmDate) {
		this.resourceConfirmDate = resourceConfirmDate;
	}
	
	/**
	 * @return the venueConfirm
	 */
	public boolean isVenueConfirm() {
		return venueConfirm;
	}
	/**
	 * @param venueConfirm the venueConfirm to set
	 */
	public void setVenueConfirm(boolean venueConfirm) {
		this.venueConfirm = venueConfirm;
	}
	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}
	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}
	/**
	 * @return the cancelDate
	 */
	public String getCancelDate() {
		return cancelDate;
	}
	/**
	 * @param cancelDate the cancelDate to set
	 */
	public void setCancelDate(String cancelDate) {
		this.cancelDate = cancelDate;
	}
	/**
	 * @return the clientConfirm
	 */
	public boolean isClientConfirm() {
		return clientConfirm;
	}
	/**
	 * @param clientConfirm the clientConfirm to set
	 */
	public void setClientConfirm(boolean clientConfirm) {
		this.clientConfirm = clientConfirm;
	}
	/**
	 * @return the clientConfirmDate
	 */
	public String getClientConfirmDate() {
		return clientConfirmDate;
	}
	/**
	 * @param clientConfirmDate the clientConfirmDate to set
	 */
	public void setClientConfirmDate(String clientConfirmDate) {
		this.clientConfirmDate = clientConfirmDate;
	}
	/**
	 * @return the courseCancel
	 */
	public boolean isCourseCancel() {
		return courseCancel;
	}
	/**
	 * @param courseCancel the courseCancel to set
	 */
	public void setCourseCancel(boolean courseCancel) {
		this.courseCancel = courseCancel;
	}
	
	/**
	 * @return the locNumber
	 */
	public int getLocNumber() {
		return locNumber;
	}
	/**
	 * @param locNumber the locNumber to set
	 */
	public void setLocNumber(int locNumber) {
		this.locNumber = locNumber;
	}
	/**
	 * @return the locReceived
	 */
	public boolean isLocReceived() {
		return locReceived;
	}
	/**
	 * @param locReceived the locReceived to set
	 */
	public void setLocReceived(boolean locReceived) {
		this.locReceived = locReceived;
	}
	/**
	 * @return the locReceivedDate
	 */
	public String getLocReceivedDate() {
		return locReceivedDate;
	}
	/**
	 * @param locReceivedDate the locReceivedDate to set
	 */
	public void setLocReceivedDate(String locReceivedDate) {
		this.locReceivedDate = locReceivedDate;
	}
	/**
	 * @return the cPRReceived
	 */
	public boolean isCPRReceived() {
		return CPRReceived;
	}
	/**
	 * @param received the cPRReceived to set
	 */
	public void setCPRReceived(boolean received) {
		CPRReceived = received;
	}
	/**
	 * @return the cPRReceivedDate
	 */
	public String getCPRReceivedDate() {
		return CPRReceivedDate;
	}
	/**
	 * @param receivedDate the cPRReceivedDate to set
	 */
	public void setCPRReceivedDate(String receivedDate) {
		CPRReceivedDate = receivedDate;
	}
	
	
}
