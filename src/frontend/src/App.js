import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider,  createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import HomeLayout from './layouts/HomeLayout';
import FileList from './components/filelist/FileList';
import FileUpload from './components/fileupload/FileUpload';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ::-webkit-scrollbar {
            width: 8px;
        },
        ::-webkit-scrollbar-thumb {
            background-color: #4682b4;
            border-radius: 8px;
        }`
    },
  },
});

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <ThemeProvider theme={ darkTheme }>
          <CssBaseline />
          <HomeLayout />
          <BrowserRouter>
            <Box sx={{ px: 2 }}>
              <Routes>
                <Route path="/" element={<FileList />} />
                <Route path="/upload" element={<FileUpload />} />
              </Routes>
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
