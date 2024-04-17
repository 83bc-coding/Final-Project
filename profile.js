setUpUi()
 
window.onload = function exampleFunction(){
 const data = localStorage.getItem("user")
 datta = JSON.parse(data);

   console.log(datta["id"])
   const idProfile = datta["id"]
   getDataProfile(idProfile )
   getPostsProfile(idProfile)
}


function getDataProfile(idd) {
    axios.get(`https://tarmeezacademy.com/api/v1/users/${idd}`).then((response) => {
      const postss = response.data.data;

      
  
      
      // document.getElementById("posts").innerHTML = " "
  
      // show or hidezz
  
      
      



        let coco = ` <div
        class="container col-9 d-flex"
        style="
        margin-top: 80px;
          background-color: #9096e5;
          border-radius: 5px;
          height: 250px;
          align-items: center;
          justify-content: space-around;
        "
      >
        <div class="">
          <img
            src="${postss.profile_image}"
            alt=""
            style="border-radius: 50%"
            height="100px"
            width="100px"
          />
          <h1 style="font-size: medium; margin: 15px; color: black;">${postss.name}</h1>
          <h1 style="font-size: medium; margin: 15px; color: black;">${postss.username}</h1>

          <h1 style="font-size: medium; margin: 15px; color: black;">${postss.email}</h1>


        </div>
        <div
          class="Data"
          style=" height: 150px; width: 400px"
        >
          <div
            class="d-flex"
            style="
              height: 60px;
               margin-top: 10px;
              justify-content: center;
            "
          >
            <h1 style="margin-left:-20px;">${postss.posts_count}<span style="font-size:x-small;">Posts</span></h1>
          </div>
          <div
          class="d-flex"
          style="
            height: 60px;
             margin-top: 10px;
            justify-content: center;
          "
        >
          <h1>${postss.comments_count}<span style="font-size:x-small;">Comments</span></h1>
        </div>
        </div>
      </div>
      
  <div class="container" style="margin-top: 50px; font-size: 50px; color: #9096e5;">
  ${postss.username} <span style="font-size: 30px;">Posts</span>
  </div>  
                          `;
  
        document.getElementById("showData").innerHTML += coco;
    
      }
    );
  }











































  
function getPostsProfile( idd) {
    axios.get(` https://tarmeezacademy.com/api/v1/users/${idd}/posts`).then((response) => {
      const posts = response.data.data;
   
       
      // document.getElementById("posts").innerHTML = " "
  
      // show or hidezz
  
      for (post of posts) {
        
  
        
          editBtnContent = `<button class=' btn btn-secondary' style="float:right;" onclick="editPostBtnClicked('${encodeURIComponent(
            JSON.stringify(post)
          )}')"   >edit</button>`;
  
          deletBtnContent = `<button type="button" class="btn btn-outline-danger"  style="float:right; height:35px; margin-right:3px; width:64px" onclick="deletBtnContent('${encodeURIComponent(
            JSON.stringify(post)
          )}')">Delet</button>
          `;
        
  
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
       
      }
    });
  }








































  

