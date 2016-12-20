/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   20-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 20-12-2016
*/

export class Routes{

  static ROUTES:any[] = [{
        post: [
          {url:'/api/todos', db: 'todos'}
        ],
        put: [
          {url:'/api/todos/:id', db: 'todos'}
        ],
        delete: [
          {url:'/api/todos/:id', db: 'todos'}
        ],
        get: [
          {url:'/api/todos', db: 'todos'},
          {url:'/api/todos/:id', db: 'todos'}
        ]
      }];

  constructor(){
  }

  static loadRoute(app,db, objID){
      return Routes.ROUTES.forEach((route)=>{

        /// Query $_GET
        if(route.get){
          route.get.forEach((get)=>{
              // Define $route
              app.get(get.url, (req, res)=> {
                console.log('Query: $_GET ', get.url)
                console.log('Request params-> ', req.params)

                // connect to $db
                if(req.params._id){
                   // Query with $params :id => return item by :id
                   db.collection(get.db).findOne({ _id: new objID(req.params.id) }, (err, doc)=> {
                     if (err) {
                       //this.handleError(res, err.message, "Failed to get todo by _id");
                       console.log(res, err.message, "Failed to get item by :id");
                     } else {
                       res.status(200).json(doc);
                     }
                   });
                }
                else {
                  // Simple Query without $params => return $array[items, items]
                  db.collection(get.db).find({}).toArray((err, docs)=> {
                    if (err) {
                      console.log(res, err.message, "Failed to get items");
                    } else {
                      res.status(201).json(docs);
                    }
                  });
                }


              });
          })
        }

        /// Query $_POST
        if(route.post){
          route.get.forEach((post)=>{
            // Define $route
            app.post(post.url, (req, res)=> {
              console.log('Query: $_POST ', post.url)
              console.log('Request params-> ', req.params)
              // formate item
              let newTodo = {
                description: req.body.description,
                isComplete: false
              }
              // connect to $db
              db.collection(post.db).insertOne(newTodo, (err, doc)=> {
                if (err) {
                  //this.handleError(res, err.message, "Failed to add todo");
                } else {
                  res.status(201).json(doc.ops[0]);
                  //this.reader(res.status(201) ,doc.ops[0])
                }
              });

            });
          })
        }

        // /// Query $_PUT
        if(route.put){
          route.put.forEach((put)=>{
             app.put(put.url, (req, res)=> {
               console.log('Query: $_PUT ', put.url)
               console.log('Request params-> ', req.params)
               let updateTodo = req.body;
               delete updateTodo._id;
               console.log('Update data-> ', updateTodo)

               db.collection(put.db).updateOne({_id: new objID(req.params.id)}, updateTodo, (err, doc)=> {
                 if (err) {
                   //this.handleError(res, err.message, "Failed to update todo");
                 } else {
                   res.status(204).end();
                 }
               });
             });
          })
        }
        //
        // /// Query $_DELETE
        if(route.delete){
          route.delete.forEach((del)=>{
             app.delete(del.url, (req, res)=> {
               console.log('Query: $_DELETE ', del.url)
               console.log('Request params-> ', req.params)
               db.collection(del.db).deleteOne({_id: new objID(req.params.id)}, (err, result)=> {
                 if (err) {
                   //this.handleError(res, err.message, "Failed to delete todo");
                 } else {
                   res.status(204).end();
                 }
               });
             });
          })
        }

      })
  }

  //
  // static URL:any[] = [
  //         {
  //           url: '/api/todos',
  //           methode: ['get'],
  //           dbName: 'todos'
  //         },
  //         {
  //           url: '/api/todos/:id',
  //           methode: [ 'get'],
  //           dbName: 'todos'
  //         }
  //     ];
  //
  // static rteManager(app,db){
  //   return Routes.URL.forEach((path)=>{
  //
  //     app.route(path.url)
  //       path.methode.forEach((meth)=>{
  //         if(meth === 'post'){
  //           app[meth]((req, res)=> {
  //             res.send('Get a random book');
  //           })
  //         }
  //         if(meth === 'put'){
  //           app[meth]((req, res)=> {
  //             res.send('Get a random book');
  //           })
  //         }
  //         if(meth === 'delete'){
  //           app[meth]((req, res)=> {
  //             res.send('Get a random book');
  //           })
  //         }
  //         if(meth === 'get'){  console.log('path.url-> ', path.dbName)
  //           app[meth]((req, res)=> {
  //             db.collection(path.dbName).find({}).toArray((err, docs)=> {
  //
  //
  //               if (err) {
  //                 console.log(res, err.message, "Failed to get items");
  //               } else {
  //                 res.status(201).json(docs);
  //
  //               }
  //             });
  //             //res.send('Get a random book');
  //           })
  //         }
  //       })
  //
  //   })


    // app.route('/book')
    //   .get(function(req, res) {
    //     res.send('Get a random book');
    //   })
    //   .post(function(req, res) {
    //     res.send('Add a book');
    //   })
    //   .put(function(req, res) {
    //     res.send('Update the book');
    //   });
  //}
}
