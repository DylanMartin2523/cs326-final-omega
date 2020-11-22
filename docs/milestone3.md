# Milestone 3
## Database
Users Users {
    _id: <ObjectId1>,
    name: String, // Username of user
    pass: String, // Password of user
    salt: String // Salt used for password
}

Posts Comments {
    _id: <ObjectId1>,
    id: String, // Commenter UserID
    body: String, // Body of comment
    resTo: String, // Comment id of parent comment '0' if no parent
    postId: String // id of the post
}

Posts Posts {
    _id: <ObjectId1>,
    userid: String, // Userid of poster
    body: String, // Body of post
    title: String // title of post
}

Feedback Feedback{
    _id: <ObjectID1>,
    id: String, //feedback id
    feed: String //The feedback body
}


## Divison of labor
Dylan: Fourm implementation

Robin: "Data" page implementation

Brent: Feedback Page implementation

## Link to app
https://global-warming-cs326.herokuapp.com/
