const controller = {};

controller.mostrar =  (req, res) => {
    req.getConnection((error, conn) =>{
        conn.query('', (err, rows) =>{
                //console.log(rows);
                res.render('index', {
                })
        })
    })
};

controller.se =  (req, res) => {
    const data = req.body;
    req.getConnection((error, conn) =>{
        conn.query('Select * from administrador', (err, rows) =>{

            if(data.correo.toString()==rows[0].correo&&data.contrasena.toString()==rows[0].contrasena){
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
            }else{
                res.render('index', {
                })
            }
                //console.log(rows);
                
        })
    })
};

controller.ini =  (req, res) => {
    const data = req.body;
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

controller.verificar = (req, res) => {
    const data = req.body;
    //console.log(data);
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM administrador', (err, rows) =>{
            
            res.redirect('/');
        })
    })
}

controller.edit = (req, res) =>{
    const {id} = req.params;
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM usuario WHERE id_Usuario = ?', [id], (err, rows) =>{
            
            res.render('users_edit', {
                data: rows[0]
            });
        });
    });
}

controller.update = (req, res) =>{
    const {id} = req.params;
    const newData = req.body;
    req.getConnection((err, conn) =>{
        conn.query('UPDATE usuario set ? WHERE id_Usuario = ?', [newData, id], (err, rows) =>{
            res.redirect('/');
        })
    });
}

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        const {id} = req.params;
        conn.query('DELETE FROM usuario WHERE id_Usuario = ?', [id], (err, rows) =>{
            res.redirect('/');
        })
    })
}

module.exports = controller;