import styled from 'styled-components/macro'

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  color: white;
  border-radius: 8px;
  line-height: 1.5em;
  padding: 16px;
  min-height: 5em;

  input {
    border-radius: 8px;
    line-height: 2em;
    text-align: center;
    font-weight: bold;

    :disabled {
      background-color: #222222;
      color: #666666;
      transition: all 0.5s ease-in-out;
    }
  }
`

const ErrorMessage = styled.div`
  display: inline-block;
  color: yellow;
  font-weight: bold;
`

const Button = styled.input`
  background-color: white;
  color: black;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  line-height: 2em;
  padding: 0 16px;
  min-width: 100px;
  margin: 2px 0;
  transition: all 0.2s ease-in-out;

  :disabled {
    background-color: #222222;
    color: #666666;
    transition: all 0.5s ease-in-out;
  }
`

export { Button, ErrorMessage, InputField }
