let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UtilisateurSchema = Schema({
    id: Number,
    login: String,
    nom: String,
    prenom: String,
    motdepasse: String,
    status: String
});


// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('utilisateurs', UtilisateurSchema);

