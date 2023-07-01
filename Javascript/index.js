import { PushMessageElements } from "../Models/Functions.models";

// ***  Constance *** //
const LikeBtn = `<svg viewBox="0 0 256 256" id="LIKE" height="40" width="40"><rect width="256" height="256" fill="none"></rect><path d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path><path d="M80,104l40-80a32,32,0,0,1,32,32V80h61.9a15.9,15.9,0,0,1,15.8,18l-12,96a16,16,0,0,1-15.8,14H80" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path></svg>`;
const GLikeBtn = `<svg viewBox="0 0 256 256" id="GLIKE" height="40" width="40"><rect width="256" height="256" fill="none"></rect><path d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path><path d="M80,104l40-80a32,32,0,0,1,32,32V80h61.9a15.9,15.9,0,0,1,15.8,18l-12,96a16,16,0,0,1-15.8,14H80" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path></svg>`;
const ReplyBtn = `<button onclick="REPLY(this)"><svg width="20" height="20" fill="currentColor" class="bi bi-reply-fill" viewBox="0 0 16 16" id="REPLY"> <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" id="mainIconPathAttribute"></path> </svg></button>`;
const SendBtn = `<button type="submit" id="SNDMSG"><svg width="40" height="40" viewBox="0 0 512 512" id="IconChangeColor"><path d="M16,464,496,256,16,48V208l320,48L16,304Z" id="mainIconPathAttribute"></path></svg></button>`;
const GSendBtn = `<button type="submit" id="GSNDMSG"><svg width="40" height="40" viewBox="0 0 512 512" id="IconChangeColor"><path d="M16,464,496,256,16,48V208l320,48L16,304Z" id="mainIconPathAttribute"></path></svg></button>`;
const FolderBtn = `<svg width="25" height="25" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" id="mainIconPathAttribute" fill="#000000"></path> </svg>`;
const PlusBtn =
  '<svg width="40" height="40" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16" id="IconChangeColor"> <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" id="mainIconPathAttribute" fill="#ffffff" stroke-width="1" stroke="#ffffff"></path> </svg>';
let MYID;

const {
  GET,
  Refresh,
  GETGrp,
  GETCall,
  Contact,
  NewContact,
  Group,
  Type,
  AddData,
  UpdateData,
  Clear,
  Send,
  Status,
  Notify,
  GETReports,
} = window.CHAT;
const { MyStatus } = window.Profile;
const { AudioCall, AudioWaves } = window.UseMedia;
const { ResponseNewUser } = window.Admin;
const { createCircleImageWithLetter } = window.CreateContactsICON;

// *** Animate Contacts *** //
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        if (
          document.querySelectorAll(".hidden.active")[0].classList ==
          "hidden active show"
        ) {
          document.getElementById("target").style.transform =
            "translateX(-100px)";
          document.getElementById("msg").style.borderRadius = "0 25px 25px 0";
          // } else {
          //   document.getElementById("gtarget").style.transform =
          //     "translateX(-100px)";
          //   document.querySelector(".msg").style.borderRadius = "0 25px 25px 0";
          // }
        }
      } else {
        entry.target.classList.remove("show");
        if (
          document
            .querySelectorAll(".hidden.active")[0]
            .getAttribute("class") == "hidden active"
        ) {
          document.getElementById("target").style.transform =
            "translateX(00px)";
          document.getElementById("msg").style.borderRadius =
            "25px 25px 25px 25px";
          // } else {
          //   document.getElementById("gtarget").style.transform =
          //     "translateX(00px)";
          //   document.querySelector("msg").style.borderRadius =
          //     "25px 25px 25px 25px";
          // }
        }
      }
    });
  },
  { threshold: 0.6 }
);
const Gobserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        if (
          document.querySelector("contact[id^='G'].hidden.active") &&
          document.querySelector("contact[id^='G'].hidden.active").classList ==
            "hidden active show"
        ) {
          document.getElementById("gtarget").style.transform =
            "translateX(-100px)";
          document.querySelector(".msg").style.borderRadius = "0 25px 25px 0";
        }
      } else {
        entry.target.classList.remove("show");
        if (
          document.querySelector("contact[id^='G'].hidden.active") &&
          document.querySelector("contact[id^='G'].hidden.active").classList ==
            "hidden active"
        ) {
          document.getElementById("gtarget").style.transform =
            "translateX(0px)";
          document.querySelector(".msg").style.borderRadius =
            "25px 25px 25px 25px";
        }
      }
    });
  },
  { threshold: 0.6 }
);
const MMobserver = new MutationObserver((mutationsList) => {
  let vlur = 0;
  mutationsList.forEach((mutation) => {
    if (mutation.type === "attributes") {
      let value = mutation.target.getAttribute(mutation.attributeName);
      if (value) {
        vlur += parseInt(value);
        document.getElementById("BtnChat").setAttribute("count", vlur);
        document.getElementById("BtnChat").style.setProperty("--NTF", "flex");
      }
      if (!vlur) {
        document.getElementById("BtnChat").setAttribute("count", vlur);
        document.getElementById("BtnChat").style.setProperty("--NTF", "");
      }
    }
  });
});

