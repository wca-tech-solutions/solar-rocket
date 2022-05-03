import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { AppLayout } from "../layouts/AppLayout";
import fetchGraphQL from "../graphql/GraphQL";
import { Mission } from "../graphql/schema";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Grid,
  Typography,
  Fab,
  Toolbar,
  Container,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";

import {
  Add as AddIcon,
  FilterAlt as FilterAltIcon,
  Sort as SortIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Delete,
  Edit,
  RocketLaunch,
} from "@mui/icons-material";

import { ListMenu } from "../components/ListMenu";
import { SortField } from "../graphql/Type";
import { MissionsResponse } from "../interface/Mission";
import NewMissionForm from "../components/NewMissionForm";
import EditMissionForm from "../components/EditMissionForm";

const getMissions = async (
  sortField: SortField,
  sortDesc?: Boolean
): Promise<MissionsResponse> => {
  return await fetchGraphQL(
    `
  {
    Missions(
      sort: {
        field: ${sortField}
        desc: ${sortDesc}
      }
    ) {
      id
      title
      operator
      launch {
        date
        vehicle
        location {
          name
          latitude
          longitude
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
  `,
    []
  );
};

const Missions = (): JSX.Element => {
  const [missions, setMissions] = useState<Mission[] | null>(null);
  const [newMissionOpen, setNewMissionOpen] = useState(false);
  const [editMissionOpen, setEditMissionOpen] = useState(false);
  const [missionToEdit, setMissionToEdit] = useState<Mission | null>(null);

  const [sortDesc, setSortDesc] = useState<boolean>(true);
  const [sortField, setSortField] = useState<SortField>("Title");
  const [errMessage, setErrMessage] = useState<String | null>(null);

  // update missions when crud operations are done
  const [updateMissionCounter, setUpdateMissionCounter] = useState<number>(0);

  // handle mission update counter
  const handleUpdateMissionCounter = useCallback(() => {
    setUpdateMissionCounter(updateMissionCounter => updateMissionCounter + 1);
  }, []);

  const handleSaveCallbacks = useCallback(() => {
    handleNewMissionClose();
    handleUpdateMissionCounter();
  }, [handleUpdateMissionCounter]);

  const handleEditMissionCallbacks = useCallback(() => {
    handleEditMissionClose();
    handleUpdateMissionCounter();
  }, [handleUpdateMissionCounter]);


  const handleErrClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setErrMessage(null);
  };

  const handleNewMissionOpen = () => {
    // setTempLaunchDate({ value: null, error: false, errorMessage: "" });
    setNewMissionOpen(true);
  };

  const handleNewMissionClose = () => {
    setNewMissionOpen(false);
  };

  const handleEditMissionOpen = (mission: Mission) => {
    setMissionToEdit(mission);
    setEditMissionOpen(true);
  };

  const handleEditMissionClose = () => {
    setEditMissionOpen(false);
  };

  // handle delete mission
  const handleDeleteMission = useCallback(async (mission: Mission) => {
    const response = await fetchGraphQL(
      `
      mutation {
        deleteMission(id: "${mission.id}"){
          id
        }
      }
    `
      , []);
    if (response.data.deleteMission === null) {
      setErrMessage("Failed to delete mission");
      return;
    }
    setErrMessage("Mission deleted");
    handleUpdateMissionCounter();
  }, [handleUpdateMissionCounter])


  const handleSortFieldChange = (event: SyntheticEvent, value: SortField) => {
    setSortField(value);
  };
  const handleSortDescClick = () => {
    setSortDesc(!sortDesc);
  };

  useEffect(() => {
    getMissions(sortField, sortDesc)
      .then((result: MissionsResponse) => {
        setMissions(result.data.Missions);
      })
      .catch((err) => {
        setErrMessage("Failed to load missions.");
      });
  }, [sortField, sortDesc, updateMissionCounter]);

  return (
    <AppLayout title="Missions">
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1">
          Solar Rocket Missions
        </Typography>

        <Toolbar disableGutters>
          <Grid justifyContent="flex-end" container>
            <IconButton>
              <FilterAltIcon />
            </IconButton>
            <ListMenu
              options={["Date", "Title", "Operator"]}
              endIcon={<SortIcon />}
              onSelectionChange={handleSortFieldChange}
            />
            <IconButton onClick={handleSortDescClick}>
              {sortDesc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
            </IconButton>
          </Grid>
        </Toolbar>

        {missions ? (
          <Grid container spacing={2}>
            {" "}
            {missions.map((mission: Mission, key: number) => (
              <Grid item key={key}>
                <Card sx={{ minWidth: 300, minHeight: 200 }}>
                  <CardHeader
                    title={
                      <Typography
                        variant="h5"
                      ><RocketLaunch color="primary" sx={{marginRight:1}}></RocketLaunch>{mission.title}</Typography>
                    }
                    subheader={new Date(mission.launch.date).toDateString()}
                  />
                  <CardContent>
                    <Typography noWrap>Operator: {mission.operator}</Typography>
                    <Typography noWrap>Vehicle: {mission.launch.vehicle}</Typography>

                    <Typography variant="caption" noWrap>Payload: {`${mission.payload.available}/${mission.payload.capacity}`}</Typography>

                  </CardContent>
                  <CardActions>
                    <Button
                      startIcon={<Edit />}
                      onClick={() => handleEditMissionOpen(mission)}>Edit</Button>
                    <Button
                      startIcon={<Delete />}
                      color={"warning"} onClick={() => handleDeleteMission(mission)}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        )}

        <Tooltip title="New Mission">
          <Fab
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            color="primary"
            aria-label="add"
            onClick={handleNewMissionOpen}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <NewMissionForm
          open={newMissionOpen}
          onClose={handleNewMissionClose}
          callback={handleSaveCallbacks}
        />
        <EditMissionForm
          open={editMissionOpen}
          onClose={handleEditMissionClose}
          callback={handleEditMissionCallbacks}
          mission={missionToEdit}
        />
      </Container>
      <Snackbar
        open={errMessage != null}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleErrClose}
      >
        <Alert onClose={handleErrClose} variant="filled" severity="error">
          {errMessage}
        </Alert>
      </Snackbar>
    </AppLayout>
  );
};

export { Missions };


