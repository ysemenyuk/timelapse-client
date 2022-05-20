import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fileManagerActions } from '../store/fileManagerSlice.js';

const isImage = (file) => file.type !== 'Folder';
const getImages = (files) => (files ? files.filter(isImage) : []);

export default function useImageViewer(selectedCamera, files) {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [images, setImages] = useState(getImages(files));
  const [currentIndex, setCurrentIndex] = useState(0);

  const image = images[currentIndex];

  useEffect(() => {
    setImages(getImages(files));
  }, [files]);

  const onImageDoubleClick = (index) => {
    setCurrentIndex(index);
    setShow(true);
  };

  const onHide = () => {
    setShow(false);
  };

  const disabledNext = currentIndex === images.length - 1;
  const disabledPrew = currentIndex === 0;

  const onNextClick = () => {
    setCurrentIndex((prew) => prew + 1);
  };

  const onPrewClick = () => {
    setCurrentIndex((prew) => prew - 1);
  };

  const onDelete = () => {
    dispatch(fileManagerActions.deleteOneFile({
      cameraId: selectedCamera._id,
      file: image,
    }))
      .then((resp) => {
        if (resp.error) {
          console.log('network error', resp);
          return;
        }

        if (images.length === 0) {
          setShow(false);
          return;
        }
        const index = currentIndex >= images.length ? images.length - 1 : currentIndex;
        setCurrentIndex(index);
      });
    // change index
  };

  return {
    onImageDoubleClick,
    show,
    onHide,
    images,
    image,
    onNextClick,
    onPrewClick,
    disabledPrew,
    disabledNext,
    onDelete,
  };
}
