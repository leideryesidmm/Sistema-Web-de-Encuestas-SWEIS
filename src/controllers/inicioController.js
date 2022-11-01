const controller = {};
    controller.ini =  (req, res) => {
            var autenticado=req.isAuthenticated()
            if(autenticado){
        
                req.getConnection((error, conn) =>{
                    conn.query('SELECT * FROM encuesta', (err, rows) =>{
                        if (err) {
                            res.json(err);
                        } else {
                            
                            
                                res.render('inicio', {
                                    encuestas:rows
                                })
                            
                            //console.log(rows);
                            
                        }
                    })
                })        }else{
                res.redirect('/')
        }
           
        };
        module.exports = controller;
