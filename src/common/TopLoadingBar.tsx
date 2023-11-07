import React from "react";
import LoadingBar from "react-top-loading-bar"; // https://github.com/klendi/react-top-loading-bar
import axios from "axios";

export default function TopLoadingBar() {
    // loading bar component ref
    const ref = React.useRef<any>(null);

    React.useEffect(() => {
        // Add a request interceptor
        axios.interceptors.request.use(
            (config) => {
                if (ref?.current) ref.current.continuousStart();
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Add a response interceptor
        axios.interceptors.response.use(
            (response) => {
                if (ref?.current) ref.current.complete();
                return response;
            },
            (error) => {
                if (ref?.current) ref.current.complete();
                return Promise.reject(error);
            }
        );
    }, []);

    return <LoadingBar shadow color = "#9441b7" ref = { ref } />;
}