// import { useNavigate } from "react-router-dom";

// export default function Sidebar({
//   activePage,
//   setActivePage
// }) {

//   const navigate = useNavigate();

//   const logout = () => {

//     localStorage.removeItem("token");

//     navigate("/login");

//   };

//   return (

//     <aside className="sidebar">

//       <div>

//         <h2>TaskFlow</h2>

//         <ul>

//           <li
//             className={
//               activePage === "dashboard"
//                 ? "active"
//                 : ""
//             }
//             onClick={() =>
//               setActivePage("dashboard")
//             }
//           >
//             Boards
//           </li>

//           <li className={
//             activePage === "projects"
//                 ? "active"
//                 : ""
//             }
//             onClick={() =>
//               setActivePage("projects")
//             }
//           >
//             Projects
//           </li>

//           <li   className={
//             activePage === "analytics"
//                 ? "active"
//                 : ""
//             }
//             onClick={() =>
//               setActivePage("analytics")
//             }
//           >
//             Analytics
//           </li>

//           <li
//             className={
//               activePage === "settings"
//                 ? "active"
//                 : ""
//             }
//             onClick={() =>
//               setActivePage("settings")
//             }
//           >
//             Settings
//           </li>

//         </ul>

//       </div>

//       <button
//         onClick={logout}
//         className="logout-btn"
//       >
//         Logout
//       </button>

//     </aside>


import { useNavigate } from "react-router-dom";

export default function Sidebar({

  boards,

  selectedBoard,

  setSelectedBoard,

  activePage,

  setActivePage

}) {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <aside className="sidebar">

      <div>

        <h2 className="logo">

          TaskFlow

        </h2>

        <ul className="menu">

          <li

            className={
              activePage === "dashboard"
                ? "active"
                : ""
            }

            onClick={() =>
              setActivePage("dashboard")
            }

          >

            Boards

          </li>

          <li

            className={
              activePage === "projects"
                ? "active"
                : ""
            }

            onClick={() =>
              setActivePage("projects")
            }

          >

            Projects

          </li>

          <li

            className={
              activePage === "analytics"
                ? "active"
                : ""
            }

            onClick={() =>
              setActivePage("analytics")
            }

          >

            Analytics

          </li>

          <li

            className={
              activePage === "settings"
                ? "active"
                : ""
            }

            onClick={() =>
              setActivePage("settings")
            }

          >

            Settings

          </li>

        </ul>

        {/* <hr /> */}

        {/* <h4 className="boards-title">

          My Boards

        </h4> */}

        {/* <div className="boards-list">

          {boards.length === 0 ? (

            <p className="empty-board">

              No board

            </p>

          ) : (

            boards.map((board) => (

              <div

                key={board.id}

                className={
                  selectedBoard?.id === board.id
                    ? "board-item active-board"
                    : "board-item"
                }

                onClick={() =>
                  setSelectedBoard(board)
                }

              >

                📁 {board.title}

              </div>

            ))

          )}

        </div> */}

      </div>

      <button

        className="logout-btn"

        onClick={logout}

      >

        Logout

      </button>

    </aside>

  );

}
//   );
// }