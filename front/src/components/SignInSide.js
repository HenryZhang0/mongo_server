import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';



// my stuff
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

const actors_list = ["Morgan Freeman", "Brad Pitt", "Leonardo DiCaprio", "Robert De Niro", "Matt Damon", "Michael Caine", "Christian Bale", "Tom Hanks", "Gary Oldman", "Al Pacino", "Bruce Willis", "Edward Norton", "Harrison Ford", "Johnny Depp", "Cillian Murphy", "Ralph Fiennes", "Kevin Spacey", "Samuel L. Jackson", "Tom Hardy", "Jack Nicholson", "Tom Cruise", "Philip Seymour Hoffman", "Robert Duvall", "Ryan Gosling", "Russell Crowe", "Liam Neeson", "Steve Buscemi", "Jake Gyllenhaal", "Joseph Gordon-Levitt", "Mark Ruffalo", "Harvey Keitel", "George Clooney", "Denzel Washington", "Bradley Cooper", "Hugo Weaving", "Woody Harrelson", "Jude Law", "Clint Eastwood", "Joaquin Phoenix", "Casey Affleck", "Tim Robbins", "Ed Harris", "John Carroll Lynch", "Tom Wilkinson", "Ben Kingsley", "Keanu Reeves", "Willem Dafoe", "John Hurt", "John Cazale", "Ben Affleck", "Matthew McConaughey", "Jared Leto", "Laurence Fishburne", "Bill Murray", "Christoph Waltz", "Tim Roth", "Ian Holm", "Heath Ledger", "Orlando Bloom", "Barry Pepper", "Alec Baldwin", "Michael Madsen", "Michael Fassbender", "Ken Watanabe", "Pete Postlethwaite", "Martin Sheen", "Guy Pearce", "Jamie Foxx", "Anthony Hopkins", "Chiwetel Ejiofor", "Alan Rickman", "Geoffrey Rush", "Dustin Hoffman", "Joe Pesci", "Brendan Gleeson", "Mark Wahlberg", "Paul Giamatti", "Ethan Hawke", "John Goodman", "Max von Sydow", "Christopher Lloyd", "Mykelti Williamson", "Marlon Brando", "Adrien Brody", "Paul Dano", "Stellan Skarsgård", "Don Cheadle", "Owen Wilson", "Daniel Brühl", "Daniel Craig", "Benicio Del Toro", "Jeremy Renner", "Stanley Tucci", "Harry Dean Stanton", "Robert Downey Jr.", "Aaron Eckhart", "Richard Harris", "Zach Galifianakis", "Kyle Chandler", "Will Smith"]
//const actors_list = ["Morgan Freeman"]

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://reddit.com">
        HANKRY
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();
  
export default function SignInSide() {
  const [MAIN_ACTOR, SET_MAIN_ACTOR] = useState("striing");
  const [MAIN_ID, SET_MAIN_ID] = useState(0);
  const [MAIN_PICTURE, SET_MAIN_PICTURE] = useState("streeng");

  
  function Reset() {
    
  }

  function fetchActor(name) {
    //name = 'Alec Baldwin';
    let sname= name;
    name = name.replace(/ /g, '_');
    fetch(`http://localhost:3000/actor/${name}`)
    .then(
      (res) => res.json()
    )
    .then((data) => {
      if(data.status != 0) {
        window.alert("yo type it right dawg");
        return;
      }
      data = data.actors.filter(person =>  person.name == sname);
      SET_MAIN_PICTURE(data[0].profile_path);
      SET_MAIN_ID(data[0].id);
      SET_MAIN_ACTOR(data[0].name);

    });

   

  }

  function RandomActor() {
    let new_actor = actors_list[Math.floor(Math.random() * actors_list.length)]
    //let new_actor = "Morgan Freeman";
    SET_MAIN_ACTOR(new_actor)
    console.log("new actor:", new_actor);
   

  }

  function RandomActor() {
    let new_actor = actors_list[Math.floor(Math.random() * actors_list.length)]
    //let new_actor = "Morgan Freeman";
    SET_MAIN_ACTOR(new_actor)
    console.log("new actor:", new_actor);
    fetchActor(new_actor)
    Reset();
    return new_actor;

  } 

  function SetActor() {
    let new_actor = document.querySelector('#email').value;
    SET_MAIN_ACTOR(new_actor);
    console.log(fetchActor(new_actor))
    Reset();
    console.log(new_actor);
    return new_actor;

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

  };

  const queryMovie = () => {
    let input = document.querySelector('#movie_input').value.replace(/ /g, '_');
    console.log("test input", input);
    let data = fetch(`http://localhost:3000/search?term=${input}`).then(results => results.json());
    
    if(input.length < 3) {
      return;
    }
                         
    fetch(`http://localhost:3000/search?term=${input}`)
    .then(
      (res) => res.json()
    )
    .then((data) => {
      console.log(input,data);
      set_movie_options(
        <List component="nav" aria-label="main mailbox folders">
        {data.map(result => {
          return (
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={result.title} />
              </ListItemButton>
              
          ) 
        })}
        </List>
      )

    });
  }

  const handleMovie = (event) => {
    let data = queryMovie();   
    console.log("dat", data);    
  }



  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [movie_options, set_movie_options] = useState(
    <List component="nav" aria-label="main mailbox folders">
                <ListItemButton
                  selected={selectedIndex === 0}
                  onClick={(event) => handleListItemClick(event, 0)}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                </ListItemButton>
                
              </List>
  )

  return (

    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${MAIN_PICTURE})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            
            <Typography component="h1" variant="h5">
              {MAIN_ACTOR}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Custom Actor"
                name="cusact"
                autoComplete=" "
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="movie_input"
                label="Movie"
                id="movie_input"
                onChange = {handleMovie}
              />

        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {movie_options}
              
              
            </Box>
            

              <Button
                type="submit"
                onClick = {SetActor}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Set Actor
              </Button>

              <Button
                type="submit"
                onClick = {RandomActor}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Random Actor
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}