export default function Header({
  board,
  activePage,
  onAddBoard,
  onAddTask
}) {

  const formatDate = (date) => {

    if (!date) return "--";

    return new Date(date)
      .toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });

  };
    const getHeaderContent = () => {

    switch (activePage) {

      case "projects":

        return {
          title: "Projects",
          description:
            "View your completed projects"
        };


      case "analytics":

        return {
          title: "Analytics",
          description:
            "Track your productivity and progress"
        };


      case "settings":

        return {
          title: "Settings",
          description:
            "Manage your account and security"
        };


      default:

        return {
          title: board
            ? board.title
            : "Dashboard",

          description: board
            ? board.description
            : "Manage your projects and tasks"
        };

    }

  };


  const headerContent =
    getHeaderContent();
    
  return (

    <div className="header">

      <div className="header-top">

        <div className="header-left">

          <h1 className="board-title">

             {headerContent.title}

          </h1>

          {/* {board?.description && (

            <p className="board-description">

              {board.description}

            </p>

          )} */}

        </div>

        <div className="header-actions">
            {activePage === "dashboard" && (

            <>
            <button
              className="add-task-btn"
              onClick={onAddTask}
              disabled={!board}
            >

              + Add Task

            </button>

            <button
              className="add-board-btn"
              onClick={onAddBoard}
            >

              + Add Board

            </button>
            </>
          )}

          {activePage === "projects" && (

            <button
              className="add-board-btn"
              onClick={onAddBoard}
            >

              + Add Board

            </button>

          )}
        </div>

      </div>
       {activePage === "dashboard" && board && (

        <div className="board-details">

          {/* tes cartes dates / colonnes / tâches */}

        </div>

      )}

      {/* {board && (

        <div className="board-details">

          <div className="detail-card">

            <span className="detail-label">

              📅 Début

            </span>

            <span className="detail-value">

              {formatDate(board.startDate)}

            </span>

          </div>

          <div className="detail-card">

            <span className="detail-label">

              🏁 Fin

            </span>

            <span className="detail-value">

              {formatDate(board.endDate)}

            </span>

          </div>

          <div className="detail-card">

            <span className="detail-label">

              📋 Colonnes

            </span>

            <span className="detail-value">

              {board.columns
                ? board.columns.length
                : 0}

            </span>

          </div>

          <div className="detail-card">

            <span className="detail-label">

              ✅ Tâches

            </span>

            <span className="detail-value">

              {board.columns
                ? board.columns.reduce(
                    (total, column) =>
                      total +
                      column.tasks.length,
                    0
                  )
                : 0}

            </span>

          </div>

        </div>

      )} */}

    </div>

  );

}