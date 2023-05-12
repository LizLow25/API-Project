import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { updateSpotAction } from "../../store/spots";


const UpdateSpotForm = ({spotData}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    //form input slices of state, populate with prop values if defined
    const [country, setCountry] = useState(spotData?.country || "");
    const [address, setAddress] = useState(spotData?.address || "");
    const [city, setCity] = useState(spotData?.city || "");
    const [state, setState] = useState(spotData?.state ||"");
    const [latitude, setLatitude] = useState(spotData?.lat || "");
    const [longitude, setLongitude] = useState(spotData?.lng || "");
    const [description, setDescription] = useState(spotData?.description || "");
    const [name, setName] = useState(spotData?.name || "");
    const [price, setPrice] = useState(spotData?.price || "");



    //error handling slices of state
    const [frontErrors, setFrontErrors] = useState({});



    const handleSubmit = async (e) => {
        e.preventDefault();
        setFrontErrors({});
        let frontE = {}


        const updatedSpot = {
            address,
            city,
            state,
            country,
            lat: latitude,
            lng: longitude,
            name,
            description,
            price
        }

        //front-end error handling
        if (!country.length) frontE.country = "Country is required";
        if (!address.length) frontE.address = "Address is required";
        if (!city.length) frontE.city = "City is required";
        if (!state.length) frontE.state = "State is required";
        if (!latitude.length) frontE.latitude = "Latitude is required";
        if (!longitude.length) frontE.longitude = "Longitude is required";
        if (!name.length) frontE.name = "Name is required";
        if (description.length < 30) frontE.description = "Description needs a minimum of 30 characters";
        if (!price.length) frontE.price = "Price is required";


        setFrontErrors(frontE)

        if (Object.values(frontErrors).length) {
            console.log('outtahere')
            return null
        }

        //update spot

        await dispatch(updateSpotAction(updatedSpot, spotData.id))




        //if the new spot is created, its time to upload the images!



            //now, reset the form
            setCountry("");
            setAddress("");
            setCity("");
            setState("");
            setLatitude("");
            setLongitude("");
            setDescription("");
            setName("");
            setPrice("");


            setFrontErrors({});

            //and navigate to your new spot!
            history.push(`/spots/${spotData.id}`);



    }


    return (
        <div className="inputBox">
            <h1>Update your Spot</h1>
            <h2>Where's your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <form onSubmit={handleSubmit}>
                <div className="errors">{frontErrors.country}</div>
                <label>Country</label>
                <input
                    type="text"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    placeholder="Country"
                    name="country"
                />
                <div className="errors">{frontErrors.address}</div>
                <label>Street Address</label>
                <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    placeholder="Address"
                    name="address"
                />
                <div className="errors">{frontErrors.city}</div>
                <label>City</label>
                <input
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    placeholder="City"
                    name="city"
                />
                <div className="errors">{frontErrors.state}</div>
                <label>State</label>
                <input
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    placeholder="State"
                    name="state"
                />
                <div className="errors">{frontErrors.latitude}</div>
                <label>Latitude</label>
                <input
                    type="text"
                    onChange={(e) => setLatitude(e.target.value)}
                    value={latitude}
                    placeholder="Latitude"
                    name="latitude"
                />
                <div className="errors">{frontErrors.longitude}</div>
                <label>Longitude</label>
                <input
                    type="text"
                    onChange={(e) => setLongitude(e.target.value)}
                    value={longitude}
                    placeholder="Longitude"
                    name="longitude"
                />
                <h2>Describe your place to guests</h2>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="body"
                    placeholder="Please write at least 30 characters"
                    rows="10"
                ></textarea>
                <div className="errors">{frontErrors.description}</div>
                <h2>Create a title for your spot</h2>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Name of your spot"
                    name="name"
                />
                <div className="errors">{frontErrors.name}</div>
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <input
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    placeholder="Price per night (USD)"
                    name="price"
                />
                <div className="errors">{frontErrors.price}</div>

                <button type="submit">Update your Spot</button>
            </form>
        </div>
    );
};




export default UpdateSpotForm;
