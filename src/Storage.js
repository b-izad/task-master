// src/storage.js
export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('myAppState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('myAppState', serializedState);
    } catch (err) {
      console.error('Error saving state:', err);
    }
  };
  