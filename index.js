const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ycbv1lf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const bloomCosmeticsCollection = client.db("bloomDB").collection("allBloomProduct");
    const CategoryCollection = client.db("bloomDB").collection("categoryProduct");
    const FeatureCollection = client.db("bloomDB").collection("featureProduct")

    // read
    app.get('/allProducts', async(req,res)=>{
      const result = await bloomCosmeticsCollection.find().toArray()
      res.send(result)
  })
  // read
  app.get('/categories', async(req,res)=>{
    const result = await CategoryCollection.find().toArray()
    res.send(result)
})
// read
app.get('/features', async(req,res)=>{
  const result = await FeatureCollection.find().toArray()
  res.send(result)
})
  // read for nerArrival
  app.get('/newArrivalProducts', async(req,res)=>{
    const result = await bloomCosmeticsCollection.find({ NewArrival: "yes" }).toArray()
    res.send(result)
})
// read for category
app.get('/allProducts/:category', async(req,res)=>{
   
  const category = req.params.category; // Get category from URL parameter
    const result = await bloomCosmeticsCollection
    .find({ Category: category }) // Ensure "Category" matches case
      .toArray();
    res.send(result);
})
// read for details
app.get('/allProductsDetails/:id', async(req, res)=>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await bloomCosmeticsCollection.findOne(query);
  res.send(result)
})
// read for featured
app.get('/allProductsFeature/:feature', async(req,res)=>{
   
  const feature = req.params.feature; // Get category from URL parameter
    const result = await bloomCosmeticsCollection
    .find({ Feature: feature }) // Ensure "Category" matches case
      .toArray();
    res.send(result);
})
    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req,res)=>{
    res.send('bloom cosmetics running')
});

app.listen(port, ()=>{
    console.log(`bloom cosmetics is running on port: ${port}`)
})