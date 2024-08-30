import { GET_USER_REQUEST, GET_USER_SUCCESS, LOG_OUT_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionTypes";
import axios from "axios";
export const register=(userData)=>async(dispatch)=>{
    //objects that desrcibe events and chnags
    /*
    Axios is a popular js library used to make http requests from node
    post used to send a post request to that end point
    userData contains the body of the post request
    dispatch sends actions to state to trigger store updates
    */

    dispatch({type:REGISTER_REQUEST})
    /*
    this dispatches an action to the redux store indicatin that a 
    registration request is starting.

    await pauses the function execution until the request completes and response is resovled

    dispatch({ type: REGISTER_SUCCESS, payload: user.jwt })
    this dispatches an aciton to redux indciating that registration was succesful


    When a dispatch is sent the action is an object that contains the type which
    is the identifier for the action to trigger, payload is the data sent along with this
    */
    const baseUrl="http://localhost:8080/"
    try{
        const response= await axios.post(`${baseUrl}auth/signup`,userData.data)
        const user=response.data;
        //console.log(user)

        dispatch({type:REGISTER_SUCCESS,payload:user.jwt})
        //dispatch sent to identify success action
        localStorage.setItem("jwt",user.jwt)
        userData.navigate("/")
    }catch(error){
        console.log(error)
        dispatch({REGISTER_FAILURE,payload:error.message})
    }

}


export const logIn=(userData)=>async(dispatch)=>{
    
    dispatch({type:LOGIN_REQUEST})

    const baseUrl="http://localhost:8080/"
    try{
        const response= await axios.post(`${baseUrl}auth/signin`,userData.data)
        const user=response.data;
        //console.log(user)

        dispatch({type:LOGIN_SUCCESS,payload:user.jwt})
        localStorage.setItem("jwt",user.jwt)
        userData.navigate("/")
    }catch(error){
        console.log(error)
        dispatch({type:LOGIN_FAILURE,payload:error.message})
    }

}


export const getUser=(jwt)=>async(dispatch)=>{
    
    dispatch({type:GET_USER_REQUEST})

    const baseUrl="http://localhost:8080/"
    try{
        const response= await axios.get(`${baseUrl}api/users/profile`,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        });
        const user=response.data;
        console.log(user)

        dispatch({type:GET_USER_SUCCESS,payload:user})
        

    }catch(error){
        console.log(error)
        dispatch({type:LOGIN_FAILURE,payload:error.message})
    }
    // dispatching a plain action object above that represents an ction
    /*
    has a type property defined in the action types and other data in the payload 
    */

}
export const logout=()=>(dispatch)=>{
    localStorage.clear();
    dispatch({type:LOG_OUT_SUCCESS})
}

