"use server"

import { createClient } from "@/auth/sever"
import { handleError } from "@/lib/utils";

export const loginAction = async ( email: string, password: string) =>  {
    try {
        const { auth } = await createClient()

        const { error } = await auth.signInWithPassword({
            email,
            password,
        })

        if (error) throw error

       
        return { error: null }; 
    } catch (error) {
      const { errorMessage } = handleError(error);
      return { error: new Error(errorMessage) }; 
    }
};


export const signAction = async (email: string, password: string) => {
    try {
        const { auth } = await createClient()

        const { data,  error } = await auth.signUp({
            email,
            password,
        })

        if (error) throw error

        const userId = data.user?.id;
        if (!userId) throw new Error("Error signing up");

        // add user to database
        return { error: null }; // 
    } catch (error) {
      const { errorMessage } = handleError(error);
      return { error: new Error(errorMessage) }; 
    }
};