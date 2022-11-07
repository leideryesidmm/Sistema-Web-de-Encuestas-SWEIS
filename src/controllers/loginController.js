const controller = {};



controller.mostrar =  (req, res) => {
  //  var autenticado=req.isAuthenticated()
    //if(autenticado){
        
        req.getConnection((error, conn) =>{
            conn.query('', (err, rows) =>{
                    res.render('index', {
                        Message:req.flash('auth')
                    })
            })
        })
//}else{
  //      res.redirect('/')
//}
    
};


controller.se =  (req, res) => {
    console.log("pasa")
    var autenticado=req.isAuthenticated()
    try {
        var type=req.user.type;
    } catch (error) {
        res.redirect('/')
    }
    
    if(autenticado&&type==1){
       
        
//            const data = req.body;
        req.getConnection((error, conn) =>{
//            conn.query('Select * from administrador', (err, rows) =>{
    
//            if(data.correo.toString()==rows[0].correo&&data.contrasena.toString()==rows[0].contrasena4){
                    conn.query('SELECT * FROM encuesta', (err, rows) =>{
                        if (err) {
                            res.json(err);
                        } else {
                            res.render('inicio', {
                                encuestas:rows,
                                email: req.user.email
                            })
                            
                        }
                    })
//                }else{
//                  res.render('index', {
//                   })
//                }
                    
//            })
        })
        
        
}else{
        if(autenticado)
           req.flash('auth','Tipo de usuario incorrecto, ingrese como encuestado')
        res.redirect('/')
}
    
};


controller.se2 =  (req, res) => {
    var autenticado=req.isAuthenticated()
    try {
        var type=req.user.type;
    } catch (error) {
        res.redirect('/')
    }

    if(autenticado&&type==0){

    var email=req.user.email
    console.log(email)
    const data = req.body;
    var paso=false;
    req.getConnection((error, conn) =>{
    conn.query('Select * from encuestado', (err, resul) =>{
        for(let c =0; c<resul.length;c++){
            //if(data.correo.toString()==resul[c].correo_electronico&&data.contrasena.toString()==resul[c].contrasena){
            paso=true;
                conn.query('SELECT ep.id_poblacion FROM encuestado e join encuestado_poblacion ep on e.correo_electronico=ep.encuestado where e.correo_electronico="'+email+'"', (err, rows) =>{
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
                    conn.query('Select * from (SELECT * from encuesta where población='+s+') z where z.id_encuesta not in (SELECT ec.id_encuesta as id_encuesta from encuesta_contestada ec where ec.encuestado="'+email+'") and z.id_encuesta in (SELECT id_encuesta from encuesta where fecha_cierre >="'+getFechaHoy()+'"and fecha_publicacion <="'+getFechaHoy()+'")', (err, enc) =>{
                        
                        if (err) {
                            res.json(err);
                        } else {
                                res.render('encuestasasignadas', {
                                    encuestas: enc,
                                    correo:email,
                                    autenticado:autenticado
                                })
                               
                        } 
                    })
                    
                    
                    
                })
                break;
  //        }else{
    //      if(c+1==resul.length){
        //    res.render('index', {
      //      })
      //    }}

        }
        
        
        })
    });}else{
        if(autenticado)
           req.flash('auth','Tipo de usuario incorrecto, ingrese como administrador')
        res.redirect('/')
    }
};

controller.ini =  (req, res) => {
    var autenticado=req.isAuthenticated()
    if(autenticado){
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
}else{
        res.redirect('/')
}
    
};

function getFechaHoy(){
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    console.log(today)

    return today
}

controller.verificar = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM administrador', (err, rows) =>{
            
            res.redirect('/');
        })
    })
}

controller.edit = (req, res) =>{
    var autenticado=req.isAuthenticated()
    if(autenticado){
        const {id} = req.params;
        req.getConnection((err, conn) =>{
            conn.query('SELECT * FROM usuario WHERE id_Usuario = ?', [id], (err, rows) =>{
                
                res.render('users_edit', {
                    data: rows[0]
                });
            });
        });
}else{
        res.redirect('/')
}
    
}

controller.update = (req, res) =>{
    var autenticado=req.isAuthenticated()
    if(autenticado){
        const {id} = req.params;
        const newData = req.body;
        req.getConnection((err, conn) =>{
            conn.query('UPDATE usuario set ? WHERE id_Usuario = ?', [newData, id], (err, rows) =>{
                res.redirect('/');
            })
        });
}else{
        res.redirect('/')
}
   
}

controller.delete = (req, res) => {
    var autenticado=req.isAuthenticated()
    if(autenticado){
        req.getConnection((err, conn) => {
            const {id} = req.params;
            conn.query('DELETE FROM usuario WHERE id_Usuario = ?', [id], (err, rows) =>{
                res.redirect('/');
            })
        })
}else{
        res.redirect('/')
}
    
}

module.exports = controller;