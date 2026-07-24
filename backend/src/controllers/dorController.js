const dorService = require("../services/dorService");

const updateDoR = async (req, res, next) => {

    try {

        const dor = await dorService.updateDoR(

            req.params.taskId,

            req.body

        );

        res.status(200).json(dor);

    } catch (error) {

        next(error);

    }

};

module.exports = {

    updateDoR

};