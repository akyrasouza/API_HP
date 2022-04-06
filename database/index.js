const mongoose = require('mongoose');

async function main(){
    await mongoose.connect(process.env.DATABASE_URI)
}

main()
.then(()=> console.log("Conectado ao Banco!"))
.catch(()=> console.log("Deu erro!"));

module.exports = mongoose;