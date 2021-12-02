import { applyMiddleware, compose, createStore } from 'redux'
import createRootReducer from './reducers'

export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(),
        preloadedState,
        compose(
            applyMiddleware(
                // ... other middlewares ...
            ),
        ),
    )

    return store
}