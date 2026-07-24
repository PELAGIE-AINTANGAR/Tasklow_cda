const boardService = require("../services/boardService");

const getBoards = async (req, res, next) => {
  try {
    const boards = await boardService.getBoards(req.user.id);

    res.status(200).json(boards);

  } catch (error) {
    console.error("GET BOARDS ERROR");
    console.error(error);

    res.status(500).json({
        message: error.message,
        stack: error.stack
    });
  }
};

const createBoard = async (req, res, next) => {
  try {
    const board = await boardService.createBoard(
      req.body,
      req.user.id
    );

    res.status(201).json(board);

  } catch (error) {
     console.error("CREATE BOARD ERROR");
    console.error(error);

    res.status(500).json({
        message: error.message,
        stack: error.stack
    });
  }
};

const updateBoard = async (req, res, next) => {
  try {
    const board = await boardService.updateBoard(
      req.params.id,
      req.body
    );

    res.status(200).json(board);

  } catch (error) {
    next(error);
  }
};

const deleteBoard = async (req, res, next) => {
  try {
    await boardService.deleteBoard(req.params.id);

    res.status(200).json({
      message: "Board deleted"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBoards,
  createBoard,
  updateBoard,
  deleteBoard
};