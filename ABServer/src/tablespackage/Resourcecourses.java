/* Auto generated file */

package tablespackage;

import java.util.Collection;
import java.util.Date;

public class Resourcecourses {

	/** auto generated
	 * @es_generated
	 */
	private Integer idResourceCourse;
	/** auto generated
	 * @es_generated
	 */
	private Collection resourcefiles;
	/** auto generated
	 * @es_generated
	 */
	private Resources resourceCourse;
	/** auto generated
	 * @es_generated
	 */
	private Courses resourceCourse_1;
	/** auto generated
	 * @es_generated
	 */
	private Integer resourceCourseAbility;
	/** auto generated
	 * @es_generated
	 */
	private Date resourceCourseValidFrom;
	/** auto generated
	 * @es_generated
	 */
	private byte[] resourceCourseFiles;

	/** auto generated
	 * @es_generated
	 */
	public Resourcecourses() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Resourcecourses(Integer idResourceCourse, Collection resourcefiles,
			Resources resourceCourse, Courses resourceCourse_1) {
		super();
		this.idResourceCourse = idResourceCourse;
		this.resourcefiles = resourcefiles;
		this.resourceCourse = resourceCourse;
		this.resourceCourse_1 = resourceCourse_1;
	}

	/** auto generated
	 * @es_generated
	 */
	public Resourcecourses(Integer idResourceCourse, Collection resourcefiles,
			Resources resourceCourse, Courses resourceCourse_1,
			Integer resourceCourseAbility, Date resourceCourseValidFrom,
			byte[] resourceCourseFiles) {
		super();
		this.idResourceCourse = idResourceCourse;
		this.resourcefiles = resourcefiles;
		this.resourceCourse = resourceCourse;
		this.resourceCourse_1 = resourceCourse_1;
		this.resourceCourseAbility = resourceCourseAbility;
		this.resourceCourseValidFrom = resourceCourseValidFrom;
		this.resourceCourseFiles = resourceCourseFiles;
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
	public Integer getIdResourceCourse() {
		return this.idResourceCourse;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdResourceCourse(Integer value) {
		this.idResourceCourse = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getResourcefiles() {
		return this.resourcefiles;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setResourcefiles(Collection value) {
		this.resourcefiles = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Resources getResourceCourse() {
		return this.resourceCourse;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setResourceCourse(Resources value) {
		this.resourceCourse = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Courses getResourceCourse_1() {
		return this.resourceCourse_1;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setResourceCourse_1(Courses value) {
		this.resourceCourse_1 = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getResourceCourseAbility() {
		return this.resourceCourseAbility;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setResourceCourseAbility(Integer value) {
		this.resourceCourseAbility = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getResourceCourseValidFrom() {
		return this.resourceCourseValidFrom;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setResourceCourseValidFrom(Date value) {
		this.resourceCourseValidFrom = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public byte[] getResourceCourseFiles() {
		return this.resourceCourseFiles;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setResourceCourseFiles(byte[] value) {
		this.resourceCourseFiles = value;
	}
}
