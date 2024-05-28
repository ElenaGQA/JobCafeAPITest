/// <reference types = "Cypress"/>

describe('Get Jobs Tests', () => {

  it('get all jobs', () => {
    cy.request('/').then((response) => {
      console.log(response),
        expect(response.status).equal(200),
        expect(response.statusText).equal("OK")
    })
  })

  it('verify jobs results list', () => {
    cy.request('/').then((response) => {
      console.log(response.body.content),
        expect(response.body.content).not.empty

    })
  })

  it('job listing has all the details', () => {
    cy.request('/').then((response) => {
      console.log(response.body.content),
        expect(response.body.content[0]).have.property("id"),
        expect(response.body.content[0].id).not.null

    })
  })

  it('job listing has all the details', () => {
    cy.request('/').then((response) => {
      var result = response.body.content[0]
      console.log(result),
        expect(result).have.property("id"),
        expect(result.id).not.null,
        expect(result.id).eq("654286613f7d791f7b3e7b20"),
        expect(result).have.property("position"),
        expect(result.position).eq("Senior Identity Analyst"),
        expect(result).have.property("company"),
        expect(result.company).eq("Nicolas Inc"),
        expect(result).have.property("location"),
        expect(result.location).eq("Maricopa"),
        expect(result).have.property("seniority"),
        expect(result.seniority).eq("Consultant"),
        expect(result).have.property("link"),
        expect(result.link).contain("https"),
        expect(result).have.property("description"),
        expect(result.description).eq("Direct"),
        expect(result).have.property("time"),
        expect(result.time).eq("two hours ago"),
        expect(result).have.property("salary"),
        expect(result.salary).eq("100k"),
        expect(result).have.property("date"),
        expect(result.date).eq("once upon a time")

    })
  })

  it('search job by id', () => {
    cy.request('/?id=65428cee3f7d791f7b3e7b45').then((response) => {
      let resultList = response.body.content
      console.log(resultList),
        expect(response.status).equal(200)
      expect(resultList[0].id).equal("65428cee3f7d791f7b3e7b45")

    })
  })

  it('search job by date', () => {
    cy.request('/?date=2021-07-11').then((response) => {
      let resultList = response.body.content
      console.log(resultList)
      expect(response.status).equal(200)

      resultList.forEach(job => {
        expect(job.date).to.equal("2021-07-11")

      })
    })
  })

  it('search job by company', () => {
    cy.request('/?company=legion').then((response) => {
      let resultList = response.body.content
      console.log(resultList)
      expect(response.status).equal(200)

      resultList.forEach(job => {
        expect(job.company.toLowerCase()).to.include("legion")

      })
    })
  })

  it('search job by location', () => {
    cy.request('/?location=Toronto').then((response) => {
      let resultList = response.body.content
      console.log(resultList),
        expect(response.status).equal(200)

      for (let i = 2; i < resultList.length; i++) {
        expect(resultList[i].location).equal('Toronto, ON, Canada')
      }

    })
  })

  it('search job by description', () => {
    cy.request('/?description=100k').then((response) => {
      let resultList = response.body.content
      console.log(resultList)
      expect(response.status).equal(200)

      resultList.forEach(job => {
        expect(job.description.toLowerCase()).to.include("100k")

      })
    })
  })

  it('search job by combinbation of location and company', () => {
    cy.request('/?location=Toronto&company=Apple').then((response) => {
      let resultList = response.body.content
      console.log(resultList)
      expect(response.status).equal(200)

      for (let i = 2; i < resultList.length; i++) {
        expect(resultList[i].location).equal('Toronto, ON, Canada')
      }

      resultList.forEach(job => {
        expect(job.company.toLowerCase()).to.include("apple")

      })
    })
  })

  it('search job by combinbation of location and pagination', () => {
    cy.request('/?location=Toronto&page=1&pageSize=10').then((response) => {
      let resultList = response.body.content
      console.log(resultList)
      expect(response.status).equal(200)

      for (let i = 2; i < resultList.length; i++) {
        expect(resultList[i].location).equal('Toronto, ON, Canada')
      }
      expect(resultList.length).to.equal(10)
    })
  })


})