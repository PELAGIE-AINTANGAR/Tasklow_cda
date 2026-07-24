const calculateDoR = (dor)=>{

    const criteria=[

        dor.storyDefined,

        dor.descriptionDefined,

        dor.acceptanceCriteriaDefined,

        dor.priorityDefined,

        dor.estimated

    ];

    const completed=criteria.filter(Boolean).length;

    return{

        percentage:

        completed*100/criteria.length,

        isReady:

        completed===criteria.length

    };

}
module.exports={

    calculateDoR
}