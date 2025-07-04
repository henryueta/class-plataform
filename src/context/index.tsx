import { AuthProvider } from "./AuthContext"

const AppProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  )
}

export default AppProvider
