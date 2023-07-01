const noeye =
  '<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" id="mainIconPathAttribute" fill="#000000"></path> <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" id="mainIconPathAttribute" fill="#000000"></path> <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" id="mainIconPathAttribute" fill="#000000"></path>';
const eye =
  '<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" id="mainIconPathAttribute" fill="#000000"></path><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" id="mainIconPathAttribute" fill="#000000"></path>';

const {
  CheckEmailOnMongodb,
  CheckEmailOnGoogleSheet,
  CheckClientSecret,
  CheckSpreadsheetId,
  Read,
  Save,
  AskAdmin,
  SendCode,
  Refresh,
  ChangePass,
  login,
  logup,
} = window.Login;

const Connexion = document.getElementById("Connexion");
const Creation = document.getElementById("Creation");
const Recuperation = document.getElementById("Recuperation");
const Configuration = document.getElementById("Configuration");

document.location.href = "#d1";
document.getElementById("d2").style.opacity = 0;
document.getElementById("d1").style.opacity = 1;

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 9) event.preventDefault();
});

Connexion.addEventListener("submit", async (event) => {
  event.preventDefault();
  var email = document.getElementById("user").value;
  var pw = document.getElementById("pass").value;
  await login(email, pw, async (ACK) => {
    ACK = ACK ? "" : "Email ou Mot de pass incorrect";
    document.getElementById("errConnection").innerHTML = ACK;
  });
});

function ReturnText(text, show = null) {
  document
    .getElementsByClassName("bg")[0]
    .getElementsByTagName("h1")[0].innerText = text;
  if (show) {
    document.querySelector(".bg button").style.visibility = "visible";
    document.querySelector(".bg .container").classList.add("show");
    setTimeout(
      () => (document.querySelector(".bg .container input").checked = true),
      200
    );
  } else if (show === false) {
    document.querySelector(".bg button").style.visibility = "visible";
    document.querySelector(".bg #notfound").classList.add("show");
  }
}

