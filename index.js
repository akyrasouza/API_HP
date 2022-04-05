const express = require('express')
const app = express()

//Transformando a resposta para o servidor em json()
app.use(express.json())

// -- Rotas --

//Vai Simular o Banco de Dados
const characters = [
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

//GET - READ
app.get('/',(req, res) => {
  res.send(characters.filter(Boolean))
})

//POST - CREATE
app.post("/character", (req,res) =>{
    const character = req.body;

    character.id = characters.length + 1;// criando propriedade 'id'
    characters.push(character);

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