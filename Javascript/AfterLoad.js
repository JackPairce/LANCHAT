chat = document.getElementById("Chat");
const textarea = document.querySelector("textarea");
const Gtextarea = document.getElementsByClassName("MSG")[0];
textarea.addEventListener("keydown", (event) => {
  setTimeout(() => {
    textarea.style.height = "50px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, 2);
  if (event.code === "Enter" && !event.shiftKey) {
    event.preventDefault();
    document.getElementById("SNDMSG").click();
  }
});
textarea.addEventListener("input", (event) => {
  if (event.target.value == "")
    document.getElementById(
      "send"
    ).innerHTML = `<button onclick="send()">${LikeBtn}</button>`;
  else if (event.target.value != "") {
    document.getElementById("send").innerHTML = SendBtn;
  }
});
textarea.addEventListener("focus", (e) => {
  if (textarea.value != "")
    ReadProfile().then(({ _id, LastContact }) => {
      let data = { sender: _id, receiver: LastContact };
      Type({ ...data, type: "ImTyping", Typing: true });
    });
});

textarea.addEventListener("blur", () => {
  ReadProfile().then(({ _id, LastContact }) => {
    let data = { sender: _id, receiver: LastContact };
    Type({ ...data, type: "ImTyping", Typing: false });
  });
});

Gtextarea.addEventListener("keydown", (event) => {
  setTimeout(() => {
    Gtextarea.style.height = "50px";
    Gtextarea.style.height = `${Gtextarea.scrollHeight}px`;
  }, 2);
  if (event.code === "Enter" && !event.shiftKey) {
    event.preventDefault();
    document.getElementById("GSNDMSG").click();
  }
});
Gtextarea.addEventListener("input", (event) => {
  if (event.target.value == "")
    document.getElementById(
      "Gsend"
    ).innerHTML = `<button onclick="Gsend()">${GLikeBtn}</button>`;
  else if (event.target.value != "") {
    document.getElementById("Gsend").innerHTML = GSendBtn;
  }
});

const dialog = document.querySelector("dialog");
const Content = document.querySelector("dialog .content");
document.getElementById("Chat").addEventListener("click", (event) => {
  if (event.target.classList == "file") {
    const file = [...event.target.children][0];
    Type = file.getAttribute("Ftype");
    Path = file.getAttribute("path");
    if (Type.split("/")[1].includes("-")) {
      window.OpenFile(Path.replace(/\\/g, "\\\\"), "openfile");
      return;
    }
    switch (Type.split("/")[0]) {
      case "image":
        img = document.createElement("img");
        img.setAttribute("src", Path);
        Content.appendChild(img);
        break;
      case "video":
        video = document.createElement("video");
        video.setAttribute("src", Path);
        video.setAttribute("controls", "");
        Content.appendChild(video);
        break;
      default:
        Content.innerHTML = `<object data="${Path}" type="${Type}"></object>`;
    }
    dialog.showModal();
  } else if (event.target.matches('[id^="File"]'))
    window.OpenFile(
      event.target.getAttribute("path").replace(/\\/g, "\\\\"),
      "openfolder"
    );
});

document
  .getElementById("Busy")
  .addEventListener("change", (event) => MyStatus(event.target.checked));
document.getElementById("ColorMode").addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("lightMode");
    window.Profile.Theme(true);
  } else {
    document.body.classList.remove("lightMode");
    window.Profile.Theme(false);
  }
});

