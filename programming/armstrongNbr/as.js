// 1. ask the Original Number
// 2. break it down to HOW MANY digit, calling n
// 3. break it down to n of integers
// 4. summation of each digit integers with the power of n
// 5. is the sum === to the original number
// 6. if yes it is armstrong number or else, it is not

const prompt = require("prompt-sync")();

const askingWhatNumber = () => 
{
    const nbr = prompt("Enter what number do you want to check: ");
    const count = nbr.length;
    var intNbr = parseInt(nbr);
    const originalNbr = intNbr;
    var m = count;
    var tempINT = intNbr;
    var sum = 0;

    if (isNaN(intNbr) || intNbr <= 0) {
      console.log("Invalid entered, try again.");
    } 
    else {
        // console.log("how many digit here " + count);
        for (let i = 0; i < count; i++) 
        {
            if (count == 1)
            {
                console.log("the single digit int is " + intNbr + " an armstrong number");
                sum = intNbr;
                break;
            }
            else
            {
                m=m-1;
                if (m == 0)
                {
                    sum = sum + Math.pow(intNbr,count);
                }
                else
                {
                    tempINT = Math.floor(tempINT/Math.pow(10,m));
                    sum = sum + Math.pow(tempINT,count);
                    // console.log("sum add is " + sum);
                    intNbr = intNbr-tempINT*Math.pow(10,m);
                    tempINT = intNbr;
                    // console.log("IntNbr is remaining as " + tempINT);
                }
            }
        }
    }
    // console.log("the sume is " + sum);
    // console.log("the original int number is "+ originalNbr);
    if (originalNbr === sum)
        console.log(" your given number "+ originalNbr +" is an ArmStrong Number\n");
    else 
        console.log(" Your given number is NOT an Armstrong Number"); 
};

askingWhatNumber();