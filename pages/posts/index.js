import Link from "next/link";
import axios from "axios";
import domain from "@/utils/config";
import PostItem from "@/components/postsItem";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const AddPostLink = () => {
  return (
    <div className="add-post-icon">
      <Link className="add-post-link" href="/posts/addPost" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faCirclePlus} />
      </Link>
    </div>
  );
};


export default function Index({ postData }) {
  const posts = postData.map((post, index) => {
    return (
      <Col key={index} xs={12} sm={6} md={6} lg={4} className="postCard mb-4 m-4 text-center">
        <div className="card-container">
          <PostItem post={post} className="card-item" />
        </div>
      </Col>
    );
  });

  return (
    <Container>
      <Row className="justify-content-center m-2">{posts}</Row>
      <AddPostLink />
    </Container>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get(`${domain}/posts`);
    return {
      props: {
        postData: response.data,
      },
    };
    console.log("Post added successfully");
    alert("Post added successfully");
  } catch (error) {
    console.log(error);
  }
}
