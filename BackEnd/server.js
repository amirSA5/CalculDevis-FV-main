const express = require ('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const cors = require ('cors');
const ArticleUrl = require ('./routers/ArticlesRouter');
const sousArticleUrl = require ('./routers/sousArticleRouter');
const attributUrl = require ('./routers/AttributRouter');
const profilerUrl = require ('./routers/ProfilerRouter');
const serieUrl = require ('./routers/SerieRouter');
const verUrl = require ('./routers/VerRouter');
const DevisUrl = require ('./routers/DevisRouter');
const fileUpload = require ('express-fileupload');

dotenv.config ();

const app = express ();

app.use (
  fileUpload ({
    useTempFiles: true,
  })
);

mongoose.connect (process.env.GA_DataBase, () =>
  console.log ('connected to article database')
);

app.use (express.json ());
app.use (cors ());
app.use ('/app', require('./routers/upload'));
app.use('/app', require('./routers/userRouter'));
app.use ('/app', ArticleUrl);
app.use ('/app', sousArticleUrl);
app.use ('/app', serieUrl);
app.use ('/app', attributUrl);
app.use ('/app', profilerUrl);
app.use ('/app', verUrl);
app.use ('/app', DevisUrl);
app.listen (4000, () => console.log ('server is up and running'));
