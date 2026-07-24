const prisma = require("../config/prisma");

/**
 * ===========================
 * Definition of Ready
 * ===========================
 */
const calculateDoR = (dor) => {

    const criteria = [
        dor.storyDefined,
        dor.descriptionDefined,
        dor.acceptanceCriteriaDefined,
        dor.priorityDefined,
        dor.estimated
    ];

    const completed = criteria.filter(Boolean).length;

    return {
        completed,
        total: criteria.length,
        percentage: Math.round((completed / criteria.length) * 100),
        isReady: completed === criteria.length
    };

};

/**
 * ===========================
 * Definition of Done
 * ===========================
 */
const calculateDoD = (dod) => {

    const criteria = [
        dod.developmentCompleted,
        dod.acceptanceValidated,
        dod.testsPassed,
        dod.codeReviewed,
        dod.documentationUpdated
    ];

    const completed = criteria.filter(Boolean).length;

    return {
        completed,
        total: criteria.length,
        percentage: Math.round((completed / criteria.length) * 100),
        isDone: completed === criteria.length
    };

};

/**
 * ===========================
 * GET ALL USER STORIES
 * ===========================
 */
const getTasks = async () => {

    const tasks = await prisma.task.findMany({

        include: {
            dor: true,
            dod: true,
            column: true
        },

        orderBy: {
            position: "asc"
        }

    });

    return tasks.map(task => ({

        ...task,

        dorProgress: task.dor
            ? calculateDoR(task.dor)
            : null,

        dodProgress: task.dod
            ? calculateDoD(task.dod)
            : null

    }));

};

/**
 * ===========================
 * CREATE USER STORY
 * ===========================
 */
const createTask = async (data) => {

    return prisma.task.create({

        data: {

            code: data.code || null,

            title: data.title,

            description: data.description || null,

            businessValue: data.businessValue || null,

            acceptanceCriteria: data.acceptanceCriteria || null,

            priority: data.priority || "Medium",

            dueDate: data.dueDate
                ? new Date(data.dueDate)
                : null,

            status: data.status || "To Do",

            position: data.position || 0,

            column: {
                connect: {
                    id: Number(data.columnId)
                }
            },

            dor: {

                create: {

                    storyDefined: !!data.title,

                    descriptionDefined: !!data.description,

                    acceptanceCriteriaDefined:
                        !!data.acceptanceCriteria,

                    priorityDefined:
                        !!data.priority,

                    estimated: false

                }

            },

            dod: {

                create: {

                    developmentCompleted: false,

                    acceptanceValidated: false,

                    testsPassed: false,

                    codeReviewed: false,

                    documentationUpdated: false

                }

            }

        },

        include: {

            dor: true,

            dod: true,

            column: true

        }

    });

};
/**
 * ===========================
 * UPDATE USER STORY
 * ===========================
 */
const updateTask = async (id, data) => {

    id = Number(id);

    const task = await prisma.task.findUnique({

        where: { id },

        include: {
            dor: true,
            dod: true,
            column: true
        }

    });

    if (!task) {
        throw new Error("User Story not found.");
    }

    /*
    ==================================
    Mise à jour automatique de la DoR
    ==================================
    */

    await prisma.doR.update({

        where: {
            taskId: id
        },

        data: {

            storyDefined:
                !!(data.title ?? task.title),

            descriptionDefined:
                !!(data.description ?? task.description),

            acceptanceCriteriaDefined:
                !!(
                    data.acceptanceCriteria ??
                    task.acceptanceCriteria
                ),

            priorityDefined:
                !!(data.priority ?? task.priority)

        }

    });

    const dor = await prisma.doR.findUnique({

        where: {
            taskId: id
        }

    });

    /*
    ==================================
    Contrôle Definition of Ready
    ==================================
    */

    if (data.status === "In Progress") {

        const result = calculateDoR(dor);

        if (!result.isReady) {

            throw new Error(
                "The User Story must satisfy the Definition of Ready before starting."
            );

        }

    }

    /*
    ==================================
    Contrôle Definition of Done
    ==================================
    */

    const dod = await prisma.doD.findUnique({

        where: {
            taskId: id
        }

    });

    if (data.status === "Done") {

        const result = calculateDoD(dod);

        if (!result.isDone) {

            throw new Error(
                "The User Story must satisfy the Definition of Done before completion."
            );

        }

    }

    /*
    ==================================
    Mise à jour de la User Story
    ==================================
    */

    const updatedTask = await prisma.task.update({

        where: {
            id
        },

        data: {

            code:
                data.code ??
                task.code,

            title:
                data.title ??
                task.title,

            description:
                data.description ??
                task.description,

            businessValue:
                data.businessValue ??
                task.businessValue,

            acceptanceCriteria:
                data.acceptanceCriteria ??
                task.acceptanceCriteria,

            priority:
                data.priority ??
                task.priority,

            dueDate:
                data.dueDate
                    ? new Date(data.dueDate)
                    : task.dueDate,

            status:
                data.status ??
                task.status,

            position:
                data.position ??
                task.position,

            columnId:
                data.columnId ??
                task.columnId

        },

        include: {

            dor: true,

            dod: true,

            column: true

        }

    });

    return updatedTask;

};


/**
 * ===========================
 * DELETE USER STORY
 * ===========================
 */
const deleteTask = async (id) => {

    id = Number(id);

    return prisma.task.delete({

        where: {
            id
        }

    });

};


/**
 * ===========================
 * EXPORTS
 * ===========================
 */

module.exports = {

    getTasks,

    createTask,

    updateTask,

    deleteTask,

    calculateDoR,

    calculateDoD

};