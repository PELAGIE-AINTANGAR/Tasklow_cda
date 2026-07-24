const dodService = require("../services/dodService");

const updateDoD = async (req, res, next) => {

    try {

        const dod = await dodService.updateDoD(

            req.params.taskId,

            req.body

        );

        res.status(200).json(dod);

    } catch (error) {

        next(error);

    }

};

module.exports = {

    updateDoD

};