//Email Validation
function validateEmail(emailField){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if(emailField.value.length>0){
        document.getElementById('f').innerHTML=` `;
    }

    if(emailField.value.length==0){
        document.getElementById('e').innerHTML=`<input class="input100" type="text" onchange="validateEmail(this);" name="email" required>
        <span class="focus-input100"></span>
        <span class="label-input100" id='f'>Email</span>`;
    }
}

//Password Validation in Login field
function validatePassword(passwordField){
    var pass = document.getElementById('password1').value;
    var letter = /[a-z]/;
    var upper  =/[A-Z]/;
    var number = /[0-9]/;

    if(pass.length>0){
        document.getElementById('b').innerHTML=` `;
    }

    if(pass.length==0){
        document.getElementById('a').innerHTML=`<input class="input100" type="password" id="password1" onchange="validatePassword(this);" name="password" required>
        <span class="focus-input100"></span>
        <span class="label-input100" id='b'>Password</span>`;
    }
}