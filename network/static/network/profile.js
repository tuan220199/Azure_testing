document.addEventListener("DOMContentLoaded", function(){
    
});


// Function to show all the post by Java Script language 
function all_post(){
    
    // Retrieve all the posts from all users
    fetch('/all_post')
    .then(response => response.json())
    .then(posts => {
        posts.forEach(function(post){
            
             // Retrieve all the vaiable in url JSON
            const owner = post["owner"];
            const content = post["content"];
            const timestamp = post["timestamp"];
            const likes = post["likes"];
            const number_of_likes = likes.length;
            
            // Creae element for each post
            const post_element = document.createElement('div');
            post_element.className ="card";

            // Retrieve user name of current user from HTML file
            const current_user_name = JSON.parse(document.getElementById('user_name').textContent);
            
            // Cretae element for the heading with user name 
            const owner_header_post_element = document.createElement('div');
            owner_header_post_element.className = "card-header";

            // Check wheter the owner of post is current user or not
            if (current_user_name === owner)
            {
                owner_header_post_element.innerHTML =`${owner}`;
            }

            // If not create Follow/Unfollow button 
            else
            {
                owner_header_post_element.innerHTML =`
                ${owner}`;
                const follow_button = document.createElement("button");
                follow_button.className = "btn btn-primary";

                //  Retrieve list of following users by current user by from HTML file
                const list_following_of_owner = JSON.parse(document.getElementById('list_following_of_owner').textContent);
                let list_following_of_owner_username = [];
                for (let i=0;i<list_following_of_owner.length;i++)
                {
                    list_following_of_owner_username.push(list_following_of_owner[i]);
                } 
                // Check if the owner of this post in the list of follwing users of the owner
                if (list_following_of_owner_username.includes(owner))
                {
                    
                    follow_button.innerHTML = "Unfollow";
                    follow_button.addEventListener("click", function() {
                        fetch(`/follower/${owner}/`, {
                            method: "DELETE"
                        })
                        .then(() => {
                            console.log("Delete succesfully");
                            follow_button.innerHTML ="Follow";
                        });
                    });
                }
                else
                {
                    follow_button.innerHTML = "Follow";
                    follow_button.addEventListener("click", function() {
                    
                    });
                }
                
                owner_header_post_element.appendChild(follow_button);
            }
            
            post_element.appendChild(owner_header_post_element);

            const body_post_element = document.createElement('div');
            body_post_element.className = "card-body";

            const content_post_element = document.createElement('div');
            content_post_element.className = "card-text";
            content_post_element.innerHTML = `
            ${content}
            <br>
            ${timestamp}
            <br>
            Number of likes: ${number_of_likes}
            `;
            body_post_element.appendChild(content_post_element);

            post_element.appendChild(body_post_element);

            document.querySelector("#all_posts").append(post_element);
        });
    });
}



