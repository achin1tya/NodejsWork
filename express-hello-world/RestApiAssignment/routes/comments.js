


let store = {
    posts: [
      {name: 'Top 10 ES6 Features every Web Developer must know',
      url: 'https://webapplog.com/es6',
      text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
      comments: [
        { text: 'Cruel…..var { house, mouse} = No type optimization at all'},
        { text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
        { text: '(p1,p2)=>{ … } ,i understand this ,thank you !' }     
      ]
      }
    ]
  }
  
// module.exports = {
//     getComments(req, res) {
//         let id=req.params.postId
//         res.status(201).send(store.posts[id].comments)
//     }, 

//     addComment(req, res) {
//         var commentToAdd=req.body
//         var postIdCurrent=req.params.postId
//         var id=store.posts[postIdCurrent].comments.length
//         store.posts[postIdCurrent].comment.push(req.body)
//         res.status(201).send({id:id})
//     },

//     updateComment(req, res) {
//         var commentToUpdate=req.params.commentId
//         var postIdCurrent=req.params.postId
//         var id=store.posts[postIdCurrent].comments.length
//         var newComment=req.body
//         store.posts[postIdCurrent].comments[commentToUpdate]=newComment
//         res.status(204).send()
//     },

//     removeComment(req, res) {
//         var commentToDeleteId=req.params.commentId
//         var postIdCurrent=req.params.postId
//         var post=store.posts[postIdCurrent]
//         id(!post)
//         {
//             return res.status(401).send(`Post with post id ${postIdCurrent} Does not exist`)
//         }
//         var comment=store.posts[postIdCurrent].comments[commentToDeleteId]
//         if(!comment)
//         {
//             return res.status(401).send(`comment with comment id ${commentToDeleteId} Does not exist`)
//         }
//         store.posts[postIdCurrent].comments.splice(commentToDeleteId,1)
//         res.status(203).send("Deleted commemnt")
//     }  
    
// }

module.exports = {
    getComments(req, res) {
      res.status(200).send(req.store.posts[req.params.postId].comments)
    }, 
    addComment(req, res) {
      let newComment = req.body
      let comments = req.store.posts[req.params.postId].comments
      let commentId = comments.length
      comments.push(newComment)
      res.status(201).send({commentId: commentId})
    },
    updateComment(req, res) {
      req.store.posts[req.params.postId].comments[req.params.commentId] = Object.assign(req.store.posts[req.params.postId].comments[req.params.commentId], req.body)
      res.status(200).send(req.store.posts[req.params.postId].comments[req.params.commentId])  
    },
    removeComment(req, res) {
      req.store.posts[req.params.postId].comments.splice(req.params.commentId, 1)
      res.status(204).send()
    }  
  }