/* Name: Hercules Cheng
 * Course: ICS3UC
 * Teacher: Ms. McCaffery
 * Date: 28th November, 2022
 * Description: spoon, a card game (console playing version)
 */

 package methods_arrays;
 import java.util.Scanner;
 import java.util.Random;
 
 public class Spoon_FinalProject 
 {
    public static void main(String[] args) 
    {
        //Initializing variables
        Scanner myInput = new Scanner(System.in);
        String option = null;
        boolean bob = false;
 
        //print welcome statement
        System.out.println("Welcome to SPOON (PIG version)!!!\n" + "============================");
 
        //display the menu and collect user's input until the answer equals to Q
        while(bob == false) 
        {
            printMenu();
            option = myInput.next();
            if(option.equalsIgnoreCase("R"))
            {
                displayRules();
                // bob = false;
            }
            else if (option.equalsIgnoreCase("P"))
            {
                playGame();
                // bob = false;
            }
            else if (option.equalsIgnoreCase("Q"))
            {
                bob = true;
            }
            else  
            {
                System.out.println("Invalid letter. Please try again.");
                // bob = false;
            }
        }//end while loop
 
        //when the input equals to Q
        System.out.println("Thanks for playing!! See you soon q(`･∀･)p");
        myInput.close();
    }//end main

    public static void printMenu() 
    {
        System.out.println("\nPlease select an option :\n"
                 + "	R - display Rules\n"
                 + "	P - Play game\n"
                 + "	Q - Quit\n");
     }//end printMenu
 
    public static void displayRules() 
    {
        System.out.println("This game is for 3-8 players. There will be a deck of card 52 in total. Everyone starts with 4 random "
                + "\rcards drawn from the deck. The first player as a starter will get 1 random card from the deck. Then the 1st player passes"
                + "\ra card of his or her choice to the next player and the last player discards theirs back to the bottom of the deck and the "
                + "\rdealer get another card from the top of the deck. Each player tries to make four of a kind (e.g. A of clubs, A of diamonds,"
                + "\rA of hearts, A of spades). Once any player makes four of a kind, he or she gets a score and restart the round. evertime they score, "
                + "\rP-I-G is spelled out. Player needs to spend out 'PIG' to win the game. "
                + "\r======================================================"
                + "\rREADY TO PLAY?");
    }//end displayRules
 
    public static void playGame() 
    {
        //Initialize variables
        Scanner myInput = new Scanner(System.in);
        int numbOfPlayers = 0, currentCard=0;
        String winner = null; 
        String [][] playerCards = new String[8][5];     // 8 is the max people in the game
        String [] player = new String [8];              // 5 is the max cards that held by each player
        String[] deck = {"Heart-6", "Heart-9", "Club-8", Spade-8, Diamond-10, Diamond-8, Diamond-3, 
                        Club-9, Spade-9, Spade-3, Heart-10, Club-5, Diamond-Q, Spade-5, Spade-2, 
                        Diamond-A, Club-7, Spade-Q, Spade-K, Heart-7, Club-Q, Heart-Q, Diamond-2, 
                        Heart-5, Spade-7, Diamond-9, Club-10, Heart-A, Spade-4, Diamond-J, Club-A,	
                        Spade-6, Diamond-7, Club-J, Club-4, Diamond-6, Heart-4, Heart-K, Heart-J, 
                        Diamond-5, Spade-A, Heart-8, Club-6, Club-2, Diamond-K, Club-K, Heart-2, 
                        Spade-J, Heart-3, Club-3, Spade-10, Diamond-4};

        // clean up players name and cards held by each  
        for(int i= 0; i < 8; i++)
        {   
            player[i] = null;   
            for (int j=0; j<5; j++)
            {
                playerCards[i][j]=null;
            }
        }

        //ask the user how many players are playing 
        System.out.println("Please enter the number of players(3-8):");
        numbOfPlayers = myInput.nextInt();
        // Here : need to check if smaller than 3 or greater than 8 or some other characters

        //for loop to create name for the players in the multiarray
        for(int i = 0; i < numbOfPlayers; i++)
        {
            System.out.println("please enter your name here: ");
            player[i] = myInput.next();
        }
        
        shuffleDeck(deck);      

        // NOW: Give card to each player, not k is keeping track of deck of card number given
        for (int j=0; j<4; j++)
        {
            for (int i=0; i<numbOfPlayers; i++)
            {
                playerCards[i][j] = deck[currentCard];
                // console.log("\r current card position is now" + currentCard);
                currentCard++;
            }
        }
        // console.log(" the current card position is " + currentCard);



        // display the winner of this game
        // System.out.println("Congratulation!" + "the winner is " + winner + " !");
 
    }//end playGame 

    public static void shuffleDeck(String deck[]) 
    {
        // initialize the original deck of cards
        // should add seed so that to make it more random later
        Random rand = new Random();
        int numbOfCard = 52; 

        // for each Card, pick another random card (0-51) and swap them
        for (int index = 0; index < numbOfCard; index++)
        {
            // select a random number between 0 and 51
            int  n = rand.nextInt(numbOfCard);
            // swap current Card with randomly selected Card
            String temp = deck[index];
            deck[index] = deck[n];
            deck[n] = temp;
        }
        //return a new shuffled deck
    }//end shuffleDeck

    public static void playRounds() 
    {
        //createPlayerdeck()
        //distribute the cards to the players 1234123412341234 
    }//end playRounds
  
}//end class
 
 