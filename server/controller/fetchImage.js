import Helper from '../Helper';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';


export const fetchImage = (req,res) => {
    console.log('id', req.params.id)
    const imageid = parseInt(req.params.id);
    Helper.executeQuery('SELECT * FROM BASE_ITEM WHERE itemid = $1', [imageid])
    .then(result => {
        
        if(result.rowCount > 0){
            const imagepath = result.rows[0].imagepath;
            const filePath = path.join(__dirname, '..','asset', 'Images', imagepath.split('/')[3])
            console.log('dir', filePath);
            console.log('image path', imagepath);
            const stat = fs.statSync(filePath);
            
            // res.writeHead(200, {
            //     'Content-Type': `image/${imagepath.split('/')[3].split('.')[1]}`, 
            //     'Content-Length': stat.size
            // });
            
            const readStream = fs.createReadStream(filePath);
            // readStream.on('data', function(data) {
            //     res.write(data);
            // });
            
            // readStream.on('end', function() {
            //     res.end();        
            // });
            try{
                readStream.on('open', function () {
                    res.writeHead(200, {
                    'Content-Type': `image/${imagepath.split('/')[3].split('.')[1]}`, 
                    'Content-Length': stat.size
                    });
                    //res.set('Content-Type',`image/${imagepath.split('/')[3].split('.')[1]}`, 'Content-Length', stat.size );
                    //res.write(data);
                    readStream.pipe(res);
                });
                readStream.on('error', function () {
                    res.set('Content-Type', 'text/plain');
                    res.status(404).end('Not found');
                });
            }
            catch (err){
                console.log('error')
            }
            
        }else{
            res.statusCode = 404;
            res.setHeader('content-type', 'application/json');
            res.json({
                message: `file not found`
            })
        }
    })
    .catch(err => {
        res.statusCode = 500;
        res.setHeader('content-type', 'application/json');
        res.json({
            message: `server error`,
            err
        })
    })
}