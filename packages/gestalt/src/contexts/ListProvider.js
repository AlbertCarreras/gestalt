// @flow strict
import { type Context, type Element, type Node, useContext, createContext } from 'react';

type ListTypeContextValues = 'bare' | 'ordered' | 'unordered';
type ListSpacingContextValues = 'regular' | 'condensed';
type ListStyleContextValues = {|
  ol: $ReadOnlyArray<string>,
  ul: $ReadOnlyArray<string>,
|};

type ListContextType = {|
  type: ?ListTypeContextValues,
  spacing: ?ListSpacingContextValues,
  style: ?ListStyleContextValues,
|};

type Props = {|
  children: Node,
  type: ?ListTypeContextValues,
  spacing: ?ListSpacingContextValues,
  style: ?ListStyleContextValues,
|};

const ListContext: Context<ListContextType> = createContext<ListContextType>({
  type: null,
  spacing: null,
  style: null,
});

const { Provider } = ListContext;

function ListProvider({ children, type, spacing, style }: Props): Element<typeof Provider> {
  const { type: inheritedType, spacing: inheritedSpacing } = useContext(ListContext);

  return (
    <Provider
      value={{
        // List Provider is within List and NestedList. Both List and NestedList have type prop. The type set on the component has prevalence above the inherit in the provider.
        type: type ?? inheritedType,
        // List Provider is within List and NestedList. Only List has spacing prop. The spacing set on the List must be passed down on the nested providers so it does not get overriden. However, the top provider needs the spacing value set on List.
        spacing: inheritedSpacing ?? spacing,
        style,
      }}
    >
      {children}
    </Provider>
  );
}

function useList(): ListContextType {
  const { type, spacing, style } = useContext(ListContext);
  return { type, spacing, style };
}

export { ListProvider, useList };
