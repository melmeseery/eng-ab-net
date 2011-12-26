/* Auto generated file */

package tablespackage;

import java.util.Collection;

public class Competencesaddressed {

	/** auto generated
	 * @es_generated
	 */
	private Integer idCompetencesAddressed;
	/** auto generated
	 * @es_generated
	 */
	private Collection courses;
	/** auto generated
	 * @es_generated
	 */
	private String competencesAddressedName;

	/** auto generated
	 * @es_generated
	 */
	public Competencesaddressed() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Competencesaddressed(Integer idCompetencesAddressed,
			Collection courses, String competencesAddressedName) {
		super();
		this.idCompetencesAddressed = idCompetencesAddressed;
		this.courses = courses;
		this.competencesAddressedName = competencesAddressedName;
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
	public Integer getIdCompetencesAddressed() {
		return this.idCompetencesAddressed;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdCompetencesAddressed(Integer value) {
		this.idCompetencesAddressed = value;
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
	public String getCompetencesAddressedName() {
		return this.competencesAddressedName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCompetencesAddressedName(String value) {
		this.competencesAddressedName = value;
	}
}
