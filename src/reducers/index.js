import {combineReducers} from 'redux'
import inventory from './inventory'
import products from './products'

export default combineReducers({
    inventory,
    products
})
