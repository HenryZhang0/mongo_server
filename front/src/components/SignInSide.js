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

const backend_path = "https://flick-picker.herokuapp.com"
//const backend_path = "http://localhost:4000";

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


  function Reset(actor) {
    getMovieAnswers(actor);
  }



  function capitalizeLetter (words) {
    // console.log("232");
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }

  function fetchActor(name) {
    //name = 'Alec Baldwin';
    let sname = name;
    name = name.replace(/ /g, '_');
    fetch(`${backend_path}/actor/${name}`)
      .then(
        (res) => res.json()
      )
      .then((data) => {
        if (data.status != 0) {
          window.alert("Actor not found, please respell");
          return;
        }
        data = data.actors.filter(person => person.name == sname);
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
    Reset(new_actor);
    return new_actor;

  }

  function SetActor() {
    let new_actor = capitalizeLetter(document.querySelector('#email').value);
    //console.log(capitalizeLetter(new_actor));
    SET_MAIN_ACTOR(new_actor);
    fetchActor(new_actor)
    Reset(new_actor);
    return new_actor;

  }

  const [movie_answers, set_movie_answers] = useState([]);
  function getMovieAnswers(actor) {
    let name = actor;
    fetch(`${backend_path}/actormovies/${name}`)
      .then(
        (res) => res.json()
      )
      .then((data) => {
        set_movie_answers(data)
        //console.log(data);
      }
      );
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
    // console.log("test input", input);
    let data = fetch(`${backend_path}/search?term=${input}`).then(results => results.json());
    console.log(movie_answers)
    if (input.length < 3) {
      return;
    }

    fetch(`${backend_path}/search?term=${input}`)
      .then(
        (res) => res.json()
      )
      .then((data) => {
        console.log(input, data);
        set_movie_options(
          <List component="nav" aria-label="main mailbox folders">
            {data.map((result, index) => {

              return (
                <ListItemButton
                  selected={selectedMovie === result}
                  onClick={(event) => handleListItemClick(event, result)}
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


  const current_score = React.useState(0);
  const [selectedMovie, setSelectedMovie] = React.useState(1);

  const handleListItemClick = (event, index) => { 
    handleAddMovie(index);
    movieInput.current.value = "";
    //console.log(index);
  };

  const [movie_options, set_movie_options] = useState(
    <List component="nav" aria-label="main mailbox folders"></List>
  );

  function clear_suggestions() {
    set_movie_options(
      <List component="nav" aria-label="main mailbox folders"></List>
    )
  }

  const [chosen_movies, set_chosen_movies] = useState([]);
  const [chosen_movies_div, set_chosen_movies_div] = useState(
    <List component="nav" aria-label="main mailbox folders">
    </List>
  )

  const movieInput = React.useRef(null);

  const handleAddMovie = (new_movie) => {
    set_chosen_movies(
      chosen_movies => [...chosen_movies, new_movie]
    );
    let the_movies = [...chosen_movies, new_movie];
      console.log(the_movies);
    set_chosen_movies_div(
      <List component="nav" aria-label="main mailbox folders">
          {the_movies.map((result, index) => {
            return (
              <ListItemButton
                selected={selectedMovie === result}
                onClick={(event) => handleListItemClick(event, result)}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={result.title} />
              </ListItemButton>

            )
          })}
        </List>
    );
    clear_suggestions();
  }
  
  function calculate_score() {
    // chosen_movies.map(movie => {
    //   console.log(movie);
    // })
    console.log(movie_answers);
    console.log(chosen_movies);
    chosen_movies.forEach((m) => {
      console.log(m.id);  
      if(movie_answers.includes(parseInt(m.id))) {
        console.log("pog1");
      }
    })
  }

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
                autoComplete="off"
                autoFocus
              />

               <Button
                type="submit"
                onClick={SetActor}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Set Actor
              </Button>

              <Button
                type="submit"
                onClick={RandomActor}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Random Actor
              </Button>

              <Button
                type="submit"
                onClick={calculate_score}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit Movies
              </Button>
              
              <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <div><b>Corrrect Movies</b></div>
                {chosen_movies_div}
              </Box>


              <TextField
                margin="normal"
                fullWidth
                name="movie_input"
                label="Movie"
                autoComplete="off"
                id="movie_input"
                inputRef = {movieInput}
                onChange={handleMovie}
              />

              <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {movie_options}
              </Box>


     


              
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}