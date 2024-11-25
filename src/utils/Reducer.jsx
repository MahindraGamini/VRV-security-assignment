export const actionTypes = {
  ADD_MEMBER: "ADD_MEMBER",
  DELETE_MEMBER: "DELETE_MEMBER",
  UPDATE_MEMBER_ROLE: "UPDATE_MEMBER_ROLE",
  ADD_ROLE: "ADD_ROLE",
  REMOVE_ROLE: "REMOVE_ROLE",
};

export const initialState = {
  members: [],
  roles: ["user", "creator"], 
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_MEMBER:
      return {
        ...state,
        members: [
          ...state.members,
          { id: Date.now(), email: action.payload.email, role: action.payload.role },
        ],
      };
    case actionTypes.DELETE_MEMBER:
      return {
        ...state,
        members: state.members.filter((member) => member.id !== action.payload),
      };
    case actionTypes.UPDATE_MEMBER_ROLE:
      return {
        ...state,
        members: state.members.map((member) =>
          member.id === action.payload.id
            ? { ...member, role: action.payload.role }
            : member
        ),
      };
    case actionTypes.ADD_ROLE:
      return {
        ...state,
        roles: [...state.roles, action.payload],
      };
    case actionTypes.REMOVE_ROLE:
      return {
        ...state,
        roles: state.roles.filter((role) => role !== action.payload),
      };
    default:
      return state;
  }
};
