import crawler from './crawler';
import logger from 'morgan';
import express from "express";

const app = express();
app.use(logger('dev'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('⚡️ Listening on port:', PORT);
    console.log(`http://localhost:${PORT}`);
});


app.get('/:id', async (req, res) => {
    const heroId = req.params.id;

    crawler(parseInt(heroId))
        .then((data: any) => {
            res.status(200).send(data);
        })
        .catch((err: any) => {
            res.status(500).send(err);
        });

});
