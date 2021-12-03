// @flow strict
import {
  useCallback,
  Profiler,
  cloneElement,
  forwardRef,
  Fragment,
  useEffect,
  useRef,
  useImperativeHandle,
  useState,
  type Element,
  type Node,
} from 'react';
import Box from './Box.js';
import Layer from './Layer.js';
import Popover from './Popover.js';
import Text from './Text.js';
import InternalTextField from './InternalTextField.js';
import Tag from './Tag.js';
import ComboBoxOption, { type OptionItemType } from './ComboBoxOption.js';
import { ESCAPE, TAB, ENTER, UP_ARROW, DOWN_ARROW } from './keyCodes.js';
import handleContainerScrolling, {
  KEYS,
  type DirectionOptionType,
} from './utils/keyboardNavigation.js';
import { type LabelDisplay } from './Label.js';

type Size = 'md' | 'lg';

type Props = {|
  // REQUIRED
  accessibilityClearButtonLabel: string,
  id: string,
  label: string,
  options: $ReadOnlyArray<OptionItemType>,
  noResultText: string,
  // OPTIONAL
  disabled?: boolean,
  errorMessage?: Node,
  helperText?: string,
  inputValue?: string | null,
  labelDisplay?: LabelDisplay,
  onBlur?: ({|
    event: SyntheticFocusEvent<HTMLInputElement> | SyntheticEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onChange?: ({|
    value: string,
    event: SyntheticInputEvent<HTMLInputElement>,
  |}) => void,
  onClear?: () => void,
  onFocus?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onKeyDown?: ({|
    event: SyntheticKeyboardEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onSelect?: ({|
    event: SyntheticInputEvent<HTMLElement> | SyntheticKeyboardEvent<HTMLElement>,
    item: OptionItemType,
  |}) => void,
  placeholder?: string,
  selectedOption?: OptionItemType,
  size?: Size,
  tags?: $ReadOnlyArray<Element<typeof Tag>>,
|};

const ComboBoxWithForwardRef: React$AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function ComboBox(
  {
    accessibilityClearButtonLabel,
    disabled,
    errorMessage,
    helperText,
    id,
    label,
    labelDisplay = 'visible',
    noResultText,
    onBlur,
    onChange,
    onClear,
    onFocus,
    onKeyDown,
    onSelect,
    options,
    placeholder,
    size,
    tags,
    selectedOption,
    inputValue: controlledInputValue = null,
  }: Props,
  ref,
): Node {
  // ==== REFS ====

  const innerRef = useRef(null);
  const optionRef = useRef(null);
  const dropdownRef = useRef(null);
  // When using both forwardRef and innerRefs, useimperativehandle() allows to externally set focus via the ref prop: textfieldRef.current.focus()
  useImperativeHandle(ref, () => innerRef.current);

  // ==== STATE ====

  const [hoveredItemIndex, setHoveredItemIndex] = useState<null | number>(null);
  const [showOptionsList, setShowOptionsList] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<?OptionItemType>(null);
  const [suggestedOptions, setSuggestedOptions] = useState<$ReadOnlyArray<OptionItemType>>(options);
  const [textfieldInput, setTextfieldInput] = useState<string>('');

  const isControlledInput = !(controlledInputValue === null || controlledInputValue === undefined);
  const isNotControlled = !isControlledInput && !tags;

  // ==== TAGS: Force disable state in Tags if ComboBox is disabled as well ====

  let selectedTags = tags;
  if (disabled && !!tags && tags.length > 0) {
    selectedTags = tags?.map((tag) => cloneElement(tag, { disabled: true }));
  }

  // ==== UNCONTROLLED COMBOBOX: Set suggestions ====

  useEffect(() => {
    if (isNotControlled) {
      if (!selectedItem) setHoveredItemIndex(null);
      if (showOptionsList && !selectedItem) {
        const filteredOptions = options.filter(({ label: optionLabel }) =>
          optionLabel.toLowerCase().includes(textfieldInput.toLowerCase()),
        );
        setSuggestedOptions(filteredOptions);
      } else {
        setSuggestedOptions(options);
      }
    }
  }, [isNotControlled, options, selectedItem, showOptionsList, textfieldInput]);

  // ==== CONTROLLED COMBOBOX ====

  useEffect(() => {
    if (isControlledInput) {
      if (!selectedOption) {
        setHoveredItemIndex(null);
      } else {
        suggestedOptions.forEach((option, index) => {
          if (option.value === selectedOption.value) setHoveredItemIndex(index);
        });
      }
      setSuggestedOptions(options);
    }
  }, [isControlledInput, options, selectedOption, suggestedOptions]);

  // ==== EVENT HANDLING ====

  const handleSelectOptionItem = useCallback(
    ({ event, item }) => {
      onSelect?.({ event, item });
      if (isNotControlled) {
        setSelectedItem(item);
        setTextfieldInput(item.label);
      }
      setShowOptionsList(false);
    },
    [isNotControlled, onSelect],
  );

  // ==== KEYBOARD NAVIGATION LOGIC: Keyboard navigation is handled by ComboBox while onClick selection is handled in ComboBoxOption ====

  const handleKeyNavigation = useCallback(
    (event, direction: DirectionOptionType) => {
      if (!showOptionsList) setShowOptionsList(true);

      const getNextHoveredIndex = (keyboardDirection) => {
        if (keyboardDirection === UP_ARROW) {
          return direction + (hoveredItemIndex || 0);
        }

        return hoveredItemIndex === null ? 0 : direction + hoveredItemIndex;
      };

      const nextHoveredIndex = getNextHoveredIndex(direction);
      const optionsCount = suggestedOptions.length - 1;

      // If there's an existing item, navigate from that position
      let cursorIndex = nextHoveredIndex;

      // If we've reached the end, start at the top
      if (nextHoveredIndex > optionsCount) {
        cursorIndex = 0;
      }

      // If we're at the top going backwards, start at the last item
      else if (nextHoveredIndex < 0) {
        cursorIndex = optionsCount;
      }

      // IMPORTANT: handleContainerScrolling must be placed before we update hoveredItemIndex
      handleContainerScrolling({
        direction,
        containerRef: dropdownRef,
        currentHoveredOption: optionRef.current,
      });

      setHoveredItemIndex(cursorIndex);

      const optionItem = suggestedOptions[cursorIndex];

      if (optionItem && direction === KEYS.ENTER) {
        handleSelectOptionItem({ event, item: optionItem });
      }
    },
    [handleSelectOptionItem, hoveredItemIndex, showOptionsList, suggestedOptions],
  );

  const handleKeyDown = useCallback(
    (event) => {
      const { keyCode } = event;

      if (keyCode === UP_ARROW) {
        handleKeyNavigation(event, KEYS.UP);
        event.preventDefault();
      } else if (keyCode === DOWN_ARROW) {
        handleKeyNavigation(event, KEYS.DOWN);
        event.preventDefault();
      } else if (keyCode === ENTER) {
        handleKeyNavigation(event, KEYS.ENTER);
        event.stopPropagation();
      } else if (keyCode === ESCAPE) {
        if (innerRef) innerRef.current?.focus();
      } else if (keyCode === TAB) {
        setShowOptionsList(false);
      }
    },
    [handleKeyNavigation],
  );

  const textfieldIconButton =
    (controlledInputValue && controlledInputValue !== '') ||
    (textfieldInput && textfieldInput !== '') ||
    (tags && tags.length > 0)
      ? 'clear'
      : 'expand';

  function onRenderCallback(
    idx, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions, // the Set of interactions belonging to this update
  ) {
    console.log(idx, phase, actualDuration, baseDuration, startTime, commitTime, interactions);
  }

  const handleOnClickIconButtonClear = useCallback(() => {
    setHoveredItemIndex(null);
    if (isNotControlled) {
      setSelectedItem(null);
      setTextfieldInput('');
      setSuggestedOptions(options);
    }
    onClear?.();
    innerRef?.current?.focus();
  }, [isNotControlled, onClear, options]);

  const handleSetShowOptionsList = useCallback(() => setShowOptionsList(true), []);

  const handleOnChange = useCallback(
    ({ event, value }) => {
      setHoveredItemIndex(null);
      if (isNotControlled) {
        setSelectedItem(null);
        setTextfieldInput(value);
      }
      if (showOptionsList === false) setShowOptionsList(true);
      onChange?.({ event, value });
    },
    [isNotControlled, onChange, showOptionsList],
  );

  const handleOnFocus = useCallback(({ event, value }) => onFocus?.({ event, value }), [onFocus]);
  const handleOnBlur = useCallback(({ event, value }) => onBlur?.({ event, value }), [onBlur]);
  const handleOnDismiss = useCallback(() => setShowOptionsList(false), []);
  const handleOnKeyDown = useCallback(
    ({ event, value }) => {
      if (!showOptionsList && event.keyCode !== TAB) setShowOptionsList(true);
      onKeyDown?.({ event, value });
    },
    [onKeyDown, showOptionsList],
  );
  
  return (
    <Fragment>
      <Box
        aria-autocomplete="list"
        aria-expanded={showOptionsList}
        aria-haspopup
        aria-owns={id}
        position="relative"
        role="combobox"
      >
        <InternalTextField
          accessibilityClearButtonLabel={accessibilityClearButtonLabel}
          // add accessibilityControls once the option list element exists
          accessibilityControls={showOptionsList && innerRef.current ? id : undefined}
          // add accessibilityActivedescendant once the option list element exists
          accessibilityActiveDescendant={
            showOptionsList && innerRef.current && hoveredItemIndex !== null
              ? `${id}-item-${hoveredItemIndex}`
              : undefined
          }
          autoComplete="off"
          disabled={disabled}
          errorMessage={errorMessage}
          hasError={!!errorMessage}
          helperText={helperText}
          id={`combobox-${id}`}
          label={label}
          labelDisplay={labelDisplay}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onClickIconButton={
            textfieldIconButton === 'clear'
              ? handleOnClickIconButtonClear
              : handleSetShowOptionsList
          }
          onClick={handleSetShowOptionsList}
          onFocus={handleOnFocus}
          onKeyDown={handleOnKeyDown}
          placeholder={tags && tags.length > 0 ? '' : placeholder}
          ref={innerRef}
          size={size}
          tags={selectedTags}
          textfieldIconButton={textfieldIconButton}
          type="text"
          value={controlledInputValue ?? textfieldInput}
        />
      </Box>
      {showOptionsList && innerRef.current ? (
        <Layer>
          <Popover
            anchor={innerRef.current}
            handleKeyDown={handleKeyDown}
            idealDirection="down"
            onDismiss={handleOnDismiss}
            positionRelativeToAnchor={false}
            size="flexible"
          >
            <Box
              aria-expanded={showOptionsList}
              alignItems="center"
              direction="column"
              display="flex"
              flex="grow"
              id={id}
              maxHeight="30vh"
              overflow="auto"
              padding={2}
              ref={dropdownRef}
              role="listbox"
              rounding={4}
              width={innerRef?.current?.offsetWidth}
            >
              <Profiler id="Navigation" onRender={onRenderCallback}>
                {suggestedOptions.length > 0 ? (
                  suggestedOptions.map((option, index) => (
                    <ComboBoxOption
                      isHovered={index === hoveredItemIndex}
                      id={id}
                      index={index}
                      key={`${id}${index}`}
                      label={option.label}
                      subtext={option?.subtext}
                      value={option.value}
                      onSelect={handleSelectOptionItem}
                      selectedValue={selectedOption?.value ?? selectedItem?.value}
                      setHoveredItemIndex={setHoveredItemIndex}
                      ref={optionRef}
                    />
                  ))
                ) : (
                  <Box width="100%" paddingX={2} paddingY={4}>
                    <Text lineClamp={1} color="gray">
                      {noResultText}
                    </Text>
                  </Box>
                )}
              </Profiler>
            </Box>
          </Popover>
        </Layer>
      ) : null}
    </Fragment>
  );
});

ComboBoxWithForwardRef.displayName = 'ComboBox';

export default ComboBoxWithForwardRef;
