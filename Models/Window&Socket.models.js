const http = require("http");
const socketIO = require("socket.io");
const {
  GetData,
  AddData,
  UpdateData,
  GetIP,
  GetIPFromGroup,
  IncrementNotification,
  DelData,
  ResetActiveStatus,
} = require("./Mongodb.models");
const socketIOClient = require("socket.io-client");
const mime = require("mime");
const path = require("path");
const fs = require("fs");
const { ObjectId } = require("mongodb");
const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const { GetIP: GetMyIP, GetUsersOnLan } = require("./Connexion.models");
const { Read } = require("./StoreData.models");
const CHUNK_SIZE = 1024 * 1024; // 1 MB
const IconPath = path.join(__dirname, "../image/ICON.ico");

let sockets = [];
var server, io;
var Main, Loading, login;
var Users, MYIP;

// IPCMAIN("test", "hoo");
async function Client(serverURLs) {
  serverURLs.forEach((url) => {
    let socket = socketIOClient(`http://${url}:3000`);
    socket.on("connect", async () => {
      sockets.push(socket);
      console.log("connected to:", url);
      const data = await ReadProfile();
      socket.emit(
        "Identification",
        [data],
        (await GetMyIP())[0],
        async (OldMsg) => MsgRecover(await OldMsg, socket)
      );
      socket.on("disconnect", async () => {
        console.log(socket.io.opts.hostname, " => OFF (Client function)");
        let ID = JSON.parse(
          await GetData(
            "Users",
            {
              IpAddress: socket.io.opts.hostname,
            },
            { projection: { _id: 1 } }
          )
        )[0]?._id;
        if (ID) {
          await UpdateData("Users", ID, {
            LastSeen: GetDate(),
          });
          IPCMAIN("SetStatus", ID);
          IPCMAIN("HeType", false);
        }
        socket = null;
      });
    });
  });
}

const BroadcastSocket = async (EventName, Data) => {
  sockets.forEach((socket) => socket.emit(EventName, Data));
};

const SendSocket = async (EventName, TargetHostName, Data) => {
  sockets
    .filter((socket) => socket.io.engine.hostname == TargetHostName)?.[0]
    .emit(EventName, Data);
};

const SendSocketWithAck = async (EventName, TargetHostName, Data, callback) => {
  sockets
    .filter((socket) => socket.io.engine.hostname == TargetHostName)?.[0]
    .emit(EventName, Data, (ack) => callback(ack));
};

