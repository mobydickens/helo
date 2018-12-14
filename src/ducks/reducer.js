let initialState = {
  username: '',
  id: ''
}

// ACTION TYPES
const UPDATE_USER = 'UPDATE_USER';

// ACTION BUILDERS
export function updateUser({userId, username}) {
  return {
    type: UPDATE_USER,
    payload: {
      userId: userId,
      username: username
    }
  }
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case UPDATE_USER:
      return { ...state, username: action.payload.username, id: action.payload.userId };
    default: 
      return state;
  }
}