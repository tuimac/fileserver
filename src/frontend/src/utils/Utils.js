class Utils {

  static sanitize_url(file_path) {
    for(var i = 0; i < file_path.length; i++){
      if(file_path[i] !== ''){
        break;
      } else {
        file_path.shift();
      }
    }
    return file_path;
  }
}

export default Utils;
