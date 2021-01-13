describe("Turn based game", () => {
    before(() => {
        cy.visit("https://tsdavies.github.io/TicTacToe/")
    })
    it("Places an X in the top left square", () => {
        cy.get("[data-testid=table-row1-cell1]").click()
        cy.contains("[data-testid=table-row1-cell8]", "X")
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
    it("Can play a game", () => {
        cy.get("[data-testid=table-row1-cell3]").click()
        cy.get("[data-testid=table-row2-cell1]").click()
        cy.get("[data-testid=table-row2-cell2]").click()
        cy.get("[data-testid=table-row2-cell3]").click()
        cy.get("[data-testid=table-row3-cell1]").click()
        cy.contains("[data-testid=message]", "X wins!")
    })
})