async function GetChats() {
  document.getElementById("MyReply").classList.remove("reply");
  const { _id, LastContact } = await ReadProfile();
  MYID = _id;
  Notify(_id, LastContact);
  // *** Get Chats *** //
  let msg = await GET("Chat", { sender: _id, receiver: LastContact });
  document.getElementById("CallThePerson").setAttribute("value", LastContact);
  document.getElementById("VCallThePerson").setAttribute("value", LastContact);
  const Chat = document.getElementById("Chat");
  Chat.querySelectorAll("sender").forEach((el) => el.remove());
  Chat.querySelectorAll(".sender").forEach((el) => el.remove());
  Chat.querySelectorAll("receiver").forEach((el) => el.remove());
  Chat.querySelectorAll(".receiver").forEach((el) => el.remove());
  if (typeof msg == "object")
    msg.forEach(
      (
        obj = {
          _id,
          sender,
          receiver,
          message,
          Name,
          type,
          Path,
          Data,
          Reply,
          Time,
        },
        index
      ) => {
        if (obj.type != "ack")
          PushMessageElements(
            obj,
            obj.sender == LastContact ? "receiver" : "sender"
          );
        // if (obj.sender == LastContact && obj.type != "ack") {
        //   ReceiveElement = document.createElement("receiver");
        //   ReceiveElement.id = obj._id;
        //   switch (obj.type.split("/")[0]) {
        //     case "text":
        //       if (obj.message == "<<Like>>") {
        //         ReceiveElement.style.background = "none";
        //         ReceiveElement.innerHTML = `<svg viewBox="0 0 256 256" id="LIKE" height="200" width="200"><rect width="256" height="256" fill="none"></rect><path d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z" fill="goldenrod" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path><path d="M80,104l40-80a32,32,0,0,1,32,32V80h61.9a15.9,15.9,0,0,1,15.8,18l-12,96a16,16,0,0,1-15.8,14H80" fill="goldenrod" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path></svg>`;
        //       } else ReceiveElement.innerText = obj.message;
        //       break;
        //     case "audio":
        //       audio = document.createElement("audio");
        //       audio.setAttribute("controls", "");
        //       audio.innerHTML = `<source src=${"." + obj.Path} type=${
        //         obj.type
        //       }>`;
        //       ReceiveElement.appendChild(audio);
        //       break;
        //     case "Del":
        //       ReceiveElement.innerText = "nothing";
        //       break;
        //     case "image":
        //       ReceiveElement = document.createElement("img");
        //       ReceiveElement.classList.add("receiver");
        //       ReceiveElement.setAttribute("src", "." + obj.Path);
        //       break;
        //     case "video":
        //       ReceiveElement = document.createElement("video");
        //       ReceiveElement.classList.add("sender");
        //       ReceiveElement.setAttribute("controls", "");
        //       ReceiveElement.setAttribute("src", "." + obj.Path);
        //       break;
        //     default:
        //       const p = document.createElement("p");
        //       p.innerText = obj.Name;
        //       ReceiveElement.appendChild(p);
        //       ReceiveElement.classList.add("file");
        //       fld = document.createElement("button");
        //       fld.setAttribute("id", "File" + obj._id);
        //       fld.setAttribute("path", "." + obj.Path);
        //       fld.setAttribute("Ftype", obj.type);
        //       fld.innerHTML = FolderBtn;
        //       ReceiveElement.appendChild(fld);
        //       break;
        //   }
        //   Reply = document.createElement("div");
        //   Reply.id = `R${obj._id}`;
        //   if (obj.Reacted) ReceiveElement.classList.add("liked");
        //   Reply.innerHTML = `${ReplyBtn}<button onclick="REACT(this)">${LikeBtn}</button><p>${obj.Time.slice(
        //     0,
        //     5
        //   )}</p>`;
        //   ReceiveElement.appendChild(Reply);
        //   if (obj.Reply) {
        //     const RePlyed = document.createElement("reply");
        //     const target = document.getElementById(obj.Reply).cloneNode(true);
        //     target.classList.value = "";
        //     target.querySelector("div").remove();
        //     target.querySelector("react").remove();
        //     if (target.querySelector("reply"))
        //       target.querySelector("reply").remove();
        //     if (target.childNodes[0].tagName == "svg")
        //       RePlyed.appendChild(target.childNodes[0]);
        //     else if (target.childNodes[0].tagName == undefined)
        //       RePlyed.innerHTML = `<p>${target.innerText.split("\n")[0]}</p>`;
        //     else RePlyed.innerHTML = `<p>Pièce Joint</p>`;
        //     if (
        //       target.tagName == "SENDER" ||
        //       target.classList.contains("sender")
        //     )
        //       RePlyed.setAttribute(
        //         "text",
        //         `${
        //           document.getElementById(LastContact).querySelector("name")
        //             .innerText
        //         } vous a repondu`
        //       );
        //     else
        //       RePlyed.setAttribute(
        //         "text",
        //         `${
        //           document.getElementById(LastContact).querySelector("name")
        //             .innerText
        //         } a lui-même`
        //       );
        //     ReceiveElement.classList.add("GetReplyed");
        //     ReceiveElement.appendChild(RePlyed);
        //   } else {
        //     if (msg[index - 1] && msg[index].sender == msg[index - 1].sender)
        //       ReceiveElement.classList.add("border-top");
        //     if (msg[index + 1] && msg[index].sender == msg[index + 1].sender)
        //       ReceiveElement.classList.add("border-bottom");
        //   }
        //   React = document.createElement("react");
        //   React.innerHTML = LikeBtn;
        //   ReceiveElement.appendChild(React);
        //   chat.appendChild(ReceiveElement);
        //   if (ReceiveElement.querySelector("reply")) {
        //     if (ReceiveElement.querySelector("reply p"))
        //       if (
        //         document.getElementById(obj.Reply).offsetWidth <
        //         chat.offsetWidth * 0.6
        //       )
        //         ReceiveElement.querySelector("reply p").style.minWidth = `${
        //           document.getElementById(obj.Reply).offsetWidth
        //         }px`;
        //       else
        //         ReceiveElement.querySelector("reply p").style.minWidth = `${
        //           chat.offsetWidth * 0.6
        //         }px`;
        //     ReceiveElement.style.marginTop = `${
        //       ReceiveElement.querySelector("reply").offsetHeight + 10
        //     }px`;
        //   }
        // } else if (obj.sender == _id && obj.type != "ack") {
        //   SendElement = document.createElement("sender");
        //   SendElement.id = obj._id;
        //   switch (obj.type.split("/")[0]) {
        //     case "text":
        //       if (obj.message == "<<Like>>") {
        //         SendElement.style.background = "none";
        //         SendElement.innerHTML = `<svg viewBox="0 0 256 256" id="LIKE" height="200" width="200"><rect width="256" height="256" fill="none"></rect><path d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z" fill="goldenrod" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path><path d="M80,104l40-80a32,32,0,0,1,32,32V80h61.9a15.9,15.9,0,0,1,15.8,18l-12,96a16,16,0,0,1-15.8,14H80" fill="goldenrod" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path></svg>`;
        //       } else SendElement.innerText = obj.message;
        //       break;
        //     case "audio":
        //       audio = document.createElement("audio");
        //       // audio.setAttribute("src", obj.Path);
        //       audio.setAttribute("controls", "");
        //       audio.innerHTML = `<source src=${obj.Path} type=${obj.type}>`;
        //       SendElement.appendChild(audio);
        //       SendElement.style.background = "transparent";
        //       break;
        //     case "Del":
        //       SendElement.innerText = "nothing";
        //       break;
        //     case "image":
        //       SendElement = document.createElement("img");
        //       SendElement.classList.add("sender");
        //       SendElement.setAttribute("src", obj.Path);
        //       break;
        //     case "video":
        //       SendElement = document.createElement("video");
        //       SendElement.classList.add("sender");
        //       SendElement.setAttribute("controls", "");
        //       SendElement.setAttribute("src", obj.Path);
        //       break;
        //     default:
        //       const p = document.createElement("p");
        //       p.innerText = obj.Name;
        //       SendElement.appendChild(p);
        //       SendElement.classList.add("file");
        //       fld = document.createElement("button");
        //       fld.setAttribute("id", "File" + obj._id);
        //       fld.setAttribute("path", obj.Path);
        //       fld.setAttribute("Ftype", obj.type);
        //       fld.innerHTML = FolderBtn;
        //       SendElement.appendChild(fld);
        //       break;
        //   }
        //   Reply = document.createElement("div");
        //   Reply.id = `R${obj._id}`;
        //   if (obj.Reacted) SendElement.classList.add("liked");
        //   Reply.innerHTML = `${ReplyBtn}<button onclick="REACT(this)">${LikeBtn}</button><p>${obj.Time.slice(
        //     0,
        //     5
        //   )}</p>`;
        //   SendElement.appendChild(Reply);
        //   if (obj.Reply) {
        //     const RePlyed = document.createElement("reply");
        //     const target = document.getElementById(obj.Reply).cloneNode(true);
        //     target.classList.value = "";
        //     target.querySelector("div").remove();
        //     target.querySelector("react").remove();
        //     if (target.querySelector("reply"))
        //       target.querySelector("reply").remove();
        //     if (target.childNodes[0].tagName == "svg")
        //       RePlyed.appendChild(target.childNodes[0]);
        //     else if (target.childNodes[0].tagName == undefined)
        //       RePlyed.innerHTML = `<p>${target.innerText.split("\n")[0]}</p>`;
        //     else RePlyed.innerHTML = `<p>Pièce Joint</p>`;
        //     if (
        //       target.tagName == "SENDER" ||
        //       target.classList.contains("sender")
        //     )
        //       RePlyed.setAttribute("text", `Vous avais repondu à vous-même`);
        //     else
        //       RePlyed.setAttribute(
        //         "text",
        //         `Vous avais repondu à ${
        //           document.getElementById(LastContact).querySelector("name")
        //             .innerText
        //         }`
        //       );
        //     SendElement.appendChild(RePlyed);
        //   } else {
        //     if (msg[index - 1] && msg[index].sender == msg[index - 1].sender)
        //       SendElement.classList.add("border-top");
        //     if (msg[index + 1] && msg[index].sender == msg[index + 1].sender)
        //       SendElement.classList.add("border-bottom");
        //   }
        //   React = document.createElement("react");
        //   React.innerHTML = LikeBtn;
        //   SendElement.appendChild(React);
        //   chat.appendChild(SendElement);
        //   if (SendElement.querySelector("reply")) {
        //     if (SendElement.querySelector("reply p"))
        //       if (
        //         document.getElementById(obj.Reply).offsetWidth <
        //         chat.offsetWidth * 0.6
        //       )
        //         SendElement.querySelector("reply p").style.minWidth = `${
        //           document.getElementById(obj.Reply).offsetWidth
        //         }px`;
        //       else
        //         SendElement.querySelector("reply p").style.minWidth = `${
        //           chat.offsetWidth * 0.6
        //         }px`;
        //     SendElement.style.marginTop = `${
        //       SendElement.querySelector("reply").offsetHeight + 10
        //     }px`;
        //   }
        // }
      }
    );
  chat.scrollTop = chat.scrollHeight - chat.offsetHeight;
}
async function GetGroupChats() {
  const { _id, LastGroup } = await ReadProfile();
  MYID = _id;
  // *** Get Chats *** //
  await GETGrp("Chat", { Groupid: LastGroup.slice(1) }, _id, async (ACK) => {
    msg = JSON.parse(await ACK);
    const GChat = document.querySelector(".Chat");
    GChat.querySelectorAll("sender").forEach((el) => el.remove());
    GChat.querySelectorAll(".sender").forEach((el) => el.remove());
    GChat.querySelectorAll("receiver").forEach((el) => el.remove());
    GChat.querySelectorAll(".receiver").forEach((el) => el.remove());
    if (typeof msg == "object")
      msg.map((obj, index) => {
        if (obj.sender != _id && obj.type != "ack") {
          ReceiveElement = document.createElement("receiver");
          ReceiveElement.id = obj._id;
          switch (obj.type.split("/")[0]) {
            case "text":
              if (obj.message == "<<Like>>") {
                ReceiveElement.style.background = "none";
                ReceiveElement.innerHTML = `<svg viewBox="0 0 256 256" id="LIKE" height="200" width="200"><rect width="256" height="256" fill="none"></rect><path d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z" fill="goldenrod" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path><path d="M80,104l40-80a32,32,0,0,1,32,32V80h61.9a15.9,15.9,0,0,1,15.8,18l-12,96a16,16,0,0,1-15.8,14H80" fill="goldenrod" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path></svg>`;
              } else ReceiveElement.innerText = obj.message;
              break;
            case "audio":
              audio = document.createElement("audio");
              // audio.setAttribute("src", obj.Path);
              audio.setAttribute("controls", "");
              audio.innerHTML = `<source src=${"." + obj.Path} type=${
                obj.type
              }>`;
              ReceiveElement.appendChild(audio);
              break;
            case "Del":
              ReceiveElement.innerText = "nothing";
              break;
            case "image":
              ReceiveElement = document.createElement("img");
              ReceiveElement.classList.add("receiver");
              ReceiveElement.setAttribute("src", "." + obj.Path);
              break;
            case "video":
              ReceiveElement = document.createElement("video");
              ReceiveElement.classList.add("sender");
              ReceiveElement.setAttribute("controls", "");
              ReceiveElement.setAttribute("src", "." + obj.Path);
              break;
            default:
              const p = document.createElement("p");
              p.innerText = obj.Name;
              ReceiveElement.appendChild(p);
              ReceiveElement.classList.add("file");
              fld = document.createElement("button");
              fld.setAttribute("id", "File" + obj._id);
              fld.setAttribute("path", "." + obj.Path);
              fld.setAttribute("Ftype", obj.type);
              fld.innerHTML = FolderBtn;
              ReceiveElement.appendChild(fld);
              break;
          }
          Reply = document.createElement("div");
          Reply.id = `R${obj._id}`;
          Reply.innerHTML = `${ReplyBtn}<button onclick="REACT(this)">${LikeBtn}</button><p>${obj.Time.slice(
            0,
            5
          )}</p>`;
          ReceiveElement.appendChild(Reply);
          React = document.createElement("react");
          React.innerHTML = LikeBtn;
          ReceiveElement.appendChild(React);
          const clonedElement = document
            .getElementById(obj.sender)
            .cloneNode(true);
          clonedElement.style.setProperty("--SD", "none");
          clonedElement.classList.value = "";
          clonedElement.style.display = "";
          if (msg[index - 1] && msg[index].sender == msg[index - 1].sender)
            ReceiveElement.classList.add("border-top");
          if (msg[index - 1] && msg[index].sender != msg[index - 1].sender) {
            clonedElement.getElementsByTagName("name")[0].style.display = "";
            ReceiveElement.style.marginTop = "20px";
          } else clonedElement.style.display = "none";
          if (msg[index + 1] && msg[index].sender == msg[index + 1].sender)
            ReceiveElement.classList.add("border-bottom");
          ReceiveElement.appendChild(clonedElement);
          GChat.appendChild(ReceiveElement);
        } else if (obj.sender == _id && obj.type != "ack") {
          SendElement = document.createElement("sender");
          SendElement.id = obj._id;
          switch (obj.type.split("/")[0]) {
            case "text":
              if (obj.message == "<<Like>>") {
                SendElement.style.background = "none";
                SendElement.innerHTML = `<svg viewBox="0 0 256 256" id="LIKE" height="200" width="200"><rect width="256" height="256" fill="none"></rect><path d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z" fill="goldenrod" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path><path d="M80,104l40-80a32,32,0,0,1,32,32V80h61.9a15.9,15.9,0,0,1,15.8,18l-12,96a16,16,0,0,1-15.8,14H80" fill="goldenrod" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path></svg>`;
              } else SendElement.innerText = obj.message;
              break;
            case "audio":
              audio = document.createElement("audio");
              // audio.setAttribute("src", obj.Path);
              audio.setAttribute("controls", "");
              audio.innerHTML = `<source src=${obj.Path} type=${obj.type}>`;
              SendElement.appendChild(audio);
              SendElement.style.background = "transparent";
              break;
            case "Del":
              SendElement.innerText = "nothing";
              break;
            case "image":
              img = document.createElement("img");
              img.setAttribute("src", obj.Path);
              SendElement.appendChild(img);
              SendElement.style.background = "transparent";
              break;
            case "video":
              video = document.createElement("video");
              video.setAttribute("controls", "");
              video.setAttribute("src", obj.Path);
              SendElement.appendChild(video);
              SendElement.style.background = "transparent";
              break;
            default:
              const p = document.createElement("p");
              p.innerText = obj.Name;
              SendElement.appendChild(p);
              SendElement.classList.add("file");
              fld = document.createElement("button");
              fld.setAttribute("id", "File" + obj._id);
              fld.setAttribute("path", obj.Path);
              fld.setAttribute("Ftype", obj.type);
              fld.innerHTML = FolderBtn;
              SendElement.appendChild(fld);
              break;
          }
          Reply = document.createElement("div");
          Reply.id = `R${obj._id}`;
          Reply.innerHTML = `${ReplyBtn}<button onclick="REACT(this)">${LikeBtn}</button><p>${obj.Time.slice(
            0,
            5
          )}</p>`;
          SendElement.appendChild(Reply);
          React = document.createElement("react");
          React.innerHTML = LikeBtn;
          SendElement.appendChild(React);
          if (msg[index - 1] && msg[index].sender == msg[index - 1].sender)
            SendElement.classList.add("border-top");

          if (msg[index + 1] && msg[index].sender == msg[index + 1].sender)
            SendElement.classList.add("border-bottom");

          GChat.appendChild(SendElement);
        }
      });
    GChat.scrollTop = GChat.scrollHeight - GChat.offsetHeight;
  }).catch((e) => console.error(e));
}

