import logo from './logo.svg';
import './App.css';
import Header from './components/layout/Header';
import Movies from './components/movies/Movies';
import SettingsProvider from './store/SettingsProvider';

function App() {
  return (
    <SettingsProvider>
      <Header />
      <main>
        <Movies />
      </main>
    </SettingsProvider>
  );
}

export default App;
