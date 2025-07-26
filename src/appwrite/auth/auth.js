import conf from "../../conf/confenv.js"
import { Client, Account, ID } from "appwrite";

// const Client = new Client().setEndPoint('https://cloud.appwrite.io/v1')
// .setProject('[PROJECT_ID]');

// const account = new Account(client);

// const user = await account.create(
//     ID.unique(),
//     'email@example.com',
//     'password'
// );

  console.log("appwrite confi:", conf);

export class AuthService {
 
    client = new Client();
    account;
 
       
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
          console.log("appwrite client config:", this.client)  
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
               const userAccount = await this.account.create(ID.unique(), email, password, name);
                       console.log("userAccount created",userAccount)
               if(userAccount){
                      // call another method

                      return this.login({email, password})
               }
               else{
                return userAccount
               }
        }catch(error){
                  throw error;
        }
    }

    async login({email, password}){
        try{   
           return  await this.account.createSession(email, password);
        }
        catch(error){
            throw error;
        }
    }

    async getCurrentUser() {
        console.log("getCurrent User Invoked!")
        try{
             return  await this.account.get();
        }catch(error){
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        try{
            await this.account.deleteSession();
        }catch(error){
            console.log("Appwrite service :: logout :: error", error);
        }
    }
    
}

const authService = new AuthService();
                                                        
export default authService