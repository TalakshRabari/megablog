import { Postcard, Container } from "../components"
import service from "../appwrite/conf"
import { useEffect, useState } from "react"


function AllPosts(){
            
      const [posts, setPosts] = useState([])
      useEffect(()=> {}, [])
          service.getPosts([]).then((posts) => {
                   if(posts){
                    setPosts(posts.documents)
                   }
          })
    return(
        <div className=" ew-full py-8">
               <Container>
                {posts.map((post) => {
                    <div key={post.$id} className="p-2 w-1/4">
                        <Postcard post={post}/>
                    </div>
                })}
                </Container> 
        </div>
    )
}
export default AllPosts