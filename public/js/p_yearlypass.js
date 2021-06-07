const db = firebase.firestore();
const storage = firebase.storage();

const form_HTML = document.querySelector('#form');
const idfile_HTML = document.querySelector('#idproof');
const picfile_HTML = document.querySelector('#photo');
const signfile_HTML = document.querySelector('#sign');

let FILE1,FILE2,FILE3;

function formSubmit(event) {
    event.preventDefault();
     
    const org_name = document.querySelector('#org_name').value;
    var cls = document.getElementsByName("cls");
    var gen = document.getElementsByName("gender");
    const id = document.querySelector('#id_no').value;
    const source = document.querySelector('#source').value;
    const dest = document.querySelector('#dest').value;
    const change = document.querySelector('#change').value;

    //class
    for (var i = 0; i < cls.length; i++){
        if (cls[i].checked){
            var clss = cls[i].value;
            break;
        }
    }

    //gender
    for (var j = 0; j < gen.length; j++){
        if (gen[j].checked){
            var genn = gen[j].value;
            break;
        }
    }

    console.log(org_name,clss,genn,id,source, dest,change);

    let data = {
      org_name: org_name,
      clss:clss,
      genn:genn,
      id:id,
      source:source,
      dest:dest,
      change:change      
    }

    db.collection('P_YearlyPass').add(data).then(
        function(d) {
          console.log(d);
          console.log(d.id);
    
          
          storage.ref(`P_YearlyPass/${d.id}`).child(FILE1.name).put(FILE1).then(function() { 
          })
          storage.ref(`P_YearlyPass/${d.id}`).child(FILE2.name).put(FILE2).then(function() { 
        })
        storage.ref(`P_YearlyPass/${d.id}`).child(FILE3.name).put(FILE3).then(function() { 
        })
    
        }
      ).catch(
        function(error) {
          console.log(error);
        }
      )
    
    }

form_HTML.addEventListener('submit', formSubmit);

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
  
idfile_HTML.addEventListener('change', fileupload1)
picfile_HTML.addEventListener('change', fileupload2)
signfile_HTML.addEventListener('change', fileupload3)