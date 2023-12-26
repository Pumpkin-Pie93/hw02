import {UserType} from '../HW8'

const initialState:UserType[] = [
    {_id: 0, name: 'Кот', age: 13},
    {_id: 1, name: 'Александр', age: 66},
    {_id: 2, name: 'Коля', age: 16},
    {_id: 3, name: 'Виктор', age: 44},
    {_id: 4, name: 'Дмитрий', age: 40},
    {_id: 5, name: 'Ирина', age: 55},
]


type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state = initialState, action: ActionType): any => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            let newState = [...state];
            if (action.payload === 'up') {
            newState.sort((a, b) =>( a.name.localeCompare(b.name)))
            }  if (action.payload === 'down') {
            newState.sort((a, b) => (b.name.localeCompare(a.name)))
            }
               return newState

        }
        case 'check': {

            return state.filter(user => user.age >= 18) // need to fix
        }
        default:
            return state
    }
}


