

class HttpException extends Error{
    status: number;
    message: string;
    error?: any;

    constructor(status:number,message:string,error?:any){
        super(message);
        this.message = message;
        this.error = error;
        this.status = status;
    }
}

export default HttpException