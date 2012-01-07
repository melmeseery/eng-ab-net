/**
 *
 */
package actions;

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mypackage.Upload;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import abItems.Calendar;
import abItems.Contracts;
import abItems.pdfCalendarWriter;
import abItemsShow.Conflicts;
import abItemsShow.ContractsShow;
import abItemsShow.ECourse;



import database.DataSourceConnection;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.thoughtworks.xstream.XStream;
/**
 * @author noha
 *
 */
public class CalendarAction extends Action {

	/*
	 * (non-Javadoc)
	 *
	 * @see org.apache.struts.action.Action#execute(org.apache.struts.action.ActionMapping,
	 *      org.apache.struts.action.ActionForm,
	 *      javax.servlet.http.HttpServletRequest,
	 *      javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		System.out.println("  in the calendar action .....----------.......");
		// create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);

		// handling the requested tasks///////////////////////////

		if (request.getParameter("task").equals("retreiveContractEmptyCourses")) {

			XStream xstream = new XStream();
			xstream.alias("ECourse", ECourse.class);
			Calendar calendar = new Calendar();
			String returnText = xstream.toXML(calendar
					.retreiveContractEmptyCourses(database, request));
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}

		// ////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("retreiveContractCourses")) {

			Calendar calendar = new Calendar();
			String returnText = calendar.retreiveContractCourses(database,
					request);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}

		// ////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("saveContractCourse")) {

			Calendar calendar = new Calendar();
			calendar.saveContractCourse(database, request);

		}

		// ////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("retreiveGeneralCalendarCourses")) {

			Calendar calendar = new Calendar();
			String returnText = calendar.retreiveGeneralCalendarCourses(database,
					request);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);
		}
		else if (request.getParameter("task").equals("printPdfCalendar")){



			System.out.println("  in the print action ------.......");
             pdfCalendarWriter pdf=new pdfCalendarWriter();

             ByteArrayOutputStream baos = new ByteArrayOutputStream();
             // step 1
             Document document = pdf.writeFile(database,request,baos);

               //  response.setContentType("application/pdf");
                 // the contentlength
              //   response.setContentLength(baos.size());
                 // write ByteArrayOutputStream to the ServletOutputStream
               //  OutputStream os = response.getOutputStream();
                 String filename=Upload.getmainPathFromSession(request)
							+"files"+File.separator+"Printing_tmp"+File.separator
							+ "Printing" + ".pdf";
                 OutputStream os2=new FileOutputStream(  filename);

                // baos.writeTo(os);
                 baos.writeTo(os2);

//                 os.flush();
//                 os.close();
                 String link="../files/Printing_tmp/Printing.pdf";

            //    String  herf= "<font size=2><a href=\""+ link+"\" target=\"_blank\">  Open pdf </a></font>";
            	response.setContentType("application/xml;charset=UTF-8");
    			PrintWriter out = response.getWriter();

    			out.write(link);

		}
		// ////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("setFilterItems")) {

			Calendar calendar = new Calendar();
			calendar.setFilterItems(request);

		}

		// ////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("resetCalendar")) {

			Calendar calendar = new Calendar();
			calendar.resetCalendar();

		}

		// ////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("changeDisplayColor")) {

			Calendar calendar = new Calendar();
			calendar.changeDisplayColor(Integer.parseInt(request.getParameter("colorNumber")));

		}

		// ////////////////////////////////////////////////////////////
		else if (request.getParameter("task").equals("checkCalendarConfliction")) {

			Calendar calendar = new Calendar();
			XStream xstream = new XStream();
			xstream.alias("Conflicts", Conflicts.class);
			String returnText = calendar.checkCalendarConfliction(database,
					request);
			// ////  //  //  ////System.out.println("return text = "+returnText);
			response.setContentType("application/xml;charset=UTF-8");
			PrintWriter out = response.getWriter();

			out.write(returnText);

		}
		System.out.println("  what to do in this case all else ");

		try {

			database.finalize();
		} catch (SQLException e) {

			e.printStackTrace();
		} catch (Throwable e) {

			e.printStackTrace();
		}
		return null;
	}
}
