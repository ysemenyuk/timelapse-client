import React from 'react';
// import cn from 'classnames';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, ListGroup } from 'react-bootstrap';
// import cameraThunks from '../../thunks/cameraThunks.js';
// import Heading from '../UI/Heading.jsx';
// import { EDIT_CAMERA } from '../../utils/constants.js';
// import { modalActions } from '../../store/modalSlice.js';
// import useThunkStatus from '../../hooks/useThunkStatus.js';
// import EditCameraModal from '../Modals/EditCameraModal.jsx';

function FoldersList({ selectedCamera }) {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCameraPage = (event) => {
    event.preventDefault();
    navigate(`/cameras/${selectedCamera._id}`);
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
          <div className="w-75 text-truncate">Main folder</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="w-75 text-truncate">Screenshots by task</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="w-75 text-truncate">Screenshots</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="w-75 text-truncate">Videos by task</div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="w-75 text-truncate">Videos</div>
        </ListGroup.Item>
      </ListGroup>

    </Col>
  );
}

export default FoldersList;
