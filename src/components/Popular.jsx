import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import { Link } from 'react-router-dom';

function Popular() {

     const [popular, setPopular] = useState([]);

     const getPopular = async () => {
          const checkStorage = localStorage.getItem('popular');

          if (checkStorage) {
               setPopular(JSON.parse(checkStorage));
          }else {
               const api = await fetch(
               `https://api.spoonacular.com/recipes/random?apiKey=209c251fa9ee4fba92c86ffbd5b425c3&number=10`
               );
               const data = await api.json();
               localStorage.setItem('popular', data.recipes);
               setPopular(data.recipes);
          }
     }

     useEffect(()=> {
          getPopular();
     }, []);

     return (
          <div>
          <Wrapper>
               <h3>Popular Picks</h3>
               <Splide
                    options={{
                         perPage: 4,
                         arrows: true,
                         pagination: false,
                         rewind: true,
                         drag: "free",
                         gap: "1rem"
                    }} aria-label="Popular picks of the time">
                    {
                    popular.map((recipe, id)=> {
                         return (
                              <SplideSlide key={id}>
                                   <Card>
                                        <Link to={`/recipe/${recipe.id}`}>
                                             <p>{recipe.title}</p>
                                             <img src={recipe.image} alt={recipe.title} />
                                             <Gradient />
                                        </Link>
                                   </Card>
                              </SplideSlide>
                              )
                         }
                    )}
                    
               </Splide>
          </Wrapper>
          </div>
     )
}

const Wrapper = styled.div`
     margin: 4rem 2rem;
`;
const Card = styled.div`
     min-height: 15rem;
     width: 13rem;
     border-radius: 2rem;
     overflow: hidden;
     position: relative;

     img {
          border-radius: 2rem;
          position: absolute;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
     }
     p {
          position: absolute;
          z-index: 10;
          left: 50%;
          bottom: 0%;
          transform: translate(-50%, 0%);
          width: 100%;
          text-align: center;
          font-weight: 600;
          font-size:: 1rem;
          height: 40%;
          display: flex;
          justify-content: center;
          align-items: center;
     }
`;

const Gradient = styled.div`
     z-index: 3;
     position: absolute;
     width: 100%;
     height: 100%;
     background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`
export default Popular;