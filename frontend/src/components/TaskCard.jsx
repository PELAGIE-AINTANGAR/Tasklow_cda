import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export default function TaskCard({

  task,

  onEdit,

  onDelete,  

  onOpenStory
}) {

  const {

    attributes,

    listeners,

    setNodeRef,

    transform,

    transition

  } = useSortable({

    id: task.id

  });

  const style = {

    transform: CSS.Transform.toString(transform),

    transition

  };

  const priority = task.priority || "Medium";

  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "fr-FR",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );

  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      // {...attributes}

      // {...listeners}
      className="task-card"
    >



      <div className="task-header">

        <h4>

          {task.title}

        </h4>
        <div
            className="drag-handle"
            {...attributes}
            {...listeners}
            title="Déplacer la tâche"
        >
            
        </div>

      </div>


      {task.description ? (

        <p className="task-description">

          {task.description}

        </p>

      ) : (

        <p className="task-description empty">

          No description

        </p>

      )}


      <div className="task-info">

        <div className="task-priority">

          <span

            className={`priority ${priority.toLowerCase()}`}

          >

            {priority}

          </span>

        </div>

        <div className="task-dates">

          {task.dueDate && (

            <p>

              📅 Due :

              {" "}

              {formatDate(task.dueDate)}

            </p>

          )}

          <p>

            🕒 Created :

            {" "}

            {formatDate(task.createdAt)}

          </p>

        </div>

      </div>

      <div className="task-actions">

        <button
            className="story-btn"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                alert("Bouton Open Story cliqué");
                onOpenStory(task);

            }}
        >
            📖 Open Story
        </button>

        <button
            className="edit-btn"
            onClick={(e) => {

                e.stopPropagation();

                onEdit();

            }}
        >
            ✏️ Edit
        </button>

        <button
            className="delete-btn"
            onClick={(e) => {

                e.stopPropagation();

                onDelete();

            }}
        >
            🗑 Delete
        </button>

      </div>

    </div>

  );

}