let selected = 'tab-1';
let tabs = [];
tabs.push("tab-1");
let buttons = document.getElementsByTagName("tab");
var holder = document.getElementById("holder");
let myID;

function addTab(title, url) {
  if (holder.childElementCount < 9) {
    var id = parseInt(tabs[tabs.length - 1].split("-")[1]) + 1;
    while (holder.querySelector("#tab-" + id)) {
      id++;
    }
    var tab = document.createElement("div");
    tab.classList.add("tab");
    tab.title = title;
    tab.id = "tab-" + id;
    var text = document.createElement("div");
    text.innerHTML = title;
    text.classList.add("text");
    text.id = "text-" + id
    tab.appendChild(text);
    var frame = document.createElement("iframe");
    frame.classList.add("frame");
    frame.src = url;
    frame.allowfullscreen = true;
    frame.id = "frame-" + id;
    frame.addEventListener("load", loaded);
    tab.appendChild(frame);
    var close = document.createElement("i");
    close.classList.add("fa-solid");
    close.classList.add("fa-x");
    close.id = "close-" + id;
    tab.appendChild(close);
    tab.addEventListener("click", tabPressed);
    holder.insertBefore(tab, holder.children[holder.childElementCount - 1]);
    if (holder.childElementCount >= 9) {
      document.getElementById("newTab").style.display = "none";
    }
    tabs.push("tab-" + id);
  } else {
    document.getElementById("newTab").style.display = "none";
  }
  setSelected("tab-" + id);
}

const tabPressed = e => {
  parent = document.getElementById(e.target.id).parentNode.id;
  if (parent !== "holder") {
    if (e.target.id.includes("close") || parent.includes("close")) {
      if (parent.includes("close")) {
        myID = parent;
        parent = document.getElementById(e.target.id).parentNode.parentNode.id;
      } else {
        myID = e.target.id;
      }
      console.log(myID);
      if (holder.childElementCount > 2) {
        if (selected == parent) {
          if (parent !== holder.children[0].id) {
            selected = holder.children[0].id;
          } else {
            selected = holder.children[1].id;
          }
          document.getElementById(selected).classList.add("selected");
          document.getElementById(selected).children[1].style.display = "block";
        }
        tabs.splice(tabs.indexOf(myID), 1);
        holder.removeChild(document.getElementById(myID).parentNode);
        if (holder.childElementCount >= 9) {
          document.getElementById("newTab").style.display = "none";
        } else {
          document.getElementById("newTab").style.display = "block";
        }
      }
    } else {
      setSelected(document.getElementById(e.target.id).parentNode.id);
    }
  } else {
    setSelected(e.target.id);
  }
}

function setTitle() {
  console.log("frame-" + selected);
  document.title = document.getElementById(selected).children[1].contentDocument.title;
}

let first = document.getElementById('tab-1');
first.addEventListener("click", tabPressed);

const loaded = e => {
  document.getElementById(selected).children[0].innerHTML = document.getElementById(selected).children[1].contentDocument.title;
  document.getElementById(selected).children[0].title = document.getElementById(selected).children[1].contentDocument.title;
  
}

document.getElementById('frame-1').addEventListener("load", loaded);

function setSelected(id) {
  var currentTab = document.getElementById(id);
  if (holder.querySelector("#" + selected)) {
    document.getElementById(selected).classList.remove("selected");
    document.getElementById(selected).children[1].style.display = "none";
    document.getElementById(selected).style.zIndex = 0;
  }
  selected = id;
  document.getElementById(selected).classList.add("selected");
  document.getElementById(selected).children[1].style.display = "block";
  document.getElementById(selected).style.zIndex = 10;
}