
const baseUrl = "https://tarmeezacademy.com/api/v1";

function setUpUi() {
  const token = localStorage.getItem("token");
  const loginBtn = document.getElementById("login-btn");
  const Register = document.getElementById("Register-btn");
  const logout = document.getElementById("Logout-btn");
  const addpos = document.getElementById("AddPost");

  if (token == null) {
    if (addpos != null) {
      addpos.style.setProperty("display", "none", "important");
    }

    loginBtn.style.setProperty("display", "flex", "important");
    Register.style.setProperty("display", "flex", "important");

    logout.style.setProperty("display", "none", "important");
  } else {
    // for loged user
    if (addpos != null) {
      addpos.style.setProperty("display", "block", "important");
    }
    loginBtn.style.setProperty("display", "none", "important");
    Register.style.setProperty("display", "none", "important");
    logout.style.setProperty("display", "flex", "important");
    let lll = getCurrentUser();
    document.getElementById("nav-username").innerHTML = lll.username;
    document.getElementById("image-profile").src = lll.profile_image;
  }
}

function loginBtnClricked() {
  const userName = document.getElementById("username-input").value;
  const password = document.getElementById("pass-input").value;

  const params = {
    username: userName,
    password: password,
  };
  const url = `${baseUrl}/login`;
  axios.post(url, params).then((response) => {
    location.reload();
     
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    const modal = document.getElementById("exampleModal");

    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
    // alert("user logged in successfuly")
     setUpUi();
  });
}

//modal for register
function loginBtnClrricked() {
  const Name = document.getElementById("name-input-r").value;
  const userName = document.getElementById("user-name-input-r").value;
  const email = document.getElementById("email-input-r").value;
  const password = document.getElementById("passwprd-input-r").value;
  const proimgfile = document.getElementById("img-profile-input").files[0];

  const he = {
    "Content-Type": `multipart/form-data`,
  };
  let ff = new FormData();
  ff.append("username", userName);
  ff.append("name", Name);
  ff.append("password", password);
  ff.append("email", email);
  ff.append("image", proimgfile);

  const h2 = {
    " Content-Type": `multipart/form-data`,
  };
  toggleLoader(true)
  const url = axios
    .post("https://tarmeezacademy.com/api/v1/register", ff)
    .then((response) => {
      location.reload();
      start();
      toggleLoader(false)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      $("#modalContactForm").modal("hide");

      showSucsseAlert("sucsssseeuue");
      setUpUi();
    })
    .catch((error) => {
      error;
      location.reload();
      start();
    });

  // $('#closseBtnClicked').modal('hide');
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUpUi();
}




function getCurrentUser() {
  let user1 = null;
  const storageUser = localStorage.getItem("user");
  if (storageUser != null) {
    user1 = JSON.parse(storageUser);
  }
  return user1;
}












function toggleLoader( show = true){
  if(show){
    document.getElementById("laoder").style.visibility = 'visible'
  }else{
    document.getElementById("laoder").style.visibility = 'hidden'

  }
}