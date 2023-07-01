const { contextBridge, ipcRenderer, shell } = require("electron");
const fs = require("fs");
const { ObjectId } = require("mongodb");
const path = require("path");
const mime = require("mime");
const moment = require("moment");
const Peer = require("simple-peer");
const socketIOClient = require("socket.io-client");
const {
  hashPassword,
  verifyPassword,
} = require("../Models/PassWordHash.models");
const { Save, Read } = require("../Models/StoreData.models");
const {
  GetData,
  AddData,
  UpdateData,
  DelData,
} = require("../Models/Mongodb.models");
const {
  CheckEmailOnGoogleSheet,
  CheckClientSecret,
  CheckSpreadsheetId,
} = require("../Models/SpeedSheet.models");
// =>> mui

// The BTNs
const {
  FolderBtn,
  BigLikeBtn,
  LittleLikeBtn,
  PauseBtn,
  ReplyBtn,
  TrasBtn,
  VocalMsg,
} = require("../Models/SVGs.models");
const { PushMessageElements } = require("../Models/Functions.models");
// *** Main Communication *** //
{
  ipcRenderer.on("RMSG", async (event, data) => {
    PushMessageElements(data, "receiver", true);
    //   let ReceiveElement = document.createElement("receiver");
    //   ReceiveElement.id = data[0]._id;
    //   ReceiveElement.classList.add("push");
    //   switch (data[0].type.split("/")[0]) {
    //     case "text":
    //       if (data[0].message == "<<Like>>") {
    //         ReceiveElement.style.background = "none";
    //         ReceiveElement.innerHTML = `<svg viewBox="0 0 256 256" id="LIKE" height="200" width="200"><rect width="256" height="256" fill="none"></rect><path d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z" fill="goldenrod" stroke="var(--color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path><path d="M80,104l40-80a32,32,0,0,1,32,32V80h61.9a15.9,15.9,0,0,1,15.8,18l-12,96a16,16,0,0,1-15.8,14H80" fill="goldenrod" stroke="var(--color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" id="mainIconPathAttribute"></path></svg>`;
    //       } else ReceiveElement.innerText = data[0].message;
    //       break;
    //     case "audio":
    //       audio = document.createElement("audio");
    //       audio.setAttribute("controls", "");
    //       audio.innerHTML = `<source src=${"." + data[0].Path} type=${
    //         data[0].type
    //       }>`;
    //       ReceiveElement.appendChild(audio);
    //       break;
    //     case "Del":
    //       ReceiveElement.innerText = "nothing";
    //       break;
    //     case "image":
    //       ReceiveElement = document.createElement("img");
    //       ReceiveElement.classList.add("receiver");
    //       ReceiveElement.setAttribute("src", "." + data[0].Path);
    //       break;
    //     case "video":
    //       ReceiveElement = document.createElement("video");
    //       ReceiveElement.classList.add("receiver");
    //       ReceiveElement.setAttribute("controls", "");
    //       ReceiveElement.setAttribute("src", "." + data[0].Path);
    //       break;
    //     default:
    //       const p = document.createElement("p");
    //       p.innerText = data[0].Name;
    //       SendElement.appendChild(p);
    //       ReceiveElement.classList.add("file");
    //       fld = document.createElement("button");
    //       fld.setAttribute("id", "File" + data[0]._id);
    //       if (data[0].type.split("/")[1].includes("-"))
    //         fld.setAttribute(
    //           "onclick",
    //           `window.OpenFile("${data[0].Path.replace(/\\/g, "\\\\")}")`
    //         );
    //       else fld.setAttribute("path", "." + data[0].Path);
    //       fld.setAttribute("Ftype", data[0].type);
    //       // fld.setAttribute('onclick',window.location.href)
    //       fld.innerHTML = FolderBtn;
    //       ReceiveElement.appendChild(fld);
    //       break;
    //   }
    //   Reply = document.createElement("div");
    //   Reply.id = `R${data[0]._id}`;
    //   Reply.innerHTML = `${ReplyBtn}<button onclick="REACT(this)">${LittleLikeBtn}</button><p>${data[0].Time.slice(
    //     0,
    //     5
    //   )}</p>`;
    //   ReceiveElement.appendChild(Reply);
    //   React = document.createElement("react");
    //   React.innerHTML = LittleLikeBtn;
    //   ReceiveElement.appendChild(React);
    //   if (data[0].Reply) {
    //     const RePlyed = document.createElement("reply");
    //     const target = document.getElementById(data[0].Reply).cloneNode(true);
    //     target.classList.value = "";
    //     target.querySelector("div").remove();
    //     target.querySelector("react").remove();
    //     if (target.querySelector("reply")) target.querySelector("reply").remove();
    //     if (target.childNodes[0].tagName == "svg")
    //       RePlyed.appendChild(target.childNodes[0]);
    //     else if (target.childNodes[0].tagName == undefined)
    //       RePlyed.innerHTML = `<p>${target.innerText.split("\n")[0]}</p>`;
    //     else RePlyed.innerHTML = `<p>Pièce Joint</p>`;

    //     if (target.tagName == "SENDER" || target.classList.contains("sender"))
    //       RePlyed.setAttribute(
    //         "text",
    //         `${
    //           document.getElementById(data[0].sender).querySelector("name")
    //             .innerText
    //         } vous a repondu`
    //       );
    //     else
    //       RePlyed.setAttribute(
    //         "text",
    //         `${
    //           document.getElementById(data[0].sender).querySelector("name")
    //             .innerText
    //         } a lui-même`
    //       );
    //     ReceiveElement.classList.add("GetReplyed");
    //     ReceiveElement.appendChild(RePlyed);
    //   } else {
    //     let Target = [
    //       ...document.querySelectorAll(
    //         "#Chat sender,#Chat .sender,#Chat .receiver,#Chat receiver"
    //       ),
    //     ].at(-1);
    //     if (
    //       Target &&
    //       (Target.classList.value.startsWith("receiver") ||
    //         Target.tagName == "RECEIVER")
    //     ) {
    //       Target.classList.add("border-bottom");
    //       ReceiveElement.classList.add("border-top");
    //     }
    //   }
    //   if (data[0].receiver) chat = document.getElementById("Chat");
    //   else chat = document.getElementsByClassName("Chat")[0];
    //   chat.style.scrollBehavior = "smooth";
    //   Typing(false);
    //   chat.appendChild(ReceiveElement);
    //   if (ReceiveElement.querySelector("reply")) {
    //     if (ReceiveElement.querySelector("reply p"))
    //       if (
    //         document.getElementById(data[0].Reply).offsetWidth <
    //         chat.offsetWidth * 0.6
    //       )
    //         ReceiveElement.querySelector("reply p").style.minWidth = `${
    //           document.getElementById(data[0].Reply).offsetWidth
    //         }px`;
    //       else
    //         ReceiveElement.querySelector("reply p").style.minWidth = `${
    //           chat.offsetWidth * 0.6
    //         }px`;
    //     ReceiveElement.style.marginTop = `${
    //       ReceiveElement.querySelector("reply").offsetHeight + 10
    //     }px`;
    //   }
    //   chat.scrollTop = chat.scrollHeight - chat.offsetHeight;
    //   if (data[0].receiver) document.getElementById("ack").innerHTML = "";
    //   setTimeout(() => {
    //     chat.style.scrollBehavior = "";
    //     ReceiveElement.classList.remove("push");
    //   }, 300);
  });

  ipcRenderer.on("MSG_Received", (event, Who, ACK) => {
    ReadProfile().then(({ LastContact }) => {
      if (LastContact == Who) document.getElementById("ack").innerHTML = ACK;
    });
  });

  ipcRenderer.on("ACK", async (event, data) => {
    if (document.readyState === "complete") {
      document.getElementById("ack").innerHTML = await data;
      Typing(false);
    } else
      document
        .addEventListener("DOMContentLoaded", () => {
          document.getElementById("ack").innerHTML = data;
        })
        .catch((e) =>
          setTimeout(
            () => (document.getElementById("ack").innerHTML = data),
            2000
          )
        );
  });

  ipcRenderer.on("HeType", async (event, data) => {
    const UserID = Read("UserProfile");
    ReadProfile().then(({ LastContact }) => {
      if (UserID == data.receiver && LastContact == data.sender)
        Typing(data.Typing);
    });
  });

  ipcRenderer.on("SetStatus", async (event, id) => {
    if (document.readyState === "complete") {
      CHAT.Status(null, id);
      Typing(false);
    } else
      document.addEventListener("DOMContentLoaded", () => {
        CHAT.Status(null, id).catch((e) =>
          setTimeout(() => CHAT.Status(null, id).catch(), 2000)
        );
      });
  });

  ipcRenderer.on("AudioCall", (stream) => {
    let HisWebCam = document.getElementById("HisWebCam");
    HisWebCam.srcObject = stream;
    HisWebCam.play();
  });

  ipcRenderer.on("PushNotify", (e, targetID) =>
    CHAT.Notify(null, null, targetID)
  );

  ipcRenderer.on("focused", () => {
    console.log("Main");
    if (document.getElementById("ack").innerHTML == "")
      ReadProfile().then(({ _id, LastContact }) =>
        CHAT.Send({
          sender: _id,
          receiver: LastContact,
          message: "Vu",
          type: "ack",
        })
      );
  });
}
{
  function Typing(Type) {
    var chat = document.getElementById("Chat");
    var typer = document.getElementById("typer");
    if (Type) typer.classList.add("write");
    else typer.classList.remove("write");
    if (chat.scrollTop + chat.offsetHeight + 200 >= chat.scrollHeight) {
      setTimeout(() => {
        chat.scrollTop = chat.scrollHeight - chat.offsetHeight + 50;
      }, 200);
    }
  }

  function GetDate() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, "0");
    var minutes = now.getMinutes().toString().padStart(2, "0");
    var seconds = now.getSeconds().toString().padStart(2, "0");
    var milliseconds = now.getMilliseconds().toString().padStart(3, "0");
    var day = now.getDate().toString().padStart(2, "0");
    var month = now
      .toLocaleDateString([], {
        month: "numeric",
      })
      .padStart(2, "0");
    var year = now.getFullYear().toString();
    return [
      hours + ":" + minutes + ":" + seconds + ":" + milliseconds,
      day + "/" + month + "/" + year,
    ];
  }

  function PutUsersOnAudioCall(PartenerID, video = false) {
    const clonedElement = document.getElementById(PartenerID).cloneNode(true);
    clonedElement.style.setProperty("--SD", "none");
    const capsule = document.createElement("div");
    capsule.setAttribute("id", "div" + PartenerID);
    capsule.append(clonedElement);
    if (video) {
      document
        .querySelector("#Vusers #HisWebCam ~ div:not(#MyWebCam)")
        .appendChild(capsule);
      document
        .querySelector("#Vusers #MyWebCam ~ div:not(#HisWebCam)")
        .appendChild(document.getElementById("Profil").cloneNode(true));
    } else document.getElementById("users").appendChild(capsule);
  }

  function ClearAudioCall() {
    document.getElementById("users").innerHTML = "";
  }

  function getRandomColor() {
    const randomNum = Math.floor(Math.random() * 4096);
    const hexCode = randomNum.toString(16);
    const paddedHexCode = hexCode.padStart(3, "0");
    const color = `#${paddedHexCode}`;
    return color;
  }

  function ReoderContacts() {
    const parent = document.getElementById("nav");
    const divs = Array.from(parent.querySelectorAll("contact:not([id^='G'])"));
    divs.sort((a, b) => {
      const idA = a.getAttribute("id");
      const idB = b.getAttribute("id");
      return idB.localeCompare(idA);
    });
    console.log(divs);
    divs.forEach((div) => parent.appendChild(div));
  }

  function CloneContact(ContactID) {
    const target = document.getElementById(ContactID).cloneNode(true);
    target.classList = "";
    target.id = "";
    target.style.setProperty("--SD", "");
    target.style.setProperty("--ND", "");
    return target;
  }
}
const Connection = {
  logup: async (data) =>
    hashPassword(data.PW)
      .then(async (hash) => {
        data.PW = hash;
        const DATA = {
          _id: new ObjectId(),
          ...data,
          Image: {
            Photo: false,
            Color: getRandomColor(),
            URL: "./Data/Image/" + data.Name + ".png",
          },
          LastContact: "6411d26f236fb6289ba91743",
          Settings: { Interface: "Clair" },
          Status: "Active",
        };
        await AddData("Users", DATA);
        const { _id } = JSON.parse(
          await GetData(
            "Users",
            { Email: data.Email },
            { projection: { _id: 1 } }
          )
        )[0];
        Save("UserProfile", _id);
        ipcRenderer.send("OpenMain", _id, "Active");
      })
      .catch((error) => console.error("Error hashing password:", error)),
  ChangePass: (email, pass) =>
    hashPassword(pass)
      .then(async (PW) => {
        const { _id } = JSON.parse(
          await GetData(
            "Users",
            {
              Email: email,
            },
            { projection: { _id: 1 } }
          )
        )[0];
        await UpdateData("Users", _id, { PW });
        Save("UserProfile", _id);
        const { Status } = ReadProfile();
        ipcRenderer.send("OpenMain", _id, Status);
      })
      .catch((error) => console.error("Error hashing password:", error)),
  login: async (email, pw, callback) => {
    var Who = await GetData("Users", {
      Email: email,
    });
    Who = JSON.parse(Who);
    if (Who.length) {
      verifyPassword(pw, Who[0].PW)
        .then((match) => {
          if (match) {
            Save("UserProfile", Who[0]._id);
            ipcRenderer.send("OpenMain", Who[0]._id, Who[0].Status);
            callback(true);
          } else callback(false);
        })
        .catch((error) => {
          console.error("Error verifying password:", error);
          callback(false);
        });
    } else callback(false);
  },
  CheckClientSecret,
  Read,
  Save,
  CheckSpreadsheetId,
  CheckEmailOnMongodb: async (email) => {
    var Who = await GetData("Users", {
      Email: email,
    });
    Who = JSON.parse(Who);
    if (Who.length === 0) return false;
    return true;
  },
  CheckEmailOnGoogleSheet: async (email, change = null) => {
    if (change) return false;
    function ReturnText(text, show = false) {
      document
        .getElementsByClassName("bg")[0]
        .getElementsByTagName("h1")[0].innerText = text;
      if (show)
        document.querySelector(".bg button").style.visibility = "visible";
    }
    let result = await CheckEmailOnGoogleSheet(email);
    console.log(result);
    if (result.message === "Failed to fetch") {
      ReturnText("Vous n'est pas Connecter à l'internet");
      return "nointernet";
    } else return result;
  },
  AskAdmin: async (data, callback) => {
    ipcRenderer.invoke("AskForIPs").then((UsersIPs) =>
      UsersIPs.forEach((url) => {
        const socket = socketIOClient(`http://${url}:3000`);
        socket
          .timeout(5000)
          .emit("RequestToBeAdded", [data], async (err, ack) => {
            if (err) callback(null);
            else if (ack) {
              ReturnText("L'Administrateur a Reçu la demande, Patientez!");
              socket.on("ResponseOfRequest", async (response, lesusers) => {
                callback(response);
                if (response)
                  await AddData(
                    "Users",
                    JSON.parse(lesusers).map((obj) => {
                      return {
                        ...obj,
                        _id: new ObjectId(obj._id),
                      };
                    })
                  );
              });
            }
          });
      })
    );
  },
  SendCode: async (email) => {
    return await require("../Models/Mailer.models").verificationMail(email);
    // return 1111;
  },
  Disconnect: () => ipcRenderer.send("Disconnect"),
  Refresh: () => ipcRenderer.send("refresh"),
  heiger: (scroll) => scroll(ipcRenderer.invoke("heiger")),
  lower: (scroll) => scroll(ipcRenderer.invoke("lower")),
  Minimize: () => ipcRenderer.send("Log_Mini"),
  Exit: () => ipcRenderer.send("Log_Exit"),
};

