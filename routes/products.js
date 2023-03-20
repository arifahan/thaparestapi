const express = require("express");

const router = express.Router();

const {getAllPorducts, getAllPorductsTesting} = require("../controllers/products")

router.route("/").get(getAllPorducts);
router.route("/testing").get(getAllPorductsTesting);


module.exports = router;