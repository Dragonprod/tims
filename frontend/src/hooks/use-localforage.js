// @flow

// LocalForage: https://github.com/localForage/localForage
// npm i -S localForage

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26
 * @since 2020-08-05
 */

 import React from 'react';
 import localforage from 'localforage';
 
 type HookMethods = [
     any,
     ( value: any ) => void,
     () => void,
 ];
 
 /**
  * React custom hook to save/restore value from localStorage using localforage library
  * @example
  * ```js
  * function App() {
  *  const [value, set, remove] = useLocalForge('my-key', {});
  * }
  * ```
  */
 export default function useLocalForge ( key: string, initialValue?: any ): HookMethods {
     const [storedValue, setStoredValue] = React.useState(initialValue);
     
     React.useEffect(() => {
         (async function () {
             try {
                 const value = await localforage.getItem(key);
                 setStoredValue(value);
             } catch ( err ) {
                 return initialValue;
             }
         })();
     }, [initialValue, storedValue, key]);
     
     /** Set value */
     const set = ( value: any ) => {
         (async function () {
             try {
                 await localforage.setItem(key, value);
                 setStoredValue(value);
             } catch (err) {
                 return initialValue;
             }
         })();
     };
     
     /** Removes value from local storage */
     const remove = () => {
         (async function () {
             try {
                 await localforage.removeItem(key);
                 setStoredValue(null);
             } catch (e) {}
         })();
     };
     
     return [storedValue, set, remove];
 }