"use strict";
const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  desktopCapturer,
  Tray,
  Menu,
} = require("electron");
const { autoUpdater } = require("electron-updater");
const Logger = require("electron-log");
const path = require("path");
const fs = require("fs");
const IconPath = path.join(__dirname, "/image/ICON.ico");
const { Read, Delete } = require("./Models/StoreData.models");
const { GetIP } = require("./Models/Mongodb.models");
var {
  sockets,
  server,
  io,
  Main,
  Users,
  MYIP,
  BroadcastSocket,
  LoadingScreen,
  Login,
  closeServer,
} = require("./Models/WIndow&Socket.models");
require("electron-reload")(__dirname, {
  ignored: /\/Data\//,
});
// *** Tray *** //
const restartApp = () => {
  const currentWindow = BrowserWindow.getFocusedWindow();
  app.relaunch();
  app.exit();
};
const ExitApp = () => app.exit();
const TrayMenu = [
  {
    label: "Ouvrir",
    click: OpenMain,
  },
  {
    label: "Redémarrer",
    click: restartApp,
  },
  {
    label: "Sortir",
    click: ExitApp,
  },
];
//////

// *** Logs *** //
const UpdateLogs = Logger.create("UpdateLogs");
UpdateLogs.transports.file.resolvePath = () =>
  path.join(__dirname, "logs/update.log");
const MainLogs = Logger.create("MainLogs");
MainLogs.transports.file.resolvePath = () =>
  path.join(__dirname, "logs/main.log");

var interval;

//* Start When Page is Ready
app.on("ready", async () => {
  autoUpdater.checkForUpdatesAndNotify();
  LoadingScreen(Read("UserProfile") ? "" : "Login");
  let CTray = new Tray(IconPath);
  CTray.setContextMenu(Menu.buildFromTemplate(TrayMenu));
  CTray.setToolTip("LANCHAT");
  CTray.on("double-click", OpenMain);
});

app.on("before-quit", () => {
  if (server()) io.disconnect();
  closeServer();
});
app.on("window-all-closed", () => {
  console.log(process.platform);
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", OpenMain);

function OpenMain() {
  Main === null ? CreateWindow() : Main.show();
}

if (process.platform === "win32") {
  app.setAppUserModelId(app.name);
}

const sendFile = async (socket, DATA, packetIndex, TotalPackets) => {
  const start = packetIndex * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;
  DATA.Data = DATA.Data.slice(start, end);
  const packet = {
    ...DATA,
    index: packetIndex,
    PacketNumber: TotalPackets,
  };
  console.log("Send ", Buffer.byteLength(DATA.Data), " MB");
  await new Promise((resolve) =>
    socket.emit("FilePacket", packet, async (ack) => {
      if (ack == packet.index) resolve();
      if (ack + 1 == TotalPackets)
        Main.webContents.send("MSG_Received", DATA.receiver, "Envoyer");
    })
  );
  return packetIndex++;
};
// ? *** IPCMAINs *** //
{
  ipcMain.on("OpenMain", async (event, _id, Status) => LoadingScreen("Main"));

  ipcMain.on("NewStatus", (event, _id, Status) => {
    BroadcastSocket("Status", { _id, Status });
  });

  // const SocketEvents = {
  //   Typing: "ImTyping",
  //   FileTransfer: "FileTransfer",
  //   FilePacket: "FilePacket",
  //   PrepareFileReceive: "PrepareFileReceive",
  //   WebRTC_Offer: "offer",
  //   WebRTC_Answer: "answer",
  //   SendMSG: "SendMSG",
  //   CallBack: "ack",
  // };

  ipcMain.handle("Send_msg", async (event, Sdata) => {
    let UserInfo;
    UserInfo = Sdata.receiver
      ? [JSON.parse(await GetIP("Users", Sdata.receiver))]
      : await GetIPFromGroup(Sdata.sender, Sdata.Groupid);

    if (!sockets || !UserInfo) return false;

    let Clients = [];
    UserInfo.forEach((ip) => {
      let socket = sockets.find((client) => client._opts.hostname == ip);
      if (socket) Clients.push(socket);
    });
    if (!Clients.length) {
      console.log("Send_msg on ", UserInfo, " disconnected");
      return false;
    }
    Clients.forEach((client) => {
      switch (Sdata.type) {
        case "ack":
        case "ImTyping":
        case "offer":
        case "answer":
          client.emit(Sdata.type, Sdata);
          break;
        default:
          let fileSizeInBytes, totalPackets, i;
          if (Sdata.FileType) {
            fileSizeInBytes = fs.statSync(Sdata.Path).size;
            if (fileSizeInBytes / (1024 * 1024) > 1) {
              Sdata.Size = fileSizeInBytes;
              totalPackets = Math.ceil(fileSizeInBytes / CHUNK_SIZE);
              client.emit("PrepareFileReceive", Sdata.Path, async () => {
                Sdata.Data = fs.readFileSync(Sdata.Path);
                i = 0;
                while (i < totalPackets)
                  i = await sendFile(client, Sdata, i, totalPackets);
              });
              return;
            } else Sdata.Data = fs.readFileSync(Sdata.Path);
          }
          client.emit("SendMSG", Sdata, async (ack) => {
            if ((await ack) && Sdata.receiver) {
              await UpdateData("Users", Sdata.receiver, { ack });
            }
            if (Main) {
              Main.webContents.send("MSG_Received", Sdata.receiver, ack);
            }
          });
          break;
      }
    });
    return true;
  });

  ipcMain.handle("ScreenShare", async () => {
    const sources = await desktopCapturer.getSources({
      types: ["window", "screen"],
    });
    console.log(sources);
    for (const source of sources)
      if (source.name === "Entire screen") return source.id;
  });

  ipcMain.handle("MYIP", () => {
    return MYIP;
  });

  ipcMain.handle("AskForIPs", () => Users);

  ipcMain.on("Reload", () => {
    console.log("refresh");
    Main.reload();
  });
  ipcMain.on("Log_Exit", () => login.close());

  ipcMain.on("Log_Mini", () => login.minimize());

  ipcMain.handle("heiger", () => {
    login.setSize(600, 520, false);
    return true;
  });

  ipcMain.handle("refresh", () => {
    login.reload();
    return true;
  });

  ipcMain.handle("lower", () => {
    login.setResizable(true);
    login.setSize(600, 380, false);
    login.setResizable(false);
    return true;
  });

  ipcMain.on("Disconnect", () => {
    closeServer();
    Delete("UserProfile");
    Login("");
    Main.close();
  });

  ipcMain.handle("SFile", async () => {
    let result = await dialog.showOpenDialog();
    if (result.canceled) return false;
    const FilePath = result.filePaths[0];
    return {
      Name: path.basename(FilePath),
      Path: FilePath,
      Data: fs.readFileSync(FilePath, "utf-8"),
    };
  });
}

// *** Updater *** //
autoUpdater.on("update-available", () => {
  UpdateLogs.info("update-available");
});
autoUpdater.on("checking-for-update", () => {
  UpdateLogs.info("checking-for-update");
});
autoUpdater.on("download-progress", () => {
  UpdateLogs.info("download-progress");
});
autoUpdater.on("update-downloaded", () => {
  UpdateLogs.info("update-downloaded");
});

// Get the MIME type of a file based on its extension
// PDF 2 img
// pdf2img
//   .convert(FilePath, {
//     format: "png", // or 'jpeg'
//     out_dir: FilePath.replace(path.basename(FilePath), ""),
//     out_prefix: path.basename(FilePath).split(".")[0],
//     page: 1, // 1-based page number
//   })
//   .catch((err) => console.log(err));