// *** Set Status *** //
ReadProfile().then(({ Status, admin }) => {
  if (Status == "Busy") document.getElementById("Busy").checked = true;
  if (admin) document.querySelector("h1 btn").classList.remove("notAdmin");
});

window.addEventListener("DOMContentLoaded", async () => {
  var chat = document.getElementById("Chat");
  var ack = document.getElementById("ack");
  const data = await ReadProfile();
  // *** Get Profile *** //
  var Pro = document.getElementById("Profil");
  if (data.Image.Photo) Pro.style.backgroundImage = `url(${data.Image.URL})`;
  else {
    Pro.style.backgroundColor = data.Image.Color;
    Pro.innerHTML = `<p>${data.Name[0]}</p>`;
  }
  document.getElementById(
    "Profilname"
  ).innerHTML = `${data.Name} ${data.FamilyName}`;
  // *** Get Contacts And Groups *** //
  Nav = document.getElementById("nav");
  Contact(async (Contact) => {
    let nameCount = 0;
    let gnameCount = 0;
    Contact.forEach((item) => {
      if ("Name" in item) {
        nameCount++;
      }
      if ("Gname" in item) {
        gnameCount++;
      }
    });

    var CSS = document.createElement("style");
    for (i = 0; i < nameCount; i++) {
      CSS.append(
        `#nav contact:nth-of-type(${
          i + 1
        }).active ~ div#indicator{transform: translateY(calc(75px*${i}));}`
      );
      var CT = document.createElement("contact");
      CT.classList.add("hidden");
      CT.id = Contact[i]._id;
      if (Contact[i].Image.Photo) {
        CT.style.backgroundImage = `url(${Contact[i].Image.URL})`;
        CT.innerHTML = `<name style="display:none;">${Contact[i].Name}</name>`;
      } else {
        CT.style.backgroundColor = Contact[i].Image.Color;
        CT.innerHTML = `<p>${Contact[i].Name[0]}</p><name style="display:none;">${Contact[i].Name}</name><fname style="display:none;">${Contact[i].FamilyName}</fname>`;
        createCircleImageWithLetter(
          Contact[i].Name[0],
          Contact[i].Image.Color,
          "#fff",
          `./Data/Image/${Contact[i].Name}.ico`
        );
      }
      Nav.appendChild(CT);
    }
    for (i = 0; i < gnameCount; i++) {
      CSS.append(
        `#nav contact[id^='G']:nth-of-type(${
          i + nameCount + 1
        }).active ~ div#indicator{
          transform: translateY(calc(75px*${i}));
        }`
      );
      var CT = document.createElement("contact");
      CT.classList.add("hidden");
      CT.id = `G${Contact[i + nameCount]._id}`;
      CT.style.backgroundColor = "#5648";
      CT.innerHTML = `<p>${
        Contact[i + nameCount].Gname[0]
      }</p><name style="display:none;">${Contact[i + nameCount].Gname}</name>`;
      Nav.appendChild(CT);
    }
    div = document.createElement("div");
    div.id = "indicator";
    let addbtn = document.createElement("button");
    addbtn.classList = "hidden show";
    addbtn.style.backgroundColor = "#5456";
    addbtn.innerHTML = PlusBtn;
    addbtn.setAttribute("onclick", "AddGroup()");
    Nav.appendChild(div);
    Nav.appendChild(addbtn);

    document
      .querySelectorAll("#nav contact[id^='G'],#nav button:not(info button)")
      .forEach((e) => (e.style.display = "none"));
    chat.scrollTop = chat.scrollHeight - chat.offsetHeight;
    const contactElements = document.querySelectorAll("#nav contact");
    contactElements.forEach((contactElement) =>
      contactElement.addEventListener("click", async (event) => {
        // *** Animate The Indicator *** //
        contactElements.forEach((contact) =>
          contact.classList.remove("active")
        );
        contactElement.classList.add("active");
        if (!event.currentTarget.id.startsWith("G")) {
          var Starget = document.getElementById("target");
          var starget = document.getElementById("starget");
          Starget.style.transform = "translateX(-100px)";
          document.getElementById("msg").style.borderRadius = "0 25px 25px 0";
          Starget.innerHTML = contactElement.innerHTML;
          Starget.style.backgroundColor = contactElement.style.backgroundColor;
          Starget.style.backgroundImage = contactElement.style.backgroundImage;
          starget.innerHTML = contactElement.innerHTML;
          starget.style.backgroundColor = contactElement.style.backgroundColor;
          starget.style.backgroundImage = contactElement.style.backgroundImage;
          document.getElementById("targetname").innerHTML =
            contactElement.querySelectorAll("name")[0].textContent;
          document.getElementById("stargetname").innerHTML =
            contactElement.querySelectorAll("name")[0].textContent +
            " " +
            contactElement.querySelectorAll("fname")[0].textContent;
        } else {
          var Starget = document.getElementById("gtarget");
          var starget = document.getElementById("Gtarget");
          Starget.style.transform = "translateX(-100px)";
          document.getElementById("msg").style.borderRadius = "0 25px 25px 0";
          Starget.innerHTML = contactElement.innerHTML;
          Starget.style.backgroundColor = contactElement.style.backgroundColor;
          Starget.style.backgroundImage = contactElement.style.backgroundImage;
          starget.innerHTML = contactElement.innerHTML;
          starget.style.backgroundColor = contactElement.style.backgroundColor;
          starget.style.backgroundImage = contactElement.style.backgroundImage;
          document.getElementById("gtargetname").innerHTML =
            contactElement.querySelectorAll("name")[0].textContent;
          document.getElementById("Gtargetname").innerHTML =
            contactElement.querySelectorAll("name")[0].textContent;
        }
      })
    );
    const observerConfig = {
      attributes: true, // Set to true to observe attribute changes
      attributeFilter: ["notif"], // Specify the attribute(s) you want to observe
    };
    document
      .querySelectorAll("#nav contact:not([id^='G']).hidden")
      .forEach((el) => {
        observer.observe(el);
        MMobserver.observe(el, observerConfig);
      });
    document
      .querySelectorAll("#nav contact[id^='G'].hidden")
      .forEach((el) => Gobserver.observe(el));
    document.getElementById("style").innerHTML = CSS.innerHTML;
    StartListenToNav();
    document.getElementById(data.LastContact).click();
    vlur = 0;
    chat.scrollTop = chat.scrollHeight - chat.offsetHeight;
    GetStatus();
  });

  const CallBtn = document.getElementById("CallThePerson");
  const VCallBtn = document.getElementById("VCallThePerson");
  CallBtn.setAttribute("value", data.LastContact);
  VCallBtn.setAttribute("value", data.LastContact);
  CallBtn.addEventListener("click", () => {
    AudioCall(data._id, CallBtn.getAttribute("value")).then((result) => {
      if (result) {
        scrollToElement("Call", document.getElementById("BtnCall"));
        AudioWaves("audiotrackcanvas", "CloseCall");
      } else console.log(result);
    });
  });
  VCallBtn.addEventListener("click", () => {
    window.UseMedia.VideoCall(MYID, CallBtn.getAttribute("value")).then(
      (result) => {
        if (result) {
          document.getElementById("Vusers").classList.add("calling");
          scrollToElement("VCall", document.getElementById("BtnVCall"));
        } else console.log("error");
      }
    );
  });
  document.querySelector("#MSG").addEventListener("input", (event) => {
    let Typing =
      event.target.value.length === 1
        ? true
        : event.target.value.length > 1
        ? undefined
        : event.target.value === ""
        ? false
        : false;
    if (Typing || Typing == false) {
      ReadProfile().then(({ _id, LastContact }) => {
        let data = { sender: _id, receiver: LastContact };
        Type({ ...data, type: "ImTyping", Typing });
      });
    }
  });
  // *** Contact Menu *** //
  for (const e of document
    .getElementById("Cprofile")
    .getElementsByTagName("button")) {
    e.addEventListener("click", () => {
      text = e.textContent.split(" ").filter((str) => str.trim() !== "")[0];
      console.log(text.split());
      if (text != "Clear") {
        e.classList.toggle("show");
      } else if (text == "Clear") {
        notif = document.getElementById("Notif");
        ptext = document.querySelector("#Notif p");
        yes = document.getElementById("true");
        no = document.getElementById("false");
        ptext.innerHTML = "Are you Sure to Clear Messages ?";
        yes.innerHTML = "Yes";
        yes.setAttribute("onclick", "ClearMsg()");

        no.innerHTML = "No";
        no.setAttribute("onclick", 'notif.classList.remove("show");');
        notif.classList.add("show");
      }
    });
  }
});

