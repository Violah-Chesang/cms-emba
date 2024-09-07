import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchUserDetails } from "../store/slices/authSlice"
import { RootState,AppDispatch } from "../store/store"

const useAuthStatus =(username:string) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const {token, status} = useSelector((state:RootState) => state.auth)

    useEffect(() => {
        if (status == 'succeeded' && username){
            dispatch(fetchUserDetails(username))
        }
    },[status, username, dispatch])

    useEffect(() => {
        if(token && status === 'succeeded'){
            navigate("/dashboard")
        }
    }, [token, status, navigate])

    return {token, status}

}
export default useAuthStatus