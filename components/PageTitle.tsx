interface Heading {
  text: string
}

function PageTitle({ text }: Heading): JSX.Element {
  return (
    <h1 className="my-12 text-6xl font-black tracking-tight text-center">
      {text}
    </h1>
  )
}

export default PageTitle