const Server = async (IP) => {
  let TempSockets = [];
  server = http.createServer();
  io = socketIO(server, {
    // pingTimeout: 100, // time to wait for ack
    // pingInterval: 1000, // heartbeat
    maxHttpBufferSize: CHUNK_SIZE * 10,
  });
  server.listen(3000, IP, () => {
    const { address, port } = server.address();
    console.log(`Server listening at http://${address}:${port}`);
  });

  server.on("close", () => {
    console.log("Server closed");
  });
  io.on("connection", async (socket) => {
    console.log(`\nThe Client ${socket.handshake.address} has connected!`);
    // DisconnectedUsers = [...new Set(DisconnectedUsers)];
    // if (DisconnectedUsers.includes(socket.handshake.address)) {
    //   console.log("reconnected ", DisconnectedUsers);
    //   let index = DisconnectedUsers.findIndex(
    //     (e) => e === socket.handshake.address
    //   );
    //   console.log("index ", index);
    //   if (index != -1) DisconnectedUsers.splice(index, 1);
    //   sockets.forEach((client) => {
    //     if (client._opts.hostname == socket.handshake.address) {
    //       ReadProfile().then(({ _id, Status }) => {
    //         client.emit("Status", _id, Status);
    //         client.emit("OldMSG", _id, async (ack) => {
    //           MsgRecover(ack, client);
    //         });
    //       });
    //     }
    //   });
    // }

    socket.on("Status", async ({ id, status }, getIT) => {
      if (getIT) return;
      await UpdateData("Users", id, {
        LastSeen: status,
      });
      IPCMAIN("SetStatus", id);
      const { _id, Status } = await ReadProfile();
      socket.emit("Status", { _id, Status }, true);
    });

    socket.on("ack", async (data) => {
      console.log("got ack");
      await UpdateData("Users", data.sender, {
        ack: data.message,
      });
      if ((await ReadProfile().LastContact) == data.sender)
        IPCMAIN("ACK", data.message);
    });

    socket.on("OldMSG", async (id, ack) =>
      ack(
        await GetData("Temp", {
          receiver: id,
        })
      )
    );

    if (await ReadProfile().Admin)
      socket.on("RequestToBeAdded", async (UserInfo, response) => {
        response(true);
        console.log([{ ...UserInfo[0], url: socket.handshake.address }]);
        await AddData("NewUsers", [
          { ...UserInfo[0], url: socket.handshake.address },
        ]);
        PushNotification(
          "Demande d'adhésion",
          `Un ${UserInfo[0].FamilyName} ${UserInfo[0].Name} demande l'accès au réseau`
        );
        TempSockets.push(socket);
        ipcMain.once("ResponseWithSocket", async (e, response, url) => {
          const Thesocket = TempSockets.find(
            (e) => e.handshake.address === url
          );
          let promiss;
          if (response) promiss = await GetData("Users", {});
          else promiss = null;
          Thesocket.emit("ResponseOfRequest", response, promiss);
          TempSockets.splice(
            TempSockets.findIndex((e) => e === socket.handshake.address),
            1
          );
        });
      });

    socket.on("Identification", async (data, UserIp, OldMsg) => {
      console.log(
        `Client with IP : ${UserIp} Has Identified with data :\n`,
        data
      );
      var Msg2Send = await GetData("Temp", {
        receiver: data[0]._id,
      });
      console.log(Msg2Send);
      if (OldMsg) OldMsg(Msg2Send);
      await UpdateData("Users", data[0]._id, { IpAddress: UserIp });
      await UpdateData("Users", data[0]._id, { LastSeen: data[0].Status });
    });

    socket.on("SendMSG", async (data, ack) => {
      const { Name, FamilyName } = JSON.parse(
        await GetData("Users", { _id: new ObjectId(data.sender) })
      )[0];
      if (data.type != "text") {
        console.log(data.Path); /// ***............................................
        data.Path = `./Data/${WhereToSave(data.Path)}/${data.Name}`;
        await fs.writeFileSync(
          data.Path,
          Buffer.from(data.Data, "base64"),
          (err) => {
            if (err) throw err;
          }
        );
        if (!MainisVisible())
          PushNotification(
            Name + " " + FamilyName,
            data.Name,
            "./Data/Image/" + Name + ".ico"
          );
        delete data.Data;
      }
      await AddData("Chat", data);
      if (data.receiver) {
        const { LastContact } = await ReadProfile();
        if (!MainisVisible() && data.message)
          PushNotification(
            Name + " " + FamilyName,
            data.message,
            "./Data/Image/" + Name + ".ico"
          );
        if (LastContact == data.sender) {
          IPCMAIN("RMSG", [data]);
          if (MainisVisible()) ack("Vu");
          else ack("Reçu");
        } else {
          ack("Reçu");
          await UpdateData("Users", data.sender, { ack: "" });
          await IncrementNotification(data.sender, 1);
          IPCMAIN("PushNotify", data.sender);
        }
      } else {
        const { LastGroup } = await ReadProfile();
        if (LastGroup.slice(1) == data.Groupid) {
          IPCMAIN("RMSG", [data]);
          // ack("Vu");
        } else {
          // ack("Reçu");
          await UpdateData("Groups", data.Groupid, { ack: "" });
        }
      }
    });

    socket.on("PrepareFileReceive", (Path, callback) => {
      callback(true);
      let fileData = [];
      socket.on("FilePacket", async (data, ack) => {
        fileData[data.index] = data.Data;
        console.log(fileData.length);
        ack(data.index);
        if (data.index === data.PacketNumber - 1) {
          console.log(`Received all packets (${data.PacketNumber} packets)`);
          data.Path = `./Data/${WhereToSave(Path)}/${data.Name}`;
          const fileStream = fs.createWriteStream(
            `./Data/${WhereToSave(Path)}/${data.Name}`
          );
          for (let i = 0; i < data.PacketNumber; i++) {
            fileStream.write(fileData[i]);
          }
          fileStream.end(async () => {
            console.log(`File saved `);
            ["Data", "index", "PacketNumber"].forEach(
              (element) => delete data[element]
            );
            fileData = [];
            await AddData("Chat", data);
            IPCMAIN("RMSG", [data]);
          });
        }
      });
    });

    socket.on("DellTemp", async (arg) => {
      var Temp = await GetData("Temp", arg);
      Temp = JSON.parse(Temp);
      if (Temp.length) {
        await DelData("Temp", arg);
        Temp.forEach(async (msg) => await AddData("Chat", msg));
      }
    });

    socket.on("ImTyping", (Tdata) => {
      IPCMAIN("HeType", Tdata);
    });

    // *** Simple Peer Communication *** //
    socket.on("signal", (data) => {
      IPCMAIN("HisSignal", data);
    });

    socket.on("offer", (offer) => {
      IPCMAIN("offer", offer);
      ipcMain.on("offer-reply", (e, response) => {
        socket.emit("answer", response);
      });
    });

    socket.on("answer", (answer) => {
      IPCMAIN("answer", answer);
    });

    socket.on("disconnect", async () => {
      console.log(socket.handshake.address, " => OFF");
      let ID = JSON.parse(
        await GetData(
          "Users",
          {
            IpAddress: socket.handshake.address,
          },
          { projection: { _id: 1 } }
        )
      )[0];
      if (!ID) return;
      await UpdateData("Users", ID._id, {
        LastSeen: GetDate(),
      });
      IPCMAIN("SetStatus", ID._id);
      IPCMAIN("HeType", false);
    });

    socket.on("error", (error) => {
      console.error("socket Error:", error);
    });
  });
};

