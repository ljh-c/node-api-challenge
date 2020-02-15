import React, { useState, useEffect}  from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'reactstrap';

const ProjectPage = () => {
  const [project, setProject] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${id}`)
      .then(res => {
        setProject(res.data);
      })
      .catch(err => console.log(err))
      .then(() => setIsFetching(false));
  }, [id]);

  return (
    <section>
      {isFetching && (
        <div className="dots">
          <Spinner type="grow" color="info" />
          <Spinner type="grow" color="info" />
          <Spinner type="grow" color="info" />
        </div>
      )}
      {!isFetching && project && (
        <>
          <h2>{project.name}</h2>
          <h3>{project.description}</h3>
          {project.actions.map(action => <p key={action.id}>{action.description}</p>)}
        </>
      )}
    </section>
  );
};

export default ProjectPage;