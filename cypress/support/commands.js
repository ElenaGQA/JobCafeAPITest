let adminKey = 'adminadmin'

Cypress.Commands.add('deletePositionById', (id) =>{
    cy.request({
        method: 'DELETE',
        url: '/' + id,
        qs: {key: adminKey}
    }).then ((response) =>{
        console.log(response)
    })
})