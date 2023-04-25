class Utils {

  static sanitize_url(file_path) {
    var index = 0;
    while(index < file_path.length){
      if(file_path[index] === ''){
        file_path.splice(index, 1);
      } else {
        ++index;
      }
    }
    return file_path;
  }

  static join_path(base_path, additional_path) {
    return base_path.replace('\/$', '') + '/' + additional_path;
  }

}

export default Utils;
