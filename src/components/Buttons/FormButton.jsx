import { Button } from '@chakra-ui/react'
import Spinner from '../icons/spinner'

const FormButton = ({
  isLoading,
  title,
  children,
  ...buttonProps
}) => {
  return (
    <Button
    bgColor="primary.blue"
            className="opacity-80 hover:text-primary-blue"
            isFullWidth
            color="primary.white"
      type="button"
      {...buttonProps}
    >
      {isLoading ? (
        <Spinner width="20" fill="white" className="animate-spin" />
      ) : (
        title
      )}
      {children}
    </Button>
  )
}
export default FormButton