// document.querySelector("dialog").showModal();
var data;
Creation.addEventListener("submit", async (event) => {
  event.preventDefault();
  array = [...Creation.querySelectorAll("input")];
  array.pop();
  data = {};
  array.forEach((input) => {
    if (input.name == "admin") data[input.name] = input.checked;
    else data[input.name] = input.value;
  });
  if (data.admin) {
    document.querySelector("dialog p").innerHTML =
      "<span>i</span>Creation Du fichier Google Sheet Et Le Partager!";
    document.getElementById("text").classList.add("show");
    document.querySelector("dialog").showModal();
    value = await new Promise((resolve) => {
      [...document.querySelectorAll("dialog button")].forEach((e) => {
        e.addEventListener("click", async (event) => {
          if (event.target.name === "file") {
            let checker = [
              "type",
              "project_id",
              "private_key_id",
              "private_key",
              "client_email",
              "client_id",
              "auth_uri",
              "token_uri",
              "auth_provider_x509_cert_url",
              "client_x509_cert_url",
            ];
            const data = { ...(await window.ShowFileDialog()) };
            try {
              let keys = Object.keys(JSON.parse(data.Data));
              if (JSON.stringify([...keys]) === JSON.stringify(checker)) {
                document.getElementById("text").style.display = "none";
                SaveFile("./Data/Admin/client_secret.json", data.Data);
                document.querySelector("dialog p").innerHTML =
                  "<span>i</span>Veuillez saisir l'identifiant de votre Google Sheet";
                document.querySelector("dialog input").style.display = "";
                [
                  ...document.querySelectorAll("dialog button"),
                ][0].style.display = "none";
                [
                  ...document.querySelectorAll("dialog button"),
                ][1].style.display = "";
              } else {
                document.querySelector("dialog p").innerHTML =
                  "<err>+</err>Veuillez entrer le vrai fichier !";
              }
            } catch (e) {
              document.querySelector("dialog p").innerHTML =
                "<err>+</err>Veuillez entrer le vrai fichier !";
            }
          } else {
            document.querySelector("dialog").close();
            resolve(undefined);
          }
        });
      });
    });
  } else
    CheckEmailOnMongodb(data.Email).then(async (result) => {
      if (result) {
        document.getElementById("errCreation").innerHTML =
          "Ce Email exist Déja !";
        return;
      }
      document.getElementById("errCreation").innerHTML = "";
      let value;
      if (!CheckClientSecret() || !Read("spreadsheetId")) {
        document.getElementById("text").classList.remove("show");
        document.querySelector("dialog p").innerHTML =
          "<span>i</span>Nous détectons un fichier manquant dans votre système, veuillez contacter votre administrateur.";
        document.querySelector("dialog").showModal();
        value = await new Promise((resolve) => {
          if (CheckClientSecret()) {
            document.querySelector("dialog p").innerHTML =
              "<span>i</span>Veuillez saisir l'identifiant Google Sheet de votre administrateur!";
            document.querySelector("dialog input").style.display = "";
            [...document.querySelectorAll("dialog button")][0].style.display =
              "none";
            [...document.querySelectorAll("dialog button")][1].style.display =
              "";
            document
              .querySelector("dialog form")
              .addEventListener("submit", () =>
                [...document.querySelectorAll("dialog button")][1].click()
              );
          }
          [...document.querySelectorAll("dialog button")].forEach((e) => {
            e.addEventListener("click", async (event) => {
              if (event.target.name === "file") {
                let checker = [
                  "type",
                  "project_id",
                  "private_key_id",
                  "private_key",
                  "client_email",
                  "client_id",
                  "auth_uri",
                  "token_uri",
                  "auth_provider_x509_cert_url",
                  "client_x509_cert_url",
                ];
                const data = { ...(await window.ShowFileDialog()) };
                try {
                  let keys = Object.keys(JSON.parse(data.Data));
                  if (JSON.stringify([...keys]) === JSON.stringify(checker)) {
                    SaveFile("./Data/Admin/client_secret.json", data.Data);
                    if (!Read("spreadsheetId")) {
                      document.querySelector("dialog p").innerHTML =
                        "<span>i</span>Veuillez saisir l'identifiant Google Sheet de votre administrateur!";
                      document.querySelector("dialog input").style.display = "";
                      [
                        ...document.querySelectorAll("dialog button"),
                      ][0].style.display = "none";
                      [
                        ...document.querySelectorAll("dialog button"),
                      ][1].style.display = "";
                    } else {
                      document.querySelector("dialog").close();
                      resolve(undefined);
                    }
                  } else {
                    document.querySelector("dialog p").innerHTML =
                      "<err>+</err>Veuillez entrer le vrai fichier !";
                  }
                } catch (e) {
                  document.querySelector("dialog p").innerHTML =
                    "<err>+</err>Veuillez entrer le vrai fichier !";
                }
              } else if (event.target.name === "check") {
                event.target.classList.add("loading");
                let value = await CheckSpreadsheetId(
                  document.querySelector("dialog input").value
                );
                event.target.classList.remove("loading");
                if (value) {
                  Save(
                    "spreadsheetId",
                    document.querySelector("dialog input").value
                  );
                  document.querySelector("dialog").close();
                  resolve(undefined);
                } else {
                  document.querySelector("dialog p").innerHTML =
                    "<err>+</err> L'identifiant Google Sheet incorrect !";
                }
              } else if (event.target.name === "send") {
                document.querySelector("dialog").close();
                resolve(true);
              } else if (event.target.name === "false") {
                document.querySelector("dialog").close();
                resolve(null);
              }
            });
          });
        }).catch((e) => console.error(e));
      }
      if (value === null) return;
      document.getElementsByClassName("bg")[0].classList.add("show");
      CheckEmailOnGoogleSheet(data.Email, value).then((Exist) => {
        console.log(Exist);
        if (Exist == false || Exist == "nointernet") {
          setTimeout(() => {
            if (Exist == false)
              ReturnText("Vous n'êtes pas inscrit chez l'Administrateur");
            setTimeout(() => {
              ReturnText("Patientez, Nous Cherchons Un Administrateur");
              AskAdmin(data, async (r) => {
                if (r) {
                  ReturnText("L'Administrateur Vous a accepter!", true);
                  document.getElementById("loadingexit").addEventListener(
                    "click",
                    () => {
                      document.getElementById("errCreation").innerHTML = "";
                      SendCode(data.Email).then((code) => {
                        MyCheckEmail(code);
                        forget();
                      });
                    },
                    { once: true }
                  );
                } else if (r == false)
                  ReturnText("L'Administrateur vous a rejeté!", false);
                else if (r == null)
                  ReturnText(
                    "Personne à l'horizon, veuillez contacter votre Administrateur !",
                    false
                  );
              });
            }, 2000);
          }, 1000);
        } else if (Exist === true) {
          ReturnText(
            "Nous Avons trouver votre email dans\nla liste de votre Administrateur!",
            true
          );
          document.getElementById("loadingexit").addEventListener(
            "click",
            () => {
              document.getElementById("errCreation").innerHTML = "";
              SendCode(data.Email).then((code) => {
                MyCheckEmail(code);
                forget();
              });
            },
            { once: true }
          );
        }
      });
    });
});
// Recuperation du email
Recuperation.addEventListener("submit", (event) => {
  event.preventDefault();
  const Email = document.getElementById("Ruser").value;
  CheckEmailOnMongodb(Email).then((result) => {
    const ACK = result
      ? ""
      : "Email n'exist pas, Verifiez votre email ou creez un nouveau compte.";
    document.getElementById("errRecuperation").innerHTML = ACK;
    if (!result) return;
    SendCode(Email).then((code) => MyCheckEmail(code));
  });
});

