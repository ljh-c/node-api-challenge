import React, { useState, useEffect}  from 'react';
import axios from 'axios';
import { Spinner } from 'reactstrap';

import Project from './Project';

const ProjectList = () => {
  const [projects, setProjects] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => console.log(err))
      .then(() => setIsFetching(false));
  }, []);

  return (
    <section>
      {isFetching && (
        <div className="dots">
          <Spinner type="grow" color="secondary" />
          <Spinner type="grow" color="secondary" />
          <Spinner type="grow" color="secondary" />
        </div>
      )}
      {!isFetching && projects && (
        projects.map(project => <Project key={project.id} project={project} />)
      )}
    </section>
  );
};

export default ProjectList;