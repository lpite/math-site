import { Component, lazy } from "solid-js";

const Notification = lazy(
  () => import("./components/Notification/Notification"),
);
const Question = lazy(() => import("./components/Question/Question"));

const App: Component = () => {
  return (
    <main class="question_page">
      <Notification />
      <Question />
    </main>
  );
};

export default App;
