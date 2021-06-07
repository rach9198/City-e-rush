
const signupFormHTML = document.querySelector("#signupForm");
const signupFormBtnHTML = document.querySelector("#signupFormBtn");

const successSignUpHTML = document.querySelector("#successSignUp");
const errorSignUpHTML = document.querySelector("#errorSignUp");

const auth = firebase.auth()
const db = firebase.firestore()
console.log(auth)

const submitSignupForm = (e) => {
    // console.log(e);
    // e.preventDefault();
    e.preventDefault();
    const name = signupFormHTML["name"].value;
    const email = signupFormHTML["email"].value;
    const password = signupFormHTML["password"].value;
    const cpassword = signupFormHTML["cpassword"].value;
    // const credits = 800; 
    if (password === cpassword) {
      let uid;
      console.log("lol")
      auth
      .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          uid = user.user.uid;
          console.log(uid);
          return db.collection("passengers").doc(uid).set({
            email: email,
            name: name,
            // credits: credits,
          });
        })
        .then((savedData) => {
          // console.log("dataSaved");
          successSignUpHTML.getElementsByClassName.display = "block";
          successSignUpHTML.innerHTML = `Registered Successfully`;
          setTimeout(() => {
            successSignUpHTML.style.display = "none";
          }, 3000);
          window.location.href = `./login-index.html`;
        })
        .catch((error) => {
          // let errorCode = error.code;
          let errorMessage = error.message;
          // console.log(errorCode);
          // console.log(errorMessage);
          errorSignUpHTML.style.display = "block";
          errorSignUpHTML.innerHTML = `${errorMessage}`;
          setTimeout(() => {
            errorSignUpHTML.style.display = "none";
          }, 3000);
        });
        console.log("done")
    }
  };
  

signupFormBtnHTML.addEventListener("click", submitSignupForm);
