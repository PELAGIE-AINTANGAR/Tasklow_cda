export default function Stats({ board }) {

  if (!board || !Array.isArray(board.columns)) {

    return null;

  }

  return (

    <div className="stats">

      {board.columns.map(column => (

        <div

          key={column.id}

          className="stat-card"

        >

          <div className="column-title">

            <h4>{column.title}</h4>

            <button

              className="add-task-btn"

              onClick={() => console.log("Ajouter une tâche")}

            >

              + Add Task

            </button>

          </div>

          {column.tasks.length === 0 ? (

            <p className="empty-column">

              No task

            </p>

          ) : (

            column.tasks.map(task => (

              <div

                key={task.id}

                className="task-preview"

              >

                <h5>{task.title}</h5>

                <p>{task.description}</p>

                <span>

                  Priority : {task.priority}

                </span>

                {task.dueDate && (

                  <p>

                    📅 {new Date(task.dueDate).toLocaleDateString("fr-FR")}

                  </p>

                )}

                <div className="task-buttons">

                  <button>

                    ✏️ Edit

                  </button>

                  <button>

                    🗑 Delete

                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      ))}

    </div>

  );

}