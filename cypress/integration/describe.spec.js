/// <reference types="cypress" />

it("External test", () => {

})

describe("TestGroup 1",() => {
    describe("TestGroup 1.1", () => {
        it("Test 1.1.1", () => {
            
        })
        it("Test 1.1.2", () => {
            
        })
    })
    
    describe("TestGroup 1.2", () => {
        it.skip("Test 1.2.1", () => {
            
        })
        it("Test 1.2.2", () => {
            
        })
    })

    it("Test 1.1",() => {

    })
// Use this function option ".only" if you want to run only this one
    // it.only("Test 1.1",() => {

    // })
})