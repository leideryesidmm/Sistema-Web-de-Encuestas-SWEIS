const controller = {};

controller.mostrar =  (req, res) => {
    req.getConnection((error, conn) =>{
        conn.query('', (err, rows) =>{
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
                        
                    }
                })
            }else{
                res.render('index', {
                })
            }
                
        })
    })
};


controller.se2 =  (req, res) => {
    const data = req.body;
    var paso=false;
    req.getConnection((error, conn) =>{
    conn.query('Select * from encuestado', (err, resul) =>{
        for(let c =0; c<resul.length;c++){
            if(data.correo.toString()==resul[c].correo_electronico&&data.contrasena.toString()==resul[c].contrasena){
            paso=true;
                conn.query('SELECT ep.id_poblacion FROM encuestado e join encuestado_poblacion ep on e.correo_electronico=ep.encuestado where e.correo_electronico="'+data.correo+'"', (err, rows) =>{
                        var s='';
                        console.log(rows)
                    for(let i =0; i<rows.length;i++){
                        if(i+1==rows.length){
                            s+='"'+rows[i].id_poblacion+'"';
                        }else{
                            s+='"'+rows[i].id_poblacion+'" or población=';
                        }
                    }
                    console.log(s)
                    conn.query('SELECT * FROM encuesta where población='+s, (err, enc) =>{
                        
                        if (err) {
                            res.json(err);
                        } else {
                                res.render('encuestasasignadas', {
                                    encuestas: enc,
                                    correo:data.correo.toString()
                                })
                               
                        } 
                    })
                    
                    
                    
                })
                break;
          }else{
          if(c+1==resul.length){
            res.render('index', {
            })
          }}

        }
        
        
        })
    });
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
                
                
            }
        })
    })
};

controller.verificar = (req, res) => {
    const data = req.body;
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