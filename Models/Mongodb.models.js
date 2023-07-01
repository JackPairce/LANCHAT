const { MongoClient, ObjectId } = require("mongodb");

const url =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1";
const dbName = "Chat_DB";

async function GetData(Collection, Querie, Option = {}) {
  try {
    const client = await MongoClient.connect(url);
    const cols = await client
      .db(dbName)
      .collection(Collection)
      .find(Querie, Option)
      .sort({ _id: 1 })
      .toArray();
    await client.close();
    value = JSON.stringify(cols);
    return value;
  } catch (err) {
    console.error("Failed to GetData\n", err);
  }
}

async function AddData(Collection, Data) {
  try {
    const client = await MongoClient.connect(url);
    let result;

    if (Array.isArray(Data)) {
      const operations = Data.map((doc) => ({
        updateOne: {
          filter: { _id: doc._id },
          update: { $set: doc },
          upsert: true,
        },
      }));
      result = await client
        .db(dbName)
        .collection(Collection)
        .bulkWrite(operations);
    } else {
      result = await client
        .db(dbName)
        .collection(Collection)
        .updateOne({ _id: Data._id }, { $set: Data }, { upsert: true });
    }

    await client.close();
    return result;
  } catch (err) {
    console.log("Failed to AddData", err);
  }
}

async function UpdateData(Collection, ID, update) {
  try {
    let _id;
    if (typeof ID == "string") _id = new ObjectId(ID);
    else _id = ID;
    const client = await MongoClient.connect(url);
    await client
      .db(dbName)
      .collection(Collection)
      .findOneAndUpdate({ _id }, { $set: update }, { upsert: true });
    client.close();
  } catch (err) {
    console.log("UpdateData Failed\n", Collection, ID, update);
  }
}

async function CheckData(Collection, documentIds) {
  try {
    const objectIdArray = documentIds.map((id) => new ObjectId(id));
    const client = await MongoClient.connect(url);
    const foundDocs = await client
      .db(dbName)
      .collection(Collection)
      .find({ _id: { $in: objectIdArray } })
      .toArray();
    await client.close();
    const foundIds = foundDocs.map((doc) => doc._id.toString());
    const missingIds = documentIds.filter((id) => !foundIds.includes(id));
    if (missingIds.length === 0) return true;
    else {
      return missingIds;
    }
  } catch (err) {
    console.log("CheckData Failed\n", err);
  }
}

async function GetIP(Collection, ID) {
  try {
    const client = await MongoClient.connect(url);
    const cols = await client
      .db(dbName)
      .collection(Collection)
      .find({ _id: new ObjectId(ID) })
      .toArray();
    await client.close();
    if (cols[0].IpAddress) value = JSON.stringify(cols[0].IpAddress);
    else value = undefined;
    return value;
  } catch (err) {
    console.log("GetIP Failed\n", err);
  }
}

async function GetIPFromGroup(MYid, ID) {
  try {
    const { Users } = JSON.parse(
      await GetData(
        "Groups",
        { _id: new ObjectId(ID) },
        { projection: { Users: 1 } }
      )
    )[0];
    Users.splice(
      Users.findIndex((e) => e === MYid),
      1
    );
    let objectIdArray = Users.map((id) => new ObjectId(id));
    const client = await MongoClient.connect(url);
    const cols = await client
      .db(dbName)
      .collection("Users")
      .find({ _id: { $in: objectIdArray } }, { projection: { IpAddress: 1 } })
      .toArray();
    await client.close();
    if (cols.length) value = cols.map((doc) => doc.IpAddress);
    else value = undefined;
    return value;
  } catch (err) {
    console.log("GetIPFromGroup Failed\n", err);
  }
}

async function DelData(Collection, Querie) {
  try {
    const client = await MongoClient.connect(url);
    const cols = await client
      .db(dbName)
      .collection(Collection)
      .deleteMany(Querie);
    await client.close();
    return true;
  } catch (err) {
    console.log("Failed to DelData", err);
  }
}

async function IncrementNotification(ID, Notify) {
  try {
    const client = await MongoClient.connect(url);
    await client
      .db(dbName)
      .collection("Users")
      .updateOne({ _id: new ObjectId(ID) }, { $inc: { Notify } });
    await client.close();
  } catch (err) {
    console.error("Failed to IncrementNotification", err);
  }
}

async function ResetActiveStatus() {
  Result = await require("../Models/Mongodb.models").GetData("Users", {});
  if (Result)
    JSON.parse(Result).forEach(async (contact) => {
      if (contact.LastSeen === "Active" || contact.LastSeen === "Busy") {
        contact.LastSeen = "00:00;1/1/2000";
        if (!contact.IpAddress) contact.IpAddress = "192.168.1.1";
        await require("../Models/Mongodb.models").UpdateData(
          "Users",
          contact._id,
          { LastSeen: contact.LastSeen }
        );
      }
    });
}

exports.CheckData = CheckData;
exports.GetData = GetData;
exports.GetIP = GetIP;
exports.GetIPFromGroup = GetIPFromGroup;
exports.AddData = AddData;
exports.UpdateData = UpdateData;
exports.DelData = DelData;
exports.IncrementNotification = IncrementNotification;
exports.ResetActiveStatus = ResetActiveStatus;
