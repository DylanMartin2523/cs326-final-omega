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





## Divison of labor
Dylan: Fourm implementation 
