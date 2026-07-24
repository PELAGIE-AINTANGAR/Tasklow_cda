// import { useState } from "react";

// export default function ColumnModal({
//   isOpen,
//   onClose,
//   onSave
// }) {

//   const [title, setTitle] =
//     useState("");

//   if (!isOpen) return null;

//   return (

//     <div className="modal-overlay">

//       <div className="modal">

//         <h2>Add Column</h2>

//         <input

//           type="text"

//           placeholder="Column title"

//           value={title}

//           onChange={(e) =>
//             setTitle(e.target.value)
//           }

//         />

//         <div className="modal-buttons">

//           <button
//             onClick={onClose}
//           >
//             Cancel
//           </button>

//           <button
//             onClick={() => {

//               onSave(title);

//               setTitle("");

//             }}
//           >
//             Save
//           </button>

//         </div>

//       </div>

//     </div>

//   );

// }

import TaskCard from "./TaskCard";

export default function Column({

  column,

  onAddTask,

  onEditTask,

  onDeleteTask

}) {

  return (

    <div className={`column ${column.className}`}>

      <div className="column-header">

        <div>

          <h3>

            {column.title}

          </h3>

          <span className="task-count">

            {column.tasks.length} task
            {column.tasks.length > 1 ? "s" : ""}

          </span>

        </div>

        <button

          className="add-btn"

          onClick={() =>
            onAddTask(column)
          }

        >

          +

        </button>

      </div>

      <div className="column-body">

        {column.tasks.length === 0 ? (

          <div className="empty-column">

            <p>

              No task

            </p>

          </div>

        ) : (

          column.tasks.map(task => (

            <TaskCard

              key={task.id}

              task={task}

              onEdit={() =>
                onEditTask(
                  column,
                  task
                )
              }

              onDelete={() =>
                onDeleteTask(task.id)
              }

            />

          ))

        )}

      </div>

      <button

        className="column-add-task"

        onClick={() =>
          onAddTask(column)
        }

      >

        + Add Task

      </button>

    </div>

  );

}