import axios from 'axios';
import fileDownload from 'js-file-download';
import { API_URL } from '../config/environment';

class FileServerServices {

  static getFileList(path) {
    let url = API_URL + '/filelist/' + path;
    return axios.get(url).then((res) => 
      {
        return res.data.result;
      })
      .catch((error) => {
        throw error;
      }
    );
  }

  static getItemSize(path) {
    let url = API_URL + '/filelist/filesize/' + path;
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
    let url = API_URL + '/filepreview/' + path;
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
    let url = API_URL + '/filedownload/' + path;
    axios.get(url, {
      responseType: 'blob',
    }).then(res => {
      fileDownload(res.data, filename);
    });
  }

  static uploadFile(path, data) {
    let url = API_URL + '/fileupload/' + path + '/';
    return axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => 
    {
      return res.data.result;
    })
    .catch((error) => {
      throw error;
    });
  }

  static deleteFile(path, file_name_list) {
    let url = API_URL + '/filedelete/' + path + '/';
    axios.post(url, file_name_list, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => 
    {
      return res.data.result;
    })
    .catch((error) => {
      throw error;
    });
  }

}

export default FileServerServices;
