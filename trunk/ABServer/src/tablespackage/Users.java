/* Auto generated file */

package tablespackage;

import java.util.Collection;

public class Users {

	/** auto generated
	 * @es_generated
	 */
	private Integer idUsers;
	/** auto generated
	 * @es_generated
	 */
	private Collection tasks;
	/** auto generated
	 * @es_generated
	 */
	private String userUsername;
	/** auto generated
	 * @es_generated
	 */
	private String userPassword;
	/** auto generated
	 * @es_generated
	 */
	private Integer userPrivilage;

	/** auto generated
	 * @es_generated
	 */
	public Users() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Users(Integer idUsers, Collection tasks) {
		super();
		this.idUsers = idUsers;
		this.tasks = tasks;
	}

	/** auto generated
	 * @es_generated
	 */
	public Users(Integer idUsers, Collection tasks, String userUsername,
			String userPassword, Integer userPrivilage) {
		super();
		this.idUsers = idUsers;
		this.tasks = tasks;
		this.userUsername = userUsername;
		this.userPassword = userPassword;
		this.userPrivilage = userPrivilage;
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
	public Integer getIdUsers() {
		return this.idUsers;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdUsers(Integer value) {
		this.idUsers = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getTasks() {
		return this.tasks;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setTasks(Collection value) {
		this.tasks = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getUserUsername() {
		return this.userUsername;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setUserUsername(String value) {
		this.userUsername = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getUserPassword() {
		return this.userPassword;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setUserPassword(String value) {
		this.userPassword = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getUserPrivilage() {
		return this.userPrivilage;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setUserPrivilage(Integer value) {
		this.userPrivilage = value;
	}
}
