import { Loading } from "./Loading";
import type { UserDetailsProps } from "../App";


type DetailsProps = {
    info: UserDetailsProps;
  loading: boolean;
}

export function Details({ info, loading }: DetailsProps) {
  const { avatar, name, details } = info;
  const { city, company, position } = details;
 return (
   <div className="user-card">
     {loading ? (
       <Loading/>
     ) : (
       <>
         <div className="img-wrapper">
           <img src={avatar} alt="User" className="user-img" />
         </div>
         <div className="user-details">
           <h4 className="name">{name}</h4>
           <ul className="details-list">
             <li className="detail-item">City: {city}</li>
             <li className="detail-item">Company: {company}</li>
             <li className="detail-item">Position: {position}</li>
           </ul>
         </div>
       </>
     )}
   </div>
 );
}
