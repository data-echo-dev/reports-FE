import { Button } from '@chakra-ui/react'
import { PencilIcon } from '@heroicons/react/outline'
import { HTMLAttributes } from 'react'
import { User } from '../../app/types'
import { OrganisationMapper } from '../../utils/organisationMapper'
import UserDetailsModal from '../Modals/UserDetailsModal'
import DeleteUserButton from '../Buttons/DeleteUserButton'

interface Props {
  item: User
  user: User
}

const UserCard = ({
  user,
  item,
  ...otherProps
}: Props & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...otherProps}>
      <div className="shadow-xl card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">{`${item.name}`}</h2>
          <div className="flex flex-wrap gap-3">
            <div className="badge badge-outline">{`${item.email}`}</div>
          </div>
          <p className="mb-2">
            {`${OrganisationMapper(item.organisation)}`}{' '}
            {item.isEditor && (
              <div className="badge bg-sky-300 text-inherit border-cyan-300 ">
                Editor
              </div>
            )}
          </p>
          <div className="justify-start card-actions">
            <span className="flex items-center gap-2">
              {user.isSuperAdmin && (
                <>
                  <UserDetailsModal user={item}>
                    <Button size="sm" colorScheme="facebook">
                      <PencilIcon className="w-5 h-5" />
                    </Button>
                  </UserDetailsModal>
                  <DeleteUserButton userID={item.uid} />
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard
