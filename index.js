const express = require("express");
const cors = require("cors");
// require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// Brand_Server
// rpNKb4hKN1q15x0E
const uri = `mongodb+srv://Brand_Server:rpNKb4hKN1q15x0E@cluster0.7ylhegt.mongodb.net/?retryWrites=true&w=majority`;


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
        await client.connect();

        const coffeeCollection = client.db('brandDB').collection('brand');


        //get all coffee
        app.get('/product', async (req, res) => {
            const cursor = coffeeCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })


        //get one  coffee
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await coffeeCollection.findOne(query);
            res.send(result);
        })

        //post coffee
        app.post('/product', async (req, res) => {
            const newCoffee = req.body;
            console.log(newCoffee);
            const result = await coffeeCollection.insertOne(newCoffee);
            res.send(result);
        })

        //
        // //update
        // app.put('/product/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const filter = { _id: new ObjectId(id) };
        //     const options = { upsert: true };
        //     const UpdatedCoffee = req.body;
        //     const Coffee = {
        //         $set: {
        //             coffeeName: UpdatedCoffee.coffeeName,
        //             quantity: UpdatedCoffee.quantity,
        //             supplier: UpdatedCoffee.supplier,
        //             taste: UpdatedCoffee.taste,
        //             category: UpdatedCoffee.category,
        //             details: UpdatedCoffee.details,
        //             photoUrl: UpdatedCoffee.photoUrl

        //         }
        //     }
        //     const result = await coffeeCollection.updateOne(filter, Coffee, options);
        //     res.send(result);
        // })

        // //delete one coffee
        // app.delete('/product/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const result = await coffeeCollection.deleteOne(query);
        //     res.send(result);
        // })





        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Coffee-store-server running");
});


app.listen(port, () => {
    console.log(`coffee store running on port :${port}`);
});