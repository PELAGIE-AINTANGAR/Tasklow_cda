import TaskCard from "./TaskCard";

import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import { useDroppable } from "@dnd-kit/core";

export default function Column({

  column,
  columnIndex,
  refreshBoards,
  onAddTask,

  onEditTask,

  onDeleteTask,
  onOpenStory

}) {

  const { setNodeRef } = useDroppable({

    id: column.id

  });
  const columnColors = [
  "column-purple",
  "column-blue",
  "column-orange",
  "column-green"
  ];
  console.log("onAddTask :", onAddTask);
  return (

    <div

      ref={setNodeRef}

      // className={`column ${column.className || ""}`}
      className={`column ${columnColors[columnIndex % columnColors.length]}`}

    >

      {/* Header */}

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

          onClick={() => onAddTask(column)}

          title="Ajouter une tâche"

        >

          +

        </button>

      </div>

      {/* Zone de drop */}

      <SortableContext

        items={column.tasks.map(task => task.id)}

        strategy={verticalListSortingStrategy}

      >

        <div className="column-body">

          {column.tasks.length === 0 ? (

            <div className="empty-column">

              <p>

                Drop a task here

              </p>

            </div>

          ) : (

            column.tasks.map(task => (

              <TaskCard

                key={task.id}

                task={task}

                onEdit={() =>
                  onEditTask(column, task)

                }

                onDelete={() =>

                  onDeleteTask(task.id)

                }
                onOpenStory={onOpenStory}

              />

            ))

          )}

        </div>

      </SortableContext>

      {/* Footer */}

      <button

        className="column-add-task"

        onClick={() => onAddTask(column)}

      >

        + Add Task

      </button>

    </div>

  );

}