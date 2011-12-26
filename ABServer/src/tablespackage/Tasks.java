/* Auto generated file */

package tablespackage;

public class Tasks {

	/** auto generated
	 * @es_generated
	 */
	private Integer idTask;
	/** auto generated
	 * @es_generated
	 */
	private Users userId;
	/** auto generated
	 * @es_generated
	 */
	private String taskDescription;
	/** auto generated
	 * @es_generated
	 */
	private Integer taskTableId;

	/** auto generated
	 * @es_generated
	 */
	public Tasks() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Tasks(Integer idTask, String taskDescription, Integer taskTableId) {
		super();
		this.idTask = idTask;
		this.taskDescription = taskDescription;
		this.taskTableId = taskTableId;
	}

	/** auto generated
	 * @es_generated
	 */
	public Tasks(Integer idTask, Users userId, String taskDescription,
			Integer taskTableId) {
		super();
		this.idTask = idTask;
		this.userId = userId;
		this.taskDescription = taskDescription;
		this.taskTableId = taskTableId;
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
	public Integer getIdTask() {
		return this.idTask;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdTask(Integer value) {
		this.idTask = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Users getUserId() {
		return this.userId;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setUserId(Users value) {
		this.userId = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getTaskDescription() {
		return this.taskDescription;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setTaskDescription(String value) {
		this.taskDescription = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getTaskTableId() {
		return this.taskTableId;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setTaskTableId(Integer value) {
		this.taskTableId = value;
	}
}
