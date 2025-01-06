import { createEffect, createSignal, For, onMount } from "solid-js";
import { random } from "../../utils/random";
import shuffleArray from "../../utils/shuffleArray";

import styles from "./Question.module.css";

import { useNotification } from "../../stores/notificationStore";
import { useQuestion } from "../../stores/questionStore";

const ANSWERS_COUNT = 4;

function generateWrongAnswers(answer: number) {
  let answerVarinats: number[] = [];
  answerVarinats.push(answer);

  for (let i = 1; i < ANSWERS_COUNT; i++) {
    const randomNumber = random(answer - 5, answer + 5);
    let duplicates = answerVarinats.indexOf(randomNumber) === -1 ? false : true;

    answerVarinats.push(randomNumber);
    while (duplicates) {
      const newRandomNumber = random(answer - 5, answer + 5);
      duplicates =
        answerVarinats.indexOf(newRandomNumber) === -1 ? false : true;
      answerVarinats[i] = newRandomNumber;
    }
  }
  return shuffleArray(answerVarinats) as number[];
}
export default function Question() {
  const question = useQuestion();
  const [selectedAnswer, setSelectedAnswer] = createSignal<number | null>(null);

  const notification = useNotification();

  function answerQuestion() {
    if (selectedAnswer() === question.answer) {
      notification.setText(
        `yep new difficulty ${question.questionDifficulty + 1}`,
      );
      question.setDifficulty(question.questionDifficulty + 1);
    } else {
      notification.setText("noup");
      question.setDifficulty(1);
    }
    notification.showNotification();
    const newQuestion = question.generateQuestion();
    setSelectedAnswer(null);
  }
  function selectAnswer(answer: number) {
    setSelectedAnswer(answer);
    notification.hideNotification();
  }

  createEffect(() => {
    if (notification.status === "open") {
      setTimeout(() => notification.hideNotification(), 1000);
    }
  });
  onMount(() => {
    question.generateQuestion();
  });
  return (
    <>
      <div class={styles["question_block"]}>
        <span class={styles["question_block__operand"]}>
          {question.firstOperand}
        </span>
        <div style={{ display: "flex" }}>
          <span class={styles["question_block__sign"]}>{question.sign}</span>
        </div>

        <span class={styles["question_block__operand"]}>
          {question.secondOperand}
        </span>
        {question.questionText}
      </div>
      <div class="answers_block">
        <For each={generateWrongAnswers(question.answer)}>
          {(answer) => (
            <>
              <label
                class="answers_block__answer"
                onClick={() => selectAnswer(answer)}
              >
                <input
                  type="radio"
                  name="answer"
                  checked={answer === selectedAnswer()}
                />
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
        >
          Next
        </button>
      </div>
    </>
  );
}
