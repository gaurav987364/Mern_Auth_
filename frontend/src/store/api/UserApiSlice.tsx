import { USERS_URL } from "../constants";
import { apiSlice } from "./ApiSlice";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({ 
            //we also have query method mutation means we send some data or query means we get some data
            query:(data)=>({
                url:`${USERS_URL}/auth`,
                method:'POST',
                body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST',
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}`,
                method:'POST',
                body:data
            })
        }),
        profile:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/profile`,
                method:'PUT',
                body:data,
            })
        })
    }),
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation } = userApiSlice;
