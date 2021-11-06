import { useContext } from 'react'
import { StoreContext } from '../../../store/store'
import { tagActions } from '../../../core/tags/tags'
import { ListItem, UnorderedList } from '../../common/styled-list'
import { Button } from '../../common/styled-form'

const TagList = () => {
  const { state, dispatch } = useContext(StoreContext)

  return (
    <div>
      {!state.tags.list && <div>You have no tags yet</div>}
      <Button
        disabled={state.tags.loading}
        onClick={() => dispatch(tagActions.edit({}))}
        type="button"
        value="New Tag"
      />

      <UnorderedList>
        {state.tags.list?.map((tag, index) => {
          return (
            <ListItem key={tag.name + index}>
              {tag.name}
              <div>
                <button
                  disabled={state.tags.loading}
                  onClick={() => dispatch(tagActions.edit(tag))}
                >
                  Edit
                </button>
                <button
                  disabled={state.tags.loading}
                  onClick={() =>
                    dispatch(
                      tagActions.delete.intention({
                        token: state?.authentication?.user?.token,
                        id: tag.id,
                      })
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </ListItem>
          )
        })}
      </UnorderedList>
    </div>
  )
}

export default TagList
