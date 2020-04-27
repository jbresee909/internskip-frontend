import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import withBaseURL from "../utils/withBaseURL.js";

const ProjectTemplate = (props) => {
  const [projectState, setProjectState] = useState({
    project: {
      data: [{ title: "", organization: "", description: "", files: [] }],
    },
  });
  useEffect(() => {
    axios
      .get(
        "https://bresee-internskip.herokuapp.com/api/projects/project/" +
          props.match.params.id
      )
      .then((project) => {
        setProjectState({ project });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const project = projectState.project.data[0];

  return (
    <Card
      className="w-75 mx-auto"
      style={{ marginTop: "120px", marginBottom: "100px" }}
    >
      <Card.Header>{project.organization}</Card.Header>
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Text>Files:</Card.Text>
        {project.files.map((file) =>
          file.mimetype.startsWith("image/") ? (
            <Card.Img src={withBaseURL(`static/image/${file.key}`)}></Card.Img>
          ) : (
            <Card.Text className="project-file">
              {file.originalname}{" "}
              <a href={withBaseURL(`static/image/${file.key}`)}>
                <span
                  role="img"
                  aria-label={
                    "link to a file attachment for file " + file.originalname
                  }
                >
                  🔗
                </span>
              </a>
            </Card.Text>
          )
        )}
        <Card.Text className="project-desc">{project.description}</Card.Text>
        <Button variant="primary">Add to Your Projects</Button>
      </Card.Body>
      <Card.Footer className="text-muted">
        {project &&
          project.createdAt &&
          new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(project.createdAt))}
      </Card.Footer>
    </Card>
  );
};

export default ProjectTemplate;