const CHAT = {
  Type: (Tdata) => ipcRenderer.invoke("Send_msg", Tdata),
  Refresh: () => ipcRenderer.send("Reload"),
  GET: async (Col, Qry) => {
    array = await GetData(Col, {
      $or: [
        {
          sender: Qry.sender,
          receiver: Qry.receiver,
        },
        {
          sender: Qry.receiver,
          receiver: Qry.sender,
        },
      ],
    });
    array = JSON.parse(array).concat(
      JSON.parse(
        await GetData("Temp", {
          receiver: Qry.receiver,
        })
      )
    );
    if (array.length) {
      // console.log(array.at(-1));
      if (array.at(-1).type == "ack") array.pop();
      else if (array.at(-1).sender != Qry.receiver)
        await GetData("Users", {
          _id: new ObjectId(Qry.receiver),
        }).then((data) => {
          if (JSON.parse(data)[0].ack)
            document.getElementById("ack").innerHTML = JSON.parse(data)[0].ack;
          else document.getElementById("ack").innerHTML = "";
        });
      else
        CHAT.Send({
          sender: Qry.sender,
          receiver: Qry.receiver,
          message: "Vu",
          type: "ack",
        });
    } else document.getElementById("ack").innerHTML = "";
    return array;
  },
  GETGrp: async (Col, Qry, ME, callback) => {
    array = await GetData(Col, Qry);
    array = JSON.parse(array).concat(JSON.parse(await GetData("Temp", Qry)));
    if (array.length) {
      if (array.at(-1).sender == ME)
        await GetData("Groups", {
          _id: new ObjectId(Qry.Groupid),
        }).then((data) => {
          if (JSON.parse(data)[0].ack)
            document.getElementById("Gack").innerHTML = JSON.parse(data)[0].ack;
          else document.getElementById("Gack").innerHTML = "";
        });
      // else
      //   CHAT.Send({
      //     sender: Qry.sender,
      //     receiver: Qry.receiver,
      //     message: "Vu",
      //     type: "ack",
      //   });
    } else document.getElementById("ack").innerHTML = "";
    callback(JSON.stringify(array));
  },
  GETCall: async (Type, sender) => {
    let array = JSON.parse(
      await GetData("Calls", {
        $and: [
          {
            $or: [
              {
                sender,
              },
              {
                receiver: sender,
              },
            ],
          },
          {
            Type,
          },
        ],
      })
    );
    const Lister = document.getElementsByTagName("lister")[0];
    Lister.innerHTML = "";
    if (array.length) {
      Lister.innerHTML = `<button id='ClearCall' onclick='Lister.innerHTML = "<h1>Pas Appel Recente</h1>"'>Clear</button>`;
      document.getElementById("ClearCall").addEventListener("click", () =>
        DelData("Calls", {
          $and: [
            {
              $or: [
                {
                  sender,
                },
                {
                  receiver: sender,
                },
              ],
            },
            {
              Type,
            },
          ],
        })
      );
      array.forEach((e) => {
        const DIV = document.createElement("div");
        const target = document.getElementById(e.receiver).cloneNode(true);
        target.classList = "";
        target.id = "";
        target.style.setProperty("--SD", "");
        target.style.setProperty("--ND", "");
        target.style.display = "";
        DIV.appendChild(target);
        const p = document.createElement("p");
        const date = document.createElement("p");
        date.innerText = e.Time;
        p.innerText =
          target.getElementsByTagName("name")[0].innerText +
          " " +
          target.getElementsByTagName("fname")[0].innerText;
        p.style.color = e.Status ? "green" : "red";
        const BTN = document.createElement("button");
        BTN.innerHTML = TrasBtn;
        DIV.appendChild(p);
        DIV.appendChild(date);
        DIV.appendChild(BTN);
        Lister.appendChild(DIV);
      });
    } else Lister.innerHTML = "<h1>Pas Appel Recente</h1>";
  },
  GETReports: async (callback) => {
    callback(JSON.parse(await GetData("Reports", {})));
  },
  Send: async (data) => {
    if (data.type === "ack") {
      result = JSON.parse(await GetData("Temp", data));
      if (result.length) return;
    }
    if (data.Groupid) data.Groupid = data.Groupid.slice(1);
    [localTime, localDate] = GetDate();
    ID =
      localDate.split("/").reverse().join("") + localTime.split(":").join("");
    let File = Object({});
    if (data.type != "text" && data.type != "ack") {
      File = data.Data ? {} : async () => await ipcRenderer.invoke("SFile");
      if (!File) return;
      data.type = mime.getType((data.Data ? data : File).Path);
      console.table({ ...data, ...File });
    }
    const DATA = {
      _id: parseInt(ID),
      ...data,
      ...File,
      date: localDate,
      Time: localTime.split(":").slice(0, -2).join(":"),
    };
    ipcRenderer.invoke("Send_msg", DATA).then(async (ack) => {
      var Dist = ack ? "Chat" : "Temp";
      if (DATA.type != "text") delete DATA.Data;
      console.log(DATA, Dist);
      if (DATA.type == "ack" && Dist == "Chat") return;
      else if (Dist == "Temp")
        document.getElementById("ack").innerHTML = "Envoi en cours ...";
      await AddData(Dist, DATA);
    });
    if (DATA.type != "ack") return DATA;
  },
  Receive: async (callback) => {
    ipcRenderer.on("RMSG", async (event, data) => {
      event.preventDefault();
      callback(data);
    });
  },
  Contact: async (Return) => {
    Return(
      JSON.parse(
        await GetData("Users", {
          _id: { $not: { $eq: new ObjectId(Read("UserProfile")) } },
        })
      ).concat(
        JSON.parse(
          await GetData("Groups", {
            Users: { $in: [Read("UserProfile")] },
          })
        )
      )
    );
  },
  NewContact: async (Return) => {
    Return(JSON.parse(await GetData("NewUsers", {})));
  },
  AddData,
  UpdateData,
  Clear: (callback) => {
    target1 = Read("UserProfile");
    ReadProfile().then(async ({ LastContact }) => {
      result = await DelData("Chat", {
        $or: [
          {
            sender: target1,
            receiver: LastContact,
          },
          {
            sender: LastContact,
            receiver: target1,
          },
        ],
      });
      if (result) callback(LastContact);
    });
  },
  Status: async (ID = Read("UserProfile"), id = false) => {
    if (!id)
      Contacts = JSON.parse(
        await GetData(
          "Users",
          {
            _id: { $ne: new ObjectId(ID) },
          },
          { projection: { _id: 1, LastSeen: 1 } }
        )
      );
    else
      Contacts = JSON.parse(
        await GetData(
          "Users",
          {
            _id: new ObjectId(id),
          },

          { projection: { _id: 1, LastSeen: 1 } }
        )
      );
    if (Contacts.length)
      Contacts.forEach((Contact) => {
        Contact.LastSeen ||= "00:00;1/1/2000";
        let [localTime, localDate] = GetDate();
        let Date = Contact.LastSeen.split(";")[1];
        document.getElementById(Contact._id).style.setProperty("--BRD", "");
        if (Date && Date != localDate) {
          document
            .getElementById(Contact._id)
            .style.setProperty("--SD", "none");
        } else if (Contact.LastSeen == "Active") {
          document
            .getElementById(Contact._id)
            .style.setProperty("--STT", "rgb(5, 255, 5)");
          document.getElementById(Contact._id).setAttribute("status", "");
          document.getElementById(Contact._id).style.setProperty("--PAD", "");
          document
            .getElementById(Contact._id)
            .style.setProperty("--SD", "flex");
        } else if (Contact.LastSeen == "Busy") {
          document
            .getElementById(Contact._id)
            .style.setProperty("--SD", "flex");
          document
            .getElementById(Contact._id)
            .style.setProperty("--STT", "orange");
          document.getElementById(Contact._id).style.setProperty("--PAD", "");
          document.getElementById(Contact._id).setAttribute("status", "");
        } else {
          const startTime = moment(Contact.LastSeen, "HH:mm");
          const endTime = moment(
            localTime.split(":").slice(0, -2).join(":"),
            "HH:mm"
          );
          var duration = moment.duration(endTime.diff(startTime)).asMinutes();
          if (duration > 600) {
            document
              .getElementById(Contact._id)
              .style.setProperty("--SD", "none");
          }
          if (duration >= 60) duration = parseInt((duration /= 60)) + "h";
          else duration += "m";
          document
            .getElementById(Contact._id)
            .style.setProperty("--STT", "lightgreen");
          document
            .getElementById(Contact._id)
            .style.setProperty("--PAD", "0 4px");
          document
            .getElementById(Contact._id)
            .style.setProperty("--BRD", "10px");
          document.getElementById(Contact._id).setAttribute("status", duration);
        }
      });
  },
  Notify: async (ID, ClickedID, id = false) => {
    if (!id) {
      await UpdateData("Users", ClickedID, { Notify: 0 });
      Contacts = JSON.parse(
        await require("../Models/Mongodb.models").GetData(
          "Users",
          {
            _id: { $ne: new ObjectId(ID) },
          },
          { projection: { _id: 1, Notify: 1 } }
        )
      );
    } else
      Contacts = JSON.parse(
        await require("../Models/Mongodb.models").GetData(
          "Users",
          {
            _id: new ObjectId(id),
          },

          { projection: { _id: 1, Notify: 1 } }
        )
      );

    if (Contacts.length)
      Contacts.forEach((Contact) => {
        if (Contact.Notify) {
          document
            .getElementById(Contact._id)
            .setAttribute("Notif", Contact.Notify);
          document
            .getElementById(Contact._id)
            .style.setProperty("--ND", "flex");
        } else {
          document.getElementById(Contact._id).setAttribute("Notif", "");
          document
            .getElementById(Contact._id)
            .style.setProperty("--ND", "none");
        }
      });
  },
};

