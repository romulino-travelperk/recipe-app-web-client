import { tagActions, tagsInitialState, tagsReducer } from './tags'

describe('tags reducer', () => {
  it('sets map and list on get success', () => {
    const tag1 = {
      id: 2,
      name: 'tag 2',
    }
    const tag2 = {
      id: 1,
      name: 'tag 1',
    }
    const tagList = [tag1, tag2]

    const newState = tagsReducer(
      tagsInitialState,
      tagActions.get.success(tagList)
    )
    expect(newState).toEqual({
      loading: false,
      list: tagList,
      idToName: {
        [tag1.id]: tag1.name,
        [tag2.id]: tag2.name,
      },
    })
  })
})
