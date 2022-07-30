/// <reference types="cypress" />

it('Equality', () => {
    const a = 1
    expect(a).equal(1)
    expect(a).not.equal(2)
})

describe('Truthy', () => {
    it("Testing True asserts", () => {
        const a = true
        expect(a).equal(true)
        expect(a).true
        expect(a).not.false
        expect(a).not.null
        expect(a).not.undefined
    })
    
    it("Testing False asserts", () => {
        const b = false
        expect(b).equal(false)
        expect(b).false
        expect(b).not.true
        expect(b).not.null
        expect(b).not.undefined
    })

    it("Testing Null asserts", () => {
        const c = null
        expect(c).equal(null)
        expect(c).null
        expect(c).not.undefined
    })

    it("Testing Undefined variables", () => {
        let d
        expect(d).undefined
    })


})

it("Objects Equality", () => {
    const obj = {
        a: 1,
        b: 2
    }
    const empty_obj = {}

    expect(obj).equal(obj)
    expect(obj).deep.equal(obj)
    expect(obj).include({a: 1})
    expect(obj).not.include({c: 2})
    expect(obj).have.property("a")
    expect(obj).have.property("a", 1)
    expect(obj).not.have.property("c")
    expect(obj).not.have.property("a", 2)
    expect(obj).not.empty
    expect(empty_obj).empty

})

it("Arrays", () => {
    const arr = [1, 2, 3]
    expect(arr).have.members([1,2,3])
    expect(arr).include.members([1, 2])
    expect(arr).not.empty
    expect([]).empty
})

it("Types", () => {
    const num = 1 
    const string =  "String"
    const obj = {}
    const arr = []

    expect(num).to.be.a("number")
    expect(string).to.be.a("string")
    expect(obj).to.be.a("object")
    expect(arr).to.be.a("array")
})

it("Strings", () => {
    const str = "String de teste"

    expect(str).equal("String de teste")
    expect(str).length(15)
    expect(str).contains("teste")
    expect(str).match(/de/)
    expect(str).match(/^String/)
    expect(str).match(/teste$/)
    expect(str).match(/.{15}/)
    expect(str).match(/\w+/) // Test if only have words
    expect(str).match(/\D+/) // Teste if do not have numbers
})

describe("Numbers", () => {
    it("Integers", () => {
        const num = 1
        expect(num).equal(1)
        expect(num).above(-1)
        expect(num).below(10)
    })
    it("Floats", () => {
        const float_num = 1.546
        expect(float_num).equal(1.546)
        expect(float_num).above(-1)
        expect(float_num).below(10)
        expect(float_num).closeTo(1.5, 0.1)
    })
})