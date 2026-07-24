export default function Projects({

  boards,

  onOpenBoard

}) {

  const completedBoards = boards.filter(board => {

    const totalTasks = board.columns.reduce(

      (total, column) =>

        total + column.tasks.length,

      0

    );

    const doneColumn = board.columns.find(

      column => column.title === "Done"

    );

    const doneTasks = doneColumn

      ? doneColumn.tasks.length

      : 0;

    return totalTasks > 0 && totalTasks === doneTasks;

  });

  return (

    <div className="projects-page">

      <h2>Completed Projects</h2>

      <div className="projects-grid">

        {completedBoards.length === 0 ? (

          <p>No completed projects.</p>

        ) : (

          completedBoards.map(board => {

            const totalTasks = board.columns.reduce(

              (total, column) =>

                total + column.tasks.length,

              0

            );

            return (

              <div

                key={board.id}

                className="project-card"

                onClick={() => onOpenBoard(board)}

              >

                <h3>{board.title}</h3>

                <p>

                  {board.description ||

                    "No description"}

                </p>

                <p>

                  📅 Created :

                  {" "}

                  {new Date(board.createdAt)

                    .toLocaleDateString("fr-FR")}

                </p>

                <p>

                  📝 Tasks :

                  {" "}

                  {totalTasks}

                </p>

                <span className="project-status">

                  ✅ Completed

                </span>

              </div>

            );

          })

        )}

      </div>

    </div>

  );

}