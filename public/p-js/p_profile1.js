async function extractData() {
  await db
    .collection("passengers")
    .doc(USER.uid)
    .get()
    .then((doc) => {
      let docData = doc.data();
      USER.data = docData;
    });
}

function displayData() {

  document.querySelector("#fname").value = USER.data.fname;
  document.querySelector("#lname").value = USER.data.lname;
  document.querySelector("#dob").value = USER.data.dob;

  const ele = document.getElementsByName("gender");

  for (let i = 0; i < ele.length; i++) {
    if (ele[i].value == USER.data.gen) {
      ele[i].checked = true;
    }
  }


  document.querySelector("#inputAddress").value = USER.data.inputAddress;
  document.querySelector("#inputAddress2").value = USER.data.inputAddress2;
  document.querySelector("#inputCity").value = USER.data.inputCity;

  document.getElementById("inputState").value = USER.data.inputState;

  document.querySelector("#inputZip").value = USER.data.inputZip;
  document.querySelector("#mob").value = USER.data.mob;
  document.querySelector("#id_no").value = USER.data.id_no;

  $("#id-dis").attr("src", USER.data.file1.url).width(150).height(200);
  $("#pic-dis").attr("src", USER.data.file2.url).width(150).height(200);
  $("#sign-pic").attr("src", USER.data.file3.url).width(150).height(200);
}
