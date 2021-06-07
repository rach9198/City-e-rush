/* image restrict to jpg */
/*  var uploadField = document.getElementById("idproof");

uploadField.onchange = function() {
    if(this.files[0].size > 2097152){
       alert("File is too big!! Upload between[2kb - 2Mb]!");
       this.value = "";
    }
    else if(this.files[0].size < 20000){
        alert("File is too small!! Upload between[2kb - 2Mb]");
       this.value = "";
    };
};  */

/* check size and display*/
function id_dis(input) {
  if (input.files[0].size > 2097152) {
    alert("File is too big!! Upload between[2kb - 2Mb]!");
    input.value = "";
  } else if (input.files[0].size < 20000) {
    alert("File is too small!! Upload between[2kb - 2Mb]");
    input.value = "";
  } else if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#id-dis").attr("src", e.target.result).width(150).height(200);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function photo_dis(input) {
  if (input.files[0].size > 2097152) {
    alert("File is too big!! Upload between[2kb - 2Mb]!");
    input.value = "";
  } else if (input.files[0].size < 20000) {
    alert("File is too small!! Upload between[2kb - 2Mb]");
    input.value = "";
  } else if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#pic-dis").attr("src", e.target.result).width(150).height(200);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function sign_dis(input) {
  if (input.files[0].size > 2097152) {
    alert("File is too big!! Upload between[2kb - 2Mb]!");
    input.value = "";
  } else if (input.files[0].size < 20000) {
    alert("File is too small!! Upload between[2kb - 2Mb]");
    input.value = "";
  } else if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#sign-pic").attr("src", e.target.result).width(150).height(200);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

/*enabling editing*/
function enable(e) {
  e.preventDefault();
  document.getElementById("fname").readOnly = false;
  document.getElementById("lname").readOnly = false;
  document.getElementById("dob").readOnly = false;

  let ele = document.getElementsByName("gender");
  for (i = 0; i < ele.length; i++) {
    ele[i].disabled  =false;
  }



  document.getElementById("inputState").disabled = false;
  document.getElementById("inputAddress").readOnly = false;
  document.getElementById("inputAddress2").readOnly = false;
  document.getElementById("inputCity").readOnly = false;
  document.getElementById("inputZip").readOnly = false;
  document.getElementById("mob").readOnly = false;

  document.getElementById("id_no").readOnly = false;
}

/* FIREBASE */

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

const form_HTML = document.querySelector("#form");
const idfile_HTML = document.querySelector("#idproof");
const picfile_HTML = document.querySelector("#photo");
const signfile_HTML = document.querySelector("#sign");

let USER = {};
auth.onAuthStateChanged(async (user) => {
  if (user) {
    // console.log(user);
    // console.log(user.user);
    // console.log(user.uid);

    USER.uid = user.uid;
    await extractData();
    displayData();
  }
});

let FILE1, FILE2, FILE3;

async function formSubmit(event) {
  event.preventDefault();

  const fname = document.querySelector("#fname").value;
  const lname = document.querySelector("#lname").value;
  const dob = document.querySelector("#dob").value;

  var ele = document.getElementsByName("gender");
  let gen;
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) gen = ele[i].value;
  }

  const inputAddress = document.querySelector("#inputAddress").value;
  const inputAddress2 = document.querySelector("#inputAddress2").value;
  const inputCity = document.querySelector("#inputCity").value;

  var inputState = document.getElementById("inputState").value;

  const inputZip = document.querySelector("#inputZip").value;
  const mob = document.querySelector("#mob").value;
  const id_no = document.querySelector("#id_no").value;

  let dbRef = await db.collection("passengers").doc(USER.uid);

  dbRef
    .get()
    .then(async function (d) {
      let dData = d.data();

      dData.fname = fname || "";
      (dData.lname = lname || ""),
        (dData.dob = dob || ""),
        (dData.gen = gen || ""),
        (dData.inputAddress = inputAddress || ""),
        (dData.inputAddress2 = inputAddress2 || ""),
        (dData.inputCity = inputCity || ""),
        (dData.inputState = inputState || ""),
        (dData.inputZip = inputZip || ""),
        (dData.mob = mob || ""),
        (dData.id_no = id_no || "");
      let url1, url2, url3;
      if (FILE1) {
        await storage
          .ref(`passengers/${d.id}`)
          .child(FILE1.name)
          .put(FILE1)
          .then(function () {});
        await storage
          .ref(`passengers/${d.id}`)
          .child(FILE1.name)
          .getDownloadURL()
          .then((u) => (url1 = u));
        dData.file1 = {
          name: FILE1.name || "",
          url: url1 || "",
        };
      }

      if (FILE2) {
        await storage
          .ref(`passengers/${d.id}`)
          .child(FILE2.name)
          .put(FILE2)
          .then(function () {});
        await storage
          .ref(`passengers/${d.id}`)
          .child(FILE2.name)
          .getDownloadURL()
          .then((u) => (url2 = u));
        dData.file2 = {
          name: FILE2.name || "",
          url: url2 || "",
        };
      }

      if (FILE3) {
        await storage
          .ref(`passengers/${d.id}`)
          .child(FILE3.name)
          .put(FILE3)
          .then(function () {});
        await storage
          .ref(`passengers/${d.id}`)
          .child(FILE3.name)
          .getDownloadURL()
          .then((u) => (url3 = u));

        dData.file3 = {
          name: FILE3.name || "",
          url: url3 || "",
        };
      }

      // console.log(dData);

      await dbRef.update(dData);
    })
    .then(() => {
      console.log("saved");
    })
    .catch(function (error) {
      console.log(error);
    });
}

form_HTML.addEventListener("submit", formSubmit);

function fileupload1(e) {
  console.log(e.target.files[0]);
  FILE1 = e.target.files[0];
  console.log(FILE1);
}

function fileupload2(e) {
  console.log(e.target.files[0]);
  FILE2 = e.target.files[0];
  console.log(FILE2);
}

function fileupload3(e) {
  console.log(e.target.files[0]);
  FILE3 = e.target.files[0];
  console.log(FILE3);
}

idfile_HTML.addEventListener("change", fileupload1);
picfile_HTML.addEventListener("change", fileupload2);
signfile_HTML.addEventListener("change", fileupload3);
