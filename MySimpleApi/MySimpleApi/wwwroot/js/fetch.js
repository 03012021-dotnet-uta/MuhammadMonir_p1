//alert("Hello World");
let data = "";
var div1 = document.getElementById('div1');
const regform = document.querySelector('.regForm');
const loginform = document.querySelector('.loginForm');

function login() {

    const Username = loginform.email.value.trim();
    const Password = loginform.password.value.trim();

    let chkForm = validateLoginForm(Username, Password);

    if (chkForm) {

   

    // a fetch request is, by default, a GET request and doesn't need a body. 
    fetch(`api/users/login/${Username}/${Password}`)
        .then(response => {
            console.log(response.json);
            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.status})`);
            }
            else       // When the page is loaded convert it to text
                return response.json();
        })
        .then((jsonResponse) => {
            //responseDiv.textContent = `Welcome, ${jsonResponse.fname} ${jsonResponse.lname}. It's good to see you.`;
            console.log(jsonResponse);
            return jsonResponse;
        })
        .then(res => {
            //save the Person to localStorage
            sessionStorage.setItem('user', JSON.stringify(res));
            //sessionStorage.setItem('personId', res.personId);
            //switch the screen
            location = 'stores.html';
        })
        .catch(function (err) {
            console.log('Failed to fetch page: ', err);
            alert("You are not registered... Please register first");
            registerButtonClicked();
        });

}

}

function register(){
    console.log("Register form submitted");
    let fname= regform.fname.value.trim();
    let lname= regform.lname.value.trim();
    let email= regform.email1.value.trim();
    let password = regform.password1.value.trim();
    let confirmpassword = regform.password2.value.trim();
    let checkForm = validateForm(fname, lname, email, password, confirmpassword, regform);
    if (checkForm) {

   
    const userdata = {
         fname: regform.fname.value.trim(),
         lname: regform.lname.value.trim(),
         email: regform.email1.value.trim(),
         password: regform.password1.value.trim()
    }

    fetch('api/users/register/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(userdata)
        })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.status})`);
            }
            else
                return response.json();
        })
        .then((jsonresponse) => {
            console.log(jsonresponse);
           // ele.textContent = `Welcome, ${jsonresponse.fname} ${jsonresponse.lname}`;
            console.log(jsonresponse);
            return jsonresponse;
        })
        .then(res => {
            sessionStorage.setItem('user', JSON.stringify(res));
           
            gotoShop();
        })
        .catch(() => {
            console.log('failed to fetch the page: ', err);
        });

    }
}

function gotoShop(){
     location.replace("./stores.html");
}

       
//div1.innerHTML = data;
let loginbutton = document.getElementById('log-reg-show');
let registerbutton = document.getElementById('log-login-show');

registerbutton.addEventListener('change', registerButtonClicked);
loginbutton.addEventListener('change', loginButtonClicked);

function loginButtonClicked() {
    document.querySelector('.register-info-box').setAttribute("Style", "");
    document.querySelector('.login-info-box').setAttribute("Style", "Display:none");
    document.querySelector('.white-panel').classList.remove('right-log');
    document.querySelector('.login-show').classList.add('show-log-panel');
    document.querySelector('.register-show').classList.remove('show-log-panel');
    console.log("login button clicked");
}

function registerButtonClicked() {
    document.querySelector('.register-info-box').setAttribute("Style", "Display:none");
    document.querySelector('.login-info-box').setAttribute("Style", "");
    document.querySelector('.white-panel').classList.add('right-log');
    document.querySelector('.register-show').classList.add('show-log-panel');
    document.querySelector('.login-show').classList.remove('show-log-panel');
    console.log("register  button clicked");
}

function validateForm(fname, lname, email, password, confirmpassword) {
    let valid = true;
    regform.querySelector('.errorshow').innerHTML = "";
    if (fname == "") {
       regform.querySelector('.errorshow').innerHTML += "First Name must be filled out";
        valid = false;
    }

    if (lname == "") {
        regform.querySelector('.errorshow').innerHTML += "Last Name must be filled out";
        valid = false;
    }

    if (email == "") {
        regform.querySelector('.errorshow').innerHTML += "Email must be filled out";
        valid = false;
    }

    if (password == "") {
        regform.querySelector('.errorshow').innerHTML += "Password must be filled out";
        valid = false;
    }
    if (confirmpassword == "") {
        regform.querySelector('.errorshow').innerHTML += "Confirm Password must be filled out";
        valid = false;
    }

    if (password != confirmpassword) {
        regform.querySelector('.errorshow').innerHTML += "Password does not match";
        valid = false;
    }

    return valid;
}

function validateLoginForm(email, password) {
    let valid = true;
    loginform.querySelector('.errorshow').innerHTML = "";
    if (email == "") {
        loginform.querySelector('.errorshow').innerHTML += "Email must be filled out";
        valid = false;
    }

    if (password == "") {
        loginform.querySelector('.errorshow').innerHTML += "Password must be filled out";
        valid = false;
    }
   

    return valid;
}