function closeServer() {
  sockets = [];
  io.sockets.sockets.forEach((socket) => {
    socket.disconnect(true);
  });
  io.close();
  server?.close(() => {
    console.log("closing the server");
    server = null;
  });
}

function WhereToSave(Path) {
  let Type = mime.getType(Path).split("/")[0];
  if (Type == "application") return "Document";
  return Type;
}

function GetDate() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");
  var day = now.getDate().toString().padStart(2, "0");
  var month = now
    .toLocaleDateString([], {
      month: "numeric",
    })
    .padStart(2, "0");
  var year = now.getFullYear().toString();
  return hours + ":" + minutes + ";" + day + "/" + month + "/" + year;
}

function PushNotification(title, body, icon = IconPath) {
  const notification = new Notification({
    title,
    body,
    icon,
    appName: app.getName(),
  });
  notification.on("click", () => {
    Mainrestore();
    Mainfocus();
  });
  notification.show();
}

async function MsgRecover(OldMsg, socket) {
  OldMsg = JSON.parse(await OldMsg);
  if (OldMsg) {
    OldMsg.forEach(async (msg) => {
      if (msg.type != "text") {
        if (msg.type == "ack")
          await UpdateData("Users", msg.sender, {
            ack: msg.ack,
          });
        else msg;
      }
      await AddData("Chat", msg);
      ReadProfile().then(({ LastContact }) => {
        if (LastContact == msg.receiver) {
          IPCMAIN("RMSG", [msg]);
        }
      });
    });
    const documentIds = OldMsg.map((id) => id._id);
    console.log(documentIds);
    socket.emit("DellTemp", { _id: { $in: documentIds } });
  }
}

const ReadProfile = async () =>
  JSON.parse(
    await GetData("Users", { _id: new ObjectId(Read("UserProfile")) })
  )[0];

