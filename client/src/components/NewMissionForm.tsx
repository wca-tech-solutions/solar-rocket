import { Cancel, PinDrop, Rocket, Save, Title, } from "@mui/icons-material";
import { Button, Divider, Grid, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FC, useCallback, useState } from "react";
import fetchGraphQL from "../graphql/GraphQL";
import CustomDialog from "./CustomDialog";

interface InputProps {
    value: String,
    error: boolean,
    errorMessage: String;
}
interface DateInputProps {
    value: Date | null,
    error: boolean,
    errorMessage: String;
}
interface LocationCoordinatesProps {
    longitude?: Number,
    latitude?: Number,
    error: boolean,
    errorMessage: String;
}
interface OrbitInputProps {
    apoapsis?: Number,
    periapsis?: Number,
    inclination?: Number,
    error: boolean,
    errorMessage: String;
}
interface PayloadInputProps {
    capacity?: Number,
    available?: Number,
    error: boolean,
    errorMessage: String;
}
interface Props {
    open: boolean;
    onClose: () => void;
    callback: () => void;
}

const NewMissionForm: FC<Props> = (props): JSX.Element => {

    const [newMissionTitle, setNewMissionTitle] = useState<InputProps>({
        value: "",
        error: false,
        errorMessage: "",
    });
    const [newMissionOperator, setNewMissionOperator] = useState<InputProps>({
        value: "",
        error: false,
        errorMessage: "",
    });
    const [tempLaunchDate, setTempLaunchDate] = useState<DateInputProps>({
        value: null,
        error: false,
        errorMessage: "",
    });
    const [newMissionVehicle, setNewMissionVehicle] = useState<InputProps>({
        value: "",
        error: false,
        errorMessage: "",
    });
    const [newMissionLocationName, setNewMissionLocationName] = useState<InputProps>({
        value: "",
        error: false,
        errorMessage: "",
    });
    const [newMissionLocationLongitude, setNewMissionLocationLongitude] = useState<LocationCoordinatesProps>({
        longitude: 0,
        error: false,
        errorMessage: "",
    });
    const [newMissionLocationLatitude, setNewMissionLocationLatitude] = useState<LocationCoordinatesProps>({
        latitude: 0,
        error: false,
        errorMessage: "",
    });
    const [newMissionOrbitPeriapsis, setNewMissionOrbitPeriapsis] = useState<OrbitInputProps>({
        periapsis: 0,
        error: false,
        errorMessage: "",
    });
    const [newMissionOrbitApoapsis, setNewMissionOrbitApoapsis] = useState<OrbitInputProps>({
        apoapsis: 0,
        error: false,
        errorMessage: "",
    });
    const [newMissionOrbitInclination, setNewMissionOrbitInclination] = useState<OrbitInputProps>({
        inclination: 0,
        error: false,
        errorMessage: "",
    });
    const [newMissionPayloadCapacity, setNewMissionPayloadCapacity] = useState<PayloadInputProps>({
        capacity: 0,
        error: false,
        errorMessage: "",
    });
    const [newMissionPayloadAvailable, setNewMissionPayloadAvailable] = useState<PayloadInputProps>({
        available: 0,
        error: false,
        errorMessage: "",
    });


    //handle new mission title change
    const handleNewMissionTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewMissionTitle({ value, error: false, errorMessage: "" });
    };

    //handle new mission operator change
    const handleNewMissionOperatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewMissionOperator({ value, error: false, errorMessage: "" });
    };

    const handleTempLaunchDateChange = (newValue: Date | null) => {
        setTempLaunchDate({ value: newValue, error: false, errorMessage: "" });
    };

    //handle new mission vehicle change
    const handleNewMissionVehicleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewMissionVehicle({ value, error: false, errorMessage: "" });
    };

    //handle new mission location change
    const handleNewMissionLocationNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewMissionLocationName({ value, error: false, errorMessage: "" });
    };

    //handle new mission location latitude change
    const handleNewMissionLocationLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setNewMissionLocationLatitude({ latitude: value, error: false, errorMessage: "" });
    };

    //handle new mission location longitude change
    const handleNewMissionLocationLongitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setNewMissionLocationLongitude({ longitude: value, error: false, errorMessage: "" });
    };

    //handle new mission orbit periapsis change
    const handleNewMissionOrbitPeriapsisChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;
        setNewMissionOrbitPeriapsis({ periapsis: value, error: false, errorMessage: "" });
    };

    //handle new mission orbit apoapsis change
    const handleNewMissionOrbitApoapsisChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;
        setNewMissionOrbitApoapsis({ apoapsis: value, error: false, errorMessage: "" });
    };

    //handle new mission orbit inclination change
    const handleNewMissionOrbitInclinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;
        setNewMissionOrbitInclination({ inclination: value, error: false, errorMessage: "" });
    };

    //handle new mission payload capacity change
    const handleNewMissionPayloadCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;
        setNewMissionPayloadCapacity({ capacity: value, error: false, errorMessage: "" });
    };

    //handle new mission payload available change
    const handleNewMissionPayloadAvailableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;
        // must be less than or equal to capacity
        if (value > (newMissionPayloadCapacity.capacity ?? 0)) {
            setNewMissionPayloadAvailable({ available: newMissionPayloadCapacity.capacity, error: true, errorMessage: "Available payload must be less than or equal to capacity" });
        } else {
            setNewMissionPayloadAvailable({ available: value, error: false, errorMessage: "" });
        }
    };

    // handle save new mission
    const handleSaveNewMission = useCallback(
        async () => {
            if (newMissionTitle.value === "") {
                setNewMissionTitle({
                    ...newMissionTitle,
                    error: true,
                    errorMessage: "Mission title is required",
                });
            }
            if (newMissionOperator.value === "") {
                setNewMissionOperator({
                    ...newMissionOperator,
                    error: true,
                    errorMessage: "Mission operator is required",
                });
            }
            if (tempLaunchDate?.value === null) {
                setTempLaunchDate({
                    ...tempLaunchDate,
                    error: true,
                    errorMessage: "Mission launch date is required",
                });
            }
            if (newMissionVehicle.value === "") {
                setNewMissionVehicle({
                    ...newMissionVehicle,
                    error: true,
                    errorMessage: "Mission vehicle is required",
                });
            }
            if (newMissionLocationName.value === "") {
                setNewMissionLocationName({
                    ...newMissionLocationName,
                    error: true,
                    errorMessage: "Mission location is required",
                });
            }
            if (newMissionLocationLongitude.longitude === null) {
                setNewMissionLocationLongitude({
                    ...newMissionLocationLongitude,
                    error: true,
                    errorMessage: "Mission location longitude is required",
                });
            }
            if (newMissionLocationLatitude.latitude === null) {
                setNewMissionLocationLatitude({
                    ...newMissionLocationLatitude,
                    error: true,
                    errorMessage: "Mission location latitude is required",
                });
            }
            if (newMissionOrbitPeriapsis.periapsis === null) {
                setNewMissionOrbitPeriapsis({
                    ...newMissionOrbitPeriapsis,
                    error: true,
                    errorMessage: "Mission orbit periapsis is required",
                });
            }
            if (newMissionOrbitApoapsis.apoapsis === null) {
                setNewMissionOrbitApoapsis({
                    ...newMissionOrbitApoapsis,
                    error: true,
                    errorMessage: "Mission orbit apoapsis is required",
                });
            }
            if (newMissionOrbitInclination.inclination === null) {
                setNewMissionOrbitInclination({
                    ...newMissionOrbitInclination,
                    error: true,
                    errorMessage: "Mission orbit inclination is required",
                });
            }
            if (newMissionPayloadCapacity.capacity === null) {
                setNewMissionPayloadCapacity({
                    ...newMissionPayloadCapacity,
                    error: true,
                    errorMessage: "Mission payload capacity is required",
                });
            }
            if (newMissionPayloadAvailable.available === null) {
                setNewMissionPayloadAvailable({
                    ...newMissionPayloadAvailable,
                    error: true,
                    errorMessage: "Mission payload available is required",
                });
            }
            if (
                newMissionTitle.value === "" ||
                newMissionVehicle.value === "" ||
                newMissionOperator.value === "" ||
                tempLaunchDate?.value === null ||
                newMissionLocationName.value === "" ||
                newMissionLocationLongitude.longitude === null ||
                newMissionLocationLatitude.latitude === null ||
                newMissionOrbitPeriapsis.periapsis === null ||
                newMissionOrbitApoapsis.apoapsis === null ||
                newMissionOrbitInclination.inclination === null ||
                newMissionPayloadCapacity.capacity === null ||
                newMissionPayloadAvailable.available === null
            ) {
                return;
            }
            //save new mission
            const response = await fetchGraphQL(
                `
            mutation {
              createMission(mission: {
                title: "${newMissionTitle.value}"
                operator: "${newMissionOperator.value}"
                launch: {
                  date: "${tempLaunchDate?.value?.toISOString()}"
                  vehicle: "${newMissionVehicle.value}"
                  location: {
                    latitude: ${newMissionLocationLatitude.latitude}
                    longitude: ${newMissionLocationLongitude.longitude}
                    name: "${newMissionLocationName.value}"
                  }
                }
                orbit: {
                  apoapsis: ${newMissionOrbitApoapsis.apoapsis}
                  periapsis: ${newMissionOrbitPeriapsis.periapsis}
                  inclination: ${newMissionOrbitInclination.inclination}
                }
                payload: {
                  capacity: ${newMissionPayloadCapacity.capacity}
                  available: ${newMissionPayloadAvailable.available}
                }
              }
              ){
                id
                title
                operator
                launch {
                    date
                    vehicle
                    location {
                        latitude
                        longitude
                        name
                    }
                }
                orbit {
                    apoapsis
                    periapsis
                    inclination
                }
                payload {
                    capacity
                    available
                }
            }
            }
          `
                , []);
            if (response.data.createMission === null) {
                // setErrMessage("Failed to create mission");
                return;
            }
            setNewMissionTitle({ value: "", error: false, errorMessage: "" });
            setNewMissionOperator({ value: "", error: false, errorMessage: "" });
            setTempLaunchDate({ value: null, error: false, errorMessage: "" });
            props.callback();
        }, [props, newMissionTitle, newMissionOperator, tempLaunchDate, newMissionVehicle, newMissionLocationName, newMissionLocationLongitude, newMissionLocationLatitude, newMissionOrbitPeriapsis, newMissionOrbitApoapsis, newMissionOrbitInclination, newMissionPayloadCapacity, newMissionPayloadAvailable]
    )
    const content = <>
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <TextField
                    autoFocus
                    id="title"
                    name="title"
                    label="Title"
                    variant="standard"
                    error={newMissionTitle.error}
                    helperText={newMissionTitle.errorMessage}
                    fullWidth
                    InputProps={{
                        endAdornment: <Title color="action" />
                    }}
                    value={newMissionTitle.value}
                    onChange={handleNewMissionTitleChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    autoFocus
                    id="operator"
                    name="operator"
                    label="Operator"
                    variant="standard"
                    error={newMissionOperator.error}
                    helperText={newMissionOperator.errorMessage}
                    fullWidth
                    value={newMissionOperator.value}
                    onChange={handleNewMissionOperatorChange}
                />
            </Grid>
        </Grid>

        <Divider
            component={Grid}
            // textAlign="right"
            color="gray"
            paddingTop={2}
        >Launch Details</Divider>


        <Grid container direction="column" spacing={1}>
            <Grid item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        minDate={new Date()}
                        minTime={new Date()}
                        label="Launch Date"
                        value={tempLaunchDate?.value}
                        onChange={handleTempLaunchDateChange}
                        renderInput={(params) => (
                            <TextField
                                fullWidth
                                variant="standard"
                                error={tempLaunchDate.error}
                                helperText={tempLaunchDate.errorMessage}
                                FormHelperTextProps={{
                                    error: tempLaunchDate.error,
                                }}
                                {...params}
                            />
                        )}
                    />
                </LocalizationProvider>
            </Grid>

            <Grid item>
                <TextField
                    autoFocus
                    id="vehicle"
                    name="vehicle"
                    label="Vehicle"
                    variant="standard"
                    InputProps={{
                        endAdornment: <Rocket color="action" />
                    }}
                    fullWidth
                    value={newMissionVehicle.value}
                    error={newMissionVehicle.error}
                    helperText={newMissionVehicle.errorMessage}
                    onChange={handleNewMissionVehicleChange}
                />
            </Grid>

            <Grid item>
                <TextField
                    autoFocus
                    id="name"
                    name="name"
                    label="Location Name"
                    variant="standard"
                    fullWidth
                    InputProps={{
                        endAdornment: <PinDrop color="action" />
                    }}
                    value={newMissionLocationName.value}
                    error={newMissionLocationName.error}
                    helperText={newMissionLocationName.errorMessage}
                    onChange={handleNewMissionLocationNameChange}
                />
            </Grid>
            <Grid item container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        autoFocus
                        id="longitude"
                        name="longitude"
                        label="Longitude (location coordinates)"
                        variant="standard"
                        fullWidth
                        type="Number"
                        value={newMissionLocationLongitude.longitude}
                        error={newMissionLocationLongitude.error}
                        helperText={newMissionLocationLongitude.errorMessage}
                        onChange={handleNewMissionLocationLongitudeChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        autoFocus
                        id="latitude"
                        name="latitude"
                        label="Latitude (location coordinates)"
                        variant="standard"
                        fullWidth
                        type="Number"
                        value={newMissionLocationLatitude.latitude}
                        error={newMissionLocationLatitude.error}
                        helperText={newMissionLocationLatitude.errorMessage}
                        onChange={handleNewMissionLocationLatitudeChange}
                    />
                </Grid>
            </Grid>
        </Grid>


        <Divider
            component={Grid}
            // textAlign="right"
            color="gray"
            paddingTop={2}
        >Orbit Details</Divider>

        <Grid container direction="row" spacing={2}>
            <Grid item xs={4}>
                <TextField
                    autoFocus
                    id="apoapsis"
                    name="apoapsis"
                    label="Apoapsis"
                    variant="standard"
                    fullWidth
                    type="Number"
                    value={newMissionOrbitApoapsis.apoapsis}
                    error={newMissionOrbitApoapsis.error}
                    helperText={newMissionOrbitApoapsis.errorMessage}
                    onChange={handleNewMissionOrbitApoapsisChange}
                />
            </Grid>

            <Grid item xs={4}>
                <TextField
                    autoFocus
                    id="periapsis"
                    name="periapsis"
                    label="Periapsis"
                    variant="standard"
                    fullWidth
                    type="Number"
                    value={newMissionOrbitPeriapsis.periapsis}
                    error={newMissionOrbitPeriapsis.error}
                    helperText={newMissionOrbitPeriapsis.errorMessage}
                    onChange={handleNewMissionOrbitPeriapsisChange}
                />
            </Grid>

            <Grid item xs={4}>
                <TextField
                    autoFocus
                    id="inclination"
                    name="inclination"
                    label="Inclination"
                    variant="standard"
                    fullWidth
                    type="Number"
                    value={newMissionOrbitInclination.inclination}
                    error={newMissionOrbitInclination.error}
                    helperText={newMissionOrbitInclination.errorMessage}
                    onChange={handleNewMissionOrbitInclinationChange}
                />
            </Grid>
        </Grid>

        <Divider
            component={Grid}
            // textAlign="right"
            color="gray"
            paddingTop={2}
        >Payload Details</Divider>

        <Grid container direction='row' spacing={2}>
            <Grid item xs={6}>
                <TextField
                    autoFocus
                    id="capacity"
                    name="capacity"
                    label="Capacity"
                    variant="standard"
                    fullWidth
                    type="Number"
                    value={newMissionPayloadCapacity.capacity}
                    error={newMissionPayloadCapacity.error}
                    helperText={newMissionPayloadCapacity.errorMessage}
                    onChange={handleNewMissionPayloadCapacityChange}
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    autoFocus
                    id="available"
                    name="available"
                    label="Available"
                    variant="standard"
                    fullWidth
                    type="Number"
                    value={newMissionPayloadAvailable.available}
                    error={newMissionPayloadAvailable.error}
                    helperText={newMissionPayloadAvailable.errorMessage}
                    onChange={handleNewMissionPayloadAvailableChange}
                />
            </Grid>
        </Grid>
    </>;
    const action = <>
        <Button startIcon={<Cancel />}variant="outlined" onClick={props.onClose}>Cancel</Button>
        <Button startIcon={<Save />} color="success" variant="outlined"  onClick={handleSaveNewMission}>Save</Button>
    </>;
    return <CustomDialog
        title="New Mission"
        open={props.open}
        onClose={props.onClose}
        content={content}
        action={action}
    />

};

export default NewMissionForm;