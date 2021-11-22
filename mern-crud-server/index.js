const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload')
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lkuqr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run () {
    try {
        await client.connect();
        const database = client.db('MERN_CRUD');
        const usersCollection = database.collection('users');

        // create users collection
        app.post('/users', async (req, res) => {
            const name = req.body.name;
            const email = req.body.email;
            const phone = req.body.phone;
            const img = req.files.img;
            const address = req.body.address;

            const imgData = img.data;
            const encodedImg = imgData.toString('base64');
            const imgBuffer = Buffer.from(encodedImg, 'base64');

            const user = {
                name,
                email,
                phone,
                img: imgBuffer,
                address
            }
            const result = await usersCollection.insertOne(user);
            res.json(result);
        });


        // read users collection
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const allUsers = await cursor.toArray();
            res.send(allUsers);
        });

        // delete user
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.json(result);
        });

        // update user
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;

            const name = req.body.name;
            const email = req.body.email;
            const phone = req.body.phone;
            const img = req.files.img;
            const address = req.body.address;

            const imgData = img.data;
            const encodedImg = imgData.toString('base64');
            const imgBuffer = Buffer.from(encodedImg, 'base64');
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name,
                    email,
                    phone,
                    img: imgBuffer,
                    address
                },
            };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.json(result)
        });
    }

    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => { res.send('Server Running'); });
app.listen(port, () => { console.log('Server is Running on Port:', port); });