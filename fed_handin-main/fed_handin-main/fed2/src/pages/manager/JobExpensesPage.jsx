import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";

export default function JobExpensesPage() {
    const { id } = useParams(); // Job id from the URL

    const [expenses, setExpenses] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchExpenses();
    }, [id]);

    async function fetchExpenses() {
        try { // Function to fetch specified expense
            const res = await fetch(`http://localhost:8080/api/Expenses/${id}`, {
                headers: {
                    Authorization: 
                        "Bearer " + localStorage.getItem("token"),
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch expenses.");
            }

            // Convering to usable json data
            const data = await res.json();
            console.log("EXPENSES:", data);

        } catch (err){
            setMessage("Error: " + err.message);
        }
    }
      return (
    <div>
      <h1>Expenses for Job</h1>

      {message && <p>{message}</p>}

      {expenses.map((exp) => (
        <div key={exp.expenseId}>
          <p>{exp.description}</p>
          <p>{exp.amount} KR</p>
        </div>
      ))}
    </div>
  );
}