import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { addSpotAction } from "../../store/spots";
import { addSpotImageAction } from "../../store/spots";
import './SpotForm.css'

const SpotForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //form input slices of state
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");


    //url slices of state
    const [previewImage, setPreviewImage] = useState('');
    const [url2, setUrl2] = useState('');
    const [url3, setUrl3] = useState('');
    const [url4, setUrl4] = useState('');
    const [url5, setUrl5] = useState('');

    //error handling slices of state
    // const [errors, setErrors] = useState({});
    const [frontErrors, setFrontErrors] = useState({});



    const handleSubmit = async (e) => {
        e.preventDefault();
        setFrontErrors({});
        let frontE = {}

        //set up array of all the images
        const spotImages = []
        if (url2) spotImages.push(url2)
        if (url3) spotImages.push(url3)
        if (url4) spotImages.push(url4)
        if (url5) spotImages.push(url5)

        const newSpot = {
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
        if (!previewImage) frontE.previewImage = "Preview image is required"
        if (!(previewImage.endsWith('.jpg') || previewImage.endsWith('.png') || previewImage.endsWith('.jpeg')) && previewImage) frontE.previewImage = "Image URL must end in .png, .jpg, or .jpeg"
        if (!(url2.endsWith('.jpg') || url2.endsWith('.png') || url2.endsWith('.jpeg')) && url2) frontE.url2 = "Image URL must end in .png, .jpg, or .jpeg"
        if (!(url3.endsWith('.jpg') || url3.endsWith('.png') || url3.endsWith('.jpeg')) && url3) frontE.url3 = "Image URL must end in .png, .jpg, or .jpeg"
        if (!(url4.endsWith('.jpg') || url4.endsWith('.png') || url4.endsWith('.jpeg')) && url4) frontE.url4 = "Image URL must end in .png, .jpg, or .jpeg"
        if (!(url5.endsWith('.jpg') || url5.endsWith('.png') || url5.endsWith('.jpeg')) && url5) frontE.url5 = "Image URL must end in .png, .jpg, or .jpeg"


        setFrontErrors(frontE)

        if (Object.values(frontErrors).length) {
            console.log('outtahere')
            return null
        }



        let response = await dispatch(addSpotAction(newSpot));

        //pull validation errors from the backend
        //  if (response.errors) {
        //      setErrors(response.errors)
        //  }


        //if the new spot is created, its time to upload the images!

        if (response.id) {

            await dispatch(addSpotImageAction({ url: previewImage, preview: true }, response.id))

            if (spotImages.length) {

                spotImages.forEach(async (image) => {
                    await dispatch(addSpotImageAction({ url: image, preview: false }, response.id))
                })
            }

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

            setPreviewImage('');
            setUrl2('');
            setUrl3('');
            setUrl4('');
            setUrl5('');

            setFrontErrors({});

            //and navigate to your new spot!

            //omg that was so much work! ahh!
        }

         history.push(`/spots/${response.id}`);


    }


    return (
        <div className="inputBox">
            <h1>Create a New Spot</h1>
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
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input
                    type="text"
                    onChange={(e) => setPreviewImage(e.target.value)}
                    value={previewImage}
                    placeholder="Preview Image URL"

                />
                <div className="errors">{frontErrors.previewImage}</div>
                <input
                    type="text"
                    onChange={(e) => setUrl2(e.target.value)}
                    value={url2}
                    placeholder="Image URL"

                />
                <div className="errors">{frontErrors.url2}</div>
                <input
                    type="text"
                    onChange={(e) => setUrl3(e.target.value)}
                    value={url3}
                    placeholder="Image URL"

                />
                <div className="errors">{frontErrors.url3}</div>

                <input
                    type="text"
                    onChange={(e) => setUrl4(e.target.value)}
                    value={url4}
                    placeholder="Image URL"

                />
                <div className="errors">{frontErrors.url4}</div>

                <input
                    type="text"
                    onChange={(e) => setUrl5(e.target.value)}
                    value={url5}
                    placeholder="Image URL"

                />
                <div className="errors">{frontErrors.url5}</div>

                <button type="submit">Create Spot</button>
            </form>
        </div>
    );
};




export default SpotForm;