function LoadingScreen(WIN) {
  // Loading screen
  Loading = new BrowserWindow({
    height: 500,
    width: 500,
    frame: false,
    show: false,
    icon: IconPath,
    alwaysOnTop: true,
    fullscreen: false,
    resizable: false,
  });
  Loading.loadFile("Pages/Loading.html");
  Loading.on("ready-to-show", async () => {
    Loading.show();
    await ResetActiveStatus();
    if (!Users) {
      const result = await GetMyIP();
      if (result) {
        MYIP = result[0];
        Users = await GetUsersOnLan();
      }
    }
    if (WIN == "Login") Login("new");
    else {
      if (WIN == "Main" && login) login.close();
      MainPage();
    }
  });
}
function Login(arg) {
  login = new BrowserWindow({
    height: 350,
    width: 600,
    frame: false,
    show: false,
    transparent: true,
    useContentSize: true,
    icon: IconPath,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      preload: path.join(__dirname, "../Javascript/Preload.js"),
      accelerator: "on",
    },
  });
  login.setResizable(false);
  login.setMenuBarVisibility(false);
  login.setFullScreen(false);
  setTimeout(() => {}, 2000);

  // login.removeMenu();
  login.loadFile("Pages/Connexion.html");
  login.once("ready-to-show", () => {
    try {
      if (arg == "new") Loading.close();
    } catch (e) {}
    login.center();
    login.setSize(600, 380, false);
    login.show();
  });
  login.on("closed", function () {
    login = null;
  });
}
function MainPage() {
  Main = new BrowserWindow({
    minHeight: 616,
    minWidth: 516,
    height: 800,
    width: 1000,
    show: false,
    icon: IconPath,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      preload: path.join(__dirname, "../Javascript/Preload.js"),
      accelerator: "on",
      experimentalFeatures: true,
      experimentalCanvasFeatures: true,
    },
  });

  Main.webContents.setVisualZoomLevelLimits(1, 1);
  // Main.removeMenu();
  Main.webContents.openDevTools();
  Main.loadFile("Pages/Main.html");
  Main.once("ready-to-show", async () => {
    try {
      if (Loading) Loading.close();
    } catch (e) {}
    if (MYIP && !server) {
      Client(Users);
      await Server(MYIP);
      interval = setInterval(async () => {
        const result = await GetMyIP();
        if (result) {
          var currentIP = result[0];
          if (currentIP !== MYIP) {
            console.log("IP address has changed:", currentIP);
            closeServer();
            Server(currentIP).then(
              console.log(
                `Server Restarted listening at http://${currentIP}:3000`
              )
            );
            MYIP = currentIP;
          }
        } else {
          console.log("lost connexion");
          if (server) closeServer();
        }
      }, 5000);
    }
    const windowStateFilePath = "./Data/window-state.json";
    if (
      fs.existsSync(windowStateFilePath) &&
      fs.readFileSync(windowStateFilePath) != ""
    ) {
      const { width, height } = JSON.parse(
        fs.readFileSync(windowStateFilePath)
      );
      Main.setBounds({
        width,
        height,
      });
    }
    Main.center();
    Main.show();
  });

  Main.on("minimize", () => {
    const currentWindow = BrowserWindow.getFocusedWindow();
    console.log(currentWindow);
  });

  Main.on("focus", () => {
    Main.webContents.send("focused");
  });

  Main.on("close", (event) => {
    event.preventDefault();
    Main.hide();
    const windowState = {
      width: Main.getBounds().width,
      height: Main.getBounds().height,
    };
    fs.writeFileSync("./Data/window-state.json", JSON.stringify(windowState));
  });

  Main.on("closed", function () {
    Main = null;
    if (server) closeServer();
  });
}

const IPCMAIN = (EventName, data) => Main.webContents.send(EventName, data);
const MainisVisible = () => Main.isVisible();
const Mainrestore = () => Main.restore();
const Mainfocus = () => Main.focus();

module.exports = {
  sockets,
  server,
  io,
  Main,
  Users,
  MYIP,
  Client,
  BroadcastSocket,
  SendSocket,
  SendSocketWithAck,
  Server,
  closeServer,
  ReadProfile,
  IPCMAIN,
  MainisVisible,
  Mainrestore,
  Mainfocus,
  LoadingScreen,
  Login,
  MainPage,
};
