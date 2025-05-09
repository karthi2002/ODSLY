import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  UPDATE_PROFILE_USERNAME_SUCCESS,
  DELETE_PROFILE_IMAGE_SUCCESS,
   UPDATE_PROFILE_PREFERENCES_SUCCESS,
} from './profileActions';

const initialState = {
  profile: {
    fullName: null,
    email: null,
    username: null,
    image: null,
    sports: [],
    bettingPreference: null,
  },
  error: null,
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
      return { ...state, profile: action.payload, error: null };
    case FETCH_PROFILE_FAILURE:
      return { ...state, error: action.payload };
    case UPDATE_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, image: action.payload },
        error: null,
      };
    case UPDATE_PROFILE_USERNAME_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, username: action.payload },
        error: null,
      };
    case DELETE_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, image: null },
        error: null,
      };
    case UPDATE_PROFILE_PREFERENCES_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          sports: action.payload.sports,
          bettingPreference: action.payload.bettingPreference,
        },
        error: null,
      };
    default:
      return state;
  }
}