const prisma = require("../src/config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authService = require("../src/services/authService");

jest.mock("../src/config/prisma", () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn()
  }
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
  compare: jest.fn()
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn()
}));

describe("Auth Service", () => {

  beforeEach(() => {
    jest.clearAllMocks();

    process.env.JWT_SECRET = "test-secret";
  });

  describe("register", () => {

    test("doit créer un utilisateur lorsque l'email est disponible", async () => {

      const userData = {
        username: "pelagie",
        email: "pelagie@test.com",
        password: "Test1234!"
      };

      prisma.user.findUnique.mockResolvedValue(null);

      bcrypt.hash.mockResolvedValue("hashed-password");

      prisma.user.create.mockResolvedValue({
        id: 1,
        username: "pelagie",
        email: "pelagie@test.com",
        password: "hashed-password",
        createdAt: new Date("2026-07-10")
      });

      const result = await authService.register(userData);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: userData.email
        }
      });

      expect(bcrypt.hash).toHaveBeenCalledWith(
        userData.password,
        10
      );

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          username: userData.username,
          email: userData.email,
          password: "hashed-password"
        }
      });

      expect(result.email).toBe(userData.email);

    });


    test("doit refuser une inscription si l'email existe déjà", async () => {

      const userData = {
        username: "pelagie",
        email: "pelagie@test.com",
        password: "Test1234!"
      };

      prisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: "pelagie@test.com"
      });

      await expect(
        authService.register(userData)
      ).rejects.toThrow(
        "Email already exists"
      );

      expect(prisma.user.create).not.toHaveBeenCalled();

    });


    test("doit hacher le mot de passe avant la création de l'utilisateur", async () => {

      const userData = {
        username: "test-user",
        email: "hash@test.com",
        password: "Password123!"
      };

      prisma.user.findUnique.mockResolvedValue(null);

      bcrypt.hash.mockResolvedValue("bcrypt-hash");

      prisma.user.create.mockResolvedValue({
        id: 2,
        username: userData.username,
        email: userData.email,
        password: "bcrypt-hash"
      });

      await authService.register(userData);

      expect(bcrypt.hash).toHaveBeenCalledWith(
        "Password123!",
        10
      );

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          username: "test-user",
          email: "hash@test.com",
          password: "bcrypt-hash"
        }
      });

    });

  });


  describe("login", () => {
    test(
    "doit refuser la connexion si l'utilisateur n'existe pas",
    async () => {

        prisma.user.findUnique.mockResolvedValue(null);

        await expect(
        authService.login(
            "unknown@test.com",
            "Test1234!"
        )
        ).rejects.toThrow(
        "Invalid email or password"
        );

        expect(
        bcrypt.compare
        ).not.toHaveBeenCalled();

    }
    );


    test(
    "doit refuser la connexion si le mot de passe est incorrect",
    async () => {

        prisma.user.findUnique.mockResolvedValue({
        id: 1,
        username: "pelagie",
        email: "pelagie@test.com",
        password: "stored-hash"
        });

        bcrypt.compare.mockResolvedValue(false);

        await expect(
        authService.login(
            "pelagie@test.com",
            "WrongPassword!"
        )
        ).rejects.toThrow(
        "Invalid email or password"
        );

        expect(
        jwt.sign
        ).not.toHaveBeenCalled();

    }
    );


    test("doit générer un JWT lorsque la connexion est valide", async () => {

      const user = {
        id: 1,
        username: "pelagie",
        email: "pelagie@test.com",
        password: "stored-hash"
      };

      prisma.user.findUnique.mockResolvedValue(user);

      bcrypt.compare.mockResolvedValue(true);

      jwt.sign.mockReturnValue("fake-jwt-token");

      const result = await authService.login(
        "pelagie@test.com",
        "Test1234!"
      );

      expect(bcrypt.compare).toHaveBeenCalledWith(
        "Test1234!",
        "stored-hash"
      );

      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: user.id,
          email: user.email
        },
        "test-secret",
        {
          expiresIn: "1d"
        }
      );

      expect(result).toEqual({
        token: "fake-jwt-token",
        user: {
          id: 1,
          username: "pelagie",
          email: "pelagie@test.com"
        }
      });

    });

  });

});