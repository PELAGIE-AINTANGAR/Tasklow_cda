const prisma = require("../src/config/prisma");
const taskService = require("../src/services/taskService");

jest.mock("../src/config/prisma", () => ({

    task: {

        findMany: jest.fn(),

        findUnique: jest.fn(),

        create: jest.fn(),

        update: jest.fn(),

        delete: jest.fn()

    },

    doR: {

        update: jest.fn(),

        findUnique: jest.fn()

    },

    doD: {

        findUnique: jest.fn()

    }

}));

describe("Task Service", () => {

    beforeEach(() => {

        jest.clearAllMocks();

    });

    /*
    =====================================================
    GET TASKS
    =====================================================
    */

    describe("getTasks", () => {

        test("doit récupérer toutes les User Stories", async () => {

            const tasks = [

                {

                    id: 1,

                    title: "Créer le dashboard",

                    status: "TODO",

                    position: 0,

                    column: {

                        id: 1,

                        title: "To Do"

                    },

                    dor: {

                        storyDefined: true,

                        descriptionDefined: true,

                        acceptanceCriteriaDefined: true,

                        priorityDefined: true,

                        estimated: false

                    },

                    dod: {

                        developmentCompleted: false,

                        acceptanceValidated: false,

                        testsPassed: false,

                        codeReviewed: false,

                        documentationUpdated: false

                    }

                }

            ];

            prisma.task.findMany.mockResolvedValue(tasks);

            const result = await taskService.getTasks();

            expect(prisma.task.findMany).toHaveBeenCalledWith({

                include: {

                    dor: true,

                    dod: true,

                    column: true

                },

                orderBy: {

                    position: "asc"

                }

            });

            expect(result[0]).toHaveProperty("dorProgress");

            expect(result[0]).toHaveProperty("dodProgress");

        });

    });

    /*
    =====================================================
    CREATE TASK
    =====================================================
    */

    describe("createTask", () => {

        test("doit créer une User Story complète", async () => {

            const taskData = {

                code: "US-001",

                title: "Créer le dashboard",

                description: "Dashboard React",

                businessValue: "Visualiser les indicateurs",

                acceptanceCriteria: "Toutes les cartes sont visibles",

                priority: "HIGH",

                dueDate: "2026-07-20",

                status: "TODO",

                position: 0,

                columnId: 1

            };

            const createdTask = {

                id: 1,

                ...taskData,

                dueDate: new Date(taskData.dueDate)

            };

            prisma.task.create.mockResolvedValue(createdTask);

            const result = await taskService.createTask(taskData);

            expect(prisma.task.create).toHaveBeenCalledWith({

                data: {

                    code: "US-001",

                    title: "Créer le dashboard",

                    description: "Dashboard React",

                    businessValue: "Visualiser les indicateurs",

                    acceptanceCriteria: "Toutes les cartes sont visibles",

                    priority: "HIGH",

                    dueDate: new Date("2026-07-20"),

                    status: "TODO",

                    position: 0,

                    column: {

                        connect: {

                            id: 1

                        }

                    },

                    dor: {

                        create: {

                            storyDefined: true,

                            descriptionDefined: true,

                            acceptanceCriteriaDefined: true,

                            priorityDefined: true,

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

            expect(result).toEqual(createdTask);

        });

        test("doit créer une User Story minimale", async () => {

            const taskData = {

                title: "Nouvelle Story",

                priority: "LOW",

                columnId: 2

            };

            prisma.task.create.mockResolvedValue({

                id: 2,

                title: "Nouvelle Story"

            });

            await taskService.createTask(taskData);

            expect(prisma.task.create).toHaveBeenCalled();

        });

    });
        /*
    =====================================================
    UPDATE TASK
    =====================================================
    */

    describe("updateTask", () => {

        beforeEach(() => {

            prisma.doR.update.mockResolvedValue({});

            prisma.doR.findUnique.mockResolvedValue({

                taskId: 5,

                storyDefined: true,

                descriptionDefined: true,

                acceptanceCriteriaDefined: true,

                priorityDefined: true,

                estimated: true

            });

            prisma.doD.findUnique.mockResolvedValue({

                taskId: 5,

                developmentCompleted: true,

                acceptanceValidated: true,

                testsPassed: true,

                codeReviewed: true,

                documentationUpdated: true

            });

        });

        test("doit modifier une User Story", async () => {

            prisma.task.findUnique.mockResolvedValue({

                id: 5,

                code: "US-001",

                title: "Ancien titre",

                description: "Ancienne description",

                businessValue: "Valeur",

                acceptanceCriteria: "Critères",

                priority: "LOW",

                dueDate: null,

                status: "TODO",

                position: 0,

                columnId: 1

            });

            const taskData = {

                title: "Titre modifié",

                description: "Nouvelle description",

                businessValue: "Nouvelle valeur",

                acceptanceCriteria: "Nouveaux critères",

                priority: "HIGH",

                dueDate: "2026-07-20",

                status: "IN_PROGRESS",

                position: 1,

                columnId: 2

            };

            prisma.task.update.mockResolvedValue({

                id: 5,

                ...taskData,

                dueDate: new Date(taskData.dueDate)

            });

            const result = await taskService.updateTask(

                5,

                taskData

            );

            expect(prisma.task.findUnique).toHaveBeenCalledWith({

                where: {

                    id: 5

                },

                include: {

                    dor: true,

                    dod: true,

                    column: true

                }

            });

            expect(prisma.doR.update).toHaveBeenCalled();

            expect(prisma.task.update).toHaveBeenCalled();

            expect(result.id).toBe(5);

        });

        test("doit convertir l'identifiant en nombre", async () => {

            prisma.task.findUnique.mockResolvedValue({

                id: 8,

                title: "Story"

            });

            prisma.task.update.mockResolvedValue({

                id: 8

            });

            await taskService.updateTask(

                "8",

                {}

            );

            expect(prisma.task.findUnique).toHaveBeenCalledWith({

                where: {

                    id: 8

                },

                include: {

                    dor: true,

                    dod: true,

                    column: true

                }

            });

        });

        test("doit lever une erreur si la User Story n'existe pas", async () => {

            prisma.task.findUnique.mockResolvedValue(null);

            await expect(

                taskService.updateTask(

                    999,

                    {}

                )

            ).rejects.toThrow(

                "User Story not found."

            );

        });

        test("doit empêcher le passage à In Progress si la DoR est incomplète", async () => {

            prisma.task.findUnique.mockResolvedValue({

                id: 5,

                title: "Story"

            });

            prisma.doR.findUnique.mockResolvedValue({

                storyDefined: true,

                descriptionDefined: false,

                acceptanceCriteriaDefined: false,

                priorityDefined: true,

                estimated: false

            });

            await expect(

                taskService.updateTask(

                    5,

                    {

                        status: "In Progress"

                    }

                )

            ).rejects.toThrow(

                "The User Story must satisfy the Definition of Ready before starting."

            );

        });

        test("doit empêcher le passage à Done si la DoD est incomplète", async () => {

            prisma.task.findUnique.mockResolvedValue({

                id: 5,

                title: "Story"

            });

            prisma.doD.findUnique.mockResolvedValue({

                developmentCompleted: true,

                acceptanceValidated: false,

                testsPassed: true,

                codeReviewed: false,

                documentationUpdated: false

            });

            await expect(

                taskService.updateTask(

                    5,

                    {

                        status: "Done"

                    }

                )

            ).rejects.toThrow(

                "The User Story must satisfy the Definition of Done before completion."

            );

        });

    });
        /*
    =====================================================
    DELETE TASK
    =====================================================
    */

    describe("deleteTask", () => {

        test("doit supprimer une User Story", async () => {

            prisma.task.delete.mockResolvedValue({

                id: 10,

                title: "Story supprimée"

            });

            const result = await taskService.deleteTask("10");

            expect(prisma.task.delete).toHaveBeenCalledWith({

                where: {

                    id: 10

                }

            });

            expect(result).toEqual({

                id: 10,

                title: "Story supprimée"

            });

        });

    });


    /*
    =====================================================
    CALCULATE DOR
    =====================================================
    */

    describe("calculateDoR", () => {

        test("doit retourner 100% lorsque tous les critères sont validés", () => {

            const result = taskService.calculateDoR({

                storyDefined: true,

                descriptionDefined: true,

                acceptanceCriteriaDefined: true,

                priorityDefined: true,

                estimated: true

            });

            expect(result).toEqual({

                completed: 5,

                total: 5,

                percentage: 100,

                isReady: true

            });

        });

        test("doit retourner un pourcentage partiel", () => {

            const result = taskService.calculateDoR({

                storyDefined: true,

                descriptionDefined: true,

                acceptanceCriteriaDefined: false,

                priorityDefined: false,

                estimated: false

            });

            expect(result.completed).toBe(2);

            expect(result.total).toBe(5);

            expect(result.percentage).toBe(40);

            expect(result.isReady).toBe(false);

        });

    });


    /*
    =====================================================
    CALCULATE DOD
    =====================================================
    */

    describe("calculateDoD", () => {

        test("doit retourner 100% lorsque tous les critères sont validés", () => {

            const result = taskService.calculateDoD({

                developmentCompleted: true,

                acceptanceValidated: true,

                testsPassed: true,

                codeReviewed: true,

                documentationUpdated: true

            });

            expect(result).toEqual({

                completed: 5,

                total: 5,

                percentage: 100,

                isDone: true

            });

        });

        test("doit retourner un pourcentage partiel", () => {

            const result = taskService.calculateDoD({

                developmentCompleted: true,

                acceptanceValidated: false,

                testsPassed: true,

                codeReviewed: false,

                documentationUpdated: false

            });

            expect(result.completed).toBe(2);

            expect(result.total).toBe(5);

            expect(result.percentage).toBe(40);

            expect(result.isDone).toBe(false);

        });

    });
  });