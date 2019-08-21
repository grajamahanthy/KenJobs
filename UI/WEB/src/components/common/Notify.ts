import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Notify {

    Success_notify = (message: string): any => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
    }

    Error_notify = (message: string): any => {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    Warning_Notify=(message:string):any=>{
        toast.warn(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    Info_Notify=(message:string)=>{
        toast.info(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    
    }

    Custom_Notify = (message:string): any => {
        toast(message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'foo-bar'
        });
    }

    Default_Notify=(message:string)=>{
        toast("message");
    }

}