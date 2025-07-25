import { Link } from "react-router-dom"
import Form from "../../components/Form"
import TitleHeader from "../../components/TitleHeader"
import "../../styles/auth-form.css"
import type { AuthStructureType } from "../../types/auth-type"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useHandlePath from "../../hooks/useHandlePath"
import { auth_type } from "../../constants/auth-constant"
import useHandleDialog from "../../hooks/useHandleDialog"

const AuthPage = () => {

  const {type} = useParams();

  const [authStructure,setAuthStructure] = useState<AuthStructureType| null>(null)
  const {onTransition} = useHandlePath();
  const {showDialog} = useHandleDialog();

  useEffect(()=>{

    const currentStructure = auth_type.find((structure=>structure.type === type))
    !!currentStructure
    &&
    setAuthStructure(currentStructure)

  },[type])

  return (
    <section className="authFormSection">
      <h1
      style={{
        fontSize:"3rem",
        border:"0.1rem solid deepskyblue",
        borderRadius:"100%",
        borderStyle:"outset",
        padding:"0.5rem"
      }}
      >
        🌊
      </h1>
      {
        !!authStructure
        &&
         <section className="formSection">
        <TitleHeader
        title={authStructure.header.title}
        subtitle={authStructure.header.subtitle}
        />
        <Form
        method="post"
        setPlacehorders
        submitButtonTitle={authStructure.form.submitTitle}
        model={authStructure.form.model}
        submit={{
          url:authStructure.form.url
        }}
        errorView
        treatment={{
          onThen() {
            onTransition("/",true)
          },
          onCatch(error) {
            const currentError = error as {message:string}
            showDialog({
              title:"Revise seus dados",
              message:currentError.message,
              type:"warn",
              onConfirm:null,
              onCancel:null,
              onFinally:null
            })
          },
        }}
        />
        
        <span className="authOtherOptionSpan">
            <span className="authAskSpan">
              {
                authStructure.otherOption.ask
              }
            </span>
            <Link className="authReplyRedirect"
              to={authStructure.otherOption.redirectTo}
              >
              {
                authStructure.otherOption.reply
              }
          </Link>
        </span>
            {
              type == 'login'
              &&
              <Link 
                className="forgotPasswordRedirect"
                to={"/forgot/password"}
                >
                Esqueceu sua senha?
              </Link>
            }
              
      </section>
      }
     
    </section>
  )
}

export default AuthPage
