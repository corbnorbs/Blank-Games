function openLogin() {
    document.getElementById("container").classList.add("blur");
    document.getElementById("login-holder").style.display = "block";
}

function closeLogin() {
    document.getElementById("container").classList.remove("blur");
    document.getElementById("login-holder").style.display = "none";
}

async function submitLogin() {
    console.log("submit");
    var gmail = document.getElementById("gmail").innerHTML;
    var password = document.getElementById("password").innerHTML;
    const data = {gmail, password};
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
}