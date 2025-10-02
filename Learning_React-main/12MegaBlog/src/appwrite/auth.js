import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();  //client is a property here (created for the connection with backend of appwrite)
    account;

    constructor() {  //Jab bhi AuthService class ka object banega, ye constructor run hoga.
        this.client
            .setEndpoint(conf.appwriteUrl)    //Appwrite ka server URL set karta hai (jaise
            .setProject(conf.appProjectId);   //Kaunse project ke andar kaam karna hai, wo set karta hai.
        this.account = new Account(this.client); //Account service ka object banata hai, jo login, signup, logout, session wagairah handle karega.

    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //call another method
                return this.login({ email, password })  //Agar userAccount ban gaya to Login call kar lo
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }

    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // throw error; 
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
    }
}

const authService = new AuthService(); //Yahan AuthService class ka ek single instance (object) banaya gaya hai aur usko export kar diya gaya hai.
// Matlab ab poore project me aap authService import karke login/signup/logout methods(jo baad me is class me add karoge) use kar sakte ho.

export default authService