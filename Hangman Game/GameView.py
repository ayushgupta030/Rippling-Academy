import os

class View: #Deals with all the I/O functionalities
    
    def __init__(self) -> None:
        print("Welcome to Hangman!....")

    def InputValidation(self, character: str) -> bool:
        if len(character) == 1 and ((character>='a' and character<='z') or (character>='A' and character<='Z')):
            return True
        else:
            return False
    
    def InputCorrection(self, character: str) -> str:
        return character.upper()

    def GetUserInput(self, word: str, remaining_guess: int) -> str:
        while 1:
            print("")
            self.PrintRemainingGuess(remaining_guess)
            self.OutputWord(word)
            character = input("Guess the letter or Type 'Hint' for help: ")
            self.clearScreen()
            if self.InputValidation(character) is True:
                return self.InputCorrection(character)
            elif character.upper() == "HINT":
                print("Hint Taken")
                return "HINT"
            else:
                print("Invalid Move!")
    
    def OutputWord(self, word: str) -> str:
        for letter in word:
            print(letter, end = " ")
        print("\n")

    def LetterIsPresent(self) -> None:
        print("Correct!")
    
    def LetterIsUsed(self) -> None:
        print("Letter Already Used")
    
    def WrongLetterOutput(self) -> None:
        print("Incorrect!")
    
    def PrintRemainingGuess(self, remaining_guess: int) -> None:
        print("Your Remaining Guess:", remaining_guess)
    
    def clearScreen(self) -> None:
        os.system('clear')

    def WinningOutput(self, player_details: dict, targetString: str ) -> None:
        self.clearScreen()
        print("Hurray, "+ player_details["PlayerName"] +" Won!!\n")
        print("Your word was:", end = " ")
        self.OutputWord(targetString)
        for key, value in player_details.items():
            print(key,":",value)

    def LosingOutput(self, player_details: dict, targetString: str) -> None:
        self.clearScreen()
        print("Sorry", player_details["PlayerName"], ", You Lose!")
        print("Your word was:", end = " ")
        self.OutputWord(targetString)
    
    def NewGamePermission(self) -> str:
        character = input("Press N for new game or Press any other key to exit: ")
        self.clearScreen()
        if self.InputValidation(character) is True:
            return self.InputCorrection(character)
        else:
            return "#" #Returning dummy string
    
    def PlayerDetails(self) ->str:
        UserName = input("Please enter your name: ").upper()
        self.clearScreen()
        print("Hello, ", UserName)
        return UserName
