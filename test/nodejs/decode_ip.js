#!/usr/bin/env node

var ip = 167828993;
var result = '';
var tmp_add = 0;

for(let i = 3; i >= 0; i--) {
  let tmp = (ip >> (i * 8)) - (tmp_add >> (i * 8));
  console.log(tmp_add)
  result = result + tmp.toString() + '.';
  tmp_add += tmp << (i * 8);
}

/*
var tmp = (ip >> (3 * 8)) - tmp_add;
result = result + tmp.toString() + '.';
tmp_add += tmp << (3 * 8);
console.log(tmp_add)

tmp = (ip >> (2 * 8)) - tmp_add;
result = result + tmp.toString() + '.';
tmp_add += tmp << (2 * 8);

tmp = (ip >> (1 * 8)) - tmp_add;
result = result + tmp.toString() + '.';
tmp_add += tmp << (1 * 8);

tmp = (ip >> (0 * 8)) - tmp_add;
result = result + tmp.toString() + '.';
tmp_add += tmp << (0 * 8);
*/

console.log(result);
