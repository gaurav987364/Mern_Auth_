/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useDeleteUsersMutation, useGetUsersQuery, useUpdateUserMutation } from '../../store/api/UserApiSlice';
import { FaCheck, FaEdit, FaSpinner, FaTrashAlt } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

const UserList:React.FC = () => {
    const [editId,setEditId] = useState<string | null>(null);
    const [editName,setEditName] = useState("");
    const [editEmail,setEditEmail] = useState("");


    const {data:users,refetch,isLoading,error} = useGetUsersQuery({});
    const [deleteUser] = useDeleteUsersMutation();
    const [updateUser] = useUpdateUserMutation();

    const updateHandler = async (id:string)=>{
        try {
            await updateUser({
                userId: id,
                username: editName,
                email: editEmail
            });
            toast.success("User updated successfully.");
            setEditId(null);
            refetch();
        } catch (error) {
            toast.error("Error updating user.")
            console.error(error);
        }
    };

    const deleteHandler = async (id:string)=>{
        if(window.confirm('Are you sure you want to delete🤔')){
            try {
                await deleteUser(id);
            } catch (error) {
                toast.error("Error deleting user.😲")
                console.error(error);
            }
        }
    };


    const toggleHandler = async (id:string,name:string,email:string)=>{
        setEditId(id);
        setEditName(name);
        setEditEmail(email);
    };


    useEffect(()=>{
        refetch()
    },[refetch]);
  return ( 
  <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl shadow-xl rounded-2xl bg-white p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900">User List:</h2>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <FaSpinner className='animate-spin text-blue-500' size={24} />
          </div>
        ) : error ? (
          <p className='text-red-500 text-center text-md font-medium'>Something went wrong!</p>
        ) : (
          <div className='overflow-x-auto'>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-100 text-gray-800 text-left">
                  <th className='px-4 py-3 font-medium'>ID</th>
                  <th className='px-4 py-3 font-medium'>Name</th>
                  <th className='px-4 py-3 font-medium'>Email</th>
                  <th className='px-4 py-3 font-medium text-center'>Admin</th>
                  <th className='px-4 py-3 font-medium text-center'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user : any) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className='px-4 py-3'>{user._id}</td>
                    <td className='px-4 py-3'>
                      {editId === user._id ? (
                        <div className='flex items-center gap-2'>
                          <input 
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400' 
                          />
                          <button 
                            onClick={() => updateHandler(user._id)}
                            className='bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600'
                          >
                            <FaCheck size={18} />
                          </button>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          {user.username}
                          <button onClick={() => toggleHandler(user._id, user.username, user.email)}>
                            <FaEdit className='cursor-pointer text-gray-600 hover:text-blue-500' size={18} />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className='px-4 py-3'>
                      {editId === user._id ? (
                        <div className='flex items-center gap-2'>
                          <input 
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400' 
                          />
                          <button 
                            onClick={() => updateHandler(user._id)}
                            className='bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600'
                          >
                            <FaCheck size={18} />
                          </button>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          {user.email}
                          <button onClick={() => toggleHandler(user._id, user.username, user.email)}>
                            <FaEdit className='cursor-pointer text-gray-600 hover:text-blue-500' size={18} />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className='px-4 py-3 text-center'>
                      {user.isAdmin ? <FaCheck className='text-green-500' size={18} /> : <IoMdClose className='text-red-500' size={20} />}
                    </td>
                    <td className='px-4 py-3 text-center'>
                      <button 
                        onClick={() => deleteHandler(user._id)}
                        className='text-red-700 bg-red-200 py-2 px-3 rounded-lg hover:bg-red-300'
                      >
                        <FaTrashAlt className='cursor-pointer' size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserList