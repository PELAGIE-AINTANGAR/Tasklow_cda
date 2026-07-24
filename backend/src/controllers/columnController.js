const columnService = require("../services/columnService");
const getColumns = async (req, res, next) => {

  try {

    const columns =
      await columnService.getColumns(
        req.params.boardId
      );

    res.status(200).json(columns);

  } catch (error) {

    next(error);

  }

};
const createColumn = async (req, res, next) => {
  try {
    const column = await columnService.createColumn(req.body);

    res.status(201).json(column);

  } catch (error) {
    next(error);
  }
};

const updateColumn = async (req, res, next) => {
  try {
    const column = await columnService.updateColumn(
      req.params.id,
      req.body
    );

    res.status(200).json(column);

  } catch (error) {
    next(error);
  }
};

const deleteColumn = async (req, res, next) => {
  try {
    await columnService.deleteColumn(req.params.id);

    res.status(200).json({
      message: "Column deleted"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getColumns,
  createColumn,
  updateColumn,
  deleteColumn
};