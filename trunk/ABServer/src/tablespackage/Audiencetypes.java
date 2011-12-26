/* Auto generated file */

package tablespackage;

import java.util.Collection;

public class Audiencetypes {

	/** auto generated
	 * @es_generated
	 */
	private Integer idAudienceTypes;
	/** auto generated
	 * @es_generated
	 */
	private String audienceName;
	/** auto generated
	 * @es_generated
	 */
	private Collection coursesMany;

	/** auto generated
	 * @es_generated
	 */
	public Audiencetypes() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Audiencetypes(Integer idAudienceTypes, Collection coursesMany) {
		super();
		this.idAudienceTypes = idAudienceTypes;
		this.coursesMany = coursesMany;
	}

	/** auto generated
	 * @es_generated
	 */
	public Audiencetypes(Integer idAudienceTypes, String audienceName,
			Collection coursesMany) {
		super();
		this.idAudienceTypes = idAudienceTypes;
		this.audienceName = audienceName;
		this.coursesMany = coursesMany;
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
	public Integer getIdAudienceTypes() {
		return this.idAudienceTypes;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdAudienceTypes(Integer value) {
		this.idAudienceTypes = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getAudienceName() {
		return this.audienceName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setAudienceName(String value) {
		this.audienceName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getCoursesMany() {
		return this.coursesMany;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCoursesMany(Collection value) {
		this.coursesMany = value;
	}
}
