/* Auto generated file */

package tablespackage;

public class Trackcourses {

	/** auto generated
	 * @es_generated
	 */
	private Integer tableId;
	/** auto generated
	 * @es_generated
	 */
	private Integer tracks;
	/** auto generated
	 * @es_generated
	 */
	private Integer courses;
	/** auto generated
	 * @es_generated
	 */
	private Integer courseTrackDays;

	/** auto generated
	 * @es_generated
	 */
	public Trackcourses() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Trackcourses(Integer tableId, Integer trackCoures,
			Integer trackCourses) {
		super();
		this.tableId = tableId;
		this.tracks = trackCoures;
		this.courses = trackCourses;
	}

	/** auto generated
	 * @es_generated
	 */
	public Trackcourses(Integer tableId, Integer trackCoures,
			Integer trackCourses, Integer courseTrackDays) {
		super();
		this.tableId = tableId;
		this.tracks = trackCoures;
		this.courses = trackCourses;
		this.courseTrackDays = courseTrackDays;
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
	public Integer getTableId() {
		return this.tableId;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setTableId(Integer value) {
		this.tableId = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getTrackCoures() {
		return this.tracks;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setTrackCoures(Integer value) {
		this.tracks = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getTrackCourses() {
		return this.courses;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setTrackCourses(Integer value) {
		this.courses = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getCourseTrackDays() {
		return this.courseTrackDays;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourseTrackDays(Integer value) {
		this.courseTrackDays = value;
	}
}
