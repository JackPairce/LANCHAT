const { GoogleSpreadsheet } = require("google-spreadsheet");
const fs = require("fs");
const spreadsheetId = require("../Models/StoreData.models").Read(
  "spreadsheetId"
);
// "1rzzyDoU2UVSA6Fb8ABtaLTKvEFsV-QSUN71SrgQegH0"
const doc = new GoogleSpreadsheet(spreadsheetId);
const ClientSecret = require("../Data/Admin/client_secret.json");

function CheckClientSecret() {
  return fs.existsSync("./Data/Admin/client_secret.json");
}

async function CheckSpreadsheetId(spreadsheetId) {
  const doc = new GoogleSpreadsheet(spreadsheetId);
  try {
    await doc.useServiceAccountAuth(ClientSecret);
    await doc.loadInfo();
    return true;
  } catch (e) {
    return false;
  }
}

async function CheckEmailOnGoogleSheet(UserEmail) {
  try {
    console.log({
      client_email: ClientSecret.client_email,
      private_key: ClientSecret.private_key,
    });
    await doc.useServiceAccountAuth({
      client_email: ClientSecret.client_email,
      private_key: ClientSecret.private_key,
    });
    await doc.loadInfo();
    var Result = (await doc.sheetsByIndex[0].getRows()).find(
      (row) => row.Email == UserEmail
    );
    if (!Result) return false;
    return true;
  } catch (e) {
    return e;
  }
}
// console.log([row.ID, row.Email, row.Checked]);
//   row.Checked = false;
//   await row.save(); // save updates

// });
// const sheet = doc.sheetsByIndex[0];
// const rows = await sheet.getRows();
// rows.forEach((row) => console.log(row));
// await doc.addSheet({ headerValues: ["name", "email"] }); // cree une feuille et set header
// const moreRows = await sheet.addRows([
//   { name: "Sergey Brin", email: "sergey@google.com" },
//   { name: "Eric Schmidt", email: "eric@google.com" },
// ]);

async function AddUserToGoogleSheet(DATA) {
  await doc.useServiceAccountAuth({
    client_email: ClientSecret.client_email,
    private_key: ClientSecret.private_key,
  });
  await doc.loadInfo();
  const sheet = await doc.sheetsByIndex[0];
  await sheet.addRow([DATA]);
  return true;
}

exports.CheckClientSecret = CheckClientSecret;
exports.CheckSpreadsheetId = CheckSpreadsheetId;
exports.CheckEmailOnGoogleSheet = CheckEmailOnGoogleSheet;
exports.AddUserToGoogleSheet = AddUserToGoogleSheet;
