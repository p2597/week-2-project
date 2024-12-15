import useSWR from 'swr';
import './App.css'
import Header from './components/Header';
import Main from './components/Main'
import axios from 'axios';
import { useSearchParams } from 'react-router';
import VideoDetail from './components/VideoDetail';
import { Routes, Route} from 'react-router'

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function App() {
const [searchParams,/* setSearchParams*/] = useSearchParams();
const query = searchParams.get('q'); 


const { data, error } = useSWR(
  query ? `https://harbour.dev.is/api/search?q=${query}` : null,
  fetcher
);

  return (
    <>
      <Header />
      <Routes>
      <Route path="/" element={<Main videos={data} error={error} />} />
      <Route path="/video/:videoId" element={<VideoDetail videos={data?.results || []} /> } />
      </Routes>
   

    </>

  )
}


