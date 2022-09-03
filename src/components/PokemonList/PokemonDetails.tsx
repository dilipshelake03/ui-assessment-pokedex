import {
    Button, Card, CardActionArea, CardContent, CardMedia, Dialog,
    DialogActions, DialogContent,
    DialogTitle, Typography
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPokemonDetails } from "../../hooks/useGetPokemons";
import { useStyles } from "./PokemonList";

export const PokemonDetails = () => {

    const { id = '' } = useParams();
    const { pokemonDetails, loading } = getPokemonDetails(id);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {loading && <div>Loading...</div>}
            {!loading && <OpenDialog pokemonDetails={pokemonDetails} />}
        </div>
    );
}

const OpenDialog = (props: any) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
        navigate('/pokemon');
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className={classes.blackFontColor}>{props.pokemonDetails.name}</DialogTitle>
                <DialogContent>
                    <ShowDetails pokemonDetails={props.pokemonDetails} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const ShowDetails = (props: any) => {
    console.log(props.pokemonDetails);
    let pokemon = props.pokemonDetails;
    const classes = useStyles();
    return (
        <>
            <Card sx={{ width: 500 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        src={pokemon.image}
                        alt="Pokemon"
                        className={[classes.img, classes.headerImg].join(' ')}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className={classes.blackFontColor}>
                            Classification :  {pokemon.classification}
                        </Typography>
                        <Typography variant="body2" component="div" className={classes.blackFontColor}>
                            <p>{pokemon.name} is a {pokemon.types?.join(', ')} type pokemons.</p>
                            <p>His weaknesses are {pokemon.weaknesses?.join(', ')}.</p>
                            <p>He is resistant to {pokemon.resistant?.join(', ')}.</p>
                            <p>His size ranges from {pokemon.height.minimum} to {pokemon.height.maximum}</p>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}