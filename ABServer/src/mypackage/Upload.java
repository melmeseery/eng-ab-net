package mypackage;

import java.io.File;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import org.apache.log4j.Logger;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import tablespackage.Courses;
import tablespackage.Trainingcoordinators;
import HibernatePackage.Hiber_Coordinators;
import HibernatePackage.Hiber_Courses;
import abItems.Resources;
import database.DataSourceConnection;


public class Upload extends Action {
	static String RootPathForApplication="";
	/**
	 *
	 */
	  static Logger logger = Logger.getLogger(Upload.class);
	private static final long serialVersionUID = 7440302204266787092L;

	public static String uploadPath = getPathForUpload()+"resource_files"+File.separator;
//		+ "\\Webapps\\ABServer\\files\\resource_files\\";
//
	public static String tempPath =  getPathForUpload()+"resource_files_temp"+File.separator;
//			+ "\\Webapps\\ABServer\\files\\resource_files_tmp\\";

	public ActionForward execute(ActionMapping arg0, ActionForm arg1,
			HttpServletRequest arg2, HttpServletResponse arg3) throws Exception {
		RootPathForApplication=arg2.getSession().getServletContext().getRealPath( "/");
	System.out.println("task= "+arg2.getParameter("task"));
	System.out.println("test is "+RootPathForApplication);

    logger.info(" In the upload instruction     ");

	uploadPath =getPathForUpload()+"resource_files"+File.separator;


        tempPath =getPathForUpload()+"resource_files_temp"+File.separator;
	//	SessionFactory factory = new Configuration().configure()
		//		.buildSessionFactory();
		/* Open Hibernate Session */
	//	Session session = factory.openSession();
	//	Transaction tx = session.beginTransaction();
		//System.out.println("task= "+arg2.getParameter("task"));
		if (arg2.getParameter("task") == null) {

			uploadPath =getPathForUpload()+"resource_files"+File.separator;
					//getmainPath()+ "\\Webapps\\ABServer\\files\\resource_files\\";

			tempPath =getPathForUpload()+"resource_files_temp"+File.separator;// getmainPath()
					//+ "\\Webapps\\ABServer\\files\\resource_files_tmp\\";

		} else if (arg2.getParameter("task").equals("ADDHANDOUT")) {
			uploadPath =getPathForUpload()+"handouts"+File.separator;
					//getmainPath()
					//+ "\\Webapps\\ABServer\\files\\handouts\\";

			tempPath =getPathForUpload()+"handouts_tmp"+File.separator;
					//getmainPath()
					//+ "\\Webapps\\ABServer\\files\\handouts_tmp\\";
		} else if (arg2.getParameter("task").equals("ADDCERTIFICATE")) {
			uploadPath =getPathForUpload()+"certificates"+File.separator;
					//getmainPath()
					//+ "\\Webapps\\ABServer\\files\\certificates\\";

			tempPath =getPathForUpload()+"certificates_tmp"+File.separator;
					//getmainPath()
					//+ "\\Webapps\\ABServer\\files\\certificates_tmp\\";
		} else if (arg2.getParameter("task").equals("outline")) {// ////////System.out.println("ana
			// goa el
			// if");
			uploadPath =getPathForUpload()+"outlines_files"+File.separator;
					//getmainPath()
					//+ "\\Webapps\\ABServer\\files\\outlines_files\\";
			tempPath =getPathForUpload()+"outlines_files_tmp"+File.separator;
					//getmainPath()
					//+ "\\Webapps\\ABServer\\files\\outlines_files_tmp\\";
		}  else if (arg2.getParameter("task").equals("coordinatorCV")) {// ////////System.out.println("ana
			// goa el
			// if");
			uploadPath =getPathForUpload()+"trainingCoordinatorCV"+File.separator;
					//getmainPath()
					//+ "\\Webapps\\ABServer\\files\\outlines_files\\";
			tempPath =getPathForUpload()+"trainingCoordinatorCV_tmp"+File.separator;
					//getmainPath()
					//+ "\\Webapps\\ABServer\\files\\outlines_files_tmp\\";
		}else if (arg2.getParameter("task").equals("CONTRACTS")) {// ////////System.out.println("ana
			// goa el
			// if");
			uploadPath = getPathForUpload()+"contracts"+File.separator;
				//	getmainPath()
				//	+ "\\Webapps\\ABServer\\files\\contracts\\";
			tempPath =getPathForUpload()+"contracts_tmp"+File.separator;
					//getmainPath()
					//+ "\\Webapps\\ABServer\\files\\contracts_tmp\\";
		}

		try {


			// create and intialize the database connection////////////
			DataSourceConnection database = new DataSourceConnection();
			database.initializeConnecton(this.servlet);

//			ServletFileUpload servletFileUpload = new ServletFileUpload(diskFileItemFactory);
//			servletFileUpload.setSizeMax(81920); /* the unit is bytes */

			// ////System.out.println("ana fe el execute");


	//		DiskFileUpload new DiskFileUpload();
		// enctype="multipart/form-data";
			// ////////System.out.println("fileDes =
			// "+arg2.getSession().getValue("fileDes"));
		    DiskFileItemFactory fu = new 	DiskFileItemFactory();
			fu.setSizeThreshold(40*1024*1024); //1 MB
			fu.setRepository(new File(tempPath));
			ServletFileUpload upload = new ServletFileUpload(fu);
			upload.setSizeMax(80*1024*1024);






//			Hiber_Courses HC = new Hiber_Courses();
//        	Integer courseID=(Integer)arg2.getSession().getAttribute("courseID");
//			//Integer courseID = HC.getLastOne(database);
//
//			Courses c = HC.getCourseById(courseID, database);

			//c.setIdCourses(courseID);
			List fileItems = upload.parseRequest(arg2);
			Iterator i = fileItems.iterator();
			// //////System.out.println(fileItems.size());

			int counter = 1;
			int counter2 = 1;
			while (i.hasNext()) {

//				FileItem fi = (FileItem) i.next();
//				String fileName = fi.getName();
//				//System.out.println("file name= " + fileName);
//				if (fileName != null) {
//					if (!fileName.equals("")) {
//											// el
//						// ifff");
//
						if (arg2.getParameter("task") == null) {
							 UploadResourceFiles( arg2,   i ,  counter,  counter2, database);

//						//	tx = session.beginTransaction();
//							String extfile = fileName.substring(fileName.indexOf("."));
//							 ////System.out.println("file name is: " + fileName+" counter = "+counter);
//							if (counter == 7 || counter == 8) {
//
//								fileName = resId + "_photo" + extfile;
//
//							} else if (counter == 4) {
//								fileName = resId + "_company_cv" + extfile;
//
//							}
//
//							else if (counter == 5) {
//								fileName = resId + "_cv" + extfile;
//
//							} else if (counter == 6) {
//
//								if(arg2.getParameter("brief") != null)
//
//								fileName = resId + "_brief" + extfile;
//
//								else
//
//									fileName = resId + "_idphoto" + extfile;
//
//
//							}
//							else if (counter == 2) {
//								fileName = resId + "_contract_"+fileName;
//
//							}
//							//
//							// SimpleDateFormat fmt = new SimpleDateFormat(
//							// "yyyyMMddHHmmssSSS");
//							// String pfileName =
//							// fmt.format(now).toString().trim();
//							//System.out.println("file name = "+fileName);
						} else if (arg2.getParameter("task").equals("outline")) {
							UploadOutline(arg2, i, counter, counter2, database);
//							logger.info(" upload the outline............");
//						//	tx = session.beginTransaction();
//							System.out.println("file name = "+fileName);
//							String extfile = fileName.substring(fileName
//									.indexOf("."));
//							////System.out.println("counter= "+counter2);
//							if (counter2 == 7) {//System.out.println("counter AR= "+counter2);
//								fileName = courseID + "_outlineAr" + extfile;
//								// fi.write(new File(uploadPath + fileName));
//
//							} else if (counter2 == 8) {//System.out.println("counter Eng= "+counter2);
//								fileName = courseID + "_outlineEng" + extfile;
//								// fi.write(new File(uploadPath + fileName));
//
//							}
//
						}else if (arg2.getParameter("task").equals("coordinatorCV")){
							UploadCoordinatorCV(arg2, i, counter, counter2, database);
//							String Coordinatorid=arg2.getParameter("CoordinatorID");
//							int indexOfDot=fileName.indexOf(".");
//							String extfile ="";
//							if (indexOfDot>0)
//							{
//									  extfile = fileName.substring(indexOfDot);
//							}
//
//							fileName = "cv_Coor_"+Coordinatorid + extfile;
						}
//						logger.info(" uploading the "+fileName+"   to the path "+uploadPath);
//            //System.out.println(" uploading the "+fileName+"   to the path "+uploadPath);
//						fi.write(new File(uploadPath + fileName));
//
//
//						if (counter2 == 7) {
//							if(c.getCourseOutlineAr()!=null)
//							{
//								if(!c.getCourseOutlineAr().equals(fileName) && fileName!=null)
//									c.setCourseOutlineAr(fileName);
//							}
//							else
//								c.setCourseOutlineAr(fileName);
//
//						} else if (counter2 == 8) {
//							if(c.getCourseOutlineEng()!=null)
//							{
//								if(!c.getCourseOutlineEng().equals(fileName) && fileName!=null)
//									c.setCourseOutlineEng(fileName);
//							}
//							else
//								c.setCourseOutlineEng(fileName);
//
//						}
//						HC.updateCourse(c, database);
//					}
//				}
//
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

	public static String getPathForUpload(){
//		String temp=	getmainPath()
//				+ File.separator+"Webapps"+File.separator+"ABServer"+File.separator+"files"+File.separator;

	   String temp=	getmainPath()	+"files"+File.separator;

          return temp;
	}
      public static String getmainPathFromSession(HttpServletRequest arg2  ){
    		return RootPathForApplication=arg2.getSession().getServletContext().getRealPath( "/");
      }
	public static String getmainPath() {
		return RootPathForApplication;
//		File temp = new File("");
//		temp.getAbsolutePath();
//		return temp.getAbsolutePath();
	}




	public void UploadOutline(HttpServletRequest arg2, Iterator i , int counter,int counter2,DataSourceConnection database )throws Exception{
		        Hiber_Courses HC = new Hiber_Courses();
			     Integer courseID=(Integer)arg2.getSession().getAttribute("courseID");
			     Courses c = HC.getCourseById(courseID, database);

			FileItem fi = (FileItem) i.next();
			String fileName = fi.getName();
			//System.out.println("file name= " + fileName);
			if (fileName != null) {
				if (!fileName.equals("")) {
										// elcounter2
					// ifff");

					 if (arg2.getParameter("task").equals("outline")) {



						//Integer courseID = HC.getLastOne(database);



						logger.info(" upload the outline............");
					//	tx = session.beginTransaction();
						System.out.println("file name = "+fileName);
//						String extfile = fileName.substring(fileName
//								.indexOf("."));


						int indexOfDot=fileName.indexOf(".");
						String extfile ="";
						if (indexOfDot>0)
						{
								  extfile = fileName.substring(indexOfDot);
						}
						////System.out.println("counter= "+counter2);
						if (counter2 == 7) {//System.out.println("counter AR= "+counter2);
							fileName = courseID + "_outlineAr" + extfile;
							// fi.write(new File(uploadPath + fileName));

						} else if (counter2 == 8) {//System.out.println("counter Eng= "+counter2);
							fileName = courseID + "_outlineEng" + extfile;
							// fi.write(new File(uploadPath + fileName));

						}

					}
					logger.info(" uploading the "+fileName+"   to the path "+uploadPath);
        //System.out.println(" uploading the "+fileName+"   to the path "+uploadPath);
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



	}
	public void UploadCoordinatorCV(HttpServletRequest arg2, Iterator i , int counter,int counter2,DataSourceConnection database)throws Exception{
		Hiber_Coordinators HT=new Hiber_Coordinators();


		     Integer coodrdinatorID= Integer.parseInt( arg2.getParameter("CoordinatorID"));
		     Trainingcoordinators T = HT.getCoordinatorById( coodrdinatorID, database);

          logger.info("changing this  the coordinaotro no.... "+coodrdinatorID);
		FileItem fi = (FileItem) i.next();
		String fileName = fi.getName();
		//System.out.println("file name= " + fileName);
		if (fileName != null) {
			if (!fileName.equals("")) {
				  if (arg2.getParameter("task").equals("coordinatorCV")){
					String Coordinatorid=arg2.getParameter("CoordinatorID");
					int indexOfDot=fileName.indexOf(".");
					String extfile ="";
					if (indexOfDot>0)
					{
							  extfile = fileName.substring(indexOfDot);
					}

					fileName = "cv_Coor_"+Coordinatorid + extfile;
				}
				logger.info(" uploading the "+fileName+"   to the path "+uploadPath);
    //System.out.println(" uploading the "+fileName+"   to the path "+uploadPath);
			 	fi.write(new File(uploadPath + fileName));
			 	T.setTrainingCoordinatorCV(fileName);

               HT.updateCoordinatorCV(T, database);


			}
		}


	}
	public void UploadResourceFiles(HttpServletRequest arg2, Iterator i , int counter,int counter2,DataSourceConnection database) throws Exception{




		FileItem fi = (FileItem) i.next();
		String fileName = fi.getName();
		//System.out.println("file name= " + fileName);
		if (fileName != null) {
			if (!fileName.equals("")) {
									// elcounter2
				// ifff");

				if (arg2.getParameter("task") == null) {
					Integer resId = null;

					if (arg2.getParameter("resID") != null) {
						resId = Integer.parseInt(arg2.getParameter("resID"));

					} else
						resId = Resources.getTheLastResourceId(database) + 1;
				//	tx = session.beginTransaction();
					int indexOfDot=fileName.indexOf(".");
					String extfile ="";
					if (indexOfDot>0)
					{
							  extfile = fileName.substring(indexOfDot);
					}
					//String extfile = fileName.substring(fileName.indexOf("."));
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
				}


				logger.info(" uploading the "+fileName+"   to the path "+uploadPath);
    //System.out.println(" uploading the "+fileName+"   to the path "+uploadPath);
				fi.write(new File(uploadPath + fileName));



			}
		}


	}












}