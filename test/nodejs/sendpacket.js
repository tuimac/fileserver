#!/usr/bin/env node

let ip = '10.0.222.6'
let subnet = '255.255.255.0'

ip_octets = ip.split('.')
subnet_octets = subnet.split('.')

function parseIPv4(octets) {
  let bin = 0
  for (var i = 0; i < octets.length; i++) {
    bin =  bin + ((parseInt(octets[i], 10) << (octets.length - i - 1) * 8) >>> 0)
  }
  return bin
}

function convertToIP(ip) {
  let tmp_ip = ip;
  let result = ''
  for (var i = 0; i < 4; i++) {
    let decreased = tmp_ip >> 8 >>> 0;
    result = (tmp_ip - decreased).toString() + '.' + result;
    tmp_ip = decreased;
  }
  return result
}

ip_bin = parseIPv4(ip_octets);
console.log(ip_bin);
subnet_bin = parseIPv4(subnet_octets)
console.log(subnet_bin)
ips = 4294967295 - subnet_bin;
first_ip = ip_bin & subnet_bin;
console.log(ips)

for (var i = 0; i < ips; i++) {
  first_ip++;
  //console.log(convertToIP(first_ip));
}
