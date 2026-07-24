import { useState, useEffect } from "react";

export default function TaskModal({

  isOpen,

  onClose,

  onSave,

  task

}) {
  console.log("TaskModal", { isOpen, task });

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");

  const [businessValue, setBusinessValue] = useState("");

  const [acceptanceCriteria, setAcceptanceCriteria] = useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [dueDate, setDueDate] =
    useState("");

  const resetForm = () => {
    setCode("");

    setTitle("");

    setDescription("");
    setBusinessValue("");

    setAcceptanceCriteria("");

    setPriority("Medium");

    setDueDate("");

  };

  useEffect(() => {

    if (!isOpen) return;

    if (task) {

      setCode(task.code || "");

      setTitle(task.title || "");

      setDescription(task.description || "");

      setBusinessValue(task.businessValue || "");

      setAcceptanceCriteria(task.acceptanceCriteria || "");

      setPriority(task.priority || "Medium");

      setDueDate(
        task.dueDate
          ? new Date(task.dueDate)
              .toISOString()
              .split("T")[0]
          : ""
      );

    } else {

      resetForm();

    }

  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {

    if (!title.trim()) {

      alert(
        "Please enter a task title."
      );

      return;

    }

    await onSave({
      code,

      title,

      description,

      businessValue,

      acceptanceCriteria,

      priority,

      dueDate

    });

    resetForm();

    // onClose();

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>

          {task

            ? "Edit User Story"

            : "Create User Story"}

        </h2>
        <label>

          User Story Code

        </label>

        <input

          type="text"

          placeholder="US-001"

          value={code}

          onChange={(e) =>

              setCode(e.target.value)

          }

        />   
        <label>

          Title

        </label>

        <input

          type="text"

          placeholder="Task title"

          value={title}

          onChange={(e) =>
            setTitle(e.target.value)
          }

        />
        <label>

          Business Value

        </label>

        <textarea

          rows="3"

          placeholder="Business value"

          value={businessValue}

          onChange={(e) =>

              setBusinessValue(e.target.value)

          }

        />
        <label>

          Acceptance Criteria

        </label>

        <textarea

          rows="4"

          placeholder="Acceptance criteria"

          value={acceptanceCriteria}

          onChange={(e) =>

              setAcceptanceCriteria(e.target.value)

          }

        />

        <label>

          Description

        </label>

        <textarea

          rows="5"

          placeholder="Task description"

          value={description}

          onChange={(e) =>
            setDescription(e.target.value)
          }

        />

        <label>

          Priority

        </label>

        <select

          value={priority}

          onChange={(e) =>
            setPriority(e.target.value)
          }

        >

          <option value="High">

            🔴 High

          </option>

          <option value="Medium">

            🟡 Medium

          </option>

          <option value="Low">

            🟢 Low

          </option>

        </select>

        <label>

          Due date

        </label>

        <input

          type="date"

          value={dueDate}

          onChange={(e) =>
            setDueDate(e.target.value)
          }

        />

        <div className="modal-buttons">

          <button

            className="cancel-btn"

            onClick={() => {

              resetForm();

              onClose();

            }}

          >

            Cancel

          </button>

          <button

            className="save-btn"

            onClick={handleSubmit}

            disabled={!title.trim()}

          >

            {task

              ? "Update User Story"

              : "Create User Story"}

          </button>

        </div>

      </div>

    </div>

  );

}