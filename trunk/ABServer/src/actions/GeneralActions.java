/**
 * 
 */
package actions;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import org.apache.log4j.lf5.util.DateFormatManager;

import com.thoughtworks.xstream.converters.basic.DateConverter;

/**
 * @author noha
 * 
 */
public class GeneralActions {

	// paresDate take the date as string and parse it to the java Date Obj
	public static Date parseDate(String parameter) {

		Calendar cal = Calendar.getInstance();

		cal.set(cal.YEAR, Integer.parseInt(parameter.substring(0, 4)));
		cal.set(cal.MONTH, Integer.parseInt(parameter.substring(5, 7)) - 1);
		cal.set(cal.DATE, Integer.parseInt(parameter.substring(8, 10)));

		return cal.getTime();
	}

	public static Date parseDateToRequiredDate(String parameter)
			throws ParseException {
		
		Calendar cal = Calendar.getInstance();
		DateFormatManager dfm = new DateFormatManager();
		dfm.setPattern("dd-MMM-yyyy");
		dfm.setLocale(Locale.US);

		cal.set(cal.YEAR, Integer.parseInt(parameter.substring(0, 4)));
		cal.set(cal.MONTH, Integer.parseInt(parameter.substring(5, 7)) - 1);
		cal.set(cal.DATE, Integer.parseInt(parameter.substring(8, 10)));

		
		////System.out.println(dfm.format(cal.getTime()));

		return dfm.parse(dfm.format(cal.getTime()));

	}

}