function MyCheckEmail(TheCode) {
  Recuperation.classList.add("fr");
  let array = [];
  const inputs = document.querySelectorAll(".input");
  inputs[0].focus();
  inputs.forEach((input, index) => {
    input.addEventListener("input", (event) => {
      const currentInput = event.target;
      if (
        !isNaN(parseInt(currentInput.value, 10)) &&
        index < inputs.length - 1
      ) {
        array.push(inputs[index].value);
        inputs[index + 1].focus();
      }
      if (index == inputs.length - 1) {
        array.push(inputs[index].value);
        const inputcode = parseInt(array.join(""));
        if (inputcode === TheCode) {
          TheCode = null;
          setTimeout(() => {
            window.location.href = "#d2";
            document.getElementById("d2").style.opacity = 0;
            document.getElementById("d2").style.pointerEvents = "none";
            document.getElementById("d4").style.opacity = 1;
            document.getElementById("d4").style.pointerEvents = "all";
          }, 500);
        } else inputs.forEach((input) => input.classList.add("error"));
      }
    });
  });
}

Configuration.addEventListener("submit", async (event) => {
  event.preventDefault();
  array = [...Configuration.querySelectorAll("input")];
  array.pop();
  if (array[0].value === array[1].value) {
    if (data) {
      data.PW = array[0].value;
      await logup(data);
    } else ChangePass(document.getElementById("Ruser").value, array[0].value);
  } else document.getElementById("Cpass").classList.add("passerr");
});

document
  .getElementById("exit")
  .addEventListener("click", () => window.Login.Exit());
document
  .getElementById("mini")
  .addEventListener("click", () => window.Login.Minimize());

timer = 2;

