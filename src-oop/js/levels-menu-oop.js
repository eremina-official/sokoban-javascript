/**
 * Creates a levels menu list instance, handles menu toggling, 
 * sends a command to the sokoban instance when a new level is selected from a list.
 * 
 * @property {object} levels - levels array
 * @property {Sokoban} sokobanInstance - current sokoban instance
 * @property {object} levelsMenuButtonElement - DOM element
 * @property {object} levelsListElement - DOM element
 */
class LevelsMenu {
  /**
   * Create a levels menu list instance.
   * 
   * @param {object} levels - levels array
   * @param {Sokoban} sokobanInstance - current sokoban instance
   */
  constructor(levels, sokobanInstance) {
    this.levels = levels;
    this.sokobanInstance = sokobanInstance;
    this.levelsMenuButtonElement = document.querySelector('.js-levels-menu-button');
    this.levelsListElement = document.querySelector('.js-levels-menu-list');
    this.showLevelsList = this.showLevelsList.bind(this);
    this.closeLevelsList = this.closeLevelsList.bind(this);
    this.goToLevel = this.goToLevel.bind(this);
    this.init();
  }

  bindEvents() {
    document.addEventListener('click', this.showLevelsList);
    document.addEventListener('click', this.closeLevelsList);
    document.addEventListener('click', this.goToLevel);
  }

  /**
   * Toggle levels menu with Levels button.
   * 
   * @param {event} event - DOM event instance
   */
  showLevelsList(event) {
    if (event.target === this.levelsMenuButtonElement) {
      this.levelsListElement.classList.toggle('levels-menu__list-is-active');
    }
  }

  /**
   * Close levels menu on click on any area outside the menu.
   * 
   * @param {event} event - DOM event instance
   */
  closeLevelsList(event) {
    if (
      !event.target.classList.contains('js-levels-menu') &&
      this.levelsListElement.classList.contains('levels-menu__list-is-active')  
    ) {
      this.levelsListElement.classList.remove('levels-menu__list-is-active');
    }
  }

  closeLevelsListOnSelection() {
    this.levelsListElement.classList.remove('levels-menu__list-is-active');
  }

  goToLevel(event) {
    if (event.target.classList.contains('js-levels-menu-item')) {
      const levelNumber = +event.target.textContent - 1;
      this.sokobanInstance.goToLevel(levelNumber);
    }
  }

  renderLevelsList() {
    this.levels.forEach((level, levelIndex) =>  {
      const levelDiv = document.createElement('button');
      /* js-levels-menu class is used in the LevelsMenu.closeLevelsList method
         js-levels-menu-item class is used in the LevelsMenu.goToLevel method
      */
      levelDiv.setAttribute('class', `levels-menu__list__item js-levels-menu-item js-levels-menu`);
      levelDiv.textContent = levelIndex + 1;
      this.levelsListElement.appendChild(levelDiv);
    });
  }

  init() {
    this.renderLevelsList();
    this.bindEvents();
  }
}


export default LevelsMenu;
