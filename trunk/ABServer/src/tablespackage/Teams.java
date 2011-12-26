/* Auto generated file */

package tablespackage;

import java.util.Collection;

public class Teams {

	/** auto generated
	 * @es_generated
	 */
	private Integer teamsid;
	/** auto generated
	 * @es_generated
	 */
	private Collection teammembers;
	/** auto generated
	 * @es_generated
	 */
	private String teamsName;

	/** auto generated
	 * @es_generated
	 */
	public Teams() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Teams(Integer teamsid, Collection teammembers) {
		super();
		this.teamsid = teamsid;
		this.teammembers = teammembers;
	}

	/** auto generated
	 * @es_generated
	 */
	public Teams(Integer teamsid, Collection teammembers, String teamsName) {
		super();
		this.teamsid = teamsid;
		this.teammembers = teammembers;
		this.teamsName = teamsName;
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
	public Integer getTeamsid() {
		return this.teamsid;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setTeamsid(Integer value) {
		this.teamsid = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getTeammembers() {
		return this.teammembers;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setTeammembers(Collection value) {
		this.teammembers = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getTeamsName() {
		return this.teamsName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setTeamsName(String value) {
		this.teamsName = value;
	}
}
