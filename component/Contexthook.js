import React, { createContext } from "react";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";

const NoteContext = createContext();

export default Contexthook = ({ children }) => {
  const [note, setNote] = useState([]);

  const asyncStoreCall = async () => {
    const result = await AsyncStorage.getItem("notes");
    if (result !== null) setNote(JSON.parse(result));
  };

  useEffect(() => {
    asyncStoreCall();
  }, []);

  return (
    <NoteContext.Provider value={{ note, setNote, asyncStoreCall }}>
      {children}
    </NoteContext.Provider>
  );
};
export const useNote = () => useContext(NoteContext);
