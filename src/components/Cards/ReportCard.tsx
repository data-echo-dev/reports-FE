import { Button } from '@chakra-ui/react'
import { ExternalLinkIcon, PencilIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import { Report, User } from '../../app/types'
import { db } from '../../config/firebase'
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery'
import { OrganisationMapper } from '../../utils/organisationMapper'
import ReportDetailsModal from '../Modals/ReportDetailsModal'
import DeleteReportButton from '../Buttons/DeleteReportButton'

interface Props {
  report: Report
  user: User
}

const ReportCard = ({
  report,
  user,
  ...otherProps
}: Props & HTMLAttributes<HTMLDivElement>) => {
  const { data, status, error } = useFirestoreQuery(
    db.collection('users').where('id', '==', report.teacher)
  )
  const teacher: string = data ? data[0]?.name : ''

  return (
    <div {...otherProps}>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{`${report.title}`}</h2>
          <div className="flex gap-3 flex-wrap">
            <div className="badge ">{`${report.reportClass}`}</div>
            <div className="badge badge-outline">{`${report.subject}`}</div>
          </div>
          <p className="mb-2">
            {`${OrganisationMapper(report.organisation)}`}{' '}
            <div className="badge bg-sky-300 text-inherit border-cyan-300 ">
              {`${teacher}`}
            </div>{' '}
          </p>

          <div className="card-actions justify-start">
            <span className="flex items-center gap-2">
              {(user.isSuperAdmin || user.isEditor) && (
                <>
                  <ReportDetailsModal id={report.id} isEditor={user.isEditor}>
                    <Button size="sm" colorScheme="facebook">
                      <PencilIcon className="w-5 h-5" />
                    </Button>
                  </ReportDetailsModal>
                  <DeleteReportButton reportID={report.id} />
                </>
              )}
              <Button size="sm" colorScheme="green" title="View Report">
                <Link
                  href={{
                    pathname: '/report',
                    query: { id: `${report.id}` },
                  }}
                >
                  <a>
                    <ExternalLinkIcon className="w-5 h-5" />
                  </a>
                </Link>
              </Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportCard
