// @flow strict-local
import { type Node } from 'react';
import { Box, Button, Flex, Text, useDefaultLabel } from 'gestalt';
// import styles from './DateRange.css';
import InternalDateField from './DateField/InternalDateField.js';
import borderStyles from './DateRange.css';
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
  endDateErrorMessage?: string | null,
  /**
   * Prop description.
   */
  endDateValue: Date | null,
  /**
   * Prop description.
   */
  localeData?: LocaleData,
  /**
   * Prop description.
   */
  maxDate?: Date,
  /**
   * Prop description.
   */
  minDate?: Date,
  /**
   * Prop description.
   */
  onCancel: () => void,
  /**
   * Prop description.
   */
  onEndDateChange: ({| value: Date | null |}) => void,
  /**
   * Prop description.
   */
  onEndDateError: ({|
    errorMessage: string,
    value: Date | null,
  |}) => void,
  /**
   * Prop description.
   */
  onStartDateChange: ({| value: Date | null |}) => void,
  /**
   * Prop description.
   */
  onStartDateError: ({|
    errorMessage: string,
    value: Date | null,
  |}) => void,
  /**
   * Prop description.
   */
  onSubmit: () => void,
  /**
   * Prop description.
   */
  radioGroup?: Node,
  /**
   * Prop description.
   */
  startDateValue: Date | null,
  /**
   * Prop description.
   */
  startDateErrorMessage?: string | null,
|};

/**
 * [DateRange](https://gestalt.pinterest.systems/web/daterange) enables users to preview and select a range of days by picking dates from a calendar or adding a text input.
 * DateRange is distributed in its own package and must be installed separately.
 *
 * ![DateRange light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange.spec.mjs-snapshots/DateRange-chromium-darwin.png)
 * ![DateRange dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange-dark.spec.mjs-snapshots/DateRange-dark-chromium-darwin.png)
 */
function DateRange({
  endDateValue,
  endDateErrorMessage,
  localeData,
  maxDate,
  minDate,
  onCancel,
  onEndDateChange,
  onEndDateError,
  onStartDateChange,
  onStartDateError,
  onSubmit,
  radioGroup,
  startDateValue,
  startDateErrorMessage,
}: Props): Node {
  if (!startDateValue && endDateValue) {
    onEndDateChange({ value: null });
  }

  const { applyText, cancelText } = useDefaultLabel('DateRange');

  return (
    <Box rounding={4} color="default" borderStyle="shadow" minHeight={425} display="inlineBlock">
      <Flex>
        {radioGroup ? (
          <div className={borderStyles.borderRight}>
            <Box paddingY={4} paddingX={6} width={216}>
              {radioGroup}
            </Box>
          </div>
        ) : null}
        <Box>
          <Flex alignItems="start" justifyContent="center" direction="column">
            <div className={borderStyles.dateFieldSection}>
              <Flex gap={3}>
                <Box width={280}>
                  <InternalDateField
                    autoComplete="off"
                    mobileEnterKeyHint="enter"
                    id="datefield-start"
                    localeData={localeData}
                    onChange={({ value }) => {
                      if (value?.getTime() || value === null) onStartDateChange({ value });
                    }}
                    onError={onStartDateError}
                    value={startDateValue}
                    minDate={minDate}
                    maxDate={maxDate}
                    errorMessage={startDateErrorMessage}
                  />
                </Box>
                <Box dangerouslySetInlineStyle={{ __style: { marginTop: '15px' } }}>
                  <Text>—</Text>
                </Box>
                <Box width={280}>
                  <InternalDateField
                    autoComplete="off"
                    mobileEnterKeyHint="enter"
                    id="datefield-end"
                    localeData={localeData}
                    onChange={({ value }) => {
                      if (value?.getTime() || value === null) onEndDateChange({ value });
                    }}
                    value={endDateValue}
                    minDate={startDateValue}
                    onError={({ errorMessage, value }) => {
                      onEndDateError({ errorMessage, value });
                      if (errorMessage === 'minDate') {
                        onEndDateChange({ value: null });
                      }
                    }}
                    maxDate={maxDate}
                    errorMessage={endDateErrorMessage}
                  />
                </Box>
              </Flex>
            </div>
            <Box width={629}>
              <InternalDatePicker
                localeData={localeData}
                rangeStartDate={startDateValue}
                rangeEndDate={endDateValue}
                id="datepicker-start"
                onChange={({ startDate, endDate }) => {
                  onStartDateChange({ value: startDate });
                  onEndDateChange({ value: endDate });
                }}
                minDate={minDate}
                maxDate={maxDate}
              />
            </Box>
            <Flex.Item alignSelf="end">
              <Flex gap={2}>
                <Box marginBottom={4} marginEnd={4}>
                  <Button color="transparent" text={cancelText} onClick={() => onCancel()} />
                </Box>
                <Box marginBottom={4} marginEnd={4}>
                  <Button
                    text={applyText}
                    disabled={
                      !!endDateErrorMessage ||
                      !!startDateErrorMessage ||
                      !endDateValue ||
                      !startDateValue
                    }
                    onClick={() => onSubmit()}
                  />
                </Box>
              </Flex>
            </Flex.Item>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default DateRange;
