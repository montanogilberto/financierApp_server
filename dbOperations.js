let config = require('./dbconfig');
const sql = require('mssql');

async function getProducts(){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query('Select * from dbo.Products')
        return products.recordsets;

    }catch(error){
        console.log(error);
    }
}

async function getProduct(productId){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request()
            .input('productId', sql.Int, productId)
            .query('Select * FROM dbo.Products WHERE productId = @productId')
        return products.recordsets;

    }catch(error){
        console.log(error);
    }
}


async function addProduct(products){
    try{
        let pool = await sql.connect(config);
        let InsertProducts = await pool.request()
            .input('prm_name', sql.NVarChar, products.name)
            .input('prm_categoryId', sql.Int, products.categoryId)
            .input('prm_image', sql.VarChar, products.image)
            .input('prm_price', sql.Money, products.price)
            .input('prm_description', sql.VarChar, products.description)
            .execute('dbo.sp_addProducts')
        return InsertProducts.recordsets;

    }catch(error){
        console.log(error);
    }
}

async function updateProduct(products){
    try{
        let pool = await sql.connect(config);
        let InsertProducts = await pool.request()
            .input('prm_productId', sql.NVarChar, products.productId)
            .input('prm_name', sql.NVarChar, products.name)
            .input('prm_categoryId', sql.Int, products.categoryId)
            .input('prm_image', sql.VarChar, products.image)
            .input('prm_price', sql.Money, products.price)
            .input('prm_description', sql.VarChar, products.description)
            .execute('dbo.sp_UpdateProducts')
        return InsertProducts.recordsets;

    }catch(error){
        console.log(error);
    }
}

async function deleteProduct(productId){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request()
            .input('prm_productId', sql.Int, productId)
            .execute('dbo.sp_UpdateProducts')
        return products.recordsets;

    }catch(error){
        console.log(error);
    }
}


module.exports = {
    getProducts: getProducts,
    getProduct: getProduct,
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
}