document.getElementById("login").addEventListener("click", () => {
  document.location.href = "#d1";
  document.getElementById("d2").style.opacity = 0;
  document.getElementById("d1").style.opacity = 1;
  LowHeight();
  document.addEventListener(
    "scroll",
    () => {
      clearTimeout(timeoutId);
    },
    { once: true }
  );
  if (document.documentElement.scrollLeft != 602)
    document.location.href = "#d1";
  timer = setTimeout(() => {
    window.Login.lower(async (scroll) => {
      if (await scroll) return;
    });
  }, 1000);
});
document.getElementById("logup").addEventListener("click", () => {
  clearTimeout(timer);
  document.documentElement.scrollLeft == 20;
  window.Login.heiger(async (scroll) => {
    if (await scroll) {
      document.documentElement.style.height = "520px";
      document.getElementById("d1").style.opacity = 0;
      document.getElementById("d2").style.opacity = 1;
      document.getElementById("d2").style.pointerEvents = "all";
      setTimeout(() => {
        document.location.href = "#d2";
      }, 20);
    }
  });
});

// fix email input ~ label
function email(event) {
  if (event.target.value == "") {
    event.target.classList.remove("email");
  } else {
    event.target.classList.add("email");
  }
}
document.getElementById("user").addEventListener("input", email);
document.getElementById("Euser").addEventListener("input", email);

// show password
document.querySelectorAll(".text_field svg").forEach((svg) =>
  svg.addEventListener("click", () => {
    if (svg.classList.value === "eye" ? true : false) svg.innerHTML = eye;
    else svg.innerHTML = noeye;
    svg.classList.toggle("eye");
    const previousDivs = [];
    let previousSibling = svg.previousSibling;
    while (previousSibling) {
      if (previousSibling.nodeType === Node.ELEMENT_NODE) {
        previousDivs.push(previousSibling);
      }
      previousSibling = previousSibling.previousSibling;
    }
    previousDivs.at(-1).type =
      previousDivs.at(-1).type === "password" ? "text" : "password";
  })
);

// forget password
document.getElementById("forget").addEventListener("click", forget);
function forget() {
  setTimeout(() => {
    document.getElementById("Ruser").focus();
    document.getElementById("d1").style.opacity = 0;
    document.getElementById("d1").style.pointerEvents = "none";
    document.getElementById("d3").style.opacity = 1;
    document.getElementById("d3").style.pointerEvents = "all";
  }, 20);
  LowHeight();
}

function ReturnFromConfirm() {
  Recuperation.classList.remove("fr");
  document.getElementById("Cpass").classList.remove("passerr");
  document.getElementById("d1").style.opacity = 1;
  document.getElementById("d1").style.pointerEvents = "all";
  document.getElementById("d3").style.opacity = 0;
  document.getElementById("d3").style.pointerEvents = "none";
  document.getElementById("errRecuperation").innerHTML = "";
  document.getElementById("errConnection").innerHTML = "";
  Refresh();
}
function ReturnFromReconfig() {
  Recuperation.classList.remove("fr");
  document.getElementById("Cpass").classList.remove("passerr");
  Recuperation.reset();
  Configuration.reset();
  document.querySelectorAll(".input").forEach((input) => (input.value = ""));
  document.getElementById("errRecuperation").innerHTML = "";
  document.getElementById("errConnection").innerHTML = "";
  document.getElementById("d1").style.opacity = 1;
  document.getElementById("d1").style.pointerEvents = "all";
  document.getElementById("d4").style.opacity = 0;
  document.getElementById("d4").style.pointerEvents = "none";
  document.getElementById("d3").style.opacity = 0;
  document.getElementById("d3").style.pointerEvents = "none";
  Refresh();
}

function LowHeight() {
  document.documentElement.style.height = "380px";
  timeoutId = setTimeout(function () {
    window.scrollTo(0, 0);
    window.Login.lower(async (scroll) => {
      if (await scroll) return;
    });
  }, 1000);
}

function valideInput(input) {
  const maxLength = 1;
  if (input.value.length > maxLength)
    input.value = input.value.slice(0, maxLength);
}

function Default() {
  document.getElementsByClassName("bg")[0].classList.remove("show");
  document.querySelector(".bg .container").classList.remove("show");
  document.querySelector(".bg #notfound").classList.remove("show");
  document
    .getElementsByClassName("bg")[0]
    .getElementsByTagName("h1")[0].innerText = "Recherche...";
}
