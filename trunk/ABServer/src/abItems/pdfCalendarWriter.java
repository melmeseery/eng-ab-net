/**
 *
 */
package abItems;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;

import actions.LoginAction;

import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.codec.Base64.InputStream;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.apache.log4j.Logger;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;




import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfWriter;
import database.DataSourceConnection;

/**
 * @author maha
 *
 */
public class pdfCalendarWriter {
	  static Logger logger = Logger.getLogger(pdfCalendarWriter.class);
	public Document writeFile(DataSourceConnection database,
			HttpServletRequest request, ByteArrayOutputStream baos) throws IOException, SQLException {

		CalendarData calendar = new CalendarData();
		String returnText;

		////get the data...................
if (request.getSession().getAttribute("contractId")!=null){
	  returnText = calendar.retreiveContractCourses(database, request);
}
else {
		  returnText = calendar.retreiveGeneralCalendarCourses(database, request);
}

//System.out.println(returnText);
System.out.println(" what is this ");
/////////////////////now change to pdf.............
  System.out.println("Starting ............");

	   calendarBasicPdf c = new calendarBasicPdf(2012, 1,4);

	    CalendarPdfEvent calevent=new CalendarPdfEvent(  );

	    c.setCalevent(calevent);
	    c.writeDocument();

//	    c.createMulti();
//	    for (int m=1 ; m<5; m++){
//	    	c.createMonth(2012, m);
	//
//	    }
//	    c.CloseDocument();
	    System.out.println("finished _____________");
//    // step 1
//    Document document = new Document();
//    // step 2
//    PdfWriter.getInstance(document, baos);
//    // step 3
//    document.open();
//
//   System.out.println( returnText );
//    // step 4
//    ByteArrayInputStream is = new ByteArrayInputStream(returnText.getBytes("UTF-8"));
////    InputStream is
////        = getResourceAsStream("/movies.xml");
//
//    InputSource t=new InputSource(is);
//
//    SAXParser parser = SAXParserFactory.newInstance().newSAXParser();
//    parser.parse(t, new XmlHandler(document));
//    // step 5
//    document.close();
//
//    return document;
		return c.getDocument();



	}

}
