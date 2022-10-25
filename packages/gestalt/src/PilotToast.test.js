// @flow strict
import { Fragment } from 'react';
import { create } from 'react-test-renderer';
import Button from './Button.js';
import Link from './Link.js';
import PilotToast from './PilotToast.js';
import Text from './Text.js';

describe('<PilotToast />', () => {
  test('Text Only', () => {
    const tree = create(
      <PilotToast text="Same great profile, slightly new look. Learn more?" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Error PilotToast', () => {
    const tree = create(
      <PilotToast text="Same great profile, slightly new look. Learn more?" variant="error" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Text + Image', () => {
    const tree = create(
      <PilotToast
        thumbnail={
          <img
            alt=""
            src="https://i.pinimg.com/474x/b2/55/ed/b255edbf773ffb3985394e6efb9d2a49.jpg"
          />
        }
        text={
          <Fragment>
            Saved to{' '}
            <Text inline weight="bold">
              <Link
                inline
                href="https://www.pinterest.com/search/pins/?q=home%20decor"
                underline="hover"
              >
                Home decor
              </Link>
            </Text>
          </Fragment>
        }
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Text + Image + Button', () => {
    const tree = create(
      <PilotToast
        thumbnail={
          <img
            alt=""
            src="https://i.pinimg.com/474x/b2/55/ed/b255edbf773ffb3985394e6efb9d2a49.jpg"
          />
        }
        text={
          <Fragment>
            Saved to{' '}
            <Text inline weight="bold">
              <Link
                inline
                href="https://www.pinterest.com/search/pins/?q=home%20decor"
                underline="hover"
              >
                Home decor
              </Link>
            </Text>
          </Fragment>
        }
        button={<Button size="lg" text="Undo" />}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
