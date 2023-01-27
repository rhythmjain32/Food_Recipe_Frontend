import { Types } from "../../Types";

const initialState = {
    profileData: {
        username: "",
        bio: "",
        imagePath: "",
    }
}

const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.profileData:
            return {
                ...state,
                profileData: action.data
            }

        default:
            return state;
    }
}

export default ProfileReducer;