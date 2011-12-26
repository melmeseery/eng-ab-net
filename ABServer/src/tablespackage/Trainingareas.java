/* Auto generated file */

package tablespackage;

import java.util.Collection;

public class Trainingareas {

	/** auto generated
	 * @es_generated
	 */
	private Integer idTrainingAreas;
	/** auto generated
	 * @es_generated
	 */
	private Collection courses;
	/** auto generated
	 * @es_generated
	 */
	private String trainingAreaName;
	/** auto generated
	 * @es_generated
	 */
	private String trainingAreaCode;

	/** auto generated
	 * @es_generated
	 */
	public Trainingareas() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Trainingareas(Integer idTrainingAreas, Collection courses) {
		super();
		this.idTrainingAreas = idTrainingAreas;
		this.courses = courses;
	}

	/** auto generated
	 * @es_generated
	 */
	public Trainingareas(Integer idTrainingAreas, Collection courses,
			String trainingAreaName, String trainingAreaCode) {
		super();
		this.idTrainingAreas = idTrainingAreas;
		this.courses = courses;
		this.trainingAreaName = trainingAreaName;
		this.trainingAreaCode = trainingAreaCode;
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
	public Integer getIdTrainingAreas() {
		return this.idTrainingAreas;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdTrainingAreas(Integer value) {
		this.idTrainingAreas = value;
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

	/** auto generated
	 * @es_generated
	 */
	public String getTrainingAreaName() {
		return this.trainingAreaName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setTrainingAreaName(String value) {
		this.trainingAreaName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getTrainingAreaCode() {
		return this.trainingAreaCode;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setTrainingAreaCode(String value) {
		this.trainingAreaCode = value;
	}
}