const zoomRange = document.getElementById("Zoom");
zoomRange.addEventListener("input", () => {
  const zoomLevel = zoomRange.value / 100;
  document.body.style.zoom = zoomLevel;
});
var once = 0;
function StartListenToNav() {
  document.getElementById("nav").addEventListener("click", async () => {
    [...this.Nav.children].forEach(async (originalElement) => {
      if (originalElement.tagName != "CONTACT") return;
      if (originalElement.classList.value.split(" ").includes("active")) {
        const { LastContact, LastGroup } = await ReadProfile();
        chat.scrollTop = chat.scrollHeight - chat.offsetHeight;
        if (
          (LastContact == originalElement.id ||
            LastGroup == originalElement.id) &&
          once
        )
          return;
        once++;
        if (!originalElement.id.startsWith("G")) {
          await window
            .ModifyProfile("LastContact", originalElement.id)
            .then(() => GetChats())
            .catch((err) => console.error(err));
          const clonedElement = document.getElementById("target");
          const clonedElement2 = document.getElementById("starget");
          const ContactInfo = ["--SD", "--STT", "--PAD", "--BRD"];
          clonedElement.setAttribute(
            "status",
            originalElement.getAttribute("status")
          );
          clonedElement2.setAttribute(
            "status",
            originalElement.getAttribute("status")
          );
          ContactInfo.forEach((variables) => {
            clonedElement.style.setProperty(
              variables,
              getComputedStyle(originalElement).getPropertyValue(variables)
            );
            clonedElement2.style.setProperty(
              variables,
              getComputedStyle(originalElement).getPropertyValue(variables)
            );
          });
        } else {
          await window
            .ModifyProfile("LastGroup", originalElement.id)
            .then(() => GetGroupChats())
            .catch((err) => console.error(err));
          const clonedElement = document.getElementById("gtarget");
          const clonedElement2 = document.getElementById("Gtarget");
          const ContactInfo = ["--SD", "--STT", "--PAD", "--BRD"];
          clonedElement.setAttribute(
            "status",
            originalElement.getAttribute("status")
          );
          clonedElement2.setAttribute(
            "status",
            originalElement.getAttribute("status")
          );
          ContactInfo.forEach((variables) => {
            clonedElement.style.setProperty(
              variables,
              getComputedStyle(originalElement).getPropertyValue(variables)
            );
            clonedElement2.style.setProperty(
              variables,
              getComputedStyle(originalElement).getPropertyValue(variables)
            );
          });
        }
      }
    });
  });
}
var TheSelected, BTN;

const navigation = document.getElementById("nav");
const chatui = document.getElementById("CHATui");
const callui = document.getElementById("Call");
const vcallui = document.getElementById("VCall");
const grpui = document.getElementById("Grp");
const Lister = document.getElementsByTagName("lister")[0];
const Mobserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id == "CHATui" || entry.target.id == "Grp") {
          Lister.classList.remove("listup");
          indicator.style.scale = 1;
        }
        if (entry.target.id == "Grp") {
          once = 0;
          indicator.style.scale = 1;
          const { LastGroup } = await ReadProfile();
          if (LastGroup) document.getElementById(LastGroup).click();
          document
            .querySelectorAll("#nav contact:not([id^='G'])")
            .forEach((e) => (e.style.display = "none"));
          document
            .querySelectorAll(
              "#nav contact[id^='G'],#nav button:not(info button)"
            )
            .forEach((e) => (e.style.display = "grid"));
        } else if (entry.target.id == "Call") {
          if (!document.getElementById("users").innerHTML.length)
            Lister.classList.add("listup");
        } else if (entry.target.id == "VCall") {
          if (!document.getElementById("Vusers").classList.value.length)
            Lister.classList.add("listup");
        } else {
          once = 0;
          const { LastContact } = await ReadProfile();
          document.getElementById(LastContact).click();
          document
            .querySelectorAll("#nav contact:not([id^='G'])")
            .forEach((e) => (e.style.display = "grid"));
          document
            .querySelectorAll(
              "#nav contact[id^='G'],#nav button:not(info button)"
            )
            .forEach((e) => (e.style.display = "none"));
        }
      }
    });
  },
  {
    rootMargin: "0px",
    threshold: 1,
  }
);
setTimeout(() => {
  Mobserver.observe(chatui);
}, 100);
Mobserver.observe(callui);
Mobserver.observe(vcallui);
Mobserver.observe(grpui);

var setto;
var btn;
function scrollToElement(elementId, target) {
  // const indicator = document.getElementById("indicator");
  setto = elementId;
  btn = target;
  SLideIT(btn);
  if (elementId == "CHATui") {
    navigation.classList.remove("tight");
    [...document.querySelectorAll("#nav contact")].forEach((c) =>
      c.classList.remove("normal")
    );
  } else if (elementId == "Call") {
    ReadProfile().then(({ _id }) => GETCall("Call", _id));
    [...document.querySelectorAll("#nav contact")].forEach((c) =>
      c.classList.add("normal")
    );
    navigation.classList.add("tight");
    indicator.style.scale = 0;
    navigation.addEventListener("transitionend", () => SLideIT(btn));
  } else if (elementId == "VCall") {
    ReadProfile().then(({ _id }) => GETCall("VCall", _id));
    [...document.querySelectorAll("#nav contact")].forEach((c) =>
      c.classList.add("normal")
    );
    navigation.classList.add("tight");
    indicator.style.scale = 0;
    navigation.addEventListener("transitionend", () => SLideIT(btn));
  } else if (elementId == "Grp") {
    navigation.classList.remove("tight");
    // SLideIT(btn);
    [...document.querySelectorAll("#nav contact")].forEach((c) =>
      c.classList.remove("normal")
    );
  }
  SLideIT(btn); // ===>> test
}
function SLideIT(target) {
  parent = document.getElementById("TopNav");
  [...parent.children].forEach((btn) => btn.classList.remove("Select"));
  target.classList.add("Select");
  var element = document.getElementById(setto);
  if (element.id == "VCall" || element.id == "CHATui") {
    callui.classList = "hide";
    grpui.classList = "hide";
  } else {
    callui.classList = "";
    grpui.classList = "";
  }
  // element.classList =
  element.scrollIntoView({
    behavior: "auto",
    block: "start",
    inline: "start",
  });
}

