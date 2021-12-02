import { combineReducers } from 'redux'
import { formDataReducer } from './dataStorage/reducers'

const createRootReducer = () => combineReducers({
  dataStorage: formDataReducer,
})
export default createRootReducer