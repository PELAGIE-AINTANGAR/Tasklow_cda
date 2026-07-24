import React, { useMemo, useState, useEffect } from "react";
import { updateDoR } from "../services/dorService";
import { updateDoD } from "../services/dodService";

export default function StoryDetailsModal({
    isOpen,
    task,
    onClose,
    refreshBoards
}) {
    const [dor, setDor] = useState({
        storyDefined: false,
        descriptionDefined: false,
        acceptanceCriteriaDefined: false,
        priorityDefined: false,
        estimated: false
    });

    const [dod, setDod] = useState({
        developmentCompleted: false,
        acceptanceValidated: false,
        testsPassed: false,
        codeReviewed: false,
        documentationUpdated: false
    });
    console.log("StoryDetailsModal", { isOpen, task });

    // const [dor, setDor] = useState(task.dor || {});
    // const [dod, setDod] = useState(task.dod || {});

    useEffect(() => {
        if (!task) return;
        setDor(task.dor || {});
        setDod(task.dod || {});

    }, [task]);
   

    const dorItems = [
        {
            key: "storyDefined",
            label: "Story defined"
        },
        {
            key: "descriptionDefined",
            label: "Description defined"
        },
        {
            key: "acceptanceCriteriaDefined",
            label: "Acceptance Criteria defined"
        },
        {
            key: "priorityDefined",
            label: "Priority defined"
        },
        {
            key: "estimated",
            label: "Estimated"
        }
    ];

    const dodItems = [
        {
            key: "developmentCompleted",
            label: "Development completed"
        },
        {
            key: "acceptanceValidated",
            label: "Acceptance validated"
        },
        {
            key: "testsPassed",
            label: "Tests passed"
        },
        {
            key: "codeReviewed",
            label: "Code reviewed"
        },
        {
            key: "documentationUpdated",
            label: "Documentation updated"
        }
    ];

    const dorPercentage = useMemo(() => {

        const completed = dorItems.filter(item => dor[item.key]).length;

        return Math.round((completed / dorItems.length) * 100);

    }, [dor]);
    

    const dodPercentage = useMemo(() => {

        const completed = dodItems.filter(item => dod[item.key]).length;

        return Math.round((completed / dodItems.length) * 100);

    }, [dod]);
    const isReadyForDevelopment = dorPercentage === 100;

    const isReadyForProduction = dodPercentage === 100;

    if (!isOpen || !task) {
        return null;
    }
    // const handleDorChange = async (field) => {

    //     try {

    //         const updatedDor = {

    //             ...dor,

    //             [field]: !dor[field]

    //         };

    //         setDor(updatedDor);

    //         await updateDoR(task.id, {

    //             [field]: updatedDor[field]

    //         });
    //         await refreshBoards();

    //     } catch (error) {

    //         console.error(error);

    //     }

    // };

    // const handleDodChange = async (field) => {

    //     try {

    //         const updatedDod = {

    //             ...dod,

    //             [field]: !dod[field]

    //         };

    //         setDod(updatedDod);

    //         await updateDoD(task.id, {

    //             [field]: updatedDod[field]

    //         });

    //         await refreshBoards();
    //     } catch (error) {

    //         console.error(error);

    //     }

    // };
    const handleDorChange = (field) => {

        setDor(prev => ({
            ...prev,
            [field]: !prev[field]
        }));

    };

    const handleDodChange = (field) => {

        setDod(prev => ({
            ...prev,
            [field]: !prev[field]
        }));

    };

    const handleConfirm = async () => {

        try {

            // Sauvegarde complète
            await updateDoR(task.id, dor);

            await updateDoD(task.id, dod);

            // Recharge les boards
            await refreshBoards();

            // Ferme le modal
            onClose();

        } catch (error) {

            console.error(error);

            alert("Erreur lors de l'enregistrement.");

        }

    };
    console.log("StoryDetailsModal rendu", isOpen, task);
    return (

        <div className="story-overlay">

            <div className="story-modal">

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ✖
                </button>

                <h2>

                    {task.code} - {task.title}

                </h2>

                <div className="story-section">

                    <h3>Description</h3>

                    <p>

                        {task.description || "No description"}

                    </p>

                </div>

                <div className="story-section">

                    <h3>Business Value</h3>

                    <p>

                        {task.businessValue || "Not specified"}

                    </p>

                </div>

                <div className="story-section">

                    <h3>Acceptance Criteria</h3>

                    <p>

                        {task.acceptanceCriteria || "None"}

                    </p>

                </div>

                <div className="story-grid">

                    <div>

                        <strong>Priority</strong>

                        <p>{task.priority}</p>

                    </div>

                    <div>

                        <strong>Status</strong>

                        <p>{task.status}</p>

                    </div>

                    <div>

                        <strong>Due Date</strong>

                        <p>

                            {task.dueDate
                                ? new Date(task.dueDate).toLocaleDateString("fr-FR")
                                : "-"}

                        </p>

                    </div>

                </div>

                <div className="story-progress">

                    <h3>Definition of Ready</h3>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width: `${dorPercentage}%`
                            }}
                        />

                    </div>

                    <span>

                        {isReadyForDevelopment
                            ? "✅ Ready for Development"
                            : `${dorPercentage} %`}

                    </span>

                    {isReadyForDevelopment && (

                        <div className="success-message">

                            🚀 Cette User Story peut maintenant être déplacée vers
                            <strong> In Progress</strong>.

                        </div>

                    )}

                </div>

                <div className="story-progress">

                    <h3>Definition of Done</h3>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width: `${dodPercentage}%`
                            }}
                        />

                    </div>

                    <span>

                        {isReadyForProduction
                            ? "🎉 Ready for Production"
                            : `${dodPercentage} %`}

                    </span>

                    {isReadyForProduction && (

                        <div className="success-message">

                            🎯 Toutes les validations sont terminées.

                            Cette User Story peut maintenant être déplacée vers
                            <strong> Done</strong>.

                        </div>

                    )}

                </div>

                <div className="checklists">

                    <div className="checklist">

                        <h3>Definition of Ready</h3>

                        {dorItems.map(item => (

                            <label key={item.key}>

                                <input
                                    type="checkbox"
                                    checked={dor[item.key] || false}
                                    onChange={() => handleDorChange(item.key)}
                                />

                                {item.label}

                            </label>

                        ))}

                    </div>

                    <div className="checklist">

                        <h3>Definition of Done</h3>

                        {dodItems.map(item => (

                            <label key={item.key}>

                                <input
                                    type="checkbox"
                                    checked={dod[item.key] || false}
                                    onChange={() => handleDodChange(item.key)}
                                />

                                {item.label}

                            </label>

                        ))}

                    </div>

                </div>
                <div className="story-actions">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Annuler
                    </button>

                    <button
                        className="confirm-btn"
                        onClick={handleConfirm}
                    >
                        ✅ Confirmer
                    </button>

                </div>

            </div>

        </div>

    );

}