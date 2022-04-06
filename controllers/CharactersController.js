
const Character = require('../models/Character')

class CharacterController {

    //GET
    static async paginaPersonagens(req, res){

        const characters = await Character.find();//faz pesquisa e traz tudo da Coleção (Schema)
        
        if(characters.length === 0){
            return res.status(404).send({message: "Não existem personagens cadastrados!"})
        }
        res.send(characters.filter(Boolean))
    }

    //GETBYID
    static async paginaPersonagensId(req, res) {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){//Verifica se 'id' é válido
            res.status(400).send({message: "Id inválido!"})
            return
        }
    
        const character = await Character.findById(id)//pesquisa na Coleção pelo 'id' e retorna o resultado
    
        if(!character){
            res.status(404).send({message: "Personagem não encontrado!"})
            return
        }
        res.send(character);
    }

    //POST
    static async paginaPersonagensAdd(req, res){
        const {name, species, house, actor} = req.body;

        if(!name || ! species || !house || !actor){
            res.status(400).send({message: "Você não enviou todos os dados necessários para o cadastro"});
            return;
        }
    
        //Criação do Novo Documento na Coleção (Schema)
        const character = await new Character({
            name, 
            species, 
            house,
             actor,
        })   
        await character.save()//salvando no Banco de Dados   
        res.send({message: "Personagem criado com sucesso!"})
    }

    //PUT
    static async paginaPersonagensEditar(req, res){
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){//Verifica se 'id' é válido
            res.status(400).send({message: "Id inválido!"})
            return
        }
    
        const character = await Character.findById(id)//pesquisa na Coleção pelo 'id' e retorna o resultado
    
        if(!character){
            res.status(404).send({message: "Personagem não encontrado!"})
            return
        }
    
        const {name, species, house, actor} = req.body;
    
        if(!name || ! species || !house || !actor){
            res.status(400).send({message: "Você não enviou todos os dados necessários para a atualização"});
            return;
        }
    
        character.name = name;
        character.species= species;
        character.house = house;
        character.actor = actor;
    
        await character.save();
    
        res.send({message: `Personagem atualizado com sucesso! ${character}`});
    }

    //DELETE
    static async paginaPersonagensDeletar(req, res){
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){//Verifica se 'id' é válido
            res.status(400).send({message: "Id inválido!"})
            return
        }
    
        const character = await Character.findById(id);
    
        if(!character){
            return  res.status(404).send({message: "Personagem não existe!"})
        }
    
        await character.remove();
    
        res.send({message: "Personagem Deletado com sucesso!"})
    }
}

module.exports = CharacterController;
