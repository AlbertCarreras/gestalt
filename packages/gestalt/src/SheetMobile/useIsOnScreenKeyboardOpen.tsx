import { useEffect, useState } from 'react';
import { useDeviceType } from '../contexts/DeviceTypeProvider';

const isKeyboardInput = (elem: HTMLElement) => {
  // eslint-disable-next-line no-console
  console.log(elem);
  return (
    (elem.tagName === 'INPUT' &&
      ['date', 'number', 'email', 'password', 'tel', 'text', 'url'].includes(
        (elem as HTMLInputElement).type,
      )) ||
    elem.hasAttribute('contenteditable')
  );
};

// This hooks detects the on-screen keyboard. In the future we can use the VirtualKeyboard API but it's still experimental and not supported in many browsers. https://developer.mozilla.org/en-US/docs/Web/API/VirtualKeyboard/geometrychange_event
const useIsOnScreenKeyboardOpen = () => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      if (!e.target) {
        return;
      }
      const target = e.target as HTMLElement;
      if (isMobile && isKeyboardInput(target)) {
        setOpen(true);
      }
    };

    document.addEventListener('focusin', handleFocusIn);

    const handleFocusOut = (e: FocusEvent) => {
      if (!e.target) {
        return;
      }
      const target = e.target as HTMLElement;
      if (isMobile && isKeyboardInput(target)) {
        setOpen(false);
      }
    };

    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [isMobile]);

  return isOpen;
};

export default useIsOnScreenKeyboardOpen;
