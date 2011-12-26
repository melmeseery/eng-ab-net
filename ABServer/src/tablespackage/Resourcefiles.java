/* Auto generated file */

package tablespackage;

import java.util.Date;

public class Resourcefiles {

	/** auto generated
	 * @es_generated
	 */
	private Integer idResourceFiles;
	/** auto generated
	 * @es_generated
	 */
	private Resourcecourses resourceCoursesIdResourcesCourses;
	/** auto generated
	 * @es_generated
	 */
	private Resources resourcesFile;
	/** auto generated
	 * @es_generated
	 */
	private String resourceFileName;
	/** auto generated
	 * @es_generated
	 */
	private String resourceFileLocation;
	/** auto generated
	 * @es_generated
	 */
	private Date resourceFileUploadDate;
	/** auto generated
	 * @es_generated
	 */
	private Integer resourceFileType;
	/** auto generated
	 * @es_generated
	 */
	private Boolean resourceFileValid;

	/** auto generated
	 * @es_generated
	 */
	public Resourcefiles() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Resourcefiles(Integer idResourceFiles) {
		super();
		this.idResourceFiles = idResourceFiles;
	}

	/** auto generated
	 * @es_generated
	 */
	public Resourcefiles(Integer idResourceFiles,
			Resourcecourses resourceCoursesIdResourcesCourses,
			Resources resourcesFile, String resourceFileName,
			String resourceFileLocation, Date resourceFileUploadDate,
			Integer resourceFileType, Boolean resourceFileValid) {
		super();
		this.idResourceFiles = idResourceFiles;
		this.resourceCoursesIdResourcesCourses = resourceCoursesIdResourcesCourses;
		this.resourcesFile = resourcesFile;
		this.resourceFileName = resourceFileName;
		this.resourceFileLocation = resourceFileLocation;
		this.resourceFileUploadDate = resourceFileUploadDate;
		this.resourceFileType = resourceFileType;
		this.resourceFileValid = resourceFileValid;
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
	public Integer getIdResourceFiles() {
		return this.idResourceFiles;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdResourceFiles(Integer value) {
		this.idResourceFiles = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Resourcecourses getResourceCoursesIdResourcesCourses() {
		return this.resourceCoursesIdResourcesCourses;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setResourceCoursesIdResourcesCourses(Resourcecourses value) {
		this.resourceCoursesIdResourcesCourses = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Resources getResourcesFile() {
		return this.resourcesFile;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setResourcesFile(Resources value) {
		this.resourcesFile = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getResourceFileName() {
		return this.resourceFileName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setResourceFileName(String value) {
		this.resourceFileName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getResourceFileLocation() {
		return this.resourceFileLocation;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setResourceFileLocation(String value) {
		this.resourceFileLocation = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getResourceFileUploadDate() {
		return this.resourceFileUploadDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setResourceFileUploadDate(Date value) {
		this.resourceFileUploadDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getResourceFileType() {
		return this.resourceFileType;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setResourceFileType(Integer value) {
		this.resourceFileType = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Boolean getResourceFileValid() {
		return this.resourceFileValid;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setResourceFileValid(Boolean value) {
		this.resourceFileValid = value;
	}
}
