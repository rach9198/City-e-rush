

const signinFormHTML = document.querySelector("#signinForm");
const signinFormBtnHTML = document.querySelector("#signinFormBtn");


const successSignInHTML = document.querySelector("#successSignIn");
const errorSignInHTML = document.querySelector("#errorSignIn");

const auth = firebase.auth()
const db = firebase.firestore()
console.log(auth)

const submitSigninForm = (e) => {
  e.preventDefault();
  const email = signinFormHTML["email"].value;
  const password = signinFormHTML["password"].value;


  console.log(email)
  console.log(password)

  auth
    .signInWithEmailAndPassword(email, password)
    .then(async(user) => {
      successSignInHTML.getElementsByClassName.display = "block";
      successSignInHTML.innerHTML = `LoggedIn Successfully`;

  console.log("success")

      setTimeout(() => {
        successSignInHTML.style.display = "none";
      }, 3000);
      await db.collection('passengers').doc(user.user.uid).get().then(uDoc => {
        let uData = uDoc.data();
        if(uData.isAdmin) {
          window.location.href = `./admin.html`;
        } else {
          window.location.href = `./p-PSGR_index.html?user=${user.user.uid}`;
        }
      })
      console.log(user);
      console.log(user.user.uid);
      console.log('userSigniN');
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      // console.log(errorCode);
      // console.log(errorMessage);
      errorSignInHTML.style.display = "block";
      errorSignInHTML.innerHTML = `${errorMessage}`;
      setTimeout(() => {
        errorSignInHTML.style.display = "none";
      }, 3000);
    });
};

signinFormBtnHTML.addEventListener("click", submitSigninForm);
