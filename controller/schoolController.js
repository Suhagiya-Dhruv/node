const SchoolModel = require("../models/schoolModel");


const getSchoolController = async (req, res) => {
    try {
        const data = await SchoolModel.create(req.body);
        res.send({
            data: data,
            message: "School successfully created"
        })
    } catch (e) {
        res.status(400).send({
            data: null,
            message: e.message
        })
    }
}

module.exports = {
    getSchoolController
}