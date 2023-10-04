let selected = 'tab-1';
let tabs = [];
tabs.push("tab-1");
let buttons = document.getElementsByTagName("tab");
var holder = document.getElementById("holder");
let myID;
$("#frame-1").data('history', {history: [], pos: 0});
console.log($("#frame-1").data('history'));

function addTab(title, url) {
  if (holder.childElementCount < 19) {
    var id = parseInt(tabs[tabs.length - 1].split("-")[1]) + 1;
    console.log(id);
    while (holder.querySelector("#tab-" + id)) {
      id++;
    }
    var tab = document.createElement("div");
    tab.classList.add("tab");
    tab.setAttribute("data-selected", "false");
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
    frame.setAttribute('allowFullScreen', '');
    frame.id = "frame-" + id;
    frame.addEventListener("load", loaded);
    tab.appendChild(frame);
    var close = document.createElement("i");
    close.classList.add("close");
    close.classList.add("fa-solid");
    close.classList.add("fa-x");
    close.id = "close-" + id;
    tab.appendChild(close);
    tab.addEventListener("click", tabPressed);
    holder.insertBefore(tab, holder.children[holder.childElementCount - 1]);
    $("#frame-" + id).data('history', {history: [], pos: 0});
    console.log($("#frame-" + id).data('history'));
    if (holder.childElementCount >= 19) {
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
        console.log(holder.children[selected].id);
        myID = parent;
        parent = document.getElementById(e.target.id).parentNode.parentNode.id;
      } else {
        myID = e.target.id;
      }
      console.log(tabs);
      console.log(myID);
      if (holder.childElementCount > 4) {
        if (selected == parent) {
          if (parent !== holder.children[2].id) {
            selected = holder.children[2].id;
            console.log(selected);
          } else {
            selected = holder.children[3].id;
            console.log("2", selected);
          }
          document.getElementById(selected).setAttribute("data-selected", "true");
          document.getElementById(selected).children[1].style.display = "block";
        }
        tabs.splice(tabs.indexOf(myID), 1);
        holder.removeChild(document.getElementById(myID).parentNode);
        if (holder.childElementCount >= 19) {
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
  console.log(selected);
  document.title = document.getElementById(selected).children[1].contentDocument.title;
}

let first = document.getElementById('tab-1');
first.addEventListener("click", tabPressed);

const loaded = e => {
  id = selected.split("-")[1];
  historyData = $("#frame-" + id).data('history');
  console.log(document.getElementById(selected).children[1].src);
  if (historyData.pos != historyData.history.length) {
    historyData.history.splice(historyData.pos + 1, array.length - (historyData.pos + 1));
    historyData.history.push(document.getElementById(selected).children[1].src); 
    historyData.pos = historyData.pos + 1;
    document.getElementById(selected).children[1].src = historyData.history[historyData.pos];
  } else {
    historyData.history.push(document.getElementById(selected).children[1].src);
    historyData.pos = 1;
  }
  $("#frame-" + id).data('history', historyData);
  console.log(historyData.pos);
  //document.getElementById(selected).children[0].innerHTML = document.getElementById(selected).children[1].contentDocument.title;
  //document.getElementById(selected).children[0].title = document.getElementById(selected).children[1].contentDocument.title;
}

document.getElementById('frame-1').addEventListener("load", loaded);

function setSelected(id) {
  var currentTab = document.getElementById(id);
  if (holder.querySelector("#" + selected)) {
    document.getElementById(selected).setAttribute("data-selected", "false");
    document.getElementById(selected).children[1].style.display = "none";
    document.getElementById(selected).style.zIndex = 0;
  }
  selected = id;
  document.getElementById(selected).setAttribute("data-selected", "true");
  document.getElementById(selected).children[1].style.display = "block";
  document.getElementById(selected).style.zIndex = 10;
}

function moveHistory(direction) {
  id = selected.split("-")[1];
  historyData = $("#frame-" + id).data('history');
  if(direction == "forward") {
    if(historyData.pos != hostoryData.history.length) {
      historyData.pos += 1;
      document.getElementById(id).src = historyData.history[historyData.pos];
    }
  } else if (direction == "back") {
    if(historyData.pos != 0) {
      historyData.pos -= 1;
      document.getElementById(id).src = historyData.history[historyData.pos];
    }
    console.log("BACKWARD");
  }
}

function reloadFrame() {
  console.log("RELOAD");
  document.getElementById(selected).children[1].contentWindow.location.reload(true);
}

function setFullscreen(open) {
  console.log("FULLSCREEN");
  console.log(open);
  console.log(document.webkitIsFullScreen);
  if (open) {
    document.getElementById(selected).children[1].requestFullscreen();
    }
}