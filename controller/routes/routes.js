const { Router } = require('express')
const router = Router();
const Users = require('../../models/Users');
const bcrypt = require('bcryptjs')
// const passport = require('passport');
// const api = require('../service/api');
const axios  = require('axios');
//Routes
router.get('/', (req, res) => {
  res.redirect('/login')
})

router.get('/login', (req, res) => {
  res.render('formlogin')
})

router.post('/login', (req, res, next) => {
  Users.findOne({ where: {
    username: req.body.username
  }}).then((user) => {
    if (!user) {
      req.flash('error_msg','Não Possui usuário cadastrado')
      res.redirect('/login');
   } else {
     bcrypt.compare(req.body.pass, user.password, (err, result) => {
      if (result == true) {
        
        // Users.findByPk({where: {
        //   username: req.body.username}
        //   }).then((user) => {
        //     user.lastLogin = Date.now();

        //     Users.save()
        //   })
        res.redirect('/home');
    } else {
     req.flash('error_msg','Usuario não cadastrado');
     res.redirect('/');
    }
     })
   }
  })

})


router.get('/cadastro', (req, res) => {
  res.render('formcad')
})

router.post('/cadastro/novo', (req, res) => {

  var errors = []

  if(!req.body.username || typeof req.body.username == undefined || req.body.username == null){
    errors.push({text: "Nome de usuário Inválido"})
  }
  
  if(!req.body.pass || typeof req.body.pass == undefined || req.body.pass == null){
    errors.push({text: "Senha Inválida ou em branco"})
  }
  
  if(!req.body.passConfirm || typeof req.body.passConfirm == undefined || req.body.passConfirm == null){
    errors.push({text: "Confirmação de senha em branco ou inválida"})
  }

  if(req.body.pass.lenth > 12){
    errors.push({text: 'Senha muito grande, máximo de 12 caracters'})
  }
  
  if(req.body.passConfirm.lenth > 12){
    errors.push({text: 'Confirmaçõa de senha muito grande, máximo de 12 caracters'})
  }

  if(req.body.pass != req.body.passConfirm){
    errors.push({text: 'As senhas são diferentes'})
  }
  
  if(errors.length > 0){
    res.render('formcad', {errors: errors})
  }else{  
      const usernew = {
        username: req.body.username,
        password: req.body.passConfirm
      }

      bcrypt.genSalt(2, (erro,salt) => {
        bcrypt.hash(usernew.password, salt, (erro, hash) => {
          if(erro){
            console.log('houve um erro durante o salvamento')
          }

          usernew.password = hash

          Users.create(
            usernew
          ).then(() => {
            res.redirect('/login')
          }).catch((err) => {
            res.send('Houve um erro ao criar o usuário!' + err)
          })
        })
      })     
    }  
})

router.get('/home', (req, res) => {
  res.render('index')
})

router.post('/home', async (req, res) => {
  const reques = req.body.emailGit
  await axios.get(`https://api.github.com/users/${reques}`)
  .then((response) => {
    
    const data = response.data;
    res.render('index', {user: data} )
    // console.log(data)
  }).catch((err) => {
    req.flash('error_msg', 'Usuario não encontrado')
    res.redirect('/home')
  })
  
 
})


module.exports = router;
