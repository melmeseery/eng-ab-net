package abItems;
import java.awt.Color;
import java.awt.Event;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.GrayColor;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPCellEvent;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;


public class calendarBasicPdf {
	 Document document ;
	  String[] monthName = {"January", "February",
	            "March", "April", "May", "June", "July",
	            "August", "September", "October", "November",
	            "December"};
	  String[] monthNameShort = {"Jan", "Feb",
	            "Mar", "Apr", "May", "Jun", "Jul",
	            "Aug", "Sep", "Oct", "Nov",
	            "Dec"};
	  String[] days = {
			    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
			   };
// -----------Date -----------------------------
	  public static void main(String[] args) throws IOException, DocumentException {
    calendarBasicPdf c = new calendarBasicPdf(2012, 1,4);

    CalendarPdfEvent calevent=new CalendarPdfEvent();

    c.setCalevent(calevent);
    c.writeDocument();
    System.out.println("Starting ............");
//    c.createMulti();
//    for (int m=1 ; m<5; m++){
//    	c.createMonth(2012, m);
//
//    }
//    c.CloseDocument();
    System.out.println("finished _____________");
  }
public void writeDocument(){

	 createMulti();
	   Calendar temp = Calendar.getInstance();
	   temp.set(Year, Month, 1);
	    for (int m=0 ; m<MonthRows; m++){

	    		createMonth(temp.get(Calendar.YEAR), temp.get(Calendar.MONTH));

	    		temp.add(Calendar.MONTH, 1);

	    }
	   CloseDocument();


}
// ----------------------------------------
  static int UPPER_RIGHT_X = 792;
  static  int UPPER_RIGHT_Y = 612;
  static  int DAY_HIGHLIGHT_WIDTH = 15;
  static int DAY_HIGHLIGHT_CORNER = 4;
  static int days_for_Multi=36;
  private java.util.Calendar  _dt;
  private int _rows, _first_offset_of_month, _days_in_month;
  private static float _cell_leading;
  private PdfPTable _ppt;
private CalendarPdfEvent calevent;
  private static Font _font_day, _font_event_even, _font_event_odd;
  private int Year;
  private int Month;
  private  int MonthRows;
// ----------------------------------------
  public calendarBasicPdf(int year, int month) {
    _init_fonts();
    _cell_leading = _font_day.getSize() - 1;
    _init_calendar_dates(year, month);
    _init_table();
    document=new Document();
  }
  public calendarBasicPdf(int year, int month, int monthsRows) {
	    _init_fonts();
	    _cell_leading = _font_day.getSize() - 1;
	    _init_calendar_datesMulti(year, month, monthsRows);
	    _init_tableMulti();
	    MonthRows=monthsRows;
	    Year=year;
	    Month=month;
	    document=new Document();
	  }
// ----------------------------------------
  private void _init_fonts() {
    _font_day = new Font(Font.FontFamily.HELVETICA, 8);
    _font_event_even = new Font(_font_day);
    _font_event_odd = new Font(_font_day);
    _font_day.setStyle(Font.BOLD);
    _font_event_odd.setColor(0, 0, 255);
  }
// ----------------------------------------
  private int getFirstDayofMonth(int year, int month){
	  Calendar temp=Calendar.getInstance();
	   temp.set(year, month, 1);
	    int  first_offset_of_month = (int) temp.get( Calendar.DAY_OF_WEEK) ;
	    return first_offset_of_month;
	 //   _days_in_month =   temp.getActualMaximum( Calendar.DAY_OF_MONTH);
  }
  private int getDaysinMonth(int year,int month){
	  Calendar temp=Calendar.getInstance();
	   temp.set(year, month, 1);
	    //int  first_offset_of_month = (int) temp.get( Calendar.DAY_OF_WEEK) ;
	    //return first_offset_of_month;
	   int days_in_month =   temp.getActualMaximum( Calendar.DAY_OF_MONTH);
	   return days_in_month;
  }
// calculate where all the days go
  private void _init_calendar_dates(int year, int month) {


    _dt = Calendar.getInstance();
    _dt.set(year, month, 1);
    _first_offset_of_month = (int) _dt.get( Calendar.DAY_OF_WEEK) ;
    _days_in_month =   _dt.getActualMaximum( Calendar.DAY_OF_MONTH);
  //  _days_in_month = Date.DaysInMonth(_dt.get(Calendar.YEAR) , _dt.get(_dt.MONTH));
    int row_days = _first_offset_of_month + _days_in_month;
    _rows = row_days > 28 && row_days <= 35
      ? 5 : row_days > 35
        ? 6 : 4;
  }
// ----------------------------------------
// initialize calendar headings
  private void _init_table() {
    _ppt = new PdfPTable(7);
    PdfPCell table_header =  new PdfPCell();
    table_header.setGrayFill(0.8F ) ;
    table_header.setHorizontalAlignment (Element.ALIGN_CENTER);
    // row1 => month, year
    table_header.setPhrase (new Phrase(monthName[_dt.get(Calendar.MONTH)]+"" , _font_day));
    table_header.setColspan (7);
    _ppt.addCell(table_header);
    // row2 => days of week
//    String[] days = {
//     "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
//    };
    table_header.setColspan (1);
    for (int i = 0; i < days.length; i++) {
		      table_header.setPhrase  (new Phrase(days[i], _font_day));
      _ppt.addCell(table_header);
	}

    _ppt.setWidthPercentage (100);
  }

//----------------------------------------
//initialize calendar headings
 private void _init_tableMulti() {
   _ppt = new PdfPTable(days_for_Multi+1);
   PdfPCell table_header =  new PdfPCell();
   table_header.setGrayFill(0.8F ) ;
   table_header.setHorizontalAlignment (Element.ALIGN_CENTER);
   // row1 => month, year
//   table_header.setPhrase (new Phrase(_dt.get(Calendar.DAY_OF_MONTH)+"" , _font_day));
//   table_header.setColspan (days_for_Multi+1);
//   _ppt.addCell(table_header);
   // row2 => days of week


   table_header.setColspan (1);
   for (int i = 0; i <days_for_Multi; i++) {
	   if (i==0)
	   {
		     table_header.setPhrase  (new Phrase("Month", _font_day));
		     _ppt.addCell(table_header);

	   }

	        int ind = i%7;

		      table_header.setPhrase  (new Phrase(days[ind], _font_day));
		      _ppt.addCell(table_header);

	}

   _ppt.setWidthPercentage (100);
 }

//calculate where all the days go
private void _init_calendar_datesMulti(int year, int month, int monthsRows) {


  _dt = Calendar.getInstance();
  _dt.set(year, month, 1);
  _first_offset_of_month = (int) _dt.get( Calendar.DAY_OF_WEEK) ;
  _days_in_month =   _dt.getActualMaximum( Calendar.DAY_OF_MONTH);
//  _days_in_month = Date.DaysInMonth(_dt.get(Calendar.YEAR) , _dt.get(_dt.MONTH));
  int row_days = _first_offset_of_month + _days_in_month;
  row_days=monthsRows;
  _rows =  row_days ;
//  _rows = row_days > 28 && row_days <= 35
//    ? 5 : row_days > 35
//      ? 6 : 4;
}
///-----------------------------------------------------------
public void createMulti(){

	    document.setPageSize(new Rectangle(UPPER_RIGHT_X, UPPER_RIGHT_Y));
	    try {
	    	if (!document.isOpen()){
	      PdfWriter writer = PdfWriter.getInstance(
	        document, new FileOutputStream(new File("calendar.pdf"))

	      );
	      document.open();
	    	}
	      document.compress=true;
	    //  Document.setCompress (false); // debugging
	      // calculate fixed, equal height for all cells (rows)
	      float height = (UPPER_RIGHT_Y
	        - document.topMargin() - document.bottomMargin() - 25)
	      / _rows
	      ;
	      PdfPCell day = new PdfPCell();
	      day.setPaddingTop(0);
	      //day.PaddingTop = 0;
	      _add_event ae = new _add_event();
	      int count = 0;
	      int day_counter = 0;
	      int last_offset_of_month = _first_offset_of_month + _days_in_month;
	      int firstOff;
	      int daysMonth;
	      String daynum;
           Calendar  RowCal;//=Calendar.getInstance();
           RowCal=(Calendar) _dt.clone();
    		// Format the output with leading zeros for days and month
	  		SimpleDateFormat date_format = new SimpleDateFormat("dd-MM-yyyy");
	      for (int i = 0; i < _rows; ++i) {


	  		System.out.println(date_format.format(RowCal.getTime()));

	    	  count = 0;
	    	  day_counter=0;

	    	  firstOff=getFirstDayofMonth(      RowCal.get(Calendar.YEAR),  RowCal.get(Calendar.MONTH));
	    	  daysMonth=getDaysinMonth(     RowCal.get(Calendar.YEAR),  RowCal.get(Calendar.MONTH));
	    	  last_offset_of_month=firstOff+daysMonth;
	        // set fixed row height
	        day.setFixedHeight ( height);
	        for (int j = -1; j < days_for_Multi;  j++) {
	        	if (count==0)
	        	{
	        		daynum=monthNameShort [RowCal.get(Calendar.MONTH)]+"";
	                day.setPhrase (new Phrase(daynum, _font_day));
	               // ++day_counter;
	        	}
	        	else{

	        	if (count>=firstOff   && count <last_offset_of_month){
	        		daynum= (++day_counter)+"";
	        	}
	        	else
	        	{
	        		daynum="";
	        	}
//	          String daynum = count >= firstOff
//	            && count < last_offset_of_month
//	              ? +"" : "";
	          // we're re-using the CellEvent object, so reset it when not needed!
	         // day.setCellEvent( )
	        	day.setCellEvent( null);
	        	if (hasEvent(  day_counter, RowCal.get(Calendar.MONTH),  RowCal.get(Calendar.YEAR))){/// every othe rdya  or if day has events....!!!!!
	        		if (daynum!=""){  // check day not empty
	        				day.setCellEvent( ae);
	        		}

	        	}

//	          day.setCellEvent ( (daynum != "" && day_counter % 5 == 0  ? ae : null));
	          day.setPhrase (new Phrase(daynum, _font_day));
	        	}

	          _ppt.addCell(day);

	          ++count;
	        }
	        RowCal.add(Calendar.MONTH, 1);
	      }
	      document.add(_ppt);
	      document.newPage();
	    }
	    catch (Exception e) {
	    }
}
public void CloseDocument(){

	if (document != null && document.isOpen()) document.close();
}
public boolean hasEvent(int day, int month, int year){
	return calevent.hasEvent( day, month,  year);
//	if (day%5==0)// &  month%6==0
//	return true;
//	else return false ;
}
// ----------------------------------------
// write the table
  public void create() {
   // Document document = new Document();
    document.setPageSize(new Rectangle(UPPER_RIGHT_X, UPPER_RIGHT_Y));
    try {
    	if (!document.isOpen()){
      PdfWriter writer = PdfWriter.getInstance(
        document, new FileOutputStream(new File("calendar.pdf"))

      );

      document.open();
      }

      Document.compress=true;
    //  Document.setCompress (false); // debugging
      // calculate fixed, equal height for all cells (rows)
      float height = (UPPER_RIGHT_Y
        - document.topMargin() - document.bottomMargin() - 25)
      / _rows
      ;
      PdfPCell day = new PdfPCell();
      day.setPaddingTop(0);
      //day.PaddingTop = 0;
      _add_event ae = new _add_event();
      int count = 0;
      int day_counter = 0;
      int last_offset_of_month = _first_offset_of_month + _days_in_month;

      for (int i = 0; i < _rows; ++i) {
        // set fixed row height
        day.setFixedHeight ( height);
        for (int j = 0; j < 7; ++j) {
          String daynum = count >= _first_offset_of_month
            && count < last_offset_of_month
              ? (++day_counter) +"" : "";
          // we're re-using the CellEvent object, so reset it when not needed!
         // day.setCellEvent( )
          day.setCellEvent ( (daynum != "" && day_counter % 5 == 0  ? ae : null));
          day.setPhrase (new Phrase(daynum, _font_day));
          _ppt.addCell(day);
          ++count;
        }
      }
      document.add(_ppt);
    }
    catch (Exception e) {
    }
  }



//write the table
 public void createMonth(int year, int month) {

	    _cell_leading = _font_day.getSize() - 1;
	    _init_calendar_dates(year, month);
	    _init_table();
  // Document document = new Document();
   document.setPageSize(new Rectangle(UPPER_RIGHT_X, UPPER_RIGHT_Y));
   try {
   	if (!document.isOpen()){
     PdfWriter writer = PdfWriter.getInstance(
       document, new FileOutputStream(new File("calendar.pdf"))

     );

     document.open();
     }

     Document.compress=true;
   //  Document.setCompress (false); // debugging
     // calculate fixed, equal height for all cells (rows)
     float height = (UPPER_RIGHT_Y
       - document.topMargin() - document.bottomMargin() - 25)
     / _rows
     ;
     PdfPCell day = new PdfPCell();
     day.setPaddingTop(0);
     //day.PaddingTop = 0;
     _add_event ae = new _add_event();
     int count = 0;
     int day_counter = 0;
     int last_offset_of_month = _first_offset_of_month + _days_in_month;

     for (int i = 0; i < _rows; ++i) {
       // set fixed row height
       day.setFixedHeight ( height);
       for (int j = 0; j < 7; ++j) {
         String daynum = count >= _first_offset_of_month
           && count < last_offset_of_month
             ? (++day_counter) +"" : "";
         // we're re-using the CellEvent object, so reset it when not needed!
        // day.setCellEvent( )
         day.setCellEvent ( (daynum != "" && day_counter % 5 == 0  ? ae : null));
         day.setPhrase (new Phrase(daynum, _font_day));
         _ppt.addCell(day);
         ++count;
       }
     }
     document.add(_ppt);
     document.newPage();
   }
   catch (Exception e) {
   }
 }








// ----------------------------------------
// custom functionality when writing each day's event to each cell
 class _add_event implements PdfPCellEvent {
    public void cellLayout(
      PdfPCell cell, Rectangle position, PdfContentByte[] canvases
    )
    {
      // rounded rectangle, highlighted days with event(s)
      PdfContentByte cbb = canvases[PdfPTable.BACKGROUNDCANVAS];
      cbb.setColorStroke(new GrayColor(0.4f));
      cbb.setColorFill(BaseColor.YELLOW);
      cbb.roundRectangle(
    		  position.getLeft(),
       // position.Left,        // lower-left x-coordinate
        position.getTop() -        // lower-left y-coordinate
            _cell_leading - 3,
        DAY_HIGHLIGHT_WIDTH,  // highlight rectangle width
        _cell_leading + 3,    // highlight rectangle height
        DAY_HIGHLIGHT_CORNER  // corner "roundness"
      );
      cbb.fillStroke();
      PdfContentByte cb = canvases[PdfPTable.TEXTCANVAS];
      ColumnText ct = new ColumnText(cb);
      // set exact coordinates for ColumnText
      ct.setSimpleColumn(
        position.getLeft() + 2,  // lower-left x; add some padding
        position.getBottom(),    // lower-left y
        position.getRight(),     // upper-right x
        position.getTop()        // upper-right x; adjust for existing content
            - _cell_leading - 3
      );
      String [] lines=calevent.getEventsLines();
//      String[] lines = {
//        "event one", "event two",
//        "event three continuing over more than one line.", "event four"
//      };
      // visually separate events by font color
      for (int i = 0; i < lines.length; ++i) {
        ct.addElement(new Phrase(
          _cell_leading,
          lines[i],
          i % 2 == 0 ? _font_event_even: _font_event_odd
        ));
      }
      try {
		ct.go();
	} catch (DocumentException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
    }


}








public CalendarPdfEvent getCalevent() {
	return calevent;
}
public void setCalevent(CalendarPdfEvent calevent) {
	this.calevent = calevent;
}
public Document getDocument() {
	return document;
}
public void setDocument(Document document) {
	this.document = document;
}
}