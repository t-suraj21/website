// Handle navigation bar toggle
let menutoggle = document.querySelector('.menutoggle');
let Navbar = document.querySelector('.Navbar');

menutoggle.onclick = function() {
    Navbar.classList.toggle('active');
}

let list = document.querySelectorAll('.list');

function activelink() {
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
}

list.forEach((item) => item.addEventListener('click', activelink));

// Profile Edit Section
document.getElementById('editProfileBtn').addEventListener('click', editProfile);
document.getElementById('saveProfileBtn').addEventListener('click', saveProfile);

function editProfile() {
    document.getElementById('editSection').style.display = 'block';
    document.getElementById('saveProfileBtn').style.display = 'inline-block';
    document.getElementById('editProfileBtn').style.display = 'none';

    // Fill the input fields with current values
    document.getElementById('editName').value = document.getElementById('profileName').textContent;
    document.getElementById('editBio').value = document.getElementById('profileBio').textContent;
}

function saveProfile() {
    let newName = document.getElementById('editName').value;
    let newBio = document.getElementById('editBio').value;
    const newPic = document.getElementById('changePic').files[0];

    // Update profile information
    document.getElementById('profileName').textContent = newName;
    document.getElementById('profileBio').textContent = newBio;

    // If there's a new profile picture, update it
    if (newPic) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePic').src = e.target.result;
        };
        reader.readAsDataURL(newPic);
    }
    // function saveData() {
    //     localStorage.setItem("data", document.getElementById('profileContent').innerHTML);
    // }
    
    // function showPost() {
    //     document.getElementById('profileContent').innerHTML = localStorage.getItem("data");
    // }
    
    // Hide edit section and show buttons accordingly
    document.getElementById('editSection').style.display = 'none';
    document.getElementById('saveProfileBtn').style.display = 'none';
    document.getElementById('editProfileBtn').style.display = 'inline-block';
}
save()


// Open post creation box
document.getElementById('postButton').addEventListener('click', function() {
    document.getElementById('postBox').style.display = 'block';
});

// Postsubmit post functionality
document.getElementById('Postsubmit').addEventListener('click', function() {
    const Textpost = document.getElementById('Textpost').value;
    const ImagePost = document.getElementById('ImagePost').files[0];

    if (!Textpost && !ImagePost) {
        alert("Please add some text or an image to your post.");
        return;
    }

    // Handle image reading asynchronously, or if no image, create post directly
    if (ImagePost) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            // Create and save the post after the image is loaded
            Postprocess(Textpost, imageData);
        };
        reader.readAsDataURL(ImagePost);
    } else {
        // No image, process post directly
        Postprocess(Textpost, null);
    }

    // Hide the post box after submission
    document.getElementById('postBox').style.display = 'none';
});

// Process post creation and save to localStorage
function Postprocess(Textpost, imageData) {

    // Create a new post div
    const newPostDiv = createNewPost(Textpost, imageData);

    // Display the post in the posted content section
    document.getElementById('postedContent').appendChild(newPostDiv);


    // Store the post in localStorage
    // localStorage.setItem(Textpost, imageData);
    // function saveData(){
    //     localStorage.setItem("data", postBox.innerHtml)
    // }
    // function showPost(){
    //     postBox.innerHTML=localStorage.getItem("data");
    // }

    // Clear post input fields after Postsubmitting

    document.getElementById('Textpost').value = '';
    document.getElementById('ImagePost').value = '';
}

// Create new post element

function createNewPost(Textpost, ImagePost) {
    const newPostDiv = document.createElement('div');
    newPostDiv.classList.add('post');

    // Add text to post if available

    if (Textpost) {
        const TextpostElem = document.createElement('p');
        TextpostElem.textContent = Textpost;
        newPostDiv.appendChild(TextpostElem);
    }

    // Add image to post if available

    if (ImagePost) {
        const ImagePostElem = document.createElement('img');
        ImagePostElem.src = ImagePost;
        newPostDiv.appendChild(ImagePostElem);
    }

    return newPostDiv;
}

// Save post to localStorage

function savePostToLocalStorage(Textpost, ImagePost) {
    const posts = JSON.parse(localStorage.getItem('userPosts')) || [];
    posts.push({ text: Textpost, image: ImagePost });
    localStorage.setItem('userPosts', JSON.stringify(posts));
}

// Load and display stored posts on page load

window.addEventListener('load', function() {
    const storedPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
    const postContentDiv = document.getElementById('postedContent');
    
    storedPosts.forEach(post => {
        const newPostDiv = document.createElement('div');
        newPostDiv.classList.add('post');

        if (post.text) {
            const TextpostElem = document.createElement('p');
            TextpostElem.textContent = post.text;
            newPostDiv.appendChild(TextpostElem);
        }

        if (post.image) {
            const ImagePostElem = document.createElement('img');
            ImagePostElem.src = post.image;
            newPostDiv.appendChild(ImagePostElem);
        }

        postContentDiv.appendChild(newPostDiv);
    });
});
