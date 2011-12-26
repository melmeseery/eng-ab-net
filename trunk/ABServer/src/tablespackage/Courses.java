/* Auto generated file */

package tablespackage;

import java.util.Collection;

public class Courses {

	/** auto generated
	 * @es_generated
	 */
	private Integer idCourses;
	/** auto generated
	 * @es_generated
	 */
	private Collection contractcourse;
	/** auto generated
	 * @es_generated
	 */
	private Collection prices;
	/** auto generated
	 * @es_generated
	 */
	private Integer course;
	/** auto generated
	 * @es_generated
	 */
	private Integer courseCompetenceAddressed;
	/** auto generated
	 * @es_generated
	 */
	private Integer idTrainingArea;
	/** auto generated
	 * @es_generated
	 */
	private Integer idCourseTypes;
	/** auto generated
	 * @es_generated
	 */
	private String courseCode;
	/** auto generated
	 * @es_generated
	 */
	private String courseNameEng;
	/** auto generated
	 * @es_generated
	 */
	private String courseNameAr;
	/** auto generated
	 * @es_generated
	 */
	private String courseOutlineEng;
	/** auto generated
	 * @es_generated
	 */
	private String courseOutlineAr;
	/** auto generated
	 * @es_generated
	 */
	private Integer courseDays;
	/** auto generated
	 * @es_generated
	 */
	private String courseColor;
	/** auto generated
	 * @es_generated
	 */
	private String courseDescription;
	/** auto generated
	 * @es_generated
	 */
	private String courseCalender;
	/** auto generated
	 * @es_generated
	 */
	private String courseApp;
	/** auto generated
	 * @es_generated
	 */
	private Collection trackcourses;
	/** auto generated
	 * @es_generated
	 */
	private Collection resourcecourses;
	/** auto generated
	 * @es_generated
	 */
	private Collection audiencetypesMany;
	/** auto generated
	 * @es_generated
	 */
	private Collection contractcourse_1;

	/** auto generated
	 * @es_generated
	 */
	public Courses() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Courses(Integer idCourses, Collection contractcourse,
			Collection prices, Integer course_1, Integer course_2,
			Integer courseDays, Collection trackcourses,
			Collection resourcecourses, Collection audiencetypesMany) {
		super();
		this.idCourses = idCourses;
		this.contractcourse = contractcourse;
		this.prices = prices;
		this.idTrainingArea = course_1;
		this.idCourseTypes = course_2;
		this.courseDays = courseDays;
		this.trackcourses = trackcourses;
		this.resourcecourses = resourcecourses;
		this.audiencetypesMany = audiencetypesMany;
	}

	/** auto generated
	 * @es_generated
	 */
	public Courses(Integer idCourses, Collection contractcourse,
			Collection prices, Integer course,
			Integer courseCompetenceAddressed,
			Integer course_1, Integer course_2, String courseCode,
			String courseNameEng, String courseNameAr, String courseOutlineEng,
			String courseOutlineAr, Integer courseDays, String courseColor,
			String courseDescription, String courseCalender, String courseApp,
			Collection trackcourses, Collection resourcecourses,
			Collection audiencetypesMany) {
		super();
		this.idCourses = idCourses;
		this.contractcourse = contractcourse;
		this.prices = prices;
		this.course = course;
		this.courseCompetenceAddressed = courseCompetenceAddressed;
		this.idTrainingArea = course_1;
		this.idCourseTypes = course_2;
		this.courseCode = courseCode;
		this.courseNameEng = courseNameEng;
		this.courseNameAr = courseNameAr;
		this.courseOutlineEng = courseOutlineEng;
		this.courseOutlineAr = courseOutlineAr;
		this.courseDays = courseDays;
		this.courseColor = courseColor;
		this.courseDescription = courseDescription;
		this.courseCalender = courseCalender;
		this.courseApp = courseApp;
		this.trackcourses = trackcourses;
		this.resourcecourses = resourcecourses;
		this.audiencetypesMany = audiencetypesMany;
	}

	/** auto generated
	 * @es_generated
	 */
	public boolean equals(Object value) {
		//TODO Implement equals() using Business key equality.	
		return super.equals(value);
	}

	/** auto generated
	 * @es_generated
	 */
	public int hashCode() {
		//TODO Implement hashCode() using Business key equality.	
		return super.hashCode();
	}

	/** auto generated
	 * @es_generated
	 */
	public String toString() {
		//TODO Implement toString().	
		return super.toString();
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getIdCourses() {
		return this.idCourses;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdCourses(Integer value) {
		this.idCourses = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getContractcourse() {
		return this.contractcourse;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractcourse(Collection value) {
		this.contractcourse = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getPrices() {
		return this.prices;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPrices(Collection value) {
		this.prices = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getCourse() {
		return this.course;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourse(Integer value) {
		this.course = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getCourseCompetenceAddressed() {
		return this.courseCompetenceAddressed;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourseCompetenceAddressed(Integer value) {
		this.courseCompetenceAddressed = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getIdTrainingArea() {
		return this.idTrainingArea;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdTrainingArea(Integer value) {
		this.idTrainingArea = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getIdCourseTypes() {
		return this.idCourseTypes;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdCourseTypes(Integer value) {
		this.idCourseTypes = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getCourseCode() {
		return this.courseCode;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourseCode(String value) {
		this.courseCode = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getCourseNameEng() {
		return this.courseNameEng;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourseNameEng(String value) {
		this.courseNameEng = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getCourseNameAr() {
		return this.courseNameAr;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourseNameAr(String value) {
		this.courseNameAr = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getCourseOutlineEng() {
		return this.courseOutlineEng;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourseOutlineEng(String value) {
		this.courseOutlineEng = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getCourseOutlineAr() {
		return this.courseOutlineAr;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourseOutlineAr(String value) {
		this.courseOutlineAr = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getCourseDays() {
		return this.courseDays;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourseDays(Integer value) {
		this.courseDays = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getCourseColor() {
		return this.courseColor;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourseColor(String value) {
		this.courseColor = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getCourseDescription() {
		return this.courseDescription;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourseDescription(String value) {
		this.courseDescription = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getCourseCalender() {
		return this.courseCalender;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourseCalender(String value) {
		this.courseCalender = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getCourseApp() {
		return this.courseApp;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourseApp(String value) {
		this.courseApp = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getTrackcourses() {
		return this.trackcourses;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setTrackcourses(Collection value) {
		this.trackcourses = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getResourcecourses() {
		return this.resourcecourses;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setResourcecourses(Collection value) {
		this.resourcecourses = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getAudiencetypesMany() {
		return this.audiencetypesMany;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setAudiencetypesMany(Collection value) {
		this.audiencetypesMany = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getContractcourse_1() {
		return this.contractcourse_1;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractcourse_1(Collection value) {
		this.contractcourse_1 = value;
	}
}
