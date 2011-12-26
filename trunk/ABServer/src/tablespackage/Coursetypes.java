/* Auto generated file */

package tablespackage;

import java.util.Collection;

public class Coursetypes {

	/** auto generated
	 * @es_generated
	 */
	private Integer idCourseTypes;
	/** auto generated
	 * @es_generated
	 */
	private String courseTypeName;
	/** auto generated
	 * @es_generated
	 */
	private Collection courses;

	/** auto generated
	 * @es_generated
	 */
	public Coursetypes() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Coursetypes(Integer idCourseTypes, Collection courses) {
		super();
		this.idCourseTypes = idCourseTypes;
		this.courses = courses;
	}

	/** auto generated
	 * @es_generated
	 */
	public Coursetypes(Integer idCourseTypes, String courseTypeName,
			Collection courses) {
		super();
		this.idCourseTypes = idCourseTypes;
		this.courseTypeName = courseTypeName;
		this.courses = courses;
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
	public String getCourseTypeName() {
		return this.courseTypeName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourseTypeName(String value) {
		this.courseTypeName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getCourses() {
		return this.courses;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourses(Collection value) {
		this.courses = value;
	}
}
