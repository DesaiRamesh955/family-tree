const express = require("express");
const router = express.Router()
const upload = require("../middleware/fileUpload")
const {createFamily,fetchFamily,fetchSingleFamily,fetchSingle} = require("../controller/Family")


router.post("/family/create",upload.single("profile"),createFamily)
router.get("/family/fetch/:id",fetchFamily)
router.get("/family/singlefetch",fetchSingleFamily)

module.exports = router