import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) =>{
    res.sendFile('index.html', {root:__dirname})
})

app.listen(3000, ()=>{ })