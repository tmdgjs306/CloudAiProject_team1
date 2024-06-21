enum ActionType{
  ADD_USER = 'ADD_USER',
  DELETE_USER = 'DELETE_USER'
}
interface Action{
  type: ActionType,
  isLogin: boolean,
  email: string,
  name: string,
  imgUrl: string,
  phoneNumber: string,
  uid: string
}

const userReducer = (state: any, action: Action) => {
  switch(action.type){
    case 'ADD_USER':
      return {
        isLogin: action.isLogin,
        email: action.email,
        name: action.name,
        imgUrl: action.imgUrl,
        phoneNumber : action.phoneNumber,
        uid: action.uid,
      }
    case 'DELETE_USER':
      return {
        isLogin: false,
        email: "",
        name: "",
        imgUrl: "",
        phoneNumber : "",
        uid: "",
      }
    default:
      return {
        isLogin: false,
        email: "",
        name: "",
        imgUrl: "",
        phoneNumber : "",
        uid: "",
      };
  }
}

export default userReducer; 