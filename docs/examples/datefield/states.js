// @flow strict
import { type Node } from 'react';
import { Flex } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Example(): Node {
  return (
    <Flex
      alignItems="center"
      gap={6}
      height="100%"
      justifyContent="center"
      width="100%"
      direction="column"
    >
      <DateField
        id="disabled_example"
        disabled
        label="Date of birth"
        onError={() => {}}
        onChange={() => {}}
        value={new Date('1995-12-17T03:24:00')}
        onClearInput={() => {}}
        name="bday_datefield"
      />
      <DateField
        id="readonly_example"
        readOnly
        label="Date of birth"
        onError={() => {}}
        onChange={() => {}}
        value={new Date('1995-12-17T03:24:00')}
        onClearInput={() => {}}
        name="bday_datefield"
      />
    </Flex>
  );
}
