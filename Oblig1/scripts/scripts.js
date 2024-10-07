let page = 1;

function loadPosts() {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
        .then(response => response.json())
        .then(json => {
            const postContainer = document.getElementById('post-container');
            let row;
            json.forEach((post, index) => {
                if (index % 3 === 0) {
                    row = document.createElement('div');
                    row.className = 'row';
                    postContainer.appendChild(row);
                }
                row.innerHTML += `<div class="post"><h2>${post.title}</h2><p>${post.body} ${post.id}</p></div>`;
            });
            page++;
            // Check if document height is still less than viewport height
            if (document.documentElement.scrollHeight <= window.innerHeight) {
                loadPosts();
            }
            if(page >= 10){
                page = 1;
            }
        });
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log('Scroll event fired', scrollTop, scrollHeight, clientHeight);
    if (scrollTop + clientHeight >= scrollHeight - 15) {
        console.log('Loading more posts');
        loadPosts();
    }
});

// Load initial posts
loadPosts();