class CustomErrorHandler extends Error{
    constructor(status, msg){
        super();
        this.status = status;
        this.message = msg;
    }

    static alreadyExist(message){
        return new CustomErrorHandler(409,message)
    }

    static wrongCredentials(message = "Wrong Username or password!"){
        return new CustomErrorHandler(401,message)
    }
    
    static unAutherized(message = "unautherized"){
        return new CustomErrorHandler(401,message)
    }

    static notFound(message = "404 not found"){
        return new CustomErrorHandler(404,message)
    }

}

export default CustomErrorHandler;