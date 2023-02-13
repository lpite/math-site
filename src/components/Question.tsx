import { createSignal, For } from "solid-js";
import { random } from "../utils/random";
import shuffleArray from "../utils/shuffleArray";

const ANSWERS_COUNT = 4;

function generateQuestion() {
	const firstNumber = random(1, 100);
	const secondNumber = random(1, 100)
	const answer = firstNumber +
		secondNumber
	return {
		answer: answer,
		questionText: `${firstNumber}+${secondNumber}=`,
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
	const [selectedAnswer, setSelectedAnswer] = createSignal(0);
	function answerQuestion() {
		if (selectedAnswer() === question().answer) {
			alert("uhu")
		} else {
			alert("noup")
		}
		setQuestion(generateQuestion())
		setSelectedAnswer(0)
	}
	function selectAnswer(answer: number) {
		setSelectedAnswer(answer)
	}
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
								<input type="radio" name="answer" />
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