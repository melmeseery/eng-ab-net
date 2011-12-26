package actions;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

public class ActionsForm extends ActionForm
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public void reset(ActionMapping actionMapping, HttpServletRequest request) {
       
    }

    public ActionErrors validate(ActionMapping actionMapping, HttpServletRequest request) {
        ActionErrors errs = new ActionErrors();
        // ////  //  //  ////System.out.println("ana fe el validation");
        return errs;
    }
    public ActionsForm(){}
	
	
}
