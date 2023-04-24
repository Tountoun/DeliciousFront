import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function Recipe() {
  let params = useParams();
  const [recipes, setRecipes] = useState({});
  const [showInstructions, setShowInstructions] = useState('instructions');
  const [showIngredients, setShowIngredients]  = useState(false);

  const getDetails = async() => {
    
      const api = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=209c251fa9ee4fba92c86ffbd5b425c3`
      );
    
    const data = await api.json();
    localStorage.setItem('recipes', JSON.stringify(data));
    console.log(data);
    setRecipes(data);
  
  }

  useEffect(() => {
    
    getDetails()
      .catch((err) => { console.log(err)});

  }, [params.id])

  return (
    <DetailWrapper>
      <div className='img_ingred'>
        <div>
          <h2>{recipes.title}</h2>
          <img src={recipes.image} alt="" />
        </div>
        <Info>
          <Button className={showIngredients ? 'active' : ''} onClick={() => setShowIngredients(!showIngredients)}>Ingredients</Button>
          { (showIngredients) &&
            (
              <div>
                <ul>{ recipes.extendedIngredients.map((ingredient) => {
                  return (<li key={ingredient.id}>{ingredient.original}</li>)
                })}
                </ul>
              </div>
            )
          }
        </Info>
      </div>
      <Info style={{marginTop: '2rem'}}>
        <Button className={showInstructions ? 'active' : ''} onClick={() => setShowInstructions(!showInstructions)}>Instructions</Button>
        { showInstructions && (
          <div className='instructions'>
            <h4 dangerouslySetInnerHTML={{ __html: recipes.summary}}></h4>
            <h4 dangerouslySetInnerHTML={{ __html: recipes.instructions}}></h4>
          </div>
        )}
      </Info>
    </DetailWrapper>
  )

}

const DetailWrapper = styled.div`
  margin-top: 6rem;
  margin-bottom: 5rem;
  .img_ingred {
    display: flex;
    flex-direction: row;
  }
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  img {
    width: 100%;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 1rem;
  font-weight: 600;
`

const Info = styled.div`
  margin-left: 2rem;
  h4 {
    font-weight: normal;
    font-size: 1rem;
    line-height: 2.2rem;
  }
  .instructions {
    margin-top: 2rem;
    text-align: justify;
  }
`

export default Recipe;