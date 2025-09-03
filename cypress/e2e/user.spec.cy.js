import userData from '/cypress/fixtures/user-data.json'
describe('Orange HRM tests', () => {
  
  const selectorsList = { 
    usernameField: "[name='username']" ,
    passwordField: "[name= 'password']" ,
    loginButton: "[type='submit']" ,
    sectionTitleTopBar:".oxd-topbar-header-breadcrumb" ,
    dashboardGrid: ".orangehrm-dashboard-grid" ,
    wrongCredentialAlert: "[role='alert']",
    myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]' ,
    firstNameField: "[name='firstName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dateField: "[placeholder='yyyy-dd-mm']",
    dateCloseButton: ".--close",
    submitButoon: ".orangehrm-left-space",

  }



  it('User info Update - Sucess', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSucess.username)
    cy.get(selectorsList.passwordField ).type(userData.userSucess.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.dashboardGrid)
    cy.get(selectorsList.myInfoButton).click()
    cy.get(selectorsList.firstNameField).clear().type('firstNameTest')
    cy.get(selectorsList.genericField).eq(3).clear().type('EmployeeIDtest')
    cy.get(selectorsList.genericField).eq(4).clear().type('Other Id Test')
    cy.get(selectorsList.genericField).eq(5).clear().type('Drive Lincese test')
    cy.get(selectorsList.genericField).eq(6).clear().type('2025-03-10')
    cy.get(selectorsList.dateCloseButton).click()
    cy.get(selectorsList.submitButoon).eq(0).click()
    cy.get(selectorsList.genericField).eq(8).clear().type('Test Field')
    cy.get(selectorsList.submitButoon).eq(1).click()
    cy.get('body').should('contain', 'Successfully Saved' )

  })

  it('Login - Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)

  
  })
})