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

    if (reg.test(emailField.value) == false) 
    {
        alert('Invalid Email Address');
        return false;
    }
    return true;
}

//Validate Name
function validateName(nameField){
    var reg = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/;

    if(nameField.value.length>0){
        document.getElementById('x').innerHTML=` `;
    }

    if(nameField.value.length==0){
        document.getElementById('y').innerHTML=`<input class="input100"  type="text" onchange="validateName(this);" name="fullName" required>
        <span class="focus-input100"></span>
        <span class="label-input100" id='x'>Full Name</span>`;
    }

    if (reg.test(nameField.value) == false) 
    {
        alert('Name must not contain special character or a number');
        return false;
    }
    return true;
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
    

        if(pass.length < 6 || !letter.test(pass) || !number.test(pass) || !upper.test(pass)) {
            if(pass.length<6){
            alert("Please make sure password is longer than 6 characters.")
            return false;
        }

        if(!letter.test(pass)){
            alert("Please make sure password includes a lowercase letter.")
            return false;
        }

        if(!number.test(pass)){
            alert("Please make sure Password Includes a Digit")
            return false;     
        }

        if(!upper.test(pass)) {
            alert("Please make sure password includes an uppercase letter.");
            return false;
        }

    }
}

//Password Validation in SignUp field
function matchPassword(password){
    if(password.value.length>0){
        document.getElementById('d').innerHTML=` `;
    }

    if(password.value.length==0){
        document.getElementById('c').innerHTML=`<input class="input100" type="password" id="password2" onchange="matchPassword(this);" name="passwordCheck" required>
        <span class="focus-input100"></span>
        <span class="label-input100" id='d'>Confirm Password</span>`;
    }

    if(document.getElementById('password1').value!=document.getElementById('password2').value){
        alert("Passwords dont't match");
        document.getElementById('submit').disabled = true;
    }
    else{
        document.getElementById('submit').disabled = true;
    }
    console.log(document.getElementById('submit'));
}

//Phone Number Validation
function validatePhone(phone){
    var val=phone.value;

    if(val.length>0){
        document.getElementById('h').innerHTML=` `;
    }

    if(val.length==0){
        document.getElementById('g').innerHTML=`<input class="input100" type="text" onchange="validatePhone(this);" name="phone" required>
        <span class="focus-input100"></span>
        <span class="label-input100" id='h'>Phone</span>`;
    }

    if (/^\d{10}$/.test(val)) {
    // value is ok, use it
    } 
    
    else {
        alert("Invalid number; must be ten digits")
        phone.focus()
        return false;
    }
}

//DOB Validation
function validateDOB(date){
    var dateString = document.getElementById('DOB').value;
    var myDate=new Date(dateString);
    var today=new Date();

    if(dateString.length>0){
        document.getElementById('j').innerHTML=` `;
    }

    else{
        document.getElementById('i').innerHTML=`<input class="input100" type="date" onchange="validateDOB(this);" name="dob" required>
        <span class="focus-input100"></span>
        <span class="label-input100" id='j'>Date of Birth</span>`;
    }

    if(myDate > today ) { 
        alert('You entered wrong date');
        return false;
    }
    return true;
}

if(!reg.test(emailField.value)){
    document.getElementById("em").setAttribute('disabled','disabled');
}