function ClearMsg() {
  Clear(async () => {
    const Chat = document.getElementById("Chat");
    Chat.querySelectorAll("sender").forEach((el) => el.remove());
    Chat.querySelectorAll(".sender").forEach((el) => el.remove());
    Chat.querySelectorAll("receiver").forEach((el) => el.remove());
    Chat.querySelectorAll(".receiver").forEach((el) => el.remove());
    document.getElementById("ack").innerHTML = "";
  });
  notif.classList.remove("show");
  // Refresh();
}

async function AddGroup() {
  await AddData("Groups", {
    Gname: "test",
    Users: ["645e58ba07f94ec6ab0c95b0"],
  });
}

function PushElement(OBJ, target) {
  const chat = document.querySelector(target);
  var SendElement = document.createElement("sender");
  SendElement.id = OBJ._id;
  switch (OBJ.type.split("/")[0]) {
    case "text":
      if (OBJ.message == "<<Like>>") {
        SendElement.style.background = "none";
        SendElement.innerHTML = `<svg viewBox="0 0 256 256" id="LIKE" height="200" width="200"><rect width="256" height="256" fill="none"></rect><path d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z" fill="goldenrod" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path><path d="M80,104l40-80a32,32,0,0,1,32,32V80h61.9a15.9,15.9,0,0,1,15.8,18l-12,96a16,16,0,0,1-15.8,14H80" fill="goldenrod" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path></svg>`;
      } else SendElement.innerText = OBJ.message;
      break;
    case "audio":
      audio = document.createElement("audio");
      audio.setAttribute("src", OBJ.Path);
      audio.setAttribute("controls", "");
      audio.innerHTML = `<source src=${OBJ.Path} type=${OBJ.type}>`;
      SendElement.appendChild(audio);
      SendElement.style.background = "transparent";
      break;
    case "Del":
      SendElement.innerText = "nothing";
      break;
    case "image":
      SendElement = document.createElement("img");
      SendElement.classList.add("sender");
      SendElement.setAttribute("src", OBJ.Path);
      break;
    case "video":
      SendElement = document.createElement("video");
      SendElement.classList.add("sender");
      SendElement.setAttribute("controls", "");
      SendElement.setAttribute("src", OBJ.Path);
      break;
    default:
      const p = document.createElement("p");
      p.innerText = OBJ.Name;
      SendElement.appendChild(p);
      SendElement.classList.add("file");
      fld = document.createElement("button");
      fld.setAttribute("id", "File" + OBJ._id);
      fld.setAttribute("path", OBJ.Path);
      fld.setAttribute("Ftype", OBJ.type);
      fld.innerHTML = FolderBtn;
      SendElement.appendChild(fld);
      break;
  }
  Reply = document.createElement("div");
  Reply.id = `R${OBJ._id}`;
  Reply.innerHTML = `${ReplyBtn}<button onclick="REACT(this)">${LikeBtn}</button><p>${OBJ.Time.slice(
    0,
    5
  )}</p>`;
  SendElement.appendChild(Reply);
  React = document.createElement("react");
  React.innerHTML = LikeBtn;
  SendElement.appendChild(React);
  if (OBJ.Reply) {
    const RePlyed = document.createElement("reply");
    const target = document.getElementById(OBJ.Reply).cloneNode(true);
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
      RePlyed.setAttribute("text", `Vous avais repondu à vous-même`);
    else
      RePlyed.setAttribute(
        "text",
        `Vous avais repondu à ${
          document.getElementById(OBJ.receiver).querySelector("name").innerText
        }`
      );
    SendElement.classList.add("GetReplyed");
    SendElement.appendChild(RePlyed);
  } else {
    if (
      [
        ...document.querySelectorAll(
          "#Chat sender,#Chat .sender,#Chat .receiver,#Chat receiver"
        ),
      ]
        .at(-1)
        .classList.value.startsWith("sender") ||
      [
        ...document.querySelectorAll(
          "#Chat sender,#Chat .sender,#Chat .receiver,#Chat receiver"
        ),
      ].at(-1).tagName == "SENDER"
    ) {
      [
        ...document.querySelectorAll(
          "#Chat sender,#Chat .sender,#Chat .receiver,#Chat receiver"
        ),
      ]
        .at(-1)
        .classList.add("border-bottom");
      SendElement.classList.add("border-top");
    }
  }
  SendElement.classList.add("push");
  chat.style.scrollBehavior = "smooth";
  chat.appendChild(SendElement);
  if (SendElement.querySelector("reply")) {
    if (SendElement.querySelector("reply p"))
      if (
        document.getElementById(OBJ.Reply).offsetWidth <
        chat.offsetWidth * 0.6
      )
        SendElement.querySelector("reply p").style.minWidth = `${
          document.getElementById(OBJ.Reply).offsetWidth
        }px`;
      else
        SendElement.querySelector("reply p").style.minWidth = `${
          chat.offsetWidth * 0.6
        }px`;
    SendElement.style.marginTop = `${
      SendElement.querySelector("reply").offsetHeight + 10
    }px`;
  }
  chat.scrollTop = chat.scrollHeight - chat.offsetHeight;
  setTimeout(() => {
    chat.style.scrollBehavior = "";
    SendElement.classList.remove("push");
  }, 300);
}
// *** send a message *** //
const TextInput = document.getElementById("text");
const GTextInput = document.getElementsByClassName("text")[0];
TextInput.addEventListener("submit", async (event) => {
  event.preventDefault();
  msg = document.getElementById("MSG").value;
  if (msg != "" && msg != "\n") {
    document.getElementById("MSG").value = null;
    document.getElementById(
      "send"
    ).innerHTML = `<button onclick="send()"><svg viewBox="0 0 256 256" id="LIKE" height="40" width="40"><rect width="256" height="256" fill="none"></rect><path d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path><path d="M80,104l40-80a32,32,0,0,1,32,32V80h61.9a15.9,15.9,0,0,1,15.8,18l-12,96a16,16,0,0,1-15.8,14H80" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path></svg></button>`;
    const reply = document.getElementById("MyReply");
    let Reply;
    if (reply.classList.contains("reply")) Reply = reply.getAttribute("target");
    else Reply = false;
    reply.classList.remove("reply");
    const { _id, LastContact } = await ReadProfile();
    PushElement(
      await Send({
        sender: _id,
        receiver: LastContact,
        message: msg,
        type: "text",
        Reply,
      }),
      "#Chat"
    ).catch((error) => {
      console.error(error);
    });
  }
});
GTextInput.addEventListener("submit", async (event) => {
  event.preventDefault();
  msg = document.getElementsByClassName("MSG")[0].value;
  if (msg != "" && msg != "\n") {
    document.getElementsByClassName("MSG")[0].value = null;
    document.getElementById(
      "Gsend"
    ).innerHTML = `<button onclick="send()" id="Gsender"><svg viewBox="0 0 256 256" id="LIKE" height="40" width="40"><rect width="256" height="256" fill="none"></rect><path d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path><path d="M80,104l40-80a32,32,0,0,1,32,32V80h61.9a15.9,15.9,0,0,1,15.8,18l-12,96a16,16,0,0,1-15.8,14H80" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path></svg></button>`;
    const { _id, LastGroup } = await ReadProfile();
    PushElement(
      await Send({
        Groupid: LastGroup,
        sender: _id,
        message: msg,
        type: "text",
      }),
      ".Chat"
    );
  }
});

