import create from 'solid-zustand'

type QuestionStore = {
	questionText: string,
	answer: number,
	setQuestionText: (text: string) => void;
	setAnswer: (answer: number) => void;

}

type Answer = {
	answerText: string,
	right?: boolean
}

export const useQuestion = create<QuestionStore>((set) => ({
	questionText: "",
	answer: 0,
	setQuestionText: (text) => set(() => ({
		questionText: text
	})),
	setAnswer: (answer) => set(() => ({
		answer: answer
	}))
}))


