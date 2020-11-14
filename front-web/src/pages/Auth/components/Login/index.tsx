import React from 'react';
import { Link } from 'react-router-dom';
import ButtonIcon from '../../../../core/components/Buttonicon';
import AuthCard from '../Card/Index';
import './styles.scss'

const Login = () => {
    return (
        <AuthCard title="login">
            <form className="login-form">
                <input type="email"
                    className="form-control card-base margin-bottom-30"
                    placeholder="Email"
                />

                <input type="password"
                    className="form-control card-base"
                    placeholder="Senha"
                />

                <Link to="/admin/auth/recover" className="login-link-recover">
                    Esqueci a senha?
                </Link>
                <div className="login-submit">
                    <ButtonIcon text="LOGAR" />
                </div>
                <div className="text-center">
                    <span className="not-registered">
                           Não tem Cadastro?
                   </span>
                   <Link to="/admin/auth/register" className="login-link-register">
                        CADASTRAR
                   </Link>
                </div>
            </form>
        </AuthCard>
    )
}

export default Login;