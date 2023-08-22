import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export const success_toaster = (/** @type {string | number | boolean | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | import("react").ReactFragment | import("react").ReactPortal | ((props: import("react-toastify").ToastContentProps<unknown>) => import("react").ReactNode) | null | undefined} */ message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark"
    })
}

export const info_toaster = (/** @type {string | number | boolean | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | import("react").ReactFragment | ((props: import("react-toastify").ToastContentProps<unknown>) => import("react").ReactNode) | null | undefined} */ message) => {
    toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark"
    })
}

export const error_toaster = (/** @type {string | number | boolean | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | import("react").ReactFragment | import("react").ReactPortal | ((props: import("react-toastify").ToastContentProps<unknown>) => import("react").ReactNode) | null | undefined} */ message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark"
    })
}