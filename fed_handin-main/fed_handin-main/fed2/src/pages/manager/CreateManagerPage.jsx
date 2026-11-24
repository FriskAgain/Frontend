import { useState } from "react";


export default function CreateManagerPage() {
  const [form, setForm] = useState({
      password: "",
      firstname:"",
      lastname:"",
      email: ""
  });

const [message, setMessage] = useState("");

function handleChange(params) {
    setForm({
        ...form,
        [params.target.name]: params.target.value
    });
}

async function HandleUserSubmit(params) {
    params.preventDefault();

    try{
        const res = await fetch("http://localhost:8080/api/Managers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(form)
        });

        if(!res.ok)
        {
            throw new Error("Failed to create a new Manager, wrong password or email maybe");
        }

        setMessage("Manager created successfully!");
        setForm({ password: "" , firstname:"", lastname:"", email: "" });

        } catch (err) {
            setMessage("Error: " + err.message);
        }
    }


return(
    <div>
        <h1>Create new manager</h1>
        <form onSubmit={HandleUserSubmit}>
            <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            />

            <input
            name="firstname"
            placeholder="First name"
            value={form.firstname}
            onChange={handleChange}
            />

            <input
            name="lastname"
            placeholder="Last name"
            value={form.lastname}
            onChange={handleChange}
            />

            <input 
            name="email"
            placeholder="email@something.com"
            value={form.email}
            onChange={handleChange}
            />

         <button type="submit">Create</button>

         </form>
         {message && <p>{message}</p>}
    </div>
  );
}

