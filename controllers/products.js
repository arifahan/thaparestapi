const Product = require("../models/product")

const getAllPorducts = async (req, res) => {
    const { company, name, featured, sort, select } = req.query;
    const queryObject = {};

    if(company) {
        queryObject.company = {$regex: company, $options: "i"};
    }

    if(featured) {
        queryObject.featured = {featured};
    }

    if(name) {
        queryObject.name = {$regex: name, $options: "i"};
    }


    let apiData = Product.find(queryObject);

    if(sort) {
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix)
    }

    if(select) {
        // let selecttFix = select.replace(",", " ");
        let selecttFix = select.split(",").join(" ");
        apiData = apiData.select(selecttFix)
    }


    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);
    // console.log(req.query);
    const myData = await apiData;
    res.status(200).json({myData, nbHits: myData.length});
}


const getAllPorductsTesting  = async (req, res) => {
    const myData = await Product.find(req.query);
    res.status(200).json({myData, nbHits: myData.length});
}


module.exports = {getAllPorducts, getAllPorductsTesting};