//state argument is not application state,only the state
// this reducer is responsible for
export default function(state = null,action){
	//first(default) value of state is null
	//state+=1 increment state by 1 when the action is called
switch(action.type){
	case 'TOILET_SELECTED':
		return action.payload;
  case 'TOILET_STREETVIEW':
    return Object.assign({}, state, {streetView: action.payload});
}
return state;
}
