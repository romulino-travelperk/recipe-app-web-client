import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { UnorderedList } from './styled-list'

const StyledName = styled.li`
  background-color: ${(props) =>
    props.isSelected ? '#aa3300' : 'transparent'};
  border-radius: 8px;
  margin: 0 4px;
  list-style: none;
  padding: 4px;
`

const NamePicker = ({
  ids = [],
  idToNameMap = {},
  onChangeSelection,
  selectedIds,
}) => {
  const [selected, setSelected] = useState(selectedIds || [])
  useEffect(() => {
    setSelected(selectedIds || [])
  }, [selectedIds])
  function toggleSelect(id) {
    const nameIndex = selected.indexOf(id)
    if (nameIndex === -1) {
      const newSelection = [...selected, id]
      setSelected(newSelection)
      onChangeSelection && onChangeSelection(newSelection)
    } else {
      const newSelection = [...selected]
      newSelection.splice(nameIndex, 1)
      setSelected(newSelection)
      onChangeSelection && onChangeSelection(newSelection)
    }
  }

  return (
    <UnorderedList>
      {ids.map((id) => (
        <StyledName
          isSelected={selected.indexOf(id) !== -1}
          onClick={() => toggleSelect(id)}
          key={id}
        >
          {idToNameMap[id]}
        </StyledName>
      ))}
    </UnorderedList>
  )
}

export default NamePicker
