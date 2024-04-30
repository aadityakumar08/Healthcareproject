
document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    document.getElementById('popup').style.display = 'block';
    document.getElementById('appointmentForm').reset();
    setTimeout(function() {
      document.getElementById('popup').style.display = 'none';
    }, 3000); 
  });

  window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('separatePopup')) {
      document.getElementById('separatePopup').style.display = 'none';
    }
  });

  function signUp() {
    // Retrieve username and password from input fields
    var username = document.getElementById('signUpUsername').value;
    var password = document.getElementById('signUpPassword').value;
    
    // Perform any necessary validation here
    
    // Redirect the user to index.html
    window.location.href = 'index.html';
}

function toggleHide(){
  let btn=document.getElementById('btn');
  let para=document.getElementById('para');

  if(para.style.display!='none'){
    para.style.display='none';
  }else{
    para.style.display='block';
    
  }
}

function toggleHide1(){
  let btn=document.getElementById('btn2');
  let para=document.getElementById('para1');

  if(para.style.display!='none'){
    para.style.display='none';
  }else{
    para.style.display='block';
    
  }
}

function toggleHide2(){
  let btn=document.getElementById('btn3');
  let para=document.getElementById('para2');

  if(para.style.display!='none'){
    para.style.display='none';
  }else{
    para.style.display='block';
    
  }
}

function toggleHide4(){
  let btn=document.getElementById('btn4');
  let para=document.getElementById('para4');

  if(para.style.display!='none'){
    para.style.display='none';
  }else{
    para.style.display='block';
    
  }
}

function toggleHide5(){
  let btn=document.getElementById('btn5');
  let para=document.getElementById('para5');
 
  if(para.style.display!='none'){
    para.style.display='none';
  }else{
    para.style.display='block';
    
  }
}
function toggleHide4(){
  let btn=document.getElementById('btn4');
  let para=document.getElementById('para4');
 
  if(para.style.display!='none'){
    para.style.display='none';
  }else{
    para.style.display='block';
    
  }
}
function toggleHide3(){
  let btn=document.getElementById('btn3');
  let para=document.getElementById('para3');
 
  if(para.style.display!='none'){
    para.style.display='none';
  }else{
    para.style.display='block';
    
  }
}
function toggleHide1(){
  let btn=document.getElementById('btn1');
  let para=document.getElementById('para1');
 
  if(para.style.display!='none'){
    para.style.display='none';
  }else{
    para.style.display='block';
    
  }
}
function toggleHide6(){
  let btn=document.getElementById('btn6');
  let para=document.getElementById('para6');
 
  if(para.style.display!='none'){
    para.style.display='none';
  }else{
    para.style.display='block';
    
  }
}



