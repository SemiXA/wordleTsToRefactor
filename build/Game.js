var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Game_pickedWord, _Game_currentWord, _Game_turn, _Game_currentPosition, _Game_userInterface;
import { MAX_WORD_SIZE, MAX_ATTEMPTS, VALID_LETTER_CODES } from "./env.js";
import { UIChanger } from "./UIChanger.js";
export class Game {
    constructor(pickedWord) {
        _Game_pickedWord.set(this, void 0);
        _Game_currentWord.set(this, void 0);
        _Game_turn.set(this, void 0);
        _Game_currentPosition.set(this, void 0);
        _Game_userInterface.set(this, void 0);
        this.checkRightLetters = () => {
            for (let i = 0; i < MAX_WORD_SIZE; i++) {
                if (__classPrivateFieldGet(this, _Game_pickedWord, "f")[i] == __classPrivateFieldGet(this, _Game_currentWord, "f")[i]) {
                    __classPrivateFieldGet(this, _Game_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _Game_turn, "f"), i, "rightLetter");
                }
            }
        };
        this.checkMisplacedLetters = () => {
            let currentLetter = "";
            let pattern;
            let numberOfCoincidencesPickedWord = 0;
            let numberOfCoincidencescurrentWord = 0;
            let differenceOfCoincidences = 0;
            let isMisplacedLetter = true;
            for (let i = 0; i < MAX_WORD_SIZE; i++) {
                isMisplacedLetter = true;
                currentLetter = __classPrivateFieldGet(this, _Game_currentWord, "f")[i];
                pattern = new RegExp(currentLetter, "g");
                numberOfCoincidencesPickedWord = (__classPrivateFieldGet(this, _Game_pickedWord, "f").match(pattern) || []).length;
                numberOfCoincidencescurrentWord = (__classPrivateFieldGet(this, _Game_currentWord, "f").match(pattern) || []).length;
                differenceOfCoincidences = Math.abs(numberOfCoincidencescurrentWord - numberOfCoincidencesPickedWord);
                if (differenceOfCoincidences == 1) {
                    for (let j = 0; j < MAX_WORD_SIZE; j++) {
                        if (__classPrivateFieldGet(this, _Game_pickedWord, "f")[j] == currentLetter) {
                            isMisplacedLetter = false;
                            break;
                        }
                    }
                }
                if (differenceOfCoincidences == 0 && __classPrivateFieldGet(this, _Game_pickedWord, "f")[i] == __classPrivateFieldGet(this, _Game_currentWord, "f")[i]) {
                    isMisplacedLetter = false;
                }
                if (numberOfCoincidencesPickedWord > 0 && isMisplacedLetter)
                    __classPrivateFieldGet(this, _Game_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _Game_turn, "f"), i, "misplacedLetter");
            }
        };
        this.checkWrongLetters = () => {
            let currentLetter = "";
            let pattern;
            let numberOfCoincidencesPickedWord = 0;
            for (let i = 0; i < MAX_WORD_SIZE; i++) {
                currentLetter = __classPrivateFieldGet(this, _Game_currentWord, "f")[i];
                pattern = new RegExp(currentLetter, "g");
                numberOfCoincidencesPickedWord = (__classPrivateFieldGet(this, _Game_pickedWord, "f").match(pattern) || []).length;
                if (numberOfCoincidencesPickedWord == 0)
                    __classPrivateFieldGet(this, _Game_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _Game_turn, "f"), i, "wrongLetter");
            }
        };
        this.updateAfterANewWord = () => {
            this.checkRightLetters();
            this.checkMisplacedLetters();
            this.checkWrongLetters();
            __classPrivateFieldSet(this, _Game_turn, __classPrivateFieldGet(this, _Game_turn, "f") + 1, "f");
            __classPrivateFieldSet(this, _Game_currentPosition, 0, "f");
            __classPrivateFieldSet(this, _Game_currentWord, "", "f");
        };
        __classPrivateFieldSet(this, _Game_pickedWord, pickedWord, "f");
        __classPrivateFieldSet(this, _Game_currentWord, "", "f");
        __classPrivateFieldSet(this, _Game_turn, 1, "f");
        __classPrivateFieldSet(this, _Game_currentPosition, 0, "f");
        __classPrivateFieldSet(this, _Game_userInterface, new UIChanger(), "f");
    }
    get pickedWord() {
        return __classPrivateFieldGet(this, _Game_pickedWord, "f");
    }
    get currentWord() {
        return __classPrivateFieldGet(this, _Game_currentWord, "f");
    }
    set currentWord(word) {
        __classPrivateFieldSet(this, _Game_currentWord, word, "f");
    }
    get turn() {
        return __classPrivateFieldGet(this, _Game_turn, "f");
    }
    set turn(num) {
        __classPrivateFieldSet(this, _Game_turn, num, "f");
    }
    get currentPosition() {
        return __classPrivateFieldGet(this, _Game_currentPosition, "f");
    }
    set currentPosition(num) {
        __classPrivateFieldSet(this, _Game_currentPosition, num, "f");
    }
    get userInterface() {
        return __classPrivateFieldGet(this, _Game_userInterface, "f");
    }
    isValidLetter(code) {
        return VALID_LETTER_CODES.includes(code) && __classPrivateFieldGet(this, _Game_currentPosition, "f") < MAX_WORD_SIZE;
    }
    transformCodeToLetter(code) {
        let letter = "";
        if (code == "Semicolon")
            letter = "Ñ";
        else
            letter = code.split("y")[1];
        return letter;
    }
    checkWordIsRight() {
        if (__classPrivateFieldGet(this, _Game_currentWord, "f") == __classPrivateFieldGet(this, _Game_pickedWord, "f")) {
            location.assign("/winner");
        }
    }
    checkGameIsOver() {
        if (this.turn == MAX_ATTEMPTS) {
            location.assign("/loser");
        }
    }
    newKeyPressed(key) {
        key.pressed();
        key.game.userInterface.changeBackgroundKey(key.code);
    }
}
_Game_pickedWord = new WeakMap(), _Game_currentWord = new WeakMap(), _Game_turn = new WeakMap(), _Game_currentPosition = new WeakMap(), _Game_userInterface = new WeakMap();
