const prisma = require("../config/prisma");


const getAnalyticsByUser = async (userId) => {

  const boards = await prisma.board.findMany({

    where: {
      userId: userId
    },

    include: {

      columns: {

        include: {
          tasks: true
        }

      }

    }

  });


  let totalTasks = 0;

  let completedTasks = 0;

  const tasksByStatus = {};

  const tasksByProject = [];

  const projectProgress = [];


  boards.forEach((board) => {

    let boardTasks = 0;

    let boardCompletedTasks = 0;


    board.columns.forEach((column) => {

      const taskCount = column.tasks.length;


      totalTasks += taskCount;

      boardTasks += taskCount;


      if (!tasksByStatus[column.title]) {

        tasksByStatus[column.title] = 0;

      }


      tasksByStatus[column.title] += taskCount;


      if (
        column.title
          .trim()
          .toLowerCase() === "done"
      ) {

        completedTasks += taskCount;

        boardCompletedTasks += taskCount;

      }

    });


    tasksByProject.push({

      name: board.title,

      tasks: boardTasks

    });


    const progress = boardTasks > 0

      ? Math.round(
          (
            boardCompletedTasks /
            boardTasks
          ) * 100
        )

      : 0;


    projectProgress.push({

      name: board.title,

      progress: progress

    });

  });


  const completionRate = totalTasks > 0

    ? Math.round(
        (
          completedTasks /
          totalTasks
        ) * 100
      )

    : 0;


  const statusData = Object.entries(
    tasksByStatus
  ).map(([name, value]) => ({

    name,

    value

  }));


  return {

    totalTasks,

    completedTasks,

    completionRate,

    totalProjects: boards.length,

    tasksByStatus: statusData,

    tasksByProject,

    projectProgress

  };

};


module.exports = {

  getAnalyticsByUser

};