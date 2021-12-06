import React from 'react';
import CreatePlayList from '../../components/create-play-list/CreatePlayList';
import DefaultLayot from '../../components/layout/DefaulyLayout';
import PlayListItems from '../../components/play-list-items/PlayListItems';
import './App.css';

function App() {
  return (
    <DefaultLayot>
      <CreatePlayList />
      <PlayListItems/>
    </DefaultLayot>
  );
}

export default App;
