const calculateDoD = (dod) => {

    const criteria = [

        dod.developmentCompleted,

        dod.acceptanceValidated,

        dod.testsPassed,

        dod.codeReviewed,

        dod.documentationUpdated

    ];

    const completed = criteria.filter(Boolean).length;

    return {

        percentage: Math.round((completed / criteria.length) * 100),

        isReady: completed === criteria.length

    };

};
module.exports = {
    calculateDoD
}