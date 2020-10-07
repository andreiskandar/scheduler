describe('Appointments', () => {
  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');
    // Visits the root of our web server
    cy.visit('/');

    // Clicks on the "Add" button in the second appointment
    cy.contains('[data-testid=day]', 'Monday');
  });

  it('should book an appointment', () => {
    cy.get('[alt=Add]').first().click();

    // Enters their name
    const studentName = 'Lydia Miller-Jones';
    cy.get('[data-testid=student-name-input').type(studentName, { delay: 150 });

    // Chooses an interviewer
    cy.get('[alt="Sylvia Palmer"]').click();

    // Clicks the save
    cy.contains('Save').click();

    // Sees the booked appointment
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('should edit an appointment', () => {
    // waiting for actionability
    cy.get('[alt="Edit"]').first().click({ force: true });

    const newStudentName = 'Lydia Miller-Jones';
    cy.get('[data-testid=student-name-input').clear().type(newStudentName, { delay: 150 });

    cy.get('[alt="Tori Malcolm"]').click();
    // click arguments
    cy.contains('Save').click();

    // disable waiting for actionability
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
  });

  it('should cancel an appointment', () => {
    cy.contains('.appointment__card--show', 'Archie Cohen').get('[alt="Delete"]').first().click({ force: true });

    cy.contains('Confirm').click();

    cy.contains('Deleting').should('exist');
    cy.contains('Deleting').should('not.exist');

    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});
