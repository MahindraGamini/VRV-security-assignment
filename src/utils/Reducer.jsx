
export const initialState = {
  members: [
    { id: 1, email: "user1@example.com", role: "user" },
    { id: 2, email: "vendor1@example.com", role: "creator" },
    { id: 3, email: "user2@example.com", role: "user" },
    { id: 4, email: "vendor2@example.com", role: "creator" },
  ],
};

export const actionTypes = {
  TOGGLE_ROLE: "TOGGLE_ROLE",
  DELETE_MEMBER: "DELETE_MEMBER",
  ADD_MEMBER:"ADD_MEMBER",
  
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_ROLE:
      return {
        ...state,
        members: state.members.map((member) =>
          member.id === action.id
            ? { ...member, role: member.role === "user" ? "creator" : "user" }
            : member
        ),
      };
    case actionTypes.DELETE_MEMBER:
      return {
        ...state,
        members: state.members.filter((member) => member.id !== action.id),
      };
    case actionTypes.ADD_MEMBER:
        return{
          ...state,
          members:[
            ...state.members,
            {id:Date.now(),email:action.payload.email,role:action.payload.role}
          ]
        };
        case actionTypes.TOGGLE_FOLLOW: 
        return {
          ...state,
          members: state.members.map((member) =>
            member.id === action.id
              ? { ...member, isFollowing: !member.isFollowing }
              : member
          ),
        };
    default:
      return state;
  }
};
