import { TextField } from '@mui/material';
import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import { NavOption } from '../Nav';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();

  return (
    <div className={classes.root}>
      {loading && <div>Loading...</div>}
      {!loading && <ShowList list={pokemons} />}
    </div>
  );
};


const ShowList = (props: any) => {
  const classes = useStyles();
  let [pokemonsList, setPokemonsList] = useState(props.list);
  const filterData = (filterText: string) => {
    const list = props.list?.filter((item: Pokemon) => item.name?.toLowerCase()?.includes(filterText?.toLowerCase()));
    setPokemonsList(list);
    if (!filterText) {
      setPokemonsList(props.list);
    }
  }

  return (
    <>
      <div className={classes.searchBoxWrapper}>
        <TextField fullWidth label="Search Pokemon by Name" id="fullWidth"
          InputLabelProps={{ className: classes.searchBox }} inputProps={{ className: classes.searchBox }} onChange={event => filterData(event.target.value)} />
      </div>
      <table className={classes.width100}>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Number</th>
            <th>Name</th>
            <th>Types</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {pokemonsList.map((pkmn: Pokemon) => (
            <tr key={pkmn.id} className={classes.tableRow}>
              <td><img src={pkmn.image} className={classes.img} /></td>
              <td>{pkmn.number}</td>
              <td>{pkmn.name}</td>
              <td>{pkmn.types?.join(', ')}</td>
              <td className={classes.viewMoreWrapper}>
                <NavOption to={'/pokemon/' + pkmn.id} icon="open_in_new" name="View More">
                  View More
                </NavOption>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </>
  )
}

export const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },

    img: {
      width: '50px',
      paddingTop: '12px',
      paddingBottom: '12px',
    },

    width100: {
      width: '100%'
    },

    tableRow: {
      '&:hover': {
        filter: 'brightness(110%)',
        backgroundColor: '#7C89A3'
      },
    },

    searchBox: {
      color: 'rgba(255,255,255,.92) !important',
    },

    blackFontColor: {
      color: 'rgba(0, 0, 0, 0.6) !important',
      '& p': {
        color: 'rgba(0, 0, 0, 0.6) !important'
      }

    },

    searchBoxWrapper: {
      margin: '10px'
    },

    viewMoreWrapper: {
      width: '10rem'
    },

    headerImg: {
      width: '140px !important'
    },

    textJustify: {
      textAlign: 'justify',
    }
  },
  { name: 'PokemonList' }
);
