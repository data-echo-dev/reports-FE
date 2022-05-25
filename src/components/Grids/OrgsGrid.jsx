import { BanIcon, CheckIcon } from '@heroicons/react/outline'
import OrgDetailsModal from '../Modals/OrgDetailsModal.tsx'

const OrgsGrid = ({ orgsData }) => (
  <div className="grid grid-cols-4 gap-4 p-5">
    {orgsData.map((org) => (
      <OrgDetailsModal key={org.id} id={org.id}>
        <div className="card-body">
          <div className="justify-between card-actions">
            <h2 className="cursor-pointer card-title">
              {org.name || 'No Name'}
            </h2>
            {org.isActive ? (
              <CheckIcon className="w-6 h-6 text-green-900 bg-green-200 rounded-full" />
            ) : (
              <BanIcon className="w-6 h-6 text-red-900 bg-red-200 rounded-full" />
            )}
          </div>
        </div>
      </OrgDetailsModal>
    ))}
  </div>
)

export default OrgsGrid
