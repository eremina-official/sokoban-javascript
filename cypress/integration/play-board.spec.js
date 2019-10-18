describe('sokoban play', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('board and person are present', () => {
    cy.get('.board')
      .should('exist')

    cy.get('.square.person')
      .should('exist')
  })


  it('person moves', () => {
    cy.get('body').trigger('keyup', {keyCode: 40});
    cy.get('.js-3-1').should('have.class', 'person')
  })


  it('winner screen appears', () => {
    cy.get('body').trigger('keyup', {keyCode: 40})
      .trigger('keyup', {keyCode: 40})
      .trigger('keyup', {keyCode: 39})
      .trigger('keyup', {keyCode: 39})
      .trigger('keyup', {keyCode: 39})

    cy.get('.winner-screen').should('not.have.class', 'winner-screen-is-hidden')
    cy.focused()
      .should('have.class', 'winner-screen__button')

    cy.get('.winner-screen__button').click()
    cy.get('.info__item.level')
      .should('have.text', 'Level: 2')
  })


  it('link to the Build page works', () => {
    cy.contains('Build').click();
    cy.url().should('include', '/level-maker.html');
  })
})
