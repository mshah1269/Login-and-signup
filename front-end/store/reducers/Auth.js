import { TOKEN_DATA } from '../actions/Auth';


const initialState = {
    status : null,
    token : null,
    // userId : null
};


export default (state = initialState, action) => {

    switch(action.type){
        case TOKEN_DATA :
           
              return {
                ...state,
                status: action.tokenData.status,
                token: action.tokenData.token
                // userId: action.tokenData.userId
              };
    }


    return state;

};

 