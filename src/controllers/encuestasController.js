const controllerEncuestas = {};

controllerEncuestas.add = (req, res) => {          
    req.getConnection((err, conn) =>{  
        conn.query("SELECT * FROM tipo_pregunta", (err, rows) =>{
            conn.query('SELECT * FROM poblacion',(err,po) =>{
                console.log(po)
                res.render('preguntas',{
                    tipos:rows,
                    poblaciones:po
                });
            })
            
        });    
    });
}
controllerEncuestas.elim = (req, res) => {
    req.getConnection((err, conn) => {
        const {id} = req.params;
        conn.query('DELETE FROM encuesta WHERE id_encuesta = ?', [id], (err, rows) =>{
            res.redirect('/inicio');
        })
    })
}
controllerEncuestas.edit = (req, res) => {
    req.getConnection((err, conn) => {
        const {id} = req.params;
        const newData = req.body;
        conn.query('UPDATE encuesta set ? WHERE id_encuesta = ?', [newData,id], (err, rows) =>{
            res.redirect('/inicio');
        })
    })
}

controllerEncuestas.pub = (req, res) => {
    var indice=0;
    const data = req.body;
    req.getConnection((err, conn) => {
        console.log(data)
        conn.query('INSERT INTO encuesta (nombre,objetivo,fecha_creación,fecha_publicacion,fecha_cierre,población) values ("'+data.titulo+'","'+data.descripcion+'","'+data.fecha_hoy+'","'+data.fecha_ini+'","'+data.fecha_fin+'","'+data.poblacion+'")', (errO, rows) =>{})
        
        if(data.cantidadpreguntas.length==1){    
        conn.query('SELECT id_encuesta FROM encuesta WHERE nombre="'+data.titulo+'"', (error, id) =>{
               
                conn.query('INSERT INTO pregunta (descripcion,obligatoriedad,tipo,encuesta) values ("'+data.pregunta+'","'+1+'","'+data.tipo+'","'+id[0].id_encuesta+'")', (err, rows) =>{})
                      conn.query("SELECT id_pregunta FROM pregunta WHERE descripcion='"+data.pregunta+"'", (er, idp) =>{
                        console.log(parseInt(data.cantidadesopciones))
                        for(let o=0;o<parseInt(data.cantidadesopciones);o++){
                            req.getConnection((err, cox) => {
                                console.log(o)
                            console.log(data.opciones[o])
                            cox.query('INSERT INTO opcion (descripcion,pregunta) values ("'+data.opciones[o]+'","'+idp[0].id_pregunta+'")', (err, rows) =>{
                                
                            
                            })
                            })
                            
                        }if (err) {
                            res.json(err);}
                          else{res.redirect('/inicio');}
                    })
                
               })}
                else{for(let i=0;i<data.pregunta.length;++i){
                    
                    conn.query('SELECT id_encuesta FROM encuesta WHERE nombre="'+data.titulo+'"', (error, id) =>{
                    
                    conn.query('INSERT INTO pregunta (descripcion,obligatoriedad,tipo,encuesta) values ("'+data.pregunta[i]+'","'+1+'","'+data.tipo[i]+'","'+id[0].id_encuesta+'")', (err, rows) =>{})
                         
                    conn.query("SELECT id_pregunta FROM pregunta WHERE descripcion='"+data.pregunta[i]+"'", (er, idp) =>{
                        console.log(i)
                        console.log(data.cantidadesopciones[i])
                        if(parseInt(data.tipo[i])!=3){
                            for(let o=0;o<parseInt(data.cantidadesopciones[i]);++o){
                                //console.log(data.opciones[o])
                                //console.log(idp[0].id_pregunta)
                                    conn.query('INSERT INTO opcion (descripcion,pregunta) values ("'+data.opciones[indice]+'","'+idp[0].id_pregunta+'")', (err, rows) =>{
                                        
                                    })
                                    indice+=1
                                }
                        }
                            
                        })
                    
                    })}if (err) {
                        res.json(err);}
                      else{res.redirect('/inicio');}
            }
                
                
            
        
        conn.query('SELECT * PREGUNTAS', (errO, rows) =>{})
    })
}

