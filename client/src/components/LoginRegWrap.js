import React, { useState } from 'react'
import UserLogin from './UserLogin';
import UserReg from './UserReg';


const LoginRegiWrapper = () => {
    const [toggleLoginReg, setToggleLoginReg] = useState(true);
    const handleToggle = () => {
        setToggleLoginReg(!toggleLoginReg);
    }
    return (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
            {
                toggleLoginReg ? <UserLogin handleToggle={handleToggle} />
                    : <UserReg handleToggle={handleToggle} />
            }
        </div>
    )
}

export default LoginRegiWrapper