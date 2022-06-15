const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');

router.post('/Home', auth, postCtrl.createPost);
router.get('/Home', postCtrl.findAllPosts);
router.delete('/Profil', auth, postCtrl.deletePost);

module.exports = router;