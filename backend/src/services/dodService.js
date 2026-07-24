// const prisma = require("../config/prisma");

// const updateDoD = async(id,data)=>{

//     return prisma.doD.update({

//         where:{
//             taskId:Number(id)
//         },

//         data
//     });

// };

// module.exports={
//     updateDoD
// }

const prisma = require("../config/prisma");
const { updateBoardCompletion } = require("./boardService");

const updateDoD = async (id, data) => {

    const dod = await prisma.doD.update({

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

    return dod;

};

module.exports = {

    updateDoD

};