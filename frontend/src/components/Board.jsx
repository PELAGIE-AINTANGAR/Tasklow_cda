// import { useState, useEffect } from "react";

// import List from "./List";

// import { getBoards } from "../services/boardService";

// import {
//   createTask,
//   updateTask,
//   deleteTask as deleteTaskService
// } from "../services/taskService";

// import "../styles/dashboard.css";

// export default function Board() {

// const [boards, setBoards] = useState([]);

// const [selectedBoard, setSelectedBoard] =
//   useState(null);
//   useEffect(() => {

//     loadBoard();

//   }, []);

//  const loadBoard = async () => {

//   try {

//     const data = await getBoards();

//     const formattedBoards = data.map(board => ({

//       ...board,

//       columns: board.columns.map(column => ({

//         ...column,

//         className: column.title
//           .toLowerCase()
//           .replace(/\s/g, "-")

//       }))

//     }));

//     setBoards(formattedBoards);

//     if (
//       formattedBoards.length > 0 &&
//       !selectedBoard
//     ) {

//       setSelectedBoard(
//         formattedBoards[0]
//       );

//     }

//   } catch (error) {

//     console.error(error);

//   }

// };
//   // Ajouter une tâche
//   const addTask = async () => {

//     if (
//         !selectedBoard ||
//         selectedBoard.columns.length === 0
//       ) {

//       alert("Aucune colonne disponible.");

//       return;

//     }

//     const title = prompt("Nom de la tâche");

//     if (!title) return;

//     try {

//       await createTask({

//         title,

//         description: "",

//         priority: "Medium",

//         status: selectedBoard.columns[0].title,

//         columnId: selectedBoard.columns[0].id

//       });

//       await loadBoard();

//     } catch (error) {

//       console.error(error);

//     }

//   };

//   // Modifier une tâche
//   const editTask = async (columnIndex, taskId) => {

//     const newTitle = prompt("Nouveau titre");

//     if (!newTitle) return;

//     const task =
//     selectedBoard.columns[columnIndex]
//     .tasks.find(
//       t => t.id === taskId
//     );

//     if (!task) return;

//     try {

//       await updateTask(taskId, {

//         title: newTitle,

//         description: task.description,

//         priority: task.priority,

//         dueDate: task.dueDate,

//         status: task.status,

//         columnId: selectedBoard.columns[columnIndex].id

//       });

//       await loadBoard();

//     } catch (error) {

//       console.error(error);

//     }

//   };

//   // Supprimer une tâche
//   const handleDeleteTask = async (
//     taskId
//   ) => {

//     if (
//       !window.confirm(
//         "Supprimer cette tâche ?"
//       )
//     ) {
//       return;
//     }

//     try {

//       await deleteTaskService(taskId);

//       await loadBoard();

//     } catch (error) {

//       console.error(error);

//     }

//   };

//   return (

//     <div>

//       <div className="board-header">

//         <h2>Kanban Board</h2>

//         <button
//           className="add-task-btn"
//           onClick={addTask}
//         >
//           + Add Task
//         </button>

//       </div>

//       {selectedBoard ? (

//   <>

//     <h2 className="board-title">

//       {selectedBoard.title}

//     </h2>

//     <p className="board-description">

//       {selectedBoard.description}

//     </p>

//     <div className="board">

//       {selectedBoard.columns.map(

//         (column, columnIndex) => (

//           <List

//             key={column.id}

//             title={column.title}

//             className={column.className}

//             tasks={column.tasks}

//             onEdit={(taskId) =>
//               editTask(
//                 columnIndex,
//                 taskId
//               )
//             }

//             onDelete={(taskId) =>
//               handleDeleteTask(taskId)
//             }

//           />

//         )

//       )}

//     </div>

//   </>

//   ) : (

//     <p>No board selected.</p>

//   )}

//     </div>

//   );

// }


// import List from "./List";

// import {
//   createTask,
//   updateTask,
//   deleteTask as deleteTaskService
// } from "../services/taskService";

// import "../styles/dashboard.css";

// export default function Board({

//   board,

//   refreshBoards

// }) {

//   if (!board) {

//     return (

//       <p className="empty-board">

//         Aucun board sélectionné.

//       </p>

//     );

//   }

//   // Ajouter une tâche
//   const addTask = async () => {

//     if (board.columns.length === 0) {

//       alert(
//         "Aucune colonne disponible."
//       );

//       return;

//     }

//     const title =
//       prompt("Nom de la tâche");

//     if (!title) return;

//     try {

//       await createTask({

//         title,

//         description: "",

//         priority: "Medium",

//         status: board.columns[0].title,

//         columnId: board.columns[0].id

//       });

//       await refreshBoards();

//     } catch (error) {

//       console.error(error);

//       alert(
//         "Impossible de créer la tâche."
//       );

//     }

//   };

//   // Modifier une tâche
//   const editTask = async (
//     columnIndex,
//     taskId
//   ) => {

//     const newTitle =
//       prompt("Nouveau titre");

//     if (!newTitle) return;

//     const task =
//       board.columns[columnIndex]
//       .tasks.find(
//         task => task.id === taskId
//       );

//     if (!task) return;

//     try {

//       await updateTask(taskId, {

//         title: newTitle,

//         description:
//           task.description,

//         priority:
//           task.priority,

//         dueDate:
//           task.dueDate,

//         status:
//           task.status,

//         columnId:
//           board.columns[columnIndex].id

//       });

//       await refreshBoards();

//     } catch (error) {

//       console.error(error);

//     }

//   };

//   // Supprimer
//   const handleDeleteTask = async (
//     taskId
//   ) => {

