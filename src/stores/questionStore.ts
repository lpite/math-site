import create from "solid-zustand";
import { random } from "../utils/random";

type QuestionStore = {
  questionText: string;
  answer: number;
  questionDifficulty: number;
  firstOperand: number;
  secondOperand: number;
  sign: string;

  setQuestionText: (text: string) => void;
  setAnswer: (answer: number) => void;
  setDifficulty: (newDifficulty: number) => void;

  generateQuestion: () => void;
};

export const useQuestion = create<QuestionStore>((set) => ({
  questionText: "",
  answer: 0,
  questionDifficulty: 1,
  sign: "",
  firstOperand: 0,
  secondOperand: 0,

  generateQuestion: () =>
    set((state) => {
      const questionType = random(1, 4).toString();
      const difficulty = state.questionDifficulty * 2;

      if (questionType === "1") {
        const firstNumber = random(1, 100 + difficulty);
        const secondNumber = random(1, 100 + difficulty);
        const answer = firstNumber + secondNumber;
        return {
          ...state,
          answer: answer,
          firstOperand: firstNumber,
          secondOperand: secondNumber,
          sign: "+",
        };
      }
      if (questionType === "2") {
        const firstNumber = random(1, 100 + difficulty);
        const secondNumber = random(1, 100 + difficulty);
        const answer = secondNumber;
        return {
          ...state,
          answer: answer,
          firstOperand: firstNumber + secondNumber,
          secondOperand: firstNumber,
          sign: "-",
        };
      }
      if (questionType === "3") {
        const firstNumber = random(1, 8 + difficulty / 2);
        const secondNumber = random(1, 8 + difficulty / 2);
        const answer = firstNumber * secondNumber;
        return {
          ...state,

          answer: answer,
          firstOperand: firstNumber,
          secondOperand: secondNumber,
          sign: "*",
        };
      }
      if (questionType === "4") {
        const firstNumber = random(1, 8 + difficulty / 2);
        const secondNumber = random(1, 8 + difficulty / 2);
        const answer = (firstNumber * secondNumber) / firstNumber;
        return {
          ...state,
          answer: answer,
          firstOperand: firstNumber * secondNumber,
          secondOperand: firstNumber,
          sign: ":",
        };
      }
      return state;
    }),
  setQuestionText: (text) =>
    set(() => ({
      questionText: text,
    })),
  setAnswer: (answer) =>
    set(() => ({
      answer: answer,
    })),
  setDifficulty: (newDifficulty) =>
    set(() => ({
      questionDifficulty: newDifficulty,
    })),
}));
