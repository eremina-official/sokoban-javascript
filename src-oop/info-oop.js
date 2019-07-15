/**
 * Renders the view according to a model.
 * Receives commands from a game instance and updates info screen.
 */
class Info {

  /**
   * Create info instance.
   * 
   * @param {number} levelNumber - number of the current level 
   */
  constructor(levelNumber) {
    this.level = levelNumber;
    this.stepElement = document.querySelector('.js-step');
    this.setLevelNumber();
    this.resetStepNumber();
  }

  setLevelNumber() {
    document.querySelector('.js-level').textContent = `Level: ${this.level}`;
  }

  resetStepNumber() {
    this.stepElement.textContent = `Step: 0`;
  }

  updateStep(stepNumber) {
    this.stepElement.textContent = `Step: ${stepNumber}`;
  }
}


export default Info;