let recorder;
const parser = new DOMParser();
const UseMedia = {
  StartAudioRecorder: async (callback) => {
    const htmlElement = parser.parseFromString(PauseBtn, "text/html").body
      .firstChild;
    document
      .getElementById("VocalMsg")
      .parentNode.replaceChild(
        htmlElement,
        document.getElementById("VocalMsg")
      );
    document.getElementById("divchataudio").classList.value = "record";
    UseMedia.AudioWaves("chataudio", "PauseBtn");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        let chunks = [];
        recorder = new MediaRecorder(stream);
        recorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
        });
        recorder.addEventListener("stop", async () => {
          const blob = new Blob(chunks, { type: "audio/wav" });
          [localTime, localDate] = GetDate();
          const Name =
            localDate.split("/").reverse().join("") +
            localTime.split(":").join("");
          let Data = Buffer.from(await blob.arrayBuffer());
          Path = path.resolve(__dirname, "../Data/Audio/" + Name + ".wav");
          callback({
            Name: Name + ".wav",
            Path,
            Data,
          });
          fs.writeFileSync(Path, Data);
        });
        recorder.start();
      })
      .catch((err) => {
        console.error("Failed to get microphone access:", err);
      });
  },
  StopAudioRecorder: async () => {
    recorder.stop();
    document.getElementById("divchataudio").classList.value = "";
    const htmlElement = parser.parseFromString(VocalMsg, "text/html").body
      .firstChild;
    document
      .getElementById("PauseBtn")
      .parentNode.replaceChild(
        htmlElement,
        document.getElementById("PauseBtn")
      );
  },
  AudioCall: async (SenderID, PartenerID) => {
    [localTime, localDate] = GetDate();
    ID =
      localDate.split("/").reverse().join("") + localTime.split(":").join("");
    const peer = await new Promise((resolve) =>
      createPeer(SenderID, PartenerID, false).then((peer) => resolve(peer))
    );
    await AddData("Calls", {
      _id: parseInt(ID),
      sender: SenderID,
      receiver: PartenerID,
      type: "Call",
      Status: peer ? true : false,
      date: localDate,
      Time: localTime.split(":").slice(0, -2).join(":"),
    });
    if (peer) {
      ipcRenderer.on("answer", (e, answer) => {
        if (answer) {
          peer.signal(answer);
          peer.once("signal", (data) => {
            data.type = "WebRTC";
            data.initiator = true;
            data.receiver = PartenerID;
            data.sender = SenderID;
            ipcRenderer.invoke("Send_msg", data).then((r) => console.log(r));
          });
        } else {
          console.log("refused the call");
          setTimeout(() => {
            CHAT.Refresh();
          }, 2000);
        }
      });
      return true;
    } else return false;
  },
  VideoCall: async (SenderID, PartenerID) => {
    const peer = await new Promise((resolve) =>
      createPeer(SenderID, PartenerID, true, true).then((peer) => resolve(peer))
    );
    await AddData("Calls", {
      _id: parseInt(ID),
      sender: SenderID,
      receiver: PartenerID,
      type: "VCall",
      Status: peer ? true : false,
      date: localDate,
      Time: localTime.split(":").slice(0, -2).join(":"),
    });
    if (peer) {
      ipcRenderer.on("answer", (e, answer) => {
        peer.signal(answer);
        peer.once("signal", (data) => {
          data.type = "WebRTC";
          data.initiator = true;
          data.receiver = PartenerID;
          data.sender = SenderID;
          ipcRenderer.invoke("Send_msg", data).then((r) => console.log(r));
        });
      });
      return true;
    } else return false;

    /*
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then(async (stream) => {
        let MyWebCam = document.getElementById("MyWebCam");
        MyWebCam.srcObject = stream;
        MyWebCam.play();

        const videoTrack = stream.getVideoTracks()[0];
        const settings = videoTrack.getSettings();
        const { width, height } = settings;
        const pixelCount = width * height;
        const streamSizeInMB = (pixelCount * 24) / (8 * 1024 * 1024);
        console.log(`Stream size: ${streamSizeInMB.toFixed(2)} MB`);
        // const largeMessage = new ArrayBuffer(50 * 1024 * 1024);
        ipcRenderer.send("SendAudio", PartenerID, largeMessage);
      })
      .catch((error) => console.error(`getUserMedia error: ${error.message}`));
      */
  },
  AudioWaves: (active, disactive) => {
    // analyser.connect(audioContext.destination); <== listen to my output
    const canvas = document.getElementById(active);
    console.log("start audio");
    const ctx = canvas.getContext("2d");
    let source; // Declare source variable outside the promise scope
    let analyser; // Declare analyser variable outside the promise scope
    let audioContext;
    let animationId;

    document.getElementById(disactive).addEventListener(
      "click",
      () => {
        cancelAnimationFrame(animationId); // Cancel the animation frame
        source.disconnect(analyser);
        analyser.disconnect(); // Disconnect the analyser
        audioContext.close(); // Close the audio context
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      },
      { once: true }
    );

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        source = audioContext.createMediaStreamSource(stream);

        source.connect(analyser);

        analyser.fftSize = 32768;
        const bufferLength = analyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);

        function draw() {
          animationId = requestAnimationFrame(draw);
          analyser.getByteTimeDomainData(dataArray);
          ctx.fillStyle = getComputedStyle(
            document.documentElement
          ).getPropertyValue("--sDark");
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.lineWidth = 2;
          ctx.strokeStyle = getComputedStyle(
            document.documentElement
          ).getPropertyValue("--color");
          ctx.beginPath();
          const sliceWidth = (canvas.width * 1.0) / bufferLength;
          let x = 0;
          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 138.0;
            const y = (v * canvas.height) / 2;
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }
          ctx.lineTo(canvas.width, canvas.height / 2);
          ctx.stroke();
        }
        draw();
      })
      .catch((err) => {
        console.error("Error accessing microphone", err);
      });
  },
  CircleWaves: (PartenerID, stream) => {
    const Contact = document.getElementById(PartenerID);
    const circle = document.createElement("div");
    circle.className = "circle";
    document.getElementById("div" + PartenerID).appendChild(circle);

    // Set up audio context and analyzer
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyzer = audioCtx.createAnalyser();
    analyzer.fftSize = 2048;
    source.connect(analyzer);
    analyzer.connect(audioCtx.destination);

    const maxRadius = 50;
    let radius = 0;

    function drawCircle(percent) {
      radius = maxRadius * percent;
      circle.style.width = radius * 2 + "px";
      circle.style.height = radius * 2 + "px";
      circle.style.borderRadius = radius + "px";
    }

    // Animate circle based on audio data
    function animate() {
      requestAnimationFrame(animate);
      const bufferLength = analyzer.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyzer.getByteFrequencyData(dataArray);
      const percent = Math.max(...dataArray) / 255;
      drawCircle(percent);
    }

    const audio = new Audio();
    audio.srcObject = stream;
    audio.play();
    animate(analyzer);
  },
};

