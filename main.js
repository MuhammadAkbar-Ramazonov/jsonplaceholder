const usersList = document.querySelector(".users-list-js");
const elTemp = document.querySelector(".users-temp").content;

const postList = document.querySelector(".posts-list");
const elPostTemp = document.querySelector(".post-temp").content;

const commentsList = document.querySelector(".comments-list");
const elCommentsTemp = document.querySelector(".comments-temp").content;

function renderUsers(data, node){
    node.innerHTML = "";
    data.forEach(element => {
        const elTempClone = elTemp.cloneNode(true);
        
        elTempClone.querySelector(".users-item").dataset.id = element.id;
        elTempClone.querySelector(".users-id").textContent = element.id;
        elTempClone.querySelector(".users-title").textContent = element.username;
        elTempClone.querySelector(".users-name").textContent = element.name;
        elTempClone.querySelector(".users-gmail").href = `mailto:${element.email}`;
        elTempClone.querySelector(".users-gmail").textContent = element.email;
        elTempClone.querySelector(".users-location").textContent = "Goe Location"
        elTempClone.querySelector(".users-phone").href = `tel:+${element.phone.split(" x")[0]}`;
        elTempClone.querySelector(".users-phone").textContent = "Phone Number";
        elTempClone.querySelector(".users-site").href = element.website;
        elTempClone.querySelector(".users-site").textContent = element.website;
        elTempClone.querySelector(".users-company").textContent = element.company.name;
        elTempClone.querySelector(".users-desc").textContent = element.company.catchPhrase;
        elTempClone.querySelector(".users-desc-second").textContent = element.company.bs;
        
        node.appendChild(elTempClone);
    });
    
}

function renderPost(data, node, id){
    node.innerHTML = ""
    
    data.forEach(element => {
        if (element.userId == id) {
            const elTempPostClone = elPostTemp.cloneNode(true);
            
            elTempPostClone.querySelector(".post-item").dataset.id = element.id;
            elTempPostClone.querySelector(".post-id").textContent = element.id;
            elTempPostClone.querySelector(".post-title").textContent = element.title;
            elTempPostClone.querySelector(".post-desc").textContent = element.body;
            
            node.appendChild(elTempPostClone);
        }
    })
}

function renderComments(data, node, id){
    node.innerHTML = ""
    console.log(data);
    data.forEach(element => {
        if (element.postId == id) {
            const elTempCommentsClone = elCommentsTemp.cloneNode(true);
            
            elTempCommentsClone.querySelector(".comments-id").textContent = element.id;
            elTempCommentsClone.querySelector(".comments-title").textContent = element.name;
            elTempCommentsClone.querySelector(".comments-gmail").textContent = `from: ${element.email}`;
            elTempCommentsClone.querySelector(".comments-gmail").href = `mailto${element.email}`;
            elTempCommentsClone.querySelector(".comments-desc").textContent = element.body;
            
            node.appendChild(elTempCommentsClone);
        }
    })
}

async function getUsers(url, render = renderUsers, node = usersList, id){
    try {
        const res = await fetch(url);
        const data = await res.json();
        
        render(data, node, id);
    } catch (error) {
        console.log(error);
    }
}

getUsers("https://jsonplaceholder.typicode.com/users");

usersList.addEventListener("click", evt=> {
    evt.preventDefault();
    if (evt.target.matches(".users-item")) {
        const eldatasetid = evt.target.dataset.id
        getUsers("https://jsonplaceholder.typicode.com/posts/", renderPost, postList, eldatasetid);
    }
})

postList.addEventListener("click", evt =>{
    evt.preventDefault();
    console.log(evt.target);
    if (evt.target.matches(".post-item")) {
        const eldatasetid = evt.target.dataset.id
        getUsers("https://jsonplaceholder.typicode.com/comments", renderComments, commentsList, eldatasetid);
    }    
})