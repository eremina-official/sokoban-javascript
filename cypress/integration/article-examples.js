


describe('test example', () => {
  it('visits the wikipedia webpage', () => {
    cy.visit('https://www.wikipedia.org/')    //go to www.wikipedia.org

    cy.contains('English')                    //find the element with content 'English'
      .click()                                //and click on it
    
    cy.url()                                  //verify that the new URL includes '/Main_Page'
      .should('include', '/Main_Page')
  })
})


describe('test example', () => {
  it.only('searches wikipedia with keywords', () => {
    cy.visit('https://www.wikipedia.org/')

    cy.focused()
      .type('test')
      .type('{enter}')
    
    cy.url()
      .should('include', '/test')
  })
})


describe('test example', () => {
  it('opens your app, gets element, clicks the button, fills in the form, asserts', () => {
    cy.visit('https://your app url/')

    cy.get('.')
      .click()

    cy.get('input')
      .type('search keywords')
      .type('{enter}')
  })
})


describe('test example', () => {
  it('class name example', () => {
    cy.get('button')
      .should('have.class', 'active')
  })
})
