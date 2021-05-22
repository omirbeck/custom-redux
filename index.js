"use strict"

class Store {
  constructor(callback) {
    if (typeof callback !== 'function') {
      throw Error('You should put a function reducer')
    }
    this.initialState;
    this.callback = callback;
    this.action = { type: "INITIAL_ACTION" };
    this.state = callback(this.initialState, this.action);
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    if (action.type) {
      this.state = this.callback(this.state, action)
    } else {
      throw Error("Action should be has type");
    }
  }
}

const initialState = {
  user: {
    name: null,
    age: null,
    email: null
  },
  isLoading: false,
}

const customReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { 
        ...state, 
        isLoading: action.payload 
      }
    case "SET_USER":
      return { ...state, 
        user: { ...action.payload }
      }
    default:
      return { ...state }
  }
}

const user = {
    name: "Ali",
    age: 25,
    email: "ali@mail.com"
  }

const store = new Store(customReducer);

console.log(store.getState())

store.dispatch({ type: "SET_LOADING", payload: true })

console.log(store.getState())

store.dispatch({ type: "SET_USER", payload: user })

console.log(store.getState())

store.dispatch({ type: "BLA_BLA", payload: true })

console.log(store.getState())