/*

/*
/*
const filePath = document.getElementById("audio").src;
fetch(filePath)
  .then((response) => response.arrayBuffer())
  .then((arrayBuffer) => {
    const audioContext = new AudioContext();
    return audioContext.decodeAudioData(arrayBuffer);
  })
  .then((audioBuffer) => {
    console.log(audioBuffer);
    draw(normalizeData(filterData(audioBuffer)));
  })
  .catch((error) => console.log(error)); 
/*
// Set up audio context
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

/**
 * Filters the AudioBuffer retrieved from an external source
 * @param {AudioBuffer} audioBuffer the AudioBuffer from drawAudio()
 * @returns {Array} an array of floating point numbers
 */
const filterData = (audioBuffer) => {
  const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
  const samples = 70; // Number of samples we want to have in our final data set
  const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i; // the location of the first sample in the block
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
    }
    filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
  }
  return filteredData;
}; /*

/**
 * Normalizes the audio data to make a cleaner illustration
 * @param {Array} filteredData the data from filterData()
 * @returns {Array} an normalized array of floating point numbers
 */ /*
const normalizeData = (filteredData) => {
  const multiplier = Math.pow(Math.max(...filteredData), -1);
  return filteredData.map((n) => n * multiplier);
}; /*

/**
 * Draws the audio file into a canvas element.
 * @param {Array} normalizedData The filtered array returned from filterData()
 * @returns {Array} a normalized array of data
 */ /*
const draw = (normalizedData) => {
  const canvas = document.querySelector("canvas");
  const dpr = window.devicePixelRatio || 1;
  const padding = 0;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = (canvas.offsetHeight + padding * 0) * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.translate(0, canvas.offsetHeight / 2 + padding); // set Y = 0 to be in the middle of the canvas

  const width = canvas.offsetWidth / normalizedData.length;
  for (let i = 0; i < normalizedData.length; i++) {
    const x = (width - 0.1) * i;
    const height = normalizedData[i] * canvas.offsetHeight - padding;
    drawBar(ctx, x, height, width, (i + 1) % 2);
  }
}; /*
/**
 * A utility function for drawing our bars
 * @param {AudioContext} ctx the audio context
 * @param {number} x  the x coordinate of the beginning of the bar
 * @param {number} height the desired height of the bar
 * @param {number} width the desired width of the bar
 */ /*
const drawBar = (ctx, x, height, width) => {
  barWidth = 5;
  barSpacing = 5;
  x += barSpacing;
  ctx.fillStyle = "#fff";
  ctx.fillRect(x, -height / 2, barWidth, height);
  ctx.fillRect(x, height / 2, barWidth, -height);
};

const audio = document.getElementById("audio");
const canvas = document.getElementById("canvas");
const playpause = document.getElementById("playpause");
const progress = document.getElementById("progress");
const timeline = document.getElementById("timeline");

const context = new AudioContext();
const src = context.createMediaElementSource(audio);
const analyser = context.createAnalyser();

// Connect the AudioContext to the media element source
src.connect(analyser);
analyser.connect(context.destination);

// Set up the progress bar and seek bar
playpause.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    playpause.classList.remove("play");
    playpause.classList.add("pause");
  } else {
    audio.pause();
    playpause.classList.remove("pause");
    playpause.classList.add("play");
  }
});

timeline.addEventListener("click", function (e) {
  const timelineWidth = timeline.offsetWidth;
  const duration = audio.duration;

  audio.currentTime = (e.layerX / timelineWidth) * duration;
});

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progressWidth = (currentTime / duration) * 100;
  requestAnimationFrame(() => {
    progress.style.width = `${progressWidth}%`;
  });
});*/