const Profile = {
  MyStatus: async (status) => {
    const STT = status ? "Busy" : "Active";
    ModifyProfile("Status", STT);
    ipcRenderer.send("NewStatus", Read("UserProfile"), STT);
  },
  Theme: (theme) => {},
};

const AdminManager = {
  Admin: (user) => ipcRenderer.send("NewStatus", user, "Admin"),
  ResponseNewUser: async (response, Email) => {
    const { url } = JSON.parse(
      await GetData("NewUsers", { Email }, { projection: { url: 1 } })
    )[0];
    await DelData("NewUsers", { Email });
    if (url) ipcRenderer.send("ResponseWithSocket", response, url);
    else console.log("no url :", url);
    return null;
  },
};

const ModifyProfile = async (target, data) => {
  let temp = {};
  temp[target] = data;
  await UpdateData("Users", Read("UserProfile"), temp);
};

async function ReadProfile() {
  return JSON.parse(
    await GetData("Users", { _id: new ObjectId(Read("UserProfile")) })
  )[0];
}

const createPeer = async (SenderID, PartenerID, VideoMedia) => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia({ video: VideoMedia, audio: true })
      .then((stream) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: stream,
          config: {
            iceServers: [],
          },
          objectMode: true,
        });
        if (!VideoMedia) {
          document.getElementById("CallMic").addEventListener("click", (e) => {
            const audioTrack = stream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            document.getElementById("CallMic").classList.toggle("mute");
            document.getElementById("audiotrack").classList.toggle("mute");
            document.getElementById("users").classList.toggle("large");
          });

          document.getElementById("CloseCall").addEventListener(
            "click",
            () => {
              console.log("stop the call");
              stream.getTracks().forEach((track) => {
                track.stop();
              });
              stream = null;
              peer.destroy();
              peer = null;
            },
            { once: true }
          );
        } else {
          document.getElementById("VCallMic").addEventListener("click", (e) => {
            const audioTrack = stream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            document.getElementById("VCallMic").classList.toggle("mute");
          });
          document.getElementById("VCallCam").addEventListener("click", (e) => {
            const videoTrack = stream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
            document.getElementById("VCallCam").classList.toggle("mute");
          });
          document.getElementById("VCloseCall").addEventListener(
            "click",
            () => {
              document.getElementById("Vusers").classList.remove("calling");
              console.log("stop the Vcall");
              stream.getTracks().forEach((track) => {
                track.stop();
              });
              peer.destroy();
              peer = null;
            },
            { once: true }
          );
        }

        peer.once("signal", (data) => {
          data.type = "WebRTC";
          data.initiator = true;
          data.receiver = PartenerID;
          data.sender = SenderID;
          if (VideoMedia) data.video = "Screen";
          ipcRenderer
            .invoke("Send_msg", data)
            .then((r) => {
              if (r) {
                if (VideoMedia) {
                  let MyWebCam = document.getElementById("MyWebCam");
                  MyWebCam.srcObject = stream;
                  MyWebCam.volume = 0;
                  MyWebCam.play();
                  function checkVideoTrackEnabled(videoTrack) {
                    setInterval(() => {
                      if (videoTrack.enabled)
                        document
                          .getElementById("MyWebCam")
                          .classList.remove("novideo");
                      else
                        document
                          .getElementById("MyWebCam")
                          .classList.add("novideo");
                    }, 1000); // Check every 1 second (adjust the interval as needed)
                  }

                  const videoTrack = stream.getVideoTracks()[0];
                  checkVideoTrackEnabled(videoTrack);

                  PutUsersOnAudioCall(PartenerID, true);
                } else PutUsersOnAudioCall(PartenerID);
                resolve(peer);
              } else {
                resolve(false);
                CHAT.Refresh();
              }
            })
            .catch((error) => {
              reject(error);
            });
        });

        peer.on("connect", () => startTimer());

        peer.on("stream", (stream) => {
          console.log("VideoMedia", !VideoMedia);
          if (!VideoMedia) UseMedia.CircleWaves(PartenerID, stream);
          else {
            let HisWebCam = document.getElementById("HisWebCam");
            HisWebCam.srcObject = stream;
            HisWebCam.play();
          }
        });

        peer.on("close", () => {
          console.log("Call ended");
          CHAT.Refresh();
        });

        peer.on("error", (err) => {
          if (err.message === "User-Initiated Abort, reason=Close called") {
            console.log("Call ended by user !!");
          } else {
            console.error(err);
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

async function GetUserMedia(video) {
  let audio = true;
  let steam;
  if (video == "Screen") {
    try {
      let sourceId = await ipcRenderer.invoke("ScreenShare");
      console.log(sourceId);
      steam = await navigator.mediaDevices.getUserMedia({
        audio: {
          mandatory: {
            chromeMediaSource: "desktop",
          },
        },
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: sourceId,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720,
          },
        },
      });
      let MyWebCam = document.getElementById("MyWebCam");
      MyWebCam.srcObject = steam;
      MyWebCam.volume = 0;
      MyWebCam.play();
    } catch (e) {
      console.error(e); //* <==
    }
  } else {
    steam = await navigator.mediaDevices.getUserMedia({ audio, video });
  }
  return steam;
}

async function connectPeer(offer) {
  return await new Promise(async (resolve) => {
    let stream = await GetUserMedia(offer.video);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
      config: {
        iceServers: [],
      },
      objectMode: true,
    });

    peer.on("signal", (data) => {
      data.type = "WebRTC";
      data.initiator = false;
      data.sender = offer.receiver;
      data.receiver = offer.sender;
      if (offer.video) {
        document.getElementById("BtnVCall").click();
        PutUsersOnAudioCall(offer.sender, true);
      } else {
        PutUsersOnAudioCall(offer.sender);
        document.getElementById("BtnCall").click();
        UseMedia.AudioWaves("audiotrackcanvas", "CloseCall");
      }
      ipcRenderer.invoke("Send_msg", data).then((r) => console.log(r));
    });

    peer.on("connect", () => startTimer());

    peer.on("stream", (stream) => {
      if (offer.video) {
        let HisWebCam = document.getElementById("HisWebCam");
        HisWebCam.srcObject = stream;
        HisWebCam.play();
      } else
        document
          .getElementById("BtnCall")
          .addEventListener("click", () =>
            UseMedia.CircleWaves(offer.sender, stream)
          );
    });

    peer.on("close", () => {
      document.getElementById("Vusers").classList.remove("calling");
      if (offer.video) {
        console.log("VCall ended");
        document.getElementById("VCloseCall").click();
      } else {
        console.log("Call ended");
        document.getElementById("CloseCall").click();
        ClearAudioCall();
      }
      document.getElementById("BtnChat").click();
    });

    peer.on("error", (err) => {
      if (err.message === "User-Initiated Abort, reason=Close called") {
        console.log("Call ended by user !!");
      } else {
        console.error(err);
      }
    });

    peer.signal(offer);
    console.log(peer);
    resolve(peer);
  });
}