// *** send Like *** //
async function send() {
  const { _id, LastGroup } = await ReadProfile();
  PushElement(
    await Send({
      sender: _id,
      receiver: LastContact,
      message: "<<Like>>",
      type: "text",
    }),
    "#Chat"
  );
}
async function Gsend() {
  const { _id, LastGroup } = await ReadProfile();
  PushElement(
    await Send({
      Groupid: LastGroup,
      sender: _id,
      message: "<<Like>>",
      type: "text",
    }),
    ".Chat"
  );
}

async function REACT(btn) {
  document.getElementById(btn.parentNode.id.slice(1)).classList.toggle("liked");
  await UpdateData("Chat", parseInt(btn.parentElement.id.slice(1)), {
    Reacted: document.getElementById(btn.parentNode.id.slice(1)).classList.value
      ? true
      : false,
  });
}
async function REPLY(btn) {
  const target = document.getElementById(btn.parentNode.id.slice(1));
  let REPLYDIV;
  if (target.parentNode.id == "Chat") {
    document.getElementById("MSG").focus();
    REPLYDIV = document.getElementById("MyReply");
    REPLYDIV.innerHTML =
      '<button onclick="CloseReply()" >+</button><h2>Repondre ...</h2><p></p>';
  } else {
    document.querySelector(".MSG").focus();
    REPLYDIV = document.getElementById("GMyReply");
    REPLYDIV.innerHTML =
      '<button onclick="GCloseReply()" >+</button><h2>Repondre ...</h2><p></p>';
  }
  if (target.tagName == "SENDER")
    REPLYDIV.querySelector("h2").innerText = `Répondre à vous-même`;
  else {
    REPLYDIV.querySelector("h2").innerText = `Répondre à ${
      document.getElementById("targetname").innerText
    }`;
    if (target.parentNode.id != "Chat")
      REPLYDIV.querySelector("h2").innerText = `Répondre à ${
        target.querySelector("contact name").innerHTML
      }`;
  }
  REPLYDIV.classList.add("reply");
  REPLYDIV.setAttribute("target", target.id);
  if (
    target.firstElementChild.tagName == "svg" ||
    target.firstElementChild.tagName == "IMG" ||
    target.firstElementChild.tagName == "video"
  )
    REPLYDIV.appendChild(target.firstElementChild.cloneNode(true));
  else REPLYDIV.querySelector("p").innerText = target.innerText.split("\n")[0];
  chat.style.scrollBehavior = "smooth";
  chat.scrollTop = chat.scrollHeight - chat.offsetHeight;
  setTimeout(() => (chat.style.scrollBehavior = ""), 150);
}

