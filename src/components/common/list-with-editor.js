import styled from 'styled-components/macro'

const StyledListWithEditor = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  background-color: #282c34;
  border-radius: 8px;
  padding: 16px;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
`

const StyledListDiv = styled.div`
  flex-grow: 1;
`
const ListWithEditor = ({ listComponent, editorComponent }) => {
  return (
    <StyledListWithEditor>
      <StyledListDiv>{listComponent()}</StyledListDiv>
      <div>{editorComponent()}</div>
    </StyledListWithEditor>
  )
}

export default ListWithEditor
