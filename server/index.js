import { MongoClient } from "mongodb";
import cors from "cors";
import express, { json } from "express";
import events from "events";

const PORT = 5000;

const app = express();
const client = new MongoClient("mongodb+srv://danil:Gidrargiym1@cluster0.2dekoou.mongodb.net/?retryWrites=true&w=majority");
const emitter = new events.EventEmitter();


// middleware
    app.use(cors());
    app.use(express.json());
//
app.listen(PORT,()=> console.log("serv is started"))



app.get("/get-message", (req, res)=>{
    emitter.once('newMessage',(message)=>{
        res.json(message)
    })
});
app.post("/create-message", (req, res)=>{
    const message = req.body;
    emitter.emit('newMessage',message)
    res.status(200);
    res.end();
});

const start = async () =>{
    try{
        await client.connect();
        const users = client.db().collection("tests");
        await users.insertOne({name: 12});

        await client.close();
    }catch(e){
        console.log(e)
    }
}

