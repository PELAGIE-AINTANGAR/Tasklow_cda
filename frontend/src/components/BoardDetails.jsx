import React, {useState} from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import Column from "./Column";
import {
  createTask,
  updateTask,
  deleteTask as deleteTaskService
} from "../services/taskService";
import StoryDetailsModal from "./StoryDetailsModal";
import TaskModal from "./TaskModal";

export default function BoardDetails({

  board,

  refreshBoards,

  onBack

}) {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    const [selectedColumn, setSelectedColumn] = useState(null);

    const [editingTask, setEditingTask] = useState(null);
    const [selectedStory, setSelectedStory] = useState(null);

    const [isStoryOpen, setIsStoryOpen] = useState(false);
  // const board = boards.find(b => b.id === boards[0].id);

  if (!board) {

    return <p>No board selected.</p>;

  }
  const openAddTask = (column) => {

  setSelectedColumn(column);

  setEditingTask(null);

  setIsTaskModalOpen(true);

    };
  const openEditTask = (column, task) => {

  setSelectedColumn(column);

  setEditingTask(task);

  setIsTaskModalOpen(true);

 };
  const openStory = (task) => {
      console.log("OPEN STORY");
      console.log(task);
      setSelectedStory(task);

      setIsStoryOpen(true);

  };
 
 const handleSaveTask = async (taskData) => {

  try {

    if (editingTask) {

      await updateTask(editingTask.id, {
        code: taskData.code,

        title: taskData.title,

        description: taskData.description,

        businessValue: taskData.businessValue,

        acceptanceCriteria: taskData.acceptanceCriteria,

        priority: taskData.priority,

        dueDate: taskData.dueDate,

        status: selectedColumn.title,

        columnId: selectedColumn.id

      });

    } else {

       
      await createTask({
        code: taskData.code,

        title: taskData.title,

        description: taskData.description,

        businessValue: taskData.businessValue,

        acceptanceCriteria: taskData.acceptanceCriteria,

        priority: taskData.priority,

        dueDate: taskData.dueDate,

        status: selectedColumn.title,

        columnId: selectedColumn.id

      });

    }

    setIsTaskModalOpen(false);

    setEditingTask(null);

    setSelectedColumn(null);

    await refreshBoards();

  } catch (error) {

    console.error(error);

  }

    };
    const handleDeleteTask = async (taskId) => {

  if (!window.confirm("Supprimer cette tâche ?")) {

    return;

  }

  try {

    await deleteTaskService(taskId);

    await refreshBoards();

  } catch (error) {

    console.error(error);

  }

  };
  const canMoveTask = (task, destinationColumn) => {

    const destination = destinationColumn.title;

    // Calcul DoR
    const dor = task.dor || {};

    const dorReady =
      dor.storyDefined &&
      dor.descriptionDefined &&
      dor.acceptanceCriteriaDefined &&
      dor.priorityDefined &&
      dor.estimated;

    // Calcul DoD
    const dod = task.dod || {};

    const dodReady =
      dod.developmentCompleted &&
      dod.acceptanceValidated &&
      dod.testsPassed &&
      dod.codeReviewed &&
      dod.documentationUpdated;

    // To Do -> In Progress
    if (destination === "In Progress" && !dorReady) {

        alert(
            "Cette User Story n'est pas prête.\n\nComplétez la Definition of Ready."
        );

        return false;
    }

    // On Approval -> Done
    if (destination === "Done" && !dodReady) {

        alert(
            "Cette User Story n'est pas terminée.\n\nComplétez la Definition of Done."
        );

        return false;
    }

    return true;
  };
    const handleDragEnd = async(event) => {

  
    
      const { active, over } = event;
    
      if (!over) return;
        
      if (active.id === over.id) return;
    
      let sourceColumn = null;
      let destinationColumn = null;
      let movedTask = null;
    
      for (const column of board.columns) {
    
        const task = column.tasks.find(
          task => task.id === active.id
        );
    
        if (task) {
    
          sourceColumn = column;
          movedTask = task;
    
        }
    
        if (
          column.tasks.some(
            task => task.id === over.id
          )
        ) {
    
          destinationColumn = column;
    
        }
    
      }
    
      // Si on dépose dans une colonne vide
      if (!destinationColumn) {
    
        destinationColumn = board.columns.find(
          column => column.id === Number(over.id)
        );
    
      }
    
      if (
        !movedTask ||
        !destinationColumn
      ) {
        return;
      }
      if (!canMoveTask(movedTask, destinationColumn)) {
        return;
      }
    
      try {
    
        await updateTask(movedTask.id, {
    
          title: movedTask.title,
    
          description: movedTask.description,

          businessValue: movedTask.businessValue,

          acceptanceCriteria: movedTask.acceptanceCriteria,
    
          priority: movedTask.priority,
    
          dueDate: movedTask.dueDate,
    
          status: destinationColumn.title,
    
          columnId: destinationColumn.id
    
        });
    
        await refreshBoards();
    
      } catch (error) {
    
        console.error(error);
    
      }
    

  };
  
  return (

    <div className="board-details">

        <div className="board-details-header">

            <button
            className="back-btn"
            onClick={onBack}
            >
            ← Back
            </button>

            <div className="board-info">

                <h2>{board.title}</h2>

                <p>{board.description}</p>

                <small>

                    Created :

                    {" "}

                    {new Date(board.createdAt)
                    .toLocaleDateString("fr-FR")}

                </small>

            </div>

        </div>

      <DndContext

        collisionDetection={closestCenter}

        onDragEnd={handleDragEnd}

      >

        <div className="board">

          {board.columns.map((column, index) => (

            <Column

                key={column.id}

                column={column}
                columnIndex={index}

                refreshBoards={refreshBoards}
                onAddTask={openAddTask}

                onEditTask={openEditTask}

                onDeleteTask={handleDeleteTask}
                onOpenStory={openStory}

            />

          ))}
         
        


        </div>

      </DndContext>
      <TaskModal

        isOpen={isTaskModalOpen}

        task={editingTask}

        onClose={() => {

            setIsTaskModalOpen(false);

            setEditingTask(null);

            setSelectedColumn(null);

        }}

        onSave={handleSaveTask}

      />

      <StoryDetailsModal

        isOpen={isStoryOpen}
        task={selectedStory}
        refreshBoards={refreshBoards}
        onClose={() => {

            setIsStoryOpen(false);

            setSelectedStory(null);

        }}
      />

    </div>

  );

}