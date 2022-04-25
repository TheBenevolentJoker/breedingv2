import {useCallback, useContext} from 'react';

import {Context} from '../contexts/Modals';

const useModal = (modal) => {
  const {onDismiss, onPresent} = useContext(Context);

  const handlePresent = useCallback(() => {
    onPresent(modal);
  }, [modal, onPresent]);

  return [handlePresent, onDismiss];
};

export default useModal;
