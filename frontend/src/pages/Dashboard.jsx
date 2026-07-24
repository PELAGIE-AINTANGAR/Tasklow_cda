// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import Stats from "../components/Stats";
// import Board from "../components/Board";
// import Projects from "../components/Projects";
// import Analytics from "../components/Analytics";
// import BoardModal from "../components/BoardModal";

// import Settings from "./Settings";
// import {
//   createBoard
// } from "../services/boardService";
// import {
//   createColumn
// } from "../services/columnService";

// import "../styles/dashboard.css";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const handleCreateBoard = async (data) => {
//     alert("Dashboard : handleCreateBoard");

//     alert(JSON.stringify(data))

//     try {

//       const board = await createBoard({

//         title: data.title,

//         description: data.description,

//         startDate: data.startDate,

//         endDate: data.endDate, 
//         columns: data.columns

//       });
//         console.log(board);
//         console.log("Board créé :", board);

//       if (data.columns && data.columns.length > 0) {
//         alert("Nombre de colonnes : " + data.columns.length);
//         for (let i = 0; i < data.columns.length; i++) {
//           alert(data.columns[i]);

//           await createColumn({

//             title: data.columns[i],

//             position: i + 1,

//             boardId: board.id

//           });

//         }
//       }

//       setIsBoardModalOpen(false);

//       window.location.reload();

//     } catch (error) {

//       console.error(error);

//       console.error(error.message);

//       if (error.response) {

//           console.log(error.response);

//       }

//       alert(error.message);

//     }

//   };
//   const [isBoardModalOpen, setIsBoardModalOpen] =
//   useState(false);

//   const [activePage, setActivePage] =
//     useState("dashboard");

//   useEffect(() => {

//     const token =
//         localStorage.getItem("token");

//     if (!token) {

//         navigate("/login");

//     }

// }, [navigate]);

//   return (

//     <div className="dashboard">

//       <Sidebar
//         activePage={activePage}
//         setActivePage={setActivePage}
//       />

//       <div className="dashboard-content">

//         <Header
//           onAddBoard={() =>
//             setIsBoardModalOpen(true)
//           }
//         />
//         {activePage === "dashboard" && (
//           <>
//             <Stats />
//             <Board />
//           </>
//         )}

//         {activePage === "projects" && (
//           <Projects />
//         )}

//         {activePage === "analytics" && (
//           <Analytics />
//         )}

//         {activePage === "settings" && (
//           <Settings />
//         )}

//       </div>
//       <BoardModal

//         isOpen={isBoardModalOpen}

//         onClose={() =>{
//           console.log("Modal fermée");

//           setIsBoardModalOpen(false)
//         }}

//         onSave={(data) => {
//           console.log("Data envoyée à onSave:", data);
//           handleCreateBoard(data);
//         } }

//       />
//     </div>
    

//   );
  
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Stats from "../components/Stats";
import Board from "../components/Board";
import Projects from "../components/Projects";
import Analytics from "../components/Analytics";
import BoardModal from "../components/BoardModal";
import BoardDetails from "../components/BoardDetails";
import TaskModal from "../components/TaskModal";
import TaskCard from "../components/TaskCard";

import Settings from "./Settings";

import {
  getBoards,
  createBoard
} from "../services/boardService";

import { createTask
} from "../services/taskService";
import {
  createColumn
} from "../services/columnService";

import "../styles/dashboard.css";

export default function Dashboard() {

  const navigate = useNavigate();
  
  const [boards, setBoards] = useState([]);

  const [selectedBoard, setSelectedBoard] =
    useState(null);

  const [activePage, setActivePage] =
    useState("dashboard");

  const [isBoardModalOpen, setIsBoardModalOpen] =
    useState(false);

  const [isTaskModalOpen, setIsTaskModalOpen] =
    useState(false);


  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      navigate("/login");

      return;

    }

    loadBoards();

  }, [navigate]);

  const onOpenBoard = (board) => {

    setSelectedBoard(board);

  };
  // Charger tous les boards
  const loadBoards = async () => {

    try {

      const data = await getBoards();
      console.log("Dataget:", data);

      setBoards(data);
      if (selectedBoard) {

      const updatedBoard = data.find(
        board => board.id === selectedBoard.id
      );

      setSelectedBoard(updatedBoard);

      } 

    }catch (error) {

      console.error(error);

    }

  };

  // Création d'un board
  const handleCreateBoard = async (
    data
  ) => {

    try {

      const board =
        await createBoard({

          title: data.title,

          description:
            data.description,

          startDate:
            data.startDate,

          endDate:
            data.endDate

        });

      if (
        data.columns &&
        data.columns.length > 0
      ) {

        for (
          let i = 0;
          i < data.columns.length;
          i++
        ) {

          await createColumn({

            title:
              data.columns[i],

            position:
              i + 1,

            boardId:
              board.id

          });

        }

      }

      await loadBoards();

      setSelectedBoard(board);

      setIsBoardModalOpen(false);

    } catch (error) {

      console.error(error);

      alert(
        "Impossible de créer le board."
      );

    }
    console.log(selectedBoard);

  };
  const handleCreateTask = async (taskData) => {
    try {

      // Appel à l'API pour créer la tâche
      const task = await createTask(taskData);

    } catch (error) {

      console.error(error);

      alert("Impossible de créer la tâche.");

    }

  };

  return (

  <div className="dashboard">

    <Sidebar

      boards={boards}

      selectedBoard={selectedBoard}

      setSelectedBoard={setSelectedBoard}

      activePage={activePage}

      setActivePage={setActivePage}

    />

    <div className="dashboard-content">

      <Header

        board={selectedBoard}
        activePage={activePage}
        onAddBoard={() =>

          setIsBoardModalOpen(true)

        }
        taskModalOpen={isTaskModalOpen}
        onAddTask={() => setIsTaskModalOpen(true)}

      />
      <main className="dashboard-main">
        {activePage === "dashboard" && (

          <>

            {selectedBoard ? (

              <>

                <Stats

                  // board={selectedBoard}

                />

                <BoardDetails

                  board={selectedBoard}

                  refreshBoards={loadBoards}

                  onBack={() =>

                    setSelectedBoard(null)

                  }

                />

              </>

            ) : (

              <Board

                boards={boards}

                onOpenBoard={(board) =>

                  setSelectedBoard(board)

                }

              />

            )}

          </>

        )}

        {activePage === "projects" && (

          <Projects
            boards={boards}
            onOpenBoard={(board) => {

              setSelectedBoard(board);

              setActivePage("dashboard");

            }}
          />

        )}

        {activePage === "analytics" && (

          <Analytics />

        )}

        {activePage === "settings" && (

          <Settings />

        )}
      </main>
      <footer className="dashboard-footer">

      <span>© 2026 TaskFlow</span>

      <span>Designed by Pelagie Aintangar</span>

      </footer>

    </div>
    

    <BoardModal

      isOpen={isBoardModalOpen}

      onClose={() =>

        setIsBoardModalOpen(false)

      }

      onSave={handleCreateBoard}

    />

  </div>

);
}