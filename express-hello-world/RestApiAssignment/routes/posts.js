
let store = {
    posts: [
      {name: 'Top 10 ES6 Features every Web Developer must know',
      url: 'https://webapplog.com/es6',
      text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
      comments: [
        {text: 'Cruel…..var { house, mouse} = No type optimization at all'},
        {text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
        {text: '(p1,p2)=>{ … } ,i understand this ,thank you !'}      
      ]
      }
    ]
  }
  

// //Routes for server.js
// module.exports={
//     getPosts(req, res) {
//         res.status(201).send(store.posts)
//     },
//     addPost(req, res) {
//         let newPost=req.body
//         let id=req.store.post.length
//         store.posts.push(newPost)
//         res.status(201).send({id:id})
//     },
//     updatePost(req, res) {
//         var idToChange=req.params.postId
//         var post=store.posts[idToChange]
//         if(!post)
//         {
//             return res.status(404).send(`Post with id ${idToChange} does not exist`)
//         }
//         store.posts[idToChange]=req.body
//         res.status(201).send(store.posts[idToChange])
//     },
//     deletePost(req, res) {
//         var idToDelete=req.params.id
//         var post=store.posts[idToChange]
//         if(!post)
//         {
//             return res.status(404).send(`Post with id ${idToDelete} does not exist`)
//         }
//         store.posts.splice(idToDelete,1)
//         res.status(201).send(store.post)
//     }
// }

module.exports = {
    getPosts(req, res) {
      res.status(200).send(req.store.posts)
    },
    addPost(req, res) {
      let newPost = req.body
      let postId = req.store.posts.length
      store.posts.push(newPost)
      res.status(201).send({postId: postId})
    },
    updatePost(req, res) {
      req.store.posts[req.params.postId] = Object.assign(req.store.posts[req.params.postId], req.body)
      res.status(200).send(req.store.posts[req.params.postId])  
    },
    removePost(req, res) {
      req.store.posts.splice(req.params.postId, 1)
      res.status(204).send()
    }
  }