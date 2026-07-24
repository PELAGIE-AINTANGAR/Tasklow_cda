import { useState, useEffect } from "react";

export default function BoardModal({
  isOpen,
  onClose,
  onSave
}) {
    const [columns, setColumns] = useState([]);
    const [selectedColumn, setSelectedColumn] =
        useState("To Do");
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");


  const [startDate, setStartDate] =
    useState("");
  const [endDate, setEndDate] =
    useState("");


  useEffect(() => {

    if (isOpen) {

      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
        setColumns([]);
    }

  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    alert("handleSubmit");

    console.log("handleSubmit");
    console.log("Titre =", title);


    if (!title.trim()) {

      alert("Titre vide");

      return;

    }
    console.log("Avant onSave");
    await onSave({

      title,

      description,

      startDate,

      endDate,

      columns

    });
    console.log("Après onSave");
  };
  const removeColumn = (index) => {

  setColumns(

    columns.filter(
      (_, i) => i !== index
    )

  );

 };

 const addColumn = () => {

    if (columns.includes(selectedColumn)){
        alert("This column has already been added.");

        return;
    } 

  setColumns([
    ...columns,
    selectedColumn
  ]);


 };


  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>Create Board</h2>

        <input
          type="text"
          placeholder="Board title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Board description"
          rows="4"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <label>Start date</label>

        <input
          type="date"
          value={startDate}
          onChange={(e) =>
            setStartDate(e.target.value)
          }
        />

        <label>End date</label>

        <input
          type="date"
          value={endDate}
          onChange={(e) =>
            setEndDate(e.target.value)
          }
        />
        {/* <h3>Columns</h3>

        <div className="column-selector">

            <select

                value={selectedColumn}

                onChange={(e)=>
                setSelectedColumn(e.target.value)
                }

            >

                {availableColumns.map(column => (

                <option
                    key={column}
                    value={column}
                >

                    {column}

                </option>

                ))}

            </select>

            <button

                type="button"

                onClick={addColumn}

            >

                Add

            </button>

        </div>
        <div className="column-list">

            
            {columns.map((column, index) => (

                <div
                    key={index}
                    className="column-item"
                >

                    <span>{column}</span>

                    <button
                    type="button"
                    onClick={() =>
                        removeColumn(index)
                    }
                    >
                    ✕
                    </button>

                </div>

            ))}

         */}

        {/* </div> */}


        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          {/* <button
            type="button"
            className="save-btn"
            onClick={() => {
              console.log("CLICK");
              handleSubmit();
            }}
          >
            Create
          </button> */}
          <button
            type="button"
            className="save-btn"
            onClick={() => {
                alert("CLICK");
                console.log("CLICK");
                handleSubmit();
            }}
            >
            Create
            </button>

        </div>

      </div>

    </div>

  );

}