async function PushCall(callerID, video) {
  const CallShow = document.getElementById("CallShow");
  const caller = CloneContact(callerID);
  CallShow.querySelector("h1").innerText =
    caller.getElementsByTagName("name")[0].innerText +
    " " +
    caller.getElementsByTagName("fname")[0].innerText;
  CallShow.querySelector("div").innerHTML = "";
  CallShow.querySelector("div").append(caller);
  CallShow.classList.add("show");
  return await new Promise((resolve) => {
    CallShow.getElementsByTagName("btn")[0].addEventListener(
      "click",
      (event) => {
        if (event.target.tagName == "BUTTON") resolve(event.target.id);
        else if (event.target.tagName == "svg")
          resolve(event.target.parentNode.id);
        else if (event.target.tagName == "path")
          resolve(event.target.parentNode.parentNode.id);
        if (
          event.target.tagName == "BUTTON" ||
          event.target.tagName == "svg" ||
          event.target.tagName == "path"
        )
          CallShow.classList.remove("show");
      }
    );
  });
}

let startTime;
let timerInterval;

function startTimer() {
  startTime = new Date(); // Record the start time
  timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
  function updateTimer() {
    const currentTime = new Date(); // Get the current time
    const elapsedTime = currentTime - startTime; // Calculate the elapsed time in milliseconds

    let hours = Math.floor(elapsedTime / 3600000); // Convert milliseconds to hours
    let minutes = Math.floor((elapsedTime / 60000) % 60); // Convert milliseconds to minutes
    let seconds = Math.floor((elapsedTime / 1000) % 60); // Convert milliseconds to seconds

    // Adjust the time if it has passed one hour
    if (hours >= 1) {
      hours = 1;
      minutes = 0;
      seconds = 0;
      const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`; // Format the time as HH:MM:SS
    }
    const formattedTime = `${pad(minutes)}:${pad(seconds)}`;

    document.getElementsByTagName("timer")[0].innerHTML = formattedTime;
    function pad(value) {
      return value.toString().padStart(2, "0"); // Add leading zeros if the value is less than 10
    }
  }
}

ipcRenderer.on("offer", async (e, offer) => {
  let response = JSON.parse(await PushCall(offer.sender, offer.video));
  if (response)
    connectPeer(offer).then((peer) => {
      document.getElementById("Vusers").classList.add("calling");
      ipcRenderer.on("answer", (e, answer) => {
        console.log("a peer");
        peer.signal(answer);
      });
    });
  else ipcRenderer.send("offer-reply", response);
});

contextBridge.exposeInMainWorld("Login", Connection);
contextBridge.exposeInMainWorld("CHAT", CHAT);
contextBridge.exposeInMainWorld("UseMedia", UseMedia);
contextBridge.exposeInMainWorld("Profile", Profile);
contextBridge.exposeInMainWorld("Admin", AdminManager);
contextBridge.exposeInMainWorld("ModifyProfile", ModifyProfile);
contextBridge.exposeInMainWorld("ReadProfile", ReadProfile);
contextBridge.exposeInMainWorld("OpenFile", (Path, where) => {
  if (!fs.existsSync(path.resolve(Path))) return false;
  if (where == "openfolder") shell.showItemInFolder(path.resolve(Path));
  else
    shell
      .openPath(path.resolve(Path))
      .catch((err) => console.error(`Unable to open file: ${err}`));
  return true;
});
contextBridge.exposeInMainWorld(
  "ShowFileDialog",
  async () => await ipcRenderer.invoke("SFile")
);
contextBridge.exposeInMainWorld("SaveFile", async (filePath, fileContent) =>
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) throw ("An error occurred while creating the file:", err);
  })
);
contextBridge.exposeInMainWorld(
  "CreateContactsICON",
  require("../Models/PngToIco.models")
);
