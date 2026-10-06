document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation menu
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#main-menu");

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";

      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menu.classList.toggle("open");
    });
  }

  // Haptic feedback demonstration
  const distanceSlider = document.querySelector("#distance-slider");
  const directionSlider = document.querySelector("#direction-slider");

  const distanceValue = document.querySelector("#distance-value");
  const directionValue = document.querySelector("#direction-value");
  const intensityValue = document.querySelector("#intensity-value");
  const pulseValue = document.querySelector("#pulse-value");
  const activeMotor = document.querySelector("#active-motor");

  function updateHapticDemo() {
    if (!distanceSlider || !directionSlider) {
      return;
    }

    const distance = Number(distanceSlider.value);
    const direction = Number(directionSlider.value);

    let directionName = "Center";

    if (direction < 33) {
      directionName = "Left";
    } else if (direction > 66) {
      directionName = "Right";
    }

    const intensity = Math.round(100 - distance);
    const pulseRate = Math.max(1, Math.round((100 - distance) / 12));

    if (distanceValue) {
      distanceValue.textContent = `${distance}% away`;
    }

    if (directionValue) {
      directionValue.textContent = directionName;
    }

    if (intensityValue) {
      intensityValue.textContent = `${intensity}%`;
    }

    if (pulseValue) {
      pulseValue.textContent = `${pulseRate} pulses/sec`;
    }

    if (activeMotor) {
      activeMotor.textContent = `${directionName} motor active`;
    }
  }

  if (distanceSlider) {
    distanceSlider.addEventListener("input", updateHapticDemo);
  }

  if (directionSlider) {
    directionSlider.addEventListener("input", updateHapticDemo);
  }

  updateHapticDemo();

  // Quiz activity
  const quizButtons = document.querySelectorAll(".quiz-options button");
  const checkQuizButton = document.querySelector("#check-quiz");
  const quizResult = document.querySelector("#quiz-result");

  quizButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const question = button.dataset.question;
      const feedback = document.querySelector(`#${question}-feedback`);

      document
        .querySelectorAll(`button[data-question="${question}"]`)
        .forEach((option) => {
          option.classList.remove("selected");
        });

      button.classList.add("selected");

      if (feedback) {
        feedback.textContent = "Answer selected.";
        feedback.classList.remove("correct", "wrong");
      }
    });
  });

  if (checkQuizButton) {
    checkQuizButton.addEventListener("click", () => {
      const questions = ["q1", "q2", "q3", "q4"];
      let score = 0;

      questions.forEach((question) => {
        const selected = document.querySelector(
          `button[data-question="${question}"].selected`
        );

        const feedback = document.querySelector(`#${question}-feedback`);

        if (!selected) {
          if (feedback) {
            feedback.textContent = "Choose an answer for this question.";
            feedback.className = "quiz-feedback wrong";
          }
        } else if (selected.dataset.answer === "correct") {
          score += 1;

          if (feedback) {
            feedback.textContent = "Correct.";
            feedback.className = "quiz-feedback correct";
          }
        } else if (feedback) {
          feedback.textContent =
            "Not quite. Review the explanation above.";
          feedback.className = "quiz-feedback wrong";
        }
      });

      if (quizResult) {
        quizResult.textContent = `Your score: ${score}/4.`;

        quizResult.className =
          score === 4
            ? "quiz-feedback correct"
            : "quiz-feedback";
      }
    });
  }

  // Browser-based page narration
  const readButton = document.querySelector("#read-page");
  const stopButton = document.querySelector("#stop-reading");

  function getPageText() {
    const mainContent = document.querySelector("main");

    if (!mainContent) {
      return "";
    }

    const contentCopy = mainContent.cloneNode(true);

    contentCopy
      .querySelectorAll(
        "button, audio, input, output, .page-navigation"
      )
      .forEach((element) => {
        element.remove();
      });

    return contentCopy.innerText.replace(/\s+/g, " ").trim();
  }

  if (readButton && "speechSynthesis" in window) {
    readButton.addEventListener("click", () => {
      window.speechSynthesis.cancel();

      const pageText = getPageText();
      const speech = new SpeechSynthesisUtterance(pageText);

      speech.rate = 0.95;
      speech.pitch = 1;
      speech.volume = 1;

      window.speechSynthesis.speak(speech);
    });
  }

  if (stopButton && "speechSynthesis" in window) {
    stopButton.addEventListener("click", () => {
      window.speechSynthesis.cancel();
    });
  }
});
