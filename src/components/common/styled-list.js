import styled from 'styled-components/macro'

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2px;
  border-radius: 4px;
  background-color: #222222;
  padding: 6px;

  button {
    background-color: #f3904f;
    border-radius: 4px;
    border: none;
    margin: 0 8px;

    .deleteButton {
      background-color: #ff904f;
    }
  }
`

const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
`

export { ListItem, UnorderedList }
