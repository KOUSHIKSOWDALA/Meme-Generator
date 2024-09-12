import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var memes = null;

app.get('/', async(req,res)=>{
    const api = await axios.get("https://api.imgflip.com/get_memes")
    memes = api.data.data.memes; 
    const selectedid = req.query.value || ''
    res.render('index.ejs',{data:{memes},selectedid})
})

app.post('/submit', async(req,res)=>{

    const text0 = req.body.text0
    const text1 = req.body.text1
    const id = req.body.id
    
    const api  = await axios.get(
        `https://api.imgflip.com/caption_image?username=YOURAPI&password=PASSWORD&template_id=${id}&text0=${text0}&text1=${text1}`
    )
    
    const image = api.data.data.url;

    res.render('index.ejs',{image, data : {memes},selectedid : ""});
})

app.listen(port, () => {})

