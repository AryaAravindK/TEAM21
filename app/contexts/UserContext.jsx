import { createContext, useState } from "react"

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  async function login(email, password) {
    try {
      console.log("Logging in the user...")
      setUser({"email":email,"password":password})
    } catch (error) {
      throw Error(error.message)
    }
  }

  async function register(email, password) {
    try {
      
      console.log("registering the user")
      await login(email,password)
    } catch (error) {
      throw Error(error.message)
      
    }


  }


  async function verifyOtp(){

  }

  async function createUserProfile() {

  }

  async function forgotPassword(){
    
  }

  async function logout() {

  }

  return (
    <UserContext.Provider value={{ 
      user, login, logout, register,verifyOtp,createUserProfile,forgotPassword
    }}>
      {children}
    </UserContext.Provider>
  );
}
