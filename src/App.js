import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';

import ToDoList from './Components/ToDoList'

function App() {

  return (
      <div className="App">

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ToDoList />} />
            {/*<Route path="fileUpload" element={<FileUploadDownload />} />*/}
            {/*<Route path="upload" element={<UploadFile />} />*/}
          </Routes>
        </BrowserRouter>

      </div>
  );
}

export default App;