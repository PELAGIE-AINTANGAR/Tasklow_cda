const prisma = require("../config/prisma");
const getColumns = async (boardId) => {

  return prisma.column.findMany({

    where: {

      boardId: Number(boardId)

    },

    include: {

      tasks: true

    }

  });

};
const createColumn = async (data) => {
  return prisma.column.create({
    data: {
      title: data.title,
      position: data.position,
      boardId: data.boardId
    }
  });
};

const updateColumn = async (id, data) => {
  return prisma.column.update({
    where: {
      id: Number(id)
    },
    data
  });
};

const deleteColumn = async (id) => {
  return prisma.column.delete({
    where: {
      id: Number(id)
    }
  });
};

module.exports = {
  getColumns,
  createColumn,
  updateColumn,
  deleteColumn,
};