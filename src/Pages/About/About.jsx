import React from 'react'
import Articals from '../../Component/Knowledgebase/Knowledgebase/Articals'
import "../../assets/scss/pages/_about.scss"
import { Container , Row } from 'reactstrap'



const About = () => {
  return (
    <div className='about'>
      <Container>
        <h1>About Us</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus aspernatur omnis, voluptate sint odit non facilis itaque sapiente? Autem iste perspiciatis repellendus at! Odit necessitatibus inventore eius asperiores dolores saepe excepturi accusantium voluptate ut sapiente dolorem, dolor neque praesentium animi laborum quaerat fugiat. Ex voluptates consequuntur fugit, quia, accusantium dolor at est neque nam numquam necessitatibus excepturi quam, corrupti omnis molestias eligendi vitae harum cumque repellendus! Itaque saepe labore optio similique, placeat accusantium doloremque dolor cum ducimus! Debitis est reprehenderit aliquam, ipsum deserunt architecto ex sed ullam. Eligendi, recusandae neque pariatur mollitia officia corrupti. Illo, molestiae esse exercitationem nobis consequatur quod illum iste assumenda cum eos distinctio minus veniam atque porro qui placeat tenetur id fugit ad aperiam temporibus ipsam error enim. Minus eum amet veritatis ipsum libero error aliquid, laudantium reiciendis dolor distinctio reprehenderit! Voluptatem unde iusto aut laudantium ducimus, eveniet illum numquam esse animi similique nemo, maxime saepe.</p>
        <Row>
          <Articals />
        </Row>
      </Container>
    </div>
  )
}

export default About