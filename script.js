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
});