function CloseReply() {
  document.getElementById("MyReply").classList.remove("reply");
}
function GCloseReply() {
  document.getElementById("GMyReply").classList.remove("reply");
}

async function file(To, moreData = {}) {
  const { _id, LastContact, LastGroup } = await ReadProfile();
  let Target =
    To == "#Chat"
      ? { sender: _id, receiver: LastContact }
      : { Groupid: LastGroup, sender: _id };
  PushElement(
    await Send({
      ...Target,
      type: "file",
      ...moreData,
    }),
    To
  );
}

function GetStatus() {
  Status();
  setTimeout(() => GetStatus(), 60000);
}

let audio = 1;
function RecordAudio() {
  if (audio) {
    audio = 0;
    window.UseMedia.StartAudioRecorder((data) => file("#Chat", data));
  } else {
    window.UseMedia.StopAudioRecorder();
    audio = 1;
  }
}
function ReturnFromAdmin() {
  document.getElementById("UsersMananger").innerHTML = "";
  document.getElementById("Content").classList.remove("hide");
  [...document.querySelectorAll("#STG btn")][0].classList.add("slide");
  [...document.querySelectorAll("#STG btn button")][0].classList.add("hide");
}
function UsersMananger() {
  document.getElementById("Content").classList.remove("hide");
  [...document.querySelectorAll("#STG btn")][0].classList.remove("slide");
  [...document.querySelectorAll("#STG btn button")][0].classList.remove("hide");
  const UsersShower = document.getElementById("UsersMananger");
  UsersShower.innerHTML = "";
  const LesUsers = document.querySelectorAll('#nav contact:not([id^="G"])');
  document.getElementById("Content").classList.add("hide");
  [...LesUsers].forEach((user) => {
    const clonedElement = user.cloneNode(true);
    clonedElement.style.setProperty("--SD", "none");
    const username =
      clonedElement.getElementsByTagName("name")[0].innerText +
      " " +
      clonedElement.getElementsByTagName("fname")[0].innerText;
    const p = document.createElement("p");
    p.innerText = username;
    const div = document.createElement("div");
    const button = document.createElement("button");
    button.innerText = "Ban =>";
    div.appendChild(clonedElement);
    div.appendChild(p);
    div.appendChild(button);
    UsersShower.appendChild(div);
  });
}
function AddUsers() {
  document.getElementById("Content").classList.remove("hide");
  [...document.querySelectorAll("#STG btn button")][0].classList.remove("hide");
  [...document.querySelectorAll("#STG btn")][0].classList.remove("slide");
  const UsersShower = document.getElementById("UsersMananger");
  UsersShower.innerHTML = "";
  document.getElementById("Content").classList.add("hide");
  NewContact((users) => {
    if (users.length === 0) UsersShower.innerHTML = "Pas De Demands Disponible";
    else
      users.forEach((user) => {
        const p = document.createElement("p");
        p.innerText =
          "Prénom : " +
          user.Name +
          "\nNom :" +
          user.FamilyName +
          "\nN° Bureau : " +
          user.Bureau +
          "\nEmail : " +
          user.Email;
        const div = document.createElement("div");
        const accept = document.createElement("button");
        accept.setAttribute(
          "onclick",
          `ResponseNewUser(true,"${user.Email}").then(()=>AddUsers());`
        );
        accept.innerText = true;
        const refuse = document.createElement("button");
        refuse.setAttribute(
          "onclick",
          `ResponseNewUser(false,"${user.Email}").then(()=>AddUsers());`
        );
        refuse.innerText = false;
        div.appendChild(p);
        div.appendChild(accept);
        div.appendChild(refuse);
        UsersShower.appendChild(div);
      });
  });
}
function GetUsersReports() {
  document.getElementById("Content").classList.remove("hide");
  [...document.querySelectorAll("#STG btn button")][0].classList.remove("hide");
  [...document.querySelectorAll("#STG btn")][0].classList.remove("slide");
  const UsersShower = document.getElementById("UsersMananger");
  UsersShower.innerHTML = "";
  document.getElementById("Content").classList.add("hide");
  NewContact((users) => {
    if (users.length === 0) UsersShower.innerHTML = "Pas De Demands Disponible";
    else
      users.forEach((user) => {
        const p = document.createElement("p");
        p.innerText =
          "Prénom : " +
          user.Name +
          "\nNom :" +
          user.FamilyName +
          "\nN° Bureau : " +
          user.Bureau +
          "\nEmail : " +
          user.Email;
        const div = document.createElement("div");
        const accept = document.createElement("button");
        accept.setAttribute(
          "onclick",
          `ResponseNewUser(true,"${user.Email}").then(()=>AddUsers());`
        );
        accept.innerText = true;
        const refuse = document.createElement("button");
        refuse.setAttribute(
          "onclick",
          `ResponseNewUser(false,"${user.Email}").then(()=>AddUsers());`
        );
        refuse.innerText = false;
        div.appendChild(p);
        div.appendChild(accept);
        div.appendChild(refuse);
        UsersShower.appendChild(div);
      });
  });
}
function ChatColor(color) {
  color = color.classList.value;
  const element = document.body;
  const classNames = element.className.split(" ");
  const filteredClassNames = classNames.filter(
    (className) => className === "lightMode"
  );
  if (filteredClassNames.length > 0)
    element.className = filteredClassNames.join(" ");
  else element.className = "";
  element.classList.add(color);
}

async function ShowSettings() {
  document.getElementById("STG").classList.add("blur");
  const usersreq = [...document.querySelectorAll("#STG btn button")][2];
  const usersrep = [...document.querySelectorAll("#STG btn button")][3];
  NewContact((users) => {
    if (users.length) {
      usersreq.setAttribute("notif", users.length);
      usersreq.style.setProperty("--SHOW", "bloc");
    } else usersreq.style.setProperty("--SHOW", "");
  });
  GETReports((users) => {
    if (users.length) {
      usersrep.setAttribute("notif", users.length);
      usersrep.style.setProperty("--SHOW", "bloc");
    } else usersrep.style.setProperty("--SHOW", "");
  });
}
