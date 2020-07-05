export const TOKEN_DATA = 'TOKEN_DATA' ;

export const token = (status,token) => {
    return{ 
        type : TOKEN_DATA ,
        tokenData : {status : status, token : token } 
    };

} ;
