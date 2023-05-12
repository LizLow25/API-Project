import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { useEffect } from 'react'
import UpdateSpotForm from '../UpdateSpotForm';
import { loadSpotDetailsAction } from '../../store/spots';


const UpdateSpotFormGateway = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const spotData = useSelector(state => state.spots.singleSpot)
    console.log('spotdata', spotData)

    useEffect(() => {
        dispatch(loadSpotDetailsAction(spotId))
    }, [dispatch, spotId])

  if (spotData.id != spotId) return null


    return (

        <div>
            <UpdateSpotForm
                formType="Update"
                spotData={spotData}
            />
        </div>
    )

}

export default UpdateSpotFormGateway
