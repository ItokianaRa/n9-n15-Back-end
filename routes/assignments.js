let Assignment = require('../model/assignment');
let Utilisateur = require('../model/utilisateur');
let Matiere = require('../model/matiere');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}

function getAssignments(req, res) {
    var condition = {};
    /* if(req.query.rendu=="true"){
        Object.assign(condition,{rendu : true});
    }
    if(req.query.rendu=="false"){
        Object.assign( condition,{rendu : false});
    } */
    if(req.query.name!=null && req.query.prenom!=null && req.query.status!=null){
        if(req.query.status==="professeur"){
            Object.assign(condition,{professeur : req.query.prenom+' '+req.query.name});
            if(req.query.rendu=="true"){
                Object.assign(condition,{rendu : true});
            }
            if(req.query.rendu=="false"){
                Object.assign( condition,{rendu : false});
            }
        }
        else if(req.query.status==="etudiant"){
            Object.assign(condition,{auteur : req.query.prenom+' '+req.query.name});
            if(req.query.rendu=="true"){
                Object.assign(condition,{rendu : true});
            }
            if(req.query.rendu=="false"){
                Object.assign( condition,{rendu : false});
            }
        }
    }
    console.log("looool"+condition);
    var aggregateQuery = Assignment.aggregate(
        [ { $match : condition } ] 
    );
    Assignment.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10
      },
      (err, assignments) => {
        if (err) {
          res.send(err);
        }
        res.send(assignments);
      }
    );
   }

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.auteur = req.body.auteur;
    assignment.matiere = req.body.matiere;
    assignment.note = req.body.note;
    assignment.remarque = req.body.remarque;
    assignment.professeur = req.body.professeur;
    assignment.image = req.body.image;
    assignment.imageprof = req.body.imageprof;


    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved depuis la version HEROKU!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: `${assignment.nom} updated!`})
        }

      // console.log('updated ', assignment)
    });

}

// Update d'un assignment note et rendu (PUT)
function setNote(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.updateOne({id: req.body.id}, {rendu: req.body.rendu, note: req.body.note}, (err, assignment) => {
        console.log(req.body.id);
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: `${assignment.nom} updated!`})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}

// Récupérer un utilisateur par son login et mot de passe (POST)
function getUtilisateur(req, res){
    let login = req.body.login;
    let mdp = req.body.mdp;
    console.log("login = " + login + " mdp = " + mdp);

    Utilisateur.findOne({login: login}, (err, utilisateur) =>{
        if(err){res.send(err)}
        res.json(utilisateur);
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment, getUtilisateur, setNote };
