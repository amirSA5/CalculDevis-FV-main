import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Devis.css'
function Login() {
    const [user, setUser] = useState({
        email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            console.log(user)
            await axios.post('http://localhost:4000/app/login', {...user})

            localStorage.setItem('firstLogin', true)
            
            window.location.href = "/Step1_devis";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="#" onClick={()=>alert("Comming soon")}>Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
