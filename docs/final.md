# Omega
## Fall 2020
## Overview

## Team Members
Dylan Martin: DylanMartin2523

## User Interface
### Persistent Side Bar
This is the side bar that enables navigation between the different sections of the website. The current section the user is on is bolded.

### Forum:
#### forum.html
The forum page consists of a a main forum area which displays all of the posts people have made. Each post container includes a button that takes the user to the comments section
of the corresponding forum post. There is also a button that allows the user to create a new post.
![](ForumPageSS.png)
#### forum-comments.html
This page accessible by clicking on a comments button from the main forum page. This page contains the post, its body and the comments users have left on the post. There is a button that allows the user to create a top level comment on the post. There is also a small reply button on each comment that allows the user to make a nested reply to a comment. The user has to press a submit button to post a nested comment.
To the right of the page is a button that will take the user back to the main forum page. In the bottom right the user is able to delete the post provided that they are signed in as the user who made the post.
![](ForumCommentsSS.png)
#### createComment.html
This page contains a text box and a submit comment button. The text box is to record the user's comment and the submit comment button adds the comment as a top level comment on 
on the post.

![](CreateCommentSS.png)
#### createPost.html
This page contains two text boxes and a submit post button. The text boxes record the title and the body of the post. The submit post button allows the user to send their post to the main forum page.
![](CreatePostSS.png)
### Account:
#### login.html
This page has two sections. The first section allows the user to make a new account as long as the username is unique. This side has two text boxes, one for username and one for password as well as a button that allows the user to create an account. The second section allows the user to sign in providing their credentials are correct. This section has the same layout as the first section except for a 'Login' button instead of a 'Create Comment' button.
![](LoginSS.png)
## APIs
#### /createUser
Attempts to add user. Either responds with 'Username Taken' if the attempted username is taken or returns a userid that the user uses for authentication in other parts of the site.
#### /login
Checks if the provided credentials are valid and if they are it returns a userid that the user uses for authentication in other parts of the site. Otherwise sends back 'Username Invalid'.
#### /createComment
Sends comment data to database.
#### /createPost
Sends post data to the database.
#### /users
Returns database collection of users which includes userids, hashed passwords and salt.
#### /forum
Returns database collection of all posts. 
#### /deletePost?id={postid}
Removes post from database with id of postid.
#### /forum-comments?id={postid}
Returns forum post data which includes the post title and body and all comments.

## Database
Users Users { _id: , name: String, // Username of user pass: String, // Password of user salt: String // Salt used for password }

Posts Comments { _id: , id: String, // Commenter UserID body: String, // Body of comment resTo: String, // Comment id of parent comment '0' if no parent postId: String // id of the post }

Posts Posts { _id: , userid: String, // Userid of poster body: String, // Body of post title: String // title of post }

Feedback Feedback{ _id: , id: String, //feedback id feed: String //The feedback body }
## URL Routes/Mappings

## Authentication/Authorization
This site uses mongodb so the password for database access is saved in the mongodb environment variables. When the user creates an account their password is salted and hashed using minicrypt. The hash and salt are then stored in the user data in the database. To authenticate a user when the user logs in the provided password is checked against the hash on the database. The server returns an id that is then saved in the localStorage so the user can be authorized for actions later.  
## Division of Labor

## Conclusion
