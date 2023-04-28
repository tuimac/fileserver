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
    return base_path.replace('/$', '') + '/' + additional_path;
  }

  static size_unit(size) {
    if(size < 1024) {
      return size + ' B';
    } else if ( size >= 1024 && size < (1024 * 1024)) {
      return (Math.floor((size / 1024) * Math.pow(10, 1) ) / Math.pow(10, 1)).toString() + ' KB';
    } else if ( size >= (1024 * 1024) && size < (1024 * 1024 * 1024)) {
      return (Math.floor((size / 1024 / 1024) * Math.pow(10, 1) ) / Math.pow(10, 1)).toString() + ' MB';
    }

  }

}

export default Utils;
