package methods_arrays;
import java.util.Scanner;
import java.util.Random;

public class Spoon_FinalProject
{
    public static void main(String[] args)
    {
        // Initializing variables
        Scanner myInput = new Scanner(System.in);
        String option = null;
        boolean bob = false;

        //print welcome statement
        System.out.println("Welcome to SPOON(PIG version)!!!\n" + "============================");
          
        //display the menu and collect user's input until the answer equals to Q
        while(bob == false)
        {
            printMenu();
            option = myInput.next();
            if(option.equalsIgnoreCase("R"))
            {
                displayRules();
                bob = false;
            }
            else if (option.equalsIgnoreCase("P"))
            {
                playGame();
                bob = false;
            }
            else if (option.equalsIgnoreCase("Q"))
            {
                bob = true;
            }
            else 
            {
                System.out.println("Invalid letter. Please try again.");
                bob = false;
            }
        }//end while loop

        //when the input equals to Q
        System.out.println("Thanks for playing!! See you soon q(`･∀･)p");
        myInput.close();

    }//end main

    public static void printMenu()
    {
        System.out.println("\nPlease select an option :\n"
                + "    R - display rules\n"
                + "    P - play game\n"
                + "    Q - quit");
    }//end displayMenu

    public static void displayRules()
    {
        System.out.println("\nThis game is for 3-8 players. There will be a deck of card 52 in total. Everyone starts with 4 random "
                + "\rcards drawn from the deck. The first player as a dealer will get a random card from the deck. Then each player passes"
                + "\ra card of their choice to the next player and the last player discards theirs back to the bottom of the deck and the "
                + "\rdealer get another card from the top of the deck. Each player tries to make four of a kind (e.g. 1 of clubs, 1 of diamonds,"
                + "\r1 of hearts, 1 of spades). Once the player makes four of a kind, they get a score and restart the round. evertime they score, "
                + "\rP-I-G is spelled out. Player needs to spend out 'PIG' to win the game. "
                + "\r======================================================"
                + "\rREADY TO PLAY?");
    }//end displayRules

    public static void playGame()
    {
        //Initialize variables
        Scanner myInput = new Scanner(System.in);
        int numbOfPlayers = 0, currentCard=0, winnerIndex=999;
        int Score[] = new int[8];
        String winner = null;
        boolean winning=false;
        String playerCards[][] = new String[8][5]; // 8 is the max player number; 5 is the max cards that held by each player
        String player[] = new String [8];
        String deck[] = { "Heart-A","Heart-2","Heart-3","Heart-4","Heart-5","Heart-6","Heart-7","Heart-8",
                          "Heart-9","Heart-10","Heart-J","Heart-Q","Heart-K", "Club-A","Club-2","Club-3","Club-4","Club-5",
                          "Club-6","Club-7","Club-8","Club-9","Club-10","Club-J","Club-Q","Club-K", "Diamond-A","Diamond-2",
                          "Diamond-3","Diamond-4","Diamond-5","Diamond-6","Diamond-7","Diamond-8","Diamond-9","Diamond-10" ,
                          "Diamond-J","Diamond-Q","Diamond-K","Spade-A","Spade-2","Spade-3","Spade-4","Spade-5","Spade-6",
                          "Spade-7","Spade-8","Spade-9","Spade-10","Spade-J","Spade-Q","Spade-K"
                        };
       
        // Initialization --- clean up all players name and cards held by each player
        for (int i=0; i<8; i++) {
            player[i] = null;
            for (int j=0; j<5; j++) {
                playerCards[i][j] = null;
            }
        }

        //ask the user how many players are playing
        System.out.println("Please enter the number of players(3-8):");
        numbOfPlayers = myInput.nextInt();
        // here we need to check if smaller than 3 or greater than 8 or some other invalid characters entered
       
        // for loop to create name for the players so that makes the game more interactive
        for(int i = 0; i < numbOfPlayers; i++)
        {
            System.out.println("please enter player name here:  ");
            player[i] = myInput.next();
        }

        shuffleDeck(deck);

        // Below is the formatted print out for debugging purpose
        for(int i=0; i<52; i++)
        {
            System.out.print(deck[i]);
            for (int j=0; j<(13 - deck[i].length()); j++)
            {
                System.out.print(" ");
            }
            if(((((i+1)%4) == 0) && (i+1)>4) || ((i+1)==4))
            {
                System.out.print("\n");
            }       
        }
   
//      Now assign cards to each player, currentCard keeps track of deck of card number given so far
        for(int j=0; j<(5-1); j++) {
            for(int i=0; i<numbOfPlayers; i++) {
                playerCards[i][j] = deck[currentCard];
                currentCard++;
            }
        }
       
//         Print out whose get what cards for debugging purpose
        System.out.printf("\n");
        for (int i=0; i < numbOfPlayers; i++)
        {
            System.out.print(player[i] + "\t\t");
            for(int j=0; j<(5-1); j++)
            {
                System.out.print(playerCards[i][j]);
                for (int k=0; k<(13 - playerCards[i][j].length()); k++)
                {
                    System.out.printf(" ");
                }
            }
            System.out.print("\n");
        }
       
        // scorecard initialize
        for(int i=0; i < numbOfPlayers; i++)
            Score[i]=0;   
        // use scorecard to keep track of which is scoring, scoring "twice" "2" would win this game"
        while (!winning){
            winnerIndex=startOfRealGame(numbOfPlayers, player, currentCard, deck, playerCards);
            if (winnerIndex<8)
            {
                Score[winnerIndex]=Score[winnerIndex] + 1;
                for(int x=0; x < numbOfPlayers; x++)
                    System.out.printf("The score for index%d is; %d%n", x, Score[x]);
                if(Score[winnerIndex]>=1) // temporarily set to 1
                    winning=true;
            } else {
                System.out.print("\nThis game is tied");
            }
           
        }
   
        System.out.printf("\nWe are seeing return value is : %d ", winnerIndex);
       
        // display the winner of this game
        System.out.printf("\nCongratulation! player%d %s won %n", winnerIndex, player[winnerIndex]);

    }//end playGame

