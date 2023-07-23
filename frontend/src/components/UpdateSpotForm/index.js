import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { updateSpotAction } from "../../store/spots";


const UpdateSpotForm = ({ spotData }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    //form input slices of state, populate with prop values if defined
    const [country, setCountry] = useState(spotData?.country || "");
    const [address, setAddress] = useState(spotData?.address || "");
    const [city, setCity] = useState(spotData?.city || "");
    const [state, setState] = useState(spotData?.state || "");
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
        if (price < 1) frontE.price = "Please enter a valid price!";

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
            <div className="formcontainer">
                <h1 className="formtitlenew">Update your Spot</h1>
                <h2 className="formtitlenew">Where's your place located?</h2>
                <p className="formtitlenew">Guests will only get your exact address once they booked a reservation.</p>
                <form onSubmit={handleSubmit}>
                    <div className="formpartone">
                        <div className="countrytop">
                            <label>Country</label>
                            <div className="errors">{frontErrors.country}</div>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            placeholder="Country"
                            name="country"
                            className="inputformbox"

                        />
                        <div className="addresstop">
                            <label>Street Address</label>
                            <div className="errors">{frontErrors.address}</div>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            placeholder="Address"
                            name="address"
                            className="inputformbox"
                        />
                        <div className="citystate">
                            <div className="city">
                                <div className="citytop">
                                    <label>City</label>
                                    <div className="errors">{frontErrors.city}</div>
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                    placeholder="City"
                                    name="city"
                                    className="shortinput"
                                />
                            </div>
                            <p className="comma"> , </p>
                            <div className='state'>
                                <div className="statetop">
                                    <label>State</label>
                                    <div className="errors">{frontErrors.state}</div>
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => setState(e.target.value)}
                                    value={state}
                                    placeholder="State"
                                    name="state"
                                    className="shortinput"
                                />
                            </div>
                        </div>
                        <div className="latlong">
                            <div className="lat">
                                <div className="lattop">
                                    <label>Latitude</label>
                                    <div className="errors">{frontErrors.latitude}</div>
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => setLatitude(e.target.value)}
                                    value={latitude}
                                    placeholder="Latitude"
                                    name="latitude"
                                    className="shortinput"
                                />
                            </div>
                            <p className="comma"> , </p>
                            <div className="long">
                                <div className="longtop">
                                    <label>Longitude</label>
                                    <div className="errors">{frontErrors.longitude}</div>
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => setLongitude(e.target.value)}
                                    value={longitude}
                                    placeholder="Longitude"
                                    name="longitude"
                                    className="shortinput"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="formparttwo">
                        <h2>Describe your place to guests</h2>
                        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            name="body"
                            placeholder="Please write at least 30 characters"
                            rows="10"
                            className="inputformbox"
                        ></textarea>
                        <div className="errors">{frontErrors.description}</div>
                    </div>
                    <div className="formpartthree">
                        <h2>Create a title for your spot</h2>
                        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Name of your spot"
                            name="name"
                            className="inputformbox"
                        />
                        <div className="errors">{frontErrors.name}</div>
                    </div>
                    <div className="formpartfour">
                        <h2>Set a base price for your spot</h2>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                        <div className="priceinput">
                            <p> $ </p>
                            <input
                                type="number"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                placeholder="Price per night (USD)"
                                name="price"
                                className="inputformbox"
                            />
                        </div>
                        <div className="errors">{frontErrors.price}</div>
                    </div>
                    <div className="formpartsix">

                        <button
                            className="createspotbuttonform"
                            type="submit">Update your Spot</button>
                    </div>
                </form>
            </div>
        </div>
    );
};




export default UpdateSpotForm;
