const prisma = require("../config/prisma");

const getBoards = async (userId) => {

  return prisma.board.findMany({

    where: {
      userId
    },

    include: {
      user: {

        select: {

          id: true,

          username: true,

          email: true

        }

      },

      columns: {

        orderBy: {
          position: "asc"
        },

        include: {

          tasks: {

            include: {

                dor: true,

                dod: true

            },

            orderBy: {

                position: "asc"

            }

          }

        }

      }

    }

  });

};

const createBoard = async (data, userId) => {

  return prisma.board.create({

    data: {

      title: data.title,

      description: data.description,

      startDate: data.startDate
        ? new Date(data.startDate)
        : null,

      endDate: data.endDate
        ? new Date(data.endDate)
        : null,

      userId,

      columns: {

        create: [

          {
            title: "To Do",
            position: 1
          },

          {
            title: "In Progress",
            position: 2
          },

          {
            title: "On Approval",
            position: 3
          },

          {
            title: "Done",
            position: 4
          }

        ]

      }

    },

    include: {

      columns: {

        include: {

          tasks: {

            include: {

                dor: true,

                dod: true

            },

            orderBy: {

                position: "asc"

            }

          }

        },

        orderBy: {

          position: "asc"

        }

      }

    }

  });

};
const updateBoard = async (id, data) => {
  return prisma.board.update({
    where: {
      id: Number(id)
    },
    data: {
      title: data.title,
      description: data.description,

      startDate: data.startDate
        ? new Date(data.startDate)
        : null,

      endDate: data.endDate
        ? new Date(data.endDate)
        : null
    }
  });
};

const deleteBoard = async (id) => {
  return prisma.board.delete({
    where: {
      id: Number(id)
    }
  });
};

const updateBoardCompletion = async (boardId) => {

    const board = await prisma.board.findUnique({

        where: {

            id: Number(boardId)

        },

        include: {

            columns: {

                include: {

                    tasks: {

                        include: {

                            dod: true

                        }

                    }

                }

            }

        }

    });

    if (!board) {

      throw new Error("Board not found");

    };

    const tasks = board.columns.flatMap(column => column.tasks);

    if (tasks.length === 0) {

        await prisma.board.update({

            where: {

                id: board.id

            },

            data: {

                completionRate: 0,

                isCompleted: false

            }

        });

        return;

    }

    const completedTasks = tasks.filter(task => {

        if (task.status !== "Done") {

            return false;

        }

        if (!task.dod) {

            return false;

        }

        return (

            task.dod.developmentCompleted &&

            task.dod.acceptanceValidated &&

            task.dod.testsPassed &&

            task.dod.codeReviewed &&

            task.dod.documentationUpdated

        );

    });

    const completionRate = Math.round(

        (completedTasks.length / tasks.length) * 100

    );

    await prisma.board.update({

        where: {

            id: board.id

        },

        data: {

            completionRate,

            isCompleted: completionRate === 100

        }

    });

};

module.exports = {
  getBoards,
  createBoard,
  updateBoard,
  updateBoardCompletion,
  deleteBoard
};