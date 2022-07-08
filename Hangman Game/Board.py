from linecache import getline
from random import randint

datalength = 267751

class GameBoard: #Deals with all the content related to board/string
    
    def __init__(self) -> None:
        self._target_word = self.fetchWord().upper();  
        self._present_board_state = "_"*len(self._target_word)

    def fetchWord(self) -> str:
        return getline('data.txt',randint(0, datalength))
    
    def IsLetterPresent(self, character: str) -> bool:
        for letter in self._target_word:
            if letter == character:
                return True
        else:
            False
    
    def setString(self, string: str, index: int, letter: str) -> None:
        if index == 0:
            return letter + string[1:]
        elif index == len(string)-1:
            return string[0:-1] + letter
        else:
            return string[0:index] + letter + string[index+1:]
    
    def RevealCharacter(self) -> str:
        for index in range(len(self._present_board_state)):
            if self._present_board_state[index] == '_':
                letter = self._target_word[index]
                self.UpdatePresentState(letter)
                return letter

    def UpdatePresentState(self, character: str) ->str:
        for index in range(len(self._target_word)):
            if self._target_word[index] == character:
                self._present_board_state = self.setString(self._present_board_state, index, character)

    def IsGameFinished(self) -> bool:
        if self._present_board_state == self._target_word :
            return True
        else:
            return False
    
    def BoardPresentState(self) -> str:
        return self._present_board_state

    def Target_Word(self) -> str:
        return self._target_word

