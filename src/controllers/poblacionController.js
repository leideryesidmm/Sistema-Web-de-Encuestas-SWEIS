const controller = {};

controller.list =  (req, res) => {
    req.getConnection((error, conn) =>{
        
        conn.query('SELECT * FROM poblacion', (err, po) =>{
            conn.query('SELECT * FROM poblacion p join encuestado e on id_poblacion=e.poblacion', (err, en) =>{
                
                res.render('poblacion', {
                    poblaciones:po,
                    encuestados: en
                })
        })
    })
        
    })
};
controller.save = (req, res) => {
    const data = req.body;
    let correos=data.correos.split(",");
    let tamanio=correos.length
    console.log(correos)
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO poblacion (nombre,tamanio) values ("'+data.nombre+'",'+tamanio+')', (err, rows) =>{
            conn.query('SELECT id_poblacion FROM poblacion WHERE nombre="'+data.nombre+'"', (err, id) =>{
                console.log(id[0].id_poblacion)
                for(let i=0;i<correos.length;++i){
                    conn.query('INSERT INTO encuestado (correo_electronico, poblacion) values ("'+correos[i]+'",'+id[0].id_poblacion+')', [data], (err, rows) =>{
                        if (err) {
                            res.json(err);}
                    })
                }
                


                if (err) {
                    res.json(err);}
                  else{res.redirect('/poblacion');}
            })
        })
    })
}

controller.edit = (req, res) => {
    const data = req.body;
    let correos=data.correos.split(",");
    let tamanio=correos.length
    console.log(data)
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM encuestado WHERE poblacion = ?',data.id, (err, rows) =>{
            conn.query('SELECT id_poblacion FROM poblacion WHERE nombre="'+data.nombre+'"', (err, id) =>{
                console.log(id[0].id_poblacion)
                for(let i=0;i<correos.length;++i){
                    conn.query('INSERT INTO encuestado (correo_electronico, poblacion) values ("'+correos[i]+'",'+id[0].id_poblacion+')', [data], (err, rows) =>{
                        if (err) {
                            res.json(err);}
                    })
                }
                


                if (err) {
                    res.json(err);}
                  else{res.redirect('/poblacion');}
            })
        })
    })
}



controller.ini =  (req, res) => {
    const data = req.body;
    req.getConnection((error, conn) =>{
        conn.query('SELECT * FROM administrador', (err, rows) =>{
            if (err) {
                res.json(err);
            } else {
                
                    res.render('inicio', {
                        data,
                        administrador:rows
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