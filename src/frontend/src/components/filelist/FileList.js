import { useNavigate } from 'react-router-dom';
import FileListMain from './FileListMain';

function FileList(props) {
  let navigate = useNavigate();
  return <FileListMain {...props} navigate={ navigate } />
}

export default FileList;
