import { render, screen } from '@testing-library/react'
import NamePicker from './name-picker'
import userEvent from '@testing-library/user-event'

describe('name-picker', () => {
  const id1 = '1'
  const id2 = '2'
  const ids = [id1, id2]

  const name1 = 'some name'
  const name2 = 'another name'

  const idsToNames = { 1: name1, 2: name2 }

  it('renders', () => {
    render(<NamePicker ids={ids} idToNameMap={idsToNames} />)

    expect(screen.getByText(name1)).not.toBeNull()
    expect(screen.getByText(name2)).not.toBeNull()
  })

  it('changes selection on click', () => {
    const onChange = jest.fn()
    render(
      <NamePicker
        ids={ids}
        idToNameMap={idsToNames}
        onChangeSelection={onChange}
      />
    )

    const name1Element = screen.getByText(name1)
    userEvent.click(name1Element)

    expect(onChange).toHaveBeenLastCalledWith([id1])

    userEvent.click(name1Element)
    expect(onChange).toHaveBeenLastCalledWith([])
  })

  it('renders with selected ids', () => {
    const onChange = jest.fn()

    render(
      <NamePicker
        ids={ids}
        idToNameMap={idsToNames}
        onChangeSelection={onChange}
        selectedIds={[id2]}
      />
    )

    const name1Element = screen.getByText(name1)
    userEvent.click(name1Element)
    expect(onChange).toHaveBeenLastCalledWith([id2, id1])
  })
})
