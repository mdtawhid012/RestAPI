document.getElementById("fetch-posts").addEventListener("click", () => {
    const postContainer = document.getElementById("post-container");
    const postDetailsContainer = document.getElementById("post-details");
    postContainer.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(posts => {
            fetch("https://jsonplaceholder.typicode.com/users")
                .then(response => response.json())
                .then(users => {
                    const usersMap = {};
                    users.forEach(user => {
                        usersMap[user.id] = user;
                    });

                    posts.forEach(post => {
                        const postElement = document.createElement("div");
                        postElement.className = "post";
                        postElement.innerHTML = `
                            <div class="post-title">${post.title}</div>
                            <div class="post-user">Posted by: ${usersMap[post.userId].name} (${usersMap[post.userId].email})</div>
                        `;
                        postElement.addEventListener("click", () => {
                            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
                                .then(response => response.json())
                                .then(comments => {
                                    postDetailsContainer.innerHTML = `
                                        <h2>${post.title}</h2>
                                        <p>${post.body}</p>
                                        <p>Posted by: ${usersMap[post.userId].name} (${usersMap[post.userId].email})</p>
                                        <h3>Comments</h3>
                                        ${comments.map(comment => `
                                            <div class="comment">
                                                <p><strong>${comment.name} (${comment.email})</strong></p>
                                                <p>${comment.body}</p>
                                            </div>
                                        `).join('')}
                                    `;
                                });
                        });
                        postContainer.appendChild(postElement);
                    });
                });
        });
});
