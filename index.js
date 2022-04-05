const express = require('express');
const mongoose = require('mongoose');
const Character = require("./models/Character")
const app = express();

//Conexão com Banco de Dados
try{
    mongoose.connect(
        "mongodb+srv://root:admin-hp@cluster0.eld6e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
    console.log("Banco de dados conectado!");
}catch (err) {
    console.log(`Erro ao conectar no Banco de dados ${err}`)
}

//Transformando a resposta para o servidor em json()
app.use(express.json());


//Simula o Banco de Dados
/*const characters = [
    {
        id: 1,
        name: "Harry Potter",
        spacies: "human",
        house: "Gryffindor",
        actor: "Daniel Redcliffe"
    },
    {
        id: 2,
        name: "Hermione Granger",
        spacies: "human",
        house: "Gryffindor",
        actor: "Emma Watson"
    },
]
*/

// -- Rotas --

//GET - READ
app.get('/',(req, res) => {
  res.send(characters.filter(Boolean))
})

//POST - CREATE
app.post("/character", async (req,res) =>{
    const {name, species, house, actor} = req.body;

    if(!name || ! species || !house || !actor){
        res.status(400).send({message: "Você não enviou todos os dados necessários para o cadastro"});
        return;
    }

    //Criação do Novo Documento na Coleção (Schema)
    const character = await new Character({
        name, species, house, actor,
    })

    await character.save()//salvando no Banco de Dados

    res.send({message: "Personagem criado com sucesso!"})
});

//GetByID - Pegar o Personagem pelo ID
app.get("/character/:id", (req,res) =>{
    const id = +req.params.id;//'+' transforma o que vier da requisição em número.

    //pesquisa no array o character(personagem) que tem o mesmo id que veio da requisição e retorna todo o objeto
    const character = characters.find(item => item.id === id);

    if(!character){
        res.status(404).send({message: "Personagem não existe!"})
        return
    }
    res.send(character)
})

//PUT - UPDATE
app.put("/character/:id", (req,res)=>{
    const id = +req.params.id;
    const character = characters.find((item) => item.id === id);

    if(!character){
        res.status(404).send({message: "Personagem não exite!"});
        return
    }
    //Foma Comum
    // const newCharacter = req.body;
    // character.name = newCharacter.name;
    // character.spacies = newCharacter.spacies;
    // character.house = newCharacter.house;
    // character.actor = newCharacter.actor;

    //Usando Destructuring (Desconstrução)
    const {name, spacies, house, actor} = req.body;

    character.name = name;
    character.spacies = spacies;
    character.house = house;
    character.actor = actor;

    res.send(character);
});

//DELETE - DELETE
app.delete("/character/:id", (req,res) => {
    const id = +req.params.id;
    const character = characters.find((item) => item.id === id);

    if(!character){
        res.status(404).send({message: "Personagem não exite!"});
        return
    }

    //Buscando o 'character' (personagem) pelo index (posição no Array)
    const indexCharacter = characters.indexOf(character);
    delete characters[indexCharacter];

    res.send({message: "Personagem Deletado com sucesso!"})
})



app.listen(3000, () => {
    console.log("Servidor rodando em: http://localhost:3000")
})