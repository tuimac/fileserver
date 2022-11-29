import axios from 'axios';
import { API_URL } from '../config/environment';

class ScanServices {

  static getInterfaceInfo(nic) {
    let url = API_URL + '/interface/info/' + nic + '/';
    return axios.get(url).then((res) => 
      {
        return res.data.result;
      })
      .catch((error) => {
        throw error;
        return { ip: '', subnet: '' };
      }
    );
  }

  static getInterfaceList() {
    let url = API_URL + '/interface/list/';
    return axios.get(url).then(res => {
        return res.data.result;
      })
      .catch(error => {
        throw error;
        return [];
      }
    )
  }

  static sendArp(ip) {
    let url = API_URL + '/arp/' + ip + '/';
    return axios.get(url).then(res => {
        return res.data.result;
      })
      .catch(error => {
        throw error;
        return {};
      }
    )
  }
}

export default ScanServices;
