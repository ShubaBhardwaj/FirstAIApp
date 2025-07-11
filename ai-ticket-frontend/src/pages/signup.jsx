import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
function Signup() {
 const [form, setForm] =useState({email: "", password: ""});
 const [loading, setLoading] = useState(false)
 const navigate = useNavigate()

 const handleChange = (e)=>{
  setForm({...form, [e.target.name]: e.target.value})
 }

 const handleSingup = async(e)=>{
  e.preventDefault()
  setLoading(true)
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/singup`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await response.json()
    if (response.ok) {
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      navigate("/")
    } else{
      console.error("Error while singup",data.error)
      alert(data.message || "singup failed")
    }

  } catch (error) {
    alert("singup - Somthing went wrong")
  }
  finally{
    setLoading(false)
  }
 }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <form onSubmit={handleSingup} className="card-body">
          <h2 className="card-title justify-center">Sign Up</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className="form-control mt-4">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup