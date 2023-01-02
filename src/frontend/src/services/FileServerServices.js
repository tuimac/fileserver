import axios from 'axios';
import { API_URL } from '../config/environment';

class FileServerServices {

  static getFileList(path) {
    let url = API_URL + '/filelist' + path;
    return axios.get(url).then((res) => 
      {
        return res.data.result;
      })
      .catch((error) => {
        throw error;
      }
    );
  }

  static getFilePreview(path) {
    let url = API_URL + '/filepreview' + path;
    return axios.get(url).then((res) => 
      {
        return res.data.result;
      })
      .catch((error) => {
        throw error;
      }
    );
  }

  static downloadFile(path, filename) {
    let url = API_URL + '/filedownload' + path;
    axios({
      url: url,
      method: 'GET',
      responseType: 'blob'
    }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]), { type: 'application/octet-stream'});
      const link = document.createElement('a');
      link.href = url;
      console.log(filename);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    });
  }
}

export default FileServerServices;
