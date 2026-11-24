import { useState } from "react";
import { createExpense } from "../../Api/client";
import { useParams } from "react-router-dom";

export default function CreateExpensePage(){
    const {jobId} = useParams();

    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [text, setText] = useState("");

    const [createdExpense, setCreatedExpense] = useState(null);
    const [error, setError] = useState("");
    
    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setCreatedExpense(null);

        try{
            const modelId = localStorage.getItem("modelId");

            const newExpense = await createExpense({
                amount,
                date,
                jobId,
                modelId,
                text,
            });

            setCreatedExpense(newExpense);

            setAmount("");
            setDate("");
            setText("");
        } catch(error){
            setError("Kunne ikke tilføje udgift");
        }
    }

    return (
        <main>
            <h1>Tilføj udgift</h1>
            <p>Job ID: {jobId}</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    type="text"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    required
                />

                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                />

                <label htmlFor="text">Text</label>
                <input
                    id="text"
                    type="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    required
                />

                {createdExpense && (
                    <p>Udgift tilføjet med ID: {createdExpense.expenseId}</p>
                )}

                <button type="submit">Tilføj udgift</button>
            </form>
        </main>
    )
}