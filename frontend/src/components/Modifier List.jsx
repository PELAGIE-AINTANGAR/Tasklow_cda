import TaskCard from "./TaskCard";

export default function List({
  title,
  tasks,
  className,
  onDelete,
  onEdit
}) {

  return (

    <div className={`column ${className}`}>

      <h3>{title}</h3>

      {tasks.map(task => (

        <TaskCard
          key={task.id}
          task={task}
          onDelete={() =>
            onDelete(task.id)
          }
          onEdit={() =>
            onEdit(task.id)
          }
        />

      ))}

    </div>
  );
}