    public static void shuffleDeck(String deck[])
    {
        // initialize the original deck of cards
        // should add seed so that to make it more random each time it runs
        Random rand = new Random();
        int numbOfCard = 52;
       
        // for each Card, pick another random card (0-51) and swap them
        for (int index = 0; index < deck.length; index++)
        {
            // select a random number between 0 and 51
            int  n = rand.nextInt(numbOfCard);

            // swap current Card with randomly selected Card
            String temp = deck[index];
            deck[index] = deck[n];
            deck[n] = temp;
        } // return a new shuffled deck

    } // end shuffleDeck

    public static int startOfRealGame(int nbrPlayer, String[] player, int cardPositionInDeck, String[] deck, String[][] playerCards)
    {
       
//        System.out.printf("we are here seeing %d players here %n", nbrPlayer);
//        System.out.printf("Player[0] is %s and Player[%d] is %s%n", player[0], nbrPlayer-1, player[nbrPlayer-1]);
//        System.out.printf("we are here seeing deck position here %d%n", cardPositionInDeck);
//        System.out.printf("Deck position is containing %s%n", deck[cardPositionInDeck]);
//        System.out.printf("we are seeing the card of 2nd player the fourth card is %s%n", playerCards[1][3]);
//        System.out.printf("we are seeing the card of 5nd player the second card is %s%n", playerCards[4][1]);
       
        Scanner myInput = new Scanner(System.in);
        int Round = 3; // after 3 round of given cards, still no one win, we make this game as "tie" that will eliminate game deadloop
        String tempDeck [] = new String[(52-3*4)]; // use 3 as the minimum player will give the most cards to give out
        String tempHoldCard, tempHoldName;
        char ans;
        int ansNumber, maxGivenCardNbr, winner=999;
       
        for(int i=0; i< nbrPlayer; i++) {
            tempHoldName = player[i];
            player[i] = tempHoldName.toUpperCase();
        }
       
        System.out.print("\n\n");
        maxGivenCardNbr = 52-nbrPlayer*4; // this is the number of card left with after the first 4-times given out   
        for(int m=0; m < maxGivenCardNbr; m++)
        {
            for (int i=0; i < nbrPlayer; i++)
            {
                System.out.print(player[i] + "\t\t");
                for (int j=0; j < (5-1); j++)
                {
                    System.out.print(playerCards[i][j]);
                    for (int k=0; k<(13 - playerCards[i][j].length()); k++)
                    {
                        System.out.printf(" ");
                    }
                }
                playerCards[i][(5-1)] = deck[cardPositionInDeck];
                System.out.print(playerCards[i][(5-1)] + "\n");
                // Now print next instruction : Like only 1,2,3,4,5 are discard or "P" for PIG
                System.out.printf("Please select 1,2,3,4,5 to discard the one you don't want to keep%n");
                System.out.print("OR just input 'P'ig if you are winning ");
                // System.out.flush();
                ans = myInput.next().charAt(0);
                while (!(ans=='1' || ans=='2' || ans=='3' || ans=='4' || ans=='5' || ans=='p' || ans=='P'))
                {
                    System.out.print("\nOops it is invalid input, please re-enter\n");
                    ans = myInput.next().charAt(0);
                }
                if(ans == 'p' || ans == 'P')
                {
                    System.out.print("\t p or P here\n");
                    if (!ValidWin(i, playerCards))
                    {
                        System.out.print("It is not a valid win, Game Play Continue\n");
                    }
                    else
                    {
                        winner = i;
                        System.out.printf("winner code here is : %d%n", winner);
                        break;
                        // Winninghandling
                    }
                }
                else
                {
                    ansNumber = Character.getNumericValue(ans); // ans is a character, cannot be index, so must convert it to integer
                    tempHoldCard = playerCards[i][ansNumber-1];
                    playerCards[i][ansNumber-1] = playerCards[i][(5-1)];
                    deck[cardPositionInDeck] = tempHoldCard;
                }
            }
            if (winner == 999)
            {
                tempDeck[m] = deck[cardPositionInDeck];
                cardPositionInDeck = cardPositionInDeck + 1;
            }
            else
            {
                System.out.printf("2nd time winner code here is : %d%n", winner);
                break;
            }   
        }
       
        // used the below code later for 3 ROUNDS
//        System.out.print("tempDeck holds all these below");
//        for(int p=0; p < maxGivenCardNbr; p++)
//        {
//            System.out.print("\n"+deck[p]);
//            for (int x=0; x<(13 - deck[x].length()); x++)
//            {
//                System.out.print(" ");
//            }
//            if(((((p+1)%4) == 0) && (p+1)>4) || ((p+1)==4))
//            {
//                System.out.print("\n");
//            }       
//        }
       
        System.out.printf("3rd winner code here is : %d%n", winner);
       
        return (winner); // suppose to return player index
        //createPlayerdeck()
        //distribute the cards to the players 1234123412341234

    }//end startOfRealGame
   
