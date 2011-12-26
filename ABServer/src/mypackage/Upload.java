package mypackage;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.*;
import javax.servlet.http.*;

import org.apache.commons.fileupload.*;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import abItems.Resources;

import database.DataSourceConnection;

import abItemsShow.CoursesShow;
import abItemsShow.ResourceHolidayShow;
import abItemsShow.ResourceRatesShow;
import abItemsShow.ResourcesShow;
import tablespackage.Consultingareas;
import tablespackage.Courses;
import tablespackage.Resourcefiles;

import HibernatePackage.Hiber_Courses;
import HibernatePackage.Hiber_ResourcesFiles;

public class Upload extends Action {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7440302204266787092L;

	// private static String uploadPath = "d:\\ABServerFiles\\resource_files\\";
	//
	// private static String tempPath =
	// "d:\\ABServerFiles\\resource_files_tmp\\";

	public static String uploadPath = getmainPath()
			+ "\\Webapps\\ABServer\\files\\resource_files\\";

	public static String tempPath = getmainPath()
			+ "\\Webapps\\ABServer\\files\\resource_files_tmp\\";

	public ActionForward execute(ActionMapping arg0, ActionForm arg1,
			HttpServletRequest arg2, HttpServletResponse arg3) throws Exception {
		// ////////System.out.println("task= "+arg2.getParameter("task"));

	//	SessionFactory factory = new Configuration().configure()
		//		.buildSessionFactory();

		/* Open Hibernate Session */
	//	Session session = factory.openSession();

	//	Transaction tx = session.beginTransaction();
		//System.out.println("task= "+arg2.getParameter("task"));
		if (arg2.getParameter("task") == null) {

			uploadPath = getmainPath()
					+ "\\Webapps\\ABServer\\files\\resource_files\\";

			tempPath = getmainPath()
					+ "\\Webapps\\ABServer\\files\\resource_files_tmp\\";

		} else if (arg2.getParameter("task").equals("ADDHANDOUT")) {
			uploadPath = getmainPath()
					+ "\\Webapps\\ABServer\\files\\handouts\\";

			tempPath = getmainPath()
					+ "\\Webapps\\ABServer\\files\\handouts_tmp\\";
		} else if (arg2.getParameter("task").equals("ADDCERTIFICATE")) {
			uploadPath = getmainPath()
					+ "\\Webapps\\ABServer\\files\\certificates\\";

			tempPath = getmainPath()
					+ "\\Webapps\\ABServer\\files\\certificates_tmp\\";
		} else if (arg2.getParameter("task").equals("outline")) {// ////////System.out.println("ana
			// goa el
			// if");
			uploadPath = getmainPath()
					+ "\\Webapps\\ABServer\\files\\outlines_files\\";
			tempPath = getmainPath()
					+ "\\Webapps\\ABServer\\files\\outlines_files_tmp\\";
		} else if (arg2.getParameter("task").equals("CONTRACTS")) {// ////////System.out.println("ana
			// goa el
			// if");
			uploadPath = getmainPath()
					+ "\\Webapps\\ABServer\\files\\contracts\\";
			tempPath = getmainPath()
					+ "\\Webapps\\ABServer\\files\\contracts_tmp\\";
		}

		try {
			
			// create and intialize the database connection////////////
			DataSourceConnection database = new DataSourceConnection();
			database.initializeConnecton(this.servlet);

			
			
			// ////System.out.println("ana fe el execute");

			DiskFileUpload fu = new DiskFileUpload();
			fu.setSizeMax(4194304);
			fu.setSizeThreshold(4096);
			fu.setRepositoryPath(tempPath);
			// enctype="multipart/form-data";
			// ////////System.out.println("fileDes =
			// "+arg2.getSession().getValue("fileDes"));

			Integer resId = null;

			if (arg2.getParameter("resID") != null) {
				resId = Integer.parseInt(arg2.getParameter("resID"));
				
			} else
				resId = Resources.getTheLastResourceId(database) + 1;		

			Hiber_Courses HC = new Hiber_Courses();
			Integer courseID = HC.getLastOne(database);
			Courses c = HC.getCourseById(courseID, database);
			//c.setIdCourses(courseID);
			List fileItems = fu.parseRequest(arg2);
			Iterator i = fileItems.iterator();
			// //////System.out.println(fileItems.size());

			int counter = 1;
			int counter2 = 1;
			while (i.hasNext()) {

				FileItem fi = (FileItem) i.next();
				String fileName = fi.getName();
				//System.out.println("file name= " + fileName);
				if (fileName != null) {
					if (!fileName.equals("")) {// ////////System.out.println("ana goa
											// el
						// ifff");

						if (arg2.getParameter("task") == null) {
						//	tx = session.beginTransaction();
							String extfile = fileName.substring(fileName
									.indexOf("."));
							 ////System.out.println("file name is: " + fileName+" counter = "+counter);
							if (counter == 7 || counter == 8) {

								fileName = resId + "_photo" + extfile;

							} else if (counter == 4) {
								fileName = resId + "_company_cv" + extfile;

							}

							else if (counter == 5) {
								fileName = resId + "_cv" + extfile;

							} else if (counter == 6) {
								
								if(arg2.getParameter("brief") != null)
								
								fileName = resId + "_brief" + extfile;
								
								else
									
									fileName = resId + "_idphoto" + extfile;
									

							}
							else if (counter == 2) {
								fileName = resId + "_contract_"+fileName;

							}
							//
							// SimpleDateFormat fmt = new SimpleDateFormat(
							// "yyyyMMddHHmmssSSS");
							// String pfileName =
							// fmt.format(now).toString().trim();
							//System.out.println("file name = "+fileName);
						} else if (arg2.getParameter("task").equals("outline")) {
						//	tx = session.beginTransaction();
							//System.out.println("file name = "+fileName);
							String extfile = fileName.substring(fileName
									.indexOf("."));
							////System.out.println("counter= "+counter2);
							if (counter2 == 7) {//System.out.println("counter AR= "+counter2);
								fileName = courseID + "_outlineAr" + extfile;
								// fi.write(new File(uploadPath + fileName));

							} else if (counter2 == 8) {//System.out.println("counter Eng= "+counter2);
								fileName = courseID + "_outlineEng" + extfile;
								// fi.write(new File(uploadPath + fileName));

							}

						}
						fi.write(new File(uploadPath + fileName));

						
						if (counter2 == 7) {
							if(c.getCourseOutlineAr()!=null)
							{
								if(!c.getCourseOutlineAr().equals(fileName) && fileName!=null)
									c.setCourseOutlineAr(fileName);
							}
							else
								c.setCourseOutlineAr(fileName);
							
						} else if (counter2 == 8) {
							if(c.getCourseOutlineEng()!=null)
							{
								if(!c.getCourseOutlineEng().equals(fileName) && fileName!=null)
									c.setCourseOutlineEng(fileName);
							}
							else
								c.setCourseOutlineEng(fileName);
							
						}
						HC.updateCourse(c, database);
					}
				}

				counter++;
				counter2++;
				//System.out.println("uploadPath="+uploadPath+fileName);
			}
			//session.close();
			arg3.setContentType("text/html;charset=utf-8");
			arg3.getWriter().print(
					"{'success':true,'message':'upload success'}");

			
//			try {
//
//				database.finalize();
//			} catch (SQLException e) {
//
//				e.printStackTrace();
//			} catch (Throwable e) {
//
//				e.printStackTrace();
//			}

			
		} catch (Exception e) {
			e.printStackTrace();
			arg3.getWriter().print("{'success':false,'message':'failure'}");

		}

		
		
		return null;
	}

	public static String getmainPath() {

		File temp = new File("");
		temp.getAbsolutePath();

		return temp.getAbsolutePath();
	}
}