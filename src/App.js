import axios from 'axios';
import { useRef, useState } from 'react';
import './App.css';

function App() {
  const inputUrlRef=useRef();
  const [data, setData] = useState(null);

  const handleSubmit = async (e)=> {
    e.preventDefault();
    console.log(inputUrlRef.current.value);
    const igID = inputUrlRef.current.value;

    const options = {
      method: 'GET',
      url: 'https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index',
      params: {
        url: igID,
      },
      headers: {
        'X-RapidAPI-Key': '461c9e292emsh2968541a1ad61c0p14062cjsnc34da2e8fad4',
        'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      if(igID.includes('stories')){
        setData(response.data.story_by_id.media)
      } else {
        setData(response.data.media)
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    inputUrlRef.current.value='';
  }

  return (
    <div className="app">
      <section className='content'>
        <h1 className='content-title'>Instagram Media Downloader</h1>
        <p className='content-desc'>
          Download Reels & Stories in just a click!
        </p>
        <form className='form' onSubmit={handleSubmit}>
          <input ref={inputUrlRef} type="text" placeholder='Paste a URL link...' className='form-input'/>
          <button type='submit' className='form-btn'>Search</button>
        </form>
        {data ? <a target='_blank' rel='noreferrer' href={data} className='download-btn'>Download</a> : ''}
      </section>
    </div>
  );
}

export default App;
