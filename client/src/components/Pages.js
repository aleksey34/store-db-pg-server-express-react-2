import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Pagination } from "react-bootstrap";

const Pages = observer( () => {
    const {devices} = useContext(Context);
    const pagesCount = Math.ceil(devices.totalCount / devices.limit) ; 
    
    const pages = []; 
    
    for(let i = 1 ; i <= pagesCount; i++){
        pages[i] = i;
    }
    

    return ( 
            <Pagination size="lg">
                {
                pages.map( (page)=>{
                    return (
                        <Pagination.Item
                        onClick={()=>devices.setPage(page)}
                         key={page} 
                         active={page === devices.page}
                         >
                            {page}
                        </Pagination.Item>
                    )
                })
                }
            </Pagination>    
      );
}   )
 
export default Pages;