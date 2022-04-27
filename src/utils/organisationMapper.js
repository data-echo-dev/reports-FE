import { useAuth } from "../hooks/useAuth"

export function OrganisationMapper(id) {
    // Getting the orgs from auth context.
    const {orgs} = useAuth()
    let theOrg = { name: 'Unassigned Organisation' }

    if (orgs) {
      const search = orgs.find((organisation) => organisation.id === id)
      if (search) {
        theOrg = search
      }
    }
    return theOrg.name
  }