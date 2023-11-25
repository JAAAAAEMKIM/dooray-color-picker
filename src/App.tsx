import './App.css';
import ColorPickerForm from './components/color-picker-form/ColorPickerForm';
import DarkModeSetting from './components/dark-mode-setting/DarkModeSetting';

function App() {
  return (
    <div className="App">
      <ColorPickerForm />
      <DarkModeSetting />
    </div>
  );
}

export default App;
