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
    this.subscribers = [];
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    if (action.type) {
      this.state = this.callback(this.state, action);
      this.subscribers.forEach((subscribe) => subscribe(action, this.state))
    } else {
      throw Error("Action should be has type");
    }
  }

  subscribe(listener) {
    this.subscribers.push(listener)
    const THIS = this;
    return function unsubscribe() {
      const listenerIndex = THIS.subscribers.findIndex((sub) => sub === listener);
      if (listenerIndex !== -1) {
        THIS.subscribers.splice(listenerIndex, 1);
      }
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

const listener1 = (action, state) => { console.log(1) }
const unsubscribe1 = store.subscribe(listener1);

const listener2 = (action, state) => { console.log(state) }
const unsubscribe2 = store.subscribe(listener2);

const listener3 = (action, state) => { console.log(3) }
const unsubscribe3 = store.subscribe(listener3);

store.dispatch({ type: 'ACTION1' })

unsubscribe3();
store.dispatch({ type: 'ACTION2' })

unsubscribe1();
store.dispatch({ type: 'ACTION3' })



store.dispatch({ type: "SET_LOADING", payload: true })

store.dispatch({ type: "SET_USER", payload: user })

store.dispatch({ type: "BLA_BLA", payload: true })
