#!/usr/bin/env node

let starttime = 1662180545081; //13:49:03
let datetime = new Date();
let diff = datetime.getTime() - starttime;

function timestamp(lap) {
  if(lap >= 3600000) {
    return Math.floor(lap / 3600000).toString() + ':' + Math.floor(lap / 60000 % 60).toString() + ':' + Math.floor(lap / 1000 % 60).toString();
  } else if (60000 <= lap < 3600000) {
    return Math.floor(lap / 60000).toString() + ':' + Math.floor(lap / 1000 % 60).toString();
  } else {
    return Math.floor(lap / 1000).toString();
  }
}

console.log(timestamp(diff));
