// Get IP and Mask and if there is a getway
function GetIP() {
  return new Promise((resolve) => {
    require("network").get_gateway_ip(function (err, gateway) {
      if (err) resolve(false);
      else {
        const ifaces = require("os").networkInterfaces();
        Object.keys(ifaces).forEach((ifname) => {
          ifaces[ifname].forEach((iface) => {
            if (iface.family === "IPv4" && !iface.internal) {
              currentIP = iface.address;
              mask = iface.netmask;
            }
          });
        });
        resolve([currentIP, mask]);
      }
    });
  });
}
// Get all ips on LAN
async function GetUsersOnLan() {
  const ipRange = (ip, mask) => {
    const ipArray = ip.split(".").map(Number);
    const maskArray = mask.split(".").map(Number);
    const startArray = ipArray.map((octet, index) => octet & maskArray[index]);
    const endArray = startArray.map(
      (octet, index) => octet | (~maskArray[index] & 255)
    );

    const startIp = startArray.join(".");
    const endIp = endArray.join(".");

    const range = [];
    for (let i = ipToLong(startIp); i <= ipToLong(endIp); i++)
      range.push(longToIp(i));

    return range;
  };
  const ipToLong = (ip) =>
    ip
      .split(".")
      .reduce(
        (acc, octet, index) => acc + Number(octet) * 256 ** (3 - index),
        0
      );
  const longToIp = (long) =>
    [
      (long >>> 24) & 255,
      (long >> 16) & 255,
      (long >> 8) & 255,
      long & 255,
    ].join(".");

  const [ip, mask] = await GetIP();
  const ipsInRange = ipRange(ip, mask);
  ipsInRange.splice(ipsInRange.indexOf(ip), 1);
  ipsInRange.splice(0, 1);
  return ipsInRange;
}

exports.GetIP = GetIP;
exports.GetUsersOnLan = GetUsersOnLan;
