/* Name: Hercules Cheng
 * Course: ICS3UC
 * Teacher: Ms. Mccaffery
 * Date: 26th October, 2022
 * Description: classroom menu
 */

package practice_methods_arrays;
import java.util.Scanner;
public class Testing
{
	public static void main(String[] args) throws InterruptedException
	{
		Scanner myInput = new Scanner(System.in);
		//declare and initialize variables for each menu function 
		String teacherName;
		String courseName;
		final int MAX = 30;

		//ask for the user's name and the course name
		System.out.println("Please enter your name.");
		teacherName = myInput.next();
		System.out.println("Please enter the course name.");
		courseName = myInput.next();
		System.out.println("Hi " + teacherName + ", Welcome to " + courseName + " class menu!");

		//ask the teacher about the class info
		System.out.println("Please enter the number of student you want to store in the class system");
		int numStud = myInput.nextInt();

		// Need to check numStud > MAX; if yes, should prompt to the teacher that the class is oversize
		// also teacher is not allowed to enter zero student, if zero is entered, prompt error. then program exit

		if (numStud > MAX || numStud ==0)
		{
			System.out.println("The number of student in your entry is not a valid number");
			System.exit(0);
		}		

		//set arrays for the students names and current grades
		String [] studNames = new String[MAX];           	// MAX = 35 students
		double [] studMarks = new double[MAX];				// MAX = 35 marks for 35 students

		// student name array and Student mark array initialization
		for (int i=0; i < MAX; i++){
			studNames[i] = null;
			studMarks[i] = 0;
		}

		//for loop to collect the names and grades
		for(int counter = 0; counter < numStud; counter++)
		{
			System.out.println("Enter #"+(counter+1)" student's name");
			studNames [counter] = myInput.next();
			System.out.println("Enter the current grade of the student as a %");
			studMarks [counter] = myInput.nextDouble();
		}

		//Provide the teacher with a sentinel view
		displayClassInfo(studNames, studMarks, numStud, courseName);

		//wait 4 secs then display option menu 
		Thread.sleep(4000);

		boolean sign;
		int position;

		while (true){
			displayMenu();

			// String option = myInput.next();
			int option = myInput.nextInt();

			switch (option)
			{
				case 1: // Adding Student
					if ((numStud+1) <= MAX)
					{
						numStud++;
						System.out.println("\nEnter the new student's name #"+ numStud);
						studNames [numStud-1] = myInput.next();
						System.out.println("Enter the current grade of the student as a % \n");
						studMarks [numStud-1] = myInput.nextDouble();
						System.out.println("New Student and Mark are entered and stored \n");
					} 
					else 
					{
						System.out.println("You are not allowed to add more student as it reaches Maximum Class Student Limit");
						Thread.sleep(3000);
					}
					break;

				case 2: // Removing Student
					sign = false;
					position = 0;

					System.out.println("Enter the student name you intend to remove");
					String tempName = myInput.next();			
					for (int j = 0; j < numStud; j++)
      				{	
    					if (studNames[j].equalsIgnoreCase(tempName))
      					{
        					System.out.println ("There is a match of student name\n");
        					sign = true;
        					position = j;
        					for (j=position; j < numStud; j++)
    						{
    							 studNames [j] = studNames [j+1];
    							 studMarks [j] = studMarks [j+1];			
    						}
      					}
      				}
					if (sign)
					{
						System.out.println (tempName + " is removed sucessfully\n");
						numStud--;
					}
					else
  					{
    					System.out.println ("There is NO-MATCH of student name; does not exist at all");
					 	System.out.println("Your removal process is terminated\n");
  					}
				break;

				case 3: // Update Student's Mark

					System.out.println("Enter the student name you you want to upgrade his or her mark");
					String tempName = myInput.next();
					sign = false;	

					for (int j = 0; j < numStud; j++)
				  	{	
						if (studNames[j].equalsIgnoreCase(tempName))
						{
							sign = true;
							System.out.println ("There is a match of student name\n");
							System.out.println("Enter the student new mark you want to modify");
							double number = myInput.nextDouble();
							studMarks[j] = number;
							System.out.println (tempName + " marks " + number + "% updated sucessfully\n");
							break;
						}
					}
					if (!sign)
					{
						System.out.println ("There is NO-MATCH of student name; does not exist at all");
					 	System.out.println("Your mark upgrade process is terminated\n");
					}
					break;

				case 4: // Viewing Class Information
					// System.out.println("You are now in viewing class information ");
					displayClassInfo(studNames, studMarks, numStud, courseName);
					Thread.sleep(5000);
					break;

				case 5: // exit from the program
					System.out.println("Thank you for using" + courseName + "class menu. Good-Bye\n");
					System.exit(0);
					break;

				default:
					System.out.println("Invalid Option is enter, please re-select again");

			} 	// end switch block	

		}	// end infinite loop

	} 	//end main

	public static void displayMenu() {
		//display the menu options
		System.out.println("\rPlease select an option number below:\n");
		System.out.println(" 1) Add student\n 2) Remove student\n 3) Update student mark\n 4) View Class Information\n 5) Exit\n");
	}//end displayMenu

	public static void displayClassInfo(String Names[], double[] Marks, int number, String course)
	{
		System.out.println(course + " class information:");
		System.out.println("=================================================");
		for(int counter = 0; counter < number; counter++)
		{
			System.out.println("Names:\t" + Names[counter] + "\t Current grade: " + Marks[counter] + "\t%");
		}
	}

}//end class