//     if (
//       !window.confirm(
//         "Supprimer cette tâche ?"
//       )
//     ) {
//       return;
//     }

//     try {

//       await deleteTaskService(taskId);

//       await refreshBoards();

//     } catch (error) {

//       console.error(error);

//     }

//   };

//   return (

//     <div>

//       <div className="board-header">

//         <button

//           className="add-task-btn"

//           onClick={addTask}

//         >

//           + Add Task

//         </button>

//       </div>

//       <div className="board">

//         {board.columns.map(

//           (
//             column,
//             columnIndex
//           ) => (

//             <List

//               key={column.id}

//               title={column.title}

//               className={
//                 column.title
//                   .toLowerCase()
//                   .replace(/\s/g, "-")
//               }

//               tasks={column.tasks}

//               onEdit={(taskId) =>
//                 editTask(
//                   columnIndex,
//                   taskId
//                 )
//               }

//               onDelete={(taskId) =>
//                 handleDeleteTask(taskId)
//               }

//             />

//           )

//         )}

//       </div>

//     </div>

//   );

// }



import { useState } from "react";

import Column from "./Column";
import TaskModal from "./TaskModal";
import StoryDetailsModal from "./StoryDetailsModal";
import {

  DndContext,

  closestCenter

} from "@dnd-kit/core";

import {

  arrayMove,

  SortableContext,

  verticalListSortingStrategy

} from "@dnd-kit/sortable";
import {
  createTask,
  updateTask,
  deleteTask as deleteTaskService
} from "../services/taskService";

import "../styles/dashboard.css";
export default function Board({

  boards,
  board,
  refreshBoards, 
  onOpenBoard

}) {

  const [isTaskModalOpen, setIsTaskModalOpen] =
    useState(false);

  const [selectedColumn, setSelectedColumn] =
    useState(null);

  const [editingTask, setEditingTask] =
    useState(null);
  
  const [selectedStory, setSelectedStory] = useState(null);

  const [isStoryOpen, setIsStoryOpen] = useState(false);

  if (!boards) {

    return (

      <p className="empty-board">

        No board selected.

      </p>

    );

  }
  const openAddTask = (column) => {

  setSelectedColumn(column);

  setEditingTask(null);

  setIsTaskModalOpen(true);

};
  const openEditTask = (

    column,

    task

  ) => {

    setSelectedColumn(column);

    setEditingTask(task);

    setIsTaskModalOpen(true);

  };
  const handleSaveTask = async (taskData) => {

    try {

      if (editingTask) {

        await updateTask(

          editingTask.id,

          {
            code: taskData.code,

            title: taskData.title,

            description: taskData.description,

            businessValue: taskData.businessValue,

            acceptanceCriteria: taskData.acceptanceCriteria,

            priority: taskData.priority,

            dueDate: taskData.dueDate,

            status: selectedColumn.title,

            columnId: selectedColumn.id

          }

        );

      } else {

        await createTask({
          code: taskData.code,

          title: taskData.title,

          description: taskData.description,

          priority: taskData.priority,

          businessValue: taskData.businessValue,

          acceptanceCriteria: taskData.acceptanceCriteria,

          dueDate: taskData.dueDate,

          status: selectedColumn.title,

          columnId: selectedColumn.id

        });

      }

      setIsTaskModalOpen(false);

      setEditingTask(null);

      setSelectedColumn(null);

      await refreshBoards();

    } catch (error) {

      console.error(error);

      alert("Impossible d'enregistrer la tâche.");

    }

  };

  const handleDeleteTask = async (taskId) => {

    if (

      !window.confirm(

        "Supprimer cette tâche ?"

      )

    ) {

      return;

    }

    try {

      await deleteTaskService(taskId);

      await refreshBoards();

    } catch (error) {

      console.error(error);

      alert("Impossible de supprimer la tâche.");

    }

  };
  const handleDragEnd = async (event) => {

  const { active, over } = event;

  if (!over) return;

  if (active.id === over.id) return;

  let sourceColumn = null;
  let destinationColumn = null;
  let movedTask = null;

  for (const column of boards.columns) {

    const task = column.tasks.find(
      task => task.id === active.id
    );

    if (task) {

      sourceColumn = column;
      movedTask = task;

    }

    if (
      column.tasks.some(
        task => task.id === over.id
      )
    ) {

      destinationColumn = column;

    }

  }

  // Si on dépose dans une colonne vide
  if (!destinationColumn) {

    destinationColumn = boards.columns.find(
      column => column.id === Number(over.id)
    );

  }

  if (
    !movedTask ||
    !destinationColumn
  ) {
    return;
  }

  try {

    await updateTask(movedTask.id, {

      title: movedTask.title,

      description: movedTask.description,

      priority: movedTask.priority,

      dueDate: movedTask.dueDate,

      status: destinationColumn.title,

      columnId: destinationColumn.id

    });

    await refreshBoards();

  } catch (error) {

    console.error(error);

  }

  };
  return (
    <div className="boards-grid">

      {boards.map(board => (

          <div

              key={board.id}

              className="board-card"

              onClick={() => onOpenBoard(board)}

          >

              <h3>{board.title}</h3>

              <p>{board.description}</p>
          
              <p>👤Created by : {board.user.username}</p>

              <span>

                  📅 {

                      new Date(board.createdAt)
                          .toLocaleDateString("fr-FR")

                  }

              </span>
              

          </div>

      ))}
      <StoryDetailsModal

        isOpen={isStoryOpen}

        task={selectedStory}

        onClose={() => {

            setIsStoryOpen(false);

            setSelectedStory(null);

        }}

      />

  </div>
  );
}