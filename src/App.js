import axios from 'axios';
import { useRef, useState } from 'react';
import './App.css';
import { youtube_parser } from './utils';

function App() {
  const inputUrlRef=useRef();
  const [data, setData] = useState(null);

  const handleSubmit = (e)=> {
    e.preventDefault();
    console.log(inputUrlRef.current.value);
    const ytID = youtube_parser(inputUrlRef.current.value);
    console.log(ytID);

    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: {id: ytID},
      headers: {
        'X-RapidAPI-Key': '461c9e292emsh2968541a1ad61c0p14062cjsnc34da2e8fad4',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    };
    axios(options)
    .then(res=>setData(res.data.link))
    .catch(err=>console.log(err))

    inputUrlRef.current.value='';
  }

  return (
    <div className="app">
      <section className='content'>
        <h1 className='content-title'>YouTube to MP3 Converter</h1>
        <p className='content-desc'>
          Transform YouTube videos into MP3s in just a click!
        </p>
        <form className='form' onSubmit={handleSubmit}>
          <input ref={inputUrlRef} type="text" placeholder='Paste a Youtube video URL link...' className='form-input'/>
          <button type='submit' className='form-btn'>Search</button>
        </form>
        {data ? <a target='_blank' rel='noreferrer' href={data} className='download-btn'>Download MP3</a> : ''}
      </section>
    </div>
  );
}

export default App;
