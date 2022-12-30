import React from 'react';
// import cn from 'classnames';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, ListGroup } from 'react-bootstrap';
// import { makeTodayName } from '../../utils/utils.js';

function FoldersList({ selectedCamera }) {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCameraPage = (event) => {
    event.preventDefault();
    // const mainFolderId = selectedCamera.mainFolder._id;
    // const todayDate = makeTodayName(new Date());
    console.log(4555555555555);
    navigate(
      `/cameras/${selectedCamera._id}/photos`,
    );
  };

  if (selectedCamera === null) {
    return null;
  }

  return (
    <Col md={12} className="mb-4">
      {/* <Heading lvl={6} className="mb-3">
        Files
      </Heading> */}

      <ListGroup className="mb-3" variant="flush" type="button" onClick={handleCameraPage}>
        <ListGroup.Item>
          <div className="w-75 text-truncate">MainFolder</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="ms-3 w-75 text-truncate">Photos</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="ms-3 w-75 text-truncate">Videos</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="ms-3 w-75 text-truncate">VideosByTime</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="ms-3 w-75 text-truncate">PhotosByTime</div>
        </ListGroup.Item>
      </ListGroup>

    </Col>
  );
}

export default FoldersList;
