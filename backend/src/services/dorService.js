const prisma = require("../config/prisma");
const { updateBoardCompletion } = require("./boardService");

const updateDoR = async (id, data) => {

    const dor = await prisma.doR.update({

        where: {

            taskId: Number(id)

        },

        data

    });

    const task = await prisma.task.findUnique({

        where: {

            id: Number(id)

        },

        include: {

            column: true

        }

    });

    await updateBoardCompletion(task.column.boardId);

    return dor;

};

module.exports = {

    updateDoR

};