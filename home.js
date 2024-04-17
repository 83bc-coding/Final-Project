// scroll in pagination of posts
// function scrollingHandler() {
//   const endOfPage =window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

//   console.log(endOfPage);
// };
let currentPage = 1;
let lastPage = 1;
window.addEventListener("scroll", function () {
  const endOfPage =
    window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
  console.log(currentPage, lastPage);
  if (endOfPage && currentPage < lastPage) {
    currentPage = currentPage + 1;
    GETPOSTS(false, currentPage);
  }
  console.log(endOfPage);
});

// To remove the event listener

function showSucsseAlert() {
  const alertPlaceholder = document.getElementById("success-alert");
  const appendAlert = (message, type) => {
    const wrapper = (document.getElementById("wapp").innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">,
     <div>${message}</div>,
     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>,
  </div>`,
    ].join(""));

    alertPlaceholder.append(wrapper);
  };

  const alertTrigger = document.getElementById("liveAlertBtn");
  if (alertTrigger) {
    alertTrigger.addEventListener("click", () => {
      appendAlert("Nice, you triggered this alert message!", "success");
    });
  }
}

const alert = bootstrap.Alert.getOrCreateInstance("#success-alert");

alert.close();

function GETPOSTS(reload = true, page = 1) {
  toggleLoader(true)
  axios.get(` ${baseUrl}/posts?limit=10&page=${page}`).then((response) => {
    toggleLoader(false)
    const posts = response.data.data;
    lastPage = 4;

    if (reload == true) {
      document.getElementById("posts").innerHTML = "";
    }
    // document.getElementById("posts").innerHTML = " "

    // show or hidezz

    for (post of posts) {
      let user = getCurrentUser();
      let isMyPost = user != null && post.author.id == user.id;
      let editBtnContent = ``;
      let deletBtnContent = ``;

      if (isMyPost) {
        editBtnContent = `<button class=' btn btn-secondary' style="float:right;" onclick="editPostBtnClicked('${encodeURIComponent(
          JSON.stringify(post)
        )}')"   >edit</button>`;

        deletBtnContent = `<button type="button" class="btn btn-outline-danger"  style="float:right; height:35px; margin-right:3px; width:64px" onclick="deletBtnContent('${encodeURIComponent(
          JSON.stringify(post)
        )}')">Delet</button>
        `;
      }

      let content = `  <div class="card shadow ">
                            <div class="card-header">
                            <img src=${post.author.profile_image} alt="" class="rounded-circle border border-2" width="40px" height="40px ">
                            <span> <b> ${post.author.username} 
</b></span>
${editBtnContent}
${deletBtnContent}
                            </div>

                             <div class="card-body" onclick="posttClicked(${post.id})" style="    cursor: pointer;
">
                            <img src="${post.image}" alt="" class="w-100">
                            <h6 style="color: rgb(146, 145, 145); font-size: smaller;" class="mt-1">
                            
                                ${post.created_at}
                            </h6>
                            <h5 >
                                ${post.title}
                            </h5>
                            <p style="font-size: 15px;">
                                ${post.body}
                            </p>
                            <hr>
                            <div class="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                  </svg>
                                <span>
                                    (${post.comments_count}) comment
                                    <span id="post-tags${post.id}">
                                  
                                    </span>
                                </span>

                            </div>
                            </div>
                        </div>
                        `;

      document.getElementById("posts").innerHTML += content;
      const currentposttagid = `post-tags${post.id}`;
      document.getElementById(currentposttagid).innerHTML = "";
      for (tag of post.tags) {
        console.log(tag.name);
        let content = `
  <button type="button" class="btn btn-secondary btn-sm" disabled>${tag.name}</button>

  `;
      }
    }
  });
}
GETPOSTS();

//modal for register

