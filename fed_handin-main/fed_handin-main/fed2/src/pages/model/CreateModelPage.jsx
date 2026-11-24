import { useState } from "react";
import { createModel } from "../../Api/client";

export default function CreateModelPage() {
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("")
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [nationality, setNationality] = useState("");
    const [height, setHeight] = useState("");
    const [shoeSize, setShoeSize] = useState("");
    const [eyeColor, setEyeColor] = useState("");
    const [hairColor, setHairColor] = useState("");
    const [comments, setComments] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const model = {
                password,
                firstName,
                lastName,
                email,
                phoneNo,
                addressLine1,
                addressLine2,
                zip,
                city,
                country,
                birthDate,
                nationality,
                height,
                shoeSize,
                eyeColor,
                hairColor,
                comments,
            };

            console.log("SENDER:", model); // 🔥 debug

            await createModel(model);

            alert("Model created!");
        }   catch (err) {
            console.error(err);
            alert("Error creating model");
        }
    }

    return (
        <div className="container">
            <h1>Create Model</h1>

            <form className="form" onSubmit={handleSubmit}>
                <input
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    />
                
                <input
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    />
                
                <input
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />

                <input
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />

                <input
                    placeholder="Address 1"
                    value={addressLine1}
                    onChange={e => setAddressLine1(e.target.value)}
                    />

                <input
                    placeholder="Address 2"
                    value={addressLine2}
                    onChange={e => setAddressLine2(e.target.value)}
                    />

                <input
                    placeholder="Zip Code"
                    value={zip}
                    onChange={e => setZip(e.target.value)}
                    />

                <input
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    />

                <input
                    placeholder="Country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    />

                <input
                    type="date"
                    value={birthDate}
                    onChange={e => setBirthDate(e.target.value)}
                    />

                <input
                    placeholder="Nationality"
                    value={nationality}
                    onChange={e => setNationality(e.target.value)}
                    />

                <input
                    placeholder="Height in cm"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    />

                <input
                    placeholder="Shoe Size"
                    value={shoeSize}
                    onChange={e => setShoeSize(e.target.value)}
                    />

                <input
                    placeholder="Eye Color"
                    value={eyeColor}
                    onChange={e => setEyeColor(e.target.value)}
                    />

                <input
                    placeholder="Hair Color"
                    value={hairColor}
                    onChange={e => setHairColor(e.target.value)}
                    />

                <input
                    placeholder="Comments"
                    value={comments}
                    onChange={e => setComments(e.target.value)}
                    />

                
                <button type="submit">Create</button>
            </form>
        </div>
    );
}