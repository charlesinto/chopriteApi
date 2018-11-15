import Helper from '../Helper';
import bcrypt from 'bcrypt';

export const fetchStockItems = (req,res) => {
    Helper.executeQuery('SELECT * FROM BASE_ITEM')
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json')
        res.json({
            message: 'opertaion successful',
            items: result.rows
        })
    })
    .catch(err => {
        res.statusCode = 404;
        res.setHeader('content-type', 'application/json')
        res.json({
            message: 'could not load data',
            err
        })
    }) 
}