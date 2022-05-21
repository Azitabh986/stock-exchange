export class EmailBody{
    recipient:string | undefined;
    msgBody:string | undefined;
    subject:string | undefined;
    constructor(recipient:string,msgBody:string,subject:string){
        this.recipient=recipient;
        this.msgBody=msgBody;
        this.subject=subject;
    }
}
export class LoginRequest{
    username:string | undefined;
    password:string | undefined;
   
    constructor(username:string,password:string){
        this.username=username;
        this.password=password;
    }
}