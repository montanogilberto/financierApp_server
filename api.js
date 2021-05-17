let Products = require('./dbconfig');
const dbOperations = require('./dbOperations');

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request,response,next)=>{
    console.log('middleware');
    next();
 })
 
 /* GET api/products */
 router.route('/products').get((request,response)=>{
    debugger
     dbOperations.getProducts().then(result => {
        response.json(result[0]);
     })
 
 })

 /* GET api/products/:id */
 router.route('/products/:id').get((request,response)=>{
    dbOperations.getProduct(request.params.id).then(result => {
       response.json(result[0]);
    })

})

/* POST api/products */
router.route('/products').post((request,response)=>{
   
   let products = {
      ...request.body
   }
   
   dbOperations.addProduct(products).then(result => {
      response.status(201).json(result);
      //response.json(result[0]);
   })

})

/* PUT api/products */
router.route('/products').put((request,response)=>{
   
   let products = {
      ...request.body
   }
   
   dbOperations.updateProduct(products).then(result => {
      response.status(201).json(result);
      //response.json(result[0]);
   })

})

/* DELETE api/products */
router.route('/products/:id').delete((request,response)=>{
   
   let products = {
      ...request.body
   }
   
   dbOperations.deleteProduct(products).then(result => {
      response.status(201).json(result);
      //response.json(result[0]);
   })

})


let port = process.env.PORT || 8090;
app.listen(port);
console.log('API is runnning at ' + port);

// dbOperations.getProducts().then( res => {
//     console.log(res);
// })