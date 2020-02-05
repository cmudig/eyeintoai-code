import React from 'react';
import classnames from 'classnames';

import styles from './Modal.module.scss';

function Modal({ handleClose, show, children }) {
  const showHideClassname = show ? classnames(styles['modal'], styles['modal__display--block']) : classnames(styles['modal'], styles['modal__display--none']);

  return (
    <div className={showHideClassname}>
      <section className={styles['modal__main']}>
        {children}
        <button className={styles['modal__btn']} onClick={handleClose}>Close</button>
      </section>
    </div>
  );
}

export default Modal;
