import { Cancel, PinDrop, Rocket, Save, Title } from "@mui/icons-material";
import { Button, Divider, Grid, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FC, useCallback, useEffect, useState } from "react";
import fetchGraphQL from "../graphql/GraphQL";
import { Mission } from "../graphql/schema";
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
    mission: Mission | null;

}
const EditMissionForm: FC<Props> = (props): JSX.Element => {
    const { mission } = props;

    const [spaceMissionTitle, setspaceMissionTitle] = useState<InputProps>({
        value: "",
        error: false,
        errorMessage: "",
    });

    const [spaceMissionOperator, setspaceMissionOperator] = useState<InputProps>({
        value: "",
        error: false,
        errorMessage: "",
    });
    const [tempLaunchDate, setTempLaunchDate] = useState<DateInputProps>({
        value: null,
        error: false,
        errorMessage: "",
    });
    const [spaceMissionVehicle, setspaceMissionVehicle] = useState<InputProps>({
        value: "",
        error: false,
        errorMessage: "",
    });
    const [spaceMissionLocationName, setspaceMissionLocationName] = useState<InputProps>({
        value: "",
        error: false,
        errorMessage: "",
    });
    const [spaceMissionLocationLongitude, setspaceMissionLocationLongitude] = useState<LocationCoordinatesProps>({
        longitude: 0,
        error: false,
        errorMessage: "",
    });
    const [spaceMissionLocationLatitude, setspaceMissionLocationLatitude] = useState<LocationCoordinatesProps>({
        latitude: 0,
        error: false,
        errorMessage: "",
    });
    const [spaceMissionOrbitPeriapsis, setspaceMissionOrbitPeriapsis] = useState<OrbitInputProps>({
        periapsis: 0,
        error: false,
        errorMessage: "",
    });
    const [spaceMissionOrbitApoapsis, setspaceMissionOrbitApoapsis] = useState<OrbitInputProps>({
        apoapsis: 0,
        error: false,
        errorMessage: "",
    });
    const [spaceMissionOrbitInclination, setspaceMissionOrbitInclination] = useState<OrbitInputProps>({
        inclination: 0,
        error: false,
        errorMessage: "",
    });
    const [spaceMissionPayloadCapacity, setspaceMissionPayloadCapacity] = useState<PayloadInputProps>({
        capacity: 0,
        error: false,
        errorMessage: "",
    });
    const [spaceMissionPayloadAvailable, setspaceMissionPayloadAvailable] = useState<PayloadInputProps>({
        available: 0,
        error: false,
        errorMessage: "",
    });

    useEffect(() => {
        if (mission && mission.launch && mission.launch.location && mission.orbit && mission.payload) {
            setspaceMissionTitle(spaceMissionTitle => ({ ...spaceMissionTitle, value: mission.title }));
            setspaceMissionOperator(spaceMissionOperator => ({ ...spaceMissionOperator, value: mission.operator }));
            setTempLaunchDate(tempLaunchDate => ({ ...tempLaunchDate, value: new Date(mission.launch?.date) || null }));
            setspaceMissionVehicle(spaceMissionVehicle => ({ ...spaceMissionVehicle, value: mission.launch?.vehicle || "" }));
            setspaceMissionLocationName(spaceMissionLocationName => ({ ...spaceMissionLocationName, value: mission.launch.location.name || "" }));
            setspaceMissionLocationLongitude(spaceMissionLocationLongitude => ({ ...spaceMissionLocationLongitude, longitude: mission.launch.location.longitude || 0 }));
            setspaceMissionLocationLatitude(spaceMissionLocationLatitude => ({ ...spaceMissionLocationLatitude, latitude: mission.launch.location.latitude || 0 }));
            setspaceMissionOrbitPeriapsis(spaceMissionOrbitPeriapsis => ({ ...spaceMissionOrbitPeriapsis, periapsis: mission.orbit.periapsis || 0 }));
            setspaceMissionOrbitApoapsis(spaceMissionOrbitApoapsis => ({ ...spaceMissionOrbitApoapsis, apoapsis: mission.orbit.apoapsis || 0 }));
            setspaceMissionOrbitInclination(spaceMissionOrbitInclination => ({ ...spaceMissionOrbitInclination, inclination: mission.orbit.inclination || 0 }));
            setspaceMissionPayloadCapacity(spaceMissionPayloadCapacity => ({ ...spaceMissionPayloadCapacity, capacity: mission.payload.capacity || 0 }));
            setspaceMissionPayloadAvailable(spaceMissionPayloadAvailable => ({ ...spaceMissionPayloadAvailable, available: mission.payload.available || 0 }));
        }
    }, [mission, setspaceMissionTitle, setspaceMissionOperator, setTempLaunchDate, setspaceMissionVehicle, setspaceMissionLocationName, setspaceMissionLocationLongitude, setspaceMissionLocationLatitude, setspaceMissionOrbitPeriapsis, setspaceMissionOrbitApoapsis, setspaceMissionOrbitInclination, setspaceMissionPayloadCapacity, setspaceMissionPayloadAvailable]);

    //handle new mission title change
    const handleSpaceMissionTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setspaceMissionTitle({ value, error: false, errorMessage: "" });
    };

    //handle new mission operator change
    const handleSpaceMissionOperatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setspaceMissionOperator({ value, error: false, errorMessage: "" });
    };

    const handleTempLaunchDateChange = (newValue: Date | null) => {
        setTempLaunchDate({ value: newValue, error: false, errorMessage: "" });
    };

    //handle new mission vehicle change
    const handleSpaceMissionVehicleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setspaceMissionVehicle({ value, error: false, errorMessage: "" });
    };

    //handle new mission location change
    const handleSpaceMissionLocationNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setspaceMissionLocationName({ value, error: false, errorMessage: "" });
    };

    //handle new mission location latitude change
    const handleSpaceMissionLocationLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setspaceMissionLocationLatitude({ latitude: value, error: false, errorMessage: "" });
    };

    //handle new mission location longitude change
    const handleSpaceMissionLocationLongitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setspaceMissionLocationLongitude({ longitude: value, error: false, errorMessage: "" });
    };

    //handle new mission orbit periapsis change
    const handleSpaceMissionOrbitPeriapsisChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;
        setspaceMissionOrbitPeriapsis({ periapsis: value, error: false, errorMessage: "" });
    };

    //handle new mission orbit apoapsis change
    const handleSpaceMissionOrbitApoapsisChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;
        setspaceMissionOrbitApoapsis({ apoapsis: value, error: false, errorMessage: "" });
    };

    //handle new mission orbit inclination change
    const handleSpaceMissionOrbitInclinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;
        setspaceMissionOrbitInclination({ inclination: value, error: false, errorMessage: "" });
    };

    //handle new mission payload capacity change
    const handleSpaceMissionPayloadCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;
        setspaceMissionPayloadCapacity({ capacity: value, error: false, errorMessage: "" });
    };

    //handle new mission payload available change
    const handleSpaceMissionPayloadAvailableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;
        // must be less than or equal to capacity
        if (value > (spaceMissionPayloadCapacity.capacity ?? 0)) {
            setspaceMissionPayloadAvailable({ available: spaceMissionPayloadCapacity.capacity, error: true, errorMessage: "Available payload must be less than or equal to capacity" });
        } else {
            setspaceMissionPayloadAvailable({ available: value, error: false, errorMessage: "" });
        }
    };

    // handle save edited mission
    const handleSaveSpaceMission = useCallback(
        async () => {
            if (spaceMissionTitle.value === "") {
                setspaceMissionTitle({
                    ...spaceMissionTitle,
                    error: true,
                    errorMessage: "Mission title is required",
                });
            }
            if (spaceMissionOperator.value === "") {
                setspaceMissionOperator({
                    ...spaceMissionOperator,
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
            if (spaceMissionVehicle.value === "") {
                setspaceMissionVehicle({
                    ...spaceMissionVehicle,
                    error: true,
                    errorMessage: "Mission vehicle is required",
                });
            }
            if (spaceMissionLocationName.value === "") {
                setspaceMissionLocationName({
                    ...spaceMissionLocationName,
                    error: true,
                    errorMessage: "Mission location is required",
                });
            }
            if (spaceMissionLocationLongitude.longitude === null) {
                setspaceMissionLocationLongitude({
                    ...spaceMissionLocationLongitude,
                    error: true,
                    errorMessage: "Mission location longitude is required",
                });
            }
            if (spaceMissionLocationLatitude.latitude === null) {
                setspaceMissionLocationLatitude({
                    ...spaceMissionLocationLatitude,
                    error: true,
                    errorMessage: "Mission location latitude is required",
                });
            }
            if (spaceMissionOrbitPeriapsis.periapsis === null) {
                setspaceMissionOrbitPeriapsis({
                    ...spaceMissionOrbitPeriapsis,
                    error: true,
                    errorMessage: "Mission orbit periapsis is required",
                });
            }
            if (spaceMissionOrbitApoapsis.apoapsis === null) {
                setspaceMissionOrbitApoapsis({
                    ...spaceMissionOrbitApoapsis,
                    error: true,
                    errorMessage: "Mission orbit apoapsis is required",
                });
            }
            if (spaceMissionOrbitInclination.inclination === null) {
                setspaceMissionOrbitInclination({
                    ...spaceMissionOrbitInclination,
                    error: true,
                    errorMessage: "Mission orbit inclination is required",
                });
            }
            if (spaceMissionPayloadCapacity.capacity === null) {
                setspaceMissionPayloadCapacity({
                    ...spaceMissionPayloadCapacity,
                    error: true,
                    errorMessage: "Mission payload capacity is required",
                });
            }
            if (spaceMissionPayloadAvailable.available === null) {
                setspaceMissionPayloadAvailable({
                    ...spaceMissionPayloadAvailable,
                    error: true,
                    errorMessage: "Mission payload available is required",
                });
            }
            if (
                spaceMissionTitle.value === "" ||
                spaceMissionVehicle.value === "" ||
                spaceMissionOperator.value === "" ||
                tempLaunchDate?.value === null ||
                spaceMissionLocationName.value === "" ||
                spaceMissionLocationLongitude.longitude === null ||
                spaceMissionLocationLatitude.latitude === null ||
                spaceMissionOrbitPeriapsis.periapsis === null ||
                spaceMissionOrbitApoapsis.apoapsis === null ||
                spaceMissionOrbitInclination.inclination === null ||
                spaceMissionPayloadCapacity.capacity === null ||
                spaceMissionPayloadAvailable.available === null
            ) {
                return;
            }
            //save new mission
            const response = await fetchGraphQL(
                `
            mutation {
              updateMission(
                  id: "${mission?.id}",
                  mission: {
                    title: "${spaceMissionTitle.value}"
                    operator: "${spaceMissionOperator.value}"
                    launch: {
                        date: "${tempLaunchDate?.value?.toISOString()}"
                        vehicle: "${spaceMissionVehicle.value}"
                        location: {
                            latitude: ${spaceMissionLocationLatitude.latitude}
                            longitude: ${spaceMissionLocationLongitude.longitude}
                            name: "${spaceMissionLocationName.value}"
                        }
                    }
                    orbit: {
                        apoapsis: ${spaceMissionOrbitApoapsis.apoapsis}
                        periapsis: ${spaceMissionOrbitPeriapsis.periapsis}
                        inclination: ${spaceMissionOrbitInclination.inclination}
                    }
                    payload: {
                        capacity: ${spaceMissionPayloadCapacity.capacity}
                        available: ${spaceMissionPayloadAvailable.available}
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
            setspaceMissionTitle({ value: "", error: false, errorMessage: "" });
            setspaceMissionOperator({ value: "", error: false, errorMessage: "" });
            setTempLaunchDate({ value: null, error: false, errorMessage: "" });
            props.callback();
        }, [props, mission?.id, spaceMissionTitle, spaceMissionOperator, tempLaunchDate, spaceMissionVehicle, spaceMissionLocationName, spaceMissionLocationLongitude, spaceMissionLocationLatitude, spaceMissionOrbitPeriapsis, spaceMissionOrbitApoapsis, spaceMissionOrbitInclination, spaceMissionPayloadCapacity, spaceMissionPayloadAvailable]
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
                    error={spaceMissionTitle.error}
                    helperText={spaceMissionTitle.errorMessage}
                    fullWidth
                    InputProps={{
                        endAdornment: <Title color="action" />
                    }}
                    value={spaceMissionTitle.value}
                    onChange={handleSpaceMissionTitleChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    autoFocus
                    id="operator"
                    name="operator"
                    label="Operator"
                    variant="standard"
                    error={spaceMissionOperator.error}
                    helperText={spaceMissionOperator.errorMessage}
                    fullWidth
                    value={spaceMissionOperator.value}
                    onChange={handleSpaceMissionOperatorChange}
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
                    value={spaceMissionVehicle.value}
                    error={spaceMissionVehicle.error}
                    helperText={spaceMissionVehicle.errorMessage}
                    onChange={handleSpaceMissionVehicleChange}
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
                    value={spaceMissionLocationName.value}
                    error={spaceMissionLocationName.error}
                    helperText={spaceMissionLocationName.errorMessage}
                    onChange={handleSpaceMissionLocationNameChange}
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
                        value={spaceMissionLocationLongitude.longitude}
                        error={spaceMissionLocationLongitude.error}
                        helperText={spaceMissionLocationLongitude.errorMessage}
                        onChange={handleSpaceMissionLocationLongitudeChange}
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
                        value={spaceMissionLocationLatitude.latitude}
                        error={spaceMissionLocationLatitude.error}
                        helperText={spaceMissionLocationLatitude.errorMessage}
                        onChange={handleSpaceMissionLocationLatitudeChange}
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
                    value={spaceMissionOrbitApoapsis.apoapsis}
                    error={spaceMissionOrbitApoapsis.error}
                    helperText={spaceMissionOrbitApoapsis.errorMessage}
                    onChange={handleSpaceMissionOrbitApoapsisChange}
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
                    value={spaceMissionOrbitPeriapsis.periapsis}
                    error={spaceMissionOrbitPeriapsis.error}
                    helperText={spaceMissionOrbitPeriapsis.errorMessage}
                    onChange={handleSpaceMissionOrbitPeriapsisChange}
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
                    value={spaceMissionOrbitInclination.inclination}
                    error={spaceMissionOrbitInclination.error}
                    helperText={spaceMissionOrbitInclination.errorMessage}
                    onChange={handleSpaceMissionOrbitInclinationChange}
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
                    value={spaceMissionPayloadCapacity.capacity}
                    error={spaceMissionPayloadCapacity.error}
                    helperText={spaceMissionPayloadCapacity.errorMessage}
                    onChange={handleSpaceMissionPayloadCapacityChange}
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
                    value={spaceMissionPayloadAvailable.available}
                    error={spaceMissionPayloadAvailable.error}
                    helperText={spaceMissionPayloadAvailable.errorMessage}
                    onChange={handleSpaceMissionPayloadAvailableChange}
                />
            </Grid>
        </Grid>
    </>;
    const action = <>
        <Button startIcon={<Cancel />} variant="outlined" onClick={props.onClose}>Cancel</Button>
        <Button startIcon={<Save />} color="success" variant="outlined"  onClick={handleSaveSpaceMission}>Save</Button>
    </>;
    return <CustomDialog
        title="Update Mission"
        open={props.open}
        onClose={props.onClose}
        content={content}
        action={action}
    />

};

export default EditMissionForm;