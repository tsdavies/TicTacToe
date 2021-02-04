describe("Turn based game", () => {
    before(() => {
        cy.visit("https://tsdavies.github.io/TicTacToe/")
    })
    it("Places an X in the top left square", () => {
        cy.get("[data-testid=table-row1-cell1]").click()
        cy.contains("[data-testid=table-row1-cell1]", "X")
        cy.contains("[data-testid=message]", "Next turn is 0")
    })
    it("Can't place a piece in a space that is occupied", () => {
        cy.get("[data-testid=table-row1-cell1]").click()
        cy.contains("[data-testid=table-row1-cell1]", "X")
    })
    it("Can place a 0 on the next turn", () => {
        cy.get("[data-testid=table-row1-cell2]").click()
        cy.contains("[data-testid=table-row1-cell2]", "0")
    })
})
describe("Game scenarios", () => {
    beforeEach(() => {
        cy.visit("https://tsdavies.github.io/TicTacToe/")
    })
    it("Can play a game where x wins", () => {
        cy.get("[data-testid=table-row1-cell3]").click()
        cy.get("[data-testid=table-row2-cell1]").click()
        cy.get("[data-testid=table-row2-cell2]").click()
        cy.get("[data-testid=table-row2-cell3]").click()
        cy.get("[data-testid=table-row3-cell1]").click()
        cy.contains("[data-testid=message]", "X wins!")
    })
    it("Can play a game where 0 wins", () => {
        cy.get("[data-testid=table-row1-cell1]").click()
        cy.get("[data-testid=table-row1-cell2]").click()
        cy.get("[data-testid=table-row1-cell3]").click()
        cy.get("[data-testid=table-row2-cell2]").click()
        cy.get("[data-testid=table-row2-cell3]").click()
        cy.get("[data-testid=table-row3-cell2]").click()
        cy.contains("[data-testid=message]", "0 wins!")
    })
    it("Can play a game where it results in a tie", () => {
        cy.get("[data-testid=table-row1-cell1]").click()
        cy.get("[data-testid=table-row1-cell2]").click()
        cy.get("[data-testid=table-row1-cell3]").click()
        cy.get("[data-testid=table-row2-cell3]").click()
        cy.get("[data-testid=table-row2-cell1]").click()
        cy.get("[data-testid=table-row2-cell2]").click()
        cy.get("[data-testid=table-row3-cell2]").click()
        cy.get("[data-testid=table-row3-cell1]").click()
        cy.get("[data-testid=table-row3-cell3]").click()
        cy.contains("[data-testid=message]", "It's a tie!")
    })
})
