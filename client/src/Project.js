import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardText,
} from 'reactstrap';

const Project = ({ project }) => {
  return (
    <Card>
      <CardHeader tag="h2">
        <Link to={`/projects/${project.id}`}>{project.name}</Link>
      </CardHeader>
      <CardBody>
        <CardText>{project.description}</CardText>
      </CardBody>
    </Card>
  );
}

export default Project;