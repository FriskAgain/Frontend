import { useState } from "react";

export default function CreateJobs(){
    const[form,setForm] = useState({
        customer: "",
        startDate: "",
        days: "",
        location: "",
        comments: ""
    });
    
    const[message, setMessage] = useState("");

    function handleChange(params) {
    setForm({
        ...form,
        [params.target.name]: params.target.value
        });
    }

    async function HandleJobSubmit(params){
        params.preventDefault();

        try{
            const res = await fetch("http://localhost:8080/api/Jobs",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : "Bearer " + localStorage.getItem("token")
                },
                body : JSON.stringify(form)
            });

            if(!res.ok)
            {
                throw new Error("Failed to submit new job");   
            }
            setMessage("Job created successfully");
            setForm({ 
                customer: "",
                startDate: "",
                days: "",
                location: "",
                comments: ""
            });

        } catch (err){
            setMessage("Error: " + err.message);
        }
    }

    return(
        <div>
            <h1>Create new job</h1>
            <form onSubmit={HandleJobSubmit}>
                <input
                    name="customer"
                    placeholder="Customer"
                    value={form.customer}
                    onChange={handleChange}
                />

                <input
                    name="startDate"
                    type="date"
                    value= {form.startDate}
                    onChange={handleChange}
                />

                <input
                    name="days"
                    placeholder="days"
                    value= {form.days}
                    onChange={handleChange}
                />

                <input
                    name="location"
                    placeholder="Location"
                    value= {form.location}
                    onChange={handleChange}
                />

                <input
                    name="comments"
                    placeholder="Comments"
                    value= {form.comments}
                    onChange={handleChange}
                />

                <button type="submit">Create</button>
                </form>
                {message && <p>{message}</p>}
                </div>
    );
}