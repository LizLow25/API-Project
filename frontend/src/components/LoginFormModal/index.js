import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true)
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };
    const demoLogin = (e) => {
        return dispatch(sessionActions.login({ credential:'demo1', password:'password' }))
        .then(closeModal)

    }

    useEffect(() => {
        if (credential.length > 4 && password.length > 6) setDisabled(false)

    }, [credential, password])



    return (
        < div className='loginmodal'>
            <h1>Log In</h1>
            <form className='loginform' onSubmit={handleSubmit}>
                <label>
                    <input
                        className='loginusername'
                        placeholder="Username or Email"
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}

                    />
                </label>
                <label >
                    <input
                        className="loginpassword"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        
                    />
                </label>
                {errors.credential && (
                    <p className="loginerrors">{errors.credential}</p>
                )}
                <button className='loginbutton' type="submit"

                >Log In</button>
                <button
                className="loginbutton demo"
                    onClick={demoLogin}

                >Log In as Demo User</button>
            </form>


        </div>
    );
}

export default LoginFormModal;
