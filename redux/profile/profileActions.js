import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../utils/axios';

// Action Types
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';
export const UPDATE_PROFILE_IMAGE_SUCCESS = 'UPDATE_PROFILE_IMAGE_SUCCESS';
export const UPDATE_PROFILE_USERNAME_SUCCESS = 'UPDATE_PROFILE_USERNAME_SUCCESS';
export const DELETE_PROFILE_IMAGE_SUCCESS = 'DELETE_PROFILE_IMAGE_SUCCESS';
export const UPDATE_PROFILE_PREFERENCES_SUCCESS = 'UPDATE_PROFILE_PREFERENCES_SUCCESS';


// Fetch user profile from session
export const fetchProfile = () => async (dispatch) => {
  try {
    const session = await AsyncStorage.getItem('userSession');
    if (!session) throw new Error('No user session found');
    const userSession = JSON.parse(session); 
    const email = userSession.email;
    const res = await api.post('/api/v1/get-profile', { email });
    const user = res.data; 
    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      payload: {
        fullName: user.fullName || null,
        email: user.email || null,
        username: user.username || null,
        image: user.image || `https://ui-avatars.com/api/?name=${user.username}` || null,
        sports: user.sports || [],
        bettingPreference: user.bettingPreference || null,
      },
    });
  } catch (err) {
    console.error('Fetch profile error:', err);
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: err.message });
  }
};

// Modify user image
export const modifyUserImage = (email, image) => async (dispatch) => {
  try {
    const res = await api.post('/api/v1/modify-image', { email, image });
    dispatch({ type: UPDATE_PROFILE_IMAGE_SUCCESS, payload: res.data.image });
  } catch (err) {
    console.error('Modify image error:', err);
  }
};

// Modify username
export const modifyUserUsername = (email, username) => async (dispatch) => {
  try {
    const res = await api.post('/api/v1/modify-username', { email, username });
    dispatch({ type: UPDATE_PROFILE_USERNAME_SUCCESS, payload: res.data.username });
  } catch (err) {
    console.error('Modify username error:', err);
  }
};

// Delete user image
export const deleteUserImage = (email) => async (dispatch) => {
  try {
    await api.post('/api/v1/delete-image', { email });
    dispatch({ type: DELETE_PROFILE_IMAGE_SUCCESS });
  } catch (err) {
    console.error('Delete image error:', err);
  }
};

//modify bet types abd favourite sports
export const updateUserPreferences = (email, sports, bettingPreference) => async (dispatch) => {
  try {
    const res = await api.post('/api/v1/modify-bet-sports', {
      email,
      sports,
      bettingPreference,
    });

    dispatch({
      type: UPDATE_PROFILE_PREFERENCES_SUCCESS,
      payload: {
        sports: res.data.sports,
        bettingPreference: res.data.bettingPreference,
      },
    });
    return true; 
  } catch (err) {
    console.error('Update preferences error:', err);
  }
};
