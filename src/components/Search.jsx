import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Search() {
     const [input, setInput] = useState("");
     const navigate = useNavigate();

     const submitHandler = (e) => {
          e.preventDefault();
          navigate(`search/${input}`);
          setInput('');
     }
     return (
     <FormStyle onSubmit={(e) => submitHandler(e)}>
          <div>
               <FaSearch/>
               <input onChange={(e) => setInput(e.target.value)} type="text"  value={input}/>
          </div>
     </FormStyle>
  )
}


const FormStyle = styled.form`
     margin: 0rem 10rem;
     div {
          postion: relative;
          width: 100%;
     }
     input {
          border: none;
          background: linear-gradient(35deg, #494949, #313131);
          color: white;
          padding: 1rem 3rem;
          border-radius: 1rem;
          outline: none;
          width: 100%;
     }
     svg {
          position: relative;
          top: 50%;
          left: 0%;
          tansform: translate(100%, -50%);
          color: white;
     }
`
export default Search;