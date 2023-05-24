import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import '../App';

function FormComponent() {

  interface quote {
    name: string
    quote: string
  }
  interface response {
    response: string | "No Response"
  }
  let initialState: quote = {
    name: "Name",
    quote: "Quote"
  }
  
    const [quote, setQuote] = useState<quote>(initialState)
    const [response, setResponse] = useState<response>()
  
    const sumbitForm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      axios.post<response>('http://127.0.0.1:8000/post/',
      JSON.stringify({
        name: quote.name,
        quote: quote.quote,
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        setResponse(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    const onChangeHandler = (event: HTMLInputElement) => {
      const {name, value} = event
        setQuote((prev) => {
          return {...prev, [name]: value}
        })
    }

  return (
    <>
    <form onSubmit={sumbitForm} className="text-left text-black">
      <p className='text-white'>Your name</p>
      <input type="text" name="name" className="rounded placeholder:italic placeholder:text-slate-300" placeholder='  Joe Boe' required  value={quote.name} onChange={(e) => onChangeHandler(e.target)}/>
      <p className='text-white'>Your quote</p>
      <input type="text" name="quote" className="rounded w-full placeholder:italic placeholder:text-slate-300" placeholder= '  Dont drink and fly' required value={quote.quote} onChange={(e) => onChangeHandler(e.target)}/>
      <div className="text-right">
      <button className='text-white rounded mt-5 bg-gradient-to-r from-cyan-500 to-blue-500 px-8'>Submit</button>
      </div>
    </form>
    </>
  );
}

export default FormComponent;
