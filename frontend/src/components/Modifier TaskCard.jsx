export default function TaskCard({
  task,
  onDelete,
  onEdit
}) {

  return (

    <div className="task-card">

      <h4>
        {task.title}
      </h4>

      <span
        className={`priority ${task.priority.toLowerCase()}`}
      >
        {task.priority}
      </span>

      <div className="task-actions">

        <button
          onClick={onEdit}
        >
          Edit
        </button>

        <button
          onClick={onDelete}
        >
          Delete
        </button>

      </div>

    </div>

  );
}