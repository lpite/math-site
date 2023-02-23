import create from 'solid-zustand'

type QuestionStore = {
	questionText: string,
	answer: number,
	questionDifficulty: number,

	setQuestionText: (text: string) => void;
	setAnswer: (answer: number) => void;
	setDifficulty: (newDifficulty: number) => void
}


export const useQuestion = create<QuestionStore>((set) => ({
	questionText: "",
	answer: 0,
	questionDifficulty: 1,
	setQuestionText: (text) => set(() => ({
		questionText: text
	})),
	setAnswer: (answer) => set(() => ({
		answer: answer
	})),
	setDifficulty: (newDifficulty) => set(() => ({
		questionDifficulty: newDifficulty
	}))
}))


