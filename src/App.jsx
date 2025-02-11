
import './App.css'
import BottonComponents from './components/BottonComponents';
import MiddleComponents from './components/MiddleComponents';
import TopComponents from './components/TopComponents';

function App() {


  return (
    <div>
      <div className="h-[100vh] w-[100vw] py-4 pb-8 px-7 max-sm:px-3 bg-[url(bg5.jpg)] bg-cover bg-center select-none flex flex-col justify-between overflow-hidden">
        <TopComponents />
        <div className='px-3'>
        <MiddleComponents />
        <BottonComponents />
        </div>
      </div>
    </div>
  );
}

export default App
