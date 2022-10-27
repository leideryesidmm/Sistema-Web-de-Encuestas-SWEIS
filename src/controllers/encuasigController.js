const controller = {};
controller.ini =  (req, res) => {

    req.getConnection((error, conn) =>{
        const {id}=req.params;
        conn.query('SELECT poblacion FROM encuestado where correo_electronico=?',[id], (err, rows) =>{
            
            
            if (err) {
                res.json(err);
            } else {
                    console.log("pasooooooooooooooo")                
                    res.render('encuestasasignadas', {
                        encuestas:rows
                    })
                
                //console.log(rows);
                
            }
        })
    })
};
module.exports = controller;