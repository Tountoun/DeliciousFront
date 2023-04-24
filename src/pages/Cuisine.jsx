import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';

function Cuisine() {
     const [cuisines, setCuisines] = useState([]);
     let params = useParams();

     const getCuisine = async(name) => {
          const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=209c251fa9ee4fba92c86ffbd5b425c3&cuisine=${name}`)
          const recipes = await api.json()
          setCuisines(recipes.results);
     }
     useEffect(()=> {
          getCuisine(params.type)
               .catch(err => { console.error(err);})
     }, [params.type])
     return (
          <Grid
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               initial={{ opacity:0 }}
               transition={{ duration: 0.5 }}
          >
               {cuisines.map((item, id) => {
                    return (
                         <Card key={id}>
                              <Link to={`/recipe/${item.id}`}>
                                   <img src={item.image} alt={item.title} />
                                   <h4>{item.title}</h4>
                              </Link>
                         </Card>
                    )
               })}
          </Grid>
     )
}


const Grid = styled(motion.div)`
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

export default Cuisine;