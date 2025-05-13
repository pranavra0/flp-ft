
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [downloadCode, setDownloadCode] = useState('');
  const [plugins, setPlugins] = useState([]);
  const [samples, setSamples] = useState([]);
  const [showSamples, setShowSamples] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Select a file');

    const formData = new FormData();
    formData.append('flp', file);

    try {
      const res = await axios.post('http://localhost:3001/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { password } = res.data;
      setPassword(password);
      setMessage(`Uploaded! Password: ${password}`);
    } catch {
      setMessage('Upload failed');
    }
  };

  const handleDownload = async () => {
    if (!downloadCode) return setMessage('Enter a password');
    try {
      const res = await axios.get(`http://localhost:3001/download/${downloadCode}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.flp');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      setMessage('Download failed');
    }
  };

  const handleShowPlugins = async () => {
    if (!downloadCode) return setMessage('Enter a password');
    try {
      const res = await axios.get(`http://localhost:3001/info/${downloadCode}`);
      const uniquePlugins = [...new Set(res.data.effectPlugins)];
      const uniqueSamples = [...new Set(res.data.sampleList)];
      setPlugins(uniquePlugins);
      setSamples(uniqueSamples);
    } catch {
      setMessage('Failed to fetch plugin info');
    }
  };

  return (
    <>
      <header className="logo-header">
        <img src="/logo.png" alt="Logo" className="logo" />
      </header>

      <div className="container">
        <div className="section">
          <h2>Upload FLP</h2>
          <form onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>

        <div className="section">
          <h2>Download FLP</h2>
          <input
            type="text"
            placeholder="Enter password"
            value={downloadCode}
            onChange={(e) => setDownloadCode(e.target.value)}
          />
          <button onClick={handleDownload}>Download</button>
          <button onClick={handleShowPlugins}>Show Required Plugins</button>

          {plugins.length > 0 && (
            <div>
              <h4>Required Plugins</h4>
              <ul>
                {plugins.map((plugin, idx) => (
                  <li key={idx}>{plugin}</li>
                ))}
              </ul>
            </div>
          )}

          {samples.length > 0 && (
            <div>
              <button
                className="dropdown-toggle"
                onClick={() => setShowSamples(!showSamples)}
              >
                {showSamples ? 'Hide Samples' : 'Show Required Samples'}
              </button>
              {showSamples && (
                <ul>
                  {samples.map((sample, idx) => (
                    <li key={idx}>{sample}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      <footer className="info-section">
        <a href="mailto:youremail@example.com" className="email-link">@</a>
      </footer>
    </>
  );
}

export default App;

