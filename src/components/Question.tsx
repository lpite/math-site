import { createEffect, createSignal, For } from "solid-js";
import { random } from "../utils/random";
import shuffleArray from "../utils/shuffleArray";

import {
	useNotification
} from "../stores/notificationStore"

const ANSWERS_COUNT = 4;

function generateQuestion() {
	const questionType = random(1, 4).toString();
	console.log(questionType)
	if (questionType === "1") {
		const firstNumber = random(1, 100);
		const secondNumber = random(1, 100)
		const answer = firstNumber +
			secondNumber
		return {
			answer: answer,
			questionText: `${firstNumber}+${secondNumber}=`,
		};
	}
	if (questionType === "2") {
		const firstNumber = random(1, 100);
		const secondNumber = random(1, 100)
		const answer = secondNumber
		return {
			answer: answer,
			questionText: `${firstNumber + secondNumber}-${firstNumber}=`,
		};
	}
	if (questionType === "3") {
		const firstNumber = random(1, 15);
		const secondNumber = random(1, 15)
		const answer = firstNumber * secondNumber
		return {
			answer: answer,
			questionText: `${firstNumber}*${secondNumber}=`,
		};
	}
	if (questionType === "4") {
		const firstNumber = random(1, 15);
		const secondNumber = random(1, 15)
		const answer = (firstNumber * secondNumber) / firstNumber
		return {
			answer: answer,
			questionText: `${firstNumber * secondNumber}/${firstNumber}=`,
		};

	}
	return {
		answer: 0,
		questionText: ``,
	};
	
}

function generateWrongAnswers(answer: number) {
	let answerVarinats: number[] = [];
	answerVarinats.push(answer);

	for (let i = 1; i < ANSWERS_COUNT; i++) {
		const randomNumber = random(answer - 5, answer + 5);
		let duplicates = answerVarinats.indexOf(randomNumber) === -1 ? false : true;

		answerVarinats.push(randomNumber)
		while (duplicates) {
			const newRandomNumber = random(answer - 5, answer + 5);
			duplicates = answerVarinats.indexOf(newRandomNumber) === -1 ? false : true;
			answerVarinats[i] = newRandomNumber
		}
	
	}
	return shuffleArray(answerVarinats) as number[];
}
export default function Question() {
	const [question, setQuestion] = createSignal(generateQuestion());
	const [selectedAnswer, setSelectedAnswer] = createSignal<number | null>(null);

	const notification = useNotification()

	function answerQuestion() {
		if (selectedAnswer() === question().answer) {
			notification.setText("yep")
		} else {
			notification.setText("noup")
		}
		notification.showNotification()

		setQuestion(generateQuestion())
		setSelectedAnswer(null)
	}
	function selectAnswer(answer: number) {
		setSelectedAnswer(answer)
		notification.hideNotification()
	}

	createEffect(() => {
		if (notification.status === "open") {
			setTimeout(() => notification.hideNotification(), 1000)
		}
	})
	return (
		<>

			<div class="question_block">
				<span class="question_block__question_text">
					{question().questionText}
				</span>
			</div>
			<div class="answers_block">
				<For each={generateWrongAnswers(question().answer)}>
					{(answer) => (
						<>
							<label class="answers_block__answer" 
								onClick={() => selectAnswer(answer)}>
								<input type="radio" name="answer" checked={answer === selectedAnswer()} />
								{answer}
							</label>
							
						</>
					)}
				</For>
			</div>
			<div class="next_question_block">
				<button 
					onClick={answerQuestion} 
					class="next_question_button" 
					disabled={!selectedAnswer()}

				>Next</button>
			</div>
		</>
	)
}