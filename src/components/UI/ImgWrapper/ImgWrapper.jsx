import React, { useState, useEffect } from 'react';
// import { Spinner } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';
// import cn from 'classnames';
import styles from './ImgWrapper.module.css';
import noImg from '../../../assets/no_img.png';

export default function ImgWrapper({ src, width, height, ...props }) {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  const wd = `${width}%`;
  const pd = `${width * height}%`;

  useEffect(() => {
    setLoad(false);
    setError(false);
  }, [src]);

  return (
    <LazyLoad>
      <div style={{ width: wd, paddingBottom: pd, position: 'relative' }}>
        <div className={styles.wrapper}>
          <Choose>
            <When condition={!error && src}>
              <img
                alt=""
                onLoad={() => {
                  setLoad(true);
                  setError(false);
                }}
                onError={() => {
                  setLoad(true);
                  setError(true);
                }}
                src={src}
                {...props}
              />
            </When>
            <Otherwise>
              <img alt="" src={noImg} {...props} />
            </Otherwise>
          </Choose>

          <If condition={!load && src}>
            <span className={styles.loading}>
              {/* <Spinner animation="border" /> */}
            </span>
          </If>
        </div>
      </div>
    </LazyLoad>
  );
}
