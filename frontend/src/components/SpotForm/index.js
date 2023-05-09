import { useState } from "react";
import { useDispatch } from "react-redux";

const SpotForm = () => {
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();


    }




    return (
        <div className="inputBox">
            <h1>Create a New Spot</h1>
            <h2>Where's your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <form onSubmit={handleSubmit}>
                <label>Country</label>
                <input
                    type="text"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    placeholder="Country"
                    name="country"
                />
                <label>Street Address</label>
                <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    placeholder="Address"
                    name="address"
                />
                <label>City</label>
                <input
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    placeholder="City"
                    name="city"
                />
                <label>State</label>
                <input
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    placeholder="State"
                    name="state"
                />
                <label>Latitude</label>
                <input
                    type="text"
                    onChange={(e) => setLatitude(e.target.value)}
                    value={latitude}
                    placeholder="Latitude"
                    name="latitude"
                />
                <label>Longitude</label>
                <input
                    type="text"
                    onChange={(e) => setLongitude(e.target.value)}
                    value={longitude}
                    placeholder="Longitude"
                    name="longitude"
                />
                <h2>Describe your place to guests</h2>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="body"
                    placeholder="Please write at least 30 characters"
                    rows="10"
                ></textarea>
                <h2>Create a title for your spot</h2>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Name of your spot"
                    name="name"
                />
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <input
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    placeholder="Price per night (USD)"
                    name="price"
                />
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Preview Image URL"
                    name="name"
                />
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Image URL"
                    name="name"
                />
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Image URL"
                    name="name"
                />
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Image URL"
                    name="name"
                />
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Image URL"
                    name="name"
                />
                <button type="submit">Create Spot</button>
            </form>
        </div>
    );
};




export default SpotForm;
