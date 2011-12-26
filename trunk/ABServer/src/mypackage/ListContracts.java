package mypackage;

import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import abItemsShow.ContractsShow;
import abItemsShow.ExShow;
import tablespackage.Clients;
import tablespackage.Contracts;
import tablespackage.Expensescategories;
import tablespackage.Expensesitem;

import com.thoughtworks.xstream.XStream;

import HibernatePackage.Hiber_Clients;
import HibernatePackage.Hiber_Contracts;
import HibernatePackage.Hiber_Expensescategories;

public class ListContracts extends org.apache.struts.action.Action {

	// Global Forwards
	public static final String GLOBAL_FORWARD_start = "start";

	// Local Forwards

	public ListContracts() {
	}

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Hiber_Contracts HCon = new Hiber_Contracts();
		Hiber_Clients HCL = new Hiber_Clients();
		SimpleDateFormat s = new SimpleDateFormat("dd-MMM-yyyy", Locale.US);
//		if (request.getParameter("task").equals("list")) {
//			ArrayList l = HCon.getAccpContarcts();
//			ArrayList<ContractsShow> Show = new ArrayList<ContractsShow>();
//			for (int i = 0; i < l.size(); i++) {// //////System.out.println("ana goa
//												// el for");
//				Contracts c = (Contracts) l.get(i);
//				ContractsShow e = new ContractsShow();
//				// //////System.out.println("contract id ---->
//				// "+c.getIdContracts());
//				e.setContractId(c.getIdContracts());
//				e.setContractNumber(c.getContractNumber());
//				String dat = "";
//				if(c.getContractStartDate() != null){
//				dat = s.format(c.getContractStartDate());
//				e.setContractStartDate(dat);
//				}
//				if(c.getContractEndDate() != null){
//				dat = s.format(c.getContractEndDate());
//				e.setContractEndDate(dat);
//				}
//				
//				
//				e.setContractStatus(HCon.getContarctStatus(c.getContractStatus()));
//				e.setContractName(c.getContractName());
//				e.setContractFee(c.getContractFee());
//				if (c.getContractFundType().equals(1))
//					e.setContractFundType("Funded By IMC");
//				else {
//					e.setContractFundType("Not Funded");
//					if (c.getContractRateType().equals(1))
//						e.setContractRateType("International");
//					else if (c.getContractRateType().equals(2))
//						e.setContractRateType("Local");
//					else if (c.getContractRateType().equals(3))
//						e.setContractRateType("Other");
//				}
//				e.setProposalID(c.getContractProposalId());
//				if (c.getContractProactiveType().equals(1))
//					e.setContractProactiveType("Proactive");
//				else
//					e.setContractProactiveType("Reactive");
//
//				if (c.getContractDateOfRequest() != null) {
//					dat = s.format(c.getContractDateOfRequest());
//					e.setContractDateOfRequest(dat);
//				} else
//					e.setContractDateOfRequest(null);
//
//				if (c.getContractFirstStartDate() != null) {
//					dat = s.format(c.getContractFirstStartDate());
//					e.setContractFirstStartDate(dat);
//				} else
//					e.setContractFirstStartDate(null);
//				if (c.getContractFirstEndDate() != null) {
//					dat = s.format(c.getContractFirstEndDate());
//					e.setContractFirstEndDate(dat);
//				} else
//					e.setContractFirstEndDate(null);
//				e.setContractDealPerson(c.getContractDealPerson());
//				Show.add(e);
//			}
//
//			XStream xstream = new XStream();
//			xstream.alias("Contracts", ContractsShow.class);
//			// //////System.out.println("ana ba3d el alias");
//			// // //////System.out.println(cShow.getCourseNameEng());
//			String returnText = xstream.toXML(Show);
//			// //////System.out.println("return text = "+returnText);
//			response.setContentType("application/xml;charset=UTF-8");
//			PrintWriter out = response.getWriter();
//
//			out.write(returnText);
//
//		} else if (request.getParameter("task").equals("listC")) {
//			ArrayList l = HCon.getPendContarcts();
//			ArrayList<ContractsShow> Show = new ArrayList<ContractsShow>();
//			for (int i = 0; i < l.size(); i++) {// //////System.out.println("ana goa
//												// el for");
//				Contracts c = (Contracts) l.get(i);
//				ContractsShow e = new ContractsShow();
//				////System.out.println("sfd ---->  " + s);
//				e.setContractId(c.getIdContracts());
//				e.setContractNumber(c.getContractNumber());
//				String dat = "";
//				if (c.getContractStartDate() != null) {
//					dat = s.format(c.getContractStartDate());
//
//					e.setContractStartDate(dat);
//				}
//				if (c.getContractEndDate() != null) {
//				dat = s.format(c.getContractEndDate());
//				e.setContractEndDate(dat);
//				}
//				e.setContractStatus(HCon.getContarctStatus(c.getContractStatus()));
//				e.setContractName(c.getContractName());
//				e.setContractFee(c.getContractFee());
//				if (c.getContractFundType().equals(1))
//					e.setContractFundType("Funded By IMC");
//				else {
//					e.setContractFundType("Not Funded");
//					if (c.getContractRateType().equals(1))
//						e.setContractRateType("International");
//					else if (c.getContractRateType().equals(2))
//						e.setContractRateType("Local");
//					else if (c.getContractRateType().equals(3))
//						e.setContractRateType("Other");
//				}
//				e.setProposalID(c.getContractProposalId());
//				if (c.getContractProactiveType().equals(1))
//					e.setContractProactiveType("Proactive");
//				else
//					e.setContractProactiveType("Reactive");
//				if (c.getContractDateOfRequest() != null) {
//					dat = s.format(c.getContractDateOfRequest());
//					e.setContractDateOfRequest(dat);
//				} else
//					e.setContractDateOfRequest(null);
//
//				if (c.getContractFirstStartDate() != null) {
//					dat = s.format(c.getContractFirstStartDate());
//					e.setContractFirstStartDate(dat);
//				} else
//					e.setContractFirstStartDate(null);
//				if (c.getContractFirstEndDate() != null) {
//					dat = s.format(c.getContractFirstEndDate());
//					e.setContractFirstEndDate(dat);
//				} else
//					e.setContractFirstEndDate(null);
//
//				e.setContractDealPerson(c.getContractDealPerson());
//				Show.add(e);
//			}
//
//			XStream xstream = new XStream();
//			xstream.alias("Contracts", ContractsShow.class);
//			// //////System.out.println("ana ba3d el alias");
//			// // //////System.out.println(cShow.getCourseNameEng());
//			String returnText = xstream.toXML(Show);
//			// //////System.out.println("return text = "+returnText);
//			response.setContentType("application/xml;charset=UTF-8");
//			PrintWriter out = response.getWriter();
//
//			out.write(returnText);
//
//		}
		return mapping.findForward("success");
	}

}