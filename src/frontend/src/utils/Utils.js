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
    return base_path === '' ? additional_path : base_path.replace('/$', '') + '/' + additional_path;
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

  static convert_to_datetime(unix_time) {
    var date = new Date(unix_time);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return date.getFullYear() + '/' + months[date.getMonth()] + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
  }

}

export default Utils;