controllerEncuestas.ver =  (req, res) => {

    req.getConnection((error, conn) =>{
        const {id} = req.params;
        conn.query('SELECT e.id_encuesta,e.nombre,e.fecha_cierre,e.fecha_creación,e.fecha_publicacion,e.objetivo,p.nombre as "poblacion" FROM encuesta e join poblacion p on p.id_poblacion=e.población where id_encuesta=?',[id], (err, rows) =>{
            conn.query('SELECT p.id_pregunta,p.descripcion,p.tipo,o.descripcion as "opcion" from pregunta p join opcion o on p.id_pregunta=o.pregunta where p.encuesta=?',[id], (err, opc) =>{
                conn.query('SELECT p.id_pregunta,p.descripcion,p.tipo,t.descripcion as "tipopreg" from pregunta p join tipo_pregunta t on p.tipo=t.id_tipo_pregunta where encuesta=?',[id], (err, preg) =>{
                if (err) {
                res.json(err);
            } else {
                
                    res.render('verencuesta', {
                        encuesta:rows,
                        preguntas:preg,
                        opciones:opc
                    })
                
                //console.log(rows);
                
            }
        })})
        })
    })
};

controllerEncuestas.llenar =  (req, res) => {

    req.getConnection((error, conn) =>{
        const {id} = req.params;
        conn.query('SELECT e.id_encuesta,e.nombre,e.fecha_cierre,e.fecha_creación,e.fecha_publicacion,e.objetivo,p.nombre as "poblacion" FROM encuesta e join poblacion p on p.id_poblacion=e.población where id_encuesta=?',[id], (err, rows) =>{
            conn.query('SELECT o.id_opcion,p.id_pregunta,p.descripcion,p.tipo,o.descripcion as "opcion" from pregunta p join opcion o on p.id_pregunta=o.pregunta where p.encuesta=?',[id], (err, opc) =>{
                conn.query('SELECT p.id_pregunta,p.descripcion,p.tipo,t.descripcion as "tipopreg" from pregunta p join tipo_pregunta t on p.tipo=t.id_tipo_pregunta where encuesta=?',[id], (err, preg) =>{
                if (err) {
                res.json(err);
            } else {
                
                
                    res.render('responderencuesta', {
                        encuesta:rows,
                        preguntas:preg,
                        opciones:opc
                    }) 
                
            }
        })})
        })
    })
};

controllerEncuestas.enviar =  (req, res) => {
    const data = req.body
    console.log(data)
    req.getConnection((error, conn) =>{
        conn.query('INSERT INTO encuesta_contestada (fecha_contestada,id_encuesta,encuestado) values ("'+data.fecha_hoy+'","'+data.id_encuesta+'","miltonjesusvc@ufps.edu.co")', (err, rows) =>{
            conn.query('SELECT id_resp_enc FROM encuesta_contestada WHERE id_encuesta='+data.id_encuesta+' AND '+'encuestado="miltonjesusvc@ufps.edu.co"', (error, id) =>{
                let x=0;
                for(let i=0;i<data.P.length;i=i+3){
                    
                    conn.query('INSERT INTO pregunta_contestada (resp_enc,id_pregunta) values ("'+id[0].id_resp_enc+'","'+data.P[i]+'")', (err, rows) =>{
                        
                        conn.query('SELECT id_pregunta_contestada FROM pregunta_contestada WHERE resp_enc='+id[0].id_resp_enc+' AND id_pregunta='+data.P[i], (error, id2) =>{
                            if (err) 
                            res.json(err);
                                
                                if(data.P[i+1]=='Abierta'){
                                    conn.query('INSERT INTO opcion_respuesta (pregunta_contestada,descripcion_Abierta) values ("'+id2[0].id_pregunta_contestada+'","'+data.O[x]+'")', (err, rows) =>{
                                    })
                                    x=x+1;
                                    }else{
                                    conn.query('INSERT INTO opcion_respuesta (pregunta_contestada,id_opcion) values ("'+id2[0].id_pregunta_contestada+'","'+data.O[x]+'")', (err, rows) =>{
                                        
                                    })
                                    x=x+1;
                                }
                            
                        })
                    })
                    
                }
            })
        })
    })

};

function crear(){
    const formulario = new URLSearchParams('')
    return formulario.get('');
}

module.exports = controllerEncuestas;
` for(let o=0;o<data.i.length;++o){
    conn.query('INSERT INTO opcion (descripcion,pregunta) values ("'+data.i[o]+'","'+idp[0].id_pregunta+'")', (err, rows) =>{
        if (err) {
            res.json(err);}
          else{res.redirect('/inicio');}
    })
}`