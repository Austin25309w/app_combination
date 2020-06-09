const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
// const hbs = require('hbs');
const logger = require('morgan')
const cors = require('cors')


const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser());
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())



app.post("/upload", upload.single('mySong'), (req, res) => {
    if(req.file){
        console.log('Uploading file...', req.file);
        let filename = req.file.filename;
        let uploadStatus = 'File Uploaded Successfully';

    } else {
        console.log('No File Uploaded');
        return res.status(400).json({
            status: 'error',
            error: 'req body cannot be empty'
        });
    }
    
    res.send('Gotcha, thank you!');
    // res.render('index.hbs', {status: uploadStatus, filename: `Name of the file: ${filename}` })
f
})


app.get('/', (req, res) => res.send('Hello World!'))
app.get('/error', (req,res) => res.send(error()))

app.use(function(err,req,res,text){
    console.error(err.stack)
    res.type('text/plain')
    res.status(500)
    res.send('internal server 500')
})

app.listen(port, ()=> console.log(`example app listening at http://localhost:${port}`))