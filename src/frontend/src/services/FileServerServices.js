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
}

export default FileServerServices;
