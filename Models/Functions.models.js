/**
 * This function push the message when receive or sender
 * @param {Array<{ _id, sender, receiver, message,Name, type, Path, Data, Reply,Time } } data
 * @param {"sender" | "receiver"} Type
 * @param {boolean=} animate
 */
function PushMessageElements(data = [], Type, animate) {
  const Data = data[0];
  let Element = document.createElement(Type);
  Element.id = Data._id;
  if (animate) Element.classList.add("push");
  /**
   * @type {"text"|"image"|"audio"|"video"|"default"} DataType
   */
  const DataType = Data.type.split("/")[0];
  switch (DataType) {
    case "text":
      Data.message == "<<Like>>"
        ? (Element.innerHTML = BigLikeBtn)
        : (Element.innerText = Data.message);
      break;
    case "image":
      const image = document.createElement("img");
      image.src = "." + Data.Path;
      Element.classList.add(Type);
      break;
    case "audio":
      const audio = document.createElement("audio");
      audio.controls = "";
      audio.innerHTML = `<source src=${"." + Data.Path} type=${Data.type}>`;
      Element.classList.add(Type);
      Element.appendChild(audio);
      break;
    case "video":
      const video = document.createElement("video");
      video.src = "." + Data.Path;
      video.controls = "";
      Element.classList.add(Type);
      Element.appendChild(video);
      break;
    default:
      const p = document.createElement("p");
      p.innerText = Data.Name;
      SendElement.appendChild(p);
      Element.classList.add("file");
      const fld = document.createElement("button");
      fld.setAttribute("id", "File" + Data._id);
      Data.type.split("/")[1].includes("-")
        ? (fld.onclick = `window.OpenFile("${Data.Path.replace(
            /\\/g,
            "\\\\"
          )}")`)
        : fld.setAttribute("path", "." + Data.Path);
      fld.setAttribute("Ftype", Data.type);
      fld.innerHTML = FolderBtn;
      Element.appendChild(fld);
      break;
  }
  const Reply = document.createElement("div");
  Reply.id = "R" + Data._id;
  Reply.innerHTML = `${ReplyBtn}<button onclick="REACT(this)">${LittleLikeBtn}</button><p>${Data.Time.slice(
    0,
    5
  )}</p>`;
  Element.appendChild(Reply);
  const React = document.createElement("react");
  React.innerHTML = LittleLikeBtn;
  Element.appendChild(React);
  if (Data.Reply) {
    const RePlyed = document.createElement("reply");
    const target = document.getElementById(Data.Reply).cloneNode(true);
    target.classList.value = "";
    target.querySelector("div").remove();
    target.querySelector("react").remove();
    if (target.querySelector("reply")) target.querySelector("reply").remove();
    if (target.childNodes[0].tagName == "svg")
      RePlyed.appendChild(target.childNodes[0]);
    else if (target.childNodes[0].tagName == undefined)
      RePlyed.innerHTML = `<p>${target.innerText.split("\n")[0]}</p>`;
    else RePlyed.innerHTML = `<p>Pièce Joint</p>`;
    if (target.tagName == "SENDER" || target.classList.contains("sender"))
      RePlyed.setAttribute(
        "text",
        `${
          document.getElementById(Data.sender).querySelector("name").innerText
        } vous a repondu`
      );
    else
      RePlyed.setAttribute(
        "text",
        `${
          document.getElementById(Data.sender).querySelector("name").innerText
        } a lui-même`
      );
    Element.classList.add("GetReplyed");
    Element.appendChild(RePlyed);
  } else {
    let Target = [
      ...document.querySelectorAll(
        "#Chat sender,#Chat .sender,#Chat .receiver,#Chat receiver"
      ),
    ].at(-1);
    if (
      Target &&
      (Target.classList.value.startsWith("receiver") ||
        Target.tagName == "RECEIVER")
    ) {
      Target.classList.add("border-bottom");
      ReceiveElement.classList.add("border-top");
    }
  }
  let chat = Data.receiver
    ? document.getElementById("Chat")
    : document.getElementsByClassName("Chat")[0];
  chat.style.scrollBehavior = "smooth";
  Typing(false);
  chat.appendChild(Element);
  if (Element.querySelector("reply")) {
    if (Element.querySelector("reply p"))
      if (
        document.getElementById(Data.Reply).offsetWidth <
        chat.offsetWidth * 0.6
      )
        Element.querySelector("reply p").style.minWidth =
          document.getElementById(Data.Reply).offsetWidth + "px";
      else
        Element.querySelector("reply p").style.minWidth =
          chat.offsetWidth * 0.6 + "px";
    Element.style.marginTop =
      Element.querySelector("reply").offsetHeight + 10 + "px";
  }
  chat.scrollTop = chat.scrollHeight - chat.offsetHeight;
  if (Data.receiver) document.getElementById("ack").innerHTML = "";
  setTimeout(() => {
    chat.style.scrollBehavior = "";
    if (animate) Element.classList.remove("push");
  }, 300);
}

exports.PushMessageElements = PushMessageElements;
