import React from 'react';
import './styles.scss'

type Props = {
   title: string;
   children: React.ReactNode;
}
const AuthCard = ( { title, children }: Props) => {
    return(
       <div className="card-base auth-card">
          <h1 className="auth-card-title">
              {title}
          </h1>
          <h1>
              {children}
          </h1>
       </div>

    )
}

export default AuthCard;