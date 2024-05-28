/// <reference types = "Cypress"/>


describe('Error tests', () => {

    let positionBody = {

        "position": "QA",
        "company": "mycompanyABC",
        "location": "Toronto",
        "seniority": "junior",
        "link": "www.linkedin.com",
        "description": "some text",
        "time": "two hours ago",
        "salary": "100k",
        "date": "2010-06-06T12:00:00"

    }

    
    it('Create Job - missing key', () => {
        cy.request({
            method: "POST",
            url: '/create',
            body: positionBody,
            failOnStatusCode: false
        }).then((response) => {
            console.log(response.body)
            expect(response.status).equal(400)
            expect(response.body).to.have.property("error")
            expect(response.body.error).to.equal('Bad Request')
          
        })
    })

    

    it('Create Job - invalid key', () => {
        let adminKey = 'admin'
        cy.request({
            method: "POST",
            url: '/create',
            body: positionBody,
            qs: { key: adminKey } ,
            failOnStatusCode: false
        }).then((response) => {
            console.log(response.body)
            expect(response.status).equal(403)
            expect(response.body).to.have.property("error")
            expect(response.body.error).to.equal('Forbidden')

        })
    })

    it('search job by invalid id', () => {
        cy.request('/?id=1234567890').then((response) => {
            console.log(response.body)
            expect(response.status).equal(404)
            expect(response.body).to.have.property("error")
            expect(response.body.error).to.equal('Not Found')
    
        })
      })

})