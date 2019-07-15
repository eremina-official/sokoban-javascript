/**
 * Renders the view according to a model.
 * Receives commands from a game instance and updates info screen.
 */
class Info {
  constructor(levelNumber) {
    this.level = levelNumber;
    this.stepElement = document.querySelector('.js-step');
    this.setLevelNumber();
  }

  setLevelNumber() {
    document.querySelector('.js-level').textContent = `Level: ${this.level}`;
  }

  updateStep(stepNumber) {
    this.stepElement.textContent = stepNumber;
  }
}


export default Info;
