package abItemsShow;

public class TeamShow {
	private Integer idTeammembers;
	private String coordinatorName;
	private String coordinatorApp;
	private String coordinatorEmail;
	private Integer teamsid;
	public String getCoordinatorApp() {
		return coordinatorApp;
	}
	public void setCoordinatorApp(String coordinatorApp) {
		this.coordinatorApp = coordinatorApp;
	}
	public String getCoordinatorName() {
		return coordinatorName;
	}
	public void setCoordinatorName(String coordinatorName) {
		this.coordinatorName = coordinatorName;
	}
	public Integer getIdTeammembers() {
		return idTeammembers;
	}
	public void setIdTeammembers(Integer idTeammembers) {
		this.idTeammembers = idTeammembers;
	}
	public Integer getTeamsid() {
		return teamsid;
	}
	public void setTeamsid(Integer teamsid) {
		this.teamsid = teamsid;
	}
	public TeamShow() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getCoordinatorEmail() {
		return coordinatorEmail;
	}
	public void setCoordinatorEmail(String coordinatorEmail) {
		this.coordinatorEmail = coordinatorEmail;
	}

}
