import Spinner from '../icons/spinner'

interface ButtonProps {
  title?: string
  isLoading?: boolean
}
const FormButton = ({
  isLoading,
  title,
  children,
  ...buttonProps
}: ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  return (
    <button
      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
      type="button"
      {...buttonProps}
    >
      {isLoading ? (
        <Spinner width="20" fill="white" className="animate-spin" />
      ) : (
        title
      )}
      {children}
    </button>
  )
}
export default FormButton
