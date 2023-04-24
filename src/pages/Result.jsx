import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

function Result() {
     const params = useParams();
     const [result, setResult] = useState([]);

     const getResult = async(key) => {
          const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=209c251fa9ee4fba92c86ffbd5b425c3&query=${key}`)
          const recipes = await api.json()
          setResult(recipes.results);
     }

     useEffect(() =>  {
          getResult(params.key)
               .catch(err => { console.error(err)});
     }, [params.key]);

     return (
          <Grid>
               {result.map((recipe, id)=> {
                    return (
                         <Card key={id}>
                              <Link to={`/recipe/${recipe.id}`} key={id}>
                                   <img src={recipe.image} alt={recipe.title} />
                                   <h4>{recipe.title}</h4>
                              </Link>
                         </Card>
                    )
               })}
          </Grid>
     )
}

const Grid = styled.div`
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
     grid-gap: 2rem;
`

const Card = styled.div`
     img {
          width: 90%;
          border-radius: 2rem;
     }
     a {
          text-decoration: none;
     }
     h4 {
          text-align: center;
          padding: 1rem;
     }

`
export default Result;