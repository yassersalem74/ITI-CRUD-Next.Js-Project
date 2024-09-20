import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router'; 
import axios from 'axios';
import domain from '@/utils/config';

export default function PostItem({ post }) {
    const router = useRouter();

    async function deletePost(postId) {
        try {
            await axios.delete(`${domain}/posts/${postId}`);
            alert("Deleted successfully");
            router.push('/posts')
            // Optionally, you can navigate to another page or update the UI here
        } catch (error) {
            console.error("Error deleting post:", error);
            // You can handle the error as needed, e.g., display an error message
        }
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={post.imageUrl} />
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.details}</Card.Text>
                <div className='d-flex justify-content-between'>
                    <Button variant="success" onClick={() => router.push(`/posts/${post._id}`)} >Edit</Button>
                    <Button variant="danger" onClick={() => deletePost(post._id)}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
}
