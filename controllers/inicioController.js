var autenticado=req.isAuthenticated()
    if(autenticado){

        const controller = {};
        controller.ini =  (req, res) => {
        
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
            })
        };
        module.exports = controller;

}else{
        res.redirect('/')
}