document
  .getElementById("closseBtnClicked")
  .addEventListener("click", function loginBtnClcked() {
    $("#modalContactForm").modal("hide");
  });

 

  function NewPost() {
    let postId = document.getElementById("post-id-input").value;
    let isCreate = postId == null || postId == "";
    console.log(postId);

    const b = document.getElementById("post-body-input").value;
    const t = document.getElementById("title-post-input").value;
    const imge = document.getElementById("img-post-input").files[0];
    let formData = new FormData();
    formData.append("body", b);
    formData.append("title", t);
    formData.append("image", imge);

    // const pp ={
    // "body": b ,

    // "title": t ,

    // }
    let urll = ``;
    const tt = localStorage.getItem("token");
    const h = {
      "Content-Type": `multipart/form-data`,
      authorization: `Bearer ${tt}`,
    };

    if (isCreate == true) {
      urll = `https://tarmeezacademy.com/api/v1/posts`;
      axios
        .post(urll, formData, {
          headers: h,
        })
        .then((responce) => {
          $("#addpost").modal("hide");
          location.reload();
          start();
          GETPOSTS();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      formData.append("_method", "put");
      urll = `https://tarmeezacademy.com/api/v1/posts/${postId}`;
      axios
        .post(urll, formData, {
          headers: h,
        })
        .then((responce) => {
          $("#addpost").modal("hide");
          location.reload();
          start();

          GETPOSTS();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
;
setUpUi();

function createAlert(message) {
  var alert = document.createElement("div");
  alert.setAttribute("class", "alert alert-danger alert-dismissible fade show");
  alert.setAttribute("role", "alert");
  alert.innerHTML = message;
  setTimeout(function () {
    $(alert)
      .fadeTo(500, 0)
      .slideUp(500, function () {
        $(this).remove();
      });
  }, 8000);
  document.getElementById("modalBody").appendChild(alert);
}

// function getCurrentUserٌُRegister() {
//   let user1 = null;
//   const storageUser = localStorage.getItem("user")
//   if (storageUser != null)
//    {
//     user1 = JSON.parse(storageUser)
//   }
//   return user13
// }

function posttClicked(postId) {
  console.log(postId);
  window.location = `postDetails.html?postId=${postId}`;
}

function editPostBtnClicked(postObject) {
  let post = JSON.parse(decodeURIComponent(postObject));
  console.log(post);
  document.getElementById("post-id-input").value = post.id;
  document.getElementById("post-modal-title").innerHTML = "Edit Post";
  document.getElementById("creat-post").innerHTML = "Update";
  document.getElementById("title-post-input").value = post.title;
  document.getElementById("post-body-input").value = post.body;

  let postModal = new bootstrap.Modal(document.getElementById("addpost"), {});
  postModal.toggle();
}
function createPostBtnClicked() {
  document.getElementById("post-modal-title").innerHTML = "Create Post";
  document.getElementById("creat-post").innerHTML = "Create";
  let postModal = new bootstrap.Modal(document.getElementById("addpost"), {});
  postModal.toggle();
}

function deletBtnContent(postObject) {
  let post = JSON.parse(decodeURIComponent(postObject));
  let postId = (document.getElementById("post-id-input").value = post.id);
  let postModal = new bootstrap.Modal(document.getElementById("deletMess"), {});
  postModal.toggle();
}
function Deleteed() {
  const tt = localStorage.getItem("token");
  const h = {
    "Content-Type": `multipart/form-data`,
    authorization: `Bearer ${tt}`,
  };

  let postid = document.getElementById("post-id-input").value;
  axios
    .delete(`https://tarmeezacademy.com/api/v1/posts/${postid}`, {
      headers: h,
    })
    .then((responce) => {
      $("#deletMess").modal("hide");
      modalDeleted()

      GETPOSTS();
    })
    .catch((error) => {
      console.log(error);
    });
}
function modalDeleted(){
  let postModal = new bootstrap.Modal(document.getElementById("deletedDone"), {});
  postModal.toggle();


}






function openPageProfile(){
  let sure=      getCurrentUser()
  if(sure){
    window.location = "profile.html"
  }
  else{
    
    let postModal = new bootstrap.Modal(document.getElementById("pleaseLogIn"), {});
    postModal.toggle();

  }

}

