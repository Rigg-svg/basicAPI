const  express = require("express"); //importar la libreria de express
const mysql = require("mysql") //Instancia de la libreria de Mysql

const app = express();//Instancia de la libreria express(crear app express)

let conexion = mysql.createConnection({ //Conexión a la base datos
    host : "localhost",
    database: "inserttest",
    user: "root",
    password: ""
})

app.set("view engine", "ejs"); //llamar el motor de plantillas (ejs)

//información que viene desde la pagina
app.use(express.json()); //permite trabajar con archivos tipo Json
app.use(express.urlencoded({extended:false}));//permite decodificar el que viene de la plantilla

app.get("/", function(req, res){ //solicutd get para pedir datos al servidor
    res.render("login");  //renderizar la plantilla. 
})

app.post("/validar", function(req, res){ //solicitud post para enviar datos al servidor 
    const data = req.body; //req.body = recibe toda la informacion que hay dentro de las etiqueta body

    const name = data.Name;
    const lastName = data.LastName;

    let query = "INSERT INTO Users_info (Name, LastName) VALUES ('"+name+"', '"+lastName+"')"; //crear una consulta SQL

    conexion.query(query, function(error){ //EL metodo Query se usa para aplicar la consulta
        if(error){
            throw error;
        }
        else{
            console.log("logIn Susefully");
        }
    })
})

app.listen(3000, function(){
    console.log("Servidor creado http://localhost:3000");
});
