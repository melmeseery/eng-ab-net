package abItems;
/**
 *
 */

/**
 * @author maha
 *
 */
public class CalendarPdfEvent {




	public boolean hasEvent(int day, int month, int year) {

		if (day%5==0)// &  month%6==0
		return true;
		else return false ;
	}

	public String[] getEventsLines() {
      String[] lines = {
      "event one",
      "event two",
      "event three continuing over more than one line.",
      " four"
    };
		return lines;
	}

}
