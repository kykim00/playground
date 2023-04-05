declare module 'next/dynamic' {
  export default function dynamic<P = {}>(
    dynamicOptions: DynamicOptions<P> | Loader<P>,
    options?: DynamicOptions<P>,
  ): React.FunctionComponent<P>;
}
