const prisma = require("../src/config/prisma");
const boardService = require("../src/services/boardService");
describe("boardService", () => {
  beforeAll(async () => {
    await prisma.board.deleteMany();
  });
  describe("createBoard", () => {
    it("should create a new board", async () => {
      const board = await boardService.createBoard(
        {title: "Test Board",
        description: "Test Board Description"},
        user.id
      );
      expect(board).toHaveProperty("id");
      expect(board.title).toBe("Test Board");
      expect(board.description).toBe("Test Board Description");
    });
  });

  describe("getBoardById", () => {
    it("should return a board by id", async () => {
      const board = await boardService.createBoard({
        title: "Test Board",
        description: "Test Board Description"
      });
      const foundBoard = await boardService.getBoardById(board.id);
      expect(foundBoard).toHaveProperty("id");
      expect(foundBoard.title).toBe("Test Board");
      expect(foundBoard.description).toBe("Test Board Description");
    });
  });

  describe("updateBoard", () => {
    it("should update a board", async () => {
      const board = await boardService.createBoard({
        title: "Test Board",
        description: "Test Board Description"
      });
        const updatedBoard = await boardService.updateBoard(board.id, {
            title: "Updated Test Board",
            description: "Updated Test Board Description"
        });
        expect(updatedBoard.title).toBe("Updated Test Board");
        expect(updatedBoard.description).toBe("Updated Test Board Description");
    });
  });

  describe("deleteBoard", () => {
    it("should delete a board", async () => {
      const board = await boardService.createBoard({
        title: "Test Board",
        description: "Test Board Description"
      });
      await boardService.deleteBoard(board.id);
      const foundBoard = await boardService.getBoardById(board.id);
      expect(foundBoard).toBeNull();
    });
  });


});
