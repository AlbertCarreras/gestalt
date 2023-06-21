// @flow strict-local
import { type Node } from 'react';
import { Box, Button, Divider, Flex, Text } from 'gestalt';
// import styles from './DateRange.css';
import InternalDateField from './DateField/InternalDateField.js';
import InternalDatePicker from './DateRange/InternalDatePicker.js';

type LocaleData = {|
  code?: string,
  formatDistance?: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  formatRelative?: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  localize?: {|
    ordinalNumber: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    era: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    quarter: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    month: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    day: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    dayPeriod: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  |},
  formatLong?: {|
    date: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    time: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    dateTime: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  |},
  match?: {|
    ordinalNumber: (...args: $ReadOnlyArray<string>) => { ... },
    era: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    quarter: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    month: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    day: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    dayPeriod: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  |},
  options?: {|
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  |},
|};

type Props = {|
  /**
   * Prop description.
   */
  localeData?: LocaleData,
  radioGroup?: Node,
  startDateValue: Date | null,
  endDateValue: Date | null,
  onStartDateChange: ({| value: Date | null |}) => void,
  onEndDateChange: ({| value: Date | null |}) => void,
|};

/**
 * [DateRange] https://gestalt.pinterest.systems/web/daterange component should be used for ... on the page.
 * ![DateRange light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange.spec.mjs-snapshots/DateRange-chromium-darwin.png)
 * ![DateRange dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange-dark.spec.mjs-snapshots/DateRange-dark-chromium-darwin.png)
 */
function DateRange({
  radioGroup,
  startDateValue,
  endDateValue,
  onStartDateChange,
  onEndDateChange,
}: Props): Node {
  return (
    <Box
      rounding={4}
      padding={2}
      color="default"
      borderStyle="shadow"
      overflow="scroll"
      width={800}
      minHeight={425}
    >
      <Flex width="100%">
        <Box minHeight={300} minWidth={300} color="errorWeak">
          {radioGroup}
        </Box>
        <Box padding={2} width="100%">
          <Flex
            alignItems="start"
            height="100%"
            justifyContent="center"
            width="100%"
            gap={2}
            direction="column"
          >
            <Flex gap={3} alignItems="center">
              <Box
                dangerouslySetInlineStyle={{ __style: { paddingInlineStart: '8px' } }}
                width={300}
              >
                <InternalDateField
                  id="datefield-start"
                  onChange={({ value }) => {
                    console.log(value);
                    if (value?.getTime() || value === null) onStartDateChange({ value });
                  }}
                  value={startDateValue}
                />
              </Box>
              <Text>—</Text>
              <Box dangerouslySetInlineStyle={{ __style: { paddingInlineEnd: '8px' } }} width={300}>
                <InternalDateField
                  id="datefield-end"
                  onChange={({ value }) => {
                    console.log(value);
                    if (value?.getTime() || value === null) onEndDateChange({ value });
                  }}
                  value={endDateValue}
                />
              </Box>
            </Flex>
            <Flex.Item minWidth="100%">
              <Box width="100%" padding={2}>
                <Divider />
              </Box>
            </Flex.Item>
            <Flex gap={2}>
              <InternalDatePicker
                rangeStartDate={startDateValue}
                rangeEndDate={endDateValue}
                id="datepicker-start"
                onChange={({ startDate, endDate }) => {
                  onStartDateChange({ value: startDate });
                  onEndDateChange({ value: endDate });
                }}
              />
            </Flex>
            <Flex.Item alignSelf="end">
              <Button text="Apply" />
            </Flex.Item>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default DateRange;
