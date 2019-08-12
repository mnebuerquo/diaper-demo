const initialState = {}

const reducer = (previousState=initialState, action) => {
  const {type, payload} = action
  switch(action.type) {
    case 'DIAPER_CAUGHT_ERROR':
      const diaperFails = previousState.diaperFails || []
      return {
        ...previousState,
        diaperFails: [...diaperFails, payload]
      }

    default:
      return previousState
  }
}

export default reducer
