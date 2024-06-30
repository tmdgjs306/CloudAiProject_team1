enum ActionType {
  ADD_USER = 'ADD_USER',
  DELETE_USER = 'DELETE_USER',
  MODIFY_IMAGE = 'MODIFY_IMAGE',
}

interface AddUserAction {
  type: ActionType.ADD_USER;
  isLogin: boolean;
  id: number;
  userId: string;
  email: string;
  profileImageUrl: string;
  nickname: string;
  region: string;
  size: number;
  posts: number,
  followers: number,
  following: number,
}

interface DeleteUserAction {
  type: ActionType.DELETE_USER;
}

interface ModifyImageAction {
  type: ActionType.MODIFY_IMAGE;
  profileImageUrl: string;
}

type Action = AddUserAction | DeleteUserAction | ModifyImageAction;

const initialState = {
  isLogin: false,
  id: "",
  userId: "",
  email: "",
  profileImageUrl: "",
  nickname: "",
  region: "",
  size: "",
  posts: 0,
  followers: 0,
  following: 0,
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_USER:
      return {
        isLogin: action.isLogin,
        id: action.id,
        userId: action.userId,
        email: action.email,
        profileImageUrl: action.profileImageUrl,
        nickname: action.nickname,
        region: action.region,
        size: action.size,
        posts: action.posts,
        followers: action.followers,
        following: action.following,
      };
    case ActionType.DELETE_USER:
      return initialState;
    case ActionType.MODIFY_IMAGE:
      return {
        ...state,
        profileImageUrl: action.profileImageUrl,
      };
    default:
      return state;
  }
};

export default userReducer;
