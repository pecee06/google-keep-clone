const Container = ({className="", children, ...props}) => {
  return (
    <div className={`min-h-screen p-8 ${className}`} {...props}>
        {children}
    </div>
  )
}

export default Container