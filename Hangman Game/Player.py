MAX_GUESSES = 6

class Player: #Contains all the player details
    
    def __init__(self, name) -> None:
        self._player_name = name
        self.ResetPlayerDetails()
    
    def ResetPlayerDetails(self) -> None:
        self._totalscore = 0
        self._hintpanelty = 0
        self._player_score = 0
        self._hintTaken = 0
        self._remaining_guess = MAX_GUESSES
        self._present_valid_moves = list()
    
    def WrongGuess(self) -> None:
        if self._remaining_guess>0 :
            self._remaining_guess = self._remaining_guess-1

    def RightGuess(self) -> None:
        self._player_score += 100
        self._totalscore +=100
    
    def HintPenalty(self) -> None:
        self._player_score -= 50
        self._hintpanelty -= 50
        self._hintTaken += 1
    
    def UpdatePlayerMove(self, character: str) -> None:
        self._present_valid_moves.append(character)
    
    def IsLetterUsed(self, character: str) -> bool:
        for letter in self._present_valid_moves:
            if letter == character:
                return True
        else:
            return False

    def GetPlayerDetails(self) -> dict:
        return {
            "PlayerName": self._player_name,
            "RemainingGuess": self._remaining_guess,
            "HintTaken": self._hintTaken,
            "TotalScore": self._totalscore,
            "HintPanelty": self._hintpanelty,
            "PlayerScore": self._player_score,
        }
    
    def IsGuessRemaining(self) -> bool:
        if self._remaining_guess>0:
            return True
        else:
            return False