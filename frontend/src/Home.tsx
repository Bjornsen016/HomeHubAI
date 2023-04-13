import React from 'react';
import { useModule } from './ModuleContext';
import Calendar from './components/Calendar/Calendar';
import Task from './components/Task/Task';
import Weather from './components/Weather/Weather';

const Home: React.FC = () => {
  const {
    bigComponent: BigComponent,
    smallComponent1: SmallComponent1,
    smallComponent2: SmallComponent2,
    setBigComponent,
    setSmallComponent1,
    setSmallComponent2,
  } = useModule();

  const handleBigComponentChange = (component: React.FC) => {
    setBigComponent(() => component);
  };

  const handleSmallComponent1Change = (component: React.FC) => {
    setSmallComponent1(() => component);
  };

  const handleSmallComponent2Change = (component: React.FC) => {
    setSmallComponent2(() => component);
  };

  return (
    <div>
      <div className="big-component-area">
        {BigComponent && <BigComponent />}
      </div>
      <button onClick={() => handleBigComponentChange(Calendar)}>
        Set Calendar
      </button>
      <button onClick={() => handleBigComponentChange(Task)}>Set Task</button>
      <button onClick={() => handleBigComponentChange(Weather)}>
        Set Weather
      </button>
      <div className="small-component-area-wrapper">
        <div className="small-component-area">
          {SmallComponent1 && <SmallComponent1 />}
        </div>
        <button onClick={() => handleSmallComponent1Change(Calendar)}>
          Set Calendar
        </button>
        <button onClick={() => handleSmallComponent1Change(Task)}>
          Set Task
        </button>
        <button onClick={() => handleSmallComponent1Change(Weather)}>
          Set Weather
        </button>
        <div className="small-component-area">
          {SmallComponent2 && <SmallComponent2 />}
        </div>
        <button onClick={() => handleSmallComponent2Change(Calendar)}>
          Set Calendar
        </button>
        <button onClick={() => handleSmallComponent2Change(Task)}>
          Set Task
        </button>
        <button onClick={() => handleSmallComponent2Change(Weather)}>
          Set Weather
        </button>
      </div>
    </div>
  );
};

export default Home;
