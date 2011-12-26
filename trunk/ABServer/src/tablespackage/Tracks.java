/* Auto generated file */

package tablespackage;

import java.util.Collection;

public class Tracks {

	/** auto generated
	 * @es_generated
	 */
	private Integer idTracks;
	/** auto generated
	 * @es_generated
	 */
	private Collection trackcourses;
	/** auto generated
	 * @es_generated
	 */
	private String trackName;
	/** auto generated
	 * @es_generated
	 */
	private String trackCode;

	/** auto generated
	 * @es_generated
	 */
	private Integer trackDuration;
	public Tracks() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Tracks(Integer idTracks, Collection trackcourses, String trackName,
			String trackCode) {
		super();
		this.idTracks = idTracks;
		this.trackcourses = trackcourses;
		this.trackName = trackName;
		this.trackCode = trackCode;
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
	public Integer getIdTracks() {
		return this.idTracks;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdTracks(Integer value) {
		this.idTracks = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getTrackcourses() {
		return this.trackcourses;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setTrackcourses(Collection value) {
		this.trackcourses = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getTrackName() {
		return this.trackName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setTrackName(String value) {
		this.trackName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getTrackCode() {
		return this.trackCode;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setTrackCode(String value) {
		this.trackCode = value;
	}

	public Integer getTrackDuration() {
		return trackDuration;
	}

	public void setTrackDuration(Integer trackDuration) {
		this.trackDuration = trackDuration;
	}
}
