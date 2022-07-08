from Board import GameBoard
from GameView import View
from Player import Player

class Hangman: #Contains whole game control
    
    def __init__(self) -> None:
        self.view = View()
        self.player = Player(self.view.PlayerDetails())
        self.NewGame()

    def NewGame(self) -> None:
        while 1:
            UserInput = self.view.NewGamePermission()
            if UserInput == "N":
                self.board = GameBoard()
                self.player.ResetPlayerDetails()
                self.playgame()
                self.exitgame()
            else:
                break

    def playgame(self) -> None: # Brain of Game.
        while 1:
            UserInput = self.view.GetUserInput(self.board.BoardPresentState(), self.player.GetPlayerDetails()['RemainingGuess'])

            if UserInput == "HINT":
                self.player.HintPenalty()
                UserInput = self.board.RevealCharacter()
            elif self.player.IsLetterUsed(UserInput):
                self.view.LetterIsUsed()
            elif self.board.IsLetterPresent(UserInput):
                self.board.UpdatePresentState(UserInput)
                self.player.RightGuess()
                self.view.LetterIsPresent()
            else:
                self.player.WrongGuess()
                self.view.WrongLetterOutput()
            self.player.UpdatePlayerMove(UserInput)


            if self.board.IsGameFinished() is True:
                self.view.WinningOutput(self.player.GetPlayerDetails(), self.board.Target_Word())
                return
            elif self.player.IsGuessRemaining() is False:
                self.view.LosingOutput(self.player.GetPlayerDetails(), self.board.Target_Word())
                return
    
    def exitgame(self) -> None: #destroys different objects
        del self.board

if __name__ == "__main__":
    Hangman()