    public static boolean ValidWin(int index, String[][] winDeck) {
        int lastPosition;
        char c0, c1, c2, c3, c4;
        String temp;
        boolean winStatus=false;

        temp = winDeck[index][0];        
        lastPosition = temp.length()-1;
        c0 = temp.charAt(lastPosition);

        temp = winDeck[index][1];        
        lastPosition = temp.length()-1;
        c1 = temp.charAt(lastPosition);
       
        temp = winDeck[index][2];        
        lastPosition = temp.length()-1;
        c2 = temp.charAt(lastPosition);
       
        temp = winDeck[index][3];        
        lastPosition = temp.length()-1;
        c3 = temp.charAt(lastPosition);
       
        temp = winDeck[index][4];         // (5-1)
        lastPosition = temp.length()-1;
        c4 = temp.charAt(lastPosition);
       
        System.out.printf("%c%n%c%n%c%n%c%n%c%n", c0,c1,c2,c3,c4);
       
        if(c0==c1)
        {
            if (c2==c3)
            {
                winStatus = true;
            }
            else if ((c2!=c3) && (c4==c0))
            {
                winStatus = true;
            }
        }
        else if ((c2==c3) && (c3==c4))
        {
            winStatus = true;
        }
   
        System.out.printf("Win Status Changed : %b%n", winStatus);


        return(winStatus);
    }

}//end class