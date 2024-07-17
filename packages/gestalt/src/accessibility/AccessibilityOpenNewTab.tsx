import { ComponentProps } from 'react';
import classnames from 'classnames';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Icon from '../Icon';
import styles from '../Icon.css';
import icons from '../icons/index';
import vrIcons from '../icons-vr-theme/index';
import useInExperiment from '../useInExperiment';

type Props = {
  size: ComponentProps<typeof Icon>['size'];
};

export default function AccessibilityOpenNewTab({ size }: Props) {
  const cs = classnames(styles.rtlSupport, styles.inheritColor, styles.icon);
  const { accessibilityNewTabLabel } = useDefaultLabelContext('Link');
  const isInExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return (
    <svg className={cs} height={size} role="img" viewBox="0 0 24 24" width={size}>
      <title>, {accessibilityNewTabLabel}</title>
      <path d={(isInExperiment ? vrIcons : icons).visit} />
    </svg>
  );
}
