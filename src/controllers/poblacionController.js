const controller = {};

const bcrypt = require('bcryptjs');

controller.list =  (req, res) => {
    req.getConnection((error, conn) =>{
        
        conn.query('SELECT * FROM poblacion', (err, po) =>{
            conn.query('SELECT * FROM poblacion p join encuestado_poblacion ep on p.id_poblacion=ep.id_poblacion', (err, en) =>{
                
                res.render('poblacion', {
                    poblaciones:po,
                    encuestados: en,
                    menssage:null
                })
        })
    })
        
    })
};
controller.save = (req, res) => {
    const data = req.body;
    let correos=data.correos.split(",");
    let tamanio=correos.length
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO poblacion (nombre,tamanio) values ("'+data.nombre+'",'+tamanio+')', (err, rows) =>{
            conn.query('SELECT id_poblacion FROM poblacion WHERE nombre="'+data.nombre+'"', (err, id) =>{
                for(let i=0;i<correos.length;++i){
                    //var contra=encriptar(generarContraseña(correos[i]));
                    var contra=encriptar('contraseña');
                    conn.query('INSERT INTO encuestado (correo_electronico,contrasena) values ("'+correos[i]+'","'+contra+'")', [data], (err, rows) =>{
                    })
                    conn.query('SELECT * FROM encuestado_poblacion', (err, respuesta) =>{
                        if(!estaEncuestado(correos[i], id[0].id_poblacion, respuesta)){
                            console.log(estaEncuestado(correos[i], id[0].id_poblacion, respuesta))
                            conn.query('INSERT INTO encuestado_poblacion (encuestado,id_poblacion) values ("'+correos[i]+'",'+id[0].id_poblacion+')', [data], (err, rows) =>{
                                if (err) {
                                    res.json(err);}
                            })
                        }
                    })
                    
                }
                


                if (err) {
                    res.json(err);}
                  else{
                    conn.query('SELECT * FROM poblacion', (err, po) =>{
                        conn.query('SELECT * FROM poblacion p join encuestado_poblacion ep on p.id_poblacion=ep.id_poblacion', (err, en) =>{
                            req.flash('info','Se ha registrado correctamente la poblacion '+data.nombre)
                    res.render('poblacion',{
                        menssage: req.flash('info'),
                        poblaciones:po,
                                encuestados: en
                    });
                    })
                })
                    }
            })
        })
    })
}

function generarContraseña(correo){
    const caracteres=4;
    let contrasenia = ""
    for(let i=0;i<caracteres;i++){
        contrasenia+=correo[Math.floor(Math.random()*correo.length)]+Math.floor(Math.random()*9)
    }
    return contrasenia;
}
function encriptar(contrasenia){
    var salt=bcrypt.genSaltSync(12);
    var password=bcrypt.hashSync(contrasenia,salt)
    return password;
}

function estaEncuestado(correo, poblacion, correos){
    let esta=false
    for(let i=0;i<correos.length;i++){
        if(correos[i].encuestado==correo&&correos[i].id_poblacion==poblacion){
            esta=true
        }
    }
    return esta
}

controller.edit = (req, res) => {
    const data = req.body;
    let correos=data.correos.split(",");
    let tamanio=correos.length
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM encuestado_poblacion WHERE id_poblacion = ?',data.id, (err, rows) =>{
            conn.query('SELECT id_poblacion FROM poblacion WHERE nombre="'+data.nombre+'"', (err, id) =>{
                for(let i=0;i<correos.length;++i){
                    conn.query('INSERT INTO encuestado (correo_electronico) values ("'+correos[i]+'")', [data], (err, rows) =>{
                    })
                    conn.query('INSERT INTO encuestado_poblacion (encuestado,id_poblacion) values ("'+correos[i]+'",'+id[0].id_poblacion+')', [data], (err, rows) =>{
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