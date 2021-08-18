// @ts-nocheck
import { useRequireAuth } from '../hooks/useRequireAuth'

const DashBoardPage: React.FC = () => {
  const auth = useRequireAuth()

  if (!auth.user) return null

  return <main>hi</main>
}
export default DashBoardPage
