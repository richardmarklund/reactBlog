import moment from "moment";

let blogposts = [{
    date: moment().format("yyyy-MM-DD"),
    title: "test Title",
    content: "wtf content"
},
{
    date: moment().format("yyyy-MM-DD"),
    title: "test Title 2",
    content: "wtf content 2wtf content 2wtf content 2wtf content 2wtf content RÖÖÖVEN \n 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2wtf content 2"
}];

function getBlogPosts() {
    return blogposts
}

function addBlogPost(post) {
    blogposts.unshift(post)
}
  
export { getBlogPosts, addBlogPost };