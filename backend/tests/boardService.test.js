const prisma = require("../src/config/prisma");
const boardService = require("../src/services/boardService");

describe("boardService", () => {

  let user;

  beforeAll(async () => {

    // Nettoyer les données de test existantes
    await prisma.board.deleteMany();
    await prisma.user.deleteMany();

    // Créer un utilisateur de test
    user = await prisma.user.create({
      data: {
        username: "testuser",
        email: "testuser@example.com",
        password: "password123"
      }
    });

  });

  afterAll(async () => {

    // Nettoyer les données créées pendant les tests
    await prisma.board.deleteMany();
    await prisma.user.deleteMany();

    await prisma.$disconnect();

  });

  describe("createBoard", () => {

    it("should create a new board", async () => {

      const board = await boardService.createBoard(
        {
          title: "Test Board",
          description: "Test Board Description"
        },
        user.id
      );

      expect(board).toHaveProperty("id");
      expect(board.title).toBe("Test Board");
      expect(board.description).toBe("Test Board Description");

      // Vérifier les 4 colonnes créées automatiquement
      expect(board.columns).toHaveLength(4);

      expect(board.columns[0].title).toBe("To Do");
      expect(board.columns[1].title).toBe("In Progress");
      expect(board.columns[2].title).toBe("On Approval");
      expect(board.columns[3].title).toBe("Done");

    });

  });

  describe("getBoards", () => {

    it("should return boards belonging to a user", async () => {

      // Créer un board pour notre utilisateur
      const board = await boardService.createBoard(
        {
          title: "Test Board",
          description: "Test Board Description"
        },
        user.id
      );

      // Récupérer les boards de cet utilisateur
      const boards = await boardService.getBoards(user.id);

      // Vérifier que le résultat est bien un tableau
      expect(Array.isArray(boards)).toBe(true);

      // Vérifier qu'au moins un board est présent
      expect(boards.length).toBeGreaterThan(0);

      // Vérifier le board créé
      const foundBoard = boards.find(
        (item) => item.id === board.id
      );

      expect(foundBoard).toBeDefined();
      expect(foundBoard.title).toBe("Test Board");
      expect(foundBoard.description).toBe("Test Board Description");

      // Vérifier que l'utilisateur est bien présent
      expect(foundBoard.user).toHaveProperty("id");
      expect(foundBoard.user.id).toBe(user.id);

    });

  });

  describe("updateBoard", () => {

    it("should update a board", async () => {

      const board = await boardService.createBoard(
        {
          title: "Test Board",
          description: "Test Board Description"
        },
        user.id
      );

      const updatedBoard = await boardService.updateBoard(
        board.id,
        {
          title: "Updated Test Board",
          description: "Updated Test Board Description"
        }
      );

      expect(updatedBoard.title).toBe("Updated Test Board");
      expect(updatedBoard.description).toBe(
        "Updated Test Board Description"
      );

    });

  });

  describe("deleteBoard", () => {

    it("should delete a board", async () => {

      const board = await boardService.createBoard(
        {
          title: "Test Board",
          description: "Test Board Description"
        },
        user.id
      );

      await boardService.deleteBoard(board.id);

      // Vérifier directement dans Prisma que le board n'existe plus
      const foundBoard = await prisma.board.findUnique({
        where: {
          id: board.id
        }
      });

      expect(foundBoard).toBeNull();

    });

  });

});