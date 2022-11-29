class Utils {

  static string_to_int_ip(octets) {
    let bin = 0;
    octets = octets.split('.');
    for (var i = 0; i < octets.length; i++) {
      bin =  bin + ((parseInt(octets[i], 10) << (octets.length - i - 1) * 8) >>> 0);
    }
    return bin;
  }

  static int_to_string_ip(int_data) {
    let result = '';
    let tmp_amount = 0;

    for (let i = 3; i >= 0; i--) {
      let tmp = (int_data >> (i * 8)) - (tmp_amount >> (i * 8));
      result += tmp.toString();
      if (i === 0) {
        break;
      } else {
        result += '.';
      }
      tmp_amount += tmp << (i * 8);
    }
    return result;
  }

  static getTimeStamp(starttime) {
    let datetime = new Date();
    let lap = datetime.getTime() - starttime;

    if(lap >= 3600000) {
      return Math.floor(lap / 3600000).toString().padStart(2, 0) + ':' + Math.floor(lap / 60000 % 60).toString().padStart(2, 0) + ':' + Math.floor(lap / 1000 % 60).toString().padStart(2, 0);
    } else {
      return Math.floor(lap / 60000).toString().padStart(2, 0) + ':' + Math.floor(lap / 1000 % 60).toString().padStart(2, 0);
    } 
  }
}

export default Utils;
