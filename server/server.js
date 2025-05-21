import express from "express"

const app = express();
const PORT = 8000;

app.use(express.json());

app.get('/',(req,res)=>{

    console.log("Response from NodeJs Server ...")
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});