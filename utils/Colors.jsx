const Colors = {
    primary: '#000000',
    secondary: '#FFFFFF',
    success: '#01B574',
    error: '#DC143C',
    background: '#000A34',
    text: '#667085',
    LightGray: '#CCCCCC',
    blue: '#1D7FD6',
    orange:'#FFC669',
  };
  
export default Colors;


// import React, { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const useTheme = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const getSavedMode = async () => {
//       const savedMode = await AsyncStorage.getItem("darkMode");
//       setDarkMode(savedMode === 'true');
//     };
    
//     getSavedMode();
//   }, []);

//   const Colors = {
//     primary: darkMode ? '#000000' : '#FFFFFF',
//     secondary: darkMode ? '#FFFFFF' : '#000000',
//     success: '#01B574',
//     error: '#DC143C',
//     background: darkMode ? '#000A34' : '#FFFFFF',
//     text:  darkMode ? '#667085' : '#000000',
//     LightGray: darkMode ?  '#CCCCCC' : '#FFFFFF',
//     blue: '#1D7FD6',
//     orange: '#FFC669',
//   };

//   return Colors;
// };

// export default useTheme;
