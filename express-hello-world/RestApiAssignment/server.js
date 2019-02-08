// //imports
// const express=require('express')
// const bodyParser=require('body-parser')
// const logger=require('morgan')
// const errorHandler=require('errorhandler')
// const importPostMethods=require('./routes/posts.js')
// const importCommetMethods=require('./routes/comments.js')

// //Structure
// // let store={}
// // store.posts=[{}]
// // store.posts.comments[{}]

// let store = {
//         posts: [
//           {name: 'Top 10 ES6 Features every Web Developer must know',
//           url: 'https://webapplog.com/es6',
//           text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
//           comments: [
//             {text : 'Cruel…..var { house, mouse} = No type optimization at all'},
//             {text : 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
//             {text : '(p1,p2)=>{ … } ,i understand this ,thank you !' } 

//           ]
//           }
//         ]
//       }
      

// //instantiation
// const app =express()

// //middleware
// // app.use(logger(dev))
// app.use(errorHandler())



// //route
// app.get("/post",importPostMethods.getPosts)

// app.post("/post",importPostMethods.addPost)

// //
// app.put("/post/:postId",importPostMethods.updatePost)

// app.delete("/post/:postId",importPostMethods.deletePost)

// //
// app.get("/post/:postId/comments",importCommetMethods.getComments)
// app.post("/post/:postId/comments",importCommetMethods.addComment)
// app.put("post/:postId/comments/:commentId",importCommetMethods.updateComment)
// app.put("post/:postId/comments/:commetId",importCommetMethods.removeComment)

// app.listen(3000)


const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const routesForPosts = require('./routes/posts.js')
const routesForComments=require('./routes/comments.js')

let store = {
  posts: [
    {name: 'Top 10 ES6 Features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: 'This essay will give you a quick introduction to ES6. If you donâ€™t know what is ES6, itâ€™s a new JavaScript implementation.',
    comments: [
      {text: 'Cruel¦ ..var { house, mouse} = No type optimization at all'},
      {text: 'I think youâ€™re undervaluing the benefit of â€˜letâ€™ and â€˜constâ€™.'},
      {text: '(p1,p2)=>{ â€¦ } ,i understand this ,thank you !'} 
    ]
  }
]
}


let app = express()

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
app.use((req, res, next) => {
  req.store = store
  next()
})

app.get('/posts', routesForPosts.getPosts)
app.post('/posts', routesForPosts.addPost)
app.put('/posts/:postId', routesForPosts.updatePost)
app.delete('/posts/:postId', routesForPosts.removePost)

app.get('/posts/:postId/comments', routesForComments.getComments)
app.post('/posts/:postId/comments', routesForComments.addComment)
app.put('/posts/:postId/comments/:commentId', routesForComments.updateComment)
app.delete('/posts/:postId/comments/:commentId', routesForComments.removeComment)


app.listen(3000)
