console.log(Cookies.get('UUID'));
if(Cookies.get('UUID') != undefined) {
  login();
}

function openLogin() {
    document.getElementById("container").setAttribute("data-blurred", "true");
    document.getElementById("login-holder").style.visibility = "visible";
    document.getElementById("login-holder").setAttribute("data-shown", "true");
}

function closeLogin() {
  document.getElementById("container").setAttribute("data-blurred", "false");
    document.getElementById("login-holder").style.visibility = "hidden";
    document.getElementById("login-holder").setAttribute("data-shown", "false");
}

async function logout() {
  console.log("LOGGING OUT");
  if(Cookies.get('UUID') != undefined) {
    var reason = "remove UUID";
    var myUUID = Cookies.get('UUID');
    const data = {reason, myUUID};
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(data)
    }
    const response = await fetch('https://blank-games-database.glitch.me/api', options);
    const json = await response.json();
    console.log(json);
    Cookies.remove('UUID');
    document.getElementById("login-button").innerHTML = "Log in";
    document.getElementById("login-button").onclick = function() {login();};
    document.getElementById("search-form").style.display = "none";
  }
}

async function login() {
  console.log("LOGGING IN");
  if(Cookies.get('UUID') != undefined) {
    var reason = "check UUID";
    var myUUID = Cookies.get('UUID');
    const data = {reason, myUUID};
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(data)
    }
    const response = await fetch('https://blank-games-database.glitch.me/api', options);
    const json = await response.json();
    console.log(json);
    if(json.isUUID == true) {
      document.getElementById("login-button").innerHTML = "Log out";
      document.getElementById("login-button").onclick = function() {logout();};
      document.getElementById("search-form").style.display = "block";
    }
  }
}


async function submitLogin() {
    console.log("submit");
    var email = document.getElementById("email-input").value;
    var password = document.getElementById("password-input").value;
    var reason = "check account";
    const data = {reason, email, password};
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:  JSON.stringify(data)
        }
        const response = await fetch('https://blank-games-database.glitch.me/api', options);
        const json = await response.json();
        console.log(json);
        console.log(json.newUUID)
        if (json.isAccount == false) {
          document.getElementById("login-warning").style.display = "block";
        } else {
          Cookies.set('UUID', json.newUUID);
          console.log("UUID Cookie: ", Cookies.get('UUID'));
          closeLogin();
          login();
        }
}